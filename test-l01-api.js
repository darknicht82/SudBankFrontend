/**
 * SCRIPT DE PRUEBA PARA VERIFICAR CONEXIÓN API L01
 * Ejecutar con: node test-l01-api.js
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
  console.log('🚀 INICIANDO PRUEBAS DE CONEXIÓN API L01');
  console.log('=' .repeat(50));
  
  const tests = [
    { endpoint: '/structures/l01/resume', description: 'L01 Resume (endpoint principal)' },
    { endpoint: '/structures/l01', description: 'L01 Base (endpoint alternativo)' },
    { endpoint: '/catalogs/t4', description: 'Tabla 4 - Tipos de Identificación' },
    { endpoint: '/catalogs/t73', description: 'Tabla 73 - Tipos de Emisor' },
    { endpoint: '/catalogs/t173', description: 'Tabla 173 - Clasificaciones' },
    { endpoint: '/catalogs/t164', description: 'Tabla 164 - Códigos Extranjeros' }
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
