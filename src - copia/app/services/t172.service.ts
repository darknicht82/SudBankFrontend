import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface T172 {
  id: number;
  codigo: string;
  descripcion: string;
  estado: string;
}

@Injectable({
  providedIn: 'root'
})
export class T172Service {
  private apiUrl = `${environment.backendEndpoint}/catalogs/t172`;

  constructor(private http: HttpClient) {}

  /**
   * Obtener todas las clasificaciones
   */
  getAll(): Observable<T172[]> {
    return this.http.get<T172[]>(this.apiUrl).pipe(
      map(response => {
        console.log('✅ API T172 - Clasificaciones obtenidas:', response.length);
        return response;
      }),
      catchError(error => {
        console.error('❌ API T172 - Error obteniendo clasificaciones:', error);
        return of([]); // Retornar array vacío en caso de error
      })
    );
  }

  /**
   * Obtener clasificación por ID
   */
  getById(id: number): Observable<T172 | null> {
    return this.http.get<T172>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`❌ API T172 - Error obteniendo clasificación ${id}:`, error);
        return of(null);
      })
    );
  }

  /**
   * Obtener clasificación por código
   */
  getByCodigo(codigo: string): Observable<T172 | null> {
    return this.http.get<T172[]>(this.apiUrl).pipe(
      map(clasificaciones => clasificaciones.find(c => c.codigo === codigo) || null),
      catchError(error => {
        console.error(`❌ API T172 - Error obteniendo clasificación por código ${codigo}:`, error);
        return of(null);
      })
    );
  }

  /**
   * Obtener solo clasificaciones válidas para L01 (1-4)
   */
  getForL01(): Observable<T172[]> {
    return this.getAll().pipe(
      map(clasificaciones => clasificaciones.filter(c => 
        c.estado === '1' && 
        ['1', '2', '3', '4'].includes(c.codigo)
      ))
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
