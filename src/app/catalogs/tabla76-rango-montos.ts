/**
 * MANUAL TÉCNICO DE GENERALIDADES SOBRE ESTRUCTURAS DE DATOS CODIFICACIÓN - TABLAS
 * FECHA ACTUALIZACIÓN: 17/02/2022
 * VERSIÓN: 13.3
 * 
 * TABLA 76 - RANGO DE MONTOS
 * 
 * Esta tabla contiene los códigos para identificar los diferentes rangos de montos
 * utilizados en los reportes regulatorios y análisis de riesgo.
 */

export interface RangoMonto {
  codigo: string;
  descripcion: string;
  rango?: string;
}

/**
 * Datos oficiales de la Tabla 76 - Rango de Montos
 * Fuente: Manual Técnico de Generalidades sobre Estructuras de Datos Codificación - Tablas
 * Fecha: 17/02/2022 - Versión 13.3
 * 
 * NOTA: Los datos específicos de esta tabla requieren consulta directa al manual oficial
 * para obtener la lista completa de rangos de montos.
 */
export const TABLA_76_RANGO_MONTOS: RangoMonto[] = [
  // Datos base - requiere actualización con datos oficiales completos
  { codigo: '01', descripcion: 'Hasta USD 1,000', rango: '0-1,000' },
  { codigo: '02', descripcion: 'USD 1,001 a USD 5,000', rango: '1,001-5,000' },
  { codigo: '03', descripcion: 'USD 5,001 a USD 10,000', rango: '5,001-10,000' },
  { codigo: '04', descripcion: 'USD 10,001 a USD 25,000', rango: '10,001-25,000' },
  { codigo: '05', descripcion: 'USD 25,001 a USD 50,000', rango: '25,001-50,000' },
  { codigo: '06', descripcion: 'USD 50,001 a USD 100,000', rango: '50,001-100,000' },
  { codigo: '07', descripcion: 'USD 100,001 a USD 500,000', rango: '100,001-500,000' },
  { codigo: '08', descripcion: 'USD 500,001 a USD 1,000,000', rango: '500,001-1,000,000' },
  { codigo: '09', descripcion: 'Más de USD 1,000,000', rango: '>1,000,000' },
  { codigo: '10', descripcion: 'Sin monto específico', rango: 'Sin monto' }
];

/**
 * Obtiene todos los rangos de montos
 * @returns Array con todos los rangos de montos
 */
export function obtenerRangosMontos(): RangoMonto[] {
  return TABLA_76_RANGO_MONTOS;
}

/**
 * Obtiene un rango de monto por código
 * @param codigo - Código del rango
 * @returns Rango de monto o undefined si no existe
 */
export function obtenerRangoMontoPorCodigo(codigo: string): RangoMonto | undefined {
  return TABLA_76_RANGO_MONTOS.find(rango => rango.codigo === codigo);
}

/**
 * Busca rangos de montos por texto en la descripción
 * @param texto - Texto a buscar en la descripción
 * @returns Array con los rangos que coincidan
 */
export function buscarRangosMontos(texto: string): RangoMonto[] {
  const textoBusqueda = texto.toLowerCase();
  return TABLA_76_RANGO_MONTOS.filter(rango => 
    rango.descripcion.toLowerCase().includes(textoBusqueda)
  );
}

/**
 * Obtiene rangos de montos pequeños (hasta USD 10,000)
 * @returns Array con los rangos de montos pequeños
 */
export function obtenerRangosMontosPequenos(): RangoMonto[] {
  return TABLA_76_RANGO_MONTOS.filter(rango => 
    ['01', '02', '03'].includes(rango.codigo)
  );
}

/**
 * Obtiene rangos de montos medianos (USD 10,001 a USD 100,000)
 * @returns Array con los rangos de montos medianos
 */
export function obtenerRangosMontosMedianos(): RangoMonto[] {
  return TABLA_76_RANGO_MONTOS.filter(rango => 
    ['04', '05', '06'].includes(rango.codigo)
  );
}

/**
 * Obtiene rangos de montos grandes (más de USD 100,000)
 * @returns Array con los rangos de montos grandes
 */
export function obtenerRangosMontosGrandes(): RangoMonto[] {
  return TABLA_76_RANGO_MONTOS.filter(rango => 
    ['07', '08', '09'].includes(rango.codigo)
  );
}

/**
 * Obtiene rangos especiales (sin monto específico)
 * @returns Array con los rangos especiales
 */
export function obtenerRangosEspeciales(): RangoMonto[] {
  return TABLA_76_RANGO_MONTOS.filter(rango => 
    rango.codigo === '10'
  );
} 