import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface TxtLogEntry {
  timestamp: Date;
  level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';
  component: string;
  message: string;
  details?: any;
  errorStack?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TxtLoggerService {
  private logs: TxtLogEntry[] = [];
  private logsSubject = new BehaviorSubject<TxtLogEntry[]>([]);
  private maxLogs = 1000; // Máximo número de logs en memoria

  constructor() {
    this.info('TxtLoggerService', 'Sistema de logs TXT inicializado');
  }

  /**
   * Log de información
   */
  info(component: string, message: string, details?: any): void {
    this.addLog('INFO', component, message, details);
  }

  /**
   * Log de advertencia
   */
  warn(component: string, message: string, details?: any): void {
    this.addLog('WARN', component, message, details);
  }

  /**
   * Log de error
   */
  error(component: string, message: string, error?: any, details?: any): void {
    const errorStack = error instanceof Error ? error.stack : String(error);
    this.addLog('ERROR', component, message, details, errorStack);
  }

  /**
   * Log de debug
   */
  debug(component: string, message: string, details?: any): void {
    this.addLog('DEBUG', component, message, details);
  }

  /**
   * Log específico para exportaciones
   */
  logExport(type: 'download' | 'rvc_send', filename: string, success: boolean, details?: any): void {
    const message = `Exportación ${type}: ${filename} - ${success ? 'EXITOSA' : 'FALLIDA'}`;
    if (success) {
      this.info('ExportLogger', message, details);
    } else {
      this.error('ExportLogger', message, details);
    }
  }

  /**
   * Agregar entrada de log
   */
  private addLog(level: TxtLogEntry['level'], component: string, message: string, details?: any, errorStack?: string): void {
    const logEntry: TxtLogEntry = {
      timestamp: new Date(),
      level,
      component,
      message,
      details,
      errorStack
    };

    this.logs.push(logEntry);

    // Mantener solo los últimos logs
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    this.logsSubject.next([...this.logs]);

    // Escribir a archivo TXT (simulado en navegador)
    this.writeToTxtFile(logEntry);

    // También log a consola para desarrollo
    this.logToConsole(logEntry);
  }

  /**
   * Simular escritura a archivo TXT
   * En un entorno real, esto se enviaría al backend
   */
  private writeToTxtFile(logEntry: TxtLogEntry): void {
    try {
      const txtLine = this.formatLogForTxt(logEntry);
      
      // En navegador, guardamos en localStorage como simulación
      const existingLogs = localStorage.getItem('l01_system_logs') || '';
      const updatedLogs = existingLogs + txtLine + '\n';
      
      // Mantener solo los últimos 10000 caracteres para evitar overflow
      const trimmedLogs = updatedLogs.length > 10000 
        ? updatedLogs.slice(-10000) 
        : updatedLogs;
      
      localStorage.setItem('l01_system_logs', trimmedLogs);
      
      // Trigger para descargar archivo si es error crítico
      if (logEntry.level === 'ERROR') {
        this.triggerErrorLogDownload();
      }
    } catch (error) {
      console.error('Error al escribir log TXT:', error);
    }
  }

  /**
   * Formatear log para archivo TXT
   */
  private formatLogForTxt(logEntry: TxtLogEntry): string {
    const timestamp = logEntry.timestamp.toISOString();
    const level = logEntry.level.padEnd(5);
    const component = logEntry.component.padEnd(20);
    
    let line = `[${timestamp}] ${level} ${component} | ${logEntry.message}`;
    
    if (logEntry.details) {
      line += ` | DETAILS: ${JSON.stringify(logEntry.details)}`;
    }
    
    if (logEntry.errorStack) {
      line += ` | STACK: ${logEntry.errorStack.replace(/\n/g, ' | ')}`;
    }
    
    return line;
  }

  /**
   * Log a consola para desarrollo
   */
  private logToConsole(logEntry: TxtLogEntry): void {
    const message = `[${logEntry.component}] ${logEntry.message}`;
    
    switch (logEntry.level) {
      case 'INFO':
        console.log('ℹ️', message, logEntry.details || '');
        break;
      case 'WARN':
        console.warn('⚠️', message, logEntry.details || '');
        break;
      case 'ERROR':
        console.error('❌', message, logEntry.details || '', logEntry.errorStack || '');
        break;
      case 'DEBUG':
        console.debug('🔍', message, logEntry.details || '');
        break;
    }
  }

  /**
   * Descargar archivo de logs cuando hay errores críticos
   */
  private triggerErrorLogDownload(): void {
    try {
      const allLogs = localStorage.getItem('l01_system_logs') || '';
      if (allLogs.length > 0) {
        const blob = new Blob([allLogs], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `l01-error-logs-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.txt`;
        
        // Auto-descargar solo si hay más de 5 errores recientes
        const recentErrors = this.logs.filter(log => 
          log.level === 'ERROR' && 
          (Date.now() - log.timestamp.getTime()) < 60000 // Últimos 60 segundos
        );
        
        if (recentErrors.length >= 5) {
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          this.info('TxtLoggerService', 'Archivo de errores descargado automáticamente', {
            errorsCount: recentErrors.length
          });
        }
        
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error al descargar logs:', error);
    }
  }

  /**
   * Obtener logs como Observable
   */
  getLogs(): Observable<TxtLogEntry[]> {
    return this.logsSubject.asObservable();
  }

  /**
   * Obtener todos los logs
   */
  getAllLogs(): TxtLogEntry[] {
    return [...this.logs];
  }

  /**
   * Obtener solo errores
   */
  getErrors(): TxtLogEntry[] {
    return this.logs.filter(log => log.level === 'ERROR');
  }

  /**
   * Obtener logs por componente
   */
  getLogsByComponent(component: string): TxtLogEntry[] {
    return this.logs.filter(log => log.component === component);
  }

  /**
   * Limpiar logs
   */
  clearLogs(): void {
    this.logs = [];
    this.logsSubject.next([]);
    localStorage.removeItem('l01_system_logs');
    this.info('TxtLoggerService', 'Logs limpiados');
  }

  /**
   * Exportar logs a archivo TXT manualmente
   */
  exportLogsToTxt(): void {
    try {
      const allLogs = localStorage.getItem('l01_system_logs') || '';
      const blob = new Blob([allLogs], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `l01-system-logs-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.txt`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      window.URL.revokeObjectURL(url);
      
      this.info('TxtLoggerService', 'Logs exportados manualmente a TXT');
    } catch (error) {
      this.error('TxtLoggerService', 'Error al exportar logs', error);
    }
  }

  /**
   * Obtener estadísticas de logs
   */
  getLogStats(): { total: number; errors: number; warnings: number; info: number; debug: number } {
    return {
      total: this.logs.length,
      errors: this.logs.filter(log => log.level === 'ERROR').length,
      warnings: this.logs.filter(log => log.level === 'WARN').length,
      info: this.logs.filter(log => log.level === 'INFO').length,
      debug: this.logs.filter(log => log.level === 'DEBUG').length
    };
  }
}
