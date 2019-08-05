import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'angular2-select';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { TooltipModule, Tooltip } from "ngx-tooltip";

import { TramiteTrasladoService } from '../../services/tramiteTraslado.service';
import { UserEmpresaService } from '../../services/userEmpresa.service';
import { DefaultService } from '../../services/default.service';
import { CfgTipoAlertaService } from '../../services/cfgTipoAlerta.service';
import { VhloAcreedorService } from '../../services/vhloAcreedor.service';
import { VhloRestriccionService } from '../../services/vhloRestriccion.service';
import { FroFacRetefuenteService } from '../../services/froFacRetefuente.service';
import { FroTrteSolicitudService } from '../../services/froTrteSolicitud.service';
import { FroTrteSolicitudReporteService } from '../../services/froTrteSolicitudReporte.service';

import { FroTrteSolicitudComponent } from './froTrteSolicitud.component';
import { NewRncComponent } from './newRnc/newRnc.component';
import { NewRnaComponent } from './newRna/newRna.component';
import { NewRnetComponent } from './newRnet/newRnet.component';
import { NewRnmaComponent } from './newRnma/newRnma.component';
import { NewRnrsComponent } from './newRnrs/newRnrs.component';
import { NewInsumoComponent } from './newInsumo/newInsumo.component';
import { NewDuplicadoPlacaComponent } from './tramites/tramiteDuplicadoPlaca/new.duplicadoPlaca.component';
import { NewExpedicionTarjetaOperacionComponent } from './tramites/tramiteExpedicionTarjetaOperacion/newExpedicionTarjetaOperacion.component';
import { NewDuplicadoTarjetaOperacionComponent } from './tramites/tramiteDuplicadoTarjetaOperacion/new.duplicadoTarjetaOperacion.component';
import { NewExpedicionTarjetaOperacionCambioNivelServicioComponent } from './tramites/tramiteExpedicionTarjetaOperacionCambioNivelServicio/newExpedicionTarjetaOperacionCambioNivelServicio.component';
import { NewRenovacionTarjetaOperacionComponent } from './tramites/tramiteRenovacionTarjetaOperacion/newRenovacionTarjetaOperacion.component';
import { NewCambioEmpresaComponent } from './tramites/tramiteCambioEmpresa/newCambioEmpresa.component';
import { NewDesvinculacionCambioServicioComponent } from './tramites/tramiteDesvinculacionCambioServicio/newDesvinculacionCambioServicio.component';
import { NewDuplicadoLicenciaComponent } from './tramites/tramiteDuplicadoLicencia/new.duplicadoLicencia.component';
import { NewConceptoFavorableComponent } from './tramites/tramiteConceptoFavorable/newConceptoFavorable.component';
import { NewDesvinculacionComunAcuerdoComponent } from './tramites/tramiteDesvinculacionComunAcuerdo/newDesvinculacionComunAcuerdo.component';
import { NewCambioColorComponent } from './tramites/tramiteCambioColor/new.cambioColor.component';
import { NewCambioServicioComponent } from './tramites/tramiteCambioServicio/new.cambioServicio.component';
import { NewCambioPlacaComponent } from './tramites/tramiteCambioPlaca/new.cambioPlaca.component';
import { NewCambioMotorComponent } from './tramites/tramiteCambioMotor/new.cambioMotor.component';
import { NewRegrabarMotorComponent } from './tramites/tramiteRegrabarMotor/new.regrabarMotor.component';
import { NewRegrabarSerieComponent } from './tramites/tramiteRegrabarSerie/new.regrabarSerie.component';
import { NewRegrabarChasisComponent } from './tramites/tramiteRegrabarChasis/new.regrabarChasis.component';
import { NewRegrabarVinComponent } from './tramites/tramiteRegrabarVin/new.regrabarVin.component'; 
import { NewRematriculaComponent } from './tramites/tramiteRematricula/new.rematricula.component';
import { NewCancelacionMatriculaComponent } from './tramites/tramiteCancelacionMatricula/new.cancelacionMatricula.component';
import { NewCertificadoTradicionComponent } from './tramites/tramiteCertificadoTradicion/new.certificadoTradicion.component';
import { NewBlindajeComponent } from './tramites/tramiteBlindaje/new.blindaje.component';
import { NewTraspasoComponent } from './tramites/tramiteTraspaso/new.traspaso.component';
import { NewTraspasoIndeterminadaComponent } from './tramites/tramiteTraspasoIndeterminada/new.traspasoIndeterminada.component';
import { NewTrasladoCuentaComponent } from './tramites/tramiteTrasladoCuenta/new.trasladoCuenta.component';
import { NewTramiteInscripcionAlertaPrendaComponent } from './tramites/tramiteInscripcionAlertaPrenda/new.inscripcionAlertaPrenda.component';
import { NewTramiteLevantamientoAlertaPrendaComponent } from './tramites/tramiteLevantamientoAlertaPrenda/new.levantamientoAlertaPrenda.component';
import { NewMatricualaInicialComponent } from './tramites/tramiteMatriculaInicial/new.matriculaInicial.component';
import { NewRadicadoCuentaComponent } from './tramites/tramiteRadicadoCuenta/new.radicadoCuenta.component'; 
import { NewCambioGasComponent } from './tramites/tramiteCambioGas/new.cambioGas.component'; 
import { NewTramiteCambioAcreedorPrendarioComponent } from './tramites/tramiteCambioAcreedorPrendario/new.CambioAcreedorPrendario.component'; 
import { NewTramiteCambioAcreedorPrendarioPropietarioComponent } from './tramites/tramiteCambioAcreedorPrendarioPropietario/new.CambioAcreedorPrendarioPropietario.component'; 
import { NewTransformacionComponent } from './tramites/tramiteTransformacion/new.transformacion.component';
import { NewImportacionTemporalComponent } from "./tramites/tramiteImportacionTemporal/new.importacionTemporal.component";
import { NewProrrogaImportacionTemporalComponent } from "./tramites/tramiteProrrogaImportacionTemporal/new.prorrogaImportacionTemporal.component";
//Reportes de tramite solicitud
import { ReportesComponent } from "./reportes/reportes.component";

import { NewRncExpedicionLicenciaComponent } from './tramites/tramiteExpedicionLicencia/newRncExpedicionLicencia.component';
import { NewRncDuplicadoLicenciaComponent } from './tramites/tramiteDuplicadoLicencia/newRncDuplicadoLicencia.component';
import { NewRncExpedicionLicenciaCambioDocumentoComponent } from './tramites/tramiteExpedicionLicenciaCambioDocumento/newRncExpedicionLicenciaCambioDocumento.component';
import { NewRncRecategorizacionLicenciaAbajoComponent } from './tramites/tramiteRecategorizacionLicenciaAbajo/newRncRecategorizacionLicenciaAbajo.component';
import { NewRncRecategorizacionLicenciaArribaComponent } from './tramites/tramiteRecategorizacionLicenciaArriba/newRncRecategorizacionLicenciaArriba.component';
import { NewRncRefrendacionLicenciaComponent } from './tramites/tramiteRefrendacionLicencia/newRncRefrendacionLicencia.component';

import { UserCiudadanoModule } from '../../usuario/userCiudadano/userCiudadano.module';
import { VhloSoatModule } from '../../vehiculo/vhloSoat/vhloSoat.module';
import { VhloTecnoMecanicaModule } from '../../vehiculo/vhloTecnoMecanica/vhloTecnoMecanica.module';

@NgModule({
    imports: [
        CommonModule,
        Ng2BootstrapModule.forRoot(),
        SelectModule,
        TooltipModule,
        UserCiudadanoModule,
        VhloSoatModule,
        VhloTecnoMecanicaModule
    ],
    declarations: [
        FroTrteSolicitudComponent,
        NewRncComponent,
        NewRnaComponent,
        NewRnetComponent,
        NewRnmaComponent,
        NewRnrsComponent,
        NewInsumoComponent,
        NewDuplicadoPlacaComponent,
        NewExpedicionTarjetaOperacionComponent,
        NewDuplicadoTarjetaOperacionComponent,
        NewExpedicionTarjetaOperacionCambioNivelServicioComponent,
        NewCambioEmpresaComponent,
        NewDesvinculacionCambioServicioComponent,
        NewRenovacionTarjetaOperacionComponent,
        NewDuplicadoLicenciaComponent,
        NewConceptoFavorableComponent,
        NewDesvinculacionComunAcuerdoComponent,
        NewCambioColorComponent,
        NewCambioPlacaComponent,
        NewCambioMotorComponent,
        NewRegrabarMotorComponent,
        NewRematriculaComponent,
        NewCambioServicioComponent,
        NewRegrabarSerieComponent,
        NewRegrabarChasisComponent,
        NewRegrabarVinComponent,
        NewBlindajeComponent,
        NewCancelacionMatriculaComponent,
        NewCertificadoTradicionComponent,
        NewTraspasoComponent,
        NewTraspasoIndeterminadaComponent,
        NewTramiteInscripcionAlertaPrendaComponent,
        NewTramiteLevantamientoAlertaPrendaComponent,
        NewMatricualaInicialComponent,
        NewRadicadoCuentaComponent,
        NewTransformacionComponent,
        NewTrasladoCuentaComponent,
        NewCambioGasComponent,
        NewTramiteCambioAcreedorPrendarioComponent,
        NewTramiteCambioAcreedorPrendarioPropietarioComponent,
        NewImportacionTemporalComponent,
        NewProrrogaImportacionTemporalComponent,
        NewRncExpedicionLicenciaComponent,
        NewRncDuplicadoLicenciaComponent,
        NewRncExpedicionLicenciaCambioDocumentoComponent,
        NewRncRecategorizacionLicenciaAbajoComponent,
        NewRncRecategorizacionLicenciaArribaComponent,
        NewRncRefrendacionLicenciaComponent,
        ReportesComponent,
    ],
    exports: [
        FroTrteSolicitudComponent,
        NewRncComponent,
        NewRnaComponent,
        NewRnetComponent,
        NewRnmaComponent,
        NewRnrsComponent,
        NewInsumoComponent,
        NewDuplicadoPlacaComponent,
        NewExpedicionTarjetaOperacionComponent,
        NewDuplicadoTarjetaOperacionComponent,
        NewExpedicionTarjetaOperacionCambioNivelServicioComponent,
        NewCambioEmpresaComponent,
        NewDesvinculacionCambioServicioComponent,
        NewRenovacionTarjetaOperacionComponent,
        NewDuplicadoLicenciaComponent,
        NewConceptoFavorableComponent,
        NewDesvinculacionComunAcuerdoComponent,
        NewCambioColorComponent,
        NewCambioPlacaComponent,
        NewCambioMotorComponent,
        NewRegrabarMotorComponent,
        NewRematriculaComponent,
        NewCambioServicioComponent,
        NewRegrabarSerieComponent,
        NewRegrabarChasisComponent,
        NewRegrabarVinComponent,
        NewBlindajeComponent,
        NewCancelacionMatriculaComponent,
        NewCertificadoTradicionComponent,
        NewTraspasoComponent,
        NewTraspasoIndeterminadaComponent,
        NewTramiteInscripcionAlertaPrendaComponent,
        NewTramiteLevantamientoAlertaPrendaComponent,
        NewMatricualaInicialComponent,
        NewRadicadoCuentaComponent,
        NewTransformacionComponent,
        NewTrasladoCuentaComponent,
        NewCambioGasComponent,
        NewTramiteCambioAcreedorPrendarioComponent,
        NewTramiteCambioAcreedorPrendarioPropietarioComponent,
        NewImportacionTemporalComponent,
        NewProrrogaImportacionTemporalComponent,
        NewRncExpedicionLicenciaComponent,
        NewRncDuplicadoLicenciaComponent,
        NewRncExpedicionLicenciaCambioDocumentoComponent,
        NewRncRecategorizacionLicenciaAbajoComponent,
        NewRncRecategorizacionLicenciaArribaComponent,
        NewRncRefrendacionLicenciaComponent,
        ReportesComponent,
    ],
    providers: [
        FroTrteSolicitudService, 
        FroTrteSolicitudReporteService, 
        CfgTipoAlertaService, 
        TramiteTrasladoService, 
        VhloRestriccionService,
        VhloAcreedorService,
        FroFacRetefuenteService,
        UserEmpresaService,
        DefaultService
    ]
})

export class FroTrteSolicitudModule { }
