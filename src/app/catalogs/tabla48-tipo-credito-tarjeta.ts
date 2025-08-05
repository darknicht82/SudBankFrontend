/**
 * MANUAL TÉCNICO DE GENERALIDADES SOBRE ESTRUCTURAS DE DATOS CODIFICACIÓN - TABLAS
 * FECHA ACTUALIZACIÓN: 17/02/2022
 * VERSIÓN: 13.3
 * 
 * TABLA 48 - TIPO DE CRÉDITO CON TARJETA
 * 
 * Esta tabla contiene los códigos para identificar los diferentes tipos de crédito con tarjeta
 * utilizados en las operaciones bancarias y reportes regulatorios.
 */

export interface TipoCreditoTarjeta {
  codigo: string;
  descripcion: string;
}

/**
 * Datos oficiales de la Tabla 48 - Tipo de Crédito con Tarjeta
 * Fuente: Manual Técnico de Generalidades sobre Estructuras de Datos Codificación - Tablas
 * Fecha: 17/02/2022 - Versión 13.3
 */
export const TABLA_48_TIPO_CREDITO_TARJETA: TipoCreditoTarjeta[] = [
  { codigo: 'CO', descripcion: 'CRÉDITO CORRIENTE' },
  { codigo: 'DI3', descripcion: 'DIFERIDO PROPIO CON INTERES A 3 MESES' },
  { codigo: 'DI6', descripcion: 'DIFERIDO PROPIO CON INTERES A 6 MESES' },
  { codigo: 'DI9', descripcion: 'DIFERIDO PROPIO CON INTERES A 9 MESES' },
  { codigo: 'DI12', descripcion: 'DIFERIDO PROPIO CON INTERES A 12 MESES' },
  { codigo: 'DI18', descripcion: 'DIFERIDO PROPIO CON INTERES A 18 MESES' },
  { codigo: 'DI24', descripcion: 'DIFERIDO PROPIO CON INTERES A 24 MESES' },
  { codigo: 'DI36', descripcion: 'DIFERIDO PROPIO CON INTERES A 36 MESES O MAS' },
  { codigo: 'DS', descripcion: 'DIFERIDO PROPIO SIN INTERES' },
  { codigo: 'DA', descripcion: 'DIFERIDO DE ESTABLECIMIENTOS' },
  { codigo: 'RO', descripcion: 'CREDITO ROTATIVO (CARTERA)' },
  { codigo: 'CR', descripcion: 'CREDITO ROTATIVO A TARJETAHABIENTES (CONTINGENTE)' },
  { codigo: 'DC', descripcion: 'DOCUMENTOS POR COBRAR' },
  { codigo: 'FI', descripcion: 'FIDEICOMISO' }
];

/**
 * Obtiene todos los tipos de crédito con tarjeta
 * @returns Array con todos los tipos de crédito con tarjeta
 */
export function obtenerTiposCreditoTarjeta(): TipoCreditoTarjeta[] {
  return TABLA_48_TIPO_CREDITO_TARJETA;
}

/**
 * Obtiene un tipo de crédito con tarjeta por código
 * @param codigo - Código del tipo de crédito
 * @returns Tipo de crédito con tarjeta o undefined si no existe
 */
export function obtenerTipoCreditoTarjetaPorCodigo(codigo: string): TipoCreditoTarjeta | undefined {
  return TABLA_48_TIPO_CREDITO_TARJETA.find(tipo => tipo.codigo === codigo);
}

/**
 * Obtiene tipos de crédito con tarjeta que contengan el texto en la descripción
 * @param texto - Texto a buscar en la descripción
 * @returns Array con los tipos de crédito que coincidan
 */
export function buscarTiposCreditoTarjeta(texto: string): TipoCreditoTarjeta[] {
  const textoBusqueda = texto.toLowerCase();
  return TABLA_48_TIPO_CREDITO_TARJETA.filter(tipo => 
    tipo.descripcion.toLowerCase().includes(textoBusqueda)
  );
}

/**
 * Obtiene tipos de crédito diferido
 * @returns Array con los tipos de crédito diferido
 */
export function obtenerTiposCreditoDiferido(): TipoCreditoTarjeta[] {
  return TABLA_48_TIPO_CREDITO_TARJETA.filter(tipo => 
    tipo.codigo.startsWith('DI') || tipo.codigo === 'DS' || tipo.codigo === 'DA'
  );
}

/**
 * Obtiene tipos de crédito rotativo
 * @returns Array con los tipos de crédito rotativo
 */
export function obtenerTiposCreditoRotativo(): TipoCreditoTarjeta[] {
  return TABLA_48_TIPO_CREDITO_TARJETA.filter(tipo => 
    tipo.codigo === 'RO' || tipo.codigo === 'CR'
  );
} 