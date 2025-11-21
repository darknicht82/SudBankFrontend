import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { FormGroup } from '@angular/forms';

export interface R20Catalog {
  id: number;
  codigo: string;
  descripcion: string;
}

export interface R20Resume {
  tipoIdentificacion: R20Catalog;
  identificacionSujeto: string;
  numeroTarjeta: string;
  marcaTarjeta: R20Catalog;
  claseTarjeta: R20Catalog;
  fechaEmision: string;
  fechaVencimiento: string;
  numeroTarjetasAdicionales: number;
  oficina: R20Catalog;
  tipoCredito: R20Catalog;
  estadoRegistro: R20Catalog;
  totalIngresosSujeto: number;
  totalEgresosSujeto: number;
  
}


@Injectable({
  providedIn: 'root'
})
export class R20CatalogService {
  private baseUrl = environment.backendEndpoint; // ✅ CONECTAR DIRECTAMENTE A APIS REALES


  constructor(private http: HttpClient) {}

  getResume(): Observable<R20Resume[]>{
    return this.http.get<R20Resume[]>(`${this.baseUrl}/structures/R20/resume`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener Tabla 4 desde API real:', error);
          throw error; // Propagar el error
        })
      );
  }

  saveR20(form: any ): void{
    const formValue = form;
    console.log('formValue: ', formValue);

    // Transform form into expected payload with correct field names and types
    const payload = {
      codigoTipoIdentificacion: formValue.tipoIdentificacion?.id,
      identificacionSujeto: formValue.identificacionSujeto,
      numeroTarjeta: formValue.numeroTarjeta,
      marcaTarjeta: formValue.marcaTarjeta?.id,
      claseTarjeta: formValue.claseTarjeta?.id,
      fechaEmision: formValue.fechaEmision,
      fechaVencimiento: formValue.fechaVencimiento,
      numeroTarjetasAdicionales: formValue.numeroTarjetasAdicionales,
      oficina: formValue.oficina?.id,
      tipoCredito: formValue.tipoCredito?.id,
      estadoRegistro: formValue.estadoRegistro?.id,
      totalIngresosSujeto: Number(formValue.totalIngresosSujeto),
      totalEgresosSujeto: Number(formValue.totalEgresosSujeto),
      
    };

    console.log('Payload to send:', payload);

    this.http.post(`${this.baseUrl}/structures/R20`, payload).subscribe({
      next: (res) => console.log('Saved successfully', res),
      error: (err) => console.error('Error saving', err)
    });
  }

}