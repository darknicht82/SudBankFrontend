import { Component } from '@angular/core';
// import { Component, OnInit } from '@angular/core';
import { R05_FIELD_TOOLTIPS } from '../../../utils/r05-field-tooltips';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-r05-fields-table',
  templateUrl: './r05-table.component.html',
  styleUrls: ['./r05-table.component.css'],
  standalone: true,
  imports: [MatTableModule]
})
export class R05FieldsTableComponent {
// export class L02FieldsTableComponent implements OnInit {
  displayedColumns: string[] = ['no', 'campo', 'tipoDeDato', 'obligatoriedad', 'tabla', 'descripcion'];
  dataSource = R05_FIELD_TOOLTIPS;
}