/**
 * Catálogo Oficial - Tabla 216: Profesión
 * 
 * Este catálogo define las diferentes profesiones para la clasificación
 * de clientes en el sistema financiero.
 * 
 * Fuente: Manual de Reportes Regulatorios - SudBank
 * Versión: 2024
 */

export interface Profesion {
  codigo: string;
  descripcion: string;
}

export const PROFESIONES: Profesion[] = [
  { codigo: 'C', descripcion: 'Ciencias Administrativas y Económicas' },
  { codigo: 'I', descripcion: 'Ingeniería y Ciencias exactas' },
  { codigo: 'A', descripcion: 'Arquitectos y afines' },
  { codigo: 'M', descripcion: 'Médicos, Biólogos, Veterinarios y otros profesionales de la salud' },
  { codigo: 'S', descripcion: 'Ciencias sociales' },
  { codigo: 'E', descripcion: 'Ciencias de la educación' },
  { codigo: 'D', descripcion: 'Derecho' },
  { codigo: 'P', descripcion: 'Periodistas' },
  { codigo: 'F', descripcion: 'Policías, militares (fuerza pública)' },
  { codigo: 'O', descripcion: 'Otras profesiones' },
  { codigo: 'N', descripcion: 'Sin título académico' }
];

export const getProfesiones = (): Profesion[] => {
  return PROFESIONES;
};

export const getProfesionByCodigo = (codigo: string): Profesion | undefined => {
  return PROFESIONES.find(item => item.codigo === codigo);
};

export const getProfesionDescripcion = (codigo: string): string => {
  const item = getProfesionByCodigo(codigo);
  return item ? item.descripcion : '';
};

export const getProfesionesTecnicas = (): Profesion[] => {
  return PROFESIONES.filter(item => ['I', 'A'].includes(item.codigo));
};

export const getProfesionesSalud = (): Profesion[] => {
  return PROFESIONES.filter(item => ['M'].includes(item.codigo));
};

export const getProfesionesSociales = (): Profesion[] => {
  return PROFESIONES.filter(item => ['S', 'E', 'D', 'P'].includes(item.codigo));
}; 