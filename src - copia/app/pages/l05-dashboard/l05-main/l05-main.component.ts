/**
 * COMPONENTE l05 MAIN - DASHBOARD PRINCIPAL
 * Manual de Control de Inversiones - Marzo 2017
 * Superintendencia de Bancos del Ecuador
 */

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { L05CatalogService } from '../../../services/l05-catalog.service';
import { L05ModalFormComponent } from '../../../components/l05/l05-modal-form/l05-modal-form.component';
import { L05FieldsTableComponent } from '../../../components/l05/l05-table/l05-table.component';

@Component({
  selector: 'app-l05-main',
  templateUrl: './l05-main.component.html',
  styleUrls: ['./l05-main.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, L05FieldsTableComponent, L05ModalFormComponent]
})
export class L05MainComponent implements OnInit {
  showModalForm = false;
  loading = false;
  arrayResume: any[] = [];
  constructor(private l05CatalogService: L05CatalogService ) { 
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
    this.l05CatalogService.getResume().subscribe({
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