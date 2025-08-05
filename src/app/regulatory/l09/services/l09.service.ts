import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { L09Data, L09ReportRequest, L09ReportResponse } from '../models/l09.model';

@Injectable({
  providedIn: 'root'
})
export class L09Service {
  private apiUrl = '/api/regulatory/l09';

  constructor(private http: HttpClient) {}

  getL09Report(request: L09ReportRequest): Observable<L09ReportResponse> {
    // Simulación de datos para desarrollo
    return of(this.generateMockL09Data(request));
  }

  private generateMockL09Data(request: L09ReportRequest): L09ReportResponse {
    const mockData: L09Data[] = [
      {
        codigoEntidad: '001',
        fechaReporte: '2024-01-15',
        periodoReporte: '2024-01',
        codigoInversion: 1,
        descripcionInversion: 'Bonos del Tesoro',
        tipoInversion: 'RENTA_FIJA',
        moneda: 'USD',
        montoInversion: 50000000,
        valorMercado: 51500000,
        rendimiento: 0.03,
        riesgoBajo: 50000000,
        riesgoMedio: 0,
        riesgoAlto: 0,
        vencimientoCorto: 20000000,
        vencimientoMedio: 20000000,
        vencimientoLargo: 10000000,
        emisorNacional: 0,
        emisorExtranjero: 50000000,
        emisorSupranacional: 0,
        calificacionRiesgo: 'AAA',
        provisiones: 0,
        deterioro: 0,
        fechaCreacion: '2024-01-15T08:00:00',
        usuarioCreacion: 'SISTEMA',
        estado: 'ACTIVO'
      },
      {
        codigoEntidad: '001',
        fechaReporte: '2024-01-15',
        periodoReporte: '2024-01',
        codigoInversion: 2,
        descripcionInversion: 'Acciones Blue Chip',
        tipoInversion: 'RENTA_VARIABLE',
        moneda: 'USD',
        montoInversion: 30000000,
        valorMercado: 28500000,
        rendimiento: -0.05,
        riesgoBajo: 0,
        riesgoMedio: 15000000,
        riesgoAlto: 15000000,
        vencimientoCorto: 0,
        vencimientoMedio: 0,
        vencimientoLargo: 30000000,
        emisorNacional: 0,
        emisorExtranjero: 30000000,
        emisorSupranacional: 0,
        calificacionRiesgo: 'A',
        provisiones: 1500000,
        deterioro: 1500000,
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

  validateL09Data(data: L09Data): string[] {
    const errors: string[] = [];
    
    if (!data.codigoEntidad || data.codigoEntidad.length !== 3) {
      errors.push('Código de entidad debe tener 3 dígitos');
    }
    
    if (!data.fechaReporte) {
      errors.push('Fecha de reporte es obligatoria');
    }
    
    if (data.codigoInversion < 1 || data.codigoInversion > 999) {
      errors.push('Código de inversión debe estar entre 1 y 999');
    }
    
    if (data.montoInversion < 0) {
      errors.push('Monto de inversión no puede ser negativo');
    }
    
    if (!['USD', 'EUR', 'PEN'].includes(data.moneda)) {
      errors.push('Moneda debe ser USD, EUR o PEN');
    }
    
    return errors;
  }
} 
