/**
 * VALIDADOR L14 - CONCENTRACIÓN DE DEPÓSITOS
 * Manual RVC - Febrero 2020
 * Superintendencia de Bancos del Ecuador
 */

import { L14, L14Cabecera, L14Detalle, L14Validacion } from '../models/l14.model';
import { 
  isValidTipoCliente,
  isValidRangoMonto
} from '../catalogs';

export class L14Validator {
  
  /**
   * Valida la estructura completa L14
   */
  static validarEstructura(l14: L14): L14Validacion {
    const errores: string[] = [];
    const advertencias: string[] = [];

    // Validar cabecera
    const validacionCabecera = this.validarCabecera(l14.cabecera);
    errores.push(...validacionCabecera.errores);
    advertencias.push(...validacionCabecera.advertencias);

    // Validar detalles
    l14.detalles.forEach((detalle, index) => {
      const validacionDetalle = this.validarDetalle(detalle, index + 1);
      errores.push(...validacionDetalle.errores);
      advertencias.push(...validacionDetalle.advertencias);
    });

    // Validar consistencia
    const validacionConsistencia = this.validarConsistencia(l14);
    errores.push(...validacionConsistencia.errores);
    advertencias.push(...validacionConsistencia.advertencias);

    return {
      esValido: errores.length === 0,
      errores,
      advertencias
    };
  }

  /**
   * Valida la cabecera L14
   */
  static validarCabecera(cabecera: L14Cabecera): L14Validacion {
    const errores: string[] = [];
    const advertencias: string[] = [];

    // Validar código de estructura
    if (cabecera.codigoEstructura !== 'L14') {
      errores.push('CABECERA: Código de estructura debe ser "L14"');
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
   * Valida un detalle L14
   */
  static validarDetalle(detalle: L14Detalle, numeroRegistro: number): L14Validacion {
    const errores: string[] = [];
    const advertencias: string[] = [];

    // Validar tipo de identificación
    if (!['R', 'E'].includes(detalle.tipoIdentificacion)) {
      errores.push(`REGISTRO ${numeroRegistro}: Tipo de identificación debe ser "R" o "E"`);
    }

    // Validar identificación del cliente
    if (!detalle.identificacionCliente || detalle.identificacionCliente.trim() === '') {
      errores.push(`REGISTRO ${numeroRegistro}: Identificación del cliente es obligatoria`);
    }

    // Validar tipo de cliente
    if (!isValidTipoCliente(detalle.tipoCliente)) {
      errores.push(`REGISTRO ${numeroRegistro}: Tipo de cliente ${detalle.tipoCliente} no válido`);
    }

    // Validar rango de monto
    if (!isValidRangoMonto(detalle.rangoMonto)) {
      errores.push(`REGISTRO ${numeroRegistro}: Rango de monto ${detalle.rangoMonto} no válido`);
    }

    // Validar monto del depósito
    if (detalle.montoDeposito < 0) {
      errores.push(`REGISTRO ${numeroRegistro}: Monto del depósito no puede ser negativo`);
    }

    // Validar formato de fecha de vencimiento
    if (!this.validarFormatoFecha(detalle.fechaVencimiento)) {
      errores.push(`REGISTRO ${numeroRegistro}: Formato de fecha de vencimiento debe ser dd/mm/aaaa`);
    }

    // Validar tasa de interés
    if (detalle.tasaInteres < 0 || detalle.tasaInteres > 100) {
      errores.push(`REGISTRO ${numeroRegistro}: Tasa de interés debe estar entre 0 y 100`);
    }

    // Validar tipo de depósito
    if (!detalle.tipoDeposito || detalle.tipoDeposito.trim() === '') {
      errores.push(`REGISTRO ${numeroRegistro}: Tipo de depósito es obligatorio`);
    }

    // Validar moneda
    if (!detalle.moneda || detalle.moneda.trim() === '') {
      errores.push(`REGISTRO ${numeroRegistro}: Moneda es obligatoria`);
    }

    return { esValido: errores.length === 0, errores, advertencias };
  }

  /**
   * Valida consistencia de la estructura
   */
  static validarConsistencia(l14: L14): L14Validacion {
    const errores: string[] = [];
    const advertencias: string[] = [];

    // Validar que el número total de registros coincida con el número real
    if (l14.cabecera.numeroTotalRegistros !== l14.detalles.length) {
      errores.push(`CONSISTENCIA: Número total de registros (${l14.cabecera.numeroTotalRegistros}) no coincide con registros reales (${l14.detalles.length})`);
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
  static validarFormatoRVC(l14: L14): L14Validacion {
    const errores: string[] = [];
    const advertencias: string[] = [];

    // Validar longitud de campos según especificaciones RVC
    if (l14.cabecera.codigoEstructura.length !== 3) {
      errores.push('RVC: Código de estructura debe tener 3 caracteres');
    }

    if (l14.cabecera.codigoEntidad.toString().length !== 4) {
      errores.push('RVC: Código de entidad debe tener 4 dígitos');
    }

    // Validar formato de valores (sin separadores de miles)
    l14.detalles.forEach((detalle, index) => {
      if (detalle.montoDeposito.toString().includes(',')) {
        errores.push(`RVC REGISTRO ${index + 1}: Monto del depósito no debe contener separadores de miles`);
      }
    });

    return { esValido: errores.length === 0, errores, advertencias };
  }
} 
