import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { T4Service } from '../../../services/t4.service';
import { T164Service } from '../../../services/t164.service';
import { T65Service } from '../../../services/t65.service';
import { T66Service } from '../../../services/t66.service';
import { T33Service } from '../../../services/t33.service';
import { L05CatalogService } from '../../../services/l05-catalog.service';
import { T172Service } from '../../../services/t172.service';

@Component({
  selector: 'app-l05-modal-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './l05-modal-form.component.html',
  styleUrls: ['./l05-modal-form.component.scss']
})
export class L05ModalFormComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Output() modalClosed = new EventEmitter<void>();

  arrayTipoIdentificacion: any[] = [];
  arrayIdentificacionDepositario: any[] = [];
  arrayTipoDeposito: any[] = [];
  arrayCalificacionRiesgoDepositario: any[] = [];
  arrayCalificacionRiesgo: any[] = [];
  arrayMonedaDenominacion: any[] = [];
  l05Form: FormGroup;
  formSubmitted = false;

  constructor(private fb: FormBuilder, 
    private t164service: T164Service,
    private t33Service: T33Service,
    private t172service: T172Service,
    private t4service: T4Service,
    private t65Service: T65Service,
    private t66Service: T66Service,
    private l05catalogService: L05CatalogService
  ) {
    this.l05Form = this.fb.group({
      tipoIdentificacion: [null, Validators.required],
      identificacionDepositario: [null, Validators.required],
      tipoDeposito: [null, Validators.required],
      numeroIdentificacionDeposito: [null, Validators.required],
      cuentaContable: [null, Validators.required],
      moneda: [null, Validators.required],
      valorMonedaDenominacion: [null, [Validators.required, Validators.min(1)]],
      valorLibrosDolares: [null, [Validators.required, Validators.min(1)]],
      calificacionRiesgoDepositario: [null, Validators.required],
      calificacionRiesgo: [null, Validators.required],
      fechaUltimaCalificacion: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadTipoIdentificacion();
    this.loadIdentificacionDepositario();
    this.loadMonedaDenominacion();
    this.loadTipoDeposito();
    this.loadCalificacionRiesgoDepositario();
    this.loadCalificacionRiesgo();
  }

  closeModal(): void {
    this.isVisible = false;
    this.modalClosed.emit();
  }

  onSubmit(): void {
    this.formSubmitted = true;

    if (this.l05Form.valid) {
      const formData = this.l05Form.value;
      console.log('📌 Form Data:', formData);
      this.l05catalogService.saveL05(formData);

      this.l05Form.reset();
      this.formSubmitted = false;

      this.isVisible = false;
      this.modalClosed.emit();
    }
  }

  isInvalid(controlName: string) {
    const control = this.l05Form.get(controlName);
    return control?.invalid && (control.touched || this.formSubmitted);
  }

  private loadTipoDeposito(): void{
    this.t172service.getAll().subscribe({
      next: (data) => {
        this.arrayTipoDeposito = data;
      },
      error: (error) => {
        console.error('Error al cargar Tipos de deposito:', error);
      }
    });
  }

  private loadTipoIdentificacion(): void {
    this.t4service.getAll().subscribe({
      next: (data) => {
        this.arrayTipoIdentificacion = data;
      },
      error: (error) => {
        console.error('Error al cargar Tipos de Identificación:', error);
      }
    });
  }

  private loadIdentificacionDepositario(): void {
    this.t164service.getAll().subscribe({
      next: (data) => {
        this.arrayIdentificacionDepositario = data;
      },
      error: (error) => {
        console.error('Error al cargar Tipos de Identificación:', error);
      }
    });
  }

  private loadMonedaDenominacion(): void {
    this.t33Service.getAll().subscribe({
      next: (data) => {
        this.arrayMonedaDenominacion = data;
      },
      error: (error) => {
        console.error('Error al cargar Tipos de Identificación:', error);
      }
    });
  }

  private loadCalificacionRiesgoDepositario(): void {
    this.t65Service.getAll().subscribe({
      next: (data) => {
        this.arrayCalificacionRiesgoDepositario = data;
      },
      error: (error) => {
        console.error('Error al cargar Tipos de Identificación:', error);
      }
    });
  }

  private loadCalificacionRiesgo(): void {
    this.t66Service.getAll().subscribe({
      next: (data) => {
        this.arrayCalificacionRiesgo = data;
      },
      error: (error) => {
        console.error('Error al cargar Tipos de Identificación:', error);
      }
    });
  }
}
