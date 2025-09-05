/**
 * TOOLTIPS Y GLOSARIO DE CAMPOS L04
 * Manual Técnico Control de Inversiones v3.0 - Marzo 2017
 * Superintendencia de Bancos del Ecuador
 */

// export interface L04FieldTooltip {
//   field: string;
//   title: string;
//   description: string;
//   source: string;
//   example: string;
//   format: string;
//   validation: string;
// }
export interface L04FieldTooltip {
  no: number;
  campo: string;
  tipoDeDato: string;
  obligatoriedad: string;
  tabla: string;
  descripcion: string;
}

export const L04_FIELD_TOOLTIPS: L04FieldTooltip[] = [
  {
    "no": 1,
    "campo": "Tipo de identificación del emisor",
    "tipoDeDato": "caracter (1)",
    "obligatoriedad": "X",
    "tabla": "4",
    "descripcion": "Se refiere al tipo de identificación del emisor, puede ser “R” ó “X”."
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
    "campo": "Cuenta de origen CUC",
    "tipoDeDato": "Formato numérico.",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": " Se incluirá el código de subcuenta contable del Catálogo Único de Cuentas expedido por la Superintendencia (a 6 dígitos) en la que estuvo registrada la posición en el valor. "
  },
  {
    "no": 7,
    "campo": "Cuenta de destino CUC",
    "tipoDeDato": "Formato numérico",
    "obligatoriedad": "X",
    "tabla": "165",
    "descripcion": "Se incluirá el código de subcuenta contable del Catálogo Único de Cuentas expedido por la Superintendencia (a 6 dígitos) a la que se transfirió el instrumento."
  },
  {
    "no": 8,
    "campo": "Valor en libros en dólares cuenta de origen",
    "tipoDeDato": "Formato numérico",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Corresponde al valor registrado en la contabilidad de la entidad financiera a la fecha de la transferencia de categoría en la cuenta de origen. Este valor puede o no coincidir con el registro en la cuenta de destino, dependiendo de la metodología de valoración aplicable a cada una de estas categorías. "
  },
  {
    "no": 9,
    "campo": "Valor en libros en dólares cuenta destino",
    "tipoDeDato": "Formato numérico",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Corresponde al valor registrado en la contabilidad de la entidad financiera a la fecha de la transferencia de categoría en la cuenta de destino. Este valor puede o no coincidir con el registro en la cuenta de origen, dependiendo de la metodología de valoración aplicable a cada una de estas categorías."
  },
  {
    "no": 10,
    "campo": "Fecha de la transferencia",
    "tipoDeDato": "dd/mm/yyyy",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Fecha en la que se efectuó la reclasificación contable. "
  },
  {
    "no": 11,
    "campo": "Motivo de la transferencia",
    "tipoDeDato": "caracter (1)",
    "obligatoriedad": "X",
    "tabla": "170",
    "descripcion": "Motivo por el cual se efectuó la reclasificación entre categorías de inversión."
  },
  
]
;

/**
 * Obtener tooltip para un campo específico de L04
 */
export function getL04FieldTooltip(fieldName: string): L04FieldTooltip | null {
  // return L04_FIELD_TOOLTIPS.find(tooltip => tooltip.field === fieldName) || null;
  return L04_FIELD_TOOLTIPS.find(tooltip => tooltip.campo === fieldName) || null;
}

/**
 * Obtener todos los tooltips de L04
 */
export function getAllL04FieldTooltips(): L04FieldTooltip[] {
  return L04_FIELD_TOOLTIPS;
}

/**
 * Información estructural de L04
 */
export const L04_STRUCTURE_INFO = {
  title: 'Estructura L04 - Emisores, Custodios y Contrapartes',
  description: 'Contiene los saldos de todos los títulos que se encuentren registrados en el balance de la entidad, incluso de aquellos que se encuentren vencidos y por lo tanto registrados en la cuenta 1612. Incluye el detalle de los títulos que, habiendo sido reportado su saldo en el mes inmediato anterior, han sido liquidados o vendidos en el mes de reporte por lo que ya no constan en el portafolio de la entidad a la fecha de corte de la estructura.',
  periodicity: 'Mensual (M) - Solo cuando hay nuevos registros',
  deadline: '8 días hábiles desde la fecha de corte',
  source: 'Manual Técnico De Estructuras De Datos Del Sistema De Control De Inversiones v3.0 - Marzo 2017',
  bankCode: '1038 - Banco Sudamericano',
  fileFormat: 'L04E1038ddmmaaaa.txt',
  requirements: {
      "table": "L04 - Saldo y Liquidaciones de inversiones",
      "requisites": {
        "scope": [
          "Incluir saldos de todos los títulos registrados en el balance, incluyendo los vencidos en la cuenta 1612",
          "Incluir títulos reportados en el mes anterior que fueron liquidados o vendidos en el mes de reporte",
          "Reportar título por título, sin agrupar instrumentos aunque sean de la misma serie"
        ],
        "preconditions": [
          "El título debe haber sido reportado previamente en L04 en el mismo mes o en meses anteriores"
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
            "No es necesario volverlo a reportar en L04"
          ]
        },
        "exclusions": [
          "No reportar devengamiento de cupones como liquidación",
          "En devengamientos, solo actualizar el nuevo saldo en libros"
        ],
        "repurchaseAfterLiquidation": [
          "Si se recompra un título liquidado con 'LI', reportar en L04 con mismo número de título y fecha de emisión pero nueva fecha de compra",
          "Usar campo 'fecha de compra' en L04 para diferenciar recompra de liquidación anterior"
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
 * Validaciones específicas para campos L04
 */
export const L04_FIELD_VALIDATIONS = {
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
    pattern: /^[04345789]$/,
    message: 'Valores válidos según tabla 73, excluyendo códigos 1 y 6'
  }
};
