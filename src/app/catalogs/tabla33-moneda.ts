/**
 * Tabla 33 - Moneda
 * Manual Técnico de Generalidades sobre Estructuras de Datos Codificación - Tablas
 * Fecha Actualización: 17/02/2022 - Versión: 13.3
 * Aplica ISO-4217
 */

export interface Tabla33Moneda {
  codigo: string;
  descripcion: string;
  estandar: string;
}

export const TABLA_33_MONEDA: Tabla33Moneda[] = [
  { codigo: 'AED', descripcion: 'Dirham de los Emiratos Árabes Unidos', estandar: 'ISO-4217' },
  { codigo: 'AFN', descripcion: 'Afgani afgano', estandar: 'ISO-4217' },
  { codigo: 'ALL', descripcion: 'Lek albano', estandar: 'ISO-4217' },
  { codigo: 'AMD', descripcion: 'Dram armenio', estandar: 'ISO-4217' },
  { codigo: 'ANG', descripcion: 'Florín de las Antillas Holandesas', estandar: 'ISO-4217' },
  { codigo: 'AOA', descripcion: 'Kwanza angoleño', estandar: 'ISO-4217' },
  { codigo: 'ARS', descripcion: 'Peso argentino', estandar: 'ISO-4217' },
  { codigo: 'AUD', descripcion: 'Dólar australiano', estandar: 'ISO-4217' },
  { codigo: 'AWG', descripcion: 'Florín arubeño', estandar: 'ISO-4217' },
  { codigo: 'BAM', descripcion: 'Marco convertible de Bosnia-Herzegovina', estandar: 'ISO-4217' },
  { codigo: 'BBD', descripcion: 'Dólar de Barbados', estandar: 'ISO-4217' },
  { codigo: 'BDT', descripcion: 'Taka de Bangladesh', estandar: 'ISO-4217' },
  { codigo: 'BGN', descripcion: 'Lev búlgaro', estandar: 'ISO-4217' },
  { codigo: 'BHD', descripcion: 'Dinar bahreiní', estandar: 'ISO-4217' },
  { codigo: 'BIF', descripcion: 'Franco burundés', estandar: 'ISO-4217' },
  { codigo: 'BMD', descripcion: 'Dólar de Bermuda', estandar: 'ISO-4217' },
  { codigo: 'BND', descripcion: 'Dólar de Brunei', estandar: 'ISO-4217' },
  { codigo: 'BOB', descripcion: 'Boliviano', estandar: 'ISO-4217' },
  { codigo: 'BRL', descripcion: 'Real brasileño', estandar: 'ISO-4217' },
  { codigo: 'BSD', descripcion: 'Dólar bahameño', estandar: 'ISO-4217' },
  { codigo: 'BTN', descripcion: 'Ngultrum de Bután', estandar: 'ISO-4217' },
  { codigo: 'BWP', descripcion: 'Pula de Botswana', estandar: 'ISO-4217' },
  { codigo: 'BZD', descripcion: 'Dólar de Belice', estandar: 'ISO-4217' },
  { codigo: 'CAD', descripcion: 'Dólar canadiense', estandar: 'ISO-4217' },
  { codigo: 'CDF', descripcion: 'Franco congoleño', estandar: 'ISO-4217' },
  { codigo: 'CHF', descripcion: 'Franco suizo', estandar: 'ISO-4217' },
  { codigo: 'CLP', descripcion: 'Peso chileno', estandar: 'ISO-4217' },
  { codigo: 'CNY', descripcion: 'Yuan Renminbi de China', estandar: 'ISO-4217' },
  { codigo: 'COP', descripcion: 'Peso colombiano', estandar: 'ISO-4217' },
  { codigo: 'CRC', descripcion: 'Colón costarricense', estandar: 'ISO-4217' },
  { codigo: 'CUP', descripcion: 'Peso cubano', estandar: 'ISO-4217' },
  { codigo: 'CVE', descripcion: 'Escudo caboverdiano', estandar: 'ISO-4217' },
  { codigo: 'CZK', descripcion: 'Koruna checo', estandar: 'ISO-4217' },
  { codigo: 'DJF', descripcion: 'Franco yibutiano', estandar: 'ISO-4217' },
  { codigo: 'DKK', descripcion: 'Corona danesa', estandar: 'ISO-4217' },
  { codigo: 'DOP', descripcion: 'Peso dominicano', estandar: 'ISO-4217' },
  { codigo: 'DZD', descripcion: 'Dinar algerino', estandar: 'ISO-4217' },
  { codigo: 'ECU', descripcion: 'Unidad de Cuenta Europea', estandar: 'ISO-4217' },
  { codigo: 'EGP', descripcion: 'Libra egipcia', estandar: 'ISO-4217' },
  { codigo: 'ERN', descripcion: 'Nakfa de Eritrea', estandar: 'ISO-4217' },
  { codigo: 'ETB', descripcion: 'Birr etíope', estandar: 'ISO-4217' },
  { codigo: 'EUR', descripcion: 'Euro', estandar: 'ISO-4217' },
  { codigo: 'FJD', descripcion: 'Dólar de Fiyi', estandar: 'ISO-4217' },
  { codigo: 'FKP', descripcion: 'Libra de las Islas Malvinas', estandar: 'ISO-4217' },
  { codigo: 'GBP', descripcion: 'Libra esterlina', estandar: 'ISO-4217' },
  { codigo: 'GEL', descripcion: 'Lari georgiano', estandar: 'ISO-4217' },
  { codigo: 'GHS', descripcion: 'Cedi ghanés', estandar: 'ISO-4217' },
  { codigo: 'GIP', descripcion: 'Libra de Gibraltar', estandar: 'ISO-4217' },
  { codigo: 'GMD', descripcion: 'Dalasi gambiano', estandar: 'ISO-4217' },
  { codigo: 'GNF', descripcion: 'Franco guineano', estandar: 'ISO-4217' },
  { codigo: 'GTQ', descripcion: 'Quetzal guatemalteco', estandar: 'ISO-4217' },
  { codigo: 'GYD', descripcion: 'Dólar guyanés', estandar: 'ISO-4217' },
  { codigo: 'HKD', descripcion: 'Dólar de Hong Kong', estandar: 'ISO-4217' },
  { codigo: 'HNL', descripcion: 'Lempira hondureño', estandar: 'ISO-4217' },
  { codigo: 'HRK', descripcion: 'Kuna croata', estandar: 'ISO-4217' },
  { codigo: 'HTG', descripcion: 'Gourde haitiano', estandar: 'ISO-4217' },
  { codigo: 'HUF', descripcion: 'Forinto húngaro', estandar: 'ISO-4217' },
  { codigo: 'IDR', descripcion: 'Rupia indonesia', estandar: 'ISO-4217' },
  { codigo: 'ILS', descripcion: 'Nuevo shekel israelí', estandar: 'ISO-4217' },
  { codigo: 'INR', descripcion: 'Rupia india', estandar: 'ISO-4217' },
  { codigo: 'IQD', descripcion: 'Dinar iraquí', estandar: 'ISO-4217' },
  { codigo: 'IRR', descripcion: 'Rial iraní', estandar: 'ISO-4217' },
  { codigo: 'ISK', descripcion: 'Corona islandesa', estandar: 'ISO-4217' },
  { codigo: 'JMD', descripcion: 'Dólar jamaicano', estandar: 'ISO-4217' },
  { codigo: 'JOD', descripcion: 'Dinar jordano', estandar: 'ISO-4217' },
  { codigo: 'JPY', descripcion: 'Yen japonés', estandar: 'ISO-4217' },
  { codigo: 'KES', descripcion: 'Chelín keniano', estandar: 'ISO-4217' },
  { codigo: 'KGS', descripcion: 'Som kirguís', estandar: 'ISO-4217' },
  { codigo: 'KHR', descripcion: 'Riel camboyano', estandar: 'ISO-4217' },
  { codigo: 'KMF', descripcion: 'Franco comorense', estandar: 'ISO-4217' },
  { codigo: 'KPW', descripcion: 'Won norcoreano', estandar: 'ISO-4217' },
  { codigo: 'KRW', descripcion: 'Won surcoreano', estandar: 'ISO-4217' },
  { codigo: 'KWD', descripcion: 'Dinar kuwaití', estandar: 'ISO-4217' },
  { codigo: 'KYD', descripcion: 'Dólar de las Islas Caimán', estandar: 'ISO-4217' },
  { codigo: 'KZT', descripcion: 'Tenge kazajo', estandar: 'ISO-4217' },
  { codigo: 'LAK', descripcion: 'Kip laosiano', estandar: 'ISO-4217' },
  { codigo: 'LBP', descripcion: 'Libra libanesa', estandar: 'ISO-4217' },
  { codigo: 'LKR', descripcion: 'Rupia de Sri Lanka', estandar: 'ISO-4217' },
  { codigo: 'LRD', descripcion: 'Dólar liberiano', estandar: 'ISO-4217' },
  { codigo: 'LSL', descripcion: 'Loti lesotense', estandar: 'ISO-4217' },
  { codigo: 'LYD', descripcion: 'Dinar libio', estandar: 'ISO-4217' },
  { codigo: 'MAD', descripcion: 'Dirham marroquí', estandar: 'ISO-4217' },
  { codigo: 'MDL', descripcion: 'Leu moldavo', estandar: 'ISO-4217' },
  { codigo: 'MGA', descripcion: 'Ariary malgache', estandar: 'ISO-4217' },
  { codigo: 'MKD', descripcion: 'Denar macedonio', estandar: 'ISO-4217' },
  { codigo: 'MMK', descripcion: 'Kyat birmano', estandar: 'ISO-4217' },
  { codigo: 'MNT', descripcion: 'Tugrik mongol', estandar: 'ISO-4217' },
  { codigo: 'MOP', descripcion: 'Pataca de Macao', estandar: 'ISO-4217' },
  { codigo: 'MRO', descripcion: 'Ouguiya mauritano', estandar: 'ISO-4217' },
  { codigo: 'MUR', descripcion: 'Rupia mauriciana', estandar: 'ISO-4217' },
  { codigo: 'MVR', descripcion: 'Rufiyaa maldiva', estandar: 'ISO-4217' },
  { codigo: 'MWK', descripcion: 'Kwacha malauí', estandar: 'ISO-4217' },
  { codigo: 'MXN', descripcion: 'Peso mexicano', estandar: 'ISO-4217' },
  { codigo: 'MYR', descripcion: 'Ringgit malayo', estandar: 'ISO-4217' },
  { codigo: 'MZN', descripcion: 'Metical mozambiqueño', estandar: 'ISO-4217' },
  { codigo: 'NAD', descripcion: 'Dólar namibio', estandar: 'ISO-4217' },
  { codigo: 'NGN', descripcion: 'Naira nigeriano', estandar: 'ISO-4217' },
  { codigo: 'NIO', descripcion: 'Córdoba nicaragüense', estandar: 'ISO-4217' },
  { codigo: 'NOK', descripcion: 'Corona noruega', estandar: 'ISO-4217' },
  { codigo: 'NPR', descripcion: 'Rupia nepalí', estandar: 'ISO-4217' },
  { codigo: 'NZD', descripcion: 'Dólar neozelandés', estandar: 'ISO-4217' },
  { codigo: 'OMR', descripcion: 'Rial omaní', estandar: 'ISO-4217' },
  { codigo: 'PAB', descripcion: 'Balboa panameño', estandar: 'ISO-4217' },
  { codigo: 'PEN', descripcion: 'Sol peruano', estandar: 'ISO-4217' },
  { codigo: 'PGK', descripcion: 'Kina papú', estandar: 'ISO-4217' },
  { codigo: 'PHP', descripcion: 'Peso filipino', estandar: 'ISO-4217' },
  { codigo: 'PKR', descripcion: 'Rupia pakistaní', estandar: 'ISO-4217' },
  { codigo: 'PLN', descripcion: 'Złoty polaco', estandar: 'ISO-4217' },
  { codigo: 'PYG', descripcion: 'Guaraní paraguayo', estandar: 'ISO-4217' },
  { codigo: 'QAR', descripcion: 'Riyal catarí', estandar: 'ISO-4217' },
  { codigo: 'RON', descripcion: 'Leu rumano', estandar: 'ISO-4217' },
  { codigo: 'RSD', descripcion: 'Dinar serbio', estandar: 'ISO-4217' },
  { codigo: 'RUB', descripcion: 'Rublo ruso', estandar: 'ISO-4217' },
  { codigo: 'RWF', descripcion: 'Franco ruandés', estandar: 'ISO-4217' },
  { codigo: 'SAR', descripcion: 'Riyal saudí', estandar: 'ISO-4217' },
  { codigo: 'SBD', descripcion: 'Dólar de las Islas Salomón', estandar: 'ISO-4217' },
  { codigo: 'SCR', descripcion: 'Rupia seychellense', estandar: 'ISO-4217' },
  { codigo: 'SDG', descripcion: 'Libra sudanesa', estandar: 'ISO-4217' },
  { codigo: 'SEK', descripcion: 'Corona sueca', estandar: 'ISO-4217' },
  { codigo: 'SGD', descripcion: 'Dólar de Singapur', estandar: 'ISO-4217' },
  { codigo: 'SHP', descripcion: 'Libra de Santa Elena', estandar: 'ISO-4217' },
  { codigo: 'SLL', descripcion: 'Leone sierraleonés', estandar: 'ISO-4217' },
  { codigo: 'SOS', descripcion: 'Chelín somalí', estandar: 'ISO-4217' },
  { codigo: 'SRD', descripcion: 'Dólar surinamés', estandar: 'ISO-4217' },
  { codigo: 'SSP', descripcion: 'Libra sursudanesa', estandar: 'ISO-4217' },
  { codigo: 'STD', descripcion: 'Dobra santotomense', estandar: 'ISO-4217' },
  { codigo: 'SYP', descripcion: 'Libra siria', estandar: 'ISO-4217' },
  { codigo: 'SZL', descripcion: 'Lilangeni suazi', estandar: 'ISO-4217' },
  { codigo: 'THB', descripcion: 'Baht tailandés', estandar: 'ISO-4217' },
  { codigo: 'TJS', descripcion: 'Somoni tayiko', estandar: 'ISO-4217' },
  { codigo: 'TMT', descripcion: 'Manat turcomano', estandar: 'ISO-4217' },
  { codigo: 'TND', descripcion: 'Dinar tunecino', estandar: 'ISO-4217' },
  { codigo: 'TOP', descripcion: 'Paʻanga tongano', estandar: 'ISO-4217' },
  { codigo: 'TRY', descripcion: 'Lira turca', estandar: 'ISO-4217' },
  { codigo: 'TTD', descripcion: 'Dólar de Trinidad y Tobago', estandar: 'ISO-4217' },
  { codigo: 'TWD', descripcion: 'Nuevo dólar taiwanés', estandar: 'ISO-4217' },
  { codigo: 'TZS', descripcion: 'Chelín tanzano', estandar: 'ISO-4217' },
  { codigo: 'UAH', descripcion: 'Grivna ucraniana', estandar: 'ISO-4217' },
  { codigo: 'UGX', descripcion: 'Chelín ugandés', estandar: 'ISO-4217' },
  { codigo: 'USD', descripcion: 'Dólar estadounidense', estandar: 'ISO-4217' },
  { codigo: 'UYU', descripcion: 'Peso uruguayo', estandar: 'ISO-4217' },
  { codigo: 'UZS', descripcion: 'Som uzbeko', estandar: 'ISO-4217' },
  { codigo: 'VEF', descripcion: 'Bolívar venezolano', estandar: 'ISO-4217' },
  { codigo: 'VND', descripcion: 'Dong vietnamita', estandar: 'ISO-4217' },
  { codigo: 'VUV', descripcion: 'Vatu vanuatuense', estandar: 'ISO-4217' },
  { codigo: 'WST', descripcion: 'Tala samoano', estandar: 'ISO-4217' },
  { codigo: 'XAF', descripcion: 'Franco CFA de África Central', estandar: 'ISO-4217' },
  { codigo: 'XCD', descripcion: 'Dólar del Caribe Oriental', estandar: 'ISO-4217' },
  { codigo: 'XOF', descripcion: 'Franco CFA de África Occidental', estandar: 'ISO-4217' },
  { codigo: 'XPF', descripcion: 'Franco CFP', estandar: 'ISO-4217' },
  { codigo: 'YER', descripcion: 'Riyal yemení', estandar: 'ISO-4217' },
  { codigo: 'ZAR', descripcion: 'Rand sudafricano', estandar: 'ISO-4217' },
  { codigo: 'ZMW', descripcion: 'Kwacha zambiano', estandar: 'ISO-4217' }
];

export const getTabla33Moneda = (): Tabla33Moneda[] => {
  return TABLA_33_MONEDA;
};

export const getTabla33MonedaByCodigo = (codigo: string): Tabla33Moneda | undefined => {
  return TABLA_33_MONEDA.find(item => item.codigo === codigo);
};

export const getTabla33MonedaDescripcion = (codigo: string): string => {
  const item = getTabla33MonedaByCodigo(codigo);
  return item ? item.descripcion : '';
};

export const getTabla33MonedasPrincipales = (): Tabla33Moneda[] => {
  const codigosPrincipales = ['USD', 'EUR', 'GBP', 'JPY', 'CHF', 'CAD', 'AUD', 'CNY', 'BRL', 'MXN'];
  return TABLA_33_MONEDA.filter(item => codigosPrincipales.includes(item.codigo));
};

export const getTabla33MonedasByRegion = (region: string): Tabla33Moneda[] => {
  const regiones: { [key: string]: string[] } = {
    'america': ['USD', 'CAD', 'MXN', 'BRL', 'ARS', 'CLP', 'COP', 'PEN', 'UYU', 'PYG'],
    'europa': ['EUR', 'GBP', 'CHF', 'SEK', 'NOK', 'DKK', 'PLN', 'CZK', 'HUF', 'RON'],
    'asia': ['JPY', 'CNY', 'KRW', 'SGD', 'HKD', 'TWD', 'THB', 'MYR', 'IDR', 'PHP'],
    'africa': ['ZAR', 'EGP', 'NGN', 'KES', 'GHS', 'MAD', 'TND', 'DZD', 'LYD', 'SDG']
  };
  
  const codigos = regiones[region.toLowerCase()] || [];
  return TABLA_33_MONEDA.filter(item => codigos.includes(item.codigo));
}; 