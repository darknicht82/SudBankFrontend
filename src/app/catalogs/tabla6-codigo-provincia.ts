/**
 * Tabla 6 - Código de Provincia
 * Manual Técnico de Generalidades sobre Estructuras de Datos Codificación - Tablas
 * Fecha Actualización: 17/02/2022 - Versión: 13.3
 */

export interface Tabla6CodigoProvincia {
  codigo: string;
  descripcion: string;
  region: 'COSTA' | 'SIERRA' | 'ORIENTE' | 'INSULAR';
  estado: 'ACTIVA' | 'INACTIVA';
}

export const TABLA_6_CODIGO_PROVINCIA: Tabla6CodigoProvincia[] = [
  { codigo: '01', descripcion: 'AZUAY', region: 'SIERRA', estado: 'ACTIVA' },
  { codigo: '02', descripcion: 'BOLÍVAR', region: 'SIERRA', estado: 'ACTIVA' },
  { codigo: '03', descripcion: 'CAÑAR', region: 'SIERRA', estado: 'ACTIVA' },
  { codigo: '04', descripcion: 'CARCHI', region: 'SIERRA', estado: 'ACTIVA' },
  { codigo: '05', descripcion: 'COTOPAXI', region: 'SIERRA', estado: 'ACTIVA' },
  { codigo: '06', descripcion: 'CHIMBORAZO', region: 'SIERRA', estado: 'ACTIVA' },
  { codigo: '07', descripcion: 'EL ORO', region: 'COSTA', estado: 'ACTIVA' },
  { codigo: '08', descripcion: 'ESMERALDAS', region: 'COSTA', estado: 'ACTIVA' },
  { codigo: '09', descripcion: 'GUAYAS', region: 'COSTA', estado: 'ACTIVA' },
  { codigo: '10', descripcion: 'IMBABURA', region: 'SIERRA', estado: 'ACTIVA' },
  { codigo: '11', descripcion: 'LOJA', region: 'SIERRA', estado: 'ACTIVA' },
  { codigo: '12', descripcion: 'LOS RÍOS', region: 'COSTA', estado: 'ACTIVA' },
  { codigo: '13', descripcion: 'MANABÍ', region: 'COSTA', estado: 'ACTIVA' },
  { codigo: '14', descripcion: 'MORONA SANTIAGO', region: 'ORIENTE', estado: 'ACTIVA' },
  { codigo: '15', descripcion: 'NAPO', region: 'ORIENTE', estado: 'ACTIVA' },
  { codigo: '16', descripcion: 'PASTAZA', region: 'ORIENTE', estado: 'ACTIVA' },
  { codigo: '17', descripcion: 'PICHINCHA', region: 'SIERRA', estado: 'ACTIVA' },
  { codigo: '18', descripcion: 'TUNGURAHUA', region: 'SIERRA', estado: 'ACTIVA' },
  { codigo: '19', descripcion: 'ZAMORA CHINCHIPE', region: 'ORIENTE', estado: 'ACTIVA' },
  { codigo: '20', descripcion: 'GALÁPAGOS', region: 'INSULAR', estado: 'ACTIVA' },
  { codigo: '21', descripcion: 'SUCUMBÍOS', region: 'ORIENTE', estado: 'ACTIVA' },
  { codigo: '22', descripcion: 'ORELLANA', region: 'ORIENTE', estado: 'ACTIVA' },
  { codigo: '23', descripcion: 'SANTO DOMINGO DE LOS TSÁCHILAS', region: 'COSTA', estado: 'ACTIVA' },
  { codigo: '24', descripcion: 'SANTA ELENA', region: 'COSTA', estado: 'ACTIVA' }
];

export const getTabla6CodigoProvincia = (): Tabla6CodigoProvincia[] => {
  return TABLA_6_CODIGO_PROVINCIA;
};

export const getTabla6CodigoProvinciaByCodigo = (codigo: string): Tabla6CodigoProvincia | undefined => {
  return TABLA_6_CODIGO_PROVINCIA.find(item => item.codigo === codigo);
};

export const getTabla6CodigoProvinciaDescripcion = (codigo: string): string => {
  const item = getTabla6CodigoProvinciaByCodigo(codigo);
  return item ? item.descripcion : '';
};

export const getTabla6ProvinciasByRegion = (region: 'COSTA' | 'SIERRA' | 'ORIENTE' | 'INSULAR'): Tabla6CodigoProvincia[] => {
  return TABLA_6_CODIGO_PROVINCIA.filter(item => item.region === region);
};

export const getTabla6ProvinciasActivas = (): Tabla6CodigoProvincia[] => {
  return TABLA_6_CODIGO_PROVINCIA.filter(item => item.estado === 'ACTIVA');
}; 