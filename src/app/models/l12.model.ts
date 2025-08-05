/**
 * MODELO L12 - CAPTACIONES POR MONTO
 * Manual de Riesgos de Mercado y Liquidez - Marzo 2021
 * Superintendencia de Bancos del Ecuador
 */

// CABECERA OBLIGATORIA
export interface L12Cabecera {
  codigoEstructura: string;        // L12 (fijo)
  codigoEntidad: number;           // Código de la entidad (ej: 0001)
  fechaCorte: string;              // dd/mm/aaaa
  numeroTotalRegistros: number;    // Total de registros en el archivo
}

// DETALLE SEGÚN ESPECIFICACIONES OFICIALES
export interface L12Detalle {
  tipoIdentificacion: 'R' | 'E';  // R=RUC, E=Extranjero
  identificacionCliente: string;   // Número de identificación del cliente
  tipoCliente: number;             // Tabla 73 - Tipos de cliente
  rangoMonto: number;              // Tabla 76 - Rango de montos
  montoCaptacion: number;          // Monto de captación (sin separadores de miles)
  fechaCaptacion: string;          // dd/mm/aaaa
  fechaVencimiento: string;        // dd/mm/aaaa
  tasaInteres: number;             // Tasa de interés (porcentaje)
  tipoCaptacion: string;           // Tipo de captación
  moneda: string;                  // Código de moneda
  plazo: number;                   // Plazo en días
}

// MODELO COMPLETO L12
export interface L12 {
  cabecera: L12Cabecera;
  detalles: L12Detalle[];
}

// MODELO PARA FRONTEND (con campos adicionales para UI)
export interface L12Frontend extends L12Detalle {
  id?: number;                     // ID interno para UI
  fechaReporte?: string;           // Fecha de reporte (formato UI)
  entidadCodigo?: string;          // Código de entidad (formato UI)
  createdAt?: string;              // Fecha de creación
  updatedAt?: string;              // Fecha de actualización
}

// VALIDACIONES
export interface L12Validacion {
  esValido: boolean;
  errores: string[];
  advertencias: string[];
}

// RESPUESTA DE API
export interface L12Response {
  cabecera: L12Cabecera;
  detalles: L12Detalle[];
  totalRegistros: number;
  fechaGeneracion: string;
  version: string;
} 
