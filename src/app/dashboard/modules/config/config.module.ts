import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CfgAdmFormatoComponent } from './cfgAdmFormato/cfgAdmFormato.component';
import { CfgAdmFormatoTipoComponent } from './cfgAdmFormatoTipo/cfgAdmFormatoTipo.component';

import { ConfigRoutingModule } from './config-routing.module';
import { CfgAdmFormatoModule } from './cfgAdmFormato/cfgAdmFormato.module';
import { CfgAdmFormatoTipoModule } from './cfgAdmFormatoTipo/cfgAdmFormatoTipo.module';
import { CfgFestivoModule } from './cfgFestivo/cfgFestivo.module';
import { TooltipModule } from "ngx-tooltip"; 


import { CfgFestivoComponent } from './cfgFestivo/cfgFestivo.component';

 
@NgModule({
  imports: [
    TooltipModule,
    CommonModule,
    ConfigRoutingModule,
    CfgAdmFormatoModule,
    CfgAdmFormatoTipoModule,
    CfgFestivoModule,
  ],
  declarations: [
    CfgFestivoComponent,
    CfgAdmFormatoComponent,
    CfgAdmFormatoTipoComponent,
  ]
})
export class ConfigModule { }
