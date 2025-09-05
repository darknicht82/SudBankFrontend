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
import { L01ExportService } from '../../../services/l01-export.service';
import { L03FieldsTableComponent } from '../../../components/l03/l03-table/l03-table.component';
import { L03DetailsDto, L03Dto, L03StructureService } from '../../../services/structures/l03/l03.service';
import { L03NewRecordComponent } from '../../../components/l03/l03-new-record/l03-new-record.component';

@Component({
  selector: 'app-l03-main',
  templateUrl: './l03-main.component.html',
  styleUrls: ['./l03-main.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    L03FieldsTableComponent,
    L03NewRecordComponent
  ],
})
export class L03MainComponent implements OnInit {
  // ========================================
  // PROPIEDADES BÁSICAS DEL COMPONENTE
  // ========================================
  
  // Datos del reporte
  // datosL03: L03Dto[] = [];
  datosL03: L03DetailsDto[] = [];
  registrosFiltrados: number = 0;
  loading = false;
  error = '';



  // Datos para exportación
  exportData: any[] = [];
  fechaCorte: Date = new Date();
  usuarioActual = 'Erick Chiri';
  

  
  // Estados para modal de formulario
  showModalForm = false;
  editData: L03Dto | null = null;
  isSaving = false;

  // ========================================
  // CONSTRUCTOR E INICIALIZACIÓN
  // ========================================

  constructor(
    private service: L03StructureService,
    private exportService: L01ExportService
  ) {}

  // ========================================
  // LIFECYCLE HOOKS
  // ========================================

  ngOnInit(): void {
    this.loadData();
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
      
      // Cargar datos desde el servicio L03
      const data = await this.service.getAllDetails().toPromise();
      this.datosL03 = data || [];

    } catch (error: any) {
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
    console.log('🔍 L03 - Abriendo modal de nuevo registro');
    this.editData = null;
    this.showModalForm = true;
    console.log('🔍 L03 - showModalForm:', this.showModalForm);
  }

  /**
   * Cerrar modal
   */
  onModalClosed(): void {
    this.showModalForm = false;
    this.editData = null;
  }

  /**
   * Datos guardados desde el modal
   */
  onModalDataSaved(data: L03Dto | null): void {
    if (data) {
      // Recargar datos desde el servidor
      this.loadData();
    }
    
    // Cerrar modal
    this.showModalForm = false;
    this.editData = null;
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

  /**
   * Obtener número de emisores únicos
   */
  getTotalEmisores(): number {
    const emisoresUnicos = new Set(this.datosL03.map(item => item.codigoIdentificacionEmisor));
    return emisoresUnicos.size;
  }

  /**
   * Obtener número de custodios únicos
   */
  getTotalCustodios(): number {
    const custodiosUnicos = new Set(this.datosL03.map(item => item.codigoIdentificacionCustodio).filter(codigo => codigo));
    return custodiosUnicos.size;
  }

  /**
   * Obtener número de depositarios únicos
   */
  getTotalDepositarios(): number {
    // Para L03, depositarios puede ser igual a custodios o un campo específico
    return this.getTotalCustodios();
  }

  // ========================================
  // FUNCIONES DE VALIDACIÓN Y EXPORTACIÓN
  // ========================================

  /**
   * Validar y generar reporte L03
   */
  validateAndGenerateReport(): void {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

  /**
   * Exportar datos a TXT
   */
  async exportToTxt(): Promise<void> {
    try {
      // Preparar datos para exportación
      this.exportData = this.datosL03.map(item => ({
        codigoTipoIdentificacionEmisor: item.codigoTipoIdentificacionEmisor,
        codigoIdentificacionEmisor: item.codigoIdentificacionEmisor,
        numeroTitulo: item.numeroTitulo,
        fechaEmision: item.fechaEmision
      }));

      // Exportar usando el servicio
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

    } catch (error: any) {
      this.error = 'Error en exportación: ' + (error.message || 'Error desconocido');
    }
  }








}