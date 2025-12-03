import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { FormGroup } from '@angular/forms';

export interface L08Catalog {
  id: number;
  codigo: string;
  descripcion: string;
}

export interface L08Resume {
  codigoLiquidez: L08Catalog;
  tipoIdentificacionEntidad: L08Catalog;
  identificacionEntidad: string;
  tipoInstrumento: L08Catalog;
  calificacionEntidad: L08Catalog;
  calificadoraRiesgo: L08Catalog;
  lunes: number;
  martes: number;
  miercoles: number;
  jueves: number;
  viernes: number;
}



@Injectable({
  providedIn: 'root'
})
export class L08CatalogService {
  private baseUrl = environment.localEndpoint; // ✅ CONECTAR DIRECTAMENTE A APIS REALES


  constructor(private http: HttpClient) {}

  getResume(): Observable<L08Resume[]>{
    return this.http.get<L08Resume[]>(`${this.baseUrl}/structures/L08/resume`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener L08 resume desde API real:', error);
          // Fallback: intentar con endpoint alternativo
          return this.http.get<L08Resume[]>(`${this.baseUrl}/structures/L08`)
            .pipe(
              catchError(fallbackError => {
                console.error('Error en fallback L08:', fallbackError);
                throw fallbackError;
              })
            );
        })
      );
  }

  getForReport(): Observable<L08Resume[]> {
    const url = `${this.baseUrl}/structures/L08/report`;
    console.log('🌐 Solicitando reporte desde:', url);

    return this.http.get<L08Resume[]>(url).pipe(
      map((data) => {
        console.log('✅ Reporte recibido:', data);
        return data;
      }),
      catchError((error) => {
        console.error('❌ Error al obtener el reporte:', error);
        throw error;
      })
    );
}


  saveL08(form: any ): Observable<any>{
    const formValue = form;
    console.log('📝 L08 - Formulario recibido:', formValue);

    // Transform form into expected payload
    const payload = {
      codigoLiquidez: formValue.codigoLiquidez?.id,
      tipoIdentificacionEntidad: formValue.tipoIdentificacionEntidad?.id,
      identificacionEntidad: formValue.identificacionEntidad,
      tipoInstrumento: formValue.tipoInstrumento?.id,
      calificacionEntidad: formValue.calificacionEntidad?.id,
      calificadoraRiesgo: formValue.calificadoraRiesgo?.id,
      lunes: Number(formValue.lunes),
      martes: Number(formValue.martes),
      miercoles: Number(formValue.miercoles),
      jueves: Number(formValue.jueves),
      viernes: Number(formValue.viernes)
    };

    console.log('📤 L08 - Payload a enviar:', payload);
    console.log('🌐 L08 - URL:', `${this.baseUrl}/structures/L08`);

    return this.http.post(`${this.baseUrl}/structures/L08`, payload).pipe(
      map(response => {
        console.log('✅ L08 - Guardado exitoso:', response);
        return response;
      }),
      catchError(error => {
        console.error('❌ L08 - Error al guardar:', error);
        console.error('❌ L08 - Status:', error.status);
        console.error('❌ L08 - Message:', error.message);
        throw error;
      })
    );
  }

  

  

}