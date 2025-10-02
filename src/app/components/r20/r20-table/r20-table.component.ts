import { Component } from '@angular/core';
import { R20_FIELD_TOOLTIPS } from '../../../utils/r20-field-tooltips';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-r20-fields-table',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './r20-table.component.html',
  styleUrl: './r20-table.component.css'
})
export class R20FieldsTableComponent {

  displayedColumns: string[] = ['no', 'campo', 'tipoDeDato', 'obligatoriedad', 'tabla', 'descripcion'];
    dataSource = R20_FIELD_TOOLTIPS;
}
