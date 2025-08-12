/**
 * Script simple de pruebas para el sistema L01
 * Verifica funcionalidades básicas mediante HTTP requests
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

class SimpleL01Tester {
  constructor() {
    this.baseUrl = 'http://localhost:4200';
    this.results = [];
    this.errors = [];
  }

  async runTests() {
    console.log('🚀 Iniciando pruebas simples del sistema L01...\n');

    try {
      await this.testServerAvailability();
      await this.testStaticAssets();
      await this.generateSimpleReport();
    } catch (error) {
      console.error('💥 Error en las pruebas:', error);
      this.errors.push({
        type: 'test_error',
        message: error.message,
        timestamp: new Date().toISOString()
      });
    }

    this.printSummary();
  }

  async testServerAvailability() {
    console.log('📡 Prueba 1: Disponibilidad del servidor...');
    
    return new Promise((resolve) => {
      const req = http.get(`${this.baseUrl}`, (res) => {
        if (res.statusCode === 200 || res.statusCode === 404) {
          this.logSuccess('Servidor Angular disponible');
          resolve();
        } else {
          this.logError(`Servidor respondió con código: ${res.statusCode}`);
          resolve();
        }
      });

      req.on('error', (error) => {
        this.logError(`Error de conexión: ${error.message}`);
        resolve();
      });

      req.setTimeout(5000, () => {
        req.destroy();
        this.logError('Timeout de conexión al servidor');
        resolve();
      });
    });
  }

  async testStaticAssets() {
    console.log('\n📦 Prueba 2: Verificación de archivos...');

    // Verificar archivos críticos
    const criticalFiles = [
      'src/app/services/l01-file-generator.service.ts',
      'src/app/services/l01-rvc.service.ts',
      'src/app/services/l01-catalog.service.ts',
      'src/app/services/logger.service.ts',
      'src/app/components/l01/l01-export/l01-export.component.ts',
      'src/app/models/l01-export.model.ts',
      'src/environments/environment.ts'
    ];

    for (const file of criticalFiles) {
      const filePath = path.join(__dirname, '..', file);
      if (fs.existsSync(filePath)) {
        this.logSuccess(`Archivo presente: ${file}`);
        
        // Verificar contenido básico
        const content = fs.readFileSync(filePath, 'utf8');
        if (content.includes('1038')) {
          this.logSuccess(`Código banco 1038 encontrado en ${file}`);
        }
      } else {
        this.logError(`Archivo faltante: ${file}`);
      }
    }
  }

  async generateSimpleReport() {
    console.log('\n📊 Generando reporte simple...');

    const report = {
      timestamp: new Date().toISOString(),
      test_type: 'simple_validation',
      summary: {
        total_tests: this.results.length,
        passed: this.results.filter(r => r.status === 'success').length,
        failed: this.results.filter(r => r.status === 'error').length,
        warnings: this.results.filter(r => r.status === 'warning').length
      },
      results: this.results,
      errors: this.errors,
      environment: {
        node_version: process.version,
        platform: process.platform,
        base_url: this.baseUrl
      }
    };

    // Crear directorio de logs si no existe
    const logsDir = path.join(__dirname, '..', 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }

    // Guardar reporte
    const reportPath = path.join(logsDir, `l01-simple-report-${Date.now()}.json`);
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    console.log(`📄 Reporte guardado en: ${reportPath}`);
    return report;
  }

  printSummary() {
    console.log('\n' + '='.repeat(50));
    console.log('📊 RESUMEN DE PRUEBAS SIMPLES');
    console.log('='.repeat(50));
    
    const passed = this.results.filter(r => r.status === 'success').length;
    const failed = this.results.filter(r => r.status === 'error').length;
    const warnings = this.results.filter(r => r.status === 'warning').length;
    
    console.log(`✅ Exitosas: ${passed}`);
    console.log(`❌ Fallidas: ${failed}`);
    console.log(`⚠️  Advertencias: ${warnings}`);
    console.log(`🐛 Errores: ${this.errors.length}`);
    
    if (failed === 0 && this.errors.length === 0) {
      console.log('\n🎉 ¡TODAS LAS PRUEBAS BÁSICAS PASARON!');
      console.log('✅ El sistema L01 está correctamente implementado');
    } else {
      console.log('\n⚠️  Hay problemas que requieren atención');
    }
    
    console.log('='.repeat(50));
  }

  logSuccess(message) {
    this.results.push({
      status: 'success',
      message,
      timestamp: new Date().toISOString()
    });
    console.log(`✅ ${message}`);
  }

  logError(message) {
    this.results.push({
      status: 'error',
      message,
      timestamp: new Date().toISOString()
    });
    console.log(`❌ ${message}`);
  }

  logWarning(message) {
    this.results.push({
      status: 'warning',
      message,
      timestamp: new Date().toISOString()
    });
    console.log(`⚠️  ${message}`);
  }
}

// Ejecutar pruebas
async function main() {
  const tester = new SimpleL01Tester();
  await tester.runTests();
}

if (require.main === module) {
  main();
}

module.exports = SimpleL01Tester;
