import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SvIpatImpresoBodegaComponent } from './svIpatImpresoBodega/svIpatImpresoBodega.component';
import { SvIpatImpresoAsignacionComponent } from './svIpatImpresoAsignacion/svIpatImpresoAsignacion.component';
import { SvIpatImpresoMunicipioComponent } from './svIpatImpresoMunicipio/svIpatImpresoMunicipio.component';

const routes: Routes = [
  {
    path: 'svIpatImpresoBodega',
    component: SvIpatImpresoBodegaComponent
  },
  {
    path: 'svIpatImpresoAsignacion',
    component: SvIpatImpresoAsignacionComponent
  },
  {
    path: 'svIpatImpresoMunicipio',
    component: SvIpatImpresoMunicipioComponent
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadVialRoutingModule { }
