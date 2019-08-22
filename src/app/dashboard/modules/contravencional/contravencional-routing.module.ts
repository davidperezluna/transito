import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CvAuCfgAtencionComponent } from './cvAuCfgAtencion/cvAuCfgAtencion.component';
import { CvAuCfgHorarioComponent } from './cvAuCfgHorario/cvAuCfgHorario.component';
import { CvAuCfgTipoComponent } from './cvAuCfgTipo/cvAuCfgTipo.component';
import { CvAudienciaComponent } from './cvAudiencia/cvAudiencia.component';
import { CvCdoCfgDescuentoComponent } from './cvCdoCfgDescuento/cvCdoCfgDescuento.component';
import { CvCdoCfgEstadoComponent } from './cvCdoCfgEstado/cvCdoCfgEstado.component';
import { CvCdoCfgInteresComponent } from './cvCdoCfgInteres/cvCdoCfgInteres.component';
import { CvCdoComparendoComponent } from './cvCdoComparendo/cvCdoComparendo.component';
import { NewComponent } from './cvCdoComparendo/new/new.component';
import { CvCdoNotificacionComponent } from './cvCdoNotificacion/cvCdoNotificacion.component';
import { CvCdoTrazabilidadComponent } from './cvCdoTrazabilidad/cvCdoTrazabilidad.component';
import { CvCfgInteresComponent } from './cvCfgInteres/cvCfgInteres.component';
import { CvCfgModuloComponent } from './cvCfgModulo/cvCfgModulo.component';
import { CvCfgPorcentajeInicialComponent } from './cvCfgPorcentajeInicial/cvCfgPorcentajeInicial.component';
import { CvCfgTipoRestriccionComponent } from './cvCfgTipoRestriccion/cvCfgTipoRestriccion.component';
import { CvLcCfgMotivoComponent } from './cvLcCfgMotivo/cvLcCfgMotivo.component';
import { CvLcCfgTipoRestriccionComponent } from './cvLcCfgTipoRestriccion/cvLcCfgTipoRestriccion.component';
import { CvMedidaCautelarComponent } from './cvMedidaCautelar/cvMedidaCautelar.component';
import { CvRestriccionComponent } from './cvRestriccion/cvRestriccion.component';
import { SearchComponent } from './cvCdoComparendo/search/search.component';

const routes: Routes = [
  {
    path: 'cvAuCfgAtencion',
    component: CvAuCfgAtencionComponent
  },
  {
    path: 'cvAuCfgHorario',
    component: CvAuCfgHorarioComponent
  },
  {
    path: 'cvAuCfgTipo',
    component: CvAuCfgTipoComponent
  },
  {
    path: 'cvAudiencia',
    component: CvAudienciaComponent
  },
  /*{
    path: 'cvCdoCfgDescuento',
    component: CvCdoCfgDescuentoComponent
  },*/
  {
    path: 'cvCdoCfgEstado',
    component: CvCdoCfgEstadoComponent
  },
  /*{
    path: 'cvCdoCfgInteres',
    component: CvCdoCfgInteresComponent
  },*/
  {
    path: 'cvCdoComparendo',
    component: CvCdoComparendoComponent
  },
  /*{
    path: 'cvCdoNotificacion',
    component: CvCdoNotificacionComponent
  },*/
  {
    path: 'cvCdoTrazabilidad',
    component: CvCdoTrazabilidadComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  /*{
    path: 'cvCfgInteres',
    component: CvCfgInteresComponent
  },
  {
    path: 'cvCfgModulo',
    component: CvCfgModuloComponent
  },
  {
    path: 'cvCfgPorcentajeInicial',
    component: CvCfgPorcentajeInicialComponent
  },
  {
    path: 'cvCfgTipoRestriccion',
    component: CvCfgTipoRestriccionComponent
  },
  {
    path: 'cvLcCfgMotivo',
    component: CvLcCfgMotivoComponent
  },
  {
    path: 'cvLcCfgTipoRestriccion',
    component: CvLcCfgTipoRestriccionComponent
  },
  {
    path: 'cvMedidaCautelar',
    component: CvMedidaCautelarComponent
  },
  {
    path: 'cvRestriccion',
    component: CvRestriccionComponent
  },*/
]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContravencionalRoutingModule { }
