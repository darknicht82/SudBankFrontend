import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-l08-charts',
  standalone: true,
  imports: [CommonModule, ChartModule, CardModule, ButtonModule, DropdownModule],
  template: `
    <div class="charts-container">
      <!-- Gráfico de Línea - Evolución Semanal -->
      <p-card header="Evolución Semanal de Liquidez" styleClass="chart-card">
        <p-chart 
          type="line" 
          [data]="lineChartData" 
          [options]="lineChartOptions"
          [style]="{'height': '300px'}"
        ></p-chart>
      </p-card>

      <!-- Gráfico de Barras - Comparación por Tipo de Instrumento -->
      <p-card header="Liquidez por Tipo de Instrumento" styleClass="chart-card">
        <p-chart 
          type="bar" 
          [data]="barChartData" 
          [options]="barChartOptions"
          [style]="{'height': '300px'}"
        ></p-chart>
      </p-card>

      <!-- Gráfico de Dona - Distribución por Calificación -->
      <p-card header="Distribución por Calificación" styleClass="chart-card">
        <p-chart 
          type="doughnut" 
          [data]="doughnutChartData" 
          [options]="doughnutChartOptions"
          [style]="{'height': '300px'}"
        ></p-chart>
      </p-card>

      <!-- Gráfico de Radar - KPIs de Liquidez -->
      <p-card header="KPIs de Liquidez" styleClass="chart-card">
        <p-chart 
          type="radar" 
          [data]="radarChartData" 
          [options]="radarChartOptions"
          [style]="{'height': '300px'}"
        ></p-chart>
      </p-card>
    </div>
  `,
  styles: [`
    .charts-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
      gap: 1rem;
      padding: 1rem;
    }

    .chart-card {
      margin-bottom: 1rem;
    }

    :host ::ng-deep .p-card {
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      border-radius: 8px;
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
export class L08ChartsComponent implements OnInit, OnChanges {
  
  @Input() datosL08: any[] = [];
  @Input() fechaInicio: string = '';
  @Input() fechaFin: string = '';

  // Datos para gráfico de línea
  lineChartData: any;
  lineChartOptions: any;

  // Datos para gráfico de barras
  barChartData: any;
  barChartOptions: any;

  // Datos para gráfico de dona
  doughnutChartData: any;
  doughnutChartOptions: any;

  // Datos para gráfico de radar
  radarChartData: any;
  radarChartOptions: any;

  constructor() {}

  ngOnInit(): void {
    this.inicializarGraficos();
    this.actualizarDatos();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['datosL08'] || changes['fechaInicio'] || changes['fechaFin']) {
      this.actualizarDatos();
    }
  }

  inicializarGraficos(): void {
    // Configuración común para todos los gráficos
    const commonOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top' as const,
          labels: {
            usePointStyle: true,
            padding: 20
          }
        }
      }
    };

    // Gráfico de línea
    this.lineChartOptions = {
      ...commonOptions,
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
        ...commonOptions.plugins,
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

    // Gráfico de barras
    this.barChartOptions = {
      ...commonOptions,
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
      }
    };

    // Gráfico de dona
    this.doughnutChartOptions = {
      ...commonOptions,
      plugins: {
        ...commonOptions.plugins,
        tooltip: {
          callbacks: {
            label: function(context: any) {
              const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
              const percentage = ((context.parsed / total) * 100).toFixed(1);
              return context.label + ': ' + 
                     new Intl.NumberFormat('es-ES', {
                       style: 'currency',
                       currency: 'DOP'
                     }).format(context.parsed) + 
                     ' (' + percentage + '%)';
            }
          }
        }
      }
    };

    // Gráfico de radar
    this.radarChartOptions = {
      ...commonOptions,
      scales: {
        r: {
          beginAtZero: true,
          ticks: {
            callback: function(value: any) {
              return value + '%';
            }
          }
        }
      }
    };
  }

  actualizarDatos(): void {
    if (this.datosL08.length === 0) {
      this.cargarDatosSimulados();
    }

    this.actualizarGraficoLinea();
    this.actualizarGraficoBarras();
    this.actualizarGraficoDona();
    this.actualizarGraficoRadar();
  }

  cargarDatosSimulados(): void {
    // Datos simulados para desarrollo
    this.datosL08 = [
      {
        id: 1,
        codigoLiquidez: 130505,
        identificacionEntidad: 'Banco A',
        tipoInstrumento: 'Depósitos',
        calificacionEntidad: 'A',
        fechaReporte: '2024-01-15',
        valorLunes: 1000000,
        valorMartes: 1050000,
        valorMiercoles: 1100000,
        valorJueves: 1150000,
        valorViernes: 1200000
      },
      {
        id: 2,
        codigoLiquidez: 888888,
        identificacionEntidad: 'Banco B',
        tipoInstrumento: 'Préstamos',
        calificacionEntidad: 'B',
        fechaReporte: '2024-01-15',
        valorLunes: 800000,
        valorMartes: 850000,
        valorMiercoles: 900000,
        valorJueves: 950000,
        valorViernes: 1000000
      },
      {
        id: 3,
        codigoLiquidez: 777777,
        identificacionEntidad: 'Banco C',
        tipoInstrumento: 'Inversiones',
        calificacionEntidad: 'A',
        fechaReporte: '2024-01-15',
        valorLunes: 1200000,
        valorMartes: 1250000,
        valorMiercoles: 1300000,
        valorJueves: 1350000,
        valorViernes: 1400000
      }
    ];
  }

  actualizarGraficoLinea(): void {
    const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
    const datasets = this.datosL08.map((item, index) => ({
      label: `${item.identificacionEntidad} - ${item.tipoInstrumento}`,
      data: [
        item.valorLunes,
        item.valorMartes,
        item.valorMiercoles,
        item.valorJueves,
        item.valorViernes
      ],
      borderColor: this.obtenerColor(index),
      backgroundColor: this.obtenerColor(index, 0.1),
      tension: 0.4,
      fill: false
    }));

    this.lineChartData = {
      labels: dias,
      datasets: datasets
    };
  }

  actualizarGraficoBarras(): void {
    const tiposInstrumento = [...new Set(this.datosL08.map(item => item.tipoInstrumento))];
    const datasets = tiposInstrumento.map((tipo, index) => {
      const datosTipo = this.datosL08.filter(item => item.tipoInstrumento === tipo);
      const totalViernes = datosTipo.reduce((sum, item) => sum + item.valorViernes, 0);
      
      return {
        label: tipo,
        data: [totalViernes],
        backgroundColor: this.obtenerColor(index),
        borderColor: this.obtenerColor(index),
        borderWidth: 1
      };
    });

    this.barChartData = {
      labels: ['Valor Total Viernes'],
      datasets: datasets
    };
  }

  actualizarGraficoDona(): void {
    const calificaciones = [...new Set(this.datosL08.map(item => item.calificacionEntidad))];
    const datos = calificaciones.map(cal => {
      const itemsCal = this.datosL08.filter(item => item.calificacionEntidad === cal);
      return itemsCal.reduce((sum, item) => sum + item.valorViernes, 0);
    });

    this.doughnutChartData = {
      labels: calificaciones.map(cal => `Calificación ${cal}`),
      datasets: [{
        data: datos,
        backgroundColor: calificaciones.map((_, index) => this.obtenerColor(index)),
        borderWidth: 2,
        borderColor: '#ffffff'
      }]
    };
  }

  actualizarGraficoRadar(): void {
    const kpis = [
      'Cumplimiento Normativo',
      'Liquidez Semanal',
      'Variación Promedio',
      'Concentración de Riesgo',
      'Diversificación'
    ];

    const valores = [
      this.calcularCumplimientoNormativo(),
      this.calcularLiquidezSemanal(),
      this.calcularVariacionPromedio(),
      this.calcularConcentracionRiesgo(),
      this.calcularDiversificacion()
    ];

    this.radarChartData = {
      labels: kpis,
      datasets: [{
        label: 'KPIs L08',
        data: valores,
        backgroundColor: 'rgba(102, 126, 234, 0.2)',
        borderColor: 'rgba(102, 126, 234, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(102, 126, 234, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(102, 126, 234, 1)'
      }]
    };
  }

  // Métodos de cálculo para KPIs
  calcularCumplimientoNormativo(): number {
    // Simulación: 85% de cumplimiento
    return 85;
  }

  calcularLiquidezSemanal(): number {
    const totalLiquidez = this.datosL08.reduce((sum, item) => sum + item.valorViernes, 0);
    const liquidezPromedio = totalLiquidez / this.datosL08.length;
    // Normalizar a escala 0-100
    return Math.min(100, (liquidezPromedio / 1000000) * 10);
  }

  calcularVariacionPromedio(): number {
    const variaciones = this.datosL08.map(item => {
      const variacion = ((item.valorViernes - item.valorLunes) / item.valorLunes) * 100;
      return Math.abs(variacion);
    });
    return variaciones.reduce((sum, val) => sum + val, 0) / variaciones.length;
  }

  calcularConcentracionRiesgo(): number {
    // Simulación: 30% de concentración (bajo riesgo)
    return 30;
  }

  calcularDiversificacion(): number {
    const tiposUnicos = new Set(this.datosL08.map(item => item.tipoInstrumento)).size;
    const calificacionesUnicas = new Set(this.datosL08.map(item => item.calificacionEntidad)).size;
    // Normalizar diversificación
    return Math.min(100, ((tiposUnicos + calificacionesUnicas) / 2) * 25);
  }

  obtenerColor(index: number, alpha: number = 1): string {
    const colores = [
      `rgba(102, 126, 234, ${alpha})`,   // Azul
      `rgba(118, 75, 162, ${alpha})`,   // Púrpura
      `rgba(255, 99, 132, ${alpha})`,   // Rosa
      `rgba(54, 162, 235, ${alpha})`,   // Azul claro
      `rgba(255, 206, 86, ${alpha})`,   // Amarillo
      `rgba(75, 192, 192, ${alpha})`,   // Turquesa
      `rgba(153, 102, 255, ${alpha})`,  // Violeta
      `rgba(255, 159, 64, ${alpha})`    // Naranja
    ];
    return colores[index % colores.length];
  }
} 
