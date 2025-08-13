/**
 * COMPONENTE DE CONFIRMACIÓN PARA OPERACIONES L01
 * Manual de Control de Inversiones - Marzo 2017
 * Superintendencia de Bancos del Ecuador
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface ConfirmationData {
  type: 'creation' | 'edit' | 'deletion';
  title: string;
  message: string;
  details?: any;  // Made optional since not all types need it
  record?: any;
  changes?: {
    field: string;
    oldValue: any;
    newValue: any;
    validation: { isValid: boolean; message: string };
  };
}

@Component({
  selector: 'app-l01-confirmation',
  templateUrl: './l01-confirmation.component.html',
  styleUrls: ['./l01-confirmation.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class L01ConfirmationComponent {
  
  @Input() showModal = false;
  @Input() confirmationData: ConfirmationData | null = null;
  @Input() loading = false;
  
  @Output() confirmed = new EventEmitter<any>();
  @Output() cancelled = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  // Estados del modal
  showDetails = false;
  showValidation = false;

  /**
   * Confirmar la operación
   */
  onConfirm(): void {
    this.confirmed.emit(this.confirmationData);
  }

  /**
   * Cancelar la operación
   */
  onCancel(): void {
    this.cancelled.emit();
  }

  /**
   * Cerrar el modal
   */
  onClose(): void {
    this.closed.emit();
  }

  /**
   * Alternar visibilidad de detalles
   */
  toggleDetails(): void {
    this.showDetails = !this.showDetails;
  }

  /**
   * Alternar visibilidad de validación
   */
  toggleValidation(): void {
    this.showValidation = !this.showValidation;
  }

  /**
   * Obtener clase CSS según el tipo de operación
   */
  getModalClass(): string {
    if (!this.confirmationData) return '';
    
    switch (this.confirmationData.type) {
      case 'creation':
        return 'modal-creation';
      case 'edit':
        return 'modal-edit';
      case 'deletion':
        return 'modal-deletion';
      default:
        return '';
    }
  }

  /**
   * Obtener clase CSS para el botón de confirmación
   */
  getConfirmButtonClass(): string {
    if (!this.confirmationData) return 'btn-confirm';
    
    switch (this.confirmationData.type) {
      case 'creation':
        return 'btn-confirm-creation';
      case 'edit':
        return 'btn-confirm-edit';
      case 'deletion':
        return 'btn-confirm-deletion';
      default:
        return 'btn-confirm';
    }
  }

  /**
   * Obtener texto del botón de confirmación
   */
  getConfirmButtonText(): string {
    if (!this.confirmationData) return 'Confirmar';
    
    switch (this.confirmationData.type) {
      case 'creation':
        return '✅ Crear Registro';
      case 'edit':
        return '✅ Confirmar Cambios';
      case 'deletion':
        return '🗑️ Confirmar Eliminación';
      default:
        return 'Confirmar';
    }
  }

  /**
   * Obtener icono según el tipo de operación
   */
  getOperationIcon(): string {
    if (!this.confirmationData) return '❓';
    
    switch (this.confirmationData.type) {
      case 'creation':
        return '➕';
      case 'edit':
        return '✏️';
      case 'deletion':
        return '⚠️';
      default:
        return '❓';
    }
  }

  /**
   * Verificar si hay cambios para mostrar
   */
  hasChanges(): boolean {
    return this.confirmationData?.changes !== undefined;
  }

  /**
   * Verificar si hay detalles para mostrar
   */
  hasDetails(): boolean {
    return this.confirmationData?.details !== undefined;
  }

  /**
   * Obtener descripción del campo
   */
  getFieldDescription(field: string): string {
    const fieldDescriptions: { [key: string]: string } = {
      'tipoIdentificacion': 'Tipo de Identificación',
      'identificacion': 'Identificación',
      'clasificacion': 'Clasificación',
      'tipoEmisor': 'Tipo de Emisor'
    };
    
    return fieldDescriptions[field] || field;
  }

  /**
   * Formatear valor para mostrar
   */
  formatValue(value: any, field: string): string {
    if (value === null || value === undefined) return 'N/A';
    
    // Formatear según el tipo de campo
    switch (field) {
      case 'tipoIdentificacion':
        return value === 'R' ? 'R - RUC Nacional' : 'X - Código Extranjero';
      case 'clasificacion':
        const clasificaciones: { [key: number]: string } = {
          1: '1 - Emisor',
          2: '2 - Custodio',
          3: '3 - Depositario',
          4: '4 - Contraparte'
        };
        return clasificaciones[value] || value.toString();
      case 'tipoEmisor':
        const tipos: { [key: number]: string } = {
          0: '0 - Supranacionales',
          2: '2 - Pública financiera',
          3: '3 - Privada financiera',
          4: '4 - Pública no financiera',
          5: '5 - Privada no financiera',
          7: '7 - Fondos de inversión',
          8: '8 - Estados Soberanos',
          9: '9 - Multilaterales'
        };
        return tipos[value] || value.toString();
      default:
        return value.toString();
    }
  }

  /**
   * Obtener clase CSS para el estado de validación
   */
  getValidationClass(): string {
    if (!this.confirmationData?.changes?.validation) return '';
    
    return this.confirmationData.changes.validation.isValid 
      ? 'validation-valid' 
      : 'validation-invalid';
  }

  /**
   * Prevenir cierre del modal al hacer click en el contenido
   */
  onModalContentClick(event: Event): void {
    event.stopPropagation();
  }
}
