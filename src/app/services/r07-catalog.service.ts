import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { FormGroup } from '@angular/forms';

export interface R07Catalog {
  id: number;
  codigo: string;
  descripcion: string;
}

export interface CatalogItem {
  id: number;
  codigo: string;
  descripcion: string;
}

export interface R07Resume {
  tipoIdentificacionSujeto: R07Catalog;
  ubicacionGarantiaPais: R07Catalog;
  ubicacionGarantiaProvincia: R07Catalog;
  ubicacionGarantiaCanton: R07Catalog;
  tipoGarantia: R07Catalog;
  estadoRegistro: R07Catalog;
  identificacionSujeto: string;
  numeroOperacion: string;
  numeroGarantia: string;
  descripcionGarantia: string;
  valorAvaluoTitulo: number;
  fechaAvaluo: string;
  numeroRegistroGarantia: string;
  fechaContabilizacionGarantia: string;
  porcentajeCubreGarantia: number;
}

export interface R07Data {
  id: number;
  tipoIdentificacionSujeto: string;
  identificacionSujeto: string;
  numeroOperacion: string;
  numeroGarantia: string;
  tipoGarantia: string;
  descripcionGarantia: string;
  ubicacionGarantiaPais: string;
  ubicacionGarantiaProvincia: string;
  ubicacionGarantiaCanton: string;
  valorAvaluoTitulo: number;
  fechaAvaluo: string;
  numeroRegistroGarantia: string;
  fechaContabilizacionGarantia: string;
  porcentajeCubreGarantia: number;
  estadoRegistro: string;
}

@Injectable({
  providedIn: 'root'
})
export class R07CatalogService {
  private baseUrl = environment.backendEndpoint; // ✅ CONECTAR DIRECTAMENTE A APIS REALES

  constructor(private http: HttpClient) {}

  getResume(): Observable<R07Resume[]>{
    return this.http.get<R07Resume[]>(`${this.baseUrl}/structures/R07/resume`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener R07 resume desde API real:', error);
          // Fallback: intentar con endpoint alternativo
          return this.http.get<R07Resume[]>(`${this.baseUrl}/structures/R07`)
            .pipe(
              catchError(fallbackError => {
                console.error('Error en fallback R07:', fallbackError);
                throw fallbackError;
              })
            );
        })
      );
  }

  getAllR07(): Observable<R07Data[]> {
    return this.http.get<R07Data[]>(`${this.baseUrl}/structures/R07`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener R07 desde API real:', error);
          throw error;
        })
      );
  }

  getR07ById(id: number): Observable<R07Data> {
    return this.http.get<R07Data>(`${this.baseUrl}/structures/R07/${id}`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener R07 por ID desde API real:', error);
          throw error;
        })
      );
  }

  createR07(data: R07Data): Observable<R07Data> {
    return this.http.post<R07Data>(`${this.baseUrl}/structures/R07`, data)
      .pipe(
        catchError(error => {
          console.error('Error al crear R07 desde API real:', error);
          throw error;
        })
      );
  }

  updateR07(id: number, data: R07Data): Observable<R07Data> {
    return this.http.put<R07Data>(`${this.baseUrl}/structures/R07/${id}`, data)
      .pipe(
        catchError(error => {
          console.error('Error al actualizar R07 desde API real:', error);
          throw error;
        })
      );
  }

  deleteR07(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/structures/R07/${id}`)
      .pipe(
        catchError(error => {
          console.error('Error al eliminar R07 desde API real:', error);
          throw error;
        })
      );
  }

  // Catalog services
  getCatalogT4(): Observable<R07Catalog[]> {
    return this.http.get<R07Catalog[]>(`${this.baseUrl}/catalogs/t4`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener catálogo T4 desde API real:', error);
          throw error;
        })
      );
  }

  getCatalogT5(): Observable<R07Catalog[]> {
    return this.http.get<R07Catalog[]>(`${this.baseUrl}/catalogs/t5`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener catálogo T5 desde API real:', error);
          throw error;
        })
      );
  }

  getCatalogT6(): Observable<R07Catalog[]> {
    return this.http.get<R07Catalog[]>(`${this.baseUrl}/catalogs/t6`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener catálogo T6 desde API real:', error);
          throw error;
        })
      );
  }

  getCatalogT7(): Observable<R07Catalog[]> {
    return this.http.get<R07Catalog[]>(`${this.baseUrl}/catalogs/t7`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener catálogo T7 desde API real:', error);
          throw error;
        })
      );
  }

  getCatalogT42(): Observable<R07Catalog[]> {
    return this.http.get<R07Catalog[]>(`${this.baseUrl}/catalogs/t42`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener catálogo T42 desde API real:', error);
          throw error;
        })
      );
  }

  getCatalogT47(): Observable<R07Catalog[]> {
    return this.http.get<R07Catalog[]>(`${this.baseUrl}/catalogs/t47`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener catálogo T47 desde API real:', error);
          throw error;
        })
      );
  }
}