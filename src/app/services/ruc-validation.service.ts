import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface RUCValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  details: {
    prefijo: string;
    tipoEntidad: string;
    digitoVerificador: string;
    provincia: string;
    tipoContribuyente: string;
  };
}

export interface RUCValidationConfig {
  prefijosValidos: string[];
  tiposEntidadValidos: string[];
  digitosVerificadores: string[];
}

@Injectable({
  providedIn: 'root'
})
export class RUCValidationService {
  private apiUrl = `${environment.backendEndpoint}/validation/ruc`;

  constructor(private http: HttpClient) {}

  /**
   * Validar RUC completo
   */
  validateRUC(ruc: string): Observable<RUCValidationResult> {
    if (!ruc || ruc.length !== 13) {
      return of({
        isValid: false,
        errors: ['El RUC debe tener exactamente 13 dígitos'],
        warnings: [],
        details: {
          prefijo: '',
          tipoEntidad: '',
          digitoVerificador: '',
          provincia: '',
          tipoContribuyente: ''
        }
      });
    }

    return this.http.post<RUCValidationResult>(this.apiUrl, { ruc }).pipe(
      map(response => {
        console.log('✅ RUC validado exitosamente');
        return response;
      }),
      catchError(error => {
        console.error('❌ Error validando RUC:', error);
        // Fallback a validación local si la API falla
        return of(this.validateRUCLocal(ruc));
      })
    );
  }

  /**
   * Validación local de RUC (fallback)
   */
  private validateRUCLocal(ruc: string): RUCValidationResult {
    const prefijo = ruc.substring(0, 2);
    const tipoEntidad = ruc.substring(2, 3);
    const digitoVerificador = ruc.substring(12, 13);

    const errors: string[] = [];
    const warnings: string[] = [];

    // Validar prefijo de provincia
    if (!this.isValidProvincePrefix(prefijo)) {
      errors.push(`Prefijo de provincia inválido: ${prefijo}`);
    }

    // Validar tipo de entidad
    if (!this.isValidEntityType(tipoEntidad)) {
      errors.push(`Tipo de entidad inválido: ${tipoEntidad}`);
    }

    // Validar dígito verificador
    if (!this.isValidCheckDigit(ruc)) {
      errors.push('Dígito verificador inválido');
    }

    // Advertencias
    if (tipoEntidad === '6' && !this.isValidPublicEntity(ruc)) {
      warnings.push('RUC de entidad pública con formato no estándar');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      details: {
        prefijo,
        tipoEntidad,
        digitoVerificador,
        provincia: this.getProvinceName(prefijo),
        tipoContribuyente: this.getEntityTypeName(tipoEntidad)
      }
    };
  }

  /**
   * Validar prefijo de provincia
   */
  private isValidProvincePrefix(prefijo: string): boolean {
    const prefijosValidos = [
      '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
      '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
      '21', '22', '23', '24'
    ];
    return prefijosValidos.includes(prefijo);
  }

  /**
   * Validar tipo de entidad
   */
  private isValidEntityType(tipo: string): boolean {
    const tiposValidos = ['6', '9'];
    return tiposValidos.includes(tipo);
  }

  /**
   * Validar dígito verificador usando algoritmo oficial
   */
  private isValidCheckDigit(ruc: string): boolean {
    const coeficientes = [3, 2, 7, 6, 5, 4, 3, 2];
    let suma = 0;
    
    for (let i = 0; i < 8; i++) {
      suma += parseInt(ruc[i]) * coeficientes[i];
    }
    
    const residuo = suma % 11;
    const digitoCalculado = residuo === 0 ? 0 : 11 - residuo;
    const digitoReal = parseInt(ruc[8]);
    
    return digitoCalculado === digitoReal;
  }

  /**
   * Validar entidad pública
   */
  private isValidPublicEntity(ruc: string): boolean {
    // Lógica específica para entidades públicas
    return true; // Simplificado por ahora
  }

  /**
   * Obtener nombre de provincia
   */
  private getProvinceName(prefijo: string): string {
    const provincias: { [key: string]: string } = {
      '01': 'Azuay', '02': 'Bolívar', '03': 'Cañar', '04': 'Carchi',
      '05': 'Cotopaxi', '06': 'Chimborazo', '07': 'El Oro', '08': 'Esmeraldas',
      '09': 'Guayas', '10': 'Imbabura', '11': 'Loja', '12': 'Los Ríos',
      '13': 'Manabí', '14': 'Morona Santiago', '15': 'Napo', '16': 'Pastaza',
      '17': 'Pichincha', '18': 'Tungurahua', '19': 'Zamora Chinchipe',
      '20': 'Galápagos', '21': 'Sucumbíos', '22': 'Orellana', '23': 'Santo Domingo',
      '24': 'Santa Elena'
    };
    return provincias[prefijo] || 'Provincia desconocida';
  }

  /**
   * Obtener nombre del tipo de entidad
   */
  private getEntityTypeName(tipo: string): string {
    const tipos: { [key: string]: string } = {
      '6': 'Entidad Pública',
      '9': 'Organismo Internacional'
    };
    return tipos[tipo] || 'Tipo desconocido';
  }

  /**
   * Obtener configuración de validación desde API
   */
  getValidationConfig(): Observable<RUCValidationConfig> {
    return this.http.get<RUCValidationConfig>(`${this.apiUrl}/config`).pipe(
      catchError(error => {
        console.error('❌ Error obteniendo configuración de validación RUC:', error);
        // Configuración por defecto
        return of({
          prefijosValidos: [
            '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
            '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
            '21', '22', '23', '24'
          ],
          tiposEntidadValidos: ['6', '9'],
          digitosVerificadores: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        });
      })
    );
  }

  /**
   * Verificar estado de la API
   */
  checkApiStatus(): Observable<boolean> {
    return this.http.get(this.apiUrl).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
