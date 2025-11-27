/**
 * COMPONENTE l05 MAIN - DASHBOARD PRINCIPAL
 * Manual de Control de Inversiones - Marzo 2017
 * Superintendencia de Bancos del Ecuador
 */

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { L07CatalogService } from '../../../services/l07-catalog.service';
import { L07ModalFormComponent } from '../../../components/l07/l07-modal-form/l07-modal-form.component';
import { L07FieldsTableComponent } from '../../../components/l07/l07-table/l07-table.component';

@Component({
  selector: 'app-l07-main',
  templateUrl: './l07-main.component.html',
  styleUrls: ['./l07-main.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, L07FieldsTableComponent, L07ModalFormComponent]
})
export class L07MainComponent implements OnInit {
  showModalForm = false;
  loading = false;
  arrayResume: any[] = [];
  constructor(private l07CatalogService: L07CatalogService ) { 
    }

  ngOnInit(): void {
    this.loadResume();
  }

  openModal(): void {
    this.showModalForm = true;
    console.log('this.showModalForm: ',this.showModalForm);
  }

  onModalClosed(): void {
    this.showModalForm = false;
    this.loadResume();
  }

  private loadResume(): void{
    this.l07CatalogService.getResume().subscribe({
      next: (data) => {
        this.arrayResume = data;
      },
      error: (error) => {
        console.error('Error al cargar Resumen:', error);
      }
    });
  }

  validateAndGenerateReport(): void{
    this.loading = true;
    setTimeout(() => {
        this.loading = false;
      }, 2000);
  }

  exportToTxt(): void{}
}