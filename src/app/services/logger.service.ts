import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export interface LogEntry {
  timestamp: Date;
  level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';
  component: string;
  message: string;
  data?: any;
  error?: any;
}

/**
 * Servicio de logging para capturar errores y eventos del sistema L01
 */
@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  private logs: LogEntry[] = [];
  private maxLogs = 1000; // Máximo número de logs en memoria

  constructor() {
    this.info('LoggerService', 'Servicio de logging inicializado');
  }

  /**
   * Log de información
   */
  info(component: string, message: string, data?: any): void {
    this.addLog('INFO', component, message, data);
  }

  /**
   * Log de advertencia
   */
  warn(component: string, message: string, data?: any): void {
    this.addLog('WARN', component, message, data);
    console.warn(`[${component}] ${message}`, data);
  }

  /**
   * Log de error
   */
  error(component: string, message: string, error?: any, data?: any): void {
    this.addLog('ERROR', component, message, data, error);
    console.error(`[${component}] ${message}`, error, data);
  }

  /**
   * Log de debug (solo en desarrollo)
   */
  debug(component: string, message: string, data?: any): void {
    if (!environment.production) {
      this.addLog('DEBUG', component, message, data);
      console.debug(`[${component}] ${message}`, data);
    }
  }

  /**
   * Agregar entrada de log
   */
  private addLog(level: LogEntry['level'], component: string, message: string, data?: any, error?: any): void {
    const logEntry: LogEntry = {
      timestamp: new Date(),
      level,
      component,
      message,
      data,
      error
    };

    this.logs.push(logEntry);

    // Mantener solo los últimos maxLogs
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    // Log en consola si está habilitado
    if (environment.debug?.enableLogs) {
      console.log(`[${level}] [${component}] ${message}`, data || '');
    }
  }

  /**
   * Obtener todos los logs
   */
  getAllLogs(): LogEntry[] {
    return [...this.logs];
  }

  /**
   * Obtener logs por nivel
   */
  getLogsByLevel(level: LogEntry['level']): LogEntry[] {
    return this.logs.filter(log => log.level === level);
  }

  /**
   * Obtener logs por componente
   */
  getLogsByComponent(component: string): LogEntry[] {
    return this.logs.filter(log => log.component === component);
  }

  /**
   * Obtener logs de errores
   */
  getErrors(): LogEntry[] {
    return this.getLogsByLevel('ERROR');
  }

  /**
   * Obtener logs de advertencias
   */
  getWarnings(): LogEntry[] {
    return this.getLogsByLevel('WARN');
  }

  /**
   * Limpiar logs
   */
  clearLogs(): void {
    this.logs = [];
    this.info('LoggerService', 'Logs limpiados');
  }

  /**
   * Exportar logs como texto
   */
  exportLogsAsText(): string {
    return this.logs.map(log => {
      const timestamp = log.timestamp.toISOString();
      const data = log.data ? JSON.stringify(log.data) : '';
      const error = log.error ? JSON.stringify(log.error) : '';
      return `[${timestamp}] [${log.level}] [${log.component}] ${log.message} ${data} ${error}`;
    }).join('\n');
  }

  /**
   * Descargar logs como archivo
   */
  downloadLogs(): void {
    const content = this.exportLogsAsText();
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sudbank-l01-logs-${new Date().toISOString().split('T')[0]}.txt`;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  /**
   * Obtener resumen de logs
   */
  getLogSummary(): any {
    const summary = {
      total: this.logs.length,
      errors: this.getErrors().length,
      warnings: this.getWarnings().length,
      info: this.getLogsByLevel('INFO').length,
      debug: this.getLogsByLevel('DEBUG').length,
      lastError: this.getErrors().slice(-1)[0] || null,
      lastWarning: this.getWarnings().slice(-1)[0] || null
    };

    return summary;
  }

  /**
   * Log específico para operaciones L01
   */
  logL01Operation(operation: string, success: boolean, data?: any, error?: any): void {
    if (success) {
      this.info('L01Operation', `${operation} completada exitosamente`, data);
    } else {
      this.error('L01Operation', `Error en ${operation}`, error, data);
    }
  }

  /**
   * Log específico para exportación
   */
  logExport(type: 'download' | 'rvc', filename: string, success: boolean, error?: any): void {
    const operation = type === 'download' ? 'Descarga' : 'Envío RVC';
    if (success) {
      this.info('L01Export', `${operation} exitoso: ${filename}`);
    } else {
      this.error('L01Export', `Error en ${operation}: ${filename}`, error);
    }
  }

  /**
   * Log específico para APIs
   */
  logApiCall(endpoint: string, method: string, success: boolean, data?: any, error?: any): void {
    if (success) {
      this.debug('ApiCall', `${method} ${endpoint} - Exitoso`, data);
    } else {
      this.error('ApiCall', `${method} ${endpoint} - Error`, error, data);
    }
  }

  /**
   * Log específico para validaciones
   */
  logValidation(field: string, valid: boolean, value?: any, error?: string): void {
    if (valid) {
      this.debug('Validation', `${field} válido`, { value });
    } else {
      this.warn('Validation', `${field} inválido: ${error}`, { value });
    }
  }
}
