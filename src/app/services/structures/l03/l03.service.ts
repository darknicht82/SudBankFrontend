import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, timeout, catchError, map } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface L03Dto {
  id?: number;
  codigoTipoIdentificacionEmisor: string;
  codigoIdentificacionEmisor: string;
  numeroTitulo: string;
  fechaEmision: string;
  fechaCompra: string;
  codigoEstadoTitulo: string;
  codigoCategoriaInversion: string;
  codigoRangoVencimiento: number;
  tasaInteresNominal: number;
  montoInteresesUsd: number;
  valorLibrosUsd: number;
  precioMercado: number;
  fechaValorMercado: string;
  valorMercadoUsd: number;
  codigoFuenteInfoMercado: string;
  tasaRetornoTir: number;
  valorPresenteUsd: number;
  provisionRequerida: number;
  provisionConstituida: number;
  gananciasPerdidasPeriodo: number;
  codigoCalificacionRiesgo: number;
  codigoCategoriaCalificacion: number;
  codigoCalificadoraRiesgo: number;
  fechaUltimaCalificacion: string;
  fechaLiquidacionVenta: string;
  precioLiquidacionVenta: number;
  valorFondoInversionUsd: number;
  codigoFondoInversion: number;
  codigoTipoIdentificacionCustodio: string;
  codigoIdentificacionCustodio: string;
  codigoCalificacionRiesgoCustodio: number;
  codigoCalificadoraRiesgoCustodio: number;
  codigoSubsidiaria: number;
}

export interface L03DetailsDto {
  // Campos idénticos a L03Dto
  id?: number;
  codigoTipoIdentificacionEmisor: string;
  codigoIdentificacionEmisor: string;
  numeroTitulo: string;
  fechaEmision: string;
  fechaCompra: string;
  codigoEstadoTitulo: string;
  codigoCategoriaInversion: string;
  codigoRangoVencimiento: number;
  tasaInteresNominal: number;
  montoInteresesUsd: number;
  valorLibrosUsd: number;
  precioMercado: number;
  fechaValorMercado: string;
  valorMercadoUsd: number;
  codigoFuenteInfoMercado: string;
  tasaRetornoTir: number;
  valorPresenteUsd: number;
  provisionRequerida: number;
  provisionConstituida: number;
  gananciasPerdidasPeriodo: number;
  codigoCalificacionRiesgo: number;
  codigoCategoriaCalificacion: number;
  codigoCalificadoraRiesgo: number;
  fechaUltimaCalificacion: string;
  fechaLiquidacionVenta: string;
  precioLiquidacionVenta: number;
  valorFondoInversionUsd: number;
  codigoFondoInversion: number;
  codigoTipoIdentificacionCustodio: string;
  codigoIdentificacionCustodio: string;
  codigoCalificacionRiesgoCustodio: number;
  codigoCalificadoraRiesgoCustodio: number;
  codigoSubsidiaria: number;
  
  // Campos adicionales con descripciones para mostrar en la UI
  descripcionTipoIdentificacionEmisor?: string;
  descripcionIdentificacionEmisor?: string;
  descripcionEstadoTitulo?: string;
  descripcionCategoriaInversion?: string;
  descripcionRangoVencimiento?: string;
  descripcionFuenteInfoMercado?: string;
  descripcionCalificacionRiesgo?: string;
  descripcionCategoriaCalificacion?: string;
  descripcionCalificadoraRiesgo?: string;
  descripcionFondoInversion?: string;
  descripcionTipoIdentificacionCustodio?: string;
  descripcionIdentificacionCustodio?: string;
  descripcionCalificacionRiesgoCustodio?: string;
  descripcionCalificadoraRiesgoCustodio?: string;
  descripcionSubsidiaria?: string;
}

@Injectable({
  providedIn: 'root'
})
export class L03StructureService {
  private baseUrl = environment.backendEndpoint;

  constructor(private http: HttpClient) { }

  getAllDetails(): Observable<L03DetailsDto[]> {
    let url: string = `${this.baseUrl}/structures/l03/details`;
    console.info('url endpoint:', url);
    return this.http.get<L03DetailsDto[]>(url);
  }

  saveL03(form: any ): Observable<any>{
    const formValue = form;
    console.log('📝 L03 - Formulario recibido:', formValue);

    const payload = {
      codigoTipoIdentificacionEmisor: formValue.codigoTipoIdentificacionEmisor?.id,
      codigoIdentificacionEmisor: formValue.codigoIdentificacionEmisor?.id,
      numeroTitulo: formValue.numeroTitulo,
      fechaEmision: formValue.fechaEmision,
      fechaCompra: formValue.fechaCompra,
      fechaVencimiento: formValue.fechaVencimiento,
      codigoEstadoTitulo: formValue.codigoEstadoTitulo?.id,
      codigoCategoriaInversion: formValue.codigoCategoriaInversion?.id,
      codigoRangoVencimiento: formValue.codigoRangoVencimiento?.id,

      tasaInteresNominal: formValue.tasaInteresNominal,
      montoInteresesUsd: formValue.montoInteresesUsd,
      valorLibrosUsd: formValue.valorLibrosUsd,
      precioMercado: formValue.precioMercado,
      fechaValorMercado: formValue.fechaValorMercado,
      valorMercadoUsd: formValue.valorMercadoUsd,
      codigoFuenteInfoMercado: formValue.codigoFuenteInfoMercado?.id,
      tasaRetornoTir: formValue.tasaRetornoTir,
      valorPresenteUsd: formValue.valorPresenteUsd,
      provisionRequerida: formValue.provisionRequerida,
      provisionConstituida: formValue.provisionConstituida,
      gananciasPerdidasPeriodo: formValue.gananciasPerdidasPeriodo,
      codigoCalificacionRiesgo: formValue.codigoCalificacionRiesgo?.id,
      codigoCategoriaCalificacion: formValue.codigoCategoriaCalificacion?.id,
      codigoCalificadoraRiesgo: formValue.codigoCalificadoraRiesgo?.id,

      fechaUltimaCalificacion: formValue.fechaUltimaCalificacion,
      fechaLiquidacionVenta: formValue.fechaLiquidacionVenta,
      precioLiquidacionVenta: formValue.precioLiquidacionVenta,
      valorFondoInversionUsd: formValue.valorFondoInversionUsd,

      codigoFondoInversion: formValue.codigoFondoInversion?.id,
      codigoTipoIdentificacionCustodio: formValue.codigoTipoIdentificacionCustodio?.id,
      codigoIdentificacionCustodio: formValue.codigoIdentificacionCustodio?.id,
      codigoCalificacionRiesgoCustodio: formValue.codigoCalificacionRiesgoCustodio?.id,
      codigoCalificadoraRiesgoCustodio: formValue.codigoCalificadoraRiesgoCustodio?.id,
      codigoSubsidiaria: formValue.codigoSubsidiaria
    };

    console.log('📤 L03 - Payload a enviar:', payload);
    console.log('🌐 L03 - URL:', `${this.baseUrl}/structures/l03`);

    return this.http.post(`${this.baseUrl}/structures/l03`, payload).pipe(
      map(response => {
        console.log('✅ L03 - Guardado exitoso:', response);
        return response;
      }),
      catchError(error => {
        console.error('❌ L03 - Error al guardar:', error);
        console.error('❌ L03 - Status:', error.status);
        console.error('❌ L03 - Message:', error.message);
        throw error;
      })
    );
  }
}