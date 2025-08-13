/**
 * SERVICIO DE AUDITORÍA Y TRAZABILIDAD PARA L01
 * Manual de Control de Inversiones - Marzo 2017
 * Superintendencia de Bancos del Ecuador
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { 
  ChangeLog, 
  L01AuditSummary, 
  L01AuditFilter, 
  L01AuditResponse,
  AuditOperationType,
  L01AuditableFields,
  RecordAuditSummary
} from '../models/l01-change-log.model';

@Injectable({
  providedIn: 'root'
})
export class L01AuditService {

  constructor(private http: HttpClient) { }

  /**
   * Registrar creación de un nuevo registro L01
   */
  logCreation(record: any): Observable<any> {
    const auditLog: ChangeLog = {
      id: Date.now(),
      recordId: record.id || 0,
      campo: L01AuditableFields.REGISTRO_COMPLETO,
      valorAnterior: null,
      valorNuevo: record,
      fechaCambio: new Date(),
      usuario: record.usuarioCreacion || this.getCurrentUser(),
      tipoOperacion: AuditOperationType.CREAR,
      comentario: 'Registro L01 creado exitosamente',
      ipAddress: this.getClientIP(),
      userAgent: navigator.userAgent,
      sessionId: this.getSessionId()
    };

    return this.http.post(`${environment.backendEndpoint}/nesl01/audit`, auditLog)
      .pipe(
        catchError(error => {
          console.error('Error al registrar auditoría de creación:', error);
          // Fallback: guardar en localStorage si falla la API
          this.saveAuditLogLocally(auditLog);
          return of(null);
        })
      );
  }

  /**
   * Registrar modificación de un campo específico
   */
  logFieldChange(
    recordId: number, 
    field: string, 
    oldValue: any, 
    newValue: any, 
    user: string
  ): Observable<any> {
    const auditLog: ChangeLog = {
      id: Date.now(),
      recordId: recordId,
      campo: field,
      valorAnterior: oldValue,
      valorNuevo: newValue,
      fechaCambio: new Date(),
      usuario: user,
      tipoOperacion: AuditOperationType.MODIFICAR,
      comentario: `Campo ${field} modificado de "${oldValue}" a "${newValue}"`,
      ipAddress: this.getClientIP(),
      userAgent: navigator.userAgent,
      sessionId: this.getSessionId()
    };

    return this.http.post(`${environment.backendEndpoint}/nesl01/audit`, auditLog)
      .pipe(
        catchError(error => {
          console.error('Error al registrar auditoría de modificación:', error);
          this.saveAuditLogLocally(auditLog);
          return of(null);
        })
      );
  }

  /**
   * Registrar eliminación de un registro
   */
  logDeletion(record: any, user: string): Observable<any> {
    const auditLog: ChangeLog = {
      id: Date.now(),
      recordId: record.id || 0,
      campo: L01AuditableFields.REGISTRO_COMPLETO,
      valorAnterior: record,
      valorNuevo: null,
      fechaCambio: new Date(),
      usuario: user,
      tipoOperacion: AuditOperationType.ELIMINAR,
      comentario: 'Registro L01 eliminado',
      ipAddress: this.getClientIP(),
      userAgent: navigator.userAgent,
      sessionId: this.getSessionId()
    };

    return this.http.post(`${environment.backendEndpoint}/nesl01/audit`, auditLog)
      .pipe(
        catchError(error => {
          console.error('Error al registrar auditoría de eliminación:', error);
          this.saveAuditLogLocally(auditLog);
          return of(null);
        })
      );
  }

  /**
   * Obtener historial de cambios de un registro específico
   */
  getChangeHistory(recordId: number): Observable<ChangeLog[]> {
    return this.http.get<ChangeLog[]>(`${environment.backendEndpoint}/nesl01/audit/${recordId}`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener historial de cambios:', error);
          // Fallback: obtener del localStorage
          return of(this.getAuditLogsLocally(recordId));
        })
      );
  }

  /**
   * Obtener resumen de auditoría de un registro
   */
  getAuditSummary(recordId: number): Observable<L01AuditSummary> {
    return this.http.get<L01AuditSummary>(`${environment.backendEndpoint}/nesl01/audit/summary/${recordId}`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener resumen de auditoría:', error);
          return of(this.generateAuditSummaryLocally(recordId));
        })
      );
  }

  /**
   * Buscar cambios con filtros
   */
  searchAuditLogs(filters: L01AuditFilter): Observable<L01AuditResponse> {
    let params = new HttpParams();
    
    if (filters.recordId) params = params.set('recordId', filters.recordId.toString());
    if (filters.usuario) params = params.set('usuario', filters.usuario);
    if (filters.tipoOperacion) params = params.set('tipoOperacion', filters.tipoOperacion);
    if (filters.fechaDesde) params = params.set('fechaDesde', filters.fechaDesde.toISOString());
    if (filters.fechaHasta) params = params.set('fechaHasta', filters.fechaHasta.toISOString());
    if (filters.campo) params = params.set('campo', filters.campo);

    return this.http.get<L01AuditResponse>(`${environment.backendEndpoint}/nesl01/audit/search`, { params })
      .pipe(
        catchError(error => {
          console.error('Error al buscar logs de auditoría:', error);
          return of(this.searchAuditLogsLocally(filters));
        })
      );
  }

  /**
   * Obtener estadísticas de auditoría
   */
  getAuditStatistics(): Observable<any> {
    return this.http.get(`${environment.backendEndpoint}/nesl01/audit/statistics`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener estadísticas de auditoría:', error);
          return of(this.generateAuditStatisticsLocally());
        })
      );
  }

  // Métodos auxiliares privados

  /**
   * Obtener usuario actual (placeholder - debe implementarse con servicio de autenticación)
   */
  private getCurrentUser(): string {
    // TODO: Implementar con servicio de autenticación real
    return 'Christian Aguirre';
  }

  /**
   * Obtener IP del cliente (placeholder)
   */
  private getClientIP(): string {
    // TODO: Implementar obtención real de IP
    return '192.168.1.1';
  }

  /**
   * Obtener ID de sesión (placeholder)
   */
  private getSessionId(): string {
    // TODO: Implementar con servicio de sesión real
    return `session_${Date.now()}`;
  }

  /**
   * Guardar log de auditoría localmente como fallback
   */
  private saveAuditLogLocally(auditLog: ChangeLog): void {
    try {
      const logs = this.getLocalAuditLogs();
      logs.push(auditLog);
      localStorage.setItem('l01_audit_logs', JSON.stringify(logs));
    } catch (error) {
      console.error('Error al guardar log localmente:', error);
    }
  }

  /**
   * Obtener logs de auditoría del localStorage
   */
  private getLocalAuditLogs(): ChangeLog[] {
    try {
      const logs = localStorage.getItem('l01_audit_logs');
      return logs ? JSON.parse(logs) : [];
    } catch (error) {
      console.error('Error al obtener logs locales:', error);
      return [];
    }
  }

  /**
   * Obtener logs de auditoría locales por recordId
   */
  private getAuditLogsLocally(recordId: number): ChangeLog[] {
    const logs = this.getLocalAuditLogs();
    return logs.filter(log => log.recordId === recordId);
  }

  /**
   * Buscar logs de auditoría locales con filtros
   */
  private searchAuditLogsLocally(filters: L01AuditFilter): L01AuditResponse {
    let logs = this.getLocalAuditLogs();
    
    if (filters.recordId) {
      logs = logs.filter(log => log.recordId === filters.recordId);
    }
    
    if (filters.usuario) {
      logs = logs.filter(log => log.usuario.toLowerCase().includes(filters.usuario!.toLowerCase()));
    }
    
    if (filters.tipoOperacion) {
      logs = logs.filter(log => log.tipoOperacion === filters.tipoOperacion);
    }
    
    if (filters.campo) {
      logs = logs.filter(log => log.campo === filters.campo);
    }
    
    if (filters.fechaDesde) {
      logs = logs.filter(log => new Date(log.fechaCambio) >= filters.fechaDesde!);
    }
    
    if (filters.fechaHasta) {
      logs = logs.filter(log => new Date(log.fechaCambio) <= filters.fechaHasta!);
    }

    return {
      changes: logs,
      total: logs.length,
      page: 1,
      pageSize: logs.length,
      hasMore: false
    };
  }

  /**
   * Generar resumen de auditoría localmente
   */
  private generateAuditSummaryLocally(recordId: number): L01AuditSummary {
    const logs = this.getAuditLogsLocally(recordId);
    const creationLog = logs.find(log => log.tipoOperacion === AuditOperationType.CREAR);
    const lastModificationLog = logs
      .filter(log => log.tipoOperacion === AuditOperationType.MODIFICAR)
      .sort((a, b) => new Date(b.fechaCambio).getTime() - new Date(a.fechaCambio).getTime())[0];

    return {
      recordId: recordId,
      totalChanges: logs.length,
      lastModified: lastModificationLog?.fechaCambio || new Date(),
      lastModifiedBy: lastModificationLog?.usuario || 'N/A',
      creationDate: creationLog?.fechaCambio || new Date(),
      createdBy: creationLog?.usuario || 'N/A',
      status: 'ACTIVO'
    };
  }

  /**
   * Generar estadísticas de auditoría localmente
   */
  private generateAuditStatisticsLocally(): any {
    const logs = this.getLocalAuditLogs();
    
    return {
      totalLogs: logs.length,
      operationsByType: {
        CREAR: logs.filter(log => log.tipoOperacion === AuditOperationType.CREAR).length,
        MODIFICAR: logs.filter(log => log.tipoOperacion === AuditOperationType.MODIFICAR).length,
        ELIMINAR: logs.filter(log => log.tipoOperacion === AuditOperationType.ELIMINAR).length
      },
      recentActivity: logs
        .sort((a, b) => new Date(b.fechaCambio).getTime() - new Date(a.fechaCambio).getTime())
        .slice(0, 10)
    };
  }
}
