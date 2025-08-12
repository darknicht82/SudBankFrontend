import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface L01Form {
  tipoIdentificacion: string; // R/X
  identificacion: string; // 13 dígitos RUC o código extranjero
  clasificacion: number; // 1-4
  tipo: number; // 0-9
}

export interface L01RegulatoryData {
  id?: number;
  tipoIdentificacion: string;
  identificacion: string;
  clasificacion: number;
  tipo: number;
  fechaCreacion?: Date;
  usuarioCreacion?: string;
  fechaModificacion?: Date;
  usuarioModificacion?: string;
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
  private baseUrl = 'http://192.168.10.4:5000/api/nesl01';

  constructor(private http: HttpClient) {}

  // Crear nuevo registro
  crear(dto: L01RegulatoryData): Observable<L01RegulatoryData> {
    return this.http.post<L01RegulatoryData>(this.baseUrl, dto);
  }

  // Actualizar registro
  actualizar(id: number, dto: L01RegulatoryData): Observable<L01RegulatoryData> {
    return this.http.put<L01RegulatoryData>(`${this.baseUrl}/${id}`, dto);
  }

  // Buscar por ID
  buscarPorId(id: number): Observable<L01RegulatoryData> {
    return this.http.get<L01RegulatoryData>(`${this.baseUrl}/${id}`);
  }

  // Buscar por identificación
  buscarPorIdentificacion(tipoIdentificacion: string, identificacion: string): Observable<L01RegulatoryData> {
    const params = new HttpParams()
      .set('tipoIdentificacion', tipoIdentificacion)
      .set('identificacion', identificacion);
    return this.http.get<L01RegulatoryData>(`${this.baseUrl}/buscar`, { params });
  }

  // Listar todos los registros
  listarTodos(): Observable<L01RegulatoryData[]> {
    return this.http.get<L01RegulatoryData[]>(this.baseUrl);
  }

  // Listar por identificación
  listarPorIdentificacion(identificacion: string): Observable<L01RegulatoryData[]> {
    return this.http.get<L01RegulatoryData[]>(`${this.baseUrl}/identificacion/${identificacion}`);
  }

  // Listar por clasificación
  listarPorClasificacion(clasificacion: number): Observable<L01RegulatoryData[]> {
    return this.http.get<L01RegulatoryData[]>(`${this.baseUrl}/clasificacion/${clasificacion}`);
  }

  // Listar por tipo emisor
  listarPorTipoEmisor(tipoEmisor: number): Observable<L01RegulatoryData[]> {
    return this.http.get<L01RegulatoryData[]>(`${this.baseUrl}/tipo-emisor/${tipoEmisor}`);
  }

  // Eliminar registro
  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Contar por clasificación
  contarPorClasificacion(clasificacion: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/contar/clasificacion/${clasificacion}`);
  }

  // Contar por tipo emisor
  contarPorTipoEmisor(tipoEmisor: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/contar/tipo-emisor/${tipoEmisor}`);
  }

  // Buscar última versión por identificación
  buscarUltimaVersionPorIdentificacion(identificacion: string): Observable<L01RegulatoryData> {
    return this.http.get<L01RegulatoryData>(`${this.baseUrl}/ultima-version/${identificacion}`);
  }

  // Exportar a TXT
  exportToTxt(request: ExportRequest): Observable<Blob> {
    return this.http.post(`${this.baseUrl}/export/txt`, request, { responseType: 'blob' });
  }

  // Exportar a Excel
  exportToExcel(request: ExportRequest): Observable<Blob> {
    return this.http.post(`${this.baseUrl}/export/excel`, request, { responseType: 'blob' });
  }

  // Validar estructura
  validateStructure(): Observable<ValidationResult> {
    return this.http.post<ValidationResult>(`${this.baseUrl}/validate`, {});
  }
}
