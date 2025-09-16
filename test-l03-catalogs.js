const http = require('http');

const catalogs = [
  't4', 't164', 't70', 't67', 't68', 't69', 't65', 't169', 't66', 't79'
];

const baseUrl = 'http://localhost:8080';

async function testCatalog(catalogName) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 8080,
      path: `/catalogs/${catalogName}`,
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({
            catalog: catalogName,
            status: res.statusCode,
            count: Array.isArray(jsonData) ? jsonData.length : 0,
            data: jsonData
          });
        } catch (error) {
          resolve({
            catalog: catalogName,
            status: res.statusCode,
            error: 'Error parsing JSON',
            rawData: data.substring(0, 200)
          });
        }
      });
    });

    req.on('error', (error) => {
      resolve({
        catalog: catalogName,
        status: 'ERROR',
        error: error.message
      });
    });

    req.setTimeout(5000, () => {
      req.destroy();
      resolve({
        catalog: catalogName,
        status: 'TIMEOUT',
        error: 'Request timeout'
      });
    });

    req.end();
  });
}

async function testAllCatalogs() {
  console.log('🔍 Probando catálogos L03...\n');
  
  for (const catalog of catalogs) {
    const result = await testCatalog(catalog);
    console.log(`📋 ${catalog.toUpperCase()}:`);
    console.log(`   Status: ${result.status}`);
    console.log(`   Count: ${result.count || 'N/A'}`);
    if (result.error) {
      console.log(`   Error: ${result.error}`);
    }
    if (result.data && Array.isArray(result.data) && result.data.length > 0) {
      console.log(`   Sample: ${JSON.stringify(result.data[0])}`);
    }
    console.log('');
  }
}

testAllCatalogs().catch(console.error);
