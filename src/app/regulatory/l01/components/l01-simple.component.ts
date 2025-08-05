import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-l01-simple',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 20px; background: white; border-radius: 8px; margin: 20px;">
      <h2>L01 - Emisores, Custodios y Depositarios</h2>
      <p>Componente de prueba funcionando correctamente</p>
      
      <div style="margin: 20px 0;">
        <h3>Datos de Prueba:</h3>
        <ul>
          <li>Ecuador (R) - 1791234567001 - Clasificación 1</li>
          <li>Extranjero (X) - US123456789 - Clasificación 2</li>
          <li>Ecuador (R) - 1798765432001 - Clasificación 1</li>
        </ul>
      </div>
      
      <div style="background: #f0f0f0; padding: 15px; border-radius: 5px;">
        <h4>KPIs:</h4>
        <p>Total Registros: 3</p>
        <p>Emisores Ecuador: 2</p>
        <p>Emisores Extranjeros: 1</p>
      </div>
      
      <button style="background: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 5px; margin-top: 20px;">
        Exportar Reporte
      </button>
    </div>
  `
})
export class L01SimpleComponent {
  constructor() {
    console.log('L01SimpleComponent cargado correctamente');
  }
} 