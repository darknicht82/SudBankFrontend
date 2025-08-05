/**
 * MANUAL TÉCNICO DE GENERALIDADES SOBRE ESTRUCTURAS DE DATOS CODIFICACIÓN - TABLAS
 * FECHA ACTUALIZACIÓN: 17/02/2022
 * VERSIÓN: 13.3
 * 
 * TABLA 79 - FONDO DE INVERSIÓN
 * 
 * Esta tabla contiene los códigos para identificar los diferentes fondos de inversión
 * utilizados en las operaciones bancarias y reportes regulatorios.
 */

export interface FondoInversion {
  codigo: string;
  descripcion: string;
  tipo?: string;
}

/**
 * Datos oficiales de la Tabla 79 - Fondo de Inversión
 * Fuente: Manual Técnico de Generalidades sobre Estructuras de Datos Codificación - Tablas
 * Fecha: 17/02/2022 - Versión 13.3
 * 
 * NOTA: Los datos específicos de esta tabla requieren consulta directa al manual oficial
 * para obtener la lista completa de fondos de inversión.
 */
export const TABLA_79_FONDO_INVERSION: FondoInversion[] = [
  // Datos base - requiere actualización con datos oficiales completos
  { codigo: '001', descripcion: 'FONDO DE INVERSIÓN DE RENTA FIJA', tipo: 'RENTA_FIJA' },
  { codigo: '002', descripcion: 'FONDO DE INVERSIÓN DE RENTA VARIABLE', tipo: 'RENTA_VARIABLE' },
  { codigo: '003', descripcion: 'FONDO DE INVERSIÓN MIXTO', tipo: 'MIXTO' },
  { codigo: '004', descripcion: 'FONDO DE INVERSIÓN DE LIQUIDEZ', tipo: 'LIQUIDEZ' },
  { codigo: '005', descripcion: 'FONDO DE INVERSIÓN DE CRECIMIENTO', tipo: 'CRECIMIENTO' },
  { codigo: '006', descripcion: 'FONDO DE INVERSIÓN DE VALOR', tipo: 'VALOR' },
  { codigo: '007', descripcion: 'FONDO DE INVERSIÓN INTERNACIONAL', tipo: 'INTERNACIONAL' },
  { codigo: '008', descripcion: 'FONDO DE INVERSIÓN SECTORIAL', tipo: 'SECTORIAL' },
  { codigo: '009', descripcion: 'FONDO DE INVERSIÓN TEMÁTICO', tipo: 'TEMATICO' },
  { codigo: '010', descripcion: 'FONDO DE INVERSIÓN ESPECIALIZADO', tipo: 'ESPECIALIZADO' }
];

/**
 * Obtiene todos los fondos de inversión
 * @returns Array con todos los fondos de inversión
 */
export function obtenerFondosInversion(): FondoInversion[] {
  return TABLA_79_FONDO_INVERSION;
}

/**
 * Obtiene un fondo de inversión por código
 * @param codigo - Código del fondo
 * @returns Fondo de inversión o undefined si no existe
 */
export function obtenerFondoInversionPorCodigo(codigo: string): FondoInversion | undefined {
  return TABLA_79_FONDO_INVERSION.find(fondo => fondo.codigo === codigo);
}

/**
 * Obtiene fondos por tipo
 * @param tipo - Tipo de fondo
 * @returns Array con los fondos del tipo especificado
 */
export function obtenerFondosPorTipo(tipo: string): FondoInversion[] {
  return TABLA_79_FONDO_INVERSION.filter(fondo => fondo.tipo === tipo);
}

/**
 * Busca fondos de inversión por texto en la descripción
 * @param texto - Texto a buscar en la descripción
 * @returns Array con los fondos que coincidan
 */
export function buscarFondosInversion(texto: string): FondoInversion[] {
  const textoBusqueda = texto.toLowerCase();
  return TABLA_79_FONDO_INVERSION.filter(fondo => 
    fondo.descripcion.toLowerCase().includes(textoBusqueda)
  );
}

/**
 * Obtiene fondos de renta fija
 * @returns Array con los fondos de renta fija
 */
export function obtenerFondosRentaFija(): FondoInversion[] {
  return TABLA_79_FONDO_INVERSION.filter(fondo => 
    fondo.tipo === 'RENTA_FIJA'
  );
}

/**
 * Obtiene fondos de renta variable
 * @returns Array con los fondos de renta variable
 */
export function obtenerFondosRentaVariable(): FondoInversion[] {
  return TABLA_79_FONDO_INVERSION.filter(fondo => 
    fondo.tipo === 'RENTA_VARIABLE'
  );
}

/**
 * Obtiene fondos mixtos
 * @returns Array con los fondos mixtos
 */
export function obtenerFondosMixtos(): FondoInversion[] {
  return TABLA_79_FONDO_INVERSION.filter(fondo => 
    fondo.tipo === 'MIXTO'
  );
}

/**
 * Obtiene fondos de liquidez
 * @returns Array con los fondos de liquidez
 */
export function obtenerFondosLiquidez(): FondoInversion[] {
  return TABLA_79_FONDO_INVERSION.filter(fondo => 
    fondo.tipo === 'LIQUIDEZ'
  );
} 