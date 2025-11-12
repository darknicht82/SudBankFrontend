import { Component } from '@angular/core';
import { R13_FIELD_TOOLTIPS } from '../../../utils/r13-field-tooltips';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-r13-fields-table',
  templateUrl: './r13-table.component.html',
  styleUrls: ['./r13-table.component.css'],
  standalone: true,
  imports: [MatTableModule]
})
export class R13FieldsTableComponent {
  displayedColumns: string[] = ['no', 'campo', 'tipoDeDato', 'obligatoriedad', 'tabla', 'descripcion'];
  dataSource = R13_FIELD_TOOLTIPS;
}