/**
 * TOOLTIPS Y GLOSARIO DE CAMPOS R02
 * Manual Técnico Control de Inversiones v3.0 - Marzo 2017
 * Superintendencia de Bancos del Ecuador
 */

// export interface R02FieldTooltip {
//   field: string;
//   title: string;
//   description: string;
//   source: string;
//   example: string;
//   format: string;
//   validation: string;
// }
export interface R02FieldTooltip {
  no: number;
  campo: string;
  tipoDeDato: string;
  obligatoriedad: string;
  tabla: string;
  descripcion: string;
}

export const R02_FIELD_TOOLTIPS: R02FieldTooltip[] = [
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
    "campo": "Valor de la operación",
    "tipoDeDato": "numerico (15,2)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Valor por el que se suscribió la operación concedida, que se registra en la cuenta contable respectiva. Dependiendo de la cuenta contable, puede incluir capital más intereses, aunque normalmente solo debe ser capital"
  },
  {
    "no": 5,
    "campo": "Tasa de interés nominal",
    "tipoDeDato": "numerico (4,2)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Es la tasa de interés pactada en la concesión de la operación. Debe ser expresado en formato numérico, por ejemplo 14.5, 25.12, etc. Para el caso de reporte de operaciones de Factoring, no se registra"
  },
  {
    "no": 6,
    "campo": "TEA",
    "tipoDeDato": "numerico (4,2)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Es el valor de la tasa efectiva anual expresada en porcentaje, debiendo considerar todos los factores de afectación que determinen el valor del préstamo para el deudor"
  },
  {
    "no": 7,
    "campo": "Moneda",
    "tipoDeDato": "caracter (3)",
    "obligatoriedad": "X",
    "tabla": "33",
    "descripcion": "Código de la moneda en la que se realizó la operación."
  },
  {
    "no": 8,
    "campo": "Fecha de concesión",
    "tipoDeDato": "fecha (dd/mm/aaaa)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Fecha en que fue instrumentada la operación."
  },
  {
    "no": 9,
    "campo": "Fecha de vencimiento",
    "tipoDeDato": "fecha (dd/mm/aaaa)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Fecha en que vencerá la operación."
  },
  {
    "no": 10,
    "campo": "Línea de crédito",
    "tipoDeDato": "caracter(1)",
    "obligatoriedad": "X",
    "tabla": "37",
    "descripcion": "Código que indica si la operación se concedió con fondos propios, con redescuento en banca de segundo piso o con recursos internacionales. Código “D” Solo aplica para Instituciones Financieras Públicas"
  },
  {
    "no": 11,
    "campo": "Periodicidad de pago",
    "tipoDeDato": "caracter (2)",
    "obligatoriedad": "X",
    "tabla": "38",
    "descripcion": "Es el código que indica la periodicidad con la que el sujeto deberá realizar los pagos de los dividendos delcrédito."
  },
  {
    "no": 12,
    "campo": "Frecuencia de revisión",
    "tipoDeDato": "numérico (4)",
    "obligatoriedad": "X*",
    "tabla": "",
    "descripcion": "Indica la periodicidad o frecuencia con la cual se modifican las tasas de interés. Debe estar expresado endías."
  },
  {
    "no": 13,
    "campo": "Oficina de concesión",
    "tipoDeDato": "numérico (4)",
    "obligatoriedad": "X",
    "tabla": "3",
    "descripcion": "Código de la oficina (matriz, sucursal o agencia) de la institución financiera en que se instrumentó la operación."
  },
  {
    "no": 14,
    "campo": "Garantes o garantías",
    "tipoDeDato": "caracter (2)",
    "obligatoriedad": "X",
    "tabla": "209",
    "descripcion": "Indica si la operación cuenta o no, con garantes y/o garantías reales."
  },
  {
    "no": 15,
    "campo": "Indicador de operación exenta",
    "tipoDeDato": "caracter (1)",
    "obligatoriedad": "X",
    "tabla": "25",
    "descripcion": "Código que indica si la operación concedida está exenta o no del cálculo de límites de crédito. En caso de ser exenta, se debe indicar la causa por la que se da esta condición, de acuerdo con la tabla 25."
  },
  {
    "no": 16,
    "campo": "Tipo de crédito",
    "tipoDeDato": "caracter (2)",
    "obligatoriedad": "X",
    "tabla": "31",
    "descripcion": "Código que identifica al tipo de crédito otorgado por la entidad."
  },
  {
    "no": 17,
    "campo": "Clase de crédito",
    "tipoDeDato": "caracter (1)",
    "obligatoriedad": "X",
    "tabla": "207",
    "descripcion": "Código que identifica a la clase de crédito: individual, participado, comunal"
  },
  {
    "no": 18,
    "campo": "Estado de la operación",
    "tipoDeDato": "numérico (15,2)",
    "obligatoriedad": "X",
    "tabla": "32",
    "descripcion": "Es el código que indica el estado con el que se crea la operación. Aquellas operaciones que se generen bajo la aplicación de lo que determina el artículo 4 de la LOSyPT, se remitirán con el código “R”."
  },
  {
    "no": 19,
    "campo": "Situación de la operación",
    "tipoDeDato": "caracter (1)",
    "obligatoriedad": "X",
    "tabla": "32-A",
    "descripcion": "Código que indica la situación en la que se encuentra la operación."
  },
  {
    "no": 20,
    "campo": "Tipo de operación",
    "tipoDeDato": "caracter (3)",
    "obligatoriedad": "X",
    "tabla": "35",
    "descripcion": "Código que identifica el tipo o clase de operación."
  },
  {
    "no": 21,
    "campo": "Destino financiero de la operación",
    "tipoDeDato": "caracter (2)",
    "obligatoriedad": "X",
    "tabla": "36-6",
    "descripcion": "Código que indica el uso financiero al cual está destinada la operación concedida."
  },
  {
    "no": 22,
    "campo": "Actividad economíca receptora de la operación",
    "tipoDeDato": "caracter (9)",
    "obligatoriedad": "X",
    "tabla": "28",
    "descripcion": "Código que identifica la actividad económica a la cual se destinará realmente los fondos de la operación concedida. Debe ser reportado al “Nivel 3”, de 9 dígitos. En caso de que los recursos de la operación sean dirigidos para “inversión ensambladoras de vehículos”, este campo deberá llenarse con el código 030001001 “Fabricación de vehículos automotores”."
  },
  {
    "no": 23,
    "campo": "Destino geográfico país",
    "tipoDeDato": "caracter (2)",
    "obligatoriedad": "X",
    "tabla": "5",
    "descripcion": "Código del país donde se destinan los fondos de la operación concedida."
  },
  {
    "no": 24,
    "campo": "Destino geográfico provincia",
    "tipoDeDato": "caracter (2)",
    "obligatoriedad": "X*",
    "tabla": "6",
    "descripcion": "Código de la provincia en el Ecuador donde se destinan los fondos de la operación concedida. Será de uso *obligatorio, únicamente cuando el campo destino geográfico país refiera al Ecuador (código “EC”)."
  },
  {
    "no": 25,
    "campo": "Destino geográfico canton",
    "tipoDeDato": "caracter (2)",
    "obligatoriedad": "X*",
    "tabla": "7",
    "descripcion": "Código del cantón del Ecuador donde se destinan los fondos de la operación concedida. Será de uso *obligatorio, únicamente cuando el campo destino geográfico país refiera al Ecuador (código “EC”)."
  },
  {
    "no": 26,
    "campo": "Destino geográfico parroquia",
    "tipoDeDato": "caracter (2)",
    "obligatoriedad": "X*",
    "tabla": "50",
    "descripcion": "Código de la parroquia en el Ecuador donde se destinan los fondos de la operación concedida. Será de uso *obligatorio, únicamente cuando el campo destino geográfico país refiera al Ecuador (código “EC”)."
  },
  {
    "no": 27,
    "campo": "Total ingresos sujetos",
    "tipoDeDato": "numérico (15,2)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": " Los créditos concedidos para las personas naturales, corresponde registrar este campo con el monto total de los ingresos mensuales familiares que tiene el sujeto de crédito al momento en que se le concede la operación, y que han sido verificados y aceptadas por la entidad como reales. Para el caso de microempresarios, corresponde al ingreso remanente de su actividad disponible para el sustento familiar. Para el caso de concesiones de crédito a personas jurídicas este campo registrará valor cero(0)."
  },
  {
    "no": 28,
    "campo": "Total egresos sujeto",
    "tipoDeDato": "numérico (15,2)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Los créditos concedidos para las personas naturales, corresponde al monto total de los egresos mensuales familiares que tiene el sujeto de crédito al momento en que se le concede la operación, y que han sido verificados y aceptadas por la entidad como reales, sin considerar las cuotas provenientes de deudas en el sistema financiero y en sector real. Para el caso de microempresarios, corresponde a los gastos efectuados para el sustento familiar. Para el caso de concesiones de crédito a personas jurídicas este campo registrará valor cero(0)"
  },
  {
    "no": 29,
    "campo": "Nivel de estudios esperado",
    "tipoDeDato": "caracter (1)",
    "obligatoriedad": "X*",
    "tabla": "212",
    "descripcion": "Es el código que representa al nivel de educación del sujeto que se espera con el otorgamiento del crédito. Será de uso *obligatorio cuando el campo tipo de crédito corresponda al código “ED” (Crédito Educativo), caso contrario será NULO."
  },
  {
    "no": 30,
    "campo": "Número de empleos que se mantienen",
    "tipoDeDato": "numerico (5)",
    "obligatoriedad": "X*",
    "tabla": "",
    "descripcion": "Es la cantidad de puestos de trabajo o empleos que declara el solicitante, que espera conservar ocupados por efecto de la continuidad de la actividad que desarrolla, como producto del préstamo que le es concedido. Este campo deberá ser reportado por las instituciones financieras públicas en los casos que se señalan a continuación: BanEcuador B.P., Banco de Desarrollo del Ecuador B.P. y CFN B.P.\nsiempre y cuando el campo tipo decrédito corresponda a los códigos de crédito productivo, y microcrédito; Banco de Desarrollo del Ecuador B.P. siempre y cuando el campo tipo de crédito corresponda a crédito de inversión pública."
  },
  {
    "no": 31,
    "campo": "Número de empleos que se espera incrementar",
    "tipoDeDato": "numerico (5)",
    "obligatoriedad": "X*",
    "tabla": "",
    "descripcion": "Corresponde a la cantidad de puestos de trabajo o empleos (fijos o temporales) que declara el solicitante, que estima incrementará respecto del período anterior a la recepción del crédito, como resultado de la utilización del crédito solicitado. Este campo deberá ser reportado por las instituciones financieras públicas en los casos que se señalan a continuación: BanEcuador B.P., Banco de Desarrollo del Ecuador B.P. y CFN B.P. siempre y cuando el campo tipo decrédito corresponda a los códigos de crédito productivo, y microcrédito; Banco de Desarrollo del Ecuador B.P. siempre y cuando el campo tipo de crédito corresponda a crédito de inversión pública."
  },
  {
    "no": 32,
    "campo": "Producción actual que se mantiene",
    "tipoDeDato": "numerico (15,2)",
    "obligatoriedad": "X*",
    "tabla": "",
    "descripcion": "Es la cantidad de producción para consumo interno (volumen de unidades producidas) expresado en unidades monetarias (dólares) que declara el solicitante, que espera mantener produciendo respecto del período anterior a la recepción del crédito con los recursos del crédito solicitado. Este campo deberá ser reportado por las instituciones financieras públicas en los casos que se señalan a continuación: BanEcuador B.P., Banco de Desarrollo del Ecuador B.P. y CFN B.P. siempre y cuando el campo tipo decrédito corresponda a los códigos de crédito productivo, y microcrédito; Banco de Desarrollo del Ecuador B.P. siempre y cuando el campo tipo de crédito corresponda a crédito de inversión pública."
  },
  {
    "no": 33,
    "campo": "Incremento esperado de la producción",
    "tipoDeDato": "numerico (15,2)",
    "obligatoriedad": "X*",
    "tabla": "",
    "descripcion": "Es la cantidad de producción para consumo interno (volumen de unidades producidas) expresado en unidades monetarias (dólares) que declara el solicitante, que estima incrementar respecto del período anterior a la recepción del crédito con los recursos del crédito solicitado. Este campo deberá ser reportado por las instituciones financieras públicas en los casos que se señalan a continuación: BanEcuador B.P., Banco de Desarrollo del Ecuador B.P. y CFN B.P. siempre y cuando el campo tipo decrédito corresponda a los códigos de crédito productivo, y microcrédito; Banco de Desarrollo del Ecuador B.P. siempre y cuando el campo tipo de crédito corresponda a crédito de inversión pública."
  },
  {
    "no": 34,
    "campo": "Contribución a mantener la producción exportable",
    "tipoDeDato": "numerico (15,2)",
    "obligatoriedad": "X*",
    "tabla": "",
    "descripcion": "Es la cantidad de producción (volumen de unidades producidas) expresado en unidades monetarias (dólares) que declara el solicitante, que espera continuar exportando, respecto del período anterior a la recepción del crédito, con los recursos del crédito solicitado. Este campo deberá ser reportado por las instituciones financieras públicas en los casos que se señalan a continuación: BanEcuador B.P., Banco de Desarrollo del Ecuador B.P. y CFN B.P. siempre y cuando el campo tipo decrédito corresponda a los códigos de crédito productivo, y microcrédito; Banco de Desarrollo del Ecuador B.P. siempre y cuando el campo tipo de crédito corresponda a crédito de inversión pública."
  },
  {
    "no": 35,
    "campo": "Incremento esperado en la producción exportable",
    "tipoDeDato": "numerico (15,2)",
    "obligatoriedad": "X*",
    "tabla": "",
    "descripcion": "Es la cantidad de producción (volumen de unidades producidas) expresado en unidades monetarias (dólares) que declara el solicitante, que espera incrementar en sus exportaciones, respecto del período anterior a la recepción del crédito, con los recursos del crédito solicitado. Este campo deberá ser reportado por las instituciones financieras públicas en los casos que se señalan a continuación: BanEcuador B.P., Banco de Desarrollo del Ecuador B.P. y CFN B.P. siempre y cuando el campo tipo decrédito corresponda a los códigos de crédito productivo, y microcrédito; Banco de Desarrollo del Ecuador B.P. siempre y cuando el campo tipo de crédito corresponda a crédito de inversión pública"
  },
  {
    "no": 36,
    "campo": "Contirbución al sostenimiento de la inversion - FBK (Formacion Bruta de Capital)",
    "tipoDeDato": "numerico (15,2)",
    "obligatoriedad": "X*",
    "tabla": "",
    "descripcion": "Es la inversión en dólares que declara el solicitante, que efectuará con los recursos provenientes del crédito, para el mantenimiento o reposición de infraestructura, maquinaria y equipo que utiliza en la generación o comercialización de sus productos. Este campo deberá ser reportado por las instituciones financieras públicas en los casos que se señalan a continuación: BanEcuador B.P., Banco de Desarrollo del Ecuador B.P. y CFN B.P. siempre y cuando el campo tipo decrédito corresponda a los códigos de crédito productivo, y microcrédito; Banco de Desarrollo del Ecuador B.P. siempre y cuando el campo tipo de crédito corresponda a crédito de inversión pública"
  },
  {
    "no": 37,
    "campo": "Incremento en la inversión - FBK (Formación Bruta de Capital)",
    "tipoDeDato": "numerico (15,2)",
    "obligatoriedad": "X*",
    "tabla": "",
    "descripcion": "Es el incremento en la inversión en dólares que declara el solicitante, que efectuará con los recursos provenientes del crédito, en infraestructura, maquinaria y equipo que utiliza en la generación o comercialización de sus productos. Este campo deberá ser reportado por las instituciones financieras públicas en los casos que se señalan a continuación: BanEcuador B.P., Banco de Desarrollo del Ecuador B.P. y CFN B.P. siempre y cuando el campo tipo decrédito corresponda a los códigos de crédito productivo, y microcrédito; Banco de Desarrollo del Ecuador B.P. siempre y cuando el campo tipo de crédito corresponda a crédito de inversión pública."
  },
  {
    "no": 38,
    "campo": "Contribución para atención integral del cáncer",
    "tipoDeDato": "numerico (15,2)",
    "obligatoriedad": "X",
    "tabla": "",
    "descripcion": "Corresponde al 0.5% sobre el valor concedido del crédito, que el cliente debe contribuir en función del tiempo y el capital al que se otorga la obligación. (Décimo Cuarta Disposición Transitoria del Código Orgánico Monetario y Financiero y Resolución No. 003-2014-F de la Junta de Política de Regulación Monetariay Financiera)"
  },
  {
    "no": 39,
    "campo": "Destino de credito para bienes inmuebles",
    "tipoDeDato": "caracter (2)",
    "obligatoriedad": "X*",
    "tabla": "235",
    "descripcion": "Este código será asignado para describir el uso de los valores producto del crédito recibido, cuando el tipo de crédito corresponda a crédito inmobiliario o vivienda de interés público, caso contrario será nulo."
  },
  {
    "no": 40,
    "campo": "Valor comercial del inmuble",
    "tipoDeDato": "numerico (15,2)",
    "obligatoriedad": "X*",
    "tabla": "",
    "descripcion": "Corresponde al valor comercial, definido por el perito en el avalúo total del inmueble, en el proceso de adquisición o construcción de la vivienda o inmueble. Se registrará valor cuando el campo tipo de crédito corresponda a crédito inmobiliario y vivienda de interés público, en cualquier otro caso registrará cero."
  },
  {
    "no": 41,
    "campo": "Metros cuadrados del inmueble",
    "tipoDeDato": "numerico (15,2)",
    "obligatoriedad": "X*",
    "tabla": "",
    "descripcion": "Se registrará el metraje del bien inmueble adquirido, cuando el campo tipo de crédito corresponda a cartera inmobiliaria y vivienda de interés público, en cualquier otro caso registrará cero"
  },
  {
    "no": 42,
    "campo": "Número de personas que aportan al total de ingresos",
    "tipoDeDato": "numerico (4)",
    "obligatoriedad": "X*",
    "tabla": "",
    "descripcion": "Se indicará el número de personas que aportan al total de ingresos reportado en el campo “Total ingresos sujeto”, cuyo monto fue analizado para la concesión del crédito. Cuando el ingreso corresponda únicamente al deudor se reportará el número ”1” Este campo no aplica cuando el tipo de crédito corresponda a los códigos de créditos productivos y de inversión pública, en cuyo caso será cero."
  }
]
;

/**
 * Obtener tooltip para un campo específico de R02
 */
export function getR02FieldTooltip(fieldName: string): R02FieldTooltip | null {
  // return R02_FIELD_TOOLTIPS.find(tooltip => tooltip.field === fieldName) || null;
  return R02_FIELD_TOOLTIPS.find(tooltip => tooltip.campo === fieldName) || null;
}

/**
 * Obtener todos los tooltips de R02
 */
export function getAllR02FieldTooltips(): R02FieldTooltip[] {
  return R02_FIELD_TOOLTIPS;
}

/**
 * Información estructural de R02
 */
export const R02_STRUCTURE_INFO = {
  title: 'Estructura R02 - Emisores, Custodios y Contrapartes',
  description: 'Contiene los saldos de todos los títulos que se encuentren registrados en el balance de la entidad, incluso de aquellos que se encuentren vencidos y por lo tanto registrados en la cuenta 1612. Incluye el detalle de los títulos que, habiendo sido reportado su saldo en el mes inmediato anterior, han sido liquidados o vendidos en el mes de reporte por lo que ya no constan en el portafolio de la entidad a la fecha de corte de la estructura.',
  periodicity: 'Mensual (M) - Solo cuando hay nuevos registros',
  deadline: '8 días hábiles desde la fecha de corte',
  source: 'Manual Técnico De Estructuras De Datos Del Sistema De Control De Inversiones v3.0 - Marzo 2017',
  bankCode: '1038 - Banco Sudamericano',
  fileFormat: 'R02E1038ddmmaaaa.txt',
  requirements: {
      "table": "R02 - Saldo y Liquidaciones de inversiones",
      "requisites": {
        "scope": [
          "Incluir saldos de todos los títulos registrados en el balance, incluyendo los vencidos en la cuenta 1612",
          "Incluir títulos reportados en el mes anterior que fueron liquidados o vendidos en el mes de reporte",
          "Reportar título por título, sin agrupar instrumentos aunque sean de la misma serie"
        ],
        "preconditions": [
          "El título debe haber sido reportado previamente en R02 en el mismo mes o en meses anteriores"
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
            "No es necesario volverlo a reportar en R02"
          ]
        },
        "exclusions": [
          "No reportar devengamiento de cupones como liquidación",
          "En devengamientos, solo actualizar el nuevo saldo en libros"
        ],
        "repurchaseAfterLiquidation": [
          "Si se recompra un título liquidado con 'LI', reportar en R02 con mismo número de título y fecha de emisión pero nueva fecha de compra",
          "Usar campo 'fecha de compra' en R02 para diferenciar recompra de liquidación anterior"
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
 * Validaciones específicas para campos R02
 */
export const R02_FIELD_VALIDATIONS = {
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
