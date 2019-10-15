import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VhloBuscarComponent } from './vhloBuscar/vhloBuscar.component';
import { VhloCertificadoTradicionComponent } from './vhloCertificadoTradicion/vhloCertificadoTradicion.component';
import { VhloCfgNivelServicioComponent } from './vhloCfgNivelServicio/vhloCfgNivelServicio.component';
import { VhloCfgPlacaComponent } from './vhloCfgPlaca/vhloCfgPlaca.component';
import { VhloCfgPlacaReportComponent } from './vhloCfgPlaca/report/report.component';
import { VhloCfgValorComponent } from './vhloCfgValor/vhloCfgValor.component';
import { VhloLimitacionComponent } from './vhloLimitacion/vhloLimitacion.component';
import { VhloLimitacionDeleteComponent } from './vhloLimitacion/delete/delete.component';
import { VhloPlacaSedeComponent } from './vhloPlacaSede/vhloPlacaSede.component';
import { VhloPlacaSedeDeliveredComponent } from './vhloPlacaSede/delivered/delivered.component';
import { VhloTpAsignacionComponent } from './vhloTpAsignacion/vhloTpAsignacion.component';
import { VhloTpConvenioComponent } from './vhloTpConvenio/vhloTpConvenio.component';
import { VhloTpRangoComponent } from './vhloTpRango/vhloTpRango.component';
import { VhloTpTarjetaOperacionComponent } from './vhloTpTarjetaOperacion/vhloTpTarjetaOperacion.component';
import { VhloRnaPreregistroComponent } from "./vhloRnaPreregistro/vhloRnaPreregistro.component";
import { VhloRnaPreasignacionPlacaComponent } from "./vhloRnaPreasignacionPlaca/vhloRnaPreasignacionPlaca.component";
import { VhloRnmaPreregistroComponent } from "./vhloRnmaPreregistro/vhloRnmaPreregistro.component";
import { VhloRnrsPreregistroComponent } from './vhloRnrsPreregistro/vhloRnrsPreregistro.component';
import { VhloDevolucionRadicadoComponent } from './vhloDevolucionRadicado/vhloDevolucionRadicado.component';

const routes: Routes = [
  {
    path: 'vhloBuscar',
    component: VhloBuscarComponent
  },
  {
    path: 'VhloCertificadoTradicionComponent',
    component: VhloCertificadoTradicionComponent
  },
  {
    path: 'vhloCfgNivelServicio',
    component: VhloCfgNivelServicioComponent
  },
  {
    path: 'vhloCfgPlaca',
    component: VhloCfgPlacaComponent
  },
  {
    path: 'vhloCfgPlacaReport',
    component: VhloCfgPlacaReportComponent
  },
  {
    path: 'limitacion/levantamiento',
    component: VhloLimitacionDeleteComponent
  },
  {
    path: 'vhloLimitacion',
    component: VhloLimitacionComponent
  },
  {
    path: 'vhloPlacaSede',
    component: VhloPlacaSedeComponent
  },
  {
    path: 'vhloPlacaEntrega',
    component: VhloPlacaSedeDeliveredComponent
  },
  {
    path: 'vhloCfgValor',
    component: VhloCfgValorComponent
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
  {
    path: 'vhloRnaPreregistro',
    component: VhloRnaPreregistroComponent
  },
  {
    path: 'vhloRnaPreAsignacionPlaca',
    component: VhloRnaPreasignacionPlacaComponent
  },
  {
    path: 'vhloRnmaPreregistro',
    component: VhloRnmaPreregistroComponent
  },
  {
    path: 'vhloRnrsPreregistro',
    component: VhloRnrsPreregistroComponent
  },
  {
    path: 'vhloDevolucionRadicado',
    component: VhloDevolucionRadicadoComponent
  },
]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiculoRoutingModule { }
