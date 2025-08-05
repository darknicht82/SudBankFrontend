/**
 * Catálogo Oficial - Tabla 47-A: Causa de Eliminación de Garante o Codeudor
 * 
 * Este catálogo define las diferentes causas por las cuales se puede
 * eliminar un garante o codeudor de una operación crediticia.
 * 
 * Fuente: Manual de Reportes Regulatorios - SudBank
 * Versión: 2024
 */

export interface CausaEliminacionGarante {
  codigo: string;
  descripcion: string;
}

export const CAUSAS_ELIMINACION_GARANTE: CausaEliminacionGarante[] = [
  { codigo: 'G', descripcion: 'Sustitución de garante' },
  { codigo: 'U', descripcion: 'Sustitución de garantía' },
  { codigo: 'O', descripcion: 'Orden judicial' },
  { codigo: 'D', descripcion: 'Cancelación del codeudor' }
];

export const getCausasEliminacionGarante = (): CausaEliminacionGarante[] => {
  return CAUSAS_ELIMINACION_GARANTE;
};

export const getCausaEliminacionGaranteByCodigo = (codigo: string): CausaEliminacionGarante | undefined => {
  return CAUSAS_ELIMINACION_GARANTE.find(item => item.codigo === codigo);
};

export const getCausaEliminacionGaranteDescripcion = (codigo: string): string => {
  const item = getCausaEliminacionGaranteByCodigo(codigo);
  return item ? item.descripcion : '';
}; 