import { Component } from '@angular/core';
import { L03_FIELD_TOOLTIPS } from '../../../utils/l03-field-tooltips';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-l03-fields-table',
  templateUrl: './l03-fields-table.component.html',
  styleUrls: ['./l03-fields-table.component.scss'],
  standalone: true,
  imports: [MatTableModule]
})
export class L03FieldsTableComponent {
  displayedColumns: string[] = ['no', 'campo', 'tipoDeDato', 'obligatoriedad', 'tabla', 'descripcion'];
  dataSource = L03_FIELD_TOOLTIPS;
}