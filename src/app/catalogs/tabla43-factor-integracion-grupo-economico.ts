/**
 * Tabla 43 - Factor de Integración de Grupo Económico
 * Manual Técnico de Generalidades sobre Estructuras de Datos Codificación - Tablas
 * Fecha Actualización: 17/02/2022 - Versión: 13.3
 */

export interface Tabla43FactorIntegracionGrupoEconomico {
  codigo: string;
  descripcion: string;
}

export const TABLA_43_FACTOR_INTEGRACION_GRUPO_ECONOMICO: Tabla43FactorIntegracionGrupoEconomico[] = [
  {
    codigo: 'A',
    descripcion: 'Sean accionistas directa o indirectamente en el veinte por ciento (20%) o más del capital pagado de una compañía.'
  },
  {
    codigo: 'B',
    descripcion: 'Existan relaciones de negocios, de capitales o de administración que permitan a una o más de ellas ejercer una influencia significativa y permanente en las decisiones de las demás.'
  },
  {
    codigo: 'C',
    descripcion: 'Existan datos o información fundada de que diversas personas mantienen relaciones de tal naturaleza que conforman de hecho una unidad de intereses económicos.'
  },
  {
    codigo: 'D',
    descripcion: 'Se hayan concedido créditos a prestatarios o grupos prestatarios, en condiciones preferenciales o desproporcionadas respecto del patrimonio del deudor o de su capacidad de pago.'
  },
  {
    codigo: 'E',
    descripcion: 'Se hayan concedido créditos no garantizados adecuadamente a deudores o grupos prestatarios sin antecedentes o domiciliados en el extranjero sin información disponible sobre ellos.'
  },
  {
    codigo: 'F',
    descripcion: 'Se hayan concedido créditos a prestatarios o grupos de deudores por reciprocidad con otra entidad financiera.'
  },
  {
    codigo: 'G',
    descripcion: 'Cuando mantengan vinculación entre sí.'
  }
];

export const getTabla43FactorIntegracionGrupoEconomico = (): Tabla43FactorIntegracionGrupoEconomico[] => {
  return TABLA_43_FACTOR_INTEGRACION_GRUPO_ECONOMICO;
};

export const getTabla43FactorIntegracionGrupoEconomicoByCodigo = (codigo: string): Tabla43FactorIntegracionGrupoEconomico | undefined => {
  return TABLA_43_FACTOR_INTEGRACION_GRUPO_ECONOMICO.find(item => item.codigo === codigo);
};

export const getTabla43FactorIntegracionGrupoEconomicoDescripcion = (codigo: string): string => {
  const item = getTabla43FactorIntegracionGrupoEconomicoByCodigo(codigo);
  return item ? item.descripcion : '';
};

export const getTabla43FactoresIntegracionPrincipales = (): Tabla43FactorIntegracionGrupoEconomico[] => {
  return TABLA_43_FACTOR_INTEGRACION_GRUPO_ECONOMICO.filter(item => ['A', 'B', 'C'].includes(item.codigo));
};

export const getTabla43FactoresIntegracionCreditos = (): Tabla43FactorIntegracionGrupoEconomico[] => {
  return TABLA_43_FACTOR_INTEGRACION_GRUPO_ECONOMICO.filter(item => ['D', 'E', 'F'].includes(item.codigo));
}; 