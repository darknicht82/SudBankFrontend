import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { FormGroup } from '@angular/forms';

export interface L02Catalog {
  id: number;
  codigo: string;
  descripcion: string;
}

export interface L02Resume {
  tipoIdentificacion: L02Catalog;
  emisor: L02Catalog;
  instrumento: L02Catalog;
  categoriaInstrumento: L02Catalog;
  tipoInstrumento: L02Catalog;
  identificacionInstrumento: string;
  numeroTitulo: string;
  fechaEmision: string;
  fechaVencimiento: string;
}



@Injectable({
  providedIn: 'root'
})
export class L02CatalogService {
  private baseUrl = environment.backendEndpoint; // ✅ CONECTAR DIRECTAMENTE A APIS REALES


  constructor(private http: HttpClient) {}

  getResume(): Observable<L02Resume[]>{
    return this.http.get<L02Resume[]>(`${this.baseUrl}/structures/L02/resume`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener Tabla 4 desde API real:', error);
          throw error; // Propagar el error
        })
      );
  }

  saveL02(form: any ): void{
    const formValue = form;
    console.log('formValue: ', formValue);

    // Transform form into expected payload
    const payload = {
      codigoTipoIdentificacion: formValue.tipoIdentificacion?.id,
      codigoEmisor: formValue.identificacionEmisor?.id,
      numeroTitulo: formValue.numeroTitulo,
      fechaEmision: formValue.fechaEmision,
      fechaCompra: formValue.fechaCompra,
      fechaVencimiento: formValue.fechaVencimiento,
      codigoIdentificadorInstrumento: formValue.codigoInstrumento?.id,
      identificacionInstrumento: formValue.identificacionInstrumento,
      codigoCategoriaInstrumento: formValue.categoriaInstrumento?.id,
      codigoTipoInstrumento: formValue.tipoInstrumento?.id,
      codigoOpcionalidad: formValue.opcionalidad?.id,
      codigoTasaBase: formValue.tasaBase?.id,
      diferencialRevision: formValue.diferencial,
      codigoTipoTasa: formValue.tipoTasa?.id,
      codigoMonedaDenominacion: formValue.moneda?.id,
      unidadesAdquiridas: formValue.unidadesAdquiridas,
      valorNominalDenominacion: formValue.valorNominalDenominacion,
      valorNominalDolares: formValue.valorNominalDolares,
      precioCompra: formValue.precioCompra,
      valorCompraDenominacion: formValue.valorCompraDenominacion,
      valorCompraDolares: formValue.valorCompraDolares,
      frecuenciaRevision: formValue.frecuenciaRevision,
      periodicidadPago: formValue.periodicidadPago,
    };

    console.log('Payload to send:', payload);

    this.http.post(`${this.baseUrl}/structures/L02`, payload).subscribe({
      next: (res) => console.log('Saved successfully', res),
      error: (err) => console.error('Error saving', err)
    });
  }

}