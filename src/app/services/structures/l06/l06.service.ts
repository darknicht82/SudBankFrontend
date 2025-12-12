import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";



export interface L06Dto {
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
}
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
}
@Injectable({
    providedIn: 'root'
})
export class L06StructureService {
    private baseUrl = environment.backendEndpoint;

    constructor(private http: HttpClient) { }

    getAllDetails(): Observable<L06DetailsDto[]> {
        let url: string = `${this.baseUrl}/structures/l03/details`;
        return this.http.get<L06DetailsDto[]>(url);
    }
}