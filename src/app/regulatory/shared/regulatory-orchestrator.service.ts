import { Injectable } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { L08Service } from '../l08/services/l08.service';
import { L10Service } from '../l10/services/l10.service';
import { L14Service } from '../l14/services/l14.service';

export interface RegulatorySummary {
  l08: {
    totalRegistros: number;
    valorTotalActual: number;
    cumplimiento: number;
  };
  l10: {
    totalBrechas: number;
    brechaTotal: number;
    sensibilidadPromedio: number;
  };
  l14: {
    totalClientes: number;
    valorTotalDepositos: number;
    concentracionPromedio: number;
  };
  overallStatus: 'HEALTHY' | 'WARNING' | 'CRITICAL';
  lastUpdate: string;
}

export interface RegulatoryConnectivityStatus {
  adapter: boolean;
  regulatory: boolean;
  overall: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class RegulatoryOrchestratorService {
  constructor(
    private l08Service: L08Service,
    private l10Service: L10Service,
    private l14Service: L14Service
  ) { }

  // Obtener resumen general de todos los reportes regulatorios
  getRegulatorySummary(): Observable<RegulatorySummary> {
    return forkJoin({
      l08: this.l08Service.getL08Summary(),
      l10: this.l10Service.getL10Summary(),
      l14: this.l14Service.getL14Summary()
    }).pipe(
      map(results => {
        const overallStatus = this.calculateOverallStatus(results);
        return {
          l08: results.l08,
          l10: results.l10,
          l14: results.l14,
          overallStatus,
          lastUpdate: new Date().toISOString()
        };
      }),
      catchError(error => {
        console.error('Error obteniendo resumen regulatorio:', error);
        return of({
          l08: { totalRegistros: 0, valorTotalActual: 0, cumplimiento: 0 },
          l10: { totalBrechas: 0, brechaTotal: 0, sensibilidadPromedio: 0 },
          l14: { totalClientes: 0, valorTotalDepositos: 0, concentracionPromedio: 0 },
          overallStatus: 'CRITICAL' as const,
          lastUpdate: new Date().toISOString()
        });
      })
    );
  }

  // Verificar conectividad de todos los servicios
  checkConnectivity(): Observable<RegulatoryConnectivityStatus> {
    return forkJoin({
      adapter: this.l08Service.checkConnectivity(),
      regulatory: of({ status: 'connected' }) // Simulado por ahora
    }).pipe(
      map(results => ({
        adapter: results.adapter.status === 'connected',
        regulatory: results.regulatory.status === 'connected',
        overall: results.adapter.status === 'connected' && results.regulatory.status === 'connected'
      })),
      catchError(error => {
        console.error('Error verificando conectividad:', error);
        return of({
          adapter: false,
          regulatory: false,
          overall: false
        });
      })
    );
  }

  // Generar todos los reportes regulatorios
  generateAllReports(fechaInicio: string, fechaFin: string): Observable<any> {
    const requests = {
      l08: { fechaInicio, fechaFin },
      l10: { fechaInicio, fechaFin },
      l14: { fechaInicio, fechaFin }
    };

    return forkJoin({
      l08: this.l08Service.generateL08Report(requests.l08),
      l10: this.l10Service.generateL10Report(requests.l10),
      l14: this.l14Service.generateL14Report(requests.l14)
    }).pipe(
      map(results => ({
        success: true,
        reports: results,
        generatedAt: new Date().toISOString()
      })),
      catchError(error => {
        console.error('Error generando reportes:', error);
        return of({
          success: false,
          error: error.message,
          generatedAt: new Date().toISOString()
        });
      })
    );
  }

  // Validar todos los datos regulatorios
  validateAllData(): Observable<any> {
    return forkJoin({
      l08: this.l08Service.getL08Data({ fechaInicio: '', fechaFin: '' }).pipe(
        map(response => response.datos)
      ),
      l10: this.l10Service.getL10Data({ fechaInicio: '', fechaFin: '' }).pipe(
        map(response => response.datos)
      ),
      l14: this.l14Service.getL14Data({ fechaInicio: '', fechaFin: '' }).pipe(
        map(response => response.datos)
      )
    }).pipe(
      map(data => {
        return forkJoin({
          l08: this.l08Service.validateL08Data(data.l08),
          l10: this.l10Service.validateL10Data(data.l10),
          l14: this.l14Service.validateL14Data(data.l14)
        });
      }),
      catchError(error => {
        console.error('Error validando datos:', error);
        return of({
          success: false,
          error: error.message
        });
      })
    );
  }

  private calculateOverallStatus(results: any): 'HEALTHY' | 'WARNING' | 'CRITICAL' {
    // Lógica simple para determinar el estado general
    const l08Cumplimiento = results.l08?.cumplimiento || 0;
    const l10Brechas = results.l10?.totalBrechas || 0;
    const l14Concentracion = results.l14?.concentracionPromedio || 0;

    if (l08Cumplimiento >= 95 && l10Brechas <= 5 && l14Concentracion <= 10) {
      return 'HEALTHY';
    } else if (l08Cumplimiento >= 80 && l10Brechas <= 10 && l14Concentracion <= 15) {
      return 'WARNING';
    } else {
      return 'CRITICAL';
    }
  }
} 
