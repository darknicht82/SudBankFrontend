import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  version = '1.0.0';
  
  // Información del sistema
  systemInfo = {
    name: 'SudBank Risk Dashboard',
    version: this.version,
    environment: 'Desarrollo',
    lastUpdate: new Date().toLocaleDateString('es-EC'),
    support: 'soporte@sudamericano.fin.ec'
  };

  // Enlaces útiles
  usefulLinks = [
    { label: 'Documentación', url: '#', icon: 'pi pi-book' },
    { label: 'Soporte Técnico', url: '#', icon: 'pi pi-question-circle' },
    { label: 'Política de Privacidad', url: '#', icon: 'pi pi-shield' },
    { label: 'Términos de Uso', url: '#', icon: 'pi pi-file' }
  ];

  constructor() {
    console.log('FooterComponent inicializado');
  }

  // Métodos de utilidad
  getCurrentTime(): string {
    return new Date().toLocaleTimeString('es-EC');
  }

  openLink(url: string): void {
    console.log('Abriendo enlace:', url);
    // En una implementación real, esto abriría el enlace
  }
}
