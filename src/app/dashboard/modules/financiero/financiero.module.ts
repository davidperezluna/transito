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
import { FroTrteArchivoPlanoModule } from './froTrteArchivoPlano/froTrteArchivoPlano.module';

import { FroTrteArchivoPlanoComponent } from './froTrteArchivoPlano/froTrteArchivoPlano.component';

import { NewInsumoComponent } from './froTrteSolicitud/newInsumo/newInsumo.component';

import { NewRncComponent } from './froTrteSolicitud/newRnc/newRnc.component';
import { NewRncExpedicionLicenciaComponent } from './froTrteSolicitud/tramites/tramiteExpedicionLicencia/newRncExpedicionLicencia.component';
import { NewRncDuplicadoLicenciaComponent } from './froTrteSolicitud/tramites/tramiteDuplicadoLicencia/newRncDuplicadoLicencia.component';
import { NewRncExpedicionLicenciaCambioDocumentoComponent } from './froTrteSolicitud/tramites/tramiteExpedicionLicenciaCambioDocumento/newRncExpedicionLicenciaCambioDocumento.component';
import { NewRncRecategorizacionLicenciaAbajoComponent } from './froTrteSolicitud/tramites/tramiteRecategorizacionLicenciaAbajo/newRncRecategorizacionLicenciaAbajo.component';
import { NewRncRecategorizacionLicenciaArribaComponent } from './froTrteSolicitud/tramites/tramiteRecategorizacionLicenciaArriba/newRncRecategorizacionLicenciaArriba.component';
import { NewRncRefrendacionLicenciaComponent } from './froTrteSolicitud/tramites/tramiteRefrendacionLicencia/newRncRefrendacionLicencia.component';

import { NewRnaComponent } from './froTrteSolicitud/newRna/newRna.component';
import { NewRnmaComponent } from './froTrteSolicitud/newRnma/newRnma.component';
import { NewRnrsComponent } from './froTrteSolicitud/newRnrs/newRnrs.component';

import { NewRnetComponent } from './froTrteSolicitud/newRnet/newRnet.component';
import { NewBlindajeComponent } from './froTrteSolicitud/tramites/tramiteBlindaje/new.blindaje.component';
import { NewCambioColorComponent } from './froTrteSolicitud/tramites/tramiteCambioColor/new.cambioColor.component';
import { NewCambioGasComponent } from './froTrteSolicitud/tramites/tramiteCambioGas/new.cambioGas.component';
import { NewCambioServicioComponent } from './froTrteSolicitud/tramites/tramiteCambioServicio/new.cambioServicio.component';
import { NewCambioPlacaComponent } from './froTrteSolicitud/tramites/tramiteCambioPlaca/new.cambioPlaca.component';
import { NewCambioMotorComponent } from './froTrteSolicitud/tramites/tramiteCambioMotor/new.cambioMotor.component';
import { NewCancelacionMatriculaComponent } from './froTrteSolicitud/tramites/tramiteCancelacionMatricula/new.cancelacionMatricula.component';
import { NewCertificadoTradicionComponent } from './froTrteSolicitud/tramites/tramiteCertificadoTradicion/new.certificadoTradicion.component';
import { NewDuplicadoLicenciaComponent } from './froTrteSolicitud/tramites/tramiteDuplicadoLicencia/new.duplicadoLicencia.component';
import { NewDuplicadoPlacaComponent } from './froTrteSolicitud/tramites/tramiteDuplicadoPlaca/new.duplicadoPlaca.component';
import { NewImportacionTemporalComponent } from "./froTrteSolicitud/tramites/tramiteImportacionTemporal/new.importacionTemporal.component";
import { NewMatricualaInicialComponent } from './froTrteSolicitud/tramites/tramiteMatriculaInicial/new.matriculaInicial.component';
import { NewProrrogaImportacionTemporalComponent } from "./froTrteSolicitud/tramites/tramiteProrrogaImportacionTemporal/new.prorrogaImportacionTemporal.component";
import { NewRadicadoCuentaComponent } from './froTrteSolicitud/tramites/tramiteRadicadoCuenta/new.radicadoCuenta.component';
import { NewRegrabarMotorComponent } from './froTrteSolicitud/tramites/tramiteRegrabarMotor/new.regrabarMotor.component';
import { NewRegrabarSerieComponent } from './froTrteSolicitud/tramites/tramiteRegrabarSerie/new.regrabarSerie.component';
import { NewRegrabarChasisComponent } from './froTrteSolicitud/tramites/tramiteRegrabarChasis/new.regrabarChasis.component';
import { NewRegrabarVinComponent } from './froTrteSolicitud/tramites/tramiteRegrabarVin/new.regrabarVin.component';
import { NewRematriculaComponent } from './froTrteSolicitud/tramites/tramiteRematricula/new.rematricula.component';
import { NewTraspasoComponent } from './froTrteSolicitud/tramites/tramiteTraspaso/new.traspaso.component';
import { NewTraspasoIndeterminadaComponent } from './froTrteSolicitud/tramites/tramiteTraspasoIndeterminada/new.traspasoIndeterminada.component';
import { NewTrasladoCuentaComponent } from './froTrteSolicitud/tramites/tramiteTrasladoCuenta/new.trasladoCuenta.component';
import { NewTramiteInscripcionAlertaPrendaComponent } from './froTrteSolicitud/tramites/tramiteInscripcionAlertaPrenda/new.inscripcionAlertaPrenda.component';
import { NewTramiteLevantamientoAlertaPrendaComponent } from './froTrteSolicitud/tramites/tramiteLevantamientoAlertaPrenda/new.levantamientoAlertaPrenda.component';
import { NewTramiteCambioAcreedorPrendarioComponent } from './froTrteSolicitud/tramites/tramiteCambioAcreedorPrendario/new.CambioAcreedorPrendario.component';
import { NewTramiteCambioAcreedorPrendarioPropietarioComponent } from './froTrteSolicitud/tramites/tramiteCambioAcreedorPrendarioPropietario/new.CambioAcreedorPrendarioPropietario.component';
import { NewTransformacionComponent } from './froTrteSolicitud/tramites/tramiteTransformacion/new.transformacion.component';

import { NewRnetExpedicionTarjetaOperacionComponent } from './froTrteSolicitud/tramites/tramiteExpedicionTarjetaOperacion/newExpedicionTarjetaOperacion.component';
import { NewRnetDuplicadoTarjetaOperacionComponent } from './froTrteSolicitud/tramites/tramiteDuplicadoTarjetaOperacion/new.duplicadoTarjetaOperacion.component';
import { NewRnetExpedicionTarjetaOperacionCambioNivelServicioComponent } from './froTrteSolicitud/tramites/tramiteExpedicionTarjetaOperacionCambioNivelServicio/newExpedicionTarjetaOperacionCambioNivelServicio.component';
import { NewRnetRenovacionTarjetaOperacionComponent } from './froTrteSolicitud/tramites/tramiteRenovacionTarjetaOperacion/newRenovacionTarjetaOperacion.component';
import { NewRnetCambioEmpresaComponent } from './froTrteSolicitud/tramites/tramiteCambioEmpresa/newCambioEmpresa.component';
import { NewRnetDesvinculacionCambioServicioComponent } from './froTrteSolicitud/tramites/tramiteDesvinculacionCambioServicio/newDesvinculacionCambioServicio.component';
import { NewRnetConceptoFavorableComponent } from './froTrteSolicitud/tramites/tramiteConceptoFavorable/newConceptoFavorable.component';
import { NewRnetDesvinculacionComunAcuerdoComponent } from './froTrteSolicitud/tramites/tramiteDesvinculacionComunAcuerdo/newDesvinculacionComunAcuerdo.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    Ng2BootstrapModule.forRoot(),
    SelectModule,
    TooltipModule,
    FinancieroRoutingModule,
    FroFacturaModule,
    FroReporteIngresosModule,
    FroTrteSolicitudModule,
    FroTrtePrecioModule,
    FroTrteArchivoPlanoModule,
  ],
  declarations: [
    FroFacTramiteComponent,
    FroFacParqueaderoComponent,
    FroReporteIngresosComponent,
    FroTrteSolicitudComponent,
    FroTrtePrecioComponent,
    FroTrteArchivoPlanoComponent,
    NewInsumoComponent,
    NewRncComponent,
    NewRncExpedicionLicenciaComponent,
    NewRncDuplicadoLicenciaComponent,
    NewRncExpedicionLicenciaCambioDocumentoComponent,
    NewRncRecategorizacionLicenciaAbajoComponent,
    NewRncRecategorizacionLicenciaArribaComponent,
    NewRncRefrendacionLicenciaComponent,
    NewRnaComponent,
    NewRnmaComponent,
    NewRnrsComponent,
    NewBlindajeComponent,
    NewCambioColorComponent,
    NewCambioGasComponent,
    NewCambioServicioComponent,
    NewCambioPlacaComponent,
    NewCambioMotorComponent,
    NewCancelacionMatriculaComponent,
    NewCertificadoTradicionComponent,
    NewDuplicadoLicenciaComponent,
    NewDuplicadoPlacaComponent,
    NewImportacionTemporalComponent,
    NewMatricualaInicialComponent,
    NewProrrogaImportacionTemporalComponent,
    NewRadicadoCuentaComponent,
    NewRegrabarMotorComponent,
    NewRegrabarSerieComponent,
    NewRegrabarChasisComponent,
    NewRegrabarVinComponent,
    NewRematriculaComponent,
    NewTraspasoComponent,
    NewTraspasoIndeterminadaComponent,
    NewTrasladoCuentaComponent,
    NewTramiteInscripcionAlertaPrendaComponent,
    NewTramiteLevantamientoAlertaPrendaComponent,
    NewTramiteCambioAcreedorPrendarioComponent,
    NewTramiteCambioAcreedorPrendarioPropietarioComponent,
    NewTransformacionComponent,
    NewRnetComponent,
    NewRnetExpedicionTarjetaOperacionComponent,
    NewRnetDuplicadoTarjetaOperacionComponent,
    NewRnetExpedicionTarjetaOperacionCambioNivelServicioComponent,
    NewRnetRenovacionTarjetaOperacionComponent,
    NewRnetCambioEmpresaComponent,
    NewRnetDesvinculacionCambioServicioComponent,
    NewRnetConceptoFavorableComponent,
    NewRnetDesvinculacionComunAcuerdoComponent,
  ]
})
export class FinancieroModule { }
