/**
 * COMPONENTE l02 MAIN - DASHBOARD PRINCIPAL
 * Manual de Control de Inversiones - Marzo 2017
 * Superintendencia de Bancos del Ecuador
 */

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { L02ModalFormComponent } from '../../../components/l02/l02-modal-form/l02-modal-form.component'
import { L02FieldsTableComponent } from '../../../components/l02/l02-table/l02-fields-table/l02-fields-table.component';
import { L01NuevoRegistroNesComponent } from "../../../components/l01/l01-nuevo-registro-nes/l01-nuevo-registro-nes.component";
import { L02CatalogService } from '../../../services/l02-catalog.service';

@Component({
  selector: 'app-l02-main',
  templateUrl: './l02-main.component.html',
  styleUrls: ['./l02-main.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, L02FieldsTableComponent, L02ModalFormComponent, L01NuevoRegistroNesComponent]
})
export class L02MainComponent implements OnInit {
  showModalForm = false;
  loading = false;
  arrayResume: any[] = [];
  constructor(private l02CatalogService: L02CatalogService ) { 
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
    this.l02CatalogService.getResume().subscribe({
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