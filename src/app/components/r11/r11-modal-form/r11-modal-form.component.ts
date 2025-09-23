import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule, Form } from '@angular/forms';
import { T4Service } from '../../../services/t4.service';
import { GenericCatalogService } from '../../../services/catalogs/generic-catalog.service';
import { R11CatalogService } from '../../../services/r11-catalog.service';

@Component({
  selector: 'app-r11-modal-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './r11-modal-form.component.html',
  styleUrl: './r11-modal-form.component.scss'
})
export class R11ModalFormComponent implements OnInit{

  @Input() isVisible: boolean = false;
  @Output() modalClosed = new EventEmitter<void>();

  arrayTipoIdentificacion: any[] = [];
  arrayEntidadParticipe: any[] = [];
  r11Form: FormGroup;
  formSubmitted = false;
  constructor(private fb: FormBuilder ,
     private t4service: T4Service,
     private T2Service: GenericCatalogService,
     private R11catalogService: R11CatalogService) {
       this.r11Form = this.fb.group({

      tipoIdentificacion: [null, Validators.required],
      identificacionSujeto: [null, Validators.required],
      numeroOperacion: [null, Validators.required],
      codigoEntidadParticipe: [null, Validators.required],
      porcentajeParticipacion: [null, Validators.required], 

       });
  }

  ngOnInit(): void {
      this.loadTipoIdentificacion();
      this.loadEntidadParticipe();
  }

  closeModal() {
    this.isVisible = false;
    this.modalClosed.emit();
  }

  onSubmit(): void {
    this.formSubmitted = true;

    if (this.r11Form.valid) {
      const formData = this.r11Form.value;
      console.log('📌 Form Data:', formData);
      this.R11catalogService.saveR11(formData);

      this.r11Form.reset();
      this.formSubmitted = false;

      this.isVisible = false;
      this.modalClosed.emit();
    }
  }

  isInvalid(controlName: string){
    const control = this.r11Form.get(controlName);
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

  private loadEntidadParticipe(): void {
    this.T2Service.getAllByCatalog('t2').subscribe({
      next: (data) => {
        this.arrayEntidadParticipe = data;
      },
      error: (error) => {
        console.error('Error al cargar Tipos de Identificación:', error);
      }
    });
  }

}

