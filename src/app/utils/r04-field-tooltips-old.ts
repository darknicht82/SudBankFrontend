/**
 * TOOLTIPS Y GLOSARIO DE CAMPOS R04
 * Manual Técnico Control de Inversiones v3.0 - Marzo 2017
 * Superintendencia de Bancos del Ecuador
 */

// export interface R04FieldTooltip {
//   field: string;
//   title: string;
//   description: string;
//   source: string;
//   example: string;
//   format: string;
//   validation: string;
// }
export interface R04FieldTooltip {
  no: number;
  campo: string;
  tipoDeDato: string;
  obligatoriedad: string;
  tabla: string;
  descripcion: string;
}

export const R04_FIELD_TOOLTIPS: R04FieldTooltip[] = [
  {
    "no": 1,
    "campo": "Tipo de identificación del emisor",
    "tipoDeDato": "caracter (1)",
    "obligatoriedad": "X",
    "tabla": "4",
    "descripcion": "Se refiere al tipo de documento de identificación del sujeto, puede ser “C”, “R” o “E”."
  },
  {
    "no": 2,
    "campo": "Identificación del emisor",
    "tipoDeDato": "caracter (13)",
    "obligatoriedad": "X",
    "tabla": "164",
    "descripcion": "Corresponde al número de identificación del emisor. Para emisores nacionales será el número de RUC; para emisores del exterior la identificación se reportará conforme a la tabla No. 164, publicada por la Superintendencia de Bancos y Seguros en la página web"
  },
  {
    "no": 3,
    "campo": "Número de título",
    "tipoDeDato": "caracter (20)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Corresponde a la numeración asignada por el emisor."
  },
  {
    "no": 4,
    "campo": "Fecha de emisión",
    "tipoDeDato": "dd/mm/aaaa",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Es la fecha en la que se crea la operación. Si es un bono, ésta será la fecha de emisión de dicho bono. Si es un derivado, esta fecha será la fecha de contratación de la operación. Si se trata de cuotas de participación en fondos de inversión, se deberá informar como fecha de emisión, la fecha de compra o la fecha de posición. "
  },
  {
    "no": 5,
    "campo": "Fecha de compra",
    "tipoDeDato": "dd/mm/aaaa",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "También conocida como fecha valor. Es la “fecha de negociación”, esto es la fecha en la que se asumen las obligaciones recíprocas que deben consumarse dentro del plazo establecido por las regulaciones y usos del mercado en el que se efectúe la operación."
  },
  {
    "no": 6,
    "campo": "Fecha de vencimiento",
    "tipoDeDato": "dd/mm/aaaa",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Es la fecha en la que la operación sale de los libros de la entidad. Para el caso de operaciones de balance, por ejemplo bonos o depósitos interbancarios, esta será la fecha de pago del principal. En el caso de instrumentos de inversión sin plazo de vencimiento (perpetuos) se incluirá la fecha de compra."
  },
  {
    "no": 7,
    "campo": "Código identificador del instrumento",
    "tipoDeDato": "caracter (2)",
    "obligatoriedad": "X",
    "tabla": "165",
    "descripcion": "Referencia tabla 165. Corresponde al tipo de identificador del instrumento de inversión"
  },
  {
    "no": 8,
    "campo": "Identificación del instrumento",
    "tipoDeDato": "caracter (20)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Corresponde al número de identificación asignado al instrumento de inversión según el sistema de codificación reportado en la tabla 165, “Código identificador del instrumento”"
  },
  {
    "no": 9,
    "campo": "Categoría del instrumento",
    "tipoDeDato": "caracter (1)",
    "obligatoriedad": "X",
    "tabla": "166",
    "descripcion": " Identifica la categoría a la que corresponde el instrumento de inversión."
  },
  {
    "no": 10,
    "campo": "Tipo de instrumento",
    "tipoDeDato": "numérico (2)",
    "obligatoriedad": "X",
    "tabla": "62-A",
    "descripcion": "Se identifica el tipo de inversión realizada por la institución financiera."
  },
  {
    "no": 11,
    "campo": "Opcionalidad",
    "tipoDeDato": "caracter (1)",
    "obligatoriedad": "X",
    "tabla": "167",
    "descripcion": "En este campo se indicará si el instrumento de inversión tiene o no una opción asociada."
  },
  {
    "no": 12,
    "campo": "Tasa base",
    "tipoDeDato": "numérico (1)",
    "obligatoriedad": "X*",
    "tabla": "64",
    "descripcion": "Se trata de la curva de tasas de interés de referencia que se asocia con el mercado de la operación. "
  },
  {
    "no": 13,
    "campo": "Diferencial de revisión",
    "tipoDeDato": "numérico (5)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Son los puntos básicos a añadir a la tasa de la curva de referencia, con los que se calculará la nueva tasa de interés a aplicar a la operación"
  },
  {
    "no": 14,
    "campo": "Tipo de tasa",
    "tipoDeDato": "caracter (1)",
    "obligatoriedad": "X",
    "tabla": "168",
    "descripcion": "Para instrumentos de deuda, indicar “C” si es un instrumento cero cupón, 'F' si es un instrumento de tasa fija, o 'V', si es un instrumento con cupones de tasa variable. Para instrumentos de capital el campo deberá ser reportado NULO."
  },
  {
    "no": 15,
    "campo": "Moneda de denominación",
    "tipoDeDato": "caracter (3)",
    "obligatoriedad": "X",
    "tabla": "33",
    "descripcion": "Se refiere a la moneda en la cual está denominado el instrumento de inversión. "
  },
  {
    "no": 16,
    "campo": "Unidades adquiridas",
    "tipoDeDato": "numérico (15)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Corresponde a la cantidad de títulos o cuotas de participación negociadas."
  },
  {
    "no": 17,
    "campo": "Valor nominal en moneda de denominación",
    "tipoDeDato": "numérico (15,2)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Es el valor nominal o facial del instrumento reportado, en su moneda de denominación"
  },
  {
    "no": 18,
    "campo": "Valor nominal en dólares",
    "tipoDeDato": "numérico (15,2)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Es el valor nominal o facial del instrumento expresado en su importe equivalente en dólares. En el caso de cuotas en fondos administrados incluir el valor de cierre (NAV) a la fecha de compra."
  },
  {
    "no": 19,
    "campo": "Precio de compra",
    "tipoDeDato": "numérico (1,5)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Es la cotización a la que se adquirió el título. Debe ser reportado en formato numérico y no porcentual, por ejemplo.- un precio del 98.5% debe reportarse en este campo como 0.9850 y un precio del 101.3%, debe reportarse en este campo como 1.0130"
  },
  {
    "no": 20,
    "campo": "Valor de compra en moneda de denominación",
    "tipoDeDato": "numérico (15,2)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Es el valor de adquisición del instrumento en la moneda original negociada. "
  },
  {
    "no": 21,
    "campo": "Valor de compra en dólares",
    "tipoDeDato": "numérico (15,2)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Es el valor de adquisición del instrumento expresado en el importe equivalente en dólares"
  },
  {
    "no": 22,
    "campo": "Frecuencia de revisión",
    "tipoDeDato": "numérico (5)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Indica la frecuencia o periodicidad con la cual se modifican las tasas de interés. Este campo se expresa en número de días. Si no existe frecuencia de revisión (tasa fija) o se trata de instrumentos representativos de capital, registrar en este campo el valor cero (0)."
  },
  {
    "no": 23,
    "campo": "Periodicidad de pago de cupón",
    "tipoDeDato": "numérico (3)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Corresponde al período contractual de cobro de los rendimientos generados por el instrumento de inversión, expresado en número días. En caso de instrumentos cero cupón y aquellos representativos de capital se deberá hacer constar el valor cero (0) "
  }
]
;

/**
 * Obtener tooltip para un campo específico de R04
 */
export function getR04FieldTooltip(fieldName: string): R04FieldTooltip | null {
  // return R04_FIELD_TOOLTIPS.find(tooltip => tooltip.field === fieldName) || null;
  return R04_FIELD_TOOLTIPS.find(tooltip => tooltip.campo === fieldName) || null;
}

/**
 * Obtener todos los tooltips de R04
 */
export function getAllR04FieldTooltips(): R04FieldTooltip[] {
  return R04_FIELD_TOOLTIPS;
}

/**
 * Información estructural de R04
 */
export const R04_STRUCTURE_INFO = {
  title: 'Estructura R04 - Emisores, Custodios y Contrapartes',
  description: 'Contiene los saldos de todos los títulos que se encuentren registrados en el balance de la entidad, incluso de aquellos que se encuentren vencidos y por lo tanto registrados en la cuenta 1612. Incluye el detalle de los títulos que, habiendo sido reportado su saldo en el mes inmediato anterior, han sido liquidados o vendidos en el mes de reporte por lo que ya no constan en el portafolio de la entidad a la fecha de corte de la estructura.',
  periodicity: 'Mensual (M) - Solo cuando hay nuevos registros',
  deadline: '8 días hábiles desde la fecha de corte',
  source: 'Manual Técnico De Estructuras De Datos Del Sistema De Control De Inversiones v3.0 - Marzo 2017',
  bankCode: '1038 - Banco Sudamericano',
  fileFormat: 'R04E1038ddmmaaaa.txt',
  requirements: {
      "table": "R04 - Saldo y Liquidaciones de inversiones",
      "requisites": {
        "scope": [
          "Incluir saldos de todos los títulos registrados en el balance, incluyendo los vencidos en la cuenta 1612",
          "Incluir títulos reportados en el mes anterior que fueron liquidados o vendidos en el mes de reporte",
          "Reportar título por título, sin agrupar instrumentos aunque sean de la misma serie"
        ],
        "preconditions": [
          "El título debe haber sido reportado previamente en R04 en el mismo mes o en meses anteriores"
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
            "No es necesario volverlo a reportar en R04"
          ]
        },
        "exclusions": [
          "No reportar devengamiento de cupones como liquidación",
          "En devengamientos, solo actualizar el nuevo saldo en libros"
        ],
        "repurchaseAfterLiquidation": [
          "Si se recompra un título liquidado con 'LI', reportar en R04 con mismo número de título y fecha de emisión pero nueva fecha de compra",
          "Usar campo 'fecha de compra' en R04 para diferenciar recompra de liquidación anterior"
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
 * Validaciones específicas para campos R04
 */
export const R04_FIELD_VALIDATIONS = {
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
