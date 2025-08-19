import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe, TitleCasePipe } from '@angular/common';
import { L01RegulatoryService, L01RegulatoryData } from '../../../services/l01-regulatory.service';
import { L01CatalogService, L01Catalog } from '../../../services/l01-catalog.service';

interface L01TableFilters {
  tipoIdentificacion: string;
  clasificacion: string;
  tipo: string;
  busqueda: string;
}

@Component({
  selector: 'app-l01-table',
  templateUrl: './l01-table.component.html',
  styleUrls: ['./l01-table.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, DatePipe, TitleCasePipe]
})
export class L01TableComponent implements OnInit {
  // Datos
  registros: L01RegulatoryData[] = [];
  registrosFiltrados: L01RegulatoryData[] = [];
  registrosPaginados: L01RegulatoryData[] = [];

  // Filtros
  filtros: L01TableFilters = {
    tipoIdentificacion: '',
    clasificacion: '',
    tipo: '',
    busqueda: ''
  };

  // Paginación
  paginaActual = 1;
  tamanoPagina = 25;
  totalPaginas = 1;

  // Ordenamiento
  campoOrdenamiento = '';
  direccionOrdenamiento: 'asc' | 'desc' = 'asc';

  // Estados
  isLoading = false;
  error = '';

  // Catálogos
  tabla4Catalogs: L01Catalog[] = [];
  tabla73Catalogs: L01Catalog[] = [];
  tabla173Catalogs: L01Catalog[] = [];

  constructor(
    private l01Service: L01RegulatoryService,
    private catalogService: L01CatalogService
  ) {}

  ngOnInit(): void {
    this.loadCatalogs();
    this.loadData();
  }

  loadCatalogs(): void {
    // Cargar catálogos para filtros
    this.catalogService.getTabla4().subscribe({
      next: (catalogs) => {
        this.tabla4Catalogs = catalogs;
      },
      error: (error) => {
        console.error('Error cargando Tabla 4:', error);
      }
    });

    this.catalogService.getTabla73().subscribe({
      next: (catalogs) => {
        this.tabla73Catalogs = catalogs;
      },
      error: (error) => {
        console.error('Error cargando Tabla 73:', error);
      }
    });

    this.catalogService.getTabla173().subscribe({
      next: (catalogs) => {
        this.tabla173Catalogs = catalogs;
      },
      error: (error) => {
        console.error('Error cargando Tabla 173:', error);
      }
    });
  }

  loadData(): void {
    this.isLoading = true;
    this.error = '';

    this.l01Service.listarTodos().subscribe({
      next: (data) => {
        this.registros = data;
        this.aplicarFiltros();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error cargando datos L01:', error);
        this.error = 'Error al cargar los datos';
        this.isLoading = false;
      }
    });
  }

  // Aplicar filtros
  aplicarFiltros(): void {
    let datosFiltrados = [...this.registros];

    // Filtro por tipo de identificación
    if (this.filtros.tipoIdentificacion) {
      datosFiltrados = datosFiltrados.filter(item => 
        item.tipoIdentificacion === this.filtros.tipoIdentificacion
      );
    }

    // Filtro por clasificación
    if (this.filtros.clasificacion) {
      datosFiltrados = datosFiltrados.filter(item => 
        item.clasificacion.toString() === this.filtros.clasificacion
      );
    }

    // Filtro por tipo
    if (this.filtros.tipo) {
      datosFiltrados = datosFiltrados.filter(item => 
        item.tipo.toString() === this.filtros.tipo
      );
    }

    // Filtro de búsqueda general
    if (this.filtros.busqueda) {
      const busqueda = this.filtros.busqueda.toLowerCase();
      datosFiltrados = datosFiltrados.filter(item =>
        item.identificacion.toLowerCase().includes(busqueda) ||
        item.tipoIdentificacion.toLowerCase().includes(busqueda)
      );
    }

    this.registrosFiltrados = datosFiltrados;
    this.paginaActual = 1;
    this.calcularPaginacion();
  }

  // Limpiar filtros
  limpiarFiltros(): void {
    this.filtros = {
      tipoIdentificacion: '',
      clasificacion: '',
      tipo: '',
      busqueda: ''
    };
    this.aplicarFiltros();
  }

  // Ordenamiento
  ordenarPor(campo: string): void {
    if (this.campoOrdenamiento === campo) {
      this.direccionOrdenamiento = this.direccionOrdenamiento === 'asc' ? 'desc' : 'asc';
    } else {
      this.campoOrdenamiento = campo;
      this.direccionOrdenamiento = 'asc';
    }

    this.registrosFiltrados.sort((a, b) => {
      let valorA: any = a[campo as keyof L01RegulatoryData];
      let valorB: any = b[campo as keyof L01RegulatoryData];

      if (valorA < valorB) {
        return this.direccionOrdenamiento === 'asc' ? -1 : 1;
      }
      if (valorA > valorB) {
        return this.direccionOrdenamiento === 'asc' ? 1 : -1;
      }
      return 0;
    });

    this.calcularPaginacion();
  }

  // Obtener icono de ordenamiento
  getSortIcon(campo: string): string {
    if (this.campoOrdenamiento !== campo) {
      return 'pi-sort';
    }
    return this.direccionOrdenamiento === 'asc' ? 'pi-sort-up' : 'pi-sort-down';
  }

  // Paginación
  calcularPaginacion(): void {
    this.totalPaginas = Math.ceil(this.registrosFiltrados.length / this.tamanoPagina);
    const inicio = (this.paginaActual - 1) * this.tamanoPagina;
    const fin = inicio + this.tamanoPagina;
    this.registrosPaginados = this.registrosFiltrados.slice(inicio, fin);
  }

  cambiarPagina(pagina: number): void {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaActual = pagina;
      this.calcularPaginacion();
    }
  }

  cambiarTamanoPagina(): void {
    this.paginaActual = 1;
    this.calcularPaginacion();
  }

  // Getters para estadísticas
  get totalRegistros(): number {
    return this.registrosFiltrados.length;
  }

  get inicioPagina(): number {
    return (this.paginaActual - 1) * this.tamanoPagina;
  }

  get finPagina(): number {
    return Math.min(this.inicioPagina + this.tamanoPagina, this.registrosFiltrados.length);
  }

  get paginasVisibles(): number[] {
    const paginas: number[] = [];
    const inicio = Math.max(1, this.paginaActual - 2);
    const fin = Math.min(this.totalPaginas, this.paginaActual + 2);
    
    for (let i = inicio; i <= fin; i++) {
      paginas.push(i);
    }
    
    return paginas;
  }

  // Utilidades para clases CSS
  getTipoIdentificacionClass(tipo: string): string {
    switch (tipo) {
      case 'R':
        return 'ruc-type';
      case 'X':
        return 'extranjero-type';
      default:
        return '';
    }
  }

  // Obtener descripción de catálogo
  getCatalogDescription(tabla: string, codigo: string): string {
    let catalogs: L01Catalog[] = [];
    
    switch (tabla) {
      case 't4':
        catalogs = this.tabla4Catalogs;
        break;
      case 't73':
        catalogs = this.tabla73Catalogs;
        break;
      case 't173':
        catalogs = this.tabla173Catalogs;
        break;
    }

    const catalog = catalogs.find(c => c.codigo === codigo);
    return catalog ? catalog.descripcion : 'Código no encontrado';
  }

  // Formatear fecha
  formatDate(date: Date | string): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('es-ES');
  }

  // Formatear identificación
  formatIdentificacion(identificacion: string, tipo: string): string {
    if (!identificacion) return '';
    
    if (tipo === 'R' && identificacion.length === 13) {
      return `${identificacion.substring(0, 3)}-${identificacion.substring(3, 10)}-${identificacion.substring(10)}`;
    }
    
    return identificacion;
  }

  // Acciones
  onRefresh(): void {
    this.loadData();
  }

  onExport(): void {
    const request = { fecha: new Date().toISOString().split('T')[0] };
    
    this.l01Service.exportToExcel(request).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `L01_${new Date().toISOString().split('T')[0]}.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Error exportando:', error);
        alert('❌ Error al exportar el archivo');
      }
    });
  }

  verDetalle(item: L01RegulatoryData): void {
    console.log('Ver detalle:', item);
    alert(`Ver detalle de ${item.identificacion}`);
  }

  editar(item: L01RegulatoryData): void {
    console.log('Editar:', item);
    alert(`Editar registro de ${item.identificacion}`);
  }

  // Métodos para estadísticas
  get registrosNacionales(): number {
    return this.registrosFiltrados.filter(item => item.tipoIdentificacion === 'R').length;
  }

  get registrosExtranjeros(): number {
    return this.registrosFiltrados.filter(item => item.tipoIdentificacion === 'X').length;
  }

  get registrosActivos(): number {
    return this.registrosFiltrados.length; // Todos los registros están activos en L01
  }

  // Métodos de utilidad para descripciones
  getDescripcionTabla4(codigo: string): string {
    const catalog = this.tabla4Catalogs.find(c => c.codigo === codigo);
    return catalog ? catalog.descripcion : '';
  }

  getDescripcionTabla173(codigo: number): string {
    const catalog = this.tabla173Catalogs.find(c => c.codigo === codigo.toString());
    return catalog ? catalog.descripcion : '';
  }

  getDescripcionTabla73(codigo: number): string {
    const catalog = this.tabla73Catalogs.find(c => c.codigo === codigo.toString());
    return catalog ? catalog.descripcion : '';
  }

  // Métodos para estados (L01 no tiene estados, pero mantenemos compatibilidad)
  getStatusClass(estado: string): string {
    return 'activo'; // L01 no tiene estados
  }

  getStatusIcon(estado: string): string {
    return 'pi-check-circle'; // L01 no tiene estados
  }

  eliminar(item: L01RegulatoryData): void {
    if (confirm(`¿Está seguro de eliminar el registro de ${item.identificacion}?`)) {
      if (item.id) {
        this.l01Service.eliminar(item.id).subscribe({
          next: () => {
            console.log('Registro eliminado:', item);
            this.loadData();
            alert('✅ Registro eliminado exitosamente');
          },
          error: (error) => {
            console.error('Error eliminando:', error);
            alert('❌ Error al eliminar el registro');
          }
        });
      }
    }
  }
}
