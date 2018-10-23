"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var tramiteSolicitudRnma_component_1 = require("./tramiteSolicitudRnma.component");
var ng2_bootstrap_1 = require("ng2-bootstrap");
var tramiteSolicitud_service_1 = require("../../services/tramiteSolicitud.service");
var empresa_service_1 = require("../../services/empresa.service");
var newRnma_component_1 = require("./newRnma/newRnma.component");
var newRnma_duplicadoPlaca_component_1 = require("./Rnma/tramiteDuplicadoPlaca/newRnma.duplicadoPlaca.component");
var newRnma_duplicadoLicencia_component_1 = require("./Rnma/tramiteDuplicadoLicencia/newRnma.duplicadoLicencia.component");
var newRnma_cambioColor_component_1 = require("./Rnma/tramiteCambioColor/newRnma.cambioColor.component");
var newRnma_cambioCombustible_component_1 = require("./Rnma/tramiteCambioCombustible/newRnma.cambioCombustible.component");
var newRnma_cambioServicio_component_1 = require("./Rnma/tramiteCambioServicio/newRnma.cambioServicio.component");
var newRnma_cambioCarroceria_component_1 = require("./Rnma/tramiteCambioCarroceria/newRnma.cambioCarroceria.component");
var newRnma_cambioPlaca_component_1 = require("./Rnma/tramiteCambioPlaca/newRnma.cambioPlaca.component");
var newRnma_cambioMotor_component_1 = require("./Rnma/tramiteCambioMotor/newRnma.cambioMotor.component");
var newRnma_regrabarMotor_component_1 = require("./Rnma/tramiteRegrabarMotor/newRnma.regrabarMotor.component");
var newRnma_regrabarSerie_component_1 = require("./Rnma/tramiteRegrabarSerie/newRnma.regrabarSerie.component");
var newRnma_regrabarChasis_component_1 = require("./Rnma/tramiteRegrabarChasis/newRnma.regrabarChasis.component");
var newRnma_regrabarVin_component_1 = require("./Rnma/tramiteRegrabarVin/newRnma.regrabarVin.component");
var newRnma_rematricula_component_1 = require("./Rnma/tramiteRematricula/newRnma.rematricula.component");
var newRnma_cambioSedeOperativa_component_1 = require("./Rnma/tramiteCambioSedeOperativa/newRnma.cambioSedeOperativa.component");
var newRnma_cancelacionMatricula_component_1 = require("./Rnma/tramiteCancelacionMatricula/newRnma.cancelacionMatricula.component");
var newRnma_certificadoTradicion_component_1 = require("./Rnma/tramiteCertificadoTradicion/newRnma.certificadoTradicion.component");
var newRnma_blindaje_component_1 = require("./Rnma/tramiteBlindaje/newRnma.blindaje.component");
var newRnma_preregistro_component_1 = require("./Rnma/tramitePreregistro/newRnma.preregistro.component");
var newRnmaCiudadano_component_1 = require("./newRnmaCiudadano/newRnmaCiudadano.component");
var newRnmaSustrato_component_1 = require("./newRnmaSustrato/newRnmaSustrato.component");
var newRnma_traspaso_component_1 = require("./Rnma/tramiteTraspaso/newRnma.traspaso.component");
var newRnma_matriculaInicial_component_1 = require("./Rnma/tramiteMatriculaInicial/newRnma.matriculaInicial.component");
var newRnma_transformacion_component_1 = require("./Rnma/tramiteTransformacion/newRnma.transformacion.component");
var newRnma_cambioConjunto_component_1 = require("./Rnma/tramiteCambioConjunto/newRnma.cambioConjunto.component");
var newRnma_radicadoCuenta_component_1 = require("./Rnma/tramiteRadicadoCuenta/newRnma.radicadoCuenta.component");
var newRnma_registroMaquinaria_component_1 = require("./Rnma/tramiteRegistroMaquinaria/newRnma.registroMaquinaria.component");
var newTraslado_component_1 = require("./rnma/tramiteTraslado/newTraslado.component");
var tramiteTraslado_service_1 = require("../../services/tramiteTraslado.service");
var newRnma_traspasoIndeterminada_component_1 = require("./rnma/tramiteTraspasoIndeterminada/newRnma.traspasoIndeterminada.component");
var newRnma_inscripcionAlertaPrenda_component_1 = require("./rnma/tramiteInscripcionAlertaPrenda/newRnma.inscripcionAlertaPrenda.component");
var newRnma_levantamientoAlertaPrenda_component_1 = require("./rnma/tramiteLevantamientoAlertaPrenda/newRnma.levantamientoAlertaPrenda.component");
var edit_component_1 = require("./edit/edit.component");
var angular2_select_1 = require("angular2-select");
var TramiteSolicitudRnmaModule = (function () {
    function TramiteSolicitudRnmaModule() {
    }
    return TramiteSolicitudRnmaModule;
}());
TramiteSolicitudRnmaModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, ng2_bootstrap_1.Ng2BootstrapModule.forRoot(), angular2_select_1.SelectModule],
        declarations: [
            tramiteSolicitudRnma_component_1.TramiteSolicitudRnmaComponent,
            newRnma_component_1.NewRnmaComponent,
            edit_component_1.EditComponent,
            newRnma_duplicadoPlaca_component_1.NewRnmaDuplicadoPlacaComponent,
            newRnma_duplicadoLicencia_component_1.NewRnmaDuplicadoLicenciaComponent,
            newRnma_cambioColor_component_1.NewRnmaCambioColorComponent,
            newRnma_cambioPlaca_component_1.NewRnmaCambioPlacaComponent,
            newRnma_cambioMotor_component_1.NewRnmaCambioMotorComponent,
            newRnma_regrabarMotor_component_1.NewRnmaRegrabarMotorComponent,
            newRnma_rematricula_component_1.NewRnmaRematriculaComponent,
            newRnma_preregistro_component_1.NewRnmaPreregistroComponent,
            newRnma_cambioCombustible_component_1.NewRnmaCambioCombustibleComponent,
            newRnma_cambioCarroceria_component_1.NewRnmaCambioCarroceriaComponent,
            newRnma_cambioServicio_component_1.NewRnmaCambioServicioComponent,
            newRnma_regrabarSerie_component_1.NewRnmaRegrabarSerieComponent,
            newRnma_regrabarChasis_component_1.NewRnmaRegrabarChasisComponent,
            newRnma_regrabarVin_component_1.NewRnmaRegrabarVinComponent,
            newRnma_blindaje_component_1.NewRnmaBlindajeComponent,
            newRnma_cambioSedeOperativa_component_1.NewRnmaCambioSedeOperativaComponent,
            newRnma_cancelacionMatricula_component_1.NewRnmaCancelacionMatriculaComponent,
            newRnma_certificadoTradicion_component_1.NewRnmaCertificadoTradicionComponent,
            newRnma_traspaso_component_1.NewRnmaTraspasoComponent,
            newRnmaCiudadano_component_1.NewRnmaCiudadanoComponent,
            newRnmaSustrato_component_1.NewRnmaSustratoComponent,
            newRnma_matriculaInicial_component_1.NewRnmaMatricualaInicialComponent,
            newRnma_transformacion_component_1.NewRnmaTransformacionComponent,
            newRnma_cambioConjunto_component_1.NewRnmaCambioConjuntoComponent,
            newRnma_radicadoCuenta_component_1.NewRnmaRadicadoCuentaComponent,
            newRnma_registroMaquinaria_component_1.NewRnmaRegistroMaquinariaComponent,
            newTraslado_component_1.NewTrasladoComponent,
            newRnma_traspasoIndeterminada_component_1.NewRnmaTraspasoIndeterminadaComponent,
            newRnma_inscripcionAlertaPrenda_component_1.NewRnmaTramiteInscripcionAlertaPrendaComponent,
            newRnma_levantamientoAlertaPrenda_component_1.NewRnmaTramiteLevantamientoAlertaPrendaComponent
        ],
        exports: [
            tramiteSolicitudRnma_component_1.TramiteSolicitudRnmaComponent,
            newRnma_component_1.NewRnmaComponent,
            edit_component_1.EditComponent,
            newRnma_duplicadoPlaca_component_1.NewRnmaDuplicadoPlacaComponent,
            newRnma_duplicadoLicencia_component_1.NewRnmaDuplicadoLicenciaComponent,
            newRnma_cambioColor_component_1.NewRnmaCambioColorComponent,
            newRnma_cambioPlaca_component_1.NewRnmaCambioPlacaComponent,
            newRnma_cambioMotor_component_1.NewRnmaCambioMotorComponent,
            newRnma_regrabarMotor_component_1.NewRnmaRegrabarMotorComponent,
            newRnma_rematricula_component_1.NewRnmaRematriculaComponent,
            newRnma_preregistro_component_1.NewRnmaPreregistroComponent,
            newRnma_cambioCombustible_component_1.NewRnmaCambioCombustibleComponent,
            newRnma_cambioCarroceria_component_1.NewRnmaCambioCarroceriaComponent,
            newRnma_cambioCarroceria_component_1.NewRnmaCambioCarroceriaComponent,
            newRnma_cambioServicio_component_1.NewRnmaCambioServicioComponent,
            newRnma_regrabarSerie_component_1.NewRnmaRegrabarSerieComponent,
            newRnma_regrabarChasis_component_1.NewRnmaRegrabarChasisComponent,
            newRnma_regrabarVin_component_1.NewRnmaRegrabarVinComponent,
            newRnma_blindaje_component_1.NewRnmaBlindajeComponent,
            newRnma_cambioSedeOperativa_component_1.NewRnmaCambioSedeOperativaComponent,
            newRnma_cancelacionMatricula_component_1.NewRnmaCancelacionMatriculaComponent,
            newRnma_certificadoTradicion_component_1.NewRnmaCertificadoTradicionComponent,
            newRnma_traspaso_component_1.NewRnmaTraspasoComponent,
            newRnmaCiudadano_component_1.NewRnmaCiudadanoComponent,
            newRnmaSustrato_component_1.NewRnmaSustratoComponent,
            newRnma_matriculaInicial_component_1.NewRnmaMatricualaInicialComponent,
            newRnma_transformacion_component_1.NewRnmaTransformacionComponent,
            newRnma_cambioConjunto_component_1.NewRnmaCambioConjuntoComponent,
            newRnma_radicadoCuenta_component_1.NewRnmaRadicadoCuentaComponent,
            newRnma_registroMaquinaria_component_1.NewRnmaRegistroMaquinariaComponent,
            newTraslado_component_1.NewTrasladoComponent,
            newRnma_traspasoIndeterminada_component_1.NewRnmaTraspasoIndeterminadaComponent,
            newRnma_inscripcionAlertaPrenda_component_1.NewRnmaTramiteInscripcionAlertaPrendaComponent,
            newRnma_levantamientoAlertaPrenda_component_1.NewRnmaTramiteLevantamientoAlertaPrendaComponent
        ],
        providers: [tramiteSolicitud_service_1.TramiteSolicitudService, empresa_service_1.EmpresaService, tramiteTraslado_service_1.TramiteTrasladoService]
    })
], TramiteSolicitudRnmaModule);
exports.TramiteSolicitudRnmaModule = TramiteSolicitudRnmaModule;
//# sourceMappingURL=tramiteSolicitudRnma.module.js.map