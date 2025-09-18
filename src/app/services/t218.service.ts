import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface T218 {
  id: number;
  codigo: string;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class T218Service {
  private baseUrl = environment.backendEndpoint;

  constructor(private http: HttpClient) {}

  getAllT218(): Observable<T218[]> {
    return this.http.get<T218[]>(`${this.baseUrl}/catalogs/t218`)
      .pipe(
        catchError(error => {
          console.error('❌ API T218 - Error obteniendo metodologías de calificación:', error);
          throw error;
        })
      );
  }
}
