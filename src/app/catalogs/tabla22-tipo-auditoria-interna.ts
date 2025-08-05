/**
 * TABLA 22 - TIPO DE RELACIÓN LABORAL
 * Manual Técnico de Generalidades sobre Estructuras de Datos Codificación - Tablas
 * Fecha Actualización: 17/02/2022 - Versión: 13.3
 * Superintendencia de Bancos del Ecuador
 */

export interface Tabla22TipoRelacionLaboral {
  codigo: string;
  descripcion: string;
  estado: 'ACTIVA' | 'INACTIVA';
}

export const TABLA_22_TIPO_RELACION_LABORAL: Tabla22TipoRelacionLaboral[] = [
  { codigo: 'D', descripcion: 'TIPO DE RELACIÓN DIRECTA', estado: 'ACTIVA' },
  { codigo: 'T', descripcion: 'TIPO DE RELACIÓN POR TERCERIZACIÓN', estado: 'ACTIVA' },
  { codigo: 'I', descripcion: 'INTERMEDIACIÓN LABORAL', estado: 'ACTIVA' }
];

// ============================================================================
// FUNCIONES DE CONSULTA Y VALIDACIÓN
// ============================================================================

export const getTabla22TipoRelacionLaboral = (): Tabla22TipoRelacionLaboral[] => {
  return TABLA_22_TIPO_RELACION_LABORAL;
};

export const getTabla22TipoRelacionLaboralByCodigo = (codigo: string): Tabla22TipoRelacionLaboral | undefined => {
  return TABLA_22_TIPO_RELACION_LABORAL.find(item => item.codigo === codigo);
};

export const getTabla22TipoRelacionLaboralDescripcion = (codigo: string): string => {
  const item = getTabla22TipoRelacionLaboralByCodigo(codigo);
  return item ? item.descripcion : '';
};

export const getTabla22TiposRelacionLaboralActivos = (): Tabla22TipoRelacionLaboral[] => {
  return TABLA_22_TIPO_RELACION_LABORAL.filter(item => item.estado === 'ACTIVA');
}; 