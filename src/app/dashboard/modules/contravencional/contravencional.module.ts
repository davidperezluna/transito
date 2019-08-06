import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TooltipModule } from "ngx-tooltip";
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'angular2-select';

import { CvAuCfgAtencionComponent } from './cvAuCfgAtencion/cvAuCfgAtencion.component';
import { CvAuCfgHorarioComponent } from './cvAuCfgHorario/cvAuCfgHorario.component';
import { CvAuCfgTipoComponent } from './cvAuCfgTipo/cvAuCfgTipo.component';
import { CvAudienciaComponent } from './cvAudiencia/cvAudiencia.component';
import { CvCdoCfgDescuentoComponent } from './cvCdoCfgDescuento/cvCdoCfgDescuento.component';
import { CvCdoCfgEstadoComponent } from './cvCdoCfgEstado/cvCdoCfgEstado.component';
import { CvCdoCfgInteresComponent } from './cvCdoCfgInteres/cvCdoCfgInteres.component';
import { CvCdoComparendoComponent } from './cvCdoComparendo/cvCdoComparendo.component';
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

import { ContravencionalRoutingModule } from './contravencional-routing.module';
import { CvAuCfgAtencionModule } from './cvAuCfgAtencion/cvAuCfgAtencion.module';
import { CvAuCfgHorarioModule } from './cvAuCfgHorario/cvAuCfgHorario.module';
import { CvAuCfgTipoModule } from './cvAuCfgTipo/cvAuCfgTipo.module';
import { CvAudienciaModule } from './cvAudiencia/cvAudiencia.module';
import { CvCdoCfgDescuentoModule } from './cvCdoCfgDescuento/cvCdoCfgDescuento.module';
import { CvCdoCfgEstadoModule } from './cvCdoCfgEstado/cvCdoCfgEstado.module';
import { CvCdoCfgInteresModule } from './cvCdoCfgInteres/cvCdoCfgInteres.module';
import { CvCdoComparendoModule } from './cvCdoComparendo/cvCdoComparendo.module';
import { CvCdoNotificacionModule } from './cvCdoNotificacion/cvCdoNotificacion.module';
import { CvCdoTrazabilidadModule } from './cvCdoTrazabilidad/cvCdoTrazabilidad.module';
import { CvCfgInteresModule } from './cvCfgInteres/cvCfgInteres.module';
import { CvCfgModuloModule } from './cvCfgModulo/cvCfgModulo.module';
import { CvCfgPorcentajeInicialModule } from './cvCfgPorcentajeInicial/cvCfgPorcentajeInicial.module';
import { CvCfgTipoRestriccionModule } from './cvCfgTipoRestriccion/cvCfgTipoRestriccion.module';
import { CvLcCfgMotivoModule } from './cvLcCfgMotivo/cvLcCfgMotivo.module';
import { CvLcCfgTipoRestriccionModule } from './cvLcCfgTipoRestriccion/cvLcCfgTipoRestriccion.module';
import { CvMedidaCautelarModule } from './cvMedidaCautelar/cvMedidaCautelar.module';
import { CvRestriccionModule } from './cvRestriccion/cvRestriccion.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TooltipModule,
    FormsModule,
    SelectModule,
    ContravencionalRoutingModule,
    CvAuCfgAtencionModule,
    CvAuCfgHorarioModule,
    CvAuCfgTipoModule,
    CvAudienciaModule,
    CvCdoCfgDescuentoModule,
    CvCdoCfgEstadoModule,
    CvCdoCfgInteresModule,
    CvCdoComparendoModule,
    CvCdoNotificacionModule,
    CvCdoTrazabilidadModule,
    CvCfgInteresModule,
    CvCfgModuloModule,
    CvCfgPorcentajeInicialModule,
    CvCfgTipoRestriccionModule,
    CvLcCfgMotivoModule,
    CvLcCfgTipoRestriccionModule,
    CvMedidaCautelarModule,
    CvRestriccionModule,
  ],
  declarations: [
    CvAuCfgAtencionComponent,
    CvAuCfgHorarioComponent,
    CvAuCfgTipoComponent,
    CvAudienciaComponent,
    CvCdoCfgDescuentoComponent,
    CvCdoCfgEstadoComponent,
    CvCdoCfgInteresComponent,
    CvCdoComparendoComponent,
    CvCdoNotificacionComponent,
    CvCdoTrazabilidadComponent,
    CvCfgInteresComponent,
    CvCfgModuloComponent,
    CvCfgPorcentajeInicialComponent,
    CvCfgTipoRestriccionComponent,
    CvLcCfgMotivoComponent,
    CvLcCfgTipoRestriccionComponent,
    CvMedidaCautelarComponent,
    CvRestriccionComponent,
  ]
})
export class ContravencionalModule { }
