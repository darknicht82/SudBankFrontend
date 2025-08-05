/**
 * Catálogo Oficial - Tabla 41-A: Tipo de Títulos Valores
 * 
 * Este catálogo define los diferentes tipos de títulos valores utilizados
 * como garantía en las operaciones crediticias del sistema financiero.
 * 
 * Fuente: Manual de Reportes Regulatorios - SudBank
 * Versión: 2024
 */

export interface TipoTituloValor {
  codigo: string;
  descripcion: string;
  categoria?: string;
}

export const TIPOS_TITULOS_VALORES: TipoTituloValor[] = [
  { codigo: '2', descripcion: 'Aceptaciones bancarias' },
  { codigo: '3', descripcion: 'Avales' },
  { codigo: '4', descripcion: 'Bonos u obligaciones de agencias gubernamentales' },
  { codigo: '5', descripcion: 'Bonos u obligaciones de Entidades Públicas financieras' },
  { codigo: '6', descripcion: 'Bonos u obligaciones de Entidades Públicas no financieras' },
  { codigo: '7', descripcion: 'Bonos u obligaciones de Gobiernos Extranjeros (Deuda soberana)' },
  { codigo: '8', descripcion: 'Bonos u obligaciones de Gobiernos Seccionales' },
  { codigo: '9', descripcion: 'Bonos u obligaciones de organismos supranacionales' },
  { codigo: '10', descripcion: 'Bonos u obligaciones del Gobierno Nacional' },
  { codigo: '11', descripcion: 'Cédulas hipotecarias' },
  { codigo: '13', descripcion: 'Certificados de arrendamiento mercantil' },
  { codigo: '14', descripcion: 'Certificados de depósito' },
  { codigo: '15', descripcion: 'Certificados de depósito reprogramados' },
  { codigo: '17', descripcion: 'Certificados tributarios' },
  { codigo: '21', descripcion: 'Cuotas en fondos administrados – Deuda soberana' },
  { codigo: '22', descripcion: 'Cuotas en fondos administrados – financieros' },
  { codigo: '23', descripcion: 'Cuotas en fondos administrados – Money Market' },
  { codigo: '24', descripcion: 'Cuotas en fondos administrados – no financieros' },
  { codigo: '25', descripcion: 'Cupones' },
  { codigo: '26', descripcion: 'Depósitos en garantía' },
  { codigo: '27', descripcion: 'Letras de cambio' },
  { codigo: '28', descripcion: 'Minerales preciosos acuñados o en barra' },
  { codigo: '29', descripcion: 'Notas estructuradas con protección de capital' },
  { codigo: '30', descripcion: 'Notas estructuradas sin protección de capital' },
  { codigo: '31', descripcion: 'Obligaciones del sector financiero privado' },
  { codigo: '32', descripcion: 'Obligaciones del sector no financiero privado' },
  { codigo: '34', descripcion: 'Pagarés' },
  { codigo: '35', descripcion: 'Papel comercial' },
  { codigo: '37', descripcion: 'Titularización cartera comercial' },
  { codigo: '38', descripcion: 'Titularización cartera de consumo' },
  { codigo: '39', descripcion: 'Titularización cartera hipotecaria' },
  { codigo: '40', descripcion: 'Titularización de flujos futuros (financieros)' },
  { codigo: '41', descripcion: 'Titularización de flujos futuros (no financieros)' },
  { codigo: '42', descripcion: 'Cuotas de Fondos de Inversión Colectivos' },
  { codigo: '48', descripcion: 'Derechos fiduciarios' },
  { codigo: '49', descripcion: 'Acciones' }
];

export const getTiposTitulosValores = (): TipoTituloValor[] => {
  return TIPOS_TITULOS_VALORES;
};

export const getTipoTituloValorByCodigo = (codigo: string): TipoTituloValor | undefined => {
  return TIPOS_TITULOS_VALORES.find(item => item.codigo === codigo);
};

export const getTipoTituloValorDescripcion = (codigo: string): string => {
  const item = getTipoTituloValorByCodigo(codigo);
  return item ? item.descripcion : '';
};

export const getTiposTitulosValoresBonos = (): TipoTituloValor[] => {
  return TIPOS_TITULOS_VALORES.filter(item => 
    ['4', '5', '6', '7', '8', '9', '10', '11'].includes(item.codigo)
  );
};

export const getTiposTitulosValoresCertificados = (): TipoTituloValor[] => {
  return TIPOS_TITULOS_VALORES.filter(item => 
    ['13', '14', '15', '17'].includes(item.codigo)
  );
};

export const getTiposTitulosValoresTitularizacion = (): TipoTituloValor[] => {
  return TIPOS_TITULOS_VALORES.filter(item => 
    ['37', '38', '39', '40', '41'].includes(item.codigo)
  );
}; 