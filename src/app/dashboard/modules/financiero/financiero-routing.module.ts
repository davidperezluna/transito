import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FroFacParqueaderoComponent } from './froFactura/froFacParqueadero/froFacParqueadero.component';
import { FroReporteIngresosComponent } from './froReporteIngresos/froReporteIngresos.component';

const routes: Routes = [
  {
    path: 'facturaParqueadero',
    component: FroFacParqueaderoComponent
  },
  {
    path: 'froReporteIngresos',
    component: FroReporteIngresosComponent
  },
]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancieroRoutingModule { }
