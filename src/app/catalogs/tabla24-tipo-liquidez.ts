/**
 * TABLA 24 - TIPO DE LIQUIDEZ
 * Manual Técnico de Generalidades sobre Estructuras de Datos Codificación - Tablas
 * Fecha Actualización: 17/02/2022 - Versión: 13.3
 * Superintendencia de Bancos del Ecuador
 */

export interface Tabla24TipoLiquidez {
  codigo: string;
  descripcion: string;
  estado: 'ACTIVA' | 'INACTIVA';
}

export const TABLA_24_TIPO_LIQUIDEZ: Tabla24TipoLiquidez[] = [
  { codigo: 'A', descripcion: 'AUTOLIQUIDABLE', estado: 'ACTIVA' },
  { codigo: 'C', descripcion: 'LIQUIDABLE A CORTO PLAZO', estado: 'ACTIVA' },
  { codigo: 'M', descripcion: 'LIQUIDABLE A MEDIANO PLAZO', estado: 'ACTIVA' },
  { codigo: 'O', descripcion: 'OTROS', estado: 'ACTIVA' }
];

// ============================================================================
// FUNCIONES DE CONSULTA Y VALIDACIÓN
// ============================================================================

export const getTabla24TipoLiquidez = (): Tabla24TipoLiquidez[] => {
  return TABLA_24_TIPO_LIQUIDEZ;
};

export const getTabla24TipoLiquidezByCodigo = (codigo: string): Tabla24TipoLiquidez | undefined => {
  return TABLA_24_TIPO_LIQUIDEZ.find(item => item.codigo === codigo);
};

export const getTabla24TipoLiquidezDescripcion = (codigo: string): string => {
  const item = getTabla24TipoLiquidezByCodigo(codigo);
  return item ? item.descripcion : '';
};

export const getTabla24TiposLiquidezActivos = (): Tabla24TipoLiquidez[] => {
  return TABLA_24_TIPO_LIQUIDEZ.filter(item => item.estado === 'ACTIVA');
}; 