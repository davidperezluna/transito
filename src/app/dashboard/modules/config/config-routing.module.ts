import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CfgAdmFormatoTipoComponent } from './cfgAdmFormatoTipo/cfgAdmFormatoTipo.component';

const routes: Routes = [
  {
    path: 'cfgAdmFormatoTipo',
    component: CfgAdmFormatoTipoComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigRoutingModule { }
