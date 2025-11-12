import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface T48 {
  id: number;
  codigo: string;
  descripcion: string;
  estado: string;
}

@Injectable({
  providedIn: 'root'
})
export class T48Service {
  private apiUrl = `${environment.backendEndpoint}/catalogs/t48`;

  constructor(private http: HttpClient) {}

  /**
   * Obtener todas las formas de pago
   */
  getAll(): Observable<T48[]> {
    return this.http.get<T48[]>(this.apiUrl).pipe(
      map(response => {
        console.log('✅ API T48 - Formas de pago obtenidas:', response.length);
        return response;
      }),
      catchError(error => {
        console.error('❌ API T48 - Error obteniendo formas de pago:', error);
        return of([]); // Retornar array vacío en caso de error
      })
    );
  }

  /**
   * Obtener forma de pago por ID
   */
  getById(id: number): Observable<T48 | null> {
    return this.http.get<T48>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`❌ API T48 - Error obteniendo forma de pago ${id}:`, error);
        return of(null);
      })
    );
  }

  /**
   * Obtener forma de pago por código
   */
  getByCodigo(codigo: string): Observable<T48 | null> {
    return this.http.get<T48[]>(this.apiUrl).pipe(
      map(formas => formas.find(f => f.codigo === codigo) || null),
      catchError(error => {
        console.error(`❌ API T48 - Error obteniendo forma de pago por código ${codigo}:`, error);
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
