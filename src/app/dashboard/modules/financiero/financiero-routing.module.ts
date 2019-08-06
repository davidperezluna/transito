import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FroFacParqueaderoComponent } from './froFactura/froFacParqueadero/froFacParqueadero.component';

const routes: Routes = [
  {
    path: 'facturaParqueadero',
    component: FroFacParqueaderoComponent
  }
]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancieroRoutingModule { }
