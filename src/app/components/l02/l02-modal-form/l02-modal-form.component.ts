import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { T4Service } from '../../../services/t4.service';
import { T164Service } from '../../../services/t164.service';
import { T165Service } from '../../../services/t165.service';
import { T166Service } from '../../../services/t166.service';
import { T167Service } from '../../../services/t167.service';
import { T168Service } from '../../../services/t168.service';
import { T33Service } from '../../../services/t33.service';
import { T64Service } from '../../../services/t64.service';
import { T62AService } from '../../../services/t62A.service';
import { L02CatalogService } from '../../../services/l02-catalog.service';

@Component({
  selector: 'app-l02-modal-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './l02-modal-form.component.html',
  styleUrl: './l02-modal-form.component.scss'
})
export class L02ModalFormComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Output() modalClosed = new EventEmitter<void>();

  arrayTipoIdentificacion: any[] = [];
  arrayIdentificacionEmisor: any[] = [];
  arrayCodigoIdentifadorInstrumento: any[] = [];
  arrayIdentificacionInstrumento: any[] = [];
  arrayCategoriaInstrumento: any[] = [];
  arrayTipoInstrumento: any[] = [];
  arrayOpcionalidad: any[] = [];
  arrayTasaBase: any[] = [];
  arrayTipoTasa: any[] = [];
  arrayMonedaDenominacion: any[] = [];
  l02Form: FormGroup;
  formSubmitted = false;

  constructor(private fb: FormBuilder, 
    private t164service: T164Service,
    private t165service: T165Service,
    private t166service: T166Service,
    private t167service: T167Service,
    private t168service: T168Service,
    private t33Service: T33Service,
    private t64Service: T64Service,
    private t62AService: T62AService,
    private t4service: T4Service,
    private l02catalogService: L02CatalogService
  ) {
    this.l02Form = this.fb.group({
      tipoIdentificacion: [null, Validators.required],
      identificacionEmisor: [null, Validators.required],
      numeroTitulo: [null, Validators.required],
      fechaEmision: [null, Validators.required],
      fechaCompra: [null, Validators.required],
      fechaVencimiento: [null, Validators.required],
      codigoInstrumento: [null, Validators.required],
      identificacionInstrumento: [null, Validators.required],
      categoriaInstrumento: [null, Validators.required],
      tipoInstrumento: [null, Validators.required],
      opcionalidad: [null, Validators.required],
      tasaBase: [null, Validators.required],
      diferencial: [null, Validators.required],
      tipoTasa: [null, Validators.required],
      moneda: [null, Validators.required],
      unidadesAdquiridas: [null, [Validators.required, Validators.min(1)]],
      valorNominalDenominacion: [null, [Validators.required, Validators.min(1)]],
      valorNominalDolares: [null, [Validators.required, Validators.min(1)]],
      precioCompra: [null, [Validators.required, Validators.min(1)]],
      valorCompraDenominacion: [null, [Validators.required, Validators.min(1)]],
      valorCompraDolares: [null, [Validators.required, Validators.min(1)]],
      frecuenciaRevision: [null, Validators.required],
      periodicidadPago: [null, Validators.required],
      //edad: [null, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.loadTipoIdentificacion();
    this.loadIdentificacionEmisor();
    this.loadCategoriaInstrumento();
    this.loadCodigoIdentificadorInstrumento();
    this.loadMonedaDenominacion();
    this.loadOpcionalidad();
    this.loadTasaBase();
    this.loadTipoInstrumento();
    this.loadTipoTasa();
  }

  closeModal(): void {
    this.isVisible = false;
    this.modalClosed.emit();
  }

  onSubmit(): void {
    this.formSubmitted = true;

    if (this.l02Form.valid) {
      const formData = this.l02Form.value;
      console.log('📌 Form Data:', formData);
      this.l02catalogService.saveL02(formData);

      this.l02Form.reset();
      this.formSubmitted = false;

      this.isVisible = false;
      this.modalClosed.emit();
    }
  }

  isInvalid(controlName: string) {
    const control = this.l02Form.get(controlName);
    return control?.invalid && (control.touched || this.formSubmitted);
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

  private loadIdentificacionEmisor(): void {
    this.t164service.getAll().subscribe({
      next: (data) => {
        this.arrayIdentificacionEmisor = data;
      },
      error: (error) => {
        console.error('Error al cargar Tipos de Identificación:', error);
      }
    });
  }

  private loadCodigoIdentificadorInstrumento(): void {
    this.t165service.getAll().subscribe({
      next: (data) => {
        this.arrayCodigoIdentifadorInstrumento = data;
      },
      error: (error) => {
        console.error('Error al cargar Tipos de Identificación:', error);
      }
    });
  }

  private loadCategoriaInstrumento(): void {
    this.t166service.getAll().subscribe({
      next: (data) => {
        this.arrayCategoriaInstrumento = data;
      },
      error: (error) => {
        console.error('Error al cargar Tipos de Identificación:', error);
      }
    });
  }

  private loadTipoInstrumento(): void {
    this.t62AService.getAll().subscribe({
      next: (data) => {
        this.arrayTipoInstrumento = data;
      },
      error: (error) => {
        console.error('Error al cargar Tipos de Identificación:', error);
      }
    });
  }

  private loadOpcionalidad(): void {
    this.t167service.getAll().subscribe({
      next: (data) => {
        this.arrayOpcionalidad = data;
      },
      error: (error) => {
        console.error('Error al cargar Tipos de Identificación:', error);
      }
    });
  }

  private loadTasaBase(): void {
    this.t64Service.getAll().subscribe({
      next: (data) => {
        this.arrayTasaBase = data;
      },
      error: (error) => {
        console.error('Error al cargar Tipos de Identificación:', error);
      }
    });
  }

  private loadTipoTasa(): void {
    this.t168service.getAll().subscribe({
      next: (data) => {
        this.arrayTipoTasa = data;
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
}
