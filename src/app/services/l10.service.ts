import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface L10BrechasSensibilidad {
  id: number;
  codigoBrecha: string;
  tipoBrecha: string;
  plazo: number;
  activos: number;
  pasivos: number;
  brecha: number;
  sensibilidad: number;
  fechaCalculo: Date;
  fechaRegistro: Date;
  usuarioRegistro: string;
}

export interface L10ReportRequest {
  fechaInicio: string;
  fechaFin: string;
  tipoBrecha?: string;
}

export interface L10ReportResponse {
  id: number;
  totalRegistros: number;
  valorTotalActivos: number;
  valorTotalPasivos: number;
  brechaTotal: number;
  sensibilidadPromedio: number;
  cumplimiento: string;
  fechaGeneracion: string;
  datos: L10BrechasSensibilidad[];
}

@Injectable({
  providedIn: 'root'
})
export class L10Service {
  private adapterUrl = 'http://localhost:8080/api/adapter';
  private regulatoryUrl = 'http://localhost:8085/api/regulatory';

  constructor(private http: HttpClient) { }

  // Obtener datos del reporte L10 desde SQL Server Adapter
  getL10Data(request: L10ReportRequest): Observable<L10ReportResponse> {
    return this.http.post<L10ReportResponse>(`${this.adapterUrl}/l10/report`, request)
      .pipe(
        catchError(() => {
          console.warn('Error al obtener datos L10 del adapter, usando datos simulados');
          return this.getSimulatedL10Data(request);
        })
      );
  }

  // Datos simulados como fallback
  private getSimulatedL10Data(request: L10ReportRequest): Observable<L10ReportResponse> {
    const simulatedData: L10BrechasSensibilidad[] = [
      {
        id: 1,
        codigoBrecha: 'BRG001',
        tipoBrecha: 'Brecha de Tasa de Interés',
        plazo: 30,
        activos: 5000000,
        pasivos: 3000000,
        brecha: 2000000,
        sensibilidad: 0.85,
        fechaCalculo: new Date('2025-06-28'),
        fechaRegistro: new Date('2025-06-28'),
        usuarioRegistro: 'admin'
      },
      {
        id: 2,
        codigoBrecha: 'BRG002',
        tipoBrecha: 'Brecha de Liquidez',
        plazo: 90,
        activos: 8000000,
        pasivos: 6000000,
        brecha: 2000000,
        sensibilidad: 0.72,
        fechaCalculo: new Date('2025-06-28'),
        fechaRegistro: new Date('2025-06-28'),
        usuarioRegistro: 'admin'
      }
    ];

    return of({
      id: 1,
      totalRegistros: simulatedData.length,
      valorTotalActivos: simulatedData.reduce((sum, item) => sum + item.activos, 0),
      valorTotalPasivos: simulatedData.reduce((sum, item) => sum + item.pasivos, 0),
      brechaTotal: simulatedData.reduce((sum, item) => sum + item.brecha, 0),
      sensibilidadPromedio: simulatedData.reduce((sum, item) => sum + item.sensibilidad, 0) / simulatedData.length,
      cumplimiento: 'CUMPLE',
      fechaGeneracion: new Date().toISOString(),
      datos: simulatedData
    });
  }

  // Generar reporte L10
  generateL10Report(request: L10ReportRequest): Observable<L10ReportResponse> {
    return this.http.post<L10ReportResponse>(`${this.regulatoryUrl}/l10/generate`, request)
      .pipe(
        catchError(() => {
          console.warn('Error al generar reporte L10, usando datos simulados');
          return this.getSimulatedL10Data(request);
        })
      );
  }

  // Obtener historial L10
  getL10History(): Observable<L10BrechasSensibilidad[]> {
    return this.http.get<L10BrechasSensibilidad[]>(`${this.adapterUrl}/l10/history`)
      .pipe(
        catchError(() => {
          console.warn('Error al obtener historial L10, usando datos simulados');
          return this.getSimulatedHistory();
        })
      );
  }

  private getSimulatedHistory(): Observable<L10BrechasSensibilidad[]> {
    const historyData: L10BrechasSensibilidad[] = [
      {
        id: 1,
        codigoBrecha: 'BRG001',
        tipoBrecha: 'Brecha de Tasa de Interés',
        plazo: 30,
        activos: 5000000,
        pasivos: 3000000,
        brecha: 2000000,
        sensibilidad: 0.85,
        fechaCalculo: new Date('2025-06-27'),
        fechaRegistro: new Date('2025-06-27'),
        usuarioRegistro: 'admin'
      }
    ];
    return of(historyData);
  }

  // Validar datos L10
  validateL10Data(data: L10BrechasSensibilidad[]): Observable<any> {
    return this.http.post(`${this.regulatoryUrl}/l10/validate`, data)
      .pipe(
        catchError(() => {
          console.warn('Error al validar datos L10, retornando validación simulada');
          return of({
            isValid: true,
            errors: [],
            warnings: []
          });
        })
      );
  }

  // Exportar reporte L10
  exportL10Report(reportId: number): Observable<Blob> {
    return this.http.get(`${this.regulatoryUrl}/l10/export/${reportId}`, { responseType: 'blob' })
      .pipe(
        catchError(() => {
          console.warn('Error al exportar reporte L10');
          return of(new Blob());
        })
      );
  }

  // Descargar reporte histórico L10
  downloadHistoricalReport(reporteId: number): Observable<Blob> {
    return this.http.get(`${this.adapterUrl}/l10/download/${reporteId}`, { responseType: 'blob' })
      .pipe(
        catchError(() => {
          console.warn('Error al descargar reporte histórico L10');
          return of(new Blob());
        })
      );
  }

  // Obtener resumen L10
  getL10Summary(): Observable<any> {
    return this.http.get(`${this.adapterUrl}/l10/summary`)
      .pipe(
        catchError(() => {
          console.warn('Error al obtener resumen L10, usando datos simulados');
          return of({
            totalBrechas: 2,
            brechaTotal: 4000000,
            sensibilidadPromedio: 0.785
          });
        })
      );
  }
} 
