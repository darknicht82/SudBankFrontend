import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { L13Data, L13ReportRequest, L13ReportResponse } from '../models/l13.model';

@Injectable({
  providedIn: 'root'
})
export class L13Service {
  private apiUrl = '/api/regulatory/l13';

  constructor(private http: HttpClient) {}

  getL13Report(request: L13ReportRequest): Observable<L13ReportResponse> {
    // Simulación de datos para desarrollo
    return of(this.generateMockL13Data(request));
  }

  private generateMockL13Data(request: L13ReportRequest): L13ReportResponse {
    const mockData: L13Data[] = [
      {
        codigoEntidad: '001',
        fechaReporte: '2024-01-15',
        periodoReporte: '2024-01',
        codigoGarantia: 1,
        descripcionGarantia: 'Hipotecas Inmobiliarias',
        tipoGarantia: 'REAL',
        moneda: 'USD',
        valorNominal: 3000000000,
        valorRealizable: 2850000000,
        valorUtilizado: 2100000000,
        garantiaReal: 3000000000,
        garantiaPersonal: 0,
        garantiaMixta: 0,
        calidadExcelente: 1500000000,
        calidadBuena: 1000000000,
        calidadRegular: 400000000,
        calidadDeficiente: 100000000,
        vencimientoCorto: 500000000,
        vencimientoMedio: 1500000000,
        vencimientoLargo: 1000000000,
        riesgoGarantia: 0.05,
        cobertura: 0.95,
        concentracion: 0.70,
        fechaCreacion: '2024-01-15T08:00:00',
        usuarioCreacion: 'SISTEMA',
        estado: 'ACTIVO'
      },
      {
        codigoEntidad: '001',
        fechaReporte: '2024-01-15',
        periodoReporte: '2024-01',
        codigoGarantia: 2,
        descripcionGarantia: 'Garantías Personales',
        tipoGarantia: 'PERSONAL',
        moneda: 'USD',
        valorNominal: 800000000,
        valorRealizable: 720000000,
        valorUtilizado: 600000000,
        garantiaReal: 0,
        garantiaPersonal: 800000000,
        garantiaMixta: 0,
        calidadExcelente: 200000000,
        calidadBuena: 400000000,
        calidadRegular: 150000000,
        calidadDeficiente: 50000000,
        vencimientoCorto: 200000000,
        vencimientoMedio: 400000000,
        vencimientoLargo: 200000000,
        riesgoGarantia: 0.10,
        cobertura: 0.90,
        concentracion: 0.20,
        fechaCreacion: '2024-01-15T08:00:00',
        usuarioCreacion: 'SISTEMA',
        estado: 'ACTIVO'
      }
    ];

    return {
      success: true,
      data: mockData,
      totalRegistros: mockData.length,
      fechaGeneracion: new Date().toISOString()
    };
  }

  validateL13Data(data: L13Data): string[] {
    const errors: string[] = [];
    
    if (!data.codigoEntidad || data.codigoEntidad.length !== 3) {
      errors.push('Código de entidad debe tener 3 dígitos');
    }
    
    if (!data.fechaReporte) {
      errors.push('Fecha de reporte es obligatoria');
    }
    
    if (data.codigoGarantia < 1 || data.codigoGarantia > 999) {
      errors.push('Código de garantía debe estar entre 1 y 999');
    }
    
    if (data.valorNominal < 0) {
      errors.push('Valor nominal no puede ser negativo');
    }
    
    if (!['USD', 'EUR', 'PEN'].includes(data.moneda)) {
      errors.push('Moneda debe ser USD, EUR o PEN');
    }
    
    return errors;
  }
} 
