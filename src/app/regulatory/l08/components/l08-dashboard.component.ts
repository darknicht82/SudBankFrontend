import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { L08Service } from '../services/l08.service';
import { L08Data, L08ReportRequest, L08ReportResponse } from '../models/l08.model';

@Component({
  selector: 'app-l08-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="l08-dashboard">
      <div class="header">
        <h2>Dashboard L08 - Liquidez</h2>
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
          <label>Tipo Instrumento:</label>
          <select [(ngModel)]="filters.tipoInstrumento" (change)="applyFilters()">
            <option value="">Todos</option>
            <option value="1">Tipo 1</option>
            <option value="2">Tipo 2</option>
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
          <h3>Valor Total Lunes</h3>
          <p class="kpi-value">{{ reportResponse?.valorTotalLunes | currency:'USD':'symbol':'1.0-0' }}</p>
        </div>
        <div class="kpi-card">
          <h3>Valor Total Viernes</h3>
          <p class="kpi-value">{{ reportResponse?.valorTotalViernes | currency:'USD':'symbol':'1.0-0' }}</p>
        </div>
        <div class="kpi-card">
          <h3>Variación Semanal</h3>
          <p class="kpi-value" [class.positive]="(reportResponse?.variacionSemanal || 0) > 0" 
             [class.negative]="(reportResponse?.variacionSemanal || 0) < 0">
            {{ reportResponse?.variacionSemanal | number:'1.2-2' }}%
          </p>
        </div>
        <div class="kpi-card">
          <h3>Cumplimiento</h3>
          <p class="kpi-value">{{ reportResponse?.cumplimiento | number:'1.1-1' }}%</p>
        </div>
      </div>

      <!-- Tabla de Datos -->
      <div class="data-section">
        <h3>Datos L08 - Liquidez</h3>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Código Liquidez</th>
                <th>Tipo ID</th>
                <th>Identificación</th>
                <th>Tipo Instrumento</th>
                <th>Calificación</th>
                <th>Valor Lunes</th>
                <th>Valor Martes</th>
                <th>Valor Miércoles</th>
                <th>Valor Jueves</th>
                <th>Valor Viernes</th>
                <th>Fecha Reporte</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let item of filteredData">
                <td>{{ item.codigoLiquidez }}</td>
                <td>{{ item.tipoIdentificacion }}</td>
                <td>{{ item.identificacionEntidad }}</td>
                <td>{{ getTipoInstrumentoLabel(item.tipoInstrumento) }}</td>
                <td>{{ getCalificacionLabel(item.calificacionEntidad) }}</td>
                <td>{{ item.valorLunes | currency:'USD':'symbol':'1.0-0' }}</td>
                <td>{{ item.valorMartes | currency:'USD':'symbol':'1.0-0' }}</td>
                <td>{{ item.valorMiercoles | currency:'USD':'symbol':'1.0-0' }}</td>
                <td>{{ item.valorJueves | currency:'USD':'symbol':'1.0-0' }}</td>
                <td>{{ item.valorViernes | currency:'USD':'symbol':'1.0-0' }}</td>
                <td>{{ item.fechaReporte | date:'dd/MM/yyyy' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Gráfico de Variación Semanal -->
      <div class="chart-section">
        <h3>Variación Semanal por Instrumento</h3>
        <div class="chart-container">
          <div class="chart-bar" *ngFor="let item of chartData">
            <div class="bar-label">{{ item.label }}</div>
            <div class="bar-container">
              <div class="bar" [style.width.%]="item.percentage" 
                   [class.positive]="item.variacion > 0" 
                   [class.negative]="item.variacion < 0">
                {{ item.variacion | number:'1.1-1' }}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .l08-dashboard {
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
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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
      font-size: 24px;
      font-weight: bold;
      color: #333;
    }
    
    .positive { color: #28a745; }
    .negative { color: #dc3545; }
    
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
  `]
})
export class L08DashboardComponent implements OnInit {
  reportResponse?: L08ReportResponse;
  filteredData: L08Data[] = [];
  searchTerm: string = '';
  chartData: any[] = [];

  filters: L08ReportRequest = {
    fechaInicio: '2025-06-23',
    fechaFin: '2025-06-28'
  };

  constructor(private l08Service: L08Service) { }

  ngOnInit(): void {
    this.loadL08Data();
  }

  loadL08Data(): void {
    this.l08Service.getL08Data(this.filters).subscribe({
      next: (response) => {
        this.reportResponse = response;
        this.filteredData = response.datos;
        this.generateChartData();
        console.log('Datos L08 cargados:', response);
      },
      error: (error) => {
        console.error('Error cargando datos L08:', error);
      }
    });
  }

  applyFilters(): void {
    this.loadL08Data();
  }

  applySearch(): void {
    if (!this.reportResponse?.datos) return;
    
    if (!this.searchTerm.trim()) {
      this.filteredData = this.reportResponse.datos;
    } else {
      this.filteredData = this.reportResponse.datos.filter(item =>
        item.codigoLiquidez.toString().includes(this.searchTerm) ||
        item.identificacionEntidad.toString().includes(this.searchTerm)
      );
    }
  }

  generateChartData(): void {
    if (!this.reportResponse?.datos) return;

    const instrumentos = [...new Set(this.reportResponse.datos.map(item => item.tipoInstrumento))];
    this.chartData = instrumentos.map(tipo => {
      const items = this.reportResponse!.datos.filter(item => item.tipoInstrumento === tipo);
      const variacionPromedio = items.reduce((sum, item) => {
        const variacion = ((item.valorViernes - item.valorLunes) / item.valorLunes) * 100;
        return sum + variacion;
      }, 0) / items.length;

      return {
        label: `Tipo ${tipo}`,
        variacion: variacionPromedio,
        percentage: Math.abs(variacionPromedio) * 2 // Escalar para visualización
      };
    });
  }

  getTipoInstrumentoLabel(tipo: number): string {
    const labels: { [key: number]: string } = {
      1: 'Bonos del Tesoro',
      2: 'Certificados de Depósito',
      3: 'Letras del Tesoro',
      4: 'Papel Comercial'
    };
    return labels[tipo] || `Tipo ${tipo}`;
  }

  getCalificacionLabel(calificacion: number): string {
    const labels: { [key: number]: string } = {
      1: 'AAA',
      2: 'AA',
      3: 'A',
      4: 'BBB',
      5: 'BB'
    };
    return labels[calificacion] || `Nivel ${calificacion}`;
  }

  exportReport(): void {
    if (!this.reportResponse) return;
    
    // Generar nombre de archivo oficial SB: L08L0001ddmmaaaa.txt
    const fecha = new Date();
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear().toString();
    const codigoEntidad = '0001'; // O el código real de la entidad
    const nombreArchivo = `L08L${codigoEntidad}${dia}${mes}${anio}.txt`;
    
    // Llamar al endpoint de exportación del backend
    this.l08Service.exportL08Txt(this.filters.fechaInicio, this.filters.fechaFin).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = nombreArchivo;
        a.click();
        window.URL.revokeObjectURL(url);
        console.log('Archivo exportado:', nombreArchivo);
      },
      error: (error) => {
        console.error('Error exportando reporte:', error);
        alert('Error al exportar el reporte');
      }
    });
  }

  refreshData(): void {
    this.loadL08Data();
  }
} 
