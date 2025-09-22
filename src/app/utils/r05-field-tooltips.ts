/**
 * TOOLTIPS Y GLOSARIO DE CAMPOS R05
 * Manual Técnico Control de Inversiones v3.0 - Marzo 2017
 * Superintendencia de Bancos del Ecuador
 */

// export interface R05FieldTooltip {
//   field: string;
//   title: string;
//   description: string;
//   source: string;
//   example: string;
//   format: string;
//   validation: string;
// }
export interface R05FieldTooltip {
  no: number;
  campo: string;
  tipoDeDato: string;
  obligatoriedad: string;
  tabla: string;
  descripcion: string;
}

export const R05_FIELD_TOOLTIPS: R05FieldTooltip[] = [
  {
    "no": 1,
    "campo": "Tipo de identificación del sujeto",
    "tipoDeDato": "caracter (1)",
    "obligatoriedad": "X",
    "tabla": "4",
    "descripcion": "Se refiere al tipo de documento de identificación del sujeto, puede ser “C”, “R” o “E”."
  },
  {
    "no": 2,
    "campo": "Identificación del sujeto",
    "tipoDeDato": "caracter (13)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Corresponde al número de identificación del sujeto. Para personas naturales ecuatorianas será el número de cédula, para personas jurídicas el número de RUC y para personas extranjeras el código de extranjero asignado por la Superintendencia de Bancos"
  },
  {
    "no": 3,
    "campo": "Número de operación",
    "tipoDeDato": "caracter (32)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Código único con el que la entidad financiera identifica a cada operación que efectúa"
  },
  {
    "no": 4,
    "campo": "Tipo de transacción",
    "tipoDeDato": "caracter (1)",
    "obligatoriedad": "X",
    "tabla": "208",
    "descripcion": "Código que indica la transacción que se está reportando: cancelación de operación de crédito, cancelación definitiva de tarjeta de crédito, cambio de calificación de una operación de crédito o pago parcial"
  },
  {
    "no": 5,
    "campo": "Fecha de cancelacion / cambio de calificación",
    "tipoDeDato": "fecha (dd/mm/aaaa)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Si el tipo de transacción refiere a la cancelación de una operación de crédito, este campo indica la fecha en la que se realizó dicha cancelación. Si el tipo de transacción refiere a la cancelación de una tarjeta de crédito, este campo registrará la fecha en la que se realizó la cancelación definitiva de la tarjeta, para lo cual el campo número de operación debe corresponder al código o número de tarjeta de crédito. Si el tipo de transacción refiere a un cambio de calificación de una operación de crédito vigente, entonces este campo indica la fecha en la que se realizó esta modificación de la calificación de dicha operación. Las cancelaciones de pagos vencidos por consumos de tarjetas de crédito, efectuados según señala la Disposición Transitoria “Décima” de la LEY ORGÁNICA DE SIMPLIFICACIÓN Y PROGRESIVIDAD TRIBUTARIA, y que no impliquen la cancelación total de la tarjeta, registrarán este campo NULO."
  },
  {
    "no": 6,
    "campo": "Forma de cancelación",
    "tipoDeDato": "caracter (2)",
    "obligatoriedad": "X*",
    "tabla": "39",
    "descripcion": "Código que especifica la forma en que se canceló la operación (tipo de transacción=”C”). Si existiera más de una forma de cancelación para una misma operación, deberá registrarse la más significativa en función del monto. Si se trata de una cancelación de tarjeta de crédito (tipo de transacción=”T”), este campo solo podrá tener el código “X”, es decir cuando el sujeto de crédito deja de ser tarjetahabiente de la entidad. Será de uso *obligatorio cuando el registro refiera a una cancelación total de la operación de crédito o una cancelación definitiva de tarjeta de crédito. Si se trata de un cambio de calificación, este campo será NULO. Las operaciones crediticias originadas en la R02, que fueren canceladas acogiéndose a la Disposición Transitoria “Décima” (120 días plazo – 30 junio de 2020), de la LEY ORGÁNICA DE SIMPLIFICACIÓN Y PROGRESIVIDAD TRIBUTARIA, registrarán el código “SI”. Para la cancelación de las cuotas vencidas en tarjetas de crédito, se reportará como forma de cancelación con el código “LS”. Las operaciones que se acojan a lo dispuesto en el Art 3 de la LSyPT, (créditos con el aporte de COPAGO, para los damnificados del terremoto en las provincias de Manabí y Esmeraldas); y que hubieren cancelado la obligación se registrarán con el código “ST”."
  },
  {
    "no": 7,
    "campo": "Calificación",
    "tipoDeDato": "caracter (2)",
    "obligatoriedad": "X*",
    "tabla": "29",
    "descripcion": "Es la nueva calificación a la categoría de riesgo, asignada a la operación fuera del cierre mensual. Será de uso *obligatorio cuando el campo tipo de transacción tenga el valor “A”, caso contario seráNULO."
  }
  
]
;

/**
 * Obtener tooltip para un campo específico de R05
 */
export function getR05FieldTooltip(fieldName: string): R05FieldTooltip | null {
  // return R05_FIELD_TOOLTIPS.find(tooltip => tooltip.field === fieldName) || null;
  return R05_FIELD_TOOLTIPS.find(tooltip => tooltip.campo === fieldName) || null;
}

/**
 * Obtener todos los tooltips de R05
 */
export function getAllR05FieldTooltips(): R05FieldTooltip[] {
  return R05_FIELD_TOOLTIPS;
}

/**
 * Información estructural de R05
 */
export const R05_STRUCTURE_INFO = {
  title: 'Estructura R05 - Cancelaciones y cambios de calificación ',
  description: 'Contiene los saldos de todos los títulos que se encuentren registrados en el balance de la entidad, incluso de aquellos que se encuentren vencidos y por lo tanto registrados en la cuenta 1612. Incluye el detalle de los títulos que, habiendo sido reportado su saldo en el mes inmediato anterior, han sido liquidados o vendidos en el mes de reporte por lo que ya no constan en el portafolio de la entidad a la fecha de corte de la estructura.',
  periodicity: 'Mensual (M) - Solo cuando hay nuevos registros',
  deadline: '8 días hábiles desde la fecha de corte',
  source: 'Manual Técnico De Estructuras De Datos Del Sistema De Control De Inversiones v3.0 - Marzo 2017',
  bankCode: '1038 - Banco Sudamericano',
  fileFormat: 'R05E1038ddmmaaaa.txt',
  requirements: {
      "table": "R05 - Cancelaciones y cambios de calificación ",
      "requisites": {
        "scope": [
          "Incluir saldos de todos los títulos registrados en el balance, incluyendo los vencidos en la cuenta 1612",
          "Incluir títulos reportados en el mes anterior que fueron liquidados o vendidos en el mes de reporte",
          "Reportar título por título, sin agrupar instrumentos aunque sean de la misma serie"
        ],
        "preconditions": [
          "El título debe haber sido reportado previamente en R05 en el mismo mes o en meses anteriores"
        ],
        "balanceReconciliation": [
          "La estructura debe cuadrar con las subcuentas del balance a la fecha de corte",
          "Usar categoría de inversión (tabla 67) y rango de vencimiento (tabla 68) según el Catálogo Único de Cuentas",
          "Los títulos vencidos deben reportarse con el código 1 de la tabla 68 ('De 1 a 30 días')"
        ],
        "liquidationsAndSales": {
          "codes": {
            "LP": "Venta parcial",
            "LI": "Liquidación total"
          },
          "totalLiquidation": [
            "Usar código 'LI'",
            "Reportar un solo registro",
            "No reportar saldo remanente en cero"
          ],
          "partialSale": [
            "Reportar dos registros: uno con saldo remanente y otro con la parte vendida",
            "En cortes siguientes, reportar solo el saldo remanente",
            "No es necesario volverlo a reportar en R05"
          ]
        },
        "exclusions": [
          "No reportar devengamiento de cupones como liquidación",
          "En devengamientos, solo actualizar el nuevo saldo en libros"
        ],
        "repurchaseAfterLiquidation": [
          "Si se recompra un título liquidado con 'LI', reportar en R05 con mismo número de título y fecha de emisión pero nueva fecha de compra",
          "Usar campo 'fecha de compra' en R05 para diferenciar recompra de liquidación anterior"
        ],
        "fieldRules": [
          "El campo 'valor de liquidación o venta' debe completarse según corresponda a liquidación total o venta parcial"
        ]
      }
    },
  fields: [
    {
      position: 1,
      name: 'Tipo de identificación',
      description: 'R para RUC nacional, X para código exterior',
             table: 'Tabla t4'
    },
    {
      position: 2,
      name: 'Identificación',
      description: 'RUC 13 dígitos (nacional) o código 7 dígitos (exterior)',
             table: 'Tabla t164'
    },
    {
      position: 3,
      name: 'Clasificación',
      description: '1=Emisor, 2=Custodio, 3=Depositario, 4=Contraparte',
             table: 'Tabla t173'
    },
    {
      position: 4,
      name: 'Tipo de emisor',
      description: 'Sector según tabla 73 (excluyendo códigos 1 y 6)',
             table: 'Tabla t73'
    }
  ]
};

/**
 * Validaciones específicas para campos R05
 */
export const R05_FIELD_VALIDATIONS = {
  tipoIdentificacion: {
    required: true,
    pattern: /^[RX]$/,
    message: 'Solo se permite R (RUC Nacional) o X (Código Exterior)'
  },
  identificacion: {
    required: true,
    minLength: 7,
    maxLength: 13,
    pattern: /^\d+$/,
    message: 'RUC: 13 dígitos numéricos, Código exterior: 7 dígitos numéricos'
  },
  clasificacion: {
    required: true,
    pattern: /^[1-4]$/,
    message: 'Solo valores 1, 2, 3 o 4 según tabla 173'
  },
  tipoEmisor: {
    required: true,
    pattern: /^[02345789]$/,
    message: 'Valores válidos según tabla 73, excluyendo códigos 1 y 6'
  }
};
