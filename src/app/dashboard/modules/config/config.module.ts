import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CfgAdmFormatoComponent } from './cfgAdmFormato/cfgAdmFormato.component';
import { CfgAdmFormatoTipoComponent } from './cfgAdmFormatoTipo/cfgAdmFormatoTipo.component';

import { ConfigRoutingModule } from './config-routing.module';
import { CfgAdmFormatoModule } from './cfgAdmFormato/cfgAdmFormato.module';
import { CfgAdmFormatoTipoModule } from './cfgAdmFormatoTipo/cfgAdmFormatoTipo.module';

@NgModule({
  imports: [
    CommonModule,
    ConfigRoutingModule,
    CfgAdmFormatoModule,
    CfgAdmFormatoTipoModule,
  ],
  declarations: [
    CfgAdmFormatoComponent,
    CfgAdmFormatoTipoComponent,
  ]
})
export class ConfigModule { }
