import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-l08-historico',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ChartModule,
    TableModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    TagModule
  ],
  template: `
    <div class="historico-container">
      <!-- Filtros de Historial -->
      <p-card header="Filtros de Historial" styleClass="filters-card">
        <div class="filters-grid">
          <div class="filter-group">
            <label>Fecha Desde:</label>
            <p-calendar 
              [(ngModel)]="fechaDesde" 
              dateFormat="dd/mm/yy"
              placeholder="Seleccionar fecha"
            ></p-calendar>
          </div>
          <div class="filter-group">
            <label>Fecha Hasta:</label>
            <p-calendar 
              [(ngModel)]="fechaHasta" 
              dateFormat="dd/mm/yy"
              placeholder="Seleccionar fecha"
            ></p-calendar>
          </div>
          <div class="filter-group">
            <label>Entidad:</label>
            <p-dropdown 
              [options]="entidades" 
              [(ngModel)]="entidadSeleccionada" 
              optionLabel="label"
              placeholder="Todas las entidades"
            ></p-dropdown>
          </div>
          <div class="filter-group">
            <p-button 
              label="Buscar" 
              icon="pi pi-search"
              (onClick)="buscarHistorial()"
            ></p-button>
          </div>
        </div>
      </p-card>

      <!-- Gráfico de Tendencia Histórica -->
      <p-card header="Tendencia Histórica de Liquidez" styleClass="trend-card">
        <p-chart 
          type="line" 
          [data]="tendenciaChartData" 
          [options]="tendenciaChartOptions"
          [style]="{'height': '400px'}"
        ></p-chart>
      </p-card>

      <!-- Tabla de Historial -->
      <p-card header="Historial de Reportes L08" styleClass="history-card">
        <p-table [value]="historialReportes" [paginator]="true" [rows]="10">
          <ng-template pTemplate="header">
            <tr>
              <th>Fecha Reporte</th>
              <th>Entidad</th>
              <th>Total Registros</th>
              <th>Liquidez Total</th>
              <th>Variación Semanal</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-item>
            <tr>
              <td>{{ formatearFecha(item.fechaReporte) }}</td>
              <td>{{ item.entidad }}</td>
              <td>{{ item.totalRegistros }}</td>
              <td>{{ formatearMoneda(item.liquidezTotal) }}</td>
              <td>
                <span [class]="getVariacionClass(item.variacionSemanal)">
                  {{ formatearPorcentaje(item.variacionSemanal) }}
                </span>
              </td>
              <td>
                <p-tag 
                  [value]="item.estado" 
                  [severity]="getSeverityEstado(item.estado)"
                ></p-tag>
              </td>
              <td>
                <p-button 
                  icon="pi pi-eye" 
                  size="small" 
                  severity="info"
                  pTooltip="Ver detalles"
                  (onClick)="verDetalles(item)"
                ></p-button>
                <p-button 
                  icon="pi pi-download" 
                  size="small" 
                  severity="success"
                  pTooltip="Descargar reporte"
                  class="ml-1"
                  (onClick)="descargarReporte(item)"
                ></p-button>
              </td>
            </tr>
          </ng-template>
        </p-table>
      </p-card>

      <!-- Resumen Histórico -->
      <p-card header="Resumen Histórico" styleClass="summary-card">
        <div class="summary-grid">
          <div class="summary-item">
            <div class="summary-value">{{ resumen.totalReportes }}</div>
            <div class="summary-label">Total Reportes</div>
          </div>
          <div class="summary-item">
            <div class="summary-value">{{ formatearMoneda(resumen.liquidezPromedio) }}</div>
            <div class="summary-label">Liquidez Promedio</div>
          </div>
          <div class="summary-item">
            <div class="summary-value">{{ formatearPorcentaje(resumen.variacionPromedio) }}</div>
            <div class="summary-label">Variación Promedio</div>
          </div>
          <div class="summary-item">
            <div class="summary-value">{{ resumen.periodoAnalisis }}</div>
            <div class="summary-label">Período Análisis</div>
          </div>
        </div>
      </p-card>
    </div>
  `,
  styles: [`
    .historico-container {
      padding: 1rem;
    }

    .filters-card, .trend-card, .history-card, .summary-card {
      margin-bottom: 1rem;
    }

    .filters-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
      align-items: end;
    }

    .filter-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .filter-group label {
      font-weight: 600;
      color: #374151;
    }

    .summary-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }

    .summary-item {
      text-align: center;
      padding: 1rem;
      border-radius: 8px;
      background: #f8f9fa;
      border: 1px solid #e9ecef;
    }

    .summary-value {
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
      color: #374151;
    }

    .summary-label {
      color: #6b7280;
      font-size: 0.875rem;
    }

    .variacion-positiva {
      color: #22c55e;
      font-weight: bold;
    }

    .variacion-negativa {
      color: #ef4444;
      font-weight: bold;
    }

    .variacion-neutral {
      color: #6b7280;
      font-weight: bold;
    }

    :host ::ng-deep .p-card .p-card-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 8px 8px 0 0;
    }

    :host ::ng-deep .p-card .p-card-body {
      padding: 1.5rem;
    }

    .ml-1 {
      margin-left: 0.25rem;
    }
  `]
})
export class L08HistoricoComponent implements OnInit {

  fechaDesde: Date | null = null;
  fechaHasta: Date | null = null;
  entidadSeleccionada: any = null;

  entidades: any[] = [];
  
  tendenciaChartData: any;
  tendenciaChartOptions: any;
  
  historialReportes: any[] = [];
  
  resumen: any = {
    totalReportes: 0,
    liquidezPromedio: 0,
    variacionPromedio: 0,
    periodoAnalisis: ''
  };

  constructor() {}

  ngOnInit(): void {
    this.inicializarDatos();
    this.cargarDatosSimulados();
  }

  inicializarDatos(): void {
    this.entidades = [
      { label: 'Todas las entidades', value: null },
      { label: 'Banco A', value: 'Banco A' },
      { label: 'Banco B', value: 'Banco B' },
      { label: 'Banco C', value: 'Banco C' },
      { label: 'Banco D', value: 'Banco D' },
      { label: 'Banco E', value: 'Banco E' }
    ];

    // Establecer fechas por defecto (últimos 3 meses)
    const hoy = new Date();
    this.fechaHasta = hoy;
    this.fechaDesde = new Date(hoy.getFullYear(), hoy.getMonth() - 3, hoy.getDate());
  }

  cargarDatosSimulados(): void {
    this.historialReportes = [
      {
        fechaReporte: '2024-01-15',
        entidad: 'Banco A',
        totalRegistros: 25,
        liquidezTotal: 1200000,
        variacionSemanal: 4.17,
        estado: 'Aprobado'
      },
      {
        fechaReporte: '2024-01-08',
        entidad: 'Banco A',
        totalRegistros: 25,
        liquidezTotal: 1150000,
        variacionSemanal: 2.50,
        estado: 'Aprobado'
      },
      {
        fechaReporte: '2024-01-01',
        entidad: 'Banco A',
        totalRegistros: 25,
        liquidezTotal: 1120000,
        variacionSemanal: -1.20,
        estado: 'Aprobado'
      },
      {
        fechaReporte: '2024-01-15',
        entidad: 'Banco B',
        totalRegistros: 20,
        liquidezTotal: 1000000,
        variacionSemanal: -2.00,
        estado: 'En Revisión'
      },
      {
        fechaReporte: '2024-01-08',
        entidad: 'Banco B',
        totalRegistros: 20,
        liquidezTotal: 1020000,
        variacionSemanal: 1.50,
        estado: 'Aprobado'
      },
      {
        fechaReporte: '2024-01-01',
        entidad: 'Banco B',
        totalRegistros: 20,
        liquidezTotal: 1005000,
        variacionSemanal: 0.50,
        estado: 'Aprobado'
      }
    ];

    this.resumen = {
      totalReportes: 6,
      liquidezPromedio: 1082500,
      variacionPromedio: 0.91,
      periodoAnalisis: '3 meses'
    };

    this.actualizarGraficoTendencia();
  }

  buscarHistorial(): void {
    console.log('Buscando historial...', {
      fechaDesde: this.fechaDesde,
      fechaHasta: this.fechaHasta,
      entidad: this.entidadSeleccionada
    });
    
    // Aquí se haría la llamada al servicio real
    this.actualizarGraficoTendencia();
  }

  actualizarGraficoTendencia(): void {
    const fechas = this.historialReportes
      .map(item => new Date(item.fechaReporte))
      .sort((a, b) => a.getTime() - b.getTime())
      .map(fecha => fecha.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' }));

    const liquidezBancoA = [1120000, 1150000, 1200000];
    const liquidezBancoB = [1005000, 1020000, 1000000];

    this.tendenciaChartData = {
      labels: fechas,
      datasets: [
        {
          label: 'Banco A',
          data: liquidezBancoA,
          borderColor: 'rgba(102, 126, 234, 1)',
          backgroundColor: 'rgba(102, 126, 234, 0.1)',
          tension: 0.4,
          fill: false
        },
        {
          label: 'Banco B',
          data: liquidezBancoB,
          borderColor: 'rgba(118, 75, 162, 1)',
          backgroundColor: 'rgba(118, 75, 162, 0.1)',
          tension: 0.4,
          fill: false
        }
      ]
    };

    this.tendenciaChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value: any) {
              return new Intl.NumberFormat('es-ES', {
                style: 'currency',
                currency: 'DOP',
                minimumFractionDigits: 0
              }).format(value);
            }
          }
        }
      },
      plugins: {
        legend: {
          position: 'top' as const,
          labels: {
            usePointStyle: true,
            padding: 20
          }
        },
        tooltip: {
          callbacks: {
            label: function(context: any) {
              return context.dataset.label + ': ' + 
                     new Intl.NumberFormat('es-ES', {
                       style: 'currency',
                       currency: 'DOP'
                     }).format(context.parsed.y);
            }
          }
        }
      }
    };
  }

  verDetalles(item: any): void {
    console.log('Ver detalles del reporte:', item);
    // Aquí se abriría un modal con los detalles
  }

  descargarReporte(item: any): void {
    console.log('Descargando reporte:', item);
    // Aquí se generaría y descargaría el reporte
  }

  formatearFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString('es-ES');
  }

  formatearMoneda(valor: number): string {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'DOP',
      minimumFractionDigits: 0
    }).format(valor);
  }

  formatearPorcentaje(valor: number): string {
    return valor.toFixed(2) + '%';
  }

  getVariacionClass(variacion: number): string {
    if (variacion > 0) return 'variacion-positiva';
    if (variacion < 0) return 'variacion-negativa';
    return 'variacion-neutral';
  }

  getSeverityEstado(estado: string): "success" | "secondary" | "info" | "warn" | "danger" | "contrast" | undefined {
    switch (estado) {
      case 'Aprobado': return 'success';
      case 'En Revisión': return 'warn';
      case 'Rechazado': return 'danger';
      case 'Pendiente': return 'info';
      default: return 'secondary';
    }
  }
}
