/**
 * Tabla 31 - Tipo de Crédito
 * Manual Técnico de Generalidades sobre Estructuras de Datos Codificación - Tablas
 * Fecha Actualización: 17/02/2022 - Versión: 13.3
 * Aplica desde el 01 de Mayo de 2021
 */

export interface Tabla31TipoCredito {
  codigo: string;
  descripcion: string;
  aplicaDesde: string;
  categoria: string;
}

export const TABLA_31_TIPO_CREDITO: Tabla31TipoCredito[] = [
  // IFIS - Aplica desde 01/05/2021
  { codigo: 'CR', descripcion: 'Productivo corporativo', aplicaDesde: '01/05/2021', categoria: 'IFIS' },
  { codigo: 'CM', descripcion: 'Productivo empresarial', aplicaDesde: '01/05/2021', categoria: 'IFIS' },
  { codigo: 'CY', descripcion: 'Productivo pymes', aplicaDesde: '01/05/2021', categoria: 'IFIS' },
  { codigo: 'CO', descripcion: 'Consumo', aplicaDesde: '01/05/2021', categoria: 'IFIS' },
  { codigo: 'ED', descripcion: 'Educativo', aplicaDesde: '01/05/2021', categoria: 'IFIS' },
  { codigo: 'ES', descripcion: 'Educativo social', aplicaDesde: '01/05/2021', categoria: 'IFIS' },
  { codigo: 'VP', descripcion: 'Vivienda interés público', aplicaDesde: '01/05/2021', categoria: 'IFIS' },
  { codigo: 'VS', descripcion: 'Vivienda de interés social', aplicaDesde: '01/05/2021', categoria: 'IFIS' },
  { codigo: 'IN', descripcion: 'Inmobiliario', aplicaDesde: '01/05/2021', categoria: 'IFIS' },
  { codigo: 'MM', descripcion: 'Microcrédito minorista', aplicaDesde: '01/05/2021', categoria: 'IFIS' },
  { codigo: 'MS', descripcion: 'Microcrédito de acumulación simple', aplicaDesde: '01/05/2021', categoria: 'IFIS' },
  { codigo: 'MA', descripcion: 'Microcrédito de acumulación ampliada', aplicaDesde: '01/05/2021', categoria: 'IFIS' },
  { codigo: 'IP', descripcion: 'Inversión pública', aplicaDesde: '01/05/2021', categoria: 'IFIS' },
  
  // BIESS Y ENTIDADES DE SEGURIDAD SOCIAL
  { codigo: 'P', descripcion: 'Prendarios', aplicaDesde: '01/05/2021', categoria: 'BIESS' },
  { codigo: 'H', descripcion: 'Hipotecarios Ordinarios', aplicaDesde: '01/05/2021', categoria: 'BIESS' },
  { codigo: 'Q', descripcion: 'Quirografarios', aplicaDesde: '01/05/2021', categoria: 'BIESS' },
  { codigo: 'HS', descripcion: 'Hipotecarios - Interés Social', aplicaDesde: '01/05/2021', categoria: 'BIESS' },
  { codigo: 'HI', descripcion: 'Hipotecarios - Interés Público', aplicaDesde: '01/05/2021', categoria: 'BIESS' }
];

export const getTabla31TipoCredito = (): Tabla31TipoCredito[] => {
  return TABLA_31_TIPO_CREDITO;
};

export const getTabla31TipoCreditoByCodigo = (codigo: string): Tabla31TipoCredito | undefined => {
  return TABLA_31_TIPO_CREDITO.find(item => item.codigo === codigo);
};

export const getTabla31TipoCreditoDescripcion = (codigo: string): string => {
  const item = getTabla31TipoCreditoByCodigo(codigo);
  return item ? item.descripcion : '';
};

export const getTabla31TiposCreditoByCategoria = (categoria: string): Tabla31TipoCredito[] => {
  return TABLA_31_TIPO_CREDITO.filter(item => item.categoria === categoria);
};

export const getTabla31TiposCreditoVigentes = (): Tabla31TipoCredito[] => {
  return TABLA_31_TIPO_CREDITO.filter(item => item.aplicaDesde === '01/05/2021');
}; 