/**
 * VALIDADOR L10 - BRECHAS DE SENSIBILIDAD
 * Manual RVC - Febrero 2020
 * Superintendencia de Bancos del Ecuador
 */

import { L10, L10Cabecera, L10Detalle, L10Validacion } from '../models/l10.model';
import { 
  isValidCodigoLiquidez, 
  isValidTipoInstrumento, 
  isValidCalificacionEmisor, 
  isValidCalificadoraRiesgo,
  isValidBandaTiempo
} from '../catalogs';

export class L10Validator {
  
  /**
   * Valida la estructura completa L10
   */
  static validarEstructura(l10: L10): L10Validacion {
    const errores: string[] = [];
    const advertencias: string[] = [];

    // Validar cabecera
    const validacionCabecera = this.validarCabecera(l10.cabecera);
    errores.push(...validacionCabecera.errores);
    advertencias.push(...validacionCabecera.advertencias);

    // Validar detalles
    l10.detalles.forEach((detalle, index) => {
      const validacionDetalle = this.validarDetalle(detalle, index + 1);
      errores.push(...validacionDetalle.errores);
      advertencias.push(...validacionDetalle.advertencias);
    });

    // Validar consistencia
    const validacionConsistencia = this.validarConsistencia(l10);
    errores.push(...validacionConsistencia.errores);
    advertencias.push(...validacionConsistencia.advertencias);

    return {
      esValido: errores.length === 0,
      errores,
      advertencias
    };
  }

  /**
   * Valida la cabecera L10
   */
  static validarCabecera(cabecera: L10Cabecera): L10Validacion {
    const errores: string[] = [];
    const advertencias: string[] = [];

    // Validar código de estructura
    if (cabecera.codigoEstructura !== 'L10') {
      errores.push('CABECERA: Código de estructura debe ser "L10"');
    }

    // Validar código de entidad
    if (!cabecera.codigoEntidad || cabecera.codigoEntidad <= 0) {
      errores.push('CABECERA: Código de entidad es obligatorio y debe ser mayor a 0');
    }

    // Validar formato de fecha
    if (!this.validarFormatoFecha(cabecera.fechaCorte)) {
      errores.push('CABECERA: Formato de fecha debe ser dd/mm/aaaa');
    }

    // Validar número total de registros
    if (!cabecera.numeroTotalRegistros || cabecera.numeroTotalRegistros <= 0) {
      errores.push('CABECERA: Número total de registros es obligatorio y debe ser mayor a 0');
    }

    return { esValido: errores.length === 0, errores, advertencias };
  }

  /**
   * Valida un detalle L10
   */
  static validarDetalle(detalle: L10Detalle, numeroRegistro: number): L10Validacion {
    const errores: string[] = [];
    const advertencias: string[] = [];

    // Validar código de liquidez
    if (!isValidCodigoLiquidez(detalle.codigoLiquidez)) {
      errores.push(`REGISTRO ${numeroRegistro}: Código de liquidez ${detalle.codigoLiquidez} no válido`);
    }

    // Validar tipo de identificación
    if (!['R', 'E'].includes(detalle.tipoIdentificacion)) {
      errores.push(`REGISTRO ${numeroRegistro}: Tipo de identificación debe ser "R" o "E"`);
    }

    // Validar identificación de entidad
    if (!detalle.identificacionEntidad || detalle.identificacionEntidad.trim() === '') {
      errores.push(`REGISTRO ${numeroRegistro}: Identificación de entidad es obligatoria`);
    }

    // Validar tipo de instrumento
    if (!isValidTipoInstrumento(detalle.tipoInstrumento)) {
      errores.push(`REGISTRO ${numeroRegistro}: Tipo de instrumento ${detalle.tipoInstrumento} no válido`);
    }

    // Validar calificación de entidad
    if (!isValidCalificacionEmisor(detalle.calificacionEntidad)) {
      errores.push(`REGISTRO ${numeroRegistro}: Calificación de entidad ${detalle.calificacionEntidad} no válida`);
    }

    // Validar calificadora de riesgo
    if (!isValidCalificadoraRiesgo(detalle.calificadoraRiesgo)) {
      errores.push(`REGISTRO ${numeroRegistro}: Calificadora de riesgo ${detalle.calificadoraRiesgo} no válida`);
    }

    // Validar banda de tiempo
    if (!isValidBandaTiempo(detalle.bandaTiempo)) {
      errores.push(`REGISTRO ${numeroRegistro}: Banda de tiempo ${detalle.bandaTiempo} no válida`);
    }

    // Validar valores (deben ser números positivos)
    if (detalle.valorNominal < 0) {
      errores.push(`REGISTRO ${numeroRegistro}: Valor nominal no puede ser negativo`);
    }

    if (detalle.valorMercado < 0) {
      errores.push(`REGISTRO ${numeroRegistro}: Valor de mercado no puede ser negativo`);
    }

    if (detalle.duracion < 0) {
      errores.push(`REGISTRO ${numeroRegistro}: Duración no puede ser negativa`);
    }

    return { esValido: errores.length === 0, errores, advertencias };
  }

  /**
   * Valida consistencia de la estructura
   */
  static validarConsistencia(l10: L10): L10Validacion {
    const errores: string[] = [];
    const advertencias: string[] = [];

    // Validar que el número total de registros coincida con el número real
    if (l10.cabecera.numeroTotalRegistros !== l10.detalles.length) {
      errores.push(`CONSISTENCIA: Número total de registros (${l10.cabecera.numeroTotalRegistros}) no coincide con registros reales (${l10.detalles.length})`);
    }

    return { esValido: errores.length === 0, errores, advertencias };
  }

  /**
   * Valida formato de fecha dd/mm/aaaa
   */
  private static validarFormatoFecha(fecha: string): boolean {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regex.test(fecha)) {
      return false;
    }

    const [dia, mes, anio] = fecha.split('/').map(Number);
    const fechaObj = new Date(anio, mes - 1, dia);
    
    return fechaObj.getDate() === dia &&
           fechaObj.getMonth() === mes - 1 &&
           fechaObj.getFullYear() === anio;
  }

  /**
   * Valida formato para exportación RVC
   */
  static validarFormatoRVC(l10: L10): L10Validacion {
    const errores: string[] = [];
    const advertencias: string[] = [];

    // Validar longitud de campos según especificaciones RVC
    if (l10.cabecera.codigoEstructura.length !== 3) {
      errores.push('RVC: Código de estructura debe tener 3 caracteres');
    }

    if (l10.cabecera.codigoEntidad.toString().length !== 4) {
      errores.push('RVC: Código de entidad debe tener 4 dígitos');
    }

    // Validar formato de valores (sin separadores de miles)
    l10.detalles.forEach((detalle, index) => {
      if (detalle.valorNominal.toString().includes(',')) {
        errores.push(`RVC REGISTRO ${index + 1}: Valor nominal no debe contener separadores de miles`);
      }

      if (detalle.valorMercado.toString().includes(',')) {
        errores.push(`RVC REGISTRO ${index + 1}: Valor de mercado no debe contener separadores de miles`);
      }
    });

    return { esValido: errores.length === 0, errores, advertencias };
  }
} 
