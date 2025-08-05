import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { L14Service } from '../services/l14.service';
import { L14ConcentracionDepositos, L14ReportRequest, L14ReportResponse } from '../models/l14.model';

@Component({
  selector: 'app-l14-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="l14-dashboard">
      <div class="header">
        <h2>Dashboard L14 - Concentración de Depósitos</h2>
        <div class="actions">
          <button (click)="exportReport()" class="btn-export">Exportar Reporte</button>
          <button (click)="refreshData()" class="btn-refresh">Actualizar</button>
        </div>
      </div>

      <!-- Filtros -->
      <div class="filters">
        <div class="filter-group">
          <label>Fecha Inicio:</label>
          <input type="date" [(ngModel)]="filters.fechaInicio" (change)="applyFilters()">
        </div>
        <div class="filter-group">
          <label>Fecha Fin:</label>
          <input type="date" [(ngModel)]="filters.fechaFin" (change)="applyFilters()">
        </div>
        <div class="filter-group">
          <label>Tipo Depósito:</label>
          <select [(ngModel)]="filters.tipoDeposito" (change)="applyFilters()">
            <option value="">Todos</option>
            <option value="Depósito a Plazo">Depósito a Plazo</option>
            <option value="Cuenta Corriente">Cuenta Corriente</option>
            <option value="Cuenta de Ahorro">Cuenta de Ahorro</option>
          </select>
        </div>
        <div class="filter-group">
          <label>Buscar:</label>
          <input type="text" [(ngModel)]="searchTerm" (input)="applySearch()" placeholder="Buscar por cliente...">
        </div>
      </div>

      <!-- KPIs -->
      <div class="kpi-cards">
        <div class="kpi-card">
          <h3>Total Registros</h3>
          <p class="kpi-value">{{ reportResponse?.totalRegistros || 0 }}</p>
        </div>
        <div class="kpi-card">
          <h3>Valor Total Depósitos</h3>
          <p class="kpi-value">{{ reportResponse?.valorTotalDepositos | currency:'USD':'symbol':'1.0-0' }}</p>
        </div>
        <div class="kpi-card">
          <h3>Concentración Promedio</h3>
          <p class="kpi-value">{{ reportResponse?.concentracionPromedio | number:'1.2-2' }}%</p>
        </div>
        <div class="kpi-card">
          <h3>Clientes Concentrados</h3>
          <p class="kpi-value">{{ reportResponse?.clientesConcentrados || 0 }}</p>
        </div>
        <div class="kpi-card">
          <h3>Estado</h3>
          <p class="kpi-value" [class.compliance]="reportResponse?.cumplimiento === 'CUMPLE'">
            {{ reportResponse?.cumplimiento }}
          </p>
        </div>
      </div>

      <!-- Tabla de Datos -->
      <div class="data-section">
        <h3>Datos L14 - Concentración de Depósitos</h3>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Código Cliente</th>
                <th>Nombre Cliente</th>
                <th>Tipo Depósito</th>
                <th>Valor Depósito</th>
                <th>% Concentración</th>
                <th>Límite Concentración</th>
                <th>Estado</th>
                <th>Fecha Cálculo</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let item of filteredData">
                <td>{{ item.codigoCliente }}</td>
                <td>{{ item.nombreCliente }}</td>
                <td>{{ item.tipoDeposito }}</td>
                <td>{{ item.valorDeposito | currency:'USD':'symbol':'1.0-0' }}</td>
                <td [class.warning]="item.porcentajeConcentracion > 10" 
                    [class.danger]="item.porcentajeConcentracion > 15">
                  {{ item.porcentajeConcentracion | number:'1.2-2' }}%
                </td>
                <td>{{ item.limiteConcentracion | number:'1.2-2' }}%</td>
                <td [class.compliance]="item.estadoConcentracion === 'CUMPLE'"
                    [class.non-compliance]="item.estadoConcentracion !== 'CUMPLE'">
                  {{ item.estadoConcentracion }}
                </td>
                <td>{{ item.fechaCalculo | date:'dd/MM/yyyy' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Gráfico de Concentración -->
      <div class="chart-section">
        <h3>Concentración por Cliente</h3>
        <div class="chart-container">
          <div class="chart-bar" *ngFor="let item of chartData">
            <div class="bar-label">{{ item.label }}</div>
            <div class="bar-container">
              <div class="bar" [style.width.%]="item.percentage" 
                   [class.warning]="item.concentracion > 10" 
                   [class.danger]="item.concentracion > 15">
                {{ item.concentracion | number:'1.1-1' }}%
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Análisis de Riesgo -->
      <div class="risk-section">
        <h3>Análisis de Riesgo de Concentración</h3>
        <div class="risk-grid">
          <div class="risk-card" *ngFor="let item of riskData">
            <h4>{{ item.categoria }}</h4>
            <p class="risk-value">{{ item.cantidad }}</p>
            <p class="risk-label">{{ item.descripcion }}</p>
            <div class="risk-indicator" [class]="item.nivel"></div>
          </div>
        </div>
      </div>

      <!-- Alertas de Concentración -->
      <div class="alerts-section" *ngIf="alertas.length > 0">
        <h3>Alertas de Concentración</h3>
        <div class="alerts-list">
          <div class="alert-item" *ngFor="let alerta of alertas" [class]="alerta.tipo">
            <div class="alert-icon">⚠️</div>
            <div class="alert-content">
              <h4>{{ alerta.titulo }}</h4>
              <p>{{ alerta.descripcion }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .l14-dashboard {
      padding: 20px;
      background: #f5f5f5;
      min-height: 100vh;
    }
    
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .header h2 {
      margin: 0;
      color: #333;
    }
    
    .actions {
      display: flex;
      gap: 10px;
    }
    
    .btn-export, .btn-refresh {
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
    }
    
    .btn-export {
      background: #28a745;
      color: white;
    }
    
    .btn-refresh {
      background: #007bff;
      color: white;
    }
    
    .filters {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
      margin-bottom: 20px;
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .filter-group {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
    
    .filter-group label {
      font-weight: 500;
      color: #666;
    }
    
    .filter-group input, .filter-group select {
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    
    .kpi-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }
    
    .kpi-card {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      text-align: center;
    }
    
    .kpi-card h3 {
      margin: 0 0 10px 0;
      color: #666;
      font-size: 14px;
    }
    
    .kpi-value {
      margin: 0;
      font-size: 20px;
      font-weight: bold;
      color: #333;
    }
    
    .compliance { color: #28a745; }
    .non-compliance { color: #dc3545; }
    .warning { color: #ffc107; }
    .danger { color: #dc3545; }
    
    .data-section {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      margin-bottom: 30px;
      overflow: hidden;
    }
    
    .data-section h3 {
      margin: 0;
      padding: 20px;
      background: #f8f9fa;
      border-bottom: 1px solid #dee2e6;
    }
    
    .table-container {
      overflow-x: auto;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
    }
    
    th, td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #dee2e6;
    }
    
    th {
      background: #f8f9fa;
      font-weight: 600;
      color: #495057;
    }
    
    tr:hover {
      background: #f8f9fa;
    }
    
    .chart-section {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      padding: 20px;
      margin-bottom: 30px;
    }
    
    .chart-section h3 {
      margin: 0 0 20px 0;
      color: #333;
    }
    
    .chart-container {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    
    .chart-bar {
      display: flex;
      align-items: center;
      gap: 15px;
    }
    
    .bar-label {
      min-width: 150px;
      font-weight: 500;
    }
    
    .bar-container {
      flex: 1;
      height: 30px;
      background: #f8f9fa;
      border-radius: 15px;
      overflow: hidden;
    }
    
    .bar {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 500;
      font-size: 12px;
      transition: width 0.3s ease;
      background: #28a745;
    }
    
    .bar.warning {
      background: linear-gradient(90deg, #ffc107, #fd7e14);
    }
    
    .bar.danger {
      background: linear-gradient(90deg, #dc3545, #e83e8c);
    }
    
    .risk-section {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      padding: 20px;
      margin-bottom: 30px;
    }
    
    .risk-section h3 {
      margin: 0 0 20px 0;
      color: #333;
    }
    
    .risk-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
    }
    
    .risk-card {
      text-align: center;
      padding: 20px;
      border: 1px solid #dee2e6;
      border-radius: 8px;
      position: relative;
    }
    
    .risk-card h4 {
      margin: 0 0 10px 0;
      color: #666;
    }
    
    .risk-value {
      font-size: 24px;
      font-weight: bold;
      color: #333;
      margin: 0 0 5px 0;
    }
    
    .risk-label {
      margin: 0 0 10px 0;
      color: #666;
      font-size: 14px;
    }
    
    .risk-indicator {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      margin: 0 auto;
    }
    
    .risk-indicator.bajo { background: #28a745; }
    .risk-indicator.medio { background: #ffc107; }
    .risk-indicator.alto { background: #dc3545; }
    
    .alerts-section {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      padding: 20px;
    }
    
    .alerts-section h3 {
      margin: 0 0 20px 0;
      color: #333;
    }
    
    .alerts-list {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    
    .alert-item {
      display: flex;
      align-items: flex-start;
      gap: 15px;
      padding: 15px;
      border-radius: 8px;
      border-left: 4px solid;
    }
    
    .alert-item.warning {
      background: #fff3cd;
      border-left-color: #ffc107;
    }
    
    .alert-item.danger {
      background: #f8d7da;
      border-left-color: #dc3545;
    }
    
    .alert-icon {
      font-size: 20px;
    }
    
    .alert-content h4 {
      margin: 0 0 5px 0;
      color: #333;
    }
    
    .alert-content p {
      margin: 0;
      color: #666;
    }
  `]
})
export class L14DashboardComponent implements OnInit {
  reportResponse?: L14ReportResponse;
  filteredData: L14ConcentracionDepositos[] = [];
  searchTerm: string = '';
  chartData: any[] = [];
  riskData: any[] = [];
  alertas: any[] = [];

  filters: L14ReportRequest = {
    fechaInicio: '2025-06-23',
    fechaFin: '2025-06-28'
  };

  constructor(private l14Service: L14Service) { }

  ngOnInit(): void {
    this.loadL14Data();
  }

  loadL14Data(): void {
    this.l14Service.getL14Data(this.filters).subscribe({
      next: (response) => {
        this.reportResponse = response;
        this.filteredData = response.datos;
        this.generateChartData();
        this.generateRiskData();
        this.generateAlertas();
        console.log('Datos L14 cargados:', response);
      },
      error: (error) => {
        console.error('Error cargando datos L14:', error);
      }
    });
  }

  applyFilters(): void {
    this.loadL14Data();
  }

  applySearch(): void {
    if (!this.reportResponse?.datos) return;
    
    if (!this.searchTerm.trim()) {
      this.filteredData = this.reportResponse.datos;
    } else {
      this.filteredData = this.reportResponse.datos.filter(item =>
        item.codigoCliente.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.nombreCliente.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  generateChartData(): void {
    if (!this.reportResponse?.datos) return;

    // Tomar los 10 clientes con mayor concentración
    const topClientes = this.reportResponse.datos
      .sort((a, b) => b.porcentajeConcentracion - a.porcentajeConcentracion)
      .slice(0, 10);

    this.chartData = topClientes.map(item => ({
      label: item.nombreCliente.substring(0, 20) + (item.nombreCliente.length > 20 ? '...' : ''),
      concentracion: item.porcentajeConcentracion,
      percentage: (item.porcentajeConcentracion / 20) * 100 // Escalar al 20% máximo
    }));
  }

  generateRiskData(): void {
    if (!this.reportResponse?.datos) return;

    const totalClientes = this.reportResponse.datos.length;
    const clientesBajoRiesgo = this.reportResponse.datos.filter(item => item.porcentajeConcentracion <= 5).length;
    const clientesMedioRiesgo = this.reportResponse.datos.filter(item => 
      item.porcentajeConcentracion > 5 && item.porcentajeConcentracion <= 10
    ).length;
    const clientesAltoRiesgo = this.reportResponse.datos.filter(item => item.porcentajeConcentracion > 10).length;

    this.riskData = [
      {
        categoria: 'Bajo Riesgo',
        cantidad: clientesBajoRiesgo,
        descripcion: '≤ 5% concentración',
        nivel: 'bajo'
      },
      {
        categoria: 'Medio Riesgo',
        cantidad: clientesMedioRiesgo,
        descripcion: '5-10% concentración',
        nivel: 'medio'
      },
      {
        categoria: 'Alto Riesgo',
        cantidad: clientesAltoRiesgo,
        descripcion: '> 10% concentración',
        nivel: 'alto'
      }
    ];
  }

  generateAlertas(): void {
    if (!this.reportResponse?.datos) return;

    this.alertas = [];

    // Alerta por clientes con alta concentración
    const clientesAltaConcentracion = this.reportResponse.datos.filter(item => item.porcentajeConcentracion > 15);
    if (clientesAltaConcentracion.length > 0) {
      this.alertas.push({
        tipo: 'danger',
        titulo: 'Alta Concentración Detectada',
        descripcion: `${clientesAltaConcentracion.length} cliente(s) con concentración superior al 15%`
      });
    }

    // Alerta por concentración promedio alta
    if (this.reportResponse.concentracionPromedio > 8) {
      this.alertas.push({
        tipo: 'warning',
        titulo: 'Concentración Promedio Elevada',
        descripcion: `La concentración promedio es del ${this.reportResponse.concentracionPromedio.toFixed(2)}%`
      });
    }

    // Alerta por incumplimiento
    const clientesIncumplimiento = this.reportResponse.datos.filter(item => item.estadoConcentracion !== 'CUMPLE');
    if (clientesIncumplimiento.length > 0) {
      this.alertas.push({
        tipo: 'danger',
        titulo: 'Incumplimientos Detectados',
        descripcion: `${clientesIncumplimiento.length} cliente(s) no cumplen con los límites de concentración`
      });
    }
  }

  exportReport(): void {
    if (!this.reportResponse) return;
    
    this.l14Service.exportL14Report(this.reportResponse.id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `reporte-l14-${new Date().toISOString().split('T')[0]}.txt`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Error exportando reporte:', error);
        alert('Error al exportar el reporte');
      }
    });
  }

  refreshData(): void {
    this.loadL14Data();
  }
} 
