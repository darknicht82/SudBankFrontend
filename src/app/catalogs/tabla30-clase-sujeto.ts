/**
 * Tabla 30 - Clase de Sujeto
 * Manual Técnico de Generalidades sobre Estructuras de Datos Codificación - Tablas
 * Fecha Actualización: 17/02/2022 - Versión: 13.3
 */

export interface Tabla30ClaseSujeto {
  codigo: string;
  descripcion: string;
}

export const TABLA_30_CLASE_SUJETO: Tabla30ClaseSujeto[] = [
  {
    codigo: 'N',
    descripcion: 'NATURAL'
  },
  {
    codigo: 'J',
    descripcion: 'JURIDICA'
  },
  {
    codigo: 'P',
    descripcion: 'PATRONO'
  }
];

export const getTabla30ClaseSujeto = (): Tabla30ClaseSujeto[] => {
  return TABLA_30_CLASE_SUJETO;
};

export const getTabla30ClaseSujetoByCodigo = (codigo: string): Tabla30ClaseSujeto | undefined => {
  return TABLA_30_CLASE_SUJETO.find(item => item.codigo === codigo);
};

export const getTabla30ClaseSujetoDescripcion = (codigo: string): string => {
  const item = getTabla30ClaseSujetoByCodigo(codigo);
  return item ? item.descripcion : '';
}; 