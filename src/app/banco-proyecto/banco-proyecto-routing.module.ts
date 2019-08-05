import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
      path: '',
      redirectTo: 'bpProyecto',
      pathMatch: 'full'
    },
    {
      path: 'bpProyecto',
      loadChildren: './bpProyecto/bpProyecto.module#BpProyectoModule'
    },
    {
      path: 'bpCfgTipoInsumo',
      loadChildren: './bpCfgTipoInsumo/bpCfgTipoInsumo.module#BpCfgTipoInsumoModule'
    },
    {
      path: 'bpActividad',
      loadChildren: './bpActividad/bpActividad.module#BpActividadModule'
    },
    {
      path: 'bpInsumo',
      loadChildren: './bpInsumo/bpInsumo.module#BpInsumoModule'
    },
    {
      path: 'bpCuenta',
      loadChildren: './bpCuenta/bpCuenta.module#BpCuentaModule'
    },
    {
      path: 'bpCdp',
      loadChildren: './bpCdp/bpCdp.module#BpCdpModule'
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BancoProyectoRoutingModule { }
