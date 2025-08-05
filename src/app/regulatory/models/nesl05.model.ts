// ========================================
// MODELO NESL05 - FRONTEND
// ========================================
// Propósito: Modelo de datos para L05
// 
// Autor: Christian Aguirre
// Fecha: 2025-01-08

export interface NESL05 {
    id?: number;
    codigoTipoDeposito: number;
    codigoCalificacionRiesgo: number;
    valorDeposito: number;
    fechaApertura: Date;
    fechaVencimiento?: Date;
    fechaCreacion?: Date;
    usuarioCreacion?: string;
    fechaModificacion?: Date;
    usuarioModificacion?: string;
}

export interface NESL05Response {
    success: boolean;
    data: NESL05[];
    message?: string;
    total?: number;
}

export interface NESL05Filters {
    codigoTipoDeposito?: number;
    codigoCalificacionRiesgo?: number;
    fechaAperturaDesde?: Date;
    fechaAperturaHasta?: Date;
    valorDepositoMinimo?: number;
    valorDepositoMaximo?: number;
} 