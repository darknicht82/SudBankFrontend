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
import { environment } from '../../../../environments/environment';

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
    console.log('🔄 L02 - Iniciando carga de datos...');
    console.log('🌐 L02 - Endpoint configurado:', environment.backendEndpoint);
    
    this.l02CatalogService.getResume().subscribe({
      next: (data) => {
        console.log('✅ L02 - Respuesta recibida del servidor:', data);
        console.log('📊 L02 - Tipo de datos:', typeof data);
        console.log('📊 L02 - Es array:', Array.isArray(data));
        console.log('📊 L02 - Cantidad de registros:', data?.length || 0);
        
        if (data && Array.isArray(data) && data.length > 0) {
          console.log('🔍 L02 - Primer registro:', data[0]);
          console.log('🔍 L02 - Estructura del primer registro:', Object.keys(data[0]));
        }
        
        this.arrayResume = data || [];
        console.log('✅ L02 - Datos asignados al arrayResume:', this.arrayResume.length);
      },
      error: (error) => {
        console.error('❌ L02 - Error completo:', error);
        console.error('❌ L02 - Status:', error.status);
        console.error('❌ L02 - Message:', error.message);
        console.error('❌ L02 - URL:', error.url);
        this.arrayResume = [];
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