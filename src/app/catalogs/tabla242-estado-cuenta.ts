/**
 * Catálogo Oficial - Tabla 242: Estado de la Cuenta o del Depósito
 * 
 * Este catálogo define los diferentes estados de las cuentas y depósitos
 * en el sistema financiero.
 * 
 * Fuente: Manual de Reportes Regulatorios - SudBank
 * Versión: 2024
 */

export interface EstadoCuenta {
  codigo: string;
  descripcion: string;
}

export const ESTADOS_CUENTA: EstadoCuenta[] = [
  { codigo: 'A', descripcion: 'Activa' },
  { codigo: 'I', descripcion: 'Inactiva' },
  { codigo: 'B', descripcion: 'Bloqueada' },
  { codigo: 'C', descripcion: 'Cancelada' },
  { codigo: 'S', descripcion: 'Suspendida' },
  { codigo: 'P', descripcion: 'En proceso de cancelación' }
];

export const getEstadosCuenta = (): EstadoCuenta[] => {
  return ESTADOS_CUENTA;
};

export const getEstadoCuentaByCodigo = (codigo: string): EstadoCuenta | undefined => {
  return ESTADOS_CUENTA.find(item => item.codigo === codigo);
};

export const getEstadoCuentaDescripcion = (codigo: string): string => {
  const item = getEstadoCuentaByCodigo(codigo);
  return item ? item.descripcion : '';
};

export const getEstadosCuentaActivas = (): EstadoCuenta[] => {
  return ESTADOS_CUENTA.filter(item => ['A'].includes(item.codigo));
};

export const getEstadosCuentaInactivas = (): EstadoCuenta[] => {
  return ESTADOS_CUENTA.filter(item => ['I', 'B', 'S'].includes(item.codigo));
};

export const getEstadosCuentaCanceladas = (): EstadoCuenta[] => {
  return ESTADOS_CUENTA.filter(item => ['C', 'P'].includes(item.codigo));
}; 