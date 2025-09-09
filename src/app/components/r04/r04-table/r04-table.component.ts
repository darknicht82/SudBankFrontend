import { Component } from '@angular/core';
// import { Component, OnInit } from '@angular/core';
import { R04_FIELD_TOOLTIPS } from '../../../utils/r04-field-tooltips';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-r04-table',
  templateUrl: './r04-table.component.html',
  styleUrls: ['./r04-table.component.css'],
  standalone: true,
  imports: [MatTableModule]
})
export class R04FieldsTableComponent {
// export class R04FieldsTableComponent implements OnInit {
  displayedColumns: string[] = ['no', 'campo', 'tipoDeDato', 'obligatoriedad', 'tabla', 'descripcion'];
  dataSource = R04_FIELD_TOOLTIPS;
}