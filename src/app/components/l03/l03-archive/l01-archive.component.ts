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

    this.l01Service.listarTodos().subscribe({
      next: (data) => {
        this.registros = data;
        this.isLoading = false;
      },
      error: (error) => {
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
    const request = { fecha: new Date().toISOString().split('T')[0] };
    
    this.l01Service.exportToTxt(request).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `L01_${new Date().toISOString().split('T')[0]}.txt`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Error exportando:', error);
        alert('❌ Error al exportar el archivo');
      }
    });
  }
}
