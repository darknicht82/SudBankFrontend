import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-l08-comparar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ChartModule,
    DropdownModule,
    ButtonModule,
    TableModule,
    TagModule
  ],
  template: `
    <div class="comparar-container">
      <!-- Controles de Comparación -->
      <p-card header="Controles de Comparación" styleClass="controls-card">
        <div class="controls-grid">
          <div class="control-group">
            <label>Período 1:</label>
            <p-dropdown 
              [options]="periodos" 
              [(ngModel)]="periodo1" 
              optionLabel="label"
              placeholder="Seleccionar período 1"
            ></p-dropdown>
          </div>
          <div class="control-group">
            <label>Período 2:</label>
            <p-dropdown 
              [options]="periodos" 
              [(ngModel)]="periodo2" 
              optionLabel="label"
              placeholder="Seleccionar período 2"
            ></p-dropdown>
          </div>
          <div class="control-group">
            <label>Tipo de Comparación:</label>
            <p-dropdown 
              [options]="tiposComparacion" 
              [(ngModel)]="tipoComparacion" 
              optionLabel="label"
              placeholder="Seleccionar tipo"
            ></p-dropdown>
          </div>
          <div class="control-group">
            <p-button 
              label="Comparar" 
              icon="pi pi-search"
              (onClick)="realizarComparacion()"
            ></p-button>
          </div>
        </div>
      </p-card>

      <!-- Gráfico Comparativo -->
      <p-card header="Comparación Gráfica" styleClass="chart-card">
        <p-chart 
          type="bar" 
          [data]="comparacionChartData" 
          [options]="comparacionChartOptions"
          [style]="{'height': '400px'}"
        ></p-chart>
      </p-card>

      <!-- Tabla de Comparación -->
      <p-card header="Comparación Detallada" styleClass="table-card">
        <p-table [value]="datosComparacion" [paginator]="true" [rows]="10">
          <ng-template pTemplate="header">
            <tr>
              <th>Entidad</th>
              <th>Período 1</th>
              <th>Período 2</th>
              <th>Diferencia</th>
              <th>Variación %</th>
              <th>Tendencia</th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-item>
            <tr>
              <td>{{ item.entidad }}</td>
              <td>{{ formatearMoneda(item.periodo1) }}</td>
              <td>{{ formatearMoneda(item.periodo2) }}</td>
              <td>{{ formatearMoneda(item.diferencia) }}</td>
              <td>
                <span [class]="getVariacionClass(item.variacion)">
                  {{ formatearPorcentaje(item.variacion) }}
                </span>
              </td>
              <td>
                <p-tag 
                  [value]="item.tendencia" 
                  [severity]="getSeverityTendencia(item.tendencia)"
                ></p-tag>
              </td>
            </tr>
          </ng-template>
        </p-table>
      </p-card>

      <!-- Resumen de Comparación -->
      <p-card header="Resumen de Comparación" styleClass="summary-card">
        <div class="summary-grid">
          <div class="summary-item">
            <div class="summary-value">{{ resumen.totalEntidades }}</div>
            <div class="summary-label">Total Entidades</div>
          </div>
          <div class="summary-item">
            <div class="summary-value success">{{ resumen.entidadesMejoradas }}</div>
            <div class="summary-label">Mejoradas</div>
          </div>
          <div class="summary-item">
            <div class="summary-value warning">{{ resumen.entidadesEstables }}</div>
            <div class="summary-label">Estables</div>
          </div>
          <div class="summary-item">
            <div class="summary-value danger">{{ resumen.entidadesDeterioradas }}</div>
            <div class="summary-label">Deterioradas</div>
          </div>
        </div>
      </p-card>
    </div>
  `,
  styles: [`
    .comparar-container {
      padding: 1rem;
    }

    .controls-card, .chart-card, .table-card, .summary-card {
      margin-bottom: 1rem;
    }

    .controls-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
      align-items: end;
    }

    .control-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .control-group label {
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
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }

    .summary-value.success {
      color: #22c55e;
    }

    .summary-value.warning {
      color: #f59e0b;
    }

    .summary-value.danger {
      color: #ef4444;
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
  `]
})
export class L08CompararComponent implements OnInit {

  periodos: any[] = [];
  tiposComparacion: any[] = [];
  
  periodo1: any = null;
  periodo2: any = null;
  tipoComparacion: any = null;

  comparacionChartData: any;
  comparacionChartOptions: any;
  
  datosComparacion: any[] = [];
  
  resumen: any = {
    totalEntidades: 0,
    entidadesMejoradas: 0,
    entidadesEstables: 0,
    entidadesDeterioradas: 0
  };

  constructor() {}

  ngOnInit(): void {
    this.inicializarDatos();
    this.cargarDatosSimulados();
  }

  inicializarDatos(): void {
    this.periodos = [
      { label: 'Semana 1 (8-12 Ene)', value: 'semana1' },
      { label: 'Semana 2 (15-19 Ene)', value: 'semana2' },
      { label: 'Semana 3 (22-26 Ene)', value: 'semana3' },
      { label: 'Semana 4 (29 Ene-2 Feb)', value: 'semana4' }
    ];

    this.tiposComparacion = [
      { label: 'Liquidez Total', value: 'liquidez_total' },
      { label: 'Por Tipo de Instrumento', value: 'tipo_instrumento' },
      { label: 'Por Calificación', value: 'calificacion' },
      { label: 'Variación Semanal', value: 'variacion_semanal' }
    ];

    this.periodo1 = this.periodos[0];
    this.periodo2 = this.periodos[1];
    this.tipoComparacion = this.tiposComparacion[0];
  }

  cargarDatosSimulados(): void {
    this.datosComparacion = [
      {
        entidad: 'Banco A',
        periodo1: 1200000,
        periodo2: 1250000,
        diferencia: 50000,
        variacion: 4.17,
        tendencia: 'Mejorada'
      },
      {
        entidad: 'Banco B',
        periodo1: 1000000,
        periodo2: 980000,
        diferencia: -20000,
        variacion: -2.00,
        tendencia: 'Deteriorada'
      },
      {
        entidad: 'Banco C',
        periodo1: 1400000,
        periodo2: 1400000,
        diferencia: 0,
        variacion: 0.00,
        tendencia: 'Estable'
      },
      {
        entidad: 'Banco D',
        periodo1: 420000,
        periodo2: 450000,
        diferencia: 30000,
        variacion: 7.14,
        tendencia: 'Mejorada'
      },
      {
        entidad: 'Banco E',
        periodo1: 1700000,
        periodo2: 1680000,
        diferencia: -20000,
        variacion: -1.18,
        tendencia: 'Deteriorada'
      }
    ];

    this.resumen = {
      totalEntidades: 5,
      entidadesMejoradas: 2,
      entidadesEstables: 1,
      entidadesDeterioradas: 2
    };

    this.actualizarGraficoComparacion();
  }

  realizarComparacion(): void {
    // Simular comparación
    console.log('Realizando comparación...', {
      periodo1: this.periodo1,
      periodo2: this.periodo2,
      tipo: this.tipoComparacion
    });
    
    // Aquí se haría la llamada al servicio real
    this.actualizarGraficoComparacion();
  }

  actualizarGraficoComparacion(): void {
    const entidades = this.datosComparacion.map(item => item.entidad);
    
    this.comparacionChartData = {
      labels: entidades,
      datasets: [
        {
          label: this.periodo1?.label || 'Período 1',
          data: this.datosComparacion.map(item => item.periodo1),
          backgroundColor: 'rgba(102, 126, 234, 0.8)',
          borderColor: 'rgba(102, 126, 234, 1)',
          borderWidth: 1
        },
        {
          label: this.periodo2?.label || 'Período 2',
          data: this.datosComparacion.map(item => item.periodo2),
          backgroundColor: 'rgba(118, 75, 162, 0.8)',
          borderColor: 'rgba(118, 75, 162, 1)',
          borderWidth: 1
        }
      ]
    };

    this.comparacionChartOptions = {
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

  getSeverityTendencia(tendencia: string): "success" | "secondary" | "info" | "warn" | "danger" | "contrast" | undefined {
    switch (tendencia) {
      case 'Mejorada': return 'success';
      case 'Estable': return 'info';
      case 'Deteriorada': return 'danger';
      default: return 'secondary';
    }
  }
}
