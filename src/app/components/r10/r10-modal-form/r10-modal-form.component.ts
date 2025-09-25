import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule, Form } from '@angular/forms';
import { T4Service } from '../../../services/t4.service';
import { GenericCatalogService } from '../../../services/catalogs/generic-catalog.service';
import { R10CatalogService } from '../../../services/r10-catalog.service';

@Component({
  selector: 'app-r10-modal-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './r10-modal-form.component.html',
  styleUrl: './r10-modal-form.component.scss'
})
export class R10ModalFormComponent implements OnInit{

  @Input() isVisible: boolean = false;
  @Output() modalClosed = new EventEmitter<void>();

  arrayTipoIdentificacion: any[] = [];
  arrayClaseBienTitulo: any[] = [];
  arrayTipoBienTitulo: any[] = [];
  arrayTipoTitulo: any[] = [];
  r10Form: FormGroup;
  formSubmitted = false;

  constructor(private fb: FormBuilder, 
    private t4service: T4Service,
    private tGenericCatalog: GenericCatalogService,
    private R10catalogService: R10CatalogService) {
    this.r10Form = this.fb.group({
      tipoIdentificacion: [null, Validators.required],
      identificacionSujeto: [null, Validators.required],
      numeroOperacion: [null, Validators.required],
      codigoClaseBienTitulo: [null, Validators.required],
      codigoBienTitulo: [null, Validators.required],
      tipoBienTitulo: [null, Validators.required],
      provisionConstituida: [null, Validators.required],
      costosGenerados: [null, Validators.required],
      tipoTitulo: [null, Validators.required],  
    });
  }



  ngOnInit(): void {
    this.loadTipoIdentificacion();
    this.loadClaseBienTitulo();
    this.loadTipoBienTitulo();
    this.loadTipoTitulo();
  }

  closeModal(): void {
    this.isVisible = false;
    this.modalClosed.emit();
  }

  onSubmit(): void {
    this.formSubmitted = true;

    if (this.r10Form.valid) {
      const formData = this.r10Form.value;
      console.log('📌 Form Data:', formData);
      this.R10catalogService.saveR10(formData);

      this.r10Form.reset();
      this.formSubmitted = false;

      this.isVisible = false;
      this.modalClosed.emit();
    }
  }

  isInvalid(controlName: string){
    const control = this.r10Form.get(controlName);
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

  private loadClaseBienTitulo(): void {
    this.tGenericCatalog.getAllByCatalog('t214').subscribe({
      next: (data) => {
        this.arrayClaseBienTitulo = data;
      },
      error: (error) => {
        console.error('Error al cargar el Bien:', error);
      }
    })
  }

    private loadTipoBienTitulo(): void {
      this.tGenericCatalog.getAllByCatalog('t41').subscribe({
        next: (data) => {
          this.arrayTipoBienTitulo = data;
        },
        error: (error) => {
          console.error('Error al cargar el Bien:', error);
        }
      })
    }

    

    private loadTipoTitulo(): void {
      this.tGenericCatalog.getAllByCatalog('t41_A').subscribe({
        next: (data) => {
          this.arrayTipoTitulo = data;
        },
        error: (error) => {
          console.error('Error al cargar el Titulo', error);
        }
      })
    }

    
  

}
