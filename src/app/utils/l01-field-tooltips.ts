/**
 * TOOLTIPS Y GLOSARIO DE CAMPOS L01
 * Manual Técnico Control de Inversiones v3.0 - Marzo 2017
 * Superintendencia de Bancos del Ecuador
 */

export interface L01FieldTooltip {
  field: string;
  title: string;
  description: string;
  source: string;
  example: string;
  format: string;
  validation: string;
}

export const L01_FIELD_TOOLTIPS: L01FieldTooltip[] = [
  {
    field: 'tipoIdentificacion',
    title: 'Tipo de Identificación',
    description: 'Formato alfabético. Se refiere al tipo de identificación del emisor, custodio, depositario o contraparte, puede ser "R" ó "X". Si es una institución del Ecuador, corresponderá el código "R". Si es del exterior el código "X".',
    source: 'Manual SB - Control de Inversiones Marzo 2017 - Tabla t4',
    example: 'R = RUC Nacional, X = Código Exterior',
    format: 'Caracter (1)',
    validation: 'Obligatorio - Solo R o X'
  },
  {
    field: 'identificacion',
    title: 'Identificación del Emisor/Custodio/Depositario/Contraparte',
    description: 'Formato alfanumérico. Corresponde al número de identificación. Para emisores nacionales será el número de RUC (13 dígitos); para emisores del exterior la identificación se reportará conforme a la tabla No. 164 (7 dígitos).',
    source: 'Manual SB - Control de Inversiones Marzo 2017 - Tabla t164',
    example: 'Nacional: 1791234567001 (13 dígitos), Exterior: 1000001 (7 dígitos)',
    format: 'Caracter (13)',
    validation: 'Obligatorio - RUC 13 dígitos o código extranjero 7 dígitos'
  },
  {
    field: 'clasificacion',
    title: 'Clasificación de Emisor/Custodio/Depositario/Contraparte',
    description: 'Formato numérico. Clasificación según tabla 173 del manual oficial. Define el rol de la entidad en el sistema financiero: Emisor (emite valores), Custodio (custodia inversiones), Depositario (deposita fondos), Contraparte (operaciones reporto).',
    source: 'Manual SB - Control de Inversiones Marzo 2017 - Tabla t173',
    example: '1 = Emisor, 2 = Custodio, 3 = Depositario, 4 = Contraparte',
    format: 'Numérico (1)',
    validation: 'Obligatorio - Solo valores 1, 2, 3 o 4'
  },
  {
    field: 'tipoEmisor',
    title: 'Tipo de Emisor/Custodio/Depositario/Contraparte',
    description: 'Formato numérico. Tipo según tabla 73 del manual oficial. Clasifica la entidad por sector: Supranacionales (BCE/BIESS), Pública/Privada financiera/no financiera, Fondos, Estados Soberanos, Multilaterales. Excluye: código 1 (Persona Natural) y código 6 (Fondos jubilación) que no aplican para L01.',
    source: 'Manual SB - Control de Inversiones Marzo 2017 - Tabla t73',
    example: '0=Supranacionales, 2=Pública financiera, 3=Privada financiera, 4=Pública no financiera, 5=Privada no financiera, 7=Fondos inversión, 8=Estados Soberanos, 9=Multilaterales',
    format: 'Numérico (1)',
    validation: 'Obligatorio - Según tabla 73, excluyendo códigos 1 y 6'
  }
];

/**
 * Obtener tooltip para un campo específico de L01
 */
export function getL01FieldTooltip(fieldName: string): L01FieldTooltip | null {
  return L01_FIELD_TOOLTIPS.find(tooltip => tooltip.field === fieldName) || null;
}

/**
 * Obtener todos los tooltips de L01
 */
export function getAllL01FieldTooltips(): L01FieldTooltip[] {
  return L01_FIELD_TOOLTIPS;
}

/**
 * Información estructural de L01
 */
export const L01_STRUCTURE_INFO = {
  title: 'Estructura L01 - Emisores, Custodios y Contrapartes',
  description: 'Comprende a todos los emisores y custodios de las inversiones registradas en el portafolio de la institución, así como los depositarios de valores registrados en el grupo de fondos disponibles y las contrapartes en operaciones de reporto. Cada emisor, custodio, depositario o contraparte, debe reportarse una única vez en esta estructura.',
  periodicity: 'Eventual (E) - Solo cuando hay nuevos registros',
  deadline: '3 días hábiles desde la fecha de corte',
  source: 'Manual Técnico Control de Inversiones v3.0 - Marzo 2017',
  bankCode: '1038 - Banco Sudamericano',
  fileFormat: 'L01E1038ddmmaaaa.txt',
  requirements: [
    'Cada emisor, custodio, depositario o contraparte debe reportarse una única vez',
    'Posteriores validaciones deben realizarse con fechas de corte distintas',
    'Solo incluir nuevos datos no reportados previamente',
    'Estructura se puede validar las veces que sea necesario',
    'Formato de archivo: L01E + código entidad + fecha (ddmmaaaa) + .txt',
    'Mínimo 1 registro de detalle obligatorio'
  ],
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
 * Validaciones específicas para campos L01
 */
export const L01_FIELD_VALIDATIONS = {
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
