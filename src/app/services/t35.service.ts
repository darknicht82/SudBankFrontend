import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface T35 {
  id: number;
  codigo: string;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class T35Service {
  private baseUrl = environment.backendEndpoint;

  constructor(private http: HttpClient) {}

  getAllT35(): Observable<T35[]> {
    return this.http.get<T35[]>(`${this.baseUrl}/catalogs/t35`)
      .pipe(
        catchError(error => {
          console.error('❌ API T35 - Error obteniendo tipos de operación:', error);
          throw error;
        })
      );
  }
}
