import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { R13ModalFormComponent } from '../../../components/r13/r13-modal-form/r13-modal-form.component'
import { R13FieldsTableComponent } from '../../../components/r13/r13-table/r13-table.component';
import { R13CatalogService } from '../../../services/r13-catalog.service';

@Component({
  selector: 'app-r13-main',
  templateUrl: './r13-main.component.html',
  styleUrls: ['./r13-main.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, R13FieldsTableComponent, R13ModalFormComponent]
})
export class R13MainComponent implements OnInit {
  showModalForm = false;
  loading = false;
  arrayResume: any[] = [];
  constructor(private R13CatalogService: R13CatalogService ) { 
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
    this.R13CatalogService.getResume().subscribe({
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