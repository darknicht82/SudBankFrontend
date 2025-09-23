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
    "campo": "Días de morosidad",
    "tipoDeDato": "Numérico (5)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Número de días transcurridos desde la fecha de vencimiento de la cuota hasta la fecha de corte. Si la operación está al día, registrar 0."
  },
  {
    "no": 5,
    "campo": "Metodología de calificación",
    "tipoDeDato": "Caracter (1)",
    "obligatoriedad": "X",
    "tabla": "218",
    "descripcion": "Metodología utilizada para calificar el riesgo de la operación. Valores según tabla 218."
  },
  {
    "no": 6,
    "campo": "Calificación propia",
    "tipoDeDato": "Caracter (2)",
    "obligatoriedad": "X",
    "tabla": "29",
    "descripcion": "Calificación de riesgo asignada por la entidad financiera según su metodología interna. Valores según tabla 29."
  },
  {
    "no": 7,
    "campo": "Calificación homologada",
    "tipoDeDato": "Caracter (2)",
    "obligatoriedad": "X*",
    "tabla": "29",
    "descripcion": "Calificación homologada por la Superintendencia de Bancos. Obligatoria cuando existe. Valores según tabla 29."
  },
  {
    "no": 8,
    "campo": "Tasa de interés",
    "tipoDeDato": "Numérico (4,2)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Tasa de interés nominal anual aplicada a la operación, expresada en porcentaje (ej: 12.50)."
  },
  {
    "no": 9,
    "campo": "Valor por vencer de 1 a 30 días",
    "tipoDeDato": "Numérico (15,2)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Valor de capital e intereses que vencen entre 1 y 30 días desde la fecha de corte."
  },
  {
    "no": 10,
    "campo": "Valor por vencer de 31 a 90 días",
    "tipoDeDato": "Numérico (15,2)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Valor de capital e intereses que vencen entre 31 y 90 días desde la fecha de corte."
  },
  {
    "no": 11,
    "campo": "Valor por vencer de 91 a 180 días",
    "tipoDeDato": "Numérico (15,2)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Valor de capital e intereses que vencen entre 91 y 180 días desde la fecha de corte."
  },
  {
    "no": 12,
    "campo": "Valor por vencer de 181 a 360 días",
    "tipoDeDato": "Numérico (15,2)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Valor de capital e intereses que vencen entre 181 y 360 días desde la fecha de corte."
  },
  {
    "no": 13,
    "campo": "Valor por vencer de más de 360 días",
    "tipoDeDato": "Numérico (15,2)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Valor de capital e intereses que vencen después de 360 días desde la fecha de corte."
  },
  {
    "no": 14,
    "campo": "Valor que no devenga intereses de 1 a 30 días",
    "tipoDeDato": "Numérico (15,2)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Valor de capital que no devenga intereses y vence entre 1 y 30 días desde la fecha de corte."
  },
  {
    "no": 15,
    "campo": "Valor que no devenga intereses de 31 a 90 días",
    "tipoDeDato": "Numérico (15,2)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Valor de capital que no devenga intereses y vence entre 31 y 90 días desde la fecha de corte."
  },
  {
    "no": 16,
    "campo": "Valor que no devenga intereses de 91 a 180 días",
    "tipoDeDato": "Numérico (15,2)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Valor de capital que no devenga intereses y vence entre 91 y 180 días desde la fecha de corte."
  },
  {
    "no": 17,
    "campo": "Valor que no devenga intereses de 181 a 360 días",
    "tipoDeDato": "Numérico (15,2)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Valor de capital que no devenga intereses y vence entre 181 y 360 días desde la fecha de corte."
  },
  {
    "no": 18,
    "campo": "Valor que no devenga intereses de más de 360 días",
    "tipoDeDato": "Numérico (15,2)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Valor de capital que no devenga intereses y vence después de 360 días desde la fecha de corte."
  },
  {
    "no": 19,
    "campo": "Valor vencido de 1 a 30 días",
    "tipoDeDato": "Numérico (15,2)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Valor vencido entre 1 y 30 días desde la fecha de corte."
  },
  {
    "no": 20,
    "campo": "Valor vencido de 31 a 90 días",
    "tipoDeDato": "Numérico (15,2)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Valor vencido entre 31 y 90 días desde la fecha de corte."
  },
  {
    "no": 21,
    "campo": "Valor vencido de 91 a 180 días",
    "tipoDeDato": "Numérico (15,2)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Valor vencido entre 91 y 180 días desde la fecha de corte."
  },
  {
    "no": 22,
    "campo": "Valor vencido de 181 a 360 días",
    "tipoDeDato": "Numérico (15,2)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Valor vencido entre 181 y 360 días desde la fecha de corte."
  },
  {
    "no": 23,
    "campo": "Valor vencido de más de 360 días",
    "tipoDeDato": "Numérico (15,2)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Valor vencido después de 360 días desde la fecha de corte."
  },
  {
    "no": 24,
    "campo": "Valor vencido de 181 a 270 días",
    "tipoDeDato": "Numérico (15,2)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Valor vencido entre 181 y 270 días desde la fecha de corte."
  },
  {
    "no": 25,
    "campo": "Valor vencido de más de 270 días",
    "tipoDeDato": "Numérico (15,2)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Valor vencido después de 270 días desde la fecha de corte."
  },
  {
    "no": 26,
    "campo": "Valor vencido De 91 a 270 días",
    "tipoDeDato": "Numérico (15,2)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Valor vencido entre 91 y 270 días desde la fecha de corte."
  },
  {
    "no": 27,
    "campo": "Valor vencido de 271 a 360 días",
    "tipoDeDato": "Numérico (15,2)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Valor vencido entre 271 y 360 días desde la fecha de corte."
  },
  {
    "no": 28,
    "campo": "Valor vencido de 361 a 720 días",
    "tipoDeDato": "Numérico (15,2)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Valor vencido entre 361 y 720 días desde la fecha de corte."
  },
  {
    "no": 29,
    "campo": "Valor vencido de más de 720 días",
    "tipoDeDato": "Numérico (15,2)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Valor vencido después de 720 días desde la fecha de corte."
  },
  {
    "no": 30,
    "campo": "Gastos de recuperación de cartera vencida",
    "tipoDeDato": "Numérico (15,2)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Gastos incurridos en la recuperación de cartera vencida."
  },
  {
    "no": 31,
    "campo": "Interés ordinario",
    "tipoDeDato": "Numérico (15,2)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Intereses ordinarios devengados y no pagados."
  },
  {
    "no": 32,
    "campo": "Interés sobre mora",
    "tipoDeDato": "Numérico (15,2)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Intereses de mora devengados y no pagados."
  },
  {
    "no": 33,
    "campo": "Valor en demanda judicial",
    "tipoDeDato": "Numérico (15,2)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Valor de la operación que se encuentra en proceso judicial."
  },
  {
    "no": 34,
    "campo": "Cartera castigada",
    "tipoDeDato": "Numérico (15,2)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Valor de la cartera que ha sido castigada por la entidad."
  },
  {
    "no": 35,
    "campo": "Provisión requerida original",
    "tipoDeDato": "Numérico (15,2)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Provisión requerida originalmente según normativa vigente."
  },
  {
    "no": 36,
    "campo": "Provisión requerida reducida",
    "tipoDeDato": "Numérico (15,2)",
    "obligatoriedad": "X*",
    "tabla": "",
    "descripcion": "Provisión requerida reducida por garantías o avales. Obligatoria cuando aplica."
  },
  {
    "no": 37,
    "campo": "Provisión constituida",
    "tipoDeDato": "Numérico (15,2)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Provisión efectivamente constituida por la entidad."
  },
  {
    "no": 38,
    "campo": "Tipo de operación",
    "tipoDeDato": "Caracter (3)",
    "obligatoriedad": "X",
    "tabla": "35",
    "descripcion": "Tipo de operación crediticia según clasificación de la entidad. Valores según tabla 35."
  },
  {
    "no": 39,
    "campo": "Objeto del fideicomiso",
    "tipoDeDato": "Caracter (1)",
    "obligatoriedad": "X*",
    "tabla": "55",
    "descripcion": "Objeto del fideicomiso cuando aplica. Obligatorio para operaciones fiduciarias. Valores según tabla 55."
  },
  {
    "no": 40,
    "campo": "Prima o descuento",
    "tipoDeDato": "Numérico (15,2)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Prima o descuento aplicado a la operación."
  },
  {
    "no": 41,
    "campo": "Cuota del crédito",
    "tipoDeDato": "Numérico (15,2)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Valor de la cuota del crédito."
  },
  {
    "no": 42,
    "campo": "Valor de Intereses de la Cuota del Crédito",
    "tipoDeDato": "Numérico (15,2)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Valor de los intereses incluidos en la cuota del crédito."
  },
  {
    "no": 43,
    "campo": "Valor del Seguro",
    "tipoDeDato": "Numérico (15,2)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Valor del seguro asociado a la operación."
  },
  {
    "no": 44,
    "campo": "Saldo de la cuota de capital diferida",
    "tipoDeDato": "Numérico (15,2)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Saldo de capital diferido en la cuota."
  },
  {
    "no": 45,
    "campo": "Valor del interés de capital diferido",
    "tipoDeDato": "Numérico (15,2)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Valor de los intereses del capital diferido."
  },
  {
    "no": 46,
    "campo": "Fecha de transferencia a cuentas vencidas",
    "tipoDeDato": "Fecha (dd/mm/aaaa)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Fecha en que la operación fue transferida a cuentas vencidas."
  },
  {
    "no": 47,
    "campo": "Intereses acumulados por cobrar",
    "tipoDeDato": "Numérico (15,2)",
    "obligatoriedad": "X*",
    "tabla": "",
    "descripcion": "Intereses acumulados por cobrar. Obligatorio cuando aplica."
  },
  {
    "no": 48,
    "campo": "Intereses reversados",
    "tipoDeDato": "Numérico (15,2)",
    "obligatoriedad": "X*",
    "tabla": "",
    "descripcion": "Intereses que han sido reversados. Obligatorio cuando aplica."
  },
  {
    "no": 49,
    "campo": "Fecha de exigibilidad de la cuota",
    "tipoDeDato": "Fecha (dd/mm/aaaa)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Fecha en que la cuota se vuelve exigible."
  },
  {
    "no": 50,
    "campo": "Tipo de sistema de amortización",
    "tipoDeDato": "Caracter (2)",
    "obligatoriedad": "X",
    "tabla": "317",
    "descripcion": "Tipo de sistema de amortización aplicado a la operación. Valores según tabla 317."
  }
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
