import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'angular2-select';
import { TooltipModule } from "ngx-tooltip";
import { FormsModule } from '@angular/forms';

import { VhloBuscarComponent } from './vhloBuscar/vhloBuscar.component';
import { VhloCertificadoTradicionComponent } from './vhloCertificadoTradicion/vhloCertificadoTradicion.component';
import { VhloCfgClaseMaquinariaComponent } from './vhloCfgClaseMaquinaria/vhloCfgClaseMaquinaria.component';
import { VhloCfgCondicionIngresoComponent } from './vhloCfgCondicionIngreso/vhloCfgCondicionIngreso.component';
import { VhloCfgNivelServicioComponent } from './vhloCfgNivelServicio/vhloCfgNivelServicio.component';
import { VhloCfgPlacaComponent } from './vhloCfgPlaca/vhloCfgPlaca.component';
import { VhloCfgPlacaReportComponent } from './vhloCfgPlaca/report/report.component';
import { VhloCfgTipoMaquinariaComponent } from './vhloCfgTipoMaquinaria/vhloCfgTipoMaquinaria.component';
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
import { VhloDevolucionRadicadoComponent } from './vhloDevolucionRadicado/vhloDevolucionRadicado.component';

import { VehiculoRoutingModule } from './vehiculo-routing.module';
import { VhloBuscarModule } from './vhloBuscar/vhloBuscar.module';
import { VhloCertificadoTradicionModule } from './vhloCertificadoTradicion/vhloCertificadoTradicion.module';
import { VhloCfgClaseMaquinariaModule } from './vhloCfgClaseMaquinaria/vhloCfgClaseMaquinaria.module';
import { VhloCfgCondicionIngresoModule } from './vhloCfgCondicionIngreso/vhloCfgCondicionIngreso.module';
import { VhloCfgNivelServicioModule } from './vhloCfgNivelServicio/vhloCfgNivelServicio.module';
import { VhloCfgPlacaModule } from './vhloCfgPlaca/vhloCfgPlaca.module';
import { VhloCfgTipoMaquinariaModule } from './vhloCfgTipoMaquinaria/vhloCfgTipoMaquinaria.module';
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
import { VhloDevolucionRadicadoModule } from './vhloDevolucionRadicado/vhloDevolucionRadicado.module';

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
    VhloCfgClaseMaquinariaModule,
    VhloCfgCondicionIngresoModule,
    VhloCfgNivelServicioModule,
    VhloCfgPlacaModule,
    VhloCfgTipoMaquinariaModule,
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
    VhloDevolucionRadicadoModule,
  ],
  declarations: [
    VhloBuscarComponent,
    VhloCertificadoTradicionComponent,
    VhloCfgClaseMaquinariaComponent,
    VhloCfgCondicionIngresoComponent,
    VhloCfgNivelServicioComponent,
    VhloCfgPlacaComponent,
    VhloCfgPlacaReportComponent,
    VhloCfgTipoMaquinariaComponent,
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
    VhloDevolucionRadicadoComponent,
  ]
})
export class VehiculoModule { }
