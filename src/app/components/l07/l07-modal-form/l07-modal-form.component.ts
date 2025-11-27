import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { T4Service } from '../../../services/t4.service';
import { T73Service } from '../../../services/t73.service';
import { GenericCatalogService } from '../../../services/catalogs/generic-catalog.service';
import { L07CatalogService } from '../../../services/l07-catalog.service';


@Component({
  selector: 'app-l07-modal-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './l07-modal-form.component.html',
  styleUrl: './l07-modal-form.component.scss'
})
export class L07ModalFormComponent implements OnInit{
  @Input() isVisible: boolean = false;
  @Output() modalClosed = new EventEmitter<void>();

  arrayTipoIdentificacionEmisor: any[] = [];
  arrayNacionalidadEmisor: any[] = [];
  arrayTipoEmisor: any[] = [];

  l07Form: FormGroup;
  formSubitted = false;

  constructor(private fb: FormBuilder,
    private t4service: T4Service,
    private t73service: T73Service,
    private t9Service: GenericCatalogService,
    private l07catalogService: L07CatalogService
  ){
    this.l07Form = this.fb.group({
      tipoIdentificacionEmisor: [null, Validators.required],
      identificacionEmisor: [null, Validators.required],
      nacionalidadEmisor: [null, Validators.required],
      tipoEmisor: [null, Validators.required] 
    });
  }

  ngOnInit(): void {
    this.loadTipoIdentificacionEmisor();
    this.loadNacionalidadEmisor();
    this.loadTipoEmisor();
  }

  closeModal(): void {
    this.isVisible = false;
    this.modalClosed.emit();
  }

  onSumbit(): void {
    this.formSubitted = true;

    if(this.l07Form.valid){
      const formData = this.l07Form.value;
      console.log('📌 Form Data:', formData);
      this.l07catalogService.saveL07(formData);

      this.l07Form.reset();
      this.formSubitted = false;

      this.isVisible = false;
      this.modalClosed.emit();
    }
  }

  isInvalid(controlName: string) {
    const control = this.l07Form.get(controlName);
    return control?.invalid && (control?.touched || this.formSubitted);
  }

  private loadTipoIdentificacionEmisor(): void {
    this.t4service.getAll().subscribe({
      next: (data) => {
        this.arrayTipoIdentificacionEmisor = data;
      },
      error: (error) => {
        console.error('Error al cargar Tipos de Identificación:', error);
      }
    });
  }


  private loadNacionalidadEmisor(): void {
    this.t9Service.getAllByCatalog('t9').subscribe({
      next: (data) => {
        this.arrayNacionalidadEmisor = data;
      },
      error: (error) => {
        console.error('Error al cargar Nacionalidades Emisor:', error);
      }
    });
  }

  private loadTipoEmisor(): void {
    this.t73service.getAll().subscribe({
      next: (data) => {
        this.arrayTipoEmisor = data;
      },
      error: (error) => {
        console.error('Error al cargar Tipos de Emisor:', error);
      }
    });
  }

}
