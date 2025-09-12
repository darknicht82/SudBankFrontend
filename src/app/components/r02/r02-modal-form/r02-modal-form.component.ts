import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule, Form } from '@angular/forms';
import { T4Service } from '../../../services/t4.service';
import { T33Service } from '../../../services/t33.service';
import { R02CatalogService } from '../../../services/r02-catalog.service';

@Component({
  selector: 'app-r02-modal-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './r02-modal-form.component.html',
  styleUrl: './r02-modal-form.component.scss'
})
export class R02ModalFormComponent implements OnInit{

  @Input() isVisible: boolean = false;
  @Output() modalClosed = new EventEmitter<void>();

  arrayTipoIdentificacion: any[] = [];
  arrayMonedaDenominacion: any[] = [];
  r02Form: FormGroup;
  formSubmitted = false;
  constructor(private fb: FormBuilder, 
    private t4service: T4Service,
    private t33Service: T33Service,
    private R02catalogService: R02CatalogService) {
    this.r02Form = this.fb.group({
      tipoIdentificacion: [null, Validators.required],
      identificacionSujeto: [null, Validators.required],
      numeroOperacion: [null, Validators.required],
      valorOperacion: [null, Validators.required],
      tasaInteresNominal: [null, Validators.required],
      tea: [null, Validators.required],
      codigoMoneda: [null, Validators.required],
      fechaConcesion: [null, Validators.required]
    });
  }



  ngOnInit(): void {
    this.loadTipoIdentificacion();
    this.loadMonedaDenominacion();
  }

  closeModal(): void {
    this.isVisible = false;
    this.modalClosed.emit();
  }

  onSubmit(): void {
    this.formSubmitted = true;

    if (this.r02Form.valid) {
      const formData = this.r02Form.value;
      console.log('📌 Form Data:', formData);
      this.R02catalogService.saveR02(formData);

      this.r02Form.reset();
      this.formSubmitted = false;

      this.isVisible = false;
      this.modalClosed.emit();
    }
  }

  isInvalid(controlName: string){
    const control = this.r02Form.get(controlName);
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

  private loadMonedaDenominacion(): void {
    this.t33Service.getAll().subscribe({
      next: (data) => {
        this.arrayMonedaDenominacion = data;
      },
      error: (error) => {
        console.error('Error al cargar Tipos de Identificación:', error);
      }
    });
  }

}
