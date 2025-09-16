import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { FormGroup } from '@angular/forms';

export interface L04Catalog {
  id: number;
  codigo: string;
  descripcion: string;
}

export interface L04Resume {
  tipoIdentificacion: L04Catalog;
  emisor: L04Catalog;
  motivoTransferencia: L04Catalog;
  numeroTitulo: string;
  fechaEmision: string;
  fechaCompra: string;
  cuentaOrigen: number;
  cuentaDestino: number;
  valorLibrosCuentaOrigen: number;
  valorLibrosCuentaDestino: number;
  fechaTransferencia: string;
}



@Injectable({
  providedIn: 'root'
})
export class L04CatalogService {
  private baseUrl = environment.backendEndpoint; // ✅ CONECTAR DIRECTAMENTE A APIS REALES


  constructor(private http: HttpClient) {}

  getResume(): Observable<L04Resume[]>{
    return this.http.get<L04Resume[]>(`${this.baseUrl}/structures/L04/resume`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener Tabla 4 desde API real:', error);
          throw error; // Propagar el error
        })
      );
  }

  saveL04(form: any ): void{
    const formValue = form;
    console.log('formValue: ', formValue);

    // Transform form into expected payload
    const payload = {
      codigoTipoIdentificacion: formValue.tipoIdentificacion?.id,
      codigoEmisor: formValue.identificacionEmisor?.id,
      numeroTitulo: formValue.numeroTitulo,
      fechaEmision: formValue.fechaEmision,
      fechaCompra: formValue.fechaCompra,
      cuentaOrigen: formValue.cuentaOrigen,
      cuentaDestino: formValue.cuentaDestino,
      valorLibrosCuentaOrigen: formValue.valorLibrosCuentaOrigen,
      valorLibrosCuentaDestino: formValue.valorLibrosCuentaDestino,
      fechaTransferencia: formValue.fechaTransferencia,
      codigoMotivoTransferencia: formValue.motivoTransferencia?.id,
    };

    console.log('Payload to send:', payload);

    this.http.post(`${this.baseUrl}/structures/L04`, payload).subscribe({
      next: (res) => console.log('Saved successfully', res),
      error: (err) => console.error('Error saving', err)
    });
  }

}