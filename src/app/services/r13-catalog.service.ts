import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { FormGroup } from '@angular/forms';

export interface R13Catalog {
  id: number;
  codigo: string;
  descripcion: string;
}

export interface R13Resume {
  tipoIdentificacion: R13Catalog;
  identificacionIntegrante: string;
  codigoGrupoEconomico: string;
  codigoEstadoIntegrante: R13Catalog;
  fechaEstadoIntegrante: string;
  factorIntegracion: R13Catalog;
}


@Injectable({
  providedIn: 'root'
})
export class R13CatalogService {
  private baseUrl = environment.backendEndpoint; // ✅ CONECTAR DIRECTAMENTE A APIS REALES


  constructor(private http: HttpClient) {}

  getResume(): Observable<R13Resume[]>{
    return this.http.get<R13Resume[]>(`${this.baseUrl}/structures/R13/resume`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener Tabla 4 desde API real:', error);
          throw error; // Propagar el error
        })
      );
  }

  saveR13(form: any ): void{
    const formValue = form;
    console.log('formValue: ', formValue);

    // Transform form into expected payload with correct field names and types
    const payload = {
      codigoTipoIdentificacion: formValue.tipoIdentificacion?.id,
      codigoGrupoEconomico: formValue.codigoGrupoEconomico,
      identificacionIntegrante: formValue.identificacionIntegrante,
      codigoEstadoIntegrante: formValue.estadoIntegrante?.id,
      fechaEstadoIntegrante: formValue.fechaEstadoIntegrante,
      factorIntegracion: formValue.factorIntegracion?.id,
    };

    console.log('Payload to send:', payload);

    this.http.post(`${this.baseUrl}/structures/R13`, payload).subscribe({
      next: (res) => console.log('Saved successfully', res),
      error: (err) => console.error('Error saving', err)
    });
  }

}