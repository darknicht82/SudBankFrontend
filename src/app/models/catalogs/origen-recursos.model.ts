export interface OrigenRecursos {
  codigo: string;
  descripcion: string;
}

export const ORIGENES_RECURSOS: OrigenRecursos[] = [
  { codigo: 'P', descripcion: 'CON RECURSOS PROPIOS' },
  { codigo: 'R', descripcion: 'REDESCUENTOS EN BANCOS DE SEGUNDO PISO' },
  { codigo: 'I', descripcion: 'RECURSOS INTERNACIONALES' },
  { codigo: 'M', descripcion: 'RECURSOS MIXTOS' },
  { codigo: 'D', descripcion: 'RESERVA INTERNACIONAL DE LIBRE DISPONIBILIDAD (RILD) (Solo aplica para instituciones públicas)' }
];

export function getOrigenRecursosByCodigo(codigo: string): OrigenRecursos | undefined {
  return ORIGENES_RECURSOS.find(origen => origen.codigo === codigo);
}

export function getOrigenesRecursosPrincipales(): OrigenRecursos[] {
  return ORIGENES_RECURSOS.filter(origen => ['P', 'R', 'I', 'M'].includes(origen.codigo));
} 