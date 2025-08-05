import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { L13Service } from '../services/l13.service';
import { L13Data, L13ReportRequest } from '../models/l13.model';

@Component({
  selector: 'app-l13-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h4 class="card-title">
                <i class="fas fa-shield-alt me-2"></i>
                Reporte Regulatorio L13 - Garantías
              </h4>
              <p class="card-subtitle text-muted">
                Cartera de Garantías y Gestión de Riesgo
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
                  <label class="form-label">Tipo Garantía</label>
                  <select class="form-select" [(ngModel)]="filtros.tipoGarantia">
                    <option value="">Todos</option>
                    <option value="REAL">Real</option>
                    <option value="PERSONAL">Personal</option>
                    <option value="MIXTA">Mixta</option>
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
                      <th>Valor Nominal</th>
                      <th>Valor Realizable</th>
                      <th>Valor Utilizado</th>
                      <th>Cobertura</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let item of datos">
                      <td>{{ item.codigoGarantia }}</td>
                      <td>{{ item.descripcionGarantia }}</td>
                      <td>
                        <span class="badge" [ngClass]="getTipoClass(item.tipoGarantia)">
                          {{ item.tipoGarantia }}
                        </span>
                      </td>
                      <td>{{ item.moneda }}</td>
                      <td>{{ item.valorNominal | number:'1.0-0' }}</td>
                      <td>{{ item.valorRealizable | number:'1.0-0' }}</td>
                      <td>{{ item.valorUtilizado | number:'1.0-0' }}</td>
                      <td>
                        <span class="badge" [ngClass]="getCoberturaClass(item.cobertura)">
                          {{ (item.cobertura * 100) | number:'1.0-1' }}%
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
                      <h6>Total Garantías</h6>
                      <h4>{{ totalRegistros }}</h4>
                    </div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="card bg-success text-white">
                    <div class="card-body">
                      <h6>Valor Nominal Total</h6>
                      <h4>{{ valorNominalTotal | number:'1.0-0' }}</h4>
                    </div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="card bg-info text-white">
                    <div class="card-body">
                      <h6>Valor Realizable Total</h6>
                      <h4>{{ valorRealizableTotal | number:'1.0-0' }}</h4>
                    </div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="card bg-warning text-white">
                    <div class="card-body">
                      <h6>Cobertura Promedio</h6>
                      <h4>{{ coberturaPromedio | number:'1.1-1' }}%</h4>
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
    
    .bg-real { background-color: #28a745; }
    .bg-personal { background-color: #17a2b8; }
    .bg-mixta { background-color: #6f42c1; }
    
    .bg-cobertura-excelente { background-color: #28a745; }
    .bg-cobertura-buena { background-color: #20c997; }
    .bg-cobertura-regular { background-color: #ffc107; }
    .bg-cobertura-deficiente { background-color: #dc3545; }
  `]
})
export class L13DashboardComponent implements OnInit {
  datos: L13Data[] = [];
  filtros: L13ReportRequest = {
    fechaInicio: new Date().toISOString().split('T')[0],
    fechaFin: new Date().toISOString().split('T')[0]
  };
  
  totalRegistros = 0;
  valorNominalTotal = 0;
  valorRealizableTotal = 0;
  coberturaPromedio = 0;

  constructor(private l13Service: L13Service) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.l13Service.getL13Report(this.filtros).subscribe({
      next: (response) => {
        this.datos = response.data;
        this.totalRegistros = response.totalRegistros;
        this.calcularResumen();
      },
      error: (error) => {
        console.error('Error al cargar datos L13:', error);
      }
    });
  }

  calcularResumen(): void {
    this.valorNominalTotal = this.datos.reduce((sum, item) => sum + item.valorNominal, 0);
    this.valorRealizableTotal = this.datos.reduce((sum, item) => sum + item.valorRealizable, 0);
    this.coberturaPromedio = this.datos.length > 0 
      ? this.datos.reduce((sum, item) => sum + item.cobertura, 0) / this.datos.length * 100
      : 0;
  }

  getTipoClass(tipo: string): string {
    switch (tipo) {
      case 'REAL': return 'bg-real';
      case 'PERSONAL': return 'bg-personal';
      case 'MIXTA': return 'bg-mixta';
      default: return 'bg-secondary';
    }
  }

  getCoberturaClass(cobertura: number): string {
    if (cobertura >= 0.95) return 'bg-cobertura-excelente';
    if (cobertura >= 0.85) return 'bg-cobertura-buena';
    if (cobertura >= 0.70) return 'bg-cobertura-regular';
    return 'bg-cobertura-deficiente';
  }

  exportarDatos(): void {
    console.log('Exportando datos L13...');
  }
} 
