import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface L01Catalog {
  id: number;
  codigo: string;
  descripcion: string;
}

export interface L01Resume {
  id: number;
  codigoTipoIdentificacion: number;
  codigoEmisor: number;
  codigoClasificacionEmisor: number;
  codigoTipoEmisor: number;
  identificacion: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class L01CatalogService {
  private baseUrl = environment.backendEndpoint;

  constructor(private http: HttpClient) {}

  getResume(): Observable<L01Resume[]> {
    return this.http.get<L01Resume[]>(`${this.baseUrl}/structures/l01`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener L01 desde API real:', error);
          throw error;
        })
      );
  }

  saveL01(form: any): Observable<any> {
    const formValue = form;
    console.log('formValue: ', formValue);

    // Transform form into expected payload
    const payload = {
      codigoTipoIdentificacion: formValue.tipoIdentificacion?.id,
      codigoEmisor: formValue.identificacion?.id,
      codigoClasificacionEmisor: formValue.clasificacion?.id,
      codigoTipoEmisor: formValue.tipoEmisor?.id
    };

    console.log('Payload to send:', payload);

    return this.http.post(`${this.baseUrl}/structures/l01`, payload).pipe(
      map(response => {
        console.log('✅ Saved successfully', response);
        return response;
      }),
      catchError(error => {
        console.error('❌ Error saving', error);
        throw error;
      })
    );
  }
}
