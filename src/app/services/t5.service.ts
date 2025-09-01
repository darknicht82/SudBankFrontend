import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface T5 {
  id: number;
  descripcion: string;
  estado: string;
  codigo?: string;
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
   * Verificar estado de la API
   */
  checkApiStatus(): Observable<boolean> {
    return this.http.get(this.apiUrl).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
