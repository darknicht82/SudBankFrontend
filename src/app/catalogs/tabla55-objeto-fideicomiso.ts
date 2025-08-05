/**
 * MANUAL TÉCNICO DE GENERALIDADES SOBRE ESTRUCTURAS DE DATOS CODIFICACIÓN - TABLAS
 * FECHA ACTUALIZACIÓN: 17/02/2022
 * VERSIÓN: 13.3
 * 
 * TABLA 55 - OBJETO DE FIDEICOMISO
 * 
 * Esta tabla contiene los códigos para identificar los diferentes objetos de fideicomiso
 * utilizados en las operaciones bancarias y reportes regulatorios.
 */

export interface ObjetoFideicomiso {
  codigo: string;
  descripcion: string;
}

/**
 * Datos oficiales de la Tabla 55 - Objeto de Fideicomiso
 * Fuente: Manual Técnico de Generalidades sobre Estructuras de Datos Codificación - Tablas
 * Fecha: 17/02/2022 - Versión 13.3
 * 
 * NOTA: Los datos específicos de esta tabla requieren consulta directa al manual oficial
 * para obtener la lista completa de objetos de fideicomiso.
 */
export const TABLA_55_OBJETO_FIDEICOMISO: ObjetoFideicomiso[] = [
  // Datos base - requiere actualización con datos oficiales completos
  { codigo: '01', descripcion: 'FIDEICOMISO DE ADMINISTRACIÓN' },
  { codigo: '02', descripcion: 'FIDEICOMISO DE INVERSIÓN' },
  { codigo: '03', descripcion: 'FIDEICOMISO DE GARANTÍA' },
  { codigo: '04', descripcion: 'FIDEICOMISO DE PAGO' },
  { codigo: '05', descripcion: 'FIDEICOMISO DE SECURITIZACIÓN' },
  { codigo: '06', descripcion: 'FIDEICOMISO DE DESARROLLO INMOBILIARIO' },
  { codigo: '07', descripcion: 'FIDEICOMISO DE GESTIÓN DE ACTIVOS' },
  { codigo: '08', descripcion: 'FIDEICOMISO DE TITULARIZACIÓN' },
  { codigo: '09', descripcion: 'FIDEICOMISO DE FONDOS DE INVERSIÓN' },
  { codigo: '10', descripcion: 'FIDEICOMISO DE PENSIONES' }
];

/**
 * Obtiene todos los objetos de fideicomiso
 * @returns Array con todos los objetos de fideicomiso
 */
export function obtenerObjetosFideicomiso(): ObjetoFideicomiso[] {
  return TABLA_55_OBJETO_FIDEICOMISO;
}

/**
 * Obtiene un objeto de fideicomiso por código
 * @param codigo - Código del objeto
 * @returns Objeto de fideicomiso o undefined si no existe
 */
export function obtenerObjetoFideicomisoPorCodigo(codigo: string): ObjetoFideicomiso | undefined {
  return TABLA_55_OBJETO_FIDEICOMISO.find(objeto => objeto.codigo === codigo);
}

/**
 * Busca objetos de fideicomiso por texto en la descripción
 * @param texto - Texto a buscar en la descripción
 * @returns Array con los objetos que coincidan
 */
export function buscarObjetosFideicomiso(texto: string): ObjetoFideicomiso[] {
  const textoBusqueda = texto.toLowerCase();
  return TABLA_55_OBJETO_FIDEICOMISO.filter(objeto => 
    objeto.descripcion.toLowerCase().includes(textoBusqueda)
  );
}

/**
 * Obtiene fideicomisos de administración
 * @returns Array con los fideicomisos de administración
 */
export function obtenerFideicomisosAdministracion(): ObjetoFideicomiso[] {
  return TABLA_55_OBJETO_FIDEICOMISO.filter(objeto => 
    objeto.codigo === '01'
  );
}

/**
 * Obtiene fideicomisos de inversión
 * @returns Array con los fideicomisos de inversión
 */
export function obtenerFideicomisosInversion(): ObjetoFideicomiso[] {
  return TABLA_55_OBJETO_FIDEICOMISO.filter(objeto => 
    objeto.codigo === '02'
  );
}

/**
 * Obtiene fideicomisos de garantía
 * @returns Array con los fideicomisos de garantía
 */
export function obtenerFideicomisosGarantia(): ObjetoFideicomiso[] {
  return TABLA_55_OBJETO_FIDEICOMISO.filter(objeto => 
    objeto.codigo === '03'
  );
} 