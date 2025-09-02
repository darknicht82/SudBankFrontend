import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { 
  L01ExportData, 
  L01ExportOptions, 
  L01ExportResult 
} from '../../../models/l01-export.model';
import { L01FileGeneratorService } from '../../../services/l01-file-generator.service';
import { L01RvcService } from '../../../services/l01-rvc.service';
import { TxtLoggerService } from '../../../services/txt-logger.service';

/**
 * Componente para exportación de estructura L01
 * Opciones: Descarga directa o envío a RVC
 */
@Component({
  selector: 'app-l01-export',
  templateUrl: './l01-export.component.html',
  styleUrls: ['./l01-export.component.css'],
  standalone: true,
  imports: [CommonModule, DatePipe, FormsModule]
})
export class L01ExportComponent implements OnInit {

  @Input() data: L01ExportData[] = [];
  @Input() fechaCorte: Date = new Date();
  @Input() usuario: string = 'usuario.sistema';
  @Output() exportCompleted = new EventEmitter<L01ExportResult>();
  @Output() exportError = new EventEmitter<string>();

  // Estados del componente
  isExporting = false;
  isConnectedToRVC = false;
  lastExportResult: L01ExportResult | null = null;
  
  // Información del archivo
  archivoInfo: any = {};

  constructor(
    private fileGenerator: L01FileGeneratorService,
    private rvcService: L01RvcService,
    private txtLogger: TxtLoggerService
  ) { 
    this.txtLogger.info('L01ExportComponent', 'Componente de exportación inicializado');
  }

  ngOnInit(): void {
    this.actualizarInfoArchivo();
    this.verificarConexionRVC();
  }

  /**
   * Actualiza información del archivo a generar
   */
  private actualizarInfoArchivo(): void {
    if (this.data.length > 0) {
      this.archivoInfo = this.fileGenerator.obtenerInfoArchivo(this.data, this.fechaCorte);
    }
  }

  /**
   * Verifica conexión con sistema RVC
   */
  private verificarConexionRVC(): void {
    this.rvcService.verificarConectividadRVC().subscribe(
      conectado => {
        this.isConnectedToRVC = conectado;
      },
      error => {
        console.warn('No se pudo verificar conexión RVC:', error);
        this.isConnectedToRVC = false;
      }
    );
  }

  /**
   * Exporta según el tipo seleccionado
   */
  exportar(tipo: 'descargar' | 'enviar_rvc'): void {
    if (this.isExporting || this.data.length === 0) {
      return;
    }

    const options: L01ExportOptions = {
      tipo: tipo,
      fecha: this.fechaCorte,
      data: this.data,
      usuario: this.usuario
    };

    this.isExporting = true;
    this.lastExportResult = null;

    if (tipo === 'descargar') {
      this.procesarDescarga(options);
    } else {
      this.procesarEnvioRVC(options);
    }
  }

  /**
   * Procesa descarga directa
   */
  private procesarDescarga(options: L01ExportOptions): void {
    this.fileGenerator.procesarExportacion(options)
      .pipe(
        finalize(() => this.isExporting = false)
      )
      .subscribe(
        result => {
          this.lastExportResult = result;
          if (result.success) {
            this.exportCompleted.emit(result);
          } else {
            this.exportError.emit(result.message);
          }
        },
        error => {
          this.exportError.emit('Error al descargar archivo: ' + error.message);
        }
      );
  }

  /**
   * Procesa envío a RVC
   */
  private procesarEnvioRVC(options: L01ExportOptions): void {
    // Primero generar archivo
    const contenido = this.fileGenerator.generarArchivoOficial(options.data, options.fecha);
    const filename = this.fileGenerator.generarNombreArchivo(options.fecha);
    
    // Crear archivo blob
    const blob = new Blob([contenido], { type: 'text/plain;charset=utf-8' });
    const archivo = new File([blob], filename, { type: 'text/plain' });

    // Enviar a RVC
    this.rvcService.transmitirEstructura(archivo, options.usuario || 'sistema')
      .pipe(
        finalize(() => this.isExporting = false)
      )
      .subscribe(
        response => {
          const result: L01ExportResult = {
            success: response.success,
            message: response.message,
            filename: filename,
            transmissionId: response.transmissionId,
            timestamp: response.timestamp
          };
          
          this.lastExportResult = result;
          
          if (response.success) {
            this.exportCompleted.emit(result);
          } else {
            this.exportError.emit(response.message);
          }
        },
        error => {
          this.exportError.emit('Error al enviar a RVC: ' + error.message);
        }
      );
  }

  /**
   * Valida si se puede exportar
   */
  get puedeExportar(): boolean {
    return this.data.length > 0 && !this.isExporting;
  }

  /**
   * Valida si se puede enviar a RVC
   */
  get puedeEnviarRVC(): boolean {
    return this.puedeExportar && this.isConnectedToRVC;
  }

  /**
   * Obtiene estado de la conexión RVC
   */
  get estadoRVC(): string {
    if (this.isConnectedToRVC) {
      return 'Conectado';
    } else {
      return 'Desconectado';
    }
  }

  /**
   * Obtiene clase CSS para estado RVC
   */
  get claseEstadoRVC(): string {
    return this.isConnectedToRVC ? 'text-success' : 'text-warning';
  }

  /**
   * Refresca información del archivo
   */
  refrescarInfo(): void {
    this.actualizarInfoArchivo();
    this.verificarConexionRVC();
  }

  /**
   * Limpia resultado de exportación anterior
   */
  limpiarResultado(): void {
    this.lastExportResult = null;
  }
}