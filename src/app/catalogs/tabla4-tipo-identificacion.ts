/**
 * TABLA 4 - TIPO DE IDENTIFICACIÓN
 * Manual Técnico de Generalidades sobre Estructuras de Datos Codificación - Tablas
 * Fecha Actualización: 17/02/2022 - Versión: 13.3
 * Superintendencia de Bancos del Ecuador
 */

export interface Tabla4TipoIdentificacion {
  codigo: string;
  descripcion: string;
  aplica: 'PERSONA_NATURAL' | 'PERSONA_JURIDICA' | 'AMBOS';
  estado: 'ACTIVA' | 'INACTIVA';
}

export const TABLA_4_TIPO_IDENTIFICACION: Tabla4TipoIdentificacion[] = [
  { codigo: 'C', descripcion: 'Para personas naturales identificadas con la cédula de identidad o ciudadanía.', aplica: 'PERSONA_NATURAL', estado: 'ACTIVA' },
  { codigo: 'R', descripcion: 'Para personas naturales o jurídicas identificadas con el número de RUC.', aplica: 'AMBOS', estado: 'ACTIVA' },
  { codigo: 'E', descripcion: 'Para personas naturales o jurídicas identificadas como extranjeras (asignado por la SB).', aplica: 'AMBOS', estado: 'ACTIVA' },
  { codigo: 'P', descripcion: 'PASAPORTE (Artículo 12, Ley de Extranjería) aplica cuentas corrientes y UAF.', aplica: 'PERSONA_NATURAL', estado: 'ACTIVA' },
  { codigo: 'X', descripcion: 'Personas Jurídicas del exterior. (Para las estructuras de Inversiones).', aplica: 'PERSONA_JURIDICA', estado: 'ACTIVA' }
];

export const getTabla4TipoIdentificacion = (): Tabla4TipoIdentificacion[] => {
  return TABLA_4_TIPO_IDENTIFICACION;
};

export const getTabla4TipoIdentificacionByCodigo = (codigo: string): Tabla4TipoIdentificacion | undefined => {
  return TABLA_4_TIPO_IDENTIFICACION.find(item => item.codigo === codigo);
};

export const getTabla4TipoIdentificacionDescripcion = (codigo: string): string => {
  const item = getTabla4TipoIdentificacionByCodigo(codigo);
  return item ? item.descripcion : '';
};

export const getTabla4TiposIdentificacionByAplica = (aplica: 'PERSONA_NATURAL' | 'PERSONA_JURIDICA' | 'AMBOS'): Tabla4TipoIdentificacion[] => {
  return TABLA_4_TIPO_IDENTIFICACION.filter(item => item.aplica === aplica || item.aplica === 'AMBOS');
};

export const getTabla4TiposIdentificacionActivos = (): Tabla4TipoIdentificacion[] => {
  return TABLA_4_TIPO_IDENTIFICACION.filter(item => item.estado === 'ACTIVA');
}; 