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
import { L01MainComponent } from './pages/l01-dashboard/l01-main/l01-main.component';
import { L03MainComponent } from './pages/l03-dashboard/l03-main/l03-main.component';
import { L02MainComponent } from './pages/l02-dashboard/l02-main/l02-main.component';
import { L05MainComponent } from './pages/l05-dashboard/l05-main/l05-main.component';
import { R02MainComponent } from './pages/r02-dashboard/r02-main/r02-main.component';

// Componentes L01 eliminados - Solo se mantiene L01MainComponent

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', children: [
    { path: '', component: DashboardMetricsComponent },
    { path: 'status', component: DashboardStatusComponent },
    { path: 'shortcuts', component: DashboardShortcutsComponent },
  ]},
  
  // Rutas directas (para compatibilidad)
  { path: 'l01', component: L01MainComponent },
  { path: 'l02', component: L02MainComponent },
  { path: 'l05', component: L05MainComponent },
  { path: 'r02', component: R02MainComponent },
  { path: 'l08', children: [
    { path: '', component: L08MainComponent },
    { path: 'historico', component: L08HistoricoComponent },
    { path: 'comparar', component: L08CompararComponent },
    { path: 'auditoria', component: L08AuditoriaComponent },
  ]},

  { path: 'l03', component: L03MainComponent },
  
      // Rutas con prefijo regulatory (para consistencia con el menú)
  { path: 'regulatory', children: [
    { path: 'l01', component: L01MainComponent },
    { path: 'l02', component: L02MainComponent },
    { path: 'l05', component: L05MainComponent },
    { path: 'r02', component: R02MainComponent },
    { path: 'l08', children: [
      { path: '', component: L08MainComponent },
      { path: 'historico', component: L08HistoricoComponent },
      { path: 'comparar', component: L08CompararComponent },
      { path: 'auditoria', component: L08AuditoriaComponent },
    ]},

    { path: 'l03', component: L03MainComponent },

    // Placeholder routes para otros reportes (cuando se implementen)
    { path: 'l02', redirectTo: 'l02' },
    { path: 'l03', redirectTo: 'l03' },
    { path: 'l04', redirectTo: 'l04' },
    { path: 'l05', redirectTo: 'l05' },
    { path: 'l06', redirectTo: 'l01' },
    { path: 'l07', redirectTo: 'l08' },
    { path: 'l09', redirectTo: 'l01' },
    { path: 'l10', redirectTo: 'l01' },
    { path: 'l11', redirectTo: 'l01' },
    { path: 'l12', redirectTo: 'l01' },
    { path: 'l13', redirectTo: 'l01' },
    { path: 'l14', redirectTo: 'l01' },
    { path: 'l31', redirectTo: 'l01' },
    { path: 'r01', redirectTo: 'l01' },
    { path: 'r02', redirectTo: 'r02' },
    { path: 'r03', redirectTo: 'l01' },
    { path: 'r04', redirectTo: 'l01' },
    { path: 'r05', redirectTo: 'l01' },
    { path: 'r06', redirectTo: 'l01' },
  ]},
  
  { path: 'l08-test', component: L08MainComponent },
  
  // Rutas para componentes que existen
  { path: 'metrics', component: RiskMetricsComponent },
  { path: 'trends', component: RiskTrendsComponent },
  { path: 'alerts', component: RiskAlertsComponent },
  { path: '**', redirectTo: 'dashboard' }
];
