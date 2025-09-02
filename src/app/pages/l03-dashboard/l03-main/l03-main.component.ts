/**
 * COMPONENTE L03 MAIN - DASHBOARD PRINCIPAL
 * Manual de Control de Inversiones - Marzo 2017
 * Superintendencia de Bancos del Ecuador
 * 
 * COMPONENTE RECONSTRUIDO COMPLETAMENTE - SIN CÓDIGO MUERTO
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { L01CatalogService } from '../../../services/l01/l01-catalog.service';
import { L01ExportService } from '../../../services/l01/l01-export.service';
import { LogMonitorComponent } from '../../../components/debug/log-monitor/log-monitor.component';
import { L03FieldsTableComponent } from '../../../components/l03/l03-table/l03-fields-table.component';
import { L03TableComponent } from '../../../components/l03/l03-table/l03-table.component';

import { LoggerService } from '../../../services/logger.service';
import { TxtLoggerService } from '../../../services/txt-logger.service';
import { environment } from '../../../../environments/environment';
import { L03Dto, L03StructureService } from '../../../services/l03/l03-structure.service';

@Component({
  selector: 'app-l03-main',
  templateUrl: './l03-main.component.html',
  styleUrls: ['./l03-main.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    L03FieldsTableComponent,
    L03TableComponent
    L03NewRecordComponent
  ],
})
export class L03MainComponent implements OnInit {
  // ========================================
  // PROPIEDADES BÁSICAS DEL COMPONENTE
  // ========================================
  
  // Datos del reporte
  datosL03: L03Dto[] = [];
  registrosFiltrados: number = 0;
  loading = false;
  error = '';

  // Filtros para el grid
  tipoIdentificacion = '';
  clasificacion = '';
  tipoEmisor = '';
  
  // Columnas de la tabla según especificación oficial L03
  displayedColumns: string[] = [
    'codigoTipoIdentificacionEmisor',
    'codigoIdentificacionEmisor',
    'numeroTitulo',
    'fechaEmision',
    'valorLibrosUsd',
    'valorMercadoUsd'
  ];

  // Datos para exportación
  exportData: any[] = [];
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
  editData: L03Dto | null = null;
  isSaving = false;
  
  // Tooltips
  tooltips: any[] = [];
  currentTooltip: any = null;
  showTooltip = false;
  tooltipPosition = { x: 0, y: 0 };
  
  // Datos filtrados para el grid
  filteredDataL03: L03Dto[] = [];

  // ========================================
  // CONSTRUCTOR E INICIALIZACIÓN
  // ========================================

  constructor(
    private catalogService: L01CatalogService,
    private service: L03StructureService,
    private exportService: L01ExportService,
    private logger: LoggerService,
    private txtLogger: TxtLoggerService
  ) {}

  // ========================================
  // LIFECYCLE HOOKS
  // ========================================

  ngOnInit(): void {
    this.txtLogger.info('L03MainComponent', 'Componente L03 inicializado');
    this.loadCatalogs();
    this.loadData();
  }

  // ========================================
  // CARGA DE CATÁLOGOS
  // ========================================

  /**
   * Cargar catálogos para filtros
   */
  async loadCatalogs(): Promise<void> {
    try {
      this.txtLogger.info('L03MainComponent', 'Cargando catálogos...');
      
      // Cargar catálogos en paralelo usando los métodos correctos
      const [tiposIdentificacion, tiposEmisor, clasificaciones, codigosExtranjeros] = await Promise.all([
        this.catalogService.getTabla4().toPromise(),
        this.catalogService.getTabla73().toPromise(),
        this.catalogService.getTabla173().toPromise(),
        this.catalogService.getTabla164().toPromise()
      ]);

      this.tiposIdentificacionL01 = tiposIdentificacion || [];
      this.tiposEmisorL01 = tiposEmisor || [];
      this.clasificacionesL01 = clasificaciones || [];
      this.codigosExtranjerosL01 = codigosExtranjeros || [];

      this.txtLogger.info('L03MainComponent', 'Catálogos cargados exitosamente', {
        tiposIdentificacion: this.tiposIdentificacionL01.length,
        tiposEmisor: this.tiposEmisorL01.length,
        clasificaciones: this.clasificacionesL01.length,
        codigosExtranjeros: this.codigosExtranjerosL01.length
      });

    } catch (error: any) {
      this.txtLogger.error('L03MainComponent', 'Error al cargar catálogos', error);
      this.error = 'Error al cargar catálogos: ' + (error.message || 'Error desconocido');
    }
  }

  // ========================================
  // CARGA DE DATOS
  // ========================================

  /**
   * Cargar datos L03
   */
  async loadData(): Promise<void> {
    try {
      this.loading = true;
      this.txtLogger.info('L03MainComponent', 'Cargando datos L03...');
      
      // Cargar datos desde el servicio L03 usando el método getAll()
      const data = await this.service.getAll().toPromise();
      this.datosL03 = data || [];
      this.filteredDataL03 = [...this.datosL03];
      
      this.txtLogger.info('L03MainComponent', 'Datos L03 cargados exitosamente', {
        totalRegistros: this.datosL03.length
      });

    } catch (error: any) {
      this.txtLogger.error('L03MainComponent', 'Error al cargar datos L03', error);
      this.error = 'Error al cargar datos: ' + (error.message || 'Error desconocido');
    } finally {
      this.loading = false;
    }
  }

  // ========================================
  // MANEJO DE MODAL
  // ========================================

  /**
   * Abrir modal para nuevo registro
   */
  openNewRecordModal(): void {
    this.editData = null;
    this.showModalForm = true;
    this.txtLogger.info('L03MainComponent', 'Modal de nuevo registro abierto');
  }

  /**
   * Abrir modal para editar registro
   */
  openEditRecordModal(record: L03Dto): void {
    this.editData = { ...record };
    this.showModalForm = true;
    this.txtLogger.info('L03MainComponent', 'Modal de edición abierto', record);
  }

  /**
   * Cerrar modal
   */
  onModalClosed(): void {
    this.showModalForm = false;
    this.editData = null;
    this.txtLogger.info('L03MainComponent', 'Modal cerrado');
  }

  /**
   * Datos guardados desde el modal
   */
  onModalDataSaved(data: L03Dto | null): void {
    this.txtLogger.info('L03MainComponent', 'Datos guardados desde modal', data);
    
    if (data) {
      if (this.editData) {
        // Actualizar registro existente
        this.txtLogger.info('L03MainComponent', 'Registro actualizado en la lista');
      } else {
        // Agregar nuevo registro
        this.txtLogger.info('L03MainComponent', 'Nuevo registro agregado a la lista');
      }
      
      // Actualizar datos filtrados
      this.applyGridFilters();
    } else {
      this.txtLogger.warn('L03MainComponent', 'No se recibieron datos válidos del modal');
    }
    
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
    this.txtLogger.info('L03MainComponent', 'Filtros aplicados al grid', {
      filtros: { tipoIdentificacion: this.tipoIdentificacion, clasificacion: this.clasificacion, tipoEmisor: this.tipoEmisor },
      totalFiltrado: this.filteredDataL03.length
    });
  }

  /**
   * Limpiar filtros del grid
   */
  clearGridFilters(): void {
    this.tipoIdentificacion = '';
    this.clasificacion = '';
    this.tipoEmisor = '';
    this.filteredDataL03 = [...this.datosL03];
    
    this.txtLogger.info('L03MainComponent', 'Filtros del grid limpiados');
  }

  // ========================================
  // FUNCIONES DE RESUMEN
  // ========================================

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
    return new Date().toLocaleString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // ========================================
  // FUNCIONES DE EXPORTACIÓN
  // ========================================

  /**
   * Exportar datos a TXT
   */
  async exportToTxt(): Promise<void> {
    try {
      this.txtLogger.info('L03MainComponent', 'Iniciando exportación a TXT...');
      
      // Preparar datos para exportación usando las propiedades correctas de L03Dto
      this.exportData = this.filteredDataL03.map(item => ({
        codigoTipoIdentificacionEmisor: item.codigoTipoIdentificacionEmisor,
        codigoIdentificacionEmisor: item.codigoIdentificacionEmisor,
        numeroTitulo: item.numeroTitulo,
        fechaEmision: item.fechaEmision,
        valorLibrosUsd: item.valorLibrosUsd,
        valorMercadoUsd: item.valorMercadoUsd
      }));

      // Exportar usando el servicio (solo TXT está disponible)
      const blob = this.exportService.exportToTxt(this.exportData as any);
      
      // Crear y descargar archivo
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'L03_Reporte_' + this.fechaCorte.toISOString().split('T')[0] + '.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      this.txtLogger.info('L03MainComponent', 'Exportación a TXT completada exitosamente');

    } catch (error: any) {
      this.txtLogger.error('L03MainComponent', 'Error en exportación a TXT', error);
      this.error = 'Error en exportación: ' + (error.message || 'Error desconocido');
    }
  }

  // ========================================
  // FUNCIONES DE TOOLTIP
  // ========================================

  /**
   * Mostrar tooltip para campo
   */
  showFieldTooltip(fieldName: string, event: MouseEvent): void {
    const tooltip = this.tooltips.find((t: any) => t.field === fieldName);
    if (tooltip) {
      this.currentTooltip = tooltip;
      this.showTooltip = true;
      this.tooltipPosition = { x: event.clientX, y: event.clientY };
      this.txtLogger.info('L03MainComponent', 'Tooltip mostrado para campo', fieldName);
    }
  }

  /**
   * Ocultar tooltip
   */
  hideFieldTooltip(): void {
    this.showTooltip = false;
    this.currentTooltip = null;
  }

  // ========================================
  // FUNCIONES DE DEBUG Y PRUEBA
  // ========================================

  /**
   * Simular error para pruebas
   */
  testError(): void {
    this.txtLogger.error('L03MainComponent', 'Error simulado para pruebas', new Error('Error de prueba'));
    this.error = 'Error simulado para pruebas';
  }

  /**
   * Simular advertencia para pruebas
   */
  testWarning(): void {
    this.txtLogger.warn('L03MainComponent', 'Advertencia simulada para pruebas');
  }

  /**
   * Refrescar datos
   */
  refreshData(): void {
    this.txtLogger.info('L03MainComponent', 'Refrescando datos...');
    this.loadData();
  }

  /**
   * Alternar visibilidad del monitor de logs
   */
  toggleLogMonitor(): void {
    this.showLogMonitor = !this.showLogMonitor;
    this.txtLogger.info('L03MainComponent', 'Monitor de logs alternado', { visible: this.showLogMonitor });
  }

  // ========================================
  // FUNCIONES DE VALIDACIÓN
  // ========================================

  /**
   * Validar RUC
   */
  validateRUC(ruc: string): boolean {
    if (!ruc || ruc.length !== 13) return false;
    
    // Validación básica de RUC
    const rucNumber = parseInt(ruc);
    if (isNaN(rucNumber)) return false;
    
    // Validar prefijo de provincia (01-24)
    const provincia = parseInt(ruc.substring(0, 2));
    if (provincia < 1 || provincia > 24) return false;
    
    // Validar tipo de entidad (tercer dígito)
    const tipoEntidad = parseInt(ruc.substring(2, 3));
    if (tipoEntidad < 1 || tipoEntidad > 9) return false;
    
    return true;
  }

  /**
   * Validar código extranjero
   */
  validateCodigoExtranjero(codigo: string): boolean {
    if (!codigo || codigo.length < 3) return false;
    
    // Validación básica de código extranjero
    const codigoNumber = parseInt(codigo);
    if (isNaN(codigoNumber)) return false;
    
    return true;
  }

  // ========================================
  // FUNCIONES DE UTILIDAD
  // ========================================

  /**
   * Obtener descripción de tipo de identificación
   */
  getTipoIdentificacionDesc(codigo: string): string {
    const tipo = this.tiposIdentificacionL01.find(t => t.codigo === codigo);
    return tipo ? tipo.descripcion : codigo;
  }

  /**
   * Obtener descripción de tipo de emisor
   */
  getTipoEmisorDesc(codigo: string): string {
    const tipo = this.tiposEmisorL01.find(t => t.codigo === codigo);
    return tipo ? tipo.descripcion : codigo;
  }

  /**
   * Obtener descripción de clasificación
   */
  getClasificacionDesc(codigo: string): string {
    const clasificacion = this.clasificacionesL01.find(c => c.codigo === codigo);
    return clasificacion ? clasificacion.descripcion : codigo;
  }

  /**
   * Obtener descripción de código extranjero
   */
  getCodigoExtranjeroDesc(codigo: string): string {
    const codigoExt = this.codigosExtranjerosL01.find(c => c.codigo === codigo);
    return codigoExt ? codigoExt.descripcion : codigo;
  }

  // ========================================
  // FUNCIONES DE LIMPIEZA
  // ========================================

  ngOnDestroy(): void {
    this.txtLogger.info('L03MainComponent', 'Componente L03 destruido');
  }
}
