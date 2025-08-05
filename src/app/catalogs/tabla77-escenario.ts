/**
 * MANUAL TÉCNICO DE GENERALIDADES SOBRE ESTRUCTURAS DE DATOS CODIFICACIÓN - TABLAS
 * FECHA ACTUALIZACIÓN: 17/02/2022
 * VERSIÓN: 13.3
 * 
 * TABLA 77 - ESCENARIO
 * 
 * Esta tabla contiene los códigos para identificar los diferentes escenarios
 * utilizados en los análisis de riesgo y reportes regulatorios.
 */

export interface Escenario {
  codigo: string;
  descripcion: string;
  tipo?: string;
}

/**
 * Datos oficiales de la Tabla 77 - Escenario
 * Fuente: Manual Técnico de Generalidades sobre Estructuras de Datos Codificación - Tablas
 * Fecha: 17/02/2022 - Versión 13.3
 * 
 * NOTA: Los datos específicos de esta tabla requieren consulta directa al manual oficial
 * para obtener la lista completa de escenarios.
 */
export const TABLA_77_ESCENARIO: Escenario[] = [
  // Datos base - requiere actualización con datos oficiales completos
  { codigo: '01', descripcion: 'ESCENARIO BASE', tipo: 'BASE' },
  { codigo: '02', descripcion: 'ESCENARIO ADVERSA', tipo: 'ADVERSA' },
  { codigo: '03', descripcion: 'ESCENARIO SEVERA', tipo: 'SEVERA' },
  { codigo: '04', descripcion: 'ESCENARIO OPTIMISTA', tipo: 'OPTIMISTA' },
  { codigo: '05', descripcion: 'ESCENARIO DE ESTRÉS', tipo: 'ESTRES' },
  { codigo: '06', descripcion: 'ESCENARIO DE CRISIS', tipo: 'CRISIS' },
  { codigo: '07', descripcion: 'ESCENARIO DE RECUPERACIÓN', tipo: 'RECUPERACION' },
  { codigo: '08', descripcion: 'ESCENARIO DE CRECIMIENTO', tipo: 'CRECIMIENTO' },
  { codigo: '09', descripcion: 'ESCENARIO DE ESTABILIDAD', tipo: 'ESTABILIDAD' },
  { codigo: '10', descripcion: 'ESCENARIO PERSONALIZADO', tipo: 'PERSONALIZADO' }
];

/**
 * Obtiene todos los escenarios
 * @returns Array con todos los escenarios
 */
export function obtenerEscenarios(): Escenario[] {
  return TABLA_77_ESCENARIO;
}

/**
 * Obtiene un escenario por código
 * @param codigo - Código del escenario
 * @returns Escenario o undefined si no existe
 */
export function obtenerEscenarioPorCodigo(codigo: string): Escenario | undefined {
  return TABLA_77_ESCENARIO.find(escenario => escenario.codigo === codigo);
}

/**
 * Obtiene escenarios por tipo
 * @param tipo - Tipo de escenario
 * @returns Array con los escenarios del tipo especificado
 */
export function obtenerEscenariosPorTipo(tipo: string): Escenario[] {
  return TABLA_77_ESCENARIO.filter(escenario => escenario.tipo === tipo);
}

/**
 * Busca escenarios por texto en la descripción
 * @param texto - Texto a buscar en la descripción
 * @returns Array con los escenarios que coincidan
 */
export function buscarEscenarios(texto: string): Escenario[] {
  const textoBusqueda = texto.toLowerCase();
  return TABLA_77_ESCENARIO.filter(escenario => 
    escenario.descripcion.toLowerCase().includes(textoBusqueda)
  );
}

/**
 * Obtiene escenarios base
 * @returns Array con los escenarios base
 */
export function obtenerEscenariosBase(): Escenario[] {
  return TABLA_77_ESCENARIO.filter(escenario => 
    escenario.tipo === 'BASE'
  );
}

/**
 * Obtiene escenarios adversos
 * @returns Array con los escenarios adversos
 */
export function obtenerEscenariosAdversos(): Escenario[] {
  return TABLA_77_ESCENARIO.filter(escenario => 
    ['ADVERSA', 'SEVERA', 'CRISIS'].includes(escenario.tipo || '')
  );
}

/**
 * Obtiene escenarios optimistas
 * @returns Array con los escenarios optimistas
 */
export function obtenerEscenariosOptimistas(): Escenario[] {
  return TABLA_77_ESCENARIO.filter(escenario => 
    ['OPTIMISTA', 'CRECIMIENTO', 'RECUPERACION'].includes(escenario.tipo || '')
  );
}

/**
 * Obtiene escenarios de estrés
 * @returns Array con los escenarios de estrés
 */
export function obtenerEscenariosEstres(): Escenario[] {
  return TABLA_77_ESCENARIO.filter(escenario => 
    escenario.tipo === 'ESTRES'
  );
} 