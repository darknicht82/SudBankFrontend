import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { T4Service } from '../../../services/t4.service';
import { T32Service } from '../../../services/t32.service';
import { T48Service } from '../../../services/t48.service';
import { T55Service } from '../../../services/t55.service';
import { T32AService } from '../../../services/t32A.service';
import { T35Service } from '../../../services/t35.service';
import { T317Service } from '../../../services/t317.service';
import { R21CatalogService } from '../../../services/r21-catalog.service';

@Component({
  selector: 'app-r21-modal-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './r21-modal-form.component.html',
  styleUrl: './r21-modal-form.component.scss'
})
export class R21ModalFormComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Output() modalClosed = new EventEmitter<void>();

  arrayTipoIdentificacion: any[] = [];
  arrayEstadoOperacion: any[] = [];
  arrayFormaPago: any[] = [];
  arrayObjetoFideicomiso: any[] = [];
  arraySituacionOperacion: any[] = [];
  arrayTipoOperacion: any[] = [];
  arrayTipoSistemaAmortizacion: any[] = [];
  r21Form: FormGroup;
  formSubmitted = false;

  constructor(private fb: FormBuilder, 
    private t32service: T32Service,
    private t48service: T48Service,
    private t55service: T55Service,
    private t32AService: T32AService,
    private t35Service: T35Service,
    private t317Service: T317Service,
    private t4service: T4Service,
    private r21catalogService: R21CatalogService
  ) {
    this.r21Form = this.fb.group({
      tipoIdentificacion: [null, Validators.required],
      identificacionSujeto: [null, [Validators.required, Validators.maxLength(13)]],
      numeroTarjeta: [null, [Validators.required, Validators.maxLength(22)]],
      cupoTarjeta: [null, [Validators.required, Validators.min(1)]],
      capitalConsumo: [null, [Validators.required, Validators.min(1)]],
      tea: [null, [Validators.required, Validators.min(0)]],
      estadoOperacion: [null, Validators.required],
      formaPago: [null, Validators.required],
      capitalPorVencer1a30Dias: [null, [Validators.min(0)]],
      capitalPorVencer31a90Dias: [null, [Validators.min(0)]],
      capitalPorVencer91a180Dias: [null, [Validators.min(0)]],
      capitalPorVencer181a360Dias: [null, [Validators.min(0)]],
      capitalPorVencerMas360Dias: [null, [Validators.min(0)]],
      costosOperativosPorVencer: [null, [Validators.min(0)]],
      valorNoDevenganIntereses1a30Dias: [null, [Validators.min(0)]],
      valorNoDevenganIntereses31a90Dias: [null, [Validators.min(0)]],
      valorNoDevenganIntereses91a180Dias: [null, [Validators.min(0)]],
      valorNoDevenganIntereses181a360Dias: [null, [Validators.min(0)]],
      valorNoDevenganInteresesMas360Dias: [null, [Validators.min(0)]],
      capitalVencido1a30Dias: [null, [Validators.min(0)]],
      capitalVencido31a90Dias: [null, [Validators.min(0)]],
      capitalVencido91a180Dias: [null, [Validators.min(0)]],
      capitalVencido181a360Dias: [null, [Validators.min(0)]],
      capitalVencidoMas360Dias: [null, [Validators.min(0)]],
      capitalVencido181a270Dias: [null, [Validators.min(0)]],
      capitalVencidoMas270Dias: [null, [Validators.min(0)]],
      interesVencido1a30Dias: [null, [Validators.min(0)]],
      interesVencido31a60Dias: [null, [Validators.min(0)]],
      interesVencido61a90Dias: [null, [Validators.min(0)]],
      interesVencido91a180Dias: [null, [Validators.min(0)]],
      interesVencido181a270Dias: [null, [Validators.min(0)]],
      interesVencidoMas270Dias: [null, [Validators.min(0)]],
      totalCostosOperativosVencidos: [null, [Validators.min(0)]],
      interesSobreMora: [null, [Validators.min(0)]],
      valorEnDemandaJudicial: [null, [Validators.min(0)]],
      carteraCastigada: [null, [Validators.min(0)]],
      objetoFideicomiso: [null],
      situacionOperacion: [null],
      tipoOperacion: [null],
      contribucionAtencionCancer: [null, [Validators.min(0)]],
      fechaTransferenciaCuentasVencidas: [null],
      interesesAcumuladosPorCobrar: [null, [Validators.min(0)]],
      interesesReversados: [null, [Validators.min(0)]],
      fechaExigibilidadCuota: [null],
      tipoSistemaAmortizacion: [null],
      fechaActualizacion: [null],
      usuarioActualizacion: [null, [Validators.maxLength(50)]]
    });
  }

  ngOnInit(): void {
    this.loadTipoIdentificacion();
    this.loadEstadoOperacion();
    this.loadFormaPago();
    this.loadObjetoFideicomiso();
    this.loadSituacionOperacion();
    this.loadTipoOperacion();
    this.loadTipoSistemaAmortizacion();
  }

  closeModal(): void {
    this.isVisible = false;
    this.modalClosed.emit();
  }

  onSubmit(): void {
    this.formSubmitted = true;

    if (this.r21Form.valid) {
      const formData = this.r21Form.value;
      console.log('📌 R21 - Form Data:', formData);
      
      this.r21catalogService.saveR21(formData).subscribe({
        next: (response) => {
          console.log('✅ R21 - Registro guardado exitosamente:', response);
          this.r21Form.reset();
          this.formSubmitted = false;
          this.isVisible = false;
          this.modalClosed.emit();
        },
        error: (error) => {
          console.error('❌ R21 - Error al guardar registro:', error);
          // No cerrar el modal si hay error, para que el usuario pueda corregir
        }
      });
    } else {
      console.log('❌ R21 - Formulario inválido:', this.r21Form.errors);
    }
  }

  isInvalid(controlName: string) {
    const control = this.r21Form.get(controlName);
    return control?.invalid && (control.touched || this.formSubmitted);
  }

  private loadTipoIdentificacion(): void {
    this.t4service.getAll().subscribe({
      next: (data: any) => {
        this.arrayTipoIdentificacion = data;
      },
      error: (error: any) => {
        console.error('Error al cargar Tipos de Identificación:', error);
      }
    });
  }

  private loadEstadoOperacion(): void {
    this.t32service.getAll().subscribe({
      next: (data: any) => {
        this.arrayEstadoOperacion = data;
      },
      error: (error: any) => {
        console.error('Error al cargar Estado de Operación:', error);
      }
    });
  }

  private loadFormaPago(): void {
    this.t48service.getAll().subscribe({
      next: (data: any) => {
        this.arrayFormaPago = data;
      },
      error: (error: any) => {
        console.error('Error al cargar Forma de Pago:', error);
      }
    });
  }

  private loadObjetoFideicomiso(): void {
    this.t55service.getAllT55().subscribe({
      next: (data: any) => {
        this.arrayObjetoFideicomiso = data;
      },
      error: (error: any) => {
        console.error('Error al cargar Objeto de Fideicomiso:', error);
      }
    });
  }

  private loadSituacionOperacion(): void {
    this.t32AService.getAll().subscribe({
      next: (data: any) => {
        this.arraySituacionOperacion = data;
      },
      error: (error: any) => {
        console.error('Error al cargar Situación de Operación:', error);
      }
    });
  }

  private loadTipoOperacion(): void {
    this.t35Service.getAllT35().subscribe({
      next: (data: any) => {
        this.arrayTipoOperacion = data;
      },
      error: (error: any) => {
        console.error('Error al cargar Tipo de Operación:', error);
      }
    });
  }

  private loadTipoSistemaAmortizacion(): void {
    this.t317Service.getAll().subscribe({
      next: (data: any) => {
        this.arrayTipoSistemaAmortizacion = data;
      },
      error: (error: any) => {
        console.error('Error al cargar Tipo de Sistema de Amortización:', error);
      }
    });
  }
}
