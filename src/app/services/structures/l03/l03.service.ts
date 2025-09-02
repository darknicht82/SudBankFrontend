import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, timeout, catchError } from 'rxjs';
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
  id: number;
  codigoTipoIdentificacionEmisor: string;
  descripcionTipoIdentificacionEmisor: string;
  codigoIdentificacionEmisor: string;
  descripcionIdentificacionEmisor: string;
  numeroTitulo: string;
  fechaEmision: string;
  fechaCompra: string;
  codigoEstadoTitulo: string;
  descripcionEstadoTitulo: string;
  codigoCategoriaInversion: string;
  descripcionCategoriaInversion: string;
  codigoRangoVencimiento: string;
  descripcionRangoVencimiento: string;
}




// export interface L01RegulatoryData {
//   // SOLO LOS 4 CAMPOS OFICIALES L01 SEGÚN MANUAL SB MARZO 2017

//   // Campo 1: Tipo de identificación del emisor/custodio/depositario/contraparte
//   // Formato: caracter (1) - Referencia tabla 4
//   // Valores: "R" (RUC Nacional) o "X" (Extranjero)
//   tipoIdentificacion: string;

//   // Campo 2: Identificación del emisor/custodio/depositario/contraparte
//   // Formato: caracter (13) - Referencia tabla 164
//   // Para nacionales: RUC de 13 dígitos
//   // Para extranjeros: código de máximo 7 dígitos de tabla 164
//   identificacion: string;

//   // Campo 3: Clasificación de emisor/custodio/depositario/contraparte
//   // Formato: numérico (1) - Referencia tabla 173
//   // Valores: 1=Emisor, 2=Custodio, 3=Depositario, 4=Contraparte
//   clasificacion: number;

//   // Campo 4: Tipo de emisor/custodio/depositario/contraparte
//   // Formato: numérico (1) - Referencia tabla 73
//   // Valores: Sectores económicos según tabla 73
//   tipoEmisor: number;

//   // Campos internos del sistema (NO se exportan a RVC)
//   id?: number;
//   usuarioCreacion?: string;
//   fechaCreacion?: Date;
//   usuarioModificacion?: string;
//   fechaModificacion?: Date;

//   // Permitir acceso dinámico para compatibilidad
//   [key: string]: any;
// }

// Interface para la búsqueda según API real
export interface L01SearchRequest {
  id: number | null;
  codigoTipoIdentificacion: number | null;
  codigoEmisor: number | null;
  codigoClasificacionEmisor: number | null;
  codigoTipoEmisor: number | null;
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

  saveL03(form: any ): void{
    const formValue = form;
    console.log('formValue: ', formValue);

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
      fechaUltimaCalificacion: formValue.fechaUltimaCalificacion,
      fechaLiquidacionVenta: formValue.fechaLiquidacionVenta,
      precioLiquidacionVenta: formValue.precioLiquidacionVenta,
      valorFondoInversionUsd: formValue.valorFondoInversionUsd
    };

    console.log('Payload to send:', payload);

    this.http.post(`${this.baseUrl}/structures/l03`, payload).subscribe({
      next: (res) => console.log('Saved successfully', res),
      error: (err) => console.error('Error saving', err)
    });
  }



  // Método para convertir filtros del frontend a formato de API
  // convertFrontendFiltersToAPI(filters: {
  //   tipoIdentificacion?: string;
  //   clasificacion?: number;
  //   tipoEmisor?: number;
  // }): L01SearchRequest {
  //   return {
  //     id: null, // null para búsqueda sin filtros (el endpoint POST acepta null, no 0)
  //     codigoTipoIdentificacion: this.convertTipoIdentificacionToCode(filters.tipoIdentificacion),
  //     codigoEmisor: null, // null para búsqueda sin filtros
  //     codigoClasificacionEmisor: filters.clasificacion || null, // null si no hay filtro
  //     codigoTipoEmisor: filters.tipoEmisor || null // null si no hay filtro
  //   };
  // }

  // Método auxiliar para convertir tipo de identificación a código
  // private convertTipoIdentificacionToCode(tipo?: string): number | null {
  //   if (!tipo) return null; // null en lugar de 0 para búsqueda sin filtros
  //   switch (tipo.toUpperCase()) {
  //     case 'R': return 1; // RUC Nacional
  //     case 'X': return 2; // Extranjero
  //     default: return null; // null en lugar de 0
  //   }
  // }

  // Método para obtener catálogos de referencia
  // getTipoIdentificacionCatalog(): Observable<any[]> {
  //   const url = `${this.baseUrl}/catalogs/t4`;
  //   return this.http.get<any[]>(url);
  // }

  // getClasificacionCatalog(): Observable<any[]> {
  //   const url = `${this.baseUrl}/catalogs/t173`;
  //   return this.http.get<any[]>(url);
  // }

  // getTipoEmisorCatalog(): Observable<any[]> {
  //   const url = `${this.baseUrl}/catalogs/t73`;
  //   return this.http.get<any[]>(url);
  // }

  // private handleError(error: HttpErrorResponse) {
  //   console.error('L01RegulatoryService: Error detallado en la solicitud HTTP', {
  //     error: error,
  //     message: error.message,
  //     status: error.status,
  //     statusText: error.statusText,
  //     url: error.url,
  //     baseUrl: this.baseUrl
  //   });

  //   let errorMessage = 'Error desconocido en la solicitud HTTP';

  //   if (error.status === 0) {
  //     errorMessage = 'No se puede conectar con el backend. Verifique que esté ejecutándose y sea accesible.';
  //   } else if (error.status === 404) {
  //     errorMessage = 'Endpoint no encontrado en el backend. Verifique la URL del servicio.';
  //   } else if (error.status === 500) {
  //     errorMessage = 'Error interno del servidor backend. Contacte al administrador.';
  //   } else if (error.status === 401) {
  //     errorMessage = 'No autorizado. Verifique las credenciales de acceso.';
  //   } else if (error.status === 403) {
  //     errorMessage = 'Acceso prohibido. No tiene permisos para este recurso.';
  //   } else if (error.error instanceof ErrorEvent) {
  //     // Error del lado del cliente
  //     errorMessage = `Error del cliente: ${error.error.message}`;
  //   } else {
  //     // Error del lado del servidor
  //     errorMessage = `Error del servidor: ${error.status} ${error.statusText}`;
  //   }

  //   return throwError(() => new Error(errorMessage));
  // }
}