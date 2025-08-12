import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoggerService, LogEntry } from '../../../services/logger.service';
import { interval, Subscription } from 'rxjs';

/**
 * Componente para monitorear logs en tiempo real durante las pruebas
 */
@Component({
  selector: 'app-log-monitor',
  templateUrl: './log-monitor.component.html',
  styleUrls: ['./log-monitor.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LogMonitorComponent implements OnInit, OnDestroy {

  logs: LogEntry[] = [];
  filteredLogs: LogEntry[] = [];
  selectedLevel: string = 'ALL';
  selectedComponent: string = 'ALL';
  autoRefresh = true;
  
  private refreshSubscription?: Subscription;
  
  // Estadísticas
  logSummary: any = {};
  
  // Filtros disponibles
  levels = ['ALL', 'ERROR', 'WARN', 'INFO', 'DEBUG'];
  components: string[] = ['ALL'];

  constructor(private logger: LoggerService) { }

  ngOnInit(): void {
    this.loadLogs();
    this.updateComponents();
    
    if (this.autoRefresh) {
      this.startAutoRefresh();
    }
  }

  ngOnDestroy(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  /**
   * Cargar logs desde el servicio
   */
  loadLogs(): void {
    this.logs = this.logger.getAllLogs();
    this.logSummary = this.logger.getLogSummary();
    this.applyFilters();
    this.updateComponents();
  }

  /**
   * Aplicar filtros a los logs
   */
  applyFilters(): void {
    this.filteredLogs = this.logs.filter(log => {
      const levelMatch = this.selectedLevel === 'ALL' || log.level === this.selectedLevel;
      const componentMatch = this.selectedComponent === 'ALL' || log.component === this.selectedComponent;
      return levelMatch && componentMatch;
    });
    
    // Ordenar por timestamp descendente (más recientes primero)
    this.filteredLogs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  /**
   * Actualizar lista de componentes disponibles
   */
  updateComponents(): void {
    const uniqueComponents = [...new Set(this.logs.map(log => log.component))];
    this.components = ['ALL', ...uniqueComponents.sort()];
  }

  /**
   * Cambiar filtro de nivel
   */
  onLevelChange(level: string): void {
    this.selectedLevel = level;
    this.applyFilters();
  }

  /**
   * Cambiar filtro de componente
   */
  onComponentChange(component: string): void {
    this.selectedComponent = component;
    this.applyFilters();
  }

  /**
   * Limpiar todos los logs
   */
  clearLogs(): void {
    this.logger.clearLogs();
    this.loadLogs();
  }

  /**
   * Descargar logs como archivo
   */
  downloadLogs(): void {
    this.logger.downloadLogs();
  }

  /**
   * Alternar auto-refresh
   */
  toggleAutoRefresh(): void {
    this.autoRefresh = !this.autoRefresh;
    
    if (this.autoRefresh) {
      this.startAutoRefresh();
    } else {
      this.stopAutoRefresh();
    }
  }

  /**
   * Iniciar auto-refresh
   */
  private startAutoRefresh(): void {
    this.refreshSubscription = interval(2000).subscribe(() => {
      this.loadLogs();
    });
  }

  /**
   * Detener auto-refresh
   */
  private stopAutoRefresh(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  /**
   * Obtener clase CSS para el nivel de log
   */
  getLogLevelClass(level: string): string {
    switch (level) {
      case 'ERROR': return 'log-error';
      case 'WARN': return 'log-warn';
      case 'INFO': return 'log-info';
      case 'DEBUG': return 'log-debug';
      default: return 'log-default';
    }
  }

  /**
   * Formatear timestamp
   */
  formatTimestamp(timestamp: Date): string {
    return timestamp.toLocaleTimeString('es-EC', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      fractionalSecondDigits: 3
    });
  }

  /**
   * Formatear datos como JSON
   */
  formatData(data: any): string {
    if (!data) return '';
    try {
      return JSON.stringify(data, null, 2);
    } catch {
      return String(data);
    }
  }

  /**
   * Obtener color del badge para el nivel
   */
  getBadgeClass(level: string): string {
    switch (level) {
      case 'ERROR': return 'badge-danger';
      case 'WARN': return 'badge-warning';
      case 'INFO': return 'badge-info';
      case 'DEBUG': return 'badge-secondary';
      default: return 'badge-light';
    }
  }

  /**
   * Refrescar manualmente
   */
  refreshNow(): void {
    this.loadLogs();
  }

  /**
   * Obtener logs de errores recientes
   */
  getRecentErrors(): LogEntry[] {
    return this.logger.getErrors().slice(-5);
  }

  /**
   * Obtener logs de advertencias recientes
   */
  getRecentWarnings(): LogEntry[] {
    return this.logger.getWarnings().slice(-5);
  }

  /**
   * Track by function para optimizar rendimiento
   */
  trackByTimestamp(index: number, log: LogEntry): string {
    return log.timestamp.toISOString();
  }
}
