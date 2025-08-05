import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { L12Data, L12ReportRequest, L12ReportResponse } from '../models/l12.model';

@Injectable({
  providedIn: 'root'
})
export class L12Service {
  private apiUrl = '/api/regulatory/l12';

  constructor(private http: HttpClient) {}

  getL12Report(request: L12ReportRequest): Observable<L12ReportResponse> {
    // Simulación de datos para desarrollo
    return of(this.generateMockL12Data(request));
  }

  private generateMockL12Data(request: L12ReportRequest): L12ReportResponse {
    const mockData: L12Data[] = [
      {
        codigoEntidad: '001',
        fechaReporte: '2024-01-15',
        periodoReporte: '2024-01',
        codigoPrestamo: 1,
        descripcionPrestamo: 'Préstamos Comerciales',
        tipoPrestamo: 'COMERCIAL',
        moneda: 'USD',
        saldoInicial: 2000000000,
        saldoFinal: 2100000000,
        promedio: 2050000000,
        vencimientoVigente: 1900000000,
        vencimientoVencido: 150000000,
        vencimientoJudicial: 50000000,
        clientePersonaNatural: 800000000,
        clientePersonaJuridica: 1200000000,
        clienteMicroempresa: 100000000,
        sectorComercio: 800000000,
        sectorIndustria: 600000000,
        sectorServicios: 400000000,
        sectorAgricultura: 150000000,
        sectorConstruccion: 100000000,
        sectorOtros: 50000000,
        riesgoCredito: 0.15,
        provisiones: 31500000,
        deterioro: 31500000,
        fechaCreacion: '2024-01-15T08:00:00',
        usuarioCreacion: 'SISTEMA',
        estado: 'ACTIVO'
      },
      {
        codigoEntidad: '001',
        fechaReporte: '2024-01-15',
        periodoReporte: '2024-01',
        codigoPrestamo: 2,
        descripcionPrestamo: 'Préstamos de Consumo',
        tipoPrestamo: 'CONSUMO',
        moneda: 'USD',
        saldoInicial: 800000000,
        saldoFinal: 820000000,
        promedio: 810000000,
        vencimientoVigente: 750000000,
        vencimientoVencido: 60000000,
        vencimientoJudicial: 10000000,
        clientePersonaNatural: 700000000,
        clientePersonaJuridica: 100000000,
        clienteMicroempresa: 20000000,
        sectorComercio: 200000000,
        sectorIndustria: 50000000,
        sectorServicios: 300000000,
        sectorAgricultura: 50000000,
        sectorConstruccion: 100000000,
        sectorOtros: 120000000,
        riesgoCredito: 0.12,
        provisiones: 9840000,
        deterioro: 9840000,
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

  validateL12Data(data: L12Data): string[] {
    const errors: string[] = [];
    
    if (!data.codigoEntidad || data.codigoEntidad.length !== 3) {
      errors.push('Código de entidad debe tener 3 dígitos');
    }
    
    if (!data.fechaReporte) {
      errors.push('Fecha de reporte es obligatoria');
    }
    
    if (data.codigoPrestamo < 1 || data.codigoPrestamo > 999) {
      errors.push('Código de préstamo debe estar entre 1 y 999');
    }
    
    if (data.saldoFinal < 0) {
      errors.push('Saldo final no puede ser negativo');
    }
    
    if (!['USD', 'EUR', 'PEN'].includes(data.moneda)) {
      errors.push('Moneda debe ser USD, EUR o PEN');
    }
    
    return errors;
  }
} 
