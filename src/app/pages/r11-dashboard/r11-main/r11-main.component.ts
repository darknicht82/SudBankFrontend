import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { R11ModalFormComponent } from '../../../components/r11/r11-modal-form/r11-modal-form.component'
import { R11FieldsTableComponent } from '../../../components/r11/r11-table/r11-table.component';
import { R11CatalogService } from '../../../services/r11-catalog.service';

@Component({
  selector: 'app-r11-main',
  templateUrl: './r11-main.component.html',
  styleUrls: ['./r11-main.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, R11FieldsTableComponent, R11ModalFormComponent]
})
export class R11MainComponent implements OnInit {
  showModalForm = false;
  loading = false;
  arrayResume: any[] = [];
  constructor(private R11CatalogService: R11CatalogService ) { 
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
    this.R11CatalogService.getResume().subscribe({
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