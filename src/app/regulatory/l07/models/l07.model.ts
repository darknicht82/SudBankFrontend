export interface L07Data {
  // Identificación del reporte
  codigoEntidad: string;
  fechaReporte: string;
  periodoReporte: string;
  
  // Datos de liquidez
  codigoLiquidez: number;
  descripcionLiquidez: string;
  saldoInicial: number;
  saldoFinal: number;
  promedio: number;
  
  // Clasificación por vencimiento
  vencimiento7Dias: number;
  vencimiento30Dias: number;
  vencimiento90Dias: number;
  vencimiento180Dias: number;
  vencimiento365Dias: number;
  vencimientoMas365Dias: number;
  
  // Clasificación por tipo de cliente
  clienteCorporativo: number;
  clienteRetail: number;
  clienteInstitucional: number;
  
  // Indicadores de riesgo
  riesgoLiquidez: number;
  riesgoMercado: number;
  riesgoCredito: number;
  
  // Metadatos
  fechaCreacion: string;
  usuarioCreacion: string;
  estado: string;
}

export interface L07ReportRequest {
  fechaInicio: string;
  fechaFin: string;
  codigoEntidad?: string;
  tipoReporte: 'diario' | 'semanal' | 'mensual';
}

export interface L07ReportResponse {
  success: boolean;
  data: L07Data[];
  totalRegistros: number;
  fechaGeneracion: string;
  mensaje?: string;
} 
