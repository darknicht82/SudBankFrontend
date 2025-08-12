import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-l08-form',
  templateUrl: './l08-form.component.html',
  styleUrls: ['./l08-form.component.css']
})
export class L08FormComponent implements OnInit {
  l08Form!: FormGroup;
  isSubmitting = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.l08Form = this.fb.group({
      // Información General
      fechaReporte: ['', [Validators.required]],
      entidadFinanciera: ['Banco SudBank', [Validators.required, Validators.minLength(3)]],
      codigoEntidad: ['1038', [Validators.required, Validators.pattern(/^[0-9]{4}$/)]],
      periodoReporte: ['', [Validators.required]],

      // Activos Líquidos
      efectivoCaja: [0, [Validators.required, Validators.min(0)]],
      depositosBancoCentral: [0, [Validators.required, Validators.min(0)]],
      inversionesTemporales: [0, [Validators.required, Validators.min(0)]],
      otrosActivosLiquidos: [0, [Validators.required, Validators.min(0)]],

      // Pasivos a Corto Plazo
      depositosDemanda: [0, [Validators.required, Validators.min(0)]],
      depositosPlazo: [0, [Validators.required, Validators.min(0)]],
      obligacionesFinancieras: [0, [Validators.required, Validators.min(0)]],
      otrosPasivosCortoPlazo: [0, [Validators.required, Validators.min(0)]]
    });

    // Suscribirse a cambios para cálculos automáticos
    this.l08Form.valueChanges.subscribe(() => {
      this.calculateTotals();
    });
  }

  // Getters para cálculos automáticos
  get totalActivosLiquidos(): number {
    const form = this.l08Form.value;
    return (form.efectivoCaja || 0) + 
           (form.depositosBancoCentral || 0) + 
           (form.inversionesTemporales || 0) + 
           (form.otrosActivosLiquidos || 0);
  }

  get totalPasivosCortoPlazo(): number {
    const form = this.l08Form.value;
    return (form.depositosDemanda || 0) + 
           (form.depositosPlazo || 0) + 
           (form.obligacionesFinancieras || 0) + 
           (form.otrosPasivosCortoPlazo || 0);
  }

  get ratioLiquidez(): number {
    if (this.totalPasivosCortoPlazo === 0) return 0;
    return (this.totalActivosLiquidos / this.totalPasivosCortoPlazo) * 100;
  }

  // Validación de campos
  isFieldInvalid(fieldName: string): boolean {
    const field = this.l08Form.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  // Cálculos automáticos
  calculateTotals(): void {
    // Los cálculos se realizan automáticamente a través de los getters
    // que se actualizan cuando cambian los valores del formulario
  }

  // Validación del formulario
  onValidate(): void {
    if (this.l08Form.valid) {
      this.showValidationSuccess();
    } else {
      this.showValidationErrors();
    }
  }

  showValidationSuccess(): void {
    // Aquí se podría mostrar un toast o notificación de éxito
    console.log('Formulario válido');
    alert('✅ Todos los datos son válidos');
  }

  showValidationErrors(): void {
    // Marcar todos los campos como tocados para mostrar errores
    Object.keys(this.l08Form.controls).forEach(key => {
      const control = this.l08Form.get(key);
      control?.markAsTouched();
    });
    
    console.log('Formulario inválido');
    alert('❌ Por favor, corrija los errores en el formulario');
  }

  // Envío del formulario
  onSubmit(): void {
    if (this.l08Form.valid) {
      this.isSubmitting = true;
      
      // Simular envío al backend
      setTimeout(() => {
        console.log('Datos del formulario:', this.l08Form.value);
        console.log('Totales calculados:', {
          totalActivosLiquidos: this.totalActivosLiquidos,
          totalPasivosCortoPlazo: this.totalPasivosCortoPlazo,
          ratioLiquidez: this.ratioLiquidez
        });
        
        this.isSubmitting = false;
        alert('✅ Reporte L08 enviado exitosamente');
        this.onReset();
      }, 2000);
    } else {
      this.showValidationErrors();
    }
  }

  // Limpiar formulario
  onReset(): void {
    this.l08Form.reset({
      efectivoCaja: 0,
      depositosBancoCentral: 0,
      inversionesTemporales: 0,
      otrosActivosLiquidos: 0,
      depositosDemanda: 0,
      depositosPlazo: 0,
      obligacionesFinancieras: 0,
      otrosPasivosCortoPlazo: 0
    });
    
    // Marcar todos los campos como no tocados
    Object.keys(this.l08Form.controls).forEach(key => {
      const control = this.l08Form.get(key);
      control?.markAsUntouched();
    });
  }

  // Métodos de utilidad
  formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  }

  formatPercentage(value: number): string {
    return new Intl.NumberFormat('es-ES', {
      style: 'percent',
      minimumFractionDigits: 2
    }).format(value / 100);
  }

  // Análisis de riesgo basado en el ratio de liquidez
  getRiskLevel(): string {
    const ratio = this.ratioLiquidez;
    if (ratio >= 100) return 'low';
    if (ratio >= 80) return 'medium';
    return 'high';
  }

  getRiskMessage(): string {
    const ratio = this.ratioLiquidez;
    if (ratio >= 100) return 'Excelente nivel de liquidez';
    if (ratio >= 80) return 'Nivel de liquidez aceptable';
    return 'Atención: Nivel de liquidez bajo';
  }
}
