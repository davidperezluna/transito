import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CfgAdmFormatoComponent } from './cfgAdmFormato/cfgAdmFormato.component';
import { CfgAdmFormatoTipoComponent } from './cfgAdmFormatoTipo/cfgAdmFormatoTipo.component';
import { CfgAuditoriaComponent } from './cfgAuditoria/cfgAuditoria.component';
import { CfgFestivoComponent } from './cfgFestivo/cfgFestivo.component';
import { CfgClaveComponent } from './cfgClave/cfgClave.component';

const routes: Routes = [
  {
    path: 'cfgAdmFormato',
    component: CfgAdmFormatoComponent
  },
  {
    path: 'cfgAuditoria',
    component: CfgAuditoriaComponent
  },
  {
    path: 'cfgAdmFormatoTipo',
    component: CfgAdmFormatoTipoComponent
  },
  {
    path: 'cfgFestivo',
    component: CfgFestivoComponent
  },
  {
    path: 'cfgClave',
    component: CfgClaveComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigRoutingModule { }
