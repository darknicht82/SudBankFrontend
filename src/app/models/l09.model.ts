/**
 * MODELO L09 - DETALLES DE PRODUCTOS
 * Manual de Riesgos de Mercado y Liquidez - Marzo 2021
 * Superintendencia de Bancos del Ecuador
 */

// CABECERA OBLIGATORIA
export interface L09Cabecera {
  codigoEstructura: string;        // L09 (fijo)
  codigoEntidad: number;           // Código de la entidad (ej: 0001)
  fechaCorte: string;              // dd/mm/aaaa
  numeroTotalRegistros: number;    // Total de registros en el archivo
}

// DETALLE SEGÚN ESPECIFICACIONES OFICIALES
export interface L09Detalle {
  codigoLiquidez: number;          // Tabla 59 - Códigos de liquidez estructural
  tipoIdentificacion: 'R' | 'E';  // R=RUC, E=Extranjero
  identificacionEntidad: string;   // Número de identificación
  tipoInstrumento: number;         // Tabla 62 - Tipos de instrumento
  calificacionEntidad: number;     // Tabla 65 - Calificación del emisor
  calificadoraRiesgo: number;      // Tabla 66 - Calificadoras de riesgo
  fechaEmision: string;            // dd/mm/aaaa
  fechaVencimiento: string;        // dd/mm/aaaa
  valorNominal: number;            // Valor nominal (sin separadores de miles)
  valorMercado: number;            // Valor de mercado (sin separadores de miles)
  tasaCupon: number;               // Tasa de cupón (porcentaje)
  frecuenciaPago: string;          // Frecuencia de pago
  moneda: string;                  // Código de moneda
  paisEmisor: string;              // País del emisor
}

// MODELO COMPLETO L09
export interface L09 {
  cabecera: L09Cabecera;
  detalles: L09Detalle[];
}

// MODELO PARA FRONTEND (con campos adicionales para UI)
export interface L09Frontend extends L09Detalle {
  id?: number;                     // ID interno para UI
  fechaReporte?: string;           // Fecha de reporte (formato UI)
  entidadCodigo?: string;          // Código de entidad (formato UI)
  createdAt?: string;              // Fecha de creación
  updatedAt?: string;              // Fecha de actualización
}

// VALIDACIONES
export interface L09Validacion {
  esValido: boolean;
  errores: string[];
  advertencias: string[];
}

// RESPUESTA DE API
export interface L09Response {
  cabecera: L09Cabecera;
  detalles: L09Detalle[];
  totalRegistros: number;
  fechaGeneracion: string;
  version: string;
} 
