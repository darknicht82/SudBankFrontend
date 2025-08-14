import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

export interface L01Form {
  tipoIdentificacion: string; // R/X
  identificacion: string; // 13 dígitos RUC o código extranjero
  clasificacion: number; // 1-4
  tipo: number; // 0-9
}

export interface L01RegulatoryData {
  id?: number;
  // Propiedades de compatibilidad con componentes existentes
  tipoIdentificacion: string; // R/X
  identificacion: string; // RUC o código extranjero
  clasificacion: number; // 1-4
  tipo: number; // 0-9
  tipoEmisor: number; // Alias para tipo - para mantener compatibilidad
  
  // Propiedades del backend (opcionales para compatibilidad)
  codigoTipoIdentificacion?: number; // Para backend
  codigoEmisor?: number; // Para backend
  codigoClasificacionEmisor?: number; // Para backend
  codigoTipoEmisor?: number; // Para backend
  
  fechaCreacion?: Date;
  usuarioCreacion?: string;
  fechaModificacion?: Date;
  usuarioModificacion?: string;
  
  // Índice de firma para permitir acceso dinámico
  [key: string]: any;
}

export interface ExportRequest {
  fecha: string;
}

export interface ValidationResult {
  valid: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class L01RegulatoryService {
  private baseUrl = `${environment.backendEndpoint}/structures/l01`;

  constructor(private http: HttpClient) {}

  // Crear nuevo registro
  crear(dto: L01RegulatoryData): Observable<L01RegulatoryData> {
    const backendData = this.convertToBackendFormat(dto);
    return this.http.post<L01RegulatoryData>(this.baseUrl, backendData)
      .pipe(
        map(data => this.convertFromBackendFormat(data))
      );
  }

  // Actualizar registro
  actualizar(id: number, dto: L01RegulatoryData): Observable<L01RegulatoryData> {
    const backendData = this.convertToBackendFormat(dto);
    return this.http.put<L01RegulatoryData>(`${this.baseUrl}/${id}`, backendData)
      .pipe(
        map(data => this.convertFromBackendFormat(data))
      );
  }

  // Buscar por ID
  buscarPorId(id: number): Observable<L01RegulatoryData> {
    return this.http.get<L01RegulatoryData>(`${this.baseUrl}/${id}`)
      .pipe(
        map(data => this.convertFromBackendFormat(data))
      );
  }

  // Listar todos los registros
  listarTodos(): Observable<L01RegulatoryData[]> {
    return this.http.get<L01RegulatoryData[]>(this.baseUrl)
      .pipe(
        map(data => data.map(item => this.convertFromBackendFormat(item)))
      );
  }

  // Eliminar registro
  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // ==========================================
  // MÉTODOS DE COMPATIBILIDAD
  // ==========================================

  /**
   * Convierte L01RegulatoryData a formato del backend
   */
  private convertToBackendFormat(data: L01RegulatoryData): L01RegulatoryData {
    return {
      id: data.id,
      tipoIdentificacion: data.tipoIdentificacion,
      identificacion: data.identificacion,
      clasificacion: data.clasificacion,
      tipo: data.tipo,
      tipoEmisor: data.tipoEmisor,
      codigoTipoIdentificacion: this.getTipoIdentificacionNumber(data.tipoIdentificacion),
      codigoEmisor: parseInt(data.identificacion) || 0,
      codigoClasificacionEmisor: data.clasificacion,
      codigoTipoEmisor: data.tipo,
      fechaCreacion: data.fechaCreacion,
      usuarioCreacion: data.usuarioCreacion,
      fechaModificacion: data.fechaModificacion,
      usuarioModificacion: data.usuarioModificacion
    };
  }

  /**
   * Convierte datos del backend a formato compatible
   */
  private convertFromBackendFormat(data: L01RegulatoryData): L01RegulatoryData {
    return {
      ...data,
      tipoIdentificacion: data.tipoIdentificacion || this.getTipoIdentificacionString(data.codigoTipoIdentificacion || 4),
      identificacion: data.identificacion || (data.codigoEmisor?.toString() || ''),
      clasificacion: data.clasificacion || (data.codigoClasificacionEmisor || 1),
      tipo: data.tipo || (data.codigoTipoEmisor || 1),
      tipoEmisor: data.tipoEmisor || (data.codigoTipoEmisor || 1) // Alias para mantener compatibilidad
    };
  }

  /**
   * Obtiene el string del tipo de identificación desde el número
   */
  private getTipoIdentificacionString(codigo: number): string {
    switch (codigo) {
      case 4: return 'R'; // RUC
      case 5: return 'X'; // Extranjero
      default: return 'R';
    }
  }

  /**
   * Obtiene el número del tipo de identificación desde el string
   */
  private getTipoIdentificacionNumber(tipo: string): number {
    switch (tipo) {
      case 'R': return 4; // RUC
      case 'X': return 5; // Extranjero
      default: return 4;
    }
  }

  // ==========================================
  // MÉTODOS ADICIONALES PARA FUTURAS IMPLEMENTACIONES
  // ==========================================

  // Buscar por identificación (cuando se implemente en el backend)
  buscarPorIdentificacion(tipoIdentificacion: string, identificacion: string): Observable<L01RegulatoryData> {
    const params = new HttpParams()
      .set('tipoIdentificacion', tipoIdentificacion)
      .set('identificacion', identificacion);
    return this.http.get<L01RegulatoryData>(`${this.baseUrl}/buscar`, { params });
  }

  // Listar por identificación (cuando se implemente en el backend)
  listarPorIdentificacion(identificacion: string): Observable<L01RegulatoryData[]> {
    return this.http.get<L01RegulatoryData[]>(`${this.baseUrl}/identificacion/${identificacion}`);
  }

  // Listar por clasificación (cuando se implemente en el backend)
  listarPorClasificacion(clasificacion: number): Observable<L01RegulatoryData[]> {
    return this.http.get<L01RegulatoryData[]>(`${this.baseUrl}/clasificacion/${clasificacion}`);
  }

  // Listar por tipo emisor (cuando se implemente en el backend)
  listarPorTipoEmisor(tipoEmisor: number): Observable<L01RegulatoryData[]> {
    return this.http.get<L01RegulatoryData[]>(`${this.baseUrl}/tipo-emisor/${tipoEmisor}`);
  }

  // Contar por clasificación (cuando se implemente en el backend)
  contarPorClasificacion(clasificacion: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/contar/clasificacion/${clasificacion}`);
  }

  // Contar por tipo emisor (cuando se implemente en el backend)
  contarPorTipoEmisor(tipoEmisor: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/contar/tipo-emisor/${tipoEmisor}`);
  }

  // Buscar última versión por identificación (cuando se implemente en el backend)
  buscarUltimaVersionPorIdentificacion(identificacion: string): Observable<L01RegulatoryData> {
    return this.http.get<L01RegulatoryData>(`${this.baseUrl}/ultima-version/${identificacion}`);
  }

  // Exportar a TXT (cuando se implemente en el backend)
  exportToTxt(request: ExportRequest): Observable<Blob> {
    return this.http.post(`${this.baseUrl}/export/txt`, request, { responseType: 'blob' });
  }

  // Exportar a Excel (cuando se implemente en el backend)
  exportToExcel(request: ExportRequest): Observable<Blob> {
    return this.http.post(`${this.baseUrl}/export/excel`, request, { responseType: 'blob' });
  }

  // Validar estructura (cuando se implemente en el backend)
  validateStructure(): Observable<ValidationResult> {
    return this.http.post<ValidationResult>(`${this.baseUrl}/validate`, {});
  }
}