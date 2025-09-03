import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GenericCatalogService } from '../../../services/catalogs/generic-catalog.service';
import { L03StructureService } from '../../../services/structures/l03/l03.service';

import { Catalog } from '../../../enums/catalog.enum';

@Component({
  selector: 'app-l03-new-record',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './l03-new-record.component.html',
  styleUrl: './l03-new-record.component.scss'
})
export class L03NewRecordComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Output() modalClosed = new EventEmitter<void>();

  arrayTipoIdentificacionEmisor: any[] = [];
  arrayIdentificacionEmisor: any[] = [];
  arrayEstadoTitulo: any[] = [];
  arrayCategoriaInversion: any[] = [];
  arrayRangoVencimiento: any[] = [];
  arrayFuenteInfoMercado: any[] = [];
  arrayCalificacionRiesgo: any[] = [];
  arrayCategoriaCalificacion: any[] = [];
  arrayCalificadoraRiesgo: any[] = [];
  arrayFondoInversion: any[] = [];
  arrayTipoIdentificacionCustodio: any[] = [];
  arrayIdentificacionCustodio: any[] = [];
  arrayCalificacionRiesgoCustodio: any[] = [];
  arrayCalificadoraRiesgoCustodio: any[] = [];

  newEditRecordForm: FormGroup;
  formSubmitted = false;

  constructor(private fb: FormBuilder, 
    private genericCatalogservice: GenericCatalogService,
    private l03StructureService: L03StructureService
  ) {
    this.newEditRecordForm = this.fb.group({
      codigoTipoIdentificacionEmisor: [null, Validators.required],
      codigoIdentificacionEmisor: [null, Validators.required],
      numeroTitulo: [null, Validators.required],
      fechaEmision: [null, Validators.required],
      fechaCompra: [null, Validators.required],
      codigoEstadoTitulo: [null, Validators.required],
      codigoCategoriaInversion: [null, Validators.required],
      codigoRangoVencimiento: [null, Validators.required],

      tasaInteresNominal: [null, [Validators.required, Validators.min(0), Validators.max(9.9999)]],
      montoInteresesUsd: [null, [Validators.required, Validators.min(0), Validators.max(9999999999999.99)]],
      valorLibrosUsd: [null, [Validators.min(0), Validators.max(9999999999999.99)]],
      precioMercado: [null, [Validators.min(0), Validators.max(9.9999)]],
      fechaValorMercado: [null],
      valorMercadoUsd: [null, [Validators.min(0), Validators.max(9999999999999.99)]],
      codigoFuenteInfoMercado: [null],
      tasaRetornoTir: [null, [Validators.min(0), Validators.max(9.9999)]],
      valorPresenteUsd: [null, [Validators.min(0), Validators.max(9999999999999.99)]],
      provisionRequerida: [null, [Validators.min(0), Validators.max(9999999999999.99)]],
      provisionConstituida: [null, [Validators.min(0), Validators.max(9999999999999.99)]],
      gananciasPerdidasPeriodo: [null, [Validators.min(0), Validators.max(9999999999999.99)]],
      codigoCalificacionRiesgo: [null],
      codigoCategoriaCalificacion: [null],
      codigoCalificadoraRiesgo: [null],

      fechaUltimaCalificacion: [null, Validators.required],
      fechaLiquidacionVenta: [null, Validators.required],
      precioLiquidacionVenta: [null, Validators.required],
      valorFondoInversionUsd: [null, [Validators.required, Validators.min(0), Validators.max(9999999999999.99)]],

      codigoFondoInversion: [null],
      codigoTipoIdentificacionCustodio: [null],
      codigoIdentificacionCustodio: [null],
      codigoCalificacionRiesgoCustodio: [null],
      codigoCalificadoraRiesgoCustodio: [null],
      codigoSubsidiaria: [null]
    });
  }

  ngOnInit() {
    this.loadAllCatalogs()
  }

  closeModal(): void {
    this.isVisible = false;
    this.modalClosed.emit();
  }

  onSubmit(): void {
    this.formSubmitted = true;

    if (this.newEditRecordForm.valid) {
      const formData = this.newEditRecordForm.value;
      console.log('📌 Form Data:', formData);

      this.l03StructureService.saveL03(formData);

      this.newEditRecordForm.reset();
      this.formSubmitted = false;

      this.isVisible = false;
      this.modalClosed.emit();
    }
  }

  isInvalid(controlName: string) {
    const control = this.newEditRecordForm.get(controlName);
    return control?.invalid && (control.touched || this.formSubmitted);
  }

  private loadCatalogData(catalogName: string, arrayToFill: any[]): void {
    console.log(`Cargando catálogo: ${catalogName}`);
    this.genericCatalogservice.getAllByCatalog(catalogName).subscribe({
      next: (data) => {
        arrayToFill.push(...data);
      },
      error: (error) => {
        console.error(`Error al cargar ${catalogName}:`, error);
      }
    });
  }

  loadAllCatalogs() {
    this.loadCatalogData(Catalog.T4, this.arrayTipoIdentificacionEmisor);
    this.loadCatalogData(Catalog.T164, this.arrayIdentificacionEmisor); 
    this.loadCatalogData(Catalog.T70, this.arrayEstadoTitulo);    
    this.loadCatalogData(Catalog.T67, this.arrayCategoriaInversion);    
    this.loadCatalogData(Catalog.T68, this.arrayRangoVencimiento);    
    this.loadCatalogData(Catalog.T69, this.arrayFuenteInfoMercado);    
    this.loadCatalogData(Catalog.T65, this.arrayCalificacionRiesgo);    
    this.loadCatalogData(Catalog.T169, this.arrayCategoriaCalificacion);    
    this.loadCatalogData(Catalog.T66, this.arrayCalificadoraRiesgo);    
    this.loadCatalogData(Catalog.T79, this.arrayFondoInversion);    
    this.loadCatalogData(Catalog.T4, this.arrayTipoIdentificacionCustodio);    
    this.loadCatalogData(Catalog.T164, this.arrayIdentificacionCustodio);    
    this.loadCatalogData(Catalog.T65, this.arrayCalificacionRiesgoCustodio);    
    this.loadCatalogData(Catalog.T66, this.arrayCalificadoraRiesgoCustodio);    
  }
}