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

// Componentes L01
import { L01FormComponent } from './components/l01/l01-form/l01-form.component';
import { L01TableComponent } from './components/l01/l01-table/l01-table.component';
import { L01ValidateComponent } from './components/l01/l01-validate/l01-validate.component';
import { L01ArchiveComponent } from './components/l01/l01-archive/l01-archive.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    L08MainComponent,
    L01FormComponent,
    L01TableComponent,
    L01ValidateComponent,
    L01ArchiveComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    MenubarModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
