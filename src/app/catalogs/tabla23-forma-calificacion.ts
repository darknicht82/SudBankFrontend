/**
 * TABLA 23 - FORMA DE CALIFICACIÓN
 * Manual Técnico de Generalidades sobre Estructuras de Datos Codificación - Tablas
 * Fecha Actualización: 17/02/2022 - Versión: 13.3
 * Superintendencia de Bancos del Ecuador
 */

export interface Tabla23FormaCalificacion {
  codigo: string;
  descripcion: string;
  estado: 'ACTIVA' | 'INACTIVA';
}

export const TABLA_23_FORMA_CALIFICACION: Tabla23FormaCalificacion[] = [
  { codigo: 'V', descripcion: 'EVALUACION PROPIA', estado: 'ACTIVA' },
  { codigo: 'H', descripcion: 'HOMOLOGACION', estado: 'ACTIVA' }
];

// ============================================================================
// FUNCIONES DE CONSULTA Y VALIDACIÓN
// ============================================================================

export const getTabla23FormaCalificacion = (): Tabla23FormaCalificacion[] => {
  return TABLA_23_FORMA_CALIFICACION;
};

export const getTabla23FormaCalificacionByCodigo = (codigo: string): Tabla23FormaCalificacion | undefined => {
  return TABLA_23_FORMA_CALIFICACION.find(item => item.codigo === codigo);
};

export const getTabla23FormaCalificacionDescripcion = (codigo: string): string => {
  const item = getTabla23FormaCalificacionByCodigo(codigo);
  return item ? item.descripcion : '';
};

export const getTabla23FormasCalificacionActivas = (): Tabla23FormaCalificacion[] => {
  return TABLA_23_FORMA_CALIFICACION.filter(item => item.estado === 'ACTIVA');
}; 