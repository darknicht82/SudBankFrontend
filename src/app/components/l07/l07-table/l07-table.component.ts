import { Component } from '@angular/core';
import { L07_FIELD_TOOLTIPS } from '../../../utils/l07-field-tooltips';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-l07-table',
  templateUrl: './l07-table.component.html',
  styleUrls: ['./l07-table.component.css'],
  standalone: true,
  imports: [MatTableModule]
})
export class L07FieldsTableComponent {
  displayedColumns: string[] = ['no', 'campo', 'tipoDeDato', 'obligatoriedad', 'tabla', 'descripcion'];
  dataSource = L07_FIELD_TOOLTIPS;
}