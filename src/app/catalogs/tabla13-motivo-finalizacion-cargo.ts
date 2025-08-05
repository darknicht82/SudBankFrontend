/**
 * Tabla 13 - Motivo de Finalización del Cargo
 * Manual Técnico de Generalidades sobre Estructuras de Datos Codificación - Tablas
 * Fecha Actualización: 17/02/2022 - Versión: 13.3
 */

export interface Tabla13MotivoFinalizacionCargo {
  codigo: string;
  descripcion: string;
}

export const TABLA_13_MOTIVO_FINALIZACION_CARGO: Tabla13MotivoFinalizacionCargo[] = [
  {
    codigo: '0',
    descripcion: 'DESTITUCIÓN DE LA SB'
  },
  {
    codigo: '1',
    descripcion: 'RENUNCIA'
  },
  {
    codigo: '2',
    descripcion: 'ASCENSO'
  },
  {
    codigo: '3',
    descripcion: 'MUERTE'
  },
  {
    codigo: '4',
    descripcion: 'DESPIDO'
  },
  {
    codigo: '5',
    descripcion: 'FINALIZACIÓN DEL CONTRATO O NOMBRAMIENTO'
  },
  {
    codigo: '6',
    descripcion: 'OTROS'
  }
];

export const getTabla13MotivoFinalizacionCargo = (): Tabla13MotivoFinalizacionCargo[] => {
  return TABLA_13_MOTIVO_FINALIZACION_CARGO;
};

export const getTabla13MotivoFinalizacionCargoByCodigo = (codigo: string): Tabla13MotivoFinalizacionCargo | undefined => {
  return TABLA_13_MOTIVO_FINALIZACION_CARGO.find(item => item.codigo === codigo);
};

export const getTabla13MotivoFinalizacionCargoDescripcion = (codigo: string): string => {
  const item = getTabla13MotivoFinalizacionCargoByCodigo(codigo);
  return item ? item.descripcion : '';
}; 