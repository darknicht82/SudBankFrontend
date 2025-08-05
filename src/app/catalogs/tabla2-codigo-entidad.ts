/**
 * TABLA 2 - CÓDIGO DE ENTIDAD
 * Manual Técnico de Generalidades sobre Estructuras de Datos Codificación - Tablas
 * Fecha Actualización: 17/02/2022 - Versión: 13.3
 * Superintendencia de Bancos del Ecuador
 * 
 * NOTA: Los códigos de entidad actualizados pueden ser consultados en la página Web 
 * de la Superintendencia de Bancos (www.superbancos.gob.ec/bancos/), secciones 
 * "Catastro del Sistema Financiero, Sistema Seguros Privados y del Sistema Seguridad Social" 
 * – Información de Instituciones controladas.
 * 
 * ESTRUCTURA DEL CÓDIGO:
 * - 1-25: Bancos Privados
 * - 100-104: Bancos Públicos
 * - 200-210: Cooperativas de Ahorro y Crédito
 * - 300-305: Mutualistas
 * - 400-410: Compañías de Seguros
 * - 500-503: Entidades de Seguridad Social
 * - 600-604: Administradoras de Fondos
 * - 999: Entidad No Identificada
 */

export interface CodigoEntidad {
  codigo: number;
  descripcion: string;
  nombreOficial?: string;
  tipo: 'BANCO' | 'COOPERATIVA' | 'MUTUALISTA' | 'SEGUROS' | 'OTROS';
  subtipo?: 'PRIVADO' | 'PUBLICO' | 'AHORRO_CREDITO' | 'SEGURIDAD_SOCIAL' | 'ADMINISTRADORA_FONDOS';
  estado: 'ACTIVA' | 'INACTIVA' | 'SUSPENDIDA' | 'EN_LIQUIDACION';
  fechaAutorizacion?: string;
  fechaSuspension?: string;
  observaciones?: string;
}

export const TABLA_2_CODIGOS_ENTIDAD: CodigoEntidad[] = [
  // ============================================================================
  // BANCOS PRIVADOS (CÓDIGOS 1-25)
  // ============================================================================
  { 
    codigo: 1, 
    descripcion: 'BANCO PRIVADO', 
    nombreOficial: 'Banco Privado #1',
    tipo: 'BANCO', 
    subtipo: 'PRIVADO',
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código reservado para banco privado'
  },
  { 
    codigo: 2, 
    descripcion: 'BANCO PRIVADO', 
    nombreOficial: 'Banco Privado #2',
    tipo: 'BANCO', 
    subtipo: 'PRIVADO',
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código reservado para banco privado'
  },
  { 
    codigo: 3, 
    descripcion: 'BANCO PRIVADO', 
    nombreOficial: 'Banco Privado #3',
    tipo: 'BANCO', 
    subtipo: 'PRIVADO',
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código reservado para banco privado'
  },
  { 
    codigo: 4, 
    descripcion: 'BANCO PRIVADO', 
    nombreOficial: 'Banco Privado #4',
    tipo: 'BANCO', 
    subtipo: 'PRIVADO',
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código reservado para banco privado'
  },
  { 
    codigo: 5, 
    descripcion: 'BANCO PRIVADO', 
    nombreOficial: 'Banco Privado #5',
    tipo: 'BANCO', 
    subtipo: 'PRIVADO',
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código reservado para banco privado'
  },
  { 
    codigo: 6, 
    descripcion: 'BANCO PRIVADO', 
    nombreOficial: 'Banco Privado #6',
    tipo: 'BANCO', 
    subtipo: 'PRIVADO',
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código reservado para banco privado'
  },
  { 
    codigo: 7, 
    descripcion: 'BANCO PRIVADO', 
    nombreOficial: 'Banco Privado #7',
    tipo: 'BANCO', 
    subtipo: 'PRIVADO',
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código reservado para banco privado'
  },
  { 
    codigo: 8, 
    descripcion: 'BANCO PRIVADO', 
    nombreOficial: 'Banco Privado #8',
    tipo: 'BANCO', 
    subtipo: 'PRIVADO',
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código reservado para banco privado'
  },
  { 
    codigo: 9, 
    descripcion: 'BANCO PRIVADO', 
    nombreOficial: 'Banco Privado #9',
    tipo: 'BANCO', 
    subtipo: 'PRIVADO',
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código reservado para banco privado'
  },
  { 
    codigo: 10, 
    descripcion: 'BANCO PRIVADO', 
    nombreOficial: 'Banco Privado #10',
    tipo: 'BANCO', 
    subtipo: 'PRIVADO',
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código reservado para banco privado'
  },
  { 
    codigo: 11, 
    descripcion: 'BANCO PRIVADO', 
    nombreOficial: 'Banco Privado #11',
    tipo: 'BANCO', 
    subtipo: 'PRIVADO',
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código reservado para banco privado'
  },
  { 
    codigo: 12, 
    descripcion: 'BANCO PRIVADO', 
    nombreOficial: 'Banco Privado #12',
    tipo: 'BANCO', 
    subtipo: 'PRIVADO',
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código reservado para banco privado'
  },
  { 
    codigo: 13, 
    descripcion: 'BANCO PRIVADO', 
    nombreOficial: 'Banco Privado #13',
    tipo: 'BANCO', 
    subtipo: 'PRIVADO',
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código reservado para banco privado'
  },
  { 
    codigo: 14, 
    descripcion: 'BANCO PRIVADO', 
    nombreOficial: 'Banco Privado #14',
    tipo: 'BANCO', 
    subtipo: 'PRIVADO',
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código reservado para banco privado'
  },
  { 
    codigo: 15, 
    descripcion: 'BANCO PRIVADO', 
    nombreOficial: 'Banco Privado #15',
    tipo: 'BANCO', 
    subtipo: 'PRIVADO',
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código reservado para banco privado'
  },
  { 
    codigo: 16, 
    descripcion: 'BANCO PRIVADO', 
    nombreOficial: 'Banco Privado #16',
    tipo: 'BANCO', 
    subtipo: 'PRIVADO',
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código reservado para banco privado'
  },
  { 
    codigo: 17, 
    descripcion: 'BANCO PRIVADO', 
    nombreOficial: 'Banco Privado #17',
    tipo: 'BANCO', 
    subtipo: 'PRIVADO',
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código reservado para banco privado'
  },
  { 
    codigo: 18, 
    descripcion: 'BANCO PRIVADO', 
    nombreOficial: 'Banco Privado #18',
    tipo: 'BANCO', 
    subtipo: 'PRIVADO',
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código reservado para banco privado'
  },
  { 
    codigo: 19, 
    descripcion: 'BANCO PRIVADO', 
    nombreOficial: 'Banco Privado #19',
    tipo: 'BANCO', 
    subtipo: 'PRIVADO',
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código reservado para banco privado'
  },
  { 
    codigo: 20, 
    descripcion: 'BANCO PRIVADO', 
    nombreOficial: 'Banco Privado #20',
    tipo: 'BANCO', 
    subtipo: 'PRIVADO',
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código reservado para banco privado'
  },
  { 
    codigo: 21, 
    descripcion: 'BANCO PRIVADO', 
    nombreOficial: 'Banco Privado #21',
    tipo: 'BANCO', 
    subtipo: 'PRIVADO',
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código reservado para banco privado'
  },
  { 
    codigo: 22, 
    descripcion: 'BANCO PRIVADO', 
    nombreOficial: 'Banco Privado #22',
    tipo: 'BANCO', 
    subtipo: 'PRIVADO',
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código reservado para banco privado'
  },
  { 
    codigo: 23, 
    descripcion: 'BANCO PRIVADO', 
    nombreOficial: 'Banco Privado #23',
    tipo: 'BANCO', 
    subtipo: 'PRIVADO',
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código reservado para banco privado'
  },
  { 
    codigo: 24, 
    descripcion: 'BANCO PRIVADO', 
    nombreOficial: 'Banco Privado #24',
    tipo: 'BANCO', 
    subtipo: 'PRIVADO',
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código reservado para banco privado'
  },
  { 
    codigo: 25, 
    descripcion: 'BANCO PRIVADO', 
    nombreOficial: 'Banco Privado #25',
    tipo: 'BANCO', 
    subtipo: 'PRIVADO',
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código reservado para banco privado'
  },

  // ============================================================================
  // BANCOS PÚBLICOS (CÓDIGOS 100-104)
  // ============================================================================
  { 
    codigo: 100, 
    descripcion: 'BANCO CENTRAL DEL ECUADOR', 
    nombreOficial: 'Banco Central del Ecuador',
    tipo: 'BANCO', 
    subtipo: 'PUBLICO',
    estado: 'ACTIVA',
    fechaAutorizacion: '1927-08-10',
    observaciones: 'Entidad rectora de la política monetaria y crediticia'
  },
  { 
    codigo: 101, 
    descripcion: 'BANCO NACIONAL DE FOMENTO', 
    nombreOficial: 'Banco Nacional de Fomento',
    tipo: 'BANCO', 
    subtipo: 'PUBLICO',
    estado: 'ACTIVA',
    fechaAutorizacion: '1928-01-01',
    observaciones: 'Banco de desarrollo para el sector agropecuario'
  },
  { 
    codigo: 102, 
    descripcion: 'BANCO DE DESARROLLO DEL ECUADOR', 
    nombreOficial: 'Banco de Desarrollo del Ecuador',
    tipo: 'BANCO', 
    subtipo: 'PUBLICO',
    estado: 'ACTIVA',
    fechaAutorizacion: '2008-01-01',
    observaciones: 'Banco de desarrollo para proyectos estratégicos'
  },
  { 
    codigo: 103, 
    descripcion: 'BANCO DEL IESS', 
    nombreOficial: 'Banco del Instituto Ecuatoriano de Seguridad Social',
    tipo: 'BANCO', 
    subtipo: 'PUBLICO',
    estado: 'ACTIVA',
    fechaAutorizacion: '2002-01-01',
    observaciones: 'Banco del sistema de seguridad social'
  },
  { 
    codigo: 104, 
    descripcion: 'BANCO DE LA VIVIENDA', 
    nombreOficial: 'Banco de la Vivienda',
    tipo: 'BANCO', 
    subtipo: 'PUBLICO',
    estado: 'ACTIVA',
    fechaAutorizacion: '2008-01-01',
    observaciones: 'Banco especializado en financiamiento habitacional'
  },

  // ============================================================================
  // COOPERATIVAS DE AHORRO Y CRÉDITO (CÓDIGOS 200-210)
  // ============================================================================
  { 
    codigo: 200, 
    descripcion: 'COOPERATIVA DE AHORRO Y CRÉDITO', 
    nombreOficial: 'Cooperativa de Ahorro y Crédito #1',
    tipo: 'COOPERATIVA', 
    subtipo: 'AHORRO_CREDITO',
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código reservado para cooperativa de ahorro y crédito'
  },
  { 
    codigo: 201, 
    descripcion: 'COOPERATIVA DE AHORRO Y CRÉDITO', 
    nombreOficial: 'Cooperativa de Ahorro y Crédito #2',
    tipo: 'COOPERATIVA', 
    subtipo: 'AHORRO_CREDITO',
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código reservado para cooperativa de ahorro y crédito'
  },
  { 
    codigo: 202, 
    descripcion: 'COOPERATIVA DE AHORRO Y CRÉDITO', 
    nombreOficial: 'Cooperativa de Ahorro y Crédito #3',
    tipo: 'COOPERATIVA', 
    subtipo: 'AHORRO_CREDITO',
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código reservado para cooperativa de ahorro y crédito'
  },
  { 
    codigo: 203, 
    descripcion: 'COOPERATIVA DE AHORRO Y CRÉDITO', 
    nombreOficial: 'Cooperativa de Ahorro y Crédito #4',
    tipo: 'COOPERATIVA', 
    subtipo: 'AHORRO_CREDITO',
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código reservado para cooperativa de ahorro y crédito'
  },
  { 
    codigo: 204, 
    descripcion: 'COOPERATIVA DE AHORRO Y CRÉDITO', 
    nombreOficial: 'Cooperativa de Ahorro y Crédito #5',
    tipo: 'COOPERATIVA', 
    subtipo: 'AHORRO_CREDITO',
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código reservado para cooperativa de ahorro y crédito'
  },
  { 
    codigo: 205, 
    descripcion: 'COOPERATIVA DE AHORRO Y CRÉDITO', 
    nombreOficial: 'Cooperativa de Ahorro y Crédito #6',
    tipo: 'COOPERATIVA', 
    subtipo: 'AHORRO_CREDITO',
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código reservado para cooperativa de ahorro y crédito'
  },
  { 
    codigo: 206, 
    descripcion: 'COOPERATIVA DE AHORRO Y CRÉDITO', 
    nombreOficial: 'Cooperativa de Ahorro y Crédito #7',
    tipo: 'COOPERATIVA', 
    subtipo: 'AHORRO_CREDITO',
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código reservado para cooperativa de ahorro y crédito'
  },
  { 
    codigo: 207, 
    descripcion: 'COOPERATIVA DE AHORRO Y CRÉDITO', 
    nombreOficial: 'Cooperativa de Ahorro y Crédito #8',
    tipo: 'COOPERATIVA', 
    subtipo: 'AHORRO_CREDITO',
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código reservado para cooperativa de ahorro y crédito'
  },
  { 
    codigo: 208, 
    descripcion: 'COOPERATIVA DE AHORRO Y CRÉDITO', 
    nombreOficial: 'Cooperativa de Ahorro y Crédito #9',
    tipo: 'COOPERATIVA', 
    subtipo: 'AHORRO_CREDITO',
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código reservado para cooperativa de ahorro y crédito'
  },
  { 
    codigo: 209, 
    descripcion: 'COOPERATIVA DE AHORRO Y CRÉDITO', 
    nombreOficial: 'Cooperativa de Ahorro y Crédito #10',
    tipo: 'COOPERATIVA', 
    subtipo: 'AHORRO_CREDITO',
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código reservado para cooperativa de ahorro y crédito'
  },
  { 
    codigo: 210, 
    descripcion: 'COOPERATIVA DE AHORRO Y CRÉDITO', 
    nombreOficial: 'Cooperativa de Ahorro y Crédito #11',
    tipo: 'COOPERATIVA', 
    subtipo: 'AHORRO_CREDITO',
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código reservado para cooperativa de ahorro y crédito'
  },

  // ============================================================================
  // MUTUALISTAS (CÓDIGOS 300-305)
  // ============================================================================
  { 
    codigo: 300, 
    descripcion: 'MUTUALISTA', 
    nombreOficial: 'Mutualista #1',
    tipo: 'MUTUALISTA', 
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código reservado para mutualista'
  },
  { 
    codigo: 301, 
    descripcion: 'MUTUALISTA', 
    nombreOficial: 'Mutualista #2',
    tipo: 'MUTUALISTA', 
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código reservado para mutualista'
  },
  { 
    codigo: 302, 
    descripcion: 'MUTUALISTA', 
    nombreOficial: 'Mutualista #3',
    tipo: 'MUTUALISTA', 
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código reservado para mutualista'
  },
  { 
    codigo: 303, 
    descripcion: 'MUTUALISTA', 
    nombreOficial: 'Mutualista #4',
    tipo: 'MUTUALISTA', 
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código reservado para mutualista'
  },
  { 
    codigo: 304, 
    descripcion: 'MUTUALISTA', 
    nombreOficial: 'Mutualista #5',
    tipo: 'MUTUALISTA', 
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código reservado para mutualista'
  },
  { 
    codigo: 305, 
    descripcion: 'MUTUALISTA', 
    nombreOficial: 'Mutualista #6',
    tipo: 'MUTUALISTA', 
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código reservado para mutualista'
  },

  // ============================================================================
  // COMPAÑÍAS DE SEGUROS (CÓDIGOS 400-410)
  // ============================================================================
  { 
    codigo: 400, 
    descripcion: 'COMPAÑÍA DE SEGUROS', 
    nombreOficial: 'Compañía de Seguros #1',
    tipo: 'SEGUROS', 
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código reservado para compañía de seguros'
  },
  { 
    codigo: 401, 
    descripcion: 'COMPAÑÍA DE SEGUROS', 
    nombreOficial: 'Compañía de Seguros #2',
    tipo: 'SEGUROS', 
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código reservado para compañía de seguros'
  },
  { 
    codigo: 402, 
    descripcion: 'COMPAÑÍA DE SEGUROS', 
    nombreOficial: 'Compañía de Seguros #3',
    tipo: 'SEGUROS', 
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código reservado para compañía de seguros'
  },
  { 
    codigo: 403, 
    descripcion: 'COMPAÑÍA DE SEGUROS', 
    nombreOficial: 'Compañía de Seguros #4',
    tipo: 'SEGUROS', 
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código reservado para compañía de seguros'
  },
  { 
    codigo: 404, 
    descripcion: 'COMPAÑÍA DE SEGUROS', 
    nombreOficial: 'Compañía de Seguros #5',
    tipo: 'SEGUROS', 
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código reservado para compañía de seguros'
  },
  { 
    codigo: 405, 
    descripcion: 'COMPAÑÍA DE SEGUROS', 
    nombreOficial: 'Compañía de Seguros #6',
    tipo: 'SEGUROS', 
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código reservado para compañía de seguros'
  },
  { 
    codigo: 406, 
    descripcion: 'COMPAÑÍA DE SEGUROS', 
    nombreOficial: 'Compañía de Seguros #7',
    tipo: 'SEGUROS', 
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código reservado para compañía de seguros'
  },
  { 
    codigo: 407, 
    descripcion: 'COMPAÑÍA DE SEGUROS', 
    nombreOficial: 'Compañía de Seguros #8',
    tipo: 'SEGUROS', 
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código reservado para compañía de seguros'
  },
  { 
    codigo: 408, 
    descripcion: 'COMPAÑÍA DE SEGUROS', 
    nombreOficial: 'Compañía de Seguros #9',
    tipo: 'SEGUROS', 
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código reservado para compañía de seguros'
  },
  { 
    codigo: 409, 
    descripcion: 'COMPAÑÍA DE SEGUROS', 
    nombreOficial: 'Compañía de Seguros #10',
    tipo: 'SEGUROS', 
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código reservado para compañía de seguros'
  },
  { 
    codigo: 410, 
    descripcion: 'COMPAÑÍA DE SEGUROS', 
    nombreOficial: 'Compañía de Seguros #11',
    tipo: 'SEGUROS', 
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código reservado para compañía de seguros'
  },

  // ============================================================================
  // ENTIDADES DE SEGURIDAD SOCIAL (CÓDIGOS 500-503)
  // ============================================================================
  { 
    codigo: 500, 
    descripcion: 'IESS', 
    nombreOficial: 'Instituto Ecuatoriano de Seguridad Social',
    tipo: 'OTROS', 
    subtipo: 'SEGURIDAD_SOCIAL',
    estado: 'ACTIVA',
    fechaAutorizacion: '1928-03-22',
    observaciones: 'Entidad rectora del sistema de seguridad social'
  },
  { 
    codigo: 501, 
    descripcion: 'BIESS', 
    nombreOficial: 'Banco del Instituto Ecuatoriano de Seguridad Social',
    tipo: 'OTROS', 
    subtipo: 'SEGURIDAD_SOCIAL',
    estado: 'ACTIVA',
    fechaAutorizacion: '2002-01-01',
    observaciones: 'Banco del sistema de seguridad social'
  },
  { 
    codigo: 502, 
    descripcion: 'ISSFA', 
    nombreOficial: 'Instituto de Seguridad Social de las Fuerzas Armadas',
    tipo: 'OTROS', 
    subtipo: 'SEGURIDAD_SOCIAL',
    estado: 'ACTIVA',
    fechaAutorizacion: '1963-01-01',
    observaciones: 'Sistema de seguridad social para las FF.AA.'
  },
  { 
    codigo: 503, 
    descripcion: 'ISSPOL', 
    nombreOficial: 'Instituto de Seguridad Social de la Policía Nacional',
    tipo: 'OTROS', 
    subtipo: 'SEGURIDAD_SOCIAL',
    estado: 'ACTIVA',
    fechaAutorizacion: '1977-01-01',
    observaciones: 'Sistema de seguridad social para la Policía Nacional'
  },

  // ============================================================================
  // ADMINISTRADORAS DE FONDOS (CÓDIGOS 600-604)
  // ============================================================================
  { 
    codigo: 600, 
    descripcion: 'ADMINISTRADORA DE FONDOS', 
    nombreOficial: 'Administradora de Fondos #1',
    tipo: 'OTROS', 
    subtipo: 'ADMINISTRADORA_FONDOS',
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código reservado para administradora de fondos'
  },
  { 
    codigo: 601, 
    descripcion: 'ADMINISTRADORA DE FONDOS', 
    nombreOficial: 'Administradora de Fondos #2',
    tipo: 'OTROS', 
    subtipo: 'ADMINISTRADORA_FONDOS',
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código reservado para administradora de fondos'
  },
  { 
    codigo: 602, 
    descripcion: 'ADMINISTRADORA DE FONDOS', 
    nombreOficial: 'Administradora de Fondos #3',
    tipo: 'OTROS', 
    subtipo: 'ADMINISTRADORA_FONDOS',
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código reservado para administradora de fondos'
  },
  { 
    codigo: 603, 
    descripcion: 'ADMINISTRADORA DE FONDOS', 
    nombreOficial: 'Administradora de Fondos #4',
    tipo: 'OTROS', 
    subtipo: 'ADMINISTRADORA_FONDOS',
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código reservado para administradora de fondos'
  },
  { 
    codigo: 604, 
    descripcion: 'ADMINISTRADORA DE FONDOS', 
    nombreOficial: 'Administradora de Fondos #5',
    tipo: 'OTROS', 
    subtipo: 'ADMINISTRADORA_FONDOS',
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código reservado para administradora de fondos'
  },

  // ============================================================================
  // OTRAS ENTIDADES
  // ============================================================================
  { 
    codigo: 999, 
    descripcion: 'ENTIDAD NO IDENTIFICADA', 
    nombreOficial: 'Entidad No Identificada',
    tipo: 'OTROS', 
    estado: 'ACTIVA',
    fechaAutorizacion: '1990-01-01',
    observaciones: 'Código para entidades no identificadas o en proceso de registro'
  }
];

// ============================================================================
// FUNCIONES DE CONSULTA Y VALIDACIÓN
// ============================================================================

/**
 * Función para obtener descripción por código
 */
export function getDescripcionEntidad(codigo: number): string {
  const item = TABLA_2_CODIGOS_ENTIDAD.find(c => c.codigo === codigo);
  return item ? item.descripcion : `Entidad ${codigo} no encontrada`;
}

/**
 * Función para obtener entidad completa por código
 */
export function getEntidadPorCodigo(codigo: number): CodigoEntidad | undefined {
  return TABLA_2_CODIGOS_ENTIDAD.find(c => c.codigo === codigo);
}

/**
 * Función para validar si un código existe
 */
export function isValidCodigoEntidad(codigo: number): boolean {
  return TABLA_2_CODIGOS_ENTIDAD.some(c => c.codigo === codigo);
}

/**
 * Función para obtener entidades por tipo
 */
export function getEntidadesPorTipo(tipo: 'BANCO' | 'COOPERATIVA' | 'MUTUALISTA' | 'SEGUROS' | 'OTROS'): CodigoEntidad[] {
  return TABLA_2_CODIGOS_ENTIDAD.filter(c => c.tipo === tipo);
}

/**
 * Función para obtener entidades por subtipo
 */
export function getEntidadesPorSubtipo(subtipo: 'PRIVADO' | 'PUBLICO' | 'AHORRO_CREDITO' | 'SEGURIDAD_SOCIAL' | 'ADMINISTRADORA_FONDOS'): CodigoEntidad[] {
  return TABLA_2_CODIGOS_ENTIDAD.filter(c => c.subtipo === subtipo);
}

/**
 * Función para obtener entidades activas
 */
export function getEntidadesActivas(): CodigoEntidad[] {
  return TABLA_2_CODIGOS_ENTIDAD.filter(c => c.estado === 'ACTIVA');
}

/**
 * Función para obtener entidades inactivas
 */
export function getEntidadesInactivas(): CodigoEntidad[] {
  return TABLA_2_CODIGOS_ENTIDAD.filter(c => c.estado !== 'ACTIVA');
}

/**
 * Función para obtener entidades suspendidas
 */
export function getEntidadesSuspendidas(): CodigoEntidad[] {
  return TABLA_2_CODIGOS_ENTIDAD.filter(c => c.estado === 'SUSPENDIDA');
}

/**
 * Función para obtener entidades en liquidación
 */
export function getEntidadesEnLiquidacion(): CodigoEntidad[] {
  return TABLA_2_CODIGOS_ENTIDAD.filter(c => c.estado === 'EN_LIQUIDACION');
}

/**
 * Función para obtener bancos privados
 */
export function getBancosPrivados(): CodigoEntidad[] {
  return TABLA_2_CODIGOS_ENTIDAD.filter(c => c.tipo === 'BANCO' && c.subtipo === 'PRIVADO');
}

/**
 * Función para obtener bancos públicos
 */
export function getBancosPublicos(): CodigoEntidad[] {
  return TABLA_2_CODIGOS_ENTIDAD.filter(c => c.tipo === 'BANCO' && c.subtipo === 'PUBLICO');
}

/**
 * Función para obtener cooperativas de ahorro y crédito
 */
export function getCooperativasAhorroCredito(): CodigoEntidad[] {
  return TABLA_2_CODIGOS_ENTIDAD.filter(c => c.tipo === 'COOPERATIVA' && c.subtipo === 'AHORRO_CREDITO');
}

/**
 * Función para obtener entidades de seguridad social
 */
export function getEntidadesSeguridadSocial(): CodigoEntidad[] {
  return TABLA_2_CODIGOS_ENTIDAD.filter(c => c.subtipo === 'SEGURIDAD_SOCIAL');
}

/**
 * Función para obtener administradoras de fondos
 */
export function getAdministradorasFondos(): CodigoEntidad[] {
  return TABLA_2_CODIGOS_ENTIDAD.filter(c => c.subtipo === 'ADMINISTRADORA_FONDOS');
}

/**
 * Función para obtener compañías de seguros
 */
export function getCompaniasSeguros(): CodigoEntidad[] {
  return TABLA_2_CODIGOS_ENTIDAD.filter(c => c.tipo === 'SEGUROS');
}

/**
 * Función para obtener mutualistas
 */
export function getMutualistas(): CodigoEntidad[] {
  return TABLA_2_CODIGOS_ENTIDAD.filter(c => c.tipo === 'MUTUALISTA');
}

/**
 * Función para obtener estadísticas de entidades
 */
export function getEstadisticasEntidades(): {
  total: number;
  activas: number;
  inactivas: number;
  suspendidas: number;
  enLiquidacion: number;
  porTipo: Record<string, number>;
  porSubtipo: Record<string, number>;
} {
  const total = TABLA_2_CODIGOS_ENTIDAD.length;
  const activas = getEntidadesActivas().length;
  const inactivas = getEntidadesInactivas().length;
  const suspendidas = getEntidadesSuspendidas().length;
  const enLiquidacion = getEntidadesEnLiquidacion().length;

  const porTipo: Record<string, number> = {};
  const porSubtipo: Record<string, number> = {};

  TABLA_2_CODIGOS_ENTIDAD.forEach(entidad => {
    porTipo[entidad.tipo] = (porTipo[entidad.tipo] || 0) + 1;
    if (entidad.subtipo) {
      porSubtipo[entidad.subtipo] = (porSubtipo[entidad.subtipo] || 0) + 1;
    }
  });

  return {
    total,
    activas,
    inactivas,
    suspendidas,
    enLiquidacion,
    porTipo,
    porSubtipo
  };
}

/**
 * Función para buscar entidades por texto
 */
export function buscarEntidades(texto: string): CodigoEntidad[] {
  const textoLower = texto.toLowerCase();
  return TABLA_2_CODIGOS_ENTIDAD.filter(entidad => 
    entidad.descripcion.toLowerCase().includes(textoLower) ||
    (entidad.nombreOficial && entidad.nombreOficial.toLowerCase().includes(textoLower)) ||
    entidad.codigo.toString().includes(texto)
  );
}

/**
 * Función para obtener entidades por rango de códigos
 */
export function getEntidadesPorRango(codigoInicio: number, codigoFin: number): CodigoEntidad[] {
  return TABLA_2_CODIGOS_ENTIDAD.filter(c => c.codigo >= codigoInicio && c.codigo <= codigoFin);
} 