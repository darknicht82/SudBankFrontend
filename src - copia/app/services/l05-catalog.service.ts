import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { FormGroup } from '@angular/forms';

export interface L05Catalog {
  id: number;
  codigo: string;
  descripcion: string;
}

export interface L05Resume {
  tipoIdentificacion: L05Catalog;
  emisor: L05Catalog;
  instrumento: L05Catalog;
  categoriaInstrumento: L05Catalog;
  tipoInstrumento: L05Catalog;
  identificacionInstrumento: string;
  numeroTitulo: string;
  fechaEmision: string;
  fechaVencimiento: string;
}



@Injectable({
  providedIn: 'root'
})
export class L05CatalogService {
  private baseUrl = environment.backendEndpoint; // ✅ CONECTAR DIRECTAMENTE A APIS REALES


  constructor(private http: HttpClient) {}

  getResume(): Observable<L05Resume[]>{
    return this.http.get<L05Resume[]>(`${this.baseUrl}/structures/l05/resume`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener Tabla 4 desde API real:', error);
          throw error; // Propagar el error
        })
      );
  }

  saveL05(form: any ): void{
    const formValue = form;
    console.log('formValue: ', formValue);

    // Transform form into expected payload
    const payload = {
      codigoTipoIdentificacion: formValue.tipoIdentificacion?.id,
      codigoDepositario: formValue.identificacionDepositario?.id,
      codigoTipoDeposito: formValue.tipoDeposito.id,
      numeroIdentificacionDeposito: formValue.numeroIdentificacionDeposito,
      cuentaContable: String(formValue.cuentaContable),
      codigoMoneda: formValue.moneda.id,
      valorMonedaDenominacion: formValue.valorMonedaDenominacion,
      valorLibrosDolares: formValue.valorLibrosDolares,
      codigoCalificacionRiesgoDepositario: formValue.calificacionRiesgoDepositario?.id,
      codigoCalificacionRiesgo: formValue.calificacionRiesgo?.id,
      fechaUltimaCalificacion: formValue.fechaUltimaCalificacion,
    };

    console.log('Payload to send:', payload);

    this.http.post(`${this.baseUrl}/structures/l05`, payload).subscribe({
      next: (res) => console.log('Saved successfully', res),
      error: (err) => console.error('Error saving', err)
    });
  }

}