import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';

import { registerLocaleData } from '@angular/common';
import localeVE from '@angular/common/locales/es-VE';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AdministracionComponent } from './components/administracion/administracion.component';
import { DirectorioComponent } from './components/directorio/directorio.component';
import { GeneradorComponent } from './components/generador/generador.component';
import { RetencionesComponent } from './components/retenciones/retenciones.component';
import { HeaderComponent } from './components/header/header.component';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { BlankComponent } from './components/blank/blank.component';
import { DbHandlerService } from './services/db-handler.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    DashboardComponent,
    AdministracionComponent,
    DirectorioComponent,
    GeneradorComponent,
    RetencionesComponent,
    HeaderComponent,
    SidemenuComponent, PerfilComponent, BlankComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  exports: [
    DashboardComponent
  ],
  providers: [
    DbHandlerService,
    DatePipe,
    { provide: LOCALE_ID, useValue: 'es-VE' }
  ],
})
export class DashboardModule { }
