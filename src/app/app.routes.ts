/*import { Routes } from '@angular/router';

import { LoginRoutes } from './login/login.routes';
import { DashboardRoutes } from './dashboard/dashboard.routes';
import { LoginComponent } from './login';

export const routes: Routes = [
  ...LoginRoutes,
  ...DashboardRoutes,
  {
    path: '**',
    component: LoginComponent
   }
];*/

import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule'
  },
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'bancoProyecto',
    loadChildren: './banco-proyecto/banco-proyecto.module#BancoProyectoModule'
  },
  {
    path: 'config',
    loadChildren: './config/config.module#ConfigModule'
  },
  {
    path: 'contravencional',
    loadChildren: './contravencional/contravencional.module#ContravencionalModule'
  },
  {
    path: 'financiero',
    loadChildren: './financiero/financiero.module#FinancieroModule'
  },
  {
    path: 'gestion-documental',
    loadChildren: './gestion-documental/gestion-documental.module#GestionDocumentalModule'
  },
  {
    path: 'insumo',
    loadChildren: './insumo/insumo.module#InsumoModule'
  },
  {
    path: 'parqueadero',
    loadChildren: './parqueadero/parqueadero.module#ParqueaderoModule'
  },
  {
    path: 'personal',
    loadChildren: './personal/personal.module#PersonalModule'
  },
  {
    path: 'seguridad-vial',
    loadChildren: './seguridad-vial/seguridad-vial.module#SeguridadVialModule'
  },
  {
    path: 'usuario',
    loadChildren: './usuario/usuario.module#UsuarioModule'
  },
  {
    path: 'vehiculo',
    loadChildren: './vehiculo/vehiculo.module#VehiculoModule'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }