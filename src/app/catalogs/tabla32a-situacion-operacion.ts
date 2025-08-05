/**
 * Catálogo Oficial - Tabla 32-A: Situación de la Operación
 * 
 * Este catálogo define las diferentes situaciones que puede tener
 * una operación crediticia en el sistema financiero.
 * 
 * Fuente: Manual de Reportes Regulatorios - SudBank
 * Versión: 2024
 */

export interface SituacionOperacion {
  codigo: string;
  descripcion: string;
}

export const SITUACIONES_OPERACION: SituacionOperacion[] = [
  { codigo: 'N', descripcion: 'Normal' },
  { codigo: 'C', descripcion: 'Adquirida' },
  { codigo: 'S', descripcion: 'Sustitución de deudor' },
  { codigo: 'M', descripcion: 'Migrada' },
  { codigo: 'D', descripcion: 'Acuerdos concordatarios' },
  { codigo: 'T', descripcion: 'Cartera titularizada' }
];

export const getSituacionesOperacion = (): SituacionOperacion[] => {
  return SITUACIONES_OPERACION;
};

export const getSituacionOperacionByCodigo = (codigo: string): SituacionOperacion | undefined => {
  return SITUACIONES_OPERACION.find(item => item.codigo === codigo);
};

export const getSituacionOperacionDescripcion = (codigo: string): string => {
  const item = getSituacionOperacionByCodigo(codigo);
  return item ? item.descripcion : '';
}; 