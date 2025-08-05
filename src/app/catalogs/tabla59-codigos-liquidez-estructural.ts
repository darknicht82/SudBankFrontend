/**
 * TABLA 59 - CÓDIGOS DE LIQUIDEZ ESTRUCTURAL
 * Manual de Riesgos de Mercado y Liquidez - Marzo 2021
 * Superintendencia de Bancos del Ecuador
 */

export interface CodigoLiquidez {
  codigo: number;
  descripcion: string;
  tipo: 'ACTIVO' | 'PASIVO';
  categoria: string;
}

export const TABLA_59_CODIGOS_LIQUIDEZ: CodigoLiquidez[] = [
  // ACTIVOS - Inversiones mantenidas hasta vencimiento
  { codigo: 130505, descripcion: 'Inversiones mantenidas hasta vencimiento - Títulos de deuda soberana', tipo: 'ACTIVO', categoria: 'Inversiones HTM' },
  { codigo: 130510, descripcion: 'Inversiones mantenidas hasta vencimiento - Títulos de deuda pública', tipo: 'ACTIVO', categoria: 'Inversiones HTM' },
  { codigo: 130515, descripcion: 'Inversiones mantenidas hasta vencimiento - Otros títulos', tipo: 'ACTIVO', categoria: 'Inversiones HTM' },
  
  // ACTIVOS - Inversiones disponibles para venta
  { codigo: 130605, descripcion: 'Inversiones disponibles para venta - Títulos de deuda soberana', tipo: 'ACTIVO', categoria: 'Inversiones AFS' },
  { codigo: 130610, descripcion: 'Inversiones disponibles para venta - Títulos de deuda pública', tipo: 'ACTIVO', categoria: 'Inversiones AFS' },
  { codigo: 130615, descripcion: 'Inversiones disponibles para venta - Otros títulos', tipo: 'ACTIVO', categoria: 'Inversiones AFS' },
  
  // ACTIVOS - Inversiones mantenidas para negociación
  { codigo: 130705, descripcion: 'Inversiones mantenidas para negociación - Títulos de deuda soberana', tipo: 'ACTIVO', categoria: 'Inversiones HFT' },
  { codigo: 130710, descripcion: 'Inversiones mantenidas para negociación - Títulos de deuda pública', tipo: 'ACTIVO', categoria: 'Inversiones HFT' },
  { codigo: 130715, descripcion: 'Inversiones mantenidas para negociación - Otros títulos', tipo: 'ACTIVO', categoria: 'Inversiones HFT' },
  
  // ACTIVOS - Préstamos y anticipos
  { codigo: 140105, descripcion: 'Préstamos y anticipos - Sector público', tipo: 'ACTIVO', categoria: 'Préstamos' },
  { codigo: 140110, descripcion: 'Préstamos y anticipos - Sector privado', tipo: 'ACTIVO', categoria: 'Préstamos' },
  { codigo: 140115, descripcion: 'Préstamos y anticipos - Hogares', tipo: 'ACTIVO', categoria: 'Préstamos' },
  
  // PASIVOS - Depósitos
  { codigo: 210105, descripcion: 'Depósitos a la vista - Sector público', tipo: 'PASIVO', categoria: 'Depósitos' },
  { codigo: 210110, descripcion: 'Depósitos a la vista - Sector privado', tipo: 'PASIVO', categoria: 'Depósitos' },
  { codigo: 210115, descripcion: 'Depósitos a la vista - Hogares', tipo: 'PASIVO', categoria: 'Depósitos' },
  
  // PASIVOS - Depósitos a plazo
  { codigo: 210205, descripcion: 'Depósitos a plazo - Sector público', tipo: 'PASIVO', categoria: 'Depósitos' },
  { codigo: 210210, descripcion: 'Depósitos a plazo - Sector privado', tipo: 'PASIVO', categoria: 'Depósitos' },
  { codigo: 210215, descripcion: 'Depósitos a plazo - Hogares', tipo: 'PASIVO', categoria: 'Depósitos' },
  
  // PASIVOS - Obligaciones financieras
  { codigo: 220105, descripcion: 'Obligaciones financieras - Corto plazo', tipo: 'PASIVO', categoria: 'Obligaciones' },
  { codigo: 220110, descripcion: 'Obligaciones financieras - Largo plazo', tipo: 'PASIVO', categoria: 'Obligaciones' },
  
  // Códigos especiales
  { codigo: 888888, descripcion: 'Otros activos/pasivos no clasificados', tipo: 'ACTIVO', categoria: 'Otros' }
];

/**
 * Función para obtener descripción por código
 */
export function getDescripcionLiquidez(codigo: number): string {
  const item = TABLA_59_CODIGOS_LIQUIDEZ.find(c => c.codigo === codigo);
  return item ? item.descripcion : `Código ${codigo} no encontrado`;
}

/**
 * Función para validar si un código existe
 */
export function isValidCodigoLiquidez(codigo: number): boolean {
  return TABLA_59_CODIGOS_LIQUIDEZ.some(c => c.codigo === codigo);
}

/**
 * Función para obtener códigos por tipo
 */
export function getCodigosPorTipo(tipo: 'ACTIVO' | 'PASIVO'): CodigoLiquidez[] {
  return TABLA_59_CODIGOS_LIQUIDEZ.filter(c => c.tipo === tipo);
}

/**
 * Función para obtener códigos por categoría
 */
export function getCodigosPorCategoria(categoria: string): CodigoLiquidez[] {
  return TABLA_59_CODIGOS_LIQUIDEZ.filter(c => c.categoria === categoria);
}
