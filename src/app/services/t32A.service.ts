import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface T32A {
  id: number;
  codigo: string;
  descripcion: string;
  estado: string;
}

@Injectable({
  providedIn: 'root'
})
export class T32AService {
  private apiUrl = `${environment.backendEndpoint}/catalogs/t32_A`;

  constructor(private http: HttpClient) {}

  /**
   * Obtener todas las situaciones de operación
   */
  getAll(): Observable<T32A[]> {
    return this.http.get<T32A[]>(this.apiUrl).pipe(
      map(response => {
        console.log('✅ API T32A - Situaciones de operación obtenidas:', response.length);
        return response;
      }),
      catchError(error => {
        console.error('❌ API T32A - Error obteniendo situaciones de operación:', error);
        return of([]); // Retornar array vacío en caso de error
      })
    );
  }

  /**
   * Obtener situación de operación por ID
   */
  getById(id: number): Observable<T32A | null> {
    return this.http.get<T32A>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`❌ API T32A - Error obteniendo situación de operación ${id}:`, error);
        return of(null);
      })
    );
  }

  /**
   * Obtener situación de operación por código
   */
  getByCodigo(codigo: string): Observable<T32A | null> {
    return this.http.get<T32A[]>(this.apiUrl).pipe(
      map(situaciones => situaciones.find(s => s.codigo === codigo) || null),
      catchError(error => {
        console.error(`❌ API T32A - Error obteniendo situación de operación por código ${codigo}:`, error);
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
