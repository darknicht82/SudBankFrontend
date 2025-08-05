/**
 * TABLA 20 - TIPO DE OFICINA DE FIRMA AUDITORA EXTERNA
 * Manual Técnico de Generalidades sobre Estructuras de Datos Codificación - Tablas
 * Fecha Actualización: 17/02/2022 - Versión: 13.3
 * Superintendencia de Bancos del Ecuador
 */

export interface Tabla20TipoOficinaFirmaAuditoraExterna {
  codigo: string;
  descripcion: string;
  estado: 'ACTIVA' | 'INACTIVA';
}

export const TABLA_20_TIPO_OFICINA_FIRMA_AUDITORA_EXTERNA: Tabla20TipoOficinaFirmaAuditoraExterna[] = [
  { codigo: 'MA', descripcion: 'MATRIZ', estado: 'ACTIVA' },
  { codigo: 'SU', descripcion: 'SUCURSAL', estado: 'ACTIVA' }
];

// ============================================================================
// FUNCIONES DE CONSULTA Y VALIDACIÓN
// ============================================================================

export const getTabla20TipoOficinaFirmaAuditoraExterna = (): Tabla20TipoOficinaFirmaAuditoraExterna[] => {
  return TABLA_20_TIPO_OFICINA_FIRMA_AUDITORA_EXTERNA;
};

export const getTabla20TipoOficinaFirmaAuditoraExternaByCodigo = (codigo: string): Tabla20TipoOficinaFirmaAuditoraExterna | undefined => {
  return TABLA_20_TIPO_OFICINA_FIRMA_AUDITORA_EXTERNA.find(item => item.codigo === codigo);
};

export const getTabla20TipoOficinaFirmaAuditoraExternaDescripcion = (codigo: string): string => {
  const item = getTabla20TipoOficinaFirmaAuditoraExternaByCodigo(codigo);
  return item ? item.descripcion : '';
};

export const getTabla20TiposOficinaActivos = (): Tabla20TipoOficinaFirmaAuditoraExterna[] => {
  return TABLA_20_TIPO_OFICINA_FIRMA_AUDITORA_EXTERNA.filter(item => item.estado === 'ACTIVA');
}; 