/**
 * TOOLTIPS Y GLOSARIO DE CAMPOS L08
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
export interface L08FieldTooltip {
  no: number;
  campo: string;
  tipoDeDato: string;
  obligatoriedad: string;
  tabla: string;
  descripcion: string;
}

export const L08_FIELD_TOOLTIPS: L08FieldTooltip[] = [
  {
    "no": 1,
    "campo": "Código de liquidez",
    "tipoDeDato": "Numérico (6)",
    "obligatoriedad": "X",
    "tabla": "59",
    "descripcion": "Se refiere al código que indicará qué clase de información se está reportando en cada registro y que corresponderá a las descritas en la tabla 59"
  },
  {
    "no": 2,
    "campo": "Tipo de identificación de la entidad",
    "tipoDeDato": "caracter (1)",
    "obligatoriedad": "X",
    "tabla": "4",
    "descripcion": "Corresponde al tipo de identificación de la entidad puede ser (R) RUC, o (E) de extranjero."
  },
  {
    "no": 3,
    "campo": "Identificación de la entidad",
    "tipoDeDato": "Numérico (13)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Para el detalle de inversiones, se refiere al número de identificación de la entidad emisora del título, que debe constar previamente reportada en la estructura L07. Para el detalle de fondos disponibles, este campo y el anterior se llenarán con el tipo y número de identificación de la entidad depositaria de los fondos. Para los códigos de cuenta de liquidez que deben reportarse en un solo registro (ver tabla 59) este campo y el anterior se llenarán con el tipo R y el número de RUC de la entidad reportante"
  },
  {
    "no": 4,
    "campo": "Tipo de instrumento",
    "tipoDeDato": "Numérico (2)",
    "obligatoriedad": "X",
    "tabla": "62",
    "descripcion": "Se identifica el tipo de inversión realizada por la entidad financiera. En caso de que un documento no se pueda clasificar en ninguno de los códigos disponibles en la tabla 62, la entidad deberá solicitar a la Superintendencia de Bancos un código específico para el tipo de instrumento de que se trate, el mismo que se generalizará para uso de todo el sistema financiero. Para los códigos de cuenta de liquidez que no correspondan a inversiones, este campo deberá contener el valor de “0” (cero)."
  },
  {
    "no": 5,
    "campo": "Calificación de la entidad",
    "tipoDeDato": "Numérico (2)",
    "obligatoriedad": "X",
    "tabla": "65",
    "descripcion": "Calificación de riesgo otorgada a la entidad donde se encuentran los depósitos."
  },
  {
    "no": 6,
    "campo": "Calificadora de riesgo",
    "tipoDeDato": "Numérico (2)",
    "obligatoriedad": "X",
    "tabla": "66",
    "descripcion": "Calificadora de riesgo que otorga la calificación a la entidad donde están los depósitos."
  },
  {
    "no": 7,
    "campo": "Para llenar los campos: 7 lunes, 8 martes, 9 miércoles, 10 jueves y 11 viernes",
    "tipoDeDato": "Numérico (16,8)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Son de carácter obligatorio y formato numérico, se observará las siguientes explicaciones en cada tipo de dato reportado. Los días feriados nacionales se llenarán con ceros, y los días feriados locales se reportarán con el saldo del día laborable anterior."
  }
]
;

/**
 * Obtener tooltip para un campo específico de L05
 */
export function getL08FieldTooltip(fieldName: string): L08FieldTooltip | null {
  // return L05_FIELD_TOOLTIPS.find(tooltip => tooltip.field === fieldName) || null;
  return L08_FIELD_TOOLTIPS.find(tooltip => tooltip.campo === fieldName) || null;
}

/**
 * Obtener todos los tooltips de L05
 */
export function getAllL08FieldTooltips(): L08FieldTooltip[] {
  return L08_FIELD_TOOLTIPS;
}

/**
 * Información estructural de L05
 */
export const L08_STRUCTURE_INFO = {
  title: 'Estructura L08 - Emisores, Custodios y Contrapartes',
  description: 'Contiene los saldos de todos los títulos que se encuentren registrados en el balance de la entidad, incluso de aquellos que se encuentren vencidos y por lo tanto registrados en la cuenta 1612. Incluye el detalle de los títulos que, habiendo sido reportado su saldo en el mes inmediato anterior, han sido liquidados o vendidos en el mes de reporte por lo que ya no constan en el portafolio de la entidad a la fecha de corte de la estructura.',
  periodicity: 'Mensual (M) - Solo cuando hay nuevos registros',
  deadline: '8 días hábiles desde la fecha de corte',
  source: 'Manual Técnico De Estructuras De Datos Del Sistema De Control De Inversiones v3.0 - Marzo 2017',
  bankCode: '1038 - Banco Sudamericano',
  fileFormat: 'L08E1038ddmmaaaa.txt',
  requirements: {
      "table": "L08 - Liquidez Estructural",
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
export const L08_FIELD_VALIDATIONS = {
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
