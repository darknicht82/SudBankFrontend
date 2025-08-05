/**
 * Tabla 62 - Tipos de Instrumento
 * Manual Técnico de Generalidades sobre Estructuras de Datos Codificación - Tablas
 * Fecha Actualización: 17/02/2022 - Versión: 13.3
 */

export interface Tabla62TiposInstrumento {
  codigo: string;
  descripcion: string;
}

export const TABLA_62_TIPOS_INSTRUMENTO: Tabla62TiposInstrumento[] = [
  {
    codigo: '01',
    descripcion: 'Depósitos a la Vista'
  },
  {
    codigo: '02',
    descripcion: 'Depósitos de Ahorro'
  },
  {
    codigo: '03',
    descripcion: 'Depósitos a Plazo Fijo'
  },
  {
    codigo: '04',
    descripcion: 'Certificados de Depósito'
  },
  {
    codigo: '05',
    descripcion: 'Bonos'
  },
  {
    codigo: '06',
    descripcion: 'Letras del Tesoro'
  },
  {
    codigo: '07',
    descripcion: 'Papel Comercial'
  },
  {
    codigo: '08',
    descripcion: 'Acciones'
  },
  {
    codigo: '09',
    descripcion: 'Fondos de Inversión'
  },
  {
    codigo: '10',
    descripcion: 'Otros Instrumentos'
  }
];

export const getTabla62TiposInstrumento = (): Tabla62TiposInstrumento[] => {
  return TABLA_62_TIPOS_INSTRUMENTO;
};

export const getTabla62TiposInstrumentoByCodigo = (codigo: string): Tabla62TiposInstrumento | undefined => {
  return TABLA_62_TIPOS_INSTRUMENTO.find(item => item.codigo === codigo);
};

export const getTabla62TiposInstrumentoDescripcion = (codigo: string): string => {
  const item = getTabla62TiposInstrumentoByCodigo(codigo);
  return item ? item.descripcion : '';
};

// Funciones específicas para L08
export const getDescripcionTipoInstrumento = (codigo: string): string => {
  return getTabla62TiposInstrumentoDescripcion(codigo);
};

export const isValidTipoInstrumento = (codigo: string): boolean => {
  return TABLA_62_TIPOS_INSTRUMENTO.some(item => item.codigo === codigo);
}; 