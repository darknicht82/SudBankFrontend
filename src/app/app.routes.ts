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
import { L04MainComponent } from './pages/l04-dashboard/l04-main/l04-main.component';
import { R04MainComponent } from './pages/r04-dashboard/r04-main/r04-main.component';
import { R05MainComponent } from './pages/r05-dashboard/r05-main/r05-main.component';
import { R08MainComponent } from './pages/r08-dashboard/r08-main/r08-main.component';
import { R11MainComponent } from './pages/r11-dashboard/r11-main/r11-main.component';
import { R09MainComponent } from './pages/r09-dashboard/r09-main/r09-main.component';
import { R13MainComponent } from './pages/r13-dashboard/r13-main/r13-main.component';
import { R10MainComponent } from './pages/r10-dashboard/r10-main/r10-main.component';
import { R21MainComponent } from './pages/r21-dashboard/r21-main/r21-main.component';
import { R12MainComponent } from './pages/r12-dashboard/r12-main/r12-main.component';
import { R20MainComponent } from './pages/r20-dashboard/r20-main/r20-main.component';
import { R22MainComponent } from './pages/r22-dashboard/r22-main/r22-main.component';
import { L06MainComponent } from './pages/l06-dashboard/l06-main/l06-main.component';
// Componentes L01 eliminados - Solo se mantiene L01MainComponent

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard', children: [
      { path: '', component: DashboardMetricsComponent },
      { path: 'status', component: DashboardStatusComponent },
      { path: 'shortcuts', component: DashboardShortcutsComponent },
    ]
  },

  // Rutas directas (para compatibilidad)
  { path: 'l01', component: L01MainComponent },
  { path: 'l02', component: L02MainComponent },
  { path: 'l05', component: L05MainComponent },
  { path: 'l06', component: L06MainComponent },
  { path: 'r02', component: R02MainComponent },
  { path: 'l03', component: L03MainComponent },
  { path: 'l04', component: L04MainComponent },
  { path: 'r04', component: R04MainComponent },
  { path: 'r05', component: R05MainComponent },
  { path: 'r08', component: R08MainComponent },
  { path: 'r09', component: R09MainComponent },
  { path: 'r10', component: R10MainComponent },
  { path: 'r11', component: R11MainComponent },
  { path: 'r12', component: R12MainComponent },
  { path: 'r13', component: R13MainComponent },
  { path: 'r21', component: R21MainComponent },
  { path: 'r20', component: R20MainComponent },
  { path: 'r22', component: R22MainComponent },
  {
    path: 'l08', children: [
      { path: '', component: L08MainComponent },
      { path: 'historico', component: L08HistoricoComponent },
      { path: 'comparar', component: L08CompararComponent },
      { path: 'auditoria', component: L08AuditoriaComponent },
    ]
  },

  { path: 'l03', component: L03MainComponent },

  // Rutas con prefijo regulatory (para consistencia con el menú)
  {
    path: 'regulatory', children: [
      { path: 'l01', component: L01MainComponent },
      { path: 'l02', component: L02MainComponent },
      { path: 'l05', component: L05MainComponent },
      { path: 'l06', component: L06MainComponent },
      { path: 'r02', component: R02MainComponent },
      { path: 'l04', component: L04MainComponent },
      { path: 'l03', component: L03MainComponent },
      { path: 'r04', component: R04MainComponent },
      { path: 'r05', component: R05MainComponent },
      { path: 'r08', component: R08MainComponent },
      { path: 'r09', component: R09MainComponent },
      { path: 'r10', component: R10MainComponent },
      { path: 'r11', component: R11MainComponent },
      { path: 'r12', component: R12MainComponent },
      { path: 'r13', component: R13MainComponent },
      { path: 'r21', component: R21MainComponent },
      { path: 'r20', component: R20MainComponent },
      { path: 'r22', component: R22MainComponent },

      {
        path: 'l08', children: [
          { path: '', component: L08MainComponent },
          { path: 'historico', component: L08HistoricoComponent },
          { path: 'comparar', component: L08CompararComponent },
          { path: 'auditoria', component: L08AuditoriaComponent },
        ]
      },

      { path: 'l03', component: L03MainComponent },

      // Placeholder routes para otros reportes (cuando se implementen)
      { path: 'l02', redirectTo: 'l02' },
      { path: 'l03', redirectTo: 'l03' },
      { path: 'l04', redirectTo: 'l04' },
      { path: 'l05', redirectTo: 'l05' },
      { path: 'l06', redirectTo: 'l06' },
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
      { path: 'r04', redirectTo: 'r04' },
      { path: 'r05', redirectTo: 'r05' },
      { path: 'r09', redirectTo: 'r09' },
      { path: 'r10', redirectTo: 'r10' },
      { path: 'r11', redirectTo: 'r11' },
      { path: 'r12', redirectTo: 'r12' },
      { path: 'r13', redirectTo: 'r13' },
      { path: 'r21', redirectTo: 'r21' },
      { path: 'r20', redirectTo: 'r20' },
      { path: 'r22', redirectTo: 'r22' },
    ]
  },

  { path: 'l08-test', component: L08MainComponent },

  // Rutas para componentes que existen
  { path: 'metrics', component: RiskMetricsComponent },
  { path: 'trends', component: RiskTrendsComponent },
  { path: 'alerts', component: RiskAlertsComponent },
  { path: '**', redirectTo: 'dashboard' }
];
