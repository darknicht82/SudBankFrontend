/**
 * Catálogo Oficial - Tabla 32-AB: Estado de Reestructuración
 * 
 * Este catálogo define los diferentes estados de reestructuración
 * de operaciones crediticias en el sistema financiero.
 * 
 * Fuente: Manual de Reportes Regulatorios - SudBank
 * Versión: 2024
 */

export interface EstadoReestructuracion {
  codigo: string;
  descripcion: string;
  referencia?: string;
}

export const ESTADOS_REESTRUCTURACION: EstadoReestructuracion[] = [
  { 
    codigo: '1', 
    descripcion: 'Si la entidad fue notificada a fin de que participe en un proceso de reestructuración de cartera y no lo hace, sigue calificando normalmente a su sujeto de crédito pero realizará provisiones por el 100%.', 
    referencia: 'Pág. 288.39 CRSBYJB'
  },
  { 
    codigo: '2', 
    descripcion: 'Si un crédito está vencido y no se solicita la reestructuración, se recalifican como E y se mantiene provisiones según la última calificación.', 
    referencia: 'Pág. 288.41 CRSBYJB'
  },
  { 
    codigo: '3', 
    descripcion: 'Si un crédito se estaba reestructurando pero el proceso resulta fallido o habiendo sido exitoso no lo cumplió el deudor, se recalifica como E y se mantiene provisiones según la última calificación.', 
    referencia: 'Pág. 288.41 CRSBYJB'
  },
  { 
    codigo: '4', 
    descripcion: 'Operaciones nuevas que se conceden a sujetos en las situaciones 2 ó 3 se califican como E y mantiene el 100% de provisión.', 
    referencia: 'Pág. 288.41 CRSBYJB'
  },
  { codigo: '5', descripcion: 'Reestructuración efectiva' },
  { codigo: '9', descripcion: 'No reestructurada' }
];

export const getEstadosReestructuracion = (): EstadoReestructuracion[] => {
  return ESTADOS_REESTRUCTURACION;
};

export const getEstadoReestructuracionByCodigo = (codigo: string): EstadoReestructuracion | undefined => {
  return ESTADOS_REESTRUCTURACION.find(item => item.codigo === codigo);
};

export const getEstadoReestructuracionDescripcion = (codigo: string): string => {
  const item = getEstadoReestructuracionByCodigo(codigo);
  return item ? item.descripcion : '';
};

export const getEstadosReestructuracionEfectivos = (): EstadoReestructuracion[] => {
  return ESTADOS_REESTRUCTURACION.filter(item => ['5'].includes(item.codigo));
};

export const getEstadosReestructuracionNoEfectivos = (): EstadoReestructuracion[] => {
  return ESTADOS_REESTRUCTURACION.filter(item => ['1', '2', '3', '4', '9'].includes(item.codigo));
}; 