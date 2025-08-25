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
  constructor() { 
    }

  ngOnInit(): void {
  }

  openModal(): void {
    this.showModalForm = true;
    console.log('showModalForm: ', this.showModalForm);
  }

   onModalClosed(): void {
    this.showModalForm = false;
    console.log('showModalForm: ', this.showModalForm);
  }

  validateAndGenerateReport(): void{
    this.loading = true;
    setTimeout(() => {
        this.loading = false;
      }, 2000);
  }

  exportToTxt(): void{}
  
}