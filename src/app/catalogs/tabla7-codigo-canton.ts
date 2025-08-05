/**
 * TABLA 7 - CÓDIGO DE CANTÓN
 * Manual Técnico de Generalidades sobre Estructuras de Datos Codificación - Tablas
 * Fecha Actualización: 17/02/2022 - Versión: 13.3
 * Superintendencia de Bancos del Ecuador
 * 
 * NOTA: LA TABLA 7 APLICA INEC- DIVISIÓN POLÍTICA ADMINISTRATIVA
 */

export interface Tabla7CodigoCanton {
  codigo: string;
  descripcion: string;
  provincia: string;
  estado: 'ACTIVA' | 'INACTIVA';
}

export const TABLA_7_CODIGO_CANTON: Tabla7CodigoCanton[] = [
  // ============================================================================
  // AZUAY (01)
  // ============================================================================
  { codigo: '0101', descripcion: 'CUENCA', provincia: '01', estado: 'ACTIVA' },
  { codigo: '0102', descripcion: 'GIRÓN', provincia: '01', estado: 'ACTIVA' },
  { codigo: '0103', descripcion: 'GUALACEO', provincia: '01', estado: 'ACTIVA' },
  { codigo: '0104', descripcion: 'NABÓN', provincia: '01', estado: 'ACTIVA' },
  { codigo: '0105', descripcion: 'PAUTE', provincia: '01', estado: 'ACTIVA' },
  { codigo: '0106', descripcion: 'PUCARÁ', provincia: '01', estado: 'ACTIVA' },
  { codigo: '0107', descripcion: 'SAN FERNANDO', provincia: '01', estado: 'ACTIVA' },
  { codigo: '0108', descripcion: 'SANTA ISABEL', provincia: '01', estado: 'ACTIVA' },
  { codigo: '0109', descripcion: 'SIGSIG', provincia: '01', estado: 'ACTIVA' },
  { codigo: '0110', descripcion: 'OÑA', provincia: '01', estado: 'ACTIVA' },
  { codigo: '0111', descripcion: 'CHORDELEG', provincia: '01', estado: 'ACTIVA' },
  { codigo: '0112', descripcion: 'EL PAN', provincia: '01', estado: 'ACTIVA' },
  { codigo: '0113', descripcion: 'SEVILLA DE ORO', provincia: '01', estado: 'ACTIVA' },
  { codigo: '0114', descripcion: 'GUACHAPALA', provincia: '01', estado: 'ACTIVA' },
  { codigo: '0115', descripcion: 'CAMILO PONCE ENRÍQUEZ', provincia: '01', estado: 'ACTIVA' },

  // ============================================================================
  // BOLÍVAR (02)
  // ============================================================================
  { codigo: '0201', descripcion: 'GUARANDA', provincia: '02', estado: 'ACTIVA' },
  { codigo: '0202', descripcion: 'CHILLANES', provincia: '02', estado: 'ACTIVA' },
  { codigo: '0203', descripcion: 'CHIMBO', provincia: '02', estado: 'ACTIVA' },
  { codigo: '0204', descripcion: 'ECHEANDÍA', provincia: '02', estado: 'ACTIVA' },
  { codigo: '0205', descripcion: 'SAN MIGUEL', provincia: '02', estado: 'ACTIVA' },
  { codigo: '0206', descripcion: 'CALUMA', provincia: '02', estado: 'ACTIVA' },
  { codigo: '0207', descripcion: 'LAS NAVES', provincia: '02', estado: 'ACTIVA' },

  // ============================================================================
  // CAÑAR (03)
  // ============================================================================
  { codigo: '0301', descripcion: 'AZOGUES', provincia: '03', estado: 'ACTIVA' },
  { codigo: '0302', descripcion: 'BIBLIÁN', provincia: '03', estado: 'ACTIVA' },
  { codigo: '0303', descripcion: 'CAÑAR', provincia: '03', estado: 'ACTIVA' },
  { codigo: '0304', descripcion: 'LA TRONCAL', provincia: '03', estado: 'ACTIVA' },
  { codigo: '0305', descripcion: 'EL TAMBO', provincia: '03', estado: 'ACTIVA' },
  { codigo: '0306', descripcion: 'DÉELEG', provincia: '03', estado: 'ACTIVA' },
  { codigo: '0307', descripcion: 'SUSCAL', provincia: '03', estado: 'ACTIVA' },

  // ============================================================================
  // CARCHI (04)
  // ============================================================================
  { codigo: '0401', descripcion: 'TULCÁN', provincia: '04', estado: 'ACTIVA' },
  { codigo: '0402', descripcion: 'BOLÍVAR', provincia: '04', estado: 'ACTIVA' },
  { codigo: '0403', descripcion: 'ESPEJO', provincia: '04', estado: 'ACTIVA' },
  { codigo: '0404', descripcion: 'MIRA', provincia: '04', estado: 'ACTIVA' },
  { codigo: '0405', descripcion: 'MONTÚFAR', provincia: '04', estado: 'ACTIVA' },
  { codigo: '0406', descripcion: 'SAN PEDRO DE HUACA', provincia: '04', estado: 'ACTIVA' },

  // ============================================================================
  // COTOPAXI (05)
  // ============================================================================
  { codigo: '0501', descripcion: 'LATACUNGA', provincia: '05', estado: 'ACTIVA' },
  { codigo: '0502', descripcion: 'LA MANÁ', provincia: '05', estado: 'ACTIVA' },
  { codigo: '0503', descripcion: 'PANGUA', provincia: '05', estado: 'ACTIVA' },
  { codigo: '0504', descripcion: 'PUJILÍ', provincia: '05', estado: 'ACTIVA' },
  { codigo: '0505', descripcion: 'SALCEDO', provincia: '05', estado: 'ACTIVA' },
  { codigo: '0506', descripcion: 'SAQUISILÍ', provincia: '05', estado: 'ACTIVA' },
  { codigo: '0507', descripcion: 'SIGCHOS', provincia: '05', estado: 'ACTIVA' },

  // ============================================================================
  // CHIMBORAZO (06)
  // ============================================================================
  { codigo: '0601', descripcion: 'RIOBAMBA', provincia: '06', estado: 'ACTIVA' },
  { codigo: '0602', descripcion: 'ALAUSÍ', provincia: '06', estado: 'ACTIVA' },
  { codigo: '0603', descripcion: 'COLTA', provincia: '06', estado: 'ACTIVA' },
  { codigo: '0604', descripcion: 'CHAMBO', provincia: '06', estado: 'ACTIVA' },
  { codigo: '0605', descripcion: 'CHUNCHI', provincia: '06', estado: 'ACTIVA' },
  { codigo: '0606', descripcion: 'GUAMOTE', provincia: '06', estado: 'ACTIVA' },
  { codigo: '0607', descripcion: 'GUANO', provincia: '06', estado: 'ACTIVA' },
  { codigo: '0608', descripcion: 'PALLATANGA', provincia: '06', estado: 'ACTIVA' },
  { codigo: '0609', descripcion: 'PENIPE', provincia: '06', estado: 'ACTIVA' },
  { codigo: '0610', descripcion: 'CUMANDÁ', provincia: '06', estado: 'ACTIVA' },

  // ============================================================================
  // EL ORO (07)
  // ============================================================================
  { codigo: '0701', descripcion: 'MACHALA', provincia: '07', estado: 'ACTIVA' },
  { codigo: '0702', descripcion: 'ARENILLAS', provincia: '07', estado: 'ACTIVA' },
  { codigo: '0703', descripcion: 'ATAHUALPA', provincia: '07', estado: 'ACTIVA' },
  { codigo: '0704', descripcion: 'BALSAS', provincia: '07', estado: 'ACTIVA' },
  { codigo: '0705', descripcion: 'CHILLA', provincia: '07', estado: 'ACTIVA' },
  { codigo: '0706', descripcion: 'EL GUABO', provincia: '07', estado: 'ACTIVA' },
  { codigo: '0707', descripcion: 'HUAQUILLAS', provincia: '07', estado: 'ACTIVA' },
  { codigo: '0708', descripcion: 'MARCABELÍ', provincia: '07', estado: 'ACTIVA' },
  { codigo: '0709', descripcion: 'PASAJE', provincia: '07', estado: 'ACTIVA' },
  { codigo: '0710', descripcion: 'PIÑAS', provincia: '07', estado: 'ACTIVA' },
  { codigo: '0711', descripcion: 'PORTOVELO', provincia: '07', estado: 'ACTIVA' },
  { codigo: '0712', descripcion: 'SANTA ROSA', provincia: '07', estado: 'ACTIVA' },
  { codigo: '0713', descripcion: 'ZARUMA', provincia: '07', estado: 'ACTIVA' },
  { codigo: '0714', descripcion: 'LAS LAJAS', provincia: '07', estado: 'ACTIVA' },

  // ============================================================================
  // ESMERALDAS (08)
  // ============================================================================
  { codigo: '0801', descripcion: 'ESMERALDAS', provincia: '08', estado: 'ACTIVA' },
  { codigo: '0802', descripcion: 'ELOY ALFARO', provincia: '08', estado: 'ACTIVA' },
  { codigo: '0803', descripcion: 'MUISNE', provincia: '08', estado: 'ACTIVA' },
  { codigo: '0804', descripcion: 'QUININDÉ', provincia: '08', estado: 'ACTIVA' },
  { codigo: '0805', descripcion: 'SAN LORENZO', provincia: '08', estado: 'ACTIVA' },
  { codigo: '0806', descripcion: 'ATACAMES', provincia: '08', estado: 'ACTIVA' },
  { codigo: '0807', descripcion: 'RIOVERDE', provincia: '08', estado: 'ACTIVA' },

  // ============================================================================
  // GUAYAS (09)
  // ============================================================================
  { codigo: '0901', descripcion: 'GUAYAQUIL', provincia: '09', estado: 'ACTIVA' },
  { codigo: '0902', descripcion: 'ALFREDO BAQUERIZO MORENO (JUJÁN)', provincia: '09', estado: 'ACTIVA' },
  { codigo: '0903', descripcion: 'BALAO', provincia: '09', estado: 'ACTIVA' },
  { codigo: '0904', descripcion: 'BALZAR', provincia: '09', estado: 'ACTIVA' },
  { codigo: '0905', descripcion: 'COLIMES', provincia: '09', estado: 'ACTIVA' },
  { codigo: '0906', descripcion: 'DAULE', provincia: '09', estado: 'ACTIVA' },
  { codigo: '0907', descripcion: 'DURÁN', provincia: '09', estado: 'ACTIVA' },
  { codigo: '0908', descripcion: 'EL EMPALME', provincia: '09', estado: 'ACTIVA' },
  { codigo: '0909', descripcion: 'EL TRIUNFO', provincia: '09', estado: 'ACTIVA' },
  { codigo: '0910', descripcion: 'MILAGRO', provincia: '09', estado: 'ACTIVA' },
  { codigo: '0911', descripcion: 'NARANJAL', provincia: '09', estado: 'ACTIVA' },
  { codigo: '0912', descripcion: 'NARANJITO', provincia: '09', estado: 'ACTIVA' },
  { codigo: '0913', descripcion: 'PALESTINA', provincia: '09', estado: 'ACTIVA' },
  { codigo: '0914', descripcion: 'PEDRO CARBO', provincia: '09', estado: 'ACTIVA' },
  { codigo: '0916', descripcion: 'SAMBORONDÓN', provincia: '09', estado: 'ACTIVA' },
  { codigo: '0918', descripcion: 'SANTA LUCÍA', provincia: '09', estado: 'ACTIVA' },
  { codigo: '0919', descripcion: 'SALITRE (URBINA JADO)', provincia: '09', estado: 'ACTIVA' },
  { codigo: '0920', descripcion: 'SAN JACINTO DE YAGUACHI', provincia: '09', estado: 'ACTIVA' },
  { codigo: '0921', descripcion: 'PLAYAS', provincia: '09', estado: 'ACTIVA' },
  { codigo: '0922', descripcion: 'SIMÓN BOLÍVAR', provincia: '09', estado: 'ACTIVA' },
  { codigo: '0923', descripcion: 'CORONEL MARCELINO MARIDUEÑA', provincia: '09', estado: 'ACTIVA' },
  { codigo: '0924', descripcion: 'LOMAS DE SARGENTILLO', provincia: '09', estado: 'ACTIVA' },
  { codigo: '0925', descripcion: 'NOBOL', provincia: '09', estado: 'ACTIVA' },
  { codigo: '0927', descripcion: 'GENERAL ANTONIO ELIZALDE (BUCAY)', provincia: '09', estado: 'ACTIVA' },
  { codigo: '0928', descripcion: 'ISIDRO AYORA', provincia: '09', estado: 'ACTIVA' },

  // ============================================================================
  // IMBABURA (10)
  // ============================================================================
  { codigo: '1001', descripcion: 'IBARRA', provincia: '10', estado: 'ACTIVA' },
  { codigo: '1002', descripcion: 'ANTONIO ANTE', provincia: '10', estado: 'ACTIVA' },
  { codigo: '1003', descripcion: 'COTACACHI', provincia: '10', estado: 'ACTIVA' },
  { codigo: '1004', descripcion: 'OTAVALO', provincia: '10', estado: 'ACTIVA' },
  { codigo: '1005', descripcion: 'PIMAMPIRO', provincia: '10', estado: 'ACTIVA' },
  { codigo: '1006', descripcion: 'SAN MIGUEL DE URCUQUÍ', provincia: '10', estado: 'ACTIVA' },

  // ============================================================================
  // LOJA (11)
  // ============================================================================
  { codigo: '1101', descripcion: 'LOJA', provincia: '11', estado: 'ACTIVA' },
  { codigo: '1102', descripcion: 'CALVAS', provincia: '11', estado: 'ACTIVA' },
  { codigo: '1103', descripcion: 'CATAMAYO', provincia: '11', estado: 'ACTIVA' },
  { codigo: '1104', descripcion: 'CELICA', provincia: '11', estado: 'ACTIVA' },
  { codigo: '1105', descripcion: 'CHAGUARPAMBA', provincia: '11', estado: 'ACTIVA' },
  { codigo: '1106', descripcion: 'ESPÍNDOLA', provincia: '11', estado: 'ACTIVA' },
  { codigo: '1107', descripcion: 'GONZANAMÁ', provincia: '11', estado: 'ACTIVA' },
  { codigo: '1108', descripcion: 'MACARÁ', provincia: '11', estado: 'ACTIVA' },
  { codigo: '1109', descripcion: 'PALTAS', provincia: '11', estado: 'ACTIVA' },
  { codigo: '1110', descripcion: 'PUYANGO', provincia: '11', estado: 'ACTIVA' },
  { codigo: '1111', descripcion: 'SARAGURO', provincia: '11', estado: 'ACTIVA' },
  { codigo: '1112', descripcion: 'SOZORANGA', provincia: '11', estado: 'ACTIVA' },
  { codigo: '1113', descripcion: 'ZAPOTILLO', provincia: '11', estado: 'ACTIVA' },
  { codigo: '1114', descripcion: 'PINDAL', provincia: '11', estado: 'ACTIVA' },
  { codigo: '1115', descripcion: 'QUILANGA', provincia: '11', estado: 'ACTIVA' },
  { codigo: '1116', descripcion: 'OLMEDO', provincia: '11', estado: 'ACTIVA' },

  // ============================================================================
  // LOS RÍOS (12)
  // ============================================================================
  { codigo: '1201', descripcion: 'BABAHOYO', provincia: '12', estado: 'ACTIVA' },
  { codigo: '1202', descripcion: 'BABA', provincia: '12', estado: 'ACTIVA' },
  { codigo: '1203', descripcion: 'MONTALVO', provincia: '12', estado: 'ACTIVA' },
  { codigo: '1204', descripcion: 'PUEBLOVIEJO', provincia: '12', estado: 'ACTIVA' },
  { codigo: '1205', descripcion: 'QUEVEDO', provincia: '12', estado: 'ACTIVA' },
  { codigo: '1206', descripcion: 'URDANETA', provincia: '12', estado: 'ACTIVA' },
  { codigo: '1207', descripcion: 'VENTANAS', provincia: '12', estado: 'ACTIVA' },
  { codigo: '1208', descripcion: 'VINCES', provincia: '12', estado: 'ACTIVA' },
  { codigo: '1209', descripcion: 'PALENQUE', provincia: '12', estado: 'ACTIVA' },
  { codigo: '1210', descripcion: 'BUENA FÉ', provincia: '12', estado: 'ACTIVA' },
  { codigo: '1211', descripcion: 'VALENCIA', provincia: '12', estado: 'ACTIVA' },
  { codigo: '1212', descripcion: 'MOCACHE', provincia: '12', estado: 'ACTIVA' },
  { codigo: '1213', descripcion: 'QUINSALOMA', provincia: '12', estado: 'ACTIVA' },

  // ============================================================================
  // MANABÍ (13)
  // ============================================================================
  { codigo: '1301', descripcion: 'PORTOVIEJO', provincia: '13', estado: 'ACTIVA' },
  { codigo: '1302', descripcion: 'BOLÍVAR', provincia: '13', estado: 'ACTIVA' },
  { codigo: '1303', descripcion: 'CHONE', provincia: '13', estado: 'ACTIVA' },
  { codigo: '1304', descripcion: 'EL CARMEN', provincia: '13', estado: 'ACTIVA' },
  { codigo: '1305', descripcion: 'FLAVIO ALFARO', provincia: '13', estado: 'ACTIVA' },
  { codigo: '1306', descripcion: 'JIPIJAPA', provincia: '13', estado: 'ACTIVA' },
  { codigo: '1307', descripcion: 'JUNÍN', provincia: '13', estado: 'ACTIVA' },
  { codigo: '1308', descripcion: 'MANTA', provincia: '13', estado: 'ACTIVA' },
  { codigo: '1309', descripcion: 'MONTECRISTI', provincia: '13', estado: 'ACTIVA' },
  { codigo: '1310', descripcion: 'PAJÁN', provincia: '13', estado: 'ACTIVA' },
  { codigo: '1311', descripcion: 'PICHINCHA', provincia: '13', estado: 'ACTIVA' },
  { codigo: '1312', descripcion: 'ROCAFUERTE', provincia: '13', estado: 'ACTIVA' },
  { codigo: '1313', descripcion: 'SANTA ANA', provincia: '13', estado: 'ACTIVA' },
  { codigo: '1314', descripcion: 'SUCRE', provincia: '13', estado: 'ACTIVA' },
  { codigo: '1315', descripcion: 'TOSAGUA', provincia: '13', estado: 'ACTIVA' },
  { codigo: '1316', descripcion: '24 DE MAYO', provincia: '13', estado: 'ACTIVA' },
  { codigo: '1317', descripcion: 'PEDERNALES', provincia: '13', estado: 'ACTIVA' },
  { codigo: '1318', descripcion: 'OLMEDO', provincia: '13', estado: 'ACTIVA' },
  { codigo: '1319', descripcion: 'PUERTO LÓPEZ', provincia: '13', estado: 'ACTIVA' },
  { codigo: '1320', descripcion: 'JAMA', provincia: '13', estado: 'ACTIVA' },
  { codigo: '1321', descripcion: 'JARAMIJÓ', provincia: '13', estado: 'ACTIVA' },
  { codigo: '1322', descripcion: 'SAN VICENTE', provincia: '13', estado: 'ACTIVA' },

  // ============================================================================
  // MORONA SANTIAGO (14)
  // ============================================================================
  { codigo: '1401', descripcion: 'MORONA', provincia: '14', estado: 'ACTIVA' },
  { codigo: '1402', descripcion: 'GUALAQUIZA', provincia: '14', estado: 'ACTIVA' },
  { codigo: '1403', descripcion: 'LIMÓN INDANZA', provincia: '14', estado: 'ACTIVA' },
  { codigo: '1404', descripcion: 'PALORA', provincia: '14', estado: 'ACTIVA' },
  { codigo: '1405', descripcion: 'SANTIAGO', provincia: '14', estado: 'ACTIVA' },
  { codigo: '1406', descripcion: 'SUCÚA', provincia: '14', estado: 'ACTIVA' },
  { codigo: '1407', descripcion: 'HUAMBOYA', provincia: '14', estado: 'ACTIVA' },
  { codigo: '1408', descripcion: 'SAN JUAN BOSCO', provincia: '14', estado: 'ACTIVA' },
  { codigo: '1409', descripcion: 'TAISHA', provincia: '14', estado: 'ACTIVA' },
  { codigo: '1410', descripcion: 'LOGROÑO', provincia: '14', estado: 'ACTIVA' },
  { codigo: '1411', descripcion: 'PABLO SEXTO', provincia: '14', estado: 'ACTIVA' },
  { codigo: '1412', descripcion: 'TIWINTZA', provincia: '14', estado: 'ACTIVA' },

  // ============================================================================
  // NAPO (15)
  // ============================================================================
  { codigo: '1501', descripcion: 'TENA', provincia: '15', estado: 'ACTIVA' },
  { codigo: '1503', descripcion: 'ARCHIDONA', provincia: '15', estado: 'ACTIVA' },
  { codigo: '1504', descripcion: 'EL CHACO', provincia: '15', estado: 'ACTIVA' },
  { codigo: '1507', descripcion: 'QUIJOS', provincia: '15', estado: 'ACTIVA' },
  { codigo: '1509', descripcion: 'CARLOS JULIO AROSEMENA TOLA', provincia: '15', estado: 'ACTIVA' },

  // ============================================================================
  // PASTAZA (16)
  // ============================================================================
  { codigo: '1601', descripcion: 'PASTAZA', provincia: '16', estado: 'ACTIVA' },
  { codigo: '1602', descripcion: 'MERA', provincia: '16', estado: 'ACTIVA' },
  { codigo: '1603', descripcion: 'SANTA CLARA', provincia: '16', estado: 'ACTIVA' },
  { codigo: '1604', descripcion: 'ARAJUNO', provincia: '16', estado: 'ACTIVA' },

  // ============================================================================
  // PICHINCHA (17)
  // ============================================================================
  { codigo: '1701', descripcion: 'QUITO', provincia: '17', estado: 'ACTIVA' },
  { codigo: '1702', descripcion: 'CAYAMBE', provincia: '17', estado: 'ACTIVA' },
  { codigo: '1703', descripcion: 'MEJÍA', provincia: '17', estado: 'ACTIVA' },
  { codigo: '1704', descripcion: 'PEDRO MONCAYO', provincia: '17', estado: 'ACTIVA' },
  { codigo: '1705', descripcion: 'RUMIÑAHUI', provincia: '17', estado: 'ACTIVA' },
  { codigo: '1707', descripcion: 'SAN MIGUEL DE LOS BANCOS', provincia: '17', estado: 'ACTIVA' },
  { codigo: '1708', descripcion: 'PEDRO VICENTE MALDONADO', provincia: '17', estado: 'ACTIVA' },
  { codigo: '1709', descripcion: 'PUERTO QUITO', provincia: '17', estado: 'ACTIVA' },

  // ============================================================================
  // TUNGURAHUA (18)
  // ============================================================================
  { codigo: '1801', descripcion: 'AMBATO', provincia: '18', estado: 'ACTIVA' },
  { codigo: '1802', descripcion: 'BAÑOS DE AGUA SANTA', provincia: '18', estado: 'ACTIVA' },
  { codigo: '1803', descripcion: 'CEVALLOS', provincia: '18', estado: 'ACTIVA' },
  { codigo: '1804', descripcion: 'MOCHA', provincia: '18', estado: 'ACTIVA' },
  { codigo: '1805', descripcion: 'PATATE', provincia: '18', estado: 'ACTIVA' },
  { codigo: '1806', descripcion: 'QUERO', provincia: '18', estado: 'ACTIVA' },
  { codigo: '1807', descripcion: 'SAN PEDRO DE PELILEO', provincia: '18', estado: 'ACTIVA' },
  { codigo: '1808', descripcion: 'SANTIAGO DE PÍLLARO', provincia: '18', estado: 'ACTIVA' },
  { codigo: '1809', descripcion: 'TISALEO', provincia: '18', estado: 'ACTIVA' },

  // ============================================================================
  // ZAMORA CHINCHIPE (19)
  // ============================================================================
  { codigo: '1901', descripcion: 'ZAMORA', provincia: '19', estado: 'ACTIVA' },
  { codigo: '1902', descripcion: 'CHINCHIPE', provincia: '19', estado: 'ACTIVA' },
  { codigo: '1903', descripcion: 'NANGARITZA', provincia: '19', estado: 'ACTIVA' },
  { codigo: '1904', descripcion: 'YACUAMBÍ', provincia: '19', estado: 'ACTIVA' },
  { codigo: '1905', descripcion: 'YANTZAZA', provincia: '19', estado: 'ACTIVA' },
  { codigo: '1906', descripcion: 'EL PANGUI', provincia: '19', estado: 'ACTIVA' },
  { codigo: '1907', descripcion: 'CENTINELA DEL CÓNDOR', provincia: '19', estado: 'ACTIVA' },
  { codigo: '1908', descripcion: 'PALANDA', provincia: '19', estado: 'ACTIVA' },
  { codigo: '1909', descripcion: 'PAQUISHA', provincia: '19', estado: 'ACTIVA' },

  // ============================================================================
  // GALÁPAGOS (20)
  // ============================================================================
  { codigo: '2001', descripcion: 'SAN CRISTÓBAL', provincia: '20', estado: 'ACTIVA' },
  { codigo: '2002', descripcion: 'ISABELA', provincia: '20', estado: 'ACTIVA' },
  { codigo: '2003', descripcion: 'SANTA CRUZ', provincia: '20', estado: 'ACTIVA' },

  // ============================================================================
  // SUCUMBÍOS (21)
  // ============================================================================
  { codigo: '2101', descripcion: 'LAGO AGRIO', provincia: '21', estado: 'ACTIVA' },
  { codigo: '2102', descripcion: 'GONZALO PIZARRO', provincia: '21', estado: 'ACTIVA' },
  { codigo: '2103', descripcion: 'PUTUMAYO', provincia: '21', estado: 'ACTIVA' },
  { codigo: '2104', descripcion: 'SHUSHUFINDI', provincia: '21', estado: 'ACTIVA' },
  { codigo: '2105', descripcion: 'SUCUMBÍOS', provincia: '21', estado: 'ACTIVA' },
  { codigo: '2106', descripcion: 'CASCALES', provincia: '21', estado: 'ACTIVA' },
  { codigo: '2107', descripcion: 'CUYABENO', provincia: '21', estado: 'ACTIVA' },

  // ============================================================================
  // ORELLANA (22)
  // ============================================================================
  { codigo: '2201', descripcion: 'ORELLANA', provincia: '22', estado: 'ACTIVA' },
  { codigo: '2202', descripcion: 'AGUARICO', provincia: '22', estado: 'ACTIVA' },
  { codigo: '2203', descripcion: 'LA JOYA DE LOS SACHAS', provincia: '22', estado: 'ACTIVA' },
  { codigo: '2204', descripcion: 'LORETO', provincia: '22', estado: 'ACTIVA' },

  // ============================================================================
  // SANTO DOMINGO DE LOS TSÁCHILAS (23)
  // ============================================================================
  { codigo: '2301', descripcion: 'SANTO DOMINGO', provincia: '23', estado: 'ACTIVA' },
  { codigo: '2302', descripcion: 'LA CONCORDIA', provincia: '23', estado: 'ACTIVA' },

  // ============================================================================
  // SANTA ELENA (24)
  // ============================================================================
  { codigo: '2401', descripcion: 'SANTA ELENA', provincia: '24', estado: 'ACTIVA' },
  { codigo: '2402', descripcion: 'LA LIBERTAD', provincia: '24', estado: 'ACTIVA' },
  { codigo: '2403', descripcion: 'SALINAS', provincia: '24', estado: 'ACTIVA' }
];

// ============================================================================
// FUNCIONES DE CONSULTA Y VALIDACIÓN
// ============================================================================

export const getTabla7CodigoCanton = (): Tabla7CodigoCanton[] => {
  return TABLA_7_CODIGO_CANTON;
};

export const getTabla7CodigoCantonByCodigo = (codigo: string): Tabla7CodigoCanton | undefined => {
  return TABLA_7_CODIGO_CANTON.find(item => item.codigo === codigo);
};

export const getTabla7CodigoCantonDescripcion = (codigo: string): string => {
  const item = getTabla7CodigoCantonByCodigo(codigo);
  return item ? item.descripcion : '';
};

export const getTabla7CantonesByProvincia = (provincia: string): Tabla7CodigoCanton[] => {
  return TABLA_7_CODIGO_CANTON.filter(item => item.provincia === provincia);
};

export const getTabla7CantonesActivos = (): Tabla7CodigoCanton[] => {
  return TABLA_7_CODIGO_CANTON.filter(item => item.estado === 'ACTIVA');
};

/**
 * Función para obtener estadísticas de cantones por provincia
 */
export const getEstadisticasCantones = (): {
  total: number;
  porProvincia: Record<string, number>;
} => {
  const total = TABLA_7_CODIGO_CANTON.length;
  const porProvincia: Record<string, number> = {};

  TABLA_7_CODIGO_CANTON.forEach(canton => {
    porProvincia[canton.provincia] = (porProvincia[canton.provincia] || 0) + 1;
  });

  return {
    total,
    porProvincia
  };
};

/**
 * Función para buscar cantones por texto
 */
export const buscarCantones = (texto: string): Tabla7CodigoCanton[] => {
  const textoLower = texto.toLowerCase();
  return TABLA_7_CODIGO_CANTON.filter(canton => 
    canton.descripcion.toLowerCase().includes(textoLower) ||
    canton.codigo.includes(texto)
  );
}; 