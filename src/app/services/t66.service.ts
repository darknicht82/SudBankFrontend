import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface T66 {
  id: number;
  codigo: string;
  descripcion: string;
  estado?: string;
}

@Injectable({
  providedIn: 'root'
})
export class T66Service {
  private apiUrl = `${environment.backendEndpoint}/catalogs/t66`;

  constructor(private http: HttpClient) {}

  /**
   * Crear nuevo emisor/custodio
   */
  create(emitter: T66): Observable<T66> {
    return this.http.post<T66>(this.apiUrl, emitter).pipe(
      catchError(error => {
        console.error('❌ Error:', error);
        throw error;
      })
    );
  }

  /**
   * Obtener todos los emisores/custodios
   */
  getAll(): Observable<T66[]> {
    return this.http.get<T66[]>(this.apiUrl).pipe(
      map(response => {
        console.log('✅ API T66 - Resultados obtenidos:', response.length);
        return response;
      }),
      catchError(error => {
        console.error('❌ API T66 - Error obteniendo resultado:', error);
        return of([]); // Retornar array vacío en caso de error
      })
    );
  }

  /**
   * Obtener por ID
   */
  getById(id: number): Observable<T66> {
    return this.http.get<T66>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`❌ Error obteniendo resultado ${id}:`, error);
        throw error;
      })
    );
  }

  /**
   * Actualizar
   */
  update(id: number, emitter: T66): Observable<T66> {
    return this.http.put<T66>(`${this.apiUrl}/${id}`, emitter).pipe(
      catchError(error => {
        console.error(`❌ Error ${id}:`, error);
        throw error;
      })
    );
  }

  /**
   * Eliminar
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`❌ Error  ${id}:`, error);
        throw error;
      })
    );
  }
}
