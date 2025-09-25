/**
 * COMPONENTE R07 MAIN - DASHBOARD PRINCIPAL
 * Manual de Operaciones Activas y Contingentes - Septiembre 2023
 * Superintendencia de Bancos del Ecuador
 */

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { R07ModalFormComponent } from '../../../components/r07/r07-modal-form/r07-modal-form.component'
import { R07CatalogService } from '../../../services/r07-catalog.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-r07-main',
  templateUrl: './r07-main.component.html',
  styleUrls: ['./r07-main.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, R07ModalFormComponent]
})
export class R07MainComponent implements OnInit {
  showModalForm = false;
  loading = false;
  arrayResume: any[] = [];
  constructor(private r07CatalogService: R07CatalogService ) { 
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
    console.log('🔄 R07 - Iniciando carga de datos...');
    console.log('🌐 R07 - Endpoint configurado:', environment.backendEndpoint);
    
    this.r07CatalogService.getResume().subscribe({
      next: (data) => {
        console.log('✅ R07 - Respuesta recibida del servidor:', data);
        console.log('📊 R07 - Tipo de datos:', typeof data);
        console.log('📊 R07 - Es array:', Array.isArray(data));
        console.log('📊 R07 - Cantidad de registros:', data?.length || 0);
        
        if (data && Array.isArray(data) && data.length > 0) {
          console.log('🔍 R07 - Primer registro:', data[0]);
          console.log('🔍 R07 - Estructura del primer registro:', Object.keys(data[0]));
        }
        
        this.arrayResume = data || [];
        console.log('✅ R07 - Datos asignados al arrayResume:', this.arrayResume.length);
      },
      error: (error) => {
        console.error('❌ R07 - Error completo:', error);
        console.error('❌ R07 - Status:', error.status);
        console.error('❌ R07 - Message:', error.message);
        console.error('❌ R07 - URL:', error.url);
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