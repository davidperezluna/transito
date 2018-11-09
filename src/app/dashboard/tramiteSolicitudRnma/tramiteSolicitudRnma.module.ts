import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TramiteSolicitudRnmaComponent } from './tramiteSolicitudRnma.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { TramiteSolicitudService } from '../../services/tramiteSolicitud.service';
import { EmpresaService } from '../../services/empresa.service';

import { NewRnmaComponent } from './newRnma/newRnma.component';
import { NewRnmaDuplicadoPlacaComponent } from './Rnma/tramiteDuplicadoPlaca/newRnma.duplicadoPlaca.component';
import { NewRnmaDuplicadoLicenciaComponent } from './Rnma/tramiteDuplicadoLicencia/newRnma.duplicadoLicencia.component';
import { NewRnmaCambioColorComponent } from './Rnma/tramiteCambioColor/newRnma.cambioColor.component'; 
import { NewRnmaCambioCombustibleComponent } from './Rnma/tramiteCambioCombustible/newRnma.cambioCombustible.component';
import { NewRnmaCambioServicioComponent } from './Rnma/tramiteCambioServicio/newRnma.cambioServicio.component';
import { NewRnmaCambioCarroceriaComponent } from './Rnma/tramiteCambioCarroceria/newRnma.cambioCarroceria.component';
import { NewRnmaCambioPlacaComponent } from './Rnma/tramiteCambioPlaca/newRnma.cambioPlaca.component';
import { NewRnmaCambioMotorComponent } from './Rnma/tramiteCambioMotor/newRnma.cambioMotor.component';
import { NewRnmaRegrabarMotorComponent } from './Rnma/tramiteRegrabarMotor/newRnma.regrabarMotor.component';
import { NewRnmaRegrabarSerieComponent } from './Rnma/tramiteRegrabarSerie/newRnma.regrabarSerie.component';
import { NewRnmaRegrabarChasisComponent } from './Rnma/tramiteRegrabarChasis/newRnma.regrabarChasis.component';
import { NewRnmaRegrabarVinComponent } from './Rnma/tramiteRegrabarVin/newRnma.regrabarVin.component'; 
import { NewRnmaRematriculaComponent } from './Rnma/tramiteRematricula/newRnma.rematricula.component';
import { NewRnmaCambioSedeOperativaComponent } from './Rnma/tramiteCambioSedeOperativa/newRnma.cambioSedeOperativa.component';
import { NewRnmaCancelacionMatriculaComponent } from './Rnma/tramiteCancelacionMatricula/newRnma.cancelacionMatricula.component';
import { NewRnmaCertificadoTradicionComponent } from './Rnma/tramiteCertificadoTradicion/newRnma.certificadoTradicion.component';
import { NewRnmaBlindajeComponent } from './Rnma/tramiteBlindaje/newRnma.blindaje.component';
import { NewRnmaPreregistroComponent } from './Rnma/tramitePreregistro/newRnma.preregistro.component';
import { NewRnmaCiudadanoComponent } from './newRnmaCiudadano/newRnmaCiudadano.component';
import { NewRnmaSustratoComponent } from './newRnmaSustrato/newRnmaSustrato.component';
import { NewRnmaTraspasoComponent } from './Rnma/tramiteTraspaso/newRnma.traspaso.component';
import { NewRnmaMatricualaInicialComponent } from './Rnma/tramiteMatriculaInicial/newRnma.matriculaInicial.component';
import { NewRnmaRadicadoCuentaComponent } from './Rnma/tramiteRadicadoCuenta/newRnma.radicadoCuenta.component';
import { NewRnmaRegistroMaquinariaComponent } from './Rnma/tramiteRegistroMaquinaria/newRnma.registroMaquinaria.component';
import { NewTrasladoComponent } from './rnma/tramiteTraslado/newTraslado.component';
import { TramiteTrasladoService } from '../../services/tramiteTraslado.service';
import { NewRnmaTraspasoIndeterminadaComponent } from './rnma/tramiteTraspasoIndeterminada/newRnma.traspasoIndeterminada.component';
import { NewRnmaTramiteInscripcionAlertaPrendaComponent } from './rnma/tramiteInscripcionAlertaPrenda/newRnma.inscripcionAlertaPrenda.component';
import { NewRnmaTramiteLevantamientoAlertaPrendaComponent } from './rnma/tramiteLevantamientoAlertaPrenda/newRnma.levantamientoAlertaPrenda.component';
import { NewRnmaTransformacionComponent } from './rnma/tramiteTransformacion/newRnma.transformacion.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';



@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [
        TramiteSolicitudRnmaComponent,
        NewRnmaComponent,
        EditComponent,
        NewRnmaDuplicadoPlacaComponent,
        NewRnmaDuplicadoLicenciaComponent,
        NewRnmaCambioColorComponent,
        NewRnmaCambioPlacaComponent,
        NewRnmaCambioMotorComponent,
        NewRnmaRegrabarMotorComponent,
        NewRnmaRematriculaComponent,
        NewRnmaPreregistroComponent,
        NewRnmaCambioCombustibleComponent,
        NewRnmaCambioCarroceriaComponent,
        NewRnmaCambioServicioComponent,
        NewRnmaRegrabarSerieComponent,
        NewRnmaRegrabarChasisComponent,
        NewRnmaRegrabarVinComponent,
        NewRnmaBlindajeComponent,
        NewRnmaCambioSedeOperativaComponent,
        NewRnmaCancelacionMatriculaComponent,
        NewRnmaCertificadoTradicionComponent,
        NewRnmaTraspasoComponent,
        NewRnmaCiudadanoComponent,
        NewRnmaSustratoComponent,
        NewRnmaMatricualaInicialComponent,
        NewRnmaRadicadoCuentaComponent,
        NewRnmaRegistroMaquinariaComponent,
        NewTrasladoComponent,
        NewRnmaTraspasoIndeterminadaComponent,
        NewRnmaTramiteInscripcionAlertaPrendaComponent,
        NewRnmaTramiteLevantamientoAlertaPrendaComponent,
        NewRnmaTransformacionComponent
    ],
    exports: [
        TramiteSolicitudRnmaComponent,
        NewRnmaComponent,
        EditComponent,
        NewRnmaDuplicadoPlacaComponent,
        NewRnmaDuplicadoLicenciaComponent,
        NewRnmaCambioColorComponent,
        NewRnmaCambioPlacaComponent,
        NewRnmaCambioMotorComponent,
        NewRnmaRegrabarMotorComponent,
        NewRnmaRematriculaComponent,
        NewRnmaPreregistroComponent,
        NewRnmaCambioCombustibleComponent,
        NewRnmaCambioCarroceriaComponent,
        NewRnmaCambioCarroceriaComponent,
        NewRnmaCambioServicioComponent,
        NewRnmaRegrabarSerieComponent,
        NewRnmaRegrabarChasisComponent,
        NewRnmaRegrabarVinComponent,
        NewRnmaBlindajeComponent,
        NewRnmaCambioSedeOperativaComponent,
        NewRnmaCancelacionMatriculaComponent,
        NewRnmaCertificadoTradicionComponent,
        NewRnmaTraspasoComponent,
        NewRnmaCiudadanoComponent,
        NewRnmaSustratoComponent,
        NewRnmaMatricualaInicialComponent,
        NewRnmaRadicadoCuentaComponent,
        NewRnmaRegistroMaquinariaComponent,
        NewTrasladoComponent,
        NewRnmaTraspasoIndeterminadaComponent,
        NewRnmaTramiteInscripcionAlertaPrendaComponent,
        NewRnmaTramiteLevantamientoAlertaPrendaComponent,
        NewRnmaTransformacionComponent
    ],
    providers:[TramiteSolicitudService,EmpresaService,TramiteTrasladoService]
})

export class TramiteSolicitudRnmaModule { }
