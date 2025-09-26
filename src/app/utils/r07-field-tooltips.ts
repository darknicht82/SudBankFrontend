/**
 * TOOLTIPS Y GLOSARIO DE CAMPOS R07
 * Manual Técnico de Estructuras de Datos de Operaciones Activas y Contingentes v13.0
 * Superintendencia de Bancos del Ecuador - 27/09/2023
 */

export interface R07FieldTooltip {
  no: number;
  campo: string;
  tipoDeDato: string;
  obligatoriedad: string;
  tabla: string;
  descripcion: string;
}

export const R07_FIELD_TOOLTIPS: R07FieldTooltip[] = [
  {
    "no": 1,
    "campo": "Tipo de identificación del sujeto",
    "tipoDeDato": "Caracter (1)",
    "obligatoriedad": "X",
    "tabla": "4",
    "descripcion": "Se refiere al tipo de documento de identificación del sujeto, puede ser \"C\", \"R\" o \"E\"."
  },
  {
    "no": 2,
    "campo": "Identificación del sujeto",
    "tipoDeDato": "Caracter (13)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Corresponde al número de identificación del sujeto. Para personas naturales ecuatorianas será el número de cédula, para personas jurídicas el número de RUC y para personas extranjeras el código de extranjero asignado por la Superintendencia de Bancos."
  },
  {
    "no": 3,
    "campo": "Número de operación",
    "tipoDeDato": "Caracter (32)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Código único con el que la entidad financiera identifica a cada operación que efectúa."
  },
  {
    "no": 4,
    "campo": "Número de garantía",
    "tipoDeDato": "Caracter (32)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Código único con que la entidad financiera identifica a cada garantía otorgada por sus clientes. Este número de garantía debe mantenerse en el registro de cada operación que cubra."
  },
  {
    "no": 5,
    "campo": "Tipo de garantía",
    "tipoDeDato": "Caracter (3)",
    "obligatoriedad": "X",
    "tabla": "42",
    "descripcion": "Código que identifica al tipo de garantía que cubre la operación."
  },
  {
    "no": 6,
    "campo": "Descripción de la garantía",
    "tipoDeDato": "Caracter (120)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Es una breve descripción acerca de la garantía."
  },
  {
    "no": 7,
    "campo": "Ubicación de la garantía (país)",
    "tipoDeDato": "Caracter (2)",
    "obligatoriedad": "X",
    "tabla": "5",
    "descripcion": "Código del país en el que se encuentra la garantía."
  },
  {
    "no": 8,
    "campo": "Ubicación de la garantía (provincia)",
    "tipoDeDato": "Caracter (2)",
    "obligatoriedad": "X*",
    "tabla": "6",
    "descripcion": "Código de la provincia en la que se encuentra la garantía. Será de uso obligatorio si el campo ubicación del bien (país) corresponde al código \"EC\" (Ecuador)."
  },
  {
    "no": 9,
    "campo": "Ubicación de la garantía (cantón)",
    "tipoDeDato": "Caracter (2)",
    "obligatoriedad": "X*",
    "tabla": "7",
    "descripcion": "Código del cantón en el que se encuentra la garantía. Será de uso obligatorio si el campo ubicación del bien (país) corresponde al código \"EC\" (Ecuador)."
  },
  {
    "no": 10,
    "campo": "Valor del avalúo / título",
    "tipoDeDato": "Numérico (15,2)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Es el monto o valor del avalúo de mercado de la garantía, o el valor del título. En el caso de garantías hipotecarias se debe reportar el valor de realización."
  },
  {
    "no": 11,
    "campo": "Fecha del avalúo",
    "tipoDeDato": "Fecha (dd/mm/aaaa)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Fecha en la cual se realizó el avalúo de la garantía."
  },
  {
    "no": 12,
    "campo": "Número de registro de la garantía",
    "tipoDeDato": "Caracter (20)",
    "obligatoriedad": "X*",
    "tabla": "",
    "descripcion": "Código o número con el cual está registrada la garantía en el registro de la propiedad o mercantil. Será de uso obligatorio cuando no se trate de títulos valores."
  },
  {
    "no": 13,
    "campo": "Fecha de la contabilización de la garantía",
    "tipoDeDato": "Fecha (dd/mm/aaaa)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Fecha en la cual está registrada contablemente la garantía en la institución financiera."
  },
  {
    "no": 14,
    "campo": "Porcentaje que cubre la garantía",
    "tipoDeDato": "Numérico (5,2)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Es el porcentaje por el cual la garantía real cubre a la operación concedida."
  },
  {
    "no": 15,
    "campo": "Estado del registro",
    "tipoDeDato": "Caracter (1)",
    "obligatoriedad": "X",
    "tabla": "47",
    "descripcion": "Código que indica el estado del registro: \"N\" si la garantía es nueva para la operación, \"E\" si se da de baja una garantía reportada anteriormente para una operación que sigue vigente, \"A\" si se está actualizando el valor de avalúo o la fecha de avalúo."
  }
];

/**
 * Obtener tooltip para un campo específico de R07
 */
export function getR07FieldTooltip(fieldName: string): R07FieldTooltip | null {
  return R07_FIELD_TOOLTIPS.find(tooltip => tooltip.campo === fieldName) || null;
}

/**
 * Obtener todos los tooltips de R07
 */
export function getAllR07FieldTooltips(): R07FieldTooltip[] {
  return R07_FIELD_TOOLTIPS;
}

/**
 * Información estructural de R07
 */
export const R07_STRUCTURE_INFO = {
  title: 'Estructura R07 - Garantías Reales',
  description: 'Esta estructura comprende información acerca de las garantías reales para las operaciones de créditos y contingentes, así como aquellas que han sido eliminadas.',
  periodicity: 'Mensual (M)',
  deadline: '5 días hábiles desde la fecha de corte',
  source: 'Manual Técnico de Estructuras de Datos de Operaciones Activas y Contingentes v13.0 - 27/09/2023',
  bankCode: '1038 - Banco Sudamericano',
  fileFormat: 'R07M1038ddmmaaaa.txt',
  requirements: {
    "table": "R07 - Garantías reales",
    "requisites": {
      "scope": [
        "Incluir todas las garantías reales para operaciones de créditos y contingentes",
        "Incluir garantías que han sido eliminadas",
        "Reportar garantía por garantía, sin agrupar"
      ],
      "preconditions": [
        "El sujeto debe estar registrado en la estructura R01",
        "La operación debe estar registrada en la estructura R02 y debe encontrarse activa"
      ],
      "validationRules": [
        "Tipo de identificación del sujeto, identificación del sujeto, número de operación deben estar registrados en R02",
        "Si el estado del registro es \"E\" o \"A\", estos campos deben constar en R07",
        "Provincia y cantón son obligatorios solo si país = \"EC\"",
        "Número de registro de garantía es obligatorio cuando NO se trate de títulos valores"
      ],
      "stateCodes": {
        "N": "Nueva garantía para la operación",
        "E": "Eliminación de garantía reportada anteriormente",
        "A": "Actualización del valor de avalúo o fecha de avalúo"
      }
    }
  },
  fields: [
    {
      position: 1,
      name: 'Tipo de identificación del sujeto',
      description: 'C=Cédula, R=RUC, E=Extranjero',
      table: 'Tabla T4'
    },
    {
      position: 2,
      name: 'Identificación del sujeto',
      description: 'Cédula, RUC o código de extranjero',
      table: ''
    },
    {
      position: 3,
      name: 'Número de operación',
      description: 'Código único de la operación',
      table: ''
    },
    {
      position: 4,
      name: 'Número de garantía',
      description: 'Código único de la garantía',
      table: ''
    },
    {
      position: 5,
      name: 'Tipo de garantía',
      description: 'Código del tipo de garantía',
      table: 'Tabla T42'
    }
  ]
};

/**
 * Validaciones específicas para campos R07
 */
export const R07_FIELD_VALIDATIONS = {
  tipoIdentificacion: {
    required: true,
    pattern: /^[CRE]$/,
    message: 'Solo se permite C (Cédula), R (RUC) o E (Extranjero)'
  },
  identificacionSujeto: {
    required: true,
    minLength: 7,
    maxLength: 13,
    pattern: /^\d+$/,
    message: 'Cédula: 10 dígitos, RUC: 13 dígitos, Extranjero: 7 dígitos'
  },
  numeroOperacion: {
    required: true,
    maxLength: 32,
    message: 'Máximo 32 caracteres'
  },
  numeroGarantia: {
    required: true,
    maxLength: 32,
    message: 'Máximo 32 caracteres'
  },
  tipoGarantia: {
    required: true,
    message: 'Debe seleccionar un tipo de garantía'
  },
  descripcionGarantia: {
    required: true,
    maxLength: 120,
    message: 'Máximo 120 caracteres'
  },
  ubicacionGarantiaPais: {
    required: true,
    message: 'Debe seleccionar un país'
  },
  ubicacionGarantiaProvincia: {
    required: false,
    conditional: 'Solo obligatorio si país = "EC"',
    message: 'Provincia es obligatoria solo para Ecuador'
  },
  ubicacionGarantiaCanton: {
    required: false,
    conditional: 'Solo obligatorio si país = "EC"',
    message: 'Cantón es obligatorio solo para Ecuador'
  },
  valorAvaluoTitulo: {
    required: true,
    min: 0.01,
    message: 'Valor debe ser mayor a 0'
  },
  fechaAvaluo: {
    required: true,
    message: 'Fecha de avalúo es obligatoria'
  },
  numeroRegistroGarantia: {
    required: false,
    conditional: 'Obligatorio cuando NO se trate de títulos valores',
    maxLength: 20,
    message: 'Máximo 20 caracteres'
  },
  fechaContabilizacionGarantia: {
    required: true,
    message: 'Fecha de contabilización es obligatoria'
  },
  porcentajeCubreGarantia: {
    required: true,
    min: 0.01,
    max: 100,
    message: 'Porcentaje debe estar entre 0.01 y 100'
  },
  estadoRegistro: {
    required: true,
    pattern: /^[NEA]$/,
    message: 'Solo valores N (Nuevo), E (Eliminado), A (Actualizado)'
  }
};