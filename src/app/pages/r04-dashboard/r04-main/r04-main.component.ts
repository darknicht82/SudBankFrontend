/**
 * COMPONENTE R04 MAIN - DASHBOARD PRINCIPAL
 * Manual de Control de Inversiones - Marzo 2017
 * Superintendencia de Bancos del Ecuador
 */

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { R04ModalFormComponent } from '../../../components/r04/r04-modal-form/r04-modal-form.component'
import { R04FieldsTableComponent } from '../../../components/r04/r04-table/r04-table.component';
import { R04CatalogService } from '../../../services/r04-catalog.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-r04-main',
  templateUrl: './r04-main.component.html',
  styleUrls: ['./r04-main.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, R04FieldsTableComponent, R04ModalFormComponent]
})
export class R04MainComponent implements OnInit {
  showModalForm = false;
  loading = false;
  arrayResume: any[] = [];
  constructor(private r04CatalogService: R04CatalogService) {
  }

  ngOnInit(): void {
    this.loadResume();
  }

  // En r04-main.component.ts
  openModal(): void {
    console.log('🔍 R04 - Abriendo modal...');
    this.showModalForm = true;
    console.log('🔍 R04 - showModalForm:', this.showModalForm);
  }

  onModalClosed(): void {
    console.log('🔍 R04 - Cerrando modal...');
    this.showModalForm = false;
    // Remover loadResume() para evitar recargas innecesarias
    // this.loadResume();
  }

  private loadResume(): void {
    console.log('🔄 R04 - Iniciando carga de datos...');
    console.log('🌐 R04 - Endpoint configurado:', environment.backendEndpoint);

    this.r04CatalogService.getResume().subscribe({
      next: (data) => {
        console.log('✅ R04 - Respuesta recibida del servidor:', data);
        console.log('📊 R04 - Tipo de datos:', typeof data);
        console.log('📊 R04 - Es array:', Array.isArray(data));
        console.log('📊 R04 - Cantidad de registros:', data?.length || 0);

        if (data && Array.isArray(data) && data.length > 0) {
          console.log('🔍 R04 - Primer registro:', data[0]);
          console.log('🔍 R04 - Estructura del primer registro:', Object.keys(data[0]));
        }

        this.arrayResume = data || [];
        console.log('✅ R04 - Datos asignados al arrayResume:', this.arrayResume.length);
      },
      error: (error) => {
        console.error('❌ R04 - Error completo:', error);
        console.error('❌ R04 - Status:', error.status);
        console.error('❌ R04 - Message:', error.message);
        console.error('❌ R04 - URL:', error.url);
        this.arrayResume = [];
      }
    });
  }

  validateAndGenerateReport(): void {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

  exportToTxt(): void { }
}