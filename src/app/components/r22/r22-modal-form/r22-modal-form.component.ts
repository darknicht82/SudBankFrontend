import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule, Form } from '@angular/forms';
import { T4Service } from '../../../services/t4.service';
import { T29Service } from '../../../services/t29.service';
import { R22CatalogService } from '../../../services/r22-catalog.service';

@Component({
  selector: 'app-r22-modal-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './r22-modal-form.component.html',
  styleUrl: './r22-modal-form.component.scss'
})
export class R22ModalFormComponent implements OnInit{

  @Input() isVisible: boolean = false;
  @Output() modalClosed = new EventEmitter<void>();

  arrayTipoIdentificacion: any[] = [];
  arrayCalificacionPropia: any[] = [];
  arrayCalificacionHomologada: any[] = [];
  r22Form: FormGroup;
  formSubmitted = false;

  constructor(private fb: FormBuilder, 
    private t4service: T4Service,
    private t29service: T29Service,
    private R22catalogService: R22CatalogService) {
    this.r22Form = this.fb.group({
      tipoIdentificacion: [null, Validators.required],
      identificacionSujeto: [null, Validators.required],
      numeroTarjeta: [null, Validators.required],
      diasMorasidad: [null, Validators.required],
      calificacionPropia: [null, Validators.required],
      calificacionHomologada: [null, Validators.required],
      provisionRequerida: [null, Validators.required],
      provisionConstituida: [null, Validators.required],
      valorMinimoPagar: [null, Validators.required],
      valorPagado: [null, Validators.required],
      valorPagar: [null, Validators.required],
      valorInteresValorPagar: [null, Validators.required],
      valorSeguroValorPagar: [null, Validators.required],
      saldoCuotaCapitalDiferida: [null, Validators.required],
      valorInteresCapitalDiferido: [null, Validators.required],
    });
  }



  ngOnInit(): void {
    this.loadTipoIdentificacion();
    this.loadCalificacionPropia();
    this.loadCalificacionHomologada();
    
  }

  closeModal(): void {
    this.isVisible = false;
    this.modalClosed.emit();
  }

  onSubmit(): void {
    this.formSubmitted = true;
    console.log('Form submitted', this.r22Form);

    if (this.r22Form.valid) {
      const formData = this.r22Form.value;
      console.log('📌 Form Data:', formData);
      
      // Asegurarnos de que los campos numéricos sean números
      formData.diasMorasidad = Number(formData.diasMorasidad);
      formData.provisionRequerida = Number(formData.provisionRequerida);
      formData.provisionConstituida = Number(formData.provisionConstituida);
      formData.valorMinimoPagar = Number(formData.valorMinimoPagar);
      formData.valorPagado = Number(formData.valorPagado);
      formData.valorPagar = Number(formData.valorPagar);
      formData.valorInteresValorPagar = Number(formData.valorInteresValorPagar);
      formData.valorSeguroValorPagar = Number(formData.valorSeguroValorPagar);
      formData.saldoCuotaCapitalDiferida = Number(formData.saldoCuotaCapitalDiferida);
      formData.valorInteresCapitalDiferido = Number(formData.valorInteresCapitalDiferido);

      this.R22catalogService.saveR22(formData);
      console.log('Saving form data:', formData);

      this.r22Form.reset();
      this.formSubmitted = false;
      this.isVisible = false;
      this.modalClosed.emit();
    } else {
      console.log('Form is invalid', this.r22Form.errors);
      Object.keys(this.r22Form.controls).forEach(key => {
        const control = this.r22Form.get(key);
        if (control?.invalid) {
          console.log(`${key} is invalid:`, control.errors);
        }
      });
    }
  }

  isInvalid(controlName: string){
    const control = this.r22Form.get(controlName);
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

  private loadCalificacionPropia(): void {
    this.t29service.getAllT29().subscribe({
      next: (data) => {
        this.arrayCalificacionPropia = data;
      },
      error: (error) => {
        console.error('Error al cargar Calificación Propia:', error);
      }
    })

  }

  private loadCalificacionHomologada(): void {
    this.t29service.getAllT29().subscribe({
      next: (data) => {
        this.arrayCalificacionHomologada = data;
      },
      error: (error) => {
        console.error('Error al cargar Calificación Homologada:', error);
      }
    })

  }

}
