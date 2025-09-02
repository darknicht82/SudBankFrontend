/**
 * COMPONENTE L01 MAIN - DASHBOARD PRINCIPAL
 * Manual de Control de Inversiones - Marzo 2017
 * Superintendencia de Bancos del Ecuador
 * 
 * COMPONENTE SIMPLIFICADO SIGUIENDO EL PATRÓN L02
 */

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { L01NuevoRegistroNesComponent } from '../../../components/l01/l01-nuevo-registro-nes/l01-nuevo-registro-nes.component';
import { L01NuevoEmisorComponent } from '../../../components/l01/l01-nuevo-emisor/l01-nuevo-emisor.component';
import { L01CatalogService, L01Resume } from '../../../services/l01-catalog.service';
import { L01Service, L01Record } from '../../../services/l01/l01.service';
import { T4Service } from '../../../services/t4.service';
import { T73Service } from '../../../services/t73.service';
import { T173Service } from '../../../services/t173.service';
import { T164Service } from '../../../services/t164.service';

@Component({
  selector: 'app-l01-main',
  templateUrl: './l01-main.component.html',
  styleUrls: ['./l01-main.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, L01NuevoRegistroNesComponent, L01NuevoEmisorComponent]
})
export class L01MainComponent implements OnInit {
  // ========================================
  // PROPIEDADES BÁSICAS DEL COMPONENTE
  // ========================================
  
  showModalForm = false;
  showEmitterModal = false;
  loading = false;
  arrayResume: L01Resume[] = [];
  
  // Filtros para el grid
  tipoIdentificacion = '';
  clasificacion = '';
  tipoEmisor = '';
  
  // Propiedades para manejo de errores y estado
  error = '';
  registrosFiltrados = 0;
  
  // Propiedades para tooltips
  showTooltip = false;
  currentTooltip: any = null;
  tooltipPosition = { x: 0, y: 0 };
  
  // Catálogos para traducción
  tabla4: any[] = [];
  tabla73: any[] = [];
  tabla173: any[] = [];
  tabla164: any[] = [];
  
  // Columnas de la tabla según especificación oficial L01
  displayedColumns: string[] = [
    'tipoIdentificacion',    // Campo 1: Tipo de identificación (R/X) - Tabla 4
    'identificacion',        // Campo 2: Identificación (RUC o código extranjero) - Tabla 164
    'clasificacion',         // Campo 3: Clasificación (1-4) - Tabla 173
    'tipoEmisor'             // Campo 4: Tipo de emisor (sectores económicos) - Tabla 73
  ];

  // ========================================
  // CONSTRUCTOR E INICIALIZACIÓN
  // ========================================

  constructor(
    private l01CatalogService: L01CatalogService,
    private l01Service: L01Service,
    private t4Service: T4Service,
    private t73Service: T73Service,
    private t173Service: T173Service,
    private t164Service: T164Service
  ) { }

  ngOnInit(): void {
    this.loadCatalogs();
    this.loadResume();
  }

  // ========================================
  // CARGA DE CATÁLOGOS
  // ========================================

  /**
   * Cargar catálogos necesarios para traducción
   */
  private loadCatalogs(): void {
    // Cargar Tabla 4 - Tipos de Identificación
    this.t4Service.getAll().subscribe({
      next: (data) => {
        this.tabla4 = data;
        console.log('✅ Tabla 4 cargada:', this.tabla4.length, 'registros');
      },
      error: (error) => {
        console.error('❌ Error al cargar Tabla 4:', error);
      }
    });

    // Cargar Tabla 173 - Clasificaciones
    this.t173Service.getAll().subscribe({
      next: (data) => {
        this.tabla173 = data;
        console.log('✅ Tabla 173 cargada:', this.tabla173.length, 'registros');
      },
      error: (error) => {
        console.error('❌ Error al cargar Tabla 173:', error);
      }
    });

    // Cargar Tabla 73 - Tipos de Emisor
    this.t73Service.getAll().subscribe({
      next: (data) => {
        this.tabla73 = data;
        console.log('✅ Tabla 73 cargada:', this.tabla73.length, 'registros');
      },
      error: (error) => {
        console.error('❌ Error al cargar Tabla 73:', error);
      }
    });

    // Cargar Tabla 164 - Emisores/Custodios
    this.t164Service.getAll().subscribe({
      next: (data) => {
        this.tabla164 = data;
        console.log('✅ Tabla 164 cargada:', this.tabla164.length, 'registros');
      },
      error: (error) => {
        console.error('❌ Error al cargar Tabla 164:', error);
      }
    });
  }

  // ========================================
  // CARGA DE DATOS
  // ========================================

  /**
   * Cargar resumen de datos L01 normalizado como L02
   */
  private loadResume(): void {
    this.loading = true;
    
    this.l01CatalogService.getResume().subscribe({
      next: (data) => {
        this.arrayResume = data;
        this.loading = false;
        console.log('✅ L01 - Datos cargados exitosamente:', data.length);
        console.log('🔍 L01 - Estructura de datos recibida:', data[0]);
        console.log('🔍 L01 - Todos los datos:', data);
      },
      error: (error) => {
        console.error('❌ L01 - Error al cargar datos:', error);
        this.loading = false;
        this.arrayResume = [];
      }
    });
  }

  // ========================================
  // MANEJO DE MODALES
  // ========================================

  openModal(): void {
    this.showModalForm = true;
  }

  onModalClosed(): void {
    this.showModalForm = false;
    this.loadResume();
  }



  showAddEmitterModal(): void {
    this.showEmitterModal = true;
  }

  onEmitterAdded(event: any): void {
    this.showEmitterModal = false;
    this.loadResume();
  }

  // ========================================
  // ACCIONES DEL REPORTE
  // ========================================

  validateAndGenerateReport(): void {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

  exportToTxt(): void {
    // Implementar exportación a TXT
  }

  // ========================================
  // FILTROS Y UTILIDADES
  // ========================================

  getTotalRegistros(): number {
    return this.arrayResume.length;
  }

  getFechaGeneracion(): string {
    return new Date().toLocaleDateString('es-ES');
  }

  getCountByClasificacion(clasificacion: number): number {
    return this.arrayResume.filter(item => item.codigoClasificacionEmisor === clasificacion).length;
  }

  getTipoIdentificacionDesc(tipoIdentificacion: any): string {
    if (!tipoIdentificacion) return 'Desconocido';
    
    // Si es un objeto con descripcion
    if (typeof tipoIdentificacion === 'object' && tipoIdentificacion.descripcion) {
      return tipoIdentificacion.descripcion;
    }
    
    // Si es un número (ID) - caso más común según los datos reales
    if (typeof tipoIdentificacion === 'number') {
      const item = this.tabla4.find(t => t.id === tipoIdentificacion);
      return item ? item.descripcion : `ID: ${tipoIdentificacion}`;
    }
    
    // Si es un string (código)
    if (typeof tipoIdentificacion === 'string') {
      const item = this.tabla4.find(t => t.codigo === tipoIdentificacion);
      return item ? item.descripcion : tipoIdentificacion;
    }
    
    // Si es un objeto con código
    if (typeof tipoIdentificacion === 'object' && tipoIdentificacion.codigo) {
      const item = this.tabla4.find(t => t.codigo === tipoIdentificacion.codigo);
      return item ? item.descripcion : tipoIdentificacion.codigo;
    }
    
    return 'Desconocido';
  }

  getClasificacionDesc(clasificacion: any): string {
    if (!clasificacion) return 'Desconocido';
    
    // Si es un objeto con descripcion
    if (typeof clasificacion === 'object' && clasificacion.descripcion) {
      return clasificacion.descripcion;
    }
    
    // Si es un número (ID) - caso más común según los datos reales
    if (typeof clasificacion === 'number') {
      const item = this.tabla173.find(t => t.id === clasificacion);
      return item ? item.descripcion : `ID: ${clasificacion}`;
    }
    
    // Si es un string (código)
    if (typeof clasificacion === 'string') {
      const item = this.tabla173.find(t => t.codigo === clasificacion);
      return item ? item.descripcion : clasificacion;
    }
    
    // Si es un objeto con código
    if (typeof clasificacion === 'object' && clasificacion.codigo) {
      const item = this.tabla173.find(t => t.codigo === clasificacion.codigo);
      return item ? item.descripcion : clasificacion.codigo;
    }
    
    return 'Desconocido';
  }

  getTipoEmisorDesc(tipoEmisor: any): string {
    if (!tipoEmisor) return 'Desconocido';
    
    // Si es un objeto con descripcion
    if (typeof tipoEmisor === 'object' && tipoEmisor.descripcion) {
      return tipoEmisor.descripcion;
    }
    
    // Si es un número (ID) - caso más común según los datos reales
    if (typeof tipoEmisor === 'number') {
      const item = this.tabla73.find(t => t.id === tipoEmisor);
      return item ? item.descripcion : `ID: ${tipoEmisor}`;
    }
    
    // Si es un string (código)
    if (typeof tipoEmisor === 'string') {
      const item = this.tabla73.find(t => t.codigo === tipoEmisor);
      return item ? item.descripcion : tipoEmisor;
    }
    
    // Si es un objeto con código
    if (typeof tipoEmisor === 'object' && tipoEmisor.codigo) {
      const item = this.tabla73.find(t => t.codigo === tipoEmisor.codigo);
      return item ? item.descripcion : tipoEmisor.codigo;
    }
    
    return 'Desconocido';
  }

  /**
   * Obtener descripción de identificación desde Tabla 164
   * @param codigoEmisor ID del emisor en Tabla 164
   * @returns Descripción del emisor o el código si no se encuentra
   */
  getIdentificacionDesc(codigoEmisor: any): string {
    if (!codigoEmisor) return 'Desconocido';
    
    // Si es un objeto con descripcion
    if (typeof codigoEmisor === 'object' && codigoEmisor.descripcion) {
      return codigoEmisor.descripcion;
    }
    
    // Si es un número (ID) - caso más común según los datos reales
    if (typeof codigoEmisor === 'number') {
      const item = this.tabla164.find(t => t.id === codigoEmisor);
      return item ? item.descripcion : `ID: ${codigoEmisor}`;
    }
    
    // Si es un string (código)
    if (typeof codigoEmisor === 'string') {
      const item = this.tabla164.find(t => t.codigo === codigoEmisor);
      return item ? item.descripcion : codigoEmisor;
    }
    
    // Si es un objeto con código
    if (typeof codigoEmisor === 'object' && codigoEmisor.codigo) {
      const item = this.tabla164.find(t => t.codigo === codigoEmisor.codigo);
      return item ? item.descripcion : codigoEmisor.codigo;
    }
    
    return 'Desconocido';
  }

  // Métodos para tooltips (implementación básica)
  showFieldTooltip(column: string, event: MouseEvent): void {
    this.tooltipPosition = { x: event.clientX, y: event.clientY };
    this.currentTooltip = { title: column, description: `Descripción de ${column}` };
    this.showTooltip = true;
  }

  hideTooltip(): void {
    this.showTooltip = false;
    this.currentTooltip = null;
  }

  getColumnTitle(column: string): string {
    const titles: { [key: string]: string } = {
      'tipoIdentificacion': 'Tipo de Identificación',
      'identificacion': 'Identificación',
      'clasificacion': 'Clasificación',
      'tipoEmisor': 'Tipo de Emisor'
    };
    return titles[column] || column;
  }
}
