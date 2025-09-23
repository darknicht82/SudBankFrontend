import { Component } from '@angular/core';
import { R09_FIELD_TOOLTIPS } from '../../../utils/r09-field-tooltips';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-r09-fields-table',
  templateUrl: './r09-table.component.html',
  styleUrls: ['./r09-table.component.css'],
  standalone: true,
  imports: [MatTableModule]
})
export class R09FieldsTableComponent {
  displayedColumns: string[] = ['no', 'campo', 'tipoDeDato', 'obligatoriedad', 'tabla', 'descripcion'];
  dataSource = R09_FIELD_TOOLTIPS;
}