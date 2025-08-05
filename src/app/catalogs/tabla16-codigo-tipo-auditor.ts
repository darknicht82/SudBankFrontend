/**
 * Tabla 16 - Código del Tipo de Auditor
 * Manual Técnico de Generalidades sobre Estructuras de Datos Codificación - Tablas
 * Fecha Actualización: 17/02/2022 - Versión: 13.3
 */

export interface Tabla16CodigoTipoAuditor {
  codigo: string;
  descripcion: string;
}

export const TABLA_16_CODIGO_TIPO_AUDITOR: Tabla16CodigoTipoAuditor[] = [
  {
    codigo: 'O',
    descripcion: 'AUDITOR INTERNO'
  },
  {
    codigo: 'I',
    descripcion: 'AUDITOR INTERNO SUPLENTE'
  }
];

export const getTabla16CodigoTipoAuditor = (): Tabla16CodigoTipoAuditor[] => {
  return TABLA_16_CODIGO_TIPO_AUDITOR;
};

export const getTabla16CodigoTipoAuditorByCodigo = (codigo: string): Tabla16CodigoTipoAuditor | undefined => {
  return TABLA_16_CODIGO_TIPO_AUDITOR.find(item => item.codigo === codigo);
};

export const getTabla16CodigoTipoAuditorDescripcion = (codigo: string): string => {
  const item = getTabla16CodigoTipoAuditorByCodigo(codigo);
  return item ? item.descripcion : '';
}; 