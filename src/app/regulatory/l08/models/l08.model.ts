export interface L08Data {
  id: number;
  codigoLiquidez: number;
  tipoIdentificacion: 'R' | 'E';
  identificacionEntidad: number;
  tipoInstrumento: number;
  calificacionEntidad: number;
  calificadoraRiesgo: number;
  valorLunes: number;
  valorMartes: number;
  valorMiercoles: number;
  valorJueves: number;
  valorViernes: number;
  fechaReporte: string;
  entidadCodigo: string;
  createdAt: string;
  updatedAt: string;
}

export interface L08ReportRequest {
  fechaInicio: string;
  fechaFin: string;
  tipoInstrumento?: string;
  calificacion?: string;
}

export interface L08ReportResponse {
  id: number;
  datos: L08Data[];
  totalRegistros: number;
  valorTotalLunes: number;
  valorTotalViernes: number;
  variacionSemanal: number;
  cumplimiento: number;
  fechaGeneracion: string;
}

export interface L08Summary {
  totalRegistros: number;
  valorTotalActual: number;
  variacionSemanal: number;
  cumplimiento: number;
  alertas: number;
  ultimaActualizacion: string;
}

export interface L08ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
} 
