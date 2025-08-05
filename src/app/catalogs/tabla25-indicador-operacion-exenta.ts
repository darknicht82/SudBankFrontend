/**
 * TABLA 25 - INDICADOR DE OPERACIÓN EXENTA
 * Manual Técnico de Generalidades sobre Estructuras de Datos Codificación - Tablas
 * Fecha Actualización: 17/02/2022 - Versión: 13.3
 * Superintendencia de Bancos del Ecuador
 * 
 * Excepciones a los límites para operaciones activas y contingentes (Art. 211 del COMYF)
 */

export interface Tabla25IndicadorOperacionExenta {
  codigo: string;
  descripcion: string;
  estado: 'ACTIVA' | 'INACTIVA';
}

export const TABLA_25_INDICADOR_OPERACION_EXENTA: Tabla25IndicadorOperacionExenta[] = [
  { 
    codigo: 'A', 
    descripcion: 'Los créditos destinados al financiamiento de las exportaciones luego de realizado el embarque, que tuviesen la garantía de créditos irrevocables, abiertos por bancos calificados por el organismo de control como de reconocida solvencia del exterior', 
    estado: 'ACTIVA' 
  },
  { 
    codigo: 'B', 
    descripcion: 'Las cartas de crédito confirmadas de importación y las garantías que se emitan con respaldos de contra garantías suficientes, de conformidad con la regulación que emita la Junta de Política y Regulación Monetaria y Financiera', 
    estado: 'ACTIVA' 
  },
  { 
    codigo: 'C', 
    descripcion: 'Las garantías otorgadas por cuenta y riesgo de entidades financieras privadas del exterior, calificadas por el organismo de control como de reconocida solvencia, siempre que cuenten con el respaldo documentario suficiente, en seguridad y a satisfacción de la entidad, de conformidad con la regulación que emita la Junta de Política y Regulación Monetaria y Financiera', 
    estado: 'ACTIVA' 
  },
  { 
    codigo: 'D', 
    descripcion: 'Las operaciones activas y contingentes entre entidades financieras, con las restricciones que determine la Junta de Política y Regulación Monetaria y Financiera', 
    estado: 'ACTIVA' 
  },
  { 
    codigo: 'N', 
    descripcion: 'No es exenta', 
    estado: 'ACTIVA' 
  },
  { 
    codigo: 'P', 
    descripcion: 'Operación exenta (para uso del BEDE)', 
    estado: 'ACTIVA' 
  }
];

// ============================================================================
// FUNCIONES DE CONSULTA Y VALIDACIÓN
// ============================================================================

export const getTabla25IndicadorOperacionExenta = (): Tabla25IndicadorOperacionExenta[] => {
  return TABLA_25_INDICADOR_OPERACION_EXENTA;
};

export const getTabla25IndicadorOperacionExentaByCodigo = (codigo: string): Tabla25IndicadorOperacionExenta | undefined => {
  return TABLA_25_INDICADOR_OPERACION_EXENTA.find(item => item.codigo === codigo);
};

export const getTabla25IndicadorOperacionExentaDescripcion = (codigo: string): string => {
  const item = getTabla25IndicadorOperacionExentaByCodigo(codigo);
  return item ? item.descripcion : '';
};

export const getTabla25IndicadoresOperacionExentaActivos = (): Tabla25IndicadorOperacionExenta[] => {
  return TABLA_25_INDICADOR_OPERACION_EXENTA.filter(item => item.estado === 'ACTIVA');
};

export const getTabla25OperacionesExentas = (): Tabla25IndicadorOperacionExenta[] => {
  return TABLA_25_INDICADOR_OPERACION_EXENTA.filter(item => 
    ['A', 'B', 'C', 'D', 'P'].includes(item.codigo) && item.estado === 'ACTIVA'
  );
};

export const getTabla25OperacionesNoExentas = (): Tabla25IndicadorOperacionExenta[] => {
  return TABLA_25_INDICADOR_OPERACION_EXENTA.filter(item => 
    item.codigo === 'N' && item.estado === 'ACTIVA'
  );
}; 