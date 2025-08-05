/**
 * Catálogo Oficial - Tabla 213: Tipo de Vivienda
 * 
 * Este catálogo define los diferentes tipos de vivienda para la clasificación
 * de clientes en el sistema financiero.
 * 
 * Fuente: Manual de Reportes Regulatorios - SudBank
 * Versión: 2024
 */

export interface TipoVivienda {
  codigo: string;
  descripcion: string;
}

export const TIPOS_VIVIENDA: TipoVivienda[] = [
  { codigo: 'P', descripcion: 'Propia hipotecada' },
  { codigo: 'N', descripcion: 'Propia no hipotecada' },
  { codigo: 'A', descripcion: 'Arrendada' },
  { codigo: 'S', descripcion: 'Prestada' },
  { codigo: 'F', descripcion: 'Vive con familiares' },
  { codigo: 'I', descripcion: 'Solamente para uso del BIESS' }
];

export const getTiposVivienda = (): TipoVivienda[] => {
  return TIPOS_VIVIENDA;
};

export const getTipoViviendaByCodigo = (codigo: string): TipoVivienda | undefined => {
  return TIPOS_VIVIENDA.find(item => item.codigo === codigo);
};

export const getTipoViviendaDescripcion = (codigo: string): string => {
  const item = getTipoViviendaByCodigo(codigo);
  return item ? item.descripcion : '';
};

export const getTiposViviendaPropia = (): TipoVivienda[] => {
  return TIPOS_VIVIENDA.filter(item => ['P', 'N'].includes(item.codigo));
};

export const getTiposViviendaAlquilada = (): TipoVivienda[] => {
  return TIPOS_VIVIENDA.filter(item => ['A', 'S'].includes(item.codigo));
}; 