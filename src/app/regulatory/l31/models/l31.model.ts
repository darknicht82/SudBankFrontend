export interface L31Data {
  // Identificación del reporte
  codigoEntidad: string;
  fechaReporte: string;
  periodoReporte: string;
  
  // Datos de capital
  codigoCapital: number;
  descripcionCapital: string;
  tipoCapital: string;
  moneda: string;
  saldoInicial: number;
  saldoFinal: number;
  variacion: number;
  
  // Clasificación por tipo
  capitalTier1: number;
  capitalTier2: number;
  capitalTier3: number;
  
  // Clasificación por origen
  capitalOrdinario: number;
  capitalPreferente: number;
  capitalSubordinado: number;
  
  // Clasificación por calidad
  capitalBasal: number;
  capitalComplementario: number;
  capitalSuplementario: number;
  
  // Indicadores de solvencia
  ratioSolvencia: number;
  ratioBasal: number;
  ratioComplementario: number;
  
  // Metadatos
  fechaCreacion: string;
  usuarioCreacion: string;
  estado: string;
}

export interface L31ReportRequest {
  fechaInicio: string;
  fechaFin: string;
  codigoEntidad?: string;
  tipoCapital?: string;
  moneda?: string;
}

export interface L31ReportResponse {
  success: boolean;
  data: L31Data[];
  totalRegistros: number;
  fechaGeneracion: string;
  mensaje?: string;
} 
