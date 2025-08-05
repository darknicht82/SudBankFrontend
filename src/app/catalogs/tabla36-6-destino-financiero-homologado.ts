/**
 * Tabla 36-6 - Destino Financiero (Homologado)
 * Manual Técnico de Generalidades sobre Estructuras de Datos Codificación - Tablas
 * Fecha Actualización: 17/02/2022 - Versión: 13.3
 */

export interface Tabla366DestinoFinancieroHomologado {
  codigo: string;
  descripcion: string;
  categoria: string;
}

export const TABLA_366_DESTINO_FINANCIERO_HOMOLOGADO: Tabla366DestinoFinancieroHomologado[] = [
  // CAPITAL DE TRABAJO
  {
    codigo: 'CT',
    descripcion: 'Capital de Trabajo',
    categoria: 'CAPITAL_TRABAJO'
  },
  
  // ACTIVOS FIJOS TANGIBLES
  {
    codigo: 'TT',
    descripcion: 'Activos Fijos Tangibles: Terrenos, edificios y construcción de infraestructura, para fines productivos y comerciales',
    categoria: 'ACTIVOS_FIJOS_TANGIBLES'
  },
  {
    codigo: 'TE',
    descripcion: 'Activos Fijos Tangibles: Equipos, maquinaria y otros bienes de capital, a excepción de vehículos, para fines productivos y comerciales',
    categoria: 'ACTIVOS_FIJOS_TANGIBLES'
  },
  {
    codigo: 'TP',
    descripcion: 'Activos Fijos Tangibles: Vehículos pesados para fines productivos y comerciales',
    categoria: 'ACTIVOS_FIJOS_TANGIBLES'
  },
  {
    codigo: 'TL',
    descripcion: 'Activos Fijos Tangibles: Vehículos livianos para fines productivos y comerciales',
    categoria: 'ACTIVOS_FIJOS_TANGIBLES'
  },
  {
    codigo: 'TF',
    descripcion: 'Activos Fijos Tangibles: Vehículos livianos con combustibles fósiles',
    categoria: 'ACTIVOS_FIJOS_TANGIBLES'
  },
  {
    codigo: 'TO',
    descripcion: 'Activos Fijos Tangibles: Otros activos fijos tangibles que no constituyen bienes de capital, para fines productivos y comerciales',
    categoria: 'ACTIVOS_FIJOS_TANGIBLES'
  },
  
  // ACTIVOS FIJOS INTANGIBLES
  {
    codigo: 'II',
    descripcion: 'Activos Fijos Intangibles: Derechos de propiedad industrial',
    categoria: 'ACTIVOS_FIJOS_INTANGIBLES'
  },
  {
    codigo: 'IF',
    descripcion: 'Activos Fijos Intangibles: Adquisición de franquicias, marcas, pago de regalías, licencias y otros activos fijos intangibles',
    categoria: 'ACTIVOS_FIJOS_INTANGIBLES'
  },
  
  // SERVICIOS
  {
    codigo: 'AS',
    descripcion: 'Adquisición de servicios',
    categoria: 'SERVICIOS'
  },
  
  // EXPORTACIONES
  {
    codigo: 'XB',
    descripcion: 'Crédito directo otorgado a personas jurídicas no residentes para la adquisición de exportaciones producidos por residentes de la economía ecuatoriana',
    categoria: 'EXPORTACIONES'
  },
  
  // REESTRUCTURACIÓN Y PAGOS
  {
    codigo: 'RP',
    descripcion: 'Reestructuración de Pasivos y Pago de Obligaciones',
    categoria: 'REESTRUCTURACION'
  },
  
  // MICROCRÉDITOS
  {
    codigo: 'MC',
    descripcion: 'Microcrédito otorgado para consumo de microempresarios',
    categoria: 'MICROCREDITO'
  },
  {
    codigo: 'MV',
    descripcion: 'Vivienda para microempresarios (Vivienda de interés público e inmobiliario destinado para la adquisición de vivienda de microempresarios)',
    categoria: 'MICROCREDITO'
  },
  
  // NO PRODUCTIVAS
  {
    codigo: 'OT',
    descripcion: 'No productivas (Para operaciones inmobiliarias, vivienda de interés público, consumo prioritario y crédito educativo, excepto vivienda de interés público e inmobiliario destinado a la adquisición de vivienda para microempresarios)',
    categoria: 'NO_PRODUCTIVAS'
  }
];

export const getTabla366DestinoFinancieroHomologado = (): Tabla366DestinoFinancieroHomologado[] => {
  return TABLA_366_DESTINO_FINANCIERO_HOMOLOGADO;
};

export const getTabla366DestinoFinancieroHomologadoByCodigo = (codigo: string): Tabla366DestinoFinancieroHomologado | undefined => {
  return TABLA_366_DESTINO_FINANCIERO_HOMOLOGADO.find(item => item.codigo === codigo);
};

export const getTabla366DestinoFinancieroHomologadoDescripcion = (codigo: string): string => {
  const item = getTabla366DestinoFinancieroHomologadoByCodigo(codigo);
  return item ? item.descripcion : '';
};

export const getTabla366DestinosFinancierosByCategoria = (categoria: string): Tabla366DestinoFinancieroHomologado[] => {
  return TABLA_366_DESTINO_FINANCIERO_HOMOLOGADO.filter(item => item.categoria === categoria);
};

export const getTabla366DestinosFinancierosProductivos = (): Tabla366DestinoFinancieroHomologado[] => {
  return TABLA_366_DESTINO_FINANCIERO_HOMOLOGADO.filter(item => 
    ['CAPITAL_TRABAJO', 'ACTIVOS_FIJOS_TANGIBLES', 'ACTIVOS_FIJOS_INTANGIBLES', 'SERVICIOS', 'EXPORTACIONES'].includes(item.categoria)
  );
};

export const getTabla366DestinosFinancierosMicrocredito = (): Tabla366DestinoFinancieroHomologado[] => {
  return getTabla366DestinosFinancierosByCategoria('MICROCREDITO');
};

export const getTabla366DestinosFinancierosNoProductivos = (): Tabla366DestinoFinancieroHomologado[] => {
  return getTabla366DestinosFinancierosByCategoria('NO_PRODUCTIVAS');
}; 