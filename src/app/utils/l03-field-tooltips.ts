/**
 * TOOLTIPS Y GLOSARIO DE CAMPOS L03
 * Manual Técnico Control de Inversiones v3.0 - Marzo 2017
 * Superintendencia de Bancos del Ecuador
 */

// export interface L03FieldTooltip {
//   field: string;
//   title: string;
//   description: string;
//   source: string;
//   example: string;
//   format: string;
//   validation: string;
// }
export interface L03FieldTooltip {
  no: number;
  campo: string;
  tipoDeDato: string;
  obligatoriedad: string;
  tabla: string;
  descripcion: string;
}

export const L03_FIELD_TOOLTIPS: L03FieldTooltip[] = [
  {
    "no": 1,
    "campo": "Tipo de identificación del emisor",
    "tipoDeDato": "caracter (1)",
    "obligatoriedad": "X",
    "tabla": "4",
    "descripcion": "Formato alfabético. Referencia tabla 4. Se refiere al tipo de identificación del emisor, puede ser “R” ó “X”."
  },
  {
    "no": 2,
    "campo": "Identificación del emisor",
    "tipoDeDato": "caracter (13)",
    "obligatoriedad": "X",
    "tabla": "164",
    "descripcion": "Formato alfanumérico. Corresponde al número de identificación del emisor. Para emisores nacionales será el número de RUC; para emisores del exterior la identificación se reportará conforme a la tabla No. 164, publicada por la Superintendencia de Bancos y Seguros en la página web."
  },
  {
    "no": 3,
    "campo": "Número de título",
    "tipoDeDato": "caracter (20)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Formato alfanumérico. Corresponde a la numeración asignada por el emisor."
  },
  {
    "no": 4,
    "campo": "Fecha de emisión",
    "tipoDeDato": "dd/mm/aaaa",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Formato fecha dd/mm/aaaa. Es la fecha en la que se crea la operación. Si es un bono, ésta será la fecha de emisión de dicho bono. Si es un derivado, esta fecha será la fecha de contratación de la operación. Si se trata de cuotas de participación en fondos de inversión se deberá informar como fecha de emisión la fecha de compra o la fecha de posición."
  },
  {
    "no": 5,
    "campo": "Fecha de compra",
    "tipoDeDato": "dd/mm/aaaa",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Formato fecha dd/mm/aaaa. También conocida como fecha valor. Es la “fecha de negociación”, esto es fecha en la que se asumen las obligaciones recíprocas que deben consumarse dentro del plazo establecido por las regulaciones y usos del mercado en el que se efectúe la operación. En el caso de que un título se haya liquidado totalmente del portafolio y en una fecha posterior se lo vuelva a adquirir, este campo deberá contener la nueva fecha de adquisición, que deberá coincidir con la nueva fecha de compra que también se reporta en la estructura L02. Este campo se reportará todos los meses, y deberá guardar relación con la fecha de compra reportada en la estructura L02."
  },
  {
    "no": 6,
    "campo": "Estado del título",
    "tipoDeDato": "caracter (1)",
    "obligatoriedad": "X*",
    "tabla": "70",
    "descripcion": "Formato alfabético. Referencia tabla 70. Se refiere al estado en el cual se encuentra el instrumento de inversión. No es de uso * obligatorio cuando el campo categoría de la inversión tenga los valores “LI” o “LP”."
  },
  {
    "no": 7,
    "campo": "Categoría de la inversión",
    "tipoDeDato": "caracter (2)",
    "obligatoriedad": "X",
    "tabla": "67",
    "descripcion": "Formato alfabético. Referencia tabla 67. Es la cuenta contable en la que se encuentra clasificado el instrumento de inversión."
  },
  {
    "no": 8,
    "campo": "Rango de vencimiento",
    "tipoDeDato": "numérico (1)",
    "obligatoriedad": "X",
    "tabla": "68",
    "descripcion": "Formato numérico. Referencia tabla 68. Conjuntamente con la categoría de la inversión, este campo indicará la subcuenta contable en que se encuentra registrado el título."
  },
  {
    "no": 9,
    "campo": "Tasa de interés nominal",
    "tipoDeDato": "numérico (1,4)",
    "obligatoriedad": "X*",
    "tabla": "",
    "descripcion": "Formato numérico. Para instrumentos de deuda es la tasa actual de la operación. En el caso de instrumentos representativos de capital reportados en el campo categoría del instrumento, de la estructura L02, con la identificación “C”, registrar el valor cero (0). Este campo debe reportarse en formato numérico y no porcentual. No es de uso * obligatorio cuando el campo categoría de la inversión tenga los valores “LI” o “LP”."
  },
  {
    "no": 10,
    "campo": "Monto de intereses generados en dólares",
    "tipoDeDato": "numérico (15,2)",
    "obligatoriedad": "X*",
    "tabla": "",
    "descripcion": "Formato numérico. Corresponde al monto en dólares de los intereses generados por la inversión que se encuentren pendientes de cobro a la fecha del reporte. En el caso de instrumentos cero cupón o instrumentos representativos de capital debe registrar el valor cero (0). No es de uso * obligatorio cuando el campo categoría de la inversión tenga los valores “LI” o “LP”."
  },
  {
    "no": 11,
    "campo": "Valor en libros en dólares",
    "tipoDeDato": "numérico (15,2)",
    "obligatoriedad": "X*",
    "tabla": "",
    "descripcion": "Formato numérico. Corresponde al valor registrado en la contabilidad de la entidad financiera a la fecha de reporte, siguiendo la metodología de valoración aplicable según la clasificación del instrumento. No es de uso * obligatorio cuando el campo categoría de la inversión tenga los valores “LI” o “LP”."
  },
  {
    "no": 12,
    "campo": "Precio de mercado",
    "tipoDeDato": "numérico (1,4)",
    "obligatoriedad": "X*",
    "tabla": "",
    "descripcion": "Formato numérico. Es la cotización del instrumento en un mercado activo. Cuando los instrumentos se negocian en mecanismos centralizados, se debe registrar el precio de cierre correspondiente al día de la valoración. Debe ser reportado en formato numérico y no porcentual. No es de uso * obligatorio cuando el campo categoría de la inversión tenga los valores “LI” o “LP”."
  },
  {
    "no": 13,
    "campo": "Fecha de valor de mercado",
    "tipoDeDato": "dd/mm/aaa",
    "obligatoriedad": "X*",
    "tabla": "",
    "descripcion": "Formato fecha dd/mm/aaaa. Es la fecha en la cual se tomó la cotización de mercado del instrumento que se reporta en el campo anterior. No es de uso * obligatorio cuando el campo categoría de la inversión tenga los valores “LI” o “LP”."
  },
  {
    "no": 14,
    "campo": "Valor de mercado en dólares",
    "tipoDeDato": "numérico (15,2)",
    "obligatoriedad": "X*",
    "tabla": "",
    "descripcion": "Formato numérico. Valor monetario del instrumento de inversión en el mercado, a la fecha de reporte. No es de uso * obligatorio cuando el campo categoría de la inversión tenga los valores “LI” o “LP”."
  },
  {
    "no": 15,
    "campo": "Fuente de información de cotización de mercado",
    "tipoDeDato": "caracter (1)",
    "obligatoriedad": "X*",
    "tabla": "69",
    "descripcion": "Formato alfabético. Referencia tabla 69. Se refiere a la fuente de la cual se obtuvo la información del precio de mercado. No es de uso * obligatorio cuando el campo categoría de la inversión tenga los valores “LI” o “LP”."
  },
  {
    "no": 16,
    "campo": "Tasa de interés de retorno – TIR",
    "tipoDeDato": "numérico (1,4)",
    "obligatoriedad": "X*",
    "tabla": "",
    "descripcion": "Formato numérico. Es la tasa de descuento implícita en el precio del instrumento de deuda, en función de los flujos de efectivo esperados, que se utiliza para valorizar el título en la fecha a la cual corresponde la información. En el caso de instrumentos con tasa fija, corresponde a la TIR al momento de la compra, y en instrumentos con tasa variable, se actualizará el cálculo a la fecha del reporte. Debe ser reportado en formato numérico y no porcentual, por ejemplo.- una TIR del 2.55% debe reportarse en este campo como 0.0255. No es de uso * obligatorio cuando el campo categoría de la inversión tenga los valores “LI” o “LP”."
  },
  {
    "no": 17,
    "campo": "Valor presente en dólares",
    "tipoDeDato": "numérico (15,2)",
    "obligatoriedad": "X*",
    "tabla": "",
    "descripcion": "Formato numérico. En el caso de los instrumentos de deuda corresponde al valor actual de los flujos futuros del instrumento de inversión descontados con la TIR. En el caso de instrumentos representativos de capital hacer constar el valor cero (0). No es de uso * obligatorio cuando el campo categoría de la inversión tenga los valores “LI” o “LP”."
  },
  {
    "no": 18,
    "campo": "Provisión requerida",
    "tipoDeDato": "numérico (15,2)",
    "obligatoriedad": "X*",
    "tabla": "",
    "descripcion": "Formato numérico. Monto necesario para cubrir el deterioro de valor de los instrumentos de inversión, determinado según las disposiciones vigentes para las inversiones disponibles para la venta, mantenidas hasta el vencimiento y de disponibilidad restringida. Si no se requiere provisión, este campo deberá tener el valor cero (0). No es de uso * obligatorio cuando el campo categoría de la inversión tenga los valores “LI” o “LP”."
  },
  {
    "no": 19,
    "campo": "Provisión constituida",
    "tipoDeDato": "numérico (15,2)",
    "obligatoriedad": "X*",
    "tabla": "",
    "descripcion": "Formato numérico. Monto registrado en la contabilidad de la entidad reportante, para reconocer la pérdida por deterioro de valor de los instrumentos de inversión. Si no se tiene provisión, este campo deberá tener el valor cero (0). No es de uso * obligatorio cuando el campo categoría de la inversión tenga los valores “LI” o “LP”."
  },
  {
    "no": 20,
    "campo": "Ganancias o pérdidas afectadas en el período",
    "tipoDeDato": "numérico (15,2)",
    "obligatoriedad": "X*",
    "tabla": "",
    "descripcion": "Formato numérico. Monto neto de las ganancias o pérdidas generadas por el título en el período reportado. Si se trata de una pérdida, el valor deberá tener signo negativo (-), si se trata de una ganancia se omitirá el signo. No es de uso * obligatorio cuando el campo categoría de la inversión tenga los valores “LI” o “LP”."
  },
  {
    "no": 21,
    "campo": "Calificación de riesgo",
    "tipoDeDato": "numérico (2)",
    "obligatoriedad": "X*",
    "tabla": "65",
    "descripcion": "Formato numérico. Referencia tabla 65. De acuerdo con la disposición normativa, si hay más de una calificación para un mismo instrumento o emisor, se deberá registrar la más conservadora. No es de uso * obligatorio cuando el campo categoría de la inversión tenga los valores “LI” o “LP”."
  },
  {
    "no": 22,
    "campo": "Categoría de calificación",
    "tipoDeDato": "numérico (1)",
    "obligatoriedad": "X*",
    "tabla": "169",
    "descripcion": "Formato numérico. Referencia tabla 169. En este campo se debe colocar si la calificación corresponde al instrumento o al emisor. No es de uso * obligatorio cuando el campo categoría de la inversión tenga los valores “LI” o “LP”."
  },
  {
    "no": 23,
    "campo": "Calificadora de riesgo",
    "tipoDeDato": "numérico (1)",
    "obligatoriedad": "X*",
    "tabla": "66",
    "descripcion": "Formato numérico. Referencia tabla 66. Nombre de la calificadora de riesgo que otorga la calificación reportada en el campo anterior. No es de uso * obligatorio cuando el campo categoría de la inversión tenga los valores “LI” o “LP”."
  },
  {
    "no": 24,
    "campo": "Fecha de ultima calificación",
    "tipoDeDato": "dd/mm/aaaa",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Formato fecha dd/mm/aaaa, en la que se calificó al emisor o a la emisión que se reporta. En caso de no estar disponible, el campo debe ser NULO."
  },
  {
    "no": 25,
    "campo": "Fecha de liquidación o venta",
    "tipoDeDato": "dd/mm/aaaa",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Formato fecha dd/mm/aaaa, en la que se liquida o se vende el título, sea total o parcialmente. En caso de que el título no haya sido vendido o liquidado el campo debe ser NULO."
  },
  {
    "no": 26,
    "campo": "Precio de liquidación o venta",
    "tipoDeDato": "numérico (4)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Formato numérico. Precio al cual se liquidó o vendió el título, reportado en formato numérico, por ejemplo.- si un título se vendió al precio de 100%, en este campo debe reportarse el valor 1.000 y si el precio del título vendido fue del 99.45%, en este campo debe reportarse el valor 0.9945. En caso de que el título no haya sido vendido o liquidado, el campo debe ser NULO."
  },
  {
    "no": 27,
    "campo": "Fondo de inversión",
    "tipoDeDato": "numérico (15,2)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Formato numérico. Valor al cual se liquidó o vendió el título, sea ésta una venta parcial o liquidación total. Cuando se reporte un título liquidado o vendido en forma total o parcial, los campos a llenar serán.- tipo de identificación, identificación del emisor, número de título, fecha de emisión, fecha de compra, categoría de la inversión (usar el código LI para liquidaciones totales o LP para ventas parciales), rango de vencimiento, fecha de liquidación o venta, valor de liquidación o venta y precio de liquidación o venta. El resto de campos deben reportarse como NULOS. En el caso de reportar una venta parcial se requerirá reportar un registro adicional con el saldo remanente que indique la categoría de inversión en la que se ha clasificado dicho saldo."
  },
  {
    "no": 28,
    "campo": "Fondo de inversión",
    "tipoDeDato": "numérico (3)",
    "obligatoriedad": "X*",
    "tabla": "79",
    "descripcion": "Formato numérico. Referencia tabla 79. Código asignado por la Superintendencia de Bancos y Seguros a los diferentes fondos de inversión que administran las cuotas de participación de las instituciones financieras. Este campo es obligatorio* sólo para los tipos de instrumento reportados con los códigos del 21 al 24 y el 42 de la tabla 62-A, reservados para cuotas en fondos de inversión, . Para otros tipos de instrumentos, deberá ser NULO. No es de uso * obligatorio cuando el campo categoría de la inversión tenga los valores “LI” o “LP”."
  },
  {
    "no": 29,
    "campo": "Tipo de identificación del custodio",
    "tipoDeDato": "caracter (1)",
    "obligatoriedad": "X*",
    "tabla": "4",
    "descripcion": "Formato alfabético. Referencia tabla 4. Se refiere al tipo de identificación del custodio, puede ser “R” ó “X”. No es de uso * obligatorio cuando el campo categoría de la inversión tenga los valores “LI” o “LP”."
  },
  {
    "no": 30,
    "campo": "Identificación del custodio",
    "tipoDeDato": "caracter (13)",
    "obligatoriedad": "X*",
    "tabla": "164",
    "descripcion": "Formato alfanumérico. Corresponde al número de identificación del custodio. Para custodios nacionales será el número de RUC; para custodios del exterior la identificación se reportará conforme a la tabla No. 164, publicada por la Superintendencia de Bancos y Seguros en la página web. No es de uso * obligatorio cuando el campo categoría de la inversión tenga los valores “LI” o “LP”."
  },
  {
    "no": 31,
    "campo": "Calificación de riesgo custodio",
    "tipoDeDato": "numérico (2)",
    "obligatoriedad": "X*",
    "tabla": "65",
    "descripcion": "Formato numérico. Referencia tabla 65. La calificación otorgada por una calificadora de riesgo. No es de uso * obligatorio cuando el campo categoría de la inversión tenga los valores “LI” o “LP”."
  },
  {
    "no": 32,
    "campo": "Calificadora de riesgo del custodio",
    "tipoDeDato": "numérico (1)",
    "obligatoriedad": "X*",
    "tabla": "66",
    "descripcion": "Formato numérico. Referencia tabla 66. Nombre de la calificadora de riesgo que otorga la calificación reportada en el campo anterior. No es de uso * obligatorio cuando el campo categoría de la inversión tenga los valores “LI” o “LP”."
  },
  {
    "no": 33,
    "campo": "Código de subsidiaria",
    "tipoDeDato": "numérico (4)",
    "obligatoriedad": "X*",
    "tabla": "",
    "descripcion": "Formato numérico. Código de la Subsidiaria utilizado por el grupo financiero para diferenciar donde se encuentra la Inversión, NO es de uso Obligatorio para el resto de entidades controladas que envían inversiones."
  }
];

/**
 * Obtener tooltip para un campo específico de L03
 */
export function getL03FieldTooltip(fieldName: string): L03FieldTooltip | null {
  // return L03_FIELD_TOOLTIPS.find(tooltip => tooltip.field === fieldName) || null;
  return L03_FIELD_TOOLTIPS.find(tooltip => tooltip.campo === fieldName) || null;
}

/**
 * Obtener todos los tooltips de L03
 */
export function getAllL03FieldTooltips(): L03FieldTooltip[] {
  return L03_FIELD_TOOLTIPS;
}

/**
 * Información estructural de L03
 */
export const L03_STRUCTURE_INFO = {
  title: 'Estructura L03 - Emisores, Custodios y Contrapartes',
  description: 'Contiene los saldos de todos los títulos que se encuentren registrados en el balance de la entidad, incluso de aquellos que se encuentren vencidos y por lo tanto registrados en la cuenta 1612. Incluye el detalle de los títulos que, habiendo sido reportado su saldo en el mes inmediato anterior, han sido liquidados o vendidos en el mes de reporte por lo que ya no constan en el portafolio de la entidad a la fecha de corte de la estructura.',
  periodicity: 'Mensual (M) - Solo cuando hay nuevos registros',
  deadline: '8 días hábiles desde la fecha de corte',
  source: 'Manual Técnico De Estructuras De Datos Del Sistema De Control De Inversiones v3.0 - Marzo 2017',
  bankCode: '1038 - Banco Sudamericano',
  fileFormat: 'L03E1038ddmmaaaa.txt',
  requirements: {
      "table": "L03 - Saldo y Liquidaciones de inversiones",
      "requisites": {
        "scope": [
          "Incluir saldos de todos los títulos registrados en el balance, incluyendo los vencidos en la cuenta 1612",
          "Incluir títulos reportados en el mes anterior que fueron liquidados o vendidos en el mes de reporte",
          "Reportar título por título, sin agrupar instrumentos aunque sean de la misma serie"
        ],
        "preconditions": [
          "El título debe haber sido reportado previamente en L02 en el mismo mes o en meses anteriores"
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
            "No es necesario volverlo a reportar en L02"
          ]
        },
        "exclusions": [
          "No reportar devengamiento de cupones como liquidación",
          "En devengamientos, solo actualizar el nuevo saldo en libros"
        ],
        "repurchaseAfterLiquidation": [
          "Si se recompra un título liquidado con 'LI', reportar en L02 con mismo número de título y fecha de emisión pero nueva fecha de compra",
          "Usar campo 'fecha de compra' en L03 para diferenciar recompra de liquidación anterior"
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
 * Validaciones específicas para campos L03
 */
export const L03_FIELD_VALIDATIONS = {
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
