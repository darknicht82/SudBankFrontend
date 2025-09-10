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
  // Campos básicos (1-4)
  tipoIdentificacion: R04Catalog;     // 1. Tipo de identificación - Tabla 4
  identificacionSujeto: string;      // 2. Identificación del sujeto
  numeroOperacion: string;           // 3. Número de operación
  diasMorosidad: number;             // 4. Días de morosidad
  
  // Campos de calificación (5-7)
  metodologiaCalificacion: R04Catalog;  // 5. Metodología de calificación - Tabla 218
  calificacionPropia: R04Catalog;       // 6. Calificación propia - Tabla 29
  calificacionHomologada: R04Catalog;   // 7. Calificación homologada - Tabla 29
  
  // Campo de interés (8)
  tasaInteres: number;              // 8. Tasa de interés
  
  // Valores por vencer (9-13)
  valorPorVencer1a30: number;       // 9. Valor por vencer de 1 a 30 días
  valorPorVencer31a90: number;      // 10. Valor por vencer de 31 a 90 días
  valorPorVencer91a180: number;     // 11. Valor por vencer de 91 a 180 días
  valorPorVencer181a360: number;    // 12. Valor por vencer de 181 a 360 días
  valorPorVencerMas360: number;     // 13. Valor por vencer de más de 360 días
  
  // Valores que no devengan intereses (14-18)
  valorNoDevenga1a30: number;       // 14. Valor que no devenga intereses de 1 a 30 días
  valorNoDevenga31a90: number;      // 15. Valor que no devenga intereses de 31 a 90 días
  valorNoDevenga91a180: number;     // 16. Valor que no devenga intereses de 91 a 180 días
  valorNoDevenga181a360: number;    // 17. Valor que no devenga intereses de 181 a 360 días
  valorNoDevengaMas360: number;     // 18. Valor que no devenga intereses de más de 360 días
  
  // Valores vencidos (19-29)
  valorVencido1a30: number;         // 19. Valor vencido de 1 a 30 días
  valorVencido31a90: number;        // 20. Valor vencido de 31 a 90 días
  valorVencido91a180: number;       // 21. Valor vencido de 91 a 180 días
  valorVencido181a360: number;      // 22. Valor vencido de 181 a 360 días
  valorVencidoMas360: number;       // 23. Valor vencido de más de 360 días
  valorVencido181a270: number;      // 24. Valor vencido de 181 a 270 días
  valorVencidoMas270: number;       // 25. Valor vencido de más de 270 días
  valorVencido91a270: number;       // 26. Valor vencido De 91 a 270 días
  valorVencido271a360: number;      // 27. Valor vencido de 271 a 360 días
  valorVencido361a720: number;      // 28. Valor vencido de 361 a 720 días
  valorVencidoMas720: number;       // 29. Valor vencido de más de 720 días
  
  // Campos adicionales (30-37)
  gastosRecuperacion: number;       // 30. Gastos de recuperación de cartera vencida
  interesOrdinario: number;         // 31. Interés ordinario
  interesSobreMora: number;         // 32. Interés sobre mora
  valorDemandaJudicial: number;     // 33. Valor en demanda judicial
  carteraCastigada: number;         // 34. Cartera castigada
  provisionRequeridaOriginal: number; // 35. Provisión requerida original
  provisionRequeridaReducida: number; // 36. Provisión requerida reducida
  provisionConstituida: number;     // 37. Provisión constituida
  
  // Campos de operación (38-39)
  tipoOperacion: R04Catalog;        // 38. Tipo de operación - Tabla 35
  objetoFideicomiso: R04Catalog;    // 39. Objeto del fideicomiso - Tabla 55
  
  // Campos financieros (40-45)
  primaDescuento: number;           // 40. Prima o descuento
  cuotaCredito: number;             // 41. Cuota del crédito
  valorInteresesCuota: number;      // 42. Valor de Intereses de la Cuota del Crédito
  valorSeguro: number;              // 43. Valor del Seguro
  saldoCuotaCapitalDiferida: number; // 44. Saldo de la cuota de capital diferida
  valorInteresCapitalDiferido: number; // 45. Valor del interés de capital diferido
  
  // Campos de fecha e intereses (46-48)
  fechaTransferenciaCuentasVencidas: string; // 46. Fecha de transferencia a cuentas vencidas
  interesesAcumuladosPorCobrar: number; // 47. Intereses acumulados por cobrar
  interesesReversados: number;      // 48. Intereses reversados
  
  // Campos adicionales (49-50)
  fechaExigibilidadCuota: string; // 49. Fecha de exigibilidad de la cuota
  tipoSistemaAmortizacion: R04Catalog; // 50. Tipo de sistema de amortización - Tabla 317
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

    // Transform form into expected payload with all 50 fields
    const payload = {
      // Campos básicos (1-4)
      codigoTipoIdentificacion: formValue.tipoIdentificacion?.id,
      identificacionSujeto: formValue.identificacionSujeto,
      numeroOperacion: formValue.numeroOperacion,
      diasMorosidad: formValue.diasMorosidad,
      
      // Campos de calificación (5-7)
      codigoMetodologiaCalificacion: formValue.metodologiaCalificacion?.id,
      codigoCalificacionPropia: formValue.calificacionPropia?.id,
      codigoCalificacionHomologada: formValue.calificacionHomologada?.id,
      
      // Campo de interés (8)
      tasaInteres: formValue.tasaInteres,
      
      // Valores por vencer (9-13)
      valorPorVencer1a30: formValue.valorPorVencer1a30,
      valorPorVencer31a90: formValue.valorPorVencer31a90,
      valorPorVencer91a180: formValue.valorPorVencer91a180,
      valorPorVencer181a360: formValue.valorPorVencer181a360,
      valorPorVencerMas360: formValue.valorPorVencerMas360,
      
      // Valores que no devengan intereses (14-18)
      valorNoDevenga1a30: formValue.valorNoDevenga1a30,
      valorNoDevenga31a90: formValue.valorNoDevenga31a90,
      valorNoDevenga91a180: formValue.valorNoDevenga91a180,
      valorNoDevenga181a360: formValue.valorNoDevenga181a360,
      valorNoDevengaMas360: formValue.valorNoDevengaMas360,
      
      // Valores vencidos (19-29)
      valorVencido1a30: formValue.valorVencido1a30,
      valorVencido31a90: formValue.valorVencido31a90,
      valorVencido91a180: formValue.valorVencido91a180,
      valorVencido181a360: formValue.valorVencido181a360,
      valorVencidoMas360: formValue.valorVencidoMas360,
      valorVencido181a270: formValue.valorVencido181a270,
      valorVencidoMas270: formValue.valorVencidoMas270,
      valorVencido91a270: formValue.valorVencido91a270,
      valorVencido271a360: formValue.valorVencido271a360,
      valorVencido361a720: formValue.valorVencido361a720,
      valorVencidoMas720: formValue.valorVencidoMas720,
      
      // Campos adicionales (30-37)
      gastosRecuperacion: formValue.gastosRecuperacion,
      interesOrdinario: formValue.interesOrdinario,
      interesSobreMora: formValue.interesSobreMora,
      valorDemandaJudicial: formValue.valorDemandaJudicial,
      carteraCastigada: formValue.carteraCastigada,
      provisionRequeridaOriginal: formValue.provisionRequeridaOriginal,
      provisionRequeridaReducida: formValue.provisionRequeridaReducida,
      provisionConstituida: formValue.provisionConstituida,
      
      // Campos de operación (38-39)
      codigoTipoOperacion: formValue.tipoOperacion?.id,
      codigoObjetoFideicomiso: formValue.objetoFideicomiso?.id,
      
      // Campos financieros (40-45)
      primaDescuento: formValue.primaDescuento,
      cuotaCredito: formValue.cuotaCredito,
      valorInteresesCuota: formValue.valorInteresesCuota,
      valorSeguro: formValue.valorSeguro,
      saldoCuotaCapitalDiferida: formValue.saldoCuotaCapitalDiferida,
      valorInteresCapitalDiferido: formValue.valorInteresCapitalDiferido,
      
      // Campos de fecha e intereses (46-48)
      fechaTransferenciaCuentasVencidas: formValue.fechaTransferenciaCuentasVencidas,
      interesesAcumuladosPorCobrar: formValue.interesesAcumuladosPorCobrar,
      interesesReversados: formValue.interesesReversados,
      
      // Campos adicionales (49-50)
      fechaExigibilidadCuota: formValue.fechaExigibilidadCuota,
      codigoTipoSistemaAmortizacion: formValue.tipoSistemaAmortizacion?.id
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