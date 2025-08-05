/**
 * MODELO L10 - BRECHAS DE SENSIBILIDAD
 * Manual de Riesgos de Mercado y Liquidez - Marzo 2021
 * Superintendencia de Bancos del Ecuador
 */

// CABECERA OBLIGATORIA
export interface L10Cabecera {
  codigoEstructura: string;        // L10 (fijo)
  codigoEntidad: number;           // Código de la entidad (ej: 0001)
  fechaCorte: string;              // dd/mm/aaaa
  numeroTotalRegistros: number;    // Total de registros en el archivo
}

// DETALLE SEGÚN ESPECIFICACIONES OFICIALES
export interface L10Detalle {
  codigoLiquidez: number;          // Tabla 59 - Códigos de liquidez estructural
  tipoIdentificacion: 'R' | 'E';  // R=RUC, E=Extranjero
  identificacionEntidad: string;   // Número de identificación
  tipoInstrumento: number;         // Tabla 62 - Tipos de instrumento
  calificacionEntidad: number;     // Tabla 65 - Calificación del emisor
  calificadoraRiesgo: number;      // Tabla 66 - Calificadoras de riesgo
  bandaTiempo: number;             // Tabla 75 - Bandas de tiempo
  valorNominal: number;            // Valor nominal (sin separadores de miles)
  valorMercado: number;            // Valor de mercado (sin separadores de miles)
  duracion: number;                // Duración en años
  sensibilidad: number;            // Sensibilidad al cambio de tasas
}

// MODELO COMPLETO L10
export interface L10 {
  cabecera: L10Cabecera;
  detalles: L10Detalle[];
}

// MODELO PARA FRONTEND (con campos adicionales para UI)
export interface L10Frontend extends L10Detalle {
  id?: number;                     // ID interno para UI
  fechaReporte?: string;           // Fecha de reporte (formato UI)
  entidadCodigo?: string;          // Código de entidad (formato UI)
  createdAt?: string;              // Fecha de creación
  updatedAt?: string;              // Fecha de actualización
}

// VALIDACIONES
export interface L10Validacion {
  esValido: boolean;
  errores: string[];
  advertencias: string[];
}

// RESPUESTA DE API
export interface L10Response {
  cabecera: L10Cabecera;
  detalles: L10Detalle[];
  totalRegistros: number;
  fechaGeneracion: string;
  version: string;
} 
