import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  fieldErrors: { [key: string]: string[] };
}

export interface L01ValidationRules {
  tipoIdentificacion: {
    required: boolean;
    allowedValues: string[];
  };
  identificacion: {
    required: boolean;
    pattern: string;
    minLength: number;
    maxLength: number;
  };
  clasificacion: {
    required: boolean;
    allowedValues: string[];
  };
  tipoEmisor: {
    required: boolean;
    allowedValues: string[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  private apiUrl = `${environment.backendEndpoint}/validation`;

  constructor(private http: HttpClient) {}

  /**
   * Validar registro L01 completo
   */
  validateL01Record(record: any): Observable<ValidationResult> {
    return this.http.post<ValidationResult>(`${this.apiUrl}/l01`, record).pipe(
      map(response => {
        console.log('✅ L01 validado exitosamente');
        return response;
      }),
      catchError(error => {
        console.error('❌ Error validando L01:', error);
        // Fallback a validación local
        return of(this.validateL01Local(record));
      })
    );
  }

  /**
   * Validación local de L01 (fallback)
   */
  private validateL01Local(record: any): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const fieldErrors: { [key: string]: string[] } = {};

    // Validar tipo de identificación
    if (!record.tipoIdentificacion) {
      errors.push('Tipo de identificación es obligatorio');
      fieldErrors['tipoIdentificacion'] = ['Campo requerido'];
    } else if (!['R', 'X'].includes(record.tipoIdentificacion)) {
      errors.push('Tipo de identificación debe ser R o X');
      fieldErrors['tipoIdentificacion'] = ['Valor inválido'];
    }

    // Validar identificación
    if (!record.identificacion) {
      errors.push('Identificación es obligatoria');
      fieldErrors['identificacion'] = ['Campo requerido'];
    } else {
      if (record.tipoIdentificacion === 'R') {
        if (!/^\d{13}$/.test(record.identificacion)) {
          errors.push('RUC debe tener 13 dígitos');
          fieldErrors['identificacion'] = ['Formato RUC inválido'];
        }
      } else if (record.tipoIdentificacion === 'X') {
        if (!/^[A-Z]\d{6}$/.test(record.identificacion)) {
          errors.push('Código extranjero debe empezar con letra seguida de 6 dígitos');
          fieldErrors['identificacion'] = ['Formato código extranjero inválido'];
        }
      }
    }

    // Validar clasificación
    if (!record.clasificacion) {
      errors.push('Clasificación es obligatoria');
      fieldErrors['clasificacion'] = ['Campo requerido'];
    } else if (!['1', '2', '3', '4'].includes(record.clasificacion)) {
      errors.push('Clasificación debe ser 1, 2, 3 o 4');
      fieldErrors['clasificacion'] = ['Valor inválido'];
    }

    // Validar tipo de emisor
    if (!record.tipoEmisor) {
      errors.push('Tipo de emisor es obligatorio');
      fieldErrors['tipoEmisor'] = ['Campo requerido'];
    }

    // Advertencias
    if (record.tipoIdentificacion === 'R' && record.identificacion) {
      const prefijo = record.identificacion.substring(0, 2);
      if (['20', '21', '22', '23', '24'].includes(prefijo)) {
        warnings.push('RUC de provincia fronteriza o especial - verificar jurisdicción');
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      fieldErrors
    };
  }

  /**
   * Validar campo específico
   */
  validateField(fieldName: string, value: any, rules: any): Observable<ValidationResult> {
    return this.http.post<ValidationResult>(`${this.apiUrl}/field`, {
      field: fieldName,
      value,
      rules
    }).pipe(
      catchError(error => {
        console.error(`❌ Error validando campo ${fieldName}:`, error);
        return of(this.validateFieldLocal(fieldName, value, rules));
      })
    );
  }

  /**
   * Validación local de campo (fallback)
   */
  private validateFieldLocal(fieldName: string, value: any, rules: any): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const fieldErrors: { [key: string]: string[] } = {};

    // Validaciones básicas
    if (rules.required && !value) {
      errors.push(`${fieldName} es obligatorio`);
      fieldErrors[fieldName] = ['Campo requerido'];
    }

    if (rules.minLength && value && value.length < rules.minLength) {
      errors.push(`${fieldName} debe tener al menos ${rules.minLength} caracteres`);
      fieldErrors[fieldName] = [`Mínimo ${rules.minLength} caracteres`];
    }

    if (rules.maxLength && value && value.length > rules.maxLength) {
      errors.push(`${fieldName} debe tener máximo ${rules.maxLength} caracteres`);
      fieldErrors[fieldName] = [`Máximo ${rules.maxLength} caracteres`];
    }

    if (rules.pattern && value && !new RegExp(rules.pattern).test(value)) {
      errors.push(`${fieldName} no cumple con el formato requerido`);
      fieldErrors[fieldName] = ['Formato inválido'];
    }

    if (rules.allowedValues && value && !rules.allowedValues.includes(value)) {
      errors.push(`${fieldName} debe ser uno de: ${rules.allowedValues.join(', ')}`);
      fieldErrors[fieldName] = ['Valor no permitido'];
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      fieldErrors
    };
  }

  /**
   * Obtener reglas de validación para L01
   */
  getL01ValidationRules(): Observable<L01ValidationRules> {
    return this.http.get<L01ValidationRules>(`${this.apiUrl}/rules/l01`).pipe(
      catchError(error => {
        console.error('❌ Error obteniendo reglas de validación L01:', error);
        // Reglas por defecto
        return of({
          tipoIdentificacion: {
            required: true,
            allowedValues: ['R', 'X']
          },
          identificacion: {
            required: true,
            pattern: '^[A-Z0-9]{1,13}$',
            minLength: 1,
            maxLength: 13
          },
          clasificacion: {
            required: true,
            allowedValues: ['1', '2', '3', '4']
          },
          tipoEmisor: {
            required: true,
            allowedValues: []
          }
        });
      })
    );
  }

  /**
   * Validar formato de archivo L01
   */
  validateL01FileFormat(fileContent: string): Observable<ValidationResult> {
    return this.http.post<ValidationResult>(`${this.apiUrl}/file/l01`, {
      content: fileContent
    }).pipe(
      catchError(error => {
        console.error('❌ Error validando formato de archivo L01:', error);
        return of(this.validateL01FileFormatLocal(fileContent));
      })
    );
  }

  /**
   * Validación local de formato de archivo L01 (fallback)
   */
  private validateL01FileFormatLocal(fileContent: string): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const fieldErrors: { [key: string]: string[] } = {};

    if (!fileContent) {
      errors.push('El archivo está vacío');
      return {
        isValid: false,
        errors,
        warnings,
        fieldErrors
      };
    }

    const lines = fileContent.split('\n').filter(line => line.trim());
    
    if (lines.length === 0) {
      errors.push('No se encontraron registros en el archivo');
    }

    // Validar formato de cada línea
    lines.forEach((line, index) => {
      if (line.length !== 200) { // L01 tiene longitud fija de 200 caracteres
        errors.push(`Línea ${index + 1}: Longitud incorrecta (${line.length} caracteres, debe ser 200)`);
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      fieldErrors
    };
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
