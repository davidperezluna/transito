import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VhloCfgNivelServicioComponent } from './vhloCfgNivelServicio/vhloCfgNivelServicio.component';
import { VhloTpAsignacionComponent } from './vhloTpAsignacion/vhloTpAsignacion.component';
import { VhloTpConvenioComponent } from './vhloTpConvenio/vhloTpConvenio.component';
import { VhloTpRangoComponent } from './vhloTpRango/vhloTpRango.component';
import { VhloTpTarjetaOperacionComponent } from './vhloTpTarjetaOperacion/vhloTpTarjetaOperacion.component';

const routes: Routes = [
  {
    path: 'vhloCfgNivelServicio',
    component: VhloCfgNivelServicioComponent
  },
  {
    path: 'vhloTpAsignacion',
    component: VhloTpAsignacionComponent
  },
  {
    path: 'vhloTpConvenio',
    component: VhloTpConvenioComponent
  },
  {
    path: 'vhloTpRango',
    component: VhloTpRangoComponent
  },
  {
    path: 'vhloTpTarjetaOperacion',
    component: VhloTpTarjetaOperacionComponent
  },
]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiculoRoutingModule { }
