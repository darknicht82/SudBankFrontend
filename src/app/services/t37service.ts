import { Injectable } from "@angular/core";
import { environment } from '../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { catchError, map } from 'rxjs/operators';
import { get } from "http";

export interface T37 {
    id: number;
    codigo: string;
    descripcion: string;
    estado?: string;
}

@Injectable({
    providedIn: 'root'
})

export class T37Service {
    private apiUrl = `${environment.backendEndpoint}/catalogs/t37`;

    constructor(private http: HttpClient) {}

    create(emitter: T37) {
        return this.http.post<T37>(this.apiUrl, emitter).pipe(
        catchError(error => {
            console.error('❌ Error:', error);
            throw error;
        })
        );
    }

    getall() {
        return this.http.get<T37[]>(this.apiUrl).pipe(
        map(response => {
            console.log('✅ API T37 - Resultados obtenidos:', response.length);
            return response;
        }),
        catchError(error => {
            console.error('❌ API T37 - Error obteniendo resultado:', error);
            throw error;
        })
        );

    }

    getById(id: number) {
        return this.http.get<T37>(`${this.apiUrl}/${id}`).pipe(
        catchError(error => {
            console.error(`❌ Error obteniendo resultado ${id}:`, error);
            throw error;
        })
        );
    }

    


}
