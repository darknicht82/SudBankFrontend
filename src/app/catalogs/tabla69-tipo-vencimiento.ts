/**
 * Tabla 32 - Estado de la Operación
 * Manual Técnico de Generalidades sobre Estructuras de Datos Codificación - Tablas
 * Fecha Actualización: 17/02/2022 - Versión: 13.3
 */

export interface Tabla32EstadoOperacion {
  codigo: string;
  descripcion: string;
}

export const TABLA_32_ESTADO_OPERACION: Tabla32EstadoOperacion[] = [
  {
    codigo: 'N',
    descripcion: 'Original'
  },
  {
    codigo: 'V',
    descripcion: 'Novada'
  },
  {
    codigo: 'E',
    descripcion: 'Reestructurada'
  },
  {
    codigo: 'F',
    descripcion: 'Refinanciada'
  },
  {
    codigo: 'P',
    descripcion: 'Operaciones que pasan de contingente vencido a cartera (pagada por cuenta del cliente) no para uso de tarjetas de crédito'
  },
  {
    codigo: 'R',
    descripcion: 'Ley de Simplificación y Progresividad Tributaria (Art.4) para uso de BanEcuador y CFN en créditos comerciales y microcréditos'
  }
];

export const getTabla32EstadoOperacion = (): Tabla32EstadoOperacion[] => {
  return TABLA_32_ESTADO_OPERACION;
};

export const getTabla32EstadoOperacionByCodigo = (codigo: string): Tabla32EstadoOperacion | undefined => {
  return TABLA_32_ESTADO_OPERACION.find(item => item.codigo === codigo);
};

export const getTabla32EstadoOperacionDescripcion = (codigo: string): string => {
  const item = getTabla32EstadoOperacionByCodigo(codigo);
  return item ? item.descripcion : '';
};

export const getTabla32EstadosOperacionPrincipales = (): Tabla32EstadoOperacion[] => {
  return TABLA_32_ESTADO_OPERACION.filter(item => ['N', 'V', 'E', 'F'].includes(item.codigo));
}; 