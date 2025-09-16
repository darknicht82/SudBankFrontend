/**
 * VALIDADOR L08 - LIQUIDEZ ESTRUCTURAL
 * Manual RVC - Febrero 2020
 * Superintendencia de Bancos del Ecuador
 */

import { L08, L08Cabecera, L08Detalle, L08Validacion } from '../models/l08.model';
// ✅ L08: Catálogos comentados temporalmente - No conectados a APIs reales
// import { 
//   isValidCodigoLiquidez, 
//   isValidTipoInstrumento, 
//   isValidCalificacionEmisor, 
//   isValidCalificadoraRiesgo 
// } from '../catalogs';

export class L08Validator {
  
  /**
   * Valida la estructura completa L08
   */
  static validarEstructura(l08: L08): L08Validacion {
    const errores: string[] = [];
    const advertencias: string[] = [];

    // Validar cabecera
    const validacionCabecera = this.validarCabecera(l08.cabecera);
    errores.push(...validacionCabecera.errores);
    advertencias.push(...validacionCabecera.advertencias);

    // Validar detalles
    l08.detalles.forEach((detalle, index) => {
      const validacionDetalle = this.validarDetalle(detalle, index + 1);
      errores.push(...validacionDetalle.errores);
      advertencias.push(...validacionDetalle.advertencias);
    });

    // Validar consistencia
    const validacionConsistencia = this.validarConsistencia(l08);
    errores.push(...validacionConsistencia.errores);
    advertencias.push(...validacionConsistencia.advertencias);

    return {
      esValido: errores.length === 0,
      errores,
      advertencias
    };
  }

  /**
   * Valida la cabecera L08
   */
  static validarCabecera(cabecera: L08Cabecera): L08Validacion {
    const errores: string[] = [];
    const advertencias: string[] = [];

    // Validar código de estructura
    if (cabecera.codigoEstructura !== 'L08') {
      errores.push('CABECERA: Código de estructura debe ser "L08"');
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
   * Valida un detalle L08
   */
  static validarDetalle(detalle: L08Detalle, numeroRegistro: number): L08Validacion {
    const errores: string[] = [];
    const advertencias: string[] = [];

    // ✅ L08: Validaciones de catálogos comentadas temporalmente - No conectadas a APIs reales
    
    // Validar código de liquidez
    // if (!isValidCodigoLiquidez(detalle.codigoLiquidez)) {
    //   errores.push(`REGISTRO ${numeroRegistro}: Código de liquidez ${detalle.codigoLiquidez} no válido`);
    // }

    // Validar tipo de identificación
    if (!['R', 'E'].includes(detalle.tipoIdentificacion)) {
      errores.push(`REGISTRO ${numeroRegistro}: Tipo de identificación debe ser "R" o "E"`);
    }

    // Validar identificación de entidad
    if (!detalle.identificacionEntidad || detalle.identificacionEntidad.trim() === '') {
      errores.push(`REGISTRO ${numeroRegistro}: Identificación de entidad es obligatoria`);
    }

    // Validar tipo de instrumento
    // if (!isValidTipoInstrumento(detalle.tipoInstrumento.toString())) {
    //   errores.push(`REGISTRO ${numeroRegistro}: Tipo de instrumento ${detalle.tipoInstrumento} no válido`);
    // }

    // Validar calificación de entidad
    // if (!isValidCalificacionEmisor(detalle.calificacionEntidad.toString())) {
    //   errores.push(`REGISTRO ${numeroRegistro}: Calificación de entidad ${detalle.calificacionEntidad} no válida`);
    // }

    // Validar calificadora de riesgo
    // if (!isValidCalificadoraRiesgo(detalle.calificadoraRiesgo.toString())) {
    //   errores.push(`REGISTRO ${numeroRegistro}: Calificadora de riesgo ${detalle.calificadoraRiesgo} no válida`);
    // }

    // Validar valores (deben ser números positivos)
    const valores = [
      detalle.valorLunes,
      detalle.valorMartes,
      detalle.valorMiercoles,
      detalle.valorJueves,
      detalle.valorViernes
    ];

    valores.forEach((valor, index) => {
      if (valor < 0) {
        errores.push(`REGISTRO ${numeroRegistro}: Valor día ${index + 1} no puede ser negativo`);
      }
    });

    return { esValido: errores.length === 0, errores, advertencias };
  }

  /**
   * Valida consistencia de la estructura
   */
  static validarConsistencia(l08: L08): L08Validacion {
    const errores: string[] = [];
    const advertencias: string[] = [];

    // Validar que el número total de registros coincida con el número real
    if (l08.cabecera.numeroTotalRegistros !== l08.detalles.length) {
      errores.push(`CONSISTENCIA: Número total de registros (${l08.cabecera.numeroTotalRegistros}) no coincide con registros reales (${l08.detalles.length})`);
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
  static validarFormatoRVC(l08: L08): L08Validacion {
    const errores: string[] = [];
    const advertencias: string[] = [];

    // Validar longitud de campos según especificaciones RVC
    if (l08.cabecera.codigoEstructura.length !== 3) {
      errores.push('RVC: Código de estructura debe tener 3 caracteres');
    }

    if (l08.cabecera.codigoEntidad.toString().length !== 4) {
      errores.push('RVC: Código de entidad debe tener 4 dígitos');
    }

    // Validar formato de valores (sin separadores de miles)
    l08.detalles.forEach((detalle, index) => {
      const valores = [
        detalle.valorLunes,
        detalle.valorMartes,
        detalle.valorMiercoles,
        detalle.valorJueves,
        detalle.valorViernes
      ];

      valores.forEach((valor, valorIndex) => {
        if (valor.toString().includes(',')) {
          errores.push(`RVC REGISTRO ${index + 1}: Valor día ${valorIndex + 1} no debe contener separadores de miles`);
        }
      });
    });

    return { esValido: errores.length === 0, errores, advertencias };
  }
} 
