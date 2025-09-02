import { Component, Input, OnChanges } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-l03-table',
  templateUrl: './l03-table.component.html',
  styleUrls: ['./l03-table.component.css'],
  standalone: true,
  imports: [MatTableModule, CommonModule]
})
export class L03TableComponent implements OnChanges {
  @Input() data: any[] = [];


  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<any>();

  ngOnChanges(): void {
    if (this.data && this.data.length > 0) {
      // Get keys from first row as columns
      this.displayedColumns = Object.keys(this.data[0]);
      this.dataSource.data = this.data;
    }
  }
}
