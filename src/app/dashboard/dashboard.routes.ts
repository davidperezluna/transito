import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component'; 

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'banco-proyecto',
        loadChildren: './modules/banco-proyecto/banco-proyecto.module#BancoProyectoModule'
      },
      /*{
        path: 'config',
        loadChildren: './modules/config/config.module#ConfigModule'
      },*/
      {
        path: 'contravencional',
        loadChildren: './modules/contravencional/contravencional.module#ContravencionalModule'
      },
      {
        path: 'financiero',
        loadChildren: './modules/financiero/financiero.module#FinancieroModule'
      },
      {
        path: 'gestion-documental',
        loadChildren: './modules/gestion-documental/gestion-documental.module#GestionDocumentalModule'
      },
      /*{
        path: 'insumo',
        loadChildren: './modules/insumo/insumo.module#InsumoModule'
      },*/
      {
        path: 'parqueadero',
        loadChildren: './modules/parqueadero/parqueadero.module#ParqueaderoModule'
      },
      {
        path: 'personal',
        loadChildren: './modules/personal/personal.module#PersonalModule'
      },
      {
        path: 'seguridad-vial',
        loadChildren: './modules/seguridad-vial/seguridad-vial.module#SeguridadVialModule'
      },
      {
        path: 'usuario',
        loadChildren: './modules/usuario/usuario.module#UsuarioModule'
      },
      {
        path: 'vehiculo',
        loadChildren: './modules/vehiculo/vehiculo.module#VehiculoModule'
      },
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class DashboardRoutes { }