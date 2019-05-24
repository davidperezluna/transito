import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TramiteTrasladoService } from '../../services/tramiteTraslado.service';
import { UserEmpresaService } from '../../services/userEmpresa.service';
import { DefaultService } from '../../services/default.service';
import { CfgTipoAlertaService } from '../../services/cfgTipoAlerta.service';
import { VhloAcreedorService } from '../../services/vhloAcreedor.service';
import { FroFacRetefuenteService } from '../../services/froFacRetefuente.service';
import { FroTrteSolicitudService } from '../../services/froTrteSolicitud.service';

import { FroTrteSolicitudComponent } from './froTrteSolicitud.component';
import { NewRnmaComponent } from './newRnma/newRnma.component';
import { NewRnrsComponent } from './newRnrs/newRnrs.component';
import { NewInsumoComponent } from './newInsumo/newInsumo.component';
import { NewDuplicadoPlacaComponent } from './tramites/tramiteDuplicadoPlaca/new.duplicadoPlaca.component';
import { NewDuplicadoLicenciaComponent } from './tramites/tramiteDuplicadoLicencia/new.duplicadoLicencia.component';
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

import { SelectModule } from 'angular2-select';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { TooltipModule, Tooltip } from "ngx-tooltip";

import { UserCiudadanoModule } from '../userCiudadano/userCiudadano.module';

@NgModule({
    imports: [
        CommonModule,
        Ng2BootstrapModule.forRoot(),
        SelectModule,
        TooltipModule,
        UserCiudadanoModule
    ],
    declarations: [
        FroTrteSolicitudComponent,
        NewRnmaComponent,
        NewRnrsComponent,
        NewInsumoComponent,
        NewDuplicadoPlacaComponent,
        NewDuplicadoLicenciaComponent,
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
    ],
    exports: [
        FroTrteSolicitudComponent,
        NewRnmaComponent,
        NewRnrsComponent,
        NewInsumoComponent,
        NewDuplicadoPlacaComponent,
        NewDuplicadoLicenciaComponent,
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
    ],
    providers: [
        FroTrteSolicitudService, 
        CfgTipoAlertaService, 
        TramiteTrasladoService, 
        VhloAcreedorService,
        FroFacRetefuenteService,
        UserEmpresaService,
        DefaultService
    ]
})

export class FroTrteSolicitudModule { }