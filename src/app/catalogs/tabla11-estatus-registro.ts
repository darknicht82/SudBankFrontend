/**
 * Tabla 11 - Estatus del Registro
 * Manual Técnico de Generalidades sobre Estructuras de Datos Codificación - Tablas
 * Fecha Actualización: 17/02/2022 - Versión: 13.3
 */

export interface Tabla11EstatusRegistro {
  codigo: string;
  descripcion: string;
}

export const TABLA_11_ESTATUS_REGISTRO: Tabla11EstatusRegistro[] = [
  {
    codigo: 'I',
    descripcion: 'INSERCIÓN'
  },
  {
    codigo: 'A',
    descripcion: 'ACTUALIZACIÓN'
  },
  {
    codigo: 'E',
    descripcion: 'ELIMINACIÓN'
  },
  {
    codigo: 'G',
    descripcion: 'SE TRASLADA A MORA EN ESTADO DE GLOSA'
  }
];

export const getTabla11EstatusRegistro = (): Tabla11EstatusRegistro[] => {
  return TABLA_11_ESTATUS_REGISTRO;
};

export const getTabla11EstatusRegistroByCodigo = (codigo: string): Tabla11EstatusRegistro | undefined => {
  return TABLA_11_ESTATUS_REGISTRO.find(item => item.codigo === codigo);
};

export const getTabla11EstatusRegistroDescripcion = (codigo: string): string => {
  const item = getTabla11EstatusRegistroByCodigo(codigo);
  return item ? item.descripcion : '';
}; 