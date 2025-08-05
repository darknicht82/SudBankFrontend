/**
 * Tabla 17 - Tipo de Institución
 * Manual Técnico de Generalidades sobre Estructuras de Datos Codificación - Tablas
 * Fecha Actualización: 17/02/2022 - Versión: 13.3
 */

export interface Tabla17TipoInstitucion {
  codigo: string;
  descripcion: string;
}

export const TABLA_17_TIPO_INSTITUCION: Tabla17TipoInstitucion[] = [
  { codigo: '1', descripcion: 'INSTITUCIONES FINANCIERAS PUBLICAS' },
  { codigo: '2', descripcion: 'CORPORACION DE GARANTIA CREDITICIA' },
  { codigo: '3', descripcion: 'BANCOS PRIVADOS NACIONALES' },
  { codigo: '4', descripcion: 'BANCOS PRIVADOS EXTRANJEROS' },
  { codigo: '5', descripcion: 'BANCOS PRIVADOS MIXTOS' },
  { codigo: '6', descripcion: 'OFIC. REPRESENTACION BANCOS EXTRANJEROS' },
  { codigo: '7', descripcion: 'SOCIEDADES FINANCIERAS' },
  { codigo: '8', descripcion: 'OFIC. REPRESENTACION FINANCIERAS EXTRANJERAS' },
  { codigo: '9', descripcion: 'MANDATO E INTERMEDIACION FINANCIERA' },
  { codigo: '10', descripcion: 'COMPAÑIAS DE ARRENDAMIENTO MERCANTIL' },
  { codigo: '11', descripcion: 'ALMACENES GENERALES DE DEPOSITOS' },
  { codigo: '12', descripcion: 'CASAS DE CAMBIO' },
  { codigo: '13', descripcion: 'INTERMEDIARIAS DE CAMBIO' },
  { codigo: '14', descripcion: 'MUTUALISTAS' },
  { codigo: '15', descripcion: 'ASEGURADORAS NACIONALES' },
  { codigo: '16', descripcion: 'ASEGURADORAS EXTRANJERAS' },
  { codigo: '17', descripcion: 'REASEGURADORES (NACIONALES)' },
  { codigo: '18', descripcion: 'TARJETAS DE CREDITO' },
  { codigo: '19', descripcion: 'COOPERATIVAS DE AHORRO Y CREDITO' },
  { codigo: '20', descripcion: 'BANCOS DEL ESTADO' },
  { codigo: '21', descripcion: 'BANCOS OFF SHORE' },
  { codigo: '23', descripcion: 'INMOBILIARIAS' },
  { codigo: '24', descripcion: 'SERVICIOS DE COMPUTACION Y TRANSPORTE DE VALORES' },
  { codigo: '25', descripcion: 'CASA DE VALORES' },
  { codigo: '26', descripcion: 'ADMINISTRADORAS DE FONDOS' },
  { codigo: '27', descripcion: 'COMPAÑIAS DE TITULARIZACION' },
  { codigo: '28', descripcion: 'AGENTES ASESORES PRODUCTORES DE SEGUROS' },
  { codigo: '29', descripcion: 'OTRAS INSTITUCIONES' },
  { codigo: '31', descripcion: 'ASEGURADORAS PUBLICAS' },
  { codigo: '32', descripcion: 'INSTITUCIONES DE SEGURIDAD SOCIAL' },
  { codigo: '33', descripcion: 'AGENCIAS ASESORAS PRODUCTORAS DE SEGUROS' },
  { codigo: '34', descripcion: 'INSPECTORES DE RIESGOS (PERS. NATURALES)' },
  { codigo: '35', descripcion: 'INSPECTORES DE RIESGOS (PERS. JURIDICAS)' },
  { codigo: '36', descripcion: 'AJUSTADORES DE SINIESTROS (PERS. NATURALES)' },
  { codigo: '37', descripcion: 'AJUSTADORES DE SINIESTROS (PERS. JURIDICAS)' },
  { codigo: '38', descripcion: 'INTERMEDIARIOS DE REASEGUROS (NACIONALES)' },
  { codigo: '39', descripcion: 'INTERMEDIARIOS DE REASEGUROS (EXTRANJEROS)' },
  { codigo: '40', descripcion: 'REASEGURADORES (EXTRANJEROS)' }
];

export const getTabla17TipoInstitucion = (): Tabla17TipoInstitucion[] => {
  return TABLA_17_TIPO_INSTITUCION;
};

export const getTabla17TipoInstitucionByCodigo = (codigo: string): Tabla17TipoInstitucion | undefined => {
  return TABLA_17_TIPO_INSTITUCION.find(item => item.codigo === codigo);
};

export const getTabla17TipoInstitucionDescripcion = (codigo: string): string => {
  const item = getTabla17TipoInstitucionByCodigo(codigo);
  return item ? item.descripcion : '';
}; 