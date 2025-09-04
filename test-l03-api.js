/**
 * SCRIPT DE PRUEBA PARA VERIFICAR CONEXIÓN API L03
 * Ejecutar con: node test-l03-api.js
 */

const http = require('http');

const API_BASE = 'http://192.168.10.4:5000/api';

function testEndpoint(endpoint, description) {
  return new Promise((resolve, reject) => {
    const url = `${API_BASE}${endpoint}`;
    console.log(`\n🔍 Probando: ${description}`);
    console.log(`📡 URL: ${url}`);
    
    const req = http.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log(`✅ Status: ${res.statusCode}`);
        console.log(`📊 Content-Type: ${res.headers['content-type']}`);
        console.log(`📏 Tamaño respuesta: ${data.length} bytes`);
        
        if (res.statusCode === 200) {
          try {
            const jsonData = JSON.parse(data);
            console.log(`📋 Tipo de datos: ${Array.isArray(jsonData) ? 'Array' : 'Object'}`);
            if (Array.isArray(jsonData)) {
              console.log(`📊 Cantidad de registros: ${jsonData.length}`);
              if (jsonData.length > 0) {
                console.log(`🔍 Primer registro:`, JSON.stringify(jsonData[0], null, 2));
              }
            } else {
              console.log(`🔍 Datos:`, JSON.stringify(jsonData, null, 2));
            }
            resolve({ success: true, data: jsonData });
          } catch (e) {
            console.log(`⚠️ Respuesta no es JSON válido:`, data.substring(0, 200));
            resolve({ success: false, error: 'Invalid JSON' });
          }
        } else {
          console.log(`❌ Error HTTP: ${res.statusCode}`);
          console.log(`📄 Respuesta:`, data.substring(0, 200));
          resolve({ success: false, error: `HTTP ${res.statusCode}` });
        }
      });
    });
    
    req.on('error', (error) => {
      console.log(`❌ Error de conexión: ${error.message}`);
      resolve({ success: false, error: error.message });
    });
    
    req.setTimeout(10000, () => {
      console.log(`⏰ Timeout después de 10 segundos`);
      req.destroy();
      resolve({ success: false, error: 'Timeout' });
    });
  });
}

async function runTests() {
  console.log('🚀 INICIANDO PRUEBAS DE CONEXIÓN API L03');
  console.log('=' .repeat(50));
  
  const tests = [
    { endpoint: '/structures/l03/details', description: 'L03 Details (endpoint principal)' },
    { endpoint: '/structures/l03', description: 'L03 Base (endpoint alternativo)' },
    { endpoint: '/structures/L03/details', description: 'L03 Details (mayúscula)' },
    { endpoint: '/structures/L03', description: 'L03 Base (mayúscula)' },
    { endpoint: '/catalogs/t70', description: 'Tabla 70 - Estados de Título' },
    { endpoint: '/catalogs/t67', description: 'Tabla 67 - Categorías de Inversión' },
    { endpoint: '/catalogs/t68', description: 'Tabla 68 - Rangos de Vencimiento' },
    { endpoint: '/catalogs/t69', description: 'Tabla 69 - Fuentes de Información de Mercado' },
    { endpoint: '/catalogs/t65', description: 'Tabla 65 - Calificaciones de Riesgo' },
    { endpoint: '/catalogs/t169', description: 'Tabla 169 - Categorías de Calificación' },
    { endpoint: '/catalogs/t66', description: 'Tabla 66 - Calificadoras de Riesgo' },
    { endpoint: '/catalogs/t79', description: 'Tabla 79 - Fondos de Inversión' }
  ];
  
  const results = [];
  
  for (const test of tests) {
    const result = await testEndpoint(test.endpoint, test.description);
    results.push({ ...test, ...result });
  }
  
  console.log('\n' + '=' .repeat(50));
  console.log('📊 RESUMEN DE RESULTADOS:');
  console.log('=' .repeat(50));
  
  results.forEach(result => {
    const status = result.success ? '✅' : '❌';
    console.log(`${status} ${result.description}: ${result.success ? 'OK' : result.error}`);
  });
  
  const successCount = results.filter(r => r.success).length;
  console.log(`\n🎯 Total: ${successCount}/${results.length} endpoints funcionando`);
  
  if (successCount === 0) {
    console.log('\n⚠️ PROBLEMA: Ningún endpoint está respondiendo');
    console.log('🔧 Posibles causas:');
    console.log('   - Backend no está ejecutándose en 192.168.10.4:5000');
    console.log('   - Firewall bloqueando la conexión');
    console.log('   - URL incorrecta');
  } else if (successCount < results.length) {
    console.log('\n⚠️ PROBLEMA: Algunos endpoints no funcionan');
    console.log('🔧 Revisar endpoints específicos que fallan');
  } else {
    console.log('\n🎉 ¡TODOS LOS ENDPOINTS FUNCIONAN CORRECTAMENTE!');
  }
}

runTests().catch(console.error);
