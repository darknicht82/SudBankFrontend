/**
 * Catálogo Oficial - Tabla 42: Tipo de Garantía
 * 
 * Este catálogo define los diferentes tipos de garantías utilizadas en las operaciones
 * crediticias y financieras del sistema bancario ecuatoriano.
 * 
 * Fuente: Manual de Reportes Regulatorios - SudBank
 * Versión: 2024
 */

export interface TipoGarantia {
  codigo: string;
  descripcion: string;
  categoria?: string;
}

export const TIPOS_GARANTIA: TipoGarantia[] = [
  { codigo: 'A11', descripcion: 'QUIROGRAFARIA', categoria: 'PERSONAL' },
  { codigo: 'A12', descripcion: 'PRENDARIA DISTINTA DE JOYAS', categoria: 'REAL' },
  { codigo: 'A13', descripcion: 'HIPOTECARIA', categoria: 'REAL' },
  { codigo: 'A15', descripcion: 'FIDEICOMISO EN GARANTIA', categoria: 'ESPECIAL' },
  { codigo: 'A16', descripcion: 'AVALES Y GARANTÍA DE INSTITUCIONES FINANCIERAS', categoria: 'ESPECIAL' },
  { codigo: 'A17', descripcion: 'TÍTULOS VALORES', categoria: 'ESPECIAL' },
  { codigo: 'A18', descripcion: 'GARANTIA ADECUADA CONSTITUIDA EN EL PAIS', categoria: 'ADECUADA' },
  { codigo: 'A20', descripcion: 'GARANTIA ADECUADA CONSTITUIDA EN EL EXTERIOR', categoria: 'ADECUADA' },
  { codigo: 'A21', descripcion: 'OTRAS GARANTIAS ADECUADAS, QUE INCLUYEN CUENTA INDIVIDUAL (SEGURIDAD SOCIAL)', categoria: 'ADECUADA' },
  { codigo: 'A22', descripcion: 'CASH COLATERAL', categoria: 'ESPECIAL' },
  { codigo: 'A23', descripcion: 'GARANTIAS SOLIDARIAS', categoria: 'PERSONAL' },
  { codigo: 'A32', descripcion: 'PRENDARIA DE JOYAS', categoria: 'REAL' },
  { codigo: 'A33', descripcion: 'FIDUCIARIA', categoria: 'ESPECIAL' },
  { codigo: 'A34', descripcion: 'CERTIFICADOS DE DEPÓSITO DE MERCADERÍA*', categoria: 'ESPECIAL' },
  { codigo: 'A35', descripcion: 'FACTURAS NEGOCIABLES*', categoria: 'ESPECIAL' },
  { codigo: 'A36', descripcion: 'VIVIENDA MISIÓN CASA PARA TODOS*', categoria: 'REAL' },
  { codigo: 'A37', descripcion: 'FONDO NACIONAL DE GARANTIA', categoria: 'ESPECIAL' }
];

export const getTiposGarantia = (): TipoGarantia[] => {
  return TIPOS_GARANTIA;
};

export const getTipoGarantiaByCodigo = (codigo: string): TipoGarantia | undefined => {
  return TIPOS_GARANTIA.find(item => item.codigo === codigo);
};

export const getTipoGarantiaDescripcion = (codigo: string): string => {
  const item = getTipoGarantiaByCodigo(codigo);
  return item ? item.descripcion : '';
};

export const getTiposGarantiaByCategoria = (categoria: string): TipoGarantia[] => {
  return TIPOS_GARANTIA.filter(item => item.categoria === categoria);
};

export const getTiposGarantiaPersonales = (): TipoGarantia[] => {
  return getTiposGarantiaByCategoria('PERSONAL');
};

export const getTiposGarantiaReales = (): TipoGarantia[] => {
  return getTiposGarantiaByCategoria('REAL');
};

export const getTiposGarantiaEspeciales = (): TipoGarantia[] => {
  return getTiposGarantiaByCategoria('ESPECIAL');
};

export const getTiposGarantiaAdecuadas = (): TipoGarantia[] => {
  return getTiposGarantiaByCategoria('ADECUADA');
};

export const getTiposGarantiaBanEcuador = (): TipoGarantia[] => {
  // Los códigos A34 y A36 son de uso exclusivo para BANECUADOR
  return TIPOS_GARANTIA.filter(item => ['A34', 'A36'].includes(item.codigo));
}; 