import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TooltipModule } from "ngx-tooltip";
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'angular2-select';

import { PnalAsignacionComponent } from './pnalAsignacion/pnalAsignacion.component';
import { PnalCfgCdoBodegaComponent } from './pnalCfgCdoBodega/pnalCfgCdoBodega.component';
import { PnalCfgCdoConsecutivoComponent } from './pnalCfgCdoConsecutivo/pnalCfgCdoConsecutivo.component';
import { PnalFuncionarioComponent } from './pnalFuncionario/pnalFuncionario.component';
import { PnalTalonarioComponent } from './pnalTalonario/pnalTalonario.component';
import { PnalCfgTipoNombramientoComponent } from './pnalCfgTipoNombramiento/pnalCfgTipoNombramiento.component';
import { PnalCfgCargoComponent } from './pnalCfgCargo/pnalCfgCargo.component';

import { PersonalRoutingModule } from './personal-routing.module';
import { PnalAsignacionModule } from './pnalAsignacion/pnalAsignacion.module';
import { PnalCfgCdoBodegaModule } from './pnalCfgCdoBodega/pnalCfgCdoBodega.module';
import { PnalCfgCdoConsecutivoModule } from './pnalCfgCdoConsecutivo/pnalCfgCdoConsecutivo.module';
import { PnalFuncionarioModule } from './pnalFuncionario/pnalFuncionario.module';
import { PnalTalonarioModule } from './pnalTalonario/pnalTalonario.module';
import { PnalCfgTipoNombramientoModule } from './pnalCfgTipoNombramiento/pnalCfgTipoNombramiento.module';
import { PnalCfgCargoModule } from './pnalCfgCargo/pnalCfgCargo.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TooltipModule,
    FormsModule,
    SelectModule,
    PersonalRoutingModule,
    PnalAsignacionModule,
    PnalCfgCdoBodegaModule,
    PnalCfgCdoConsecutivoModule,
    PnalFuncionarioModule,
    PnalTalonarioModule,
    PnalCfgTipoNombramientoModule,
    PnalCfgCargoModule
  ],
  declarations: [
    PnalAsignacionComponent,
    PnalCfgCdoBodegaComponent,
    PnalCfgCdoConsecutivoComponent,
    PnalFuncionarioComponent,
    PnalTalonarioComponent,
    PnalCfgTipoNombramientoComponent,
    PnalCfgCargoComponent
  ]
})
export class PersonalModule { }
