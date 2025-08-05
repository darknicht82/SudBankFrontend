/**
 * Catálogo Oficial - Tabla 217: Origen de Ingresos
 * 
 * Este catálogo define los diferentes orígenes de ingresos para la clasificación
 * de clientes en el sistema financiero.
 * 
 * Fuente: Manual de Reportes Regulatorios - SudBank
 * Versión: 2024
 */

export interface OrigenIngresos {
  codigo: string;
  descripcion: string;
}

export const ORIGENES_INGRESOS: OrigenIngresos[] = [
  { codigo: 'B', descripcion: 'Empleado Público' },
  { codigo: 'V', descripcion: 'Empleado Privado' },
  { codigo: 'I', descripcion: 'Independiente' },
  { codigo: 'A', descripcion: 'Ama de casa, estudiantes' },
  { codigo: 'R', descripcion: 'Rentista' },
  { codigo: 'H', descripcion: 'Jubilado o pensionista' },
  { codigo: 'M', descripcion: 'Remesas del exterior' },
  { codigo: 'C', descripcion: 'Misión Casa para todos' }
];

export const getOrigenesIngresos = (): OrigenIngresos[] => {
  return ORIGENES_INGRESOS;
};

export const getOrigenIngresosByCodigo = (codigo: string): OrigenIngresos | undefined => {
  return ORIGENES_INGRESOS.find(item => item.codigo === codigo);
};

export const getOrigenIngresosDescripcion = (codigo: string): string => {
  const item = getOrigenIngresosByCodigo(codigo);
  return item ? item.descripcion : '';
};

export const getOrigenesIngresosEmpleados = (): OrigenIngresos[] => {
  return ORIGENES_INGRESOS.filter(item => ['B', 'V'].includes(item.codigo));
};

export const getOrigenesIngresosIndependientes = (): OrigenIngresos[] => {
  return ORIGENES_INGRESOS.filter(item => ['I', 'R'].includes(item.codigo));
};

export const getOrigenesIngresosEspeciales = (): OrigenIngresos[] => {
  return ORIGENES_INGRESOS.filter(item => ['A', 'H', 'M', 'C'].includes(item.codigo));
}; 