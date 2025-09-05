/**
 * Modelos para exportación de estructura L01
 * Según Manual SB - Estructura de Control de Inversiones
 * Código Banco: 1038
 */

export interface L01ExportData {
  tipoIdentificacion: string; // R o X (Tabla 4)
  identificacion: string; // RUC o código tabla 164
  clasificacion: number; // Tabla 173
  tipoEmisor: number; // Tabla 73
}

export interface L01ExportOptions {
  tipo: 'descargar' | 'enviar_rvc';
  fecha: Date;
  data: L01ExportData[];
  usuario?: string;
}

export interface L01ExportResult {
  success: boolean;
  message: string;
  filename?: string;
  transmissionId?: string;
  timestamp: Date;
}

export interface L01CabeceraOficial {
  codigoEstructura: string; // "L01"
  codigoEntidad: string; // "1038"
  fechaDatos: string; // dd/mm/aaaa
  totalRegistros: string; // 8 dígitos con ceros a la izquierda
}

export interface RVCTransmissionResponse {
  success: boolean;
  transmissionId: string;
  status: 'enviado' | 'validando' | 'validado' | 'rechazado';
  message: string;
  timestamp: Date;
  errors?: string[];
}

export interface RVCBitacora {
  id: string;
  estructura: string;
  fecha: Date;
  usuario: string;
  estado: 'enviado' | 'validando' | 'validado' | 'rechazado';
  archivo: string;
  observaciones?: string;
}

export class L01FileValidator {
  static validarNombreArchivo(filename: string): boolean {
    // Formato: L01E1038ddmmaaaa.txt
    const pattern = /^L01E1038\d{8}\.txt$/;
    return pattern.test(filename);
  }

  static validarCabecera(cabecera: string): boolean {
    // Formato: L01|1038|dd/mm/aaaa|00000XXX
    const parts = cabecera.split('|');
    if (parts.length !== 4) return false;
    
    return parts[0] === 'L01' && 
           parts[1] === '1038' && 
           /^\d{2}\/\d{2}\/\d{4}$/.test(parts[2]) &&
           /^\d{8}$/.test(parts[3]);
  }

  static validarLineaDetalle(linea: string): boolean {
    // Formato: R|RUC|clasificacion|tipo
    const parts = linea.split('|');
    if (parts.length !== 4) return false;
    
    const [tipoId, identificacion, clasificacion, tipo] = parts;
    
    // Validar tipo identificación
    if (!['R', 'X'].includes(tipoId)) return false;
    
    // Validar identificación según tipo
    if (tipoId === 'R' && identificacion.length !== 13) return false;
    if (tipoId === 'X' && identificacion.length !== 7) return false;
    
    // Validar que clasificación y tipo sean numéricos
    if (!/^\d+$/.test(clasificacion) || !/^\d+$/.test(tipo)) return false;
    
    return true;
  }
}
