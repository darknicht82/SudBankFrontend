/**
 * COMPONENTE L08 - LIQUIDEZ ESTRUCTURAL
 * Manual de Riesgos de Mercado y Liquidez - Marzo 2021
 * Superintendencia de Bancos del Ecuador
 */

import { Component, OnInit } from '@angular/core';
import { L08Service, L08ReportRequest, L08ReportResponse } from '../../../services/l08.service';
import { L08Validator } from '../../../validators/l08.validator';
// ✅ L08: Catálogos comentados temporalmente - No conectados a APIs reales
// import { 
//   getDescripcionLiquidez, 
//   getDescripcionTipoInstrumento,
//   getDescripcionCalificacionEmisor,
//   getDescripcionCalificadoraRiesgo
// } from '../../../catalogs';

@Component({
  selector: 'app-l08',
  templateUrl: './l08.component.html',
  styleUrls: ['./l08.component.scss']
})
export class L08Component implements OnInit {
  // Datos del reporte
  reportData: L08ReportResponse | null = null;
  loading = false;
  error = '';

  // Filtros
  filters: L08ReportRequest = {
    fechaInicio: this.formatDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)), // 7 días atrás
    fechaFin: this.formatDate(new Date())
  };

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
    this.loadData();
  }

  /**
   * Cargar datos del reporte L08
   */
  loadData(): void {
    this.loading = true;
    this.error = '';

    this.l08Service.getL08Data(this.filters).subscribe({
      next: (data) => {
        this.reportData = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar datos: ' + err.message;
        this.loading = false;
      }
    });
  }

  /**
   * Generar nuevo reporte
   */
  generateReport(): void {
    this.loading = true;
    this.error = '';

    this.l08Service.generateL08Report(this.filters).subscribe({
      next: (data) => {
        this.reportData = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al generar reporte: ' + err.message;
        this.loading = false;
      }
    });
  }

  /**
   * Exportar reporte en formato RVC
   */
  exportReport(): void {
    if (!this.reportData) {
      this.error = 'No hay datos para exportar';
      return;
    }

    this.l08Service.exportL08Report(this.reportData.id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `L08_${this.formatDate(new Date())}.txt`;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        this.error = 'Error al exportar reporte: ' + err.message;
      }
    });
  }

  /**
   * Validar datos según especificaciones oficiales
   */
  validateData(): void {
    if (!this.reportData) {
      this.error = 'No hay datos para validar';
      return;
    }

    this.l08Service.validateL08Data(this.reportData.estructura).subscribe({
      next: (validation) => {
        if (validation.valid) {
          alert('Datos válidos según especificaciones oficiales SB');
        } else {
          alert('Errores encontrados:\n' + validation.errores.join('\n'));
        }
      },
      error: (err) => {
        this.error = 'Error al validar datos: ' + err.message;
      }
    });
  }

  /**
   * Obtener descripción de códigos para UI
   * ✅ L08: Catálogos comentados temporalmente - No conectados a APIs reales
   */
  getDescripcion(codigo: number, tipo: string): string {
    // ✅ L08: Retornar código como string hasta que se conecten las APIs reales
    return codigo.toString();
    
    // switch (tipo) {
    //   case 'codigoLiquidez':
    //     return getDescripcionLiquidez(codigo);
    //   case 'tipoInstrumento':
    //     return getDescripcionTipoInstrumento(codigo);
    //   case 'calificacionEntidad':
    //     return getDescripcionCalificacionEmisor(codigo);
    //   case 'calificadoraRiesgo':
    //     return getDescripcionCalificadoraRiesgo(codigo);
    //   default:
    //     return codigo.toString();
    // }
  }

  /**
   * Formatear valor monetario
   */
  formatCurrency(value: number): string {
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
   * Calcular variación semanal
   */
  getVariacionSemanal(): number {
    if (!this.reportData) return 0;
    return this.reportData.variacionSemanal;
  }

  /**
   * Obtener estado de cumplimiento
   */
  getCumplimientoStatus(): string {
    if (!this.reportData) return 'N/A';
    const cumplimiento = this.reportData.cumplimiento;
    if (cumplimiento >= 100) return 'CUMPLE';
    if (cumplimiento >= 90) return 'CUMPLE PARCIALMENTE';
    return 'NO CUMPLE';
  }

  /**
   * Aplicar filtros
   */
  applyFilters(): void {
    this.loadData();
  }

  /**
   * Limpiar filtros
   */
  clearFilters(): void {
    this.filters = {
      fechaInicio: this.formatDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)),
      fechaFin: this.formatDate(new Date())
    };
    this.loadData();
  }
} 
