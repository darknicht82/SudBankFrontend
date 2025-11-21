import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule, Form } from '@angular/forms';
import { T4Service } from '../../../services/t4.service';
import { T65Service } from '../../../services/t65.service';
import { T66Service } from '../../../services/t66.service';
import { GenericCatalogService } from '../../../services/catalogs/generic-catalog.service';
import { L08CatalogService } from '../../../services/l08-catalog.service';

@Component({
  selector: 'app-l08-modal-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './l08-modal-form.component.html',
  styleUrl: './l08-modal-form.component.scss'
})
export class l08ModalFormComponent implements OnInit{

  @Input() isVisible: boolean = false;
  @Output() modalClosed = new EventEmitter<void>();
  arrayCodigoLiquidez: any[] = [];
  arrayTipoIdentificacionEntidad: any[] = [];
  arrayTipoInstrumento: any[] = [];
  arrayCalificacionEntidad: any[] = [];
  arrayCalificadoraRiesgo: any[] = [];
  
  l08Form: FormGroup;
  formSubmitted = false;
  constructor(private fb: FormBuilder, 
    private t4service: T4Service,
    private t65Service: T65Service,
    private t66Service: T66Service,
    private genericCatalogService: GenericCatalogService,
    private l08catalogService: L08CatalogService) {
    this.l08Form = this.fb.group({
      codigoLiquidez: [null, Validators.required],
      tipoIdentificacionEntidad: [null, Validators.required],
      identificacionEntidad: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      tipoInstrumento: [null, Validators.required],
      calificacionEntidad: [null, Validators.required],
      calificadoraRiesgo: [null, Validators.required],
      lunes: [null, [Validators.required, Validators.min(0)]],
      martes: [null, [Validators.required, Validators.min(0)]],
      miercoles: [null, [Validators.required, Validators.min(0)]],
      jueves: [null, [Validators.required, Validators.min(0)]],
      viernes: [null, [Validators.required, Validators.min(0)]],
    });
  }



  ngOnInit(): void {
    this.loadCodigoLiquidez();
    this.loadTiposIdentificacionEntidad();
    this.loadTipoInstrumento();
    this.loadCalificacionEntidad();
    this.loadCalificadoraRiesgo();
  }

  closeModal(): void {
    this.isVisible = false;
    this.modalClosed.emit();
  }

  onSubmit(): void {
    this.formSubmitted = true;

    if (this.l08Form.valid) {
      const formData = this.l08Form.value;
      console.log('📌 Form Data:', formData);
      this.l08catalogService.saveL08(formData).subscribe({
        next: (response) => {
          console.log('✅ L08 guardado exitosamente:', response);
        },
        error: (error) => {
          console.error('❌ Error guardando L08:', error);
        }
      })

      this.l08Form.reset();
      this.formSubmitted = false;

      this.isVisible = false;
      this.modalClosed.emit();
    }
  }

  isInvalid(controlName: string){
    const control = this.l08Form.get(controlName);
    return control?.invalid && (control.touched || this.formSubmitted);
  }

  private loadCodigoLiquidez() {
    this.genericCatalogService.getAllByCatalog('t59').subscribe({
      next: (data) => {
        this.arrayCodigoLiquidez = data;
      },
      error: (error) => {
        console.error('Error al cargar Código de Liquidez:', error);
      }
    });
  }
  
  private loadTiposIdentificacionEntidad() {
    this.t4service.getAll().subscribe({
      next: (data) => {
        this.arrayTipoIdentificacionEntidad = data;
      },
      error: (error) => {
        console.error('Error al cargar Tipos de Identificación:', error);
      }
    });
  }

  private loadTipoInstrumento() {
    this.genericCatalogService.getAllByCatalog('t62').subscribe({
      next: (data) => {
        this.arrayTipoInstrumento = data;
      },
      error: (error) => {
        console.error('Error al cargar Tipo de Instrumento:', error);
      }
    });
  }

  private loadCalificacionEntidad() {
    this.t65Service.getAll().subscribe({
      next: (data) => {
        this.arrayCalificacionEntidad = data;
      },
      error: (error) => {
        console.error('Error al cargar Tipos de Identificación:', error);
      }
    });
  }

  private loadCalificadoraRiesgo() {
    this.t66Service.getAll().subscribe({
      next: (data) => {
        this.arrayCalificadoraRiesgo = data;
      },
      error: (error) => {
        console.error('Error al cargar Tipos de Identificación:', error);
      }
    });
  }



 

}
