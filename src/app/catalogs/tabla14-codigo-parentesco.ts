/**
 * Tabla 14 - Código del Parentesco
 * Manual Técnico de Generalidades sobre Estructuras de Datos Codificación - Tablas
 * Fecha Actualización: 17/02/2022 - Versión: 13.3
 */

export interface Tabla14CodigoParentesco {
  codigo: string;
  descripcion: string;
}

export const TABLA_14_CODIGO_PARENTESCO: Tabla14CodigoParentesco[] = [
  {
    codigo: '1',
    descripcion: 'PADRE / MADRE'
  },
  {
    codigo: '2',
    descripcion: 'HIJO (A)'
  },
  {
    codigo: '3',
    descripcion: 'ABUELO(A)'
  },
  {
    codigo: '4',
    descripcion: 'NIETO(A)'
  },
  {
    codigo: '5',
    descripcion: 'HERMANO(A)'
  },
  {
    codigo: '6',
    descripcion: 'SUEGRO(A)'
  },
  {
    codigo: '7',
    descripcion: 'YERNO'
  },
  {
    codigo: '8',
    descripcion: 'NUERA'
  },
  {
    codigo: '9',
    descripcion: 'CUÑADO(A)'
  },
  {
    codigo: '10',
    descripcion: 'CONYUGE'
  },
  {
    codigo: '11',
    descripcion: 'OTROS'
  }
];

export const getTabla14CodigoParentesco = (): Tabla14CodigoParentesco[] => {
  return TABLA_14_CODIGO_PARENTESCO;
};

export const getTabla14CodigoParentescoByCodigo = (codigo: string): Tabla14CodigoParentesco | undefined => {
  return TABLA_14_CODIGO_PARENTESCO.find(item => item.codigo === codigo);
};

export const getTabla14CodigoParentescoDescripcion = (codigo: string): string => {
  const item = getTabla14CodigoParentescoByCodigo(codigo);
  return item ? item.descripcion : '';
}; 