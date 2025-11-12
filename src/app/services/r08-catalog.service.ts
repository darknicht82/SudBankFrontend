import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { FormGroup } from '@angular/forms';

export interface R08Catalog {
  id: number;
  codigo: string;
  descripcion: string;
}

export interface R08Resume {
  tipoIdentificacion: R08Catalog;
  identificacionSujeto: R08Catalog;
  numeroOperacion: R08Catalog;
  valorOperacion: R08Catalog;
  tasaInteresNominal: R08Catalog;
  tea: R08Catalog;
  codigoMoneda: R08Catalog;
  fechaConcesion: R08Catalog;
  fechaVencimiento: R08Catalog;
  codigoLineaCredito: R08Catalog;
  codigoPeriodicidadPago: R08Catalog;
  frecuenciaRevision: R08Catalog;  
  codigoOficinaConcesion: R08Catalog;
  codigoGaranteGarantias: R08Catalog;
  codigoIndicadorOperacionesExenta: R08Catalog;
  codigoTipoCredito: R08Catalog;
  codigoClaseCredito: R08Catalog;
  codigoEstadoOperacion: R08Catalog;
  codigoSituaOperacion: R08Catalog;
  codigoTipoOperacion: R08Catalog;
  codigoDestFinOperacion: R08Catalog;
  codigoActividadEconoReceptora: R08Catalog;
  codigoDestinoGeograficaPais: R08Catalog;
  codigoDestinoGeograficaProvincia: R08Catalog;
  codigoDestinoGeograficaCanton: R08Catalog;
  codigoDestinoGeograficaParroquia: R08Catalog;
  totalIngreso: R08Catalog;
  totalEgreso: R08Catalog;
  codigoNivEstudioEsperado: R08Catalog;
  numEmpleadosMant: R08Catalog;
  numEmpleadosIncrement: R08Catalog;
  produccionActual: R08Catalog;
  incrementActualEspe: R08Catalog;
  mantenerProduccionExportable: R08Catalog;
  incrementoProduccionExportable: R08Catalog;
  contribucFbk: R08Catalog;
  incremnetoInvFbk: R08Catalog;
  contribucionIntCancer: R08Catalog;
  destiCredInmuebles: R08Catalog;
  valorComercialInm: R08Catalog;
  metrosCuadrados: R08Catalog;
  numeroTotalPersonaAportan: R08Catalog;

}



@Injectable({
  providedIn: 'root'
})
export class R08CatalogService {
  private baseUrl = environment.backendEndpoint; // ✅ CONECTAR DIRECTAMENTE A APIS REALES


  constructor(private http: HttpClient) {}

  getResume(): Observable<R08Resume[]>{
    return this.http.get<R08Resume[]>(`${this.baseUrl}/structures/R08/resume`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener Tabla 4 desde API real:', error);
          throw error; // Propagar el error
        })
      );
  }

  saveR08(form: any ): void{
    const formValue = form;
    console.log('formValue: ', formValue);

    // Transform form into expected payload with correct field names and types
    const payload = {
      codigoTipoIdentificacion: formValue.tipoIdentificacion?.id,
      identificacionSujeto: formValue.identificacionSujeto,
      numeroOperacion: formValue.numeroOperacion,
      codigoBien: formValue.codigoBien,
      codigoTipoBien: formValue.tipoBien?.id,
      descripcionBien: formValue.descripcionBien,
      codigoPais: formValue.pais?.id,
      codigoProvincia: formValue.provincia?.id,
      codigoCanton: formValue.canton?.id,
      fechaContabilizacion:  formValue.fechaContabilizacion,
      valorLibros: Number(formValue.valorLibros),
      valorUltimoAvaluo: Number(formValue.valorLibros),
      valorProvisionConstituida: Number(formValue.valorLibros),
      valorRealizacionBien: Number(formValue.valorLibros),
      fechaUltimoAvaluo:  formValue.fechaUltimoAvaluo,
      fechaRealizacionBien:  formValue.fechaRealizacionBien,
      custodioExterno:  formValue.custodioExterno,
      numeroProcesoSubasta:  formValue.numeroProcesoSubasta,
      fechaPrimeraSubasta:  formValue.fechaPrimeraSubasta,
      fechaSegundaSubasta:  formValue.fechaSegundaSubasta,
    };

    console.log('Payload to send:', payload);

    this.http.post(`${this.baseUrl}/structures/R08`, payload).subscribe({
      next: (res) => console.log('Saved successfully', res),
      error: (err) => console.error('Error saving', err)
    });
  }

}