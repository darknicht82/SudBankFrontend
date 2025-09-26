import { Component } from '@angular/core';
import { R07_FIELD_TOOLTIPS } from '../../../../utils/r07-field-tooltips';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-r07-fields-table',
  templateUrl: './r07-fields-table.component.html',
  styleUrls: ['./r07-fields-table.component.css'],
  standalone: true,
  imports: [MatTableModule]
})
export class R07FieldsTableComponent {
  displayedColumns: string[] = ['no', 'campo', 'tipoDeDato', 'obligatoriedad', 'tabla', 'descripcion'];
  dataSource = R07_FIELD_TOOLTIPS;
}
