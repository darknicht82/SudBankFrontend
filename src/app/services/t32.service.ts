import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface T32 {
  id: number;
  codigo: string;
  descripcion: string;
  estado: string;
}

@Injectable({
  providedIn: 'root'
})
export class T32Service {
  private apiUrl = `${environment.backendEndpoint}/catalogs/t32`;

  constructor(private http: HttpClient) {}

  /**
   * Obtener todos los estados de operación
   */
  getAll(): Observable<T32[]> {
    return this.http.get<T32[]>(this.apiUrl).pipe(
      map(response => {
        console.log('✅ API T32 - Estados de operación obtenidos:', response.length);
        return response;
      }),
      catchError(error => {
        console.error('❌ API T32 - Error obteniendo estados de operación:', error);
        return of([]); // Retornar array vacío en caso de error
      })
    );
  }

  /**
   * Obtener estado de operación por ID
   */
  getById(id: number): Observable<T32 | null> {
    return this.http.get<T32>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`❌ API T32 - Error obteniendo estado de operación ${id}:`, error);
        return of(null);
      })
    );
  }

  /**
   * Obtener estado de operación por código
   */
  getByCodigo(codigo: string): Observable<T32 | null> {
    return this.http.get<T32[]>(this.apiUrl).pipe(
      map(estados => estados.find(e => e.codigo === codigo) || null),
      catchError(error => {
        console.error(`❌ API T32 - Error obteniendo estado de operación por código ${codigo}:`, error);
        return of(null);
      })
    );
  }

  /**
   * Verificar estado de la API
   */
  checkApiStatus(): Observable<boolean> {
    return this.http.get(this.apiUrl).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
