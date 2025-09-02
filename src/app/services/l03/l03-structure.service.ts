import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, timeout, catchError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

// export interface L01Form {
//   tipoIdentificacion: string; // R/X
//   identificacion: string; // 13 dígitos RUC o código extranjero
//   clasificacion: number; // 1-4
//   tipo: number; // 0-9
// }

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

  // Método de búsqueda con filtros - HITO 1
  // searchL01Data(filters: L01SearchRequest): Observable<L01RegulatoryData[]> {
  //   const url = `${this.baseUrl}/structures/l01/search`;
    
  //   console.log('L01RegulatoryService: Conectando con backend en:', url);
  //   console.log('L01RegulatoryService: Filtros enviados:', filters);
    
  //   return this.http.post<L01RegulatoryData[]>(url, filters).pipe(
  //     timeout(environment.timeouts.apiRequest), // Timeout de 30 segundos
  //     catchError(this.handleError.bind(this))
  //   );
  // }

  // Método para obtener todos los registros L01
  // getAllL01Data(): Observable<L01RegulatoryData[]> {
  //   const url = `${this.baseUrl}/structures/l01`; // ✅ CORREGIDO: Endpoint real del backend
  //   return this.http.get<L01RegulatoryData[]>(url);
  // }

  getAll(): Observable<L03Dto[]> {
    let url: string = `${this.baseUrl}/structures/l03`;
    console.info('url endpoint:', url);
    return this.http.get<L03Dto[]>(url);
  }

  getById(id: number): Observable<L03Dto> {
    let url: string = `${this.baseUrl}/structures/l03/${id}`;
    return this.http.get<L03Dto>(url);
  }

  create(dto: L03Dto): Observable<L03Dto> {
    let url: string = `${this.baseUrl}/structures/l03`;
    return this.http.post<L03Dto>(url, dto);
  }

  update(id: number, dto: L03Dto): Observable<L03Dto> {
    let url: string = `${this.baseUrl}/structures/l03/${id}`;
    return this.http.put<L03Dto>(url, dto);
  }

  delete(id: number): Observable<void> {
    let url: string = `${this.baseUrl}/structures/l03/${id}`;
    return this.http.delete<void>(url);
  }

  // // Método para crear nuevo registro L01
  // createL01Data(data: L01RegulatoryData): Observable<L01RegulatoryData> {
  //   const url = `${this.baseUrl}/structures/l01`; // ✅ CORREGIDO: Endpoint real del backend
  //   return this.http.post<L01RegulatoryData>(url, data);
  // }

  // // Método para actualizar registro L01
  // updateL01Data(id: number, data: L01RegulatoryData): Observable<L01RegulatoryData> {
  //   const url = `${this.baseUrl}/structures/l01/${id}`; // ✅ CORREGIDO: Endpoint real del backend
  //   return this.http.put<L01RegulatoryData>(url, data);
  // }

  // // Método para eliminar registro L01
  // deleteL01Data(id: number): Observable<void> {
  //   const url = `${this.baseUrl}/structures/l01/${id}`; // ✅ CORREGIDO: Endpoint real del backend
  //   return this.http.delete<void>(url);
  // }

  // // Método para obtener registro L01 por ID
  // getL01DataById(id: number): Observable<L01RegulatoryData> {
  //   const url = `${this.baseUrl}/structures/l01/${id}`;
  //   return this.http.get<L01RegulatoryData>(url);
  // }

  // Método para convertir filtros del frontend a formato de API
  convertFrontendFiltersToAPI(filters: {
    tipoIdentificacion?: string;
    clasificacion?: number;
    tipoEmisor?: number;
  }): L01SearchRequest {
    return {
      id: null, // null para búsqueda sin filtros (el endpoint POST acepta null, no 0)
      codigoTipoIdentificacion: this.convertTipoIdentificacionToCode(filters.tipoIdentificacion),
      codigoEmisor: null, // null para búsqueda sin filtros
      codigoClasificacionEmisor: filters.clasificacion || null, // null si no hay filtro
      codigoTipoEmisor: filters.tipoEmisor || null // null si no hay filtro
    };
  }

  // Método auxiliar para convertir tipo de identificación a código
  private convertTipoIdentificacionToCode(tipo?: string): number | null {
    if (!tipo) return null; // null en lugar de 0 para búsqueda sin filtros
    switch (tipo.toUpperCase()) {
      case 'R': return 1; // RUC Nacional
      case 'X': return 2; // Extranjero
      default: return null; // null en lugar de 0
    }
  }

  // Método para obtener catálogos de referencia
  getTipoIdentificacionCatalog(): Observable<any[]> {
    const url = `${this.baseUrl}/catalogs/t4`;
    return this.http.get<any[]>(url);
  }

  getClasificacionCatalog(): Observable<any[]> {
    const url = `${this.baseUrl}/catalogs/t173`;
    return this.http.get<any[]>(url);
  }

  getTipoEmisorCatalog(): Observable<any[]> {
    const url = `${this.baseUrl}/catalogs/t73`;
    return this.http.get<any[]>(url);
  }

  private handleError(error: HttpErrorResponse) {
    console.error('L01RegulatoryService: Error detallado en la solicitud HTTP', {
      error: error,
      message: error.message,
      status: error.status,
      statusText: error.statusText,
      url: error.url,
      baseUrl: this.baseUrl
    });
    
    let errorMessage = 'Error desconocido en la solicitud HTTP';
    
    if (error.status === 0) {
      errorMessage = 'No se puede conectar con el backend. Verifique que esté ejecutándose y sea accesible.';
    } else if (error.status === 404) {
      errorMessage = 'Endpoint no encontrado en el backend. Verifique la URL del servicio.';
    } else if (error.status === 500) {
      errorMessage = 'Error interno del servidor backend. Contacte al administrador.';
    } else if (error.status === 401) {
      errorMessage = 'No autorizado. Verifique las credenciales de acceso.';
    } else if (error.status === 403) {
      errorMessage = 'Acceso prohibido. No tiene permisos para este recurso.';
    } else if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error del cliente: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Error del servidor: ${error.status} ${error.statusText}`;
    }
    
    return throwError(() => new Error(errorMessage));
  }
}