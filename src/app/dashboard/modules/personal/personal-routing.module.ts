import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PnalAsignacionComponent } from './pnalAsignacion/pnalAsignacion.component';
import { PnalCfgCdoBodegaComponent } from './pnalCfgCdoBodega/pnalCfgCdoBodega.component';
import { PnalCfgCdoConsecutivoComponent } from './pnalCfgCdoConsecutivo/pnalCfgCdoConsecutivo.component';
import { PnalFuncionarioComponent } from './pnalFuncionario/pnalFuncionario.component';
import { PnalTalonarioComponent } from './pnalTalonario/pnalTalonario.component';

const routes: Routes = [
  {
    path: 'pnalAsignacion',
    component: PnalAsignacionComponent
  },
  {
    path: 'pnalCfgCdoBodega',
    component: PnalCfgCdoBodegaComponent
  },
  {
    path: 'pnalCfgCdoConsecutivo',
    component: PnalCfgCdoConsecutivoComponent
  },
  {
    path: 'pnalFuncionario',
    component: PnalFuncionarioComponent
  },
  {
    path: 'pnalTalonario',
    component: PnalTalonarioComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalRoutingModule { }
