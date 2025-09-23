import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule, Form } from '@angular/forms';
import { T4Service } from '../../../services/t4.service';
import { GenericCatalogService } from '../../../services/catalogs/generic-catalog.service';
import { R09CatalogService } from '../../../services/r09-catalog.service';

@Component({
  selector: 'app-r09-modal-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './r09-modal-form.component.html',
  styleUrl: './r09-modal-form.component.scss'
})
export class R09ModalFormComponent implements OnInit{

  @Input() isVisible: boolean = false;
  @Output() modalClosed = new EventEmitter<void>();

  arrayTipoIdentificacion: any[] = [];
  arrayDestinoPais: any[] = [];
  arrayTipoTitulo: any[] = [];
  arrayEstado: any[] = [];
  r09Form: FormGroup;
  formSubmitted = false;

  constructor(private fb: FormBuilder, 
    private t4service: T4Service,
    private tGenericCatalog: GenericCatalogService,
    private R09catalogService: R09CatalogService) {
    this.r09Form = this.fb.group({
      tipoIdentificacion: [null, Validators.required],
      identificacionSujeto: [null, Validators.required],
      numeroOperacion: [null, Validators.required],
      codigoTituloValor: [null, Validators.required],
      tipoTitulo: [null, Validators.required],
      descripcionTituloValor: [null, Validators.required],
      nombreEmisor: [null, Validators.required],
      pais: [null, Validators.required],
      fechaEmision: [null, Validators.required],
      fechaVencimiento: [null, Validators.required],
      valorNominal: [null, Validators.required],
      fechaContabilizacion: [null, Validators.required],
      valorLibros: [null, Validators.required],
      valorProvisionConstituida: [null, Validators.required],
      valorRealizacionTitulo: [null, Validators.required],
      estadoRegistro: [null, Validators.required],
      custodioExterno: [null, Validators.required],
      numeroProcesosSubasta: [null, Validators.required],
      fechaPrimeraSubasta: [null, Validators.required],
      fechaSegundaSubasta: [null, Validators.required],
    });
  }



  ngOnInit(): void {
    this.loadTipoIdentificacion();
    this.loadDestinoPais();
    this.loadEstado();
    this.loadTipo();
  }

  closeModal(): void {
    this.isVisible = false;
    this.modalClosed.emit();
  }

  onSubmit(): void {
    this.formSubmitted = true;

    if (this.r09Form.valid) {
      const formData = this.r09Form.value;
      console.log('📌 Form Data:', formData);
      this.R09catalogService.saveR09(formData);

      this.r09Form.reset();
      this.formSubmitted = false;

      this.isVisible = false;
      this.modalClosed.emit();
    }
  }

  isInvalid(controlName: string){
    const control = this.r09Form.get(controlName);
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

    private loadDestinoPais(): void {
      this.tGenericCatalog.getAllByCatalog('t5').subscribe({
        next: (data) => {
          this.arrayDestinoPais = data;
        },
        error: (error) => {
          console.error('Error al cargar Destino Pais:', error);
        }
      })
    }

    

    private loadEstado(): void {
      this.tGenericCatalog.getAllByCatalog('t47').subscribe({
        next: (data) => {
          this.arrayEstado = data;
        },
        error: (error) => {
          console.error('Error al cargar Estado:', error);
        }
      })
    }

    private loadTipo(): void {
      this.tGenericCatalog.getAllByCatalog('t41_A').subscribe({
        next: (data) => {
          this.arrayTipoTitulo = data;
        },
        error: (error) => {
          console.error('Error al cargar Tipo:', error);
        }
      })
    }

    
  

}
