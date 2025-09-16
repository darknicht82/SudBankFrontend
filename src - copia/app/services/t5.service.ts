import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface T5 {
  id: number;
  codigo: string;
  descripcion: string;
  estado: string;
}

@Injectable({
  providedIn: 'root'
})
export class T5Service {
  private apiUrl = `${environment.backendEndpoint}/catalogs/t5`;

  constructor(private http: HttpClient) {}

  /**
   * Obtener todos los países
   */
  getAll(): Observable<T5[]> {
    return this.http.get<T5[]>(this.apiUrl).pipe(
      map(response => {
        console.log('✅ API T5 - Países obtenidos:', response.length);
        return response;
      }),
      catchError(error => {
        console.error('❌ API T5 - Error obteniendo países:', error);
        return of([]); // Retornar array vacío en caso de error
      })
    );
  }

  /**
   * Obtener país por ID
   */
  getById(id: number): Observable<T5 | null> {
    return this.http.get<T5>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`❌ API T5 - Error obteniendo país ${id}:`, error);
        return of(null);
      })
    );
  }

  /**
   * Obtener país por código
   */
  getByCodigo(codigo: string): Observable<T5 | null> {
    return this.http.get<T5[]>(this.apiUrl).pipe(
      map(paises => paises.find(p => p.codigo === codigo) || null),
      catchError(error => {
        console.error(`❌ API T5 - Error obteniendo país por código ${codigo}:`, error);
        return of(null);
      })
    );
  }

  /**
   * Obtener solo países válidos para L01
   */
  getForL01(): Observable<T5[]> {
    return this.getAll().pipe(
      map(paises => paises.filter(p => p.estado === '1'))
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
