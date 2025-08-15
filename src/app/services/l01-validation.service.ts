import { Injectable } from '@angular/core';
import { L01RegulatoryData } from './l01-regulatory.service';

export interface ValidationResult {
  valid: boolean;
  message: string;
  field?: string;
  severity: 'error' | 'warning' | 'info';
}

export interface ValidationRule {
  field: string;
  rule: string;
  validator: (value: any, data?: L01RegulatoryData) => ValidationResult;
}

@Injectable({
  providedIn: 'root'
})
export class L01ValidationService {

  constructor() {}

  /**
   * Valida un registro L01 completo según el manual SB Marzo 2017
   */
  validateL01Record(data: L01RegulatoryData): ValidationResult[] {
    const results: ValidationResult[] = [];
    
    // Validar cada campo individualmente
    results.push(...this.validateTipoIdentificacion(data.tipoIdentificacion));
    results.push(...this.validateIdentificacion(data.identificacion, data.tipoIdentificacion));
    results.push(...this.validateClasificacion(data.clasificacion));
    results.push(...this.validateTipoEmisor(data.tipoEmisor));
    
    // Validaciones de negocio
    results.push(...this.validateBusinessRules(data));
    
    return results;
  }

  /**
   * Valida el tipo de identificación (R/X)
   */
  private validateTipoIdentificacion(tipo: string): ValidationResult[] {
    const results: ValidationResult[] = [];
    
    if (!tipo) {
      results.push({
        valid: false,
        message: 'El tipo de identificación es obligatorio',
        field: 'tipoIdentificacion',
        severity: 'error'
      });
      return results;
    }
    
    if (!['R', 'X'].includes(tipo)) {
      results.push({
        valid: false,
        message: 'El tipo de identificación debe ser R (RUC) o X (Extranjero)',
        field: 'tipoIdentificacion',
        severity: 'error'
      });
    }
    
    return results;
  }

  /**
   * Valida la identificación según el tipo
   * Manual SB: RUC 13 dígitos para tipo R, código extranjero para tipo X
   */
  private validateIdentificacion(identificacion: string, tipo: string): ValidationResult[] {
    const results: ValidationResult[] = [];
    
    if (!identificacion) {
      results.push({
        valid: false,
        message: 'La identificación es obligatoria',
        field: 'identificacion',
        severity: 'error'
      });
      return results;
    }
    
    if (tipo === 'R') {
      // Validar RUC (13 dígitos) - Manual SB: debe empezar con 17 (Ecuador)
      if (!/^\d{13}$/.test(identificacion)) {
        results.push({
          valid: false,
          message: 'El RUC debe tener exactamente 13 dígitos',
          field: 'identificacion',
          severity: 'error'
        });
      }
      
      // Validar que empiece con 17 (Ecuador) - REQUERIMIENTO OFICIAL SB
      if (!identificacion.startsWith('17')) {
        results.push({
          valid: false,
          message: 'El RUC debe empezar con 17 (Ecuador)',
          field: 'identificacion',
          severity: 'error'
        });
      }
      
      // Validar formato de RUC ecuatoriano
      if (identificacion.length === 13 && !identificacion.startsWith('17')) {
        results.push({
          valid: false,
          message: 'RUC inválido: debe empezar con 17 para entidades ecuatorianas',
          field: 'identificacion',
          severity: 'error'
        });
      }
    } else if (tipo === 'X') {
      // Validar código extranjero (máximo 7 dígitos) - Manual SB: Tabla 164
      if (!/^\d{1,7}$/.test(identificacion)) {
        results.push({
          valid: false,
          message: 'El código extranjero debe tener máximo 7 dígitos numéricos',
          field: 'identificacion',
          severity: 'error'
        });
      }
      
      // VALIDACIÓN MEJORADA: Verificar que esté en Tabla 164 cuando esté disponible
      // Por ahora solo validamos formato, pero se puede extender para validar contra catálogo real
      if (identificacion.length > 7) {
        results.push({
          valid: false,
          message: 'El código extranjero no puede exceder 7 dígitos según Tabla 164',
          field: 'identificacion',
          severity: 'error'
        });
      }
    }
    
    return results;
  }

  /**
   * Valida la clasificación del emisor/custodio/depositario/contraparte
   * Manual SB: Valores 1-4 según tabla 173
   */
  private validateClasificacion(clasificacion: number): ValidationResult[] {
    const results: ValidationResult[] = [];
    
    if (clasificacion === undefined || clasificacion === null) {
      results.push({
        valid: false,
        message: 'La clasificación es obligatoria',
        field: 'clasificacion',
        severity: 'error'
      });
      return results;
    }
    
    // Validar que esté en rango 1-4 según manual SB
    if (![1, 2, 3, 4].includes(clasificacion)) {
      results.push({
        valid: false,
        message: 'La clasificación debe ser: 1=Emisor, 2=Custodio, 3=Depositario, 4=Contraparte',
        field: 'clasificacion',
        severity: 'error'
      });
    }
    
    return results;
  }

  /**
   * Valida el tipo de emisor/custodio/depositario/contraparte
   * Manual SB: Valores según tabla 73 (sectores económicos)
   * IMPORTANTE: Para L01 se excluyen valores 1 y 6 según manual
   */
  private validateTipoEmisor(tipoEmisor: number): ValidationResult[] {
    const results: ValidationResult[] = [];
    
    if (tipoEmisor === undefined || tipoEmisor === null) {
      results.push({
        valid: false,
        message: 'El tipo de emisor es obligatorio',
        field: 'tipoEmisor',
        severity: 'error'
      });
      return results;
    }
    
    // VALIDACIÓN CORREGIDA: Solo valores válidos para L01 según manual SB
    // Tabla 73 para L01: 0,2,3,4,5,7,8,9 (excluye 1 y 6)
    const valoresValidosL01 = [0, 2, 3, 4, 5, 7, 8, 9];
    
    if (!valoresValidosL01.includes(tipoEmisor)) {
      results.push({
        valid: false,
        message: `El tipo de emisor debe ser uno de los valores válidos para L01: ${valoresValidosL01.join(', ')}. Valor ${tipoEmisor} no es válido.`,
        field: 'tipoEmisor',
        severity: 'error'
      });
    }
    
    return results;
  }

  /**
   * Validaciones de negocio específicas
   */
  private validateBusinessRules(data: L01RegulatoryData): ValidationResult[] {
    const results: ValidationResult[] = [];
    
    // Validar que si es tipo X (extranjero), tenga clasificación válida
    if (data.tipoIdentificacion === 'X') {
      if (data.clasificacion === 1) { // Emisor
        if (![0, 2, 3, 4, 5, 7, 8, 9].includes(data.tipoEmisor)) {
          results.push({
            valid: false,
            message: 'Los emisores extranjeros deben tener un tipo de emisor válido',
            field: 'tipoEmisor',
            severity: 'error'
          });
        }
      }
    }
    
    // Validar que si es RUC, tenga formato correcto
    if (data.tipoIdentificacion === 'R') {
      if (data.identificacion && data.identificacion.length === 13) {
        // Validar que el tercer dígito sea válido para tipo de contribuyente
        const tercerDigito = parseInt(data.identificacion.charAt(2));
        if (![6, 9].includes(tercerDigito)) {
          results.push({
            valid: false,
            message: 'El tercer dígito del RUC debe ser 6 (empresa) o 9 (persona jurídica)',
            field: 'identificacion',
            severity: 'error'
          });
        }
      }
    }
    
    return results;
  }

  /**
   * Valida el dígito verificador del RUC
   */
  private validateRUCVerifier(ruc: string): boolean {
    if (ruc.length !== 13) return false;
    
    // Algoritmo simplificado de validación RUC
    const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1];
    let suma = 0;
    
    for (let i = 0; i < 12; i++) {
      const producto = parseInt(ruc[i]) * coeficientes[i];
      suma += Math.floor(producto / 10) + (producto % 10);
    }
    
    const residuo = suma % 10;
    const digitoVerificador = residuo === 0 ? 0 : 10 - residuo;
    
    return digitoVerificador === parseInt(ruc[12]);
  }

  /**
   * Valida si un registro puede ser enviado al backend
   */
  canSendToBackend(data: L01RegulatoryData): boolean {
    const validations = this.validateL01Record(data);
    return validations.every(v => v.severity !== 'error');
  }

  /**
   * Obtiene solo los errores críticos
   */
  getCriticalErrors(validations: ValidationResult[]): ValidationResult[] {
    return validations.filter(v => v.severity === 'error');
  }

  /**
   * Obtiene solo las advertencias
   */
  getWarnings(validations: ValidationResult[]): ValidationResult[] {
    return validations.filter(v => v.severity === 'warning');
  }

  /**
   * Formatea los mensajes de validación para mostrar al usuario
   */
  formatValidationMessages(validations: ValidationResult[]): string[] {
    return validations.map(v => `${v.field ? `[${v.field}] ` : ''}${v.message}`);
  }
}
