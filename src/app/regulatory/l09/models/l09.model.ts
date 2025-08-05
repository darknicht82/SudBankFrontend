export interface L09Data {
  // Identificación del reporte
  codigoEntidad: string;
  fechaReporte: string;
  periodoReporte: string;
  
  // Datos de inversiones
  codigoInversion: number;
  descripcionInversion: string;
  tipoInversion: string;
  moneda: string;
  montoInversion: number;
  valorMercado: number;
  rendimiento: number;
  
  // Clasificación por riesgo
  riesgoBajo: number;
  riesgoMedio: number;
  riesgoAlto: number;
  
  // Clasificación por vencimiento
  vencimientoCorto: number;
  vencimientoMedio: number;
  vencimientoLargo: number;
  
  // Clasificación por emisor
  emisorNacional: number;
  emisorExtranjero: number;
  emisorSupranacional: number;
  
  // Indicadores de calidad
  calificacionRiesgo: string;
  provisiones: number;
  deterioro: number;
  
  // Metadatos
  fechaCreacion: string;
  usuarioCreacion: string;
  estado: string;
}

export interface L09ReportRequest {
  fechaInicio: string;
  fechaFin: string;
  codigoEntidad?: string;
  tipoInversion?: string;
  moneda?: string;
}

export interface L09ReportResponse {
  success: boolean;
  data: L09Data[];
  totalRegistros: number;
  fechaGeneracion: string;
  mensaje?: string;
} 
