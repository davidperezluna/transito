import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'angular2-select';
import { TooltipModule } from "ngx-tooltip";

import { BpActividadComponent } from './bpActividad/bpActividad.component';
import { BpCdpComponent } from './bpCdp/bpCdp.component';
import { BpCfgTipoInsumoComponent } from './bpCfgTipoInsumo/bpCfgTipoInsumo.component';
import { BpCuentaComponent } from './bpCuenta/bpCuenta.component';
import { BpInsumoComponent } from './bpInsumo/bpInsumo.component';
import { BpProyectoComponent } from './bpProyecto/bpProyecto.component';
import { RequestComponent } from './bpCdp/request/request.component';

import { BancoProyectoRoutingModule } from './banco-proyecto-routing.module';
import { BpActividadModule } from './bpActividad/bpActividad.module';
import { BpCdpModule } from './bpCdp/bpCdp.module';
import { BpCfgTipoInsumoModule } from './bpCfgTipoInsumo/bpCfgTipoInsumo.module';
import { BpCuentaModule } from './bpCuenta/bpCuenta.module';
import { BpInsumoModule } from './bpInsumo/bpInsumo.module';
import { BpProyectoModule } from './bpProyecto/bpProyecto.module';

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
    BpCfgTipoInsumoModule,
    BpCuentaModule,
    BpInsumoModule,
    BpProyectoModule,
  ],
  declarations: [
    BpActividadComponent,
    BpCdpComponent,
    BpCfgTipoInsumoComponent,
    BpCuentaComponent,
    BpInsumoComponent,
    BpProyectoComponent,
    RequestComponent,
  ]
})
export class BancoProyectoModule { }
