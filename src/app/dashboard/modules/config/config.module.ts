import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CfgAdmFormatoComponent } from './cfgAdmFormato/cfgAdmFormato.component';
import { CfgAdmFormatoTipoComponent } from './cfgAdmFormatoTipo/cfgAdmFormatoTipo.component';
import { CfgFestivoComponent } from './cfgFestivo/cfgFestivo.component';
import { CfgClaveComponent } from './cfgClave/cfgClave.component';

import { ConfigRoutingModule } from './config-routing.module';
import { CfgAdmFormatoModule } from './cfgAdmFormato/cfgAdmFormato.module';
import { CfgAdmFormatoTipoModule } from './cfgAdmFormatoTipo/cfgAdmFormatoTipo.module';
import { CfgFestivoModule } from './cfgFestivo/cfgFestivo.module';
import { CfgClaveModule } from './cfgClave/cfgClave.module';
import { TooltipModule } from "ngx-tooltip"; 



 
@NgModule({
  imports: [
    TooltipModule,
    CommonModule,
    ConfigRoutingModule,
    CfgAdmFormatoModule,
    CfgAdmFormatoTipoModule,
    CfgFestivoModule,
    CfgClaveModule,
  ],
  declarations: [
    CfgFestivoComponent,
    CfgAdmFormatoComponent,
    CfgAdmFormatoTipoComponent,
    CfgClaveComponent,
  ]
})
export class ConfigModule { }
