import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { L07Service } from '../services/l07.service';
import { L07Data, L07ReportRequest } from '../models/l07.model';

@Component({
  selector: 'app-l07-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h4 class="card-title">
                <i class="fas fa-chart-line me-2"></i>
                Reporte Regulatorio L07 - Liquidez
              </h4>
              <p class="card-subtitle text-muted">
                Estructura de Liquidez y Gestión de Riesgos
              </p>
            </div>
            <div class="card-body">
              <!-- Filtros -->
              <div class="row mb-3">
                <div class="col-md-3">
                  <label class="form-label">Fecha Inicio</label>
                  <input type="date" class="form-control" [(ngModel)]="filtros.fechaInicio">
                </div>
                <div class="col-md-3">
                  <label class="form-label">Fecha Fin</label>
                  <input type="date" class="form-control" [(ngModel)]="filtros.fechaFin">
                </div>
                <div class="col-md-3">
                  <label class="form-label">Tipo Reporte</label>
                  <select class="form-select" [(ngModel)]="filtros.tipoReporte">
                    <option value="diario">Diario</option>
                    <option value="semanal">Semanal</option>
                    <option value="mensual">Mensual</option>
                  </select>
                </div>
                <div class="col-md-3 d-flex align-items-end">
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
                      <th>Entidad</th>
                      <th>Fecha</th>
                      <th>Código</th>
                      <th>Descripción</th>
                      <th>Saldo Final</th>
                      <th>Promedio</th>
                      <th>Riesgo Liquidez</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let item of datos">
                      <td>{{ item.codigoEntidad }}</td>
                      <td>{{ item.fechaReporte | date:'dd/MM/yyyy' }}</td>
                      <td>{{ item.codigoLiquidez }}</td>
                      <td>{{ item.descripcionLiquidez }}</td>
                      <td>{{ item.saldoFinal | number:'1.0-0' }}</td>
                      <td>{{ item.promedio | number:'1.0-0' }}</td>
                      <td>
                        <span class="badge" [ngClass]="getRiesgoClass(item.riesgoLiquidez)">
                          {{ (item.riesgoLiquidez * 100) | number:'1.0-1' }}%
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
                      <h6>Total Registros</h6>
                      <h4>{{ totalRegistros }}</h4>
                    </div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="card bg-success text-white">
                    <div class="card-body">
                      <h6>Saldo Total</h6>
                      <h4>{{ saldoTotal | number:'1.0-0' }}</h4>
                    </div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="card bg-info text-white">
                    <div class="card-body">
                      <h6>Promedio Riesgo</h6>
                      <h4>{{ promedioRiesgo | number:'1.0-1' }}%</h4>
                    </div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="card bg-warning text-white">
                    <div class="card-body">
                      <h6>Última Actualización</h6>
                      <h6>{{ ultimaActualizacion | date:'dd/MM/yyyy HH:mm' }}</h6>
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
    
    .bg-riesgo-bajo { background-color: #28a745; }
    .bg-riesgo-medio { background-color: #ffc107; }
    .bg-riesgo-alto { background-color: #dc3545; }
  `]
})
export class L07DashboardComponent implements OnInit {
  datos: L07Data[] = [];
  filtros: L07ReportRequest = {
    fechaInicio: new Date().toISOString().split('T')[0],
    fechaFin: new Date().toISOString().split('T')[0],
    tipoReporte: 'diario'
  };
  
  totalRegistros = 0;
  saldoTotal = 0;
  promedioRiesgo = 0;
  ultimaActualizacion = new Date();

  constructor(private l07Service: L07Service) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.l07Service.getL07Report(this.filtros).subscribe({
      next: (response) => {
        this.datos = response.data;
        this.totalRegistros = response.totalRegistros;
        this.calcularResumen();
        this.ultimaActualizacion = new Date();
      },
      error: (error) => {
        console.error('Error al cargar datos L07:', error);
      }
    });
  }

  calcularResumen(): void {
    this.saldoTotal = this.datos.reduce((sum, item) => sum + item.saldoFinal, 0);
    this.promedioRiesgo = this.datos.length > 0 
      ? this.datos.reduce((sum, item) => sum + item.riesgoLiquidez, 0) / this.datos.length * 100
      : 0;
  }

  getRiesgoClass(riesgo: number): string {
    if (riesgo <= 0.3) return 'bg-riesgo-bajo';
    if (riesgo <= 0.7) return 'bg-riesgo-medio';
    return 'bg-riesgo-alto';
  }

  exportarDatos(): void {
    // Implementar exportación a Excel/CSV
    console.log('Exportando datos L07...');
  }
} 
