export interface L11Data {
  // Identificación del reporte
  codigoEntidad: string;
  fechaReporte: string;
  periodoReporte: string;
  
  // Datos de depósitos
  codigoDeposito: number;
  descripcionDeposito: string;
  tipoDeposito: string;
  moneda: string;
  saldoInicial: number;
  saldoFinal: number;
  promedio: number;
  
  // Clasificación por plazo
  plazoDemanda: number;
  plazo30Dias: number;
  plazo90Dias: number;
  plazo180Dias: number;
  plazo365Dias: number;
  plazoMas365Dias: number;
  
  // Clasificación por cliente
  clientePersonaNatural: number;
  clientePersonaJuridica: number;
  clienteInstitucional: number;
  
  // Clasificación por tasa
  tasaFija: number;
  tasaVariable: number;
  tasaMixta: number;
  
  // Indicadores de riesgo
  riesgoLiquidez: number;
  riesgoCredito: number;
  riesgoMercado: number;
  
  // Metadatos
  fechaCreacion: string;
  usuarioCreacion: string;
  estado: string;
}

export interface L11ReportRequest {
  fechaInicio: string;
  fechaFin: string;
  codigoEntidad?: string;
  tipoDeposito?: string;
  moneda?: string;
}

export interface L11ReportResponse {
  success: boolean;
  data: L11Data[];
  totalRegistros: number;
  fechaGeneracion: string;
  mensaje?: string;
} 
