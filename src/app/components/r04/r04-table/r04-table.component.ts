import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { R04_FIELD_TOOLTIPS } from '../../../utils/r04-field-tooltips';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-r04-table',
  templateUrl: './r04-table.component.html',
  styleUrls: ['./r04-table.component.css'],
  standalone: true,
  imports: [MatTableModule, CommonModule]
})
export class R04FieldsTableComponent {
  displayedColumns: string[] = ['no', 'campo', 'tipoDeDato', 'obligatoriedad', 'tabla', 'descripcion'];
  dataSource = R04_FIELD_TOOLTIPS;

  // Métodos para el footer de la tabla
  getTotalFields(): number {
    return this.dataSource.length;
  }

  getObligatoryFields(): number {
    return this.dataSource.filter(f => f.obligatoriedad === 'X').length;
  }

  getOptionalFields(): number {
    return this.dataSource.filter(f => f.obligatoriedad === 'X*').length;
  }
}