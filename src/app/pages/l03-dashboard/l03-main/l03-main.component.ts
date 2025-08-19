/**
 * COMPONENTE L03 MAIN - DASHBOARD PRINCIPAL
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
import { LogMonitorComponent } from '../../../components/debug/log-monitor/log-monitor.component';
import { L01ConfirmationComponent, ConfirmationData } from '../../../components/l01/l01-confirmation/l01-confirmation.component';
import { LoggerService } from '../../../services/logger.service';
import { TxtLoggerService } from '../../../services/txt-logger.service';
import { environment } from '../../../../environments/environment';
import { getL01FieldTooltip, L01FieldTooltip, L01_STRUCTURE_INFO } from '../../../utils/l01-field-tooltips';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { L03FieldsTableComponent } from '../../../components/l03/l03-table/l03-fields-table.component';

@Component({
  selector: 'app-l03-main',
  templateUrl: './l03-main.component.html',
  styleUrls: ['./l03-main.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, L01ExportComponent, LogMonitorComponent, L01ConfirmationComponent, L03FieldsTableComponent]
})
export class L03MainComponent implements OnInit {
  // Datos del reporte
  reportData: any = null;
  datosL03: L01RegulatoryData[] = [];
  loading = false;
  error = '';

  // Filtros según especificaciones oficiales L01
  fechaInicio = '';
  fechaFin = '';
  tipoIdentificacion = '';
  clasificacion = '';
  tipoEmisor = '';
  
  // Propiedades según especificación oficial L01 - Manual SB Marzo 2017
   
  // Historial
  historial: any[] = [];
  showHistorial = false;
  
  // Tooltips
  tooltips = L01_STRUCTURE_INFO;
  currentTooltip: L01FieldTooltip | null = null;
  showTooltip = false;
  tooltipPosition = { x: 0, y: 0 };

  // Columnas según especificaciones oficiales L01 (Manual SB - Marzo 2017)
  // EXACTAMENTE 4 campos oficiales según tabla de detalle L01:
  displayedColumns: string[] = [
    'tipoIdentificacion',    // Campo 1: Tipo de identificación del emisor/custodio/depositario/contraparte (R/X) - Tabla 4
    'identificacion',        // Campo 2: Identificación del emisor/custodio/depositario/contraparte (RUC 13 dígitos o código extranjero) - Tabla 164
    'clasificacion',         // Campo 3: Clasificación de emisor/custodio/depositario/contraparte (1-4) - Tabla 173
    'tipo'                   // Campo 4: Tipo de emisor/custodio/depositario/contraparte (1,2,3,4,5) - Tabla 73
  ];

  // Datos para exportación
  exportData: L01ExportData[] = [];
  fechaCorte: Date = new Date();
  usuarioActual = 'Christian Aguirre';
  
  // Control del monitor de logs
  showLogMonitor = !environment.production; // Solo en desarrollo
  
  // Control del switch de datos mock/real
  isUsingMockData = environment.useMockData;
  isProduction = environment.production;
  
  // Catálogos dinámicos para filtros L01
  tiposIdentificacionL01: any[] = [];
  tiposEmisorL01: any[] = [];
  clasificacionesL01: any[] = [];
  codigosExtranjeros: any[] = [];

  // Propiedades para códigos extranjeros
  codigosExtranjerosL03: any[] = [];
  
  // NUEVO: Estados del componente de confirmación
  showConfirmationModal = false;
  confirmationData: ConfirmationData | null = null;
  confirmationLoading = false;
  
  // NUEVO: Estados para creación de registros
  showCreationForm = false;
  newRecord: any = {};
  
  // NUEVO: Estados para edición inline
  editingRow: number | null = null;
  editingField: string | null = null;
  originalValue: any = null;
  editValue: any = null;
  isSaving = false;
  
  // NUEVO: Estados para eliminación
  recordToDelete: any = null;
  
  // Método para obtener el tipo de identificación actual de una fila
  getTipoIdentificacionActual(rowIndex: number): string {
    if (rowIndex >= 0 && rowIndex < this.datosL03.length) {
      return this.datosL03[rowIndex].tipoIdentificacion;
    }
    return '';
  }
  
  // Método para manejar input de identificación con validación en tiempo real
  onIdentificacionInput(event: any): void {
    const value = event.target.value;
    const tipoId = this.getTipoIdentificacionActual(this.editingRow || 0);
    
    // Validación en tiempo real
    if (tipoId === 'R') {
      // Solo números para RUC
      const numericValue = value.replace(/\D/g, '');
      if (numericValue !== value) {
        event.target.value = numericValue;
        this.editValue = numericValue;
      }
      
      // Limitar a 13 dígitos
      if (numericValue.length > 13) {
        event.target.value = numericValue.substring(0, 13);
        this.editValue = numericValue.substring(0, 13);
      }
    } else if (tipoId === 'X') {
      // Solo números para códigos extranjeros
      const numericValue = value.replace(/\D/g, '');
      if (numericValue !== value) {
        event.target.value = numericValue;
        this.editValue = numericValue;
      }
      
      // Limitar a 7 dígitos
      if (numericValue.length > 7) {
        event.target.value = numericValue.substring(0, 7);
        this.editValue = numericValue.substring(0, 7);
      }
    }
  }
  
  // Cargar códigos extranjeros del catálogo t164
  loadCodigosExtranjeros(): void {
    this.catalogService.getTabla164ForL01().subscribe({
      next: (codigos) => {
        this.codigosExtranjerosL03 = codigos;
        this.txtLogger.info('L03MainComponent', 'Códigos extranjeros cargados exitosamente', {
          count: codigos.length
        });
      },
      error: (error) => {
        this.txtLogger.error('L03MainComponent', 'Error al cargar códigos extranjeros', error);
        // Fallback a datos mock si falla la API
        this.codigosExtranjerosL03 = [
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
    private logger: LoggerService,
    private txtLogger: TxtLoggerService,
    private http: HttpClient
  ) { 
    this.logger.info('L03MainComponent', 'Componente inicializado');
    this.txtLogger.info('L03MainComponent', 'Componente principal L01 inicializado con logs TXT');
    this.txtLogger.info('L03MainComponent', `Modo de datos: ${this.isUsingMockData ? 'MOCK' : 'REAL'}`);
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
   * Cargar datos iniciales
   */
  loadInitialData(): void {
    this.logger.info('L03MainComponent', 'Iniciando carga de datos iniciales');
    this.loading = true;
    this.fechaInicio = this.getDefaultStartDate();
    this.fechaFin = this.getDefaultEndDate();
    
    // Cargar catálogos dinámicos primero
    this.loadCatalogsForL01().then(() => {
      // Luego cargar datos reales del backend
      setTimeout(() => {
        try {
          if (this.isUsingMockData) {
            // Si está en modo mock, generar datos de prueba
            this.generateMockData();
          } else {
            // Si está en modo PROD, cargar datos reales del backend
            this.loadRealDataFromBackend();
          }
          this.prepareExportData();
          this.loading = false;
          this.logger.info('L03MainComponent', 'Datos iniciales cargados exitosamente', {
            totalRegistros: this.datosL03.length,
            exportData: this.exportData.length,
            catalogos: {
              tiposId: this.tiposIdentificacionL01.length,
              tiposEmisor: this.tiposEmisorL01.length,
              clasificaciones: this.clasificacionesL01.length
            },
            modo: this.isUsingMockData ? 'MOCK' : 'REAL'
          });
        } catch (error) {
          this.loading = false;
          this.logger.error('L03MainComponent', 'Error al cargar datos iniciales', error);
        }
      }, 1000);
    }).catch(error => {
      this.loading = false;
      this.logger.error('L03MainComponent', 'Error al cargar catálogos', error);
    });
  }

  /**
   * Cargar datos reales del backend
   */
  private loadRealDataFromBackend(): void {
    this.txtLogger.info('L03MainComponent', 'Cargando datos reales del backend');
    
    // Cargar datos reales de L01 desde el backend
    this.regulatoryService.listarTodos().subscribe({
      next: (data) => {
        this.datosL03 = data;
        this.error = ''; // Limpiar errores previos
        this.txtLogger.info('L03MainComponent', 'Datos reales del backend cargados exitosamente', {
          totalRegistros: this.datosL03.length,
          datos: data
        });
      },
      error: (error) => {
        this.txtLogger.error('L03MainComponent', 'Error al cargar datos reales del backend', error);
        
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
        this.datosL03 = [];
        
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
   * Cargar catálogos específicos para L01 desde el servidor
   */
  private async loadCatalogsForL01(): Promise<void> {
    this.txtLogger.info('L03MainComponent', 'Iniciando carga de catálogos dinámicos para L01');
    
    try {
      // Cargar Tabla 4 (Tipos de Identificación) - Solo R y X para L01
      this.catalogService.getTabla4().subscribe({
        next: (tipos) => {
          this.tiposIdentificacionL01 = tipos;
          this.txtLogger.info('L03MainComponent', `Tabla 4 cargada: ${tipos.length} tipos de identificación`, tipos);
        },
        error: (error) => {
          this.txtLogger.error('L03MainComponent', 'Error al cargar Tabla 4', error);
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
          this.txtLogger.info('L03MainComponent', `Tabla 73 cargada: ${tipos.length} tipos de emisor`, tipos);
        },
        error: (error) => {
          this.txtLogger.error('L03MainComponent', 'Error al cargar Tabla 73', error);
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
          this.txtLogger.info('L03MainComponent', `Tabla 173 cargada: ${clasificaciones.length} clasificaciones`, clasificaciones);
        },
        error: (error) => {
          this.txtLogger.error('L03MainComponent', 'Error al cargar Tabla 173', error);
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
          this.codigosExtranjerosL03 = codigos; // También para el select
          this.txtLogger.info('L03MainComponent', `Tabla 164 cargada: ${codigos.length} códigos extranjeros`);
        },
        error: (error) => {
          this.txtLogger.error('L03MainComponent', 'Error al cargar Tabla 164', error);
          console.error('Error específico Tabla 164:', {
            status: error.status,
            message: error.message,
            url: error.url
          });
        }
      });

      this.txtLogger.info('L03MainComponent', 'Catálogos dinámicos iniciados correctamente');
      
    } catch (error) {
      this.txtLogger.error('L03MainComponent', 'Error crítico al cargar catálogos', error);
      throw error;
    }
  }

  /**
   * Generar datos de prueba para L01 según especificaciones oficiales
   * Solo los 4 campos obligatorios del manual SB
   */
  generateMockData(): void {
    this.datosL03 = [
      {
        id: 1,
        tipoIdentificacion: 'R',              // Campo 1: R = RUC Nacional
        identificacion: '1791234567001',      // Campo 2: RUC de 13 dígitos
        clasificacion: 1,                     // Campo 3: 1 = Emisor
        tipo: 3,
        tipoEmisor: 3,                       // Campo 4: 3 = Privada financiera
        fechaCreacion: new Date('2024-01-15'),
        usuarioCreacion: 'Christian Aguirre'
      },
      {
        id: 2,
        tipoIdentificacion: 'X',              // Campo 1: X = Código Extranjero
        identificacion: '100001',            // Campo 2: Código extranjero de 7 dígitos
        clasificacion: 2,                     // Campo 3: 2 = Custodio
        tipo: 8,
        tipoEmisor: 8,                       // Campo 4: 8 = Estados Soberanos
        fechaCreacion: new Date('2024-02-20'),
        usuarioCreacion: 'Christian Aguirre'
      },
      {
        id: 3,
        tipoIdentificacion: 'R',              // Campo 1: R = RUC Nacional
        identificacion: '1798765432001',      // Campo 2: RUC de 13 dígitos
        clasificacion: 3,                     // Campo 3: 3 = Depositario
        tipo: 5,
        tipoEmisor: 5,                       // Campo 4: 5 = Privada no financiera
        fechaCreacion: new Date('2024-03-10'),
        usuarioCreacion: 'Christian Aguirre'
      },
      {
        id: 4,
        tipoIdentificacion: 'X',              // Campo 1: X = Código Extranjero
        identificacion: '100002',            // Campo 2: Código extranjero de 7 dígitos
        clasificacion: 4,                     // Campo 3: 4 = Contraparte
        tipo: 9,
        tipoEmisor: 9,                       // Campo 4: 9 = Multilaterales
        fechaCreacion: new Date('2024-04-05'),
        usuarioCreacion: 'Christian Aguirre'
      }
    ];
  }

  /**
   * Generar reporte L01
   */
  generateReport(): void {
    this.loading = true;
    this.error = '';

    // Simular generación de reporte
    setTimeout(() => {
      this.loading = false;
      console.log('Reporte L01 generado:', {
        fechaInicio: this.fechaInicio,
        fechaFin: this.fechaFin,
        totalRegistros: this.datosL03.length
      });
    }, 2000);
  }

  /**
   * Exportar reporte
   */
  exportReport(): void {
    const data = {
      reporte: 'L01',
      fechaGeneracion: new Date().toISOString(),
      datos: this.datosL03
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `L01_${this.formatDateForFile(new Date())}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  /**
   * Cargar historial
   */
  loadHistory(): void {
    this.historial = [
      { fecha: '2024-08-07', usuario: 'admin', accion: 'Generación reporte' },
      { fecha: '2024-08-06', usuario: 'admin', accion: 'Actualización datos' },
      { fecha: '2024-08-05', usuario: 'admin', accion: 'Exportación reporte' }
    ];
    this.showHistorial = !this.showHistorial;
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
    return this.datosL03.length;
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
    return this.datosL03.filter(item => item.tipoIdentificacion === 'R').length;
  }

  /**
   * Obtener cantidad de registros extranjeros
   */
  getRegistrosExtranjeros(): number {
    return this.datosL03.filter(item => item.tipoIdentificacion === 'X').length;
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
      const index = this.datosL03.findIndex(d => d.identificacion === item.identificacion);
      if (index > -1) {
        this.datosL03.splice(index, 1);
        this.prepareExportData(); // Actualizar datos de exportación
      }
      alert(`Registro de ${item.identificacion} eliminado`);
    }
  }

  /**
   * Preparar datos para exportación según formato L01
   */
  prepareExportData(): void {
    this.exportData = this.datosL03.map(item => ({
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
    this.logger.info('L03MainComponent', `Monitor de logs ${this.showLogMonitor ? 'activado' : 'desactivado'}`);
  }

  /**
   * Simular error para pruebas
   */
  testError(): void {
    this.logger.error('L03MainComponent', 'Error de prueba generado manualmente', new Error('Error simulado para testing'));
  }

  /**
   * Simular advertencia para pruebas
   */
  testWarning(): void {
    this.logger.warn('L03MainComponent', 'Advertencia de prueba generada manualmente', { test: true });
  }

  /**
   * Obtener conteo por clasificación según especificación oficial L01
   * 1 = Emisor, 2 = Custodio, 3 = Depositario, 4 = Contraparte (Tabla 173)
   */
  getCountByClasificacion(clasificacion: number): number {
    return this.datosL03.filter(item => item.clasificacion === clasificacion).length;
  }

  /**
   * Actualizar datos manualmente (botón Actualizar)
   */
  refreshData(): void {
    this.txtLogger.info('L03MainComponent', 'Actualizando datos L01 manualmente por solicitud del usuario');
    this.logger.info('L03MainComponent', 'Refresh manual iniciado');
    
    // Limpiar datos actuales
    this.datosL03 = [];
    this.exportData = [];
    
    // Recargar todos los datos
    this.loadInitialData();
    
    // Notificación visual
    console.log('🔄 Datos L01 actualizados');
  }

  /**
   * Cambiar entre datos mock y reales
   */
  toggleDataMode(): void {
    this.isUsingMockData = !this.isUsingMockData;
    
    // Actualizar el servicio de catálogos
    this.catalogService.cambiarModoMock(this.isUsingMockData);
    
    // Log del cambio
    this.txtLogger.info('L03MainComponent', `Modo de datos cambiado a: ${this.isUsingMockData ? 'MOCK' : 'REAL'}`);
    this.logger.info('L03MainComponent', `Switch de datos: ${this.isUsingMockData ? 'Mock' : 'Real'}`);
    
    // Limpiar catálogos actuales
    this.tiposIdentificacionL01 = [];
    this.tiposEmisorL01 = [];
    this.clasificacionesL01 = [];
    this.codigosExtranjeros = [];
    
    // Recargar datos con el nuevo modo
    this.loadInitialData();
    
    // Mostrar notificación al usuario
    const message = this.isUsingMockData 
      ? 'Cambiado a datos MOCK (desarrollo)' 
      : 'Cambiado a datos REALES (backend)';
    
    // Aquí podrías agregar una notificación toast si tienes un servicio de notificaciones
    console.log(`🔄 ${message}`);
  }

  /**
   * Mostrar tooltip para un campo específico
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
      
      this.txtLogger.debug('L03MainComponent', `Tooltip mostrado para campo: ${field}`, {
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
      this.datosL03.push(newRecord);
      
      // Log de auditoría
      this.auditService.logCreation(newRecord).subscribe({
        next: (auditResult) => {
          this.txtLogger.info('L03MainComponent', 'Registro L01 creado exitosamente', {
            record: newRecord,
            auditResult: auditResult
          });
        },
        error: (error) => {
          this.txtLogger.error('L03MainComponent', 'Error al registrar auditoría de creación', error);
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

  /**
   * NUEVO: Iniciar edición inline
   */
  startEdit(rowIndex: number, field: string): void {
    if (this.editingRow !== null) {
      this.cancelEdit();
    }
    
    this.editingRow = rowIndex;
    this.editingField = field;
    this.originalValue = this.datosL03[rowIndex][field];
    this.editValue = this.originalValue;
    
    this.txtLogger.debug('L03MainComponent', `Iniciando edición inline`, {
      row: rowIndex,
      field: field,
      originalValue: this.originalValue
    });
  }
  
  /**
   * NUEVO: Cancelar edición
   */
  cancelEdit(): void {
    this.editingRow = null;
    this.editingField = null;
    this.originalValue = null;
    this.editValue = null;
    
    this.txtLogger.debug('L03MainComponent', 'Edición cancelada');
  }
  
  /**
   * NUEVO: Guardar cambios con confirmación
   */
  saveEdit(): void {
    if (this.editingRow === null || this.editingField === null) {
      return;
    }
    
    const newValue = this.editValue;
    const oldValue = this.originalValue;
    
    // Validate field before saving with real-time feedback
    const validation = this.validateFieldRealTime(this.editingField, newValue);
    
    if (!validation.isValid) {
      // Show validation error to user
      this.showValidationError(validation.message);
      this.txtLogger.warn('L03MainComponent', `Validación fallida para campo ${this.editingField}`, {
        field: this.editingField,
        value: newValue,
        message: validation.message
      });
      return;
    }
    
    // Mostrar ventana de confirmación
    this.showEditConfirmation(this.editingRow, this.editingField, oldValue, newValue, validation);
  }

  /**
   * NUEVO: Mostrar confirmación de edición
   */
  showEditConfirmation(rowIndex: number, field: string, oldValue: any, newValue: any, validation: any): void {
    this.confirmationData = {
      type: 'edit',
      title: 'Confirmar Cambios en Registro L01',
      message: '¿Está seguro de que desea aplicar estos cambios?',
      details: { rowIndex, field, oldValue, newValue }, // Added missing details property
      changes: {
        field: field,
        oldValue: oldValue,
        newValue: newValue,
        validation: validation
      }
    };
    
    this.showConfirmationModal = true;
  }

  /**
   * NUEVO: Confirmar edición
   */
  onEditConfirmed(data: ConfirmationData): void {
    if (!data.changes) return;
    
    this.confirmationLoading = true;
    
    // Simular persistencia en BD
    setTimeout(() => {
      const { field, newValue, oldValue } = data.changes!; // Added non-null assertion
      const rowIndex = this.editingRow!;
      
      // Update local data immediately for UI responsiveness
      this.datosL03[rowIndex][field] = newValue;
      
      // Log de auditoría
      this.auditService.logFieldChange(
        this.datosL03[rowIndex].id || 0,
        field,
        oldValue,
        newValue,
        this.usuarioActual
      ).subscribe({
        next: (auditResult) => {
          this.txtLogger.info('L03MainComponent', `Campo ${field} actualizado exitosamente`, {
            field: field,
            oldValue: oldValue,
            newValue: newValue,
            auditResult: auditResult
          });
        },
        error: (error) => {
          this.txtLogger.error('L03MainComponent', `Error al registrar auditoría de modificación`, error);
        }
      });
      
      // Actualizar datos de exportación
      this.prepareExportData();
      
      // Cerrar modal y limpiar
      this.showConfirmationModal = false;
      this.confirmationData = null;
      this.confirmationLoading = false;
      
      // Exit edit mode
      this.editingRow = null;
      this.editingField = null;
      this.originalValue = null;
      this.editValue = null;
      this.isSaving = false;
      
      // Show success message
      this.showSuccessMessage(`Campo ${field} actualizado exitosamente`);
      
    }, 1000);
  }

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
      const index = this.datosL03.findIndex(d => d.id === record.id);
      if (index > -1) {
        this.datosL03.splice(index, 1);
        
        // Log de auditoría
        this.auditService.logDeletion(record, this.usuarioActual).subscribe({
          next: (auditResult) => {
            this.txtLogger.info('L03MainComponent', 'Registro L01 eliminado exitosamente', {
              record: record,
              auditResult: auditResult
            });
          },
          error: (error) => {
            this.txtLogger.error('L03MainComponent', 'Error al registrar auditoría de eliminación', error);
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
      case 'edit':
        this.onEditConfirmed(data);
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
    
    // Si estaba editando, cancelar edición
    if (this.editingRow !== null) {
      this.cancelEdit();
    }
    
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
      const validForeignCodes = this.codigosExtranjerosL03.map(codigo => codigo.codigo.toString());
      
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
    return this.codigosExtranjerosL03.map(codigo => codigo.codigo.toString());
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
    const record = this.datosL03[rowIndex];
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
  
  isEditing(rowIndex: number, field: string): boolean {
    return this.editingRow === rowIndex && this.editingField === field;
  }
  
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.saveEdit();
    } else if (event.key === 'Escape') {
      this.cancelEdit();
    }
  }
}
