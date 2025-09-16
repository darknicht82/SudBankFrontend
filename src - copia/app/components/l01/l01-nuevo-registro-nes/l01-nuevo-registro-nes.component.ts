import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { L01Record } from '../../../services/l01/l01.service';
import { L01CatalogService } from '../../../services/l01-catalog.service';
import { T4Service } from '../../../services/t4.service';
import { T73Service } from '../../../services/t73.service';
import { T173Service } from '../../../services/t173.service';
import { T164Service } from '../../../services/t164.service';

@Component({
  selector: 'app-l01-nuevo-registro-nes',
  templateUrl: './l01-nuevo-registro-nes.component.html',
  styleUrls: ['./l01-nuevo-registro-nes.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class L01NuevoRegistroNesComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Output() modalClosed = new EventEmitter<void>();

  tiposIdentificacion: any[] = [];
  clasificaciones: any[] = [];
  tiposEmisor: any[] = [];
  emisoresT164: any[] = [];
  emisoresFiltrados: any[] = [];
  l01Form: FormGroup;
  formSubmitted = false;
  
  // Mensajes de feedback
  showMessage = false;
  messageType: 'success' | 'error' = 'success';
  messageText = '';
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private l01CatalogService: L01CatalogService,
    private t4Service: T4Service,
    private t73Service: T73Service,
    private t173Service: T173Service,
    private t164Service: T164Service
  ) {
    this.l01Form = this.fb.group({
      tipoIdentificacion: [null, Validators.required],
      identificacion: [null, Validators.required],
      clasificacion: [null, Validators.required],
      tipoEmisor: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadTipoIdentificacion();
    this.loadClasificaciones();
    this.loadTiposEmisor();
    this.loadIdentificacionEmisor();
  }

  closeModal(): void {
    this.isVisible = false;
    this.modalClosed.emit();
  }

  onSubmit(): void {
    this.formSubmitted = true;
    this.hideMessage();

    if (this.l01Form.valid) {
      this.isSubmitting = true;
      const formData = this.l01Form.value;
      console.log('📌 Form Data:', formData);
      
      this.l01CatalogService.saveL01(formData).subscribe({
        next: (response) => {
          console.log('✅ Registro guardado exitosamente:', response);
          this.showSuccessMessage('¡Registro guardado exitosamente!');
          this.l01Form.reset();
          this.formSubmitted = false;
          this.isSubmitting = false;
          
          // Cerrar modal después de 2 segundos
          setTimeout(() => {
            this.isVisible = false;
            this.modalClosed.emit();
          }, 2000);
        },
        error: (error) => {
          console.error('❌ Error al guardar registro:', error);
          this.isSubmitting = false;
          
          let errorMessage = 'Error desconocido al guardar el registro';
          
          if (error.status === 403) {
            errorMessage = 'Error 403: No tiene permisos para guardar registros. Contacte al administrador.';
          } else if (error.status === 400) {
            errorMessage = 'Error 400: Datos inválidos. Verifique la información ingresada.';
          } else if (error.status === 500) {
            errorMessage = 'Error 500: Error interno del servidor. Intente nuevamente.';
          } else if (error.status === 0) {
            errorMessage = 'Error de conexión: No se pudo conectar con el servidor.';
          } else if (error.error && error.error.message) {
            errorMessage = `Error: ${error.error.message}`;
          }
          
          this.showErrorMessage(errorMessage);
        }
      });
    } else {
      this.showErrorMessage('Por favor, complete todos los campos requeridos.');
    }
  }

  isInvalid(controlName: string) {
    const control = this.l01Form.get(controlName);
    return control?.invalid && (control.touched || this.formSubmitted);
  }

  private showSuccessMessage(message: string): void {
    this.messageType = 'success';
    this.messageText = message;
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 5000);
  }

  private showErrorMessage(message: string): void {
    this.messageType = 'error';
    this.messageText = message;
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 8000);
  }

  hideMessage(): void {
    this.showMessage = false;
  }

  private loadTipoIdentificacion(): void {
    this.t4Service.getAll().subscribe({
      next: (data) => {
        this.tiposIdentificacion = data;
      },
      error: (error) => {
        console.error('Error al cargar Tipos de Identificación:', error);
      }
    });
  }

  private loadClasificaciones(): void {
    this.t173Service.getAll().subscribe({
      next: (data) => {
        this.clasificaciones = data;
      },
      error: (error) => {
        console.error('Error al cargar Clasificaciones:', error);
      }
    });
  }

  private loadTiposEmisor(): void {
    this.t73Service.getAll().subscribe({
      next: (data) => {
        this.tiposEmisor = data;
      },
      error: (error) => {
        console.error('Error al cargar Tipos de Emisor:', error);
      }
    });
  }

  private loadIdentificacionEmisor(): void {
    this.t164Service.getAll().subscribe({
      next: (data) => {
        this.emisoresT164 = data;
        this.emisoresFiltrados = data;
      },
      error: (error) => {
        console.error('Error al cargar Identificaciones de Emisor:', error);
      }
    });
  }
}
