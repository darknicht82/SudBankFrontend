/**
 * COMPONENTE r07 MAIN - DASHBOARD PRINCIPAL
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
  
  // Properties for template calculations
  Math = Math;
  sum = (arr: any[], field: string) => arr.reduce((acc, item) => acc + (item[field] || 0), 0);
  
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
        console.log('📊 R07 - Longitud:', data?.length);
        
        this.arrayResume = data || [];
        this.loading = false;
        
        console.log('✅ R07 - Datos procesados y asignados:', this.arrayResume);
      },
      error: (error) => {
        console.error('❌ R07 - Error al cargar datos:', error);
        this.loading = false;
        this.arrayResume = [];
      }
    });
  }

  onSaveSuccess(data: any): void {
    console.log('Datos guardados:', data);
    if (data.id && data.id > 0) {
      // Actualizar registro existente
      this.r07CatalogService.updateR07(data.id, data).subscribe({
        next: (response) => {
          console.log('Registro actualizado:', response);
          this.loadResume();
        },
        error: (error) => {
          console.error('Error al actualizar registro:', error);
        }
      });
    } else {
      // Crear nuevo registro
      this.r07CatalogService.createR07(data).subscribe({
        next: (response) => {
          console.log('Registro creado:', response);
          this.loadResume();
        },
        error: (error) => {
          console.error('Error al crear registro:', error);
        }
      });
    }
  }

  validateAndGenerateReport(): void {
    console.log('Validando y generando reporte R07...');
    // Lógica para validar y generar el reporte
  }

  exportToTxt(): void {
    console.log('Exportando a TXT...');
    // Lógica para exportar a TXT
  }

  // Helper methods for template calculations
  getUniqueTipoGarantias(): number {
    return new Set(this.arrayResume.map(item => item.tipoGarantia?.descripcion)).size;
  }

  getGarantiasActivas(): number {
    return this.arrayResume.filter(item => item.estadoRegistro?.descripcion === 'Activo').length;
  }

  getValorTotalAvaluo(): number {
    return this.arrayResume.reduce((sum, item) => sum + (item.valorAvaluoTitulo || 0), 0);
  }
}