import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { FormGroup } from '@angular/forms';

export interface R04Catalog {
  id: number;
  codigo: string;
  descripcion: string;
}

export interface R04Resume {
  tipoIdentificacion: R04Catalog;
  emisor: R04Catalog;
  instrumento: R04Catalog;
  categoriaInstrumento: R04Catalog;
  tipoInstrumento: R04Catalog;
  identificacionInstrumento: string;
  numeroTitulo: string;
  fechaEmision: string;
  fechaVencimiento: string;
}



@Injectable({
  providedIn: 'root'
})
export class R04CatalogService {
  private baseUrl = environment.backendEndpoint; // ✅ CONECTAR DIRECTAMENTE A APIS REALES


  constructor(private http: HttpClient) {}

  getResume(): Observable<R04Resume[]>{
    return this.http.get<R04Resume[]>(`${this.baseUrl}/structures/R04/resume`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener R04 resume desde API real:', error);
          // Fallback: intentar con endpoint alternativo
          return this.http.get<R04Resume[]>(`${this.baseUrl}/structures/R04`)
            .pipe(
              catchError(fallbackError => {
                console.error('Error en fallback R04:', fallbackError);
                throw fallbackError;
              })
            );
        })
      );
  }

  saveR04(form: any ): Observable<any>{
    const formValue = form;
    console.log('📝 R04 - Formulario recibido:', formValue);

    // Transform form into expected payload
    const payload = {
      codigoTipoIdentificacion: formValue.tipoIdentificacion?.id,
      identificacionSujeto: formValue.identificacionSujeto,
      numeroOperacion: formValue.numeroOperacion,
      diasMorosidad: formValue.diasMorosidad
    };

    console.log('📤 R04 - Payload a enviar:', payload);
    console.log('🌐 R04 - URL:', `${this.baseUrl}/structures/R04`);

    return this.http.post(`${this.baseUrl}/structures/R04`, payload).pipe(
      map(response => {
        console.log('✅ R04 - Guardado exitoso:', response);
        return response;
      }),
      catchError(error => {
        console.error('❌ R04 - Error al guardar:', error);
        console.error('❌ R04 - Status:', error.status);
        console.error('❌ R04 - Message:', error.message);
        throw error;
      })
    );
  }

}