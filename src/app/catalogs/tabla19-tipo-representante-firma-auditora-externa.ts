/**
 * TABLA 19 - TIPO DE REPRESENTANTE DE FIRMA AUDITORA EXTERNA
 * Manual Técnico de Generalidades sobre Estructuras de Datos Codificación - Tablas
 * Fecha Actualización: 17/02/2022 - Versión: 13.3
 * Superintendencia de Bancos del Ecuador
 */

export interface Tabla19TipoRepresentanteFirmaAuditoraExterna {
  codigo: string;
  descripcion: string;
  estado: 'ACTIVA' | 'INACTIVA';
}

export const TABLA_19_TIPO_REPRESENTANTE_FIRMA_AUDITORA_EXTERNA: Tabla19TipoRepresentanteFirmaAuditoraExterna[] = [
  { codigo: 'RP', descripcion: 'REPRESENTANTE LEGAL', estado: 'ACTIVA' },
  { codigo: 'AP', descripcion: 'ABOGADO PATROCINADOR', estado: 'ACTIVA' },
  { codigo: 'AO', descripcion: 'APODERADO', estado: 'ACTIVA' }
];

// ============================================================================
// FUNCIONES DE CONSULTA Y VALIDACIÓN
// ============================================================================

export const getTabla19TipoRepresentanteFirmaAuditoraExterna = (): Tabla19TipoRepresentanteFirmaAuditoraExterna[] => {
  return TABLA_19_TIPO_REPRESENTANTE_FIRMA_AUDITORA_EXTERNA;
};

export const getTabla19TipoRepresentanteFirmaAuditoraExternaByCodigo = (codigo: string): Tabla19TipoRepresentanteFirmaAuditoraExterna | undefined => {
  return TABLA_19_TIPO_REPRESENTANTE_FIRMA_AUDITORA_EXTERNA.find(item => item.codigo === codigo);
};

export const getTabla19TipoRepresentanteFirmaAuditoraExternaDescripcion = (codigo: string): string => {
  const item = getTabla19TipoRepresentanteFirmaAuditoraExternaByCodigo(codigo);
  return item ? item.descripcion : '';
};

export const getTabla19TiposRepresentanteActivos = (): Tabla19TipoRepresentanteFirmaAuditoraExterna[] => {
  return TABLA_19_TIPO_REPRESENTANTE_FIRMA_AUDITORA_EXTERNA.filter(item => item.estado === 'ACTIVA');
}; 