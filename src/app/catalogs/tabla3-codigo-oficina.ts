/**
 * Catálogo Oficial - Tabla 3: Código de Oficina
 * 
 * Este catálogo define los códigos de oficina para cada entidad del sistema financiero.
 * Los códigos de oficina actualizados para cada entidad pueden ser consultados en la 
 * página Web de la Superintendencia de Bancos (www.sbs.gob.ec), sección "Catastro del 
 * Sistema Financiero, Sistema Seguros Privados y del Sistema Seguridad Social".
 * 
 * Fuente: Manual de Reportes Regulatorios - SudBank
 * Versión: 2024
 */

export interface CodigoOficina {
  codigo: string;
  descripcion: string;
  entidad?: string;
}

export const CODIGOS_OFICINA: CodigoOficina[] = [
  // NOTA: Los códigos específicos se consultan en www.sbs.gob.ec
  // Esta es una estructura base que debe ser completada con los códigos oficiales
  { codigo: '001', descripcion: 'OFICINA PRINCIPAL' },
  { codigo: '002', descripcion: 'SUCURSAL' },
  { codigo: '003', descripcion: 'AGENCIA' },
  { codigo: '004', descripcion: 'VENTANILLA' },
  { codigo: '005', descripcion: 'CAJERO AUTOMÁTICO' },
  { codigo: '006', descripcion: 'OFICINA MÓVIL' },
  { codigo: '007', descripcion: 'CENTRO DE ATENCIÓN' },
  { codigo: '008', descripcion: 'PUNTO DE SERVICIO' },
  { codigo: '009', descripcion: 'OFICINA VIRTUAL' },
  { codigo: '010', descripcion: 'OFICINA TEMPORAL' }
];

export const getCodigosOficina = (): CodigoOficina[] => {
  return CODIGOS_OFICINA;
};

export const getCodigoOficinaByCodigo = (codigo: string): CodigoOficina | undefined => {
  return CODIGOS_OFICINA.find(item => item.codigo === codigo);
};

export const getCodigoOficinaDescripcion = (codigo: string): string => {
  const item = getCodigoOficinaByCodigo(codigo);
  return item ? item.descripcion : '';
};

export const getCodigosOficinaByEntidad = (entidad: string): CodigoOficina[] => {
  return CODIGOS_OFICINA.filter(item => item.entidad === entidad);
}; 