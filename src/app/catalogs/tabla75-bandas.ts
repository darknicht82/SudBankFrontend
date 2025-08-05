/**
 * MANUAL TÉCNICO DE GENERALIDADES SOBRE ESTRUCTURAS DE DATOS CODIFICACIÓN - TABLAS
 * FECHA ACTUALIZACIÓN: 17/02/2022
 * VERSIÓN: 13.3
 * 
 * TABLA 75 - BANDAS
 * 
 * Esta tabla contiene los códigos para identificar las diferentes bandas de tiempo
 * utilizadas en los reportes regulatorios y análisis de riesgo.
 */

export interface Banda {
  codigo: string;
  descripcion: string;
  rango?: string;
}

/**
 * Datos oficiales de la Tabla 75 - Bandas
 * Fuente: Manual Técnico de Generalidades sobre Estructuras de Datos Codificación - Tablas
 * Fecha: 17/02/2022 - Versión 13.3
 * 
 * NOTA: Los datos específicos de esta tabla requieren consulta directa al manual oficial
 * para obtener la lista completa de bandas.
 */
export const TABLA_75_BANDAS: Banda[] = [
  // Datos base - requiere actualización con datos oficiales completos
  { codigo: '01', descripcion: 'Hasta 1 día', rango: '0-1 día' },
  { codigo: '02', descripcion: '2 a 7 días', rango: '2-7 días' },
  { codigo: '03', descripcion: '8 a 14 días', rango: '8-14 días' },
  { codigo: '04', descripcion: '15 a 30 días', rango: '15-30 días' },
  { codigo: '05', descripcion: '31 a 90 días', rango: '31-90 días' },
  { codigo: '06', descripcion: '91 a 180 días', rango: '91-180 días' },
  { codigo: '07', descripcion: '181 a 365 días', rango: '181-365 días' },
  { codigo: '08', descripcion: 'Más de 1 año', rango: '>365 días' },
  { codigo: '09', descripcion: 'Sin vencimiento', rango: 'Sin vencimiento' },
  { codigo: '10', descripcion: 'A la vista', rango: 'A la vista' }
];

/**
 * Obtiene todas las bandas
 * @returns Array con todas las bandas
 */
export function obtenerBandas(): Banda[] {
  return TABLA_75_BANDAS;
}

/**
 * Obtiene una banda por código
 * @param codigo - Código de la banda
 * @returns Banda o undefined si no existe
 */
export function obtenerBandaPorCodigo(codigo: string): Banda | undefined {
  return TABLA_75_BANDAS.find(banda => banda.codigo === codigo);
}

/**
 * Busca bandas por texto en la descripción
 * @param texto - Texto a buscar en la descripción
 * @returns Array con las bandas que coincidan
 */
export function buscarBandas(texto: string): Banda[] {
  const textoBusqueda = texto.toLowerCase();
  return TABLA_75_BANDAS.filter(banda => 
    banda.descripcion.toLowerCase().includes(textoBusqueda)
  );
}

/**
 * Obtiene bandas de corto plazo (hasta 30 días)
 * @returns Array con las bandas de corto plazo
 */
export function obtenerBandasCortoPlazo(): Banda[] {
  return TABLA_75_BANDAS.filter(banda => 
    ['01', '02', '03', '04'].includes(banda.codigo)
  );
}

/**
 * Obtiene bandas de mediano plazo (31 a 365 días)
 * @returns Array con las bandas de mediano plazo
 */
export function obtenerBandasMedianoPlazo(): Banda[] {
  return TABLA_75_BANDAS.filter(banda => 
    ['05', '06', '07'].includes(banda.codigo)
  );
}

/**
 * Obtiene bandas de largo plazo (más de 1 año)
 * @returns Array con las bandas de largo plazo
 */
export function obtenerBandasLargoPlazo(): Banda[] {
  return TABLA_75_BANDAS.filter(banda => 
    ['08', '09', '10'].includes(banda.codigo)
  );
}

/**
 * Obtiene bandas especiales (sin vencimiento, a la vista)
 * @returns Array con las bandas especiales
 */
export function obtenerBandasEspeciales(): Banda[] {
  return TABLA_75_BANDAS.filter(banda => 
    ['09', '10'].includes(banda.codigo)
  );
} 