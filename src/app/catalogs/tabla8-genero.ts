/**
 * Tabla 8 - Código del Género
 * Manual Técnico de Generalidades sobre Estructuras de Datos Codificación - Tablas
 * Fecha Actualización: 17/02/2022 - Versión: 13.3
 */

export interface Tabla8Genero {
  codigo: string;
  descripcion: string;
}

export const TABLA_8_GENERO: Tabla8Genero[] = [
  {
    codigo: 'M',
    descripcion: 'MASCULINO'
  },
  {
    codigo: 'F',
    descripcion: 'FEMENINO'
  },
  {
    codigo: 'N',
    descripcion: 'No aplica'
  }
];

export const getTabla8Genero = (): Tabla8Genero[] => {
  return TABLA_8_GENERO;
};

export const getTabla8GeneroByCodigo = (codigo: string): Tabla8Genero | undefined => {
  return TABLA_8_GENERO.find(item => item.codigo === codigo);
};

export const getTabla8GeneroDescripcion = (codigo: string): string => {
  const item = getTabla8GeneroByCodigo(codigo);
  return item ? item.descripcion : '';
}; 