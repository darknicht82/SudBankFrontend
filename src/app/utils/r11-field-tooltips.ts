/**
 * TOOLTIPS Y GLOSARIO DE CAMPOS R04 - SALDOS DE OPERACIONES
 * Manual Técnico de Estructuras de Datos de Operaciones Activas y Contingentes
 * Superintendencia de Bancos del Ecuador - Versión 13.0 - 27/09/2023
 */

export interface R11FieldTooltip {
  no: number;
  campo: string;
  tipoDeDato: string;
  obligatoriedad: string;
  tabla: string;
  descripcion: string;
}

export const R11_FIELD_TOOLTIPS: R11FieldTooltip[] = [
  {
    "no": 1,
    "campo": "Tipo de identificación",
    "tipoDeDato": "Caracter (1)",
    "obligatoriedad": "X",
    "tabla": "4",
    "descripcion": "Tipo de documento de identificación del sujeto de riesgo. Valores: C=Cédula, R=RUC, E=Extranjero, P=Pasaporte."
  },
  {
    "no": 2,
    "campo": "Identificación del sujeto",
    "tipoDeDato": "Caracter (13)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Número de identificación del sujeto de riesgo. Para nacionales: RUC de 13 dígitos. Para extranjeros: número de identificación según país de origen."
  },
  {
    "no": 3,
    "campo": "Número de operación",
    "tipoDeDato": "Caracter (32)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Número único que identifica la operación crediticia en el sistema de la entidad financiera."
  },
  {
    "no": 4,
    "campo": "Entidad participante",
    "tipoDeDato": "Numérico (4)",
    "obligatoriedad": "X",
    "tabla": "2",
    "descripcion": "Código de la institución financiera que es partícipe del crédito participado. Debe incluirse también a la institución financiera que es considerada como “agente”."
  },
  {
    "no": 5,
    "campo": "Porcentaje de participación",
    "tipoDeDato": "Numérico (4,2)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Valor expresado en porcentaje con el que la entidad partícipe contribuye en el valor de la operación concedida (R02). Debe ser expresado en formato numérico, por ejemplo 14.5, 25.12, etc."
  },
  
];

/**
 * Información estructural de R04 - SALDOS DE OPERACIONES
 */
export const R11_STRUCTURE_INFO = {
  title: 'Estructura R04 - Saldos de Operaciones',
  description: 'Contiene los saldos de todas las operaciones crediticias activas y contingentes que se encuentren registradas en el balance de la entidad financiera a la fecha de corte. Incluye el detalle de operaciones por vencer, vencidas, y en diferentes rangos de morosidad.',
  periodicity: 'Mensual (M)',
  deadline: 'Según requerimientos de la Superintendencia de Bancos',
  source: 'Manual Técnico de Estructuras de Datos de Operaciones Activas y Contingentes - Versión 13.0 - 27/09/2023',
  bankCode: '1038 - Banco Sudamericano',
  fileFormat: 'r04Exxxxddmmaaaa.txt',
  requirements: {
    "table": "R04 - Saldos de Operaciones",
    "requisites": {
      "scope": [
        "Incluir todas las operaciones crediticias activas y contingentes",
        "Reportar saldos por vencer y vencidos según rangos de tiempo",
        "Incluir operaciones en diferentes estados de morosidad"
      ],
      "preconditions": [
        "La operación debe estar registrada en el sistema de la entidad",
        "Debe tener saldo pendiente a la fecha de corte"
      ],
      "fieldRules": [
        "Todos los campos numéricos deben expresarse en dólares",
        "Las fechas deben seguir el formato dd/mm/aaaa",
        "Los códigos deben corresponder a las tablas de referencia"
      ]
    }
  },
  fields: [
    {
      position: 1,
      name: 'Tipo de identificación',
      description: 'Tipo de documento del sujeto de riesgo',
      table: 'Tabla 4'
    },
    {
      position: 2,
      name: 'Identificación del sujeto',
      description: 'Número de identificación del sujeto',
      table: 'Sin tabla'
    },
    {
      position: 3,
      name: 'Número de operación',
      description: 'Identificador único de la operación',
      table: 'Sin tabla'
    },
    {
      position: 4,
      name: 'Días de morosidad',
      description: 'Días transcurridos desde el vencimiento',
      table: 'Sin tabla'
    },
    {
      position: 5,
      name: 'Metodología de calificación',
      description: 'Metodología utilizada para calificar el riesgo',
      table: 'Tabla 218'
    },
    {
      position: 6,
      name: 'Calificación propia',
      description: 'Calificación de riesgo asignada por la entidad',
      table: 'Tabla 29'
    },
    {
      position: 7,
      name: 'Calificación homologada',
      description: 'Calificación homologada por la Superintendencia de Bancos',
      table: 'Tabla 29'
    },
    {
      position: 8,
      name: 'Tasa de interés',
      description: 'Tasa de interés nominal anual aplicada a la operación',
      table: 'Sin tabla'
    },
    {
      position: 9,
      name: 'Valor por vencer de 1 a 30 días',
      description: 'Valor de capital e intereses que vencen entre 1 y 30 días',
      table: 'Sin tabla'
    },
    {
      position: 10,
      name: 'Valor por vencer de 31 a 90 días',
      description: 'Valor de capital e intereses que vencen entre 31 y 90 días',
      table: 'Sin tabla'
    },
    {
      position: 11,
      name: 'Valor por vencer de 91 a 180 días',
      description: 'Valor de capital e intereses que vencen entre 91 y 180 días',
      table: 'Sin tabla'
    },
    {
      position: 12,
      name: 'Valor por vencer de 181 a 360 días',
      description: 'Valor de capital e intereses que vencen entre 181 y 360 días',
      table: 'Sin tabla'
    },
    {
      position: 13,
      name: 'Valor por vencer de más de 360 días',
      description: 'Valor de capital e intereses que vencen después de 360 días',
      table: 'Sin tabla'
    },
    {
      position: 14,
      name: 'Valor que no devenga intereses de 1 a 30 días',
      description: 'Valor de capital que no devenga intereses de 1 a 30 días',
      table: 'Sin tabla'
    },
    {
      position: 15,
      name: 'Valor que no devenga intereses de 31 a 90 días',
      description: 'Valor de capital que no devenga intereses de 31 a 90 días',
      table: 'Sin tabla'
    },
    {
      position: 16,
      name: 'Valor que no devenga intereses de 91 a 180 días',
      description: 'Valor de capital que no devenga intereses de 91 a 180 días',
      table: 'Sin tabla'
    },
    {
      position: 17,
      name: 'Valor que no devenga intereses de 181 a 360 días',
      description: 'Valor de capital que no devenga intereses de 181 a 360 días',
      table: 'Sin tabla'
    },
    {
      position: 18,
      name: 'Valor que no devenga intereses de más de 360 días',
      description: 'Valor de capital que no devenga intereses de más de 360 días',
      table: 'Sin tabla'
    },
    {
      position: 19,
      name: 'Valor vencido de 1 a 30 días',
      description: 'Valor vencido entre 1 y 30 días desde la fecha de corte',
      table: 'Sin tabla'
    },
    {
      position: 20,
      name: 'Valor vencido de 31 a 90 días',
      description: 'Valor vencido entre 31 y 90 días desde la fecha de corte',
      table: 'Sin tabla'
    },
    {
      position: 21,
      name: 'Valor vencido de 91 a 180 días',
      description: 'Valor vencido entre 91 y 180 días desde la fecha de corte',
      table: 'Sin tabla'
    },
    {
      position: 22,
      name: 'Valor vencido de 181 a 360 días',
      description: 'Valor vencido entre 181 y 360 días desde la fecha de corte',
      table: 'Sin tabla'
    },
    {
      position: 23,
      name: 'Valor vencido de más de 360 días',
      description: 'Valor vencido después de 360 días desde la fecha de corte',
      table: 'Sin tabla'
    },
    {
      position: 24,
      name: 'Valor vencido de 181 a 270 días',
      description: 'Valor vencido entre 181 y 270 días desde la fecha de corte',
      table: 'Sin tabla'
    },
    {
      position: 25,
      name: 'Valor vencido de más de 270 días',
      description: 'Valor vencido después de 270 días desde la fecha de corte',
      table: 'Sin tabla'
    },
    {
      position: 26,
      name: 'Valor vencido de 91 a 270 días',
      description: 'Valor vencido entre 91 y 270 días desde la fecha de corte',
      table: 'Sin tabla'
    },
    {
      position: 27,
      name: 'Valor vencido de 271 a 360 días',
      description: 'Valor vencido entre 271 y 360 días desde la fecha de corte',
      table: 'Sin tabla'
    },
    {
      position: 28,
      name: 'Valor vencido de 361 a 720 días',
      description: 'Valor vencido entre 361 y 720 días desde la fecha de corte',
      table: 'Sin tabla'
    },
    {
      position: 29,
      name: 'Valor vencido de más de 720 días',
      description: 'Valor vencido después de 720 días desde la fecha de corte',
      table: 'Sin tabla'
    },
    {
      position: 30,
      name: 'Gastos de recuperación de cartera vencida',
      description: 'Gastos incurridos en la recuperación de cartera vencida',
      table: 'Sin tabla'
    },
    {
      position: 31,
      name: 'Interés ordinario',
      description: 'Intereses ordinarios devengados y no pagados',
      table: 'Sin tabla'
    },
    {
      position: 32,
      name: 'Interés sobre mora',
      description: 'Intereses de mora devengados y no pagados',
      table: 'Sin tabla'
    },
    {
      position: 33,
      name: 'Valor en demanda judicial',
      description: 'Valor de la operación que se encuentra en proceso judicial',
      table: 'Sin tabla'
    },
    {
      position: 34,
      name: 'Cartera castigada',
      description: 'Valor de la cartera que ha sido castigada por la entidad',
      table: 'Sin tabla'
    },
    {
      position: 35,
      name: 'Provisión requerida original',
      description: 'Provisión requerida originalmente según normativa vigente',
      table: 'Sin tabla'
    },
    {
      position: 36,
      name: 'Provisión requerida reducida',
      description: 'Provisión requerida reducida por garantías o avales',
      table: 'Sin tabla'
    },
    {
      position: 37,
      name: 'Provisión constituida',
      description: 'Provisión efectivamente constituida por la entidad',
      table: 'Sin tabla'
    },
    {
      position: 38,
      name: 'Tipo de operación',
      description: 'Tipo de operación crediticia según clasificación de la entidad',
      table: 'Tabla 35'
    },
    {
      position: 39,
      name: 'Objeto del fideicomiso',
      description: 'Objeto del fideicomiso cuando aplica',
      table: 'Tabla 55'
    },
    {
      position: 40,
      name: 'Prima o descuento',
      description: 'Prima o descuento aplicado a la operación',
      table: 'Sin tabla'
    },
    {
      position: 41,
      name: 'Cuota del crédito',
      description: 'Valor de la cuota del crédito',
      table: 'Sin tabla'
    },
    {
      position: 42,
      name: 'Valor de Intereses de la Cuota del Crédito',
      description: 'Valor de los intereses incluidos en la cuota del crédito',
      table: 'Sin tabla'
    },
    {
      position: 43,
      name: 'Valor del Seguro',
      description: 'Valor del seguro asociado a la operación',
      table: 'Sin tabla'
    },
    {
      position: 44,
      name: 'Saldo de la cuota de capital diferida',
      description: 'Saldo de capital diferido en la cuota',
      table: 'Sin tabla'
    },
    {
      position: 45,
      name: 'Valor del interés de capital diferido',
      description: 'Valor de los intereses del capital diferido',
      table: 'Sin tabla'
    },
    {
      position: 46,
      name: 'Fecha de transferencia a cuentas vencidas',
      description: 'Fecha en que la operación fue transferida a cuentas vencidas',
      table: 'Sin tabla'
    },
    {
      position: 47,
      name: 'Intereses acumulados por cobrar',
      description: 'Intereses acumulados por cobrar',
      table: 'Sin tabla'
    },
    {
      position: 48,
      name: 'Intereses reversados',
      description: 'Intereses que han sido reversados',
      table: 'Sin tabla'
    },
    {
      position: 49,
      name: 'Fecha de exigibilidad de la cuota',
      description: 'Fecha en que la cuota se vuelve exigible',
      table: 'Sin tabla'
    },
    {
      position: 50,
      name: 'Tipo de sistema de amortización',
      description: 'Tipo de sistema de amortización aplicado a la operación',
      table: 'Tabla 317'
    }
  ]
};

/**
 * Obtener tooltip para un campo específico de R04
 */
export function getR04FieldTooltip(fieldName: string): R11FieldTooltip | null {
  return R11_FIELD_TOOLTIPS.find(tooltip => tooltip.campo === fieldName) || null;
}

/**
 * Obtener todos los tooltips de R04
 */
export function getAllR04FieldTooltips(): R11FieldTooltip[] {
  return R11_FIELD_TOOLTIPS;
}
