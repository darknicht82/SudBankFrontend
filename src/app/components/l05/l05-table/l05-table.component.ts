import { Component } from '@angular/core';
// import { Component, OnInit } from '@angular/core';
import { L05_FIELD_TOOLTIPS } from '../../../utils/l05-field-tooltips';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-l05-table',
  templateUrl: './l05-table.component.html',
  styleUrls: ['./l05-table.component.css'],
  standalone: true,
  imports: [MatTableModule]
})
export class L05FieldsTableComponent {
  displayedColumns: string[] = ['no', 'campo', 'tipoDeDato', 'obligatoriedad', 'tabla', 'descripcion'];
  dataSource = L05_FIELD_TOOLTIPS;
}