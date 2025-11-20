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
import { L01FieldsTableComponent } from '../../../components/l01/l01-fields-table/l01-fields-table.component';
import { FilterRow, L01CatalogService, L01Resume } from '../../../services/l01-catalog.service';
import { L01Service, L01Record } from '../../../services/l01/l01.service';
import { T4Service } from '../../../services/t4.service';
import { T73Service } from '../../../services/t73.service';
import { T173Service } from '../../../services/t173.service';
import { T164Service } from '../../../services/t164.service';
import { environment } from '../../../../environments/environment';
import { FilterComponent } from '../../../shared/filter/filter.component';




@Component({
  selector: 'app-l01-main',
  templateUrl: './l01-main.component.html',
  styleUrls: ['./l01-main.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, L01NuevoRegistroNesComponent, L01NuevoEmisorComponent, L01FieldsTableComponent, FilterComponent]
})
export class L01MainComponent implements OnInit {
  // ========================================
  // PROPIEDADES BÁSICAS DEL COMPONENTE
  // ========================================

  showModalForm = false;
  showEmitterModal = false;
  loading = false;
  arrayResume: L01Resume[] = [];
  filteredL01: FilterRow[] = [];

  // Filtros para el grid
  tipoIdentificacion = '';
  clasificacion = '';
  tipoEmisor = '';

  seeFilterTable: boolean = false;

  // Propiedades para manejo de errores y estado
  error = '';
  registrosFiltrados = 0;



  // Catálogos para traducción
  tabla4: any[] = [];
  tabla73: any[] = [];
  tabla173: any[] = [];
  tabla164: any[] = [];


  filterData: any[] = [];

  displayedColumnsfilter: string[] = [
    'tipoIdentificacion',
    'identificacion',
    'clasificacion',
    'tipoEmisor'
  ];
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
    console.log('🔄 L01 - Iniciando carga de datos...');
    console.log('🌐 L01 - Endpoint configurado:', environment.backendEndpoint);

    this.l01CatalogService.getResume().subscribe({
      next: (data) => {
        console.log('✅ L01 - Respuesta recibida del servidor:', data);
        console.log('📊 L01 - Tipo de datos:', typeof data);
        console.log('📊 L01 - Es array:', Array.isArray(data));
        console.log('📊 L01 - Cantidad de registros:', data?.length || 0);

        if (data && Array.isArray(data) && data.length > 0) {
          console.log('🔍 L01 - Primer registro:', data[0]);
          console.log('🔍 L01 - Estructura del primer registro:', Object.keys(data[0]));
        }

        this.arrayResume = data || [];
        this.loading = false;
        console.log('✅ L01 - Datos asignados al arrayResume:', this.arrayResume.length);
      },
      error: (error) => {
        console.error('❌ L01 - Error completo:', error);
        console.error('❌ L01 - Status:', error.status);
        console.error('❌ L01 - Message:', error.message);
        console.error('❌ L01 - URL:', error.url);
        this.loading = false;
        this.arrayResume = [];
        this.error = `Error al cargar datos: ${error.message || error.statusText || 'Error desconocido'}`;
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
    console.log('tipoIdentificacion recibido:', tipoIdentificacion);
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

  getColumnTitle(column: string): string {
    const titles: { [key: string]: string } = {
      tipoIdentificacion: 'Tipo de Identificación',
      identificacion: 'Identificación',
      clasificacion: 'Clasificación',
      tipoEmisor: 'Tipo de Emisor'
    };
    return titles[column] || column;
  }

  onRangeChanged(range: { from: string; to: string }) {
    console.log('Rango:', range);

    if (!range.from || !range.to) {
      this.seeFilterTable = false;
      this.loadResume();
      return;
    }

    this.loading = true;

    this.l01CatalogService.getL01ByFechaCreacion(range.from, range.to).subscribe({
      next: (data) => {
        console.log('Datos filtrados del backend:', data);


        this.filteredL01 = data;


        this.filterData = data.map(item => ({
          codigoEmisor: item.codigoEmisor,
          tipoIdentificacion: this.getTipoIdentificacionDesc(item.codigoEmisor),
          identificacion: this.getIdentificacionDesc(item.tipoIdentificacion),
          clasificacion: this.getClasificacionDesc(item.identificacion),
          tipoEmisor: this.getTipoEmisorDesc(item.clasificacion),

          fechaCorte: (item as any).fechaCorte
        }));

        this.seeFilterTable = this.filterData.length > 0;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error', error);
        this.seeFilterTable = false;
        this.loading = false;
      }
    });
  }


}