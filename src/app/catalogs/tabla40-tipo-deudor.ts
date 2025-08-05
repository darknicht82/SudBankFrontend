/**
 * Catálogo Oficial - Tabla 40: Tipo de Deudor
 * 
 * Este catálogo define los diferentes tipos de deudores en las operaciones
 * crediticias del sistema financiero.
 * 
 * Fuente: Manual de Reportes Regulatorios - SudBank
 * Versión: 2024
 */

export interface TipoDeudor {
  codigo: string;
  descripcion: string;
}

export const TIPOS_DEUDOR: TipoDeudor[] = [
  { codigo: 'T', descripcion: 'Titular' },
  { codigo: 'G', descripcion: 'Garante' },
  { codigo: 'C', descripcion: 'Codeudor' }
];

export const getTiposDeudor = (): TipoDeudor[] => {
  return TIPOS_DEUDOR;
};

export const getTipoDeudorByCodigo = (codigo: string): TipoDeudor | undefined => {
  return TIPOS_DEUDOR.find(item => item.codigo === codigo);
};

export const getTipoDeudorDescripcion = (codigo: string): string => {
  const item = getTipoDeudorByCodigo(codigo);
  return item ? item.descripcion : '';
};

export const getTiposDeudorPrincipales = (): TipoDeudor[] => {
  return TIPOS_DEUDOR.filter(item => ['T'].includes(item.codigo));
};

export const getTiposDeudorGarantias = (): TipoDeudor[] => {
  return TIPOS_DEUDOR.filter(item => ['G', 'C'].includes(item.codigo));
}; 