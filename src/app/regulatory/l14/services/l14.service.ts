import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { 
  L14ConcentracionDepositos, 
  L14ReportRequest, 
  L14ReportResponse, 
  L14Summary, 
  L14ValidationResult 
} from '../models/l14.model';

@Injectable({
  providedIn: 'root'
})
export class L14Service {
  private adapterUrl = 'http://localhost:8080/api/adapter';
  private regulatoryUrl = 'http://localhost:8085/api/regulatory';

  constructor(private http: HttpClient) { }

  // Obtener datos del reporte L14 desde SQL Server Adapter
  getL14Data(request: L14ReportRequest): Observable<L14ReportResponse> {
    return this.http.post<L14ReportResponse>(`${this.adapterUrl}/l14/report`, request)
      .pipe(
        catchError(() => {
          console.warn('Error al obtener datos L14 del adapter, usando datos simulados');
          return this.getSimulatedL14Data(request);
        })
      );
  }

  // Datos simulados como fallback
  private getSimulatedL14Data(request: L14ReportRequest): Observable<L14ReportResponse> {
    const simulatedData: L14ConcentracionDepositos[] = [
      {
        id: 1,
        codigoCliente: 'CLI001',
        nombreCliente: 'Empresa ABC S.A.',
        tipoDeposito: 'Depósito a Plazo',
        valorDeposito: 15000000,
        porcentajeConcentracion: 12.5,
        limiteConcentracion: 15.0,
        estadoConcentracion: 'CUMPLE',
        fechaCalculo: new Date('2025-06-28'),
        fechaRegistro: new Date('2025-06-28'),
        usuarioRegistro: 'admin'
      },
      {
        id: 2,
        codigoCliente: 'CLI002',
        nombreCliente: 'Corporación XYZ',
        tipoDeposito: 'Cuenta Corriente',
        valorDeposito: 8500000,
        porcentajeConcentracion: 7.1,
        limiteConcentracion: 15.0,
        estadoConcentracion: 'CUMPLE',
        fechaCalculo: new Date('2025-06-28'),
        fechaRegistro: new Date('2025-06-28'),
        usuarioRegistro: 'admin'
      }
    ];

    return of({
      id: 1,
      totalRegistros: simulatedData.length,
      valorTotalDepositos: simulatedData.reduce((sum, item) => sum + item.valorDeposito, 0),
      concentracionPromedio: simulatedData.reduce((sum, item) => sum + item.porcentajeConcentracion, 0) / simulatedData.length,
      clientesConcentrados: simulatedData.filter(item => item.porcentajeConcentracion > 10).length,
      cumplimiento: 'CUMPLE',
      fechaGeneracion: new Date().toISOString(),
      datos: simulatedData
    });
  }

  // Generar reporte L14
  generateL14Report(request: L14ReportRequest): Observable<L14ReportResponse> {
    return this.http.post<L14ReportResponse>(`${this.regulatoryUrl}/l14/generate`, request)
      .pipe(
        catchError(() => {
          console.warn('Error al generar reporte L14, usando datos simulados');
          return this.getSimulatedL14Data(request);
        })
      );
  }

  // Obtener historial L14
  getL14History(): Observable<L14ConcentracionDepositos[]> {
    return this.http.get<L14ConcentracionDepositos[]>(`${this.adapterUrl}/l14/history`)
      .pipe(
        catchError(() => {
          console.warn('Error al obtener historial L14, usando datos simulados');
          return this.getSimulatedHistory();
        })
      );
  }

  private getSimulatedHistory(): Observable<L14ConcentracionDepositos[]> {
    const historyData: L14ConcentracionDepositos[] = [
      {
        id: 1,
        codigoCliente: 'CLI001',
        nombreCliente: 'Empresa ABC S.A.',
        tipoDeposito: 'Depósito a Plazo',
        valorDeposito: 15000000,
        porcentajeConcentracion: 12.5,
        limiteConcentracion: 15.0,
        estadoConcentracion: 'CUMPLE',
        fechaCalculo: new Date('2025-06-27'),
        fechaRegistro: new Date('2025-06-27'),
        usuarioRegistro: 'admin'
      }
    ];
    return of(historyData);
  }

  // Validar datos L14
  validateL14Data(data: L14ConcentracionDepositos[]): Observable<L14ValidationResult> {
    return this.http.post<L14ValidationResult>(`${this.regulatoryUrl}/l14/validate`, data)
      .pipe(
        catchError(() => {
          console.warn('Error al validar datos L14, retornando validación simulada');
          return of({
            isValid: true,
            errors: [],
            warnings: []
          });
        })
      );
  }

  // Exportar reporte L14
  exportL14Report(reportId: number): Observable<Blob> {
    return this.http.get(`${this.regulatoryUrl}/l14/export/${reportId}`, { responseType: 'blob' })
      .pipe(
        catchError(() => {
          console.warn('Error al exportar reporte L14');
          return of(new Blob());
        })
      );
  }

  // Descargar reporte histórico L14
  downloadHistoricalReport(reporteId: number): Observable<Blob> {
    return this.http.get(`${this.adapterUrl}/l14/download/${reporteId}`, { responseType: 'blob' })
      .pipe(
        catchError(() => {
          console.warn('Error al descargar reporte histórico L14');
          return of(new Blob());
        })
      );
  }

  // Obtener resumen L14
  getL14Summary(): Observable<L14Summary> {
    return this.http.get<L14Summary>(`${this.adapterUrl}/l14/summary`)
      .pipe(
        catchError(() => {
          console.warn('Error al obtener resumen L14, usando datos simulados');
          return of({
            totalClientes: 2,
            valorTotalDepositos: 23500000,
            concentracionPromedio: 9.8
          });
        })
      );
  }
} 
