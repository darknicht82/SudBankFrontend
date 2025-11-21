/**
 * COMPONENTE l08 MAIN - DASHBOARD PRINCIPAL
 * Manual de Control de Inversiones - Marzo 2017
 * Superintendencia de Bancos del Ecuador
 */

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { L08CatalogService, L08Resume } from '../../../services/l08-catalog.service';
import { l08ModalFormComponent } from '../../../components/l08/l08-modal-form/l08-modal-form.component';
import { L08FieldsTableComponent } from '../../../components/l08/l08-table/l08-table.component';
import { error } from 'console';

@Component({
  selector: 'app-l08-main',
  templateUrl: './l08-main.component.html',
  styleUrls: ['./l08-main.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, L08FieldsTableComponent, l08ModalFormComponent]
})
export class L08MainComponent implements OnInit {
  showModalForm = false;
  loading = false;
  arrayResume: any[] = [];
  data: L08Resume[] = [];
  constructor(private l08CatalogService: L08CatalogService ) { 
    }

  ngOnInit(): void {
    this.loadResume();
  }

  openModal(): void {
    this.showModalForm = true;
    console.log('this.showModalForm: ',this.showModalForm);
  }

  onModalClosed(): void {
    this.showModalForm = false;
    this.loadResume();
  }

  private loadResume(): void{
    this.l08CatalogService.getResume().subscribe({
      next: (data) => {
        this.arrayResume = data;
      },
      error: (error) => {
        console.error('Error al cargar Resumen:', error);
      }
    });
  }

  validateAndGenerateReport(): void{
    this.loading = true;
    setTimeout(() => {
        this.loading = false;
      }, 2000);
  }

  exportToTxt(): void{
    this.loading = true;
  console.log('📦 Iniciando exportación de L08...');

  this.l08CatalogService.getForReport().subscribe({
    next: (data) => {
      console.log('📊 Datos del reporte:', data);

      // Llamamos al método que genera el TXT
      this.generateTxt(data);

      this.loading = false;
    },
    error: (error) => {
      console.error('❌ Error al generar el reporte TXT:', error);
      this.loading = false;
    }
  });
  }

  generateTxt(data: L08Resume[]): void {
  const fecha = new Date();
  const dia = fecha.getDate().toString().padStart(2, '0');
  const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
  const anio = fecha.getFullYear();
  const codigoEntidad = '0001'; // ⚠️ reemplazar con código real de tu entidad

  // Cabecera
  const cabecera = `L08|${codigoEntidad}|${dia}/${mes}/${anio}|${data.length
    .toString()
    .padStart(8, '0')}`;

  // Filas de datos
  const lineas = data.map((item) =>
    [
      item.codigoLiquidez?.codigo ?? '',
      item.tipoIdentificacionEntidad?.codigo ?? '',
      item.identificacionEntidad ?? '',
      item.tipoInstrumento?.codigo ?? '',
      item.calificacionEntidad?.codigo ?? '',
      item.calificadoraRiesgo?.codigo ?? '',
      (item.lunes ?? 0).toFixed(2).padStart(15, '0'),
      (item.martes ?? 0).toFixed(2).padStart(15, '0'),
      (item.miercoles ?? 0).toFixed(2).padStart(15, '0'),
      (item.jueves ?? 0).toFixed(2).padStart(15, '0'),
      (item.viernes ?? 0).toFixed(2).padStart(15, '0')
    ].join('|')
  );

  const contenido = [cabecera, ...lineas].join('\n');

  // Crear Blob y descargar
  const blob = new Blob([contenido], { type: 'text/plain;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const enlace = document.createElement('a');

  enlace.href = url;
  enlace.download = `L08L${codigoEntidad}${dia}${mes}${anio}.txt`;
  enlace.click();

  window.URL.revokeObjectURL(url);

  console.log(`✅ Archivo L08L${codigoEntidad}${dia}${mes}${anio}.txt generado correctamente`);
}

    
}