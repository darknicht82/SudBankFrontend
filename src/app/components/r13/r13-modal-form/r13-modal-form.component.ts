import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule, Form } from '@angular/forms';
import { T4Service } from '../../../services/t4.service';
import { GenericCatalogService } from '../../../services/catalogs/generic-catalog.service';
import { R13CatalogService } from '../../../services/r13-catalog.service';

@Component({
  selector: 'app-r13-modal-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './r13-modal-form.component.html',
  styleUrl: './r13-modal-form.component.scss'
})
export class R13ModalFormComponent implements OnInit{

  @Input() isVisible: boolean = false;
  @Output() modalClosed = new EventEmitter<void>();

  arrayTipoIdentificacion: any[] = [];
  arrayEstado: any[] = [];
  arrayFactor: any[] = [];
  r13Form: FormGroup;
  formSubmitted = false;

  constructor(private fb: FormBuilder, 
    private t4service: T4Service,
    private tGenericCatalog: GenericCatalogService,
    private R13catalogService: R13CatalogService) {
    this.r13Form = this.fb.group({
      tipoIdentificacion: [null, Validators.required],
      identificacionIntegrante: [null, Validators.required],
      codigoGrupoEconomico: [null, Validators.required],
      estadoIntegrante: [null, Validators.required],
      fechaEstadoIntegrante: [null, Validators.required],
      factorIntegracion: [null, Validators.required],
    });
  }



  ngOnInit(): void {
    this.loadTipoIdentificacion();
    this.loadEstado();
    this.loadFactor();
  }

  closeModal(): void {
    this.isVisible = false;
    this.modalClosed.emit();
  }

  onSubmit(): void {
    this.formSubmitted = true;

    if (this.r13Form.valid) {
      const formData = this.r13Form.value;
      console.log('📌 Form Data:', formData);
      this.R13catalogService.saveR13(formData);

      this.r13Form.reset();
      this.formSubmitted = false;

      this.isVisible = false;
      this.modalClosed.emit();
    }
  }

  isInvalid(controlName: string){
    const control = this.r13Form.get(controlName);
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

  private loadEstado(): void {
    this.tGenericCatalog.getAllByCatalog('t44').subscribe({
      next: (data) => {
        this.arrayEstado = data;
      },
      error: (error) => {
        console.error('Error al cargar Estado:', error);
      }
    })
  }

  private loadFactor(): void {
    this.tGenericCatalog.getAllByCatalog('t43').subscribe({
      next: (data) => {
        this.arrayEstado = data;
      },
      error: (error) => {
        console.error('Error al cargar Estado:', error);
      }
    })
  }

    

    
  

}
