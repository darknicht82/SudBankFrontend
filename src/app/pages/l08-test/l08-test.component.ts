import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-l08-test',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 2rem; background: #f0f9ff; min-height: 100vh;">
      <div style="background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
        <h1 style="color: #1e3a8a; margin-bottom: 1rem;">🎉 ¡L08 Funcionando!</h1>
        <p style="font-size: 1.2rem; color: #374151; margin-bottom: 1rem;">
          El componente L08 se está cargando correctamente.
        </p>
        <div style="background: #ecfdf5; padding: 1rem; border-radius: 4px; border-left: 4px solid #10b981;">
          <h3 style="color: #065f46; margin: 0 0 0.5rem 0;">✅ Estado del Sistema</h3>
          <ul style="color: #047857; margin: 0; padding-left: 1.5rem;">
            <li>Componente L08 cargado exitosamente</li>
            <li>Navegación funcionando</li>
            <li>Rutas configuradas correctamente</li>
            <li>Frontend ejecutándose en puerto 4200</li>
          </ul>
        </div>
        <div style="margin-top: 2rem; padding: 1rem; background: #fef3c7; border-radius: 4px; border-left: 4px solid #f59e0b;">
          <h3 style="color: #92400e; margin: 0 0 0.5rem 0;">🔧 Próximos Pasos</h3>
          <p style="color: #78350f; margin: 0;">
            Ahora puedes navegar a los subcomponentes: /l08/historico, /l08/comparar, /l08/auditoria
          </p>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class L08TestComponent {
  constructor() {
    console.log('L08TestComponent cargado exitosamente');
  }
} 
