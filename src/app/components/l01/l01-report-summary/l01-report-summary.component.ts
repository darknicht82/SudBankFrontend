/**
 * COMPONENTE DE RESUMEN DE REPORTE L01 GENERADO
 * Manual de Control de Inversiones - Marzo 2017
 * Superintendencia de Bancos del Ecuador
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { L01RegulatoryData } from '../../../services/l01-regulatory.service';

export interface ReportSummaryData {
  totalRegistros: number;
  fechaGeneracion: Date;
  usuarioGenerador: string;
  filtrosAplicados: {
    tipoIdentificacion?: string;
    clasificacion?: string;
    tipoEmisor?: string;
  };
  datos: L01RegulatoryData[];
}

@Component({
  selector: 'app-l01-report-summary',
  templateUrl: './l01-report-summary.component.html',
  styleUrls: ['./l01-report-summary.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class L01ReportSummaryComponent {
  
  @Input() showModal = false;
  @Input() reportData: ReportSummaryData | null = null;
  @Input() loading = false;
  
  @Output() modalClosed = new EventEmitter<void>();
  @Output() exportTxt = new EventEmitter<L01RegulatoryData[]>();
  @Output() createNewRecord = new EventEmitter<void>();

  // Fecha seleccionable por el usuario
  fechaSeleccionada: Date = new Date();

  /**
   * Cerrar el modal
   */
  onClose(): void {
    this.modalClosed.emit();
  }

  /**
   * Exportar a TXT
   */
  onExportTxt(): void {
    if (this.reportData?.datos) {
      this.exportTxt.emit(this.reportData.datos);
    }
  }

  /**
   * Abrir formulario de nuevo registro
   */
  onCreateNewRecord(): void {
    this.createNewRecord.emit();
  }

  /**
   * Obtener descripción del filtro aplicado
   */
  getFilterDescription(field: string, value: string): string {
    if (!value) return 'Todos';
    
    switch (field) {
      case 'tipoIdentificacion':
        return value === 'R' ? 'RUC Nacional' : 'Extranjero';
      case 'clasificacion':
        const clasificaciones = {
          '1': 'Emisor',
          '2': 'Custodio',
          '3': 'Depositario',
          '4': 'Contraparte'
        };
        return clasificaciones[value as keyof typeof clasificaciones] || value;
      case 'tipoEmisor':
        const tiposEmisor = {
          '0': 'Supranacionales',
          '2': 'Pública Financiera',
          '3': 'Privada Financiera',
          '4': 'Pública No Financiera',
          '5': 'Privada No Financiera',
          '7': 'Fondos de Inversión',
          '8': 'Estados Soberanos',
          '9': 'Multilaterales'
        };
        return tiposEmisor[value as keyof typeof tiposEmisor] || value;
      default:
        return value;
    }
  }

  /**
   * Obtener resumen por clasificación
   */
  getCountByClasificacion(clasificacion: number): number {
    if (!this.reportData?.datos) return 0;
    return this.reportData.datos.filter(item => item.clasificacion === clasificacion).length;
  }

  /**
   * Formatear fecha para display
   */
  formatDate(date: Date): string {
    return date.toLocaleDateString('es-EC', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
