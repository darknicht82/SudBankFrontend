/**
 * Tabla 66 - Calificadoras de Riesgo
 * Manual Técnico de Generalidades sobre Estructuras de Datos Codificación - Tablas
 * Fecha Actualización: 17/02/2022 - Versión: 13.3
 */

export interface Tabla66CalificacionRiesgo {
  codigo: string;
  descripcion: string;
}

export const TABLA_66_CALIFICACION_RIESGO: Tabla66CalificacionRiesgo[] = [
  {
    codigo: '01',
    descripcion: 'Pacific Credit Rating'
  },
  {
    codigo: '02',
    descripcion: 'Fitch Ratings'
  },
  {
    codigo: '03',
    descripcion: 'Standard & Poor\'s'
  },
  {
    codigo: '04',
    descripcion: 'Moody\'s'
  },
  {
    codigo: '05',
    descripcion: 'DBRS'
  },
  {
    codigo: '06',
    descripcion: 'AM Best'
  },
  {
    codigo: '07',
    descripcion: 'Kroll Bond Rating Agency'
  },
  {
    codigo: '08',
    descripcion: 'Egan-Jones'
  },
  {
    codigo: '09',
    descripcion: 'Realpoint'
  },
  {
    codigo: '10',
    descripcion: 'Otras Calificadoras'
  }
];

export const getTabla66CalificacionRiesgo = (): Tabla66CalificacionRiesgo[] => {
  return TABLA_66_CALIFICACION_RIESGO;
};

export const getTabla66CalificacionRiesgoByCodigo = (codigo: string): Tabla66CalificacionRiesgo | undefined => {
  return TABLA_66_CALIFICACION_RIESGO.find(item => item.codigo === codigo);
};

export const getTabla66CalificacionRiesgoDescripcion = (codigo: string): string => {
  const item = getTabla66CalificacionRiesgoByCodigo(codigo);
  return item ? item.descripcion : '';
};

// Funciones específicas para L08
export const getDescripcionCalificadoraRiesgo = (codigo: string): string => {
  return getTabla66CalificacionRiesgoDescripcion(codigo);
};

export const isValidCalificadoraRiesgo = (codigo: string): boolean => {
  return TABLA_66_CALIFICACION_RIESGO.some(item => item.codigo === codigo);
}; 