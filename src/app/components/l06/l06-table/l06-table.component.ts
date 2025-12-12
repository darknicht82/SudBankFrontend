import { Component } from '@angular/core';
import { L06_FIELD_TOOLTIPS } from '../../../utils/l06-field-tooltips';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-l06-table',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './l06-table.component.html',
  styleUrls: ['./l06-table.component.css']
})
export class L06FieldsTableComponent {
  displayedColumns: string[] = ['no', 'campo', 'tipoDeDato', 'obligatoriedad', 'tabla', 'descripcion'];
  dataSource = L06_FIELD_TOOLTIPS;

}


