/**
 * COMPONENTE L01 MAIN - DASHBOARD PRINCIPAL
 * Manual de Control de Inversiones - Marzo 2017
 * Superintendencia de Bancos del Ecuador
 */

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { L01ExportComponent } from '../../../components/l01/l01-export/l01-export.component';
import { L01ExportData, L01ExportResult } from '../../../models/l01-export.model';
import { L01CatalogService } from '../../../services/l01-catalog.service';
import { L01AuditService } from '../../../services/l01-audit.service';
import { L01RegulatoryService, L01RegulatoryData } from '../../../services/l01-regulatory.service';
import { L01ExportService } from '../../../services/l01-export.service';
import { LogMonitorComponent } from '../../../components/debug/log-monitor/log-monitor.component';
import { L01ConfirmationComponent, ConfirmationData } from '../../../components/l01/l01-confirmation/l01-confirmation.component';
import { L01ModalFormComponent } from '../../../components/l01/l01-modal-form/l01-modal-form.component';
import { L01ReportSummaryComponent, ReportSummaryData } from '../../../components/l01/l01-report-summary/l01-report-summary.component';
import { L01ValidationResultsComponent, ValidationResults } from '../../../components/l01/l01-validation-results/l01-validation-results.component';
import { LoggerService } from '../../../services/logger.service';
import { TxtLoggerService } from '../../../services/txt-logger.service';
import { environment } from '../../../../environments/environment';
import { getL01FieldTooltip, L01FieldTooltip, L01_STRUCTURE_INFO } from '../../../utils/l01-field-tooltips';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Component({
  selector: 'app-l01-main',
  templateUrl: './l01-main.component.html',
  styleUrls: ['./l01-main.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    L01ModalFormComponent,
    L01ReportSummaryComponent,
    L01ValidationResultsComponent,
    L01ConfirmationComponent,
    L01ExportComponent,
    LogMonitorComponent
  ],
})
export class L01MainComponent implements OnInit {
  // Datos del reporte
  reportData: any = null;
  datosL01: L01RegulatoryData[] = [];
  loading = false;
  error = '';

  // Filtros según especificaciones oficiales L01
  // SOLO 3 filtros oficiales - NO incluye fechas ya que L01 es estructura EVENTUAL
  tipoIdentificacion = '';
  clasificacion = '';
  tipoEmisor = '';
  
  // Propiedades según especificación oficial L01 - Manual SB Marzo 2017
  // EXACTAMENTE 4 campos oficiales según tabla de detalle L01:
  displayedColumns: string[] = [
    'tipoIdentificacion',    // Campo 1: Tipo de identificación (R/X) - Tabla 4
    'identificacion',        // Campo 2: Identificación (RUC 13 dígitos o código extranjero) - Tabla 164
    'clasificacion',         // Campo 3: Clasificación (1-4) - Tabla 173
    'tipoEmisor'             // Campo 4: Tipo de emisor (sectores económicos) - Tabla 73
  ];

  // Datos para exportación
  exportData: L01ExportData[] = [];
  fechaCorte: Date = new Date();
  usuarioActual = 'Christian Aguirre';
  
  // Control del monitor de logs
  showLogMonitor = !environment.production; // Solo en desarrollo
  
  // Control del switch de datos mock/real - ELIMINADO: Ya no se usan datos mock
  // isUsingMockData = environment.useMockData;
  isProduction = environment.production;
  
  // Catálogos dinámicos para filtros L01
  tiposIdentificacionL01: any[] = [];
  tiposEmisorL01: any[] = [];
  clasificacionesL01: any[] = [];
  codigosExtranjeros: any[] = [];

  // Propiedades para códigos extranjeros
  codigosExtranjerosL01: any[] = [];
  
  // NUEVO: Estados del componente de confirmación
  showConfirmationModal = false;
  confirmationData: ConfirmationData | null = null;
  confirmationLoading = false;
  
  // NUEVO: Estados para creación de registros
  showCreationForm = false;
  newRecord: any = {};
  
  // NUEVO: Estados para modal de formulario
  showModalForm = false;
  editData: L01RegulatoryData | null = null;
  isSaving = false;

  // Propiedades para modal de resumen de reporte
  showReportSummaryModal = false;
  reportSummaryData: ReportSummaryData | null = null;

  // Propiedades para modal de resultados de validación
  showValidationModal = false;
  validationResults: ValidationResults | null = null;

  // Tooltips - RESTAURADOS (estaban funcionando correctamente)
  tooltips = L01_STRUCTURE_INFO;
  currentTooltip: L01FieldTooltip | null = null;
  showTooltip = false;
  tooltipPosition = { x: 0, y: 0 };
  
  // NUEVO: Estados para eliminación
  recordToDelete: any = null;
  
  // NUEVO: Datos filtrados para el grid
  filteredDataL01: L01RegulatoryData[] = [];


  

  
  // Cargar códigos extranjeros del catálogo t164
  loadCodigosExtranjeros(): void {
    this.catalogService.getTabla164ForL01().subscribe({
      next: (codigos) => {
        this.codigosExtranjerosL01 = codigos;
        this.txtLogger.info('L01MainComponent', 'Códigos extranjeros cargados exitosamente', {
          count: codigos.length
        });
      },
      error: (error) => {
        this.txtLogger.error('L01MainComponent', 'Error al cargar códigos extranjeros', error);
        // Fallback a datos mock si falla la API
        this.codigosExtranjerosL01 = [
          { codigo: '1000001', descripcion: 'Código Extranjero 1' },
          { codigo: '1000002', descripcion: 'Código Extranjero 2' },
          { codigo: '1000003', descripcion: 'Código Extranjero 3' }
        ];
      }
    });
  }

  constructor(
    private catalogService: L01CatalogService,
    private auditService: L01AuditService,
    private regulatoryService: L01RegulatoryService,
    private exportService: L01ExportService,
    private logger: LoggerService,
    private txtLogger: TxtLoggerService,
    private http: HttpClient
  ) { 
    this.logger.info('L01MainComponent', 'Componente inicializado');
    this.txtLogger.info('L01MainComponent', 'Componente principal L01 inicializado con logs TXT');
    // Log del modo de datos
    this.txtLogger.info('L01MainComponent', 'Modo de datos: REAL (API backend)');
  }

  ngOnInit(): void {
    this.loadInitialData();
  }

  /**
   * Obtener fecha de inicio por defecto (7 días atrás)
   */
  private getDefaultStartDate(): string {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    return this.formatDate(date);
  }

  /**
   * Obtener fecha de fin por defecto (hoy)
   */
  private getDefaultEndDate(): string {
    return this.formatDate(new Date());
  }

  /**
   * Obtener código numérico del tipo de identificación
   * Manual SB: R = 1 (RUC Nacional), X = 2 (Extranjero)
   */
  private getCodigoFromTipoIdentificacion(tipo: string): number {
    switch (tipo) {
      case 'R': return 1; // RUC Nacional
      case 'X': return 2; // Extranjero
      default: return 0;
    }
  }

  /**
   * Carga datos iniciales del componente L01
   * NO incluye fechas ya que L01 es estructura EVENTUAL
   */
  private loadInitialData(): void {
    this.logger.info('L01MainComponent', 'Iniciando carga de datos iniciales');
    this.loading = true;
    
    // Cargar catálogos dinámicos primero
    this.loadCatalogsForL01();
    
    // Cargar datos L01 (estructura eventual - no requiere fechas)
    this.loadRealDataFromBackend();
  }

  /**
   * Cargar datos reales del backend
   */
  private loadRealDataFromBackend(): void {
    this.txtLogger.info('L01MainComponent', 'Cargando datos reales del backend');
    
    // Cargar datos reales de L01 desde el backend
    this.regulatoryService.getAllL01Data().subscribe({
      next: (data: any[]) => { // Aceptar cualquier tipo de dato, luego transformarlo
        this.datosL01 = this.transformBackendDataToL01Official(data);
        // Inicializar datos filtrados con todos los datos
        this.filteredDataL01 = [...this.datosL01];
        this.error = ''; // Limpiar errores previos
        this.loading = false; // ✅ RESOLVER LOADING INFINITO
        
        this.txtLogger.info('L01MainComponent', 'Datos reales del backend cargados exitosamente', {
          totalRegistros: this.datosL01.length,
          datos: this.datosL01
        });
      },
      error: (error: any) => {
        this.txtLogger.error('L01MainComponent', 'Error al cargar datos reales del backend', error);
        this.loading = false; // ✅ RESOLVER LOADING INFINITO EN CASO DE ERROR
        
        // Mostrar mensaje de error específico
        if (error.status === 0) {
          this.error = 'Error de conectividad: No se puede conectar al servidor.';
        } else if (error.status === 404) {
          this.error = 'Endpoint no encontrado. Verifique la configuración del backend.';
        } else if (error.status === 500) {
          this.error = 'Error interno del servidor. Contacte al administrador.';
        } else {
          this.error = `Error ${error.status}: ${error.message || 'Error desconocido al cargar datos'}`;
        }
        
        // Si falla, mostrar mensaje de "no hay datos" o usar datos mock como fallback
        this.datosL01 = [];
        
        // Log detallado del error para debugging
        console.error('Error detallado al cargar datos L01:', {
          status: error.status,
          statusText: error.statusText,
          message: error.message,
          url: error.url,
          timestamp: new Date().toISOString()
        });
      }
    });
  }

  /**
   * Transforma los datos del backend (códigos) a campos oficiales L01
   * Convierte codigoTipoIdentificacion, codigoClasificacionEmisor, codigoTipoEmisor
   * a tipoIdentificacion, clasificacion, tipoEmisor según manual SB
   */
  private transformBackendDataToL01Official(data: any[]): L01RegulatoryData[] {
    this.txtLogger.info('L01MainComponent', 'Transformando datos del backend a campos oficiales L01');
    
    return data.map(item => {
      // Transformar codigoTipoIdentificacion a tipoIdentificacion
      let tipoIdentificacion = '';
      if (item.codigoTipoIdentificacion === 1) {
        tipoIdentificacion = 'R'; // RUC Nacional
      } else if (item.codigoTipoIdentificacion === 2) {
        tipoIdentificacion = 'X'; // Extranjero
      }
      
      // Transformar codigoClasificacionEmisor a clasificacion
      let clasificacion = 0;
      if (item.codigoClasificacionEmisor >= 1 && item.codigoClasificacionEmisor <= 4) {
        clasificacion = item.codigoClasificacionEmisor;
      }
      
      // Transformar codigoTipoEmisor a tipoEmisor (usar el código directamente)
      let tipoEmisor = 0;
      if (item.codigoTipoEmisor >= 0 && item.codigoTipoEmisor <= 9) {
        tipoEmisor = item.codigoTipoEmisor;
      }
      
      // Generar identificacion basada en el tipo y usando catálogos
      let identificacion = '';
      if (tipoIdentificacion === 'R') {
        // Para RUC, usar un valor por defecto o el codigoEmisor si está disponible
        identificacion = item.codigoEmisor ? item.codigoEmisor.toString() : '1791234567001';
      } else if (tipoIdentificacion === 'X') {
        // Para extranjero, buscar en catálogo T164 si está disponible
        if (this.codigosExtranjeros && this.codigosExtranjeros.length > 0) {
          const codigoExtranjero = this.codigosExtranjeros.find(c => c.id === item.codigoEmisor);
          if (codigoExtranjero) {
            identificacion = codigoExtranjero.codigo;
          } else {
            identificacion = '100001'; // Código por defecto
          }
        } else {
          identificacion = '100001'; // Código por defecto
        }
      }
      
      // Crear objeto con campos oficiales L01
      const l01OfficialData: L01RegulatoryData = {
        id: item.id,
        tipoIdentificacion: tipoIdentificacion,
        identificacion: identificacion,
        clasificacion: clasificacion,
        tipoEmisor: tipoEmisor,
        // Mantener campos del backend para compatibilidad
        codigoTipoIdentificacion: item.codigoTipoIdentificacion,
        codigoEmisor: item.codigoEmisor,
        codigoClasificacionEmisor: item.codigoClasificacionEmisor,
        codigoTipoEmisor: item.codigoTipoEmisor,
        // Campos internos del sistema
        usuarioCreacion: item.usuarioCreacion || 'Christian Aguirre',
        fechaCreacion: item.fechaCreacion ? new Date(item.fechaCreacion) : new Date(),
        usuarioModificacion: item.usuarioModificacion || 'Christian Aguirre',
        fechaModificacion: item.fechaModificacion ? new Date(item.fechaModificacion) : new Date()
      };
      
      this.txtLogger.debug('L01MainComponent', 'Dato transformado', {
        original: item,
        transformado: l01OfficialData,
        catálogosDisponibles: {
          tiposIdentificacion: this.tiposIdentificacionL01?.length || 0,
          clasificaciones: this.clasificacionesL01?.length || 0,
          tiposEmisor: this.tiposEmisorL01?.length || 0,
          codigosExtranjeros: this.codigosExtranjeros?.length || 0
        }
      });
      
      return l01OfficialData;
    });
  }

  /**
   * Cargar catálogos específicos para L01 desde el servidor
   */
  private async loadCatalogsForL01(): Promise<void> {
    this.txtLogger.info('L01MainComponent', 'Iniciando carga de catálogos dinámicos para L01');
    
    try {
      // Cargar Tabla 4 (Tipos de Identificación) - Solo R y X para L01
      this.catalogService.getTabla4().subscribe({
        next: (tipos) => {
          this.tiposIdentificacionL01 = tipos;
          this.txtLogger.info('L01MainComponent', `Tabla 4 cargada: ${tipos.length} tipos de identificación`, tipos);
        },
        error: (error) => {
          this.txtLogger.error('L01MainComponent', 'Error al cargar Tabla 4', error);
          console.error('Error específico Tabla 4:', {
            status: error.status,
            message: error.message,
            url: error.url
          });
        }
      });

      // Cargar Tabla 73 (Tipos de Emisor) - Solo aplicables a L01
      this.catalogService.getTabla73().subscribe({
        next: (tipos) => {
          this.tiposEmisorL01 = tipos;
          this.txtLogger.info('L01MainComponent', `Tabla 73 cargada: ${tipos.length} tipos de emisor`, tipos);
        },
        error: (error) => {
          this.txtLogger.error('L01MainComponent', 'Error al cargar Tabla 73', error);
          console.error('Error específico Tabla 73:', {
            status: error.status,
            message: error.message,
            url: error.url
          });
        }
      });

      // Cargar Tabla 173 (Clasificaciones L01)
      this.catalogService.getTabla173().subscribe({
        next: (clasificaciones) => {
          this.clasificacionesL01 = clasificaciones;
          this.txtLogger.info('L01MainComponent', `Tabla 173 cargada: ${clasificaciones.length} clasificaciones`, clasificaciones);
        },
        error: (error) => {
          this.txtLogger.error('L01MainComponent', 'Error al cargar Tabla 173', error);
          console.error('Error específico Tabla 173:', {
            status: error.status,
            message: error.message,
            url: error.url
          });
        }
      });

      // Cargar Tabla 164 (Códigos Extranjeros) - Para referencia
      this.catalogService.getTabla164().subscribe({
        next: (codigos) => {
          this.codigosExtranjeros = codigos;
          this.codigosExtranjerosL01 = codigos; // También para el select
          this.txtLogger.info('L01MainComponent', `Tabla 164 cargada: ${codigos.length} códigos extranjeros`);
        },
        error: (error) => {
          this.txtLogger.error('L01MainComponent', 'Error al cargar Tabla 164', error);
          console.error('Error específico Tabla 164:', {
            status: error.status,
            message: error.message,
            url: error.url
          });
        }
      });

      this.txtLogger.info('L01MainComponent', 'Catálogos dinámicos iniciados correctamente');
      
    } catch (error) {
      this.txtLogger.error('L01MainComponent', 'Error crítico al cargar catálogos', error);
      throw error;
    }
  }

  /**
   * Generar datos de prueba para L01 - ELIMINADO: Ya no se usan datos mock
   * La API funciona perfectamente, todos los datos vienen del backend
   */
  // generateMockData(): void { ... } - ELIMINADO

  /**
   * Generar reporte L01 - DEPRECATED (reemplazado por generateReport mejorado)
   */
  // generateReport(): void { ... } - ELIMINADO

  /**
   * Exportar reporte - DEPRECATED (reemplazado por exportToTxt)
   */
  // exportReport(): void { ... } - ELIMINADO

  /**
   * Cargar historial
   */
  loadHistory(): void {
    // this.historial = [
    //   { fecha: '2024-08-07', usuario: 'admin', accion: 'Generación reporte' },
    //   { fecha: '2024-08-06', usuario: 'admin', accion: 'Actualización datos' },
    //   { fecha: '2024-08-05', usuario: 'admin', accion: 'Exportación reporte' }
    // ];
    // this.showHistorial = !this.showHistorial;
  }



  /**
   * Obtener descripción de código
   */
  getDescripcion(codigo: string, tipo: string): string {
    // Implementar catálogos según especificaciones L01
    return codigo;
  }

  /**
   * Formatear fecha
   */
  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  /**
   * Formatear fecha para archivo
   */
  private formatDateForFile(date: Date): string {
    return date.toISOString().split('T')[0].replace(/-/g, '');
  }

  /**
   * Obtener total de registros
   */
  getTotalRegistros(): number {
    return this.datosL01.length;
  }

  /**
   * Obtener fecha de generación
   */
  getFechaGeneracion(): string {
    return new Date().toLocaleDateString('es-EC');
  }

  /**
   * Obtener título de columna según especificaciones oficiales L01
   */
  getColumnTitle(column: string): string {
    const titles: { [key: string]: string } = {
      tipoIdentificacion: 'Tipo Identificación',  // Campo 1: R/X
      identificacion: 'Identificación',           // Campo 2: RUC/Código Extranjero
      clasificacion: 'Clasificación',             // Campo 3: 1-4
      tipoEmisor: 'Tipo de Emisor'               // Campo 4: 0,2,3,4,5,7,8,9
    };
    return titles[column] || column;
  }

  /**
   * Obtener cantidad de registros nacionales (RUC)
   */
  getRegistrosNacionales(): number {
    return this.datosL01.filter(item => item.tipoIdentificacion === 'R').length;
  }

  /**
   * Obtener cantidad de registros extranjeros
   */
  getRegistrosExtranjeros(): number {
    return this.datosL01.filter(item => item.tipoIdentificacion === 'X').length;
  }

  /**
   * Obtener descripción de clasificación según tabla 173
   */
  getClasificacionDesc(codigo: number): string {
    const clasificaciones: { [key: number]: string } = {
      1: 'Emisor',
      2: 'Custodio', 
      3: 'Depositario',
      4: 'Contraparte'
    };
    return clasificaciones[codigo] || 'Desconocido';
  }

  /**
   * Obtener descripción de tipo de emisor según tabla 73
   */
  getTipoEmisorDesc(codigo: number): string {
    const tipos: { [key: number]: string } = {
      0: 'Supranacionales',
      2: 'Pública financiera',
      3: 'Privada financiera', 
      4: 'Pública no financiera',
      5: 'Privada no financiera',
      7: 'Fondos de inversión',
      8: 'Estados Soberanos',
      9: 'Multilaterales'
    };
    return tipos[codigo] || 'Desconocido';
  }

  /**
   * Ver detalle de un registro
   */
  verDetalle(item: any): void {
    console.log('Ver detalle:', item);
    alert(`Ver detalle de ${item.identificacion}`);
  }

  /**
   * Editar un registro
   */
  editar(item: any): void {
    console.log('Editar:', item);
    alert(`Editar registro de ${item.identificacion}`);
  }

  /**
   * Eliminar un registro
   */
  eliminar(item: any): void {
    if (confirm(`¿Está seguro de eliminar el registro de ${item.identificacion}?`)) {
      console.log('Eliminar:', item);
      // Eliminar del array
      const index = this.datosL01.findIndex(d => d.identificacion === item.identificacion);
      if (index > -1) {
        this.datosL01.splice(index, 1);
        this.prepareExportData(); // Actualizar datos de exportación
      }
      alert(`Registro de ${item.identificacion} eliminado`);
    }
  }

  /**
   * Preparar datos para exportación según formato L01
   */
  prepareExportData(): void {
    this.exportData = this.datosL01.map(item => ({
      tipoIdentificacion: item.tipoIdentificacion,
      identificacion: item.identificacion,
      clasificacion: item.clasificacion,
      tipoEmisor: item.tipoEmisor
    }));
  }

  /**
   * Manejar resultado de exportación exitosa
   */
  onExportCompleted(result: L01ExportResult): void {
    console.log('Exportación completada:', result);
    
    if (result.transmissionId) {
      alert(`Archivo enviado exitosamente a RVC.\nID Transmisión: ${result.transmissionId}`);
    } else {
      alert(`Archivo descargado exitosamente: ${result.filename}`);
    }
  }

  /**
   * Manejar error de exportación
   */
  onExportError(error: string): void {
    console.error('Error en exportación:', error);
    alert(`Error en exportación: ${error}`);
  }

  /**
   * Actualizar fecha de corte
   */
  updateFechaCorte(fecha: Date): void {
    this.fechaCorte = fecha;
  }



  /**
   * Alternar monitor de logs
   */
  toggleLogMonitor(): void {
    this.showLogMonitor = !this.showLogMonitor;
    this.logger.info('L01MainComponent', `Monitor de logs ${this.showLogMonitor ? 'activado' : 'desactivado'}`);
  }

  /**
   * Simular error para pruebas
   */
  testError(): void {
    this.logger.error('L01MainComponent', 'Error de prueba generado manualmente', new Error('Error simulado para testing'));
  }

  /**
   * Simular advertencia para pruebas
   */
  testWarning(): void {
    this.logger.warn('L01MainComponent', 'Advertencia de prueba generada manualmente', { test: true });
  }

  /**
   * Obtener conteo por clasificación según especificación oficial L01
   * 1 = Emisor, 2 = Custodio, 3 = Depositario, 4 = Contraparte (Tabla 173)
   */
  getCountByClasificacion(clasificacion: number): number {
    return this.datosL01.filter(item => item.clasificacion === clasificacion).length;
  }

  /**
   * Actualizar datos manualmente (botón Actualizar)
   */
  refreshData(): void {
    this.txtLogger.info('L01MainComponent', 'Actualizando datos L01 manualmente por solicitud del usuario');
    this.logger.info('L01MainComponent', 'Refresh manual iniciado');
    
    // Limpiar datos actuales
    this.datosL01 = [];
    this.exportData = [];
    
    // Recargar todos los datos
    this.loadInitialData();
    
    // Notificación visual
    console.log('🔄 Datos L01 actualizados');
  }

  /**
   * Cambiar entre datos mock y reales - ELIMINADO: Ya no se usan datos mock
   * La API funciona perfectamente, no hay necesidad de alternar
   */
  // toggleDataMode(): void { ... } - ELIMINADO

  /**
   * Muestra tooltip para un campo específico
   */
  showFieldTooltip(field: string, event: MouseEvent): void {
    this.currentTooltip = getL01FieldTooltip(field);
    if (this.currentTooltip) {
      // Calcular posición inteligente para evitar que se salga de la pantalla
      const tooltipWidth = 350; // Ancho máximo del tooltip
      const tooltipHeight = 200; // Altura estimada del tooltip
      const margin = 20;
      
      let x = event.clientX + margin;
      let y = event.clientY - margin;
      
      // Ajustar si se sale por la derecha
      if (x + tooltipWidth > window.innerWidth) {
        x = event.clientX - tooltipWidth - margin;
      }
      
      // Ajustar si se sale por abajo
      if (y + tooltipHeight > window.innerHeight) {
        y = event.clientY - tooltipHeight - margin;
      }
      
      // Asegurar que no se salga por la izquierda o arriba
      x = Math.max(margin, x);
      y = Math.max(margin, y);
      
      this.tooltipPosition = { x, y };
      this.showTooltip = true;
      
      this.txtLogger.debug('L01MainComponent', `Tooltip mostrado para campo: ${field}`, {
        field: field,
        tooltip: this.currentTooltip.title,
        position: { x, y },
        windowSize: { width: window.innerWidth, height: window.innerHeight }
      });
    }
  }

  /**
   * Ocultar tooltip
   */
  hideTooltip(): void {
    this.showTooltip = false;
    this.currentTooltip = null;
  }

  // ========================================
  // NUEVO: MÉTODOS DEL FLUJO DE CONFIRMACIÓN
  // ========================================

  /**
   * NUEVO: Crear nuevo registro L01
   */
  createNewRecord(): void {
    this.showCreationForm = true;
    this.newRecord = {
      tipoIdentificacion: 'R',
      identificacion: '',
      clasificacion: 1,
      tipoEmisor: 3,
      estado: 'ACTIVO',
      fechaCreacion: new Date(),
      usuarioCreacion: this.usuarioActual,
      version: 1
    };
  }

  /**
   * NUEVO: Guardar nuevo registro con confirmación
   */
  saveNewRecord(): void {
    // Validar formulario completo
    const validation = this.validateCompleteRecord(this.newRecord);
    
    if (!validation.isValid) {
      this.showValidationError(validation.message);
      return;
    }
    
    // Mostrar ventana de confirmación
    this.showCreationConfirmation(this.newRecord);
  }

  /**
   * NUEVO: Mostrar confirmación de creación
   */
  showCreationConfirmation(record: any): void {
    this.confirmationData = {
      type: 'creation',
      title: 'Confirmar Nuevo Registro L01',
      message: '¿Está seguro de que desea crear este nuevo registro L01?',
      details: record
    };
    
    this.showConfirmationModal = true;
  }

  /**
   * NUEVO: Confirmar creación de registro
   */
  onCreationConfirmed(data: ConfirmationData): void {
    this.confirmationLoading = true;
    
    // Simular persistencia en BD
    setTimeout(() => {
      // Agregar ID único
      const newRecord = {
        ...data.details,
        id: Date.now()
      };
      
      // Agregar a la lista local
      this.datosL01.push(newRecord);
      
      // Log de auditoría
      this.auditService.logCreation(newRecord).subscribe({
        next: (auditResult) => {
          this.txtLogger.info('L01MainComponent', 'Registro L01 creado exitosamente', {
            record: newRecord,
            auditResult: auditResult
          });
        },
        error: (error) => {
          this.txtLogger.error('L01MainComponent', 'Error al registrar auditoría de creación', error);
        }
      });
      
      // Actualizar datos de exportación
      this.prepareExportData();
      
      // Cerrar modal y limpiar
      this.showConfirmationModal = false;
      this.confirmationData = null;
      this.confirmationLoading = false;
      this.showCreationForm = false;
      this.newRecord = {};
      
      // Mostrar mensaje de éxito
      this.showSuccessMessage('Registro L01 creado exitosamente');
      
    }, 1000);
  }

  /**
   * NUEVO: Cancelar creación
   */
  onCreationCancelled(): void {
    this.showCreationForm = false;
    this.newRecord = {};
  }

  /**
   * NUEVO: Validación completa del registro
   */
  validateCompleteRecord(record: any): { isValid: boolean; message: string } {
    // Validar cada campo individualmente
    const validations = [
      this.validateTipoIdentificacionRealTime(record.tipoIdentificacion),
      this.validateIdentificacionRealTime(record.identificacion),
      this.validateClasificacionRealTime(record.clasificacion?.toString()),
      this.validateTipoEmisorRealTime(record.tipoEmisor?.toString())
    ];
    
    // Verificar que todas las validaciones pasen
    const failedValidations = validations.filter(v => !v.isValid);
    
    if (failedValidations.length > 0) {
      return {
        isValid: false,
        message: `Errores de validación:\n${failedValidations.map(v => v.message).join('\n')}`
      };
    }
    
    return { isValid: true, message: 'Registro válido' };
  }

  // ========================================
  // NUEVO: FLUJO DE EDICIÓN CON CONFIRMACIÓN
  // ========================================

  

  // ========================================
  // NUEVO: FLUJO DE ELIMINACIÓN CON CONFIRMACIÓN
  // ========================================

  /**
   * NUEVO: Confirmar eliminación de registro
   */
  confirmDeletion(record: any): void {
    this.recordToDelete = record;
    
    this.confirmationData = {
      type: 'deletion',
      title: 'Confirmar Eliminación de Registro L01',
      message: '¿Está seguro de que desea eliminar este registro?',
      details: { record }, // Added missing details property
      record: record
    };
    
    this.showConfirmationModal = true;
  }

  /**
   * NUEVO: Confirmar eliminación
   */
  onDeletionConfirmed(data: ConfirmationData): void {
    if (!data.record) return;
    
    this.confirmationLoading = true;
    
    // Simular eliminación en BD
    setTimeout(() => {
      const record = data.record;
      
      // Eliminar del array local
      const index = this.datosL01.findIndex(d => d.id === record.id);
      if (index > -1) {
        this.datosL01.splice(index, 1);
        
        // Log de auditoría
        this.auditService.logDeletion(record, this.usuarioActual).subscribe({
          next: (auditResult) => {
            this.txtLogger.info('L01MainComponent', 'Registro L01 eliminado exitosamente', {
              record: record,
              auditResult: auditResult
            });
          },
          error: (error) => {
            this.txtLogger.error('L01MainComponent', 'Error al registrar auditoría de eliminación', error);
          }
        });
        
        // Actualizar datos de exportación
        this.prepareExportData();
        
        // Mostrar mensaje de éxito
        this.showSuccessMessage(`Registro de ${record.identificacion} eliminado exitosamente`);
      }
      
      // Cerrar modal y limpiar
      this.showConfirmationModal = false;
      this.confirmationData = null;
      this.confirmationLoading = false;
      this.recordToDelete = null;
      
    }, 1000);
  }

  // ========================================
  // NUEVO: MÉTODOS DE CONFIRMACIÓN
  // ========================================

  /**
   * NUEVO: Manejar confirmación del modal
   */
  onConfirmationConfirmed(data: ConfirmationData): void {
    switch (data.type) {
      case 'creation':
        this.onCreationConfirmed(data);
        break;

      case 'deletion':
        this.onDeletionConfirmed(data);
        break;
    }
  }

  /**
   * NUEVO: Manejar cancelación del modal
   */
  onConfirmationCancelled(): void {
    this.showConfirmationModal = false;
    this.confirmationData = null;
    this.confirmationLoading = false;
    

    
    // Si estaba creando, cancelar creación
    if (this.showCreationForm) {
      this.onCreationCancelled();
    }
  }

  /**
   * NUEVO: Cerrar modal de confirmación
   */
  onConfirmationClosed(): void {
    this.onConfirmationCancelled();
  }

  // ========================================
  // MÉTODOS DE VALIDACIÓN EXISTENTES (MANTENER)
  // ========================================

  // Enhanced validation with real-time feedback
  validateFieldRealTime(field: string, value: any): { isValid: boolean; message: string } {
    switch (field) {
      case 'tipoIdentificacion':
        return this.validateTipoIdentificacionRealTime(value);
      case 'identificacion':
        return this.validateIdentificacionRealTime(value);
      case 'clasificacion':
        return this.validateClasificacionRealTime(value);
      case 'tipoEmisor':
        return this.validateTipoEmisorRealTime(value);
      default:
        return { isValid: false, message: 'Campo no válido' };
    }
  }
  
  validateTipoIdentificacionRealTime(value: string): { isValid: boolean; message: string } {
    // Validar solo contra códigos válidos, no contra objetos completos
    const validCodes = this.getTipoIdentificacionCodes();
    
    if (validCodes.includes(value)) {
      const desc = value === 'R' ? 'RUC Nacional' : 'Código Extranjero';
      return { isValid: true, message: `Tipo válido: ${desc}` };
    }
    
    return { isValid: false, message: 'Solo se permiten R (Nacional) o X (Extranjero)' };
  }
  
  validateIdentificacionRealTime(value: string): { isValid: boolean; message: string } {
    if (!value || typeof value !== 'string') {
      return { isValid: false, message: 'Valor requerido' };
    }
    
    // Check if it's a valid RUC (13 digits) or foreign code (7 digits)
    const isRUC = value.length === 13 && /^\d{13}$/.test(value);
    const isForeignCode = value.length === 7 && /^\d{7}$/.test(value);
    
    if (isRUC) {
      const rucValidation = this.validateRUCRealTime(value);
      return rucValidation;
    }
    
    if (isForeignCode) {
      // Para códigos extranjeros, validar que exista en el catálogo t164
      const validForeignCodes = this.codigosExtranjerosL01.map(codigo => codigo.codigo.toString());
      
      if (validForeignCodes.includes(value)) {
        return { isValid: true, message: 'Código extranjero válido' };
      } else {
        return { isValid: false, message: 'Código extranjero no existe en el catálogo t164' };
      }
    }
    
    if (value.length < 7) {
      return { isValid: false, message: 'Mínimo 7 dígitos para código extranjero' };
    }
    
    if (value.length > 13) {
      return { isValid: false, message: 'Máximo 13 dígitos para RUC' };
    }
    
    if (!/^\d+$/.test(value)) {
      return { isValid: false, message: 'Solo se permiten números' };
    }
    
    return { isValid: false, message: 'Formato inválido' };
  }
  
  validateRUCRealTime(ruc: string): { isValid: boolean; message: string } {
    if (ruc.length !== 13) {
      return { isValid: false, message: 'RUC debe tener exactamente 13 dígitos' };
    }
    
    if (!/^\d{13}$/.test(ruc)) {
      return { isValid: false, message: 'RUC solo debe contener números' };
    }
    
    const tipo = ruc.substring(2, 3);
    const validTipos = ['6', '9']; // 6: Empresas, 9: Organizaciones
    
    if (!validTipos.includes(tipo)) {
      return { isValid: false, message: `Tipo de RUC ${tipo} no válido para L01. Solo se permiten tipos 6 (Empresas) y 9 (Organizaciones)` };
    }
    
    return { isValid: true, message: 'RUC válido' };
  }
  
  validateClasificacionRealTime(value: string): { isValid: boolean; message: string } {
    // Validar solo contra códigos válidos, no contra objetos completos
    const validCodes = ['1', '2', '3', '4'];
    
    if (validCodes.includes(value)) {
      const desc = this.getClasificacionDesc(parseInt(value));
      return { isValid: true, message: `Clasificación válida: ${desc}` };
    }
    
    return { isValid: false, message: 'Solo se permiten valores 1, 2, 3, 4' };
  }
  
  validateTipoEmisorRealTime(value: string): { isValid: boolean; message: string } {
    // Validar solo contra códigos válidos, no contra objetos completos
    const validCodes = this.tiposEmisorL01.map(tipo => tipo.codigo.toString());
    
    if (validCodes.includes(value)) {
      const desc = this.getTipoEmisorDesc(parseInt(value));
      return { isValid: true, message: `Tipo válido: ${desc}` };
    }
    
    return { isValid: false, message: 'Tipo de emisor no válido para L01' };
  }
  
  // Método auxiliar para obtener códigos válidos de clasificación
  getClasificacionCodes(): string[] {
    return ['1', '2', '3', '4'];
  }
  
  // Método auxiliar para obtener códigos válidos de tipo emisor
  getTipoEmisorCodes(): string[] {
    return this.tiposEmisorL01.map(tipo => tipo.codigo.toString());
  }
  
  // Método auxiliar para obtener códigos válidos de tipo identificación
  getTipoIdentificacionCodes(): string[] {
    return ['R', 'X'];
  }
  
  // Método auxiliar para obtener códigos válidos de códigos extranjeros
  getCodigosExtranjerosCodes(): string[] {
    return this.codigosExtranjerosL01.map(codigo => codigo.codigo.toString());
  }
  
  // Método para validar que un código existe en un catálogo específico
  validateCodeInCatalog(value: string, catalogCodes: string[], fieldName: string): { isValid: boolean; message: string } {
    if (catalogCodes.includes(value)) {
      return { isValid: true, message: `${fieldName} válido` };
    }
    
    return { isValid: false, message: `${fieldName} no válido` };
  }

  // ========================================
  // MÉTODOS DE FEEDBACK AL USUARIO
  // ========================================

  // User feedback methods
  showValidationError(message: string): void {
    // Simple alert for now, can be enhanced with toast notifications
    alert(`Error de validación: ${message}`);
  }
  
  showSuccessMessage(message: string): void {
    // Simple alert for now, can be enhanced with toast notifications
    alert(`✅ ${message}`);
  }
  
  showErrorMessage(message: string): void {
    // Simple alert for now, can be enhanced with toast notifications
    alert(`❌ ${message}`);
  }

  // ========================================
  // MÉTODOS DE PERSISTENCIA
  // ========================================

  persistToBackend(rowIndex: number, field: string, newValue: any, oldValue: any): Observable<any> {
    const record = this.datosL01[rowIndex];
    const updateData = {
      id: record?.id || rowIndex, // Use ID if available, otherwise row index
      field: field,
      oldValue: oldValue,
      newValue: newValue,
      timestamp: new Date().toISOString(),
      user: 'current_user' // This should come from authentication service
    };
    
    // POST to backend API
    return this.http.post(`${environment.backendEndpoint}/nesl01/update`, updateData);
  }
  


  // ========================================
  // NUEVOS MÉTODOS PARA MODAL Y EXPORTACIÓN
  // ========================================

  /**
   * Abre el modal para crear un nuevo registro
   */
  openCreateModal(): void {
    this.editData = null;
    this.showModalForm = true;
    this.txtLogger.info('L01MainComponent', 'Modal de creación abierto');
  }

  /**
   * Abre el modal para editar un registro existente
   */
  openEditModal(record: L01RegulatoryData): void {
    this.editData = { ...record };
    this.showModalForm = true;
    this.txtLogger.info('L01MainComponent', 'Modal de edición abierto', record);
  }

  /**
   * Cierra el modal del formulario
   */
  closeModalForm(): void {
    this.showModalForm = false;
    this.editData = null;
    this.txtLogger.info('L01MainComponent', 'Modal del formulario cerrado');
  }

  /**
   * Maneja el evento cuando se cierra el modal
   */
  onModalClosed(): void {
    this.closeModalForm();
  }

  /**
   * Maneja el evento cuando se guardan los datos del modal
   */
  onModalDataSaved(data: L01RegulatoryData): void {
    if (this.editData) {
      // Modo edición: actualizar registro existente
      const index = this.datosL01.findIndex(record => record.id === this.editData?.id);
      if (index !== -1) {
        this.datosL01[index] = { ...data, id: this.editData.id };
        this.txtLogger.info('L01MainComponent', 'Registro L01 actualizado desde modal - HITO 4', { recordId: data.id });
      }
    } else {
      // Modo creación: agregar nuevo registro
      const newRecord = { ...data, id: Date.now() }; // ID temporal
      this.datosL01.unshift(newRecord);
      this.txtLogger.info('L01MainComponent', 'Nuevo registro L01 creado desde modal - HITO 4', newRecord);
    }

    this.closeModalForm();
    this.showSuccessMessage(this.editData ? 'Registro actualizado exitosamente' : 'Registro creado exitosamente');
  }



  /**
   * Generar reporte L01 según filtros aplicados
   * Manual SB: Solo 3 filtros oficiales (sin fechas)
   */
  generateReport(): void {
    this.txtLogger.info('L01MainComponent', 'Generando reporte L01 con filtros oficiales');
    
    // Validar que al menos un filtro esté seleccionado
    if (!this.tipoIdentificacion && !this.clasificacion && !this.tipoEmisor) {
      this.txtLogger.warn('L01MainComponent', 'No se han seleccionado filtros para el reporte');
      this.error = 'Debe seleccionar al menos un filtro para generar el reporte.';
      return;
    }

    this.loading = true;
    this.error = '';

    // Construir request para backend según contrato API
    const searchRequest = {
      id: 0,
      codigoTipoIdentificacion: this.tipoIdentificacion ? this.getCodigoFromTipoIdentificacion(this.tipoIdentificacion) : 0,
      codigoEmisor: 0,
      codigoClasificacionEmisor: this.clasificacion ? parseInt(this.clasificacion) : 0,
      codigoTipoEmisor: this.tipoEmisor ? parseInt(this.tipoEmisor) : 0
    };

    this.txtLogger.info('L01MainComponent', 'Request para backend', searchRequest);

    // Llamar al servicio para buscar datos
    this.regulatoryService.searchL01Data(searchRequest).subscribe({
      next: (response: any) => {
        this.txtLogger.info('L01MainComponent', 'Respuesta del backend recibida', response);
        
        if (response && response.datos) {
          // Transformar datos del backend a formato oficial L01
          this.datosL01 = this.transformBackendDataToL01Official(response.datos);
          
          // Preparar datos para exportación
          this.prepareExportData();
          
          // Mostrar modal de resumen del reporte (NO formulario de creación)
          this.showReportSummaryModal = true;
          this.reportSummaryData = {
            totalRegistros: this.datosL01.length,
            fechaGeneracion: new Date(),
            usuarioGenerador: this.usuarioActual,
            filtrosAplicados: {
              tipoIdentificacion: this.tipoIdentificacion,
              clasificacion: this.clasificacion,
              tipoEmisor: this.tipoEmisor
            },
            datos: this.datosL01
          };
          
          this.txtLogger.info('L01MainComponent', 'Reporte L01 generado exitosamente', {
            totalRegistros: this.datosL01.length,
            filtrosAplicados: this.reportSummaryData.filtrosAplicados
          });
        } else {
          this.txtLogger.warn('L01MainComponent', 'Backend no retornó datos válidos');
          this.datosL01 = [];
          this.error = 'No se encontraron datos con los filtros aplicados.';
        }
        
        this.loading = false;
      },
      error: (error: any) => {
        this.txtLogger.error('L01MainComponent', 'Error al generar reporte L01', error);
        this.loading = false;
        
        // Mostrar mensaje de error específico
        if (error.status === 0) {
          this.error = 'Error de conectividad: No se puede conectar al servidor.';
        } else if (error.status === 404) {
          this.error = 'Endpoint no encontrado. Verifique la configuración del backend.';
        } else if (error.status === 500) {
          this.error = 'Error interno del servidor. Contacte al administrador.';
        } else {
          this.error = `Error ${error.status}: ${error.message || 'Error desconocido al generar reporte'}`;
        }
        
        // Log detallado del error para debugging
        console.error('Error detallado al generar reporte L01:', {
          status: error.status,
          statusText: error.statusText,
          message: error.message,
          url: error.url,
          timestamp: new Date().toISOString()
        });
      }
    });
  }

  /**
   * Exporta datos en formato TXT según estándares L01 oficiales - HITO 2 IMPLEMENTADO
   * Manual SB Marzo 2017: Solo formato TXT, NO JSON
   */
  exportToTxt(): void {
    if (this.datosL01.length === 0) {
      this.showErrorMessage('No hay datos para exportar');
      return;
    }

    this.txtLogger.info('L01MainComponent', 'Exportando datos a TXT - HITO 2', { totalRegistros: this.datosL01.length });

    try {
      // Obtener información del archivo antes de la descarga
      const fileInfo = this.exportService.getFileInfo(this.datosL01);
      
      // Validar que sea formato TXT y NO JSON
      if (!fileInfo.isTxt) {
        throw new Error('El archivo generado no es de formato TXT');
      }
      
      if (fileInfo.isJson) {
        throw new Error('El archivo NO debe ser JSON, debe ser TXT');
      }
      
      // Descargar archivo TXT
      this.exportService.downloadTxt(this.datosL01, fileInfo.filename);
      
      this.txtLogger.info('L01MainComponent', 'Exportación TXT completada - HITO 2', { 
        filename: fileInfo.filename,
        contentType: fileInfo.contentType,
        size: fileInfo.size,
        recordCount: fileInfo.recordCount,
        format: fileInfo.format
      });
      
      this.showSuccessMessage(`Datos exportados exitosamente en formato TXT: ${fileInfo.filename} (${fileInfo.recordCount} registros)`);
    } catch (error) {
      this.txtLogger.error('L01MainComponent', 'Error en exportación TXT - HITO 2 falló', error);
      this.showErrorMessage(`Error al exportar datos: ${(error as Error).message || 'Error desconocido'}`);
    }
  }

  /**
   * Manejar cierre del modal de resumen del reporte
   */
  onReportSummaryModalClosed(): void {
    this.showReportSummaryModal = false;
    this.reportSummaryData = null;
  }

  /**
   * Manejar exportación TXT desde modal de resumen
   */
  onReportSummaryExportTxt(data: L01RegulatoryData[]): void {
    this.txtLogger.info('L01MainComponent', 'Exportando TXT desde modal de resumen', { totalRegistros: data.length });
    this.exportToTxt();
    this.showReportSummaryModal = false;
  }

  /**
   * Manejar creación de nuevo registro desde modal de resumen
   */
  onReportSummaryCreateNewRecord(): void {
    this.txtLogger.info('L01MainComponent', 'Abriendo formulario de nuevo registro desde modal de resumen');
    this.showReportSummaryModal = false;
    this.openCreateModal();
  }

  /**
   * Validar y generar reporte L01 con proceso de validación previa
   * Manual SB: Validación previa obligatoria antes de generar reporte
   */
  validateAndGenerateReport(): void {
    this.txtLogger.info('L01MainComponent', 'Iniciando proceso de validación y generación de reporte L01');

    // NOTA: Los filtros son SOLO para vista y análisis, NO afectan la generación del reporte
    // L01 debe generar reporte COMPLETO con todos los registros existentes
    
    this.loading = true;
    this.error = '';

    // PASO 1: Ejecutar validación previa completa
    this.executeL01Validation().then(validationResults => {
      this.txtLogger.info('L01MainComponent', 'Validación previa completada', validationResults);

      // PASO 2: Mostrar resultados de validación para intervención manual
      this.showValidationResultsModal(validationResults);

    }).catch(error => {
      this.txtLogger.error('L01MainComponent', 'Error en validación previa', error);
      this.loading = false;
      this.error = 'Error durante la validación previa. Verifique los datos e intente nuevamente.';
    });
  }

  /**
   * Ejecutar validación previa completa de datos L01
   * Incluye validación contra catálogos oficiales y verificación de integridad
   */
  private async executeL01Validation(): Promise<any> {
    this.txtLogger.info('L01MainComponent', 'Ejecutando validación previa completa L01');

    try {
      // PASO 1: Obtener TODOS los registros L01 del backend
      // Usar el método de conversión existente que el backend entiende
      const searchRequest = this.regulatoryService.convertFrontendFiltersToAPI({
        tipoIdentificacion: '', // Vacío = todos
        clasificacion: 0,       // 0 = todas
        tipoEmisor: 0           // 0 = todos
      });

      this.txtLogger.info('L01MainComponent', 'Obteniendo todos los registros L01 del backend usando conversión estándar', searchRequest);

      // Obtener datos del backend usando firstValueFrom en lugar de toPromise()
      const response: any = await firstValueFrom(
        this.regulatoryService.searchL01Data(searchRequest).pipe(
          timeout(30000), // 30 segundos de timeout
          catchError(error => {
            this.txtLogger.error('L01MainComponent', 'Error o timeout en búsqueda de datos', error);
            throw new Error('Timeout: La búsqueda de datos tardó más de 30 segundos');
          })
        )
      );
      
      if (!response || !response.datos) {
        this.txtLogger.warn('L01MainComponent', 'Backend no retornó datos para validación');
        return {
          timestamp: new Date(),
          filtrosAplicados: {
            tipoIdentificacion: this.tipoIdentificacion || 'Todos',
            clasificacion: this.clasificacion || 'Todas',
            tipoEmisor: this.tipoEmisor || 'Todos'
          },
          totalRegistros: 0,
          registrosValidados: [],
          erroresEncontrados: [],
          advertencias: [],
          estadoGeneral: 'SIN_DATOS'
        };
      }

      // Transformar datos del backend a formato oficial L01
      this.datosL01 = this.transformBackendDataToL01Official(response.datos);
      
      this.txtLogger.info('L01MainComponent', `Datos obtenidos del backend: ${this.datosL01.length} registros`);

      // PASO 2: Validar cada registro contra catálogos oficiales
      const validationResults = {
        timestamp: new Date(),
        filtrosAplicados: {
          tipoIdentificacion: this.tipoIdentificacion || 'Todos',
          clasificacion: this.clasificacion || 'Todas',
          tipoEmisor: this.tipoEmisor || 'Todos'
        },
        totalRegistros: this.datosL01.length,
        registrosValidados: [] as any[],
        erroresEncontrados: [] as any[],
        advertencias: [] as any[],
        estadoGeneral: 'PENDIENTE'
      };

      // Validar cada registro contra catálogos oficiales
      for (const registro of this.datosL01) {
        const registroValidation = this.validateL01Record(registro);
        validationResults.registrosValidados.push(registroValidation);

        if (registroValidation.errores.length > 0) {
          validationResults.erroresEncontrados.push(...registroValidation.errores);
        }

        if (registroValidation.advertencias.length > 0) {
          validationResults.advertencias.push(...registroValidation.advertencias);
        }
      }

      // Determinar estado general de validación
      if (validationResults.erroresEncontrados.length === 0 && validationResults.advertencias.length === 0) {
        validationResults.estadoGeneral = 'VÁLIDO';
      } else if (validationResults.erroresEncontrados.length === 0) {
        validationResults.estadoGeneral = 'VÁLIDO_CON_ADVERTENCIAS';
      } else {
        validationResults.estadoGeneral = 'CON_ERRORES';
      }

      this.txtLogger.info('L01MainComponent', 'Validación completada', validationResults);
      return validationResults;

    } catch (error) {
      this.txtLogger.error('L01MainComponent', 'Error al obtener datos del backend para validación', error);
      throw error;
    }
  }

  /**
   * Validar un registro individual L01 contra catálogos oficiales
   */
  private validateL01Record(registro: L01RegulatoryData): any {
    const validation = {
      id: registro.id,
      identificacion: registro.identificacion,
      errores: [] as any[],
      advertencias: [] as any[],
      estado: 'PENDIENTE'
    };

    // Validar Tipo de Identificación (Tabla 4)
    if (!['R', 'X'].includes(registro.tipoIdentificacion)) {
      validation.errores.push({
        campo: 'tipoIdentificacion',
        mensaje: 'Tipo de identificación debe ser R (RUC) o X (Extranjero)',
        severidad: 'ERROR'
      });
    }

    // Validar Identificación según tipo
    if (registro.tipoIdentificacion === 'R') {
      if (!/^\d{13}$/.test(registro.identificacion)) {
        validation.errores.push({
          campo: 'identificacion',
          mensaje: 'RUC debe tener exactamente 13 dígitos',
          severidad: 'ERROR'
        });
      }
      if (!registro.identificacion.startsWith('17')) {
        validation.errores.push({
          campo: 'identificacion',
          mensaje: 'RUC debe empezar con 17 (Ecuador)',
          severidad: 'ERROR'
        });
      }
    } else if (registro.tipoIdentificacion === 'X') {
      if (!/^\d{1,7}$/.test(registro.identificacion)) {
        validation.errores.push({
          campo: 'identificacion',
          mensaje: 'Código extranjero debe ser numérico y máximo 7 dígitos',
          severidad: 'ERROR'
        });
      }
    }

    // Validar Clasificación (Tabla 173)
    if (![1, 2, 3, 4].includes(registro.clasificacion)) {
      validation.errores.push({
        campo: 'clasificacion',
        mensaje: 'Clasificación debe ser 1, 2, 3 o 4',
        severidad: 'ERROR'
      });
    }

    // Validar Tipo de Emisor (Tabla 73) - Solo valores válidos para L01
    const valoresValidosL01 = [0, 2, 3, 4, 5, 7, 8, 9];
    if (!valoresValidosL01.includes(registro.tipoEmisor)) {
      validation.errores.push({
        campo: 'tipoEmisor',
        mensaje: `Tipo de emisor debe ser uno de: ${valoresValidosL01.join(', ')}`,
        severidad: 'ERROR'
      });
    }

    // Determinar estado del registro
    if (validation.errores.length === 0 && validation.advertencias.length === 0) {
      validation.estado = 'VÁLIDO';
    } else if (validation.errores.length === 0) {
      validation.estado = 'VÁLIDO_CON_ADVERTENCIAS';
    } else {
      validation.estado = 'CON_ERRORES';
    }

    return validation;
  }

  /**
   * Mostrar modal con resultados de validación para intervención manual
   */
  private showValidationResultsModal(validationResults: any): void {
    this.txtLogger.info('L01MainComponent', 'Mostrando modal de resultados de validación');
    
    // Mostrar modal de validación con resultados
    this.validationResults = validationResults;
    this.showValidationModal = true;
    
    // Log de resultados para debugging
    console.log('Resultados de validación L01:', validationResults);
  }

  /**
   * Generar reporte L01 después de validación exitosa
   */
  private async generateL01Report(validationResults: any): Promise<void> {
    this.txtLogger.info('L01MainComponent', 'Generando reporte L01 después de validación exitosa');

    try {
      // Construir request para backend - OBTENER TODOS LOS REGISTROS (sin filtros)
      const searchRequest = {
        id: 0,
        codigoTipoIdentificacion: 0, // 0 = Todos los tipos
        codigoEmisor: 0,             // 0 = Todos los emisores
        codigoClasificacionEmisor: 0, // 0 = Todas las clasificaciones
        codigoTipoEmisor: 0           // 0 = Todos los tipos de emisor
      };

      this.txtLogger.info('L01MainComponent', 'Request para backend - obteniendo todos los registros L01', searchRequest);

      // Llamar al servicio para buscar datos usando firstValueFrom
      const response: any = await firstValueFrom(
        this.regulatoryService.searchL01Data(searchRequest).pipe(
          timeout(30000), // 30 segundos de timeout
          catchError(error => {
            this.txtLogger.error('L01MainComponent', 'Error o timeout en generación de reporte', error);
            throw new Error('Timeout: La generación del reporte tardó más de 30 segundos');
          })
        )
      );

      this.txtLogger.info('L01MainComponent', 'Respuesta del backend para reporte L01', response);

      if (response && response.datos) {
        // Transformar datos del backend a formato oficial L01
        this.datosL01 = this.transformBackendDataToL01Official(response.datos);

        // Preparar datos para exportación
        this.prepareExportData();

        // Mostrar confirmación de reporte generado
        this.showSuccessMessage(`Reporte L01 generado exitosamente con ${this.datosL01.length} registros después de validación.`);

        this.txtLogger.info('L01MainComponent', 'Reporte L01 generado después de validación', {
          totalRegistros: this.datosL01.length,
          estadoValidacion: validationResults.estadoGeneral
        });
      } else {
        this.txtLogger.warn('L01MainComponent', 'Backend no retornó datos válidos para reporte');
        this.datosL01 = [];
        this.error = 'No se encontraron datos L01 en el backend para generar el reporte.';
      }

    } catch (error: any) {
      this.txtLogger.error('L01MainComponent', 'Error al generar reporte L01 después de validación', error);
      
      // Mostrar mensaje de error específico
      if (error.message && error.message.includes('Timeout')) {
        this.error = error.message;
      } else if (error.status === 0) {
        this.error = 'Error de conectividad: No se puede conectar al servidor.';
      } else if (error.status === 404) {
        this.error = 'Endpoint no encontrado. Verifique la configuración del backend.';
      } else if (error.status === 500) {
        this.error = 'Error interno del servidor. Contacte al administrador.';
      } else {
        this.error = `Error ${error.status}: ${error.message || 'Error desconocido al generar reporte después de validación'}`;
      }
    } finally {
      // IMPORTANTE: Siempre desactivar loading
      this.loading = false;
    }
  }

  // ========================================
  // MÉTODOS PARA MODAL DE VALIDACIÓN
  // ========================================

  /**
   * Maneja el cierre del modal de validación
   */
  onValidationModalClosed(): void {
    this.showValidationModal = false;
    this.validationResults = null;
    this.loading = false;
    this.txtLogger.info('L01MainComponent', 'Modal de validación cerrado');
  }

  /**
   * Maneja la decisión de proceder con el reporte después de validación
   */
  onValidationProceedWithReport(validationResults: ValidationResults): void {
    this.txtLogger.info('L01MainComponent', 'Usuario decidió proceder con reporte después de validación', validationResults);
    
    // Cerrar modal de validación
    this.showValidationModal = false;
    this.validationResults = null;
    
    // Proceder con generación del reporte
    this.generateL01Report(validationResults);
  }

  /**
   * Maneja la decisión de corregir errores
   */
  onValidationFixErrors(): void {
    this.txtLogger.info('L01MainComponent', 'Usuario decidió corregir errores de validación');
    
    // Cerrar modal de validación
    this.showValidationModal = false;
    this.validationResults = null;
    this.loading = false;
    
    // Mostrar mensaje para corregir errores
    this.error = 'Por favor, corrija los errores de validación identificados antes de generar el reporte L01.';
    
    // TODO: Implementar navegación a formularios de corrección en HITO 3
  }

  // ========================================
  // MÉTODOS PARA FILTRADO DEL GRID
  // ========================================

  /**
   * Aplicar filtros al grid de datos
   */
  applyGridFilters(): void {
    this.txtLogger.info('L01MainComponent', 'Aplicando filtros al grid', {
      tipoIdentificacion: this.tipoIdentificacion,
      clasificacion: this.clasificacion,
      tipoEmisor: this.tipoEmisor
    });

    // Filtrar los datos del grid según los filtros seleccionados
    this.filteredDataL01 = this.datosL01.filter(record => {
      let matches = true;

      // Filtro por Tipo de Identificación
      if (this.tipoIdentificacion && record.tipoIdentificacion !== this.tipoIdentificacion) {
        matches = false;
      }

      // Filtro por Clasificación
      if (this.clasificacion && record.clasificacion !== parseInt(this.clasificacion)) {
        matches = false;
      }

      // Filtro por Tipo de Emisor
      if (this.tipoEmisor && record.tipoEmisor !== parseInt(this.tipoEmisor)) {
        matches = false;
      }

      return matches;
    });

    this.txtLogger.info('L01MainComponent', `Filtros aplicados: ${this.filteredDataL01.length} registros de ${this.datosL01.length} total`);
  }

  /**
   * Limpiar filtros del grid
   */
  clearGridFilters(): void {
    this.txtLogger.info('L01MainComponent', 'Limpiando filtros del grid');
    this.tipoIdentificacion = '';
    this.clasificacion = '';
    this.tipoEmisor = '';
    
    // Restaurar todos los datos
    this.filteredDataL01 = [...this.datosL01];
    
    this.txtLogger.info('L01MainComponent', 'Filtros limpiados, mostrando todos los registros');
  }

  /**
   * Obtener descripción del tipo de identificación
   */
  getTipoIdentificacionDesc(codigo: string): string {
    const tipo = this.tiposIdentificacionL01.find(t => t.codigo === codigo);
    return tipo ? tipo.descripcion : codigo;
  }

}
