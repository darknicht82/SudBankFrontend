import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { L31Service } from '../services/l31.service';
import { L31Data, L31ReportRequest } from '../models/l31.model';

@Component({
  selector: 'app-l31-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h4 class="card-title">
                <i class="fas fa-coins me-2"></i>
                Reporte Regulatorio L31 - Capital
              </h4>
              <p class="card-subtitle text-muted">
                Estructura de Capital y Solvencia
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
                  <label class="form-label">Tipo Capital</label>
                  <select class="form-select" [(ngModel)]="filtros.tipoCapital">
                    <option value="">Todos</option>
                    <option value="TIER1">Tier 1</option>
                    <option value="TIER2">Tier 2</option>
                    <option value="TIER3">Tier 3</option>
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
                      <th>Saldo Final</th>
                      <th>Variación</th>
                      <th>Ratio Solvencia</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let item of datos">
                      <td>{{ item.codigoCapital }}</td>
                      <td>{{ item.descripcionCapital }}</td>
                      <td>
                        <span class="badge" [ngClass]="getTipoClass(item.tipoCapital)">
                          {{ item.tipoCapital }}
                        </span>
                      </td>
                      <td>{{ item.moneda }}</td>
                      <td>{{ item.saldoFinal | number:'1.0-0' }}</td>
                      <td>
                        <span [ngClass]="item.variacion >= 0 ? 'text-success' : 'text-danger'">
                          {{ item.variacion | number:'1.0-0' }}
                        </span>
                      </td>
                      <td>
                        <span class="badge" [ngClass]="getSolvenciaClass(item.ratioSolvencia)">
                          {{ (item.ratioSolvencia * 100) | number:'1.1-1' }}%
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
                      <h6>Total Capital</h6>
                      <h4>{{ totalRegistros }}</h4>
                    </div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="card bg-success text-white">
                    <div class="card-body">
                      <h6>Capital Total</h6>
                      <h4>{{ capitalTotal | number:'1.0-0' }}</h4>
                    </div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="card bg-info text-white">
                    <div class="card-body">
                      <h6>Variación Total</h6>
                      <h4>{{ variacionTotal | number:'1.0-0' }}</h4>
                    </div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="card bg-warning text-white">
                    <div class="card-body">
                      <h6>Ratio Promedio</h6>
                      <h4>{{ ratioPromedio | number:'1.1-1' }}%</h4>
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
    
    .bg-tier1 { background-color: #28a745; }
    .bg-tier2 { background-color: #17a2b8; }
    .bg-tier3 { background-color: #6f42c1; }
    
    .bg-solvencia-excelente { background-color: #28a745; }
    .bg-solvencia-buena { background-color: #20c997; }
    .bg-solvencia-regular { background-color: #ffc107; }
    .bg-solvencia-deficiente { background-color: #dc3545; }
  `]
})
export class L31DashboardComponent implements OnInit {
  datos: L31Data[] = [];
  filtros: L31ReportRequest = {
    fechaInicio: new Date().toISOString().split('T')[0],
    fechaFin: new Date().toISOString().split('T')[0]
  };
  
  totalRegistros = 0;
  capitalTotal = 0;
  variacionTotal = 0;
  ratioPromedio = 0;

  constructor(private l31Service: L31Service) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.l31Service.getL31Report(this.filtros).subscribe({
      next: (response) => {
        this.datos = response.data;
        this.totalRegistros = response.totalRegistros;
        this.calcularResumen();
      },
      error: (error) => {
        console.error('Error al cargar datos L31:', error);
      }
    });
  }

  calcularResumen(): void {
    this.capitalTotal = this.datos.reduce((sum, item) => sum + item.saldoFinal, 0);
    this.variacionTotal = this.datos.reduce((sum, item) => sum + item.variacion, 0);
    this.ratioPromedio = this.datos.length > 0 
      ? this.datos.reduce((sum, item) => sum + item.ratioSolvencia, 0) / this.datos.length * 100
      : 0;
  }

  getTipoClass(tipo: string): string {
    switch (tipo) {
      case 'TIER1': return 'bg-tier1';
      case 'TIER2': return 'bg-tier2';
      case 'TIER3': return 'bg-tier3';
      default: return 'bg-secondary';
    }
  }

  getSolvenciaClass(ratio: number): string {
    if (ratio >= 0.15) return 'bg-solvencia-excelente';
    if (ratio >= 0.12) return 'bg-solvencia-buena';
    if (ratio >= 0.08) return 'bg-solvencia-regular';
    return 'bg-solvencia-deficiente';
  }

  exportarDatos(): void {
    console.log('Exportando datos L31...');
  }
} 
