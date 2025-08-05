/**
 * TABLA 26 - CAUSAL DE VINCULACIÓN
 * Manual Técnico de Generalidades sobre Estructuras de Datos Codificación - Tablas
 * Fecha Actualización: 17/02/2022 - Versión: 13.3
 * Superintendencia de Bancos del Ecuador
 */

export interface Tabla26CausalVinculacion {
  codigo: string;
  descripcion: string;
  categoria: 'POR_PROPIEDAD' | 'POR_GESTION' | 'POR_PRESUNCION' | 'POR_PROPIEDAD_Y_GESTION' | 'NO_VINCULADO';
  estado: 'ACTIVA' | 'INACTIVA';
}

export const TABLA_26_CAUSAL_VINCULACION: Tabla26CausalVinculacion[] = [
  // POR PROPIEDAD
  { codigo: 'P01', descripcion: 'Las personas naturales o jurídicas que posean, directa o indirectamente, el 1% del capital suscrito y pagado de la entidad financiera', categoria: 'POR_PROPIEDAD', estado: 'ACTIVA' },
  { codigo: 'P04', descripcion: 'Las personas con propiedad patrimonial con influencia de una entidad subsidiaria o afiliada perteneciente a un grupo financiero', categoria: 'POR_PROPIEDAD', estado: 'ACTIVA' },
  { codigo: 'P06', descripcion: 'Las personas jurídicas en las cuales los administradores o funcionarios que aprueban operaciones de crédito de una entidad financiera posean directa o indirectamente más del 3% del capital de dichas sociedades', categoria: 'POR_PROPIEDAD', estado: 'ACTIVA' },

  // POR GESTIÓN
  { codigo: 'G02', descripcion: 'Los cónyuges, los convivientes o los parientes dentro del segundo grado de consanguinidad y los parientes hasta el primer grado de afinidad de los accionistas que sean personas con propiedad patrimonial con influencia y de los administradores de una entidad financiera', categoria: 'POR_GESTION', estado: 'ACTIVA' },
  { codigo: 'G03', descripcion: 'Los administradores directos o funcionarios que aprueben operaciones de crédito de una entidad financiera', categoria: 'POR_GESTION', estado: 'ACTIVA' },
  { codigo: 'G04', descripcion: 'Las personas jurídicas en las que los cónyuges, los convivientes, los parientes dentro del segundo grado de consanguinidad o primero de afinidad de los administradores o de los funcionarios que aprueban operaciones de crédito de una entidad financiera, posean acciones por un 3% o más del capital de dichas sociedades', categoria: 'POR_GESTION', estado: 'ACTIVA' },
  { codigo: 'G07', descripcion: 'Los parientes en tercer y cuarto grado de consanguinidad y los parientes del segundo grado de afinidad de los accionistas con más del 12% del paquete accionarial y de los administradores de una entidad financiera', categoria: 'POR_GESTION', estado: 'ACTIVA' },
  { codigo: 'G08', descripcion: 'Los cónyuges, los convivientes o los parientes dentro del segundo grado de consanguinidad o primero de afinidad de los funcionarios de una entidad financiera que aprueban operaciones de crédito', categoria: 'POR_GESTION', estado: 'ACTIVA' },

  // POR PRESUNCIÓN
  { codigo: 'R02', descripcion: 'Las que hayan recibido créditos no garantizados adecuadamente, sin antecedentes o domiciliados en el extranjero y sin información disponible sobre ellos', categoria: 'POR_PRESUNCION', estado: 'ACTIVA' },
  { codigo: 'R04', descripcion: 'Las que hayan recibido créditos en condiciones preferenciales por plazos, tasas de interés, falta de caución o desproporcionadas respecto del patrimonio del deudor o de su capacidad de pago', categoria: 'POR_PRESUNCION', estado: 'ACTIVA' },
  { codigo: 'R10', descripcion: 'Las que hayan recibido créditos por reciprocidad con otra entidad financiera', categoria: 'POR_PRESUNCION', estado: 'ACTIVA' },
  { codigo: 'R11', descripcion: 'Las que se declaren presuntivas, con arreglo a las normas de carácter general dictadas por los organismos de control', categoria: 'POR_PRESUNCION', estado: 'ACTIVA' },
  { codigo: 'R12', descripcion: 'Las que tengan tratamientos preferenciales en operaciones pasivas', categoria: 'POR_PRESUNCION', estado: 'ACTIVA' },

  // POR PROPIEDAD Y GESTIÓN
  { codigo: 'PG4', descripcion: 'Causales P01 y G02', categoria: 'POR_PROPIEDAD_Y_GESTION', estado: 'ACTIVA' },
  { codigo: 'PG7', descripcion: 'Causales P01 y G03', categoria: 'POR_PROPIEDAD_Y_GESTION', estado: 'ACTIVA' },
  { codigo: 'PG10', descripcion: 'Causales P01 y G04', categoria: 'POR_PROPIEDAD_Y_GESTION', estado: 'ACTIVA' },
  { codigo: 'PG19', descripcion: 'Causales P04 y G02', categoria: 'POR_PROPIEDAD_Y_GESTION', estado: 'ACTIVA' },
  { codigo: 'PG20', descripcion: 'Causales P05 y G02', categoria: 'POR_PROPIEDAD_Y_GESTION', estado: 'ACTIVA' },
  { codigo: 'PG21', descripcion: 'Causales P06 y G02', categoria: 'POR_PROPIEDAD_Y_GESTION', estado: 'ACTIVA' },
  { codigo: 'PG22', descripcion: 'Causales P04 y G04', categoria: 'POR_PROPIEDAD_Y_GESTION', estado: 'ACTIVA' },
  { codigo: 'PG23', descripcion: 'Causales P05 y G04', categoria: 'POR_PROPIEDAD_Y_GESTION', estado: 'ACTIVA' },
  { codigo: 'PG24', descripcion: 'Causales P06 y G04', categoria: 'POR_PROPIEDAD_Y_GESTION', estado: 'ACTIVA' },
  { codigo: 'PG25', descripcion: 'Causales P01 y G07', categoria: 'POR_PROPIEDAD_Y_GESTION', estado: 'ACTIVA' },
  { codigo: 'PG26', descripcion: 'Causales P04 y G07', categoria: 'POR_PROPIEDAD_Y_GESTION', estado: 'ACTIVA' },
  { codigo: 'PG27', descripcion: 'Causales P05 y G07', categoria: 'POR_PROPIEDAD_Y_GESTION', estado: 'ACTIVA' },
  { codigo: 'PG28', descripcion: 'Causales P06 y G07', categoria: 'POR_PROPIEDAD_Y_GESTION', estado: 'ACTIVA' },
  { codigo: 'PG29', descripcion: 'Causales P01 y G08', categoria: 'POR_PROPIEDAD_Y_GESTION', estado: 'ACTIVA' },
  { codigo: 'PG30', descripcion: 'Causales P04 y G08', categoria: 'POR_PROPIEDAD_Y_GESTION', estado: 'ACTIVA' },
  { codigo: 'PG31', descripcion: 'Causales P05 y G08', categoria: 'POR_PROPIEDAD_Y_GESTION', estado: 'ACTIVA' },
  { codigo: 'PG32', descripcion: 'Causales P06 y G08', categoria: 'POR_PROPIEDAD_Y_GESTION', estado: 'ACTIVA' },
  { codigo: 'PG33', descripcion: 'Causales P04 y G03', categoria: 'POR_PROPIEDAD_Y_GESTION', estado: 'ACTIVA' },
  { codigo: 'PG34', descripcion: 'Causales P05 y G03', categoria: 'POR_PROPIEDAD_Y_GESTION', estado: 'ACTIVA' },
  { codigo: 'PG35', descripcion: 'Causales P06 y G03', categoria: 'POR_PROPIEDAD_Y_GESTION', estado: 'ACTIVA' },

  // NO VINCULADO
  { codigo: 'NV', descripcion: 'No vinculado', categoria: 'NO_VINCULADO', estado: 'ACTIVA' }
];

// ============================================================================
// FUNCIONES DE CONSULTA Y VALIDACIÓN
// ============================================================================

export const getTabla26CausalVinculacion = (): Tabla26CausalVinculacion[] => {
  return TABLA_26_CAUSAL_VINCULACION;
};

export const getTabla26CausalVinculacionByCodigo = (codigo: string): Tabla26CausalVinculacion | undefined => {
  return TABLA_26_CAUSAL_VINCULACION.find(item => item.codigo === codigo);
};

export const getTabla26CausalVinculacionDescripcion = (codigo: string): string => {
  const item = getTabla26CausalVinculacionByCodigo(codigo);
  return item ? item.descripcion : '';
};

export const getTabla26CausalesVinculacionActivas = (): Tabla26CausalVinculacion[] => {
  return TABLA_26_CAUSAL_VINCULACION.filter(item => item.estado === 'ACTIVA');
};

export const getTabla26CausalesVinculacionPorCategoria = (categoria: Tabla26CausalVinculacion['categoria']): Tabla26CausalVinculacion[] => {
  return TABLA_26_CAUSAL_VINCULACION.filter(item => item.categoria === categoria && item.estado === 'ACTIVA');
};

export const getTabla26CausalesVinculacionNoVinculado = (): Tabla26CausalVinculacion[] => {
  return getTabla26CausalesVinculacionPorCategoria('NO_VINCULADO');
}; 