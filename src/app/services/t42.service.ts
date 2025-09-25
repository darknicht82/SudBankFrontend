import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface T42 {
  id: number;
  codigo: string;
  descripcion: string;
  estado: string;
}

@Injectable({
  providedIn: 'root'
})
export class T42Service {
  private apiUrl = `${environment.backendEndpoint}/catalogs/t42`;

  constructor(private http: HttpClient) {}

  /**
   * Obtener todos los tipos de garantía
   */
  getAll(): Observable<T42[]> {
    return this.http.get<T42[]>(this.apiUrl).pipe(
      map(response => {
        console.log('✅ API T42 - Tipos de garantía obtenidos:', response.length);
        return response;
      }),
      catchError(error => {
        console.error('❌ API T42 - Error obteniendo tipos de garantía:', error);
        return of([]); // Retornar array vacío en caso de error
      })
    );
  }

  /**
   * Obtener tipo de garantía por ID
   */
  getById(id: number): Observable<T42 | null> {
    return this.http.get<T42>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`❌ API T42 - Error obteniendo tipo de garantía ${id}:`, error);
        return of(null);
      })
    );
  }

  /**
   * Obtener tipo de garantía por código
   */
  getByCodigo(codigo: string): Observable<T42 | null> {
    return this.http.get<T42[]>(this.apiUrl).pipe(
      map(tipos => tipos.find(t => t.codigo === codigo) || null),
      catchError(error => {
        console.error(`❌ API T42 - Error obteniendo tipo de garantía por código ${codigo}:`, error);
        return of(null);
      })
    );
  }

  /**
   * Obtener solo tipos de garantía válidos
   */
  getValid(): Observable<T42[]> {
    return this.getAll().pipe(
      map(tipos => tipos.filter(t => t.estado === '1'))
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


