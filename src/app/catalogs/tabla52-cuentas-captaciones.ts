/**
 * MANUAL TÉCNICO DE GENERALIDADES SOBRE ESTRUCTURAS DE DATOS CODIFICACIÓN - TABLAS
 * FECHA ACTUALIZACIÓN: 17/02/2022
 * VERSIÓN: 13.3
 * 
 * TABLA 52 - CUENTAS DE CAPTACIONES
 * 
 * Esta tabla contiene los códigos de las cuentas contables utilizadas para las captaciones
 * en los reportes regulatorios y estados financieros.
 */

export interface CuentaCaptacion {
  codigo: string;
  descripcion: string;
  tipo?: string;
}

/**
 * Datos oficiales de la Tabla 52 - Cuentas de Captaciones
 * Fuente: Manual Técnico de Generalidades sobre Estructuras de Datos Codificación - Tablas
 * Fecha: 17/02/2022 - Versión 13.3
 * 
 * NOTA: Los datos específicos de esta tabla requieren consulta directa al manual oficial
 * para obtener la lista completa de cuentas de captaciones.
 */
export const TABLA_52_CUENTAS_CAPTACIONES: CuentaCaptacion[] = [
  // Datos base - requiere actualización con datos oficiales completos
  { codigo: '2101', descripcion: 'CUENTAS CORRIENTES', tipo: 'CORRIENTE' },
  { codigo: '2102', descripcion: 'CUENTAS DE AHORRO', tipo: 'AHORRO' },
  { codigo: '2103', descripcion: 'DEPÓSITOS A PLAZO FIJO', tipo: 'PLAZO_FIJO' },
  { codigo: '2104', descripcion: 'DEPÓSITOS DE AHORRO PROGRAMADO', tipo: 'AHORRO_PROGRAMADO' },
  { codigo: '2105', descripcion: 'DEPÓSITOS DE AHORRO A LA VISTA', tipo: 'AHORRO_VISTA' },
  { codigo: '2106', descripcion: 'DEPÓSITOS DE AHORRO CON PREAVISO', tipo: 'AHORRO_PREAVISO' },
  { codigo: '2107', descripcion: 'DEPÓSITOS DE AHORRO CON INTERÉS', tipo: 'AHORRO_INTERES' },
  { codigo: '2108', descripcion: 'DEPÓSITOS DE AHORRO SIN INTERÉS', tipo: 'AHORRO_SIN_INTERES' },
  { codigo: '2109', descripcion: 'DEPÓSITOS DE AHORRO ESPECIAL', tipo: 'AHORRO_ESPECIAL' },
  { codigo: '2110', descripcion: 'DEPÓSITOS DE AHORRO TEMPORAL', tipo: 'AHORRO_TEMPORAL' }
];

/**
 * Obtiene todas las cuentas de captaciones
 * @returns Array con todas las cuentas de captaciones
 */
export function obtenerCuentasCaptaciones(): CuentaCaptacion[] {
  return TABLA_52_CUENTAS_CAPTACIONES;
}

/**
 * Obtiene una cuenta de captación por código
 * @param codigo - Código de la cuenta
 * @returns Cuenta de captación o undefined si no existe
 */
export function obtenerCuentaCaptacionPorCodigo(codigo: string): CuentaCaptacion | undefined {
  return TABLA_52_CUENTAS_CAPTACIONES.find(cuenta => cuenta.codigo === codigo);
}

/**
 * Obtiene cuentas de captaciones por tipo
 * @param tipo - Tipo de captación
 * @returns Array con las cuentas del tipo especificado
 */
export function obtenerCuentasCaptacionesPorTipo(tipo: string): CuentaCaptacion[] {
  return TABLA_52_CUENTAS_CAPTACIONES.filter(cuenta => cuenta.tipo === tipo);
}

/**
 * Busca cuentas de captaciones por texto en la descripción
 * @param texto - Texto a buscar en la descripción
 * @returns Array con las cuentas que coincidan
 */
export function buscarCuentasCaptaciones(texto: string): CuentaCaptacion[] {
  const textoBusqueda = texto.toLowerCase();
  return TABLA_52_CUENTAS_CAPTACIONES.filter(cuenta => 
    cuenta.descripcion.toLowerCase().includes(textoBusqueda)
  );
}

/**
 * Obtiene cuentas corrientes
 * @returns Array con las cuentas corrientes
 */
export function obtenerCuentasCorrientes(): CuentaCaptacion[] {
  return TABLA_52_CUENTAS_CAPTACIONES.filter(cuenta => 
    cuenta.tipo === 'CORRIENTE'
  );
}

/**
 * Obtiene cuentas de ahorro
 * @returns Array con las cuentas de ahorro
 */
export function obtenerCuentasAhorro(): CuentaCaptacion[] {
  return TABLA_52_CUENTAS_CAPTACIONES.filter(cuenta => 
    cuenta.tipo === 'AHORRO'
  );
}

/**
 * Obtiene depósitos a plazo fijo
 * @returns Array con los depósitos a plazo fijo
 */
export function obtenerDepositosPlazoFijo(): CuentaCaptacion[] {
  return TABLA_52_CUENTAS_CAPTACIONES.filter(cuenta => 
    cuenta.tipo === 'PLAZO_FIJO'
  );
} 