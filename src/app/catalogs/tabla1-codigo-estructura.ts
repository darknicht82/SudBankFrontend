/**
 * TABLA 1 - CÓDIGO DE ESTRUCTURA
 * Manual Técnico de Generalidades sobre Estructuras de Datos Codificación - Tablas
 * Fecha Actualización: 17/02/2022 - Versión: 13.3
 * Superintendencia de Bancos del Ecuador
 */

export interface CodigoEstructura {
  codigo: string;
  descripcion: string;
  sistema: string;
  estado: 'ACTIVA' | 'INACTIVA' | 'ELIMINADA';
}

export const TABLA_1_CODIGOS_ESTRUCTURA: CodigoEstructura[] = [
  // SISTEMA DE POBLACIÓN E IDENTIFICACIONES
  { codigo: 'P01', descripcion: 'VERIFICACIÓN Y POBLACIÓN DE CÉDULAS', sistema: 'POBLACIÓN', estado: 'ACTIVA' },
  { codigo: 'P02', descripcion: 'VERIFICACIÓN Y POBLACIÓN DE EXTRANJEROS', sistema: 'POBLACIÓN', estado: 'ACTIVA' },
  { codigo: 'P03', descripcion: 'VERIFICACIÓN Y POBLACIÓN DE RUCS', sistema: 'POBLACIÓN', estado: 'ACTIVA' },
  { codigo: 'P04', descripcion: 'VERIFICACIÓN Y POBLACION DE PASAPORTES', sistema: 'POBLACIÓN', estado: 'ACTIVA' },

  // SISTEMA DE TRANSPARENCIA DE INFORMACION – STI
  { codigo: 'A03', descripcion: 'COSTOS DE TARJETAS DE CREDITO – CREDITO DIFERIDO', sistema: 'STI', estado: 'ACTIVA' },
  { codigo: 'A06', descripcion: 'SERVCIOS', sistema: 'STI', estado: 'ACTIVA' },
  { codigo: 'A09', descripcion: 'TARIFAS A ESTABLECIMIENTOS', sistema: 'STI', estado: 'ACTIVA' },
  { codigo: 'A10', descripcion: 'AVANCES EN EFECTIVO', sistema: 'STI', estado: 'ACTIVA' },
  { codigo: 'A11', descripcion: 'TENENCIA DE PRODUCTOS', sistema: 'STI', estado: 'ACTIVA' },
  { codigo: 'A12', descripcion: 'TARJETAS DE CRÉDITO', sistema: 'STI', estado: 'ACTIVA' },
  { codigo: 'A13', descripcion: 'PUNTOS DE VENTA – POS', sistema: 'STI', estado: 'ACTIVA' },

  // SISTEMA DE ADMINISTRACIÓN DE BALANCES SAB - BALANCES
  { codigo: 'B11', descripcion: 'ESTADOS FINANCIEROS', sistema: 'SAB', estado: 'ACTIVA' },
  { codigo: 'B12', descripcion: 'CAPTACIONES Y COLOCACIONES', sistema: 'SAB', estado: 'ACTIVA' },
  { codigo: 'B13', descripcion: 'BALANCES DIARIOS DE INSTITUCIONES FINANCIERAS', sistema: 'SAB', estado: 'ACTIVA' },
  { codigo: 'B14', descripcion: 'BALANCES DE FONDOS ADMINISTRADOS', sistema: 'SAB', estado: 'ACTIVA' },
  { codigo: 'B15', descripcion: 'BALANCES DE ADMINISTRADORAS DE FONDOS', sistema: 'SAB', estado: 'ACTIVA' },
  { codigo: 'B16', descripcion: 'BALANCES DE ENTIADES DE SEGURIDAD SOCIAL', sistema: 'SAB', estado: 'ACTIVA' },
  { codigo: 'B18', descripcion: 'BALANCE DEL FONDO DE LIQUIDEZ DEL SISTEMA FINANCIERO ECUATORIANO', sistema: 'SAB', estado: 'ACTIVA' },
  { codigo: 'B19', descripcion: 'APORTE IFIS Y CUOTAS DE PARTICIPACIÓN FIDUCIARIA', sistema: 'SAB', estado: 'ACTIVA' },
  { codigo: 'B20', descripcion: 'REINTEGROS Y TRANSFERENCIA DE CUOTAS DE PARTICIPACIÓN FIDUCIARIA', sistema: 'SAB', estado: 'ACTIVA' },
  { codigo: 'B21', descripcion: 'ESTADOS FINANCIEROS CONSOLIDADOS Y COMBINADOS', sistema: 'SAB', estado: 'ACTIVA' },
  { codigo: 'B22', descripcion: 'ASIENTOS DE ELIMINACION DE GRUPOS FIN', sistema: 'SAB', estado: 'ELIMINADA' },
  { codigo: 'B23', descripcion: 'ESTADOS FINANCIEROS CONSOLIDADOS Y COMBINADOS MUTUALISTAS', sistema: 'SAB', estado: 'ELIMINADA' },
  { codigo: 'B26', descripcion: 'OPERACIONES ACTIVAS DEL FONDO DE LIQUIDES DEL SISTEMA FINANCIERO ECUATORIANO', sistema: 'SAB', estado: 'ACTIVA' },
  { codigo: 'B27', descripcion: 'OPERACIONES PASIVAS DEL FONDO DE LIQUIDES DEL SISTEMA FINANCIERO ECUATORIANO', sistema: 'SAB', estado: 'ACTIVA' },
  { codigo: 'B33', descripcion: 'BALANCE MENSUAL DEL BIESS - FONDOS ADMINISTRADOS', sistema: 'SAB', estado: 'ACTIVA' },
  { codigo: 'B34', descripcion: 'BALANCE DIARIO BIESS – FONDOS ADMINISTRADOS', sistema: 'SAB', estado: 'ACTIVA' },
  { codigo: 'B35', descripcion: 'BALANCE DIARIO CONSOLIDADO DE LOS FONDOS ADMINISTRADOS POR EL BIESS', sistema: 'SAB', estado: 'ACTIVA' },
  { codigo: 'B36', descripcion: 'BALANCE MENSUAL CONSOLIDADO DE LOS FONDOS ADMINISTRADOS POR EL BIESS', sistema: 'SAB', estado: 'ACTIVA' },
  { codigo: 'B50', descripcion: 'BALANCE DEL FONDO DE LIQUIDEZ DEL SISTEMA FINANCIERO ECUATORIANO', sistema: 'SAB', estado: 'ACTIVA' },
  { codigo: 'B54', descripcion: 'BALANCE MESUAL COSEDE – FSD', sistema: 'SAB', estado: 'ACTIVA' },
  { codigo: 'B60', descripcion: 'BALANCE SEMANAL BCE 4 SISTEMAS', sistema: 'SAB', estado: 'ACTIVA' },
  { codigo: 'B61', descripcion: 'BALANCE MENSUAL BCE 4 SISTEMAS', sistema: 'SAB', estado: 'ACTIVA' },
  { codigo: 'B62', descripcion: 'RESERVA INTERNACIONAL DE LIBRE DISPONIBILIDAD', sistema: 'SAB', estado: 'ACTIVA' },

  // SISTEMA DE ADMINISTRACIÓN DE BALANCES SAB - PATRIMONIO TECNICO
  { codigo: 'B41', descripcion: 'PATRIMONIO TECNICO REQUERIDO Y CONSTITUIDO', sistema: 'SAB', estado: 'ACTIVA' },
  { codigo: 'B42', descripcion: 'DETALLE DE INVERSIONES EN ACCIONES Y PARTICIPACIONES', sistema: 'SAB', estado: 'ACTIVA' },
  { codigo: 'B43', descripcion: 'ANTICIPO PARA ADQUISICION DE ACCIONES Y PARTICIPAC. DE COMPAÑÍAS NO CONSTITUIDAS', sistema: 'SAB', estado: 'ACTIVA' },
  { codigo: 'B44', descripcion: 'DETALLE DE CONTRATOS DE COMPRA Y VENTA DE DIVISAS', sistema: 'SAB', estado: 'ACTIVA' },
  { codigo: 'B90', descripcion: 'DETALLE DE CARTERA DE CRÉDITOS COLOCADA EN EL EXTERIOR', sistema: 'SAB', estado: 'ACTIVA' },

  // SISTEMA DE ADMINISTRACIÓN DE CATASTRO – SAC - CATASTRO
  { codigo: 'C02', descripcion: 'NÓMINA DE EJECUTIVOS, MIEMBROS DEL DIRECTORIO, CONSEJOS DE ADMINISTRACIÓN O VIGILANCIA', sistema: 'SAC', estado: 'ACTIVA' },
  { codigo: 'C11', descripcion: 'NÓMINA DE PERSONAL', sistema: 'SAC', estado: 'ACTIVA' },
  { codigo: 'C21', descripcion: 'NÓMINA DE EJECUTIVOS, MIEMBROS DEL DIRECTORIO O CONSEJOS DE ADMINISTRACIÓN O VIGILANCIA', sistema: 'SAC', estado: 'ACTIVA' },
  { codigo: 'C23', descripcion: 'NÓMINA DE PARIENTES DE DIRECTIVOS Y DIRECTORIO', sistema: 'SAC', estado: 'ACTIVA' },
  { codigo: 'C31', descripcion: 'NÓMINA DE ACCIONISTAS DIRECTOS', sistema: 'SAC', estado: 'ACTIVA' },
  { codigo: 'C32', descripcion: 'NÓMINA DE ACCIONISTAS INDIRECTOS', sistema: 'SAC', estado: 'ACTIVA' },
  { codigo: 'C41', descripcion: 'AUDITORES INTERNOS', sistema: 'SAC', estado: 'ACTIVA' },

  // SISTEMA DE ADMINISTRACIÓN DE CATASTRO – SAC - CAJEROS AUTOMATICOS
  { codigo: 'C70', descripcion: 'CAJEROS AUTOMATICOS', sistema: 'SAC', estado: 'ACTIVA' },

  // SISTEMA DE ADMINISTRACIÓN DE CATASTRO – SAC - PUNTOS DE ATENCIÓN
  { codigo: 'C71', descripcion: 'PUNTOS DE ATENCIÓN', sistema: 'SAC', estado: 'ACTIVA' },
  { codigo: 'C72', descripcion: 'HORARIOS DE ATENCIÓN', sistema: 'SAC', estado: 'ACTIVA' },

  // SISTEMA DE DEPOSITOS GARANTIZADOS – SDG
  { codigo: 'D01', descripcion: 'DEPOSITOS GARANTIZADOS', sistema: 'SDG', estado: 'ACTIVA' },

  // SISTEMA DE NOTIFICACIONES DE TRANSACCIONES INTERNACIONALES – NTI - TRANSACCIONES INTERNACIONALES
  { codigo: 'E02', descripcion: 'TRANSACCIONES INTERNACIONALES', sistema: 'NTI', estado: 'ACTIVA' },
  { codigo: 'E03', descripcion: 'REVERSOS DE TRANSACCIONES INTERNACIONALES', sistema: 'NTI', estado: 'ACTIVA' },
  { codigo: 'E04', descripcion: 'NOTIFICACIÓN DE TRANSACCIONES REMITIDAS A LA UAF', sistema: 'NTI', estado: 'ACTIVA' },

  // SISTEMA DE NOTIFICACIONES DE TRANSACCIONES INTERNACIONALES – NTI - PREVENCION DE LAVADO DE ACTIVOS
  { codigo: 'E10', descripcion: 'EMPLEADOS (IFIS – SEGUROS)', sistema: 'NTI', estado: 'ACTIVA' },
  { codigo: 'E20', descripcion: 'PRODUCTOS Y SERVICIOS (IFIS)', sistema: 'NTI', estado: 'ACTIVA' },
  { codigo: 'E21', descripcion: 'CLIENTES EXTRA SITU (IFIS)', sistema: 'NTI', estado: 'ACTIVA' },

  // OPERACIONES CANCELADAS CON CDR´S
  { codigo: 'F01', descripcion: 'OPERACIONES CANCELADAS CON CDR´S', sistema: 'CDR', estado: 'ELIMINADA' },

  // SISTEMA DE RIESGOS DE MERCADO Y LIQUIDEZ – SRM - INVERSIONES – IFIS
  { codigo: 'L01', descripcion: 'EMISORES, CUSTODIOS DE INVERSIONES, DEPOSITARIOS DE FONDOS DISPONIBLES Y CONTRAPARTES EN OPERACIONES DE REPORTO', sistema: 'SRM', estado: 'ACTIVA' },
  { codigo: 'L02', descripcion: 'PORTAFOLIO DE INVERSIONES', sistema: 'SRM', estado: 'ACTIVA' },
  { codigo: 'L03', descripcion: 'SALDOS Y LIQUIDACIONES DE INVERSIONES', sistema: 'SRM', estado: 'ACTIVA' },
  { codigo: 'L04', descripcion: 'TRANSFERNCIAS ENTRE CATEGORIAS', sistema: 'SRM', estado: 'ACTIVA' },
  { codigo: 'L05', descripcion: 'FONDOS DISPONIBLES SEMANALES', sistema: 'SRM', estado: 'ACTIVA' },
  { codigo: 'L06', descripcion: 'OPERACIONES INTERBANCARIAS DE REPORTO CON EL PORTAFOLIO DE INVERSIONES', sistema: 'SRM', estado: 'ACTIVA' },

  // SISTEMA DE RIESGOS DE MERCADO Y LIQUIDEZ – SRM - RIESGOS DE MERCADO Y LIQUIDEZ
  { codigo: 'L07', descripcion: 'EMISORES Y CUSTODIOS PARA LIQUIDEZ ESTRUCTURAL', sistema: 'SRM', estado: 'ACTIVA' },
  { codigo: 'L08', descripcion: 'LIQUIDEZ ESTRUCTURAL', sistema: 'SRM', estado: 'ACTIVA' },
  { codigo: 'L09', descripcion: 'DETALLE DE PRODUCTOS', sistema: 'SRM', estado: 'ACTIVA' },
  { codigo: 'L10', descripcion: 'BRECHAS DE SENSIBILIDAD', sistema: 'SRM', estado: 'ACTIVA' },
  { codigo: 'L11', descripcion: 'SENSIBILIDAD DEL VALOR PATRIMONIAL Y DEL MARGEN FINANCIERO', sistema: 'SRM', estado: 'ACTIVA' },
  { codigo: 'L12', descripcion: 'CAPATACIONES POR MONTO – CUENTA 21', sistema: 'SRM', estado: 'ACTIVA' },
  { codigo: 'L13', descripcion: 'OBLIGACIONES FINANCIERAS – CUENTA 26', sistema: 'SRM', estado: 'ACTIVA' },
  { codigo: 'L14', descripcion: 'CONCENTRACIÓN DE DEPÓSITOS DE LOS 100 MAYORES CLIENTES', sistema: 'SRM', estado: 'ACTIVA' },
  { codigo: 'L31', descripcion: 'BRECHAS DE LIQUIDEZ', sistema: 'SRM', estado: 'ACTIVA' },

  // SISTEMA DE RIESGOS DE MERCADO Y LIQUIDEZ – SRM - INVERSIONES BCE
  { codigo: 'L16', descripcion: 'EMISORES DE INVERSIONES', sistema: 'SRM', estado: 'ACTIVA' },
  { codigo: 'L17', descripcion: 'PORTAFOLIO DE INVERSIONES', sistema: 'SRM', estado: 'ACTIVA' },
  { codigo: 'L18', descripcion: 'SALDOS Y LIQUIDACIONES DE INVERSIONES', sistema: 'SRM', estado: 'ACTIVA' },
  { codigo: 'L19', descripcion: 'TRANSFERENCIAS ENTRE CATEGORIAS', sistema: 'SRM', estado: 'ACTIVA' },
  { codigo: 'L27', descripcion: 'OPERACIONES INTERBANCARIAS DE REPORTO', sistema: 'SRM', estado: 'ACTIVA' },
  { codigo: 'L28', descripcion: 'INVERSION DOMESTICA RILD', sistema: 'SRM', estado: 'ACTIVA' },

  // SISTEMA DE RIESGOS DE MERCADO Y LIQUIDEZ – SRM - INVERSIONES BIESS – FONDOS ADMINISTRADOS
  { codigo: 'L20', descripcion: 'EMISORES DE INVERSIONES', sistema: 'SRM', estado: 'ACTIVA' },
  { codigo: 'L21', descripcion: 'PORTAFOLIO DE INVERSIONES', sistema: 'SRM', estado: 'ACTIVA' },
  { codigo: 'L22', descripcion: 'NEGOCIOS FIDUCIARIOS', sistema: 'SRM', estado: 'ACTIVA' },
  { codigo: 'L23', descripcion: 'FIDEICOMISOS, FONDOS QUE FINANCIAN', sistema: 'SRM', estado: 'ACTIVA' },
  { codigo: 'L24', descripcion: 'FIDEICOMISOS, TIPOS DE INVERSIÓN', sistema: 'SRM', estado: 'ACTIVA' },
  { codigo: 'L25', descripcion: 'INVERSIONES PRIVATIVAS', sistema: 'SRM', estado: 'ACTIVA' },

  // SISTEMA DE OPERACIONES ACTIVAS Y CONTINGENTES – OAC - OPERACIONES ACTIVAS Y CONTINGENTES INIFI´S
  { codigo: 'R01', descripcion: 'SUJETOS DE RIESGO', sistema: 'OAC', estado: 'ACTIVA' },
  { codigo: 'R02', descripcion: 'OPERACIONES CONCEDIDAS', sistema: 'OAC', estado: 'ACTIVA' },
  { codigo: 'R03', descripcion: 'OPERACIONES ANTERIORES', sistema: 'OAC', estado: 'ACTIVA' },
  { codigo: 'R04', descripcion: 'SALDOS DE OPERACIONES', sistema: 'OAC', estado: 'ACTIVA' },
  { codigo: 'R05', descripcion: 'OPERACIONES CANCELADAS Y SESIONES', sistema: 'OAC', estado: 'ACTIVA' },
  { codigo: 'R06', descripcion: 'GARANTES Y CODEUDORES', sistema: 'OAC', estado: 'ACTIVA' },
  { codigo: 'R07', descripcion: 'GARANTÍAS REALES', sistema: 'OAC', estado: 'ACTIVA' },
  { codigo: 'R08', descripcion: 'BIENES ADJUDICADOS O RECIBIDOS EN DACIÓN DE PAGO', sistema: 'OAC', estado: 'ACTIVA' },
  { codigo: 'R09', descripcion: 'TÍTULOS VALORES ADJUDICADSOS O RECIBIDOS EN DACIÓN DE PAGO', sistema: 'OAC', estado: 'ACTIVA' },
  { codigo: 'R10', descripcion: 'PROVISIONES BIENES Y TITULOS ADJUDICADOS O RECIBIDOS EN DACION DE PAGO', sistema: 'OAC', estado: 'ACTIVA' },
  { codigo: 'R11', descripcion: 'CREDITOS PARTICIPADOS', sistema: 'OAC', estado: 'ACTIVA' },
  { codigo: 'R12', descripcion: 'GRUPOS ECONÓMICOS', sistema: 'OAC', estado: 'ACTIVA' },
  { codigo: 'R13', descripcion: 'INTEGRANTES DE GRUPOS ECONOMICOS', sistema: 'OAC', estado: 'ACTIVA' },
  { codigo: 'R20', descripcion: 'APERTURA DE TARJETAS DE CRÉDITO', sistema: 'OAC', estado: 'ACTIVA' },
  { codigo: 'R21', descripcion: 'CONSUMOS DE TARJETAS DE CREDITO', sistema: 'OAC', estado: 'ACTIVA' },
  { codigo: 'R22', descripcion: 'PROVISIONES DE TARJETAS DE CREDITO', sistema: 'OAC', estado: 'ACTIVA' },
  { codigo: 'R1A', descripcion: 'AUXILIAR DE R01', sistema: 'OAC', estado: 'ELIMINADA' },
  { codigo: 'R5A', descripcion: 'R05 EVENTUAL', sistema: 'OAC', estado: 'ELIMINADA' },
  { codigo: 'R2A', descripcion: 'ACTUALIZACIÓN DE DATOS DE CARTERA DE CRÉDITOS', sistema: 'OAC', estado: 'ACTIVA' },
  { codigo: 'R60', descripcion: 'ACTUALIZACION ESPECIAL DE DATOS', sistema: 'OAC', estado: 'ACTIVA' },

  // CENTRAL DE RIESGOS – SEGURIDAD SOCIAL
  { codigo: 'R81', descripcion: 'SUJETOS DE RIESGO', sistema: 'CRSS', estado: 'ACTIVA' },
  { codigo: 'R82', descripcion: 'OPERACIONES CONCEDIDAS', sistema: 'CRSS', estado: 'ACTIVA' },
  { codigo: 'R83', descripcion: 'OPERACIONES ANTERIORES', sistema: 'CRSS', estado: 'ACTIVA' },
  { codigo: 'R84', descripcion: 'SALDOS', sistema: 'CRSS', estado: 'ACTIVA' },
  { codigo: 'R85', descripcion: 'OPERACIONES CANCELADAS', sistema: 'CRSS', estado: 'ACTIVA' },
  { codigo: 'R86', descripcion: 'DEUDORES SOLIDARIOS', sistema: 'CRSS', estado: 'ACTIVA' },
  { codigo: 'R88', descripcion: 'MORA PATRONAL', sistema: 'CRSS', estado: 'ACTIVA' },
  { codigo: 'R92', descripcion: 'AUXILIAR DE LA R82', sistema: 'CRSS', estado: 'ACTIVA' },

  // SISTEMA DE CUENTAS CORRIENTES – SLC
  { codigo: 'T01', descripcion: 'RECEPCIÓN CANCELACIÓN DE MULTAS DE CHEQUES PROTESTADOS', sistema: 'SLC', estado: 'ACTIVA' },
  { codigo: 'T21', descripcion: 'CUENTAS CORRIENTES', sistema: 'SLC', estado: 'ACTIVA' },
  { codigo: 'T22', descripcion: 'CHEQUES PROTESTADOS', sistema: 'SLC', estado: 'ACTIVA' },
  { codigo: 'T23', descripcion: 'MONTOS TRANSFERIDOS', sistema: 'SLC', estado: 'ACTIVA' },
  { codigo: 'T24', descripcion: 'RECUPERACIONES DE RECTIFICACIONES', sistema: 'SLC', estado: 'ELIMINADA' },
  { codigo: 'T25', descripcion: 'CHEQUES PROTESTADOS DE RECTIFICACION', sistema: 'SLC', estado: 'ELIMINADA' },
  { codigo: 'T26', descripcion: 'ACTULIZACIÓN DE CUENTAS CORRIENTES', sistema: 'SLC', estado: 'ACTIVA' },
  { codigo: 'T27', descripcion: 'TRANSFERENCIAS DE LAS RECUPERACIONES', sistema: 'SLC', estado: 'ACTIVA' },
  { codigo: 'T30', descripcion: 'ALTA INGRESO DE TITULAR O FIRMAS AUTORIZADAS', sistema: 'SLC', estado: 'ELIMINADA' },
  { codigo: 'T31', descripcion: 'BAJA O EXCLUSION DE TITULAR O FIRMAS AUTORIZADAS', sistema: 'SLC', estado: 'ELIMINADA' },
  { codigo: 'T32', descripcion: 'MIGRACION', sistema: 'SLC', estado: 'ACTIVA' },
  { codigo: 'T33', descripcion: 'CAMBIO DE FECHA DE CIERRE DE CUENTA', sistema: 'SLC', estado: 'ELIMINADA' },
  { codigo: 'T34', descripcion: 'CAMBIO DEL ESTADO DE LA CUENTA', sistema: 'SLC', estado: 'ELIMINADA' },
  { codigo: 'T35', descripcion: 'CAMBIO DE TIPO DE CUENTA DE PPERSONAL A CORPORATIVO', sistema: 'SLC', estado: 'ELIMINADA' },
  { codigo: 'T36', descripcion: 'ACTUALIZACION DE TITULAR O FIRMANTE DE CUENTA CORRIENTE', sistema: 'SLC', estado: 'ELIMINADA' },
  { codigo: 'T37', descripcion: 'MODIFICACIÓN DE REGISTROS DE RECUPERACIONES Y CHEQUES PROTESTADOS', sistema: 'SLC', estado: 'ACTIVA' },
  { codigo: 'T38', descripcion: 'MODIFICACIÓN DE ESTADOS DE CUENTA CORRIENTES, TITULARES Y O FIRMANTES', sistema: 'SLC', estado: 'ACTIVA' },
  { codigo: 'T39', descripcion: 'CAMBIO DE ESTADO, FECHA DE CIERRE Y SANCIÓN DE CUENTAS CORRIENTES', sistema: 'SLC', estado: 'ACTIVA' },

  // DISTRIBUCIÓN DE UTILIDADES DE BALANCES – UTI
  { codigo: 'U01', descripcion: 'UTILIDADES', sistema: 'UTI', estado: 'ACTIVA' },

  // SISTEMA DE SEGURIDAD SOCIAL – SSS - SEGURO GENERAL OBLIGATORIO Y FCPC INVERSIONES
  { codigo: 'G01', descripcion: 'EMISORES DE INVERSIONES', sistema: 'SSS', estado: 'ACTIVA' },
  { codigo: 'G02', descripcion: 'PORTAFOLIO DE INVERSIONES', sistema: 'SSS', estado: 'ACTIVA' },

  // SISTEMA DE SEGURIDAD SOCIAL – SSS - SEGURO GENERAL OBLIGATORIO
  { codigo: 'G20', descripcion: 'EMPLEADORES', sistema: 'SSS', estado: 'ACTIVA' },
  { codigo: 'G21', descripcion: 'AFILIADOS', sistema: 'SSS', estado: 'ACTIVA' },
  { codigo: 'G22', descripcion: 'DEPENDIENTES', sistema: 'SSS', estado: 'ACTIVA' },
  { codigo: 'G23', descripcion: 'RECAUDACIÓN', sistema: 'SSS', estado: 'ACTIVA' },
  { codigo: 'G24', descripcion: 'MORA POR APORTES', sistema: 'SSS', estado: 'ACTIVA' },
  { codigo: 'G25', descripcion: 'MORA DE PORTE AFILIADOS VOLUNTARIOS', sistema: 'SSS', estado: 'ACTIVA' },
  { codigo: 'G26', descripcion: 'FONDO DE PENSIONES', sistema: 'SSS', estado: 'ACTIVA' },
  { codigo: 'G27', descripcion: 'FONDOS DE SALUD', sistema: 'SSS', estado: 'ACTIVA' },
  { codigo: 'G28', descripcion: 'PROGRAMA DEL ADULTO MAYOR', sistema: 'SSS', estado: 'ACTIVA' },
  { codigo: 'G29', descripcion: 'FONDO DE CESANTÍA', sistema: 'SSS', estado: 'ACTIVA' },
  { codigo: 'G30', descripcion: 'AHORRO DE MENORES', sistema: 'SSS', estado: 'ACTIVA' },
  { codigo: 'G31', descripcion: 'SEGURO DE VIDA Y FUNERALES', sistema: 'SSS', estado: 'ACTIVA' },

  // SISTEMA DE SEGURIDAD SOCIAL – SSS - FONDOS PREVISIONALES COMPLEMENTARIOS CERRADOS (CATASTRO)
  { codigo: 'G40', descripcion: 'DATOS GENERALES DE LOS FONDOS PREVISIONALES COMPLEMENTARIOS CERRADOS', sistema: 'SSS', estado: 'ACTIVA' },
  { codigo: 'G41', descripcion: 'PARTÍCIPES ACTIVOS Y VOLUNTARIOS DE LOS FONDOS PREVISIONALES COMPLEMENTARIOS CERRADOS', sistema: 'SSS', estado: 'ACTIVA' },
  { codigo: 'G42', descripcion: 'SALDO DE CUENTA INDIVIDUAL PARTÍCIPES DE LOS FONDOS PREVISIONALES COMPLEMENTARIOS CERRADOS', sistema: 'SSS', estado: 'ACTIVA' },
  { codigo: 'G43', descripcion: 'PARTÍCIPES CESANTES DE LOS FONDOS PREVISIONALES COMPLEMENTARIOS CERRADOS', sistema: 'SSS', estado: 'ACTIVA' },
  { codigo: 'G44', descripcion: 'PARTÍCIPES JUBILADOS DE LOS FONDOS PREVISIONALES COMPLEMENTARIOS CERRADOS', sistema: 'SSS', estado: 'ACTIVA' },

  // SISTEMA DE SEGURIDAD SOCIAL – SSS - FONDOS PREVISIONALES COMPLEMENTARIOS CERRADOS (CARTERA)
  { codigo: 'G45', descripcion: 'SUJETOS DE RIESGO', sistema: 'SSS', estado: 'ACTIVA' },
  { codigo: 'G46', descripcion: 'OPERACIONES CONCEDIDAS', sistema: 'SSS', estado: 'ACTIVA' },
  { codigo: 'G47', descripcion: 'OPERACIONES ANTERIORES', sistema: 'SSS', estado: 'ACTIVA' },
  { codigo: 'G48', descripcion: 'SALDOS DE OPERACIONES', sistema: 'SSS', estado: 'ACTIVA' },
  { codigo: 'G49', descripcion: 'CANCELACIONES Y CAMBIOS DE CALIFICACIÓN', sistema: 'SSS', estado: 'ACTIVA' },
  { codigo: 'G50', descripcion: 'GARANTES Y CODEUDORES', sistema: 'SSS', estado: 'ACTIVA' },
  { codigo: 'G51', descripcion: 'GARANTÍAS REALES', sistema: 'SSS', estado: 'ACTIVA' }
];

/**
 * Función para obtener descripción por código
 */
export function getDescripcionEstructura(codigo: string): string {
  const item = TABLA_1_CODIGOS_ESTRUCTURA.find(c => c.codigo === codigo);
  return item ? item.descripcion : `Estructura ${codigo} no encontrada`;
}

/**
 * Función para validar si un código existe
 */
export function isValidCodigoEstructura(codigo: string): boolean {
  return TABLA_1_CODIGOS_ESTRUCTURA.some(c => c.codigo === codigo);
}

/**
 * Función para obtener estructuras por sistema
 */
export function getEstructurasPorSistema(sistema: string): CodigoEstructura[] {
  return TABLA_1_CODIGOS_ESTRUCTURA.filter(c => c.sistema === sistema);
}

/**
 * Función para obtener estructuras activas
 */
export function getEstructurasActivas(): CodigoEstructura[] {
  return TABLA_1_CODIGOS_ESTRUCTURA.filter(c => c.estado === 'ACTIVA');
}

/**
 * Función para obtener estructuras eliminadas
 */
export function getEstructurasEliminadas(): CodigoEstructura[] {
  return TABLA_1_CODIGOS_ESTRUCTURA.filter(c => c.estado === 'ELIMINADA');
} 