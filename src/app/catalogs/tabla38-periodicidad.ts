/**
 * Catálogo Oficial - Tabla 38: Periodicidad
 * 
 * Este catálogo define las diferentes periodicidades utilizadas en las
 * operaciones financieras y reportes regulatorios.
 * 
 * Fuente: Manual de Reportes Regulatorios - SudBank
 * Versión: 2024
 */

export interface Periodicidad {
  codigo: string;
  descripcion: string;
  dias: number;
  tipo: string;
}

export const PERIODICIDADES: Periodicidad[] = [
  { codigo: 'DI', descripcion: 'Diario', dias: 1, tipo: 'DIARIO' },
  { codigo: 'SA', descripcion: 'Semanal (7 DIAS)', dias: 7, tipo: 'SEMANAL' },
  { codigo: 'QU', descripcion: 'Quincenal (15 DIAS)', dias: 15, tipo: 'QUINCENAL' },
  { codigo: 'ME', descripcion: 'Mensual (30 DIAS)', dias: 30, tipo: 'MENSUAL' },
  { codigo: 'BM', descripcion: 'Bimensual (60 DIAS)', dias: 60, tipo: 'BIMENSUAL' },
  { codigo: 'TR', descripcion: 'Trimestral (90 DIAS)', dias: 90, tipo: 'TRIMESTRAL' },
  { codigo: 'CT', descripcion: 'Cuatrimestral (120 DIAS)', dias: 120, tipo: 'CUATRIMESTRAL' },
  { codigo: 'SE', descripcion: 'Semestral (180 DIAS)', dias: 180, tipo: 'SEMESTRAL' },
  { codigo: 'NM', descripcion: 'Cada nueve meses (270 DIAS)', dias: 270, tipo: 'NUEVE_MESES' },
  { codigo: 'AN', descripcion: 'Anual (360 DIAS)', dias: 360, tipo: 'ANUAL' },
  { codigo: 'VC', descripcion: 'Al vencimiento', dias: 0, tipo: 'VENCIMIENTO' },
  { codigo: 'NR', descripcion: 'No registrado', dias: 0, tipo: 'NO_REGISTRADO' },
  { codigo: 'OT', descripcion: 'Otros', dias: 0, tipo: 'OTROS' }
];

export const getPeriodicidades = (): Periodicidad[] => {
  return PERIODICIDADES;
};

export const getPeriodicidadByCodigo = (codigo: string): Periodicidad | undefined => {
  return PERIODICIDADES.find(item => item.codigo === codigo);
};

export const getPeriodicidadDescripcion = (codigo: string): string => {
  const item = getPeriodicidadByCodigo(codigo);
  return item ? item.descripcion : '';
};

export const getPeriodicidadesByTipo = (tipo: string): Periodicidad[] => {
  return PERIODICIDADES.filter(item => item.tipo === tipo);
};

export const getPeriodicidadesRegulares = (): Periodicidad[] => {
  return PERIODICIDADES.filter(item => 
    ['DIARIO', 'SEMANAL', 'QUINCENAL', 'MENSUAL', 'BIMENSUAL', 'TRIMESTRAL', 'CUATRIMESTRAL', 'SEMESTRAL', 'NUEVE_MESES', 'ANUAL'].includes(item.tipo)
  );
};

export const getPeriodicidadesEspeciales = (): Periodicidad[] => {
  return PERIODICIDADES.filter(item => 
    ['VENCIMIENTO', 'NO_REGISTRADO', 'OTROS'].includes(item.tipo)
  );
};

export const getPeriodicidadByDias = (dias: number): Periodicidad | undefined => {
  return PERIODICIDADES.find(item => item.dias === dias);
}; 