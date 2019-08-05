import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FroAcuerdoPagoComponent } from './froAcuerdoPago/froAcuerdoPago.component';
import { FroCfgTipoRecaudoComponent } from './froCfgTipoRecaudo/froCfgTipoRecaudo.component';
import { FroFacturaComponent } from './froFactura';
import { FroFacAcuerdoPagoComponent } from './froFactura';
import { FroFacInfraccionComponent } from './froFactura';
import { FroFacTramiteComponent } from './froFactura';
import { FroFacParqueaderoComponent } from './froFactura';
import { FroInfraccionComponent } from './froInfraccion/froInfraccion.component';
import { FroInfrCfgCategoriaComponent } from './froInfrCfgCategoria/froInfrCfgCategoria.component';
import { FroRecaudoComponent } from './froRecaudo/froRecaudo.component';
import { FroReporteIngresosComponent } from './froReporteIngresos/froReporteIngresos.component';
import { FroTramiteComponent } from './froTramite/froTramite.component';
import { FroTrteCfgConceptoComponent } from './froTrteCfgConcepto/froTrteCfgConcepto.component';
import { FroTrteCfgCuentaComponent } from './froTrteCfgCuenta/froTrteCfgCuenta.component';
import { FroTrtePrecioComponent } from './froTrtePrecio/froTrtePrecio.component';
import { FroTrteSolicitudComponent } from './froTrteSolicitud/froTrteSolicitud.component';

const routes: Routes = [
  {
    path: 'froAcuerdoPago',
    component: FroAcuerdoPagoComponent
  },
  {
    path: 'froCfgTipoRecaudo',
    component: FroCfgTipoRecaudoComponent
  },
  {
    path: 'froFactura',
    component: FroFacturaComponent
  },
  {
    path: 'froInfraccion',
    component: FroInfraccionComponent
  },
  {
    path: 'facturaAcuerdoPago',
    component: FroFacAcuerdoPagoComponent
  },
  {
    path: 'facturaInfraccion',
    component: FroFacInfraccionComponent
  },
  {
    path: 'facturaTramite',
    component: FroFacTramiteComponent
  },
  {
    path: 'facturaParqueadero',
    component: FroFacParqueaderoComponent
  }
]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancieroRoutingModule { }
