export interface L12Data {
  // Identificación del reporte
  codigoEntidad: string;
  fechaReporte: string;
  periodoReporte: string;
  
  // Datos de préstamos
  codigoPrestamo: number;
  descripcionPrestamo: string;
  tipoPrestamo: string;
  moneda: string;
  saldoInicial: number;
  saldoFinal: number;
  promedio: number;
  
  // Clasificación por vencimiento
  vencimientoVigente: number;
  vencimientoVencido: number;
  vencimientoJudicial: number;
  
  // Clasificación por cliente
  clientePersonaNatural: number;
  clientePersonaJuridica: number;
  clienteMicroempresa: number;
  
  // Clasificación por sector económico
  sectorComercio: number;
  sectorIndustria: number;
  sectorServicios: number;
  sectorAgricultura: number;
  sectorConstruccion: number;
  sectorOtros: number;
  
  // Indicadores de riesgo
  riesgoCredito: number;
  provisiones: number;
  deterioro: number;
  
  // Metadatos
  fechaCreacion: string;
  usuarioCreacion: string;
  estado: string;
}

export interface L12ReportRequest {
  fechaInicio: string;
  fechaFin: string;
  codigoEntidad?: string;
  tipoPrestamo?: string;
  moneda?: string;
}

export interface L12ReportResponse {
  success: boolean;
  data: L12Data[];
  totalRegistros: number;
  fechaGeneracion: string;
  mensaje?: string;
} 
