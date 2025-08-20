import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { L08MainComponent } from './pages/l08-dashboard/l08-main/l08-main.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

// ✅ L01: Componentes eliminados - Solo se mantiene L01ModalFormComponent (standalone)

@NgModule({
  declarations: [
    //AppComponent,
    DashboardComponent,
    //L08MainComponent
    // ✅ L01: Componentes eliminados - Solo se mantiene L01ModalFormComponent (standalone)
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    MenubarModule,
    MatDialogModule,
    MatButtonModule,
  ],
  providers: [
    DatePipe
  ],
  bootstrap: []
})
export class AppModule { }
