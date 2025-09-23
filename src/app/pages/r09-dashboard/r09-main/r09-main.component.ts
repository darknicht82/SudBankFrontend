/**
 * COMPONENTE r09 MAIN - DASHBOARD PRINCIPAL
 * Manual de Control de Inversiones - Marzo 2017
 * Superintendencia de Bancos del Ecuador
 */

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { R09ModalFormComponent } from '../../../components/r09/r09-modal-form/r09-modal-form.component'
import { R09FieldsTableComponent } from '../../../components/r09/r09-table/r09-table.component';
import { R09CatalogService } from '../../../services/r09-catalog.service';

@Component({
  selector: 'app-r09-main',
  templateUrl: './r09-main.component.html',
  styleUrls: ['./r09-main.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, R09FieldsTableComponent, R09ModalFormComponent]
})
export class R09MainComponent implements OnInit {
  showModalForm = false;
  loading = false;
  arrayResume: any[] = [];
  constructor(private R09CatalogService: R09CatalogService ) { 
    }

  ngOnInit(): void {
    this.loadResume();
  }

  openModal(): void {
    this.showModalForm = true;
  }

  onModalClosed(): void {
    this.showModalForm = false;
    this.loadResume();
  }

  private loadResume(): void{
    this.R09CatalogService.getResume().subscribe({
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