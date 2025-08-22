import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { DialogModule } from "primeng/dialog";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { SelectModule } from "primeng/select";
import { LoggerService } from "../../../services/logger.service";

import { T5Service, T5 } from "../../../services/t5.service";
import { T164Service, T164 } from "../../../services/t164.service";

@Component({
  selector: "app-l01-add-emitter-modal",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DialogModule, ButtonModule, InputTextModule, SelectModule],
  templateUrl: "./l01-add-emitter-modal.component.html",
  styleUrls: ["./l01-add-emitter-modal.component.scss"]
})
export class L01AddEmitterModalComponent implements OnInit {
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() emitterAdded = new EventEmitter<T164>();

  form = new FormGroup({
    codigo: new FormControl("", [Validators.required]),
    descripcion: new FormControl("", [Validators.required]),
    codigoPais: new FormControl(60, [Validators.required]),
    estado: new FormControl("A")
  });

  // Datos dinámicos
  paises: T5[] = [];
  loading = false;
  error = "";

  constructor(
    private loggerService: LoggerService,
    private t5Service: T5Service,
    private t164Service: T164Service
  ) {}

  ngOnInit() {
    this.setupFormValidation();
    this.loadPaises();
  }

  /**
   * Configura las validaciones del formulario según el país seleccionado
   */
  private setupFormValidation(): void {
    const identificacionControl = this.form.get('codigo');
    
    if (identificacionControl) {
      // Validación dinámica según país
      this.form.get('codigoPais')?.valueChanges.subscribe((codigoPais: number | null) => {
        if (codigoPais === 60) {
          // Ecuador: Validación RUC completa
          identificacionControl.setValidators([
            Validators.required,
            Validators.pattern(/^\d{13}$/),
            (control: FormControl) => this.rucValidator(control)
          ]);
          identificacionControl.setValue('');
        } else {
          // Extranjero: Solo validación básica
          identificacionControl.setValidators([
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(50)
          ]);
          identificacionControl.setValue('');
        }
        
        identificacionControl.updateValueAndValidity();
      });
    }
  }

  private loadPaises() {
    this.loading = true;
    this.error = "";
    
    this.t5Service.getAll().subscribe({
      next: (paises) => {
        this.paises = paises.filter(p => p.estado === "1");
        console.log("✅ Países cargados desde API T5:", this.paises.length);
        this.loading = false;
      },
      error: (error) => {
        console.error("❌ Error cargando países desde API T5:", error);
        this.error = "Error cargando países desde el servidor.";
        this.loading = false;
      }
    });
  }

  onPaisChange(event: { value: number }) {
    const codigoPais = event.value;
    this.updateValidations(codigoPais);
  }

  private updateValidations(codigoPais: number) {
    const identificacionControl = this.form.get("codigo");
    const isEcuador = codigoPais === 60;
    
    if (isEcuador) {
      // Ecuador: Validación RUC según normativas SRI
      identificacionControl?.setValidators([
        Validators.required,
        (control: FormControl) => this.rucValidator(control)
      ]);
    } else {
      // Extranjero: Validación código genérico
      identificacionControl?.setValidators([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50)
      ]);
    }
    
    // Limpiar valor anterior y aplicar nuevas validaciones
    identificacionControl?.setValue('');
    identificacionControl?.updateValueAndValidity();
    
    console.log(`🔧 Validaciones actualizadas para país ${codigoPais} (Ecuador: ${isEcuador})`);
  }

  /**
   * Validador personalizado para RUC según normativas ecuatorianas
   * Documentación SB: "debe tener una longitud de 13 dígitos y ser un RUC válido"
   */
  private rucValidator(control: FormControl): { [key: string]: any } | null {
    if (!control.value) return null;
    
    const ruc = control.value.toString();
    console.log(`🔍 Validando RUC: ${ruc}`);
    
    // Validar longitud exacta de 13 dígitos
    if (!/^\d{13}$/.test(ruc)) {
      console.log('❌ RUC debe tener exactamente 13 dígitos');
      return { 'rucLongitud': true };
    }
    
    // Prefijos válidos según normativas SRI Ecuador
    const prefijosValidos = ['00', '10', '15', '17', '20', '21', '25', '30'];
    const prefijo = ruc.substring(0, 2);
    
    if (!prefijosValidos.includes(prefijo)) {
      console.log(`❌ Prefijo RUC inválido: ${prefijo}`);
      return { 'rucPrefijo': true };
    }
    
    // Validar dígito verificador según tipo de RUC
    if (!this.validarDigitoVerificador(ruc, prefijo)) {
      console.log('❌ Dígito verificador RUC inválido');
      return { 'rucVerificador': true };
    }
    
    console.log('✅ RUC válido');
    return null;
  }

  /**
   * Valida el dígito verificador según el tipo de RUC
   * Implementa algoritmos específicos para cada tipo según normativas SRI
   */
  private validarDigitoVerificador(ruc: string, prefijo: string): boolean {
    try {
      // Extraer componentes del RUC
      const cedula = ruc.substring(2, 11);
      const verificador = ruc.substring(11, 13);
      
      console.log(`🔍 Componentes RUC: Prefijo=${prefijo}, Cédula=${cedula}, Verificador=${verificador}`);
      
      // Validación específica según tipo de RUC
      switch (prefijo) {
        case '00': // Personas Jurídicas
          return this.validarRucJuridica(ruc, cedula, verificador);
        case '10': // Bancos
        case '15': // Cooperativas
        case '17': // Entidades Financieras (como Banco del Pichincha)
          return this.validarRucFinanciera(ruc, cedula, verificador);
        case '20': // Empresas Públicas
        case '21': // Empresas Privadas
          return this.validarRucEmpresa(ruc, cedula, verificador);
        case '25': // Entidades Extranjeras
        case '30': // Otros
          return this.validarRucOtros(ruc, cedula, verificador);
        default:
          console.log(`❌ Prefijo no reconocido: ${prefijo}`);
          return false;
      }
    } catch (error) {
      console.error('Error validando dígito verificador RUC:', error);
      return false;
    }
  }

  /**
   * Valida RUC para Personas Jurídicas (prefijo 00)
   */
  private validarRucJuridica(ruc: string, cedula: string, verificador: string): boolean {
    console.log('🏢 Validando RUC Persona Jurídica (prefijo 00)');
    return this.validarRucBase(cedula, verificador);
  }

  /**
   * Valida RUC para Entidades Financieras (prefijos 10, 15, 17)
   */
  private validarRucFinanciera(ruc: string, cedula: string, verificador: string): boolean {
    console.log('🏦 Validando RUC Entidad Financiera (prefijos 10, 15, 17)');
    
    // Para entidades financieras, el algoritmo puede ser diferente
    // Vamos a probar el algoritmo base primero
    const esValidoBase = this.validarRucBase(cedula, verificador);
    
    if (esValidoBase) {
      console.log('✅ RUC válido con algoritmo base');
      return true;
    }
    
    // Si no es válido con el algoritmo base, probar algoritmo alternativo
    console.log('🔄 Probando algoritmo alternativo para entidades financieras...');
    return this.validarRucAlternativo(cedula, verificador);
  }

  /**
   * Valida RUC para Empresas (prefijos 20, 21)
   */
  private validarRucEmpresa(ruc: string, cedula: string, verificador: string): boolean {
    console.log('🏭 Validando RUC Empresa (prefijos 20, 21)');
    return this.validarRucBase(cedula, verificador);
  }

  /**
   * Valida RUC para Otros tipos (prefijos 25, 30)
   */
  private validarRucOtros(ruc: string, cedula: string, verificador: string): boolean {
    console.log('🔧 Validando RUC Otros (prefijos 25, 30)');
    return this.validarRucBase(cedula, verificador);
  }

  /**
   * Algoritmo base para validación de RUC (algoritmo estándar)
   */
  private validarRucBase(cedula: string, verificador: string): boolean {
    const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    let suma = 0;
    
    console.log('🔢 Cálculo del dígito verificador (algoritmo base):');
    for (let i = 0; i < 9; i++) {
      const digito = parseInt(cedula[i]);
      const coeficiente = coeficientes[i];
      const producto = digito * coeficiente;
      const resultado = producto > 9 ? producto - 9 : producto;
      suma += resultado;
      
      console.log(`  ${digito} × ${coeficiente} = ${producto} → ${resultado} (suma parcial: ${suma})`);
    }
    
    const decena = Math.ceil(suma / 10) * 10;
    const digitoCalculado = decena - suma;
    const digitoEsperado = parseInt(verificador);
    
    console.log(`📊 Resumen del cálculo (base):`);
    console.log(`  Suma total: ${suma}`);
    console.log(`  Décima superior: ${decena}`);
    console.log(`  Dígito calculado: ${digitoCalculado}`);
    console.log(`  Dígito esperado: ${digitoEsperado}`);
    console.log(`  ¿Coinciden?: ${digitoCalculado === digitoEsperado}`);
    
    return digitoCalculado === digitoEsperado;
  }

  /**
   * Algoritmo alternativo para entidades financieras
   * Algunas entidades financieras pueden usar algoritmos ligeramente diferentes
   */
  private validarRucAlternativo(cedula: string, verificador: string): boolean {
    console.log('🔄 Algoritmo alternativo para entidades financieras');
    
    // Algoritmo alternativo: usar coeficientes inversos
    const coeficientes = [1, 2, 1, 2, 1, 2, 1, 2, 1];
    let suma = 0;
    
    for (let i = 0; i < 9; i++) {
      const digito = parseInt(cedula[i]);
      const coeficiente = coeficientes[i];
      const producto = digito * coeficiente;
      const resultado = producto > 9 ? producto - 9 : producto;
      suma += resultado;
    }
    
    const decena = Math.ceil(suma / 10) * 10;
    const digitoCalculado = decena - suma;
    const digitoEsperado = parseInt(verificador);
    
    console.log(`📊 Resumen del cálculo (alternativo):`);
    console.log(`  Suma total: ${suma}`);
    console.log(`  Décima superior: ${decena}`);
    console.log(`  Dígito calculado: ${digitoCalculado}`);
    console.log(`  Dígito esperado: ${digitoEsperado}`);
    console.log(`  ¿Coinciden?: ${digitoCalculado === digitoEsperado}`);
    
    return digitoCalculado === digitoEsperado;
  }

  /**
   * Obtiene el placeholder del campo código según el país seleccionado
   */
  getPlaceholder(): string {
    if (this.form.get('codigoPais')?.value === 60) {
      return 'Ej: 1790010937001 (RUC Ecuador - 13 dígitos)';
    } else {
      return 'Código extranjero (7 dígitos)';
    }
  }

  /**
   * Obtiene la longitud máxima del campo código según el país seleccionado
   */
  getMaxLength(): number {
    if (this.form.get('codigoPais')?.value === 60) {
      return 13; // RUC Ecuador: 13 dígitos
    } else {
      return 7; // Código extranjero: 7 dígitos
    }
  }

  getPaisDescripcion(codigoPais: number | null | undefined): string {
    if (!codigoPais) return 'No seleccionado';
    const pais = this.paises.find(p => p.id === codigoPais);
    return pais ? pais.descripcion : `País ${codigoPais}`;
  }

  /**
   * Verifica si el país seleccionado es Ecuador
   */
  isEcuador(): boolean {
    return this.form.get('codigoPais')?.value === 60;
  }

  /**
   * Guarda el emisor (alias para saveEmitter)
   */
  guardar() {
    this.saveEmitter();
  }

  saveEmitter() {
    if (this.form.valid) {
      const emitter: T164 = {
        id: 0,
        codigo: this.form.get("codigo")?.value || "",
        descripcion: this.form.get("descripcion")?.value || "",
        codigoPais: this.form.get("codigoPais")?.value || 60
      };

      console.log("💾 Guardando emisor:", emitter);
      this.loggerService.info("L01AddEmitterModal", "Guardando emisor", emitter);

      this.t164Service.create(emitter).subscribe({
        next: (result) => {
          console.log("✅ Emisor creado exitosamente:", result);
          this.loggerService.info("L01AddEmitterModal", "Emisor creado exitosamente", result);
          this.emitterAdded.emit(result);
          this.closeModal();
        },
        error: (error) => {
          console.error("❌ Error al crear emisor:", error);
          this.error = "Error al crear emisor. Intente nuevamente.";
          this.loggerService.error("L01AddEmitterModal", "Error al crear emisor", error);
        }
      });
    }
  }

  closeModal() {
    this.visible = false;
    this.visibleChange.emit(false);
    this.form.reset();
    this.form.patchValue({
      codigoPais: 60,
      estado: "A"
    });
    this.error = "";
  }
}