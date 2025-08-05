export interface L13Data {
  // Identificación del reporte
  codigoEntidad: string;
  fechaReporte: string;
  periodoReporte: string;
  
  // Datos de garantías
  codigoGarantia: number;
  descripcionGarantia: string;
  tipoGarantia: string;
  moneda: string;
  valorNominal: number;
  valorRealizable: number;
  valorUtilizado: number;
  
  // Clasificación por tipo
  garantiaReal: number;
  garantiaPersonal: number;
  garantiaMixta: number;
  
  // Clasificación por calidad
  calidadExcelente: number;
  calidadBuena: number;
  calidadRegular: number;
  calidadDeficiente: number;
  
  // Clasificación por vencimiento
  vencimientoCorto: number;
  vencimientoMedio: number;
  vencimientoLargo: number;
  
  // Indicadores de riesgo
  riesgoGarantia: number;
  cobertura: number;
  concentracion: number;
  
  // Metadatos
  fechaCreacion: string;
  usuarioCreacion: string;
  estado: string;
}

export interface L13ReportRequest {
  fechaInicio: string;
  fechaFin: string;
  codigoEntidad?: string;
  tipoGarantia?: string;
  moneda?: string;
}

export interface L13ReportResponse {
  success: boolean;
  data: L13Data[];
  totalRegistros: number;
  fechaGeneracion: string;
  mensaje?: string;
} 
