import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TramiteSolicitudComponent } from './tramiteSolicitud.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { TramiteSolicitudService } from '../../services/tramiteSolicitud.service';
import { EmpresaService } from '../../services/empresa.service';
import { DefaultService } from '../../services/default.service';
import { CfgTipoAlertaService } from '../../services/cfgTipoAlerta.service';
import { VehiculoAcreedorService } from '../../services/vehiculoAcreedor.service';

import { NewRnaComponent } from './newRna/newRna.component'; 
import { NewRnaDuplicadoPlacaComponent } from './rna/tramiteDuplicadoPlaca/newRna.duplicadoPlaca.component';
import { NewRnaDuplicadoLicenciaComponent } from './rna/tramiteDuplicadoLicencia/newRna.duplicadoLicencia.component';
import { NewRnaCambioColorComponent } from './rna/tramiteCambioColor/newRna.cambioColor.component'; 
import { NewRnaCambioCombustibleComponent } from './rna/tramiteCambioCombustible/newRna.cambioCombustible.component';
import { NewRnaCambioServicioComponent } from './rna/tramiteCambioServicio/newRna.cambioServicio.component';
import { NewRnaCambioCarroceriaComponent } from './rna/tramiteCambioCarroceria/newRna.cambioCarroceria.component';
import { NewRnaCambioPlacaComponent } from './rna/tramiteCambioPlaca/newRna.cambioPlaca.component';
import { NewRnaCambioMotorComponent } from './rna/tramiteCambioMotor/newRna.cambioMotor.component';
import { NewRnaRegrabarMotorComponent } from './rna/tramiteRegrabarMotor/newRna.regrabarMotor.component';
import { NewRnaRegrabarSerieComponent } from './rna/tramiteRegrabarSerie/newRna.regrabarSerie.component';
import { NewRnaRegrabarChasisComponent } from './rna/tramiteRegrabarChasis/newRna.regrabarChasis.component';
import { NewRnaRegrabarVinComponent } from './rna/tramiteRegrabarVin/newRna.regrabarVin.component'; 
import { NewRnaRematriculaComponent } from './rna/tramiteRematricula/newRna.rematricula.component';
import { NewRnaCambioSedeOperativaComponent } from './rna/tramiteCambioSedeOperativa/newRna.cambioSedeOperativa.component';
import { NewRnaCancelacionMatriculaComponent } from './rna/tramiteCancelacionMatricula/newRna.cancelacionMatricula.component';
import { NewRnaCertificadoTradicionComponent } from './rna/tramiteCertificadoTradicion/newRna.certificadoTradicion.component';
import { NewRnaBlindajeComponent } from './rna/tramiteBlindaje/newRna.blindaje.component';
import { NewRnaPreregistroComponent } from './rna/tramitePreregistro/newRna.preregistro.component';
import { NewRnaCiudadanoComponent } from './newRnaCiudadano/newRnaCiudadano.component';
import { NewRnaAcreedorComponent } from './newRnaAcreedor/newRnaAcreedor.component';
import { NewRnaSustratoComponent } from './newRnaSustrato/newRnaSustrato.component';
import { NewRnaTraspasoComponent } from './rna/tramiteTraspaso/newRna.traspaso.component';
import { NewRnaTraspasoIndeterminadaComponent } from './rna/tramiteTraspasoIndeterminada/newRna.traspasoIndeterminada.component';
import { NewTrasladoComponent } from './rna/tramiteTraslado/newTraslado.component';
import { NewRnaTramiteInscripcionAlertaPrendaComponent } from './rna/tramiteInscripcionAlertaPrenda/newRna.inscripcionAlertaPrenda.component';
import { NewRnaTramiteLevantamientoAlertaPrendaComponent } from './rna/tramiteLevantamientoAlertaPrenda/newRna.levantamientoAlertaPrenda.component';
import { NewRnaMatricualaInicialComponent } from './rna/tramiteMatriculaInicial/newRna.matriculaInicial.component';
import { NewRnaRadicadoCuentaComponent } from './rna/tramiteRadicadoCuenta/newRna.radicadoCuenta.component'; 

import { NewRnaTransformacionComponent } from './rna/tramiteTransformacion/newRna.transformacion.component';
import { NewRnaCambioConjuntoComponent } from './rna/tramiteCambioConjunto/newRna.cambioConjunto.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';
import { TramiteTrasladoService } from '../../services/tramiteTraslado.service';



@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [
        TramiteSolicitudComponent,
        NewRnaComponent,
        EditComponent,
        NewRnaDuplicadoPlacaComponent,
        NewRnaDuplicadoLicenciaComponent,
        NewRnaCambioColorComponent,
        NewRnaCambioPlacaComponent,
        NewRnaCambioMotorComponent,
        NewRnaRegrabarMotorComponent,
        NewRnaRematriculaComponent,
        NewRnaPreregistroComponent,
        NewRnaCambioCombustibleComponent,
        NewRnaCambioCarroceriaComponent,
        NewRnaCambioServicioComponent,
        NewRnaRegrabarSerieComponent,
        NewRnaRegrabarChasisComponent,
        NewRnaRegrabarVinComponent,
        NewRnaBlindajeComponent,
        NewRnaCambioSedeOperativaComponent,
        NewRnaCancelacionMatriculaComponent,
        NewRnaCertificadoTradicionComponent,
        NewRnaTraspasoComponent,
        NewRnaTraspasoIndeterminadaComponent,
        NewRnaTramiteInscripcionAlertaPrendaComponent,
        NewRnaTramiteLevantamientoAlertaPrendaComponent,
        NewRnaCiudadanoComponent,
        NewRnaAcreedorComponent,
        NewRnaSustratoComponent,
        NewRnaMatricualaInicialComponent,
        NewRnaRadicadoCuentaComponent,
        NewRnaTransformacionComponent,
        NewRnaCambioConjuntoComponent,
        NewTrasladoComponent
    ],
    exports: [
        TramiteSolicitudComponent,
        NewRnaComponent,
        EditComponent,
        NewRnaDuplicadoPlacaComponent,
        NewRnaDuplicadoLicenciaComponent,
        NewRnaCambioColorComponent,
        NewRnaCambioPlacaComponent,
        NewRnaCambioMotorComponent,
        NewRnaRegrabarMotorComponent,
        NewRnaRematriculaComponent,
        NewRnaPreregistroComponent,
        NewRnaCambioCombustibleComponent,
        NewRnaCambioCarroceriaComponent,
        NewRnaCambioCarroceriaComponent,
        NewRnaCambioServicioComponent,
        NewRnaRegrabarSerieComponent,
        NewRnaRegrabarChasisComponent,
        NewRnaRegrabarVinComponent,
        NewRnaBlindajeComponent,
        NewRnaCambioSedeOperativaComponent,
        NewRnaCancelacionMatriculaComponent,
        NewRnaCertificadoTradicionComponent,
        NewRnaTraspasoComponent,
        NewRnaTraspasoIndeterminadaComponent,
        NewRnaTramiteInscripcionAlertaPrendaComponent,
        NewRnaTramiteLevantamientoAlertaPrendaComponent,
        NewRnaCiudadanoComponent,
        NewRnaAcreedorComponent,
        NewRnaSustratoComponent,
        NewRnaMatricualaInicialComponent,
        NewRnaRadicadoCuentaComponent,
        NewRnaTransformacionComponent,
        NewRnaCambioConjuntoComponent,
        NewTrasladoComponent
    ],
    providers: [TramiteSolicitudService, CfgTipoAlertaService, TramiteTrasladoService, VehiculoAcreedorService, EmpresaService, DefaultService]
})

export class TramiteSolicitudModule { }
