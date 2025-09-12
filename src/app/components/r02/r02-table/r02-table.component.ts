import { Component } from '@angular/core';
// import { Component, OnInit } from '@angular/core';
import { R02_FIELD_TOOLTIPS } from '../../../utils/R02-field-tooltips';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-r02-fields-table',
  templateUrl: './r02-table.component.html',
  styleUrls: ['./r02-table.component.css'],
  standalone: true,
  imports: [MatTableModule]
})
export class R02FieldsTableComponent {
// export class L02FieldsTableComponent implements OnInit {
  displayedColumns: string[] = ['no', 'campo', 'tipoDeDato', 'obligatoriedad', 'tabla', 'descripcion'];
  dataSource = R02_FIELD_TOOLTIPS;
}