import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BpActividadComponent } from './bpActividad/bpActividad.component';
import { BpCdpComponent } from './bpCdp/bpCdp.component';
import { BpRegistroCompromisoComponent } from './bpRegistroCompromiso/bpRegistroCompromiso.component';
import { BpCfgTipoInsumoComponent } from './bpCfgTipoInsumo/bpCfgTipoInsumo.component';
import { BpCuentaComponent } from './bpCuenta/bpCuenta.component';
import { BpInsumoComponent } from './bpInsumo/bpInsumo.component';
import { BpProyectoComponent } from './bpProyecto/bpProyecto.component';
import { BpOrdenPagoComponent } from './bpOrdenPago/bpOrdenPago.component';
import { RequestCdpComponent } from './bpCdp/request/request.component';
import { RequestCompromisoComponent } from './bpRegistroCompromiso/request/request.component';
import { BpReduccionComponent } from './bpReduccion/bpReduccion.component';

const routes: Routes = [
  {
    path: 'bpActividad',
    component: BpActividadComponent
  },
  {
    path: 'bpCdp',
    component: BpCdpComponent
  },
  {
    path: 'request',
    component: RequestCdpComponent
  },
  {
    path: 'bpRegistroCompromiso',
    component: BpRegistroCompromisoComponent
  },
  {
    path: 'requestCompromiso',
    component: RequestCompromisoComponent
  },
  {
    path: 'bpCfgTipoInsumo',
    component: BpCfgTipoInsumoComponent
  },
  {
    path: 'bpCuenta',
    component: BpCuentaComponent
  },
  {
    path: 'bpInsumo',
    component: BpInsumoComponent
  },
  {
    path: 'bpProyecto',
    component: BpProyectoComponent
  },
  {
    path: 'bpOrdenPago',
    component: BpOrdenPagoComponent
  },
  {
    path: 'bpReduccion',
    component: BpReduccionComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BancoProyectoRoutingModule { }
