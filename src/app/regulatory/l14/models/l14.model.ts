export interface L14ConcentracionDepositos {
  id: number;
  codigoCliente: string;
  nombreCliente: string;
  tipoDeposito: string;
  valorDeposito: number;
  porcentajeConcentracion: number;
  limiteConcentracion: number;
  estadoConcentracion: string;
  fechaCalculo: Date;
  fechaRegistro: Date;
  usuarioRegistro: string;
}

export interface L14ReportRequest {
  fechaInicio: string;
  fechaFin: string;
  tipoDeposito?: string;
}

export interface L14ReportResponse {
  id: number;
  totalRegistros: number;
  valorTotalDepositos: number;
  concentracionPromedio: number;
  clientesConcentrados: number;
  cumplimiento: string;
  fechaGeneracion: string;
  datos: L14ConcentracionDepositos[];
}

export interface L14Summary {
  totalClientes: number;
  valorTotalDepositos: number;
  concentracionPromedio: number;
}

export interface L14ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} 
