import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { R07CatalogService, R07Data, CatalogItem } from '../../../services/r07-catalog.service';
import { R07_FIELD_TOOLTIPS } from '../../../utils/r07-field-tooltips';

@Component({
  selector: 'app-r07-modal-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './r07-modal-form.component.html',
  styleUrls: ['./r07-modal-form.component.scss']
})
export class R07ModalFormComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Input() r07Data: R07Data | null = null;
  @Input() isEdit: boolean = false;
  @Output() modalClosed = new EventEmitter<void>();
  @Output() saveData = new EventEmitter<R07Data>();

  r07Form: FormGroup;
  fieldTooltips = R07_FIELD_TOOLTIPS;

  // Catalog data
  tipoIdentificacionOptions: CatalogItem[] = [];
  tipoGarantiaOptions: CatalogItem[] = [];
  ubicacionPaisOptions: CatalogItem[] = [];
  ubicacionProvinciaOptions: CatalogItem[] = [];
  ubicacionCantonOptions: CatalogItem[] = [];
  estadoRegistroOptions: CatalogItem[] = [];

  constructor(
    private fb: FormBuilder,
    private r07Service: R07CatalogService
  ) {
    this.r07Form = this.createForm();
  }

  ngOnInit(): void {
    this.loadCatalogs();
    if (this.r07Data && this.isEdit) {
      this.loadFormData();
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      tipoIdentificacionSujeto: ['', Validators.required],
      identificacionSujeto: ['', [Validators.required, Validators.maxLength(13)]],
      numeroOperacion: ['', [Validators.required, Validators.maxLength(32)]],
      numeroGarantia: ['', [Validators.required, Validators.maxLength(32)]],
      tipoGarantia: ['', Validators.required],
      descripcionGarantia: ['', [Validators.required, Validators.maxLength(120)]],
      ubicacionGarantiaPais: ['', Validators.required],
      ubicacionGarantiaProvincia: [''],
      ubicacionGarantiaCanton: [''],
      valorAvaluoTitulo: ['', [Validators.required, Validators.min(0)]],
      fechaAvaluo: ['', Validators.required],
      numeroRegistroGarantia: ['', Validators.maxLength(20)],
      fechaContabilizacionGarantia: ['', Validators.required],
      porcentajeCubreGarantia: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      estadoRegistro: ['', Validators.required]
    });
  }

  private loadFormData(): void {
    if (this.r07Data) {
      this.r07Form.patchValue({
        tipoIdentificacionSujeto: this.r07Data.tipoIdentificacionSujeto,
        identificacionSujeto: this.r07Data.identificacionSujeto,
        numeroOperacion: this.r07Data.numeroOperacion,
        numeroGarantia: this.r07Data.numeroGarantia,
        tipoGarantia: this.r07Data.tipoGarantia,
        descripcionGarantia: this.r07Data.descripcionGarantia,
        ubicacionGarantiaPais: this.r07Data.ubicacionGarantiaPais,
        ubicacionGarantiaProvincia: this.r07Data.ubicacionGarantiaProvincia,
        ubicacionGarantiaCanton: this.r07Data.ubicacionGarantiaCanton,
        valorAvaluoTitulo: this.r07Data.valorAvaluoTitulo,
        fechaAvaluo: this.r07Data.fechaAvaluo,
        numeroRegistroGarantia: this.r07Data.numeroRegistroGarantia,
        fechaContabilizacionGarantia: this.r07Data.fechaContabilizacionGarantia,
        porcentajeCubreGarantia: this.r07Data.porcentajeCubreGarantia,
        estadoRegistro: this.r07Data.estadoRegistro
      });
    }
  }

  private loadCatalogs(): void {
    this.loadTipoIdentificacion();
    this.loadTipoGarantia();
    this.loadUbicacionPais();
    this.loadEstadoRegistro();
  }

  private loadTipoIdentificacion(): void {
    this.r07Service.getCatalogT4().subscribe({
      next: (response) => {
        this.tipoIdentificacionOptions = response;
      },
      error: (error) => {
        console.error('Error loading T4 catalog:', error);
      }
    });
  }

  private loadTipoGarantia(): void {
    this.r07Service.getCatalogT42().subscribe({
      next: (response) => {
        this.tipoGarantiaOptions = response;
      },
      error: (error) => {
        console.error('Error loading T42 catalog:', error);
      }
    });
  }

  private loadUbicacionPais(): void {
    this.r07Service.getCatalogT5().subscribe({
      next: (response) => {
        this.ubicacionPaisOptions = response;
      },
      error: (error) => {
        console.error('Error loading T5 catalog:', error);
      }
    });
  }

  private loadUbicacionProvincia(): void {
    const pais = this.r07Form.get('ubicacionGarantiaPais')?.value;
    if (pais === 'EC') {
      this.r07Service.getCatalogT6().subscribe({
        next: (response) => {
          this.ubicacionProvinciaOptions = response;
        },
        error: (error) => {
          console.error('Error loading T6 catalog:', error);
        }
      });
    }
  }

  private loadUbicacionCanton(): void {
    const pais = this.r07Form.get('ubicacionGarantiaPais')?.value;
    if (pais === 'EC') {
      this.r07Service.getCatalogT7().subscribe({
        next: (response) => {
          this.ubicacionCantonOptions = response;
        },
        error: (error) => {
          console.error('Error loading T7 catalog:', error);
        }
      });
    }
  }

  private loadEstadoRegistro(): void {
    this.r07Service.getCatalogT47().subscribe({
      next: (response) => {
        this.estadoRegistroOptions = response;
      },
      error: (error) => {
        console.error('Error loading T47 catalog:', error);
      }
    });
  }

  onPaisChange(): void {
    this.loadUbicacionProvincia();
    this.loadUbicacionCanton();
    // Clear province and canton when country changes
    this.r07Form.patchValue({
      ubicacionGarantiaProvincia: '',
      ubicacionGarantiaCanton: ''
    });
  }

  onSubmit(): void {
    if (this.r07Form.valid) {
      const formData = this.r07Form.value;
      const r07Data: R07Data = {
        id: this.isEdit ? this.r07Data?.id || 0 : 0,
        ...formData
      };
      this.saveData.emit(r07Data);
      this.modalClosed.emit();
    } else {
      console.error('Form is invalid');
    }
  }

  onCancel(): void {
    this.modalClosed.emit();
  }

  getFieldTooltip(fieldName: string): string {
    return this.fieldTooltips[fieldName as keyof typeof this.fieldTooltips] || '';
  }
}
