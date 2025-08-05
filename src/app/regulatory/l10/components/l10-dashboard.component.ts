import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { L10Service } from '../services/l10.service';
import { L10BrechasSensibilidad, L10ReportRequest, L10ReportResponse } from '../models/l10.model';

@Component({
  selector: 'app-l10-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="l10-dashboard">
      <div class="header">
        <h2>Dashboard L10 - Brechas de Sensibilidad</h2>
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
          <label>Tipo Brecha:</label>
          <select [(ngModel)]="filters.tipoBrecha" (change)="applyFilters()">
            <option value="">Todos</option>
            <option value="Tasa de Interés">Tasa de Interés</option>
            <option value="Liquidez">Liquidez</option>
            <option value="Cambio">Cambio</option>
          </select>
        </div>
        <div class="filter-group">
          <label>Buscar:</label>
          <input type="text" [(ngModel)]="searchTerm" (input)="applySearch()" placeholder="Buscar por código...">
        </div>
      </div>

      <!-- KPIs -->
      <div class="kpi-cards">
        <div class="kpi-card">
          <h3>Total Registros</h3>
          <p class="kpi-value">{{ reportResponse?.totalRegistros || 0 }}</p>
        </div>
        <div class="kpi-card">
          <h3>Valor Total Activos</h3>
          <p class="kpi-value">{{ reportResponse?.valorTotalActivos | currency:'USD':'symbol':'1.0-0' }}</p>
        </div>
        <div class="kpi-card">
          <h3>Valor Total Pasivos</h3>
          <p class="kpi-value">{{ reportResponse?.valorTotalPasivos | currency:'USD':'symbol':'1.0-0' }}</p>
        </div>
        <div class="kpi-card">
          <h3>Brecha Total</h3>
          <p class="kpi-value" [class.positive]="(reportResponse?.brechaTotal || 0) > 0" 
             [class.negative]="(reportResponse?.brechaTotal || 0) < 0">
            {{ reportResponse?.brechaTotal | currency:'USD':'symbol':'1.0-0' }}
          </p>
        </div>
        <div class="kpi-card">
          <h3>Sensibilidad Promedio</h3>
          <p class="kpi-value">{{ reportResponse?.sensibilidadPromedio | number:'1.2-2' }}</p>
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
        <h3>Datos L10 - Brechas de Sensibilidad</h3>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Código Brecha</th>
                <th>Tipo Brecha</th>
                <th>Plazo (días)</th>
                <th>Activos</th>
                <th>Pasivos</th>
                <th>Brecha</th>
                <th>Sensibilidad</th>
                <th>Fecha Cálculo</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let item of filteredData">
                <td>{{ item.codigoBrecha }}</td>
                <td>{{ item.tipoBrecha }}</td>
                <td>{{ item.plazo }}</td>
                <td>{{ item.activos | currency:'USD':'symbol':'1.0-0' }}</td>
                <td>{{ item.pasivos | currency:'USD':'symbol':'1.0-0' }}</td>
                <td [class.positive]="item.brecha > 0" [class.negative]="item.brecha < 0">
                  {{ item.brecha | currency:'USD':'symbol':'1.0-0' }}
                </td>
                <td>{{ item.sensibilidad | number:'1.2-2' }}</td>
                <td>{{ item.fechaCalculo | date:'dd/MM/yyyy' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Gráfico de Brechas por Tipo -->
      <div class="chart-section">
        <h3>Brechas por Tipo</h3>
        <div class="chart-container">
          <div class="chart-bar" *ngFor="let item of chartData">
            <div class="bar-label">{{ item.label }}</div>
            <div class="bar-container">
              <div class="bar" [style.width.%]="item.percentage" 
                   [class.positive]="item.brecha > 0" 
                   [class.negative]="item.brecha < 0">
                {{ item.brecha | currency:'USD':'symbol':'1.0-0' }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Análisis de Sensibilidad -->
      <div class="sensitivity-section">
        <h3>Análisis de Sensibilidad</h3>
        <div class="sensitivity-grid">
          <div class="sensitivity-card" *ngFor="let item of sensitivityData">
            <h4>{{ item.tipo }}</h4>
            <p class="sensitivity-value">{{ item.sensibilidad | number:'1.2-2' }}</p>
            <p class="sensitivity-label">{{ item.interpretacion }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .l10-dashboard {
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
    
    .positive { color: #28a745; }
    .negative { color: #dc3545; }
    .compliance { color: #28a745; }
    
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
      min-width: 120px;
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
    }
    
    .bar.positive {
      background: linear-gradient(90deg, #28a745, #20c997);
    }
    
    .bar.negative {
      background: linear-gradient(90deg, #dc3545, #fd7e14);
    }
    
    .sensitivity-section {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      padding: 20px;
    }
    
    .sensitivity-section h3 {
      margin: 0 0 20px 0;
      color: #333;
    }
    
    .sensitivity-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
    }
    
    .sensitivity-card {
      text-align: center;
      padding: 20px;
      border: 1px solid #dee2e6;
      border-radius: 8px;
    }
    
    .sensitivity-card h4 {
      margin: 0 0 10px 0;
      color: #666;
    }
    
    .sensitivity-value {
      font-size: 24px;
      font-weight: bold;
      color: #333;
      margin: 0 0 5px 0;
    }
    
    .sensitivity-label {
      margin: 0;
      color: #666;
      font-size: 14px;
    }
  `]
})
export class L10DashboardComponent implements OnInit {
  reportResponse?: L10ReportResponse;
  filteredData: L10BrechasSensibilidad[] = [];
  searchTerm: string = '';
  chartData: any[] = [];
  sensitivityData: any[] = [];

  filters: L10ReportRequest = {
    fechaInicio: '2025-06-23',
    fechaFin: '2025-06-28'
  };

  constructor(private l10Service: L10Service) { }

  ngOnInit(): void {
    this.loadL10Data();
  }

  loadL10Data(): void {
    this.l10Service.getL10Data(this.filters).subscribe({
      next: (response) => {
        this.reportResponse = response;
        this.filteredData = response.datos;
        this.generateChartData();
        this.generateSensitivityData();
        console.log('Datos L10 cargados:', response);
      },
      error: (error) => {
        console.error('Error cargando datos L10:', error);
      }
    });
  }

  applyFilters(): void {
    this.loadL10Data();
  }

  applySearch(): void {
    if (!this.reportResponse?.datos) return;
    
    if (!this.searchTerm.trim()) {
      this.filteredData = this.reportResponse.datos;
    } else {
      this.filteredData = this.reportResponse.datos.filter(item =>
        item.codigoBrecha.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.tipoBrecha.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  generateChartData(): void {
    if (!this.reportResponse?.datos) return;

    const tipos = [...new Set(this.reportResponse.datos.map(item => item.tipoBrecha))];
    this.chartData = tipos.map(tipo => {
      const items = this.reportResponse!.datos.filter(item => item.tipoBrecha === tipo);
      const brechaTotal = items.reduce((sum, item) => sum + item.brecha, 0);
      const maxBrecha = Math.max(...this.reportResponse!.datos.map(item => Math.abs(item.brecha)));

      return {
        label: tipo,
        brecha: brechaTotal,
        percentage: (Math.abs(brechaTotal) / maxBrecha) * 100
      };
    });
  }

  generateSensitivityData(): void {
    if (!this.reportResponse?.datos) return;

    const tipos = [...new Set(this.reportResponse.datos.map(item => item.tipoBrecha))];
    this.sensitivityData = tipos.map(tipo => {
      const items = this.reportResponse!.datos.filter(item => item.tipoBrecha === tipo);
      const sensibilidadPromedio = items.reduce((sum, item) => sum + item.sensibilidad, 0) / items.length;
      
      let interpretacion = '';
      if (sensibilidadPromedio > 0.8) {
        interpretacion = 'Alta sensibilidad';
      } else if (sensibilidadPromedio > 0.5) {
        interpretacion = 'Sensibilidad media';
      } else {
        interpretacion = 'Baja sensibilidad';
      }

      return {
        tipo,
        sensibilidad: sensibilidadPromedio,
        interpretacion
      };
    });
  }

  exportReport(): void {
    if (!this.reportResponse) return;
    
    this.l10Service.exportL10Report(this.reportResponse.id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `reporte-l10-${new Date().toISOString().split('T')[0]}.txt`;
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
    this.loadL10Data();
  }
} 
