import { Component } from '@angular/core';
import { R11_FIELD_TOOLTIPS } from '../../../utils/r11-field-tooltips';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-r11-fields-table',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './r11-table.component.html',
  styleUrl: './r11-table.component.css'
})
export class R11FieldsTableComponent {

  displayedColumns: string[] = ['no', 'campo', 'tipoDeDato', 'obligatoriedad', 'tabla', 'descripcion'];
    dataSource = R11_FIELD_TOOLTIPS;

}
