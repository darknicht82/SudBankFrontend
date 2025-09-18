import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface T55 {
  id: number;
  codigo: string;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class T55Service {
  private baseUrl = environment.backendEndpoint;

  constructor(private http: HttpClient) {}

  getAllT55(): Observable<T55[]> {
    return this.http.get<T55[]>(`${this.baseUrl}/catalogs/t55`) 
      .pipe(
        catchError(error => {
          console.error('❌ API T55 - Error obteniendo objetos de fideicomiso:', error);
          throw error;
        })
      );
  }
}
