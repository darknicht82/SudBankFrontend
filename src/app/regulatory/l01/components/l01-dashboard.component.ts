// ========================================
// COMPONENTE L01 - FRONTEND
// ========================================
// Propósito: Dashboard L01 - Emisores, Custodios y Depositarios
// Código Banco: 1038 (Banco Sudamericano)
// 
// CAMPOS OFICIALES SEGÚN MANUAL L01-L06:
// 1. Tipo de identificación (caracter 1) - Tabla 4
// 2. Identificación (caracter 13) - Tabla 164
// 3. Clasificación (numérico 1) - Tabla 173
// 4. Tipo de emisor (numérico 1) - Tabla 73
//
// Autor: Christian Aguirre
// Fecha: 2025-01-08

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { L01Service } from '../services/l01.service';
import { L01Data, L01ReportRequest, L01ReportResponse } from '../models/l01.model';

@Component({
  selector: 'app-l01-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './l01-dashboard.component.html',
  styleUrls: ['./l01-dashboard.component.css']
})
export class L01DashboardComponent implements OnInit {

  reportResponse?: L01ReportResponse;
  filteredData: L01Data[] = [];
  searchTerm: string = '';
  loading = false;
  error = '';

  // KPIs
  totalRegistros = 0;
  emisoresEcuador = 0;
  emisoresExtranjeros = 0;
  nuevosEsteMes = 0;

  filters: L01ReportRequest = {
    tipoIdentificacion: '',
    identificacion: '',
    clasificacion: undefined,
    tipoEmisor: undefined,
    fechaInicio: undefined,
    fechaFin: undefined
  };

  constructor(private l01Service: L01Service) { }

  ngOnInit(): void {
    this.loadL01Data();
  }

  loadL01Data(): void {
    this.loading = true;
    this.error = '';
    
    this.l01Service.listarTodos().subscribe({
      next: (data) => {
        this.filteredData = data;
        this.calculateKPIs();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar datos: ' + (err.error?.message || err.message || 'Error desconocido');
        this.loading = false;
        console.error('Error cargando datos L01:', err);
      }
    });
  }

  applyFilters(): void {
    // Implementar filtros avanzados
    this.loadL01Data();
  }

  applySearch(): void {
    if (this.searchTerm.trim()) {
      this.l01Service.listarPorIdentificacion(this.searchTerm).subscribe({
        next: (data) => {
          this.filteredData = data;
        },
        error: (err) => {
          this.error = 'Error en búsqueda: ' + (err.error?.message || err.message);
        }
      });
    } else {
      this.loadL01Data();
    }
  }

  calculateKPIs(): void {
    this.totalRegistros = this.filteredData.length;
    this.emisoresEcuador = this.filteredData.filter(d => d.tipoIdentificacion === 'R').length;
    this.emisoresExtranjeros = this.filteredData.filter(d => d.tipoIdentificacion === 'X').length;
    
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    this.nuevosEsteMes = this.filteredData.filter(d => {
      if (d.fechaCreacion) {
        const creationDate = new Date(d.fechaCreacion);
        return creationDate.getMonth() === currentMonth && creationDate.getFullYear() === currentYear;
      }
      return false;
    }).length;
  }

  getTipoIdentificacionLabel(tipo: string): string {
    switch (tipo) {
      case 'R': return 'Ecuador (R)';
      case 'X': return 'Extranjero (X)';
      default: return 'N/A';
    }
  }

  getClasificacionLabel(codigo: number): string {
    switch (codigo) {
      case 1: return 'Clasificación 1';
      case 2: return 'Clasificación 2';
      default: return 'N/A';
    }
  }

  getTipoEmisorLabel(codigo: number): string {
    switch (codigo) {
      case 1: return 'Tipo 1';
      case 2: return 'Tipo 2';
      default: return 'N/A';
    }
  }

  editItem(item: L01Data): void {
    // Implementar edición
    console.log('Editar item:', item);
  }

  deleteItem(id: number): void {
    if (confirm('¿Está seguro de eliminar este registro?')) {
      this.l01Service.eliminar(id).subscribe({
        next: () => {
          this.loadL01Data();
        },
        error: (err) => {
          this.error = 'Error al eliminar: ' + (err.error?.message || err.message);
        }
      });
    }
  }

  exportReport(): void {
    const fecha = new Date().toISOString().split('T')[0];
    this.l01Service.exportarTxt(fecha).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `L01_${fecha}.txt`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        this.error = 'Error al exportar: ' + (err.error?.message || err.message);
      }
    });
  }

  refreshData(): void {
    this.loadL01Data();
  }

  clearError(): void {
    this.error = '';
  }
}
