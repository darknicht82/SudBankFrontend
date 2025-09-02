import { Component } from '@angular/core';
import { L01_FIELD_TOOLTIPS_TABLE } from '../../../utils/l01-field-tooltips';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-l01-fields-table',
  templateUrl: './l01-fields-table.component.html',
  styleUrls: ['./l01-fields-table.component.css'],
  standalone: true,
  imports: [MatTableModule]
})
export class L01FieldsTableComponent {
  displayedColumns: string[] = ['no', 'campo', 'tipoDeDato', 'obligatoriedad', 'tabla', 'descripcion'];
  dataSource = L01_FIELD_TOOLTIPS_TABLE;
}
