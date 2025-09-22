import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule, Form } from '@angular/forms';
import { T4Service } from '../../../services/t4.service';
import { GenericCatalogService } from '../../../services/catalogs/generic-catalog.service';
import { R08CatalogService } from '../../../services/r08-catalog.service';

@Component({
  selector: 'app-r08-modal-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './r08-modal-form.component.html',
  styleUrl: './r08-modal-form.component.scss'
})
export class R08ModalFormComponent implements OnInit{

  @Input() isVisible: boolean = false;
  @Output() modalClosed = new EventEmitter<void>();

  arrayTipoIdentificacion: any[] = [];
  arrayDestinoPais: any[] = [];
  arrayDestinoProvincia: any[] = [];
  arrayDestinoCanton: any[] = [];
  arrayTipoBien: any[] = [];
  arrayEstado: any[] = [];

  r08Form: FormGroup;
  formSubmitted = false;
  constructor(private fb: FormBuilder, 
    private t4service: T4Service,
    private tGenericCatalog: GenericCatalogService,
    private R08catalogService: R08CatalogService) {
    this.r08Form = this.fb.group({
      tipoIdentificacion: [null, Validators.required],
      identificacionSujeto: [null, Validators.required],
      numeroOperacion: [null, Validators.required],
      codigoBien: [null, Validators.required],
      tipoBien: [null, Validators.required],
      descripcionBien: [null, Validators.required],
      pais: [null, Validators.required],
      provincia: [null, Validators.required],
      canton: [null, Validators.required],
      fechaContabilizacion: [null, Validators.required],
      valorLibros: [null, Validators.required],
      valorUltimoAvaluo: [null, Validators.required],
      fechaUltimoAvaluo: [null, Validators.required],
      valorProvisionConstituida: [null, Validators.required],
      fechaRealizacionBien: [null, Validators.required],
      valorRealizacionBien: [null, Validators.required],
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
    this.loadDestinProvincia();
    this.loadDestinoCanton();
    this.loadEstado();
    this.loadTipo();
  }

  closeModal(): void {
    this.isVisible = false;
    this.modalClosed.emit();
  }

  onSubmit(): void {
    this.formSubmitted = true;

    if (this.r08Form.valid) {
      const formData = this.r08Form.value;
      console.log('📌 Form Data:', formData);
      this.R08catalogService.saveR08(formData);

      this.r08Form.reset();
      this.formSubmitted = false;

      this.isVisible = false;
      this.modalClosed.emit();
    }
  }

  isInvalid(controlName: string){
    const control = this.r08Form.get(controlName);
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

    private loadDestinProvincia(): void {
      this.tGenericCatalog.getAllByCatalog('t6').subscribe({
        next: (data) => {
          this.arrayDestinoProvincia = data;
        },
        error: (error) => {
          console.error('Error al cargar Destino Provincia:', error);
        }
      })
    
    }

    private loadDestinoCanton(): void {
      this.tGenericCatalog.getAllByCatalog('t7').subscribe({
        next: (data) => {
          this.arrayDestinoCanton = data;
        },
        error: (error) => {
          console.error('Error al cargar Destino Canton:', error);
        }
      })
    }

    private loadEstado(): void {
      this.tGenericCatalog.getAllByCatalog('t47').subscribe({
        next: (data) => {
          this.arrayEstado = data;
        },
        error: (error) => {
          console.error('Error al cargar Destino Canton:', error);
        }
      })
    }

    private loadTipo(): void {
      this.tGenericCatalog.getAllByCatalog('t41').subscribe({
        next: (data) => {
          this.arrayTipoBien = data;
        },
        error: (error) => {
          console.error('Error al cargar Destino Canton:', error);
        }
      })
    }

    
  

}
