import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface L02Catalog {
  id: number;
  codigo: string;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class L02CatalogService {
  private baseUrl = environment.backendEndpoint; // ✅ CONECTAR DIRECTAMENTE A APIS REALES


  constructor(private http: HttpClient) {}

  // Tabla 4 - Tipos de Identificación (✅ CONECTAR A API REAL)
  getTabla4(): Observable<L02Catalog[]> {
    return this.http.get<L02Catalog[]>(`${this.baseUrl}/catalogs/t4`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener Tabla 4 desde API real:', error);
          throw error; // Propagar el error
        })
      );
  }

  // Tabla 73 - Tipos de Emisor (✅ CONECTAR A API REAL)
  getTabla73(): Observable<L02Catalog[]> {
    return this.http.get<L02Catalog[]>(`${this.baseUrl}/catalogs/t73`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener Tabla 73 desde API real:', error);
          throw error; // Propagar el error
        })
      );
  }

  // Tabla 173 - Clasificaciones (✅ CONECTAR A API REAL)
  getTabla173(): Observable<L02Catalog[]> {
    return this.http.get<L02Catalog[]>(`${this.baseUrl}/catalogs/t173`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener Tabla 173 desde API real:', error);
          throw error; // Propagar el error
        })
      );
  }

  // Tabla 164 - Códigos Extranjeros (✅ CONECTAR A API REAL)
  getTabla164(): Observable<L02Catalog[]> {
    return this.http.get<L02Catalog[]>(`${this.baseUrl}/catalogs/t164`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener Tabla 164 desde API real:', error);
          throw error; // Propagar el error
        })
      );
  }

  // Buscar descripción por código en tabla específica
  getDescripcionByCodigo(tabla: string, codigo: string): Observable<string> {
    switch (tabla) {
      case 't4':
        return this.http.get<L02Catalog[]>(`${this.baseUrl}/catalogs/t4`)
          .pipe(
            map(catalogs => {
              const catalog = catalogs.find(c => c.codigo === codigo);
              return catalog ? catalog.descripcion : 'Código no encontrado';
            })
          );
      case 't73':
        return this.http.get<L02Catalog[]>(`${this.baseUrl}/catalogs/t73`)
          .pipe(
            map(catalogs => {
              const catalog = catalogs.find(c => c.codigo === codigo);
              return catalog ? catalog.descripcion : 'Código no encontrado';
            })
          );
      case 't173':
        return this.http.get<L02Catalog[]>(`${this.baseUrl}/catalogs/t173`)
          .pipe(
            map(catalogs => {
              const catalog = catalogs.find(c => c.codigo === codigo);
              return catalog ? catalog.descripcion : 'Código no encontrado';
            })
          );
      case 't164':
        return this.http.get<L02Catalog[]>(`${this.baseUrl}/catalogs/t164`)
          .pipe(
            map(catalogs => {
              const catalog = catalogs.find(c => c.codigo === codigo);
              return catalog ? catalog.descripcion : 'Código no encontrado';
            })
          );
      default:
        return of('Tabla no encontrada');
    }
  }

  // Validar código en tabla específica
  validarCodigo(tabla: string, codigo: string): Observable<boolean> {
    switch (tabla) {
      case 't4':
        return this.http.get<L02Catalog[]>(`${this.baseUrl}/catalogs/t4`)
          .pipe(
            map(catalogs => catalogs.some(c => c.codigo === codigo))
          );
      case 't73':
        return this.http.get<L02Catalog[]>(`${this.baseUrl}/catalogs/t73`)
          .pipe(
            map(catalogs => catalogs.some(c => c.codigo === codigo))
          );
      case 't173':
        return this.http.get<L02Catalog[]>(`${this.baseUrl}/catalogs/t173`)
          .pipe(
            map(catalogs => catalogs.some(c => c.codigo === codigo))
          );
      case 't164':
        return this.http.get<L02Catalog[]>(`${this.baseUrl}/catalogs/t164`)
          .pipe(
            map(catalogs => catalogs.some(c => c.codigo === codigo))
          );
      default:
        return of(false);
    }
  }

  // ==========================================
  // MÉTODOS ESPECÍFICOS PARA L02
  // ==========================================

  /**
   * Obtener tipos de identificación aplicables a L02 (solo R y X)
   * Según manual oficial: "puede ser R ó X"
   */
  getTabla4ForL02(): Observable<L02Catalog[]> {
    return this.http.get<L02Catalog[]>(`${this.baseUrl}/catalog/t4`)
      .pipe(
        map(tipos => tipos.filter(t => ['R', 'X'].includes(t.codigo))),
        catchError(error => {
          console.error('Error al obtener Tabla 4 para L02 desde API real:', error);
          throw error; // Propagar el error
        })
      );
  }

  /**
   * Obtener tipos de emisor aplicables a L02 (excluyendo los que no aplican)
   * Según backend: excluir códigos que indican "no aplica L02"
   */
    getTabla73ForL02(): Observable<L02Catalog[]> {
    return this.http.get<L02Catalog[]>(`${this.baseUrl}/catalog/t73`)
      .pipe(
        map(tipos => tipos.filter(t =>
          !t.descripcion.toLowerCase().includes('no aplica L02') &&
          !t.descripcion.toLowerCase().includes('no aplica en estructura L02')
        )),
        catchError(error => {
          console.error('Error al obtener Tabla 73 para L02 desde API real:', error);
          throw error; // Propagar el error
        })
      );
  }

  /**
   * Obtener clasificaciones L02 (1-4: Emisor/Custodio/Depositario/Contraparte)
   */
  getTabla173ForL02(): Observable<L02Catalog[]> {
    // Esta tabla es específica para L02, no necesita filtrado adicional
    return this.getTabla173();
  }

  /**
   * Obtener códigos extranjeros para L02
   */
  getTabla164ForL02(): Observable<L02Catalog[]> {
    // Esta tabla es para códigos extranjeros, no necesita filtrado adicional
    return this.getTabla164();
  }



}