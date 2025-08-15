import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { L01RegulatoryService, L01RegulatoryData } from '../../../services/l01-regulatory.service';
import { L01CatalogService, L01Catalog } from '../../../services/l01-catalog.service';
import { L01ValidationService, ValidationResult } from '../../../services/l01-validation.service';

@Component({
  selector: 'app-l01-form',
  templateUrl: './l01-form.component.html',
  styleUrls: ['./l01-form.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class L01FormComponent implements OnInit {
  l01Form!: FormGroup;
  isSubmitting = false;
  isLoading = false;

  // Catálogos
  tabla4Catalogs: L01Catalog[] = [];
  tabla73Catalogs: L01Catalog[] = [];
  tabla173Catalogs: L01Catalog[] = [];
  tabla164Catalogs: L01Catalog[] = [];

  // Estados de validación
  validationResult: ValidationResult | null = null;
  showValidationResult = false;

  constructor(
    private fb: FormBuilder,
    private l01Service: L01RegulatoryService,
    private catalogService: L01CatalogService,
    private validationService: L01ValidationService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadCatalogs();
  }

  initForm(): void {
    this.l01Form = this.fb.group({
      tipoIdentificacion: ['', [Validators.required]],
      identificacion: ['', [Validators.required]],
      clasificacion: [null, [Validators.required]],
      tipo: [null, [Validators.required]]
    });

    // Suscribirse a cambios para validaciones en tiempo real
    this.l01Form.valueChanges.subscribe(() => {
      this.validateForm();
    });
  }

  loadCatalogs(): void {
    this.isLoading = true;

    // Cargar Tabla 4 (✅ DISPONIBLE)
    this.catalogService.getTabla4().subscribe({
      next: (catalogs) => {
        this.tabla4Catalogs = catalogs;
      },
      error: (error) => {
        console.error('Error cargando Tabla 4:', error);
      }
    });

    // Cargar Tabla 73 (❌ HARDCODEADO)
    this.catalogService.getTabla73().subscribe({
      next: (catalogs) => {
        this.tabla73Catalogs = catalogs;
      },
      error: (error) => {
        console.error('Error cargando Tabla 73:', error);
      }
    });

    // Cargar Tabla 173 (❌ HARDCODEADO)
    this.catalogService.getTabla173().subscribe({
      next: (catalogs) => {
        this.tabla173Catalogs = catalogs;
      },
      error: (error) => {
        console.error('Error cargando Tabla 173:', error);
      }
    });

    // Cargar Tabla 164 (❌ HARDCODEADO)
    this.catalogService.getTabla164().subscribe({
      next: (catalogs) => {
        this.tabla164Catalogs = catalogs;
      },
      error: (error) => {
        console.error('Error cargando Tabla 164:', error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  // Validación de campos
  isFieldInvalid(fieldName: string): boolean {
    const field = this.l01Form.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  // Validación en tiempo real
  validateForm(): void {
    if (this.l01Form.valid) {
      const formData = this.l01Form.value;
      const validations = this.validationService.validateL01Record(formData);
      const criticalErrors = this.validationService.getCriticalErrors(validations);
      
      if (criticalErrors.length > 0) {
        this.validationResult = criticalErrors[0]; // Mostrar el primer error crítico
      } else {
        this.validationResult = {
          valid: true,
          message: 'Formulario válido',
          severity: 'info'
        };
      }
      this.showValidationResult = true;
    } else {
      this.validationResult = null;
      this.showValidationResult = false;
    }
  }

  // Validación específica de identificación
  validateIdentificacion(): void {
    const tipoIdentificacion = this.l01Form.get('tipoIdentificacion')?.value;
    const identificacion = this.l01Form.get('identificacion')?.value;

    if (tipoIdentificacion && identificacion) {
      // Validación básica - el servicio de validación se implementará después
      const isValid = this.validateBasicIdentificacion(tipoIdentificacion, identificacion);
      if (!isValid) {
        this.l01Form.get('identificacion')?.setErrors({ invalid: true });
      } else {
        this.l01Form.get('identificacion')?.setErrors(null);
      }
    }
  }

  // Validación básica de identificación
  private validateBasicIdentificacion(tipo: string, identificacion: string): boolean {
    if (tipo === 'R') {
      // RUC: 13 dígitos numéricos
      return /^\d{13}$/.test(identificacion);
    } else if (tipo === 'X') {
      // Código extranjero: máximo 7 dígitos
      return /^\d{1,7}$/.test(identificacion);
    }
    return false;
  }

  // Obtener descripción de catálogo
  getCatalogDescription(tabla: string, codigo: string): string {
    let catalogs: L01Catalog[] = [];
    
    switch (tabla) {
      case 't4':
        catalogs = this.tabla4Catalogs;
        break;
      case 't73':
        catalogs = this.tabla73Catalogs;
        break;
      case 't173':
        catalogs = this.tabla173Catalogs;
        break;
      case 't164':
        catalogs = this.tabla164Catalogs;
        break;
    }

    const catalog = catalogs.find(c => c.codigo === codigo);
    return catalog ? catalog.descripcion : 'Código no encontrado';
  }

  // Validación del formulario
  onValidate(): void {
    if (this.l01Form.valid) {
      this.showValidationSuccess();
    } else {
      this.showValidationErrors();
    }
  }

  showValidationSuccess(): void {
    console.log('Formulario válido');
    alert('✅ Todos los datos son válidos');
  }

  showValidationErrors(): void {
    // Marcar todos los campos como tocados para mostrar errores
    Object.keys(this.l01Form.controls).forEach(key => {
      const control = this.l01Form.get(key);
      control?.markAsTouched();
    });
    
    console.log('Formulario inválido');
    alert('❌ Por favor, corrija los errores en el formulario');
  }

  // Envío del formulario
  onSubmit(): void {
    if (this.l01Form.valid) {
      this.isSubmitting = true;
      
      const formData: L01RegulatoryData = {
        id: 0,
        tipoIdentificacion: this.l01Form.value.tipoIdentificacion,
        identificacion: this.l01Form.value.identificacion,
        clasificacion: this.l01Form.value.clasificacion,
        tipo: this.l01Form.value.tipo,
        tipoEmisor: this.l01Form.value.tipo, // Usar el mismo valor que tipo
        codigoTipoIdentificacion: this.l01Form.value.tipoIdentificacion === 'R' ? 1 : 2,
        codigoEmisor: 0,
        codigoClasificacionEmisor: this.l01Form.value.clasificacion,
        codigoTipoEmisor: this.l01Form.value.tipo,
        usuarioCreacion: 'Christian Aguirre' // Usuario por defecto
      };

      // Validar duplicados antes de enviar
      this.l01Service.getAllL01Data().subscribe({
        next: (registrosExistentes: L01RegulatoryData[]) => {
          // Verificar duplicados
          const duplicado = registrosExistentes.find(r => 
            r.tipoIdentificacion === formData.tipoIdentificacion && 
            r.identificacion === formData.identificacion
          );

          if (duplicado) {
            alert(`❌ Ya existe un registro con el mismo tipo de identificación y número`);
            this.isSubmitting = false;
            return;
          }

          // Enviar al backend
          this.l01Service.createL01Data(formData).subscribe({
            next: (response: L01RegulatoryData) => {
              console.log('Registro L01 creado:', response);
              this.isSubmitting = false;
              alert('✅ Registro L01 creado exitosamente');
              this.onReset();
            },
            error: (error: any) => {
              console.error('Error creando registro L01:', error);
              this.isSubmitting = false;
              alert('❌ Error al crear el registro L01');
            }
          });
        },
        error: (error) => {
          console.error('Error verificando duplicados:', error);
          this.isSubmitting = false;
          alert('❌ Error al verificar duplicados');
        }
      });
    } else {
      this.showValidationErrors();
    }
  }

  // Limpiar formulario
  onReset(): void {
    this.l01Form.reset();
    
    // Marcar todos los campos como no tocados
    Object.keys(this.l01Form.controls).forEach(key => {
      const control = this.l01Form.get(key);
      control?.markAsUntouched();
    });

    this.validationResult = null;
    this.showValidationResult = false;
  }

  // Métodos de utilidad
  formatIdentificacion(value: string): string {
    if (!value) return '';
    
    // Si es RUC, formatear como XXX-XXXXXXX-X
    if (value.length === 13 && /^\d{13}$/.test(value)) {
      return `${value.substring(0, 3)}-${value.substring(3, 10)}-${value.substring(10)}`;
    }
    
    return value;
  }

  // Análisis de tipo de identificación
  getTipoIdentificacionClass(tipo: string): string {
    switch (tipo) {
      case 'R':
        return 'ruc-type';
      case 'X':
        return 'extranjero-type';
      default:
        return '';
    }
  }

  // Obtener mensaje de ayuda según tipo de identificación
  getHelpMessage(tipoIdentificacion: string): string {
    switch (tipoIdentificacion) {
      case 'R':
        return 'Ingrese el RUC de 13 dígitos (ej: 1234567890001)';
      case 'X':
        return 'Ingrese el código extranjero de 7 dígitos (ej: 1000001)';
      default:
        return 'Seleccione el tipo de identificación';
    }
  }
}
