import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, timeout, catchError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

// ==========================================
// INTERFACES L01 UNIFICADAS
// ==========================================

export interface L01Record {
  // Campos oficiales L01 según manual SB Marzo 2017
  tipoIdentificacion: string;    // R/X
  identificacion: string;        // RUC (13 dígitos) o código extranjero
  clasificacion: number;         // 1-4 (Emisor/Custodio/Depositario/Contraparte)
  tipoEmisor: number;            // Según tabla 73
  
  // Campos internos del sistema
  id?: number;
  usuarioCreacion?: string;
  fechaCreacion?: Date;
  usuarioModificacion?: string;
  fechaModificacion?: Date;
  estado?: string;
}

export interface L01SearchRequest {
  id: number | null;
  codigoTipoIdentificacion: number | null;
  codigoEmisor: number | null;
  codigoClasificacionEmisor: number | null;
  codigoTipoEmisor: number | null;
}

// ==========================================
// SERVICIO L01 UNIFICADO
// ==========================================

@Injectable({
  providedIn: 'root'
})
export class L01Service {
  private baseUrl = environment.backendEndpoint;

  constructor(private http: HttpClient) { }

  // ==========================================
  // OPERACIONES CRUD PRINCIPALES
  // ==========================================

  /**
   * Crear nuevo registro L01
   */
  create(data: L01Record): Observable<L01Record> {
    const url = `${this.baseUrl}/structures/l01`;
    return this.http.post<L01Record>(url, data).pipe(
      timeout(environment.timeouts?.apiRequest || 30000),
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Obtener todos los registros L01
   */
  getAll(): Observable<L01Record[]> {
    const url = `${this.baseUrl}/structures/l01`;
    return this.http.get<L01Record[]>(url).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Obtener registro L01 por ID
   */
  getById(id: number): Observable<L01Record> {
    const url = `${this.baseUrl}/structures/l01/${id}`;
    return this.http.get<L01Record>(url).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Actualizar registro L01
   */
  update(id: number, data: L01Record): Observable<L01Record> {
    const url = `${this.baseUrl}/structures/l01/${id}`;
    return this.http.put<L01Record>(url, data).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Eliminar registro L01
   */
  delete(id: number): Observable<void> {
    const url = `${this.baseUrl}/structures/l01/${id}`;
    return this.http.delete<void>(url).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  // ==========================================
  // BÚSQUEDA Y FILTROS
  // ==========================================

  /**
   * Búsqueda avanzada con filtros
   */
  search(filters: L01SearchRequest): Observable<L01Record[]> {
    const url = `${this.baseUrl}/structures/l01/search`;
    
    console.log('L01Service: Conectando con backend en:', url);
    console.log('L01Service: Filtros enviados:', filters);
    
    return this.http.post<L01Record[]>(url, filters).pipe(
      timeout(environment.timeouts?.apiRequest || 30000),
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Convertir filtros del frontend a formato de API
   */
  convertFrontendFiltersToAPI(filters: {
    tipoIdentificacion?: string;
    clasificacion?: number;
    tipoEmisor?: number;
  }): L01SearchRequest {
    return {
      id: null,
      codigoTipoIdentificacion: this.convertTipoIdentificacionToCode(filters.tipoIdentificacion),
      codigoEmisor: null,
      codigoClasificacionEmisor: filters.clasificacion || null,
      codigoTipoEmisor: filters.tipoEmisor || null
    };
  }

  // ==========================================
  // VALIDACIONES ESPECÍFICAS L01
  // ==========================================

  /**
   * Validar formato de RUC ecuatoriano
   */
  validateRUC(ruc: string): boolean {
    if (!ruc || ruc.length !== 13) return false;
    
    // Validar que sea solo números
    if (!/^\d{13}$/.test(ruc)) return false;
    
    // Validar prefijo de provincia (01-24)
    const provincia = parseInt(ruc.substring(0, 2));
    if (provincia < 1 || provincia > 24) return false;
    
    // Validar tipo de entidad (tercer dígito)
    const tipoEntidad = parseInt(ruc.substring(2, 3));
    if (tipoEntidad < 6 || tipoEntidad > 9) return false;
    
    return true;
  }

  /**
   * Validar código extranjero
   */
  validateCodigoExtranjero(codigo: string): boolean {
    if (!codigo || codigo.length > 7) return false;
    
    // Validar que sea solo números
    return /^\d+$/.test(codigo);
  }

  // ==========================================
  // MÉTODOS AUXILIARES
  // ==========================================

  private convertTipoIdentificacionToCode(tipo?: string): number | null {
    if (!tipo) return null;
    switch (tipo.toUpperCase()) {
      case 'R': return 1; // RUC Nacional
      case 'X': return 2; // Extranjero
      default: return null;
    }
  }

  private handleError(error: HttpErrorResponse) {
    console.error('L01Service: Error detallado en la solicitud HTTP', {
      error: error,
      message: error.message,
      status: error.status,
      statusText: error.statusText,
      url: error.url,
      baseUrl: this.baseUrl
    });
    
    let errorMessage = 'Error desconocido en la solicitud HTTP';
    
    if (error.status === 0) {
      errorMessage = 'No se puede conectar con el backend. Verifique que esté ejecutándose.';
    } else if (error.status === 404) {
      errorMessage = 'Endpoint no encontrado en el backend.';
    } else if (error.status === 500) {
      errorMessage = 'Error interno del servidor backend.';
    } else if (error.status === 401) {
      errorMessage = 'No autorizado. Verifique las credenciales.';
    } else if (error.status === 403) {
      errorMessage = 'Acceso prohibido. No tiene permisos.';
    } else if (error.error instanceof ErrorEvent) {
      errorMessage = `Error del cliente: ${error.error.message}`;
    } else {
      errorMessage = `Error del servidor: ${error.status} ${error.statusText}`;
    }
    
    return throwError(() => new Error(errorMessage));
  }
}
