import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="dashboard-container fade-in">
      <!-- Header del Dashboard -->
      <div class="dashboard-header">
        <div class="header-content">
          <h1 class="dashboard-title">
            <i class="pi pi-chart-line"></i>
            Dashboard Regulatorio SudBank
          </h1>
          <p class="dashboard-subtitle">
            Sistema integral de reportes regulatorios para la Superintendencia de Bancos
          </p>
          <div class="dashboard-stats">
            <div class="stat-item">
              <div class="stat-value">15</div>
              <div class="stat-label">Reportes Activos</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">3</div>
              <div class="stat-label">Servicios Conectados</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">100%</div>
              <div class="stat-label">Uptime</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Grid de Categorías -->
      <div class="dashboard-grid">
        <!-- Reportes de Liquidez -->
        <div class="dashboard-card">
          <div class="card-header">
            <div class="header-icon">
              <i class="pi pi-chart-bar"></i>
            </div>
            <div class="header-content">
              <h3>Reportes de Liquidez</h3>
              <p>Gestión de liquidez y estructura financiera</p>
            </div>
          </div>
          <div class="card-body">
            <div class="report-list">
              <a routerLink="/regulatory/l07" class="report-item">
                <i class="pi pi-chart-line"></i>
                <span>L07 - Liquidez Estructural</span>
                <i class="pi pi-arrow-right"></i>
              </a>
              <a routerLink="/regulatory/l08" class="report-item">
                <i class="pi pi-chart-line"></i>
                <span>L08 - Liquidez y Gestión de Riesgos</span>
                <i class="pi pi-arrow-right"></i>
              </a>
              <a routerLink="/regulatory/l11" class="report-item">
                <i class="pi pi-dollar"></i>
                <span>L11 - Depósitos y Pasivos</span>
                <i class="pi pi-arrow-right"></i>
              </a>
              <a routerLink="/regulatory/l14" class="report-item">
                <i class="pi pi-users"></i>
                <span>L14 - Concentración de Depósitos</span>
                <i class="pi pi-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>

        <!-- Inversiones y Capital -->
        <div class="dashboard-card">
          <div class="card-header">
            <div class="header-icon">
              <i class="pi pi-sliders-h"></i>
            </div>
            <div class="header-content">
              <h3>Inversiones y Capital</h3>
              <p>Análisis de inversiones y estructura de capital</p>
            </div>
          </div>
          <div class="card-body">
            <div class="report-list">
              <a routerLink="/regulatory/l09" class="report-item">
                <i class="pi pi-chart-pie"></i>
                <span>L09 - Cartera de Inversiones</span>
                <i class="pi pi-arrow-right"></i>
              </a>
              <a routerLink="/regulatory/l10" class="report-item">
                <i class="pi pi-chart-line"></i>
                <span>L10 - Brechas de Sensibilidad</span>
                <i class="pi pi-arrow-right"></i>
              </a>
              <a routerLink="/regulatory/l31" class="report-item">
                <i class="pi pi-coins"></i>
                <span>L31 - Estructura de Capital</span>
                <i class="pi pi-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>

        <!-- Créditos y Garantías -->
        <div class="dashboard-card">
          <div class="card-header">
            <div class="header-icon">
              <i class="pi pi-list"></i>
            </div>
            <div class="header-content">
              <h3>Créditos y Garantías</h3>
              <p>Gestión de cartera crediticia y garantías</p>
            </div>
          </div>
          <div class="card-body">
            <div class="report-list">
              <a routerLink="/regulatory/l12" class="report-item">
                <i class="pi pi-credit-card"></i>
                <span>L12 - Cartera de Préstamos</span>
                <i class="pi pi-arrow-right"></i>
              </a>
              <a routerLink="/regulatory/l13" class="report-item">
                <i class="pi pi-shield"></i>
                <span>L13 - Cartera de Garantías</span>
                <i class="pi pi-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>

        <!-- Métricas Generales -->
        <div class="dashboard-card">
          <div class="card-header">
            <div class="header-icon">
              <i class="pi pi-chart-bar"></i>
            </div>
            <div class="header-content">
              <h3>Métricas Generales</h3>
              <p>KPIs y métricas del sistema bancario</p>
            </div>
          </div>
          <div class="card-body">
            <div class="metrics-preview">
              <div class="metric-item">
                <div class="metric-icon">
                  <i class="pi pi-chart-line"></i>
                </div>
                <div class="metric-content">
                  <div class="metric-value">98.5%</div>
                  <div class="metric-label">Eficiencia Operativa</div>
                </div>
              </div>
              <div class="metric-item">
                <div class="metric-icon">
                  <i class="pi pi-clock"></i>
                </div>
                <div class="metric-content">
                  <div class="metric-value">2.3s</div>
                  <div class="metric-label">Tiempo de Respuesta</div>
                </div>
              </div>
            </div>
            <a routerLink="/metrics" class="btn btn-primary">
              <i class="pi pi-chart-bar"></i>
              Ver Métricas Completas
            </a>
          </div>
        </div>

        <!-- Alertas de Reportes -->
        <div class="dashboard-card">
          <div class="card-header">
            <div class="header-icon">
              <i class="pi pi-bell"></i>
            </div>
            <div class="header-content">
              <h3>Alertas de Reportes</h3>
              <p>Notificaciones y alertas del sistema</p>
            </div>
          </div>
          <div class="card-body">
            <div class="alerts-preview">
              <div class="alert-item alert-success">
                <i class="pi pi-check-circle"></i>
                <span>L08 - Reporte enviado exitosamente</span>
              </div>
              <div class="alert-item alert-warning">
                <i class="pi pi-exclamation-triangle"></i>
                <span>L11 - Pendiente de validación</span>
              </div>
              <div class="alert-item alert-info">
                <i class="pi pi-info-circle"></i>
                <span>L14 - Actualización disponible</span>
              </div>
            </div>
            <a routerLink="/alerts" class="btn btn-secondary">
              <i class="pi pi-bell"></i>
              Ver Todas las Alertas
            </a>
          </div>
        </div>

        <!-- Estado del Sistema -->
        <div class="dashboard-card">
          <div class="card-header">
            <div class="header-icon">
              <i class="pi pi-cog"></i>
            </div>
            <div class="header-content">
              <h3>Estado del Sistema</h3>
              <p>Monitoreo de servicios y conectividad</p>
            </div>
          </div>
          <div class="card-body">
            <div class="status-list">
              <div class="status-item status-ok">
                <div class="status-icon">
                  <i class="pi pi-check-circle"></i>
                </div>
                <div class="status-content">
                  <div class="status-label">SQL Server Adapter</div>
                  <div class="status-value">Activo</div>
                </div>
              </div>
              <div class="status-item status-ok">
                <div class="status-icon">
                  <i class="pi pi-check-circle"></i>
                </div>
                <div class="status-content">
                  <div class="status-label">Regulatory Service</div>
                  <div class="status-value">Activo</div>
                </div>
              </div>
              <div class="status-item status-ok">
                <div class="status-icon">
                  <i class="pi pi-check-circle"></i>
                </div>
                <div class="status-content">
                  <div class="status-label">Base de Datos</div>
                  <div class="status-value">Conectada</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: var(--sudbank-spacing-xl);
      max-width: 1400px;
      margin: 0 auto;
    }

    .dashboard-header {
      background: linear-gradient(135deg, var(--sudbank-primary) 0%, var(--sudbank-secondary) 100%);
      border-radius: var(--sudbank-border-radius-xl);
      padding: var(--sudbank-spacing-2xl);
      margin-bottom: var(--sudbank-spacing-2xl);
      color: white;
      box-shadow: var(--sudbank-shadow-lg);
    }

    .dashboard-title {
      font-size: var(--sudbank-font-size-4xl);
      font-weight: 700;
      margin-bottom: var(--sudbank-spacing-md);
      display: flex;
      align-items: center;
      gap: var(--sudbank-spacing-md);
    }

    .dashboard-title i {
      font-size: var(--sudbank-font-size-3xl);
    }

    .dashboard-subtitle {
      font-size: var(--sudbank-font-size-lg);
      opacity: 0.9;
      margin-bottom: var(--sudbank-spacing-xl);
    }

    .dashboard-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: var(--sudbank-spacing-lg);
      margin-top: var(--sudbank-spacing-xl);
    }

    .stat-item {
      text-align: center;
      padding: var(--sudbank-spacing-lg);
      background: rgba(255, 255, 255, 0.1);
      border-radius: var(--sudbank-border-radius-lg);
      backdrop-filter: blur(10px);
    }

    .stat-value {
      font-size: var(--sudbank-font-size-3xl);
      font-weight: 700;
      margin-bottom: var(--sudbank-spacing-xs);
    }

    .stat-label {
      font-size: var(--sudbank-font-size-sm);
      opacity: 0.8;
    }

    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: var(--sudbank-spacing-xl);
    }

    .dashboard-card {
      background: white;
      border-radius: var(--sudbank-border-radius-xl);
      box-shadow: var(--sudbank-shadow);
      overflow: hidden;
      transition: var(--sudbank-transition);
      border: 1px solid var(--sudbank-gray-200);
    }

    .dashboard-card:hover {
      box-shadow: var(--sudbank-shadow-xl);
      transform: translateY(-4px);
    }

    .card-header {
      background: linear-gradient(135deg, var(--sudbank-primary) 0%, var(--sudbank-secondary) 100%);
      color: white;
      padding: var(--sudbank-spacing-xl);
      display: flex;
      align-items: center;
      gap: var(--sudbank-spacing-lg);
    }

    .header-icon {
      font-size: var(--sudbank-font-size-2xl);
      opacity: 0.9;
    }

    .header-content h3 {
      margin: 0 0 var(--sudbank-spacing-xs) 0;
      font-size: var(--sudbank-font-size-xl);
    }

    .header-content p {
      margin: 0;
      opacity: 0.8;
      font-size: var(--sudbank-font-size-sm);
    }

    .card-body {
      padding: var(--sudbank-spacing-xl);
    }

    .report-list {
      display: flex;
      flex-direction: column;
      gap: var(--sudbank-spacing-sm);
    }

    .report-item {
      display: flex;
      align-items: center;
      gap: var(--sudbank-spacing-md);
      padding: var(--sudbank-spacing-md);
      border-radius: var(--sudbank-border-radius);
      color: var(--sudbank-gray-700);
      text-decoration: none;
      transition: var(--sudbank-transition);
      border: 1px solid transparent;
    }

    .report-item:hover {
      background-color: var(--sudbank-gray-100);
      color: var(--sudbank-primary);
      border-color: var(--sudbank-gray-300);
      transform: translateX(4px);
    }

    .report-item i:first-child {
      color: var(--sudbank-primary);
      font-size: var(--sudbank-font-size-lg);
    }

    .report-item span {
      flex: 1;
      font-weight: 500;
    }

    .report-item i:last-child {
      opacity: 0.5;
      transition: var(--sudbank-transition);
    }

    .report-item:hover i:last-child {
      opacity: 1;
      transform: translateX(4px);
    }

    .metrics-preview {
      margin-bottom: var(--sudbank-spacing-lg);
    }

    .metric-item {
      display: flex;
      align-items: center;
      gap: var(--sudbank-spacing-md);
      padding: var(--sudbank-spacing-md);
      margin-bottom: var(--sudbank-spacing-md);
      background: var(--sudbank-gray-50);
      border-radius: var(--sudbank-border-radius);
    }

    .metric-icon {
      color: var(--sudbank-primary);
      font-size: var(--sudbank-font-size-xl);
    }

    .metric-value {
      font-size: var(--sudbank-font-size-xl);
      font-weight: 700;
      color: var(--sudbank-gray-900);
    }

    .metric-label {
      font-size: var(--sudbank-font-size-sm);
      color: var(--sudbank-gray-600);
    }

    .alerts-preview {
      margin-bottom: var(--sudbank-spacing-lg);
    }

    .alert-item {
      display: flex;
      align-items: center;
      gap: var(--sudbank-spacing-sm);
      padding: var(--sudbank-spacing-sm);
      margin-bottom: var(--sudbank-spacing-sm);
      border-radius: var(--sudbank-border-radius);
      font-size: var(--sudbank-font-size-sm);
    }

    .alert-success {
      background-color: #dcfce7;
      color: #166534;
    }

    .alert-warning {
      background-color: #fef3c7;
      color: #92400e;
    }

    .alert-info {
      background-color: #dbeafe;
      color: #1e40af;
    }

    .status-list {
      display: flex;
      flex-direction: column;
      gap: var(--sudbank-spacing-md);
    }

    .status-item {
      display: flex;
      align-items: center;
      gap: var(--sudbank-spacing-md);
      padding: var(--sudbank-spacing-md);
      border-radius: var(--sudbank-border-radius);
      background: var(--sudbank-gray-50);
    }

    .status-icon {
      color: var(--sudbank-success);
      font-size: var(--sudbank-font-size-lg);
    }

    .status-content {
      flex: 1;
    }

    .status-label {
      font-weight: 500;
      color: var(--sudbank-gray-700);
      margin-bottom: var(--sudbank-spacing-xs);
    }

    .status-value {
      font-size: var(--sudbank-font-size-sm);
      color: var(--sudbank-success);
      font-weight: 600;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: var(--sudbank-spacing-sm);
      padding: var(--sudbank-spacing-md) var(--sudbank-spacing-lg);
      border-radius: var(--sudbank-border-radius);
      text-decoration: none;
      font-weight: 500;
      transition: var(--sudbank-transition);
      border: none;
      cursor: pointer;
    }

    .btn-primary {
      background: var(--sudbank-primary);
      color: white;
    }

    .btn-primary:hover {
      background: var(--sudbank-primary-dark);
      transform: translateY(-2px);
    }

    .btn-secondary {
      background: var(--sudbank-gray-200);
      color: var(--sudbank-gray-700);
    }

    .btn-secondary:hover {
      background: var(--sudbank-gray-300);
      transform: translateY(-2px);
    }

    /* Responsive */
    @media (max-width: 1024px) {
      .dashboard-container {
        padding: var(--sudbank-spacing-lg);
      }
      
      .dashboard-grid {
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: var(--sudbank-spacing-lg);
      }
    }

    @media (max-width: 768px) {
      .dashboard-container {
        padding: var(--sudbank-spacing-md);
      }
      
      .dashboard-header {
        padding: var(--sudbank-spacing-xl);
      }
      
      .dashboard-title {
        font-size: var(--sudbank-font-size-3xl);
      }
      
      .dashboard-grid {
        grid-template-columns: 1fr;
        gap: var(--sudbank-spacing-lg);
      }
      
      .dashboard-stats {
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      }
    }

    @media (max-width: 480px) {
      .dashboard-container {
        padding: var(--sudbank-spacing-sm);
      }
      
      .dashboard-header {
        padding: var(--sudbank-spacing-lg);
      }
      
      .dashboard-title {
        font-size: var(--sudbank-font-size-2xl);
        flex-direction: column;
        text-align: center;
      }
      
      .card-header {
        flex-direction: column;
        text-align: center;
        gap: var(--sudbank-spacing-md);
      }
    }
  `]
})
export class DashboardComponent {
  constructor() {
    console.log('DashboardComponent inicializado');
  }
}
 