/**
 * Tabla 10 - Código del Tipo de Cargo
 * Manual Técnico de Generalidades sobre Estructuras de Datos Codificación - Tablas
 * Fecha Actualización: 17/02/2022 - Versión: 13.3
 */

export interface Tabla10TipoCargo {
  codigo: string;
  descripcion: string;
}

export const TABLA_10_TIPO_CARGO: Tabla10TipoCargo[] = [
  {
    codigo: '1',
    descripcion: 'DIRECTORIO'
  },
  {
    codigo: '2',
    descripcion: 'EJECUTIVO'
  },
  {
    codigo: '3',
    descripcion: 'ADMINISTRATIVO'
  },
  {
    codigo: '4',
    descripcion: 'OPERATIVO'
  },
  {
    codigo: '5',
    descripcion: 'AUDITORIA'
  }
];

export const getTabla10TipoCargo = (): Tabla10TipoCargo[] => {
  return TABLA_10_TIPO_CARGO;
};

export const getTabla10TipoCargoByCodigo = (codigo: string): Tabla10TipoCargo | undefined => {
  return TABLA_10_TIPO_CARGO.find(item => item.codigo === codigo);
};

export const getTabla10TipoCargoDescripcion = (codigo: string): string => {
  const item = getTabla10TipoCargoByCodigo(codigo);
  return item ? item.descripcion : '';
}; 