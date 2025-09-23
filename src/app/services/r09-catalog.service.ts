import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { FormGroup } from '@angular/forms';

export interface R09Catalog {
  id: number;
  codigo: string;
  descripcion: string;
}

export interface R09Resume {
  tipoIdentificacion: R09Catalog;
  identificacionSujeto: string;
  numeroOperacion: string;
  codigoTitulo: string;
  tipoTitulo: R09Catalog;
  descripcionTitulo: string;
}



@Injectable({
  providedIn: 'root'
})
export class R09CatalogService {
  private baseUrl = environment.backendEndpoint; // ✅ CONECTAR DIRECTAMENTE A APIS REALES


  constructor(private http: HttpClient) {}

  getResume(): Observable<R09Resume[]>{
    return this.http.get<R09Resume[]>(`${this.baseUrl}/structures/R09/resume`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener Tabla 4 desde API real:', error);
          throw error; // Propagar el error
        })
      );
  }

  saveR09(form: any ): void{
    const formValue = form;
    console.log('formValue: ', formValue);

    // Transform form into expected payload with correct field names and types
    const payload = {
      codigoTipoIdentificacion: formValue.tipoIdentificacion?.id,
      identificacionSujeto: formValue.identificacionSujeto,
      numeroOperacion: formValue.numeroOperacion,
      codigoTituloValor: formValue.codigoTituloValor,

      codigoTipoTitulo: formValue.tipoTitulo?.id,
      descripcionTituloValor: formValue.descripcionTituloValor,
      nombreEmisor: formValue.nombreEmisor,
      codigoPaisEmisor: formValue.pais?.id,

      fechaEmision: formValue.fechaEmision,
      fechaVencimiento: formValue.fechaVencimiento,
      valorNominal:  formValue.valorNominal,
      fechaContabilizacion: formValue.fechaContabilizacion,

      valorLibros: Number(formValue.valorLibros),
      valorProvisionConstituida: Number(formValue.valorProvisionConstituida),
      valorRealizacionTitulo: Number(formValue.valorRealizacionTitulo),
      codigoEstadoRegistro: formValue.estadoRegistro?.id,

      custodioExterno:  formValue.custodioExterno,
      numeroProcesoSubasta:  formValue.numeroProcesoSubasta,
      fechaPrimeraSubasta:  formValue.fechaPrimeraSubasta,
      fechaSegundaSubasta:  formValue.fechaSegundaSubasta,
    };

    console.log('Payload to send:', payload);

    this.http.post(`${this.baseUrl}/structures/R09`, payload).subscribe({
      next: (res) => console.log('Saved successfully', res),
      error: (err) => console.error('Error saving', err)
    });
  }

}