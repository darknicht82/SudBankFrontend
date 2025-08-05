/**
 * Tabla 34 - Producto de Crédito
 * Manual Técnico de Generalidades sobre Estructuras de Datos Codificación - Tablas
 * Fecha Actualización: 17/02/2022 - Versión: 13.3
 */

export interface Tabla34ProductoCredito {
  codigo: string;
  descripcion: string;
}

export const TABLA_34_PRODUCTO_CREDITO: Tabla34ProductoCredito[] = [
  {
    codigo: 'C',
    descripcion: 'CRÉDITO'
  },
  {
    codigo: 'G',
    descripcion: 'CONTINGENTE'
  },
  {
    codigo: 'T',
    descripcion: 'TARJETA DE CRÉDITO'
  },
  {
    codigo: 'F',
    descripcion: 'FIDEICOMISO MERCANTIL'
  }
];

export const getTabla34ProductoCredito = (): Tabla34ProductoCredito[] => {
  return TABLA_34_PRODUCTO_CREDITO;
};

export const getTabla34ProductoCreditoByCodigo = (codigo: string): Tabla34ProductoCredito | undefined => {
  return TABLA_34_PRODUCTO_CREDITO.find(item => item.codigo === codigo);
};

export const getTabla34ProductoCreditoDescripcion = (codigo: string): string => {
  const item = getTabla34ProductoCreditoByCodigo(codigo);
  return item ? item.descripcion : '';
};

export const getTabla34ProductosCreditoPrincipales = (): Tabla34ProductoCredito[] => {
  return TABLA_34_PRODUCTO_CREDITO.filter(item => ['C', 'G', 'T'].includes(item.codigo));
}; 