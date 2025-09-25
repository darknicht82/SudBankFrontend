import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface T47 {
  id: number;
  codigo: string;
  descripcion: string;
  estado: string;
}

@Injectable({
  providedIn: 'root'
})
export class T47Service {
  private apiUrl = `${environment.backendEndpoint}/catalogs/t47`;

  constructor(private http: HttpClient) {}

  /**
   * Obtener todos los estados de registro
   */
  getAll(): Observable<T47[]> {
    return this.http.get<T47[]>(this.apiUrl).pipe(
      map(response => {
        console.log('✅ API T47 - Estados de registro obtenidos:', response.length);
        return response;
      }),
      catchError(error => {
        console.error('❌ API T47 - Error obteniendo estados de registro:', error);
        return of([]); // Retornar array vacío en caso de error
      })
    );
  }

  /**
   * Obtener estado de registro por ID
   */
  getById(id: number): Observable<T47 | null> {
    return this.http.get<T47>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`❌ API T47 - Error obteniendo estado de registro ${id}:`, error);
        return of(null);
      })
    );
  }

  /**
   * Obtener estado de registro por código
   */
  getByCodigo(codigo: string): Observable<T47 | null> {
    return this.http.get<T47[]>(this.apiUrl).pipe(
      map(estados => estados.find(e => e.codigo === codigo) || null),
      catchError(error => {
        console.error(`❌ API T47 - Error obteniendo estado de registro por código ${codigo}:`, error);
        return of(null);
      })
    );
  }

  /**
   * Obtener solo estados de registro válidos
   */
  getValid(): Observable<T47[]> {
    return this.getAll().pipe(
      map(estados => estados.filter(e => e.estado === '1'))
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


