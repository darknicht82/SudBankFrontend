import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface T164 {
  id: number;
  codigo: string;
  descripcion: string;
  codigoPais: number;
  estado?: string;
}

@Injectable({
  providedIn: 'root'
})
export class T164Service {
  private apiUrl = `${environment.backendEndpoint}/catalogs/t164`;

  constructor(private http: HttpClient) {}

  /**
   * Crear nuevo emisor/custodio
   */
  create(emitter: T164): Observable<T164> {
    return this.http.post<T164>(this.apiUrl, emitter).pipe(
      catchError(error => {
        console.error('❌ Error creando emisor:', error);
        throw error;
      })
    );
  }

  /**
   * Obtener todos los emisores/custodios
   */
  getAll(): Observable<T164[]> {
    return this.http.get<T164[]>(this.apiUrl).pipe(
      map(response => {
        console.log('✅ API T164 - Emisores obtenidos:', response.length);
        return response;
      }),
      catchError(error => {
        console.error('❌ API T164 - Error obteniendo emisores:', error);
        return of([]); // Retornar array vacío en caso de error
      })
    );
  }

  /**
   * Obtener emisor por ID
   */
  getById(id: number): Observable<T164> {
    return this.http.get<T164>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`❌ Error obteniendo emisor ${id}:`, error);
        throw error;
      })
    );
  }

  /**
   * Actualizar emisor
   */
  update(id: number, emitter: T164): Observable<T164> {
    return this.http.put<T164>(`${this.apiUrl}/${id}`, emitter).pipe(
      catchError(error => {
        console.error(`❌ Error actualizando emisor ${id}:`, error);
        throw error;
      })
    );
  }

  /**
   * Eliminar emisor
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`❌ Error eliminando emisor ${id}:`, error);
        throw error;
      })
    );
  }
}
