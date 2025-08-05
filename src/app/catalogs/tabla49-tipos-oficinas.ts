/**
 * MANUAL TÉCNICO DE GENERALIDADES SOBRE ESTRUCTURAS DE DATOS CODIFICACIÓN - TABLAS
 * FECHA ACTUALIZACIÓN: 17/02/2022
 * VERSIÓN: 13.3
 * 
 * TABLA 49 - TIPOS DE OFICINAS
 * 
 * Esta tabla contiene los códigos para identificar los diferentes tipos de oficinas
 * bancarias utilizadas en las operaciones y reportes regulatorios.
 */

export interface TipoOficina {
  codigo: string;
  descripcion: string;
}

/**
 * Datos oficiales de la Tabla 49 - Tipos de Oficinas
 * Fuente: Manual Técnico de Generalidades sobre Estructuras de Datos Codificación - Tablas
 * Fecha: 17/02/2022 - Versión 13.3
 */
export const TABLA_49_TIPOS_OFICINAS: TipoOficina[] = [
  { codigo: '01', descripcion: 'MATRIZ' },
  { codigo: '02', descripcion: 'SUCURSAL' },
  { codigo: '03', descripcion: 'AGENCIA' },
  { codigo: '04', descripcion: 'VENTANILLA DE EXTENSION' },
  { codigo: '05', descripcion: 'CAJERO AUTOMATICO FIJO' },
  { codigo: '06', descripcion: 'OTROS' },
  { codigo: '07', descripcion: 'OFICINA DE REPRESENTACION' },
  { codigo: '08', descripcion: 'CONSOLIDADO' },
  { codigo: '09', descripcion: 'CORRESPONCIAL NO BANCARIO' },
  { codigo: '10', descripcion: 'OFICINA' },
  { codigo: '11', descripcion: 'AGENCIA ESPECIAL' },
  { codigo: '12', descripcion: 'AGENCIA MOVIL' },
  { codigo: '13', descripcion: 'CAJERO AUTOMATICO MOVIL' },
  { codigo: '14', descripcion: 'CAJERO AUTOMÁTICO ITINERANTE (TEMPORAL)' }
];

/**
 * Obtiene todos los tipos de oficinas
 * @returns Array con todos los tipos de oficinas
 */
export function obtenerTiposOficinas(): TipoOficina[] {
  return TABLA_49_TIPOS_OFICINAS;
}

/**
 * Obtiene un tipo de oficina por código
 * @param codigo - Código del tipo de oficina
 * @returns Tipo de oficina o undefined si no existe
 */
export function obtenerTipoOficinaPorCodigo(codigo: string): TipoOficina | undefined {
  return TABLA_49_TIPOS_OFICINAS.find(tipo => tipo.codigo === codigo);
}

/**
 * Obtiene tipos de oficinas que contengan el texto en la descripción
 * @param texto - Texto a buscar en la descripción
 * @returns Array con los tipos de oficinas que coincidan
 */
export function buscarTiposOficinas(texto: string): TipoOficina[] {
  const textoBusqueda = texto.toLowerCase();
  return TABLA_49_TIPOS_OFICINAS.filter(tipo => 
    tipo.descripcion.toLowerCase().includes(textoBusqueda)
  );
}

/**
 * Obtiene oficinas principales (Matriz, Sucursal, Agencia)
 * @returns Array con las oficinas principales
 */
export function obtenerOficinasPrincipales(): TipoOficina[] {
  return TABLA_49_TIPOS_OFICINAS.filter(tipo => 
    ['01', '02', '03'].includes(tipo.codigo)
  );
}

/**
 * Obtiene cajeros automáticos
 * @returns Array con los tipos de cajeros automáticos
 */
export function obtenerCajerosAutomaticos(): TipoOficina[] {
  return TABLA_49_TIPOS_OFICINAS.filter(tipo => 
    tipo.codigo === '05' || tipo.codigo === '13' || tipo.codigo === '14'
  );
}

/**
 * Obtiene agencias especiales y móviles
 * @returns Array con las agencias especiales y móviles
 */
export function obtenerAgenciasEspeciales(): TipoOficina[] {
  return TABLA_49_TIPOS_OFICINAS.filter(tipo => 
    tipo.codigo === '11' || tipo.codigo === '12'
  );
} 