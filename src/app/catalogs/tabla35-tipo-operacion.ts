/**
 * Tabla 35 - Tipo de Operación
 * Manual Técnico de Generalidades sobre Estructuras de Datos Codificación - Tablas
 * Fecha Actualización: 17/02/2022 - Versión: 13.3
 */

export interface Tabla35TipoOperacion {
  producto: string;
  codigo: string;
  descripcion: string;
}

export const TABLA_35_TIPO_OPERACION: Tabla35TipoOperacion[] = [
  // Producto C - CRÉDITO
  { producto: 'C', codigo: 'CDC', descripcion: 'CARTERA DE CREDITOS (14, excepto tarjetas de crédito)' },
  { producto: 'C', codigo: 'FAC', descripcion: 'FACTORING' },
  { producto: 'C', codigo: 'CDS', descripcion: 'SOBREGIROS' },
  { producto: 'C', codigo: 'CDA', descripcion: 'CARTERA ADMINISTRADA' },
  { producto: 'C', codigo: 'AEL', descripcion: 'ADQUIRIDA ENTIDAD LIQUIDADA' },
  { producto: 'C', codigo: 'CTA', descripcion: 'CARTERA TITULARIZADA ADMINISTRADA' },
  { producto: 'C', codigo: 'LST', descripcion: 'LEY DE SIMPLIFICACIÓN TRIBUTARIA (ART.1) PARA USO DE CRÉDITO EDUCATIVO' },
  { producto: 'C', codigo: 'COT', descripcion: 'DIFERIMIENTO EXTRAORDINARIO DE OBLIGACIONES CREDITICIAS (RESOLUCIÓN No. 569-2020-F, 582-2020-F y OFICIO No. JPRMF-2020-0210-O) REPROGRAMADOS (DERECHOS FIDUCIARIOS)' },
  { producto: 'C', codigo: 'CRT', descripcion: 'DIFERIMIENTO EXTRAORDINARIO DE OBLIGACIONES CREDITICIAS (RESOLUCIÓN No. 569-2020-F, 582-2020-F y OFICIO No. JPRMF-2020-0210-O) REPROGRAMADOS (CUENTAS DE ORDEN DEUDORAS)' },
  { producto: 'C', codigo: 'CRA', descripcion: 'DIFERIMIENTO EXTRAORDINARIO DE OBLIGACIONES CREDITICIAS (RESOLUCIÓN No. 569-2020-F, 582-2020-F y OFICIO No. JPRMF-2020-0210-O) REPROGRAMADOS (CUENTAS DE ORDEN ACREEDORAS)' },
  
  // Producto G - CONTINGENTE
  { producto: 'G', codigo: 'C20', descripcion: 'DEUDORES POR ACEPTACIONES (15)' },
  { producto: 'G', codigo: 'G31', descripcion: 'AVALES (6401)' },
  { producto: 'G', codigo: 'G32', descripcion: 'FIANZAS Y GARANTIAS (6402)' },
  { producto: 'G', codigo: 'G33', descripcion: 'CARTAS DE CREDITO (6403)' },
  { producto: 'G', codigo: 'G24', descripcion: 'COMPROMISOS FUTUROS (6405)' },
  { producto: 'G', codigo: 'G26', descripcion: 'TITULOS Y DOCUMENTOS EMITIDOS (6406)' },
  { producto: 'G', codigo: 'G27', descripcion: 'ACUERDOS DE PAGO Y CRÉDITOS RECÍPROCOS (Usado solo por el BCE)' },
  { producto: 'G', codigo: 'G34', descripcion: 'OTRAS CUENTAS CONTINGENTES ACREEDORES' },
  
  // Producto T - TARJETA DE CRÉDITO
  { producto: 'T', codigo: 'CTC', descripcion: 'CARTERA DE CRÉDITOS CONCEDIDA CON TARJETAS DE CRÉDITO' },
  
  // Producto F - FIDEICOMISO MERCANTIL
  { producto: 'F', codigo: 'DFI', descripcion: 'DERECHOS FIDUCIARIOS (1902)' },
  { producto: 'F', codigo: 'DFT', descripcion: 'CARTERA TITULARIZADA' },
  
  // Productos C, T - COMPARTIDOS
  { producto: 'C, T', codigo: 'TRE', descripcion: 'LEY ORGÁNICA DE SOLIDARIDAD Y CORRESPONSABILIDAD CIUDADANA PARA LA RECONSTRUCCIÓN Y REACTIVACIÓN DE LAS ZONAS AFECTADAS POR EL TERREMOTO DE 16 DE ABRIL DE 2016 (CDS,CDC,CTC)' },
  { producto: 'C, T', codigo: 'TRA', descripcion: 'LEY ORGÁNICA DE SOLIDARIDAD Y CORRESPONSABILIDAD CIUDADANA PARA LA RECONSTRUCCIÓN Y REACTIVACIÓN DE LAS ZONAS AFECTADAS POR EL TERREMOTO DE 16 DE ABRIL DE 2016 (CDA)' },
  { producto: 'C, T', codigo: 'TRT', descripcion: 'LEY ORGÁNICA DE SOLIDARIDAD Y CORRESPONSABILIDAD CIUDADANA PARA LA RECONSTRUCCIÓN Y REACTIVACIÓN DE LAS ZONAS AFECTADAS POR EL TERREMOTO DE 16 DE ABRIL DE 2016 (DFT)' },
  { producto: 'C, T', codigo: 'TRI', descripcion: 'LEY ORGÁNICA DE SOLIDARIDAD Y CORRESPONSABILIDAD CIUDADANA PARA LA RECONSTRUCCIÓN Y REACTIVACIÓN DE LAS ZONAS AFECTADAS POR EL TERREMOTO DE 16 DE ABRIL DE 2016 (DFI)' },
  { producto: 'C, T', codigo: 'COE', descripcion: 'DIFERIMIENTO EXTRAORDINARIO DE OBLIGACIONES CREDITICIAS (RESOLUCIÓN No. 569-2020-F, 582-2020-F y OFICIO No. JPRMF-2020-0210-O) REPROGRAMADOS' },
  { producto: 'C, T', codigo: 'COC', descripcion: 'DIFERIMIENTO EXTRAORDINARIO DE OBLIGACIONES CREDITICIAS (RESOLUCIÓN No. 569-2020-F, 582-2020-F y OFICIO No. JPRMF-2020-0210-O), REFINANCIADOS, REESTRUCTURADOS Y NOVADOS' }
];

export const getTabla35TipoOperacion = (): Tabla35TipoOperacion[] => {
  return TABLA_35_TIPO_OPERACION;
};

export const getTabla35TipoOperacionByCodigo = (codigo: string): Tabla35TipoOperacion | undefined => {
  return TABLA_35_TIPO_OPERACION.find(item => item.codigo === codigo);
};

export const getTabla35TipoOperacionDescripcion = (codigo: string): string => {
  const item = getTabla35TipoOperacionByCodigo(codigo);
  return item ? item.descripcion : '';
};

export const getTabla35TiposOperacionByProducto = (producto: string): Tabla35TipoOperacion[] => {
  return TABLA_35_TIPO_OPERACION.filter(item => 
    item.producto === producto || item.producto.includes(producto)
  );
};

export const getTabla35TiposOperacionPrincipales = (): Tabla35TipoOperacion[] => {
  const codigosPrincipales = ['CDC', 'FAC', 'CDS', 'CDA', 'CTC', 'G31', 'G32', 'G33'];
  return TABLA_35_TIPO_OPERACION.filter(item => codigosPrincipales.includes(item.codigo));
}; 