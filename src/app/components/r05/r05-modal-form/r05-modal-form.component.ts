import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule, Form } from '@angular/forms';
import { T4Service } from '../../../services/t4.service';
import { T29Service } from '../../../services/t29.service';
import { GenericCatalogService } from '../../../services/catalogs/generic-catalog.service';
import { R05CatalogService } from '../../../services/r05-catalog.service';

@Component({
  selector: 'app-r05-modal-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './r05-modal-form.component.html',
  styleUrl: './r05-modal-form.component.scss' 
})
export class R05ModalFormComponent {

  @Input() isVisible: boolean = false;
  @Output() modalClosed = new EventEmitter<void>();

  arrayTipoIdentificacion: any[] = [];
  arrayTipoTransaccion: any[] = [];
  arrayFormaCancelacion: any[] = [];
  arrayCodigoCalificacion: any[] = [];

  r05Form: FormGroup;
  formSubmitted = false;

  constructor(private fb: FormBuilder, 
    private t4Service: T4Service,
    private t29Service: T29Service,
    private GenericService: GenericCatalogService,
    private R05catalogService: R05CatalogService) {
    this.r05Form = this.fb.group({
      tipoIdentificacion: [null, Validators.required],
      identificacionSujeto: [null, Validators.required],
      numeroOperacion: [null, Validators.required],
      codigoTipoTransaccion: [null, Validators.required],
      fechaCancelacion: [null, Validators.required],
      codigoFormaCancelacion: [null, Validators.required],
      codigoCalificacion: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadTipoIdentificacion();
    this.loadTipoTransaccion();
    this.loadFormaCancelacion();
    this.loadCalificacion(); 
    
  }

   closeModal(): void {
    this.isVisible = false;
    this.modalClosed.emit();
  }

  onSubmit(): void {
    this.formSubmitted = true;

    if (this.r05Form.valid) {
      const formData = this.r05Form.value;
      console.log('📌 Form Data:', formData);
      this.R05catalogService.saveR05(formData);

      this.r05Form.reset();
      this.formSubmitted = false;

      this.isVisible = false;
      this.modalClosed.emit();
    }
  }

  isInvalid(controlName: string){
    const control = this.r05Form.get(controlName);
    return control?.invalid && (control.touched || this.formSubmitted);
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

  private loadTipoTransaccion(): void {
    this.GenericService.getAllByCatalog('t39').subscribe({
      next: (data) => {
        this.arrayTipoTransaccion = data;
      },
      error: (error) => {
        console.error('Error al cargar Tipos de Transacción:', error);
      }
    });
  }

  private loadFormaCancelacion(): void {
    this.GenericService.getAllByCatalog('t208').subscribe({
      next: (data) => {
        this.arrayFormaCancelacion = data;
      },
      error: (error) => {
        console.error('Error al cargar las Formas de Cancelación:', error);
      }
    });
  }

  private loadCalificacion(): void {
    this.t29Service.getAllT29().subscribe({
      next: (data) => {
        this.arrayCodigoCalificacion = data;
      },
      error: (error) => {
        console.error('Error al cargar las Calificaciones:', error);
      }
    });
  }



}
