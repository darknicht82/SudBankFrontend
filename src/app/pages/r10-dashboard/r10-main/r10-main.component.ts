/**
 * COMPONENTE r10 MAIN - DASHBOARD PRINCIPAL
 * Manual de Control de Inversiones - Marzo 2017
 * Superintendencia de Bancos del Ecuador
 */

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { R10ModalFormComponent } from '../../../components/r10/r10-modal-form/r10-modal-form.component'
import { R10FieldsTableComponent } from '../../../components/r10/r10-table/r10-table.component';
import { R10CatalogService } from '../../../services/r10-catalog.service';

@Component({
  selector: 'app-r10-main',
  templateUrl: './r10-main.component.html',
  styleUrls: ['./r10-main.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, R10FieldsTableComponent, R10ModalFormComponent]
})
export class R10MainComponent implements OnInit {
  showModalForm = false;
  loading = false;
  arrayResume: any[] = [];
  constructor(private R10CatalogService: R10CatalogService ) { 
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
    this.R10CatalogService.getResume().subscribe({
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