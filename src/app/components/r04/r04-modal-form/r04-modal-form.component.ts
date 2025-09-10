import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { T4Service } from '../../../services/t4.service';
import { T29Service } from '../../../services/t29.service';
import { T35Service } from '../../../services/t35.service';
import { T55Service } from '../../../services/t55.service';
import { T218Service } from '../../../services/t218.service';
import { T317Service } from '../../../services/t317.service';
import { R04CatalogService } from '../../../services/r04-catalog.service';


@Component({
  selector: 'app-r04-modal-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './r04-modal-form.component.html',
  styleUrl: './r04-modal-form.component.scss'
})
export class R04ModalFormComponent implements OnInit {

  @Input() isVisible: boolean = false;
  @Output() modalClosed = new EventEmitter<void>();

  arrayTipoIdentificacion: any[] = [];
  arrayMetodologiaCalificacion: any[] = [];
  arrayCalificacionPropia: any[] = [];
  arrayCalificacionHomologada: any[] = [];
  arrayTipoOperacion: any[] = [];
  arrayObjetoFideicomiso: any[] = [];
  arrayTipoSistemaAmortizacion: any[] = [];
  r04Form: FormGroup;
  formSubmitted = false;

  constructor(private fb: FormBuilder,
    private t4Service: T4Service,
    private t29Service: T29Service,
    private t35Service: T35Service,
    private t55Service: T55Service,
    private t218Service: T218Service,
    private t317Service: T317Service,
    private r04catalogService: R04CatalogService,
  ) {
    this.r04Form = this.fb.group({
      // Campos básicos (1-4)
      tipoIdentificacion: [null, Validators.required],
      identificacionSujeto: [null, Validators.required],
      numeroOperacion: [null, Validators.required],
      diasMorosidad: [null, Validators.required],
      
      // Campos de calificación (5-7)
      metodologiaCalificacion: [null, Validators.required],
      calificacionPropia: [null, Validators.required],
      calificacionHomologada: [null, Validators.required],
      
      // Campo de interés (8)
      tasaInteres: [null, Validators.required],
      
      // Valores por vencer (9-13)
      valorPorVencer1a30: [null],
      valorPorVencer31a90: [null],
      valorPorVencer91a180: [null],
      valorPorVencer181a360: [null],
      valorPorVencerMas360: [null],
      
      // Valores que no devengan intereses (14-18)
      valorNoDevenga1a30: [null],
      valorNoDevenga31a90: [null],
      valorNoDevenga91a180: [null],
      valorNoDevenga181a360: [null],
      valorNoDevengaMas360: [null],
      
      // Valores vencidos (19-29)
      valorVencido1a30: [null],
      valorVencido31a90: [null],
      valorVencido91a180: [null],
      valorVencido181a360: [null],
      valorVencidoMas360: [null],
      valorVencido181a270: [null],
      valorVencidoMas270: [null],
      valorVencido91a270: [null],
      valorVencido271a360: [null],
      valorVencido361a720: [null],
      valorVencidoMas720: [null],
      
      // Campos adicionales (30-37)
      gastosRecuperacion: [null],
      interesOrdinario: [null],
      interesSobreMora: [null],
      valorDemandaJudicial: [null],
      carteraCastigada: [null],
      provisionRequeridaOriginal: [null],
      provisionRequeridaReducida: [null],
      provisionConstituida: [null],
      
      // Campos de operación (38-39)
      tipoOperacion: [null, Validators.required],
      objetoFideicomiso: [null, Validators.required],
      
      // Campos financieros (40-45)
      primaDescuento: [null],
      cuotaCredito: [null],
      valorInteresesCuota: [null],
      valorSeguro: [null],
      saldoCuotaCapitalDiferida: [null],
      valorInteresCapitalDiferido: [null],
      
      // Campos de fecha e intereses (46-48)
      fechaTransferenciaCuentasVencidas: [null],
      interesesAcumuladosPorCobrar: [null],
      interesesReversados: [null],
      
      // Campos adicionales (49-50)
      fechaExigibilidadCuota: [null, Validators.required],
      tipoSistemaAmortizacion: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadTipoIdentificacion();
    this.loadMetodologiaCalificacion();
    this.loadCalificacionPropia();
    this.loadCalificacionHomologada();
    this.loadTipoOperacion();
    this.loadObjetoFideicomiso();
    this.loadTipoSistemaAmortizacion();
  }

  private loadTipoIdentificacion(): void {
    this.t4Service.getAll().subscribe({
      next: (data) => {
        this.arrayTipoIdentificacion = data;
      },
      error: (error) => {
        console.error('Error al cargar Tipos de Identificación:', error);
      }
    });
  }

  private loadMetodologiaCalificacion(): void {
    this.t218Service.getAllT218().subscribe({
      next: (data) => {
        this.arrayMetodologiaCalificacion = data;
      },
      error: (error) => {
        console.error('Error al cargar Metodología de Calificación:', error);
      }
    });
  }

  private loadCalificacionPropia(): void {
    this.t29Service.getAllT29().subscribe({
      next: (data) => {
        this.arrayCalificacionPropia = data;
      },
      error: (error) => {
        console.error('Error al cargar Calificación Propia:', error);
      }
    });
  }

  private loadCalificacionHomologada(): void {
    this.t29Service.getAllT29().subscribe({
      next: (data) => {
        this.arrayCalificacionHomologada = data;
      },
      error: (error) => {
        console.error('Error al cargar Calificación Homologada:', error);
      }
    });
  }

  private loadTipoOperacion(): void {
    this.t35Service.getAllT35().subscribe({
      next: (data) => {
        this.arrayTipoOperacion = data;
      },
      error: (error) => {
        console.error('Error al cargar Tipo de Operación:', error);
      }
    });
  }

  private loadObjetoFideicomiso(): void {
    this.t55Service.getAllT55().subscribe({
      next: (data) => {
        this.arrayObjetoFideicomiso = data;
      },
      error: (error) => {
        console.error('Error al cargar Objeto del Fideicomiso:', error);
      }
    });
  }

  private loadTipoSistemaAmortizacion(): void {
    this.t317Service.getAll().subscribe({
      next: (data) => {
        this.arrayTipoSistemaAmortizacion = data;
      },
      error: (error) => {
        console.error('Error al cargar Tipos de Sistema de Amortización:', error);
      }
    });
  }

  closeModal(): void {
    console.log('🔍 R04 Modal - Cerrando...');
    this.modalClosed.emit();
  }

  isInvalid(controlName: string) {
    const control = this.r04Form.get(controlName);
    return control?.invalid && (control.touched || this.formSubmitted);
  }

  onSubmit(): void {
    this.formSubmitted = true;

    if (this.r04Form.valid) {
      const formData = this.r04Form.value;
      console.log('📌 R04 - Form Data:', formData);

      this.r04catalogService.saveR04(formData).subscribe({
        next: (response) => {
          console.log('✅ R04 - Registro guardado exitosamente:', response);
          this.r04Form.reset();
          this.formSubmitted = false;
          this.isVisible = false;
          this.modalClosed.emit();
        },
        error: (error) => {
          console.error('❌ R04 - Error al guardar registro:', error);
          // No cerrar el modal si hay error, para que el usuario pueda corregir
        }
      });
    } else {
      console.log('❌ R04 - Formulario inválido:', this.r04Form.errors);
    }
  }

} 