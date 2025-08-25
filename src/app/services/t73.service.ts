import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface T73 {
  id: number;
  codigo: string;
  descripcion: string;
  estado: string;
}

@Injectable({
  providedIn: 'root'
})
export class T73Service {
  private apiUrl = `${environment.backendEndpoint}/catalogs/t73`;

  constructor(private http: HttpClient) {}

  /**
   * Obtener todos los tipos de emisor
   */
  getAll(): Observable<T73[]> {
    return this.http.get<T73[]>(this.apiUrl).pipe(
      map(response => {
        console.log('✅ API T73 - Tipos de emisor obtenidos:', response.length);
        return response;
      }),
      catchError(error => {
        console.error('❌ API T73 - Error obteniendo tipos de emisor:', error);
        return of([]); // Retornar array vacío en caso de error
      })
    );
  }

  /**
   * Obtener tipo de emisor por ID
   */
  getById(id: number): Observable<T73 | null> {
    return this.http.get<T73>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`❌ API T73 - Error obteniendo tipo de emisor ${id}:`, error);
        return of(null);
      })
    );
  }

  /**
   * Obtener tipo de emisor por código
   */
  getByCodigo(codigo: string): Observable<T73 | null> {
    return this.http.get<T73[]>(this.apiUrl).pipe(
      map(tipos => tipos.find(t => t.codigo === codigo) || null),
      catchError(error => {
        console.error(`❌ API T73 - Error obteniendo tipo de emisor por código ${codigo}:`, error);
        return of(null);
      })
    );
  }

  /**
   * Obtener solo tipos válidos para L01 (excluyendo "no aplica")
   */
  getForL01(): Observable<T73[]> {
    return this.getAll().pipe(
      map(tipos => tipos.filter(t => 
        t.estado === '1' && 
        !t.descripcion.toLowerCase().includes('no aplica l01') &&
        !t.descripcion.toLowerCase().includes('no aplica en estructura l01')
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
