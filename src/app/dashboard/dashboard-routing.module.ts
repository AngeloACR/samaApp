import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministracionComponent } from './components/administracion/administracion.component';
import { DirectorioComponent } from './components/directorio/directorio.component';
import { GeneradorComponent } from './components/generador/generador.component';
import { RetencionesComponent } from './components/retenciones/retenciones.component';
import { HeaderComponent } from './components/header/header.component';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { BlankComponent } from './components/blank/blank.component';


import { 
  GuardService as Guard 
} from '../services/guard.service';
import { 
  RoleGuardService as RoleGuard 
} from '../services/role-guard.service';

const routes: Routes = [
  {
    path: '', 
    component: BlankComponent,
    canActivate: [Guard],  
  },
  {
    path: 'adm/:id', 
    component: AdministracionComponent,
    canActivate: [Guard],
    data: {role: 'Admin'}
  },
  {
    path: 'perfil/:id', 
    component: PerfilComponent,
    canActivate: [Guard],
  },
  {
    path: 'dir/:id', 
    component: DirectorioComponent,
    canActivate: [Guard],
    data: {
      role1: 'Admin',
      role2: 'Empleado'
    }
  },
  {
    path: 'gen/:id', 
    component: GeneradorComponent,
    canActivate: [Guard],
    data: {
      role1: 'Admin',
      role2: 'Empleado'
    }

  },
  {
    path: 'fin/:id', 
    component: RetencionesComponent,
    canActivate: [Guard],
    data: {
      role1: 'Admin',
      role2: 'Proveedor'
    }

  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {

  constructor(
  ) {

	}

 }
