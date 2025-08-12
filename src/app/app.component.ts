import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [HeaderComponent, FooterComponent, RouterModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true
})
export class AppComponent {
  constructor(private router: Router) {
    console.log('AppComponent inicializado');
    console.log('Rutas disponibles:', this.router.config);
  }
}
