import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { L01Record } from '../../../services/l01/l01.service';
import { L01CatalogService } from '../../../services/l01/l01-catalog.service';

// PrimeNG Components (solo los necesarios)
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-l01-nuevo-registro-nes',
  templateUrl: './l01-nuevo-registro-nes.component.html',
  styleUrls: ['./l01-nuevo-registro-nes.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DropdownModule, CalendarModule, InputNumberModule]
})
export class L01NuevoRegistroNesComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Input() editData: L01Record | null = null;
  @Output() modalClosed = new EventEmitter<void>();
  @Output() dataSaved = new EventEmitter<L01Record>();

  l01Form: FormGroup;
  isSubmitting: boolean = false;
  // ❌ [DESHABILITADO] Propiedades de validación
  // VALIDACIONES DESHABILITADAS - NO SE USA MÁS
  /*
  showValidationResult: boolean = false;
  */
  isModalProtected: boolean = false; // Protección contra cierre automático
  // ❌ [DESHABILITADO] Propiedades de validación
  // VALIDACIONES DESHABILITADAS - NO SE USA MÁS
  /*
  validationResult: ValidationResult = {
    valid: true,
    message: '',
    severity: 'info'
  };
  */

  // Catálogos
  tiposIdentificacion: any[] = [];
  clasificaciones: any[] = [];
  tiposEmisor: any[] = [];
  codigosExtranjeros: any[] = [];
  emisoresT164: any[] = []; // ✅ NUEVO: Lista de emisores/custodios de T164
  emisoresFiltrados: any[] = []; // ✅ NUEVO: Lista filtrada por tipo de identificación

  constructor(
    private fb: FormBuilder,
    private catalogService: L01CatalogService
  ) {
    // SOLO LOS 4 CAMPOS OFICIALES L01 SEGÚN MANUAL SB MARZO 2017
    this.l01Form = this.fb.group({
      // Campo 1: Tipo de identificación (R/X) - Tabla 4
      tipoIdentificacion: ['', Validators.required],
      
      // Campo 2: Identificación (RUC o código extranjero) - Tabla 164
      identificacion: [null, Validators.required], // ✅ CAMBIADO: null para dropdown
      
      // Campo 3: Clasificación (1-4) - Tabla 173
      clasificacion: [null, Validators.required],
      
      // Campo 4: Tipo de emisor (sectores económicos) - Tabla 73
      tipoEmisor: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCatalogs();
    this.setupFormValidation(); // ✅ REHABILITADO: Para filtrar emisores por tipo
  }

  ngOnChanges(): void {
    // Solo ejecutar cuando realmente hay cambios en editData, no en isVisible
    if (this.editData && this.isVisible) {
      this.populateForm();
    }
  }

  /**
   * Carga los catálogos necesarios para el formulario
   */
  private loadCatalogs(): void {
    // Cargar Tipo de Identificación (T4) - Solo R y X para L01
    this.catalogService.getTabla4().subscribe({
      next: (data) => {
        console.log('🔍 [DEBUG] Datos crudos de Tabla 4 recibidos:', data);
        console.log('🔍 [DEBUG] Estructura del primer item:', data[0]);
        
        // Filtrar solo los tipos válidos para L01: R (RUC) y X (Extranjero)
        this.tiposIdentificacion = data.filter(item => 
          item.codigo === 'R' || item.codigo === 'X'
        );
        
        console.log('✅ [DEBUG] Tipos de identificación L01 filtrados:', this.tiposIdentificacion);
        console.log('✅ [DEBUG] Códigos disponibles:', this.tiposIdentificacion.map(item => item.codigo));
        console.log('✅ [DEBUG] Descripciones disponibles:', this.tiposIdentificacion.map(item => item.descripcion));
      },
      error: (error) => {
        console.error('Error al cargar Tipos de Identificación:', error);
      }
    });

    // Cargar Clasificaciones (T173) - Solo 1, 2, 3, 4 para L01
    this.catalogService.getTabla173().subscribe({
      next: (data) => {
        console.log('🔍 [DEBUG] Datos crudos de Tabla 173 recibidos:', data);
        console.log('🔍 [DEBUG] Estructura del primer item:', data[0]);
        
        // Filtrar solo las clasificaciones válidas para L01
        this.clasificaciones = data.filter(item => 
          ['1', '2', '3', '4'].includes(item.codigo)
        );
        
        console.log('✅ [DEBUG] Clasificaciones L01 filtradas:', this.clasificaciones);
        console.log('✅ [DEBUG] Códigos disponibles:', this.clasificaciones.map(item => item.codigo));
        console.log('✅ [DEBUG] Descripciones disponibles:', this.clasificaciones.map(item => item.descripcion));
      },
      error: (error) => {
        console.error('Error al cargar Clasificaciones:', error);
      }
    });

    // Cargar Tipos de Emisor (T73) - Solo los válidos para L01
    this.catalogService.getTabla73().subscribe({
      next: (data) => {
        console.log('🔍 [DEBUG] Datos crudos de Tabla 73 recibidos:', data);
        console.log('🔍 [DEBUG] Estructura del primer item:', data[0]);
        
        // Filtrar solo los tipos válidos para L01 (excluir 1 y 6 según manual)
        this.tiposEmisor = data.filter(item => 
          ['0', '2', '3', '4', '5', '7', '8', '9'].includes(item.codigo)
        );
        
        console.log('✅ [DEBUG] Tipos de emisor L01 filtrados:', this.tiposEmisor);
        console.log('✅ [DEBUG] Códigos disponibles:', this.tiposEmisor.map(item => item.codigo));
        console.log('✅ [DEBUG] Descripciones disponibles:', this.tiposEmisor.map(item => item.descripcion));
      },
      error: (error) => {
        console.error('Error al cargar Tipos de Emisor:', error);
      }
    });

    // Cargar Códigos Extranjeros (T164)
    this.catalogService.getTabla164().subscribe({
      next: (data) => {
        this.codigosExtranjeros = data;
        console.log('Códigos extranjeros cargados:', this.codigosExtranjeros);
      },
      error: (error) => {
        console.error('Error al cargar Códigos Extranjeros:', error);
      }
    });

    // ✅ NUEVO: Cargar Emisores/Custodios T164 (para dropdown de identificación)
    this.catalogService.getTabla164().subscribe({
      next: (data) => {
        this.emisoresT164 = data;
        console.log('✅ [DEBUG] Emisores T164 cargados:', this.emisoresT164.length);
        console.log('✅ [DEBUG] Primer emisor:', this.emisoresT164[0]);
      },
      error: (error) => {
        console.error('❌ Error al cargar Emisores T164:', error);
      }
    });
  }

  /**
   * ✅ REHABILITADO: Configura las validaciones del formulario
   * AHORA FILTRA EMISORES POR TIPO DE IDENTIFICACIÓN
   */
  private setupFormValidation(): void {
    // Filtrar emisores cuando cambie el tipo de identificación
    this.l01Form.get('tipoIdentificacion')?.valueChanges.subscribe(tipo => {
      console.log('🔄 [DEBUG] Tipo de identificación cambiado a:', tipo);
      
      if (tipo === 'R') {
        // Para RUC: mostrar solo emisores nacionales (que empiecen con números)
        this.emisoresFiltrados = this.emisoresT164.filter(emisor => 
          /^\d/.test(emisor.codigo) // Código que empiece con número
        );
        console.log('✅ [DEBUG] Emisores RUC filtrados:', this.emisoresFiltrados.length);
      } else if (tipo === 'X') {
        // Para extranjeros: mostrar solo emisores extranjeros (que empiecen con letras)
        this.emisoresFiltrados = this.emisoresT164.filter(emisor => 
          /^[A-Z]/.test(emisor.codigo) // Código que empiece con letra
        );
        console.log('✅ [DEBUG] Emisores extranjeros filtrados:', this.emisoresFiltrados.length);
      } else {
        // Sin tipo seleccionado: lista vacía
        this.emisoresFiltrados = [];
        console.log('⚠️ [DEBUG] Sin tipo seleccionado, lista vacía');
      }
      
      // Resetear el campo de identificación cuando cambie el tipo
      this.l01Form.get('identificacion')?.setValue(null);
      this.l01Form.get('identificacion')?.updateValueAndValidity();
      
      console.log('✅ [DEBUG] Campo identificación reseteado y emisores filtrados');
    });
  }

  /**
   * Pobla el formulario con datos para edición
   */
  private populateForm(): void {
    if (this.editData) {
      this.l01Form.patchValue(this.editData);
    }
  }

  /**
   * Resetea el formulario para nuevo registro
   */
  private resetForm(): void {
    console.log('🔄 [DEBUG] Iniciando resetForm');
    console.log('🔄 [DEBUG] Estado del modal antes de reset: isVisible =', this.isVisible);
    
    try {
      this.l01Form.reset({
        tipoIdentificacion: '',
        identificacion: null, // ✅ CAMBIADO: null para dropdown
        clasificacion: null,
        tipoEmisor: null
      });
      
      // ❌ [DESHABILITADO] Validaciones deshabilitadas
      // this.showValidationResult = false;
      this.isSubmitting = false;
      
      console.log('✅ [DEBUG] Formulario reseteado exitosamente');
      console.log('✅ [DEBUG] Estado del modal después de reset: isVisible =', this.isVisible);
      console.log('✅ [DEBUG] Valores del formulario:', this.l01Form.value);
    } catch (error) {
      console.error('❌ [DEBUG] Error al resetear formulario:', error);
    }
  }

  /**
   * Abre el modal para crear nuevo registro
   */
  openCreateModal(): void {
    console.log('🔄 [DEBUG] Iniciando apertura de modal de creación');
    console.log('🔄 [DEBUG] Estado antes: isVisible =', this.isVisible, 'editData =', this.editData);
    
    this.editData = null;
    this.isVisible = true;
    this.isModalProtected = true; // Activar protección
    
    console.log('🔄 [DEBUG] Estado después: isVisible =', this.isVisible, 'editData =', this.editData);
    console.log('🔄 [DEBUG] Protección activada: isModalProtected =', this.isModalProtected);
    
    // Esperar un tick para que el DOM se actualice antes de resetear
    setTimeout(() => {
      console.log('🔄 [DEBUG] Ejecutando resetForm después de tick');
      this.resetForm();
      console.log('✅ [DEBUG] Modal de creación abierto y formulario reseteado');
      console.log('✅ [DEBUG] Estado final: isVisible =', this.isVisible);
      console.log('✅ [DEBUG] Protección activa: isModalProtected =', this.isModalProtected);
    }, 0);
  }

  /**
   * Abre el modal para editar registro existente
   */
  openEditModal(data: L01Record): void {
    console.log('🔄 [DEBUG] Iniciando apertura de modal de edición');
    console.log('🔄 [DEBUG] Estado antes: isVisible =', this.isVisible, 'editData =', this.editData);
    
    this.editData = data;
    this.isVisible = true;
    
    console.log('🔄 [DEBUG] Estado después: isVisible =', this.isVisible, 'editData =', data);
    
    // Esperar un tick para que el DOM se actualice antes de poblar
    setTimeout(() => {
      console.log('🔄 [DEBUG] Ejecutando populateForm después de tick');
      this.populateForm();
      console.log('✅ [DEBUG] Modal de edición abierto para:', data);
      console.log('✅ [DEBUG] Estado final: isVisible =', this.isVisible);
    }, 0);
  }

  /**
   * ❌ [DESHABILITADO] Valida el formulario antes de enviar
   * VALIDACIONES DESHABILITADAS - NO SE USA MÁS
   */
  /*
  private validateForm(): boolean {
    const formData = this.l01Form.value;
    const validations = this.validationService.validateL01Record(formData);
    const criticalErrors = this.validationService.getCriticalErrors(validations);

    if (criticalErrors.length > 0) {
      this.validationResult = criticalErrors[0];
      this.showValidationResult = true;
      return false;
    }

    this.validationResult = {
      valid: true,
      message: 'Formulario válido',
      severity: 'info'
    };
    this.showValidationResult = true;
    return true;
  }
  */

  /**
   * ❌ [DESHABILITADO] Valida el formulario con datos ya convertidos (números)
   * VALIDACIONES DESHABILITADAS - NO SE USA MÁS
   */
  /*
  private validateFormWithData(data: L01Record): boolean {
    console.log('🔧 [FIX] Iniciando validación con datos convertidos:', data);
    
    const validations = this.validationService.validateL01Record(data);
    const criticalErrors = this.validationService.getCriticalErrors(validations);

    if (criticalErrors.length > 0) {
      this.validationResult = criticalErrors[0];
      this.showValidationResult = true;
      console.log('❌ [FIX] Validación falló:', criticalErrors[0]);
      return false;
    }

    this.validationResult = {
      valid: true,
      message: 'Formulario válido',
      severity: 'info'
    };
    this.showValidationResult = true;
    console.log('✅ [FIX] Validación exitosa con datos convertidos');
    return true;
  }
  */

  /**
   * 🚀 [SIN VALIDACIONES] Maneja el envío del formulario
   * VALIDACIONES DESHABILITADAS - SE GUARDAN CÓDIGOS DIRECTOS DE CATÁLOGOS
   */
  onSubmit(): void {
    if (this.l01Form.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.isSubmitting = true;
    const formData = this.l01Form.value;

    // 🔍 [DEBUG] Log detallado de datos antes de enviar
    console.log('🔍 [DEBUG] ===== DATOS DEL FORMULARARIO ANTES DE ENVIAR =====');
    console.log('🔍 [DEBUG] Formulario completo:', this.l01Form.value);
    console.log('🔍 [DEBUG] Tipo Identificación:', formData.tipoIdentificacion, 'Tipo:', typeof formData.tipoIdentificacion);
    console.log('🔍 [DEBUG] Identificación:', formData.identificacion, 'Tipo:', typeof formData.tipoIdentificacion);
    console.log('🔍 [DEBUG] Clasificación:', formData.clasificacion, 'Tipo:', typeof formData.clasificacion);
    console.log('🔍 [DEBUG] Tipo Emisor:', formData.tipoEmisor, 'Tipo:', typeof formData.tipoEmisor);
    
    // 🔍 [DEBUG] Verificar valores de catálogos
    console.log('🔍 [DEBUG] ===== VERIFICACIÓN DE CATÁLOGOS =====');
    console.log('🔍 [DEBUG] Tipos Identificación disponibles:', this.tiposIdentificacion);
    console.log('🔍 [DEBUG] Clasificaciones disponibles:', this.clasificaciones);
    console.log('🔍 [DEBUG] Tipos Emisor disponibles:', this.tiposEmisor);
    console.log('🔍 [DEBUG] Códigos Extranjeros disponibles:', this.codigosExtranjeros);
    console.log('🔍 [DEBUG] ===== FIN DEBUG =====');

    // 🚀 [SIN VALIDACIONES] PREPARAR DATOS PARA ENVÍO DIRECTO
    // AHORA SE ENVÍAN LOS IDs DE FK CORRECTOS PARA LA BASE DE DATOS
    const dataToSend: L01Record = {
      tipoIdentificacion: formData.tipoIdentificacion,        // string (R/X) - Código directo
      identificacion: formData.identificacion,                // string - Código directo
      clasificacion: formData.clasificacion,                  // number - ID de T173 (FK)
      tipoEmisor: formData.tipoEmisor                         // number - ID de T73 (FK)
    };

    console.log('🚀 [SIN VALIDACIONES] Datos preparados para envío directo:', dataToSend);
    console.log('🚀 [SIN VALIDACIONES] Tipos de datos:');
    console.log('  - clasificacion:', dataToSend.clasificacion, 'Tipo:', typeof dataToSend.clasificacion, '(ID de T173)');
    console.log('  - tipoEmisor:', dataToSend.tipoEmisor, 'Tipo:', typeof dataToSend.tipoEmisor, '(ID de T73)');
    console.log('🚀 [SIN VALIDACIONES] AHORA SE ENVÍAN IDs DE FK CORRECTOS PARA LA BASE DE DATOS');

    // 🚀 [SIN VALIDACIONES] ENVIAR DATOS SIN VALIDACIÓN
    // Ahora se envían IDs de FK correctos para la base de datos
    this.dataSaved.emit(dataToSend);
    
    // Cerrar modal después de un breve delay
    setTimeout(() => {
      this.closeModal();
      this.isSubmitting = false;
    }, 1000);
  }

  /**
   * Marca todos los campos del formulario como tocados
   */
  private markFormGroupTouched(): void {
    Object.keys(this.l01Form.controls).forEach(key => {
      const control = this.l01Form.get(key);
      control?.markAsTouched();
    });
  }

  /**
   * Cierra el modal
   */
  closeModal(): void {
    console.log('🔄 [DEBUG] Ejecutando closeModal');
    console.log('🔄 [DEBUG] Estado antes de cerrar: isVisible =', this.isVisible);
    console.log('🔄 [DEBUG] Protección activa: isModalProtected =', this.isModalProtected);
    console.log('🔄 [DEBUG] Stack trace:', new Error().stack);
    
    // Verificar si el modal está protegido
    if (this.isModalProtected) {
      console.log('⚠️ [DEBUG] Modal está protegido, verificando si se puede cerrar');
      
      // Solo permitir cierre si no se está enviando el formulario
      if (this.isSubmitting) {
        console.log('❌ [DEBUG] No se puede cerrar: formulario en envío');
        return;
      }
      
      // Desactivar protección para permitir cierre manual
      this.isModalProtected = false;
      console.log('✅ [DEBUG] Protección desactivada, permitiendo cierre');
    }
    
    this.isVisible = false;
    this.modalClosed.emit();
    
    console.log('✅ [DEBUG] Modal cerrado: isVisible =', this.isVisible);
  }

  /**
   * Obtiene el texto del botón de envío
   */
  getSubmitButtonText(): string {
    if (this.isSubmitting) {
      return 'Guardando...';
    }
    return this.editData ? 'Actualizar' : 'Crear';
  }

  /**
   * Obtiene el título del modal
   */
  getModalTitle(): string {
    return this.editData ? 'Editar Registro L01' : 'Crear Nuevo Registro L01';
  }

  /**
   * ✅ NUEVO: Obtiene el placeholder dinámico para el campo identificación
   */
  getIdentificacionPlaceholder(): string {
    const tipo = this.l01Form.get('tipoIdentificacion')?.value;
    
    if (!tipo) {
      return 'Primero seleccione el tipo de identificación';
    } else if (tipo === 'R') {
      return 'Seleccione emisor nacional (RUC)';
    } else if (tipo === 'X') {
      return 'Seleccione emisor extranjero';
    }
    
    return 'Seleccione emisor/custodio';
  }

  /**
   * ❌ [DESHABILITADO] Verifica si un campo es inválido y ha sido tocado
   * VALIDACIONES DESHABILITADAS - NO SE USA MÁS
   */
  /*
  isFieldInvalid(fieldName: string): boolean {
    const field = this.l01Form.get(fieldName);
    return field ? field.invalid && field.touched : false;
  }
  */

  /**
   * ❌ [DESHABILITADO] Obtiene el mensaje de error para un campo
   * VALIDACIONES DESHABILITADAS - NO SE USA MÁS
   */
  /*
  getFieldError(fieldName: string): string {
    const field = this.l01Form.get(fieldName);
    if (field && field.errors) {
      if (field.errors['required']) {
        return 'Este campo es obligatorio';
      }
      if (field.errors['invalid']) {
        return 'Valor inválido';
      }
    }
    return '';
  }
  */
}
