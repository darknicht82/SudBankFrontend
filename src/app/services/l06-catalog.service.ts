import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable } from "rxjs";


export interface L06Catalog {
    id: number;
    codigo: string;
    descripcion: string;
}/* 
export interface L06DetailsDto {
    id?: number;
    codigoTipoIdentificacionEmisor: number;
    codigoIdentificacionEmisor: number;
    numeroTitulo: string;
    numeroOperacion: string;
    fechaEmision?: string;
    fechaCompra?: string;
    codigoEstadoOperacion: number;
    cuentaContable?: string;
    codigoTipoOperacion: number;
    fechaOperacion?: string;
    fechaVencimientoOperacion?: string;
    codigoTipoIdentificacionContraparte: number;
    codigoIdentificacionContraparteOperacion: number;
    codigoMonedaDenominacion: number;
    montoNegociadoDolares: number;
    tasaEfectivaAnual: number;
    valorNominalTituloDolares: number;
    valorMercadoTituloDolar: number;
    codigoCategoriaCalificacion: number;
    codigoCalificacionRiesgo: number;
    codigoCalificadoraRiesgo: number;
    codigoTipoIdentificacionCustodio: number;
} */

export interface L06Resume {
    id: number
    codigoTipoIdentificacion: number;
    codigoIdentificacionEmisor: number;
    numeroTitulo: number;
    numeroOperacion: number;
    fechaEmision: string;
    identificacion: string;
}

@Injectable({
    providedIn: 'root'
})
export class L06CatalogService {
    private baseUrl = environment.backendEndpoint;

    constructor(private http: HttpClient) { }

    getResume(): Observable<L06Resume[]> {
        return this.http.get<L06Resume[]>(`${this.baseUrl}/structures/l06/resume`)
            .pipe(catchError(error => {
                console.error('Error al obtener Tabla 6 desde API real:', error);
                throw error;
            }))
    }
    saveL06(form: any): void {
        const formValue = form;
    }
}
