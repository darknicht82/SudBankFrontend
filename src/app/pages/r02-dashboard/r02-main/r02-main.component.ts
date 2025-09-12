/**
 * COMPONENTE r02 MAIN - DASHBOARD PRINCIPAL
 * Manual de Control de Inversiones - Marzo 2017
 * Superintendencia de Bancos del Ecuador
 */

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { R02ModalFormComponent } from '../../../components/r02/r02-modal-form/r02-modal-form.component'
import { R02FieldsTableComponent } from '../../../components/r02/r02-table/r02-table.component';
import { R02CatalogService } from '../../../services/r02-catalog.service';

@Component({
  selector: 'app-r02-main',
  templateUrl: './r02-main.component.html',
  styleUrls: ['./r02-main.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, R02FieldsTableComponent, R02ModalFormComponent]
})
export class R02MainComponent implements OnInit {
  showModalForm = false;
  loading = false;
  arrayResume: any[] = [];
  constructor(private R02CatalogService: R02CatalogService ) { 
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
    this.R02CatalogService.getResume().subscribe({
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