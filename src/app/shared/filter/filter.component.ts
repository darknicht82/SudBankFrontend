import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FilterRow, } from '../../services/l01-catalog.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent {
  from = '';
  to = '';


  @Input() displayedColumnsFilter: string[] = [];
  @Input() getColumnTitle!: (col: string) => string;
  @Input() showTable: boolean = false;
  @Input() data: FilterRow[] = [];

  @Output() rangeChanged = new EventEmitter<{ from: string; to: string }>();



  applyFilter() {
    if (this.from && this.to) {
      this.rangeChanged.emit({ from: this.from, to: this.to });
    }
    console.log('Filtro aplicado: Desde', this.from, 'Hasta', this.to);
  }

  clearFilter() {
    this.from = '';
    this.to = '';
    this.rangeChanged.emit({ from: '', to: '' });
  }

}
