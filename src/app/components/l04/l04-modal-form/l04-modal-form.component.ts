import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { T4Service } from '../../../services/t4.service';
import { T164Service } from '../../../services/t164.service';
import { T165Service } from '../../../services/t165.service';
import { T166Service } from '../../../services/t166.service';
import { T167Service } from '../../../services/t167.service';
import { T168Service } from '../../../services/t168.service';
import { T33Service } from '../../../services/t33.service';
import { T64Service } from '../../../services/t64.service';
import { T62AService } from '../../../services/t62A.service';
import { L04CatalogService } from '../../../services/l04-catalog.service';
import { GenericCatalogService } from '../../../services/catalogs/generic-catalog.service';

@Component({
  selector: 'app-l04-modal-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './l04-modal-form.component.html',
  styleUrl: './l04-modal-form.component.scss'
})
export class L04ModalFormComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Output() modalClosed = new EventEmitter<void>();

  arrayTipoIdentificacion: any[] = [];
  arrayIdentificacionEmisor: any[] = [];
  arrayMotivoTransferencia: any[] = [];

  l04Form: FormGroup;
  formSubmitted = false;

  constructor(private fb: FormBuilder, 
    private t164service: T164Service,
    private t4service: T4Service,
    private l04catalogService: L04CatalogService,
    private genericCatalogService: GenericCatalogService
  ) {
    this.l04Form = this.fb.group({
      tipoIdentificacion: [null, Validators.required],
      identificacionEmisor: [null, Validators.required],
      numeroTitulo: [null, Validators.required],
      fechaEmision: [null, Validators.required],
      fechaCompra: [null, Validators.required],
      cuentaOrigen: [null, Validators.required],
      cuentaDestino: [null, Validators.required],
      valorLibrosCuentaOrigen: [null, Validators.required],
      valorLibrosCuentaDestino: [null, Validators.required],
      fechaTransferencia: [null, Validators.required],
      motivoTransferencia: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadTipoIdentificacion();
    this.loadIdentificacionEmisor();
    this.loadMotivoTransferencia();
  }

  closeModal(): void {
    this.isVisible = false;
    this.modalClosed.emit();
  }

  onSubmit(): void {
    this.formSubmitted = true;

    if (this.l04Form.valid) {
      const formData = this.l04Form.value;
      console.log('📌 Form Data:', formData);
      this.l04catalogService.saveL04(formData);

      this.l04Form.reset();
      this.formSubmitted = false;

      this.isVisible = false;
      this.modalClosed.emit();
    }
  }

  isInvalid(controlName: string) {
    const control = this.l04Form.get(controlName);
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

  private loadIdentificacionEmisor(): void {
    this.t164service.getAll().subscribe({
      next: (data) => {
        this.arrayIdentificacionEmisor = data;
      },
      error: (error) => {
        console.error('Error al cargar Tipos de Identificación:', error);
      }
    });
  }

  private loadMotivoTransferencia(): void {
    this.genericCatalogService.getAllByCatalog("t170").subscribe({
      next: (data) => {
        this.arrayMotivoTransferencia = data;
      },
      error: (error) => {
        console.error('Error al cargar Tipos de Identificación:', error);
      }
    });
  }

  
}