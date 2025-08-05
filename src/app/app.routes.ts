import { Routes } from '@angular/router';
import { RiskMetricsComponent } from './components/risk-metrics/risk-metrics.component';
import { RiskTrendsComponent } from './components/risk-trends/risk-trends.component';
import { RiskAlertsComponent } from './components/risk-alerts/risk-alerts.component';
import { DashboardMetricsComponent } from './pages/dashboard/dashboard-metrics/dashboard-metrics.component';
import { DashboardStatusComponent } from './pages/dashboard/dashboard-status/dashboard-status.component';
import { DashboardShortcutsComponent } from './pages/dashboard/dashboard-shortcuts/dashboard-shortcuts.component';
import { L08MainComponent } from './pages/l08-dashboard/l08-main/l08-main.component';
import { L08HistoricoComponent } from './pages/l08-dashboard/l08-historico/l08-historico.component';
import { L08CompararComponent } from './pages/l08-dashboard/l08-comparar/l08-comparar.component';
import { L08AuditoriaComponent } from './pages/l08-dashboard/l08-auditoria/l08-auditoria.component';

// Dashboards modulares - Estructuras Regulatorias (CORREGIDAS)
import { L01DashboardComponent } from './regulatory/l01/components/l01-dashboard.component';
import { L01SimpleComponent } from './regulatory/l01/components/l01-simple.component';
import { L02Component } from './regulatory/l02/l02.component';
import { L03Component } from './regulatory/l03/l03.component';
import { L04Component } from './regulatory/l04/l04.component';
import { L05Component } from './regulatory/l05/l05.component';
import { L06Component } from './regulatory/l06/l06.component';
import { L07DashboardComponent } from './regulatory/l07/components/l07-dashboard.component';
import { L08DashboardComponent } from './regulatory/l08/components/l08-dashboard.component';
import { L09DashboardComponent } from './regulatory/l09/components/l09-dashboard.component';
import { L10DashboardComponent } from './regulatory/l10/components/l10-dashboard.component';
import { L11DashboardComponent } from './regulatory/l11/components/l11-dashboard.component';
import { L12DashboardComponent } from './regulatory/l12/components/l12-dashboard.component';
import { L13DashboardComponent } from './regulatory/l13/components/l13-dashboard.component';
import { L14DashboardComponent } from './regulatory/l14/components/l14-dashboard.component';
import { L31DashboardComponent } from './regulatory/l31/components/l31-dashboard.component';

// Reportes RVC
import { R01Component } from './regulatory/r01/r01.component';
import { R02Component } from './regulatory/r02/r02.component';
import { R03Component } from './regulatory/r03/r03.component';
import { R04Component } from './regulatory/r04/r04.component';
import { R05Component } from './regulatory/r05/r05.component';
import { R06Component } from './regulatory/r06/r06.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', children: [
    { path: '', component: DashboardMetricsComponent },
    { path: 'status', component: DashboardStatusComponent },
    { path: 'shortcuts', component: DashboardShortcutsComponent },
  ]},
  { path: 'l08', children: [
    { path: '', component: L08MainComponent },
    { path: 'historico', component: L08HistoricoComponent },
    { path: 'comparar', component: L08CompararComponent },
    { path: 'auditoria', component: L08AuditoriaComponent },
  ]},
  { path: 'l08-test', component: L08MainComponent },
  
  // Rutas modulares - Estructuras Regulatorias (CORREGIDAS SEGÚN MANUALES OFICIALES)
  { path: 'regulatory/l01', component: L01SimpleComponent, data: { title: 'L01 - Listado de Clientes' } },
  { path: 'regulatory/l01-simple', component: L01SimpleComponent, data: { title: 'L01 Simple - Prueba' } },
  { path: 'regulatory/l02', component: L02Component, data: { title: 'L02 - Emisores y Custodios' } },
  { path: 'regulatory/l03', component: L03Component, data: { title: 'L03 - Contrapartes' } },
  { path: 'regulatory/l04', component: L04Component, data: { title: 'L04 - Instrumentos Financieros' } },
  { path: 'regulatory/l05', component: L05Component, data: { title: 'L05 - Depósitos' } },
  { path: 'regulatory/l06', component: L06Component, data: { title: 'L06 - Préstamos' } },
  { path: 'regulatory/l07', component: L07DashboardComponent, data: { title: 'L07 - Emisores y Custodios' } },
  { path: 'regulatory/l08', component: L08DashboardComponent, data: { title: 'L08 - Liquidez Estructural' } },
  { path: 'regulatory/l09', component: L09DashboardComponent, data: { title: 'L09 - Detalles de Productos' } },
  { path: 'regulatory/l10', component: L10DashboardComponent, data: { title: 'L10 - Brechas de Sensibilidad' } },
  { path: 'regulatory/l11', component: L11DashboardComponent, data: { title: 'L11 - Sensibilidad del Valor Patrimonial' } },
  { path: 'regulatory/l12', component: L12DashboardComponent, data: { title: 'L12 - Captaciones por Monto' } },
  { path: 'regulatory/l13', component: L13DashboardComponent, data: { title: 'L13 - Obligaciones Financieras' } },
  { path: 'regulatory/l14', component: L14DashboardComponent, data: { title: 'L14 - Concentración de Depósitos' } },
  { path: 'regulatory/l31', component: L31DashboardComponent, data: { title: 'L31 - Brechas de Liquidez' } },
  
  // Rutas Reportes RVC
  { path: 'regulatory/r01', component: R01Component, data: { title: 'R01 - Reporte de Riesgo' } },
  { path: 'regulatory/r02', component: R02Component, data: { title: 'R02 - Reporte de Liquidez' } },
  { path: 'regulatory/r03', component: R03Component, data: { title: 'R03 - Reporte de Capital' } },
  { path: 'regulatory/r04', component: R04Component, data: { title: 'R04 - Reporte de Operaciones' } },
  { path: 'regulatory/r05', component: R05Component, data: { title: 'R05 - Reporte de Concentración' } },
  { path: 'regulatory/r06', component: R06Component, data: { title: 'R06 - Reporte de Calificaciones' } },
  
  { path: 'metrics', component: RiskMetricsComponent },
  { path: 'trends', component: RiskTrendsComponent },
  { path: 'alerts', component: RiskAlertsComponent },
  { path: '**', redirectTo: 'dashboard' }
];
