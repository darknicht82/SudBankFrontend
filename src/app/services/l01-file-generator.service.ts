import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { 
  L01ExportData, 
  L01ExportOptions, 
  L01ExportResult, 
  L01CabeceraOficial,
  L01FileValidator 
} from '../models/l01-export.model';
import { LoggerService } from './logger.service';

/**
 * Servicio para generar archivos oficiales L01
 * Según Manual SB - Estructura de Control de Inversiones
 * Formato: L01E1038ddmmaaaa.txt
 */
@Injectable({
  providedIn: 'root'
})
export class L01FileGeneratorService {

  private readonly CODIGO_ESTRUCTURA = 'L01';
  private readonly CODIGO_ENTIDAD = '1038'; // Banco Sudamericano
  private readonly PERIODICIDAD = 'E'; // Eventual

  constructor(private logger: LoggerService) {
    this.logger.info('L01FileGenerator', 'Servicio inicializado');
  }

  /**
   * Genera archivo oficial L01 según especificaciones SB
   */
  generarArchivoOficial(data: L01ExportData[], fecha: Date): string {
    const cabecera = this.generarCabeceraOficial(fecha, data.length + 1); // +1 por la cabecera
    const lineasDetalle = data.map(item => this.generarLineaDetalle(item));
    
    return [cabecera, ...lineasDetalle].join('\n');
  }

  /**
   * Genera cabecera oficial según manual SB
   * Formato: L01|1038|dd/mm/aaaa|00000XXX
   */
  private generarCabeceraOficial(fecha: Date, totalRegistros: number): string {
    const fechaFormateada = this.formatearFecha(fecha);
    const totalFormateado = totalRegistros.toString().padStart(8, '0');
    
    return `${this.CODIGO_ESTRUCTURA}|${this.CODIGO_ENTIDAD}|${fechaFormateada}|${totalFormateado}`;
  }

  /**
   * Genera línea de detalle según manual SB
   * Formato: R|RUC|clasificacion|tipo
   */
  private generarLineaDetalle(item: L01ExportData): string {
    return `${item.tipoIdentificacion}|${item.identificacion}|${item.clasificacion}|${item.tipoEmisor}`;
  }

  /**
   * Genera nombre de archivo oficial
   * Formato: L01E1038ddmmaaaa.txt
   */
  generarNombreArchivo(fecha: Date): string {
    const fechaFormateada = this.formatearFechaArchivo(fecha);
    return `${this.CODIGO_ESTRUCTURA}${this.PERIODICIDAD}${this.CODIGO_ENTIDAD}${fechaFormateada}.txt`;
  }

  /**
   * Procesa exportación según tipo seleccionado
   */
  procesarExportacion(options: L01ExportOptions): Observable<L01ExportResult> {
    this.logger.info('L01FileGenerator', `Iniciando exportación tipo: ${options.tipo}`, {
      registros: options.data.length,
      fecha: options.fecha
    });

    try {
      if (options.tipo === 'descargar') {
        return this.descargarArchivo(options);
      } else {
        return this.prepararEnvioRVC(options);
      }
    } catch (error) {
      this.logger.error('L01FileGenerator', 'Error al procesar exportación', error, options);
      return of({
        success: false,
        message: `Error al procesar exportación: ${error}`,
        timestamp: new Date()
      });
    }
  }

  /**
   * Descarga directa del archivo TXT
   */
  private descargarArchivo(options: L01ExportOptions): Observable<L01ExportResult> {
    const contenido = this.generarArchivoOficial(options.data, options.fecha);
    const filename = this.generarNombreArchivo(options.fecha);
    
    // Validar contenido antes de descargar
    if (!this.validarContenidoArchivo(contenido)) {
      this.logger.error('L01FileGenerator', 'Error de validación en contenido', null, { filename, contenido });
      return of({
        success: false,
        message: 'Error de validación en el contenido del archivo',
        timestamp: new Date()
      });
    }

    // Crear y descargar archivo
    const blob = new Blob([contenido], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    this.logger.logExport('download', filename, true);
    return of({
      success: true,
      message: 'Archivo descargado exitosamente',
      filename: filename,
      timestamp: new Date()
    });
  }

  /**
   * Prepara archivo para envío a RVC
   */
  private prepararEnvioRVC(options: L01ExportOptions): Observable<L01ExportResult> {
    const contenido = this.generarArchivoOficial(options.data, options.fecha);
    const filename = this.generarNombreArchivo(options.fecha);
    
    // Validar contenido antes de enviar
    if (!this.validarContenidoArchivo(contenido)) {
      return of({
        success: false,
        message: 'Error de validación en el contenido del archivo',
        timestamp: new Date()
      });
    }

    // TODO: Integrar con servicio RVC real
    // Por ahora simular envío exitoso
    const transmissionId = this.generarTransmissionId();
    
    return of({
      success: true,
      message: 'Archivo preparado para envío a RVC',
      filename: filename,
      transmissionId: transmissionId,
      timestamp: new Date()
    });
  }

  /**
   * Valida contenido completo del archivo
   */
  private validarContenidoArchivo(contenido: string): boolean {
    const lineas = contenido.split('\n');
    
    if (lineas.length === 0) return false;
    
    // Validar cabecera
    if (!L01FileValidator.validarCabecera(lineas[0])) {
      console.error('Error en validación de cabecera:', lineas[0]);
      return false;
    }
    
    // Validar líneas de detalle
    for (let i = 1; i < lineas.length; i++) {
      if (!L01FileValidator.validarLineaDetalle(lineas[i])) {
        console.error('Error en validación de línea detalle:', lineas[i]);
        return false;
      }
    }
    
    return true;
  }

  /**
   * Formatea fecha para cabecera (dd/mm/aaaa)
   */
  private formatearFecha(fecha: Date): string {
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const año = fecha.getFullYear().toString();
    return `${dia}/${mes}/${año}`;
  }

  /**
   * Formatea fecha para nombre archivo (ddmmaaaa)
   */
  private formatearFechaArchivo(fecha: Date): string {
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const año = fecha.getFullYear().toString();
    return `${dia}${mes}${año}`;
  }

  /**
   * Genera ID único para transmisión
   */
  private generarTransmissionId(): string {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2, 8);
    return `L01_${this.CODIGO_ENTIDAD}_${timestamp}_${random}`.toUpperCase();
  }

  /**
   * Obtiene información del archivo a generar
   */
  obtenerInfoArchivo(data: L01ExportData[], fecha: Date): any {
    return {
      nombre: this.generarNombreArchivo(fecha),
      estructura: this.CODIGO_ESTRUCTURA,
      entidad: this.CODIGO_ENTIDAD,
      periodicidad: this.PERIODICIDAD,
      fecha: this.formatearFecha(fecha),
      totalRegistros: data.length + 1, // +1 por cabecera
      tamaño: this.estimarTamañoArchivo(data)
    };
  }

  /**
   * Estima tamaño del archivo en bytes
   */
  private estimarTamañoArchivo(data: L01ExportData[]): number {
    // Estimar basado en estructura típica
    const tamañoCabecera = 25; // Aproximado
    const tamañoLineaDetalle = 30; // Aproximado por línea
    return tamañoCabecera + (data.length * tamañoLineaDetalle);
  }
}
