/**
 * Catálogo Oficial - Tabla 28: Actividades Económicas (CIIU Revisión 4)
 * 
 * Este catálogo define las actividades económicas conforme la Clasificación Industrial
 * Internacional Uniforme de todas las Actividades Económicas (CIIU) Revisión 4.
 * 
 * Fuente: Manual de Reportes Regulatorios - SudBank
 * Versión: 2024
 * Estándar: CIIU Rev. 4 - Naciones Unidas
 */

export interface ActividadEconomica {
  codigo: string;
  descripcion: string;
  seccion: string;
  division?: string;
  grupo?: string;
}

export const ACTIVIDADES_ECONOMICAS: ActividadEconomica[] = [
  // SECCIÓN A - AGRICULTURA, GANADERÍA, SILVICULTURA Y PESCA
  { codigo: '01', descripcion: 'Agricultura, ganadería, caza y actividades de servicios conexas', seccion: 'A' },
  { codigo: '02', descripcion: 'Silvicultura y extracción de madera', seccion: 'A' },
  { codigo: '03', descripcion: 'Pesca y acuicultura', seccion: 'A' },

  // SECCIÓN B - EXPLOTACIÓN DE MINAS Y CANTERAS
  { codigo: '05', descripcion: 'Extracción de carbón de piedra y lignito', seccion: 'B' },
  { codigo: '06', descripcion: 'Extracción de petróleo crudo y gas natural', seccion: 'B' },
  { codigo: '07', descripcion: 'Extracción de minerales metalíferos', seccion: 'B' },
  { codigo: '08', descripcion: 'Extracción de otras minas y canteras', seccion: 'B' },
  { codigo: '09', descripcion: 'Actividades de servicios de apoyo para la explotación de minas y canteras', seccion: 'B' },

  // SECCIÓN C - INDUSTRIAS MANUFACTURERAS
  { codigo: '10', descripcion: 'Elaboración de productos alimenticios', seccion: 'C' },
  { codigo: '11', descripcion: 'Elaboración de bebidas', seccion: 'C' },
  { codigo: '12', descripcion: 'Elaboración de productos de tabaco', seccion: 'C' },
  { codigo: '13', descripcion: 'Fabricación de productos textiles', seccion: 'C' },
  { codigo: '14', descripcion: 'Confección de prendas de vestir', seccion: 'C' },
  { codigo: '15', descripcion: 'Curtido y adobo de cueros; fabricación de calzado', seccion: 'C' },
  { codigo: '16', descripcion: 'Producción de madera y fabricación de productos de madera', seccion: 'C' },
  { codigo: '17', descripcion: 'Fabricación de papel, cartón y productos de papel y cartón', seccion: 'C' },
  { codigo: '18', descripcion: 'Actividades de impresión y reproducción de grabaciones', seccion: 'C' },
  { codigo: '19', descripcion: 'Fabricación de productos de hornos de coque y de refinería de petróleo', seccion: 'C' },
  { codigo: '20', descripcion: 'Fabricación de sustancias y productos químicos', seccion: 'C' },
  { codigo: '21', descripcion: 'Fabricación de productos farmacéuticos, sustancias químicas medicinales y productos botánicos', seccion: 'C' },
  { codigo: '22', descripcion: 'Fabricación de productos de caucho y plástico', seccion: 'C' },
  { codigo: '23', descripcion: 'Fabricación de otros productos minerales no metálicos', seccion: 'C' },
  { codigo: '24', descripcion: 'Fabricación de metales comunes', seccion: 'C' },
  { codigo: '25', descripcion: 'Fabricación de productos elaborados de metal, excepto maquinaria y equipo', seccion: 'C' },
  { codigo: '26', descripcion: 'Fabricación de productos informáticos, electrónicos y ópticos', seccion: 'C' },
  { codigo: '27', descripcion: 'Fabricación de aparatos y equipo eléctrico', seccion: 'C' },
  { codigo: '28', descripcion: 'Fabricación de maquinaria y equipo n.c.p.', seccion: 'C' },
  { codigo: '29', descripcion: 'Fabricación de vehículos automotores, remolques y semirremolques', seccion: 'C' },
  { codigo: '30', descripcion: 'Fabricación de otros tipos de equipo de transporte', seccion: 'C' },
  { codigo: '31', descripcion: 'Fabricación de muebles', seccion: 'C' },
  { codigo: '32', descripcion: 'Otras industrias manufactureras', seccion: 'C' },
  { codigo: '33', descripcion: 'Reparación e instalación de maquinaria y equipo', seccion: 'C' },

  // SECCIÓN D - SUMINISTRO DE ELECTRICIDAD, GAS, VAPOR Y AIRE ACONDICIONADO
  { codigo: '35', descripcion: 'Suministro de electricidad, gas, vapor y aire acondicionado', seccion: 'D' },

  // SECCIÓN E - SUMINISTRO DE AGUA; EVACUACIÓN DE AGUAS RESIDUALES, GESTIÓN DE DESECHOS Y DESCONTAMINACIÓN
  { codigo: '36', descripcion: 'Captación, tratamiento y suministro de agua', seccion: 'E' },
  { codigo: '37', descripcion: 'Evacuación y tratamiento de aguas residuales', seccion: 'E' },
  { codigo: '38', descripcion: 'Recolección, tratamiento y eliminación de desechos; recuperación de materiales', seccion: 'E' },
  { codigo: '39', descripcion: 'Actividades de descontaminación y otros servicios de gestión de desechos', seccion: 'E' },

  // SECCIÓN F - CONSTRUCCIÓN
  { codigo: '41', descripcion: 'Construcción de edificios', seccion: 'F' },
  { codigo: '42', descripcion: 'Obras de ingeniería civil', seccion: 'F' },
  { codigo: '43', descripcion: 'Actividades especializadas de construcción', seccion: 'F' },

  // SECCIÓN G - COMERCIO AL POR MAYOR Y AL POR MENOR; REPARACIÓN DE VEHÍCULOS AUTOMOTORES Y MOTOCICLETAS
  { codigo: '45', descripcion: 'Comercio y reparación de vehículos automotores y motocicletas', seccion: 'G' },
  { codigo: '46', descripcion: 'Comercio al por mayor, excepto el de vehículos automotores y motocicletas', seccion: 'G' },
  { codigo: '47', descripcion: 'Comercio al por menor, excepto el de vehículos automotores y motocicletas', seccion: 'G' },

  // SECCIÓN H - TRANSPORTE Y ALMACENAMIENTO
  { codigo: '49', descripcion: 'Actividades del transporte terrestre y por tuberías', seccion: 'H' },
  { codigo: '50', descripcion: 'Actividades del transporte acuático', seccion: 'H' },
  { codigo: '51', descripcion: 'Actividades del transporte aéreo', seccion: 'H' },
  { codigo: '52', descripcion: 'Almacenamiento y actividades anexas al transporte', seccion: 'H' },
  { codigo: '53', descripcion: 'Actividades postales y de correo', seccion: 'H' },

  // SECCIÓN I - ACTIVIDADES DE ALOJAMIENTO Y DE SERVICIO DE COMIDAS
  { codigo: '55', descripcion: 'Actividades de alojamiento', seccion: 'I' },
  { codigo: '56', descripcion: 'Actividades de servicios de comidas y bebidas', seccion: 'I' },

  // SECCIÓN J - INFORMACIÓN Y COMUNICACIONES
  { codigo: '58', descripcion: 'Actividades de edición', seccion: 'J' },
  { codigo: '59', descripcion: 'Actividades cinematográficas, de video y producción de programas de televisión, grabación de sonido y edición musical', seccion: 'J' },
  { codigo: '60', descripcion: 'Actividades de programación, transmisión y difusión', seccion: 'J' },
  { codigo: '61', descripcion: 'Telecomunicaciones', seccion: 'J' },
  { codigo: '62', descripcion: 'Desarrollo de sistemas informáticos (software), consultores en informática y actividades relacionadas', seccion: 'J' },
  { codigo: '63', descripcion: 'Actividades de servicios de información', seccion: 'J' },

  // SECCIÓN K - ACTIVIDADES FINANCIERAS Y DE SEGUROS
  { codigo: '64', descripcion: 'Actividades de servicios financieros, excepto las de seguros y fondos de pensiones', seccion: 'K' },
  { codigo: '65', descripcion: 'Seguros, reaseguros y fondos de pensiones, excepto la seguridad social obligatoria', seccion: 'K' },
  { codigo: '66', descripcion: 'Actividades auxiliares de las actividades de servicios financieros', seccion: 'K' },

  // SECCIÓN L - ACTIVIDADES INMOBILIARIAS
  { codigo: '68', descripcion: 'Actividades inmobiliarias', seccion: 'L' },

  // SECCIÓN M - ACTIVIDADES PROFESIONALES, CIENTÍFICAS Y TÉCNICAS
  { codigo: '69', descripcion: 'Actividades jurídicas y de contabilidad', seccion: 'M' },
  { codigo: '70', descripcion: 'Actividades de oficinas centrales; actividades de consultoría de gestión empresarial', seccion: 'M' },
  { codigo: '71', descripcion: 'Actividades de arquitectura e ingeniería; ensayos y análisis técnicos', seccion: 'M' },
  { codigo: '72', descripcion: 'Investigación científica y desarrollo', seccion: 'M' },
  { codigo: '73', descripcion: 'Publicidad e investigación de mercados', seccion: 'M' },
  { codigo: '74', descripcion: 'Otras actividades profesionales, científicas y técnicas', seccion: 'M' },
  { codigo: '75', descripcion: 'Actividades veterinarias', seccion: 'M' },

  // SECCIÓN N - ACTIVIDADES DE SERVICIOS ADMINISTRATIVOS Y DE APOYO
  { codigo: '77', descripcion: 'Actividades de alquiler y arrendamiento', seccion: 'N' },
  { codigo: '78', descripcion: 'Actividades de empleo', seccion: 'N' },
  { codigo: '79', descripcion: 'Actividades de las agencias de viajes, operadores turísticos, servicios de reservas y actividades relacionadas', seccion: 'N' },
  { codigo: '80', descripcion: 'Actividades de seguridad e investigación', seccion: 'N' },
  { codigo: '81', descripcion: 'Actividades de servicios a edificios y paisajismo', seccion: 'N' },
  { codigo: '82', descripcion: 'Actividades administrativas y de apoyo de oficina y otras actividades de apoyo a las empresas', seccion: 'N' },

  // SECCIÓN O - ADMINISTRACIÓN PÚBLICA Y DEFENSA; PLANES DE SEGURIDAD SOCIAL DE AFILIACIÓN OBLIGATORIA
  { codigo: '84', descripcion: 'Administración pública y defensa; planes de seguridad social de afiliación obligatoria', seccion: 'O' },

  // SECCIÓN P - EDUCACIÓN
  { codigo: '85', descripcion: 'Educación', seccion: 'P' },

  // SECCIÓN Q - ACTIVIDADES DE ATENCIÓN DE LA SALUD HUMANA Y DE ASISTENCIA SOCIAL
  { codigo: '86', descripcion: 'Actividades de atención de la salud humana', seccion: 'Q' },
  { codigo: '87', descripcion: 'Actividades de atención residencial médica', seccion: 'Q' },
  { codigo: '88', descripcion: 'Actividades de asistencia social sin alojamiento', seccion: 'Q' },

  // SECCIÓN R - ACTIVIDADES ARTÍSTICAS, DE ENTRETENIMIENTO Y RECREATIVAS
  { codigo: '90', descripcion: 'Actividades creativas, artísticas y de entretenimiento', seccion: 'R' },
  { codigo: '91', descripcion: 'Actividades de bibliotecas, archivos, museos y otras actividades culturales', seccion: 'R' },
  { codigo: '92', descripcion: 'Actividades de juegos de azar y apuestas', seccion: 'R' },
  { codigo: '93', descripcion: 'Actividades deportivas, de entretenimiento y recreativas', seccion: 'R' },

  // SECCIÓN S - OTRAS ACTIVIDADES DE SERVICIOS
  { codigo: '94', descripcion: 'Actividades de asociaciones', seccion: 'S' },
  { codigo: '95', descripcion: 'Reparación de computadores, efectos personales y enseres domésticos', seccion: 'S' },
  { codigo: '96', descripcion: 'Otras actividades de servicios personales', seccion: 'S' },

  // SECCIÓN T - ACTIVIDADES DE LOS HOGARES COMO EMPLEADORES; ACTIVIDADES NO DIFERENCIADAS DE LOS HOGARES COMO PRODUCTORES DE BIENES Y SERVICIOS PARA USO PROPIO
  { codigo: '97', descripcion: 'Actividades de los hogares como empleadores de personal doméstico', seccion: 'T' },
  { codigo: '98', descripcion: 'Actividades no diferenciadas de los hogares como productores de bienes y servicios para uso propio', seccion: 'T' },

  // SECCIÓN U - ACTIVIDADES DE ORGANIZACIONES Y ÓRGANOS EXTRATERRITORIALES
  { codigo: '99', descripcion: 'Actividades de organizaciones y órganos extraterritoriales', seccion: 'U' }
];

export const getActividadesEconomicas = (): ActividadEconomica[] => {
  return ACTIVIDADES_ECONOMICAS;
};

export const getActividadEconomicaByCodigo = (codigo: string): ActividadEconomica | undefined => {
  return ACTIVIDADES_ECONOMICAS.find(item => item.codigo === codigo);
};

export const getActividadEconomicaDescripcion = (codigo: string): string => {
  const item = getActividadEconomicaByCodigo(codigo);
  return item ? item.descripcion : '';
};

export const getActividadesEconomicasBySeccion = (seccion: string): ActividadEconomica[] => {
  return ACTIVIDADES_ECONOMICAS.filter(item => item.seccion === seccion);
};

export const getActividadesEconomicasPrimarias = (): ActividadEconomica[] => {
  return getActividadesEconomicasBySeccion('A');
};

export const getActividadesEconomicasSecundarias = (): ActividadEconomica[] => {
  return getActividadesEconomicasBySeccion('C');
};

export const getActividadesEconomicasTerciarias = (): ActividadEconomica[] => {
  return ACTIVIDADES_ECONOMICAS.filter(item => 
    ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S'].includes(item.seccion)
  );
}; 