export interface L06FieldTooltip {
    no: number;
    campo: string;
    tipoDeDato: string;
    obligatoriedad: string;
    tabla: string;
    descripcion: string;
}
export const L06_FIELD_TOOLTIPS: L06FieldTooltip[] = [
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
        "descripcion": "Formato numérico. Referencia tabla 164. Corresponde al número de identificación del emisor. Para emisores nacionales será el número de RUC; para emisores del exterior la identificación se reportará conforme a la tabla No. 164, publicada por la Superintendencia de Bancos y Seguros en la página web."
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
        "campo": "Número de Operación",
        "tipoDeDato": "caracter (230)",
        "obligatoriedad": "X",
        "tabla": "",
        "descripcion": "Formato alfanumérico. Corresponde al número con el cual se realizó dicha operación de Reporto."
    },
    {
        "no": 5,
        "campo": "Fecha de emisión",
        "tipoDeDato": "Fecha dd/mm/aaaa",
        "obligatoriedad": "X",
        "tabla": "",
        "descripcion": "Formato fecha dd/mm/aaaa, en la que se crea la operación. Si es un bono, ésta será la fecha de emisión de dicho bono. Si es un derivado, esta fecha será la fecha de contratación de la operación. Si se trata de cuotas de participación en fondos de inversión se deberá informar como fecha de emisión la fecha de compra o la fecha de posición."
    },
    {
        "no": 6,
        "campo": "Fecha de compra",
        "tipoDeDato": "Fecha dd/mm/aaaa",
        "obligatoriedad": "X",
        "tabla": "",
        "descripcion": "Formato fecha dd/mm/aaaa, también conocida como fecha valor. Es la “fecha de negociación”, esto es fecha en la que se asumen las obligaciones recíprocas que deben consumarse dentro del plazo establecido por las regulaciones y usos del mercado en el que se efectúe la operación. En el caso de que un título se haya liquidado totalmente del portafolio y en una fecha posterior se lo vuelva a adquirir, este campo deberá contener la nueva fecha de adquisición, que deberá coincidir con la nueva fecha de compra que también se reporta en la estructura L02. Este campo se reportará todos los meses, y deberá guardar relación con la fecha de compra reportada en la estructura L02."
    }, {

        "no": 7,
        "campo": "Estado de la operación",
        "tipoDeDato": "caracter (1)",
        "obligatoriedad": "X",
        "tabla": "180",
        "descripcion": "Formato alfabético. Referencia tabla 180. Se indicará si la operación de reporto, a la fecha de corte de la estructura, está vigente (V), o si la misma se canceló durante el mes (C)."
    },
    {
        "no": 8,
        "campo": "Cuenta Contable",
        "tipoDeDato": "numérico (6)",
        "obligatoriedad": "X",
        "tabla": "",
        "descripcion": "Formato numérico. Se incluirá el código de subcuenta contable del Catálogo Único de Cuentas expedido por la Superintendencia (a 6 dígitos) en la que está registrada la operación reportada (cuentas 1202 o 2202, según corresponda)."
    },
    {
        "no": 9,
        "campo": "Tipo de operación",
        "tipoDeDato": "numérico (1)",
        "obligatoriedad": "X",
        "tabla": "171",
        "descripcion": "Formato numérico. Referencia tabla 171. Se deberá indicar si se trata de una operación de compra o venta."
    },
    {
        "no": 10,
        "campo": "Fecha de operación",
        "tipoDeDato": "Fecha dd/mm/aaaa",
        "obligatoriedad": "X",
        "tabla": "",
        "descripcion": "Formato fecha dd/mm/aaaa, en la que asumen las obligaciones recíprocas contractualmente convenidas por efecto de la operación reportada."
    },
    {
        "no": 11,
        "campo": "Fecha de vencimiento de la operación",
        "tipoDeDato": "Fecha dd/mm/aaaa",
        "obligatoriedad": "X",
        "tabla": "",
        "descripcion": "Formato fecha dd/mm/aaaa, en que vencen las obligaciones contractuales derivadas de la operación que se reporta."
    },
    {
        "no": 12,
        "campo": "Tipo de identificación de la contraparte",
        "tipoDeDato": "caracter (1)",
        "obligatoriedad": "X",
        "tabla": "4",
        "descripcion": "Formato alfabético. Referencia tabla 4. Se refiere al tipo de identificación de la contraparte, puede ser “R” ó “X”."
    },
    {
        "no": 13,
        "campo": "Identificación de la contraparte de la operación",
        "tipoDeDato": "caracter (13)",
        "obligatoriedad": "X",
        "tabla": "164",
        "descripcion": "Formato alfanumérico. Referencia tabla 164. Corresponde al número de identificación de la entidad contraparte de la operación de reporto (repo o reverse repo). Para contrapartes nacionales será el número de RUC; para contrapartes del exterior la identificación se reportará conforme a la tabla No. 164, publicada por la Superintendencia de Bancos y Seguros en la página web."
    },
    {
        "no": 14,
        "campo": "Moneda de denominación",
        "tipoDeDato": "caracter (3)",
        "obligatoriedad": "X",
        "tabla": "33",
        "descripcion": "Formato numérico. Corresponde al valor nominal de la operación de reporto en la moneda en la que está denominada la operación."
    }, {
        "no": 15,
        "campo": "Monto negociado en dólares",
        "tipoDeDato": "numérico (15,2)",
        "obligatoriedad": "X",
        "tabla": "",
        "descripcion": "Formato numérico. Es la suma contractual en dólares de la operación financiera reportada."
    }, {
        "no": 16,
        "campo": "Tasa efectiva anual",
        "tipoDeDato": "numérico (6.5)",
        "obligatoriedad": "X",
        "tabla": "",
        "descripcion": "Formato numérico. Es la tasa de retorno que permite transformar las condiciones financieras convenidas en la operación a su equivalente anual. Se debe reportar en formato numérico y no porcentual."
    }, {
        "no": 17,
        "campo": "Valor nominal del título en dólares",
        "tipoDeDato": "numérico (15,2)",
        "obligatoriedad": "X",
        "tabla": "",
        "descripcion": "Formato numérico. Es el valor nominal o facial del instrumento expresado en su importe equivalente en dólares. En el caso de cuotas en fondos administrados incluir el valor de cierre (NAV) a la fecha de compra."
    },
    {
        "no": 18,
        "campo": "Valor de mercado del título en dólares",
        "tipoDeDato": "numérico (15,2)",
        "obligatoriedad": "X",
        "tabla": "",
        "descripcion": "Formato numérico. Valor monetario del instrumento de inversión negociado, según cotización de mercado, a la fecha de reporte."
    },
    {
        "no": 19,
        "campo": "Categoría de calificación",
        "tipoDeDato": "numérico (1)",
        "obligatoriedad": "X",
        "tabla": "169",
        "descripcion": "Formato numérico. Referencia tabla 169. Indica si la calificación es al emisor o a la emisión."
    }, {
        "no": 20,
        "campo": "Calificación de riesgo",
        "tipoDeDato": "numérico (,2)",
        "obligatoriedad": "X",
        "tabla": "65",
        "descripcion": "Formato numérico. Referencia tabla 65. De acuerdo con la disposición normativa, si hay más de una calificación para un mismo instrumento o emisor, se deberá registrar la más conservadora."
    },
    {
        "no": 21,
        "campo": "Calificadora de riesgo",
        "tipoDeDato": "numérico (1)",
        "obligatoriedad": "X",
        "tabla": "66",
        "descripcion": "Formato numérico. Referencia tabla 66. Nombre de la calificadora de riesgo que otorga la calificación reportada en el campo anterior."
    },
    {
        "no": 22,
        "campo": "Tipo de identificación del custodio   ",
        "tipoDeDato": "caracter (1)",
        "obligatoriedad": "X",
        "tabla": "4",
        "descripcion": "Formato alfabético. Referencia tabla 4. Se refiere al tipo de identificación del custodio, puede ser “R” ó “X”."
    },
    {
        "no": 23,
        "campo": "Identificación del custodio",
        "tipoDeDato": "caracter (13)",
        "obligatoriedad": "X",
        "tabla": "164",
        "descripcion": "Formato numérico. Referencia tabla 164. Corresponde a la identificación de la entidad que mantiene la custodia de los instrumentos de inversión materia de la operación financiera reportada. Para custodios nacionales será el número de RUC; para custodios del exterior la identificación se reportará, conforme a la tabla No. 164, publicada por la Superintendencia de Bancos en la página web."
    }
];

export function getL06FieldTooltips(fieldName: string): L06FieldTooltip | null {
    return L06_FIELD_TOOLTIPS.find(tooltip => tooltip.campo === fieldName) || null;
}
export function getAllL06FieldTooltips(): L06FieldTooltip[] {
    return L06_FIELD_TOOLTIPS;
}