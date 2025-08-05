export interface Periodicidad {
  codigo: string;
  descripcion: string;
  dias: number;
}

export const PERIODICIDADES: Periodicidad[] = [
  { codigo: 'DI', descripcion: 'Diario (usado sólo para estructuras de Riesgos de liquidez y mercado)', dias: 1 },
  { codigo: 'SA', descripcion: 'Semanal (7 DIAS)', dias: 7 },
  { codigo: 'QU', descripcion: 'Quincenal (15 DIAS)', dias: 15 },
  { codigo: 'ME', descripcion: 'Mensual (30 DIAS)', dias: 30 },
  { codigo: 'BM', descripcion: 'Bimensual (60 DIAS)', dias: 60 },
  { codigo: 'TR', descripcion: 'Trimestral (90 DIAS)', dias: 90 },
  { codigo: 'CT', descripcion: 'Cuatrimestral (120 DIAS)', dias: 120 },
  { codigo: 'SE', descripcion: 'Semestral (180 DIAS)', dias: 180 },
  { codigo: 'NM', descripcion: 'Cada nueve meses (270 DIAS)', dias: 270 },
  { codigo: 'AN', descripcion: 'Anual (360 DIAS)', dias: 360 },
  { codigo: 'VC', descripcion: 'Al vencimiento', dias: 0 },
  { codigo: 'NR', descripcion: 'No registrado (APLICA SOLO PARA PRESTAMOS PRENDARIOS – IESS)', dias: 0 },
  { codigo: 'OT', descripcion: 'Otros', dias: 0 }
];

export function getPeriodicidadByCodigo(codigo: string): Periodicidad | undefined {
  return PERIODICIDADES.find(periodicidad => periodicidad.codigo === codigo);
}

export function getPeriodicidadesPrincipales(): Periodicidad[] {
  return PERIODICIDADES.filter(periodicidad => 
    ['ME', 'TR', 'SE', 'AN', 'VC'].includes(periodicidad.codigo)
  );
}

export function getPeriodicidadesByDias(dias: number): Periodicidad[] {
  return PERIODICIDADES.filter(periodicidad => periodicidad.dias === dias);
} 