import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatGridListModule } from '@angular/material/grid-list';

import { SelectModule } from 'primeng/select';
import { MessageModule } from 'primeng/message';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { L02CatalogService } from '../../../services/l02-catalog.service';

@Component({
  selector: 'app-l02-modal-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,
    SelectModule,MessageModule,
    MatGridListModule ],
  templateUrl: './l02-modal-form.component.html',
  styleUrl: './l02-modal-form.component.scss'
})
export class L02ModalFormComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Output() modalClosed = new EventEmitter<void>();

  arrayTipoIdentificacion: any[] = [];
  selectedValueTipoIdentificacion: string | undefined;
  l02Form: FormGroup;
  formSubmitted = false;

  constructor(private fb: FormBuilder, private catalogService: L02CatalogService) {
    this.l02Form = this.fb.group({
      tipoIdentificacion: ['', Validators.required],
    });
    this.loadTipoIdentificacion();
  }
   ngOnInit(): void {
    
  }

  closeModal(): void {
    this.isVisible = false;
    this.modalClosed.emit();
  }

  onSubmit(): void{
    this.formSubmitted = true;
        if (this.l02Form.valid) {
            //this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Form is submitted', life: 3000 });
            this.l02Form.reset();
            this.formSubmitted = false;
        }
  }

  isInvalid(controlName: string){
    const control = this.l02Form.get(controlName);
    return control?.invalid && (control.touched || this.formSubmitted);
  }

  private loadTipoIdentificacion(): void{
    this.catalogService.getTabla4().subscribe({
      next: (data) => {
        this.arrayTipoIdentificacion = data;
      },
      error: (error) => {
        console.error('Error al cargar Tipos de Identificación:', error);
      }
    });
  }
}
