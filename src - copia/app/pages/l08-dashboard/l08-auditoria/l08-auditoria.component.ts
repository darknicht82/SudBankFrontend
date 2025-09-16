import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TimelineModule } from 'primeng/timeline';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-l08-auditoria',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    TableModule,
    ButtonModule,
    TagModule,
    TimelineModule,
    BadgeModule
  ],
  template: `
    <div class="auditoria-container">
      <!-- Resumen de Auditoría -->
      <p-card header="Resumen de Auditoría L08" styleClass="summary-card">
        <div class="summary-grid">
          <div class="summary-item">
            <div class="summary-value">{{ resumen.totalRegistros }}</div>
            <div class="summary-label">Total Registros</div>
          </div>
          <div class="summary-item">
            <div class="summary-value success">{{ resumen.registrosValidos }}</div>
            <div class="summary-label">Registros Válidos</div>
          </div>
          <div class="summary-item">
            <div class="summary-value warning">{{ resumen.registrosConAdvertencias }}</div>
            <div class="summary-label">Con Advertencias</div>
          </div>
          <div class="summary-item">
            <div class="summary-value danger">{{ resumen.registrosConErrores }}</div>
            <div class="summary-label">Con Errores</div>
          </div>
        </div>
      </p-card>

      <!-- Timeline de Auditoría -->
      <p-card header="Historial de Auditoría" styleClass="timeline-card">
        <p-timeline [value]="historialAuditoria" layout="vertical">
          <ng-template pTemplate="content" let-item>
            <div class="timeline-item">
              <div class="timeline-header">
                <h4>{{ item.accion }}</h4>
                <p-tag [value]="item.estado" [severity]="getSeverityEstado(item.estado)"></p-tag>
              </div>
              <p class="timeline-description">{{ item.descripcion }}</p>
              <div class="timeline-meta">
                <small>Usuario: {{ item.usuario }}</small>
                <small>Fecha: {{ formatearFecha(item.fecha) }}</small>
              </div>
            </div>
          </ng-template>
        </p-timeline>
      </p-card>

      <!-- Tabla de Errores y Advertencias -->
      <p-card header="Errores y Advertencias Detectadas" styleClass="errors-card">
        <p-table [value]="erroresAdvertencias" [paginator]="true" [rows]="5">
          <ng-template pTemplate="header">
            <tr>
              <th>Código</th>
              <th>Tipo</th>
              <th>Descripción</th>
              <th>Entidad</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-item>
            <tr>
              <td>{{ item.codigo }}</td>
              <td>
                <p-tag [value]="item.tipo" [severity]="getSeverityTipo(item.tipo)"></p-tag>
              </td>
              <td>{{ item.descripcion }}</td>
              <td>{{ item.entidad }}</td>
              <td>{{ formatearFecha(item.fecha) }}</td>
              <td>
                <p-tag [value]="item.estado" [severity]="getSeverityEstado(item.estado)"></p-tag>
              </td>
              <td>
                <p-button 
                  icon="pi pi-eye" 
                  size="small" 
                  severity="info"
                  pTooltip="Ver detalles"
                ></p-button>
                <p-button 
                  icon="pi pi-check" 
                  size="small" 
                  severity="success"
                  pTooltip="Marcar como resuelto"
                  class="ml-1"
                ></p-button>
              </td>
            </tr>
          </ng-template>
        </p-table>
      </p-card>
    </div>
  `,
  styles: [`
    .auditoria-container {
      padding: 1rem;
    }

    .summary-card, .timeline-card, .errors-card {
      margin-bottom: 1rem;
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

    .timeline-item {
      padding: 1rem;
      border-left: 3px solid #667eea;
      margin-left: 1rem;
      background: #f8f9fa;
      border-radius: 0 8px 8px 0;
    }

    .timeline-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .timeline-header h4 {
      margin: 0;
      color: #374151;
    }

    .timeline-description {
      color: #6b7280;
      margin-bottom: 0.5rem;
    }

    .timeline-meta {
      display: flex;
      justify-content: space-between;
      font-size: 0.75rem;
      color: #9ca3af;
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
export class L08AuditoriaComponent implements OnInit {

  resumen: any = {
    totalRegistros: 0,
    registrosValidos: 0,
    registrosConAdvertencias: 0,
    registrosConErrores: 0
  };

  historialAuditoria: any[] = [];
  erroresAdvertencias: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.cargarDatosSimulados();
  }

  cargarDatosSimulados(): void {
    // Resumen
    this.resumen = {
      totalRegistros: 150,
      registrosValidos: 120,
      registrosConAdvertencias: 25,
      registrosConErrores: 5
    };

    // Historial de auditoría
    this.historialAuditoria = [
      {
        accion: 'Validación de Datos L08',
        estado: 'Completado',
        descripcion: 'Se validaron 150 registros del reporte L08. Se encontraron 25 advertencias y 5 errores críticos.',
        usuario: 'admin@sudbank.com',
        fecha: '2024-01-15T10:30:00'
      },
      {
        accion: 'Corrección de Inconsistencias',
        estado: 'En Proceso',
        descripcion: 'Se están corrigiendo las inconsistencias detectadas en los datos de liquidez.',
        usuario: 'analista@sudbank.com',
        fecha: '2024-01-15T09:15:00'
      },
      {
        accion: 'Revisión de Calificaciones',
        estado: 'Completado',
        descripcion: 'Se revisaron las calificaciones de riesgo de todas las entidades reportadas.',
        usuario: 'riesgos@sudbank.com',
        fecha: '2024-01-15T08:45:00'
      },
      {
        accion: 'Generación de Reporte',
        estado: 'Completado',
        descripcion: 'Se generó el reporte L08 para la semana del 15 de enero de 2024.',
        usuario: 'sistema@sudbank.com',
        fecha: '2024-01-15T08:00:00'
      }
    ];

    // Errores y advertencias
    this.erroresAdvertencias = [
      {
        codigo: 'ERR-001',
        tipo: 'Error',
        descripcion: 'Valor de liquidez inconsistente entre días consecutivos',
        entidad: 'Banco A',
        fecha: '2024-01-15T10:30:00',
        estado: 'Pendiente'
      },
      {
        codigo: 'WARN-001',
        tipo: 'Advertencia',
        descripcion: 'Variación semanal superior al 10%',
        entidad: 'Banco B',
        fecha: '2024-01-15T10:25:00',
        estado: 'En Revisión'
      },
      {
        codigo: 'ERR-002',
        tipo: 'Error',
        descripcion: 'Calificación de riesgo no válida',
        entidad: 'Banco C',
        fecha: '2024-01-15T10:20:00',
        estado: 'Resuelto'
      },
      {
        codigo: 'WARN-002',
        tipo: 'Advertencia',
        descripcion: 'Datos faltantes para el día miércoles',
        entidad: 'Banco D',
        fecha: '2024-01-15T10:15:00',
        estado: 'Pendiente'
      },
      {
        codigo: 'ERR-003',
        tipo: 'Error',
        descripcion: 'Código de liquidez duplicado',
        entidad: 'Banco E',
        fecha: '2024-01-15T10:10:00',
        estado: 'En Revisión'
      }
    ];
  }

  formatearFecha(fecha: string): string {
    return new Date(fecha).toLocaleString('es-ES');
  }

  getSeverityEstado(estado: string): "success" | "secondary" | "info" | "warn" | "danger" | "contrast" | undefined {
    switch (estado) {
      case 'Completado': return 'success';
      case 'En Proceso': return 'warn';
      case 'Pendiente': return 'info';
      case 'En Revisión': return 'warn';
      case 'Resuelto': return 'success';
      default: return 'secondary';
    }
  }

  getSeverityTipo(tipo: string): "success" | "secondary" | "info" | "warn" | "danger" | "contrast" | undefined {
    switch (tipo) {
      case 'Error': return 'danger';
      case 'Advertencia': return 'warn';
      case 'Info': return 'info';
      default: return 'secondary';
    }
  }
}
