import { Component } from '@angular/core';
import { L08_FIELD_TOOLTIPS } from '../../../utils/l08-field-tooltips';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-l08-table',
  templateUrl: './l08-table.component.html',
  styleUrls: ['./l08-table.component.css'],
  standalone: true,
  imports: [MatTableModule]
})
export class L08FieldsTableComponent {
  displayedColumns: string[] = ['no', 'campo', 'tipoDeDato', 'obligatoriedad', 'tabla', 'descripcion'];
  dataSource = L08_FIELD_TOOLTIPS;
}