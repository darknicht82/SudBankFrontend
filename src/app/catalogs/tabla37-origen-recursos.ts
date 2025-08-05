/**
 * Catálogo Oficial - Tabla 37: Origen de Recursos / Línea de Crédito
 * 
 * Este catálogo define los diferentes orígenes de recursos utilizados
 * para el financiamiento de operaciones crediticias.
 * 
 * Fuente: Manual de Reportes Regulatorios - SudBank
 * Versión: 2024
 */

export interface OrigenRecursos {
  codigo: string;
  descripcion: string;
  tipo: string;
}

export const ORIGENES_RECURSOS: OrigenRecursos[] = [
  { codigo: 'P', descripcion: 'CON RECURSOS PROPIOS', tipo: 'PROPIO' },
  { codigo: 'R', descripcion: 'REDESCUENTOS EN BANCOS DE SEGUNDO PISO', tipo: 'REDESCUENTO' },
  { codigo: 'I', descripcion: 'RECURSOS INTERNACIONALES', tipo: 'INTERNACIONAL' },
  { codigo: 'M', descripcion: 'RECURSOS MIXTOS', tipo: 'MIXTO' },
  { codigo: 'D', descripcion: 'RESERVA INTERNACIONAL DE LIBRE DISPONIBILIDAD (RILD)', tipo: 'PUBLICO' }
];

export const getOrigenesRecursos = (): OrigenRecursos[] => {
  return ORIGENES_RECURSOS;
};

export const getOrigenRecursosByCodigo = (codigo: string): OrigenRecursos | undefined => {
  return ORIGENES_RECURSOS.find(item => item.codigo === codigo);
};

export const getOrigenRecursosDescripcion = (codigo: string): string => {
  const item = getOrigenRecursosByCodigo(codigo);
  return item ? item.descripcion : '';
};

export const getOrigenesRecursosByTipo = (tipo: string): OrigenRecursos[] => {
  return ORIGENES_RECURSOS.filter(item => item.tipo === tipo);
};

export const getOrigenesRecursosPropios = (): OrigenRecursos[] => {
  return getOrigenesRecursosByTipo('PROPIO');
};

export const getOrigenesRecursosExternos = (): OrigenRecursos[] => {
  return ORIGENES_RECURSOS.filter(item => 
    ['REDESCUENTO', 'INTERNACIONAL', 'MIXTO', 'PUBLICO'].includes(item.tipo)
  );
}; 