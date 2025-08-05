/**
 * MODELO L31 - BRECHAS DE LIQUIDEZ
 * Manual de Riesgos de Mercado y Liquidez - Marzo 2021
 * Superintendencia de Bancos del Ecuador
 */

// CABECERA OBLIGATORIA
export interface L31Cabecera {
  codigoEstructura: string;        // L31 (fijo)
  codigoEntidad: number;           // Código de la entidad (ej: 0001)
  fechaCorte: string;              // dd/mm/aaaa
  numeroTotalRegistros: number;    // Total de registros en el archivo
}

// DETALLE SEGÚN ESPECIFICACIONES OFICIALES
export interface L31Detalle {
  bandaTiempo: number;             // Tabla 75 - Bandas de tiempo
  activos: number;                 // Activos en la banda (sin separadores de miles)
  pasivos: number;                 // Pasivos en la banda (sin separadores de miles)
  brecha: number;                  // Brecha (activos - pasivos)
  ratioCobertura: number;          // Ratio de cobertura (activos/pasivos)
  moneda: string;                  // Código de moneda
  tipoInstrumento: string;         // Tipo de instrumento
  calificacionRiesgo: string;      // Calificación de riesgo
}

// MODELO COMPLETO L31
export interface L31 {
  cabecera: L31Cabecera;
  detalles: L31Detalle[];
}

// MODELO PARA FRONTEND (con campos adicionales para UI)
export interface L31Frontend extends L31Detalle {
  id?: number;                     // ID interno para UI
  fechaReporte?: string;           // Fecha de reporte (formato UI)
  entidadCodigo?: string;          // Código de entidad (formato UI)
  createdAt?: string;              // Fecha de creación
  updatedAt?: string;              // Fecha de actualización
}

// VALIDACIONES
export interface L31Validacion {
  esValido: boolean;
  errores: string[];
  advertencias: string[];
}

// RESPUESTA DE API
export interface L31Response {
  cabecera: L31Cabecera;
  detalles: L31Detalle[];
  totalRegistros: number;
  fechaGeneracion: string;
  version: string;
} 
