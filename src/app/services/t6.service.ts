import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface T6 {
  id: number;
  codigo: string;
  descripcion: string;
  estado: string;
}

@Injectable({
  providedIn: 'root'
})
export class T6Service {
  private apiUrl = `${environment.backendEndpoint}/catalogs/t6`;

  constructor(private http: HttpClient) {}

  /**
   * Obtener todas las provincias
   */
  getAll(): Observable<T6[]> {
    return this.http.get<T6[]>(this.apiUrl).pipe(
      map(response => {
        console.log('✅ API T6 - Provincias obtenidas:', response.length);
        return response;
      }),
      catchError(error => {
        console.error('❌ API T6 - Error obteniendo provincias:', error);
        return of([]); // Retornar array vacío en caso de error
      })
    );
  }

  /**
   * Obtener provincia por ID
   */
  getById(id: number): Observable<T6 | null> {
    return this.http.get<T6>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`❌ API T6 - Error obteniendo provincia ${id}:`, error);
        return of(null);
      })
    );
  }

  /**
   * Obtener provincia por código
   */
  getByCodigo(codigo: string): Observable<T6 | null> {
    return this.http.get<T6[]>(this.apiUrl).pipe(
      map(provincias => provincias.find(p => p.codigo === codigo) || null),
      catchError(error => {
        console.error(`❌ API T6 - Error obteniendo provincia por código ${codigo}:`, error);
        return of(null);
      })
    );
  }

  /**
   * Obtener solo provincias válidas
   */
  getValid(): Observable<T6[]> {
    return this.getAll().pipe(
      map(provincias => provincias.filter(p => p.estado === '1'))
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
