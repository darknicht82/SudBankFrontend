import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  template: `
    <div class="layout-wrapper">
      <div class="menu-logo-bar">
        <div class="logo-placeholder">SudBank</div>
        <p-menubar [model]="menuItems" [style]="{'margin-bottom': '1rem', 'flex': '1'}"></p-menubar>
      </div>
      <div class="content-wrapper">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      routerLink: '/dashboard'
    },
    {
      label: 'Reportes Regulatorios',
      icon: 'pi pi-folder-open',
      items: [
        {
          label: 'Clientes y Emisores',
          icon: 'pi pi-users',
          items: [
            { label: 'L01 - Listado de Clientes', icon: 'pi pi-user', routerLink: '/regulatory/l01' },
            { label: 'L02 - Emisores y Custodios', icon: 'pi pi-building', routerLink: '/regulatory/l02' },
            { label: 'L03 - Contrapartes', icon: 'pi pi-handshake', routerLink: '/regulatory/l03' },
            { label: 'L04 - Instrumentos Financieros', icon: 'pi pi-credit-card', routerLink: '/regulatory/l04' },
            { label: 'L05 - Depósitos', icon: 'pi pi-wallet', routerLink: '/regulatory/l05' },
            { label: 'L06 - Préstamos', icon: 'pi pi-money-bill', routerLink: '/regulatory/l06' }
          ]
        },
        {
          label: 'Liquidez',
          icon: 'pi pi-chart-bar',
          items: [
            { label: 'L07 - Liquidez Estructural', icon: 'pi pi-chart-line', routerLink: '/regulatory/l07' },
            { label: 'L08 - Liquidez y Gestión de Riesgos', icon: 'pi pi-chart-line', routerLink: '/regulatory/l08' },
            { label: 'L11 - Depósitos y Pasivos', icon: 'pi pi-dollar', routerLink: '/regulatory/l11' },
            { label: 'L14 - Concentración de Depósitos', icon: 'pi pi-users', routerLink: '/regulatory/l14' }
          ]
        },
        {
          label: 'Inversiones y Capital',
          icon: 'pi pi-sliders-h',
          items: [
            { label: 'L09 - Cartera de Inversiones', icon: 'pi pi-chart-pie', routerLink: '/regulatory/l09' },
            { label: 'L10 - Brechas de Sensibilidad', icon: 'pi pi-chart-line', routerLink: '/regulatory/l10' },
            { label: 'L31 - Estructura de Capital', icon: 'pi pi-coins', routerLink: '/regulatory/l31' }
          ]
        },
        {
          label: 'Créditos y Garantías',
          icon: 'pi pi-list',
          items: [
            { label: 'L12 - Cartera de Préstamos', icon: 'pi pi-credit-card', routerLink: '/regulatory/l12' },
            { label: 'L13 - Cartera de Garantías', icon: 'pi pi-shield', routerLink: '/regulatory/l13' }
          ]
        },
        {
          label: 'Reportes RVC',
          icon: 'pi pi-file',
          items: [
            { label: 'R01 - Reporte de Riesgo', icon: 'pi pi-exclamation-triangle', routerLink: '/regulatory/r01' },
            { label: 'R02 - Reporte de Liquidez', icon: 'pi pi-chart-bar', routerLink: '/regulatory/r02' },
            { label: 'R03 - Reporte de Capital', icon: 'pi pi-coins', routerLink: '/regulatory/r03' },
            { label: 'R04 - Reporte de Operaciones', icon: 'pi pi-calculator', routerLink: '/regulatory/r04' },
            { label: 'R05 - Reporte de Concentración', icon: 'pi pi-chart-pie', routerLink: '/regulatory/r05' },
            { label: 'R06 - Reporte de Calificaciones', icon: 'pi pi-star', routerLink: '/regulatory/r06' }
          ]
        }
      ]
    },
    {
      label: 'Métricas Generales',
      icon: 'pi pi-chart-bar',
      routerLink: '/metrics'
    },
    {
      label: 'Alertas de Reportes',
      icon: 'pi pi-bell',
      routerLink: '/alerts'
    }
  ];

  constructor(private router: Router) {
    // Log para debug
    console.log('AppComponent inicializado');
    console.log('Rutas disponibles:', this.router.config);
  }
}
