import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'angular2-select';
import { TooltipModule } from "ngx-tooltip";
import { FormsModule } from '@angular/forms';

import { VhloCertificadoTradicionComponent } from './vhloCertificadoTradicion/vhloCertificadoTradicion.component';
import { VhloCfgNivelServicioComponent } from './vhloCfgNivelServicio/vhloCfgNivelServicio.component';
import { VhloCfgPlacaComponent } from './vhloCfgPlaca/vhloCfgPlaca.component';
import { VhloCfgPlacaReportComponent } from './vhloCfgPlaca/report/report.component';
import { VhloCfgValorComponent } from './vhloCfgValor/vhloCfgValor.component';
import { VhloPlacaSedeComponent } from './vhloPlacaSede/vhloPlacaSede.component';
import { VhloLimitacionComponent } from './vhloLimitacion/vhloLimitacion.component';
import { VhloLimitacionDeleteComponent } from './vhloLimitacion/delete/delete.component';
import { VhloTpAsignacionComponent } from './vhloTpAsignacion/vhloTpAsignacion.component';
import { VhloTpConvenioComponent } from './vhloTpConvenio/vhloTpConvenio.component';
import { VhloTpRangoComponent } from './vhloTpRango/vhloTpRango.component';
import { VhloTpTarjetaOperacionComponent } from './vhloTpTarjetaOperacion/vhloTpTarjetaOperacion.component';
import { VhloRnaPreregistroComponent } from "./vhloRnaPreregistro/vhloRnaPreregistro.component";
import { VhloRnaPreasignacionPlacaComponent } from './vhloRnaPreasignacionPlaca/vhloRnaPreasignacionPlaca.component';
import { VhloRnmaPreregistroComponent } from "./vhloRnmaPreregistro/vhloRnmaPreregistro.component";
import { VhloRnrsPreregistroComponent } from './vhloRnrsPreregistro/vhloRnrsPreregistro.component';

import { VehiculoRoutingModule } from './vehiculo-routing.module';
import { VhloBuscarModule } from './vhloBuscar/vhloBuscar.module';
import { VhloCertificadoTradicionModule } from './vhloCertificadoTradicion/vhloCertificadoTradicion.module';
import { VhloBuscarComponent } from './vhloBuscar/vhloBuscar.component';
import { VhloCfgNivelServicioModule } from './vhloCfgNivelServicio/vhloCfgNivelServicio.module';
import { VhloCfgPlacaModule } from './vhloCfgPlaca/vhloCfgPlaca.module';
import { VhloCfgValorModule } from './vhloCfgValor/vhloCfgValor.module';
import { VhloLimitacionModule } from './vhloLimitacion/vhloLimitacion.module';
import { VhloPlacaSedeModule } from './vhloPlacaSede/vhloPlacaSede.module';
import { VhloTpAsignacionModule } from './vhloTpAsignacion/vhloTpAsignacion.module';
import { VhloTpConvenioModule } from './vhloTpConvenio/vhloTpConvenio.module';
import { VhloTpRangoModule } from './vhloTpRango/vhloTpRango.module';
import { VhloTpTarjetaOperacionModule } from './vhloTpTarjetaOperacion/vhloTpTarjetaOperacion.module';
import { VhloRnaPreregistroModule } from "./vhloRnaPreregistro/vhloRnaPreregistro.module";
import { VhloRnaPreasignacionPlacaModule } from './vhloRnaPreasignacionPlaca/vhloRnaPreasignacionPlaca.module';
import { VhloRnmaPreregistroModule } from "./vhloRnmaPreregistro/vhloRnmaPreregistro.module";
import { VhloRnrsPreregistroModule } from './vhloRnrsPreregistro/vhloRnrsPreregistro.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TooltipModule,
    FormsModule,
    Ng2BootstrapModule.forRoot(),
    SelectModule,
    VehiculoRoutingModule,
    VhloBuscarModule,
    VhloCertificadoTradicionModule,
    VhloCfgNivelServicioModule,
    VhloCfgPlacaModule,
    VhloCfgValorModule,
    VhloLimitacionModule,
    VhloPlacaSedeModule,
    VhloTpAsignacionModule,
    VhloTpConvenioModule,
    VhloTpRangoModule,
    VhloTpTarjetaOperacionModule,
    VhloRnaPreregistroModule,
    VhloRnaPreasignacionPlacaModule,
    VhloRnmaPreregistroModule,
    VhloRnrsPreregistroModule,
  ],
  declarations: [
    VhloBuscarComponent,
    VhloCertificadoTradicionComponent,
    VhloCfgNivelServicioComponent,
    VhloCfgPlacaComponent,
    VhloCfgPlacaReportComponent,
    VhloCfgValorComponent,
    VhloLimitacionComponent,
    VhloLimitacionDeleteComponent,
    VhloPlacaSedeComponent,
    VhloTpAsignacionComponent,
    VhloTpConvenioComponent,
    VhloTpRangoComponent,
    VhloTpTarjetaOperacionComponent,
    VhloRnaPreregistroComponent,
    VhloRnaPreasignacionPlacaComponent,
    VhloRnmaPreregistroComponent,
    VhloRnrsPreregistroComponent,
  ]
})
export class VehiculoModule { }
