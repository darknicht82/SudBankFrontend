/**
 * Tabla 12 - Código del Cargo
 * Manual Técnico de Generalidades sobre Estructuras de Datos Codificación - Tablas
 * Fecha Actualización: 17/02/2022 - Versión: 13.3
 */

export interface Tabla12CodigoCargo {
  codigo: string;
  descripcion: string;
  tipoCargo?: string;
}

export const TABLA_12_CODIGO_CARGO: Tabla12CodigoCargo[] = [
  // DIRECTORIO
  { codigo: '1100', descripcion: 'DIRECTORIO' },
  { codigo: '1105', descripcion: 'MIEMBRO DEL DIRECTORIO – PRESIDENTE', tipoCargo: '1' },
  { codigo: '1110', descripcion: 'MIEMBRO DEL DIRECTORIO – VICE PRESIDENTE', tipoCargo: '1' },
  { codigo: '1115', descripcion: 'MIEMBRO DEL DIRECTORIO - VOCAL PRINCIPAL', tipoCargo: '1' },
  { codigo: '1120', descripcion: 'MIEMBRO DEL DIRECTORIO - VOCAL SUPLENTE', tipoCargo: '1' },
  
  // EJECUTIVOS
  { codigo: '3100', descripcion: 'EJECUTIVOS' },
  { codigo: '3105', descripcion: 'PRESIDENTE EJECUTIVO', tipoCargo: '2' },
  { codigo: '3110', descripcion: 'GERENTE GENERAL', tipoCargo: '2' },
  { codigo: '3115', descripcion: 'REPRESENTANTE LEGAL', tipoCargo: '2' },
  { codigo: '3120', descripcion: 'OFICIAL DE CUMPLIMIENTO, titular', tipoCargo: '2' },
  { codigo: '3125', descripcion: 'OFICIAL DE CUMPLIMIENTO, suplente', tipoCargo: '2' },
  { codigo: '3130', descripcion: 'VICEPRESIDENTE ENCARGADO (No obligatorio)', tipoCargo: '2' },
  { codigo: '3135', descripcion: 'GERENTE ZONAL', tipoCargo: '2' },
  { codigo: '3140', descripcion: 'GERENTE SUCURSAL', tipoCargo: '2' },
  { codigo: '3145', descripcion: 'GERENTE DE ÁREA', tipoCargo: '2' },
  { codigo: '3150', descripcion: 'GERENTE SUBROGANTE', tipoCargo: '2' },
  { codigo: '3155', descripcion: 'GERENTE ENCARGADO', tipoCargo: '2' },
  { codigo: '3160', descripcion: 'GERENTE / JEFE DE SERVICIO AL CLIENTE', tipoCargo: '2' },
  
  // COMITÉ DE ADMINISTRACION INTEGRAL DE RIESGOS
  { codigo: '4000', descripcion: 'COMITÉ DE ADMINISTRACION INTEGRAL DE RIESGOS' },
  { codigo: '4010', descripcion: 'REPRESENTANTE DEL DIRECTORIO O SIMILAR (representada por una sola persona y es obligatorio)', tipoCargo: '2' },
  { codigo: '4020', descripcion: 'REPRESENTANTE LEGAL (representada por una sola persona y es obligatorio)', tipoCargo: '2' },
  { codigo: '4030', descripcion: 'RESPONSABLE UNIDAD DE RIESGOS (representada por una sola persona y es obligatorio)', tipoCargo: '2' },
  { codigo: '4040', descripcion: 'OTROS (registro no obligatorio)', tipoCargo: '2' },
  
  // COMITÉ DE INVERSIONES (SOLO PARA FONDOS COMPLEMENTARIOS PREVISIONALES CERRADOS)
  { codigo: '4050', descripcion: 'COMITÉ DE INVERSIONES (SOLO PARA FONDOS COMPLEMENTARIOS PREVISIONALES CERRADOS)' },
  { codigo: '4055', descripcion: 'REPRESENTANTE DEL DIRECTORIO O SIMILAR (representada por una sola persona y es obligatorio)', tipoCargo: '2' },
  { codigo: '4060', descripcion: 'REPRESENTANTE LEGAL (representada por una sola persona y es obligatorio)', tipoCargo: '2' },
  { codigo: '4065', descripcion: 'RESPONSABLE UNIDAD DE RIESGOS (representada por una sola persona y es obligatorio)', tipoCargo: '2' },
  
  // COMITÉ DE PRESTACIONES (SOLO PARA FONDOS COMPLEMENTARIOS PREVISIONALES CERRADOS)
  { codigo: '4070', descripcion: 'COMITÉ DE PRESTACIONES (SOLO PARA FONDOS COMPLEMENTARIOS PREVISIONALES CERRADOS)' },
  { codigo: '4075', descripcion: 'REPRESENTANTE DEL DIRECTORIO O SIMILAR (representada por una sola persona y es obligatorio)', tipoCargo: '2' },
  { codigo: '4080', descripcion: 'REPRESENTANTE LEGAL (representada por una sola persona y es obligatorio)', tipoCargo: '2' },
  { codigo: '4085', descripcion: 'RESPONSABLE UNIDAD DE RIESGOS (representada por una sola persona y es obligatorio)', tipoCargo: '2' },
  
  // COMITÉ DE AUDITORÍA
  { codigo: '5000', descripcion: 'COMITÉ DE AUDITORÍA' },
  { codigo: '5010', descripcion: 'MIEMBRO DIRECTORIO O SIMILAR (representada por una o dos personas y es obligatorio)', tipoCargo: '5' },
  { codigo: '5020', descripcion: 'MIEMBRO ELECTO (representada por una o dos personas y es obligatorio)', tipoCargo: '5' },
  { codigo: '5030', descripcion: 'OTROS (registro no obligatorio)', tipoCargo: '5' },
  
  // FIRMAS AUTORIZADAS
  { codigo: '6000', descripcion: 'FIRMAS AUTORIZADAS' },
  { codigo: '6010', descripcion: 'PRESIDENTE EJECUTIVO', tipoCargo: '2' },
  { codigo: '6020', descripcion: 'GERENTE GENERAL', tipoCargo: '2' },
  { codigo: '6030', descripcion: 'VICEPRESIDENTE EJECUTIVO (NACIONAL)', tipoCargo: '2' },
  { codigo: '6040', descripcion: 'GERENTE DE OPERACIONES (NACIONAL)', tipoCargo: '2' },
  { codigo: '6050', descripcion: 'VICEPRESIDENTE DE OPERACIONES', tipoCargo: '2' },
  { codigo: '6060', descripcion: 'APODERADO ESPECIAL EN REPRESENTACIÓN', tipoCargo: '2' },
  { codigo: '6070', descripcion: 'VICEPRESIDENTE JURÍDICO', tipoCargo: '2' },
  { codigo: '6080', descripcion: 'AUDITOR (A) INTERNO', tipoCargo: '2' },
  { codigo: '6090', descripcion: 'VICEPRESIDENTE o GERENTE DE RIESGOS o DELEGADO', tipoCargo: '2' },
  { codigo: '6100', descripcion: 'OTROS GERENTES', tipoCargo: '2' },
  
  // AUDITORES Y ACTUARIOS
  { codigo: '7000', descripcion: 'AUDITORES Y ACTUARIOS' },
  { codigo: '7010', descripcion: 'AUDITOR INTERNO PRINCIPAL', tipoCargo: '5' },
  { codigo: '7020', descripcion: 'AUDITOR INTERNO ALTERNO', tipoCargo: '5' },
  { codigo: '7030', descripcion: 'AUDITOR EXTERNO (sobre el representante legal de la Auditora)', tipoCargo: '5' },
  { codigo: '7040', descripcion: 'ACTUARIO EXTERNO' },
  { codigo: '7050', descripcion: 'ACTUARIO INTERNO' },
  
  // COMITÉ DE CUMPLIMIENTO
  { codigo: '7100', descripcion: 'COMITÉ DE CUMPLIMIENTO' },
  { codigo: '7105', descripcion: 'REPRESENTANTE LEGAL O SU DELEGADO', tipoCargo: '2' },
  { codigo: '7110', descripcion: 'MIEMBRO DEL DIRECTORIO O DEL ORGANISMO QUE HAGA SUS VECES', tipoCargo: '2' },
  { codigo: '7115', descripcion: 'GERENTE DE OPERACIONES O SU DELEGADO / AREA COMERCIAL', tipoCargo: '2' },
  { codigo: '7120', descripcion: 'GERENTE DE CRÉDITO O SU DELEGADO', tipoCargo: '2' },
  { codigo: '7125', descripcion: 'AUDITOR INTERNO', tipoCargo: '2' },
  { codigo: '7130', descripcion: 'OFICIAL DE CUMPLIMIENTO', tipoCargo: '2' },
  { codigo: '7135', descripcion: 'ASESOR LEGAL', tipoCargo: '2' },
  { codigo: '7140', descripcion: 'GERENTE DE RIESGOS', tipoCargo: '2' },
  { codigo: '7145', descripcion: 'GERENTE DE CONTROL INTERNO', tipoCargo: '2' },
  { codigo: '7150', descripcion: 'OTROS GERENTES / COORDINADORES / DELEGADOS', tipoCargo: '2' },
  { codigo: '7155', descripcion: 'RESPONSABLE DEL AREA TÉCNICA O SU DELEGADO', tipoCargo: '2' },
  
  // CONSEJO DIRECTIVO (IESS)
  { codigo: '2300', descripcion: 'CONSEJO DIRECTIVO (IESS)' },
  { codigo: '2305', descripcion: 'REPRESENTANTE DEL EJECUTIVO (QUIEN LO PRESIDIRÁ)', tipoCargo: '1' },
  { codigo: '2310', descripcion: 'REPRESENTANTE DE LOS ASEGURADOS', tipoCargo: '1' },
  { codigo: '2315', descripcion: 'REPRESENTANTE DE LOS EMPLEADORES', tipoCargo: '1' },
  { codigo: '2320', descripcion: 'ALTERNO DEL EJECUTIVO', tipoCargo: '1' },
  { codigo: '2325', descripcion: 'ALTERNO DEL REPRESENTANTE DE LOS ASEGURADOS', tipoCargo: '1' },
  { codigo: '2330', descripcion: 'ALTERNO DEL REPRESENTANTE DE LOS EMPLEADORES', tipoCargo: '1' },
  
  // DIRECTORES (IESS)
  { codigo: '2400', descripcion: 'DIRECTORES (IESS)' },
  { codigo: '2405', descripcion: 'DIRECTOR GENERAL', tipoCargo: '1' },
  { codigo: '2410', descripcion: 'DIRECTOR DEL SEGURO DE SALUD INDIVIDUAL Y FAMILIAR', tipoCargo: '1' },
  { codigo: '2415', descripcion: 'DIRECTOR DEL SEGURO SOCIAL CAMPESINO', tipoCargo: '1' },
  { codigo: '2420', descripcion: 'DIRECTOR DEL SEGURO GENERAL DE RIESGOS DE TRABAJO', tipoCargo: '1' },
  { codigo: '2425', descripcion: 'DIRECCIÓN DEL SISTEMA DE PENSIONES', tipoCargo: '1' },
  { codigo: '2430', descripcion: 'DIRECTOR NACIONAL DE AFILIACIÓN Y COBERTURA', tipoCargo: '1' },
  { codigo: '2435', descripcion: 'DIRECTOR NACIONAL DE GESTIÓN Y SUPERVISIÓN DE FONDOS Y RESERVA', tipoCargo: '1' },
  { codigo: '2440', descripcion: 'DIRECTOR NACIONAL DE PLANIFICACIÓN', tipoCargo: '1' },
  { codigo: '2445', descripcion: 'DIRECTOR NACIONAL DE PROCESOS', tipoCargo: '1' },
  { codigo: '2450', descripcion: 'DIRECTOR NACIONAL DE TECNOLOGÍAS DE LA INFORMACIÓN', tipoCargo: '1' },
  { codigo: '2455', descripcion: 'DIRECTOR NACIONAL DE INFRAESTRUCTURA Y EQUIPAMIENTO', tipoCargo: '1' },
  { codigo: '2460', descripcion: 'DIRECTOR NACIONAL DE GESTIÓN FINANCIERA', tipoCargo: '1' },
  { codigo: '2465', descripcion: 'DIRECTOR NACIONAL DE GESTIÓN DE TALENTO HUMANO', tipoCargo: '1' },
  { codigo: '2470', descripcion: 'DIRECTOR NACIONAL DE ADQUISICIONES', tipoCargo: '1' },
  { codigo: '2475', descripcion: 'DIRECTOR NACIONAL DE BIENES Y SERVICIOS', tipoCargo: '1' },
  { codigo: '2480', descripcion: 'DIRECTOR NACIONAL DE GESTIÓN DOCUMENTAL', tipoCargo: '1' },
  { codigo: '2485', descripcion: 'DIRECTOR NACIONAL DE COMUNICACIÓN SOCIAL', tipoCargo: '1' },
  { codigo: '2490', descripcion: 'DIRECTOR PROVINCIAL', tipoCargo: '1' },
  { codigo: '2495', descripcion: 'OTROS (NO OBLIGATORIO)', tipoCargo: '1' },
  
  // CONSEJO SUPERIOR (ISSPOL)
  { codigo: '2500', descripcion: 'CONSEJO SUPERIOR (ISSPOL)' },
  { codigo: '2505', descripcion: 'COMANDANTE GENERAL DE LA POLICÍA NACIONAL', tipoCargo: '1' },
  { codigo: '2510', descripcion: 'SUBSECRETARIO DE POLICÍA', tipoCargo: '1' },
  { codigo: '2515', descripcion: 'DIRECTOR GENERAL DE PERSONAL', tipoCargo: '1' },
  { codigo: '2520', descripcion: 'REPRESENTANTE DEL PERSONAL DE OFICIALES EN SERVICIO ACTIVO', tipoCargo: '1' },
  { codigo: '2525', descripcion: 'REPRESENTANTE DEL PERSONAL DE TROPA EN SERVICIO ACTIVO', tipoCargo: '1' },
  { codigo: '2530', descripcion: 'REPRESENTANTE DE LOS OFICIALES EN SERVICIO PASIVO', tipoCargo: '1' },
  { codigo: '2535', descripcion: 'REPRESENTANTE DEL PERSONAL DE TROPA EN SERVICIO PASIVO', tipoCargo: '1' },
  { codigo: '2540', descripcion: 'SECRETARIO', tipoCargo: '1' },
  
  // DIRECTORES (ISSPOL)
  { codigo: '2600', descripcion: 'DIRECTORES (ISSPOL)' },
  { codigo: '2605', descripcion: 'DIRECTOR GENERAL', tipoCargo: '1' },
  { codigo: '2610', descripcion: 'DIRECTOR DE PRESTACIONES', tipoCargo: '1' },
  { codigo: '2615', descripcion: 'DIRECTOR DEL SERVICIO SOCIAL', tipoCargo: '1' },
  { codigo: '2620', descripcion: 'DIRECTOR ECONÓMICO FINANCIERO', tipoCargo: '1' },
  { codigo: '2625', descripcion: 'DIRECTOR ADMINISTRATIVO', tipoCargo: '1' },
  { codigo: '2630', descripcion: 'OTROS (registro no obligatorio)', tipoCargo: '1' },
  
  // JUNTA CALIFICADORA DE SERVICIOS POLICIALES (ISSPOL)
  { codigo: '2700', descripcion: 'JUNTA CALIFICADORA DE SERVICIOS POLICIALES (ISSPOL)' },
  { codigo: '2705', descripcion: 'DIRECTOR DE PRESTACIONES', tipoCargo: '1' },
  { codigo: '2710', descripcion: 'JEFE DE DEPARTAMENTO DE APORTES', tipoCargo: '1' },
  { codigo: '2715', descripcion: 'ASESOR JURÍDICO DEL ISSPOL', tipoCargo: '1' },
  { codigo: '2720', descripcion: 'AUDITOR JURÍDICO DE LA POLICÍA NACIONAL, O SU DELEGADO', tipoCargo: '1' },
  { codigo: '2725', descripcion: 'REPRESENTANTE DE LA DIRECCIÓN GENERAL DE PERSONAL DE LA POLICÍA NACIONAL', tipoCargo: '1' },
  { codigo: '2730', descripcion: 'OFICIAL SUPERIOR REPRESENTANTE DE LA DIRECCIÓN GENERAL DE PERSONAL DE LA POLICÍA NACIONAL', tipoCargo: '1' },
  { codigo: '2735', descripcion: 'OTROS (registro no obligatorio)', tipoCargo: '1' },
  
  // JUNTA DE MÉDICOS (ISSPOL)
  { codigo: '2800', descripcion: 'JUNTA DE MÉDICOS (ISSPOL)' },
  { codigo: '2805', descripcion: 'DIRECTOR TÉCNICO DE LA DIRECCIÓN GENERAL DE SALUD DE LA POLICÍA NACIONAL', tipoCargo: '2' },
  { codigo: '2810', descripcion: 'PRIMER OFICIAL MÉDICO DE LA DIRECCIÓN GENERAL DE SALUD DE LA POLICÍA NACIONAL', tipoCargo: '2' },
  { codigo: '2815', descripcion: 'SEGUNDO OFICIAL MÉDICO DE LA DIRECCIÓN GENERAL DE SALUD DE LA POLICÍA NACIONAL', tipoCargo: '2' },
  { codigo: '2820', descripcion: 'SECRETARIO', tipoCargo: '2' },
  
  // CONSEJO DIRECTIVO (ISSFA)
  { codigo: '2900', descripcion: 'CONSEJO DIRECTIVO (ISSFA)' },
  { codigo: '2905', descripcion: 'PRESIDENTE DEL CONSEJO DIRECTIVO', tipoCargo: '1' },
  { codigo: '2910', descripcion: 'JEFE DEL COMANDO DEL CONJUNTO DE LAS FF.AA', tipoCargo: '1' },
  { codigo: '2915', descripcion: 'COMANDANTE GENERAL DE LA FUERZA NAVA', tipoCargo: '1' },
  { codigo: '2920', descripcion: 'COMANDANTE GENERAL DE LA FUERZA TERRESTRE', tipoCargo: '1' },
  { codigo: '2925', descripcion: 'COMANDANTE GENERAL DE AL FUERZA AÉREA', tipoCargo: '1' },
  { codigo: '2930', descripcion: 'REPRESENTANTE DE LOS OFICIALES EN SERVICIO PASIVO', tipoCargo: '1' },
  { codigo: '2935', descripcion: 'REPRESENTANTE POR EL PERSONAL DE TROPA EN SERVICIO PASIVO', tipoCargo: '1' },
  
  // DIRECTORES/JEFES (ISSFA)
  { codigo: '3200', descripcion: 'DIRECTORES/JEFES (ISSFA)' },
  { codigo: '3205', descripcion: 'DIRECTOR GENERAL', tipoCargo: '1' },
  { codigo: '3210', descripcion: 'DIRECTOR DE RIESGOS', tipoCargo: '1' },
  { codigo: '3215', descripcion: 'DIRECTOR DE ASESORÍA JURÍDICA', tipoCargo: '1' },
  { codigo: '3220', descripcion: 'JEFE DE COMUNICACIÓN SOCIAL', tipoCargo: '1' },
  { codigo: '3225', descripcion: 'JEFE DE LA UNIDAD DE PLANIFICACIÓN', tipoCargo: '1' },
  { codigo: '3230', descripcion: 'JEFE DE LA UNIDAD DE ADMINISTRACIÓN DE TALENTO HUMANO', tipoCargo: '1' },
  { codigo: '3235', descripcion: 'JEFE DEL DEPARTAMENTO LOGÍSTICO', tipoCargo: '1' },
  { codigo: '3240', descripcion: 'DIRECTOR FINANCIERO', tipoCargo: '1' },
  { codigo: '3245', descripcion: 'JEFE DE LA UNIDAD DE INFORMÁTICA, TECNOLOGÍA Y COMUNICACIONES', tipoCargo: '1' },
  { codigo: '3250', descripcion: 'JEFE NACIONAL DE SERVICIO AL CLIENTE', tipoCargo: '1' }
];

export const getTabla12CodigoCargo = (): Tabla12CodigoCargo[] => {
  return TABLA_12_CODIGO_CARGO;
};

export const getTabla12CodigoCargoByCodigo = (codigo: string): Tabla12CodigoCargo | undefined => {
  return TABLA_12_CODIGO_CARGO.find(item => item.codigo === codigo);
};

export const getTabla12CodigoCargoDescripcion = (codigo: string): string => {
  const item = getTabla12CodigoCargoByCodigo(codigo);
  return item ? item.descripcion : '';
};

export const getTabla12CodigoCargoByTipoCargo = (tipoCargo: string): Tabla12CodigoCargo[] => {
  return TABLA_12_CODIGO_CARGO.filter(item => item.tipoCargo === tipoCargo);
}; 