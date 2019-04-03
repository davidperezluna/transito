import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TramiteTrasladoService } from '../../services/tramiteTraslado.service';
import { FacturaInsumoService } from '../../services/facturaInsumo.service';
import { FroTrteSolicitudRnaService } from '../../services/froTrteSolicitudRna.service';
import { FroTrteSolicitudRnrsComponent } from './froTrteSolicitudRnrs.component';
import { UserEmpresaService } from '../../services/userEmpresa.service';
import { DefaultService } from '../../services/default.service';
import { CfgTipoAlertaService } from '../../services/cfgTipoAlerta.service';
import { VhloAcreedorService } from '../../services/vhloAcreedor.service';
import { NewRnrsComponent } from './newRnrs/newRnrs.component'; 
import { NewRnrsDuplicadoPlacaComponent } from './rnrs/tramiteDuplicadoPlaca/newRnrs.duplicadoPlaca.component';
import { NewRnrsDuplicadoLicenciaComponent } from './rnrs/tramiteDuplicadoLicencia/newRnrs.duplicadoLicencia.component';
import { NewRnrsCambioColorComponent } from './rnrs/tramiteCambioColor/newRnrs.cambioColor.component';
import { NewRnrsCambioServicioComponent } from './rnrs/tramiteCambioServicio/newRnrs.cambioServicio.component';
import { NewRnrsCambioPlacaComponent } from './rnrs/tramiteCambioPlaca/newRnrs.cambioPlaca.component';
import { NewRnrsCambioMotorComponent } from './rnrs/tramiteCambioMotor/newRnrs.cambioMotor.component';
import { NewRnrsRegrabarMotorComponent } from './rnrs/tramiteRegrabarMotor/newRnrs.regrabarMotor.component';
import { NewRnrsRegrabarSerieComponent } from './rnrs/tramiteRegrabarSerie/newRnrs.regrabarSerie.component';
import { NewRnrsRegrabarChasisComponent } from './rnrs/tramiteRegrabarChasis/newRnrs.regrabarChasis.component';
import { NewRnrsRegrabarVinComponent } from './rnrs/tramiteRegrabarVin/newRnrs.regrabarVin.component'; 
import { NewRnrsRematriculaComponent } from './rnrs/tramiteRematricula/newRnrs.rematricula.component';
import { NewRnrsCancelacionMatriculaComponent } from './rnrs/tramiteCancelacionMatricula/newRnrs.CancelacionMatricula.component';
import { NewRnrsCertificadoTradicionComponent } from './rnrs/tramiteCertificadoTradicion/newRnrs.CertificadoTradicion.component';
import { NewRnrsBlindajeComponent } from './rnrs/tramiteBlindaje/newRnrs.Blindaje.component';
import { NewRnrsCiudadanoComponent } from './newRnrsCiudadano/newRnrsCiudadano.component';
import { NewRnrsAcreedorComponent } from './newRnrsAcreedor/newRnrsAcreedor.component';
import { NewRnrsInsumoComponent } from './newRnrsSustrato/newRnrsSustrato.component';
import { NewRnrsTraspasoComponent } from './rnrs/tramiteTraspaso/newRnrs.traspaso.component';
import { NewRnrsTraspasoIndeterminadaComponent } from './rnrs/tramiteTraspasoIndeterminada/newRnrs.traspasoIndeterminada.component';
import { NewTrasladoCuentaComponent } from './rnrs/tramiteTrasladoCuenta/newTrasladoCuenta.component';
import { NewRnrsTramiteInscripcionAlertaPrendaComponent } from './rnrs/tramiteInscripcionAlertaPrenda/newRnrs.inscripcionAlertaPrenda.component';
import { NewRnrsTramiteLevantamientoAlertaPrendaComponent } from './rnrs/tramiteLevantamientoAlertaPrenda/newRnrs.levantamientoAlertaPrenda.component';
import { NewRnrsMatricualaInicialComponent } from './rnrs/tramiteMatriculaInicial/newRnrs.matriculaInicial.component';
import { NewRnrsRadicadoCuentaComponent } from './rnrs/tramiteRadicadoCuenta/newRnrs.radicadoCuenta.component'; 
import { NewRnrsCambioGasComponent } from './rnrs/tramiteCambioGas/newRnrs.cambioGas.component'; 
import { NewRnrsTramiteCambioAcreedorPrendarioComponent } from './rnrs/tramiteCambioAcreedorPrendario/newRnrs.CambioAcreedorPrendario.component'; 
import { NewRnrsTramiteCambioAcreedorPrendarioPropietarioComponent } from './rnrs/tramiteCambioAcreedorPrendarioPropietario/newRnrs.CambioAcreedorPrendarioPropietario.component'; 
import { NewRnrsTransformacionComponent } from './rnrs/tramiteTransformacion/newRnrs.transformacion.component';
import { EditComponent } from './edit/edit.component';
import { NewRnrsImportacionTemporalComponent } from "./rnrs/tramiteImportacionTemporal/newRnrs.importacionTemporal.component";
import { NewRnrsProrrogaImportacionTemporalComponent } from "./rnrs/tramiteProrrogaImportacionTemporal/newRnrs.prorrogaImportacionTemporal.component";
import { SelectModule } from 'angular2-select';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { TooltipModule } from "ngx-tooltip";

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule, TooltipModule],
    declarations: [
        FroTrteSolicitudRnrsComponent,
        NewRnrsComponent,
        EditComponent,
        NewRnrsDuplicadoPlacaComponent,
        NewRnrsDuplicadoLicenciaComponent,
        NewRnrsCambioColorComponent,
        NewRnrsCambioPlacaComponent,
        NewRnrsCambioMotorComponent,
        NewRnrsRegrabarMotorComponent,
        NewRnrsRematriculaComponent,
        NewRnrsCambioServicioComponent,
        NewRnrsRegrabarSerieComponent,
        NewRnrsRegrabarChasisComponent,
        NewRnrsRegrabarVinComponent,
        NewRnrsBlindajeComponent,
        NewRnrsCancelacionMatriculaComponent,
        NewRnrsCertificadoTradicionComponent,
        NewRnrsTraspasoComponent,
        NewRnrsTraspasoIndeterminadaComponent,
        NewRnrsTramiteInscripcionAlertaPrendaComponent,
        NewRnrsTramiteLevantamientoAlertaPrendaComponent,
        NewRnrsCiudadanoComponent,
        NewRnrsAcreedorComponent,
        NewRnrsInsumoComponent,
        NewRnrsMatricualaInicialComponent,
        NewRnrsRadicadoCuentaComponent,
        NewRnrsTransformacionComponent,
        NewTrasladoCuentaComponent,
        NewRnrsCambioGasComponent,
        NewRnrsTramiteCambioAcreedorPrendarioComponent,
        NewRnrsTramiteCambioAcreedorPrendarioPropietarioComponent,
        NewRnrsImportacionTemporalComponent,
        NewRnrsProrrogaImportacionTemporalComponent,
    ],
    exports: [
        FroTrteSolicitudRnrsComponent,
        NewRnrsComponent,
        EditComponent,
        NewRnrsDuplicadoPlacaComponent,
        NewRnrsDuplicadoLicenciaComponent,
        NewRnrsCambioColorComponent,
        NewRnrsCambioPlacaComponent,
        NewRnrsCambioMotorComponent,
        NewRnrsRegrabarMotorComponent,
        NewRnrsRematriculaComponent,
        NewRnrsCambioServicioComponent,
        NewRnrsRegrabarSerieComponent,
        NewRnrsRegrabarChasisComponent,
        NewRnrsRegrabarVinComponent,
        NewRnrsBlindajeComponent,
        NewRnrsCancelacionMatriculaComponent,
        NewRnrsCertificadoTradicionComponent,
        NewRnrsTraspasoComponent,
        NewRnrsTraspasoIndeterminadaComponent,
        NewRnrsTramiteInscripcionAlertaPrendaComponent,
        NewRnrsTramiteLevantamientoAlertaPrendaComponent,
        NewRnrsCiudadanoComponent,
        NewRnrsAcreedorComponent,
        NewRnrsInsumoComponent,
        NewRnrsMatricualaInicialComponent,
        NewRnrsRadicadoCuentaComponent,
        NewRnrsTransformacionComponent,
        NewTrasladoCuentaComponent,
        NewRnrsCambioGasComponent,
        NewRnrsTramiteCambioAcreedorPrendarioComponent,
        NewRnrsTramiteCambioAcreedorPrendarioPropietarioComponent,
        NewRnrsImportacionTemporalComponent,
        NewRnrsProrrogaImportacionTemporalComponent,
    ],
    providers: [
        FacturaInsumoService, 
        FroTrteSolicitudRnaService, 
        CfgTipoAlertaService, 
        TramiteTrasladoService, 
        VhloAcreedorService, 
        UserEmpresaService,
        DefaultService
    ]
})

export class FroTrteSolicitudRnrsModule { }
