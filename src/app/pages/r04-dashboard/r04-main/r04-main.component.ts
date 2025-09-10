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
import { T4Service } from '../../../services/t4.service';
import { T29Service } from '../../../services/t29.service';
import { T35Service } from '../../../services/t35.service';
import { T55Service } from '../../../services/t55.service';
import { T218Service } from '../../../services/t218.service';
import { T317Service } from '../../../services/t317.service';
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
  
  // Catálogos para traducción
  tabla4: any[] = [];
  tabla29: any[] = [];
  tabla35: any[] = [];
  tabla55: any[] = [];
  tabla218: any[] = [];
  tabla317: any[] = [];
  
  constructor(
    private r04CatalogService: R04CatalogService,
    private t4Service: T4Service,
    private t29Service: T29Service,
    private t35Service: T35Service,
    private t55Service: T55Service,
    private t218Service: T218Service,
    private t317Service: T317Service
  ) {
  }

  ngOnInit(): void {
    this.loadCatalogs();
    this.loadResume();
  }

  private loadCatalogs(): void {
    // Cargar T4 (Tipo de identificación)
    this.t4Service.getAll().subscribe({
      next: (data) => this.tabla4 = data,
      error: (error) => console.error('❌ Error cargando T4:', error)
    });

    // Cargar T29 (Calificación)
    this.t29Service.getAllT29().subscribe({
      next: (data) => this.tabla29 = data,
      error: (error) => console.error('❌ Error cargando T29:', error)
    });

    // Cargar T35 (Tipo de operación)
    this.t35Service.getAllT35().subscribe({
      next: (data) => this.tabla35 = data,
      error: (error) => console.error('❌ Error cargando T35:', error)
    });

    // Cargar T55 (Objeto fideicomiso)
    this.t55Service.getAllT55().subscribe({
      next: (data) => this.tabla55 = data,
      error: (error) => console.error('❌ Error cargando T55:', error)
    });

    // Cargar T218 (Metodología calificación)
    this.t218Service.getAllT218().subscribe({
      next: (data) => this.tabla218 = data,
      error: (error) => console.error('❌ Error cargando T218:', error)
    });

    // Cargar T317 (Tipo de sistema de amortización)
    this.t317Service.getAll().subscribe({
      next: (data) => this.tabla317 = data,
      error: (error) => console.error('❌ Error cargando T317:', error)
    });
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

  // Métodos de traducción
  getTipoIdentificacionDesc(codigo: string): string {
    const item = this.tabla4.find(t => t.codigo === codigo);
    return item ? item.descripcion : codigo;
  }

  getCalificacionDesc(codigo: string): string {
    const item = this.tabla29.find(t => t.codigo === codigo);
    return item ? item.descripcion : codigo;
  }

  getTipoOperacionDesc(codigo: string): string {
    const item = this.tabla35.find(t => t.codigo === codigo);
    return item ? item.descripcion : codigo;
  }

  getObjetoFideicomisoDesc(codigo: string): string {
    const item = this.tabla55.find(t => t.codigo === codigo);
    return item ? item.descripcion : codigo;
  }

  getMetodologiaCalificacionDesc(codigo: string): string {
    const item = this.tabla218.find(t => t.codigo === codigo);
    return item ? item.descripcion : codigo;
  }

  getTipoSistemaAmortizacionDesc(codigo: string): string {
    const item = this.tabla317.find(t => t.codigo === codigo);
    return item ? item.descripcion : codigo;
  }

  // Métodos de resumen
  getTotalRegistros(): number {
    return this.arrayResume.length;
  }

  getFechaGeneracion(): string {
    return new Date().toLocaleDateString();
  }

  getTotalEmisores(): number {
    const emisoresUnicos = new Set(this.arrayResume.map(item => item.identificacionSujeto));
    return emisoresUnicos.size;
  }
}