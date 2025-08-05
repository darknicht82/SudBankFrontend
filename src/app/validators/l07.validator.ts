/**
 * VALIDADOR L07 - EMISORES Y CUSTODIOS
 * Manual RVC - Febrero 2020
 * Superintendencia de Bancos del Ecuador
 */

import { L07, L07Cabecera, L07Detalle, L07Validacion } from '../models/l07.model';
import { 
  isValidTipoCliente,
  isValidCalificacionEmisor,
  isValidCalificadoraRiesgo
} from '../catalogs';

export class L07Validator {
  
  /**
   * Valida la estructura completa L07
   */
  static validarEstructura(l07: L07): L07Validacion {
    const errores: string[] = [];
    const advertencias: string[] = [];

    // Validar cabecera
    const validacionCabecera = this.validarCabecera(l07.cabecera);
    errores.push(...validacionCabecera.errores);
    advertencias.push(...validacionCabecera.advertencias);

    // Validar detalles
    l07.detalles.forEach((detalle, index) => {
      const validacionDetalle = this.validarDetalle(detalle, index + 1);
      errores.push(...validacionDetalle.errores);
      advertencias.push(...validacionDetalle.advertencias);
    });

    // Validar consistencia
    const validacionConsistencia = this.validarConsistencia(l07);
    errores.push(...validacionConsistencia.errores);
    advertencias.push(...validacionConsistencia.advertencias);

    return {
      esValido: errores.length === 0,
      errores,
      advertencias
    };
  }

  /**
   * Valida la cabecera L07
   */
  static validarCabecera(cabecera: L07Cabecera): L07Validacion {
    const errores: string[] = [];
    const advertencias: string[] = [];

    // Validar código de estructura
    if (cabecera.codigoEstructura !== 'L07') {
      errores.push('CABECERA: Código de estructura debe ser "L07"');
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
   * Valida un detalle L07
   */
  static validarDetalle(detalle: L07Detalle, numeroRegistro: number): L07Validacion {
    const errores: string[] = [];
    const advertencias: string[] = [];

    // Validar tipo de identificación
    if (!['R', 'E'].includes(detalle.tipoIdentificacion)) {
      errores.push(`REGISTRO ${numeroRegistro}: Tipo de identificación debe ser "R" o "E"`);
    }

    // Validar identificación del emisor
    if (!detalle.identificacionEmisor || detalle.identificacionEmisor.trim() === '') {
      errores.push(`REGISTRO ${numeroRegistro}: Identificación del emisor es obligatoria`);
    }

    // Validar nombre del emisor
    if (!detalle.nombreEmisor || detalle.nombreEmisor.trim() === '') {
      errores.push(`REGISTRO ${numeroRegistro}: Nombre del emisor es obligatorio`);
    }

    // Validar tipo de cliente
    if (!isValidTipoCliente(detalle.tipoCliente)) {
      errores.push(`REGISTRO ${numeroRegistro}: Tipo de cliente ${detalle.tipoCliente} no válido`);
    }

    // Validar calificación del emisor
    if (!isValidCalificacionEmisor(detalle.calificacionEmisor)) {
      errores.push(`REGISTRO ${numeroRegistro}: Calificación del emisor ${detalle.calificacionEmisor} no válida`);
    }

    // Validar calificadora de riesgo
    if (!isValidCalificadoraRiesgo(detalle.calificadoraRiesgo)) {
      errores.push(`REGISTRO ${numeroRegistro}: Calificadora de riesgo ${detalle.calificadoraRiesgo} no válida`);
    }

    // Validar país del emisor
    if (!detalle.paisEmisor || detalle.paisEmisor.trim() === '') {
      errores.push(`REGISTRO ${numeroRegistro}: País del emisor es obligatorio`);
    }

    // Validar tipo de custodio
    if (!['PROPIO', 'TERCERO'].includes(detalle.tipoCustodio)) {
      errores.push(`REGISTRO ${numeroRegistro}: Tipo de custodio debe ser "PROPIO" o "TERCERO"`);
    }

    // Validar identificación del custodio
    if (!detalle.identificacionCustodio || detalle.identificacionCustodio.trim() === '') {
      errores.push(`REGISTRO ${numeroRegistro}: Identificación del custodio es obligatoria`);
    }

    // Validar nombre del custodio
    if (!detalle.nombreCustodio || detalle.nombreCustodio.trim() === '') {
      errores.push(`REGISTRO ${numeroRegistro}: Nombre del custodio es obligatorio`);
    }

    // Validar país del custodio
    if (!detalle.paisCustodio || detalle.paisCustodio.trim() === '') {
      errores.push(`REGISTRO ${numeroRegistro}: País del custodio es obligatorio`);
    }

    return { esValido: errores.length === 0, errores, advertencias };
  }

  /**
   * Valida consistencia de la estructura
   */
  static validarConsistencia(l07: L07): L07Validacion {
    const errores: string[] = [];
    const advertencias: string[] = [];

    // Validar que el número total de registros coincida con el número real
    if (l07.cabecera.numeroTotalRegistros !== l07.detalles.length) {
      errores.push(`CONSISTENCIA: Número total de registros (${l07.cabecera.numeroTotalRegistros}) no coincide con registros reales (${l07.detalles.length})`);
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
  static validarFormatoRVC(l07: L07): L07Validacion {
    const errores: string[] = [];
    const advertencias: string[] = [];

    // Validar longitud de campos según especificaciones RVC
    if (l07.cabecera.codigoEstructura.length !== 3) {
      errores.push('RVC: Código de estructura debe tener 3 caracteres');
    }

    if (l07.cabecera.codigoEntidad.toString().length !== 4) {
      errores.push('RVC: Código de entidad debe tener 4 dígitos');
    }

    return { esValido: errores.length === 0, errores, advertencias };
  }
} 
