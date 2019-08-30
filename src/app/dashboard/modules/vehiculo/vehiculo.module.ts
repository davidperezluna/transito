import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'angular2-select';
import { TooltipModule } from "ngx-tooltip";
import { FormsModule } from '@angular/forms';

import { VhloCfgNivelServicioComponent } from './vhloCfgNivelServicio/vhloCfgNivelServicio.component';
import { VhloCfgValorComponent } from './vhloCfgValor/vhloCfgValor.component';
import { VhloTpAsignacionComponent } from './vhloTpAsignacion/vhloTpAsignacion.component';
import { VhloTpConvenioComponent } from './vhloTpConvenio/vhloTpConvenio.component';
import { VhloTpRangoComponent } from './vhloTpRango/vhloTpRango.component';
import { VhloTpTarjetaOperacionComponent } from './vhloTpTarjetaOperacion/vhloTpTarjetaOperacion.component';
import { VhloRnaPreregistroComponent } from "./vhloRnaPreregistro/vhloRnaPreregistro.component";
import { VhloRnaPreasignacionPlacaComponent } from './vhloRnaPreasignacionPlaca/vhloRnaPreasignacionPlaca.component';

import { VehiculoRoutingModule } from './vehiculo-routing.module';
import { VhloCfgNivelServicioModule } from './vhloCfgNivelServicio/vhloCfgNivelServicio.module';
import { VhloCfgValorModule } from './vhloCfgValor/vhloCfgValor.module';
import { VhloTpAsignacionModule } from './vhloTpAsignacion/vhloTpAsignacion.module';
import { VhloTpConvenioModule } from './vhloTpConvenio/vhloTpConvenio.module';
import { VhloTpRangoModule } from './vhloTpRango/vhloTpRango.module';
import { VhloTpTarjetaOperacionModule } from './vhloTpTarjetaOperacion/vhloTpTarjetaOperacion.module';
import { VhloRnaPreregistroModule } from "./vhloRnaPreregistro/vhloRnaPreregistro.module";
import { VhloRnaPreasignacionPlacaModule } from './vhloRnaPreasignacionPlaca/vhloRnaPreasignacionPlaca.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TooltipModule,
    FormsModule,
    Ng2BootstrapModule.forRoot(),
    SelectModule,
    VehiculoRoutingModule,
    VhloCfgNivelServicioModule,
    VhloCfgValorModule,
    VhloTpAsignacionModule,
    VhloTpConvenioModule,
    VhloTpRangoModule,
    VhloTpTarjetaOperacionModule,
    VhloRnaPreregistroModule,
    VhloRnaPreasignacionPlacaModule,
  ],
  declarations: [
    VhloCfgNivelServicioComponent,
    VhloCfgValorComponent,
    VhloTpAsignacionComponent,
    VhloTpConvenioComponent,
    VhloTpRangoComponent,
    VhloTpTarjetaOperacionComponent,
    VhloRnaPreregistroComponent,
    VhloRnaPreasignacionPlacaComponent,
  ]
})
export class VehiculoModule { }
