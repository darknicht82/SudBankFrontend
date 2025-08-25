import { Component } from '@angular/core';
// import { Component, OnInit } from '@angular/core';
import { L02_FIELD_TOOLTIPS } from '../../../../utils/l02-field-tooltips';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-l02-fields-table',
  templateUrl: './l02-fields-table.component.html',
  styleUrls: ['./l02-fields-table.component.css'],
  standalone: true,
  imports: [MatTableModule]
})
export class L02FieldsTableComponent {
// export class L02FieldsTableComponent implements OnInit {
  displayedColumns: string[] = ['no', 'campo', 'tipoDeDato', 'obligatoriedad', 'tabla', 'descripcion'];
  dataSource = L02_FIELD_TOOLTIPS;
}