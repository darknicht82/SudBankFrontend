import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { R22ModalFormComponent } from '../../../components/r22/r22-modal-form/r22-modal-form.component'
import { R22FieldsTableComponent } from '../../../components/r22/r22-table/r22-table.component';
import { R22CatalogService } from '../../../services/r22-catalog.service';

@Component({
  selector: 'app-r22-main',
  templateUrl: './r22-main.component.html',
  styleUrls: ['./r22-main.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, R22FieldsTableComponent, R22ModalFormComponent]
})
export class R22MainComponent implements OnInit {
  showModalForm = false;
  loading = false;
  arrayResume: any[] = [];
  constructor(private R22CatalogService: R22CatalogService ) { 
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
    this.R22CatalogService.getResume().subscribe({
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
      }, 2200);
  }

  exportToTxt(): void{}
}