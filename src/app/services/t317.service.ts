import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface T317 {
  id: number;
  codigo: string;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class T317Service {
  private baseUrl = environment.backendEndpoint;

  constructor(private http: HttpClient) {}

  getAll(): Observable<T317[]> {
    return this.http.get<T317[]>(`${this.baseUrl}/api/catalogs/t317`)
      .pipe(
        map(response => {
          console.log('✅ T317 - Catálogo cargado:', response);
          return response;
        }),
        catchError(error => {
          console.error('❌ T317 - Error obteniendo catálogo:', error);
          throw error;
        })
      );
  }
}
