import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { FormGroup } from '@angular/forms';

export interface R05Catalog {
  id: number;
  codigo: string;
  descripcion: string;
}

export interface R05Resume {
  tipoIdentificacion: R05Catalog;
  identificacionSujeto: R05Catalog;
  numeroOperacion: R05Catalog;
  codigoTipoTransaccion: R05Catalog;
  fechaCancelacion: R05Catalog;
  codigoFormaCancelacion: R05Catalog;
  codigoCalificacion: R05Catalog;

}



@Injectable({
  providedIn: 'root'
})
export class R05CatalogService {
  private baseUrl = environment.backendEndpoint; // ✅ CONECTAR DIRECTAMENTE A APIS REALES


  constructor(private http: HttpClient) {}

  getResume(): Observable<R05Resume[]>{
    return this.http.get<R05Resume[]>(`${this.baseUrl}/structures/R05/resumen`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener Tabla 4 desde API real:', error);
          throw error; // Propagar el error
        })
      );
  }

  saveR05(form: any ): void{
    const formValue = form;
    console.log('formValue: ', formValue);

    // Transform form into expected payload with correct field names and types
    const payload = {
      codigoTipoIdentificacion: formValue.tipoIdentificacion?.id,
      identificacionSujeto: formValue.identificacionSujeto,
      numeroOperacion: Number(formValue.numeroOperacion),
      codigoTipoTransaccion: formValue.codigoTipoTransaccion?.id,
      fechaCancelacion: formValue.fechaCancelacion,
      codigoFormaCancelacion: formValue.codigoFormaCancelacion?.id,
      codigoCalificacion: formValue.codigoCalificacion?.id
    };

    console.log('Payload to send:', payload);

    this.http.post(`${this.baseUrl}/structures/R05`, payload).subscribe({
      next: (res) => console.log('Saved successfully', res),
      error: (err) => console.error('Error saving', err)
    });
  }

}