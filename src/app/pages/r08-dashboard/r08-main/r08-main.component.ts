/**
 * COMPONENTE r08 MAIN - DASHBOARD PRINCIPAL
 * Manual de Control de Inversiones - Marzo 2017
 * Superintendencia de Bancos del Ecuador
 */

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { R08ModalFormComponent } from '../../../components/r08/r08-modal-form/r08-modal-form.component'
import { R08FieldsTableComponent } from '../../../components/r08/r08-table/r08-table.component';
import { R08CatalogService } from '../../../services/r08-catalog.service';

@Component({
  selector: 'app-r08-main',
  templateUrl: './r08-main.component.html',
  styleUrls: ['./r08-main.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, R08FieldsTableComponent, R08ModalFormComponent]
})
export class R08MainComponent implements OnInit {
  showModalForm = false;
  loading = false;
  arrayResume: any[] = [];
  constructor(private R08CatalogService: R08CatalogService ) { 
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
    this.R08CatalogService.getResume().subscribe({
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