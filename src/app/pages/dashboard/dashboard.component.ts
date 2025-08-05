import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="dashboard-container">
      <div class="dashboard-header">
        <h1>Dashboard Regulatorio SudBank</h1>
        <p>Sistema de reportes regulatorios para la Superintendencia de Bancos</p>
      </div>
      
      <div class="dashboard-grid">
        <div class="dashboard-card">
          <div class="card-header">
            <i class="pi pi-chart-bar"></i>
            <h3>Reportes de Liquidez</h3>
          </div>
          <div class="card-content">
            <ul>
              <li><a routerLink="/regulatory/l07">L07 - Liquidez Estructural</a></li>
              <li><a routerLink="/regulatory/l08">L08 - Liquidez y Gestión de Riesgos</a></li>
              <li><a routerLink="/regulatory/l11">L11 - Depósitos y Pasivos</a></li>
              <li><a routerLink="/regulatory/l14">L14 - Concentración de Depósitos</a></li>
            </ul>
          </div>
        </div>

        <div class="dashboard-card">
          <div class="card-header">
            <i class="pi pi-sliders-h"></i>
            <h3>Inversiones y Capital</h3>
          </div>
          <div class="card-content">
            <ul>
              <li><a routerLink="/regulatory/l09">L09 - Cartera de Inversiones</a></li>
              <li><a routerLink="/regulatory/l10">L10 - Brechas de Sensibilidad</a></li>
              <li><a routerLink="/regulatory/l31">L31 - Estructura de Capital</a></li>
            </ul>
          </div>
        </div>

        <div class="dashboard-card">
          <div class="card-header">
            <i class="pi pi-list"></i>
            <h3>Créditos y Garantías</h3>
          </div>
          <div class="card-content">
            <ul>
              <li><a routerLink="/regulatory/l12">L12 - Cartera de Préstamos</a></li>
              <li><a routerLink="/regulatory/l13">L13 - Cartera de Garantías</a></li>
            </ul>
          </div>
        </div>

        <div class="dashboard-card">
          <div class="card-header">
            <i class="pi pi-chart-bar"></i>
            <h3>Métricas Generales</h3>
          </div>
          <div class="card-content">
            <p>KPIs y métricas del sistema bancario</p>
            <a routerLink="/metrics" class="btn-primary">Ver Métricas</a>
          </div>
        </div>

        <div class="dashboard-card">
          <div class="card-header">
            <i class="pi pi-bell"></i>
            <h3>Alertas de Reportes</h3>
          </div>
          <div class="card-content">
            <p>Notificaciones y alertas del sistema</p>
            <a routerLink="/alerts" class="btn-primary">Ver Alertas</a>
          </div>
        </div>

        <div class="dashboard-card">
          <div class="card-header">
            <i class="pi pi-cog"></i>
            <h3>Estado del Sistema</h3>
          </div>
          <div class="card-content">
            <div class="status-item">
              <span class="status-label">SQL Server Adapter:</span>
              <span class="status-value status-ok">✓ Activo</span>
            </div>
            <div class="status-item">
              <span class="status-label">Regulatory Service:</span>
              <span class="status-value status-ok">✓ Activo</span>
            </div>
            <div class="status-item">
              <span class="status-label">Base de Datos:</span>
              <span class="status-value status-ok">✓ Conectada</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
    }

    .dashboard-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .dashboard-header h1 {
      color: #2c3e50;
      margin-bottom: 0.5rem;
    }

    .dashboard-header p {
      color: #7f8c8d;
      font-size: 1.1rem;
    }

    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 2rem;
    }

    .dashboard-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      overflow: hidden;
      transition: transform 0.2s;
    }

    .dashboard-card:hover {
      transform: translateY(-2px);
    }

    .card-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 1.5rem;
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .card-header i {
      font-size: 1.5rem;
    }

    .card-header h3 {
      margin: 0;
      font-size: 1.2rem;
    }

    .card-content {
      padding: 1.5rem;
    }

    .card-content ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .card-content li {
      padding: 0.5rem 0;
      border-bottom: 1px solid #ecf0f1;
    }

    .card-content li:last-child {
      border-bottom: none;
    }

    .card-content a {
      color: #3498db;
      text-decoration: none;
      display: block;
      padding: 0.5rem;
      border-radius: 4px;
      transition: background-color 0.2s;
    }

    .card-content a:hover {
      background-color: #ecf0f1;
      color: #2980b9;
    }

    .btn-primary {
      display: inline-block;
      background: #3498db;
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      text-decoration: none;
      margin-top: 1rem;
      transition: background-color 0.2s;
    }

    .btn-primary:hover {
      background: #2980b9;
    }

    .status-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 0;
      border-bottom: 1px solid #ecf0f1;
    }

    .status-item:last-child {
      border-bottom: none;
    }

    .status-label {
      font-weight: 500;
      color: #2c3e50;
    }

    .status-value {
      font-weight: bold;
    }

    .status-ok {
      color: #27ae60;
    }

    .status-error {
      color: #e74c3c;
    }
  `]
})
export class DashboardComponent {
  constructor() {
    console.log('DashboardComponent inicializado');
  }
}
 