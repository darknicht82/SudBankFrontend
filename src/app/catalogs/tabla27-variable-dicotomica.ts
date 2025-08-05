/**
 * TABLA 27 - VARIABLE DICOTÓMICA
 * Manual Técnico de Generalidades sobre Estructuras de Datos Codificación - Tablas
 * Fecha Actualización: 17/02/2022 - Versión: 13.3
 * Superintendencia de Bancos del Ecuador
 */

export interface Tabla27VariableDicotomica {
  codigo: string;
  descripcion: string;
  estado: 'ACTIVA' | 'INACTIVA';
}

export const TABLA_27_VARIABLE_DICOTOMICA: Tabla27VariableDicotomica[] = [
  { codigo: 'S', descripcion: 'SI', estado: 'ACTIVA' },
  { codigo: 'N', descripcion: 'NO', estado: 'ACTIVA' }
];

// ============================================================================
// FUNCIONES DE CONSULTA Y VALIDACIÓN
// ============================================================================

export const getTabla27VariableDicotomica = (): Tabla27VariableDicotomica[] => {
  return TABLA_27_VARIABLE_DICOTOMICA;
};

export const getTabla27VariableDicotomicaByCodigo = (codigo: string): Tabla27VariableDicotomica | undefined => {
  return TABLA_27_VARIABLE_DICOTOMICA.find(item => item.codigo === codigo);
};

export const getTabla27VariableDicotomicaDescripcion = (codigo: string): string => {
  const item = getTabla27VariableDicotomicaByCodigo(codigo);
  return item ? item.descripcion : '';
};

export const getTabla27VariablesDicotomicasActivas = (): Tabla27VariableDicotomica[] => {
  return TABLA_27_VARIABLE_DICOTOMICA.filter(item => item.estado === 'ACTIVA');
};

export const isTabla27VariableDicotomicaValida = (codigo: string): boolean => {
  return TABLA_27_VARIABLE_DICOTOMICA.some(item => item.codigo === codigo && item.estado === 'ACTIVA');
}; 