/**
 * TOOLTIPS Y GLOSARIO DE CAMPOS L05
 * Manual Técnico Control de Inversiones v3.0 - Marzo 2017
 * Superintendencia de Bancos del Ecuador
 */

// export interface L05FieldTooltip {
//   field: string;
//   title: string;
//   description: string;
//   source: string;
//   example: string;
//   format: string;
//   validation: string;
// }
export interface L05FieldTooltip {
  no: number;
  campo: string;
  tipoDeDato: string;
  obligatoriedad: string;
  tabla: string;
  descripcion: string;
}

export const L05_FIELD_TOOLTIPS: L05FieldTooltip[] = [
  {
    "no": 1,
    "campo": "Tipo de identificación del depositario",
    "tipoDeDato": "caracter (1)",
    "obligatoriedad": "X",
    "tabla": "4",
    "descripcion": "Se refiere al tipo de identificación del emisor, puede ser “R” ó “X”."
  },
  {
    "no": 2,
    "campo": "Identificación del depositario",
    "tipoDeDato": "caracter (13)",
    "obligatoriedad": "X",
    "tabla": "164",
    "descripcion": "Corresponde al número de identificación del emisor. Para emisores depositarios será el número de RUC; para depositarios del exterior la identificación se reportará conforme a la tabla No. 164, publicada por la Superintendencia de Bancos y Seguros en la página web"
  },
  {
    "no": 3,
    "campo": "Tipo de depósito",
    "tipoDeDato": "caracter (20)",
    "obligatoriedad": "X",
    "tabla": "172",
    "descripcion": "Se identifica el tipo de producto en el que están depositados los fondos disponibles."
  },
  {
    "no": 4,
    "campo": "Número de identificación del depósito",
    "tipoDeDato": "Formato alfanumérico",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": " Corresponde a la identificación del producto, otorgada por el depositario al instrumento o al número de cuenta corriente o ahorros donde se mantenga el depósito. "
  },
  {
    "no": 5,
    "campo": "Cuenta contable",
    "tipoDeDato": "Formato numérico",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Se incluirá el código de subcuenta contable del Catálogo Único de Cuentas expedido por la Superintendencia (a 6 dígitos) en la que se registra la posición en el valor. "
  },
  {
    "no": 6,
    "campo": "Moneda de denominación",
    "tipoDeDato": "Formato numérico",
    "obligatoriedad": "X",
    "tabla": "33",
    "descripcion": "Referencia tabla 33. Corresponde a la moneda en la cual está denominado el instrumento."
  },
  {
    "no": 7,
    "campo": "Valor en moneda de denominación",
    "tipoDeDato": "Formato numérico",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Corresponde al valor de la posición expresado en la moneda original negociada. "
  },
  {
    "no": 8,
    "campo": "Valor en libros en dólares",
    "tipoDeDato": "Formato numérico",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Valor contable de la posición reportada."
  },
  {
    "no": 9,
    "campo": "Calificación de riesgo del depositario",
    "tipoDeDato": "Formato numérico",
    "obligatoriedad": "X",
    "tabla": "65",
    "descripcion": " De acuerdo con la disposición normativa, si hay más de una calificación para un mismo depositario, se deberá registrar la más conservadora. "
  },
  {
    "no": 10,
    "campo": "Calificadora de riesgo",
    "tipoDeDato": "Formato numérico",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Nombre de la calificadora de riesgo que otorga la calificación reportada en el campo anterior. "
  },
  {
    "no": 11,
    "campo": "Fecha última calificación",
    "tipoDeDato": "dd/mm/yyyy",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Fecha en la que se calificó al depositario que se reporta. En caso de no estar disponible dejar en blanco."
  },
]
;

/**
 * Obtener tooltip para un campo específico de L05
 */
export function getL05FieldTooltip(fieldName: string): L05FieldTooltip | null {
  // return L05_FIELD_TOOLTIPS.find(tooltip => tooltip.field === fieldName) || null;
  return L05_FIELD_TOOLTIPS.find(tooltip => tooltip.campo === fieldName) || null;
}

/**
 * Obtener todos los tooltips de L05
 */
export function getAllL05FieldTooltips(): L05FieldTooltip[] {
  return L05_FIELD_TOOLTIPS;
}

/**
 * Información estructural de L05
 */
export const L05_STRUCTURE_INFO = {
  title: 'Estructura L05 - Emisores, Custodios y Contrapartes',
  description: 'Contiene los saldos de todos los títulos que se encuentren registrados en el balance de la entidad, incluso de aquellos que se encuentren vencidos y por lo tanto registrados en la cuenta 1612. Incluye el detalle de los títulos que, habiendo sido reportado su saldo en el mes inmediato anterior, han sido liquidados o vendidos en el mes de reporte por lo que ya no constan en el portafolio de la entidad a la fecha de corte de la estructura.',
  periodicity: 'Mensual (M) - Solo cuando hay nuevos registros',
  deadline: '8 días hábiles desde la fecha de corte',
  source: 'Manual Técnico De Estructuras De Datos Del Sistema De Control De Inversiones v3.0 - Marzo 2017',
  bankCode: '1038 - Banco Sudamericano',
  fileFormat: 'L05E1038ddmmaaaa.txt',
  requirements: {
      "table": "L05 - Saldo y Liquidaciones de inversiones",
      "requisites": {
        "scope": [
          "Incluir saldos de todos los títulos registrados en el balance, incluyendo los vencidos en la cuenta 1612",
          "Incluir títulos reportados en el mes anterior que fueron liquidados o vendidos en el mes de reporte",
          "Reportar título por título, sin agrupar instrumentos aunque sean de la misma serie"
        ],
        "preconditions": [
          "El título debe haber sido reportado previamente en L05 en el mismo mes o en meses anteriores"
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
            "No es necesario volverlo a reportar en L05"
          ]
        },
        "exclusions": [
          "No reportar devengamiento de cupones como liquidación",
          "En devengamientos, solo actualizar el nuevo saldo en libros"
        ],
        "repurchaseAfterLiquidation": [
          "Si se recompra un título liquidado con 'LI', reportar en L05 con mismo número de título y fecha de emisión pero nueva fecha de compra",
          "Usar campo 'fecha de compra' en L05 para diferenciar recompra de liquidación anterior"
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
 * Validaciones específicas para campos L05
 */
export const L05_FIELD_VALIDATIONS = {
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
    pattern: /^[05345789]$/,
    message: 'Valores válidos según tabla 73, excluyendo códigos 1 y 6'
  }
};
