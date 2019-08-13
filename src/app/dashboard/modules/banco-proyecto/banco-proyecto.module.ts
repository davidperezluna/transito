import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'angular2-select';
import { TooltipModule } from "ngx-tooltip";

import { BpActividadComponent } from './bpActividad/bpActividad.component';
import { BpCdpComponent } from './bpCdp/bpCdp.component';
import { RequestCdpComponent } from './bpCdp/request/request.component';
import { BpRegistroCompromisoComponent } from './bpRegistroCompromiso/bpRegistroCompromiso.component';
import { RequestCompromisoComponent } from './bpRegistroCompromiso/request/request.component';
import { BpCfgTipoInsumoComponent } from './bpCfgTipoInsumo/bpCfgTipoInsumo.component';
import { BpCuentaComponent } from './bpCuenta/bpCuenta.component';
import { BpInsumoComponent } from './bpInsumo/bpInsumo.component';
import { BpProyectoComponent } from './bpProyecto/bpProyecto.component';
import { BpOrdenPagoComponent } from './bpOrdenPago/bpOrdenPago.component';

import { BancoProyectoRoutingModule } from './banco-proyecto-routing.module';
import { BpActividadModule } from './bpActividad/bpActividad.module';
import { BpCdpModule } from './bpCdp/bpCdp.module';
import { BpRegistroCompromisoModule } from './bpRegistroCompromiso/bpRegistroCompromiso.module';
import { BpCfgTipoInsumoModule } from './bpCfgTipoInsumo/bpCfgTipoInsumo.module';
import { BpCuentaModule } from './bpCuenta/bpCuenta.module';
import { BpInsumoModule } from './bpInsumo/bpInsumo.module';
import { BpProyectoModule } from './bpProyecto/bpProyecto.module';
import { BpOrdenPagoModule } from './bpOrdenPago/bpOrdenPago.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    Ng2BootstrapModule.forRoot(),
    SelectModule,
    TooltipModule,
    BancoProyectoRoutingModule,
    BpActividadModule,
    BpCdpModule,
    BpRegistroCompromisoModule,
    BpCfgTipoInsumoModule,
    BpCuentaModule,
    BpInsumoModule,
    BpProyectoModule,
    BpOrdenPagoModule,
  ],
  declarations: [
    BpActividadComponent,
    BpCdpComponent,
    BpRegistroCompromisoComponent,
    BpCfgTipoInsumoComponent,
    BpCuentaComponent,
    BpInsumoComponent,
    BpProyectoComponent,
    BpOrdenPagoComponent,
    RequestCdpComponent,
    RequestCompromisoComponent,
  ]
})
export class BancoProyectoModule { }
