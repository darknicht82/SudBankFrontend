import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface T7 {
  id: number;
  codigo: string;
  descripcion: string;
  estado: string;
}

@Injectable({
  providedIn: 'root'
})
export class T7Service {
  private apiUrl = `${environment.backendEndpoint}/catalogs/t7`;

  constructor(private http: HttpClient) {}

  /**
   * Obtener todos los cantones
   */
  getAll(): Observable<T7[]> {
    return this.http.get<T7[]>(this.apiUrl).pipe(
      map(response => {
        console.log('✅ API T7 - Cantones obtenidos:', response.length);
        return response;
      }),
      catchError(error => {
        console.error('❌ API T7 - Error obteniendo cantones:', error);
        return of([]); // Retornar array vacío en caso de error
      })
    );
  }

  /**
   * Obtener cantón por ID
   */
  getById(id: number): Observable<T7 | null> {
    return this.http.get<T7>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`❌ API T7 - Error obteniendo cantón ${id}:`, error);
        return of(null);
      })
    );
  }

  /**
   * Obtener cantón por código
   */
  getByCodigo(codigo: string): Observable<T7 | null> {
    return this.http.get<T7[]>(this.apiUrl).pipe(
      map(cantones => cantones.find(c => c.codigo === codigo) || null),
      catchError(error => {
        console.error(`❌ API T7 - Error obteniendo cantón por código ${codigo}:`, error);
        return of(null);
      })
    );
  }

  /**
   * Obtener solo cantones válidos
   */
  getValid(): Observable<T7[]> {
    return this.getAll().pipe(
      map(cantones => cantones.filter(c => c.estado === '1'))
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


