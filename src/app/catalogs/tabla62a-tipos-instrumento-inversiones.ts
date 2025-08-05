/**
 * Tabla 62A - Tipos de Instrumento (para Inversiones)
 * Manual Técnico de Generalidades sobre Estructuras de Datos Codificación - Tablas
 * Fecha Actualización: 17/02/2022 - Versión: 13.3
 */

export interface Tabla62aTiposInstrumentoInversiones {
  codigo: string;
  descripcion: string;
}

export const TABLA_62A_TIPOS_INSTRUMENTO_INVERSIONES: Tabla62aTiposInstrumentoInversiones[] = [
  {
    codigo: '01',
    descripcion: 'Bonos Gubernamentales'
  },
  {
    codigo: '02',
    descripcion: 'Bonos Corporativos'
  },
  {
    codigo: '03',
    descripcion: 'Letras del Tesoro'
  },
  {
    codigo: '04',
    descripcion: 'Papel Comercial'
  },
  {
    codigo: '05',
    descripcion: 'Acciones'
  },
  {
    codigo: '06',
    descripcion: 'Fondos de Inversión'
  },
  {
    codigo: '07',
    descripcion: 'Certificados de Depósito'
  },
  {
    codigo: '08',
    descripcion: 'Obligaciones'
  },
  {
    codigo: '09',
    descripcion: 'Warrants'
  },
  {
    codigo: '10',
    descripcion: 'Otros Instrumentos de Inversión'
  }
];

export const getTabla62aTiposInstrumentoInversiones = (): Tabla62aTiposInstrumentoInversiones[] => {
  return TABLA_62A_TIPOS_INSTRUMENTO_INVERSIONES;
};

export const getTabla62aTiposInstrumentoInversionesByCodigo = (codigo: string): Tabla62aTiposInstrumentoInversiones | undefined => {
  return TABLA_62A_TIPOS_INSTRUMENTO_INVERSIONES.find(item => item.codigo === codigo);
};

export const getTabla62aTiposInstrumentoInversionesDescripcion = (codigo: string): string => {
  const item = getTabla62aTiposInstrumentoInversionesByCodigo(codigo);
  return item ? item.descripcion : '';
}; 