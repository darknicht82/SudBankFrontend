import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface CatalogFields {
  id: number;
  codigo: string;
  descripcion: string;
  estado?: string;
}

@Injectable({
  providedIn: 'root'
})
export class GenericCatalogService {

  constructor(private http: HttpClient) {}

  /**
   * Get all records for a given catalog
   * @param catalogName The catalog identifier (e.g., 't70', 't167', etc.)
   */
  getAllByCatalog(catalogName: string): Observable<CatalogFields[]> {
    let catalogUrl: string = `${environment.backendEndpoint}/catalogs/${catalogName}`;
    return this.http.get<CatalogFields[]>(catalogUrl).pipe(
      map(response => {
        console.log(`✅ API ${catalogName} - Resultados obtenidos: ${response.length}`);
        return response;
      }),
      catchError(error => {
        console.error(`❌ API ${catalogName} - Error obteniendo resultado:${error}`);
        return of([]); // Retornar array vacío en caso de error
      })
    );
  }
}
