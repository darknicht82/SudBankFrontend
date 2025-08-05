/**
 * MANUAL TÉCNICO DE GENERALIDADES SOBRE ESTRUCTURAS DE DATOS CODIFICACIÓN - TABLAS
 * FECHA ACTUALIZACIÓN: 17/02/2022
 * VERSIÓN: 13.3
 * 
 * TABLA 73 - TIPOS DE CLIENTE / TIPOS DE EMISOR PARA BCE, BIESS
 * 
 * Esta tabla contiene los códigos para identificar los diferentes tipos de cliente
 * y emisor utilizados en las operaciones bancarias y reportes regulatorios.
 */

export interface TipoClienteEmisor {
  codigo: string;
  descripcion: string;
  categoria?: string;
}

/**
 * Datos oficiales de la Tabla 73 - Tipos de Cliente / Tipos de Emisor para BCE, BIESS
 * Fuente: Manual Técnico de Generalidades sobre Estructuras de Datos Codificación - Tablas
 * Fecha: 17/02/2022 - Versión 13.3
 * 
 * NOTA: Los datos específicos de esta tabla requieren consulta directa al manual oficial
 * para obtener la lista completa de tipos de cliente y emisor.
 */
export const TABLA_73_TIPOS_CLIENTE_EMISOR: TipoClienteEmisor[] = [
  // Datos base - requiere actualización con datos oficiales completos
  { codigo: '1', descripcion: 'BANCO CENTRAL DEL ECUADOR', categoria: 'EMISOR' },
  { codigo: '2', descripcion: 'BIESS', categoria: 'EMISOR' },
  { codigo: '3', descripcion: 'PERSONA NATURAL', categoria: 'CLIENTE' },
  { codigo: '4', descripcion: 'PERSONA JURÍDICA', categoria: 'CLIENTE' },
  { codigo: '5', descripcion: 'EMPRESA PÚBLICA', categoria: 'CLIENTE' },
  { codigo: '6', descripcion: 'EMPRESA PRIVADA', categoria: 'CLIENTE' },
  { codigo: '7', descripcion: 'GOBIERNO CENTRAL', categoria: 'CLIENTE' },
  { codigo: '8', descripcion: 'GOBIERNOS AUTÓNOMOS DESCENTRALIZADOS', categoria: 'CLIENTE' },
  { codigo: '9', descripcion: 'INSTITUCIONES FINANCIERAS', categoria: 'CLIENTE' },
  { codigo: '10', descripcion: 'OTRAS ENTIDADES', categoria: 'CLIENTE' }
];

/**
 * Obtiene todos los tipos de cliente y emisor
 * @returns Array con todos los tipos de cliente y emisor
 */
export function obtenerTiposClienteEmisor(): TipoClienteEmisor[] {
  return TABLA_73_TIPOS_CLIENTE_EMISOR;
}

/**
 * Obtiene un tipo de cliente/emisor por código
 * @param codigo - Código del tipo
 * @returns Tipo de cliente/emisor o undefined si no existe
 */
export function obtenerTipoClienteEmisorPorCodigo(codigo: string): TipoClienteEmisor | undefined {
  return TABLA_73_TIPOS_CLIENTE_EMISOR.find(tipo => tipo.codigo === codigo);
}

/**
 * Obtiene tipos por categoría
 * @param categoria - Categoría (EMISOR o CLIENTE)
 * @returns Array con los tipos de la categoría especificada
 */
export function obtenerTiposPorCategoria(categoria: string): TipoClienteEmisor[] {
  return TABLA_73_TIPOS_CLIENTE_EMISOR.filter(tipo => tipo.categoria === categoria);
}

/**
 * Busca tipos de cliente/emisor por texto en la descripción
 * @param texto - Texto a buscar en la descripción
 * @returns Array con los tipos que coincidan
 */
export function buscarTiposClienteEmisor(texto: string): TipoClienteEmisor[] {
  const textoBusqueda = texto.toLowerCase();
  return TABLA_73_TIPOS_CLIENTE_EMISOR.filter(tipo => 
    tipo.descripcion.toLowerCase().includes(textoBusqueda)
  );
}

/**
 * Obtiene emisores (BCE, BIESS)
 * @returns Array con los emisores
 */
export function obtenerEmisores(): TipoClienteEmisor[] {
  return TABLA_73_TIPOS_CLIENTE_EMISOR.filter(tipo => 
    tipo.categoria === 'EMISOR'
  );
}

/**
 * Obtiene clientes
 * @returns Array con los clientes
 */
export function obtenerClientes(): TipoClienteEmisor[] {
  return TABLA_73_TIPOS_CLIENTE_EMISOR.filter(tipo => 
    tipo.categoria === 'CLIENTE'
  );
}

/**
 * Obtiene personas naturales
 * @returns Array con las personas naturales
 */
export function obtenerPersonasNaturales(): TipoClienteEmisor[] {
  return TABLA_73_TIPOS_CLIENTE_EMISOR.filter(tipo => 
    tipo.codigo === '3'
  );
}

/**
 * Obtiene personas jurídicas
 * @returns Array con las personas jurídicas
 */
export function obtenerPersonasJuridicas(): TipoClienteEmisor[] {
  return TABLA_73_TIPOS_CLIENTE_EMISOR.filter(tipo => 
    tipo.codigo === '4'
  );
} 