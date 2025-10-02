import { Component } from '@angular/core';
// import { Component, OnInit } from '@angular/core';
import { R21_FIELD_TOOLTIPS } from '../../../../utils/r21-field-tooltips';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-r21-fields-table',
  templateUrl: './r21-fields-table.component.html',
  styleUrls: ['./r21-fields-table.component.css'],
  standalone: true,
  imports: [MatTableModule]
})
export class R21FieldsTableComponent {
// export class R21FieldsTableComponent implements OnInit {
  displayedColumns: string[] = ['no', 'campo', 'tipoDeDato', 'obligatoriedad', 'tabla', 'descripcion'];
  dataSource = R21_FIELD_TOOLTIPS;
}
