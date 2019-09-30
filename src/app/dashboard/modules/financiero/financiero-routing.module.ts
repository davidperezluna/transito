import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FroCfgTipoRecaudoComponent } from './froCfgTipoRecaudo/froCfgTipoRecaudo.component';
import { FroFacturaComponent } from './froFactura/froFactura.component';
import { FroTrteCfgConceptoComponent } from './froTrteCfgConcepto/froTrteCfgConcepto.component';
import { FroFacTramiteComponent } from './froFactura/froFacTramite/froFacTramite.component';
import { FroAcuerdoPagoComponent } from './froAcuerdoPago/froAcuerdoPago.component';
import { FroFacInfraccionComponent } from './froFactura/froFacInfraccion/froFacInfraccion.component';
import { FroInfrCfgCategoriaComponent } from './froInfrCfgCategoria/froInfrCfgCategoria.component';
import { FroInfraccionComponent } from './froInfraccion/froInfraccion.component';
import { FroFacAcuerdoPagoComponent } from './froFactura/froFacAcuerdoPago/froFacAcuerdoPago.component';
import { FroFacParqueaderoComponent } from './froFactura/froFacParqueadero/froFacParqueadero.component';
import { FroFacTransferenciaComponent } from './froFacTransferencia/froFacTransferencia.component';
import { FroReporteIngresosComponent } from './froReporteIngresos/froReporteIngresos.component';
import { FroTramiteComponent } from './froTramite/froTramite.component';
import { FroTrteSolicitudComponent } from './froTrteSolicitud/froTrteSolicitud.component';
import { NewRncComponent } from './froTrteSolicitud/newRnc/newRnc.component';
import { NewRnaComponent } from './froTrteSolicitud/newRna/newRna.component';
import { NewRnmaComponent } from './froTrteSolicitud/newRnma/newRnma.component';
import { NewRnrsComponent } from './froTrteSolicitud/newRnrs/newRnrs.component';
import { NewRnetComponent } from './froTrteSolicitud/newRnet/newRnet.component';
import { FroTrtePrecioComponent } from './froTrtePrecio/froTrtePrecio.component';
import { FroTrteArchivoPlanoComponent } from './froTrteArchivoPlano/froTrteArchivoPlano.component';

const routes: Routes = [
  {
    path: 'froAcuerdoPago',
    component: FroAcuerdoPagoComponent
  },
  {
    path: 'froFactura',
    component: FroFacturaComponent
  },
  {
    path: 'froTrteCfgConcepto',
    component: FroTrteCfgConceptoComponent
  },
  {
    path: 'facturaTramite',
    component: FroFacTramiteComponent
  },
  {
    path: 'facturaInfraccion',
    component: FroFacInfraccionComponent
  },
  {
    path: 'froInfrCfgCategoria',
    component: FroInfrCfgCategoriaComponent
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
    path: 'facturaParqueadero',
    component: FroFacParqueaderoComponent
  },
  {
    path: 'froFacTransferencia',
    component: FroFacTransferenciaComponent
  },
  {
    path: 'froReporteIngresos',
    component: FroReporteIngresosComponent
  },
  {
    path: 'froTramite',
    component: FroTramiteComponent
  },
  {
    path: 'froTrteSolicitud',
    component: FroTrteSolicitudComponent
  },
  {
    path: 'tramitesolicitud/rnc',
    component: NewRncComponent
  },
  {
    path: 'tramitesolicitud/rna',
    component: NewRnaComponent
  },
  {
    path: 'tramitesolicitud/rnma',
    component: NewRnmaComponent
  },
  {
    path: 'tramitesolicitud/rnrs',
    component: NewRnrsComponent
  },
  {
    path: 'tramitesolicitud/rnet',
    component: NewRnetComponent
  },
  {
    path: 'froTrtePrecio',
    component: FroTrtePrecioComponent
  },
  {
    path: 'froTrteArchivoPlano',
    component: FroTrteArchivoPlanoComponent
  },
]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancieroRoutingModule { }
