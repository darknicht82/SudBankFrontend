/**
 * TABLA 29 - CALIFICACIÓN (CATEGORÍA DE RIESGO)
 * Manual Técnico de Generalidades sobre Estructuras de Datos Codificación - Tablas
 * Fecha Actualización: 17/02/2022 - Versión: 13.3
 * Superintendencia de Bancos del Ecuador
 */

export interface Tabla29CalificacionRiesgo {
  codigo: string;
  descripcion: string;
  categoria: string;
  estado: 'ACTIVA' | 'INACTIVA';
}

export const TABLA_29_CALIFICACION_RIESGO: Tabla29CalificacionRiesgo[] = [
  // CRÉDITOS DE RIESGO NORMAL
  { codigo: 'A1', descripcion: 'Créditos de riesgo normal categoría A-1', categoria: 'NORMAL', estado: 'ACTIVA' },
  { codigo: 'A2', descripcion: 'Créditos de riesgo normal categoría A-2', categoria: 'NORMAL', estado: 'ACTIVA' },
  { codigo: 'A3', descripcion: 'Créditos de riesgo normal categoría A-3', categoria: 'NORMAL', estado: 'ACTIVA' },

  // CRÉDITOS CON RIESGO POTENCIAL
  { codigo: 'B1', descripcion: 'Créditos con riesgo potencial categoría B-1', categoria: 'POTENCIAL', estado: 'ACTIVA' },
  { codigo: 'B2', descripcion: 'Créditos con riesgo potencial categoría B-2', categoria: 'POTENCIAL', estado: 'ACTIVA' },

  // CRÉDITOS DEFICIENTES
  { codigo: 'C1', descripcion: 'Créditos deficientes categoría C-1', categoria: 'DEFICIENTE', estado: 'ACTIVA' },
  { codigo: 'C2', descripcion: 'Créditos deficientes categoría C-2', categoria: 'DEFICIENTE', estado: 'ACTIVA' },

  // CRÉDITOS DE DUDOSO RECAUDO
  { codigo: 'D', descripcion: 'Créditos de dudoso recaudo categoría D', categoria: 'DUDOSO', estado: 'ACTIVA' },

  // PÉRDIDAS
  { codigo: 'E', descripcion: 'Pérdidas categoría E', categoria: 'PERDIDA', estado: 'ACTIVA' },

  // SIN CALIFICACIÓN
  { codigo: 'N', descripcion: 'Sin calificación (solo para operaciones con acuerdo concordatario) No aplica para el campo calificación homologada', categoria: 'SIN_CALIFICACION', estado: 'ACTIVA' },
  { codigo: 'AL', descripcion: 'Sin calificación (Cuando la institución del Sistema Financiero y de Seguridad Social cuente con garantías auto liquidables que cubran el cien por ciento del saldo del crédito otorgado). No aplica para el campo calificación homologada', categoria: 'SIN_CALIFICACION', estado: 'ACTIVA' }
];

// ============================================================================
// FUNCIONES DE CONSULTA Y VALIDACIÓN
// ============================================================================

export const getTabla29CalificacionRiesgo = (): Tabla29CalificacionRiesgo[] => {
  return TABLA_29_CALIFICACION_RIESGO;
};

export const getTabla29CalificacionRiesgoByCodigo = (codigo: string): Tabla29CalificacionRiesgo | undefined => {
  return TABLA_29_CALIFICACION_RIESGO.find(item => item.codigo === codigo);
};

export const getTabla29CalificacionRiesgoDescripcion = (codigo: string): string => {
  const item = getTabla29CalificacionRiesgoByCodigo(codigo);
  return item ? item.descripcion : '';
};

export const getTabla29CalificacionesRiesgoActivas = (): Tabla29CalificacionRiesgo[] => {
  return TABLA_29_CALIFICACION_RIESGO.filter(item => item.estado === 'ACTIVA');
};

export const getTabla29CalificacionesRiesgoPorCategoria = (categoria: string): Tabla29CalificacionRiesgo[] => {
  return TABLA_29_CALIFICACION_RIESGO.filter(item => item.categoria === categoria && item.estado === 'ACTIVA');
};

export const getTabla29CalificacionesRiesgoNormal = (): Tabla29CalificacionRiesgo[] => {
  return getTabla29CalificacionesRiesgoPorCategoria('NORMAL');
};

export const getTabla29CalificacionesRiesgoPotencial = (): Tabla29CalificacionRiesgo[] => {
  return getTabla29CalificacionesRiesgoPorCategoria('POTENCIAL');
};

export const getTabla29CalificacionesRiesgoDeficiente = (): Tabla29CalificacionRiesgo[] => {
  return getTabla29CalificacionesRiesgoPorCategoria('DEFICIENTE');
};

export const getTabla29CalificacionesRiesgoDudoso = (): Tabla29CalificacionRiesgo[] => {
  return getTabla29CalificacionesRiesgoPorCategoria('DUDOSO');
};

export const getTabla29CalificacionesRiesgoPerdida = (): Tabla29CalificacionRiesgo[] => {
  return getTabla29CalificacionesRiesgoPorCategoria('PERDIDA');
};

export const getTabla29CalificacionesSinCalificacion = (): Tabla29CalificacionRiesgo[] => {
  return getTabla29CalificacionesRiesgoPorCategoria('SIN_CALIFICACION');
}; 