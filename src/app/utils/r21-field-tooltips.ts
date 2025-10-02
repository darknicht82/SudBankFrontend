/**
 * TOOLTIPS Y GLOSARIO DE CAMPOS R21
 * Manual Técnico Estructuras R2023 - Septiembre 2023
 * Superintendencia de Bancos del Ecuador
 */

export interface R21FieldTooltip {
  no: number;
  campo: string;
  tipoDeDato: string;
  obligatoriedad: string;
  tabla: string;
  descripcion: string;
}

export const R21_FIELD_TOOLTIPS: R21FieldTooltip[] = [
  {
    "no": 1,
    "campo": "Tipo de identificación",
    "tipoDeDato": "int",
    "obligatoriedad": "X",
    "tabla": "T4",
    "descripcion": "Se refiere al tipo de identificación del sujeto, puede ser 1=RUC, 2=Cédula, 3=Pasaporte, etc."
  },
  {
    "no": 2,
    "campo": "Identificación del sujeto",
    "tipoDeDato": "varchar(13)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Corresponde al número de identificación del sujeto de crédito"
  },
  {
    "no": 3,
    "campo": "Número de tarjeta",
    "tipoDeDato": "varchar(22)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Número de la tarjeta de crédito"
  },
  {
    "no": 4,
    "campo": "Cupo de tarjeta",
    "tipoDeDato": "decimal(15,2)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Límite de crédito asignado a la tarjeta"
  },
  {
    "no": 5,
    "campo": "Capital de consumo",
    "tipoDeDato": "decimal(15,2)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Monto del capital utilizado en consumos"
  },
  {
    "no": 6,
    "campo": "TEA",
    "tipoDeDato": "decimal(8,6)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Tasa Efectiva Anual aplicada"
  },
  {
    "no": 7,
    "campo": "Estado de operación",
    "tipoDeDato": "int",
    "obligatoriedad": "X",
    "tabla": "T32",
    "descripcion": "Estado actual de la operación de tarjeta de crédito"
  },
  {
    "no": 8,
    "campo": "Forma de pago",
    "tipoDeDato": "int",
    "obligatoriedad": "X",
    "tabla": "T48",
    "descripcion": "Forma de pago establecida para la tarjeta"
  },
  {
    "no": 9,
    "campo": "Capital por vencer 1 a 30 días",
    "tipoDeDato": "decimal(15,2)",
    "obligatoriedad": "",
    "tabla": "",
    "descripcion": "Capital que vence entre 1 y 30 días"
  },
  {
    "no": 10,
    "campo": "Capital por vencer 31 a 90 días",
    "tipoDeDato": "decimal(15,2)",
    "obligatoriedad": "",
    "tabla": "",
    "descripcion": "Capital que vence entre 31 y 90 días"
  },
  {
    "no": 11,
    "campo": "Capital por vencer 91 a 180 días",
    "tipoDeDato": "decimal(15,2)",
    "obligatoriedad": "",
    "tabla": "",
    "descripcion": "Capital que vence entre 91 y 180 días"
  },
  {
    "no": 12,
    "campo": "Capital por vencer 181 a 360 días",
    "tipoDeDato": "decimal(15,2)",
    "obligatoriedad": "",
    "tabla": "",
    "descripcion": "Capital que vence entre 181 y 360 días"
  },
  {
    "no": 13,
    "campo": "Capital por vencer más de 360 días",
    "tipoDeDato": "decimal(15,2)",
    "obligatoriedad": "",
    "tabla": "",
    "descripcion": "Capital que vence después de 360 días"
  },
  {
    "no": 14,
    "campo": "Costos operativos por vencer",
    "tipoDeDato": "decimal(15,2)",
    "obligatoriedad": "",
    "tabla": "",
    "descripcion": "Costos operativos que aún no vencen"
  },
  {
    "no": 15,
    "campo": "Valor no devengan intereses 1 a 30 días",
    "tipoDeDato": "decimal(15,2)",
    "obligatoriedad": "",
    "tabla": "",
    "descripcion": "Valores que no devengan intereses entre 1 y 30 días"
  },
  {
    "no": 16,
    "campo": "Valor no devengan intereses 31 a 90 días",
    "tipoDeDato": "decimal(15,2)",
    "obligatoriedad": "",
    "tabla": "",
    "descripcion": "Valores que no devengan intereses entre 31 y 90 días"
  },
  {
    "no": 17,
    "campo": "Valor no devengan intereses 91 a 180 días",
    "tipoDeDato": "decimal(15,2)",
    "obligatoriedad": "",
    "tabla": "",
    "descripcion": "Valores que no devengan intereses entre 91 y 180 días"
  },
  {
    "no": 18,
    "campo": "Valor no devengan intereses 181 a 360 días",
    "tipoDeDato": "decimal(15,2)",
    "obligatoriedad": "",
    "tabla": "",
    "descripcion": "Valores que no devengan intereses entre 181 y 360 días"
  },
  {
    "no": 19,
    "campo": "Valor no devengan intereses más de 360 días",
    "tipoDeDato": "decimal(15,2)",
    "obligatoriedad": "",
    "tabla": "",
    "descripcion": "Valores que no devengan intereses después de 360 días"
  },
  {
    "no": 20,
    "campo": "Capital vencido 1 a 30 días",
    "tipoDeDato": "decimal(15,2)",
    "obligatoriedad": "",
    "tabla": "",
    "descripcion": "Capital vencido entre 1 y 30 días"
  },
  {
    "no": 21,
    "campo": "Capital vencido 31 a 90 días",
    "tipoDeDato": "decimal(15,2)",
    "obligatoriedad": "",
    "tabla": "",
    "descripcion": "Capital vencido entre 31 y 90 días"
  },
  {
    "no": 22,
    "campo": "Capital vencido 91 a 180 días",
    "tipoDeDato": "decimal(15,2)",
    "obligatoriedad": "",
    "tabla": "",
    "descripcion": "Capital vencido entre 91 y 180 días"
  },
  {
    "no": 23,
    "campo": "Capital vencido 181 a 360 días",
    "tipoDeDato": "decimal(15,2)",
    "obligatoriedad": "",
    "tabla": "",
    "descripcion": "Capital vencido entre 181 y 360 días"
  },
  {
    "no": 24,
    "campo": "Capital vencido más de 360 días",
    "tipoDeDato": "decimal(15,2)",
    "obligatoriedad": "",
    "tabla": "",
    "descripcion": "Capital vencido después de 360 días"
  },
  {
    "no": 25,
    "campo": "Capital vencido 181 a 270 días",
    "tipoDeDato": "decimal(15,2)",
    "obligatoriedad": "",
    "tabla": "",
    "descripcion": "Capital vencido entre 181 y 270 días"
  },
  {
    "no": 26,
    "campo": "Capital vencido más de 270 días",
    "tipoDeDato": "decimal(15,2)",
    "obligatoriedad": "",
    "tabla": "",
    "descripcion": "Capital vencido después de 270 días"
  },
  {
    "no": 27,
    "campo": "Intereses vencidos 1 a 30 días",
    "tipoDeDato": "decimal(15,2)",
    "obligatoriedad": "",
    "tabla": "",
    "descripcion": "Intereses vencidos entre 1 y 30 días"
  },
  {
    "no": 28,
    "campo": "Intereses vencidos 31 a 60 días",
    "tipoDeDato": "decimal(15,2)",
    "obligatoriedad": "",
    "tabla": "",
    "descripcion": "Intereses vencidos entre 31 y 60 días"
  },
  {
    "no": 29,
    "campo": "Intereses vencidos 61 a 90 días",
    "tipoDeDato": "decimal(15,2)",
    "obligatoriedad": "",
    "tabla": "",
    "descripcion": "Intereses vencidos entre 61 y 90 días"
  },
  {
    "no": 30,
    "campo": "Intereses vencidos 91 a 180 días",
    "tipoDeDato": "decimal(15,2)",
    "obligatoriedad": "",
    "tabla": "",
    "descripcion": "Intereses vencidos entre 91 y 180 días"
  },
  {
    "no": 31,
    "campo": "Intereses vencidos 181 a 270 días",
    "tipoDeDato": "decimal(15,2)",
    "obligatoriedad": "",
    "tabla": "",
    "descripcion": "Intereses vencidos entre 181 y 270 días"
  },
  {
    "no": 32,
    "campo": "Intereses vencidos más de 270 días",
    "tipoDeDato": "decimal(15,2)",
    "obligatoriedad": "",
    "tabla": "",
    "descripcion": "Intereses vencidos después de 270 días"
  },
  {
    "no": 33,
    "campo": "Total costos operativos vencidos",
    "tipoDeDato": "decimal(15,2)",
    "obligatoriedad": "",
    "tabla": "",
    "descripcion": "Total de costos operativos que han vencido"
  },
  {
    "no": 34,
    "campo": "Intereses sobre mora",
    "tipoDeDato": "decimal(15,2)",
    "obligatoriedad": "",
    "tabla": "",
    "descripcion": "Intereses generados por mora en los pagos"
  },
  {
    "no": 35,
    "campo": "Valor en demanda judicial",
    "tipoDeDato": "decimal(15,2)",
    "obligatoriedad": "",
    "tabla": "",
    "descripcion": "Valor de la operación que está en proceso judicial"
  },
  {
    "no": 36,
    "campo": "Cartera castigada",
    "tipoDeDato": "decimal(15,2)",
    "obligatoriedad": "",
    "tabla": "",
    "descripcion": "Valor de la cartera que ha sido castigada"
  },
  {
    "no": 37,
    "campo": "Objeto de fideicomiso",
    "tipoDeDato": "int",
    "obligatoriedad": "",
    "tabla": "T55",
    "descripcion": "Código del objeto del fideicomiso según catálogo"
  },
  {
    "no": 38,
    "campo": "Situación de operación",
    "tipoDeDato": "int",
    "obligatoriedad": "",
    "tabla": "T32A",
    "descripcion": "Situación actual de la operación"
  },
  {
    "no": 39,
    "campo": "Tipo de operación",
    "tipoDeDato": "int",
    "obligatoriedad": "",
    "tabla": "T35",
    "descripcion": "Tipo de operación de crédito"
  },
  {
    "no": 40,
    "campo": "Contribución atención cáncer",
    "tipoDeDato": "decimal(15,2)",
    "obligatoriedad": "",
    "tabla": "",
    "descripcion": "Contribución destinada a atención de cáncer"
  },
  {
    "no": 41,
    "campo": "Fecha transferencia cuentas vencidas",
    "tipoDeDato": "date",
    "obligatoriedad": "",
    "tabla": "",
    "descripcion": "Fecha en que se transfirieron las cuentas vencidas"
  },
  {
    "no": 42,
    "campo": "Intereses acumulados por cobrar",
    "tipoDeDato": "decimal(15,2)",
    "obligatoriedad": "",
    "tabla": "",
    "descripcion": "Intereses que se han acumulado y están pendientes de cobro"
  },
  {
    "no": 43,
    "campo": "Intereses reversados",
    "tipoDeDato": "decimal(15,2)",
    "obligatoriedad": "",
    "tabla": "",
    "descripcion": "Intereses que han sido reversados"
  },
  {
    "no": 44,
    "campo": "Fecha exigibilidad cuota",
    "tipoDeDato": "date",
    "obligatoriedad": "",
    "tabla": "",
    "descripcion": "Fecha en que la cuota se vuelve exigible"
  },
  {
    "no": 45,
    "campo": "Tipo de sistema de amortización",
    "tipoDeDato": "int",
    "obligatoriedad": "",
    "tabla": "T317",
    "descripcion": "Tipo de sistema de amortización aplicado"
  },
  {
    "no": 46,
    "campo": "Fecha actualización",
    "tipoDeDato": "date",
    "obligatoriedad": "",
    "tabla": "",
    "descripcion": "Fecha de la última actualización del registro"
  },
  {
    "no": 47,
    "campo": "Usuario actualización",
    "tipoDeDato": "varchar(50)",
    "obligatoriedad": "",
    "tabla": "",
    "descripcion": "Usuario que realizó la última actualización"
  }
];

/**
 * Obtener tooltip para un campo específico de R21
 */
export function getR21FieldTooltip(fieldName: string): R21FieldTooltip | null {
  return R21_FIELD_TOOLTIPS.find(tooltip => tooltip.campo === fieldName) || null;
}

/**
 * Obtener todos los tooltips de R21
 */
export function getAllR21FieldTooltips(): R21FieldTooltip[] {
  return R21_FIELD_TOOLTIPS;
}

/**
 * Información estructural de R21
 */
export const R21_STRUCTURE_INFO = {
  title: 'Estructura R21 - Consumos de Tarjetas de Crédito',
  description: 'Contiene información detallada sobre los consumos realizados con tarjetas de crédito, incluyendo montos, vencimientos, intereses y situación de las operaciones.',
  periodicity: 'Mensual (M)',
  deadline: '8 días hábiles desde la fecha de corte',
  source: 'Manual Técnico Estructuras R2023 - Septiembre 2023',
  bankCode: '1038 - Banco Sudamericano',
  fileFormat: 'R21E1038ddmmaaaa.txt',
  requirements: {
    "table": "R21 - Consumos de Tarjetas de Crédito",
    "requisites": {
      "scope": [
        "Incluir todos los consumos de tarjetas de crédito activas",
        "Reportar por tarjeta individual",
        "Incluir información de vencimientos e intereses"
      ],
      "preconditions": [
        "La tarjeta debe estar activa y con consumos pendientes"
      ],
      "fieldRules": [
        "Los campos obligatorios deben completarse según corresponda",
        "Las fechas deben estar en formato dd/mm/aaaa"
      ]
    }
  },
  fields: [
    {
      position: 1,
      name: 'Tipo de identificación',
      description: 'Código del tipo de identificación del titular',
      table: 'Tabla T4'
    },
    {
      position: 2,
      name: 'Identificación del sujeto',
      description: 'Número de identificación del titular de la tarjeta',
      table: ''
    },
    {
      position: 3,
      name: 'Número de tarjeta',
      description: 'Número completo de la tarjeta de crédito',
      table: ''
    },
    {
      position: 4,
      name: 'Cupo de tarjeta',
      description: 'Límite de crédito asignado a la tarjeta',
      table: ''
    },
    {
      position: 5,
      name: 'Capital de consumo',
      description: 'Monto utilizado en consumos',
      table: ''
    },
    {
      position: 6,
      name: 'TEA',
      description: 'Tasa Efectiva Anual aplicada',
      table: ''
    }
  ]
};

/**
 * Validaciones específicas para campos R21
 */
export const R21_FIELD_VALIDATIONS = {
  tipoIdentificacion: {
    required: true,
    pattern: /^[1-9]\d*$/,
    message: 'Debe ser un número entero válido según tabla T4'
  },
  identificacionSujeto: {
    required: true,
    maxLength: 13,
    pattern: /^\d+$/,
    message: 'Máximo 13 caracteres numéricos'
  },
  numeroTarjeta: {
    required: true,
    maxLength: 22,
    message: 'Máximo 22 caracteres'
  },
  cupoTarjeta: {
    required: true,
    min: 1,
    message: 'Debe ser mayor a 0'
  },
  capitalConsumo: {
    required: true,
    min: 1,
    message: 'Debe ser mayor a 0'
  },
  tea: {
    required: true,
    min: 0,
    message: 'Debe ser mayor o igual a 0'
  }
};
