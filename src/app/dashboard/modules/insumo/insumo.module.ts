import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'angular2-select';
import { TooltipModule } from "ngx-tooltip";
import { FormsModule } from '@angular/forms';

import { ImoActaComponent } from "./imoActa/imoActa.component";
import { ImoAsignacionComponent } from "./imoAsignacion/imoAsignacion.component";
import { ImoBusquedaComponent } from "./imoBusqueda/imoBusqueda.component";
import { ImoCfgTipoComponent } from "./imoCfgTipo/imoCfgTipo.component";
import { ImoLoteComponent } from "./imoLote/imoLote.component";
import { ImoReasignacionComponent } from "./imoReasignacion/imoReasignacion.component";

import { InsumoRoutingModule } from './insumo-routing.module';
import { ImoActaModule } from "./imoActa/imoActa.module";
import { ImoAsignacionModule } from "./imoAsignacion/imoAsignacion.module";
import { ImoBusquedaModule } from "./imoBusqueda/imoBusqueda.module";
import { ImoCfgTipoModule } from "./imoCfgTipo/imoCfgTipo.module";
import { ImoLoteModule } from "./imoLote/imoLote.module";
import { ImoReasignacionModule } from "./imoReasignacion/imoReasignacion.module";


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TooltipModule,
    FormsModule,
    Ng2BootstrapModule.forRoot(),
    SelectModule,

    InsumoRoutingModule,
    ImoActaModule,
    ImoAsignacionModule,
    ImoBusquedaModule,
    ImoCfgTipoModule,
    ImoLoteModule,
    ImoReasignacionModule,
  ],
  declarations: [
    ImoActaComponent,
    ImoAsignacionComponent,
    ImoBusquedaComponent,
    ImoCfgTipoComponent,
    ImoLoteComponent,
    ImoReasignacionComponent,
  ]
})
export class InsumoModule { }
