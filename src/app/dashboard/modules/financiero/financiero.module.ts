import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'angular2-select';
import { TooltipModule } from "ngx-tooltip";

import { FroAcuerdoPagoComponent } from './froAcuerdoPago/froAcuerdoPago.component';
import { FroCfgTipoRecaudoComponent } from './froCfgTipoRecaudo/froCfgTipoRecaudo.component';
import { FroFacturaComponent } from './froFactura';
import { FroFacAcuerdoPagoComponent } from './froFactura';
import { FroFacInfraccionComponent } from './froFactura';
import { FroFacTramiteComponent } from './froFactura/froFacTramite/froFacTramite.component';
import { FroFacParqueaderoComponent } from './froFactura/froFacParqueadero/froFacParqueadero.component';
import { FroInfraccionComponent } from './froInfraccion/froInfraccion.component';
import { FroInfrCfgCategoriaComponent } from './froInfrCfgCategoria/froInfrCfgCategoria.component';
import { FroRecaudoComponent } from './froRecaudo/froRecaudo.component';
import { FroReporteIngresosComponent } from './froReporteIngresos/froReporteIngresos.component';
import { FroTramiteComponent } from './froTramite/froTramite.component';
import { FroTrteCfgConceptoComponent } from './froTrteCfgConcepto/froTrteCfgConcepto.component';
import { FroTrteCfgCuentaComponent } from './froTrteCfgCuenta/froTrteCfgCuenta.component';
import { FroTrtePrecioComponent } from './froTrtePrecio/froTrtePrecio.component';
import { FroTrteSolicitudComponent } from './froTrteSolicitud/froTrteSolicitud.component';

import { FinancieroRoutingModule } from './financiero-routing.module';
import { FroFacturaModule } from './froFactura/froFactura.module';
import { FroAcuerdoPagoModule } from './froAcuerdoPago/froAcuerdoPago.module';
import { FroCfgTipoRecaudoModule } from './froCfgTipoRecaudo/froCfgTipoRecaudo.module';
import { FroInfraccionModule } from './froInfraccion/froInfraccion.module';
import { FroInfrCfgCategoriaModule } from './froInfrCfgCategoria/froInfrCfgCategoria.module';
import { FroRecaudoModule } from './froRecaudo/froRecaudo.module';
import { FroReporteIngresosModule } from './froReporteIngresos/froReporteIngresos.module';
import { FroTramiteModule } from './froTramite/froTramite.module';
import { FroTrteCfgConceptoModule } from './froTrteCfgConcepto/froTrteCfgConcepto.module';
import { FroTrteCfgCuentaModule } from './froTrteCfgCuenta/froTrteCfgCuenta.module';
import { FroTrtePrecioModule } from './froTrtePrecio/froTrtePrecio.module';
import { FroTrteSolicitudModule } from './froTrteSolicitud/froTrteSolicitud.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    Ng2BootstrapModule.forRoot(),
    SelectModule,
    TooltipModule,
    FinancieroRoutingModule,
    FroFacturaModule,
    FroReporteIngresosModule
  ],
  declarations: [
    FroFacTramiteComponent,
    FroFacParqueaderoComponent,
    FroReporteIngresosComponent
  ]
})
export class FinancieroModule { }
