import { Component } from '@angular/core';
import { R10_FIELD_TOOLTIPS } from '../../../utils/r10-field-tooltips';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-r10-fields-table',
  templateUrl: './r10-table.component.html',
  styleUrls: ['./r10-table.component.css'],
  standalone: true,
  imports: [MatTableModule]
})
export class R10FieldsTableComponent {
  displayedColumns: string[] = ['no', 'campo', 'tipoDeDato', 'obligatoriedad', 'tabla', 'descripcion'];
  dataSource = R10_FIELD_TOOLTIPS;
}