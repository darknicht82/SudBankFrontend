import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { L07Data, L07ReportRequest, L07ReportResponse } from '../models/l07.model';

@Injectable({
  providedIn: 'root'
})
export class L07Service {
  private apiUrl = '/api/regulatory/l07';

  constructor(private http: HttpClient) {}

  getL07Report(request: L07ReportRequest): Observable<L07ReportResponse> {
    // Simulación de datos para desarrollo
    return of(this.generateMockL07Data(request));
  }

  private generateMockL07Data(request: L07ReportRequest): L07ReportResponse {
    const mockData: L07Data[] = [
      {
        codigoEntidad: '001',
        fechaReporte: '2024-01-15',
        periodoReporte: '2024-01',
        codigoLiquidez: 1,
        descripcionLiquidez: 'Activos de Alta Liquidez',
        saldoInicial: 1500000000,
        saldoFinal: 1650000000,
        promedio: 1575000000,
        vencimiento7Dias: 500000000,
        vencimiento30Dias: 400000000,
        vencimiento90Dias: 300000000,
        vencimiento180Dias: 200000000,
        vencimiento365Dias: 150000000,
        vencimientoMas365Dias: 100000000,
        clienteCorporativo: 800000000,
        clienteRetail: 500000000,
        clienteInstitucional: 350000000,
        riesgoLiquidez: 0.85,
        riesgoMercado: 0.12,
        riesgoCredito: 0.03,
        fechaCreacion: '2024-01-15T08:00:00',
        usuarioCreacion: 'SISTEMA',
        estado: 'ACTIVO'
      },
      {
        codigoEntidad: '001',
        fechaReporte: '2024-01-15',
        periodoReporte: '2024-01',
        codigoLiquidez: 2,
        descripcionLiquidez: 'Depósitos a la Vista',
        saldoInicial: 2500000000,
        saldoFinal: 2700000000,
        promedio: 2600000000,
        vencimiento7Dias: 1200000000,
        vencimiento30Dias: 800000000,
        vencimiento90Dias: 400000000,
        vencimiento180Dias: 200000000,
        vencimiento365Dias: 100000000,
        vencimientoMas365Dias: 0,
        clienteCorporativo: 1200000000,
        clienteRetail: 1000000000,
        clienteInstitucional: 500000000,
        riesgoLiquidez: 0.95,
        riesgoMercado: 0.05,
        riesgoCredito: 0.00,
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

  validateL07Data(data: L07Data): string[] {
    const errors: string[] = [];
    
    if (!data.codigoEntidad || data.codigoEntidad.length !== 3) {
      errors.push('Código de entidad debe tener 3 dígitos');
    }
    
    if (!data.fechaReporte) {
      errors.push('Fecha de reporte es obligatoria');
    }
    
    if (data.codigoLiquidez < 1 || data.codigoLiquidez > 99) {
      errors.push('Código de liquidez debe estar entre 1 y 99');
    }
    
    if (data.saldoFinal < 0) {
      errors.push('Saldo final no puede ser negativo');
    }
    
    return errors;
  }
} 
