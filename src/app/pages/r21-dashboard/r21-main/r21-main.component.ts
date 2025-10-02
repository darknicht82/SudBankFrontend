/**
 * COMPONENTE r21 MAIN - DASHBOARD PRINCIPAL
 * Manual Estructuras R2023 - Septiembre 2023
 * Superintendencia de Bancos del Ecuador
 */

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { R21ModalFormComponent } from '../../../components/r21/r21-modal-form/r21-modal-form.component'
import { R21FieldsTableComponent } from '../../../components/r21/r21-table/r21-fields-table/r21-fields-table.component';
import { L01NuevoRegistroNesComponent } from "../../../components/l01/l01-nuevo-registro-nes/l01-nuevo-registro-nes.component";
import { R21CatalogService } from '../../../services/r21-catalog.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-r21-main',
  templateUrl: './r21-main.component.html',
  styleUrls: ['./r21-main.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, R21FieldsTableComponent, R21ModalFormComponent, L01NuevoRegistroNesComponent]
})
export class R21MainComponent implements OnInit {
  showModalForm = false;
  loading = false;
  arrayResume: any[] = [];
  constructor(private r21CatalogService: R21CatalogService ) { 
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
    console.log('🔄 R21 - Iniciando carga de datos...');
    console.log('🌐 R21 - Endpoint configurado:', environment.backendEndpoint);
    
    this.r21CatalogService.getResume().subscribe({
      next: (data) => {
        console.log('✅ R21 - Respuesta recibida del servidor:', data);
        console.log('📊 R21 - Tipo de datos:', typeof data);
        console.log('📊 R21 - Es array:', Array.isArray(data));
        console.log('📊 R21 - Cantidad de registros:', data?.length || 0);
        
        if (data && Array.isArray(data) && data.length > 0) {
          console.log('🔍 R21 - Primer registro:', data[0]);
          console.log('🔍 R21 - Estructura del primer registro:', Object.keys(data[0]));
        }
        
        this.arrayResume = data || [];
        console.log('✅ R21 - Datos asignados al arrayResume:', this.arrayResume.length);
      },
      error: (error) => {
        console.error('❌ R21 - Error completo:', error);
        console.error('❌ R21 - Status:', error.status);
        console.error('❌ R21 - Message:', error.message);
        console.error('❌ R21 - URL:', error.url);
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

  getTotalCapital(): number {
    return this.arrayResume.reduce((total, item) => total + (item.capitalConsumo || 0), 0);
  }

  getTotalCupo(): number {
    return this.arrayResume.reduce((total, item) => total + (item.cupoTarjeta || 0), 0);
  }
}
