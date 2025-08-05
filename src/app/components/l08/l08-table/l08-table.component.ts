import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { L08Service } from '../../../services/l08.service';
import { L08 } from '../../../models/l08.model';

@Component({
  selector: 'app-l08-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './l08-table.component.html',
  styleUrl: './l08-table.component.css'
})
export class L08TableComponent implements OnInit {
  datos: L08[] = [];
  loading = false;
  totalRegistros = 0;

  constructor(private l08Service: L08Service) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.loading = true;
    this.l08Service.getDatosActuales().subscribe({
      next: (data) => {
        this.datos = data;
        this.totalRegistros = data.length;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar datos L08:', error);
        this.loading = false;
      }
    });
  }

  exportarDatos(): void {
    // Implementar exportación a Excel/CSV
    console.log('Exportando datos L08...');
    // Aquí se implementaría la lógica de exportación
    alert('Función de exportación en desarrollo');
  }

  actualizarDatos(): void {
    this.cargarDatos();
  }

  // Método helper para formatear números grandes
  formatearNumero(valor: number): string {
    return new Intl.NumberFormat('es-ES', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(valor);
  }

  // Método helper para obtener el tipo de identificación como texto
  getTipoIdentificacionTexto(tipo: 'R' | 'E'): string {
    return tipo === 'R' ? 'RUC' : 'Extranjero';
  }
}
