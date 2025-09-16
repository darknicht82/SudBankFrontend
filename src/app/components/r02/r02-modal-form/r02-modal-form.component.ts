import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule, Form } from '@angular/forms';
import { T4Service } from '../../../services/t4.service';
import { T33Service } from '../../../services/t33.service';
import { T37Service } from '../../../services/t37service';
import { T5Service } from '../../../services/t5.service';
import { GenericCatalogService } from '../../../services/catalogs/generic-catalog.service';
import { R02CatalogService } from '../../../services/r02-catalog.service';

@Component({
  selector: 'app-r02-modal-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './r02-modal-form.component.html',
  styleUrl: './r02-modal-form.component.scss'
})
export class R02ModalFormComponent implements OnInit{

  @Input() isVisible: boolean = false;
  @Output() modalClosed = new EventEmitter<void>();

  arrayTipoIdentificacion: any[] = [];
  arrayMonedaDenominacion: any[] = [];
  arrayLineaCredito: any[] = [];
  arrayPeriodicidadPago: any[] = [];
  arrayOficinaConcesion: any[] = [];
  arrayGaranteGarantias: any[] = [];
  arrayIndicadorOperacionesExenta: any[] = [];
  arrayTipoCredito: any[] = [];
  arrayClaseCredito: any[] = [];
  arrayEstadoOperacion: any[] = [];
  arraySituacionOperacion: any[] = [];
  arrayTipoOperacion: any[] = [];
  arrayDestinoFinanciero: any[] = [];
  arrayActividadEconomica: any[] = [];
  arrayDestinoPais: any[] = [];
  arrayDestinoProvincia: any[] = [];
  arrayDestinoCanton: any[] = [];
  arrayDestinoParroquia: any[] = [];
  arrayNivelEstudios: any[] = [];
  arrayDestinoCreditoInmuebles: any[] = [];
  r02Form: FormGroup;
  formSubmitted = false;
  constructor(private fb: FormBuilder, 
    private t4service: T4Service,
    private t33Service: T33Service,
    private t37Service: T37Service,
    private T38Service: GenericCatalogService,
    private T3Service: GenericCatalogService,
    private T209Service: GenericCatalogService,
    private T25Service: GenericCatalogService,
    private T31Service: GenericCatalogService,
    private T207Service: GenericCatalogService,
    private T32Service: GenericCatalogService,
    private T32AService: GenericCatalogService,
    private T35Service: GenericCatalogService,
    private T366Service: GenericCatalogService,
    private T28Service: GenericCatalogService,
    private T5Service: T5Service,
    private T6Service: GenericCatalogService,
    private T7Service: GenericCatalogService,
    private T50Service: GenericCatalogService,
    private T212Service: GenericCatalogService,
    private T235Service: GenericCatalogService,
    private R02catalogService: R02CatalogService) {
    this.r02Form = this.fb.group({
      tipoIdentificacion: [null, Validators.required],
      identificacionSujeto: [null, Validators.required],
      numeroOperacion: [null, Validators.required],
      valorOperacion: [null, Validators.required],
      tasaInteresNominal: [null, Validators.required],
      tea: [null, Validators.required],
      codigoMoneda: [null, Validators.required],
      fechaConcesion: [null, Validators.required],
      fechaVencimiento: [null, Validators.required],
      codigoLineaCredito: [null, Validators.required],
      codigoPeriodicidadPago: [null, Validators.required],
      frecuenciaRevision: [null, Validators.required],
      codigoOficinaConcesion: [null, Validators.required],
      codigoGaranteGarantias: [null, Validators.required],
      codigoIndicadorOperacionesExenta: [null, Validators.required],
      codigoTipoCredito: [null, Validators.required],
      codigoClaseCredito: [null, Validators.required],
      codigoEstadoOperacion: [null, Validators.required],
      codigoSituaOperacion: [null, Validators.required],
      codigoTipoOperacion: [null, Validators.required],
      codigoDestFinOperacion: [null, Validators.required],
      codigoActividadEconoReceptora: [null, Validators.required],
      codigoDestinoGeograficaPais: [null, Validators.required],
      codigoDestinoGeograficaProvincia: [null, Validators.required],
      codigoDestinoGeograficaCanton: [null, Validators.required],
      codigoDestinoGeograficaParroquia: [null, Validators.required],
      totalIngreso: [null, Validators.required],
      totalEgreso: [null, Validators.required],
      codigoNivEstudiosEsperado: [null, Validators.required],
      numEmpleadosMant: [null, Validators.required],
      numEmpleadosIncrement: [null, Validators.required],
      produccionActual: [null, Validators.required],
      incrementActualEspe: [null, Validators.required],

      mantenerProduccionExportable: [null, Validators.required],
      incrementoProduccionExportable: [null, Validators.required],

      contribucionFbk: [null, Validators.required],
      incremnetoInvFbk: [null, Validators.required],

      contribucionIntCancer: [null, Validators.required],
      destiCredInmuebles: [null, Validators.required],
      valorComercialInm: [null, Validators.required],
      metrosCuadrados: [null, Validators.required],
      numeroTotalPersonaAportan: [null, Validators.required]
    });
  }



  ngOnInit(): void {
    this.loadTipoIdentificacion();
    this.loadMonedaDenominacion();
    this.loadLineaCredito();
    this.loadPeriodicidadPago();
    this.loadOficinaConcesion();
    this.loadGaranteGarantias();
    this.loadIndicadorOperacionesExenta();
    this.loadTipoCredito();
    this.loadClaseCredito();
    this.loadEstadoOperacion();
    this.loadSituacionOperacion();
    this.loadTipoOperacion();
    this.loadDestinoFinanciero();
    this.loadActividadEconomica();
    this.loadDestinoPais();
    this.loadDestinProvincia();
    this.loadDestinoCanton();
    this.loadDestinoParroquia();
    this.loadNivelEstudios();
    this.loadDestinoCreditoInmuebles();
  }

  closeModal(): void {
    this.isVisible = false;
    this.modalClosed.emit();
  }

  onSubmit(): void {
    this.formSubmitted = true;

    if (this.r02Form.valid) {
      const formData = this.r02Form.value;
      console.log('📌 Form Data:', formData);
      this.R02catalogService.saveR02(formData);

      this.r02Form.reset();
      this.formSubmitted = false;

      this.isVisible = false;
      this.modalClosed.emit();
    }
  }

  isInvalid(controlName: string){
    const control = this.r02Form.get(controlName);
    return control?.invalid && (control.touched || this.formSubmitted);
  }

  private loadTipoIdentificacion(): void {
    this.t4service.getAll().subscribe({
      next: (data) => {
        this.arrayTipoIdentificacion = data;
      },
      error: (error) => {
        console.error('Error al cargar Tipos de Identificación:', error);
      }
    });
  }

  private loadMonedaDenominacion(): void {
    this.t33Service.getAll().subscribe({
      next: (data) => {
        this.arrayMonedaDenominacion = data;
      },
      error: (error) => {
        console.error('Error al cargar Tipos de Identificación:', error);
      }
    });
  }

  private loadLineaCredito(): void {  
    this.t37Service.getall().subscribe({
      next: (data) => {
        this.arrayLineaCredito = data;
      },
      error: (error) => {
        console.error('Error al cargar Linea de Crédito:', error);
      }
    });
  }

  private loadPeriodicidadPago(): void {  
    this.T38Service.getAllByCatalog('t38').subscribe({
      next: (data) => {
        this.arrayPeriodicidadPago = data;
      },
      error: (error) => {
        console.error('Error al cargar Periodicidad de Pago:', error);
      }
    })
    
  }

    private loadOficinaConcesion(): void {  
      this.T3Service.getAllByCatalog('t3').subscribe({
        next: (data) => {
          this.arrayOficinaConcesion = data;
        },
        error: (error) => {
          console.error('Error al cargar Oficina de Concesión:', error);
        }
      })
      
    }

    private loadGaranteGarantias(): void {  
      this.T209Service.getAllByCatalog('t209').subscribe({
        next: (data) => {
          this.arrayGaranteGarantias = data;
        },
        error: (error) => {
          console.error('Error al cargar Garante Garantias:', error);
        }
      })
      
    }

    private loadIndicadorOperacionesExenta(): void {  
      this.T25Service.getAllByCatalog('t25').subscribe({
        next: (data) => {
          this.arrayIndicadorOperacionesExenta = data;
        },
        error: (error) => {
          console.error('Error al cargar Indicador de Operaciones Exenta:', error);
        }
      })
      
    }

    private loadTipoCredito(): void {  
      this.T31Service.getAllByCatalog('t31').subscribe({
        next: (data) => {
          this.arrayTipoCredito = data;
        },
        error: (error) => {
          console.error('Error al cargar Tipos de Crédito:', error);
        }
      })
      
    }

    private loadClaseCredito(): void {  
      this.T207Service.getAllByCatalog('t207').subscribe({
        next: (data) => {
          this.arrayClaseCredito = data;
        },
        error: (error) => {
          console.error('Error al cargar Clase de Crédito:', error);
        }
      })
      
    }

    private loadEstadoOperacion(): void {  
      this.T32Service.getAllByCatalog('t32').subscribe({
        next: (data) => {
          this.arrayEstadoOperacion = data;
        },
        error: (error) => {
          console.error('Error al cargar Estado de Operación:', error);
        }
      })
      
    }

    private loadSituacionOperacion(): void {  
      this.T32AService.getAllByCatalog('t32_A').subscribe({
        next: (data) => {
          this.arraySituacionOperacion = data;
        },
        error: (error) => {
          console.error('Error al cargar Situación de Operación:', error);
        }
      })
      
    }

    private loadTipoOperacion(): void {  
      this.T35Service.getAllByCatalog('t35').subscribe({
        next: (data) => {
          this.arrayTipoOperacion = data;
        },
        error: (error) => {
          console.error('Error al cargar Tipos de Operación:', error);
        }
      })
      
    }

    private loadDestinoFinanciero(): void {
      this.T366Service.getAllByCatalog('t36_6').subscribe({
        next: (data) => {
          this.arrayDestinoFinanciero = data;
        },
        error: (error) => {
          console.error('Error al cargar Destino Financiero:', error);
        }
      })
    }

    private loadActividadEconomica(): void {
      this.T28Service.getAllByCatalog('t28').subscribe({
        next: (data) => {
          this.arrayActividadEconomica = data;
        },
        error: (error) => {
          console.error('Error al cargar Actividad Economica:', error);
        }
      })
    }

    private loadDestinoPais(): void {
      this.T5Service.getAll().subscribe({
        next: (data) => {
          this.arrayDestinoPais = data;
        },
        error: (error) => {
          console.error('Error al cargar Destino Pais:', error);
        }
      })
    }

    private loadDestinProvincia(): void {
      this.T6Service.getAllByCatalog('t6').subscribe({
        next: (data) => {
          this.arrayDestinoProvincia = data;
        },
        error: (error) => {
          console.error('Error al cargar Destino Provincia:', error);
        }
      })
    
    }

    private loadDestinoCanton(): void {
      this.T7Service.getAllByCatalog('t7').subscribe({
        next: (data) => {
          this.arrayDestinoCanton = data;
        },
        error: (error) => {
          console.error('Error al cargar Destino Canton:', error);
        }
      })
    }

    private loadDestinoParroquia(): void {
      this.T50Service.getAllByCatalog('t50').subscribe({
        next: (data) => {
          this.arrayDestinoParroquia = data;
        },
        error: (error) => {
          console.error('Error al cargar Destino Parroquia:', error);
        }
      })
    }

    private loadNivelEstudios(): void {
      
      this.T212Service.getAllByCatalog('t212').subscribe({
        next: (data) => {
          this.arrayNivelEstudios = data;
        },
        error: (error) => {
          console.error('Error al cargar Nivel de Estudios:', error);
        }
      })
    }

    private loadDestinoCreditoInmuebles(): void {
      
      this.T235Service.getAllByCatalog('t235').subscribe({
        next: (data) => {
          this.arrayDestinoCreditoInmuebles = data;
        },
        error: (error) => {
          console.error('Error al cargar Destino Credito Inmuebles:', error);
        }
      })
    }

  

}
