/**
 * COMPONENTE l04 MAIN - DASHBOARD PRINCIPAL
 * Manual de Control de Inversiones - Marzo 2017
 * Superintendencia de Bancos del Ecuador
 */

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { L04ModalFormComponent } from '../../../components/l04/l04-modal-form/l04-modal-form.component'
import { L04FieldsTableComponent } from '../../../components/l04/l04-fields-table/l04-fields-table.component';
import { L04CatalogService } from '../../../services/l04-catalog.service';

@Component({
  selector: 'app-l04-main',
  templateUrl: './l04-main.component.html',
  styleUrls: ['./l04-main.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, L04FieldsTableComponent, L04ModalFormComponent]
})
export class L04MainComponent implements OnInit {
  showModalForm = false;
  loading = false;
  arrayResume: any[] = [];
  constructor(private l04CatalogService: L04CatalogService ) { 
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
    this.l04CatalogService.getResume().subscribe({
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