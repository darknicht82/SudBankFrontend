// ========================================
// MODELO NESR01 - FRONTEND
// ========================================
// Propósito: Modelo de datos para R01
// 
// Autor: Christian Aguirre
// Fecha: 2025-01-08

export interface NESR01 {
    id?: number;
    codigoActividadEconomica: number;
    codigoGenero: number;
    codigoEstadoCivil: number;
    patrimonioSujeto: number;
    tiempoResidenciaVivienda?: number;
    codigoRelacionDependenciaLaboral?: number;
    fechaCreacion?: Date;
    usuarioCreacion?: string;
    fechaModificacion?: Date;
    usuarioModificacion?: string;
}

export interface NESR01Response {
    success: boolean;
    data: NESR01[];
    message?: string;
    total?: number;
}

export interface NESR01Filters {
    codigoActividadEconomica?: number;
    codigoGenero?: number;
    codigoEstadoCivil?: number;
    patrimonioSujetoMinimo?: number;
    patrimonioSujetoMaximo?: number;
    tiempoResidenciaVivienda?: number;
} 