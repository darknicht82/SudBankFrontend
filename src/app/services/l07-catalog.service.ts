import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { FormGroup } from "@angular/forms";

export interface L07Catalog{
    id: number;
    codigo: string;
    descripcion: string;
}

export interface L07Resume{
    tipoIdentificacionEmisor: L07Catalog;
    identificacionEmisor: string;
    nacionalidadEmisor: L07Catalog;
    tipoEmisor: L07Catalog;
}

@Injectable({
    providedIn: 'root'
})
export class L07CatalogService {
    private baseUrl = environment.backendEndpoint; // ✅ CONECTAR DIRECTAMENTE A APIS REALES

    constructor(private http: HttpClient){}

    getResume(): Observable<L07Resume[]>{
        return this.http.get<L07Resume[]>(`${this.baseUrl}/structures/l07/resume`)
        .pipe(
            catchError(error => {
                console.error('Error al obtener resumen L07 desde la API local', error);
                throw error;
            })
        );
    }

    saveL07(form: any): void{
        const formValue = form;
        console.log('formValue: ', formValue);

        const payload = {
            tipoIdentificacionEmisor: formValue.tipoIdentificacionEmisor?.id,
            identificacionEmisor: formValue.identificacionEmisor,
            nacionalidadEmisor: formValue.nacionalidadEmisor?.id,
            tipoEmisor: formValue.tipoEmisor?.id
        };

        console.log('Payload to be sent:', payload);

        this.http.post(`${this.baseUrl}/structures/l07`, payload).subscribe({
            next: (res) => console.log('L07 guardado exitosamente:', res),
            error: (err) => console.error('Error al guardar L07:', err)
        });
    }
}