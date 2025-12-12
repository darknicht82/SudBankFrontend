import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { L06FieldsTableComponent } from '../../../components/l06/l06-table/l06-table.component';
import { L06CatalogService, L06Resume } from '../../../services/l06-catalog.service';
import { T4Service } from '../../../services/t4.service';
import { T73Service } from '../../../services/t73.service';
import { T173Service } from '../../../services/t173.service';
import { T164Service } from '../../../services/t164.service';
import { environment } from '../../../../environments/environment';
import { L01ExportService } from '../../../services/l01-export.service';
import { L06DetailsDto } from '../../../services/structures/l06/l06.service';


@Component({
  selector: 'app-l06-main',
  standalone: true,
  imports: [L06FieldsTableComponent, CommonModule, FormsModule],
  templateUrl: './l06-main.component.html',
  styleUrl: './l06-main.component.scss'
})
export class L06MainComponent {
  showModalForm = false;
  showEmitterModal = false;
  loading = false;
  arrayResume: L06Resume[] = [];

  tipoIdentificacion = '';
  clasificacion = '';
  tipoEmisor = '';

  error = '';
  registrosFiltrados = 0;


  tabla4: any[] = [];
  tabla164: any[] = [];
  tabla180: any[] = [];
  tabla171: any[] = [];
  tabla33: any[] = [];
  tabla169: any[] = [];
  tabla65: any[] = [];
  tabla66: any[] = [];

  exportData: any[] = [];
  fechaCorte: Date = new Date();
  usuarioActual = '';
  datosL06: L06DetailsDto[] = [];

  displayedColumns: string[] = [
    'tipoIdentificacionEmisor',
    'identificacionEmisor',
    'numeroTitulo',
    'numeroOperacion'];

  constructor(private l06CatalogService: L06CatalogService,
    private exportService: L01ExportService,
  ) { }


  ngOnInit(): void {
    this.loadResume();
  }

  openModal(): void {
    this.showModalForm = true;
    console.log('this.showModalForm: ', this.showModalForm);
  }

  onModalClosed(): void {
    this.showModalForm = false;
    this.loadResume();
  }

  private loadResume(): void {
    this.l06CatalogService.getResume().subscribe({
      next: (data) => {
        this.arrayResume = data;
      },
      error: (error) => {
        console.error('Error al cargar Resumen:', error);
      }
    })
  }


  validateAndGenerateReport(): void {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }
  getGenetateDate(): string {
    return new Date().toLocaleDateString('es-ES');
  }

  getTotalRecords(): number {
    return this.arrayResume.length;
  }
  getGenerationDates(): string {
    return new Date().toLocaleDateString();
  }

  /*   getCountByClasificacion(clasificacion: number): number {
      return this.arrayResume.filter(item => item.identificacionEmisor === clasificacion).length;
    }
   */

  getTipeIdentificationDesc(tipoIdentificacion: any): string {
    if (!tipoIdentificacion) return 'Desconocido';

    if (typeof tipoIdentificacion === 'object' && tipoIdentificacion.descripcion) {
      return tipoIdentificacion.descripcion;
    }
    if (typeof tipoIdentificacion === 'number') {
      const item = this.tabla4.find(t => t.id === tipoIdentificacion);
      console.log('item: ', item);
      return item ? item.descripcion : `ID: ${tipoIdentificacion}`;
    }
    if (typeof tipoIdentificacion === 'string') {
      const item = this.tabla4.find(t => t.codigo === tipoIdentificacion);

      return item ? item.descripcion : tipoIdentificacion;
    }
    if (typeof tipoIdentificacion === 'object' && tipoIdentificacion.codigo) {
      const item = this.tabla4.find(t => t.codigo === tipoIdentificacion.codigo);
      return item ? item.descripcion : tipoIdentificacion.codigo;
    }
    return 'Desconocido';
  }

  getColumnTitle(column: string): string {
    const titles: { [key: string]: string } = {
      'tipoIdentificacionEmisor': 'Tipo de Identificación Emisor',
      'identificacionEmisor': 'Identificación del emisor',
      'numeroTitulo': 'Número de título',
      'numeroOperacion': 'Número de la operación'
    };
    return titles[column] || column;
  }

  async exportToTxt(): Promise<void> {
    try {
      this.exportData = this.datosL06.map((item: L06DetailsDto) => ({
        id: item.id,
        codigoTipoIdentificacionEmisor: item.codigoTipoIdentificacionEmisor,
        codigoIdentificacionEmisor: item.codigoIdentificacionEmisor,
        numeroTitulo: item.numeroTitulo,
        numeroOperacion: item.numeroOperacion,
        fechaEmision: item.fechaEmision,
        fechaCompra: item.fechaCompra,
        codigoEstadoOperacion: item.codigoEstadoOperacion,
        cuentaContable: item.cuentaContable,
        codigoTipoOperacion: item.codigoTipoOperacion,
        fechaOperacion: item.fechaOperacion,
        fechaVencimientoOperacion: item.fechaVencimientoOperacion,
        codigoTipoIdentificacionContraparte: item.codigoTipoIdentificacionContraparte,
        codigoIdentificacionContraparteOperacion: item.codigoIdentificacionContraparteOperacion,
        codigoMonedaDenominacion: item.codigoMonedaDenominacion,
        montoNegociadoDolares: item.montoNegociadoDolares,
        tasaEfectivaAnual: item.tasaEfectivaAnual,
        valorNominalTituloDolares: item.valorNominalTituloDolares,
        valorMercadoTituloDolar: item.valorMercadoTituloDolar,
        codigoCategoriaCalificacion: item.codigoCategoriaCalificacion,
        codigoCalificacionRiesgo: item.codigoCalificacionRiesgo,
        codigoCalificadoraRiesgo: item.codigoCalificadoraRiesgo,
        codigoTipoIdentificacionCustodio: item.codigoTipoIdentificacionCustodio,
      }));

      const blob = this.exportService.exportToTxt(this.exportData as any);


      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'L0Validad6_Reporte_' + this.fechaCorte.toISOString().split('T')[0] + '.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

    } catch (error: any) {
      this.error = 'Error en exportación: ' + (error.message || 'Error desconocido');
    }
  }
}
