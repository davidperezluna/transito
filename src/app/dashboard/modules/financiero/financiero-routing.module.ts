import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FroFacTramiteComponent } from './froFactura/froFacTramite/froFacTramite.component';
import { FroFacParqueaderoComponent } from './froFactura/froFacParqueadero/froFacParqueadero.component';
import { FroReporteIngresosComponent } from './froReporteIngresos/froReporteIngresos.component';
import { FroTrteSolicitudComponent } from './froTrteSolicitud/froTrteSolicitud.component';

const routes: Routes = [
  {
    path: 'facturaTramite',
    component: FroFacTramiteComponent
  },
  {
    path: 'facturaParqueadero',
    component: FroFacParqueaderoComponent
  },
  {
    path: 'froReporteIngresos',
    component: FroReporteIngresosComponent
  },
  {
    path: 'froTrteSolicitud',
    component: FroTrteSolicitudComponent
  },
]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancieroRoutingModule { }
