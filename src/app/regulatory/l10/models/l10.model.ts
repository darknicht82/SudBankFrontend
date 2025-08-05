export interface L10BrechasSensibilidad {
  id: number;
  codigoBrecha: string;
  tipoBrecha: string;
  plazo: number;
  activos: number;
  pasivos: number;
  brecha: number;
  sensibilidad: number;
  fechaCalculo: Date;
  fechaRegistro: Date;
  usuarioRegistro: string;
}

export interface L10ReportRequest {
  fechaInicio: string;
  fechaFin: string;
  tipoBrecha?: string;
}

export interface L10ReportResponse {
  id: number;
  totalRegistros: number;
  valorTotalActivos: number;
  valorTotalPasivos: number;
  brechaTotal: number;
  sensibilidadPromedio: number;
  cumplimiento: string;
  fechaGeneracion: string;
  datos: L10BrechasSensibilidad[];
}

export interface L10Summary {
  totalBrechas: number;
  brechaTotal: number;
  sensibilidadPromedio: number;
}

export interface L10ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} 
