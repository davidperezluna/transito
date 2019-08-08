import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BpActividadComponent } from './bpActividad/bpActividad.component';
import { BpCdpComponent } from './bpCdp/bpCdp.component';
import { BpCfgTipoInsumoComponent } from './bpCfgTipoInsumo/bpCfgTipoInsumo.component';
import { BpCuentaComponent } from './bpCuenta/bpCuenta.component';
import { BpInsumoComponent } from './bpInsumo/bpInsumo.component';
import { BpProyectoComponent } from './bpProyecto/bpProyecto.component';
import { RequestComponent } from './bpCdp/request/request.component';

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
    component: RequestComponent
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BancoProyectoRoutingModule { }
