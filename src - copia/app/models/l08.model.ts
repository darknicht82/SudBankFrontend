/**
 * MODELO L08 - LIQUIDEZ ESTRUCTURAL
 * Manual de Riesgos de Mercado y Liquidez - Marzo 2021
 * Superintendencia de Bancos del Ecuador
 */

// CABECERA OBLIGATORIA
export interface L08Cabecera {
  codigoEstructura: string;        // L08 (fijo)
  codigoEntidad: number;           // Código de la entidad (ej: 0001)
  fechaCorte: string;              // dd/mm/aaaa
  numeroTotalRegistros: number;    // Total de registros en el archivo
}

// DETALLE SEGÚN ESPECIFICACIONES OFICIALES
export interface L08Detalle {
  codigoLiquidez: number;          // Tabla 59 - Códigos de liquidez estructural
  tipoIdentificacion: 'R' | 'E';  // R=RUC, E=Extranjero
  identificacionEntidad: string;   // Número de identificación
  tipoInstrumento: number;         // Tabla 62 - Tipos de instrumento
  calificacionEntidad: number;     // Tabla 65 - Calificación del emisor
  calificadoraRiesgo: number;      // Tabla 66 - Calificadoras de riesgo
  valorLunes: number;              // Valor al lunes (sin separadores de miles)
  valorMartes: number;             // Valor al martes (sin separadores de miles)
  valorMiercoles: number;          // Valor al miércoles (sin separadores de miles)
  valorJueves: number;             // Valor al jueves (sin separadores de miles)
  valorViernes: number;            // Valor al viernes (sin separadores de miles)
}

// MODELO COMPLETO L08
export interface L08 {
  cabecera: L08Cabecera;
  detalles: L08Detalle[];
}

// MODELO PARA FRONTEND (con campos adicionales para UI)
export interface L08Frontend extends L08Detalle {
  id?: number;                     // ID interno para UI
  fechaReporte?: string;           // Fecha de reporte (formato UI)
  entidadCodigo?: string;          // Código de entidad (formato UI)
  createdAt?: string;              // Fecha de creación
  updatedAt?: string;              // Fecha de actualización
}

// VALIDACIONES
export interface L08Validacion {
  esValido: boolean;
  errores: string[];
  advertencias: string[];
}

// RESPUESTA DE API
export interface L08Response {
  cabecera: L08Cabecera;
  detalles: L08Detalle[];
  totalRegistros: number;
  fechaGeneracion: string;
  version: string;
} 
