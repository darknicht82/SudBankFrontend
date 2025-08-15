/**
 * COMPONENTE DE RESULTADOS DE VALIDACIÓN L01
 * Manual de Control de Inversiones - Marzo 2017
 * Superintendencia de Bancos del Ecuador
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface ValidationError {
  campo: string;
  mensaje: string;
  severidad: string;
}

export interface ValidationResult {
  id: number;
  identificacion: string;
  errores: ValidationError[];
  advertencias: ValidationError[];
  estado: string;
}

export interface ValidationResults {
  timestamp: Date;
  filtrosAplicados: {
    tipoIdentificacion?: string;
    clasificacion?: string;
    tipoEmisor?: string;
  };
  totalRegistros: number;
  registrosValidados: ValidationResult[];
  erroresEncontrados: ValidationError[];
  advertencias: ValidationError[];
  estadoGeneral: string;
}

@Component({
  selector: 'app-l01-validation-results',
  templateUrl: './l01-validation-results.component.html',
  styleUrls: ['./l01-validation-results.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class L01ValidationResultsComponent {
  
  @Input() showModal = false;
  @Input() validationResults: ValidationResults | null = null;
  @Input() loading = false;
  
  @Output() modalClosed = new EventEmitter<void>();
  @Output() proceedWithReport = new EventEmitter<ValidationResults>();
  @Output() fixErrors = new EventEmitter<void>();

  // Estados de validación
  readonly VALIDATION_STATES = {
    VALIDO: 'VÁLIDO',
    VALIDO_CON_ADVERTENCIAS: 'VÁLIDO_CON_ADVERTENCIAS',
    CON_ERRORES: 'CON_ERRORES',
    PENDIENTE: 'PENDIENTE'
  };

  /**
   * Cerrar el modal
   */
  onClose(): void {
    this.modalClosed.emit();
  }

  /**
   * Proceder con la generación del reporte
   */
  onProceedWithReport(): void {
    if (this.validationResults) {
      this.proceedWithReport.emit(this.validationResults);
    }
  }

  /**
   * Ir a corregir errores
   */
  onFixErrors(): void {
    this.fixErrors.emit();
  }

  /**
   * Obtener descripción del estado de validación
   */
  getEstadoDescription(estado: string): string {
    switch (estado) {
      case this.VALIDATION_STATES.VALIDO:
        return '✅ Válido - Sin errores ni advertencias';
      case this.VALIDATION_STATES.VALIDO_CON_ADVERTENCIAS:
        return '⚠️ Válido con advertencias - Se puede proceder';
      case this.VALIDATION_STATES.CON_ERRORES:
        return '❌ Con errores - Requiere corrección';
      case this.VALIDATION_STATES.PENDIENTE:
        return '⏳ Pendiente de validación';
      default:
        return estado;
    }
  }

  /**
   * Obtener clase CSS para el estado
   */
  getEstadoClass(estado: string): string {
    switch (estado) {
      case this.VALIDATION_STATES.VALIDO:
        return 'estado-valido';
      case this.VALIDATION_STATES.VALIDO_CON_ADVERTENCIAS:
        return 'estado-advertencia';
      case this.VALIDATION_STATES.CON_ERRORES:
        return 'estado-error';
      case this.VALIDATION_STATES.PENDIENTE:
        return 'estado-pendiente';
      default:
        return 'estado-default';
    }
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
   * Obtener conteo de registros por estado
   */
  getCountByEstado(estado: string): number {
    if (!this.validationResults?.registrosValidados) return 0;
    return this.validationResults.registrosValidados.filter(r => r.estado === estado).length;
  }

  /**
   * Verificar si se puede proceder con el reporte
   */
  canProceedWithReport(): boolean {
    if (!this.validationResults) return false;
    return this.validationResults.estadoGeneral !== this.VALIDATION_STATES.CON_ERRORES;
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

  /**
   * Formatear fecha de manera segura
   */
  formatDateSafely(timestamp: Date | null | undefined): string {
    if (!timestamp) return 'N/A';
    return this.formatDate(timestamp);
  }

  /**
   * TrackBy para ngFor de errores y advertencias
   */
  trackByError(index: number, item: ValidationError): string {
    return `${item.campo}-${item.mensaje}`;
  }
}
