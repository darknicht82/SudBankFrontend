import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { R12ModalFormComponent } from '../../../components/r12/r12-modal-form/r12-modal-form.component'
import { R12FieldsTableComponent } from '../../../components/r12/r12-table/r12-table.component';
import { R12CatalogService } from '../../../services/r12-catalog.service';

@Component({
  selector: 'app-r12-main',
  templateUrl: './r12-main.component.html',
  styleUrls: ['./r12-main.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, R12FieldsTableComponent, R12ModalFormComponent]
})
export class R12MainComponent implements OnInit {
  showModalForm = false;
  loading = false;
  arrayResume: any[] = [];
  constructor(private R12CatalogService: R12CatalogService ) { 
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
    this.R12CatalogService.getResume().subscribe({
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