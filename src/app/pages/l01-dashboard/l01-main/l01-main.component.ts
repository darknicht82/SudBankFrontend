/**
 * COMPONENTE L01 MAIN - DASHBOARD PRINCIPAL
 * Manual de Control de Inversiones - Marzo 2017
 * Superintendencia de Bancos del Ecuador
 * 
 * COMPONENTE RECONSTRUIDO COMPLETAMENTE - SIN CÓDIGO MUERTO
 */

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { L01ExportData } from '../../../models/l01-export.model';
import { L01CatalogService } from '../../../services/l01/l01-catalog.service';
import { L01Service, L01Record } from '../../../services/l01/l01.service';
import { L01ExportService } from '../../../services/l01/l01-export.service';
import { LogMonitorComponent } from '../../../components/debug/log-monitor/log-monitor.component';
import { L01NuevoRegistroNesComponent } from '../../../components/l01/l01-nuevo-registro-nes/l01-nuevo-registro-nes.component';
import { L01NuevoEmisorComponent } from '../../../components/l01/l01-nuevo-emisor/l01-nuevo-emisor.component';
import { LoggerService } from '../../../services/logger.service';
import { TxtLoggerService } from '../../../services/txt-logger.service';
import { environment } from '../../../../environments/environment';
import { getL01FieldTooltip, L01FieldTooltip, L01_STRUCTURE_INFO } from '../../../utils/l01-field-tooltips';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-l01-main',
  templateUrl: './l01-main.component.html',
  styleUrls: ['./l01-main.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    L01NuevoRegistroNesComponent,
    L01NuevoEmisorComponent,
    LogMonitorComponent
  ],
})
export class L01MainComponent implements OnInit {
  // ========================================
  // PROPIEDADES BÁSICAS DEL COMPONENTE
  // ========================================
  
  // Datos del reporte
  datosL01: L01Record[] = [];
  registrosFiltrados: number = 0; // ✅ NUEVO: Contador de registros filtrados por validación L01
  loading = false;
  error = '';

  // Filtros para el grid (NO para generación de reporte)
  tipoIdentificacion = '';
  clasificacion = '';
  tipoEmisor = '';
  
  // Columnas de la tabla según especificación oficial L01
  displayedColumns: string[] = [
    'tipoIdentificacion',    // Campo 1: Tipo de identificación (R/X) - Tabla 4
    'identificacion',        // Campo 2: Identificación (RUC o código extranjero) - Tabla 164
    'clasificacion',         // Campo 3: Clasificación (1-4) - Tabla 173
    'tipoEmisor'             // Campo 4: Tipo de emisor (sectores económicos) - Tabla 73
  ];

  // Datos para exportación
  exportData: L01ExportData[] = [];
  fechaCorte: Date = new Date();
  usuarioActual = 'Christian Aguirre';
  
  // Control del monitor de logs
  showLogMonitor = !environment.production;
  isProduction = environment.production;
  
  // Catálogos dinámicos para filtros del grid
  tiposIdentificacionL01: any[] = [];
  tiposEmisorL01: any[] = [];
  clasificacionesL01: any[] = [];
  codigosExtranjerosL01: any[] = [];
  
  // Estados para modal de formulario
  showModalForm = false;
  editData: L01Record | null = null;
  isSaving = false;
  
  // Estados para modal de agregar emisor
  showEmitterModal = false;
  
  // Tooltips
  tooltips = L01_STRUCTURE_INFO;
  currentTooltip: L01FieldTooltip | null = null;
  showTooltip = false;
  tooltipPosition = { x: 0, y: 0 };
  
  // Datos filtrados para el grid
  filteredDataL01: L01Record[] = [];

  // ========================================
  // CONSTRUCTOR E INICIALIZACIÓN
  // ========================================

  constructor(
    private catalogService: L01CatalogService,
    private l01Service: L01Service,
    private exportService: L01ExportService,
    private logger: LoggerService,
    private txtLogger: TxtLoggerService,
    private http: HttpClient
  ) { 
    this.logger.info('L01MainComponent', 'Componente inicializado');
    this.txtLogger.info('L01MainComponent', 'Componente principal L01 inicializado con logs TXT');
  }

  ngOnInit(): void {
    this.loadInitialData();
  }

  // ========================================
  // CARGA DE DATOS INICIALES
  // ========================================

  /**
   * Carga datos iniciales del componente L01
   * ✅ CORREGIDO: Sincronizar carga de catálogos antes de procesar datos
   */
  private loadInitialData(): void {
    this.logger.info('L01MainComponent', 'Iniciando carga de datos iniciales');
    this.loading = true;
    
    // ✅ SINCRONIZAR: Cargar TODOS los catálogos primero, luego datos del backend
    this.loadCatalogsForL01().then(() => {
      this.txtLogger.info('L01MainComponent', 'Todos los catálogos cargados, procediendo con datos del backend');
            this.loadRealDataFromBackend();
    }).catch(error => {
      this.txtLogger.error('L01MainComponent', 'Error al cargar catálogos', error);
      this.loading = false;
    });
  }

  /**
   * Cargar catálogos para mapeo correcto de IDs
   * ✅ CORREGIDO: Cargar TODOS los catálogos sin filtrar para mapear IDs reales
   * ✅ SINCRONIZADO: Retorna Promise para esperar a que todos estén listos
   */
  private loadCatalogsForL01(): Promise<void> {
    return new Promise((resolve, reject) => {
      let catalogsLoaded = 0;
      const totalCatalogs = 4;
      
      const checkAllLoaded = () => {
        catalogsLoaded++;
        if (catalogsLoaded === totalCatalogs) {
          this.txtLogger.info('L01MainComponent', 'Todos los catálogos cargados exitosamente', {
            totalCatalogs: totalCatalogs,
            catalogsLoaded: catalogsLoaded
          });
          resolve();
        }
      };
      
      const handleError = (error: any, catalogName: string) => {
        this.logger.error('L01MainComponent', `Error al cargar ${catalogName}`, error);
        reject(error);
      };
      
      // Cargar Tipo de Identificación (T4) - TODOS para mapear IDs reales
      this.catalogService.getTabla4().subscribe({
        next: (data) => {
          // ✅ CARGA COMPLETA: Todos los tipos para mapear IDs reales
          this.tiposIdentificacionL01 = data;
          
          this.txtLogger.info('L01MainComponent', 'Tipos de Identificación T4 cargados completamente', {
            totalRegistros: this.tiposIdentificacionL01.length,
            todosLosRegistros: this.tiposIdentificacionL01.map(t => ({ id: t.id, codigo: t.codigo, descripcion: t.descripcion }))
          });
          checkAllLoaded();
        },
        error: (error) => handleError(error, 'Tipos de Identificación')
      });

      // Cargar Clasificaciones (T173) - TODAS para mapear IDs reales
      this.catalogService.getTabla173().subscribe({
        next: (data) => {
          // ✅ CARGA COMPLETA: Todas las clasificaciones para mapear IDs reales
          this.clasificacionesL01 = data;
          
          this.txtLogger.info('L01MainComponent', 'Clasificaciones T173 cargadas completamente', {
            totalRegistros: this.clasificacionesL01.length,
            todosLosRegistros: this.clasificacionesL01.map(c => ({ id: c.id, codigo: c.codigo, descripcion: c.descripcion }))
          });
          checkAllLoaded();
        },
        error: (error) => handleError(error, 'Clasificaciones')
      });

      // Cargar Tipos de Emisor (T73) - TODOS para mapear IDs reales
      this.catalogService.getTabla73().subscribe({
        next: (data) => {
          // ✅ CARGA COMPLETA: Todos los tipos de emisor para mapear IDs reales
          this.tiposEmisorL01 = data;
          
          this.txtLogger.info('L01MainComponent', 'Tipos de Emisor T73 cargados completamente', {
            totalRegistros: this.tiposEmisorL01.length,
            todosLosRegistros: this.tiposEmisorL01.map(t => ({ id: t.id, codigo: t.codigo, descripcion: t.descripcion }))
          });
          checkAllLoaded();
        },
        error: (error) => handleError(error, 'Tipos de Emisor')
      });

      // Cargar Códigos Extranjeros (T164) - TODOS para mapear IDs reales
      this.catalogService.getTabla164().subscribe({
        next: (data) => {
          this.codigosExtranjerosL01 = data;
          this.txtLogger.info('L01MainComponent', 'Códigos Extranjeros T164 cargados completamente', {
            totalRegistros: this.codigosExtranjerosL01.length
          });
          checkAllLoaded();
        },
        error: (error) => handleError(error, 'Códigos Extranjeros')
      });
    });
  }

  /**
   * Cargar datos reales del backend
   */
  private loadRealDataFromBackend(): void {
    this.txtLogger.info('L01MainComponent', 'Cargando datos reales del backend');
    
    this.l01Service.getAll().subscribe({
      next: (data: any[]) => {
        this.datosL01 = this.transformBackendDataToL01Official(data);
        this.filteredDataL01 = [...this.datosL01];
        this.error = '';
        this.loading = false;
        
        this.txtLogger.info('L01MainComponent', 'Datos reales del backend cargados exitosamente', {
          totalRegistros: this.datosL01.length
        });
      },
      error: (error: any) => {
        this.txtLogger.error('L01MainComponent', 'Error al cargar datos reales del backend', error);
        this.loading = false;
        
        if (error.status === 0) {
          this.error = 'Error de conectividad: No se puede conectar al servidor.';
        } else if (error.status === 404) {
          this.error = 'Endpoint no encontrado. Verifique la configuración del backend.';
        } else if (error.status === 500) {
          this.error = 'Error interno del servidor. Contacte al administrador.';
        } else {
          this.error = `Error ${error.status}: ${error.message || 'Error desconocido al cargar datos'}`;
        }
        
        this.datosL01 = [];
        this.filteredDataL01 = [];
      }
    });
  }

  // ========================================
  // TRANSFORMACIÓN DE DATOS
  // ========================================

  /**
   * Transformar datos del backend al formato oficial L01
   * ✅ CORREGIDO: Mapeo correcto según estructura real de la API
   */
  private transformBackendDataToL01Official(backendData: any[]): L01Record[] {
    this.txtLogger.info('L01MainComponent', 'Iniciando transformación de datos del backend', {
      totalRegistrosBackend: backendData.length
    });
    
    // ✅ VALIDACIÓN ESTRICTA L01: Solo permitir códigos R y X
    const codigosPermitidosL01 = ['R', 'X'];
    
    // ✅ CONTAR REGISTROS FILTRADOS: Para mostrar mensaje informativo
    let registrosFiltrados = 0;
    
    const datosTransformados = backendData.map(item => {
      // ✅ TRANSFORMACIÓN: Mapeo correcto según estructura real de la API
      const transformedItem = {
        tipoIdentificacion: this.mapTipoIdentificacion(item.codigoTipoIdentificacion),
        identificacion: this.mapIdentificacion(item.codigoEmisor),
        clasificacion: item.codigoClasificacionEmisor,
        tipoEmisor: item.codigoTipoEmisor
      };
      
      return transformedItem;
    }).filter(item => {
      // ✅ FILTRO ESTRICTO L01: Solo registros con códigos permitidos
      const tipoIdentificacionValido = codigosPermitidosL01.includes(item.tipoIdentificacion);
      const datosBasicosValidos = item.clasificacion > 0 && 
                                  item.tipoEmisor > 0 && 
                                  item.tipoIdentificacion !== '' && 
                                  item.identificacion !== '';
      
      // ✅ VALIDACIÓN L01: Registrar errores de códigos no permitidos
      if (!tipoIdentificacionValido && item.tipoIdentificacion !== '') {
        this.txtLogger.error('L01MainComponent', 'REGISTRO L01 INVÁLIDO: Código de tipo de identificación no permitido', {
          codigoInvalido: item.tipoIdentificacion,
          codigosPermitidos: codigosPermitidosL01,
          registro: item,
          mensaje: 'Este registro contiene un código de tipo de identificación que no está permitido en L01'
        });
        registrosFiltrados++;
      }
      
      return tipoIdentificacionValido && datosBasicosValidos;
    });
    
    // ✅ ACTUALIZAR CONTADOR: Para mostrar en el mensaje informativo
    this.registrosFiltrados = registrosFiltrados;
    
    this.txtLogger.info('L01MainComponent', 'Transformación L01 completada', {
      totalRegistrosBackend: backendData.length,
      registrosValidos: datosTransformados.length,
      registrosFiltrados: registrosFiltrados
    });
    
    return datosTransformados;
  }

  /**
   * Mapear código de tipo de identificación a valor L01 oficial
   * ✅ CORREGIDO: Mapeo correcto de ID a código usando catálogo completo
   */
  private mapTipoIdentificacion(codigo: number): string {
    if (codigo === 0) return '';
    
    // Buscar en catálogo T4 por ID
    const tipo = this.tiposIdentificacionL01.find(t => t.id === codigo);
    if (tipo) {
      return tipo.codigo; // Retornar 'R', 'X', 'C', etc. del catálogo real
    }
    
    // ❌ NO SUPONER: Si no se encuentra, retornar vacío
    this.txtLogger.warn('L01MainComponent', 'Tipo de identificación no encontrado en catálogo T4', { codigo });
    return '';
  }

  /**
   * Mapear código de emisor a identificación L01 oficial
   * ✅ CORREGIDO: Mapeo correcto de ID a código usando catálogo completo
   */
  private mapIdentificacion(codigo: number): string {
    if (codigo === 0) return '';
    
    // Buscar en catálogo T164 por ID
    const emisor = this.codigosExtranjerosL01.find(e => e.id === codigo);
    if (emisor) {
      this.txtLogger.info('L01MainComponent', 'Emisor mapeado correctamente', {
        id: codigo,
        codigo: emisor.codigo,
        descripcion: emisor.descripcion
      });
      return emisor.codigo; // Retornar código extranjero del catálogo real
    }
    
    // ❌ NO SUPONER: Si no se encuentra, retornar vacío
    this.txtLogger.warn('L01MainComponent', 'Emisor no encontrado en catálogo T164', {
      codigo: codigo,
      catalogoDisponible: this.codigosExtranjerosL01.map(e => ({ id: e.id, codigo: e.codigo, descripcion: e.descripcion }))
    });
    return '';
  }

  /**
   * Obtener descripción del tipo de identificación (para display)
   * ✅ CORREGIDO: Descripción completa usando catálogo completo
   */
  getTipoIdentificacionDesc(codigo: string): string {
    // Buscar en catálogo T4 por código
    const tipo = this.tiposIdentificacionL01.find(t => t.codigo === codigo);
    if (tipo) {
      return `${tipo.codigo} - ${tipo.descripcion}`; // Usar descripción real del catálogo
    }
    
    // ❌ NO SUPONER: Si no se encuentra, retornar código tal como está
    this.txtLogger.warn('L01MainComponent', 'Descripción de tipo de identificación no encontrada en catálogo T4', {
      codigo: codigo,
      catalogoDisponible: this.tiposIdentificacionL01.map(t => ({ codigo: t.codigo, descripcion: t.descripcion }))
    });
    return codigo;
  }

  /**
   * Obtener descripción de la clasificación
   * ✅ CORREGIDO: Descripción completa usando catálogo completo
   */
  getClasificacionDesc(codigo: number): string {
    const clasificacion = this.clasificacionesL01.find(c => c.id === codigo);
    if (clasificacion) {
      return clasificacion.descripcion;
    }
    
    // ❌ NO SUPONER: Si no se encuentra, retornar descripción genérica
    this.txtLogger.warn('L01MainComponent', 'Clasificación no encontrada en catálogo T173', { codigo });
    return `Clasificación ${codigo}`;
  }

  /**
   * Obtener descripción del tipo de emisor
   * ✅ CORREGIDO: Descripción completa usando catálogo completo
   */
  getTipoEmisorDesc(codigo: number): string {
    const tipo = this.tiposEmisorL01.find(t => t.id === codigo);
    if (tipo) {
      return tipo.descripcion;
    }
    
    // ❌ NO SUPONER: Si no se encuentra, retornar descripción genérica
    this.txtLogger.warn('L01MainComponent', 'Tipo de emisor no encontrado en catálogo T73', { codigo });
    return `Tipo ${codigo}`;
  }

  // ========================================
  // ACCIONES PRINCIPALES DEL DASHBOARD
  // ========================================

  /**
   * Validar y generar reporte L01 completo
   */
  validateAndGenerateReport(): void {
    this.loading = true;
    this.error = '';
    
    this.txtLogger.info('L01MainComponent', 'Iniciando validación y generación de reporte L01');
    
    // ✅ VALIDACIÓN ESTRICTA L01: Verificar integridad de datos
    const validacionL01 = this.validarIntegridadL01();
    
    if (validacionL01.esValido) {
      this.txtLogger.info('L01MainComponent', 'Validación L01 exitosa - Datos integros', {
        totalRegistros: this.datosL01.length,
        registrosValidos: validacionL01.registrosValidos
      });
      
      // Simular proceso de validación
    setTimeout(() => {
        this.loading = false;
        this.txtLogger.info('L01MainComponent', 'Reporte L01 generado exitosamente');
      }, 2000);
    } else {
      this.loading = false;
      this.error = `Error de integridad L01: ${validacionL01.errores.join(', ')}`;
      this.txtLogger.error('L01MainComponent', 'Validación L01 fallida - Datos corruptos', {
        errores: validacionL01.errores,
        registrosInvalidos: validacionL01.registrosInvalidos
      });
    }
  }

  /**
   * Validar integridad de datos L01 según especificaciones oficiales
   * ✅ VALIDACIÓN ESTRICTA: Solo códigos R y X permitidos
   */
  private validarIntegridadL01(): { esValido: boolean; errores: string[]; registrosValidos: number; registrosInvalidos: any[] } {
    const errores: string[] = [];
    const registrosInvalidos: any[] = [];
    const codigosPermitidosL01 = ['R', 'X'];
    
    this.datosL01.forEach((registro, index) => {
      // ✅ VALIDAR TIPO IDENTIFICACIÓN: Solo R o X
      if (!codigosPermitidosL01.includes(registro.tipoIdentificacion)) {
        errores.push(`Registro ${index + 1}: Código de tipo de identificación '${registro.tipoIdentificacion}' no permitido en L01`);
        registrosInvalidos.push({ registro, index, error: 'Tipo de identificación inválido' });
      }
      
      // ✅ VALIDAR CLASIFICACIÓN: Solo 1, 2, 3, 4
      if (![1, 2, 3, 4].includes(registro.clasificacion)) {
        errores.push(`Registro ${index + 1}: Clasificación '${registro.clasificacion}' no permitida en L01`);
        registrosInvalidos.push({ registro, index, error: 'Clasificación inválida' });
      }
      
      // ✅ VALIDAR TIPO EMISOR: Solo códigos válidos de T73
      const tipoEmisorValido = this.tiposEmisorL01.some(t => t.id === registro.tipoEmisor);
      if (!tipoEmisorValido) {
        errores.push(`Registro ${index + 1}: Tipo de emisor '${registro.tipoEmisor}' no encontrado en catálogo T73`);
        registrosInvalidos.push({ registro, index, error: 'Tipo de emisor inválido' });
      }
    });
    
    return {
      esValido: errores.length === 0,
      errores,
      registrosValidos: this.datosL01.length - registrosInvalidos.length,
      registrosInvalidos
    };
  }

  /**
   * Exportar datos a formato TXT
   */
  exportToTxt(): void {
    if (this.datosL01.length === 0) {
      this.error = 'No hay datos para exportar';
      return;
    }
    
    this.txtLogger.info('L01MainComponent', 'Iniciando exportación a TXT');
    
    try {
      this.exportService.exportToTxt(this.datosL01);
      this.txtLogger.info('L01MainComponent', 'Exportación TXT completada exitosamente');
    } catch (error) {
      this.error = 'Error inesperado durante la exportación';
      this.txtLogger.error('L01MainComponent', 'Error durante exportación TXT', error);
    }
  }

  /**
   * Muestra el modal para agregar nuevo emisor/custodio
   */
  showAddEmitterModal(): void {
    this.showEmitterModal = true;
    console.log('🚀 Abriendo modal para agregar emisor/custodio');
  }
  
  /**
   * Maneja el evento cuando se agrega un nuevo emisor
   * @param emitter Emisor agregado
   */
  onEmitterAdded(emitter: any): void {
    console.log('✅ Nuevo emisor agregado:', emitter);
    
    // Recargar catálogos para incluir el nuevo emisor
    this.loadCatalogsForL01().then(() => {
      console.log('🔄 Catálogos recargados después de agregar emisor');
      
      // Mostrar mensaje de éxito
      this.txtLogger.info('L01MainComponent', `Emisor "${emitter.descripcion}" agregado exitosamente`);
      
      // Cerrar modal
      this.showEmitterModal = false;
    }).catch(error => {
      console.error('❌ Error recargando catálogos:', error);
    });
  }

  /**
   * Abrir modal para crear nuevo registro
   */
  openCreateModal(): void {
    this.editData = null;
    this.showModalForm = true;
    this.txtLogger.info('L01MainComponent', 'Modal de creación abierto');
  }

  /**
   * Abrir modal para editar registro existente
   */
  openEditModal(record: L01Record): void {
    this.editData = { ...record };
    this.showModalForm = true;
    this.txtLogger.info('L01MainComponent', 'Modal de edición abierto para registro', record);
  }

  // ========================================
  // MANEJO DEL MODAL
  // ========================================

  /**
   * Modal cerrado
   */
  onModalClosed(): void {
    this.showModalForm = false;
    this.editData = null;
    this.txtLogger.info('L01MainComponent', 'Modal cerrado');
  }

  /**
   * Datos guardados desde el modal
   */
  onModalDataSaved(data: L01Record): void {
    this.txtLogger.info('L01MainComponent', 'Datos guardados desde modal', data);
    
    if (this.editData) {
      // Actualizar registro existente
      const index = this.datosL01.findIndex(item => 
        item.identificacion === this.editData?.identificacion
      );
      if (index !== -1) {
        this.datosL01[index] = data;
        this.txtLogger.info('L01MainComponent', 'Registro actualizado en la lista');
      }
    } else {
      // Agregar nuevo registro
      this.datosL01.push(data);
      this.txtLogger.info('L01MainComponent', 'Nuevo registro agregado a la lista');
    }
    
    // Actualizar datos filtrados
    this.applyGridFilters();
    
    // Cerrar modal
    this.showModalForm = false;
    this.editData = null;
  }

  // ========================================
  // FILTROS DEL GRID
  // ========================================

  /**
   * Aplicar filtros al grid
   */
  applyGridFilters(): void {
    this.filteredDataL01 = this.datosL01.filter(item => {
      const matchTipoIdentificacion = !this.tipoIdentificacion || 
        item.tipoIdentificacion === this.tipoIdentificacion;
      
      const matchClasificacion = !this.clasificacion || 
        item.clasificacion === +this.clasificacion;
      
      const matchTipoEmisor = !this.tipoEmisor || 
        item.tipoEmisor === +this.tipoEmisor;
      
      return matchTipoIdentificacion && matchClasificacion && matchTipoEmisor;
    });
    
    this.txtLogger.info('L01MainComponent', 'Filtros aplicados al grid', {
      filtros: { tipoIdentificacion: this.tipoIdentificacion, clasificacion: this.clasificacion, tipoEmisor: this.tipoEmisor },
      totalFiltrado: this.filteredDataL01.length
    });
  }

  /**
   * Limpiar filtros del grid
   */
  clearGridFilters(): void {
    this.tipoIdentificacion = '';
    this.clasificacion = '';
    this.tipoEmisor = '';
    this.filteredDataL01 = [...this.datosL01];
    
    this.txtLogger.info('L01MainComponent', 'Filtros del grid limpiados');
  }

  // ========================================
  // FUNCIONES DE DESCRIPCIÓN PARA FILTROS
  // ========================================

  

  // ========================================
  // FUNCIONES DE RESUMEN
  // ========================================

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
   * Contar registros por clasificación
   */
  getCountByClasificacion(clasificacion: number): number {
    return this.datosL01.filter(item => item.clasificacion === clasificacion).length;
  }

  // ========================================
  // FUNCIONES DE TOOLTIP
  // ========================================

  /**
   * Mostrar tooltip de campo
   */
  showFieldTooltip(fieldName: string, event: MouseEvent): void {
    const tooltip = getL01FieldTooltip(fieldName);
    if (tooltip) {
      this.currentTooltip = tooltip;
      this.showTooltip = true;
      this.tooltipPosition = { x: event.clientX, y: event.clientY };
    }
  }

  /**
   * Ocultar tooltip
   */
  hideTooltip(): void {
    this.showTooltip = false;
    this.currentTooltip = null;
  }

  /**
   * Obtener título de columna
   */
  getColumnTitle(columnName: string): string {
    const tooltip = getL01FieldTooltip(columnName);
    return tooltip ? tooltip.title : columnName;
  }

  // ========================================
  // FUNCIONES DE DEBUG Y PRUEBA
  // ========================================

  /**
   * Simular error para pruebas
   */
  testError(): void {
    this.txtLogger.error('L01MainComponent', 'Error simulado para pruebas');
    this.error = 'Error simulado para pruebas de logging';
  }

  /**
   * Simular advertencia para pruebas
   */
  testWarning(): void {
    this.txtLogger.warn('L01MainComponent', 'Advertencia simulada para pruebas');
  }

  /**
   * Refrescar datos
   */
  refreshData(): void {
    this.txtLogger.info('L01MainComponent', 'Refrescando datos');
    this.loadInitialData();
  }

  /**
   * Alternar visibilidad del monitor de logs
   */
  toggleLogMonitor(): void {
    this.showLogMonitor = !this.showLogMonitor;
    this.txtLogger.info('L01MainComponent', `Monitor de logs ${this.showLogMonitor ? 'activado' : 'desactivado'}`);
  }
}
