import { Component } from '@angular/core';
import { R08_FIELD_TOOLTIPS } from '../../../utils/R08-field-tooltips';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-r08-fields-table',
  templateUrl: './r08-table.component.html',
  styleUrls: ['./r08-table.component.css'],
  standalone: true,
  imports: [MatTableModule]
})
export class R08FieldsTableComponent {
  displayedColumns: string[] = ['no', 'campo', 'tipoDeDato', 'obligatoriedad', 'tabla', 'descripcion'];
  dataSource = R08_FIELD_TOOLTIPS;
}