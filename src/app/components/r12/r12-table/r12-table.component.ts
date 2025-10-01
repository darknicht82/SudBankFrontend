import { Component } from '@angular/core';
import { R12_FIELD_TOOLTIPS } from '../../../utils/r12-field-tooltips';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-r12-fields-table',
  templateUrl: './r12-table.component.html',
  styleUrls: ['./r12-table.component.css'],
  standalone: true,
  imports: [MatTableModule]
})
export class R12FieldsTableComponent {
  displayedColumns: string[] = ['no', 'campo', 'tipoDeDato', 'obligatoriedad', 'tabla', 'descripcion'];
  dataSource = R12_FIELD_TOOLTIPS;
}