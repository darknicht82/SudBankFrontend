/**
 * Catálogo Oficial - Tabla 36: Destino Financiero
 * 
 * Este catálogo define los diferentes destinos o usos que pueden tener
 * los recursos financieros en las operaciones bancarias y de crédito.
 * Se utiliza para clasificar el propósito específico de los fondos.
 * 
 * Fuente: Manual de Reportes Regulatorios - SudBank
 * Versión: 2024
 */

export interface DestinoFinanciero {
  codigo: string;
  nombre: string;
  descripcion?: string;
}

export const DESTINOS_FINANCIEROS: DestinoFinanciero[] = [
  { codigo: '210', nombre: 'CAPITAL DE TRABAJO', descripcion: 'Capital de trabajo para operaciones comerciales' },
  { codigo: '220', nombre: 'COMPRA DE INSUMOS', descripcion: 'Adquisición de insumos para producción' },
  { codigo: '230', nombre: 'COMPRA DE MATERIA PRIMA', descripcion: 'Adquisición de materia prima para producción' },
  { codigo: '240', nombre: 'COMPRA DE BIENES FINALES', descripcion: 'Adquisición de bienes finales para comercialización' },
  { codigo: '250', nombre: 'COMPRA DE BIENES INMUEBLES TERMINADOS', descripcion: 'Adquisición de bienes inmuebles terminados' },
  { codigo: '260', nombre: 'COMPRA DE BIENES INMUEBLES NO TERMINADOS', descripcion: 'Adquisición de bienes inmuebles en construcción' },
  { codigo: '270', nombre: 'COMPRA DE TERRENOS PARA PRODUCCIÓN O CONSTRUCCIÓN DE INSTALACIONES PRODUCTIVAS', descripcion: 'Adquisición de terrenos para instalaciones productivas' },
  { codigo: '280', nombre: 'COMPRA DE TERRENOS PARA CONSTRUCCIÓN DE VIVIENDA', descripcion: 'Adquisición de terrenos para construcción de vivienda' },
  { codigo: '290', nombre: 'COMPRA DE OTROS INSUMOS', descripcion: 'Adquisición de otros insumos diversos' },
  { codigo: '300', nombre: 'COMPRA DE MAQUINARIA Y VEHÍCULOS DE TRABAJO', descripcion: 'Adquisición de maquinaria y vehículos para trabajo' },
  { codigo: '310', nombre: 'COMPRA DE SERVICIOS', descripcion: 'Adquisición de servicios diversos' },
  { codigo: '320', nombre: 'PAGO DE DEUDAS VARIAS', descripcion: 'Pago de deudas y obligaciones varias' },
  { codigo: '330', nombre: 'GASTOS DE INVESTIGACIÓN PROFESIONAL', descripcion: 'Gastos para investigación profesional' },
  { codigo: '340', nombre: 'OTROS GASTOS NO ESPECIFICADOS', descripcion: 'Otros gastos no especificados en otras categorías' },
  { codigo: '350', nombre: 'INVERSION PUBLICA', descripcion: 'Inversiones de carácter público' }
];

/**
 * Obtiene un destino financiero por su código
 * @param codigo - Código del destino financiero
 * @returns El objeto DestinoFinanciero correspondiente o undefined si no se encuentra
 */
export function obtenerDestinoFinanciero(codigo: string): DestinoFinanciero | undefined {
  return DESTINOS_FINANCIEROS.find(destino => destino.codigo === codigo);
}

/**
 * Obtiene todos los destinos financieros
 * @returns Array con todos los destinos financieros
 */
export function obtenerTodosDestinosFinancieros(): DestinoFinanciero[] {
  return [...DESTINOS_FINANCIEROS];
}

/**
 * Busca destinos financieros por nombre (búsqueda parcial)
 * @param nombre - Nombre o parte del nombre del destino
 * @returns Array con los destinos financieros que coinciden con la búsqueda
 */
export function buscarDestinosFinancierosPorNombre(nombre: string): DestinoFinanciero[] {
  const termino = nombre.toLowerCase();
  return DESTINOS_FINANCIEROS.filter(destino => 
    destino.nombre.toLowerCase().includes(termino) ||
    destino.descripcion?.toLowerCase().includes(termino)
  );
} 