/**
 * Tabla 15 - Tipo de Inversión de Accionistas
 * Manual Técnico de Generalidades sobre Estructuras de Datos Codificación - Tablas
 * Fecha Actualización: 17/02/2022 - Versión: 13.3
 */

export interface Tabla15TipoInversionAccionistas {
  codigo: string;
  descripcion: string;
}

export const TABLA_15_TIPO_INVERSION_ACCIONISTAS: Tabla15TipoInversionAccionistas[] = [
  {
    codigo: '1',
    descripcion: 'NACIONAL .SI LA REALIZAN INVERSIONISTAS NACIONALES.'
  },
  {
    codigo: '2',
    descripcion: 'EXTRANJERO SI LA REALIZAN INVERSIONISTAS EXTRANJEROS.'
  },
  {
    codigo: '3',
    descripcion: 'SUBREGIONAL SI LA REALIZAN PERSONAS NATURALES O JURÍDICAS QUE PERTENECEN AL PACTO ANDINO.'
  },
  {
    codigo: '4',
    descripcion: 'NEUTRO SI LA REALIZAN ENTIDADES DESTINADAS AL DESARROLLO INTERNACIONAL, COMO POR EJEMPLO LA CORPORACIÓN FINANCIERA INTERNACIONAL QUE PERTENECE AL BANCO MUNDIAL.'
  }
];

export const getTabla15TipoInversionAccionistas = (): Tabla15TipoInversionAccionistas[] => {
  return TABLA_15_TIPO_INVERSION_ACCIONISTAS;
};

export const getTabla15TipoInversionAccionistasByCodigo = (codigo: string): Tabla15TipoInversionAccionistas | undefined => {
  return TABLA_15_TIPO_INVERSION_ACCIONISTAS.find(item => item.codigo === codigo);
};

export const getTabla15TipoInversionAccionistasDescripcion = (codigo: string): string => {
  const item = getTabla15TipoInversionAccionistasByCodigo(codigo);
  return item ? item.descripcion : '';
}; 