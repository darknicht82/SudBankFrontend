import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { FormGroup } from '@angular/forms';

export interface R11Catalog {
  id: number;
  codigo: string;
  descripcion: string;
}

export interface R11Resume {
  tipoIdentificacion: R11Catalog;
  identificacionSujeto: R11Catalog;
  numeroOperacion: R11Catalog;
  codigoEntidadParticipe: R11Catalog;
  porcentajeParticipacion: R11Catalog;

}



@Injectable({
  providedIn: 'root'
})
export class R11CatalogService {
  private baseUrl = environment.backendEndpoint; // ✅ CONECTAR DIRECTAMENTE A APIS REALES


  constructor(private http: HttpClient) {}

  getResume(): Observable<R11Resume[]>{
    return this.http.get<R11Resume[]>(`${this.baseUrl}/structures/R11/resume`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener Tabla 4 desde API real:', error);
          throw error; // Propagar el error
        })
      );
  }

  saveR11(form: any ): void{
    const formValue = form;
    console.log('formValue: ', formValue);

    // Transform form into expected payload with correct field names and types
    const payload = {
      codigoTipoIdentificacion: formValue.tipoIdentificacion?.id,
      identificacionSujeto: formValue.identificacionSujeto,
      numeroOperacion: formValue.numeroOperacion,
      codigoEntidadParticipe: formValue.codigoEntidadParticipe?.id,
      porcentajeParticipacion: Number(formValue.porcentajeParticipacion)
      
    };

    console.log('Payload to send:', payload);

    this.http.post(`${this.baseUrl}/structures/R11`, payload).subscribe({
      next: (res) => console.log('Saved successfully', res),
      error: (err) => console.error('Error saving', err)
    });
  }

}