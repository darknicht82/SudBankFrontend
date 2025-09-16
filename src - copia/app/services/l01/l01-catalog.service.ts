import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { T4Service } from '../t4.service';
import { T73Service } from '../t73.service';
import { T173Service } from '../t173.service';
import { T164Service } from '../t164.service';

export interface L01Catalog {
  id: number;
  codigo: string;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class L01CatalogService {
  private baseUrl = environment.backendEndpoint; // ✅ CONECTAR DIRECTAMENTE A APIS REALES

  constructor(
    private http: HttpClient,
    private t4Service: T4Service,
    private t73Service: T73Service,
    private t173Service: T173Service,
    private t164Service: T164Service
  ) {}

  // Tabla 4 - Tipos de Identificación (✅ USAR SERVICIO INDIVIDUAL)
  getTabla4(): Observable<L01Catalog[]> {
    return this.t4Service.getForL01().pipe(
      map(tipos => tipos.map(t => ({
        id: t.id,
        codigo: t.codigo,
        descripcion: t.descripcion
      }))),
        catchError(error => {
        console.error('Error al obtener Tabla 4 desde servicio individual:', error);
          throw error; // Propagar el error
        })
      );
  }

  // Tabla 73 - Tipos de Emisor (✅ USAR SERVICIO INDIVIDUAL)
  getTabla73(): Observable<L01Catalog[]> {
    return this.t73Service.getForL01().pipe(
      map(tipos => tipos.map(t => ({
        id: t.id,
        codigo: t.codigo,
        descripcion: t.descripcion
      }))),
        catchError(error => {
        console.error('Error al obtener Tabla 73 desde servicio individual:', error);
          throw error; // Propagar el error
        })
      );
  }

  // Tabla 173 - Clasificaciones (✅ USAR SERVICIO INDIVIDUAL)
  getTabla173(): Observable<L01Catalog[]> {
    return this.t173Service.getForL01().pipe(
      map(clasificaciones => clasificaciones.map(c => ({
        id: c.id,
        codigo: c.codigo,
        descripcion: c.descripcion
      }))),
        catchError(error => {
        console.error('Error al obtener Tabla 173 desde servicio individual:', error);
          throw error; // Propagar el error
        })
      );
  }

  // Tabla 164 - Códigos Extranjeros (✅ USAR SERVICIO INDIVIDUAL)
  getTabla164(): Observable<L01Catalog[]> {
    return this.t164Service.getAll().pipe(
      map(codigos => codigos.map(c => ({
        id: c.id,
        codigo: c.codigo,
        descripcion: c.descripcion
      }))),
        catchError(error => {
        console.error('Error al obtener Tabla 164 desde servicio individual:', error);
          throw error; // Propagar el error
        })
      );
  }

  // Buscar descripción por código en tabla específica
  getDescripcionByCodigo(tabla: string, codigo: string): Observable<string> {
    switch (tabla) {
      case 't4':
        return this.http.get<L01Catalog[]>(`${this.baseUrl}/catalogs/t4`)
          .pipe(
            map(catalogs => {
              const catalog = catalogs.find(c => c.codigo === codigo);
              return catalog ? catalog.descripcion : 'Código no encontrado';
            })
          );
      case 't73':
        return this.http.get<L01Catalog[]>(`${this.baseUrl}/catalogs/t73`)
          .pipe(
            map(catalogs => {
              const catalog = catalogs.find(c => c.codigo === codigo);
              return catalog ? catalog.descripcion : 'Código no encontrado';
            })
          );
      case 't173':
        return this.http.get<L01Catalog[]>(`${this.baseUrl}/catalogs/t173`)
          .pipe(
            map(catalogs => {
              const catalog = catalogs.find(c => c.codigo === codigo);
              return catalog ? catalog.descripcion : 'Código no encontrado';
            })
          );
      case 't164':
        return this.http.get<L01Catalog[]>(`${this.baseUrl}/catalogs/t164`)
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
        return this.http.get<L01Catalog[]>(`${this.baseUrl}/catalogs/t4`)
          .pipe(
            map(catalogs => catalogs.some(c => c.codigo === codigo))
          );
      case 't73':
        return this.http.get<L01Catalog[]>(`${this.baseUrl}/catalogs/t73`)
          .pipe(
            map(catalogs => catalogs.some(c => c.codigo === codigo))
          );
      case 't173':
        return this.http.get<L01Catalog[]>(`${this.baseUrl}/catalogs/t173`)
          .pipe(
            map(catalogs => catalogs.some(c => c.codigo === codigo))
          );
      case 't164':
        return this.http.get<L01Catalog[]>(`${this.baseUrl}/catalogs/t164`)
          .pipe(
            map(catalogs => catalogs.some(c => c.codigo === codigo))
          );
      default:
        return of(false);
    }
  }

  // ==========================================
  // MÉTODOS ESPECÍFICOS PARA L01
  // ==========================================

  /**
   * Obtener tipos de identificación aplicables a L01 (solo R y X)
   * Según manual oficial: "puede ser R ó X"
   */
  getTabla4ForL01(): Observable<L01Catalog[]> {
    return this.http.get<L01Catalog[]>(`${this.baseUrl}/catalog/t4`)
      .pipe(
        map(tipos => tipos.filter(t => ['R', 'X'].includes(t.codigo))),
        catchError(error => {
          console.error('Error al obtener Tabla 4 para L01 desde API real:', error);
          throw error; // Propagar el error
        })
      );
  }

  /**
   * Obtener tipos de emisor aplicables a L01 (excluyendo los que no aplican)
   * Según backend: excluir códigos que indican "no aplica L01"
   */
    getTabla73ForL01(): Observable<L01Catalog[]> {
    return this.http.get<L01Catalog[]>(`${this.baseUrl}/catalog/t73`)
      .pipe(
        map(tipos => tipos.filter(t =>
          !t.descripcion.toLowerCase().includes('no aplica l01') &&
          !t.descripcion.toLowerCase().includes('no aplica en estructura l01')
        )),
        catchError(error => {
          console.error('Error al obtener Tabla 73 para L01 desde API real:', error);
          throw error; // Propagar el error
        })
      );
  }

  /**
   * Obtener clasificaciones L01 (1-4: Emisor/Custodio/Depositario/Contraparte)
   */
  getTabla173ForL01(): Observable<L01Catalog[]> {
    // Esta tabla es específica para L01, no necesita filtrado adicional
    return this.getTabla173();
  }

  /**
   * Obtener códigos extranjeros para L01
   */
  getTabla164ForL01(): Observable<L01Catalog[]> {
    // Esta tabla es para códigos extranjeros, no necesita filtrado adicional
    return this.getTabla164();
  }



}