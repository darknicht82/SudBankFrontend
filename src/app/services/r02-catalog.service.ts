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
      fechaConcesion: formValue.fechaConcesion // yyyy-MM-dd
    };

    console.log('Payload to send:', payload);

    this.http.post(`${this.baseUrl}/structures/R02`, payload).subscribe({
      next: (res) => console.log('Saved successfully', res),
      error: (err) => console.error('Error saving', err)
    });
  }

}