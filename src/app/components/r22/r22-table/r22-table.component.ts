import { Component } from '@angular/core';
import { R22_FIELD_TOOLTIPS } from '../../../utils/r22-field-tooltips';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-r22-fields-table',
  templateUrl: './r22-table.component.html',
  styleUrls: ['./r22-table.component.css'],
  standalone: true,
  imports: [MatTableModule]
})
export class R22FieldsTableComponent {
  displayedColumns: string[] = ['no', 'campo', 'tipoDeDato', 'obligatoriedad', 'tabla', 'descripcion'];
  dataSource = R22_FIELD_TOOLTIPS;
}