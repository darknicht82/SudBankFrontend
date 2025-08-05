/**
 * TABLA 21 - TIPO DE AUDITORÍA EXTERNA
 * Manual Técnico de Generalidades sobre Estructuras de Datos Codificación - Tablas
 * Fecha Actualización: 17/02/2022 - Versión: 13.3
 * Superintendencia de Bancos del Ecuador
 */

export interface Tabla21TipoAuditoriaExterna {
  codigo: string;
  descripcion: string;
  estado: 'ACTIVA' | 'INACTIVA';
}

export const TABLA_21_TIPO_AUDITORIA_EXTERNA: Tabla21TipoAuditoriaExterna[] = [
  { codigo: 'FI', descripcion: 'FINANCIERA', estado: 'ACTIVA' },
  { codigo: 'GE', descripcion: 'GENERAL', estado: 'ACTIVA' },
  { codigo: 'ES', descripcion: 'ESPECIAL', estado: 'ACTIVA' }
];

// ============================================================================
// FUNCIONES DE CONSULTA Y VALIDACIÓN
// ============================================================================

export const getTabla21TipoAuditoriaExterna = (): Tabla21TipoAuditoriaExterna[] => {
  return TABLA_21_TIPO_AUDITORIA_EXTERNA;
};

export const getTabla21TipoAuditoriaExternaByCodigo = (codigo: string): Tabla21TipoAuditoriaExterna | undefined => {
  return TABLA_21_TIPO_AUDITORIA_EXTERNA.find(item => item.codigo === codigo);
};

export const getTabla21TipoAuditoriaExternaDescripcion = (codigo: string): string => {
  const item = getTabla21TipoAuditoriaExternaByCodigo(codigo);
  return item ? item.descripcion : '';
};

export const getTabla21TiposAuditoriaExternaActivos = (): Tabla21TipoAuditoriaExterna[] => {
  return TABLA_21_TIPO_AUDITORIA_EXTERNA.filter(item => item.estado === 'ACTIVA');
}; 