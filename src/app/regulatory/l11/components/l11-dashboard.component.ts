import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { L11Service } from '../services/l11.service';
import { L11Data, L11ReportRequest } from '../models/l11.model';

@Component({
  selector: 'app-l11-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h4 class="card-title">
                <i class="fas fa-piggy-bank me-2"></i>
                Reporte Regulatorio L11 - Depósitos
              </h4>
              <p class="card-subtitle text-muted">
                Estructura de Depósitos y Gestión de Pasivos
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
                  <label class="form-label">Tipo Depósito</label>
                  <select class="form-select" [(ngModel)]="filtros.tipoDeposito">
                    <option value="">Todos</option>
                    <option value="DEMANDA">Demanda</option>
                    <option value="PLAZO">Plazo</option>
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
                      <th>Promedio</th>
                      <th>Riesgo Liquidez</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let item of datos">
                      <td>{{ item.codigoDeposito }}</td>
                      <td>{{ item.descripcionDeposito }}</td>
                      <td>
                        <span class="badge" [ngClass]="getTipoClass(item.tipoDeposito)">
                          {{ item.tipoDeposito }}
                        </span>
                      </td>
                      <td>{{ item.moneda }}</td>
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
                      <h6>Total Depósitos</h6>
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
                      <h6>Promedio Total</h6>
                      <h4>{{ promedioTotal | number:'1.0-0' }}</h4>
                    </div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="card bg-warning text-white">
                    <div class="card-body">
                      <h6>Riesgo Promedio</h6>
                      <h4>{{ riesgoPromedio | number:'1.1-1' }}%</h4>
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
    
    .bg-demanda { background-color: #28a745; }
    .bg-plazo { background-color: #17a2b8; }
    
    .bg-riesgo-bajo { background-color: #28a745; }
    .bg-riesgo-medio { background-color: #ffc107; }
    .bg-riesgo-alto { background-color: #dc3545; }
  `]
})
export class L11DashboardComponent implements OnInit {
  datos: L11Data[] = [];
  filtros: L11ReportRequest = {
    fechaInicio: new Date().toISOString().split('T')[0],
    fechaFin: new Date().toISOString().split('T')[0]
  };
  
  totalRegistros = 0;
  saldoTotal = 0;
  promedioTotal = 0;
  riesgoPromedio = 0;

  constructor(private l11Service: L11Service) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.l11Service.getL11Report(this.filtros).subscribe({
      next: (response) => {
        this.datos = response.data;
        this.totalRegistros = response.totalRegistros;
        this.calcularResumen();
      },
      error: (error) => {
        console.error('Error al cargar datos L11:', error);
      }
    });
  }

  calcularResumen(): void {
    this.saldoTotal = this.datos.reduce((sum, item) => sum + item.saldoFinal, 0);
    this.promedioTotal = this.datos.reduce((sum, item) => sum + item.promedio, 0);
    this.riesgoPromedio = this.datos.length > 0 
      ? this.datos.reduce((sum, item) => sum + item.riesgoLiquidez, 0) / this.datos.length * 100
      : 0;
  }

  getTipoClass(tipo: string): string {
    return tipo === 'DEMANDA' ? 'bg-demanda' : 'bg-plazo';
  }

  getRiesgoClass(riesgo: number): string {
    if (riesgo <= 0.3) return 'bg-riesgo-bajo';
    if (riesgo <= 0.7) return 'bg-riesgo-medio';
    return 'bg-riesgo-alto';
  }

  exportarDatos(): void {
    console.log('Exportando datos L11...');
  }
} 
