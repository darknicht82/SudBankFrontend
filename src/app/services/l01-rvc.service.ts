import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { 
  RVCTransmissionResponse, 
  RVCBitacora,
  L01ExportData 
} from '../models/l01-export.model';

/**
 * Servicio para integración con sistema RVC de la Superintendencia de Bancos
 * URL: https://appweb.superbancos.gob.ec/rvc
 */
@Injectable({
  providedIn: 'root'
})
export class L01RvcService {

  private readonly rvcEndpoint = environment.rvcEndpoint || 'https://appweb.superbancos.gob.ec/rvc';
  private readonly useMockRVC = !environment.production; // Mock en desarrollo

  constructor(private http: HttpClient) { }

  /**
   * Transmite estructura L01 al sistema RVC
   */
  transmitirEstructura(archivo: File, usuario: string): Observable<RVCTransmissionResponse> {
    if (this.useMockRVC) {
      return this.simularTransmisionRVC(archivo, usuario);
    }

    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('usuario', usuario);
    formData.append('estructura', 'L01');
    formData.append('entidad', '1038');

    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });

    return this.http.post<any>(`${this.rvcEndpoint}/upload`, formData, { headers })
      .pipe(
        map(response => this.mapearRespuestaRVC(response)),
        catchError(error => this.manejarErrorRVC(error))
      );
  }

  /**
   * Consulta bitácora de transmisiones
   */
  consultarBitacoraTransmision(fechaInicio?: Date, fechaFin?: Date): Observable<RVCBitacora[]> {
    if (this.useMockRVC) {
      return this.obtenerBitacoraMock();
    }

    const params: any = {
      estructura: 'L01',
      entidad: '1038'
    };

    if (fechaInicio) {
      params.fechaInicio = this.formatearFechaRVC(fechaInicio);
    }
    if (fechaFin) {
      params.fechaFin = this.formatearFechaRVC(fechaFin);
    }

    return this.http.get<RVCBitacora[]>(`${this.rvcEndpoint}/bitacora/transmision`, { params })
      .pipe(
        catchError(error => this.manejarErrorRVC(error))
      );
  }

  /**
   * Consulta bitácora de validación
   */
  consultarBitacoraValidacion(transmissionId: string): Observable<any> {
    if (this.useMockRVC) {
      return this.obtenerValidacionMock(transmissionId);
    }

    return this.http.get<any>(`${this.rvcEndpoint}/bitacora/validacion/${transmissionId}`)
      .pipe(
        catchError(error => this.manejarErrorRVC(error))
      );
  }

  /**
   * Consulta estado de proceso de validación
   */
  consultarProcesoValidacion(transmissionId: string): Observable<any> {
    if (this.useMockRVC) {
      return this.obtenerProcesoMock(transmissionId);
    }

    return this.http.get<any>(`${this.rvcEndpoint}/proceso/validacion/${transmissionId}`)
      .pipe(
        catchError(error => this.manejarErrorRVC(error))
      );
  }

  /**
   * Verifica conectividad con sistema RVC
   */
  verificarConectividadRVC(): Observable<boolean> {
    if (this.useMockRVC) {
      return of(true);
    }

    return this.http.get(`${this.rvcEndpoint}/health`)
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

  /**
   * Simula transmisión a RVC para desarrollo
   */
  private simularTransmisionRVC(archivo: File, usuario: string): Observable<RVCTransmissionResponse> {
    const transmissionId = this.generarTransmissionId();
    
    // Simular delay de red
    return new Observable(observer => {
      setTimeout(() => {
        observer.next({
          success: true,
          transmissionId: transmissionId,
          status: 'enviado',
          message: 'Archivo transmitido exitosamente (SIMULACIÓN)',
          timestamp: new Date()
        });
        observer.complete();
      }, 1500);
    });
  }

  /**
   * Obtiene bitácora mock para desarrollo
   */
  private obtenerBitacoraMock(): Observable<RVCBitacora[]> {
    const bitacoraMock: RVCBitacora[] = [
      {
        id: 'TXN_001',
        estructura: 'L01',
        fecha: new Date(Date.now() - 86400000), // Ayer
        usuario: 'usuario.test',
        estado: 'validado',
        archivo: 'L01E103822012025.txt',
        observaciones: 'Validación exitosa'
      },
      {
        id: 'TXN_002',
        estructura: 'L01',
        fecha: new Date(Date.now() - 172800000), // Hace 2 días
        usuario: 'usuario.test',
        estado: 'rechazado',
        archivo: 'L01E103820012025.txt',
        observaciones: 'Error en formato de cabecera'
      }
    ];

    return of(bitacoraMock);
  }

  /**
   * Obtiene validación mock para desarrollo
   */
  private obtenerValidacionMock(transmissionId: string): Observable<any> {
    return of({
      transmissionId: transmissionId,
      estado: 'validado',
      errores: [],
      warnings: [],
      timestamp: new Date(),
      detalles: {
        registrosProcesados: 15,
        registrosValidos: 15,
        registrosConError: 0
      }
    });
  }

  /**
   * Obtiene proceso mock para desarrollo
   */
  private obtenerProcesoMock(transmissionId: string): Observable<any> {
    return of({
      transmissionId: transmissionId,
      estado: 'completado',
      progreso: 100,
      etapas: [
        { nombre: 'Recepción', estado: 'completado', timestamp: new Date() },
        { nombre: 'Validación formato', estado: 'completado', timestamp: new Date() },
        { nombre: 'Validación datos', estado: 'completado', timestamp: new Date() },
        { nombre: 'Carga', estado: 'completado', timestamp: new Date() }
      ]
    });
  }

  /**
   * Mapea respuesta del sistema RVC
   */
  private mapearRespuestaRVC(response: any): RVCTransmissionResponse {
    return {
      success: response.success || false,
      transmissionId: response.transmissionId || response.id,
      status: response.status || 'enviado',
      message: response.message || 'Transmisión procesada',
      timestamp: new Date(response.timestamp || Date.now()),
      errors: response.errors || []
    };
  }

  /**
   * Maneja errores de comunicación con RVC
   */
  private manejarErrorRVC(error: any): Observable<never> {
    console.error('Error en comunicación con RVC:', error);
    
    let mensajeError = 'Error de comunicación con sistema RVC';
    
    if (error.status === 0) {
      mensajeError = 'No se puede conectar con el sistema RVC. Verifique la conexión.';
    } else if (error.status === 401) {
      mensajeError = 'Credenciales inválidas para acceso a RVC.';
    } else if (error.status === 403) {
      mensajeError = 'No tiene permisos para acceder al sistema RVC.';
    } else if (error.status >= 500) {
      mensajeError = 'Error interno del sistema RVC. Intente más tarde.';
    }

    return throwError({
      success: false,
      message: mensajeError,
      timestamp: new Date(),
      originalError: error
    });
  }

  /**
   * Formatea fecha para APIs RVC
   */
  private formatearFechaRVC(fecha: Date): string {
    return fecha.toISOString().split('T')[0]; // YYYY-MM-DD
  }

  /**
   * Genera ID único para transmisión
   */
  private generarTransmissionId(): string {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2, 8);
    return `L01_1038_${timestamp}_${random}`.toUpperCase();
  }

  /**
   * Obtiene configuración actual del servicio
   */
  obtenerConfiguracion(): any {
    return {
      endpoint: this.rvcEndpoint,
      useMock: this.useMockRVC,
      entidad: '1038',
      estructura: 'L01',
      conectado: this.useMockRVC ? true : 'verificando...'
    };
  }
}
