/**
 * TOOLTIPS Y GLOSARIO DE CAMPOS L08
 * Manual de Riesgos de Mercado y Liquidez - Marzo 2021
 * Superintendencia de Bancos del Ecuador
 */

export interface FieldTooltip {
  field: string;
  title: string;
  description: string;
  source: string;
  example?: string;
}

export const L08_FIELD_TOOLTIPS: FieldTooltip[] = [
  {
    field: 'codigoLiquidez',
    title: 'Código de Liquidez',
    description: 'Código numérico que identifica la clase de información reportada. Corresponde a las cuentas contables definidas en la Tabla 59 del manual SB.',
    source: 'Manual SB - Tabla 59: Cuentas para Liquidez Estructural',
    example: '130505 = Depósitos a la vista en moneda nacional'
  },
  {
    field: 'tipoIdentificacion',
    title: 'Tipo de Identificación',
    description: 'Tipo de documento de identificación de la entidad. "R" para RUC (nacional) o "E" para extranjero.',
    source: 'Manual SB - Tabla 4: Tipo de Identificación',
    example: 'R = RUC, E = Extranjero'
  },
  {
    field: 'identificacionEntidad',
    title: 'Identificación de la Entidad',
    description: 'Número de identificación de la entidad (RUC para nacionales, documento extranjero para extranjeros). Máximo 13 caracteres.',
    source: 'Manual SB - Estructura L08',
    example: '1790013210001'
  },
  {
    field: 'tipoInstrumento',
    title: 'Tipo de Instrumento',
    description: 'Código que identifica el tipo de instrumento financiero según la Tabla 62 del manual SB.',
    source: 'Manual SB - Tabla 62: Tipos de Instrumento',
    example: '10 = Bonos del Tesoro, 20 = Bonos Corporativos'
  },
  {
    field: 'calificacionEntidad',
    title: 'Calificación de Entidad',
    description: 'Calificación de riesgo asignada a la entidad emisora según la Tabla 65 del manual SB.',
    source: 'Manual SB - Tabla 65: Calificación del Emisor',
    example: '1 = AAA, 2 = AA+, 3 = AA'
  },
  {
    field: 'calificadoraRiesgo',
    title: 'Calificadora de Riesgo',
    description: 'Código de la calificadora de riesgo que asignó la calificación según la Tabla 66 del manual SB.',
    source: 'Manual SB - Tabla 66: Calificadoras de Riesgo',
    example: '1 = Pacific Credit Rating, 2 = Fitch Ratings'
  },
  {
    field: 'valorLunes',
    title: 'Valor Lunes',
    description: 'Saldo contable del instrumento al lunes de la semana reportada. Sin separadores de miles ni moneda.',
    source: 'Manual SB - Estructura L08',
    example: '1000000.00'
  },
  {
    field: 'valorMartes',
    title: 'Valor Martes',
    description: 'Saldo contable del instrumento al martes de la semana reportada. Sin separadores de miles ni moneda.',
    source: 'Manual SB - Estructura L08',
    example: '1050000.00'
  },
  {
    field: 'valorMiercoles',
    title: 'Valor Miércoles',
    description: 'Saldo contable del instrumento al miércoles de la semana reportada. Sin separadores de miles ni moneda.',
    source: 'Manual SB - Estructura L08',
    example: '1100000.00'
  },
  {
    field: 'valorJueves',
    title: 'Valor Jueves',
    description: 'Saldo contable del instrumento al jueves de la semana reportada. Sin separadores de miles ni moneda.',
    source: 'Manual SB - Estructura L08',
    example: '1150000.00'
  },
  {
    field: 'valorViernes',
    title: 'Valor Viernes',
    description: 'Saldo contable del instrumento al viernes de la semana reportada. Sin separadores de miles ni moneda.',
    source: 'Manual SB - Estructura L08',
    example: '1200000.00'
  }
];

/**
 * Obtener tooltip para un campo específico
 */
export function getFieldTooltip(fieldName: string): FieldTooltip | null {
  return L08_FIELD_TOOLTIPS.find(tooltip => tooltip.field === fieldName) || null;
}

/**
 * Obtener todos los tooltips
 */
export function getAllFieldTooltips(): FieldTooltip[] {
  return L08_FIELD_TOOLTIPS;
}

/**
 * Información adicional sobre la estructura L08
 */
export const L08_STRUCTURE_INFO = {
  title: 'Estructura L08 - Liquidez Estructural',
  description: 'Esta estructura es parte de la medición estructural del riesgo de liquidez, que considera la composición de activos y pasivos líquidos en una posición estática a una fecha determinada.',
  periodicity: 'Semanal',
  deadline: 'Lunes siguiente a la semana reportada',
  source: 'Manual de Riesgos de Mercado y Liquidez - Marzo 2021',
  requirements: [
    'Mínimo 1 registro de detalle obligatorio',
    'Valores sin separadores de miles ni moneda',
    'Fechas en formato dd/mm/aaaa',
    'Códigos según catálogos oficiales SB'
  ]
};
 