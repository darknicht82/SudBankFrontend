// ========================================
// MODELO L01 - FRONTEND
// ========================================
// Propósito: Modelo de datos para L01
// Código Banco: 1038 (Banco Sudamericano)
// 
// CAMPOS OFICIALES SEGÚN MANUAL L01-L06:
// 1. Tipo de identificación (caracter 1) - Tabla 4
// 2. Identificación (caracter 13) - Tabla 164
// 3. Clasificación (numérico 1) - Tabla 173
// 4. Tipo de emisor (numérico 1) - Tabla 73
//
// Autor: Christian Aguirre
// Fecha: 2025-01-08

export interface L01Data {
    id?: number;
    tipoIdentificacion: string;           // Campo 1: Tipo de identificación (R/X)
    identificacion: string;               // Campo 2: Identificación (RUC o código extranjero)
    clasificacion: number;                // Campo 3: Clasificación (Tabla 173)
    tipoEmisor: number;                   // Campo 4: Tipo de emisor (Tabla 73)
    fechaCreacion?: Date;
    usuarioCreacion?: string;
    fechaModificacion?: Date;
    usuarioModificacion?: string;
}

export interface L01ReportRequest {
    tipoIdentificacion?: string;          // R = Ecuador, X = Extranjero
    identificacion?: string;
    clasificacion?: number;               // Tabla 173
    tipoEmisor?: number;                  // Tabla 73
    fechaInicio?: Date;
    fechaFin?: Date;
}

export interface L01ReportResponse {
    success: boolean;
    data: L01Data[];
    message?: string;
    total?: number;
    totalRegistros?: number;
    clientesActivos?: number;
    nuevosEsteMes?: number;
    actualizacionesRecientes?: number;
}

// ========================================
// INTERFACES ADICIONALES PARA BACKEND
// ========================================

export interface L01CreateRequest {
    tipoIdentificacion: string;
    identificacion: string;
    clasificacion: number;
    tipoEmisor: number;
}

export interface L01UpdateRequest {
    tipoIdentificacion?: string;
    identificacion?: string;
    clasificacion?: number;
    tipoEmisor?: number;
}

export interface L01SearchRequest {
    tipoIdentificacion?: string;
    identificacion?: string;
    clasificacion?: number;
    tipoEmisor?: number;
    fechaInicio?: Date;
    fechaFin?: Date;
    page?: number;
    size?: number;
    sort?: string;
} 