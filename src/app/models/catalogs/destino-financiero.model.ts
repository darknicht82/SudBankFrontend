export interface DestinoFinanciero {
  codigo: string;
  descripcion: string;
  categoria: string;
}

export const DESTINOS_FINANCIEROS: DestinoFinanciero[] = [
  // Tabla 36 - Destino Financiero Original
  { codigo: '210', descripcion: 'CAPITAL DE TRABAJO', categoria: 'ORIGINAL' },
  { codigo: '220', descripcion: 'COMPRA DE INSUMOS', categoria: 'ORIGINAL' },
  { codigo: '230', descripcion: 'COMPRA DE MATERIA PRIMA', categoria: 'ORIGINAL' },
  { codigo: '240', descripcion: 'COMPRA DE BIENES FINALES', categoria: 'ORIGINAL' },
  { codigo: '250', descripcion: 'COMPRA DE BIENES INMUEBLES TERMINADOS', categoria: 'ORIGINAL' },
  { codigo: '260', descripcion: 'COMPRA DE BIENES INMUEBLES NO TERMINADOS', categoria: 'ORIGINAL' },
  { codigo: '270', descripcion: 'COMPRA DE TERRENOS PARA PRODUCCIÓN O CONSTRUCCIÓN DE INSTALACIONES PRODUCTIVAS', categoria: 'ORIGINAL' },
  { codigo: '280', descripcion: 'COMPRA DE TERRENOS PARA CONSTRUCCIÓN DE VIVIENDA', categoria: 'ORIGINAL' },
  { codigo: '290', descripcion: 'COMPRA DE OTROS INSUMOS', categoria: 'ORIGINAL' },
  { codigo: '300', descripcion: 'COMPRA DE MAQUINARIA Y VEHÍCULOS DE TRABAJO', categoria: 'ORIGINAL' },
  { codigo: '310', descripcion: 'PAGO DE DEUDAS VARIAS', categoria: 'ORIGINAL' },
  { codigo: '330', descripcion: 'GASTOS DE INVESTIGACIÓN PROFESIONAL', categoria: 'ORIGINAL' },
  { codigo: '340', descripcion: 'OTROS GASTOS NO ESPECIFICADOS', categoria: 'ORIGINAL' },
  { codigo: '350', descripcion: 'INVERSION PUBLICA', categoria: 'ORIGINAL' },
  
  // Tabla 36-6 - Destino Financiero Homologado
  { codigo: 'CT', descripcion: 'Capital de Trabajo', categoria: 'HOMOLOGADO' },
  { codigo: 'TT', descripcion: 'Activos Fijos Tangibles: Terrenos, edificios y construcción de infraestructura, para fines productivos y comerciales', categoria: 'HOMOLOGADO' },
  { codigo: 'TE', descripcion: 'Activos Fijos Tangibles: Equipos, maquinaria y otros bienes de capital, a excepción de vehículos, para fines productivos y comerciales', categoria: 'HOMOLOGADO' },
  { codigo: 'TP', descripcion: 'Activos Fijos Tangibles: Vehículos pesados para fines productivos y comerciales', categoria: 'HOMOLOGADO' },
  { codigo: 'TL', descripcion: 'Activos Fijos Tangibles: Vehículos livianos para fines productivos y comerciales', categoria: 'HOMOLOGADO' },
  { codigo: 'TF', descripcion: 'Activos Fijos Tangibles: Vehículos livianos con combustibles fósiles', categoria: 'HOMOLOGADO' },
  { codigo: 'TO', descripcion: 'Activos Fijos Tangibles: Otros activos fijos tangibles que no constituyen bienes de capital, para fines productivos y comerciales', categoria: 'HOMOLOGADO' },
  { codigo: 'II', descripcion: 'Activos Fijos Intangibles: Derechos de propiedad industrial', categoria: 'HOMOLOGADO' },
  { codigo: 'IF', descripcion: 'Activos Fijos Intangibles: Adquisición de franquicias, marcas, pago de regalías, licencias y otros activos fijos intangibles', categoria: 'HOMOLOGADO' },
  { codigo: 'AS', descripcion: 'Adquisición de servicios', categoria: 'HOMOLOGADO' },
  { codigo: 'XB', descripcion: 'Crédito directo otorgado a personas jurídicas no residentes para la adquisición de exportaciones producidos por residentes de la economía ecuatoriana', categoria: 'HOMOLOGADO' },
  { codigo: 'RP', descripcion: 'Reestructuración de Pasivos y Pago de Obligaciones', categoria: 'HOMOLOGADO' },
  { codigo: 'MC', descripcion: 'Microcrédito otorgado para consumo de microempresarios', categoria: 'HOMOLOGADO' },
  { codigo: 'MV', descripcion: 'Vivienda para microempresarios (Vivienda de interés público e inmobiliario destinado para la adquisición de vivienda de microempresarios)', categoria: 'HOMOLOGADO' },
  { codigo: 'OT', descripcion: 'No productivas (Para operaciones inmobiliarias, vivienda de interés público, consumo prioritario y crédito educativo, excepto vivienda de interés público e inmobiliario destinado a la adquisición de vivienda para microempresarios)', categoria: 'HOMOLOGADO' }
];

export function getDestinoFinancieroByCodigo(codigo: string): DestinoFinanciero | undefined {
  return DESTINOS_FINANCIEROS.find(destino => destino.codigo === codigo);
}

export function getDestinosFinancierosByCategoria(categoria: string): DestinoFinanciero[] {
  return DESTINOS_FINANCIEROS.filter(destino => destino.categoria === categoria);
}

export function getDestinosFinancierosPrincipales(): DestinoFinanciero[] {
  return DESTINOS_FINANCIEROS.filter(destino => 
    ['CT', 'TT', 'TE', 'TP', 'TL', 'MC', 'MV'].includes(destino.codigo)
  );
} 