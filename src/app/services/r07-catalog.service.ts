import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { FormGroup } from '@angular/forms';

export interface R07Catalog {
  id: number;
  codigo: string;
  descripcion: string;
}

export interface R07Resume {
  tipoIdentificacion: R07Catalog;
  codigoPais: R07Catalog;
  codigoProvincia: R07Catalog;
  codigoCanton: R07Catalog;
  codigoTipoGarantia: R07Catalog;
  estadoRegistro: R07Catalog;
  identificacionSujeto: string;
  numeroOperacion: string;
  numeroGarantia: string;
  descripcionGarantia: string;
  valorAvaluo: number;
  fechaAvaluo: string;
  numeroRegistroGarantia: string;
  fechaContabilizacionGarantia: string;
  porcentajeGarantia: number;
}

@Injectable({
  providedIn: 'root'
})
export class R07CatalogService {
  private baseUrl = environment.backendEndpoint; // ✅ CONECTAR DIRECTAMENTE A APIS REALES

  constructor(private http: HttpClient) {}

  getResume(): Observable<R07Resume[]>{
    return this.http.get<R07Resume[]>(`${this.baseUrl}/structures/R07/resume`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener R07 resume desde API real:', error);
          // Fallback: intentar con endpoint alternativo
          return this.http.get<R07Resume[]>(`${this.baseUrl}/structures/R07`)
            .pipe(
              catchError(fallbackError => {
                console.error('Error en fallback R07:', fallbackError);
                throw fallbackError;
              })
            );
        })
      );
  }



  saveR07(form: any): Observable<any> {
    const formValue = form;
    console.log('📝 R07 - Formulario recibido:', formValue);

    // Transform form into expected payload - SIGUIENDO PATRÓN L02
    const payload = {
      codigoTipoIdentificacion: formValue.tipoIdentificacionSujeto?.id,
      identificacionSujeto: formValue.identificacionSujeto,
      numeroOperacion: formValue.numeroOperacion,
      numeroGarantia: formValue.numeroGarantia,
      codigoTipoGarantia: formValue.tipoGarantia?.id,
      descripcionGarantia: formValue.descripcionGarantia,
      codigoPais: formValue.ubicacionGarantiaPais?.id,
      codigoProvincia: formValue.ubicacionGarantiaProvincia?.id,
      codigoCanton: formValue.ubicacionGarantiaCanton?.id,
      valorAvaluo: formValue.valorAvaluoTitulo,
      fechaAvaluo: formValue.fechaAvaluo,
      numeroRegistroGarantia: formValue.numeroRegistroGarantia,
      fechaContabilizacionGarantia: formValue.fechaContabilizacionGarantia,
      porcentajeGarantia: formValue.porcentajeCubreGarantia,
      estadoRegistro: formValue.estadoRegistro?.id
    };

    console.log('📤 R07 - Payload a enviar:', payload);
    console.log('🌐 R07 - URL:', `${this.baseUrl}/structures/R07`);

    return this.http.post(`${this.baseUrl}/structures/R07`, payload).pipe(
      map(response => {
        console.log('✅ R07 - Guardado exitoso:', response);
        return response;
      }),
      catchError(error => {
        console.error('❌ R07 - Error al guardar:', error);
        console.error('❌ R07 - Status:', error.status);
        console.error('❌ R07 - Message:', error.message);
        throw error;
      })
    );
  }
}