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

@Injectable({
  providedIn: 'root'
})
export class L01CatalogService {
  private baseUrl = `${environment.backendEndpoint || 'http://192.168.10.4:5000/api'}/catalogs`;
  private useMockData = environment.useMockData || false;

  constructor(private http: HttpClient) {}

  // Tabla 4 - Tipos de Identificación (✅ DISPONIBLE)
  getTabla4(): Observable<L01Catalog[]> {
    if (this.useMockData) {
      return this.getMockTabla4();
    }
    return this.http.get<L01Catalog[]>(`${this.baseUrl}/t4`)
      .pipe(
        catchError(error => {
          console.warn('Error al obtener Tabla 4, usando datos mock:', error);
          return this.getMockTabla4();
        })
      );
  }

  // Tabla 73 - Tipos de Emisor (✅ DISPONIBLE)
  getTabla73(): Observable<L01Catalog[]> {
    if (this.useMockData) {
      return this.getMockTabla73();
    }
    return this.http.get<L01Catalog[]>(`${this.baseUrl}/T73`)
      .pipe(
        catchError(error => {
          console.warn('Error al obtener Tabla 73, usando datos mock:', error);
          return this.getMockTabla73();
        })
      );
  }

  // Tabla 173 - Clasificaciones (✅ DISPONIBLE)
  getTabla173(): Observable<L01Catalog[]> {
    if (this.useMockData) {
      return this.getMockTabla173();
    }
    return this.http.get<L01Catalog[]>(`${this.baseUrl}/T173`)
      .pipe(
        catchError(error => {
          console.warn('Error al obtener Tabla 173, usando datos mock:', error);
          return this.getMockTabla173();
        })
      );
  }

  // Tabla 164 - Códigos Extranjeros (✅ DISPONIBLE)
  getTabla164(): Observable<L01Catalog[]> {
    if (this.useMockData) {
      return this.getMockTabla164();
    }
    return this.http.get<L01Catalog[]>(`${this.baseUrl}/T164`)
      .pipe(
        catchError(error => {
          console.warn('Error al obtener Tabla 164, usando datos mock:', error);
          return this.getMockTabla164();
        })
      );
  }

  // Buscar descripción por código en tabla específica
  getDescripcionByCodigo(tabla: string, codigo: string): Observable<string> {
    switch (tabla) {
      case 't4':
        return this.http.get<L01Catalog[]>(`${this.baseUrl}/t4`)
          .pipe(
            map(catalogs => {
              const catalog = catalogs.find(c => c.codigo === codigo);
              return catalog ? catalog.descripcion : 'Código no encontrado';
            })
          );
      case 't73':
        return this.http.get<L01Catalog[]>(`${this.baseUrl}/T73`)
          .pipe(
            map(catalogs => {
              const catalog = catalogs.find(c => c.codigo === codigo);
              return catalog ? catalog.descripcion : 'Código no encontrado';
            })
          );
      case 't173':
        return this.http.get<L01Catalog[]>(`${this.baseUrl}/T173`)
          .pipe(
            map(catalogs => {
              const catalog = catalogs.find(c => c.codigo === codigo);
              return catalog ? catalog.descripcion : 'Código no encontrado';
            })
          );
      case 't164':
        return this.http.get<L01Catalog[]>(`${this.baseUrl}/t164`)
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
        return this.http.get<L01Catalog[]>(`${this.baseUrl}/t4`)
          .pipe(
            map(catalogs => catalogs.some(c => c.codigo === codigo))
          );
      case 't73':
        return this.http.get<L01Catalog[]>(`${this.baseUrl}/t73`)
          .pipe(
            map(catalogs => catalogs.some(c => c.codigo === codigo))
          );
      case 't173':
        return this.http.get<L01Catalog[]>(`${this.baseUrl}/t173`)
          .pipe(
            map(catalogs => catalogs.some(c => c.codigo === codigo))
          );
      case 't164':
        return this.http.get<L01Catalog[]>(`${this.baseUrl}/t164`)
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
    if (this.useMockData) {
      return this.getMockTabla4ForL01();
    }
    return this.http.get<L01Catalog[]>(`${this.baseUrl}/t4`)
      .pipe(
        map(tipos => tipos.filter(t => ['R', 'X'].includes(t.codigo))),
        catchError(error => {
          console.warn('Error al obtener Tabla 4 para L01, usando datos mock:', error);
          return this.getMockTabla4ForL01();
        })
      );
  }

  /**
   * Obtener tipos de emisor aplicables a L01 (excluyendo los que no aplican)
   * Según backend: excluir códigos que indican "no aplica L01"
   */
    getTabla73ForL01(): Observable<L01Catalog[]> {
    if (this.useMockData) {
      return this.getMockTabla73ForL01();
    }
    return this.http.get<L01Catalog[]>(`${this.baseUrl}/t73`)
      .pipe(
        map(tipos => tipos.filter(t =>
          !t.descripcion.toLowerCase().includes('no aplica l01') &&
          !t.descripcion.toLowerCase().includes('no aplica en estructura l01')
        )),
        catchError(error => {
          console.warn('Error al obtener Tabla 73 para L01, usando datos mock:', error);
          return this.getMockTabla73ForL01();
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

  // ==========================================
  // MÉTODOS MOCK PARA DESARROLLO
  // ==========================================

  private getMockTabla4(): Observable<L01Catalog[]> {
    const mockData: L01Catalog[] = [
      { id: 1, codigo: 'R', descripcion: 'RUC Nacional' },
      { id: 2, codigo: 'X', descripcion: 'Código Exterior' }
    ];
    return of(mockData);
  }

  private getMockTabla4ForL01(): Observable<L01Catalog[]> {
    // Para L01 solo R y X según manual oficial
    const mockData: L01Catalog[] = [
      { id: 4, codigo: 'R', descripcion: 'Para personas naturales o jurídicas identificadas con el número de RUC' },
      { id: 5, codigo: 'X', descripcion: 'Personas Jurídicas del exterior. (Para las estructuras de Inversiones)' }
    ];
    return of(mockData);
  }

  private getMockTabla73(): Observable<L01Catalog[]> {
    const mockData: L01Catalog[] = [
      { id: 1, codigo: '1', descripcion: 'Sector Público No Financiero' },
      { id: 2, codigo: '2', descripcion: 'Instituciones Financieras Públicas' },
      { id: 3, codigo: '3', descripcion: 'Instituciones Financieras Privadas' },
      { id: 4, codigo: '4', descripcion: 'Sector Privado No Financiero' },
      { id: 5, codigo: '5', descripcion: 'Sector Externo' }
    ];
    return of(mockData);
  }

  private getMockTabla73ForL01(): Observable<L01Catalog[]> {
    // Para L01 con descripciones correctas del backend (excluyendo los que no aplican)
    const mockData: L01Catalog[] = [
      { id: 21, codigo: '0', descripcion: 'Supranacionales (solo para BCE y BIESS)' },
      { id: 23, codigo: '2', descripcion: 'Pública financiera' },
      { id: 24, codigo: '3', descripcion: 'Privada financiera' },
      { id: 25, codigo: '4', descripcion: 'Pública no financiera' },
      { id: 26, codigo: '5', descripcion: 'Privada no financiera' },
      { id: 28, codigo: '7', descripcion: 'Fondos de inversión' },
      { id: 29, codigo: '8', descripcion: 'Estados Soberanos' },
      { id: 30, codigo: '9', descripcion: 'Multilaterales' }
    ];
    return of(mockData);
  }

  private getMockTabla173(): Observable<L01Catalog[]> {
    const mockData: L01Catalog[] = [
      { id: 1, codigo: '1', descripcion: 'Emisor' },
      { id: 2, codigo: '2', descripcion: 'Custodio' },
      { id: 3, codigo: '3', descripcion: 'Depositario' },
      { id: 4, codigo: '4', descripcion: 'Contraparte' }
    ];
    return of(mockData);
  }

  private getMockTabla164(): Observable<L01Catalog[]> {
    const mockData: L01Catalog[] = [
      { id: 1, codigo: '1000001', descripcion: 'Banco Mundial' },
      { id: 2, codigo: '1000002', descripcion: 'Banco Interamericano de Desarrollo' },
      { id: 3, codigo: '1000003', descripcion: 'Corporación Andina de Fomento' },
      { id: 4, codigo: '1000004', descripcion: 'Citibank N.A.' },
      { id: 5, codigo: '1000005', descripcion: 'JPMorgan Chase Bank' }
    ];
    return of(mockData);
  }

  // ==========================================
  // MÉTODOS DE CONFIGURACIÓN
  // ==========================================

  /**
   * Obtiene configuración actual del servicio
   */
  obtenerConfiguracion(): any {
    return {
      baseUrl: this.baseUrl,
      useMockData: this.useMockData,
      environment: environment.production ? 'production' : 'development'
    };
  }

  /**
   * Cambia el modo de datos (mock/real)
   */
  cambiarModoMock(useMock: boolean): void {
    this.useMockData = useMock;
  }
}