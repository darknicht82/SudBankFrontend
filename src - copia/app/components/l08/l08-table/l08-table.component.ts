import { Component, OnInit } from '@angular/core';

interface L08Data {
  id: number;
  fechaReporte: Date;
  entidadFinanciera: string;
  codigoEntidad: string;
  efectivoCaja: number;
  depositosBancoCentral: number;
  inversionesTemporales: number;
  otrosActivosLiquidos: number;
  depositosDemanda: number;
  depositosPlazo: number;
  obligacionesFinancieras: number;
  otrosPasivosCortoPlazo: number;
  totalActivosLiquidos: number;
  totalPasivosCortoPlazo: number;
  ratioLiquidez: number;
  estado: string;
}

interface Filtros {
  periodo: string;
  entidad: string;
  ratio: string;
  busqueda: string;
}

@Component({
  selector: 'app-l08-table',
  templateUrl: './l08-table.component.html',
  styleUrls: ['./l08-table.component.css']
})
export class L08TableComponent implements OnInit {
  // Datos
  datosOriginales: L08Data[] = [];
  datosFiltrados: L08Data[] = [];
  datosPaginados: L08Data[] = [];

  // Filtros
  filtros: Filtros = {
    periodo: '',
    entidad: '',
    ratio: '',
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

  constructor() {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  // Cargar datos de ejemplo
  cargarDatos(): void {
    this.isLoading = true;
    
    // Simular carga de datos
    setTimeout(() => {
      this.datosOriginales = this.generarDatosEjemplo();
      this.aplicarFiltros();
      this.isLoading = false;
    }, 1000);
  }

  // Generar datos de ejemplo
  generarDatosEjemplo(): L08Data[] {
    const entidades = [
      'Banco SudBank (1038)', 'Banco Central', 'Banco Comercial', 
      'Banco de Desarrollo', 'Banco Popular', 'Banco Internacional'
    ];
    
    const datos: L08Data[] = [];
    
    for (let i = 1; i <= 50; i++) {
      const efectivoCaja = Math.random() * 1000000 + 500000;
      const depositosBancoCentral = Math.random() * 2000000 + 1000000;
      const inversionesTemporales = Math.random() * 3000000 + 1500000;
      const otrosActivosLiquidos = Math.random() * 500000 + 250000;
      
      const depositosDemanda = Math.random() * 1500000 + 750000;
      const depositosPlazo = Math.random() * 2500000 + 1250000;
      const obligacionesFinancieras = Math.random() * 1000000 + 500000;
      const otrosPasivosCortoPlazo = Math.random() * 500000 + 250000;
      
      const totalActivosLiquidos = efectivoCaja + depositosBancoCentral + inversionesTemporales + otrosActivosLiquidos;
      const totalPasivosCortoPlazo = depositosDemanda + depositosPlazo + obligacionesFinancieras + otrosPasivosCortoPlazo;
      const ratioLiquidez = totalPasivosCortoPlazo > 0 ? (totalActivosLiquidos / totalPasivosCortoPlazo) * 100 : 0;
      
      const estados = ['aprobado', 'pendiente', 'rechazado'];
      const estado = estados[Math.floor(Math.random() * estados.length)];
      
      datos.push({
        id: i,
        fechaReporte: new Date(2024, Math.floor(Math.random() * 6), Math.floor(Math.random() * 28) + 1),
        entidadFinanciera: entidades[Math.floor(Math.random() * entidades.length)],
        codigoEntidad: `SB${String(i).padStart(3, '0')}`,
        efectivoCaja,
        depositosBancoCentral,
        inversionesTemporales,
        otrosActivosLiquidos,
        depositosDemanda,
        depositosPlazo,
        obligacionesFinancieras,
        otrosPasivosCortoPlazo,
        totalActivosLiquidos,
        totalPasivosCortoPlazo,
        ratioLiquidez,
        estado
      });
    }
    
    return datos;
  }

  // Aplicar filtros
  aplicarFiltros(): void {
    let datosFiltrados = [...this.datosOriginales];

    // Filtro por período
    if (this.filtros.periodo) {
      datosFiltrados = datosFiltrados.filter(item => {
        const itemPeriodo = `${item.fechaReporte.getFullYear()}-${String(item.fechaReporte.getMonth() + 1).padStart(2, '0')}`;
        return itemPeriodo === this.filtros.periodo;
      });
    }

    // Filtro por entidad
    if (this.filtros.entidad) {
      datosFiltrados = datosFiltrados.filter(item =>
        item.entidadFinanciera.toLowerCase().includes(this.filtros.entidad.toLowerCase())
      );
    }

    // Filtro por ratio
    if (this.filtros.ratio) {
      datosFiltrados = datosFiltrados.filter(item => {
        switch (this.filtros.ratio) {
          case 'excelente':
            return item.ratioLiquidez >= 100;
          case 'aceptable':
            return item.ratioLiquidez >= 80 && item.ratioLiquidez < 100;
          case 'bajo':
            return item.ratioLiquidez < 80;
          default:
            return true;
        }
      });
    }

    // Filtro de búsqueda general
    if (this.filtros.busqueda) {
      const busqueda = this.filtros.busqueda.toLowerCase();
      datosFiltrados = datosFiltrados.filter(item =>
        item.entidadFinanciera.toLowerCase().includes(busqueda) ||
        item.codigoEntidad.toLowerCase().includes(busqueda) ||
        item.estado.toLowerCase().includes(busqueda)
      );
    }

    this.datosFiltrados = datosFiltrados;
    this.paginaActual = 1;
    this.calcularPaginacion();
  }

  // Limpiar filtros
  limpiarFiltros(): void {
    this.filtros = {
      periodo: '',
      entidad: '',
      ratio: '',
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

    this.datosFiltrados.sort((a, b) => {
      let valorA: any = a[campo as keyof L08Data];
      let valorB: any = b[campo as keyof L08Data];

      if (campo === 'fechaReporte') {
        valorA = valorA.getTime();
        valorB = valorB.getTime();
      }

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
    this.totalPaginas = Math.ceil(this.datosFiltrados.length / this.tamanoPagina);
    const inicio = (this.paginaActual - 1) * this.tamanoPagina;
    const fin = inicio + this.tamanoPagina;
    this.datosPaginados = this.datosFiltrados.slice(inicio, fin);
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
  get promedioRatio(): number {
    if (this.datosFiltrados.length === 0) return 0;
    const suma = this.datosFiltrados.reduce((acc, item) => acc + item.ratioLiquidez, 0);
    return suma / this.datosFiltrados.length;
  }

  get totalActivos(): number {
    return this.datosFiltrados.reduce((acc, item) => acc + item.totalActivosLiquidos, 0) / 1000000;
  }

  get reportesConRiesgo(): number {
    return this.datosFiltrados.filter(item => item.ratioLiquidez < 80).length;
  }

  get inicioPagina(): number {
    return (this.paginaActual - 1) * this.tamanoPagina;
  }

  get finPagina(): number {
    return Math.min(this.inicioPagina + this.tamanoPagina, this.datosFiltrados.length);
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
  getRatioClass(ratio: number): string {
    if (ratio >= 100) return 'excelente';
    if (ratio >= 80) return 'aceptable';
    return 'bajo';
  }

  getStatusClass(estado: string): string {
    return estado.toLowerCase();
  }

  getStatusIcon(estado: string): string {
    switch (estado.toLowerCase()) {
      case 'aprobado':
        return 'pi-check-circle';
      case 'pendiente':
        return 'pi-clock';
      case 'rechazado':
        return 'pi-times-circle';
      default:
        return 'pi-question-circle';
    }
  }

  // Acciones
  onRefresh(): void {
    this.cargarDatos();
  }

  onExport(): void {
    // Simular exportación
    console.log('Exportando datos...');
    alert('📊 Exportación iniciada');
  }

  verDetalle(item: L08Data): void {
    console.log('Ver detalle:', item);
    alert(`Ver detalle de ${item.entidadFinanciera}`);
  }

  editar(item: L08Data): void {
    console.log('Editar:', item);
    alert(`Editar reporte de ${item.entidadFinanciera}`);
  }

  eliminar(item: L08Data): void {
    if (confirm(`¿Está seguro de eliminar el reporte de ${item.entidadFinanciera}?`)) {
      console.log('Eliminar:', item);
      this.datosOriginales = this.datosOriginales.filter(d => d.id !== item.id);
      this.aplicarFiltros();
      alert('✅ Reporte eliminado exitosamente');
    }
  }
}
