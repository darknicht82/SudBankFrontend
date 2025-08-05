/**
 * Catálogo Oficial - Tabla 82: Tipos de Transacciones
 * 
 * Este catálogo define los diferentes tipos de transacciones en el sistema financiero.
 * 
 * Fuente: Manual de Reportes Regulatorios - SudBank
 * Versión: 2024
 */

export interface TipoTransaccion {
  codigo: string;
  descripcion: string;
}

export const TIPOS_TRANSACCIONES: TipoTransaccion[] = [
  { codigo: '01', descripcion: 'Depósito' },
  { codigo: '02', descripcion: 'Retiro' },
  { codigo: '03', descripcion: 'Transferencia' },
  { codigo: '04', descripcion: 'Pago de servicios' },
  { codigo: '05', descripcion: 'Pago de tarjeta de crédito' },
  { codigo: '06', descripcion: 'Pago de préstamo' },
  { codigo: '07', descripcion: 'Compra con tarjeta' },
  { codigo: '08', descripcion: 'Avance de efectivo' },
  { codigo: '09', descripcion: 'Pago de intereses' },
  { codigo: '10', descripcion: 'Pago de comisiones' }
];

export const getTiposTransacciones = (): TipoTransaccion[] => {
  return TIPOS_TRANSACCIONES;
};

export const getTipoTransaccionByCodigo = (codigo: string): TipoTransaccion | undefined => {
  return TIPOS_TRANSACCIONES.find(item => item.codigo === codigo);
};

export const getTipoTransaccionDescripcion = (codigo: string): string => {
  const item = getTipoTransaccionByCodigo(codigo);
  return item ? item.descripcion : '';
};

export const getTiposTransaccionesDepositos = (): TipoTransaccion[] => {
  return TIPOS_TRANSACCIONES.filter(item => ['01', '03'].includes(item.codigo));
};

export const getTiposTransaccionesRetiros = (): TipoTransaccion[] => {
  return TIPOS_TRANSACCIONES.filter(item => ['02', '08'].includes(item.codigo));
};

export const getTiposTransaccionesPagos = (): TipoTransaccion[] => {
  return TIPOS_TRANSACCIONES.filter(item => ['04', '05', '06', '09', '10'].includes(item.codigo));
}; 