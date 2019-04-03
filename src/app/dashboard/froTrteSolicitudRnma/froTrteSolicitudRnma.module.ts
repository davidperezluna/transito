import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TramiteTrasladoService } from '../../services/tramiteTraslado.service';
import { FacturaInsumoService } from '../../services/facturaInsumo.service';
import { FroTrteSolicitudRnaService } from '../../services/froTrteSolicitudRna.service';
import { FroTrteSolicitudRnmaComponent } from './froTrteSolicitudRnma.component';
import { UserEmpresaService } from '../../services/userEmpresa.service';
import { DefaultService } from '../../services/default.service';
import { CfgTipoAlertaService } from '../../services/cfgTipoAlerta.service';
import { VhloAcreedorService } from '../../services/vhloAcreedor.service';
import { NewRnmaComponent } from './newRnma/newRnma.component'; 
import { NewRnmaDuplicadoPlacaComponent } from './rnma/tramiteDuplicadoPlaca/newRnma.duplicadoPlaca.component';
import { NewRnmaDuplicadoLicenciaComponent } from './rnma/tramiteDuplicadoLicencia/newRnma.duplicadoLicencia.component';
import { NewRnmaCambioColorComponent } from './rnma/tramiteCambioColor/newRnma.cambioColor.component';
import { NewRnmaCambioServicioComponent } from './rnma/tramiteCambioServicio/newRnma.cambioServicio.component';
import { NewRnmaCambioPlacaComponent } from './rnma/tramiteCambioPlaca/newRnma.cambioPlaca.component';
import { NewRnmaCambioMotorComponent } from './rnma/tramiteCambioMotor/newRnma.cambioMotor.component';
import { NewRnmaRegrabarMotorComponent } from './rnma/tramiteRegrabarMotor/newRnma.regrabarMotor.component';
import { NewRnmaRegrabarSerieComponent } from './rnma/tramiteRegrabarSerie/newRnma.regrabarSerie.component';
import { NewRnmaRegrabarChasisComponent } from './rnma/tramiteRegrabarChasis/newRnma.regrabarChasis.component';
import { NewRnmaRegrabarVinComponent } from './rnma/tramiteRegrabarVin/newRnma.regrabarVin.component'; 
import { NewRnmaRematriculaComponent } from './rnma/tramiteRematricula/newRnma.rematricula.component';
import { NewRnmaCancelacionMatriculaComponent } from './rnma/tramiteCancelacionMatricula/newRnma.CancelacionMatricula.component';
import { NewRnmaCertificadoTradicionComponent } from './rnma/tramiteCertificadoTradicion/newRnma.CertificadoTradicion.component';
import { NewRnmaBlindajeComponent } from './rnma/tramiteBlindaje/newRnma.Blindaje.component';
import { NewRnmaCiudadanoComponent } from './newRnmaCiudadano/newRnmaCiudadano.component';
import { NewRnmaAcreedorComponent } from './newRnmaAcreedor/newRnmaAcreedor.component';
import { NewRnmaInsumoComponent } from './newRnmaSustrato/newRnmaSustrato.component';
import { NewRnmaTraspasoComponent } from './rnma/tramiteTraspaso/newRnma.traspaso.component';
import { NewRnmaTraspasoIndeterminadaComponent } from './rnma/tramiteTraspasoIndeterminada/newRnma.traspasoIndeterminada.component';
import { NewTrasladoCuentaComponent } from './rnma/tramiteTrasladoCuenta/newTrasladoCuenta.component';
import { NewRnmaTramiteInscripcionAlertaPrendaComponent } from './rnma/tramiteInscripcionAlertaPrenda/newRnma.inscripcionAlertaPrenda.component';
import { NewRnmaTramiteLevantamientoAlertaPrendaComponent } from './rnma/tramiteLevantamientoAlertaPrenda/newRnma.levantamientoAlertaPrenda.component';
import { NewRnmaMatricualaInicialComponent } from './rnma/tramiteMatriculaInicial/newRnma.matriculaInicial.component';
import { NewRnmaRadicadoCuentaComponent } from './rnma/tramiteRadicadoCuenta/newRnma.radicadoCuenta.component'; 
import { NewRnmaCambioGasComponent } from './rnma/tramiteCambioGas/newRnma.cambioGas.component'; 
import { NewRnmaTramiteCambioAcreedorPrendarioComponent } from './rnma/tramiteCambioAcreedorPrendario/newRnma.CambioAcreedorPrendario.component'; 
import { NewRnmaTramiteCambioAcreedorPrendarioPropietarioComponent } from './rnma/tramiteCambioAcreedorPrendarioPropietario/newRnma.CambioAcreedorPrendarioPropietario.component'; 
import { NewRnmaTransformacionComponent } from './rnma/tramiteTransformacion/newRnma.transformacion.component';
import { EditComponent } from './edit/edit.component';
import { NewRnmaImportacionTemporalComponent } from "./rnma/tramiteImportacionTemporal/newRnma.importacionTemporal.component";
import { NewRnmaProrrogaImportacionTemporalComponent } from "./rnma/tramiteProrrogaImportacionTemporal/newRnma.prorrogaImportacionTemporal.component";
import { SelectModule } from 'angular2-select';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { TooltipModule, Tooltip } from "ngx-tooltip";

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule, TooltipModule],
    declarations: [
        FroTrteSolicitudRnmaComponent,
        NewRnmaComponent,
        EditComponent,
        NewRnmaDuplicadoPlacaComponent,
        NewRnmaDuplicadoLicenciaComponent,
        NewRnmaCambioColorComponent,
        NewRnmaCambioPlacaComponent,
        NewRnmaCambioMotorComponent,
        NewRnmaRegrabarMotorComponent,
        NewRnmaRematriculaComponent,
        NewRnmaCambioServicioComponent,
        NewRnmaRegrabarSerieComponent,
        NewRnmaRegrabarChasisComponent,
        NewRnmaRegrabarVinComponent,
        NewRnmaBlindajeComponent,
        NewRnmaCancelacionMatriculaComponent,
        NewRnmaCertificadoTradicionComponent,
        NewRnmaTraspasoComponent,
        NewRnmaTraspasoIndeterminadaComponent,
        NewRnmaTramiteInscripcionAlertaPrendaComponent,
        NewRnmaTramiteLevantamientoAlertaPrendaComponent,
        NewRnmaCiudadanoComponent,
        NewRnmaAcreedorComponent,
        NewRnmaInsumoComponent,
        NewRnmaMatricualaInicialComponent,
        NewRnmaRadicadoCuentaComponent,
        NewRnmaTransformacionComponent,
        NewTrasladoCuentaComponent,
        NewRnmaCambioGasComponent,
        NewRnmaTramiteCambioAcreedorPrendarioComponent,
        NewRnmaTramiteCambioAcreedorPrendarioPropietarioComponent,
        NewRnmaImportacionTemporalComponent,
        NewRnmaProrrogaImportacionTemporalComponent,
    ],
    exports: [
        FroTrteSolicitudRnmaComponent,
        NewRnmaComponent,
        EditComponent,
        NewRnmaDuplicadoPlacaComponent,
        NewRnmaDuplicadoLicenciaComponent,
        NewRnmaCambioColorComponent,
        NewRnmaCambioPlacaComponent,
        NewRnmaCambioMotorComponent,
        NewRnmaRegrabarMotorComponent,
        NewRnmaRematriculaComponent,
        NewRnmaCambioServicioComponent,
        NewRnmaRegrabarSerieComponent,
        NewRnmaRegrabarChasisComponent,
        NewRnmaRegrabarVinComponent,
        NewRnmaBlindajeComponent,
        NewRnmaCancelacionMatriculaComponent,
        NewRnmaCertificadoTradicionComponent,
        NewRnmaTraspasoComponent,
        NewRnmaTraspasoIndeterminadaComponent,
        NewRnmaTramiteInscripcionAlertaPrendaComponent,
        NewRnmaTramiteLevantamientoAlertaPrendaComponent,
        NewRnmaCiudadanoComponent,
        NewRnmaAcreedorComponent,
        NewRnmaInsumoComponent,
        NewRnmaMatricualaInicialComponent,
        NewRnmaRadicadoCuentaComponent,
        NewRnmaTransformacionComponent,
        NewTrasladoCuentaComponent,
        NewRnmaCambioGasComponent,
        NewRnmaTramiteCambioAcreedorPrendarioComponent,
        NewRnmaTramiteCambioAcreedorPrendarioPropietarioComponent,
        NewRnmaImportacionTemporalComponent,
        NewRnmaProrrogaImportacionTemporalComponent,
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

export class FroTrteSolicitudRnmaModule { }
