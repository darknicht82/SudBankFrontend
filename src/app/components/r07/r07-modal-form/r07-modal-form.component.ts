import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { T4Service } from '../../../services/t4.service';
import { T5Service } from '../../../services/t5.service';
import { T6Service } from '../../../services/t6.service';
import { T7Service } from '../../../services/t7.service';
import { T42Service } from '../../../services/t42.service';
import { T47Service } from '../../../services/t47.service';
import { R07CatalogService } from '../../../services/r07-catalog.service';

@Component({
  selector: 'app-r07-modal-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './r07-modal-form.component.html',
  styleUrl: './r07-modal-form.component.scss'
})
export class R07ModalFormComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Output() modalClosed = new EventEmitter<void>();

  arrayTipoIdentificacion: any[] = [];
  arrayTipoGarantia: any[] = [];
  arrayUbicacionPais: any[] = [];
  arrayUbicacionProvincia: any[] = [];
  arrayUbicacionCanton: any[] = [];
  arrayEstadoRegistro: any[] = [];
  r07Form: FormGroup;
  formSubmitted = false;

  constructor(private fb: FormBuilder, 
    private t4service: T4Service,
    private t5service: T5Service,
    private t6service: T6Service,
    private t7service: T7Service,
    private t42service: T42Service,
    private t47service: T47Service,
    private r07catalogService: R07CatalogService
  ) {
    this.r07Form = this.fb.group({
      tipoIdentificacionSujeto: [null, Validators.required],
      identificacionSujeto: [null, Validators.required],
      numeroOperacion: [null, Validators.required],
      numeroGarantia: [null, Validators.required],
      tipoGarantia: [null, Validators.required],
      descripcionGarantia: [null, Validators.required],
      ubicacionGarantiaPais: [null, Validators.required],
      ubicacionGarantiaProvincia: [null],
      ubicacionGarantiaCanton: [null],
      valorAvaluoTitulo: [null, [Validators.required, Validators.min(1)]],
      fechaAvaluo: [null, Validators.required],
      numeroRegistroGarantia: [null],
      fechaContabilizacionGarantia: [null, Validators.required],
      porcentajeCubreGarantia: [null, [Validators.required, Validators.min(1), Validators.max(100)]],
      estadoRegistro: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadTipoIdentificacion();
    this.loadTipoGarantia();
    this.loadUbicacionPais();
    this.loadUbicacionProvincia();
    this.loadUbicacionCanton();
    this.loadEstadoRegistro();
  }

  closeModal(): void {
    this.isVisible = false;
    this.modalClosed.emit();
  }

  onSubmit(): void {
    this.formSubmitted = true;

    if (this.r07Form.valid) {
      const formData = this.r07Form.value;
      console.log('📌 R07 - Form Data:', formData);
      
      this.r07catalogService.saveR07(formData).subscribe({
        next: (response) => {
          console.log('✅ R07 - Registro guardado exitosamente:', response);
          this.r07Form.reset();
          this.formSubmitted = false;
          this.isVisible = false;
          this.modalClosed.emit();
        },
        error: (error) => {
          console.error('❌ R07 - Error al guardar registro:', error);
          // No cerrar el modal si hay error, para que el usuario pueda corregir
        }
      });
    } else {
      console.log('❌ R07 - Formulario inválido:', this.r07Form.errors);
    }
  }

  isInvalid(controlName: string) {
    const control = this.r07Form.get(controlName);
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

  private loadTipoGarantia(): void {
    this.t42service.getAll().subscribe({
      next: (data) => {
        this.arrayTipoGarantia = data;
      },
      error: (error) => {
        console.error('Error al cargar Tipos de Garantía:', error);
      }
    });
  }

  private loadUbicacionPais(): void {
    this.t5service.getAll().subscribe({
      next: (data) => {
        this.arrayUbicacionPais = data;
      },
      error: (error) => {
        console.error('Error al cargar Países:', error);
      }
    });
  }

  private loadUbicacionProvincia(): void {
    const pais = this.r07Form.get('ubicacionGarantiaPais')?.value;
    if (pais && pais.codigo === 'EC') {
      this.t6service.getAll().subscribe({
        next: (data) => {
          this.arrayUbicacionProvincia = data;
        },
        error: (error) => {
          console.error('Error al cargar Provincias:', error);
        }
      });
    }
  }

  private loadUbicacionCanton(): void {
    const pais = this.r07Form.get('ubicacionGarantiaPais')?.value;
    if (pais && pais.codigo === 'EC') {
      this.t7service.getAll().subscribe({
        next: (data) => {
          this.arrayUbicacionCanton = data;
        },
        error: (error) => {
          console.error('Error al cargar Cantones:', error);
        }
      });
    }
  }

  private loadEstadoRegistro(): void {
    this.t47service.getAll().subscribe({
      next: (data) => {
        this.arrayEstadoRegistro = data;
      },
      error: (error) => {
        console.error('Error al cargar Estados de Registro:', error);
      }
    });
  }

  onPaisChange(): void {
    this.loadUbicacionProvincia();
    this.loadUbicacionCanton();
    // Clear province and canton when country changes
    this.r07Form.patchValue({
      ubicacionGarantiaProvincia: null,
      ubicacionGarantiaCanton: null
    });
  }
}
