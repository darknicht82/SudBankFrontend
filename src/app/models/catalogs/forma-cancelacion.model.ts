export interface FormaCancelacion {
  codigo: string;
  descripcion: string;
  categoria: string;
}

export const FORMAS_CANCELACION: FormaCancelacion[] = [
  // Formas de Cancelación Básicas
  { codigo: 'N', descripcion: 'EN EFECTIVO', categoria: 'BASICA' },
  { codigo: 'E', descripcion: 'EFECTIVIZACIÓN DE GARANTÍAS', categoria: 'BASICA' },
  { codigo: 'G', descripcion: 'PAGO DEL GARANTE', categoria: 'BASICA' },
  { codigo: 'C', descripcion: 'TITULOS', categoria: 'BASICA' },
  { codigo: 'R', descripcion: 'CERTIFICADOS DE DEPOSITO RESTRINGIDOS', categoria: 'BASICA' },
  { codigo: 'S', descripcion: 'SUSTITUCION DE DEUDOR', categoria: 'BASICA' },
  { codigo: 'D', descripcion: 'BIENES EN DACION POR PAGO', categoria: 'BASICA' },
  { codigo: 'J', descripcion: 'ADJUDICACION JUDICIAL POR PAGO', categoria: 'BASICA' },
  { codigo: 'O', descripcion: 'CON OTRA OPERACIÓN EN LA MISMA INSTITUCION (Novación)', categoria: 'BASICA' },
  { codigo: 'V', descripcion: 'VENTA DE CARTERA', categoria: 'BASICA' },
  { codigo: 'P', descripcion: 'CESION DE OPERACIONES', categoria: 'BASICA' },
  { codigo: 'A', descripcion: 'COMPENSACION', categoria: 'BASICA' },
  { codigo: 'B', descripcion: 'CAMBIO DE STATUS INTERNO', categoria: 'BASICA' },
  { codigo: 'M', descripcion: 'MIGRACION DE PLATAFORMA', categoria: 'BASICA' },
  { codigo: 'K', descripcion: 'OBLIGACIONES EXTINGUIDAS POR ACUERDOS CONCORDATORIOS Y OTROS CONTRATOS', categoria: 'BASICA' },
  { codigo: 'X', descripcion: 'CANCELACION DE TARJETA DE CREDITO', categoria: 'BASICA' },
  { codigo: 'Z', descripcion: 'PAGADA POR EL BANCO COMUNAL', categoria: 'BASICA' },
  { codigo: 'I', descripcion: 'CANCELACIÓN POR FALTA DE SUSTENTO', categoria: 'BASICA' },
  { codigo: 'F', descripcion: 'CESANTIA', categoria: 'BASICA' },
  { codigo: 'H', descripcion: 'SEGUROS SOBRE SALDOS', categoria: 'BASICA' },
  
  // Formas de Cancelación por Condonación
  { codigo: 'L', descripcion: 'CONDONACION (Circular No. IG-DNE-2009-010)', categoria: 'CONDONACION' },
  { codigo: 'Q', descripcion: 'CONDONACION (Resolución No. JB-2009-1269 Rebaja de deudas)', categoria: 'CONDONACION' },
  { codigo: 'T', descripcion: 'CONDONACIÓN (Registro oficial No. 843 – 03 de diciembre del 2012)', categoria: 'CONDONACION' },
  
  // Formas de Cancelación por Ley de Simplificación Tributaria
  { codigo: 'SI', descripcion: 'LEY ORGANICA DE SIMPLIFICACIÓN Y PROGRESIVIDAD TRIBUTARIA (Pago de Créditos directos originados en la R02)', categoria: 'LEY_SIMPLIFICACION' },
  { codigo: 'SP', descripcion: 'Disposición General Segunda LEY ORGANICA DE SIMPLIFICACIÓN Y PROGRESIVIDAD TRIBUTARIA (Crédito Educativo – IFTH – Banco del Pacífico)', categoria: 'LEY_SIMPLIFICACION' },
  { codigo: 'LS', descripcion: 'LEY ORGANICA DE SIMPLIFICACIÓN Y PROGRESIVIDAD TRIBUTARIA (Pago de cuotas vencidas o la cancelación de tarjetas de crédito)', categoria: 'LEY_SIMPLIFICACION' },
  { codigo: 'ST', descripcion: 'LEY ORGANICA DE SIMPLIFICACIÓN Y PROGRESIVIDAD TRIBUTARIA (Art. 3.- COPAGO Créditos de Vivienda, damnificados del terremoto del 16 de abril 2017)', categoria: 'LEY_SIMPLIFICACION' },
  
  // Formas de Cancelación por Extinción
  { codigo: 'EO', descripcion: 'Extinción de obligaciones Art. 1583 Código Civil. (Aplicado sólo para el numeral 11.- Por la Prescripción)', categoria: 'EXTINCION' }
];

export function getFormaCancelacionByCodigo(codigo: string): FormaCancelacion | undefined {
  return FORMAS_CANCELACION.find(forma => forma.codigo === codigo);
}

export function getFormasCancelacionByCategoria(categoria: string): FormaCancelacion[] {
  return FORMAS_CANCELACION.filter(forma => forma.categoria === categoria);
}

export function getFormasCancelacionPrincipales(): FormaCancelacion[] {
  return FORMAS_CANCELACION.filter(forma => 
    ['N', 'E', 'G', 'C', 'S', 'D', 'J', 'O', 'V', 'P', 'A'].includes(forma.codigo)
  );
} 