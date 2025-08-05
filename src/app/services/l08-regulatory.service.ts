import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface L08EmisoresCustodiosDetalle {
  id: number;
  codigoEmisor: string;
  nombreEmisor: string;
  tipoInstrumento: string;
  valorNominal: number;
  valorMercado: number;
  fechaEmision: Date;
  fechaVencimiento: Date;
  tasaCupon: number;
  calificacionRiesgo: string;
  entidadCustodia: string;
  fechaRegistro: Date;
  usuarioRegistro: string;
}

@Injectable({
  providedIn: 'root'
})
export class L08RegulatoryService {
  private baseUrl = 'http://localhost:8085/api/regulatory/l08';

  // Datos mock específicos para L08
  private mockL08Data: L08EmisoresCustodiosDetalle[] = [
    {
      id: 1,
      codigoEmisor: 'EMI001',
      nombreEmisor: 'Banco Central de la República',
      tipoInstrumento: 'Bono Gubernamental',
      valorNominal: 1000000,
      valorMercado: 985000,
      fechaEmision: new Date('2023-01-15'),
      fechaVencimiento: new Date('2028-01-15'),
      tasaCupon: 5.25,
      calificacionRiesgo: 'AAA',
      entidadCustodia: 'Banco SudBank',
      fechaRegistro: new Date('2024-01-15'),
      usuarioRegistro: 'admin'
    },
    {
      id: 2,
      codigoEmisor: 'EMI002',
      nombreEmisor: 'Corporación Financiera Nacional',
      tipoInstrumento: 'Letra del Tesoro',
      valorNominal: 500000,
      valorMercado: 495000,
      fechaEmision: new Date('2023-06-01'),
      fechaVencimiento: new Date('2025-06-01'),
      tasaCupon: 4.75,
      calificacionRiesgo: 'AA+',
      entidadCustodia: 'Banco SudBank',
      fechaRegistro: new Date('2024-01-15'),
      usuarioRegistro: 'admin'
    },
    {
      id: 3,
      codigoEmisor: 'EMI003',
      nombreEmisor: 'Banco de Desarrollo',
      tipoInstrumento: 'Bono Corporativo',
      valorNominal: 750000,
      valorMercado: 720000,
      fechaEmision: new Date('2023-03-10'),
      fechaVencimiento: new Date('2026-03-10'),
      tasaCupon: 6.50,
      calificacionRiesgo: 'A',
      entidadCustodia: 'Banco SudBank',
      fechaRegistro: new Date('2024-01-15'),
      usuarioRegistro: 'admin'
    }
  ];

  constructor(private http: HttpClient) { }

  // Métodos específicos para L08
  getL08Data(): Observable<L08EmisoresCustodiosDetalle[]> {
    return of(this.mockL08Data);
  }

  getL08ById(id: number): Observable<L08EmisoresCustodiosDetalle> {
    const item = this.mockL08Data.find(data => data.id === id);
    return of(item!);
  }

  createL08(data: L08EmisoresCustodiosDetalle): Observable<L08EmisoresCustodiosDetalle> {
    const newData = { ...data, id: this.mockL08Data.length + 1 };
    this.mockL08Data.push(newData);
    return of(newData);
  }

  updateL08(id: number, data: L08EmisoresCustodiosDetalle): Observable<L08EmisoresCustodiosDetalle> {
    const index = this.mockL08Data.findIndex(item => item.id === id);
    if (index !== -1) {
      this.mockL08Data[index] = { ...data, id };
      return of(this.mockL08Data[index]);
    }
    return of(data);
  }

  deleteL08(id: number): Observable<void> {
    const index = this.mockL08Data.findIndex(item => item.id === id);
    if (index !== -1) {
      this.mockL08Data.splice(index, 1);
    }
    return of(void 0);
  }

  // Métodos de análisis específicos para L08
  getL08Summary(): Observable<any> {
    return of({
      totalEmisores: this.mockL08Data.length,
      valorTotalNominal: this.mockL08Data.reduce((sum, item) => sum + item.valorNominal, 0),
      valorTotalMercado: this.mockL08Data.reduce((sum, item) => sum + item.valorMercado, 0),
      promedioTasaCupon: this.mockL08Data.reduce((sum, item) => sum + item.tasaCupon, 0) / this.mockL08Data.length
    });
  }

  getL08RegulatoryReport(): Observable<any> {
    return of({
      resumenL08: {
        totalRegistros: this.mockL08Data.length,
        valorTotal: this.mockL08Data.reduce((sum, item) => sum + item.valorMercado, 0)
      }
    });
  }
} 
