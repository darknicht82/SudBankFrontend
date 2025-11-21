import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { FormGroup } from '@angular/forms';

export interface R22Catalog {
  id: number;
  codigo: string;
  descripcion: string;
}

export interface R22Resume {
  tipoIdentificacion: R22Catalog;
  identificacionSujeto: string;
  numeroTarjeta: string;
  diasMorasidad: number;
  calificacionPropia: R22Catalog;
  calificacionHomologada: R22Catalog;
  provisionRequerida: number;
  provisionConstituida: number;
  valorMinimoPagar: number;
  valorPagado: number;
  valorPagar: number;
  valorInteresValorPagar: number;
  valorSegurpValorPagar: number;
  saldoCuotaCapitalDiferida: number;
  valorInteresCapitalDiferido: number;
  
}


@Injectable({
  providedIn: 'root'
})
export class R22CatalogService {
  private baseUrl = environment.backendEndpoint; // ✅ CONECTAR DIRECTAMENTE A APIS REALES


  constructor(private http: HttpClient) {}

  getResume(): Observable<R22Resume[]>{
    return this.http.get<R22Resume[]>(`${this.baseUrl}/structures/R22/resume`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener Tabla 4 desde API real:', error);
          throw error; // Propagar el error
        })
      );
  }

  saveR22(form: any ): void{
    const formValue = form;
    console.log('formValue: ', formValue);

    // Transform form into expected payload with correct field names and types
    const payload = {
      codigoTipoIdentificacion: formValue.tipoIdentificacion?.id,
      identificacionSujeto: formValue.identificacionSujeto,
      numeroTarjeta: formValue.numeroTarjeta,
      diasMorasidad: Number(formValue.diasMorasidad),
      calificacionPropia: formValue.calificacionPropia?.id,
      calificacionHomologada: formValue.calificacionHomologada?.id,
      provisionRequerida: Number(formValue.provisionRequerida),
      provisionConstituida: Number(formValue.provisionConstituida),
      valorMinimoPagar: Number(formValue.valorMinimoPagar),
      valorPagado: Number(formValue.valorPagado),
      valorPagar: Number(formValue.valorPagar),
      valorInteresValorPagar: Number(formValue.valorInteresValorPagar),
      valorSeguroValorPagar: Number(formValue.valorSeguroValorPagar),
      saldoCuotaCapitalDiferida: Number(formValue.saldoCuotaCapitalDiferida),
      valorInteresCapitalDiferido: Number(formValue.valorInteresCapitalDiferido)
      
      
    };

    console.log('Payload to send:', payload);

    this.http.post(`${this.baseUrl}/structures/R22`, payload).subscribe({
      next: (res) => console.log('Saved successfully', res),
      error: (err) => console.error('Error saving', err)
    });
  }

}