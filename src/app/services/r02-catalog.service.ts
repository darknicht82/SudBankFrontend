import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { FormGroup } from '@angular/forms';

export interface R02Catalog {
  id: number;
  codigo: string;
  descripcion: string;
}

export interface R02Resume {
  tipoIdentificacion: R02Catalog;
  identificacionSujeto: R02Catalog;
  numeroOperacion: R02Catalog;
  valorOperacion: R02Catalog;
  tasaInteresNominal: R02Catalog;
  tea: R02Catalog;
  codigoMoneda: R02Catalog;
  fechaConcesion: R02Catalog;
  fechaVencimiento: R02Catalog;
  codigoLineaCredito: R02Catalog;
  codigoPeriodicidadPago: R02Catalog;
  frecuenciaRevision: R02Catalog;  
  codigoOficinaConcesion: R02Catalog;
  codigoGaranteGarantias: R02Catalog;
  codigoIndicadorOperacionesExenta: R02Catalog;
  codigoTipoCredito: R02Catalog;
  codigoClaseCredito: R02Catalog;
  codigoEstadoOperacion: R02Catalog;
  codigoSituaOperacion: R02Catalog;
  codigoTipoOperacion: R02Catalog;
  codigoDestFinOperacion: R02Catalog;
  codigoActividadEconoReceptora: R02Catalog;
  codigoDestinoGeograficaPais: R02Catalog;
  codigoDestinoGeograficaProvincia: R02Catalog;
  codigoDestinoGeograficaCanton: R02Catalog;
  codigoDestinoGeograficaParroquia: R02Catalog;
  totalIngreso: R02Catalog;
  totalEgreso: R02Catalog;
  codigoNivEstudiosEsperado: R02Catalog;
  numEmpleadosMant: R02Catalog;
  numEmpleadosIncrement: R02Catalog;
  produccionActual: R02Catalog;
  incrementActualEspe: R02Catalog;
  contribucionFbk: R02Catalog;
  contribucionIntCancer: R02Catalog;
  destiCredInmuebles: R02Catalog;
  valorComercial: R02Catalog;
  metrosCuadrados: R02Catalog;
  numeroTotalPersonaAportan: R02Catalog;

}



@Injectable({
  providedIn: 'root'
})
export class R02CatalogService {
  private baseUrl = environment.backendEndpoint; // ✅ CONECTAR DIRECTAMENTE A APIS REALES


  constructor(private http: HttpClient) {}

  getResume(): Observable<R02Resume[]>{
    return this.http.get<R02Resume[]>(`${this.baseUrl}/structures/R02/resume`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener Tabla 4 desde API real:', error);
          throw error; // Propagar el error
        })
      );
  }

  saveR02(form: any ): void{
    const formValue = form;
    console.log('formValue: ', formValue);

    // Transform form into expected payload with correct field names and types
    const payload = {
      codigoTipoIdentificacion: formValue.tipoIdentificacion?.id,
      identificacionSujeto: formValue.identificacionSujeto,
      numeroOperacion: formValue.numeroOperacion,
      valorOperacion: Number(formValue.valorOperacion), // Si el backend espera BigDecimal, puede ser número o string
      tasaInteresNominal: Number(formValue.tasaInteresNominal),
      tea: Number(formValue.tea),
      codigoMoneda: formValue.codigoMoneda?.id, // Integer
      fechaConcesion:  formValue.fechaConcesion, // yyyy-MM-dd
      fechaVencimiento: formValue.fechaVencimiento, // yyyy-MM-dd
      codigoLineaCredito: formValue.codigoLineaCredito?.id, // Integer
      codigoPeriodicidadPago: formValue.codigoPeriodicidadPago?.id, // Integer
      frecuenciaRevision: formValue.frecuenciaRevision, // Integer
      codigoOficinaConcesion: formValue.codigoOficinaConcesion?.id, // Integer
      codigoGaranteGarantias: formValue.codigoGaranteGarantias?.id, // Integer
      codigoIndicadorOperacionesExenta: formValue.codigoIndicadorOperacionesExenta?.id, // Integer
      codigoTipoCredito: formValue.codigoTipoCredito?.id, // Integer
      codigoClaseCredito: formValue.codigoClaseCredito?.id, // Integer
      codigoEstadoOperacion: formValue.codigoEstadoOperacion?.id, // Integer
      codigoSituaOperacion: formValue.codigoSituaOperacion?.id, // Integer
      codigoTipoOperacion: formValue.codigoTipoOperacion?.id, // Integer
      codigoDestFinOperacion: formValue.codigoDestFinOperacion?.id, // Integer
      codigoActividadEconoReceptora: formValue.codigoActividadEconoReceptora?.id, // Integer
      codigoDestinoGeograficaPais: formValue.codigoDestinoGeograficaPais?.id, // Integer
      codigoDestinoGeograficaProvincia: formValue.codigoDestinoGeograficaProvincia?.id, // Integer
      codigoDestinoGeograficaCanton: formValue.codigoDestinoGeograficaCanton?.id, // Integer
      codigoDestinoGeograficaParroquia: formValue.codigoDestinoGeograficaParroquia?.id, // Integer
      totalIngreso: Number(formValue.totalIngreso), // BigDecimal
      totalEgreso: Number(formValue.totalEgreso), // BigDecimal
      codigoNivEstudiosEsperado: formValue.codigoNivEstudiosEsperado?.id, // Integer
      numEmpleadosMant: Number(formValue.numEmpleadosMant), // Integer
      numEmpleadosIncrement: Number(formValue.numEmpleadosIncrement), // Integer
      produccionActual: Number(formValue.produccionActual), // BigDecimal
      incrementActualEspe: Number(formValue.incrementActualEspe), // BigDecimal
      contribucionFbk: Number(formValue.contribucionFbk), // BigDecimal
      contribucionIntCancer: Number(formValue.contribucionIntCancer), // BigDecimal
      destiCredInmuebles: formValue.destiCredInmuebles, // String
      valorComercial: Number(formValue.valorComercial), // BigDecimal
      metrosCuadrados: Number(formValue.metrosCuadrados), // BigDecimal
      numeroTotalPersonaAportan: Number(formValue.numeroTotalPersonaAportan) // Integer
    };

    console.log('Payload to send:', payload);

    this.http.post(`${this.baseUrl}/structures/R02`, payload).subscribe({
      next: (res) => console.log('Saved successfully', res),
      error: (err) => console.error('Error saving', err)
    });
  }

}