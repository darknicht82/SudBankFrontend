import { Injectable } from '@angular/core';
import { L01Record } from './l01.service';

export interface ExportOptions {
  includeHeaders: boolean;
  dateFormat: string;
  separator: string;
}

@Injectable({
  providedIn: 'root'
})
export class L01ExportService {

  constructor() { }

  /**
   * Exporta datos L01 en formato TXT según estándares RVC
   * @param data Datos a exportar
   * @param options Opciones de exportación
   * @returns Blob con archivo TXT
   */
  exportToTxt(data: L01Record[], options: ExportOptions = this.getDefaultOptions()): Blob {
    const content = this.generateTxtContent(data, options);
    return new Blob([content], { type: 'text/plain;charset=utf-8' });
  }

  /**
   * Genera el contenido del archivo TXT
   * @param data Datos a exportar
   * @param options Opciones de exportación
   * @returns Contenido del archivo TXT
   */
  private generateTxtContent(data: L01Record[], options: ExportOptions): string {
    let content = '';

    // Agregar cabecera si está habilitada
    if (options.includeHeaders) {
      content += this.generateHeader(data.length, options);
    }

    // Agregar registros de detalle
    data.forEach((record, index) => {
      content += this.formatRecord(record, options);
      // No agregar separador al último registro
      if (index < data.length - 1) {
        content += '\n';
      }
    });

    return content;
  }

  /**
   * Genera la cabecera del archivo según estándares RVC OFICIALES
   * Manual RVC: CódigoEntidad|CódigoFormulario|FechaCorte|TotalRegistros
   * @param totalRecords Total de registros
   * @param options Opciones de exportación
   * @returns Línea de cabecera
   */
  private generateHeader(totalRecords: number, options: ExportOptions): string {
    const currentDate = new Date();
    const dateStr = currentDate.toLocaleDateString('es-EC', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replace(/\//g, '');

    // Formato RVC OFICIAL: CódigoEntidad|CódigoFormulario|FechaCorte|TotalRegistros
    // Separador: TAB (tabulador) según manual RVC
    const header = `1038${options.separator}L01${options.separator}${dateStr}${options.separator}${totalRecords}`;
    
    return header + '\n';
  }

  /**
   * Formatea un registro individual según estándares L01 OFICIALES
   * SOLO los 4 campos obligatorios según manual SB Marzo 2017
   * @param record Registro L01
   * @param options Opciones de exportación
   * @returns Línea formateada
   */
  private formatRecord(record: L01Record, options: ExportOptions): string {
    // SOLO los 4 campos oficiales L01 según manual SB
    const fields = [
      record.codigoTipoIdentificacion?.toString() || '',  // Campo 1: Tipo de identificación (ID de T4)
      record.codigoEmisor?.toString() || '',              // Campo 2: Identificación (ID de T164)
      record.codigoClasificacionEmisor?.toString() || '', // Campo 3: Clasificación (ID de T173)
      record.codigoTipoEmisor?.toString() || ''           // Campo 4: Tipo de emisor (ID de T73)
    ];

    return fields.join(options.separator);
  }

  /**
   * Obtiene opciones por defecto para exportación
   * @returns Opciones por defecto
   */
  private getDefaultOptions(): ExportOptions {
    return {
      includeHeaders: true,
      dateFormat: 'dd/MM/yyyy',
      separator: '\t'  // TABULADOR según manual RVC oficial
    };
  }

  /**
   * Descarga el archivo TXT generado
   * @param data Datos a exportar
   * @param filename Nombre del archivo
   * @param options Opciones de exportación
   */
  downloadTxt(data: L01Record[], filename: string = 'L01_export.txt', options?: ExportOptions): void {
    // Validar que el archivo sea TXT
    if (!filename.toLowerCase().endsWith('.txt')) {
      throw new Error('El archivo debe tener extensión .txt');
    }
    
    const blob = this.exportToTxt(data, options);
    
    // Validar que el contenido sea texto plano, no JSON
    if (blob.type !== 'text/plain;charset=utf-8') {
      throw new Error('El archivo debe ser de tipo texto plano, no JSON');
    }
    
    const url = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  /**
   * Genera nombre de archivo según estándares L01 oficiales
   * Manual SB Marzo 2017: L01Exxxxddmmaaaa.txt
   * @param date Fecha de corte
   * @returns Nombre del archivo en formato L01 oficial
   */
  generateL01Filename(date: Date = new Date()): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    
    // Formato L01 oficial: L01E1038ddmmaaaa.txt
    // 1038 = Código del Banco Sudamericano
    return `L01E1038${day}${month}${year}.txt`;
  }

  /**
   * Obtiene información del archivo generado para validación
   * @param data Datos a exportar
   * @param options Opciones de exportación
   * @returns Información del archivo
   */
  getFileInfo(data: L01Record[], options?: ExportOptions): {
    filename: string;
    contentType: string;
    size: number;
    recordCount: number;
    format: string;
    isTxt: boolean;
    isJson: boolean;
  } {
    const filename = this.generateL01Filename();
    const blob = this.exportToTxt(data, options || this.getDefaultOptions());
    
    return {
      filename,
      contentType: blob.type,
      size: blob.size,
      recordCount: data.length,
      format: 'TXT',
      isTxt: blob.type === 'text/plain;charset=utf-8',
      isJson: false // L01 siempre es TXT, nunca JSON
    };
  }
}
