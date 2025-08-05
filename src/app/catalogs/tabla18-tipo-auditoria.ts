/**
 * TABLA 18 - TIPO DE AUDITORÍA
 * Manual Técnico de Generalidades sobre Estructuras de Datos Codificación - Tablas
 * Fecha Actualización: 17/02/2022 - Versión: 13.3
 * Superintendencia de Bancos del Ecuador
 */

export interface Tabla18TipoAuditoria {
  codigo: string;
  descripcion: string;
  estado: 'ACTIVA' | 'INACTIVA';
}

export const TABLA_18_TIPO_AUDITORIA: Tabla18TipoAuditoria[] = [
  { codigo: 'EX', descripcion: 'EXTERNA', estado: 'ACTIVA' },
  { codigo: 'IN', descripcion: 'INTERNA', estado: 'ACTIVA' },
  { codigo: 'CU', descripcion: 'DE CUMPLIMIENTO', estado: 'ACTIVA' },
  { codigo: 'RI', descripcion: 'DE RIESGOS', estado: 'ACTIVA' }
];

// ============================================================================
// FUNCIONES DE CONSULTA Y VALIDACIÓN
// ============================================================================

export const getTabla18TipoAuditoria = (): Tabla18TipoAuditoria[] => {
  return TABLA_18_TIPO_AUDITORIA;
};

export const getTabla18TipoAuditoriaByCodigo = (codigo: string): Tabla18TipoAuditoria | undefined => {
  return TABLA_18_TIPO_AUDITORIA.find(item => item.codigo === codigo);
};

export const getTabla18TipoAuditoriaDescripcion = (codigo: string): string => {
  const item = getTabla18TipoAuditoriaByCodigo(codigo);
  return item ? item.descripcion : '';
};

export const getTabla18TiposAuditoriaActivos = (): Tabla18TipoAuditoria[] => {
  return TABLA_18_TIPO_AUDITORIA.filter(item => item.estado === 'ACTIVA');
}; 