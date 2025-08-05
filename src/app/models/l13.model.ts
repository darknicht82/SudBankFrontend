/**
 * MODELO L13 - OBLIGACIONES FINANCIERAS
 * Manual de Riesgos de Mercado y Liquidez - Marzo 2021
 * Superintendencia de Bancos del Ecuador
 */

// CABECERA OBLIGATORIA
export interface L13Cabecera {
  codigoEstructura: string;        // L13 (fijo)
  codigoEntidad: number;           // Código de la entidad (ej: 0001)
  fechaCorte: string;              // dd/mm/aaaa
  numeroTotalRegistros: number;    // Total de registros en el archivo
}

// DETALLE SEGÚN ESPECIFICACIONES OFICIALES
export interface L13Detalle {
  tipoIdentificacion: 'R' | 'E';  // R=RUC, E=Extranjero
  identificacionEntidad: string;   // Número de identificación
  tipoCliente: number;             // Tabla 73 - Tipos de cliente
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
  tipoObligacion: string;          // Tipo de obligación financiera
}

// MODELO COMPLETO L13
export interface L13 {
  cabecera: L13Cabecera;
  detalles: L13Detalle[];
}

// MODELO PARA FRONTEND (con campos adicionales para UI)
export interface L13Frontend extends L13Detalle {
  id?: number;                     // ID interno para UI
  fechaReporte?: string;           // Fecha de reporte (formato UI)
  entidadCodigo?: string;          // Código de entidad (formato UI)
  createdAt?: string;              // Fecha de creación
  updatedAt?: string;              // Fecha de actualización
}

// VALIDACIONES
export interface L13Validacion {
  esValido: boolean;
  errores: string[];
  advertencias: string[];
}

// RESPUESTA DE API
export interface L13Response {
  cabecera: L13Cabecera;
  detalles: L13Detalle[];
  totalRegistros: number;
  fechaGeneracion: string;
  version: string;
} 
