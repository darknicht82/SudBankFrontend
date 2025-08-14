/**
 * Configuración de entorno para SudBank Frontend
 * Código Banco: 1038 - Banco Sudamericano
 */

export const environment = {
  production: false,
  
  // ==========================================
  // CONFIGURACIÓN SWITCH MOCK/REAL
  // ==========================================
  useMockData: false, // SWITCH PRINCIPAL - true para desarrollo, false para producción
  enableDirectRVCSend: false, // SWITCH envío RVC - false en desarrollo para evitar transmisiones reales
  
  // ==========================================
  // CONFIGURACIÓN BANCO SUDAMERICANO
  // ==========================================
  codigoBanco: '1038',
  nombreBanco: 'Banco Sudamericano',
  
  // ==========================================
  // ENDPOINTS DE SERVICIOS
  // ==========================================
  backendEndpoint: 'http://192.168.10.4:5000/api/v1', // Endpoint con versión v1
  rvcEndpoint: 'https://appweb.superbancos.gob.ec/rvc',
  
  // ==========================================
  // CONFIGURACIÓN L01
  // ==========================================
  l01Config: {
    estructura: 'L01',
    periodicidad: 'E', // Eventual
    plazoEntrega: 3, // días hábiles
    formatoArchivo: 'L01E1038ddmmaaaa.txt'
  },
  
  // ==========================================
  // CONFIGURACIÓN APIs
  // ==========================================
  apis: {
    nesl01: '/nesl01',
    catalogs: '/catalogs',
    rvc: {
      upload: '/upload',
      bitacora: '/bitacora',
      validacion: '/validacion'
    }
  },
  
  // ==========================================
  // CONFIGURACIÓN TABLAS CATÁLOGOS
  // ==========================================
  tablas: {
    t4: 'Tipos de Identificación',
    t73: 'Tipos de Emisor/Custodio/Depositario',
    t164: 'Códigos Extranjeros',
    t173: 'Clasificaciones'
  },
  
  // ==========================================
  // CONFIGURACIÓN DESARROLLO
  // ==========================================
  debug: {
    enableLogs: true,
    showMockWarnings: true,
    enableDevTools: true
  },
  
  // ==========================================
  // CONFIGURACIÓN TIMEOUTS
  // ==========================================
  timeouts: {
    apiRequest: 30000, // 30 segundos
    rvcUpload: 120000, // 2 minutos
    fileGeneration: 10000 // 10 segundos
  }
};
