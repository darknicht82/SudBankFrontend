/**
 * MODELO L07 - EMISORES Y CUSTODIOS
 * Manual de Riesgos de Mercado y Liquidez - Marzo 2021
 * Superintendencia de Bancos del Ecuador
 */

// CABECERA OBLIGATORIA
export interface L07Cabecera {
  codigoEstructura: string;        // L07 (fijo)
  codigoEntidad: number;           // Código de la entidad (ej: 0001)
  fechaCorte: string;              // dd/mm/aaaa
  numeroTotalRegistros: number;    // Total de registros en el archivo
}

// DETALLE SEGÚN ESPECIFICACIONES OFICIALES
export interface L07Detalle {
  tipoIdentificacion: 'R' | 'E';  // R=RUC, E=Extranjero
  identificacionEmisor: string;    // Número de identificación del emisor
  nombreEmisor: string;            // Nombre del emisor
  tipoCliente: number;             // Tabla 73 - Tipos de cliente
  calificacionEmisor: number;      // Tabla 65 - Calificación del emisor
  calificadoraRiesgo: number;      // Tabla 66 - Calificadoras de riesgo
  paisEmisor: string;              // País del emisor
  tipoCustodio: 'PROPIO' | 'TERCERO';
  identificacionCustodio: string;  // Identificación del custodio
  nombreCustodio: string;          // Nombre del custodio
  paisCustodio: string;            // País del custodio
}

// MODELO COMPLETO L07
export interface L07 {
  cabecera: L07Cabecera;
  detalles: L07Detalle[];
}

// MODELO PARA FRONTEND (con campos adicionales para UI)
export interface L07Frontend extends L07Detalle {
  id?: number;                     // ID interno para UI
  fechaReporte?: string;           // Fecha de reporte (formato UI)
  entidadCodigo?: string;          // Código de entidad (formato UI)
  createdAt?: string;              // Fecha de creación
  updatedAt?: string;              // Fecha de actualización
}

// VALIDACIONES
export interface L07Validacion {
  esValido: boolean;
  errores: string[];
  advertencias: string[];
}

// RESPUESTA DE API
export interface L07Response {
  cabecera: L07Cabecera;
  detalles: L07Detalle[];
  totalRegistros: number;
  fechaGeneracion: string;
  version: string;
} 
