import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FroFacTramiteComponent } from './froFactura/froFacTramite/froFacTramite.component';
import { FroFacParqueaderoComponent } from './froFactura/froFacParqueadero/froFacParqueadero.component';
import { FroReporteIngresosComponent } from './froReporteIngresos/froReporteIngresos.component';
import { FroTrteSolicitudComponent } from './froTrteSolicitud/froTrteSolicitud.component';
import { NewRnaComponent } from './froTrteSolicitud/newRna/newRna.component';
import { NewRnetComponent } from './froTrteSolicitud/newRnet/newRnet.component';

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
  {
    path: 'tramitesolicitud/rna',
    component: NewRnaComponent
  },
  {
    path: 'tramitesolicitud/rnet',
    component: NewRnetComponent
  },
]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancieroRoutingModule { }
