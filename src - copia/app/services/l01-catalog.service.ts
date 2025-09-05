import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface L01Catalog {
  id: number;
  codigo: string;
  descripcion: string;
}

export interface L01Resume {
  id: number;
  codigoTipoIdentificacion: number;
  codigoEmisor: number;
  codigoClasificacionEmisor: number;
  codigoTipoEmisor: number;
  identificacion: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class L01CatalogService {
  private baseUrl = environment.backendEndpoint; // ✅ CONECTAR DIRECTAMENTE A APIS REALES


  constructor(private http: HttpClient) {}

  // Tabla 4 - Tipos de Identificación (✅ CONECTAR A API REAL)
  getTabla4(): Observable<L01Catalog[]> {
    return this.http.get<L01Catalog[]>(`${this.baseUrl}/catalogs/t4`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener Tabla 4 desde API real:', error);
          throw error; // Propagar el error
        })
      );
  }

  // Tabla 73 - Tipos de Emisor (✅ CONECTAR A API REAL)
  getTabla73(): Observable<L01Catalog[]> {
    return this.http.get<L01Catalog[]>(`${this.baseUrl}/catalogs/t73`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener Tabla 73 desde API real:', error);
          throw error; // Propagar el error
        })
      );
  }

  // Tabla 173 - Clasificaciones (✅ CONECTAR A API REAL)
  getTabla173(): Observable<L01Catalog[]> {
    return this.http.get<L01Catalog[]>(`${this.baseUrl}/catalogs/t173`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener Tabla 173 desde API real:', error);
          throw error; // Propagar el error
        })
      );
  }

  // Tabla 164 - Códigos Extranjeros (✅ CONECTAR A API REAL)
  getTabla164(): Observable<L01Catalog[]> {
    return this.http.get<L01Catalog[]>(`${this.baseUrl}/catalogs/t164`)
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

  getResume(): Observable<L01Resume[]> {
    return this.http.get<L01Resume[]>(`${this.baseUrl}/structures/l01/resume`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener L01 desde API real:', error);
          // Fallback: intentar con endpoint alternativo
          return this.http.get<L01Resume[]>(`${this.baseUrl}/structures/l01`)
            .pipe(
              catchError(fallbackError => {
                console.error('Error en fallback L01:', fallbackError);
                throw fallbackError;
              })
            );
        })
      );
  }

  saveL01(form: any): Observable<any> {
    const formValue = form;
    console.log('formValue: ', formValue);

    // Transform form into expected payload
    const payload = {
      codigoTipoIdentificacion: formValue.tipoIdentificacion?.id,
      codigoEmisor: formValue.identificacion?.id,
      codigoClasificacionEmisor: formValue.clasificacion?.id,
      codigoTipoEmisor: formValue.tipoEmisor?.id
    };

    console.log('Payload to send:', payload);

    return this.http.post(`${this.baseUrl}/structures/l01`, payload).pipe(
      map(response => {
        console.log('✅ Saved successfully', response);
        return response;
      }),
      catchError(error => {
        console.error('❌ Error saving', error);
        throw error;
      })
    );
  }



}