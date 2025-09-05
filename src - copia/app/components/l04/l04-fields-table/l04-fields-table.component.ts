import { Component } from '@angular/core';
// import { Component, OnInit } from '@angular/core';
import { L04_FIELD_TOOLTIPS } from '../../../utils/l04-field-tooltips'
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-l04-fields-table',
  templateUrl: './l04-fields-table.component.html',
  styleUrls: ['./l04-fields-table.component.css'],
  standalone: true,
  imports: [MatTableModule]
})
export class L04FieldsTableComponent {
// export class L04FieldsTableComponent implements OnInit {
  displayedColumns: string[] = ['no', 'campo', 'tipoDeDato', 'obligatoriedad', 'tabla', 'descripcion'];
  dataSource = L04_FIELD_TOOLTIPS;
}