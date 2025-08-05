import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { L31Data, L31ReportRequest, L31ReportResponse } from '../models/l31.model';

@Injectable({
  providedIn: 'root'
})
export class L31Service {
  private apiUrl = '/api/regulatory/l31';

  constructor(private http: HttpClient) {}

  getL31Report(request: L31ReportRequest): Observable<L31ReportResponse> {
    // Simulación de datos para desarrollo
    return of(this.generateMockL31Data(request));
  }

  private generateMockL31Data(request: L31ReportRequest): L31ReportResponse {
    const mockData: L31Data[] = [
      {
        codigoEntidad: '001',
        fechaReporte: '2024-01-15',
        periodoReporte: '2024-01',
        codigoCapital: 1,
        descripcionCapital: 'Capital Ordinario',
        tipoCapital: 'TIER1',
        moneda: 'USD',
        saldoInicial: 500000000,
        saldoFinal: 520000000,
        variacion: 20000000,
        capitalTier1: 520000000,
        capitalTier2: 0,
        capitalTier3: 0,
        capitalOrdinario: 520000000,
        capitalPreferente: 0,
        capitalSubordinado: 0,
        capitalBasal: 520000000,
        capitalComplementario: 0,
        capitalSuplementario: 0,
        ratioSolvencia: 0.15,
        ratioBasal: 0.12,
        ratioComplementario: 0.03,
        fechaCreacion: '2024-01-15T08:00:00',
        usuarioCreacion: 'SISTEMA',
        estado: 'ACTIVO'
      },
      {
        codigoEntidad: '001',
        fechaReporte: '2024-01-15',
        periodoReporte: '2024-01',
        codigoCapital: 2,
        descripcionCapital: 'Capital Subordinado',
        tipoCapital: 'TIER2',
        moneda: 'USD',
        saldoInicial: 100000000,
        saldoFinal: 105000000,
        variacion: 5000000,
        capitalTier1: 0,
        capitalTier2: 105000000,
        capitalTier3: 0,
        capitalOrdinario: 0,
        capitalPreferente: 0,
        capitalSubordinado: 105000000,
        capitalBasal: 0,
        capitalComplementario: 105000000,
        capitalSuplementario: 0,
        ratioSolvencia: 0.03,
        ratioBasal: 0.00,
        ratioComplementario: 0.03,
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

  validateL31Data(data: L31Data): string[] {
    const errors: string[] = [];
    
    if (!data.codigoEntidad || data.codigoEntidad.length !== 3) {
      errors.push('Código de entidad debe tener 3 dígitos');
    }
    
    if (!data.fechaReporte) {
      errors.push('Fecha de reporte es obligatoria');
    }
    
    if (data.codigoCapital < 1 || data.codigoCapital > 999) {
      errors.push('Código de capital debe estar entre 1 y 999');
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
