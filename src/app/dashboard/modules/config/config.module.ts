import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'angular2-select';
import { TooltipModule } from "ngx-tooltip";

import { CfgAdmFormatoComponent } from './cfgAdmFormato/cfgAdmFormato.component';
import { CfgAdmFormatoTipoComponent } from './cfgAdmFormatoTipo/cfgAdmFormatoTipo.component';
import { CfgAuditoriaComponent } from './cfgAuditoria/cfgAuditoria.component';
import { CfgFestivoComponent } from './cfgFestivo/cfgFestivo.component';
import { CfgClaveComponent } from './cfgClave/cfgClave.component';
import { CfgOrganismoTransitoComponent } from './cfgOrganismoTransito/cfgOrganismoTransito.component';
import { CfgTipoInfractorComponent } from './cfgTipoInfractor/cfgTipoInfractor.component';

import { ConfigRoutingModule } from './config-routing.module';
import { CfgAdmFormatoModule } from './cfgAdmFormato/cfgAdmFormato.module';
import { CfgAdmFormatoTipoModule } from './cfgAdmFormatoTipo/cfgAdmFormatoTipo.module';
import { CfgAuditoriaModule } from './cfgAuditoria/cfgAuditoria.module';
import { CfgFestivoModule } from './cfgFestivo/cfgFestivo.module';
import { CfgClaveModule } from './cfgClave/cfgClave.module';
import { CfgOrganismoTransitoModule } from './cfgOrganismoTransito/cfgOrganismoTransito.module';
import { CfgTipoInfractorModule } from './cfgTipoInfractor/cfgTipoInfractor.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    Ng2BootstrapModule.forRoot(),
    SelectModule,
    TooltipModule,
    ConfigRoutingModule,
    CfgAdmFormatoModule,
    CfgAdmFormatoTipoModule,
    CfgAuditoriaModule,
    CfgFestivoModule,
    CfgClaveModule,
    CfgOrganismoTransitoModule,
    CfgTipoInfractorModule,
  ],
  declarations: [
    CfgFestivoComponent,
    CfgAdmFormatoComponent,
    CfgAdmFormatoTipoComponent,
    CfgAuditoriaComponent,
    CfgClaveComponent,
    CfgOrganismoTransitoComponent,
    CfgTipoInfractorComponent,
  ]
})

export class ConfigModule { }
