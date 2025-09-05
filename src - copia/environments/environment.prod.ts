/**
 * Configuración de entorno PRODUCCIÓN para SudBank Frontend
 * Código Banco: 1038 - Banco Sudamericano
 */

export const environment = {
  production: true,
  
  // ==========================================
  // CONFIGURACIÓN SWITCH MOCK/REAL
  // ==========================================
  useMockData: false, // SIEMPRE false en producción
  enableDirectRVCSend: true, // SIEMPRE true en producción
  
  // ==========================================
  // CONFIGURACIÓN BANCO SUDAMERICANO
  // ==========================================
  codigoBanco: '1038',
  nombreBanco: 'Banco Sudamericano',
  
  // ==========================================
  // ENDPOINTS DE SERVICIOS PRODUCCIÓN
  // ==========================================
  backendEndpoint: 'https://api.sudbank.com/api', // URL producción
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
  // CONFIGURACIÓN PRODUCCIÓN
  // ==========================================
  debug: {
    enableLogs: false,
    showMockWarnings: false,
    enableDevTools: false
  },
  
  // ==========================================
  // CONFIGURACIÓN TIMEOUTS
  // ==========================================
  timeouts: {
    apiRequest: 30000, // 30 segundos
    rvcUpload: 300000, // 5 minutos en producción
    fileGeneration: 15000 // 15 segundos
  }
};
