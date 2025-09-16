import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-l08-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    TagModule,
    TooltipModule
  ],
  template: `
    <p-card header="Datos del Reporte L08" styleClass="table-card">
      <div class="table-container">
        <p-table 
          #dt
          [value]="datosL08" 
          [paginator]="true" 
          [rows]="10"
          [showCurrentPageReport]="true"
          [tableStyle]="{'min-width': '50rem'}"
          [rowsPerPageOptions]="[5, 10, 25, 50]"
          currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} registros"
          [globalFilterFields]="['codigoLiquidez', 'identificacionEntidad', 'tipoInstrumento', 'calificacionEntidad']"
          [loading]="cargando"
          styleClass="p-datatable-sm"
        >
          <!-- Filtro global -->
          <ng-template pTemplate="caption">
            <div class="flex justify-content-end">
              <span class="p-input-icon-left">
                <i class="pi pi-search"></i>
                <input 
                  pInputText 
                  type="text" 
                  placeholder="Buscar..." 
                  (input)="dt.filterGlobal(($any($event.target).value), 'contains')"
                  style="width: auto"
                />
              </span>
            </div>
          </ng-template>

          <!-- Columna Código -->
          <ng-template pTemplate="header" let-columns>
            <tr>
              <th>Código Liquidez</th>
              <th>Tipo Identificación</th>
              <th>Identificación Entidad</th>
              <th>Tipo Instrumento</th>
              <th>Calificación Entidad</th>
              <th>Calificadora Riesgo</th>
              <th>Lunes</th>
              <th>Martes</th>
              <th>Miércoles</th>
              <th>Jueves</th>
              <th>Viernes</th>
              <th>Fecha Reporte</th>
              <th>Entidad Código</th>
            </tr>
          </ng-template>

          <!-- Filas de datos -->
          <ng-template pTemplate="body" let-item>
            <tr>
              <td>{{ item.codigoLiquidez }}</td>
              <td>{{ item.tipoIdentificacion }}</td>
              <td>{{ item.identificacionEntidad }}</td>
              <td>{{ item.tipoInstrumento }}</td>
              <td>{{ item.calificacionEntidad }}</td>
              <td>{{ item.calificadoraRiesgo }}</td>
              <td>{{ item.valorLunes }}</td>
              <td>{{ item.valorMartes }}</td>
              <td>{{ item.valorMiercoles }}</td>
              <td>{{ item.valorJueves }}</td>
              <td>{{ item.valorViernes }}</td>
              <td>{{ item.fechaReporte }}</td>
              <td>{{ item.entidadCodigo }}</td>
            </tr>
          </ng-template>

          <!-- Resumen -->
          <ng-template pTemplate="footer">
            <tr>
              <td colspan="5" class="text-right font-bold">TOTALES:</td>
              <td class="text-right font-bold">{{ formatearMoneda(calcularTotal('valorLunes')) }}</td>
              <td class="text-right font-bold">{{ formatearMoneda(calcularTotal('valorMartes')) }}</td>
              <td class="text-right font-bold">{{ formatearMoneda(calcularTotal('valorMiercoles')) }}</td>
              <td class="text-right font-bold">{{ formatearMoneda(calcularTotal('valorJueves')) }}</td>
              <td class="text-right font-bold">{{ formatearMoneda(calcularTotal('valorViernes')) }}</td>
              <td class="text-right font-bold">{{ formatearPorcentaje(calcularVariacionPromedio()) }}</td>
              <td></td>
            </tr>
          </ng-template>

          <!-- Sin datos -->
          <ng-template pTemplate="emptymessage">
            <tr>
              <td colspan="12" class="text-center p-4">
                <i class="pi pi-inbox" style="font-size: 3rem; color: #ccc;"></i>
                <p class="mt-2">No se encontraron datos para mostrar</p>
              </td>
            </tr>
          </ng-template>
        </p-table>
      </div>

      <!-- Leyenda de catálogos -->
      <div class="leyenda-catalogos" style="margin-top:1rem;font-size:0.95em;color:#334155;">
        <strong>Leyenda de Códigos:</strong><br>
        <u>Tipo Instrumento</u>: 1=Depósitos, 2=Préstamos, 3=Inversiones, ...<br>
        <u>Calificación</u>: 1=A, 2=B, 3=C, 4=D, ...<br>
        <u>Calificadora</u>: 1=Fitch, 2=Moody's, 3=S&P, ...<br>
      </div>
    </p-card>
  `,
  styles: [`
    .table-card {
      margin: 1rem;
    }

    .table-container {
      overflow-x: auto;
    }

    :host ::ng-deep .p-datatable .p-datatable-thead > tr > th {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      font-weight: 600;
      text-align: center;
    }

    :host ::ng-deep .p-datatable .p-datatable-tbody > tr:nth-child(even) {
      background-color: #f8f9fa;
    }

    :host ::ng-deep .p-datatable .p-datatable-tbody > tr:hover {
      background-color: #e3f2fd;
    }

    .text-right {
      text-align: right;
    }

    .font-bold {
      font-weight: bold;
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
export class L08TableComponent implements OnInit {
  
  @ViewChild('dt') dt!: Table;
  @Input() datosL08: any[] = [];
  @Input() cargando: boolean = false;

  constructor() {}

  ngOnInit(): void {
    if (this.datosL08.length === 0) {
      this.cargarDatosSimulados();
    }
  }

  cargarDatosSimulados(): void {
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
      },
      {
        id: 4,
        codigoLiquidez: 666666,
        identificacionEntidad: 'Banco D',
        tipoInstrumento: 'Depósitos',
        calificacionEntidad: 'C',
        fechaReporte: '2024-01-15',
        valorLunes: 500000,
        valorMartes: 480000,
        valorMiercoles: 460000,
        valorJueves: 440000,
        valorViernes: 420000
      },
      {
        id: 5,
        codigoLiquidez: 555555,
        identificacionEntidad: 'Banco E',
        tipoInstrumento: 'Préstamos',
        calificacionEntidad: 'A',
        fechaReporte: '2024-01-15',
        valorLunes: 1500000,
        valorMartes: 1550000,
        valorMiercoles: 1600000,
        valorJueves: 1650000,
        valorViernes: 1700000
      }
    ];
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

  formatearFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString('es-ES');
  }

  calcularVariacion(item: any): number {
    return ((item.valorViernes - item.valorLunes) / item.valorLunes) * 100;
  }

  calcularVariacionPromedio(): number {
    const variaciones = this.datosL08.map(item => this.calcularVariacion(item));
    return variaciones.reduce((sum, val) => sum + val, 0) / variaciones.length;
  }

  calcularTotal(campo: string): number {
    return this.datosL08.reduce((sum, item) => sum + item[campo], 0);
  }

  getVariacionClass(item: any): string {
    const variacion = this.calcularVariacion(item);
    if (variacion > 0) return 'variacion-positiva';
    if (variacion < 0) return 'variacion-negativa';
    return 'variacion-neutral';
  }

  getEstado(item: any): string {
    const variacion = this.calcularVariacion(item);
    if (variacion > 5) return 'Excelente';
    if (variacion > 0) return 'Bueno';
    if (variacion > -5) return 'Estable';
    return 'Requiere Atención';
  }

  getSeverityTipo(tipo: string): "success" | "secondary" | "info" | "warn" | "danger" | "contrast" | undefined {
    switch (tipo) {
      case 'Depósitos': return 'success';
      case 'Préstamos': return 'warn';
      case 'Inversiones': return 'info';
      default: return 'secondary';
    }
  }

  getSeverityCalificacion(calificacion: string): "success" | "secondary" | "info" | "warn" | "danger" | "contrast" | undefined {
    switch (calificacion) {
      case 'A': return 'success';
      case 'B': return 'warn';
      case 'C': return 'danger';
      case 'D': return 'danger';
      default: return 'secondary';
    }
  }

  getSeverityEstado(item: any): "success" | "secondary" | "info" | "warn" | "danger" | "contrast" | undefined {
    const variacion = this.calcularVariacion(item);
    if (variacion > 5) return 'success';
    if (variacion > 0) return 'info';
    if (variacion > -5) return 'warn';
    return 'danger';
  }

  getTipoInstrumentoDesc(tipo: number): string {
    switch(tipo) {
      case 1: return 'Depósitos';
      case 2: return 'Préstamos';
      case 3: return 'Inversiones';
      default: return 'Otro';
    }
  }

  getCalificacionDesc(cal: number): string {
    switch(cal) {
      case 1: return 'A';
      case 2: return 'B';
      case 3: return 'C';
      case 4: return 'D';
      default: return 'N/A';
    }
  }

  getCalificadoraDesc(calif: number): string {
    switch(calif) {
      case 1: return 'Fitch';
      case 2: return "Moody's";
      case 3: return 'S&P';
      default: return 'Otra';
    }
  }
}
