/**
 * MANUAL TÉCNICO DE GENERALIDADES SOBRE ESTRUCTURAS DE DATOS CODIFICACIÓN - TABLAS
 * FECHA ACTUALIZACIÓN: 17/02/2022
 * VERSIÓN: 13.3
 * 
 * TABLA 51 - CUENTAS DE COLOCACIONES
 * 
 * Esta tabla contiene los códigos de las cuentas contables utilizadas para las colocaciones
 * en los reportes regulatorios y estados financieros.
 */

export interface CuentaColocacion {
  codigo: string;
  descripcion: string;
  tipo?: string;
}

/**
 * Datos oficiales de la Tabla 51 - Cuentas de Colocaciones
 * Fuente: Manual Técnico de Generalidades sobre Estructuras de Datos Codificación - Tablas
 * Fecha: 17/02/2022 - Versión 13.3
 * 
 * NOTA: Los datos específicos de esta tabla requieren consulta directa al manual oficial
 * para obtener la lista completa de cuentas de colocaciones.
 */
export const TABLA_51_CUENTAS_COLOCACIONES: CuentaColocacion[] = [
  // Datos base - requiere actualización con datos oficiales completos
  { codigo: '1301', descripcion: 'CRÉDITOS COMERCIALES', tipo: 'COMERCIAL' },
  { codigo: '1302', descripcion: 'CRÉDITOS DE CONSUMO', tipo: 'CONSUMO' },
  { codigo: '1303', descripcion: 'CRÉDITOS HIPOTECARIOS', tipo: 'HIPOTECARIO' },
  { codigo: '1304', descripcion: 'CRÉDITOS MICROEMPRESARIALES', tipo: 'MICROEMPRESA' },
  { codigo: '1305', descripcion: 'CRÉDITOS A LA PEQUEÑA EMPRESA', tipo: 'PEQUEÑA_EMPRESA' },
  { codigo: '1306', descripcion: 'CRÉDITOS A LA MEDIANA EMPRESA', tipo: 'MEDIANA_EMPRESA' },
  { codigo: '1307', descripcion: 'CRÉDITOS A LA GRAN EMPRESA', tipo: 'GRAN_EMPRESA' },
  { codigo: '1308', descripcion: 'CRÉDITOS DE VIVIENDA', tipo: 'VIVIENDA' },
  { codigo: '1309', descripcion: 'CRÉDITOS DE EDUCACIÓN', tipo: 'EDUCACIÓN' },
  { codigo: '1310', descripcion: 'CRÉDITOS DE VEHÍCULOS', tipo: 'VEHÍCULOS' }
];

/**
 * Obtiene todas las cuentas de colocaciones
 * @returns Array con todas las cuentas de colocaciones
 */
export function obtenerCuentasColocaciones(): CuentaColocacion[] {
  return TABLA_51_CUENTAS_COLOCACIONES;
}

/**
 * Obtiene una cuenta de colocación por código
 * @param codigo - Código de la cuenta
 * @returns Cuenta de colocación o undefined si no existe
 */
export function obtenerCuentaColocacionPorCodigo(codigo: string): CuentaColocacion | undefined {
  return TABLA_51_CUENTAS_COLOCACIONES.find(cuenta => cuenta.codigo === codigo);
}

/**
 * Obtiene cuentas de colocaciones por tipo
 * @param tipo - Tipo de colocación
 * @returns Array con las cuentas del tipo especificado
 */
export function obtenerCuentasColocacionesPorTipo(tipo: string): CuentaColocacion[] {
  return TABLA_51_CUENTAS_COLOCACIONES.filter(cuenta => cuenta.tipo === tipo);
}

/**
 * Busca cuentas de colocaciones por texto en la descripción
 * @param texto - Texto a buscar en la descripción
 * @returns Array con las cuentas que coincidan
 */
export function buscarCuentasColocaciones(texto: string): CuentaColocacion[] {
  const textoBusqueda = texto.toLowerCase();
  return TABLA_51_CUENTAS_COLOCACIONES.filter(cuenta => 
    cuenta.descripcion.toLowerCase().includes(textoBusqueda)
  );
}

/**
 * Obtiene cuentas de colocaciones comerciales
 * @returns Array con las cuentas comerciales
 */
export function obtenerCuentasComerciales(): CuentaColocacion[] {
  return TABLA_51_CUENTAS_COLOCACIONES.filter(cuenta => 
    cuenta.tipo === 'COMERCIAL'
  );
}

/**
 * Obtiene cuentas de colocaciones de consumo
 * @returns Array con las cuentas de consumo
 */
export function obtenerCuentasConsumo(): CuentaColocacion[] {
  return TABLA_51_CUENTAS_COLOCACIONES.filter(cuenta => 
    cuenta.tipo === 'CONSUMO'
  );
}

/**
 * Obtiene cuentas de colocaciones hipotecarias
 * @returns Array con las cuentas hipotecarias
 */
export function obtenerCuentasHipotecarias(): CuentaColocacion[] {
  return TABLA_51_CUENTAS_COLOCACIONES.filter(cuenta => 
    cuenta.tipo === 'HIPOTECARIO'
  );
} 