import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { L01CatalogService } from './l01-catalog.service';
import { map } from 'rxjs/operators';

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class L01ValidationService {

  constructor(private catalogService: L01CatalogService) {}

  // Validar RUC ecuatoriano
  validarRUC(ruc: string): ValidationResult {
    const errors: ValidationError[] = [];

    // Verificar longitud
    if (ruc.length !== 13) {
      errors.push({
        field: 'identificacion',
        message: 'El RUC debe tener exactamente 13 dígitos',
        code: 'RUC_LENGTH'
      });
      return { isValid: false, errors, message: 'RUC inválido' };
    }

    // Verificar que sean solo números
    if (!/^\d{13}$/.test(ruc)) {
      errors.push({
        field: 'identificacion',
        message: 'El RUC debe contener solo números',
        code: 'RUC_NUMERIC'
      });
      return { isValid: false, errors, message: 'RUC inválido' };
    }

    // Verificar tipo de contribuyente (primeros 2 dígitos)
    const tipoContribuyente = ruc.substring(0, 2);
    const tiposValidos = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99'];

    if (!tiposValidos.includes(tipoContribuyente)) {
      errors.push({
        field: 'identificacion',
        message: 'Tipo de contribuyente inválido en el RUC',
        code: 'RUC_TIPO_CONTRIBUYENTE'
      });
      return { isValid: false, errors, message: 'RUC inválido' };
    }

    // Algoritmo de validación de RUC
    const coeficientes = [4, 3, 2, 7, 6, 5, 4, 3, 2];
    const verificador = parseInt(ruc.charAt(9));
    const suma = coeficientes.reduce((acc, coef, index) => {
      return acc + (parseInt(ruc.charAt(index)) * coef);
    }, 0);
    
    const residuo = suma % 11;
    const digitoVerificador = residuo === 0 ? 0 : 11 - residuo;

    if (digitoVerificador !== verificador) {
      errors.push({
        field: 'identificacion',
        message: 'Dígito verificador del RUC inválido',
        code: 'RUC_VERIFICADOR'
      });
      return { isValid: false, errors, message: 'RUC inválido' };
    }

    return { isValid: true, errors: [], message: 'RUC válido' };
  }

  // Validar código extranjero
  validarCodigoExtranjero(codigo: string): Observable<ValidationResult> {
    const errors: ValidationError[] = [];

    // Verificar longitud exacta de 7 dígitos según manual oficial SB
    if (codigo.length !== 7) {
      errors.push({
        field: 'identificacion',
        message: 'El código extranjero debe tener exactamente 7 dígitos',
        code: 'CODIGO_EXTRANJERO_LENGTH'
      });
      return of({ isValid: false, errors, message: 'Código extranjero inválido' });
    }

    // Verificar que sean solo números
    if (!/^\d{7}$/.test(codigo)) {
      errors.push({
        field: 'identificacion',
        message: 'El código extranjero debe contener solo números',
        code: 'CODIGO_EXTRANJERO_NUMERIC'
      });
      return of({ isValid: false, errors, message: 'Código extranjero inválido' });
    }

    // Validar contra tabla 164
    return this.catalogService.validarCodigo('t164', codigo).pipe(
      map(isValid => {
        if (isValid) {
          return { isValid: true, errors: [], message: 'Código extranjero válido' };
        } else {
          return {
            isValid: false,
            errors: [{
              field: 'identificacion',
              message: 'Código extranjero no encontrado en la tabla 164',
              code: 'CODIGO_EXTRANJERO_INVALIDO'
            }],
            message: 'Código extranjero inválido'
          };
        }
      })
    );
  }

  // Validar tipo de identificación
  validarTipoIdentificacion(tipo: string): Observable<ValidationResult> {
    return this.catalogService.validarCodigo('t4', tipo).pipe(
      map(isValid => {
        if (isValid) {
          return { isValid: true, errors: [], message: 'Tipo de identificación válido' };
        } else {
          return {
            isValid: false,
            errors: [{
              field: 'tipoIdentificacion',
              message: 'Tipo de identificación no válido',
              code: 'TIPO_IDENTIFICACION_INVALIDO'
            }],
            message: 'Tipo de identificación inválido'
          };
        }
      })
    );
  }

  // Validar clasificación
  validarClasificacion(clasificacion: number): Observable<ValidationResult> {
    return this.catalogService.validarCodigo('t173', clasificacion.toString()).pipe(
      map(isValid => {
        if (isValid) {
          return { isValid: true, errors: [], message: 'Clasificación válida' };
        } else {
          return {
            isValid: false,
            errors: [{
              field: 'clasificacion',
              message: 'Clasificación no válida',
              code: 'CLASIFICACION_INVALIDA'
            }],
            message: 'Clasificación inválida'
          };
        }
      })
    );
  }

  // Validar tipo de emisor
  validarTipoEmisor(tipo: number): Observable<ValidationResult> {
    return this.catalogService.validarCodigo('t73', tipo.toString()).pipe(
      map(isValid => {
        if (isValid) {
          return { isValid: true, errors: [], message: 'Tipo de emisor válido' };
        } else {
          return {
            isValid: false,
            errors: [{
              field: 'tipo',
              message: 'Tipo de emisor no válido',
              code: 'TIPO_EMISOR_INVALIDO'
            }],
            message: 'Tipo de emisor inválido'
          };
        }
      })
    );
  }

  // Validar identificación completa
  validarIdentificacion(tipoIdentificacion: string, identificacion: string): Observable<ValidationResult> {
    const errors: ValidationError[] = [];

    // Validar tipo de identificación
    if (tipoIdentificacion === 'R') {
      // Validar RUC
      const rucValidation = this.validarRUC(identificacion);
      if (!rucValidation.isValid) {
        errors.push(...rucValidation.errors);
      }
    } else if (tipoIdentificacion === 'X') {
      // Validar código extranjero
      return this.validarCodigoExtranjero(identificacion);
    } else {
      errors.push({
        field: 'identificacion',
        message: 'Tipo de identificación no soportado para validación',
        code: 'TIPO_IDENTIFICACION_NO_SOPORTADO'
      });
    }

    if (errors.length > 0) {
      return of({ isValid: false, errors, message: 'Identificación inválida' });
    }

    return of({ isValid: true, errors: [], message: 'Identificación válida' });
  }

  // Validar formulario completo L01
  validarFormularioL01(formData: any): Observable<ValidationResult> {
    const errors: ValidationError[] = [];

    // Validar campos requeridos
    if (!formData.tipoIdentificacion) {
      errors.push({
        field: 'tipoIdentificacion',
        message: 'El tipo de identificación es obligatorio',
        code: 'CAMPO_REQUERIDO'
      });
    }

    if (!formData.identificacion) {
      errors.push({
        field: 'identificacion',
        message: 'La identificación es obligatoria',
        code: 'CAMPO_REQUERIDO'
      });
    }

    if (!formData.clasificacion) {
      errors.push({
        field: 'clasificacion',
        message: 'La clasificación es obligatoria',
        code: 'CAMPO_REQUERIDO'
      });
    }

    if (!formData.tipo) {
      errors.push({
        field: 'tipo',
        message: 'El tipo de emisor es obligatorio',
        code: 'CAMPO_REQUERIDO'
      });
    }

    if (errors.length > 0) {
      return of({ isValid: false, errors, message: 'Formulario incompleto' });
    }

    // Validar identificación
    return this.validarIdentificacion(formData.tipoIdentificacion, formData.identificacion).pipe(
      map(identificacionValidation => {
        if (!identificacionValidation.isValid) {
          errors.push(...identificacionValidation.errors);
        }
        return { isValid: errors.length === 0, errors, message: errors.length === 0 ? 'Formulario válido' : 'Formulario inválido' };
      })
    );
  }

  // Validar duplicados
  validarDuplicado(tipoIdentificacion: string, identificacion: string, registrosExistentes: any[]): ValidationResult {
    const duplicado = registrosExistentes.find(reg => 
      reg.tipoIdentificacion === tipoIdentificacion && 
      reg.identificacion === identificacion
    );

    if (duplicado) {
      return {
        isValid: false,
        errors: [{
          field: 'identificacion',
          message: 'Ya existe un registro con esta identificación',
          code: 'DUPLICADO'
        }],
        message: 'Registro duplicado'
      };
    }

    return { isValid: true, errors: [], message: 'No hay duplicados' };
  }
}
