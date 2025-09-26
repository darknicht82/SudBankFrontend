import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule, Form } from '@angular/forms';
import { T4Service } from '../../../services/t4.service';
import { R12CatalogService } from '../../../services/r12-catalog.service';

@Component({
  selector: 'app-r12-modal-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './r12-modal-form.component.html',
  styleUrl: './r12-modal-form.component.scss'
})
export class R12ModalFormComponent implements OnInit{

  @Input() isVisible: boolean = false;
  @Output() modalClosed = new EventEmitter<void>();

  arrayTipoIdentificacion: any[] = [];
  arrayEstado: any[] = [];
  arrayFactor: any[] = [];
  r12Form: FormGroup;
  formSubmitted = false;

  constructor(private fb: FormBuilder, 
    private t4service: T4Service,
    private R12catalogService: R12CatalogService) {
    this.r12Form = this.fb.group({
      tipoIdentificacion: [null, Validators.required],
      nombreGrupoEconomico: [null, Validators.required],
      identificacionIntegrante: [null, Validators.required],
    });
  }



  ngOnInit(): void {
    this.loadTipoIdentificacion();
  
  }

  closeModal(): void {
    this.isVisible = false;
    this.modalClosed.emit();
  }

  onSubmit(): void {
    this.formSubmitted = true;

    if (this.r12Form.valid) {
      const formData = this.r12Form.value;
      console.log('📌 Form Data:', formData);
      this.R12catalogService.saveR12(formData);

      this.r12Form.reset();
      this.formSubmitted = false;

      this.isVisible = false;
      this.modalClosed.emit();
    }
  }

  isInvalid(controlName: string){
    const control = this.r12Form.get(controlName);
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



    

    
  

}
