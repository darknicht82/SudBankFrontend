// ========================================
// SERVICIO L01 - FRONTEND
// ========================================
// Propósito: Servicio para manejo de datos L01
// Código Banco: 1038 (Banco Sudamericano)
// 
// CAMPOS OFICIALES SEGÚN MANUAL L01-L06:
// 1. Tipo de identificación (caracter 1) - Tabla 4
// 2. Identificación (caracter 13) - Tabla 164
// 3. Clasificación (numérico 1) - Tabla 173
// 4. Tipo de emisor (numérico 1) - Tabla 73
//
// Autor: Christian Aguirre
// Fecha: 2025-01-08

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { L01Data, L01ReportRequest, L01ReportResponse } from '../models/l01.model';

@Injectable({
  providedIn: 'root'
})
export class L01Service {

  private apiUrl = 'http://localhost:8085/api/nesl01';

  // DATOS MOCK TEMPORALES PARA PRUEBAS
  private mockData: L01Data[] = [
    {
      id: 1,
      tipoIdentificacion: 'R',
      identificacion: '1791234567001',
      clasificacion: 1,
      tipoEmisor: 1,
      fechaCreacion: new Date('2025-01-01'),
      usuarioCreacion: 'admin'
    },
    {
      id: 2,
      tipoIdentificacion: 'X',
      identificacion: 'US123456789',
      clasificacion: 2,
      tipoEmisor: 2,
      fechaCreacion: new Date('2025-01-02'),
      usuarioCreacion: 'admin'
    },
    {
      id: 3,
      tipoIdentificacion: 'R',
      identificacion: '1798765432001',
      clasificacion: 1,
      tipoEmisor: 1,
      fechaCreacion: new Date('2025-01-03'),
      usuarioCreacion: 'admin'
    }
  ];

  constructor(private http: HttpClient) { }

  // ========================================
  // MÉTODOS CRUD
  // ========================================

  /**
   * Crear nuevo registro
   */
  crear(data: L01Data): Observable<L01Data> {
    // TEMPORAL: Usar mock data
    const newData = { ...data, id: this.mockData.length + 1, fechaCreacion: new Date() };
    this.mockData.push(newData);
    return of(newData);
  }

  /**
   * Actualizar registro
   */
  actualizar(id: number, data: L01Data): Observable<L01Data> {
    // TEMPORAL: Usar mock data
    const index = this.mockData.findIndex(item => item.id === id);
    if (index !== -1) {
      this.mockData[index] = { ...this.mockData[index], ...data, fechaModificacion: new Date() };
      return of(this.mockData[index]);
    }
    return of(data);
  }

  /**
   * Buscar por ID
   */
  buscarPorId(id: number): Observable<L01Data> {
    // TEMPORAL: Usar mock data
    const item = this.mockData.find(item => item.id === id);
    return of(item!);
  }

  /**
   * Listar todos
   */
  listarTodos(): Observable<L01Data[]> {
    // TEMPORAL: Usar mock data
    return of(this.mockData);
  }

  /**
   * Eliminar registro
   */
  eliminar(id: number): Observable<void> {
    // TEMPORAL: Usar mock data
    const index = this.mockData.findIndex(item => item.id === id);
    if (index !== -1) {
      this.mockData.splice(index, 1);
    }
    return of(void 0);
  }

  // ========================================
  // MÉTODOS DE BÚSQUEDA
  // ========================================

  /**
   * Buscar por identificación
   */
  buscarPorIdentificacion(tipoIdentificacion: string, identificacion: string): Observable<L01Data> {
    // TEMPORAL: Usar mock data
    const item = this.mockData.find(item => 
      item.tipoIdentificacion === tipoIdentificacion && 
      item.identificacion === identificacion
    );
    return of(item!);
  }

  /**
   * Listar por identificación
   */
  listarPorIdentificacion(identificacion: string): Observable<L01Data[]> {
    // TEMPORAL: Usar mock data
    const items = this.mockData.filter(item => 
      item.identificacion.includes(identificacion)
    );
    return of(items);
  }

  /**
   * Listar por clasificación
   */
  listarPorClasificacion(clasificacion: number): Observable<L01Data[]> {
    // TEMPORAL: Usar mock data
    const items = this.mockData.filter(item => item.clasificacion === clasificacion);
    return of(items);
  }

  /**
   * Listar por tipo de emisor
   */
  listarPorTipoEmisor(tipoEmisor: number): Observable<L01Data[]> {
    // TEMPORAL: Usar mock data
    const items = this.mockData.filter(item => item.tipoEmisor === tipoEmisor);
    return of(items);
  }

  /**
   * Contar por clasificación
   */
  contarPorClasificacion(clasificacion: number): Observable<number> {
    // TEMPORAL: Usar mock data
    const count = this.mockData.filter(item => item.clasificacion === clasificacion).length;
    return of(count);
  }

  /**
   * Contar por tipo de emisor
   */
  contarPorTipoEmisor(tipoEmisor: number): Observable<number> {
    // TEMPORAL: Usar mock data
    const count = this.mockData.filter(item => item.tipoEmisor === tipoEmisor).length;
    return of(count);
  }

  /**
   * Buscar última versión por identificación
   */
  buscarUltimaVersionPorIdentificacion(identificacion: string): Observable<L01Data> {
    // TEMPORAL: Usar mock data
    const items = this.mockData.filter(item => item.identificacion === identificacion);
    const latest = items.sort((a, b) => 
      new Date(b.fechaCreacion!).getTime() - new Date(a.fechaCreacion!).getTime()
    )[0];
    return of(latest!);
  }

  // ========================================
  // MÉTODOS DE REPORTE
  // ========================================

  /**
   * Generar reporte L01
   */
  generarReporte(filtros: L01ReportRequest): Observable<L01ReportResponse> {
    // TEMPORAL: Usar mock data
    let filteredData = this.mockData;
    
    if (filtros.tipoIdentificacion) {
      filteredData = filteredData.filter(item => item.tipoIdentificacion === filtros.tipoIdentificacion);
    }
    if (filtros.clasificacion) {
      filteredData = filteredData.filter(item => item.clasificacion === filtros.clasificacion);
    }
    if (filtros.tipoEmisor) {
      filteredData = filteredData.filter(item => item.tipoEmisor === filtros.tipoEmisor);
    }
    
    const response: L01ReportResponse = {
      success: true,
      data: filteredData,
      total: filteredData.length,
      totalRegistros: filteredData.length,
      clientesActivos: filteredData.filter(item => item.clasificacion === 1).length,
      nuevosEsteMes: filteredData.filter(item => {
        const date = new Date(item.fechaCreacion!);
        const now = new Date();
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
      }).length,
      actualizacionesRecientes: 0
    };
    
    return of(response);
  }

  /**
   * Exportar reporte TXT
   */
  exportarTxt(fecha: string): Observable<Blob> {
    // TEMPORAL: Generar TXT mock
    const content = `L01|1038|${fecha}|${this.mockData.length}\n` +
      this.mockData.map(item => 
        `${item.tipoIdentificacion}|${item.identificacion}|${item.clasificacion}|${item.tipoEmisor}`
      ).join('\n');
    
    const blob = new Blob([content], { type: 'text/plain' });
    return of(blob);
  }

  /**
   * Exportar reporte Excel
   */
  exportarExcel(fecha: string): Observable<Blob> {
    // TEMPORAL: Generar CSV mock
    const content = `Tipo Identificación,Identificación,Clasificación,Tipo Emisor\n` +
      this.mockData.map(item => 
        `${item.tipoIdentificacion},${item.identificacion},${item.clasificacion},${item.tipoEmisor}`
      ).join('\n');
    
    const blob = new Blob([content], { type: 'text/csv' });
    return of(blob);
  }

  /**
   * Validar datos
   */
  validarDatos(): Observable<any> {
    // TEMPORAL: Validación mock
    const isValid = this.mockData.every(item => 
      item.tipoIdentificacion && 
      item.identificacion && 
      item.clasificacion && 
      item.tipoEmisor
    );
    
    return of({
      valid: isValid,
      message: isValid ? 'Datos válidos' : 'Datos inválidos',
      totalRecords: this.mockData.length
    });
  }
}
