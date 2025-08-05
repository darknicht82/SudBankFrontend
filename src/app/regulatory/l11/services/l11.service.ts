import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { L11Data, L11ReportRequest, L11ReportResponse } from '../models/l11.model';

@Injectable({
  providedIn: 'root'
})
export class L11Service {
  private apiUrl = '/api/regulatory/l11';

  constructor(private http: HttpClient) {}

  getL11Report(request: L11ReportRequest): Observable<L11ReportResponse> {
    // Simulación de datos para desarrollo
    return of(this.generateMockL11Data(request));
  }

  private generateMockL11Data(request: L11ReportRequest): L11ReportResponse {
    const mockData: L11Data[] = [
      {
        codigoEntidad: '001',
        fechaReporte: '2024-01-15',
        periodoReporte: '2024-01',
        codigoDeposito: 1,
        descripcionDeposito: 'Depósitos a la Vista',
        tipoDeposito: 'DEMANDA',
        moneda: 'USD',
        saldoInicial: 800000000,
        saldoFinal: 850000000,
        promedio: 825000000,
        plazoDemanda: 850000000,
        plazo30Dias: 0,
        plazo90Dias: 0,
        plazo180Dias: 0,
        plazo365Dias: 0,
        plazoMas365Dias: 0,
        clientePersonaNatural: 400000000,
        clientePersonaJuridica: 350000000,
        clienteInstitucional: 100000000,
        tasaFija: 0,
        tasaVariable: 850000000,
        tasaMixta: 0,
        riesgoLiquidez: 0.95,
        riesgoCredito: 0.05,
        riesgoMercado: 0.00,
        fechaCreacion: '2024-01-15T08:00:00',
        usuarioCreacion: 'SISTEMA',
        estado: 'ACTIVO'
      },
      {
        codigoEntidad: '001',
        fechaReporte: '2024-01-15',
        periodoReporte: '2024-01',
        codigoDeposito: 2,
        descripcionDeposito: 'Depósitos a Plazo Fijo',
        tipoDeposito: 'PLAZO',
        moneda: 'USD',
        saldoInicial: 1200000000,
        saldoFinal: 1250000000,
        promedio: 1225000000,
        plazoDemanda: 0,
        plazo30Dias: 300000000,
        plazo90Dias: 400000000,
        plazo180Dias: 300000000,
        plazo365Dias: 200000000,
        plazoMas365Dias: 50000000,
        clientePersonaNatural: 500000000,
        clientePersonaJuridica: 600000000,
        clienteInstitucional: 150000000,
        tasaFija: 1250000000,
        tasaVariable: 0,
        tasaMixta: 0,
        riesgoLiquidez: 0.30,
        riesgoCredito: 0.70,
        riesgoMercado: 0.00,
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

  validateL11Data(data: L11Data): string[] {
    const errors: string[] = [];
    
    if (!data.codigoEntidad || data.codigoEntidad.length !== 3) {
      errors.push('Código de entidad debe tener 3 dígitos');
    }
    
    if (!data.fechaReporte) {
      errors.push('Fecha de reporte es obligatoria');
    }
    
    if (data.codigoDeposito < 1 || data.codigoDeposito > 999) {
      errors.push('Código de depósito debe estar entre 1 y 999');
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
