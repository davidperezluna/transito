import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'angular2-select';
import { TooltipModule } from "ngx-tooltip";

import { SvIpatImpresoBodegaComponent } from './svIpatImpresoBodega/svIpatImpresoBodega.component';
import { SvIpatImpresoAsignacionComponent } from './svIpatImpresoAsignacion/svIpatImpresoAsignacion.component';
import { SvIpatImpresoMunicipioComponent } from './svIpatImpresoMunicipio/svIpatImpresoMunicipio.component';

import { SeguridadVialRoutingModule } from './seguridad-vial-routing.module';
import { SvIpatImpresoBodegaModule } from './svIpatImpresoBodega/svIpatImpresoBodega.module';
import { SvIpatImpresoAsignacionModule } from './svIpatImpresoAsignacion/svIpatImpresoAsignacion.module';
import { SvIpatImpresoMunicipioModule } from './svIpatImpresoMunicipio/svIpatImpresoMunicipio.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    Ng2BootstrapModule.forRoot(),
    SelectModule,
    TooltipModule,
    SeguridadVialRoutingModule,
    SvIpatImpresoBodegaModule,
    SvIpatImpresoAsignacionModule,
    SvIpatImpresoMunicipioModule,
  ],
  declarations: [
    SvIpatImpresoBodegaComponent,
    SvIpatImpresoAsignacionComponent,
    SvIpatImpresoMunicipioComponent,
  ]
})
export class SeguridadVialModule { }
