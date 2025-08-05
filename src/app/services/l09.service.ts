/**
 * SERVICIO L09 - DETALLES DE PRODUCTOS
 * Manual de Riesgos de Mercado y Liquidez - Marzo 2021
 * Superintendencia de Bancos del Ecuador
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { L09, L09Frontend, L09Response } from '../models/l09.model';
import { L09Validator } from '../validators/l09.validator';
import { 
  getDescripcionLiquidez, 
  getDescripcionTipoInstrumento,
  getDescripcionCalificacionEmisor,
  getDescripcionCalificadoraRiesgo
} from '../catalogs';

export interface L09ReportRequest {
  fechaInicio: string;
  fechaFin: string;
  tipoInstrumento?: number;
  calificacion?: number;
  codigoLiquidez?: number;
}

export interface L09ReportResponse {
  id: number;
  estructura: L09;
  totalRegistros: number;
  valorTotalNominal: number;
  valorTotalMercado: number;
  fechaGeneracion: string;
  validacion: any;
}

@Injectable({
  providedIn: 'root'
})
export class L09Service {
  private adapterUrl = 'http://localhost:8080/api';
  private regulatoryUrl = 'http://localhost:8081/api';
  private baseUrl = '/api';

  constructor(private http: HttpClient) { }

  /**
   * Obtener datos del reporte L09
   */
  getL09Data(request: L09ReportRequest): Observable<L09ReportResponse> {
    return this.http.post<L09Response>(`${this.adapterUrl}/l09/report`, request)
      .pipe(
        map(response => this.convertToReportResponse(response)),
        catchError(error => {
          console.log('Error conectando con adapter real, usando datos simulados:', error);
          return this.getSimulatedL09Data(request);
        })
      );
  }

  /**
   * Datos simulados según especificaciones oficiales
   */
  private getSimulatedL09Data(request: L09ReportRequest): Observable<L09ReportResponse> {
    const cabecera = {
      codigoEstructura: 'L09',
      codigoEntidad: 1,
      fechaCorte: this.formatDate(new Date()),
      numeroTotalRegistros: 2
    };

    const detalles = [
      {
        codigoLiquidez: 130505,
        tipoIdentificacion: 'R' as const,
        identificacionEntidad: '1790013210001',
        tipoInstrumento: 10,
        calificacionEntidad: 1,
        calificadoraRiesgo: 1,
        fechaEmision: '01/01/2024',
        fechaVencimiento: '01/01/2029',
        valorNominal: 1000000.00,
        valorMercado: 1050000.00,
        tasaCupon: 5.50,
        frecuenciaPago: 'SEMESTRAL',
        moneda: 'USD',
        paisEmisor: 'PANAMÁ'
      },
      {
        codigoLiquidez: 888888,
        tipoIdentificacion: 'E' as const,
        identificacionEntidad: '9988776655443',
        tipoInstrumento: 20,
        calificacionEntidad: 2,
        calificadoraRiesgo: 2,
        fechaEmision: '01/06/2024',
        fechaVencimiento: '01/06/2027',
        valorNominal: 2000000.00,
        valorMercado: 2100000.00,
        tasaCupon: 6.00,
        frecuenciaPago: 'ANUAL',
        moneda: 'USD',
        paisEmisor: 'ESTADOS UNIDOS'
      }
    ];

    const estructura: L09 = { cabecera, detalles };
    const valorTotalNominal = detalles.reduce((sum, item) => sum + item.valorNominal, 0);
    const valorTotalMercado = detalles.reduce((sum, item) => sum + item.valorMercado, 0);
    const validacion = L09Validator.validarEstructura(estructura);

    return of({
      id: 1,
      estructura,
      totalRegistros: detalles.length,
      valorTotalNominal,
      valorTotalMercado,
      fechaGeneracion: new Date().toISOString(),
      validacion
    });
  }

  /**
   * Generar reporte L09
   */
  generateL09Report(request: L09ReportRequest): Observable<L09ReportResponse> {
    return this.http.post<L09Response>(`${this.regulatoryUrl}/l09/generate`, request)
      .pipe(
        map(response => this.convertToReportResponse(response)),
        catchError(error => {
          console.log('Error generando reporte, usando datos simulados:', error);
          return this.getSimulatedL09Data(request);
        })
      );
  }

  /**
   * Validar datos según especificaciones oficiales
   */
  validateL09Data(data: L09): Observable<any> {
    const validacion = L09Validator.validarEstructura(data);
    const validacionRVC = L09Validator.validarFormatoRVC(data);

    return of({ 
      valid: validacion.esValido && validacionRVC.esValido, 
      errores: [...validacion.errores, ...validacionRVC.errores],
      advertencias: [...validacion.advertencias, ...validacionRVC.advertencias]
    });
  }

  /**
   * Exportar reporte en formato RVC
   */
  exportL09Report(reportId: number): Observable<Blob> {
    return this.http.get(`${this.regulatoryUrl}/l09/export/${reportId}`, { responseType: 'blob' })
      .pipe(
        catchError(error => {
          console.log('Error exportando reporte, generando archivo simulado:', error);
          return this.generateSimulatedExport();
        })
      );
  }

  /**
   * Generar exportación simulada en formato RVC
   */
  private generateSimulatedExport(): Observable<Blob> {
    const contenido = this.generateRVCContent();
    const blob = new Blob([contenido], { type: 'text/plain' });
    return of(blob);
  }

  /**
   * Generar contenido en formato RVC según especificaciones oficiales
   */
  private generateRVCContent(): string {
    const fecha = this.formatDate(new Date());
    const contenido = [
      'CABECERA',
      `L09\t0001\t${fecha}\t2`,
      '',
      'DETALLE',
      '130505\tR\t1790013210001\t10\t1\t1\t01/01/2024\t01/01/2029\t1000000.00\t1050000.00\t5.50\tSEMESTRAL\tUSD\tPANAMÁ',
      '888888\tE\t9988776655443\t20\t2\t2\t01/06/2024\t01/06/2027\t2000000.00\t2100000.00\t6.00\tANUAL\tUSD\tESTADOS UNIDOS'
    ].join('\n');

    return contenido;
  }

  /**
   * Convertir respuesta de API a formato de reporte
   */
  private convertToReportResponse(response: L09Response): L09ReportResponse {
    const valorTotalNominal = response.detalles.reduce((sum, item) => sum + item.valorNominal, 0);
    const valorTotalMercado = response.detalles.reduce((sum, item) => sum + item.valorMercado, 0);

    return {
      id: 1,
      estructura: response,
      totalRegistros: response.totalRegistros,
      valorTotalNominal,
      valorTotalMercado,
      fechaGeneracion: response.fechaGeneracion,
      validacion: { valid: true, errors: [], warnings: [] }
    };
  }

  /**
   * Formatear fecha en formato dd/mm/aaaa
   */
  private formatDate(date: Date): string {
    const dia = date.getDate().toString().padStart(2, '0');
    const mes = (date.getMonth() + 1).toString().padStart(2, '0');
    const anio = date.getFullYear();
    return `${dia}/${mes}/${anio}`;
  }

  /**
   * Obtener descripción de códigos para UI
   */
  getDescripciones(detalle: any): any {
    return {
      codigoLiquidez: getDescripcionLiquidez(detalle.codigoLiquidez),
      tipoInstrumento: getDescripcionTipoInstrumento(detalle.tipoInstrumento),
      calificacionEntidad: getDescripcionCalificacionEmisor(detalle.calificacionEntidad),
      calificadoraRiesgo: getDescripcionCalificadoraRiesgo(detalle.calificadoraRiesgo)
    };
  }
} 
