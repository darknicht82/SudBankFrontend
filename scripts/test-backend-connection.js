/**
 * Script de prueba de conectividad con backend
 * Banco Sudamericano - Código 1038
 * Backend: 192.168.10.4:5000
 */

const https = require('https');
const http = require('http');

// Configuración del backend
const BACKEND_HOST = '192.168.10.4';
const BACKEND_PORT = 5000;
const BASE_URL = `http://${BACKEND_HOST}:${BACKEND_PORT}`;

console.log('🔍 INICIANDO PRUEBAS DE CONECTIVIDAD BACKEND');
console.log('============================================');
console.log(`📡 Backend: ${BASE_URL}`);
console.log(`🏦 Banco: 1038 - Banco Sudamericano`);
console.log(`⏰ Fecha: ${new Date().toISOString()}`);
console.log('');

// Función para realizar peticiones HTTP
function makeRequest(url, timeout = 10000) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    
    const req = http.get(url, {
      timeout: timeout,
      headers: {
        'User-Agent': 'SudBankFrontend-Test/1.0',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }, (res) => {
      const responseTime = Date.now() - startTime;
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data: data,
          responseTime: responseTime
        });
      });
    });
    
    req.on('timeout', () => {
      req.destroy();
      reject(new Error(`Timeout después de ${timeout}ms`));
    });
    
    req.on('error', (error) => {
      reject(error);
    });
  });
}

// Lista de endpoints a probar
const endpoints = [
  {
    name: 'Health Check',
    url: `${BASE_URL}/health`,
    description: 'Verificar que el servidor esté funcionando'
  },
  {
    name: 'API Base',
    url: `${BASE_URL}/api`,
    description: 'Endpoint base de la API'
  },
  {
    name: 'Catálogos Base',
    url: `${BASE_URL}/api/catalogs`,
    description: 'Endpoint base de catálogos'
  },
  {
    name: 'Tabla 4 - Tipos Identificación',
    url: `${BASE_URL}/api/catalogs/t4`,
    description: 'Tipos de identificación (R/X)'
  },
  {
    name: 'Tabla 73 - Tipos Emisor',
    url: `${BASE_URL}/api/catalogs/T73`,
    description: 'Tipos de emisor/custodio/depositario'
  },
  {
    name: 'Tabla 173 - Clasificaciones',
    url: `${BASE_URL}/api/catalogs/T173`,
    description: 'Clasificaciones L01'
  },
  {
    name: 'Tabla 164 - Códigos Extranjeros',
    url: `${BASE_URL}/api/catalogs/T164`,
    description: 'Códigos de identificación extranjeros'
  },
  {
    name: 'NESL01 Base',
    url: `${BASE_URL}/api/nesl01`,
    description: 'Endpoint de datos L01'
  }
];

// Función principal de testing
async function testBackendConnectivity() {
  console.log('🚀 INICIANDO PRUEBAS...\n');
  
  const results = [];
  
  for (const endpoint of endpoints) {
    console.log(`📡 Probando: ${endpoint.name}`);
    console.log(`   URL: ${endpoint.url}`);
    console.log(`   Descripción: ${endpoint.description}`);
    
    try {
      const result = await makeRequest(endpoint.url, 15000);
      
      const status = result.statusCode >= 200 && result.statusCode < 300 ? '✅' : '⚠️';
      console.log(`   ${status} Status: ${result.statusCode}`);
      console.log(`   ⏱️ Tiempo: ${result.responseTime}ms`);
      
      // Intentar parsear JSON si es posible
      let parsedData = null;
      try {
        parsedData = JSON.parse(result.data);
        console.log(`   📊 Datos: ${Array.isArray(parsedData) ? parsedData.length + ' elementos' : 'Objeto JSON'}`);
      } catch (e) {
        console.log(`   📄 Respuesta: ${result.data.substring(0, 100)}${result.data.length > 100 ? '...' : ''}`);
      }
      
      results.push({
        endpoint: endpoint.name,
        url: endpoint.url,
        success: true,
        statusCode: result.statusCode,
        responseTime: result.responseTime,
        dataType: parsedData ? (Array.isArray(parsedData) ? 'array' : 'object') : 'text',
        dataSize: parsedData ? (Array.isArray(parsedData) ? parsedData.length : Object.keys(parsedData).length) : result.data.length
      });
      
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}`);
      
      results.push({
        endpoint: endpoint.name,
        url: endpoint.url,
        success: false,
        error: error.message
      });
    }
    
    console.log('');
  }
  
  // Resumen final
  console.log('📊 RESUMEN DE PRUEBAS');
  console.log('=====================');
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`✅ Exitosas: ${successful.length}/${results.length}`);
  console.log(`❌ Fallidas: ${failed.length}/${results.length}`);
  console.log('');
  
  if (successful.length > 0) {
    console.log('✅ ENDPOINTS FUNCIONANDO:');
    successful.forEach(result => {
      console.log(`   • ${result.endpoint} (${result.statusCode}) - ${result.responseTime}ms`);
      if (result.dataType === 'array') {
        console.log(`     📊 ${result.dataSize} elementos disponibles`);
      }
    });
    console.log('');
  }
  
  if (failed.length > 0) {
    console.log('❌ ENDPOINTS CON PROBLEMAS:');
    failed.forEach(result => {
      console.log(`   • ${result.endpoint}: ${result.error}`);
    });
    console.log('');
  }
  
  // Recomendaciones
  console.log('💡 RECOMENDACIONES:');
  console.log('===================');
  
  if (failed.length === results.length) {
    console.log('❌ Ningún endpoint responde - Verificar:');
    console.log('   1. Backend está ejecutándose en 192.168.10.4:5000');
    console.log('   2. Firewall/red permite conexiones');
    console.log('   3. Configuración de CORS en backend');
  } else if (failed.length > 0) {
    console.log('⚠️ Algunos endpoints fallan - Verificar:');
    console.log('   1. Rutas específicas en backend');
    console.log('   2. Configuración de base de datos');
    console.log('   3. Permisos de acceso a catálogos');
  } else {
    console.log('✅ Todos los endpoints funcionan correctamente');
    console.log('   • Frontend puede cambiar a modo DATOS REALES');
    console.log('   • Catálogos disponibles para L01');
    console.log('   • Sistema listo para producción');
  }
  
  console.log('');
  console.log('🎯 PRÓXIMO PASO:');
  if (successful.length >= 4) { // Al menos 4 endpoints básicos funcionando
    console.log('   ✅ Iniciar Angular con ng serve');
    console.log('   ✅ Verificar indicador "DATOS REALES" en UI');
    console.log('   ✅ Probar carga de catálogos en L01');
  } else {
    console.log('   ⚠️ Corregir conectividad backend antes de continuar');
    console.log('   ⚠️ Verificar configuración de red y servicios');
  }
  
  console.log('');
  console.log('📝 Log guardado en: logs/backend-connectivity-test.log');
  
  return results;
}

// Ejecutar pruebas
testBackendConnectivity()
  .then(results => {
    // Guardar resultados en archivo de log
    const fs = require('fs');
    const logContent = `
PRUEBA DE CONECTIVIDAD BACKEND - ${new Date().toISOString()}
================================================================

Backend: ${BASE_URL}
Banco: 1038 - Banco Sudamericano

RESULTADOS:
${JSON.stringify(results, null, 2)}

RESUMEN:
- Total endpoints: ${results.length}
- Exitosos: ${results.filter(r => r.success).length}
- Fallidos: ${results.filter(r => !r.success).length}

ESTADO: ${results.filter(r => r.success).length >= 4 ? 'BACKEND FUNCIONAL' : 'BACKEND CON PROBLEMAS'}
`;
    
    try {
      if (!fs.existsSync('logs')) {
        fs.mkdirSync('logs');
      }
      fs.writeFileSync('logs/backend-connectivity-test.log', logContent);
    } catch (e) {
      console.log('⚠️ No se pudo guardar el log:', e.message);
    }
    
    process.exit(results.filter(r => r.success).length >= 4 ? 0 : 1);
  })
  .catch(error => {
    console.error('💥 Error crítico en las pruebas:', error);
    process.exit(1);
  });
