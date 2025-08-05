/**
 * Catálogo Oficial - Tabla 314: Tipo de Cuenta
 * 
 * Este catálogo define los diferentes tipos de cuenta para la clasificación
 * de productos bancarios en el sistema financiero.
 * 
 * Fuente: Manual de Reportes Regulatorios - SudBank
 * Versión: 2024
 */

export interface TipoCuenta {
  codigo: string;
  descripcion: string;
}

export const TIPOS_CUENTA: TipoCuenta[] = [
  { codigo: 'A', descripcion: 'Cuenta de Ahorros' },
  { codigo: 'C', descripcion: 'Cuenta Corriente' },
  { codigo: 'D', descripcion: 'Cuenta de Depósito a Plazo' },
  { codigo: 'B', descripcion: 'Cuenta Básica' },
  { codigo: 'T', descripcion: 'Cuenta de Tarjeta de Crédito' },
  { codigo: 'E', descripcion: 'Cuenta de Tarjeta de Débito' },
  { codigo: 'P', descripcion: 'Cuenta de Tarjeta Prepago' }
];

export const getTiposCuenta = (): TipoCuenta[] => {
  return TIPOS_CUENTA;
};

export const getTipoCuentaByCodigo = (codigo: string): TipoCuenta | undefined => {
  return TIPOS_CUENTA.find(item => item.codigo === codigo);
};

export const getTipoCuentaDescripcion = (codigo: string): string => {
  const item = getTipoCuentaByCodigo(codigo);
  return item ? item.descripcion : '';
};

export const getTiposCuentaDepositos = (): TipoCuenta[] => {
  return TIPOS_CUENTA.filter(item => ['A', 'C', 'D', 'B'].includes(item.codigo));
};

export const getTiposCuentaTarjetas = (): TipoCuenta[] => {
  return TIPOS_CUENTA.filter(item => ['T', 'E', 'P'].includes(item.codigo));
}; 