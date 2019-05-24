import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TramiteTrasladoService } from '../../services/tramiteTraslado.service';
import { FroTrteSolicitudRnaComponent } from './froTrteSolicitudRna.component';
import { FroTrteSolicitudRnaService } from '../../services/froTrteSolicitudRna.service';
import { UserEmpresaService } from '../../services/userEmpresa.service';
import { DefaultService } from '../../services/default.service';
import { CfgTipoAlertaService } from '../../services/cfgTipoAlerta.service';
import { VhloAcreedorService } from '../../services/vhloAcreedor.service';
import { FroFacRetefuenteService } from '../../services/froFacRetefuente.service';
import { NewRnaComponent } from './newRna/newRna.component'; 
import { NewRnaDuplicadoPlacaComponent } from './rna/tramiteDuplicadoPlaca/newRna.duplicadoPlaca.component';
import { NewRnaDuplicadoLicenciaComponent } from './rna/tramiteDuplicadoLicencia/newRna.duplicadoLicencia.component';
import { NewRnaCambioColorComponent } from './rna/tramiteCambioColor/newRna.cambioColor.component';
import { NewRnaCambioServicioComponent } from './rna/tramiteCambioServicio/newRna.cambioServicio.component';
import { NewRnaCambioPlacaComponent } from './rna/tramiteCambioPlaca/newRna.cambioPlaca.component';
import { NewRnaCambioMotorComponent } from './rna/tramiteCambioMotor/newRna.cambioMotor.component';
import { NewRnaRegrabarMotorComponent } from './rna/tramiteRegrabarMotor/newRna.regrabarMotor.component';
import { NewRnaRegrabarSerieComponent } from './rna/tramiteRegrabarSerie/newRna.regrabarSerie.component';
import { NewRnaRegrabarChasisComponent } from './rna/tramiteRegrabarChasis/newRna.regrabarChasis.component';
import { NewRnaRegrabarVinComponent } from './rna/tramiteRegrabarVin/newRna.regrabarVin.component'; 
import { NewRnaRematriculaComponent } from './rna/tramiteRematricula/newRna.rematricula.component';
import { NewRnaCancelacionMatriculaComponent } from './rna/tramiteCancelacionMatricula/newRna.cancelacionMatricula.component';
import { NewRnaCertificadoTradicionComponent } from './rna/tramiteCertificadoTradicion/newRna.certificadoTradicion.component';
import { NewRnaBlindajeComponent } from './rna/tramiteBlindaje/newRna.blindaje.component';
import { NewRnaInsumoComponent } from './newRnaSustrato/newRnaSustrato.component';
import { NewRnaTraspasoComponent } from './rna/tramiteTraspaso/newRna.traspaso.component';
import { NewRnaTraspasoIndeterminadaComponent } from './rna/tramiteTraspasoIndeterminada/newRna.traspasoIndeterminada.component';
import { NewTrasladoCuentaComponent } from './rna/tramiteTrasladoCuenta/newTrasladoCuenta.component';
import { NewRnaTramiteInscripcionAlertaPrendaComponent } from './rna/tramiteInscripcionAlertaPrenda/newRna.inscripcionAlertaPrenda.component';
import { NewRnaTramiteLevantamientoAlertaPrendaComponent } from './rna/tramiteLevantamientoAlertaPrenda/newRna.levantamientoAlertaPrenda.component';
import { NewRnaMatricualaInicialComponent } from './rna/tramiteMatriculaInicial/newRna.matriculaInicial.component';
import { NewRnaRadicadoCuentaComponent } from './rna/tramiteRadicadoCuenta/newRna.radicadoCuenta.component'; 
import { NewRnaCambioGasComponent } from './rna/tramiteCambioGas/newRna.cambioGas.component'; 
import { NewRnaTramiteCambioAcreedorPrendarioComponent } from './rna/tramiteCambioAcreedorPrendario/newRna.CambioAcreedorPrendario.component'; 
import { NewRnaTramiteCambioAcreedorPrendarioPropietarioComponent } from './rna/tramiteCambioAcreedorPrendarioPropietario/newRna.CambioAcreedorPrendarioPropietario.component'; 
import { NewRnaTransformacionComponent } from './rna/tramiteTransformacion/newRna.transformacion.component';
import { EditComponent } from './edit/edit.component';
import { NewRnaImportacionTemporalComponent } from "./rna/tramiteImportacionTemporal/newRna.importacionTemporal.component";
import { NewRnaProrrogaImportacionTemporalComponent } from "./rna/tramiteProrrogaImportacionTemporal/newRna.prorrogaImportacionTemporal.component";

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
        FroTrteSolicitudRnaComponent,
        NewRnaComponent,
        EditComponent,
        NewRnaDuplicadoPlacaComponent,
        NewRnaDuplicadoLicenciaComponent,
        NewRnaCambioColorComponent,
        NewRnaCambioPlacaComponent,
        NewRnaCambioMotorComponent,
        NewRnaRegrabarMotorComponent,
        NewRnaRematriculaComponent,
        NewRnaCambioServicioComponent,
        NewRnaRegrabarSerieComponent,
        NewRnaRegrabarChasisComponent,
        NewRnaRegrabarVinComponent,
        NewRnaBlindajeComponent,
        NewRnaCancelacionMatriculaComponent,
        NewRnaCertificadoTradicionComponent,
        NewRnaTraspasoComponent,
        NewRnaTraspasoIndeterminadaComponent,
        NewRnaTramiteInscripcionAlertaPrendaComponent,
        NewRnaTramiteLevantamientoAlertaPrendaComponent,
        NewRnaInsumoComponent,
        NewRnaMatricualaInicialComponent,
        NewRnaRadicadoCuentaComponent,
        NewRnaTransformacionComponent,
        NewTrasladoCuentaComponent,
        NewRnaCambioGasComponent,
        NewRnaTramiteCambioAcreedorPrendarioComponent,
        NewRnaTramiteCambioAcreedorPrendarioPropietarioComponent,
        NewRnaImportacionTemporalComponent,
        NewRnaProrrogaImportacionTemporalComponent,
    ],
    exports: [
        FroTrteSolicitudRnaComponent,
        NewRnaComponent,
        EditComponent,
        NewRnaDuplicadoPlacaComponent,
        NewRnaDuplicadoLicenciaComponent,
        NewRnaCambioColorComponent,
        NewRnaCambioPlacaComponent,
        NewRnaCambioMotorComponent,
        NewRnaRegrabarMotorComponent,
        NewRnaRematriculaComponent,
        NewRnaCambioServicioComponent,
        NewRnaRegrabarSerieComponent,
        NewRnaRegrabarChasisComponent,
        NewRnaRegrabarVinComponent,
        NewRnaBlindajeComponent,
        NewRnaCancelacionMatriculaComponent,
        NewRnaCertificadoTradicionComponent,
        NewRnaTraspasoComponent,
        NewRnaTraspasoIndeterminadaComponent,
        NewRnaTramiteInscripcionAlertaPrendaComponent,
        NewRnaTramiteLevantamientoAlertaPrendaComponent,
        NewRnaInsumoComponent,
        NewRnaMatricualaInicialComponent,
        NewRnaRadicadoCuentaComponent,
        NewRnaTransformacionComponent,
        NewTrasladoCuentaComponent,
        NewRnaCambioGasComponent,
        NewRnaTramiteCambioAcreedorPrendarioComponent,
        NewRnaTramiteCambioAcreedorPrendarioPropietarioComponent,
        NewRnaImportacionTemporalComponent,
        NewRnaProrrogaImportacionTemporalComponent,
    ],
    providers: [
        FroTrteSolicitudRnaService, 
        CfgTipoAlertaService, 
        TramiteTrasladoService, 
        VhloAcreedorService,
        FroFacRetefuenteService,
        UserEmpresaService,
        DefaultService
    ]
})

export class FroTrteSolicitudRnaModule { }
