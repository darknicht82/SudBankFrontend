import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { R20ModalFormComponent } from '../../../components/r20/r20-modal-form/r20-modal-form.component'
import { R20FieldsTableComponent } from '../../../components/r20/r20-table/r20-table.component';
import { R20CatalogService } from '../../../services/r20-catalog.service';

@Component({
  selector: 'app-r20-main',
  templateUrl: './r20-main.component.html',
  styleUrls: ['./r20-main.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, R20FieldsTableComponent, R20ModalFormComponent]
})
export class R20MainComponent implements OnInit {
  showModalForm = false;
  loading = false;
  arrayResume: any[] = [];
  constructor(private R20CatalogService: R20CatalogService ) { 
    }

  ngOnInit(): void {
    this.loadResume();
  }

  openModal(): void {
    this.showModalForm = true;
  }

  onModalClosed(): void {
    this.showModalForm = false;
    this.loadResume();
  }

  private loadResume(): void{
    this.R20CatalogService.getResume().subscribe({
      next: (data) => {
        this.arrayResume = data;
      },
      error: (error) => {
        console.error('Error al cargar Resumen:', error);
      }
    });
  }

  validateAndGenerateReport(): void{
    this.loading = true;
    setTimeout(() => {
        this.loading = false;
      }, 2000);
  }

  exportToTxt(): void{}
}