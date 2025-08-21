import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface T4 {
  id: number;
  codigo: string;
  descripcion: string;
  estado: string;
}

@Injectable({
  providedIn: 'root'
})
export class T4Service {
  private apiUrl = `${environment.backendEndpoint}/catalogs/t4`;

  constructor(private http: HttpClient) {}

  /**
   * Obtener todos los tipos de identificación
   */
  getAll(): Observable<T4[]> {
    return this.http.get<T4[]>(this.apiUrl).pipe(
      map(response => {
        console.log('✅ API T4 - Tipos de identificación obtenidos:', response.length);
        return response;
      }),
      catchError(error => {
        console.error('❌ API T4 - Error obteniendo tipos de identificación:', error);
        return of([]); // Retornar array vacío en caso de error
      })
    );
  }

  /**
   * Obtener tipo de identificación por ID
   */
  getById(id: number): Observable<T4 | null> {
    return this.http.get<T4>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`❌ API T4 - Error obteniendo tipo de identificación ${id}:`, error);
        return of(null);
      })
    );
  }

  /**
   * Obtener tipo de identificación por código
   */
  getByCodigo(codigo: string): Observable<T4 | null> {
    return this.http.get<T4[]>(this.apiUrl).pipe(
      map(tipos => tipos.find(t => t.codigo === codigo) || null),
      catchError(error => {
        console.error(`❌ API T4 - Error obteniendo tipo de identificación por código ${codigo}:`, error);
        return of(null);
      })
    );
  }

  /**
   * Obtener solo tipos válidos para L01 (R y X)
   */
  getForL01(): Observable<T4[]> {
    return this.getAll().pipe(
      map(tipos => tipos.filter(t => ['R', 'X'].includes(t.codigo) && t.estado === '1'))
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
