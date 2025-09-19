import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { R07Data } from '../../../services/r07-catalog.service';

@Component({
  selector: 'app-r07-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './r07-table.component.html',
  styleUrls: ['./r07-table.component.css']
})
export class R07TableComponent {
  @Input() data: R07Data[] = [];
  @Input() loading: boolean = false;
  @Output() editItem = new EventEmitter<R07Data>();
  @Output() deleteItem = new EventEmitter<number>();
  @Output() search = new EventEmitter<string>();

  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  sortField: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  get filteredData(): R07Data[] {
    let filtered = this.data;
    
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(item =>
        item.identificacionSujeto.toLowerCase().includes(term) ||
        item.numeroOperacion.toLowerCase().includes(term) ||
        item.numeroGarantia.toLowerCase().includes(term) ||
        item.descripcionGarantia.toLowerCase().includes(term)
      );
    }

    if (this.sortField) {
      filtered.sort((a, b) => {
        const aValue = this.getFieldValue(a, this.sortField);
        const bValue = this.getFieldValue(b, this.sortField);
        
        if (aValue < bValue) return this.sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }

  get paginatedData(): R07Data[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredData.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredData.length / this.itemsPerPage);
  }

  get pageNumbers(): number[] {
    const pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  private getFieldValue(item: R07Data, field: string): any {
    switch (field) {
      case 'identificacionSujeto': return item.identificacionSujeto;
      case 'numeroOperacion': return item.numeroOperacion;
      case 'numeroGarantia': return item.numeroGarantia;
      case 'descripcionGarantia': return item.descripcionGarantia;
      case 'valorAvaluoTitulo': return item.valorAvaluoTitulo;
      case 'fechaAvaluo': return new Date(item.fechaAvaluo);
      case 'porcentajeCubreGarantia': return item.porcentajeCubreGarantia;
      default: return '';
    }
  }

  onSearch(): void {
    this.currentPage = 1;
    this.search.emit(this.searchTerm);
  }

  onSort(field: string): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
  }

  onEdit(item: R07Data): void {
    this.editItem.emit(item);
  }

  onDelete(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar este registro?')) {
      this.deleteItem.emit(id);
    }
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  onItemsPerPageChange(): void {
    this.currentPage = 1;
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-EC', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-EC');
  }

  formatPercentage(value: number): string {
    return `${value}%`;
  }

  // Math functions for template
  Math = Math;
}
