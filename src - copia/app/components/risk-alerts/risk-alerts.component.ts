import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { RiskService } from '../../services/risk.service';
import { RiskAlert, AlertType, RiskLevel, AlertStatus } from '../../models/risk-alert.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-risk-alerts',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    ToastModule,
    TooltipModule
  ],
  providers: [MessageService],
  templateUrl: './risk-alerts.component.html',
  styleUrls: ['./risk-alerts.component.css']
})
export class RiskAlertsComponent implements OnInit {
  alerts: RiskAlert[] = [];
  selectedAlert: RiskAlert | null = null;
  loading: boolean = false;

  constructor(
    private riskService: RiskService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loadAlerts();
  }

  loadAlerts(): void {
    this.loading = true;
    this.riskService.getActiveAlerts().subscribe({
      next: (alerts) => {
        this.alerts = alerts;
        this.loading = false;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar las alertas'
        });
        this.loading = false;
      }
    });
  }

  acknowledgeAlert(alert: RiskAlert): void {
    this.riskService.acknowledgeAlert(alert.id).subscribe({
      next: (updatedAlert) => {
        const index = this.alerts.findIndex(a => a.id === updatedAlert.id);
        if (index !== -1) {
          this.alerts[index] = updatedAlert;
        }
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Alerta reconocida'
        });
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo reconocer la alerta'
        });
      }
    });
  }

  resolveAlert(alert: RiskAlert): void {
    this.riskService.resolveAlert(alert.id).subscribe({
      next: (updatedAlert) => {
        const index = this.alerts.findIndex(a => a.id === updatedAlert.id);
        if (index !== -1) {
          this.alerts[index] = updatedAlert;
        }
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Alerta resuelta'
        });
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo resolver la alerta'
        });
      }
    });
  }

  getSeverityClass(level: RiskLevel): string {
    switch (level) {
      case RiskLevel.CRITICAL:
        return 'danger';
      case RiskLevel.HIGH:
        return 'warning';
      case RiskLevel.MEDIUM:
        return 'info';
      case RiskLevel.LOW:
        return 'success';
      default:
        return 'secondary';
    }
  }

  getAlertStatusClass(status: AlertStatus): string {
    switch (status) {
      case AlertStatus.ACTIVE:
        return 'status-active';
      case AlertStatus.ACKNOWLEDGED:
        return 'status-acknowledged';
      case AlertStatus.RESOLVED:
        return 'status-resolved';
      default:
        return '';
    }
  }
} 
