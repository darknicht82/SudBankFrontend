import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { R05ModalFormComponent } from '../../../components/r05/r05-modal-form/r05-modal-form.component'
import { R05FieldsTableComponent } from '../../../components/r05/r05-table/r05-table.component';
import { R05CatalogService } from '../../../services/r05-catalog.service';

@Component({
 selector: 'app-r05-main',
   templateUrl: './r05-main.component.html',
   styleUrls: ['./r05-main.component.scss'],
   standalone: true,
   imports: [FormsModule, CommonModule, R05FieldsTableComponent, R05ModalFormComponent]
})
export class R05MainComponent {

  showModalForm = false;
    loading = false;
    arrayResume: any[] = [];
    constructor(private R05CatalogService: R05CatalogService ) { 
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
      this.R05CatalogService.getResume().subscribe({
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
