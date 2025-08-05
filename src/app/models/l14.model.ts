/**
 * MODELO L14 - CONCENTRACIÓN DE DEPÓSITOS
 * Manual de Riesgos de Mercado y Liquidez - Marzo 2021
 * Superintendencia de Bancos del Ecuador
 */

// CABECERA OBLIGATORIA
export interface L14Cabecera {
  codigoEstructura: string;        // L14 (fijo)
  codigoEntidad: number;           // Código de la entidad (ej: 0001)
  fechaCorte: string;              // dd/mm/aaaa
  numeroTotalRegistros: number;    // Total de registros en el archivo
}

// DETALLE SEGÚN ESPECIFICACIONES OFICIALES
export interface L14Detalle {
  tipoIdentificacion: 'R' | 'E';  // R=RUC, E=Extranjero
  identificacionCliente: string;   // Número de identificación del cliente
  tipoCliente: number;             // Tabla 73 - Tipos de cliente
  rangoMonto: number;              // Tabla 76 - Rango de montos
  montoDeposito: number;           // Monto del depósito (sin separadores de miles)
  fechaVencimiento: string;        // dd/mm/aaaa
  tasaInteres: number;             // Tasa de interés (porcentaje)
  tipoDeposito: string;            // Tipo de depósito
  moneda: string;                  // Código de moneda (USD, EUR, etc.)
}

// MODELO COMPLETO L14
export interface L14 {
  cabecera: L14Cabecera;
  detalles: L14Detalle[];
}

// MODELO PARA FRONTEND (con campos adicionales para UI)
export interface L14Frontend extends L14Detalle {
  id?: number;                     // ID interno para UI
  fechaReporte?: string;           // Fecha de reporte (formato UI)
  entidadCodigo?: string;          // Código de entidad (formato UI)
  createdAt?: string;              // Fecha de creación
  updatedAt?: string;              // Fecha de actualización
}

// VALIDACIONES
export interface L14Validacion {
  esValido: boolean;
  errores: string[];
  advertencias: string[];
}

// RESPUESTA DE API
export interface L14Response {
  cabecera: L14Cabecera;
  detalles: L14Detalle[];
  totalRegistros: number;
  fechaGeneracion: string;
  version: string;
} 
