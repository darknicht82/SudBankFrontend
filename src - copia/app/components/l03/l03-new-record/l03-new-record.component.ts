import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GenericCatalogService } from '../../../services/catalogs/generic-catalog.service';
import { L03StructureService } from '../../../services/structures/l03/l03.service';

import { Catalog } from '../../../enums/catalog.enum';

declare var bootstrap: any;

@Component({
  selector: 'app-l03-new-record',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './l03-new-record.component.html',
  styleUrl: './l03-new-record.component.scss'
})
export class L03NewRecordComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() isVisible: boolean = false;
  @Output() modalClosed = new EventEmitter<void>();
  @Output() dataSaved = new EventEmitter<any>();

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
      fechaVencimiento: [null, Validators.required], // Agregado según manual
      codigoEstadoTitulo: [null, Validators.required],
      codigoCategoriaInversion: [null, Validators.required],
      codigoRangoVencimiento: [null, Validators.required],

      tasaInteresNominal: [null, [Validators.required, Validators.min(0), Validators.max(1)]],
      montoInteresesUsd: [null, [Validators.required, Validators.min(0), Validators.max(9999999999999.99)]],
      valorLibrosUsd: [null, [Validators.min(0), Validators.max(9999999999999.99)]],
      precioMercado: [null, [Validators.min(0), Validators.max(1)]],
      fechaValorMercado: [null],
      valorMercadoUsd: [null, [Validators.min(0), Validators.max(9999999999999.99)]],
      codigoFuenteInfoMercado: [null],
      tasaRetornoTir: [null, [Validators.min(0), Validators.max(1)]],
      valorPresenteUsd: [null, [Validators.min(0), Validators.max(9999999999999.99)]],
      provisionRequerida: [null, [Validators.min(0), Validators.max(9999999999999.99)]],
      provisionConstituida: [null, [Validators.min(0), Validators.max(9999999999999.99)]],
      gananciasPerdidasPeriodo: [null, [Validators.min(0), Validators.max(9999999999999.99)]],
      codigoCalificacionRiesgo: [null],
      codigoCategoriaCalificacion: [null],
      codigoCalificadoraRiesgo: [null],

      fechaUltimaCalificacion: [null], // No obligatorio según manual
      fechaLiquidacionVenta: [null], // No obligatorio según manual
      precioLiquidacionVenta: [null], // No obligatorio según manual
      valorFondoInversionUsd: [null, [Validators.min(0), Validators.max(9999999999999.99)]], // Campo 27 del manual - Fondo de inversión

      codigoFondoInversion: [null],
      codigoTipoIdentificacionCustodio: [null],
      codigoIdentificacionCustodio: [null],
      codigoCalificacionRiesgoCustodio: [null],
      codigoCalificadoraRiesgoCustodio: [null],
      codigoSubsidiaria: [null]
    });
  }

  ngOnInit() {
    this.loadAllCatalogs();
  }

  ngOnChanges() {
    console.log('🔍 L03 Modal - isVisible changed:', this.isVisible);
  }

  ngAfterViewInit() {
    // Inicializar tooltips de Bootstrap
    setTimeout(() => {
      const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
      tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
      });
    }, 100);
  }

  closeModal(): void {
    this.isVisible = false;
    this.modalClosed.emit();
  }

  onSubmit(): void {
    this.formSubmitted = true;
    
    // Marcar todos los campos como touched para mostrar errores
    this.newEditRecordForm.markAllAsTouched();

    if (this.newEditRecordForm.valid) {
      const formData = this.newEditRecordForm.value;
      
      this.l03StructureService.saveL03(formData).subscribe({
        next: (response) => {
          this.newEditRecordForm.reset();
          this.formSubmitted = false;
          this.isVisible = false;
          this.dataSaved.emit(response);
          this.modalClosed.emit();
        },
        error: (error) => {
          console.error('Error al guardar registro:', error);
          // No cerrar el modal si hay error, para que el usuario pueda corregir
        }
      });
    }
  }

  isInvalid(controlName: string) {
    const control = this.newEditRecordForm.get(controlName);
    return control?.invalid && (control.touched || this.formSubmitted);
  }

  getFormErrors(): any {
    const errors: any = {};
    Object.keys(this.newEditRecordForm.controls).forEach(key => {
      const control = this.newEditRecordForm.get(key);
      if (control && control.errors) {
        errors[key] = control.errors;
      }
    });
    return errors;
  }



  private loadCatalogData(catalogName: string, arrayToFill: any[]): void {
    this.genericCatalogservice.getAllByCatalog(catalogName).subscribe({
      next: (data) => {
        arrayToFill.push(...data);
      },
      error: (error) => {
        // Agregar datos mock para desarrollo si falla la API
        const mockData = this.getMockDataForCatalog(catalogName);
        if (mockData.length > 0) {
          arrayToFill.push(...mockData);
        }
      }
    });
  }

  private getMockDataForCatalog(catalogName: string): any[] {
    const mockData: { [key: string]: any[] } = {
      't4': [
        { id: 1, codigo: 'C', descripcion: 'Cédula' },
        { id: 2, codigo: 'P', descripcion: 'Pasaporte' },
        { id: 3, codigo: 'R', descripcion: 'RUC' }
      ],
      't164': [
        { id: 1, codigo: '001', descripcion: 'Emisor 1' },
        { id: 2, codigo: '002', descripcion: 'Emisor 2' }
      ],
      't70': [
        { id: 1, codigo: 'A', descripcion: 'Activo' },
        { id: 2, codigo: 'I', descripcion: 'Inactivo' }
      ],
      't67': [
        { id: 1, codigo: '01', descripcion: 'Categoría 1' },
        { id: 2, codigo: '02', descripcion: 'Categoría 2' }
      ],
      't68': [
        { id: 1, codigo: '01', descripcion: 'Rango 1' },
        { id: 2, codigo: '02', descripcion: 'Rango 2' }
      ],
      't69': [
        { id: 1, codigo: '01', descripcion: 'Fuente 1' },
        { id: 2, codigo: '02', descripcion: 'Fuente 2' }
      ],
      't65': [
        { id: 1, codigo: 'A', descripcion: 'Calificación A' },
        { id: 2, codigo: 'B', descripcion: 'Calificación B' }
      ],
      't169': [
        { id: 1, codigo: '01', descripcion: 'Categoría Calificación 1' },
        { id: 2, codigo: '02', descripcion: 'Categoría Calificación 2' }
      ],
      't66': [
        { id: 1, codigo: '01', descripcion: 'Calificadora 1' },
        { id: 2, codigo: '02', descripcion: 'Calificadora 2' }
      ],
      't79': [
        { id: 1, codigo: '01', descripcion: 'Fondo 1' },
        { id: 2, codigo: '02', descripcion: 'Fondo 2' }
      ]
    };
    return mockData[catalogName] || [];
  }

  loadAllCatalogs() {
    // Cargar catálogos críticos primero
    this.loadCatalogData(Catalog.T4, this.arrayTipoIdentificacionEmisor);
    this.loadCatalogData(Catalog.T164, this.arrayIdentificacionEmisor); 
    this.loadCatalogData(Catalog.T70, this.arrayEstadoTitulo);    
    this.loadCatalogData(Catalog.T67, this.arrayCategoriaInversion);    
    this.loadCatalogData(Catalog.T68, this.arrayRangoVencimiento);    
    
    // Cargar catálogos opcionales después
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