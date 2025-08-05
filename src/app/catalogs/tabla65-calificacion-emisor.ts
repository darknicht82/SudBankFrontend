/**
 * Tabla 65 - Calificación del Emisor
 * Manual Técnico de Generalidades sobre Estructuras de Datos Codificación - Tablas
 * Fecha Actualización: 17/02/2022 - Versión: 13.3
 */

export interface Tabla65CalificacionEmisor {
  codigo: string;
  descripcion: string;
}

export const TABLA_65_CALIFICACION_EMISOR: Tabla65CalificacionEmisor[] = [
  {
    codigo: 'A',
    descripcion: 'Excelente'
  },
  {
    codigo: 'B',
    descripcion: 'Buena'
  },
  {
    codigo: 'C',
    descripcion: 'Regular'
  },
  {
    codigo: 'D',
    descripcion: 'Deficiente'
  },
  {
    codigo: 'E',
    descripcion: 'Dudoso'
  },
  {
    codigo: 'F',
    descripcion: 'Pérdida'
  },
  {
    codigo: 'G',
    descripcion: 'Sin Calificación'
  }
];

export const getTabla65CalificacionEmisor = (): Tabla65CalificacionEmisor[] => {
  return TABLA_65_CALIFICACION_EMISOR;
};

export const getTabla65CalificacionEmisorByCodigo = (codigo: string): Tabla65CalificacionEmisor | undefined => {
  return TABLA_65_CALIFICACION_EMISOR.find(item => item.codigo === codigo);
};

export const getTabla65CalificacionEmisorDescripcion = (codigo: string): string => {
  const item = getTabla65CalificacionEmisorByCodigo(codigo);
  return item ? item.descripcion : '';
};

// Funciones específicas para L08
export const getDescripcionCalificacionEmisor = (codigo: string): string => {
  return getTabla65CalificacionEmisorDescripcion(codigo);
};

export const isValidCalificacionEmisor = (codigo: string): boolean => {
  return TABLA_65_CALIFICACION_EMISOR.some(item => item.codigo === codigo);
}; 