import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BancoProyectoComponent } from './banco-proyecto.component';

const routes: Routes = [
  {
    path: 'bancoProyecto',
    component: BancoProyectoComponent,
    children: [
      /*{
        path: '',
        redirectTo: 'battle-child',
        pathMatch: 'full'
      },*/
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
        path: 'bpProyecto',
        loadChildren: './bpProyecto/bpProyecto.module#BpProyectoModule'
      },
      {
        path: 'bpCdp',
        loadChildren: './bpCdp/bpCdp.module#BpCdpModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BancoProyectoRoutingModule { }
