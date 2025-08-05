import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { L09Service } from '../services/l09.service';
import { L09Data, L09ReportRequest } from '../models/l09.model';

@Component({
  selector: 'app-l09-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h4 class="card-title">
                <i class="fas fa-chart-pie me-2"></i>
                Reporte Regulatorio L09 - Inversiones
              </h4>
              <p class="card-subtitle text-muted">
                Cartera de Inversiones y Gestión de Riesgos
              </p>
            </div>
            <div class="card-body">
              <!-- Filtros -->
              <div class="row mb-3">
                <div class="col-md-2">
                  <label class="form-label">Fecha Inicio</label>
                  <input type="date" class="form-control" [(ngModel)]="filtros.fechaInicio">
                </div>
                <div class="col-md-2">
                  <label class="form-label">Fecha Fin</label>
                  <input type="date" class="form-control" [(ngModel)]="filtros.fechaFin">
                </div>
                <div class="col-md-2">
                  <label class="form-label">Tipo Inversión</label>
                  <select class="form-select" [(ngModel)]="filtros.tipoInversion">
                    <option value="">Todos</option>
                    <option value="RENTA_FIJA">Renta Fija</option>
                    <option value="RENTA_VARIABLE">Renta Variable</option>
                  </select>
                </div>
                <div class="col-md-2">
                  <label class="form-label">Moneda</label>
                  <select class="form-select" [(ngModel)]="filtros.moneda">
                    <option value="">Todas</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="PEN">PEN</option>
                  </select>
                </div>
                <div class="col-md-4 d-flex align-items-end">
                  <button class="btn btn-primary me-2" (click)="cargarDatos()">
                    <i class="fas fa-search me-1"></i>Consultar
                  </button>
                  <button class="btn btn-success" (click)="exportarDatos()">
                    <i class="fas fa-download me-1"></i>Exportar
                  </button>
                </div>
              </div>

              <!-- Tabla de datos -->
              <div class="table-responsive">
                <table class="table table-striped table-hover">
                  <thead class="table-dark">
                    <tr>
                      <th>Código</th>
                      <th>Descripción</th>
                      <th>Tipo</th>
                      <th>Moneda</th>
                      <th>Monto</th>
                      <th>Valor Mercado</th>
                      <th>Rendimiento</th>
                      <th>Calificación</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let item of datos">
                      <td>{{ item.codigoInversion }}</td>
                      <td>{{ item.descripcionInversion }}</td>
                      <td>
                        <span class="badge" [ngClass]="getTipoClass(item.tipoInversion)">
                          {{ item.tipoInversion }}
                        </span>
                      </td>
                      <td>{{ item.moneda }}</td>
                      <td>{{ item.montoInversion | number:'1.0-0' }}</td>
                      <td>{{ item.valorMercado | number:'1.0-0' }}</td>
                      <td>
                        <span [ngClass]="item.rendimiento >= 0 ? 'text-success' : 'text-danger'">
                          {{ (item.rendimiento * 100) | number:'1.2-2' }}%
                        </span>
                      </td>
                      <td>
                        <span class="badge" [ngClass]="getCalificacionClass(item.calificacionRiesgo)">
                          {{ item.calificacionRiesgo }}
                        </span>
                      </td>
                      <td>
                        <span class="badge bg-success">{{ item.estado }}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Resumen -->
              <div class="row mt-3">
                <div class="col-md-3">
                  <div class="card bg-primary text-white">
                    <div class="card-body">
                      <h6>Total Inversiones</h6>
                      <h4>{{ totalRegistros }}</h4>
                    </div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="card bg-success text-white">
                    <div class="card-body">
                      <h6>Monto Total</h6>
                      <h4>{{ montoTotal | number:'1.0-0' }}</h4>
                    </div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="card bg-info text-white">
                    <div class="card-body">
                      <h6>Valor Mercado</h6>
                      <h4>{{ valorMercadoTotal | number:'1.0-0' }}</h4>
                    </div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="card bg-warning text-white">
                    <div class="card-body">
                      <h6>Rendimiento Promedio</h6>
                      <h4>{{ rendimientoPromedio | number:'1.2-2' }}%</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
      border: 1px solid rgba(0, 0, 0, 0.125);
    }
    
    .table th {
      font-weight: 600;
      font-size: 0.875rem;
    }
    
    .badge {
      font-size: 0.75rem;
    }
    
    .bg-renta-fija { background-color: #17a2b8; }
    .bg-renta-variable { background-color: #6f42c1; }
    
    .bg-calificacion-aaa { background-color: #28a745; }
    .bg-calificacion-aa { background-color: #20c997; }
    .bg-calificacion-a { background-color: #ffc107; }
    .bg-calificacion-bbb { background-color: #fd7e14; }
    .bg-calificacion-bb { background-color: #dc3545; }
  `]
})
export class L09DashboardComponent implements OnInit {
  datos: L09Data[] = [];
  filtros: L09ReportRequest = {
    fechaInicio: new Date().toISOString().split('T')[0],
    fechaFin: new Date().toISOString().split('T')[0]
  };
  
  totalRegistros = 0;
  montoTotal = 0;
  valorMercadoTotal = 0;
  rendimientoPromedio = 0;

  constructor(private l09Service: L09Service) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.l09Service.getL09Report(this.filtros).subscribe({
      next: (response) => {
        this.datos = response.data;
        this.totalRegistros = response.totalRegistros;
        this.calcularResumen();
      },
      error: (error) => {
        console.error('Error al cargar datos L09:', error);
      }
    });
  }

  calcularResumen(): void {
    this.montoTotal = this.datos.reduce((sum, item) => sum + item.montoInversion, 0);
    this.valorMercadoTotal = this.datos.reduce((sum, item) => sum + item.valorMercado, 0);
    this.rendimientoPromedio = this.datos.length > 0 
      ? this.datos.reduce((sum, item) => sum + item.rendimiento, 0) / this.datos.length * 100
      : 0;
  }

  getTipoClass(tipo: string): string {
    return tipo === 'RENTA_FIJA' ? 'bg-renta-fija' : 'bg-renta-variable';
  }

  getCalificacionClass(calificacion: string): string {
    switch (calificacion) {
      case 'AAA': return 'bg-calificacion-aaa';
      case 'AA': return 'bg-calificacion-aa';
      case 'A': return 'bg-calificacion-a';
      case 'BBB': return 'bg-calificacion-bbb';
      case 'BB': return 'bg-calificacion-bb';
      default: return 'bg-secondary';
    }
  }

  exportarDatos(): void {
    console.log('Exportando datos L09...');
  }
} 
