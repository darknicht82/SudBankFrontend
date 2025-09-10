import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface T29 {
  id: number;
  codigo: string;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class T29Service {
  private baseUrl = environment.backendEndpoint;

  constructor(private http: HttpClient) {}

  getAllT29(): Observable<T29[]> {
    return this.http.get<T29[]>(`${this.baseUrl}/catalogs/t29`)
      .pipe(
        catchError(error => {
          console.error('❌ API T29 - Error obteniendo calificaciones:', error);
          throw error;
        })
      );
  }
}
