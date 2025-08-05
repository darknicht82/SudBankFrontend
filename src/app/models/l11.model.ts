/**
 * MODELO L11 - SENSIBILIDAD DEL VALOR PATRIMONIAL
 * Manual de Riesgos de Mercado y Liquidez - Marzo 2021
 * Superintendencia de Bancos del Ecuador
 */

// CABECERA OBLIGATORIA
export interface L11Cabecera {
  codigoEstructura: string;        // L11 (fijo)
  codigoEntidad: number;           // Código de la entidad (ej: 0001)
  fechaCorte: string;              // dd/mm/aaaa
  numeroTotalRegistros: number;    // Total de registros en el archivo
}

// DETALLE SEGÚN ESPECIFICACIONES OFICIALES
export interface L11Detalle {
  codigoLiquidez: number;          // Tabla 59 - Códigos de liquidez estructural
  tipoIdentificacion: 'R' | 'E';  // R=RUC, E=Extranjero
  identificacionEntidad: string;   // Número de identificación
  tipoInstrumento: number;         // Tabla 62 - Tipos de instrumento
  calificacionEntidad: number;     // Tabla 65 - Calificación del emisor
  calificadoraRiesgo: number;      // Tabla 66 - Calificadoras de riesgo
  escenario: string;               // Tabla 77 - Escenarios (C, E, D)
  valorPatrimonial: number;        // Valor patrimonial (sin separadores de miles)
  sensibilidadTasa: number;        // Sensibilidad a cambios de tasa
  sensibilidadCambio: number;      // Sensibilidad a cambios de tipo de cambio
  sensibilidadCrediticio: number;  // Sensibilidad crediticia
  moneda: string;                  // Código de moneda
}

// MODELO COMPLETO L11
export interface L11 {
  cabecera: L11Cabecera;
  detalles: L11Detalle[];
}

// MODELO PARA FRONTEND (con campos adicionales para UI)
export interface L11Frontend extends L11Detalle {
  id?: number;                     // ID interno para UI
  fechaReporte?: string;           // Fecha de reporte (formato UI)
  entidadCodigo?: string;          // Código de entidad (formato UI)
  createdAt?: string;              // Fecha de creación
  updatedAt?: string;              // Fecha de actualización
}

// VALIDACIONES
export interface L11Validacion {
  esValido: boolean;
  errores: string[];
  advertencias: string[];
}

// RESPUESTA DE API
export interface L11Response {
  cabecera: L11Cabecera;
  detalles: L11Detalle[];
  totalRegistros: number;
  fechaGeneracion: string;
  version: string;
} 
