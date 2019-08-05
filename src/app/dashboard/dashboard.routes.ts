/*
import { Route } from '@angular/router';

import { HomeRoutes } from './home/home.routes';
import { BancoRoutes } from './banco/banco.routes';
import { CfgValorVehiculoRoutes } from './cfgValorVehiculo/cfgValorVehiculo.routes';
import { registroEntregaProductoRoutes } from './registroEntregaProducto/registroEntregaProducto.routes';
import { GestionTransportePublicoRoutes } from './gestionTransportePublico/gestionTransportePublico.routes';
import { RpcccInventarioDocumentalRoutes } from './rpcccInventarioDocumental/rpcccInventarioDocumental.routes';
import { rnaRegistroInsumosRoutes } from './rnaRegistroInsumos/rnaRegistroInsumos.routes';
import { RnmaPreregistroRoutes } from './rnmaPreregistro/rnmaPreregistro.routes'; 
import { ReporteRoutes } from './reporte/reporte.routes';
import { DashboardComponent } from '.';

export const DashboardRoutes: Route[] = [
  {
    path: 'dashboard', 
    component: DashboardComponent,
    loadChildren: [
      ...HomeRoutes,
      ...BancoRoutes,
      ...registroEntregaProductoRoutes,
      ...GestionTransportePublicoRoutes,
      ...rnaRegistroInsumosRoutes,
      ...RnmaPreregistroRoutes,
      ...CfgValorVehiculoRoutes,
      ...ReporteRoutes,
      ...RpcccInventarioDocumentalRoutes
    ]
  }
];
*/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component'; 

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: DashboardComponent
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