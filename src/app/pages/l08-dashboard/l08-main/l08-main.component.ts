/**
 * COMPONENTE L08 MAIN - DASHBOARD PRINCIPAL
 * Manual de Riesgos de Mercado y Liquidez - Marzo 2021
 * Superintendencia de Bancos del Ecuador
 */

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { L08Service, L08ReportRequest, L08ReportResponse } from '../../../services/l08.service';
import { L08Validator } from '../../../validators/l08.validator';
// ✅ L08: Catálogos comentados temporalmente - No conectados a APIs reales
// import { 
//   getDescripcionLiquidez, 
//   getDescripcionTipoInstrumento,
//   getDescripcionCalificacionEmisor,
//   getDescripcionCalificadoraRiesgo
// } from '../../../catalogs';
import { getFieldTooltip, FieldTooltip, L08_STRUCTURE_INFO } from '../../../utils/field-tooltips';

@Component({
  selector: 'app-l08-main',
  templateUrl: './l08-main.component.html',
  styleUrls: ['./l08-main.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class L08MainComponent implements OnInit {
  // Datos del reporte
  reportData: L08ReportResponse | null = null;
  datosL08: any[] = [];
  loading = false;
  error = '';

  // Filtros
  fechaInicio = '';
  fechaFin = '';
  tipoInstrumento = '';
  calificacion = '';
  codigoLiquidez = '';
  
  // Historial
  historial: any[] = [];
  showHistorial = false;
  
  // Tooltips
  tooltips = L08_STRUCTURE_INFO;
  currentTooltip: FieldTooltip | null = null;
  showTooltip = false;
  tooltipPosition = { x: 0, y: 0 };

  // Columnas de la tabla según especificaciones oficiales
  displayedColumns: string[] = [
    'codigoLiquidez',
    'tipoIdentificacion',
    'identificacionEntidad',
    'tipoInstrumento',
    'calificacionEntidad',
    'calificadoraRiesgo',
    'valorLunes',
    'valorMartes',
    'valorMiercoles',
    'valorJueves',
    'valorViernes'
  ];

  constructor(private l08Service: L08Service) { }

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
    this.loading = true;
    const request: L08ReportRequest = {
      fechaInicio: this.getDefaultStartDate(),
      fechaFin: this.getDefaultEndDate()
    };

    this.l08Service.getL08Data(request).subscribe({
      next: (data) => {
        this.reportData = data;
        this.datosL08 = data.estructura.detalles;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error cargando datos:', error);
        this.error = 'Error al cargar los datos del reporte';
        this.loading = false;
      }
    });
  }

  /**
   * Generar reporte con filtros
   */
  generateReport(): void {
    if (!this.fechaInicio || !this.fechaFin) {
      this.error = 'Debe seleccionar fecha de inicio y fin';
      return;
    }

    this.loading = true;
    this.error = '';

    const request: L08ReportRequest = {
      fechaInicio: this.fechaInicio,
      fechaFin: this.fechaFin,
      tipoInstrumento: this.tipoInstrumento ? parseInt(this.tipoInstrumento) : undefined,
      calificacion: this.calificacion ? parseInt(this.calificacion) : undefined,
      codigoLiquidez: this.codigoLiquidez ? parseInt(this.codigoLiquidez) : undefined
    };

    this.l08Service.generateL08Report(request).subscribe({
      next: (data) => {
        this.reportData = data;
        this.datosL08 = data.estructura.detalles;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error generando reporte:', error);
        this.error = 'Error al generar el reporte';
        this.loading = false;
      }
    });
  }

  /**
   * Exportar reporte en formato TXT
   */
  exportReport(): void {
    if (!this.reportData) {
      this.error = 'No hay datos para exportar';
      return;
    }

    this.l08Service.exportL08Report(this.reportData).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        
        // Generar nombre de archivo correcto según especificaciones oficiales SB
        // Formato: L08Lxxxxddmmaaaa.txt
        const fecha = this.formatDateForFileSB(new Date());
        const codigoEntidad = '0001'; // Código de entidad por defecto
        const nombreArchivo = `L08L${codigoEntidad}${fecha}.txt`;
        
        link.download = nombreArchivo;
        link.click();
        window.URL.revokeObjectURL(url);
        
        // Mostrar mensaje de éxito
        console.log(`Archivo exportado: ${nombreArchivo}`);
      },
      error: (error) => {
        console.error('Error exportando reporte:', error);
        this.error = 'Error al exportar el reporte';
      }
    });
  }

  /**
   * Cargar historial
   */
  loadHistory(): void {
    this.showHistorial = !this.showHistorial;
    if (this.showHistorial && this.historial.length === 0) {
      this.l08Service.getL08History().subscribe({
        next: (data) => {
          this.historial = data;
        },
        error: (error) => {
          console.error('Error cargando historial:', error);
        }
      });
        }
  }

  /**
   * Mostrar tooltip para un campo
   */
  showFieldTooltip(fieldName: string, event: MouseEvent): void {
    this.currentTooltip = getFieldTooltip(fieldName);
    if (this.currentTooltip) {
      this.tooltipPosition = { x: event.clientX, y: event.clientY };
      this.showTooltip = true;
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
   * Obtener descripción de códigos para UI
   */
  getDescripcion(codigo: number, tipo: string): string {
    // ✅ L08: Catálogos comentados temporalmente - No conectados a APIs reales
    return codigo.toString();
    
    // switch (tipo) {
    //   case 'codigoLiquidez':
    //     return getDescripcionLiquidez(codigo);
    //   case 'tipoInstrumento':
    //     return getDescripcionTipoInstrumento(codigo.toString());
    //   case 'calificacionEntidad':
    //     return getDescripcionCalificacionEmisor(codigo.toString());
    //   case 'calificadoraRiesgo':
    //     return getDescripcionCalificadoraRiesgo(codigo.toString());
    //   default:
    //     return codigo.toString();
    // }
  }

  /**
   * Formatear valor monetario
   */
  formatCurrency(value: number | undefined): string {
    if (value === undefined || value === null) {
      return '$0.00';
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  }

  /**
   * Formatear fecha en formato dd/mm/aaaa
   */
  private formatDate(date: Date): string {
    const dia = date.getDate().toString().padStart(2, '0');
    const mes = (date.getMonth() + 1).toString().padStart(2, '0');
    const anio = date.getFullYear();
    return `${dia}/${mes}/${anio}`;
  }

  /**
   * Formatear fecha en formato para archivo
   */
  private formatDateForFile(date: Date): string {
    const dia = date.getDate().toString().padStart(2, '0');
    const mes = (date.getMonth() + 1).toString().padStart(2, '0');
    const anio = date.getFullYear();
    return `${anio}-${mes}-${dia}`;
  }

  /**
   * Formatear fecha en formato para archivo SB (ddmmaaaa)
   */
  private formatDateForFileSB(date: Date): string {
    const dia = date.getDate().toString().padStart(2, '0');
    const mes = (date.getMonth() + 1).toString().padStart(2, '0');
    const anio = date.getFullYear();
    return `${dia}${mes}${anio}`;
  }

  /**
   * Calcular variación semanal
   */
  getVariacionSemanal(): number {
    if (!this.reportData) return 0;
    return this.reportData.variacionSemanal || 0;
  }

  /**
   * Obtener estado de cumplimiento
   */
  getCumplimientoStatus(): string {
    if (!this.reportData) return 'N/A';
    const cumplimiento = this.reportData.cumplimiento || 0;
    if (cumplimiento >= 100) return 'CUMPLE';
    if (cumplimiento >= 90) return 'CUMPLE PARCIALMENTE';
    return 'NO CUMPLE';
  }

  /**
   * Obtener fecha generación
   */
  getFechaGeneracion(): string {
    return this.reportData?.fechaGeneracion || '';
  }

  /**
   * Obtener valor total lunes
   */
  getValorTotalLunes(): number {
    return this.reportData?.valorTotalLunes || 0;
  }

  /**
   * Obtener valor total viernes
   */
  getValorTotalViernes(): number {
    return this.reportData?.valorTotalViernes || 0;
  }

  /**
   * Obtener total registros
   */
  getTotalRegistros(): number {
    return this.reportData?.totalRegistros || 0;
  }

  /**
   * Obtener cumplimiento
   */
  getCumplimiento(): number {
    return this.reportData?.cumplimiento || 0;
  }

  /**
   * Obtener título de columna en español
   */
  getColumnTitle(column: string): string {
    const titles: { [key: string]: string } = {
      'codigoLiquidez': 'Código Liquidez',
      'tipoIdentificacion': 'Tipo ID',
      'identificacionEntidad': 'Identificación',
      'tipoInstrumento': 'Tipo Instrumento',
      'calificacionEntidad': 'Calificación',
      'calificadoraRiesgo': 'Calificadora',
      'valorLunes': 'Valor Lunes',
      'valorMartes': 'Valor Martes',
      'valorMiercoles': 'Valor Miércoles',
      'valorJueves': 'Valor Jueves',
      'valorViernes': 'Valor Viernes'
    };
    return titles[column] || column;
  }
}
