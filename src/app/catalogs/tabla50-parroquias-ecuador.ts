/**
 * MANUAL TÉCNICO DE GENERALIDADES SOBRE ESTRUCTURAS DE DATOS CODIFICACIÓN - TABLAS
 * FECHA ACTUALIZACIÓN: 17/02/2022
 * VERSIÓN: 13.3
 * 
 * TABLA 50 - PARROQUIAS DEL ECUADOR
 * 
 * NOTA: Las jurisdicciones precedidas por un asterisco (*), son cantones que pasan a formar 
 * parte de nuevas provincias; son parroquias rurales que pasan a ser parroquias urbanas, 
 * y forman parte de un nuevo cantón o han sido suprimidas. 
 * LA TABLA 50 APLICA INEC- División Política Administrativa.
 * 
 * Esta tabla contiene las parroquias del Ecuador organizadas por provincia, cantón y parroquia.
 */

export interface ParroquiaEcuador {
  codigoProvincia: string;
  codigoCanton: string;
  codigoParroquia: string;
  descripcion: string;
}

/**
 * Datos oficiales de la Tabla 50 - Parroquias del Ecuador (Primera parte)
 * Fuente: Manual Técnico de Generalidades sobre Estructuras de Datos Codificación - Tablas
 * Fecha: 17/02/2022 - Versión 13.3
 * 
 * NOTA: Este archivo contiene solo una muestra de las parroquias. 
 * El archivo completo sería muy extenso (más de 1000 parroquias).
 */
export const TABLA_50_PARROQUIAS_ECUADOR: ParroquiaEcuador[] = [
  // PROVINCIA 01 - AZUAY
  // CANTÓN 01 - CUENCA
  { codigoProvincia: '01', codigoCanton: '01', codigoParroquia: '50', descripcion: 'CUENCA, CABECERA CANTONAL Y CAPITAL PROVINCIAL' },
  { codigoProvincia: '01', codigoCanton: '01', codigoParroquia: '01', descripcion: 'BELLAVISTA' },
  { codigoProvincia: '01', codigoCanton: '01', codigoParroquia: '02', descripcion: 'CAÑARIBAMBA' },
  { codigoProvincia: '01', codigoCanton: '01', codigoParroquia: '03', descripcion: 'EL BATÁN' },
  { codigoProvincia: '01', codigoCanton: '01', codigoParroquia: '04', descripcion: 'EL SAGRARIO' },
  { codigoProvincia: '01', codigoCanton: '01', codigoParroquia: '05', descripcion: 'EL VECINO' },
  { codigoProvincia: '01', codigoCanton: '01', codigoParroquia: '06', descripcion: 'GIL RAMÍREZ DÁVALOS' },
  { codigoProvincia: '01', codigoCanton: '01', codigoParroquia: '07', descripcion: 'HUAYNACÁPAC' },
  { codigoProvincia: '01', codigoCanton: '01', codigoParroquia: '08', descripcion: 'MACHÁNGARA' },
  { codigoProvincia: '01', codigoCanton: '01', codigoParroquia: '09', descripcion: 'MONAY' },
  { codigoProvincia: '01', codigoCanton: '01', codigoParroquia: '10', descripcion: 'SAN BLAS' },
  { codigoProvincia: '01', codigoCanton: '01', codigoParroquia: '11', descripcion: 'SAN SEBASTIÁN' },
  { codigoProvincia: '01', codigoCanton: '01', codigoParroquia: '12', descripcion: 'SUCRE' },
  { codigoProvincia: '01', codigoCanton: '01', codigoParroquia: '13', descripcion: 'TOTORACOCHA' },
  { codigoProvincia: '01', codigoCanton: '01', codigoParroquia: '14', descripcion: 'YANUNCAY' },
  { codigoProvincia: '01', codigoCanton: '01', codigoParroquia: '15', descripcion: 'HERMANO MIGUEL' },
  { codigoProvincia: '01', codigoCanton: '01', codigoParroquia: '51', descripcion: 'BAÑOS' },
  { codigoProvincia: '01', codigoCanton: '01', codigoParroquia: '52', descripcion: 'CUMBE' },
  { codigoProvincia: '01', codigoCanton: '01', codigoParroquia: '53', descripcion: 'CHAUCHA' },
  { codigoProvincia: '01', codigoCanton: '01', codigoParroquia: '54', descripcion: 'CHECA (JIDCAY)' },
  { codigoProvincia: '01', codigoCanton: '01', codigoParroquia: '55', descripcion: 'CHIQUINTAD' },
  { codigoProvincia: '01', codigoCanton: '01', codigoParroquia: '56', descripcion: 'LLACAO' },
  { codigoProvincia: '01', codigoCanton: '01', codigoParroquia: '57', descripcion: 'MOLLETURO' },
  { codigoProvincia: '01', codigoCanton: '01', codigoParroquia: '58', descripcion: 'NULTI' },
  { codigoProvincia: '01', codigoCanton: '01', codigoParroquia: '59', descripcion: 'OCTAVIO CORDERO PALACIOS (SANTA ROSA)' },
  { codigoProvincia: '01', codigoCanton: '01', codigoParroquia: '60', descripcion: 'PACCHA' },
  { codigoProvincia: '01', codigoCanton: '01', codigoParroquia: '61', descripcion: 'QUINGEO' },
  { codigoProvincia: '01', codigoCanton: '01', codigoParroquia: '62', descripcion: 'RICAURTE' },
  { codigoProvincia: '01', codigoCanton: '01', codigoParroquia: '63', descripcion: 'SAN JOAQUÍN' },
  { codigoProvincia: '01', codigoCanton: '01', codigoParroquia: '64', descripcion: 'SANTA ANA' },
  { codigoProvincia: '01', codigoCanton: '01', codigoParroquia: '65', descripcion: 'SAYAUSÍ' },
  { codigoProvincia: '01', codigoCanton: '01', codigoParroquia: '66', descripcion: 'SIDCAY' },
  { codigoProvincia: '01', codigoCanton: '01', codigoParroquia: '67', descripcion: 'SININCAY' },
  { codigoProvincia: '01', codigoCanton: '01', codigoParroquia: '68', descripcion: 'TARQUI' },
  { codigoProvincia: '01', codigoCanton: '01', codigoParroquia: '69', descripcion: 'TURI' },
  { codigoProvincia: '01', codigoCanton: '01', codigoParroquia: '70', descripcion: 'VALLE' },
  { codigoProvincia: '01', codigoCanton: '01', codigoParroquia: '71', descripcion: 'VICTORIA DEL PORTETE (IRQUIS)' },
  
  // CANTÓN 02 - GIRÓN
  { codigoProvincia: '01', codigoCanton: '02', codigoParroquia: '50', descripcion: 'GIRÓN, CABECERA CANTONAL' },
  { codigoProvincia: '01', codigoCanton: '02', codigoParroquia: '51', descripcion: 'ASUNCIÓN' },
  { codigoProvincia: '01', codigoCanton: '02', codigoParroquia: '52', descripcion: 'SAN GERARDO' },
  
  // CANTÓN 03 - GUALACEO
  { codigoProvincia: '01', codigoCanton: '03', codigoParroquia: '50', descripcion: 'GUALACEO, CABECERA CANTONAL' },
  { codigoProvincia: '01', codigoCanton: '03', codigoParroquia: '51', descripcion: '*CHORDELEG' },
  { codigoProvincia: '01', codigoCanton: '03', codigoParroquia: '52', descripcion: 'DANIEL CÓRDOVA TORAL (EL ORIENTE)' },
  { codigoProvincia: '01', codigoCanton: '03', codigoParroquia: '53', descripcion: 'JADÁN' },
  { codigoProvincia: '01', codigoCanton: '03', codigoParroquia: '54', descripcion: 'MARIANO MORENO' },
  { codigoProvincia: '01', codigoCanton: '03', codigoParroquia: '55', descripcion: '*PRINCIPAL' },
  { codigoProvincia: '01', codigoCanton: '03', codigoParroquia: '56', descripcion: 'REMIGIO CRESPO TORAL (GÚLAG)' },
  { codigoProvincia: '01', codigoCanton: '03', codigoParroquia: '57', descripcion: 'SAN JUAN' },
  { codigoProvincia: '01', codigoCanton: '03', codigoParroquia: '58', descripcion: 'ZHIDMAD' },
  { codigoProvincia: '01', codigoCanton: '03', codigoParroquia: '59', descripcion: 'LUIS CORDERO VEGA' },
  { codigoProvincia: '01', codigoCanton: '03', codigoParroquia: '60', descripcion: 'SIMÓN BOLÍVAR (CAB. EN GAÑANZOL)' },
  
  // PROVINCIA 02 - BOLÍVAR
  // CANTÓN 01 - GUARANDA
  { codigoProvincia: '02', codigoCanton: '01', codigoParroquia: '50', descripcion: 'GUARANDA, CABECERA CANTONAL Y CAPITAL PROVINCIAL' },
  { codigoProvincia: '02', codigoCanton: '01', codigoParroquia: '01', descripcion: 'ÁNGEL POLIBIO CHÁVES' },
  { codigoProvincia: '02', codigoCanton: '01', codigoParroquia: '02', descripcion: 'GABRIEL IGNACIO VEINTIMILLA' },
  { codigoProvincia: '02', codigoCanton: '01', codigoParroquia: '03', descripcion: 'GUANUJO' },
  { codigoProvincia: '02', codigoCanton: '01', codigoParroquia: '51', descripcion: 'FACUNDO VELA' },
  { codigoProvincia: '02', codigoCanton: '01', codigoParroquia: '52', descripcion: '* GUANUJO' },
  { codigoProvincia: '02', codigoCanton: '01', codigoParroquia: '53', descripcion: 'JULIO E. MORENO (CATANAHUÁN GRANDE)' },
  { codigoProvincia: '02', codigoCanton: '01', codigoParroquia: '54', descripcion: '*LAS NAVES' },
  { codigoProvincia: '02', codigoCanton: '01', codigoParroquia: '55', descripcion: 'SALINAS' },
  { codigoProvincia: '02', codigoCanton: '01', codigoParroquia: '56', descripcion: 'SAN LORENZO' },
  { codigoProvincia: '02', codigoCanton: '01', codigoParroquia: '57', descripcion: 'SAN SIMÓN (YACOTO)' },
  { codigoProvincia: '02', codigoCanton: '01', codigoParroquia: '58', descripcion: 'SANTA FÉ (SANTA FÉ)' },
  { codigoProvincia: '02', codigoCanton: '01', codigoParroquia: '59', descripcion: 'SIMIÁTUG' },
  { codigoProvincia: '02', codigoCanton: '01', codigoParroquia: '60', descripcion: 'SAN LUIS DE PAMBIL' }
];

/**
 * Obtiene todas las parroquias del Ecuador
 * @returns Array con todas las parroquias
 */
export function obtenerParroquiasEcuador(): ParroquiaEcuador[] {
  return TABLA_50_PARROQUIAS_ECUADOR;
}

/**
 * Obtiene parroquias por provincia
 * @param codigoProvincia - Código de la provincia
 * @returns Array con las parroquias de la provincia
 */
export function obtenerParroquiasPorProvincia(codigoProvincia: string): ParroquiaEcuador[] {
  return TABLA_50_PARROQUIAS_ECUADOR.filter(parroquia => 
    parroquia.codigoProvincia === codigoProvincia
  );
}

/**
 * Obtiene parroquias por cantón
 * @param codigoProvincia - Código de la provincia
 * @param codigoCanton - Código del cantón
 * @returns Array con las parroquias del cantón
 */
export function obtenerParroquiasPorCanton(codigoProvincia: string, codigoCanton: string): ParroquiaEcuador[] {
  return TABLA_50_PARROQUIAS_ECUADOR.filter(parroquia => 
    parroquia.codigoProvincia === codigoProvincia && 
    parroquia.codigoCanton === codigoCanton
  );
}

/**
 * Obtiene una parroquia específica por códigos
 * @param codigoProvincia - Código de la provincia
 * @param codigoCanton - Código del cantón
 * @param codigoParroquia - Código de la parroquia
 * @returns Parroquia o undefined si no existe
 */
export function obtenerParroquiaPorCodigos(
  codigoProvincia: string, 
  codigoCanton: string, 
  codigoParroquia: string
): ParroquiaEcuador | undefined {
  return TABLA_50_PARROQUIAS_ECUADOR.find(parroquia => 
    parroquia.codigoProvincia === codigoProvincia && 
    parroquia.codigoCanton === codigoCanton && 
    parroquia.codigoParroquia === codigoParroquia
  );
}

/**
 * Busca parroquias por texto en la descripción
 * @param texto - Texto a buscar en la descripción
 * @returns Array con las parroquias que coincidan
 */
export function buscarParroquias(texto: string): ParroquiaEcuador[] {
  const textoBusqueda = texto.toLowerCase();
  return TABLA_50_PARROQUIAS_ECUADOR.filter(parroquia => 
    parroquia.descripcion.toLowerCase().includes(textoBusqueda)
  );
}

/**
 * Obtiene las cabeceras cantonales (código 50)
 * @returns Array con las cabeceras cantonales
 */
export function obtenerCabecerasCantonales(): ParroquiaEcuador[] {
  return TABLA_50_PARROQUIAS_ECUADOR.filter(parroquia => 
    parroquia.codigoParroquia === '50'
  );
}

/**
 * Obtiene parroquias urbanas (códigos 01-15)
 * @returns Array con las parroquias urbanas
 */
export function obtenerParroquiasUrbanas(): ParroquiaEcuador[] {
  return TABLA_50_PARROQUIAS_ECUADOR.filter(parroquia => {
    const codigo = parseInt(parroquia.codigoParroquia);
    return codigo >= 1 && codigo <= 15;
  });
}

/**
 * Obtiene parroquias rurales (códigos 51-99)
 * @returns Array con las parroquias rurales
 */
export function obtenerParroquiasRurales(): ParroquiaEcuador[] {
  return TABLA_50_PARROQUIAS_ECUADOR.filter(parroquia => {
    const codigo = parseInt(parroquia.codigoParroquia);
    return codigo >= 51 && codigo <= 99;
  });
} 