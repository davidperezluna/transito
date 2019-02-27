import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TramiteSolicitudRnrsComponent } from './tramiteSolicitudRnrs.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { TramiteSolicitudService } from '../../services/tramiteSolicitud.service';
import { UserEmpresaService } from '../../services/userEmpresa.service';

import { NewRnrsComponent } from './newRnrs/newRnrs.component';
import { NewRnrsDuplicadoPlacaComponent } from './Rnrs/tramiteDuplicadoPlaca/newRnrs.duplicadoPlaca.component';
import { NewRnrsDuplicadoLicenciaComponent } from './Rnrs/tramiteDuplicadoLicencia/newRnrs.duplicadoLicencia.component';
import { NewRnrsCambioColorComponent } from './Rnrs/tramiteCambioColor/newRnrs.cambioColor.component'; 
import { NewRnrsCambioCombustibleComponent } from './Rnrs/tramiteCambioCombustible/newRnrs.cambioCombustible.component';
import { NewRnrsCambioServicioComponent } from './Rnrs/tramiteCambioServicio/newRnrs.cambioServicio.component';
import { NewRnrsCambioCarroceriaComponent } from './Rnrs/tramiteCambioCarroceria/newRnrs.cambioCarroceria.component';
import { NewRnrsCambioPlacaComponent } from './Rnrs/tramiteCambioPlaca/newRnrs.cambioPlaca.component';
import { NewRnrsCambioMotorComponent } from './Rnrs/tramiteCambioMotor/newRnrs.cambioMotor.component';
import { NewRnrsRegrabarMotorComponent } from './Rnrs/tramiteRegrabarMotor/newRnrs.regrabarMotor.component';
import { NewRnrsRegrabarSerieComponent } from './Rnrs/tramiteRegrabarSerie/newRnrs.regrabarSerie.component';
import { NewRnrsRegrabarChasisComponent } from './Rnrs/tramiteRegrabarChasis/newRnrs.regrabarChasis.component';
import { NewRnrsRegrabarVinComponent } from './Rnrs/tramiteRegrabarVin/newRnrs.regrabarVin.component'; 
import { NewRnrsRematriculaComponent } from './Rnrs/tramiteRematricula/newRnrs.rematricula.component';
import { NewRnrsCambioSedeOperativaComponent } from './Rnrs/tramiteCambioSedeOperativa/newRnrs.cambioSedeOperativa.component';
import { NewRnrsCancelacionMatriculaComponent } from './Rnrs/tramiteCancelacionMatricula/newRnrs.cancelacionMatricula.component';
import { NewRnrsCertificadoTradicionComponent } from './Rnrs/tramiteCertificadoTradicion/newRnrs.certificadoTradicion.component';
import { NewRnrsBlindajeComponent } from './Rnrs/tramiteBlindaje/newRnrs.blindaje.component';
import { NewRnrsPreregistroComponent } from './Rnrs/tramitePreregistro/newRnrs.preregistro.component';
import { NewRnrsCiudadanoComponent } from './newRnrsCiudadano/newRnrsCiudadano.component';
import { NewRnrsSustratoComponent } from './newRnrsSustrato/newRnrsSustrato.component';
import { NewRnrsTraspasoComponent } from './Rnrs/tramiteTraspaso/newRnrs.traspaso.component';
import { NewRnrsMatricualaInicialComponent } from './Rnrs/tramiteMatriculaInicial/newRnrs.matriculaInicial.component';
import { NewRnrsRadicadoCuentaComponent } from './Rnrs/tramiteRadicadoCuenta/newRnrs.radicadoCuenta.component';
import { NewRnrsRegistroMaquinariaComponent } from './Rnrs/tramiteRegistroMaquinaria/newRnrs.registroMaquinaria.component';
import { NewTrasladoComponent } from './Rnrs/tramiteTraslado/newRnrsTraslado.component';
import { TramiteTrasladoService } from '../../services/tramiteTraslado.service';
import { NewRnrsTraspasoIndeterminadaComponent } from './Rnrs/tramiteTraspasoIndeterminada/newRnrs.traspasoIndeterminada.component';
import { NewRnrsTransformacionComponent } from './rnrs/tramiteTransformacion/newRnrs.transformacion.component';
import { NewRnrsTramiteInscripcionAlertaPrendaComponent } from './rnrs/tramiteInscripcionAlertaPrenda/newRnrs.inscripcionAlertaPrenda.component';
import { NewRnrsTramiteLevantamientoAlertaPrendaComponent } from './rnrs/tramiteLevantamientoAlertaPrenda/newRnrs.levantamientoAlertaPrenda.component';
import { NewRnrsTramiteCambioAcreedorPrendarioComponent } from './rnrs/tramiteCambioAcreedorPrendario/newRnrs.CambioAcreedorPrendario.component'; 
import { NewRnrsTramiteCambioAcreedorPrendarioPropietarioComponent } from './rnrs/tramiteCambioAcreedorPrendarioPropietario/newRnrs.CambioAcreedorPrendarioPropietario.component'; 
import { NewRnrsImportacionTemporalComponent } from "./rnrs/tramiteImportacionTemporal/newRnrs.importacionTemporal.component";
import { NewRnrsProrrogaImportacionTemporalComponent } from "./rnrs/tramiteProrrogaImportacionTemporal/newRnrs.prorrogaImportacionTemporal.component";
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';



@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [
        TramiteSolicitudRnrsComponent,
        NewRnrsComponent,
        EditComponent,
        NewRnrsDuplicadoPlacaComponent,
        NewRnrsDuplicadoLicenciaComponent,
        NewRnrsCambioColorComponent,
        NewRnrsCambioPlacaComponent,
        NewRnrsCambioMotorComponent,
        NewRnrsRegrabarMotorComponent,
        NewRnrsRematriculaComponent,
        NewRnrsPreregistroComponent,
        NewRnrsCambioCombustibleComponent,
        NewRnrsCambioCarroceriaComponent,
        NewRnrsCambioServicioComponent,
        NewRnrsRegrabarSerieComponent,
        NewRnrsRegrabarChasisComponent,
        NewRnrsRegrabarVinComponent,
        NewRnrsBlindajeComponent,
        NewRnrsCambioSedeOperativaComponent,
        NewRnrsCancelacionMatriculaComponent,
        NewRnrsCertificadoTradicionComponent,
        NewRnrsTraspasoComponent,
        NewRnrsCiudadanoComponent,
        NewRnrsSustratoComponent,
        NewRnrsMatricualaInicialComponent,
        NewRnrsRadicadoCuentaComponent,
        NewRnrsRegistroMaquinariaComponent,
        NewTrasladoComponent,
        NewRnrsTraspasoIndeterminadaComponent,
        NewRnrsTramiteInscripcionAlertaPrendaComponent,
        NewRnrsTramiteLevantamientoAlertaPrendaComponent,
        NewRnrsTransformacionComponent,
        NewRnrsTramiteCambioAcreedorPrendarioComponent,
        NewRnrsTramiteCambioAcreedorPrendarioPropietarioComponent,
        NewRnrsImportacionTemporalComponent,
        NewRnrsProrrogaImportacionTemporalComponent,

    ],
    exports: [
        TramiteSolicitudRnrsComponent,
        NewRnrsComponent,
        EditComponent,
        NewRnrsDuplicadoPlacaComponent,
        NewRnrsDuplicadoLicenciaComponent,
        NewRnrsCambioColorComponent,
        NewRnrsCambioPlacaComponent,
        NewRnrsCambioMotorComponent,
        NewRnrsRegrabarMotorComponent,
        NewRnrsRematriculaComponent,
        NewRnrsPreregistroComponent,
        NewRnrsCambioCombustibleComponent,
        NewRnrsCambioCarroceriaComponent,
        NewRnrsCambioCarroceriaComponent,
        NewRnrsCambioServicioComponent,
        NewRnrsRegrabarSerieComponent,
        NewRnrsRegrabarChasisComponent,
        NewRnrsRegrabarVinComponent,
        NewRnrsBlindajeComponent,
        NewRnrsCambioSedeOperativaComponent,
        NewRnrsCancelacionMatriculaComponent,
        NewRnrsCertificadoTradicionComponent,
        NewRnrsTraspasoComponent,
        NewRnrsCiudadanoComponent,
        NewRnrsSustratoComponent,
        NewRnrsMatricualaInicialComponent,
        NewRnrsRadicadoCuentaComponent,
        NewRnrsRegistroMaquinariaComponent,
        NewTrasladoComponent,
        NewRnrsTraspasoIndeterminadaComponent,
        NewRnrsTramiteInscripcionAlertaPrendaComponent,
        NewRnrsTramiteLevantamientoAlertaPrendaComponent,
        NewRnrsTransformacionComponent,
        NewRnrsTramiteCambioAcreedorPrendarioComponent,
        NewRnrsTramiteCambioAcreedorPrendarioPropietarioComponent,
        NewRnrsImportacionTemporalComponent,
        NewRnrsProrrogaImportacionTemporalComponent,
    ],
    providers:[TramiteSolicitudService,UserEmpresaService,TramiteTrasladoService]
})

export class TramiteSolicitudRnrsModule { }
