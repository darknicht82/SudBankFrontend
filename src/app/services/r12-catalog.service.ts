import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { FormGroup } from '@angular/forms';

export interface R12Catalog {
  id: number;
  codigo: string;
  descripcion: string;
}

export interface R12Resume {
  tipoIdentificacion: R12Catalog;
  nombreGrupoEconomico: string;
  identificacionIntegrante: string;
}


@Injectable({
  providedIn: 'root'
})
export class R12CatalogService {
  private baseUrl = environment.backendEndpoint; // ✅ CONECTAR DIRECTAMENTE A APIS REALES


  constructor(private http: HttpClient) {}

  getResume(): Observable<R12Resume[]>{
    return this.http.get<R12Resume[]>(`${this.baseUrl}/structures/R12/resume`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener Resumen desde API real:', error);
          throw error; // Propagar el error
        })
      );
  }

  saveR12(form: any ): void{
    const formValue = form;
    console.log('formValue: ', formValue);

    // Transform form into expected payload with correct field names and types
    const payload = {
      codigoTipoIdentificacion: formValue.tipoIdentificacion?.id,
      nombreGrupoEconomico: formValue.nombreGrupoEconomico,
      identificacionIntegrante: formValue.identificacionIntegrante
    };

    console.log('Payload to send:', payload);

    this.http.post(`${this.baseUrl}/structures/R12`, payload).subscribe({
      next: (res) => console.log('Saved successfully', res),
      error: (err) => console.error('Error saving', err)
    });
  }

}