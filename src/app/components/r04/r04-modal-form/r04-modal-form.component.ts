import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { T4Service } from '../../../services/t4.service';
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
  r04Form: FormGroup;
  formSubmitted = false;

  constructor(private fb: FormBuilder,
    private t4Service: T4Service,
    private r04catalogService: R04CatalogService,
  ) {
    this.r04Form = this.fb.group({
      tipoIdentificacion: [null, Validators.required],
      identificacionSujeto: [null, Validators.required],
      numeroOperacion: [null, Validators.required],
      diasMorosidad: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadTipoIdentificacion();
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
          console.log('✅ L02 - Registro guardado exitosamente:', response);
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