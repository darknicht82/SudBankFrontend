/**
 * MODELOS DE AUDITORÍA Y TRAZABILIDAD PARA L01
 * Manual de Control de Inversiones - Marzo 2017
 * Superintendencia de Bancos del Ecuador
 */

export interface ChangeLog {
  id: number;
  recordId: number;           // ID del registro L01 afectado
  campo: string;              // Campo modificado o 'REGISTRO_COMPLETO' para operaciones completas
  valorAnterior: any;         // Valor anterior del campo
  valorNuevo: any;            // Nuevo valor del campo
  fechaCambio: Date;          // Timestamp del cambio
  usuario: string;            // Usuario responsable del cambio
  tipoOperacion: 'CREAR' | 'MODIFICAR' | 'ELIMINAR' | 'RESTAURAR';
  comentario?: string;        // Comentario opcional del cambio
  ipAddress?: string;         // Dirección IP del usuario
  userAgent?: string;         // Navegador/dispositivo del usuario
  sessionId?: string;         // ID de sesión
}

export interface L01AuditSummary {
  recordId: number;
  totalChanges: number;
  lastModified: Date;
  lastModifiedBy: string;
  creationDate: Date;
  createdBy: string;
  status: 'ACTIVO' | 'INACTIVO' | 'ELIMINADO';
}

export interface L01AuditFilter {
  recordId?: number;
  usuario?: string;
  tipoOperacion?: string;
  fechaDesde?: Date;
  fechaHasta?: Date;
  campo?: string;
}

export interface L01AuditResponse {
  changes: ChangeLog[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// Enums para tipos de operación
export enum AuditOperationType {
  CREAR = 'CREAR',
  MODIFICAR = 'MODIFICAR',
  ELIMINAR = 'ELIMINAR',
  RESTAURAR = 'RESTAURAR'
}

// Enums para campos auditables
export enum L01AuditableFields {
  TIPO_IDENTIFICACION = 'tipoIdentificacion',
  IDENTIFICACION = 'identificacion',
  CLASIFICACION = 'clasificacion',
  TIPO_EMISOR = 'tipoEmisor',
  ESTADO = 'estado',
  REGISTRO_COMPLETO = 'REGISTRO_COMPLETO'
}

// Interfaz para resumen de auditoría por registro
export interface RecordAuditSummary {
  recordId: number;
  identificacion: string;
  tipoIdentificacion: string;
  clasificacion: number;
  tipoEmisor: number;
  totalModificaciones: number;
  ultimaModificacion: Date;
  usuarioUltimaModificacion: string;
  fechaCreacion: Date;
  usuarioCreacion: string;
  estado: string;
}
