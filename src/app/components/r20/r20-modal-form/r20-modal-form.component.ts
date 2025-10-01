import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule, Form } from '@angular/forms';
import { T4Service } from '../../../services/t4.service';
import { GenericCatalogService } from '../../../services/catalogs/generic-catalog.service';
import { R20CatalogService } from '../../../services/r20-catalog.service';

@Component({
  selector: 'app-r20-modal-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './r20-modal-form.component.html',
  styleUrl: './r20-modal-form.component.scss'
})
export class R20ModalFormComponent implements OnInit{

  @Input() isVisible: boolean = false;
  @Output() modalClosed = new EventEmitter<void>();

  arrayTipoIdentificacion: any[] = [];
  arrayMarcaTarjeta: any[] = [];
  arrayClaseTarjeta: any[] = [];
  arrayOficina: any[] = [];
  arrayTipoCredito: any[] = [];
  arrayEstadoRegistro: any[] = [];
  r20Form: FormGroup;
  formSubmitted = false;
  constructor(private fb: FormBuilder ,
     private t4service: T4Service,
     private TGeneric: GenericCatalogService,
     private R20catalogService: R20CatalogService) {
       this.r20Form = this.fb.group({

      tipoIdentificacion: [null, Validators.required],
      identificacionSujeto: [null, Validators.required],
      numeroTarjeta: [null, Validators.required],
      marcaTarjeta: [null, Validators.required],
      claseTarjeta: [null, Validators.required],
      fechaEmision: [null, Validators.required],
      fechaVencimiento: [null, Validators.required],
      numeroTarjetasAdicionales: [null, Validators.required],
      oficina: [null, Validators.required],
      tipoCredito: [null, Validators.required],
      estadoRegistro: [null, Validators.required],
      totalIngresosSujeto: [null, Validators.required],
      totalEgresosSujeto: [null, Validators.required],

       });
  }

  ngOnInit(): void {
      this.loadTipoIdentificacion();
      this.loadMarcaTarjeta();
      this.loadClaseTarjeta();
      this.loadOficina();
      this.loadTipoCredito();
      this.loadEstadoRegistro();

  }

  closeModal() {
    this.isVisible = false;
    this.modalClosed.emit();
  }

  onSubmit(): void {
    this.formSubmitted = true;

    if (this.r20Form.valid) {
      const formData = this.r20Form.value;
      console.log('📌 Form Data:', formData);
      this.R20catalogService.saveR20(formData);

      this.r20Form.reset();
      this.formSubmitted = false;

      this.isVisible = false;
      this.modalClosed.emit();
    }
  }

  isInvalid(controlName: string){
    const control = this.r20Form.get(controlName);
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

  private loadMarcaTarjeta(): void {
    this.TGeneric.getAllByCatalog('t45').subscribe({
      next: (data) => {
        this.arrayMarcaTarjeta = data;
      },
      error: (error) => {
        console.error('Error al cargar las Marca de Tarjeta:', error);
      }
    });
  }

  private loadClaseTarjeta(): void {
    this.TGeneric.getAllByCatalog('t46').subscribe({
      next: (data) => {
        this.arrayClaseTarjeta = data;
      },
      error: (error) => {
        console.error('Error al cargar las Clase de Tarjeta:', error);
      }
    });
  }

  private loadOficina(): void {
    this.TGeneric.getAllByCatalog('t3').subscribe({
      next: (data) => {
        this.arrayOficina = data;
      },
      error: (error) => {
        console.error('Error al cargar las Oficina:', error);
      }
    });
  }

  private loadTipoCredito(): void {
    this.TGeneric.getAllByCatalog('t31').subscribe({
      next: (data) => {
        this.arrayTipoCredito = data;
      },
      error: (error) => {
        console.error('Error al cargar los Tipos de Crédito:', error);
      }
    });
  } 

  private loadEstadoRegistro(): void {
    this.TGeneric.getAllByCatalog('t47').subscribe({
      next: (data) => {
        this.arrayEstadoRegistro = data;
      },
      error: (error) => {
        console.error('Error al cargar los Estados de Registro:', error);
      }
    });
  }

}

