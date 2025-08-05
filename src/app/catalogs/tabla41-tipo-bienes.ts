/**
 * Catálogo Oficial - Tabla 41: Tipo de Bienes
 * 
 * Este catálogo define los diferentes tipos de bienes utilizados como garantía
 * en las operaciones crediticias del sistema financiero.
 * 
 * Fuente: Manual de Reportes Regulatorios - SudBank
 * Versión: 2024
 */

export interface TipoBien {
  codigo: string;
  descripcion: string;
  categoria: string;
}

export const TIPOS_BIENES: TipoBien[] = [
  // BIENES MUEBLES E INMUEBLES
  { codigo: '110', descripcion: 'TERRENOS', categoria: 'INMUEBLE' },
  { codigo: '120', descripcion: 'EDIFICACIONES', categoria: 'INMUEBLE' },
  { codigo: '130', descripcion: 'GALPONES', categoria: 'INMUEBLE' },
  { codigo: '140', descripcion: 'BODEGAS', categoria: 'INMUEBLE' },
  { codigo: '150', descripcion: 'JOYAS', categoria: 'MUEBLE' },
  { codigo: '210', descripcion: 'MOBILIARIO', categoria: 'MUEBLE' },
  { codigo: '220', descripcion: 'EQUIPOS', categoria: 'MUEBLE' },
  { codigo: '230', descripcion: 'MAQUINARIAS', categoria: 'MUEBLE' },
  { codigo: '240', descripcion: 'UNIDADES DE TRANSPORTE', categoria: 'MUEBLE' },
  { codigo: '250', descripcion: 'MERCADERIAS', categoria: 'MUEBLE' },
  { codigo: '260', descripcion: 'OBRAS DE ARTE', categoria: 'MUEBLE' },
  { codigo: '270', descripcion: 'MEMBRESÍAS', categoria: 'MUEBLE' },
  { codigo: '280', descripcion: 'DERECHOS SOBRE POLIZAS', categoria: 'MUEBLE' },

  // TÍTULOS VALORES
  { codigo: '310', descripcion: 'BONOS', categoria: 'TITULO_VALOR' },
  { codigo: '320', descripcion: 'CEDULAS', categoria: 'TITULO_VALOR' },
  { codigo: '325', descripcion: 'CEDULAS IFI´s CERRADAS', categoria: 'TITULO_VALOR' },
  { codigo: '330', descripcion: 'ACEPTACIONES BANCARIAS', categoria: 'TITULO_VALOR' },
  { codigo: '340', descripcion: 'CERTIFICADOS', categoria: 'TITULO_VALOR' },
  { codigo: '350', descripcion: 'ACCIONES', categoria: 'TITULO_VALOR' },
  { codigo: '360', descripcion: 'CONTRATOS', categoria: 'TITULO_VALOR' },
  { codigo: '370', descripcion: 'PAGARES', categoria: 'TITULO_VALOR' },
  { codigo: '380', descripcion: 'DERECHOS FIDUCIARIOS', categoria: 'TITULO_VALOR' },
  { codigo: '390', descripcion: 'CONVENIOS', categoria: 'TITULO_VALOR' }
];

export const getTiposBienes = (): TipoBien[] => {
  return TIPOS_BIENES;
};

export const getTipoBienByCodigo = (codigo: string): TipoBien | undefined => {
  return TIPOS_BIENES.find(item => item.codigo === codigo);
};

export const getTipoBienDescripcion = (codigo: string): string => {
  const item = getTipoBienByCodigo(codigo);
  return item ? item.descripcion : '';
};

export const getTiposBienesByCategoria = (categoria: string): TipoBien[] => {
  return TIPOS_BIENES.filter(item => item.categoria === categoria);
};

export const getTiposBienesInmuebles = (): TipoBien[] => {
  return getTiposBienesByCategoria('INMUEBLE');
};

export const getTiposBienesMuebles = (): TipoBien[] => {
  return getTiposBienesByCategoria('MUEBLE');
};

export const getTiposBienesTitulosValores = (): TipoBien[] => {
  return getTiposBienesByCategoria('TITULO_VALOR');
}; 