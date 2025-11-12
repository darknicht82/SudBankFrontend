import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { FormGroup } from '@angular/forms';

export interface R10Catalog {
  id: number;
  codigo: string;
  descripcion: string;
}

export interface R10Resume {
  tipoIdentificacion: R10Catalog;
  identificacionSujeto: R10Catalog;
  numeroOperacion: R10Catalog;
  codigoClaseBienTitulo: R10Catalog;
  codigoBienTitulo: R10Catalog;
  tipoBienTitulo: R10Catalog;
  provisionConstituida: R10Catalog;
  costosGenerados: R10Catalog;
  tipoTitulo: R10Catalog;
}



@Injectable({
  providedIn: 'root'
})
export class R10CatalogService {
  private baseUrl = environment.backendEndpoint; // ✅ CONECTAR DIRECTAMENTE A APIS REALES


  constructor(private http: HttpClient) {}

  getResume(): Observable<R10Resume[]>{
    return this.http.get<R10Resume[]>(`${this.baseUrl}/structures/R10/resume`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener Resumen desde API real:', error);
          throw error; // Propagar el error
        })
      );
  }
  
  saveR10(form: any ): void{
    const formValue = form;
    console.log('formValue: ', formValue);

    // Transform form into expected payload with correct field names and types
    const payload = {
      codigoTipoIdentificacion: formValue.tipoIdentificacion?.id,
      identificacionSujeto: formValue.identificacionSujeto,
      numeroOperacion: formValue.numeroOperacion,
      codigoClaseBienTitulo: formValue.codigoClaseBienTitulo?.id,
      codigoBienTitulo: formValue.codigoBienTitulo,
      tipoBienTitulo: formValue.tipoBienTitulo?.id,
      provisionConstituida: Number(formValue.provisionConstituida),
      costosGenerados: Number(formValue.costosGenerados),
      tipoTitulo: formValue.tipoTitulo?.id
    };

    console.log('Payload to send:', payload);

    this.http.post(`${this.baseUrl}/structures/R10`, payload).subscribe({
      next: (res) => console.log('Saved successfully', res),
      error: (err) => console.error('Error saving', err)
    });
  }

}