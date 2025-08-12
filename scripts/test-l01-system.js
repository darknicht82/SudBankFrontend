/**
 * Script de pruebas automatizadas para el sistema L01
 * Valida funcionalidades críticas implementadas
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

class L01SystemTester {
  constructor() {
    this.browser = null;
    this.page = null;
    this.testResults = [];
    this.errors = [];
    this.baseUrl = 'http://localhost:4200';
  }

  async init() {
    console.log('🚀 Iniciando pruebas del sistema L01...');
    
    try {
      this.browser = await puppeteer.launch({
        headless: false, // Mostrar navegador para ver las pruebas
        slowMo: 500, // Ralentizar para mejor visualización
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      
      this.page = await this.browser.newPage();
      
      // Configurar viewport
      await this.page.setViewport({ width: 1920, height: 1080 });
      
      // Capturar errores de consola
      this.page.on('console', msg => {
        if (msg.type() === 'error') {
          this.errors.push({
            type: 'console_error',
            message: msg.text(),
            timestamp: new Date().toISOString()
          });
        }
      });
      
      // Capturar errores de red
      this.page.on('requestfailed', request => {
        this.errors.push({
          type: 'network_error',
          url: request.url(),
          failure: request.failure().errorText,
          timestamp: new Date().toISOString()
        });
      });
      
      console.log('✅ Navegador inicializado correctamente');
      
    } catch (error) {
      console.error('❌ Error al inicializar navegador:', error);
      throw error;
    }
  }

  async runAllTests() {
    try {
      await this.testPageLoad();
      await this.testComponentsLoad();
      await this.testDataGeneration();
      await this.testExportFunctionality();
      await this.testLogMonitor();
      await this.testValidations();
      await this.generateReport();
      
    } catch (error) {
      console.error('❌ Error durante las pruebas:', error);
      this.errors.push({
        type: 'test_error',
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
      });
    } finally {
      await this.cleanup();
    }
  }

  async testPageLoad() {
    console.log('\n📄 Prueba 1: Carga de página principal...');
    
    try {
      const response = await this.page.goto(`${this.baseUrl}/l01-dashboard/l01-main`, {
        waitUntil: 'networkidle2',
        timeout: 30000
      });
      
      if (response.status() === 200) {
        this.logSuccess('Página cargada correctamente');
        
        // Verificar título
        const title = await this.page.title();
        if (title.includes('SudBank') || title.includes('L01')) {
          this.logSuccess('Título de página correcto');
        } else {
          this.logWarning(`Título inesperado: ${title}`);
        }
        
      } else {
        this.logError(`Error de carga: Status ${response.status()}`);
      }
      
    } catch (error) {
      this.logError(`Error al cargar página: ${error.message}`);
    }
  }

  async testComponentsLoad() {
    console.log('\n🧩 Prueba 2: Carga de componentes...');
    
    try {
      // Esperar a que aparezca el componente principal
      await this.page.waitForSelector('.l01-main-container', { timeout: 10000 });
      this.logSuccess('Componente principal L01 cargado');
      
      // Verificar componente de exportación
      const exportComponent = await this.page.$('app-l01-export');
      if (exportComponent) {
        this.logSuccess('Componente de exportación presente');
      } else {
        this.logWarning('Componente de exportación no encontrado');
      }
      
      // Verificar monitor de logs
      const logMonitor = await this.page.$('app-log-monitor');
      if (logMonitor) {
        this.logSuccess('Monitor de logs presente');
      } else {
        this.logInfo('Monitor de logs no visible (normal en producción)');
      }
      
    } catch (error) {
      this.logError(`Error al verificar componentes: ${error.message}`);
    }
  }

  async testDataGeneration() {
    console.log('\n📊 Prueba 3: Generación de datos...');
    
    try {
      // Esperar a que se carguen los datos
      await this.page.waitForSelector('.data-table', { timeout: 10000 });
      
      // Verificar que hay filas de datos
      const rows = await this.page.$$('.data-table tbody tr');
      if (rows.length > 0) {
        this.logSuccess(`Datos generados: ${rows.length} registros`);
        
        // Verificar estructura de datos
        const firstRowCells = await this.page.$$eval('.data-table tbody tr:first-child td', 
          cells => cells.map(cell => cell.textContent.trim()));
        
        if (firstRowCells.length >= 4) {
          this.logSuccess('Estructura de datos correcta (4+ campos)');
        } else {
          this.logWarning(`Estructura incompleta: ${firstRowCells.length} campos`);
        }
        
      } else {
        this.logError('No se generaron datos');
      }
      
    } catch (error) {
      this.logError(`Error al verificar datos: ${error.message}`);
    }
  }

  async testExportFunctionality() {
    console.log('\n💾 Prueba 4: Funcionalidad de exportación...');
    
    try {
      // Buscar botones de exportación
      const downloadBtn = await this.page.$('button:contains("Descargar")');
      const rvcBtn = await this.page.$('button:contains("Enviar a RVC")');
      
      if (downloadBtn) {
        this.logSuccess('Botón de descarga encontrado');
        
        // Intentar hacer click (sin descargar realmente)
        const isEnabled = await this.page.$eval('button:contains("Descargar")', 
          btn => !btn.disabled);
        
        if (isEnabled) {
          this.logSuccess('Botón de descarga habilitado');
        } else {
          this.logWarning('Botón de descarga deshabilitado');
        }
      } else {
        this.logError('Botón de descarga no encontrado');
      }
      
      if (rvcBtn) {
        this.logSuccess('Botón de envío RVC encontrado');
      } else {
        this.logError('Botón de envío RVC no encontrado');
      }
      
    } catch (error) {
      this.logError(`Error al verificar exportación: ${error.message}`);
    }
  }

  async testLogMonitor() {
    console.log('\n📋 Prueba 5: Monitor de logs...');
    
    try {
      // Buscar controles de debug
      const debugControls = await this.page.$('.debug-controls');
      
      if (debugControls) {
        this.logSuccess('Controles de debug encontrados');
        
        // Probar botón de error simulado
        const errorBtn = await this.page.$('button:contains("Simular Error")');
        if (errorBtn) {
          await errorBtn.click();
          this.logSuccess('Botón de error simulado funcional');
          
          // Esperar un momento para que se registre el log
          await this.page.waitForTimeout(1000);
        }
        
        // Probar botón de advertencia simulada
        const warningBtn = await this.page.$('button:contains("Simular Advertencia")');
        if (warningBtn) {
          await warningBtn.click();
          this.logSuccess('Botón de advertencia simulada funcional');
        }
        
      } else {
        this.logInfo('Controles de debug no visibles (normal en producción)');
      }
      
    } catch (error) {
      this.logError(`Error al verificar monitor: ${error.message}`);
    }
  }

  async testValidations() {
    console.log('\n✅ Prueba 6: Validaciones...');
    
    try {
      // Verificar información de estructura
      const structureInfo = await this.page.$('.structure-info');
      if (structureInfo) {
        const infoText = await this.page.$eval('.structure-info', el => el.textContent);
        
        if (infoText.includes('1038')) {
          this.logSuccess('Código de banco 1038 presente');
        } else {
          this.logError('Código de banco 1038 no encontrado');
        }
        
        if (infoText.includes('Eventual')) {
          this.logSuccess('Periodicidad eventual configurada');
        } else {
          this.logWarning('Periodicidad eventual no especificada');
        }
        
      } else {
        this.logError('Información de estructura no encontrada');
      }
      
    } catch (error) {
      this.logError(`Error al verificar validaciones: ${error.message}`);
    }
  }

  async generateReport() {
    console.log('\n📊 Generando reporte de pruebas...');
    
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        total_tests: this.testResults.length,
        passed: this.testResults.filter(t => t.status === 'success').length,
        warnings: this.testResults.filter(t => t.status === 'warning').length,
        failed: this.testResults.filter(t => t.status === 'error').length,
        errors: this.errors.length
      },
      test_results: this.testResults,
      errors: this.errors,
      environment: {
        baseUrl: this.baseUrl,
        userAgent: await this.page.evaluate(() => navigator.userAgent),
        viewport: await this.page.viewport()
      }
    };
    
    // Guardar reporte
    const reportPath = path.join(__dirname, '..', 'logs', `l01-test-report-${Date.now()}.json`);
    
    // Crear directorio si no existe
    const logsDir = path.dirname(reportPath);
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    console.log(`\n📄 Reporte guardado en: ${reportPath}`);
    console.log('\n📊 RESUMEN DE PRUEBAS:');
    console.log(`✅ Exitosas: ${report.summary.passed}`);
    console.log(`⚠️  Advertencias: ${report.summary.warnings}`);
    console.log(`❌ Fallidas: ${report.summary.failed}`);
    console.log(`🐛 Errores: ${report.summary.errors}`);
    
    return report;
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
      console.log('\n🧹 Navegador cerrado');
    }
  }

  logSuccess(message) {
    const result = { status: 'success', message, timestamp: new Date().toISOString() };
    this.testResults.push(result);
    console.log(`✅ ${message}`);
  }

  logWarning(message) {
    const result = { status: 'warning', message, timestamp: new Date().toISOString() };
    this.testResults.push(result);
    console.log(`⚠️  ${message}`);
  }

  logError(message) {
    const result = { status: 'error', message, timestamp: new Date().toISOString() };
    this.testResults.push(result);
    console.log(`❌ ${message}`);
  }

  logInfo(message) {
    const result = { status: 'info', message, timestamp: new Date().toISOString() };
    this.testResults.push(result);
    console.log(`ℹ️  ${message}`);
  }
}

// Ejecutar pruebas
async function runTests() {
  const tester = new L01SystemTester();
  
  try {
    await tester.init();
    await tester.runAllTests();
  } catch (error) {
    console.error('💥 Error crítico en las pruebas:', error);
    process.exit(1);
  }
}

// Verificar si se ejecuta directamente
if (require.main === module) {
  runTests();
}

module.exports = L01SystemTester;
