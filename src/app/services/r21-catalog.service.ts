import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { FormGroup } from '@angular/forms';

export interface R21Catalog {
  id: number;
  codigo: string;
  descripcion: string;
}

export interface R21Resume {
  tipoIdentificacion: R21Catalog;
  estadoOperacion: R21Catalog;
  formaPago: R21Catalog;
  objetoFideicomiso: R21Catalog;
  situacionOperacion: R21Catalog;
  tipoOperacion: R21Catalog;
  tipoSistemaAmortizacion: R21Catalog;
  identificacionSujeto: string;
  numeroTarjeta: string;
  cupoTarjeta: number;
  capitalConsumo: number;
  tea: number;
}

@Injectable({
  providedIn: 'root'
})
export class R21CatalogService {
  private baseUrl = environment.backendEndpoint; // ✅ R21 conectado a producción

  constructor(private http: HttpClient) {}

  getResume(): Observable<R21Resume[]>{
    return this.http.get<R21Resume[]>(`${this.baseUrl}/structures/R21/resume`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener R21 resume desde API real:', error);
          // Fallback: intentar con endpoint alternativo
          return this.http.get<R21Resume[]>(`${this.baseUrl}/structures/R21`)
            .pipe(
              catchError(fallbackError => {
                console.error('Error en fallback R21:', fallbackError);
                throw fallbackError;
              })
            );
        })
      );
  }

  saveR21(form: any ): Observable<any>{
    const formValue = form;
    console.log('📝 R21 - Formulario recibido:', formValue);

    // Transform form into expected payload
    const payload = {
      codigoTipoIdentificacion: formValue.tipoIdentificacion?.id,
      identificacionSujeto: formValue.identificacionSujeto,
      numeroTarjeta: formValue.numeroTarjeta,
      cupoTarjeta: formValue.cupoTarjeta,
      capitalConsumo: formValue.capitalConsumo,
      tea: formValue.tea,
      codigoEstadoOperacion: formValue.estadoOperacion?.id,
      codigoFormaPago: formValue.formaPago?.id,
      capitalPorVencer1a30Dias: formValue.capitalPorVencer1a30Dias,
      capitalPorVencer31a90Dias: formValue.capitalPorVencer31a90Dias,
      capitalPorVencer91a180Dias: formValue.capitalPorVencer91a180Dias,
      capitalPorVencer181a360Dias: formValue.capitalPorVencer181a360Dias,
      capitalPorVencerMas360Dias: formValue.capitalPorVencerMas360Dias,
      costosOperativosPorVencer: formValue.costosOperativosPorVencer,
      valorNoDevenganIntereses1a30Dias: formValue.valorNoDevenganIntereses1a30Dias,
      valorNoDevenganIntereses31a90Dias: formValue.valorNoDevenganIntereses31a90Dias,
      valorNoDevenganIntereses91a180Dias: formValue.valorNoDevenganIntereses91a180Dias,
      valorNoDevenganIntereses181a360Dias: formValue.valorNoDevenganIntereses181a360Dias,
      valorNoDevenganInteresesMas360Dias: formValue.valorNoDevenganInteresesMas360Dias,
      capitalVencido1a30Dias: formValue.capitalVencido1a30Dias,
      capitalVencido31a90Dias: formValue.capitalVencido31a90Dias,
      capitalVencido91a180Dias: formValue.capitalVencido91a180Dias,
      capitalVencido181a360Dias: formValue.capitalVencido181a360Dias,
      capitalVencidoMas360Dias: formValue.capitalVencidoMas360Dias,
      capitalVencido181a270Dias: formValue.capitalVencido181a270Dias,
      capitalVencidoMas270Dias: formValue.capitalVencidoMas270Dias,
      interesVencido1a30Dias: formValue.interesVencido1a30Dias,
      interesVencido31a60Dias: formValue.interesVencido31a60Dias,
      interesVencido61a90Dias: formValue.interesVencido61a90Dias,
      interesVencido91a180Dias: formValue.interesVencido91a180Dias,
      interesVencido181a270Dias: formValue.interesVencido181a270Dias,
      interesVencidoMas270Dias: formValue.interesVencidoMas270Dias,
      totalCostosOperativosVencidos: formValue.totalCostosOperativosVencidos,
      interesSobreMora: formValue.interesSobreMora,
      valorEnDemandaJudicial: formValue.valorEnDemandaJudicial,
      carteraCastigada: formValue.carteraCastigada,
      codigoObjetoFideicomiso: formValue.objetoFideicomiso?.id,
      codigoSituacionOperacion: formValue.situacionOperacion?.id,
      codigoTipoOperacion: formValue.tipoOperacion?.id,
      contribucionAtencionCancer: formValue.contribucionAtencionCancer,
      fechaTransferenciaCuentasVencidas: formValue.fechaTransferenciaCuentasVencidas,
      interesesAcumuladosPorCobrar: formValue.interesesAcumuladosPorCobrar,
      interesesReversados: formValue.interesesReversados,
      fechaExigibilidadCuota: formValue.fechaExigibilidadCuota,
      codigoTipoSistemaAmortizacion: formValue.tipoSistemaAmortizacion?.id,
      fechaActualizacion: formValue.fechaActualizacion,
      usuarioActualizacion: formValue.usuarioActualizacion
    };

    console.log('📤 R21 - Payload a enviar:', payload);
    console.log('🌐 R21 - URL:', `${this.baseUrl}/structures/R21`);

    return this.http.post(`${this.baseUrl}/structures/R21`, payload).pipe(
      map(response => {
        console.log('✅ R21 - Guardado exitoso:', response);
        return response;
      }),
      catchError(error => {
        console.error('❌ R21 - Error al guardar:', error);
        console.error('❌ R21 - Status:', error.status);
        console.error('❌ R21 - Message:', error.message);
        throw error;
      })
    );
  }

}
