/**
 * Catálogo Oficial - Tabla 39: Forma de Cancelación
 * 
 * Este catálogo define las diferentes formas de cancelación de operaciones
 * crediticias y financieras en el sistema bancario.
 * 
 * Fuente: Manual de Reportes Regulatorios - SudBank
 * Versión: 2024
 */

export interface FormaCancelacion {
  codigo: string;
  descripcion: string;
  categoria: string;
}

export const FORMAS_CANCELACION: FormaCancelacion[] = [
  // FORMAS DE PAGO NORMALES
  { codigo: 'N', descripcion: 'EN EFECTIVO', categoria: 'PAGO_DIRECTO' },
  { codigo: 'C', descripcion: 'TITULOS', categoria: 'PAGO_DIRECTO' },
  { codigo: 'R', descripcion: 'CERTIFICADOS DE DEPOSITO RESTRINGIDOS', categoria: 'PAGO_DIRECTO' },
  
  // GARANTÍAS Y AVALES
  { codigo: 'E', descripcion: 'EFECTIVIZACIÓN DE GARANTÍAS', categoria: 'GARANTIA' },
  { codigo: 'G', descripcion: 'PAGO DEL GARANTE', categoria: 'GARANTIA' },
  
  // SUSTITUCIÓN Y NOVACIÓN
  { codigo: 'S', descripcion: 'SUSTITUCION DE DEUDOR', categoria: 'SUSTITUCION' },
  { codigo: 'O', descripcion: 'CON OTRA OPERACIÓN EN LA MISMA INSTITUCION (Novación)', categoria: 'NOVACION' },
  
  // BIENES Y ADJUDICACIÓN
  { codigo: 'D', descripcion: 'BIENES EN DACION POR PAGO', categoria: 'BIENES' },
  { codigo: 'J', descripcion: 'ADJUDICACION JUDICIAL POR PAGO', categoria: 'JUDICIAL' },
  
  // TRANSFERENCIAS Y CESIÓN
  { codigo: 'V', descripcion: 'VENTA DE CARTERA', categoria: 'TRANSFERENCIA' },
  { codigo: 'P', descripcion: 'CESION DE OPERACIONES', categoria: 'TRANSFERENCIA' },
  
  // COMPENSACIÓN Y CAMBIOS INTERNOS
  { codigo: 'A', descripcion: 'COMPENSACION', categoria: 'COMPENSACION' },
  { codigo: 'B', descripcion: 'CAMBIO DE STATUS INTERNO', categoria: 'INTERNO' },
  { codigo: 'M', descripcion: 'MIGRACION DE PLATAFORMA', categoria: 'INTERNO' },
  
  // ACUERDOS Y CONCORDATOS
  { codigo: 'K', descripcion: 'OBLIGACIONES EXTINGUIDAS POR ACUERDOS CONCORDATORIOS Y OTROS CONTRATOS', categoria: 'ACUERDO' },
  
  // CANCELACIONES ESPECÍFICAS
  { codigo: 'X', descripcion: 'CANCELACION DE TARJETA DE CREDITO', categoria: 'ESPECIFICA' },
  { codigo: 'Z', descripcion: 'PAGADA POR EL BANCO COMUNAL', categoria: 'ESPECIFICA' },
  { codigo: 'I', descripcion: 'CANCELACIÓN POR FALTA DE SUSTENTO', categoria: 'ESPECIFICA' },
  { codigo: 'F', descripcion: 'CESANTIA', categoria: 'ESPECIFICA' },
  { codigo: 'H', descripcion: 'SEGUROS SOBRE SALDOS', categoria: 'ESPECIFICA' },
  
  // CONDONACIONES
  { codigo: 'L', descripcion: 'CONDONACION (Circular No. IG-DNE-2009-010)', categoria: 'CONDONACION' },
  { codigo: 'Q', descripcion: 'CONDONACION (Resolución No. JB-2009-1269 Rebaja de deudas)', categoria: 'CONDONACION' },
  { codigo: 'T', descripcion: 'CONDONACIÓN (Registro oficial No. 843 – 03 de diciembre del 2012)', categoria: 'CONDONACION' },
  
  // LEY ORGÁNICA DE SIMPLIFICACIÓN Y PROGRESIVIDAD TRIBUTARIA
  { codigo: 'SI', descripcion: 'LEY ORGANICA DE SIMPLIFICACIÓN Y PROGRESIVIDAD TRIBUTARIA (Pago de Créditos directos originados en la R02)', categoria: 'LEY_TRIBUTARIA' },
  { codigo: 'SP', descripcion: 'Disposición General Segunda LEY ORGANICA DE SIMPLIFICACIÓN Y PROGRESIVIDAD TRIBUTARIA (Crédito Educativo – IFTH – Banco del Pacífico)', categoria: 'LEY_TRIBUTARIA' },
  { codigo: 'LS', descripcion: 'LEY ORGANICA DE SIMPLIFICACIÓN Y PROGRESIVIDAD TRIBUTARIA (Pago de cuotas vencidas o la cancelación de tarjetas de crédito)', categoria: 'LEY_TRIBUTARIA' },
  { codigo: 'ST', descripcion: 'LEY ORGANICA DE SIMPLIFICACIÓN Y PROGRESIVIDAD TRIBUTARIA (Art. 3.- COPAGO Créditos de Vivienda, damnificados del terremoto del 16 de abril 2017)', categoria: 'LEY_TRIBUTARIA' },
  
  // PRESCRIPCIÓN
  { codigo: 'EO', descripcion: 'Extinción de obligaciones Art. 1583 Código Civil. (Aplicado sólo para el numeral 11.- Por la Prescripción)', categoria: 'PRESCRIPCION' }
];

export const getFormasCancelacion = (): FormaCancelacion[] => {
  return FORMAS_CANCELACION;
};

export const getFormaCancelacionByCodigo = (codigo: string): FormaCancelacion | undefined => {
  return FORMAS_CANCELACION.find(item => item.codigo === codigo);
};

export const getFormaCancelacionDescripcion = (codigo: string): string => {
  const item = getFormaCancelacionByCodigo(codigo);
  return item ? item.descripcion : '';
};

export const getFormasCancelacionByCategoria = (categoria: string): FormaCancelacion[] => {
  return FORMAS_CANCELACION.filter(item => item.categoria === categoria);
};

export const getFormasCancelacionPagoDirecto = (): FormaCancelacion[] => {
  return getFormasCancelacionByCategoria('PAGO_DIRECTO');
};

export const getFormasCancelacionGarantias = (): FormaCancelacion[] => {
  return getFormasCancelacionByCategoria('GARANTIA');
};

export const getFormasCancelacionCondonacion = (): FormaCancelacion[] => {
  return getFormasCancelacionByCategoria('CONDONACION');
};

export const getFormasCancelacionLeyTributaria = (): FormaCancelacion[] => {
  return getFormasCancelacionByCategoria('LEY_TRIBUTARIA');
}; 