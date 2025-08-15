import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { L01RegulatoryService, L01RegulatoryData } from '../../../services/l01-regulatory.service';

@Component({
  selector: 'app-l01-archive',
  templateUrl: './l01-archive.component.html',
  styleUrls: ['./l01-archive.component.css'],
  standalone: true,
  imports: [CommonModule, DatePipe]
})
export class L01ArchiveComponent implements OnInit {
  registros: L01RegulatoryData[] = [];
  isLoading = false;
  error = '';

  constructor(private l01Service: L01RegulatoryService) {}

  ngOnInit(): void {
    this.loadArchiveData();
  }

  loadArchiveData(): void {
    this.isLoading = true;
    this.error = '';

    this.l01Service.getAllL01Data().subscribe({
      next: (data: L01RegulatoryData[]) => {
        this.registros = data;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error cargando archivo L01:', error);
        this.error = 'Error al cargar el archivo';
        this.isLoading = false;
      }
    });
  }

  onRefresh(): void {
    this.loadArchiveData();
  }

  // Métodos para estadísticas
  getRegistrosNacionales(): number {
    return this.registros.filter(r => r.tipoIdentificacion === 'R').length;
  }

  getRegistrosExtranjeros(): number {
    return this.registros.filter(r => r.tipoIdentificacion === 'X').length;
  }

  onExport(): void {
    // Usar el servicio de exportación L01
    import('../../../services/l01-export.service').then(({ L01ExportService }) => {
      const exportService = new L01ExportService();
      const filename = exportService.generateL01Filename();
      
      try {
        exportService.downloadTxt(this.registros, filename);
      } catch (error) {
        console.error('Error exportando:', error);
        alert('❌ Error al exportar el archivo');
      }
    });
  }
}
