/**
 * Catálogo Oficial - Tabla 212: Nivel de Estudios
 * 
 * Este catálogo define los diferentes niveles de estudios académicos para
 * la clasificación de clientes en el sistema financiero.
 * 
 * Fuente: Manual de Reportes Regulatorios - SudBank
 * Versión: 2024
 */

export interface NivelEstudios {
  codigo: string;
  descripcion: string;
}

export const NIVELES_ESTUDIOS: NivelEstudios[] = [
  { codigo: 'N', descripcion: 'Sin estudios' },
  { codigo: 'P', descripcion: 'Primaria' },
  { codigo: 'S', descripcion: 'Secundaria' },
  { codigo: 'T', descripcion: 'Formación intermedia (técnica - Tecnología)' },
  { codigo: 'U', descripcion: 'Universitaria' },
  { codigo: 'G', descripcion: 'Postgrado' }
];

export const getNivelesEstudios = (): NivelEstudios[] => {
  return NIVELES_ESTUDIOS;
};

export const getNivelEstudiosByCodigo = (codigo: string): NivelEstudios | undefined => {
  return NIVELES_ESTUDIOS.find(item => item.codigo === codigo);
};

export const getNivelEstudiosDescripcion = (codigo: string): string => {
  const item = getNivelEstudiosByCodigo(codigo);
  return item ? item.descripcion : '';
};

export const getNivelesEstudiosBasicos = (): NivelEstudios[] => {
  return NIVELES_ESTUDIOS.filter(item => ['N', 'P', 'S'].includes(item.codigo));
};

export const getNivelesEstudiosSuperiores = (): NivelEstudios[] => {
  return NIVELES_ESTUDIOS.filter(item => ['T', 'U', 'G'].includes(item.codigo));
}; 