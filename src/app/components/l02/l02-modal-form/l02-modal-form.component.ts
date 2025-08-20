import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-l02-modal-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule],
  templateUrl: './l02-modal-form.component.html',
  styleUrl: './l02-modal-form.component.scss'
})
export class L02ModalFormComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Output() modalClosed = new EventEmitter<void>();

  constructor() {}
   ngOnInit(): void {
    console.log('logging');
    console.log('isVisible: ', this.isVisible);
  }

  closeModal(): void {
    this.isVisible = false;
    this.modalClosed.emit();
  }
}
