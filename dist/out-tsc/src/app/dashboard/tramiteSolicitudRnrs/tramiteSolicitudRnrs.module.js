"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var tramiteSolicitudRnrs_component_1 = require("./tramiteSolicitudRnrs.component");
var ng2_bootstrap_1 = require("ng2-bootstrap");
var tramiteSolicitud_service_1 = require("../../services/tramiteSolicitud.service");
var empresa_service_1 = require("../../services/empresa.service");
var newRnrs_component_1 = require("./newRnrs/newRnrs.component");
var newRnrs_duplicadoPlaca_component_1 = require("./Rnrs/tramiteDuplicadoPlaca/newRnrs.duplicadoPlaca.component");
var newRnrs_duplicadoLicencia_component_1 = require("./Rnrs/tramiteDuplicadoLicencia/newRnrs.duplicadoLicencia.component");
var newRnrs_cambioColor_component_1 = require("./Rnrs/tramiteCambioColor/newRnrs.cambioColor.component");
var newRnrs_cambioCombustible_component_1 = require("./Rnrs/tramiteCambioCombustible/newRnrs.cambioCombustible.component");
var newRnrs_cambioServicio_component_1 = require("./Rnrs/tramiteCambioServicio/newRnrs.cambioServicio.component");
var newRnrs_cambioCarroceria_component_1 = require("./Rnrs/tramiteCambioCarroceria/newRnrs.cambioCarroceria.component");
var newRnrs_cambioPlaca_component_1 = require("./Rnrs/tramiteCambioPlaca/newRnrs.cambioPlaca.component");
var newRnrs_cambioMotor_component_1 = require("./Rnrs/tramiteCambioMotor/newRnrs.cambioMotor.component");
var newRnrs_regrabarMotor_component_1 = require("./Rnrs/tramiteRegrabarMotor/newRnrs.regrabarMotor.component");
var newRnrs_regrabarSerie_component_1 = require("./Rnrs/tramiteRegrabarSerie/newRnrs.regrabarSerie.component");
var newRnrs_regrabarChasis_component_1 = require("./Rnrs/tramiteRegrabarChasis/newRnrs.regrabarChasis.component");
var newRnrs_regrabarVin_component_1 = require("./Rnrs/tramiteRegrabarVin/newRnrs.regrabarVin.component");
var newRnrs_rematricula_component_1 = require("./Rnrs/tramiteRematricula/newRnrs.rematricula.component");
var newRnrs_cambioSedeOperativa_component_1 = require("./Rnrs/tramiteCambioSedeOperativa/newRnrs.cambioSedeOperativa.component");
var newRnrs_cancelacionMatricula_component_1 = require("./Rnrs/tramiteCancelacionMatricula/newRnrs.cancelacionMatricula.component");
var newRnrs_certificadoTradicion_component_1 = require("./Rnrs/tramiteCertificadoTradicion/newRnrs.certificadoTradicion.component");
var newRnrs_blindaje_component_1 = require("./Rnrs/tramiteBlindaje/newRnrs.blindaje.component");
var newRnrs_preregistro_component_1 = require("./Rnrs/tramitePreregistro/newRnrs.preregistro.component");
var newRnrsCiudadano_component_1 = require("./newRnrsCiudadano/newRnrsCiudadano.component");
var newRnrsSustrato_component_1 = require("./newRnrsSustrato/newRnrsSustrato.component");
var newRnrs_traspaso_component_1 = require("./Rnrs/tramiteTraspaso/newRnrs.traspaso.component");
var newRnrs_matriculaInicial_component_1 = require("./Rnrs/tramiteMatriculaInicial/newRnrs.matriculaInicial.component");
var newRnrs_transformacion_component_1 = require("./Rnrs/tramiteTransformacion/newRnrs.transformacion.component");
var newRnrs_cambioConjunto_component_1 = require("./Rnrs/tramiteCambioConjunto/newRnrs.cambioConjunto.component");
var newRnrs_radicadoCuenta_component_1 = require("./Rnrs/tramiteRadicadoCuenta/newRnrs.radicadoCuenta.component");
var newRnrs_registroMaquinaria_component_1 = require("./Rnrs/tramiteRegistroMaquinaria/newRnrs.registroMaquinaria.component");
var newRnrsTraslado_component_1 = require("./Rnrs/tramiteTraslado/newRnrsTraslado.component");
var tramiteTraslado_service_1 = require("../../services/tramiteTraslado.service");
var newRnrs_traspasoIndeterminada_component_1 = require("./Rnrs/tramiteTraspasoIndeterminada/newRnrs.traspasoIndeterminada.component");
var newRnrs_inscripcionAlertaPrenda_component_1 = require("./rnrs/tramiteInscripcionAlertaPrenda/newRnrs.inscripcionAlertaPrenda.component");
var newRnrs_levantamientoAlertaPrenda_component_1 = require("./rnrs/tramiteLevantamientoAlertaPrenda/newRnrs.levantamientoAlertaPrenda.component");
var edit_component_1 = require("./edit/edit.component");
var angular2_select_1 = require("angular2-select");
var TramiteSolicitudRnrsModule = (function () {
    function TramiteSolicitudRnrsModule() {
    }
    return TramiteSolicitudRnrsModule;
}());
TramiteSolicitudRnrsModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, ng2_bootstrap_1.Ng2BootstrapModule.forRoot(), angular2_select_1.SelectModule],
        declarations: [
            tramiteSolicitudRnrs_component_1.TramiteSolicitudRnrsComponent,
            newRnrs_component_1.NewRnrsComponent,
            edit_component_1.EditComponent,
            newRnrs_duplicadoPlaca_component_1.NewRnrsDuplicadoPlacaComponent,
            newRnrs_duplicadoLicencia_component_1.NewRnrsDuplicadoLicenciaComponent,
            newRnrs_cambioColor_component_1.NewRnrsCambioColorComponent,
            newRnrs_cambioPlaca_component_1.NewRnrsCambioPlacaComponent,
            newRnrs_cambioMotor_component_1.NewRnrsCambioMotorComponent,
            newRnrs_regrabarMotor_component_1.NewRnrsRegrabarMotorComponent,
            newRnrs_rematricula_component_1.NewRnrsRematriculaComponent,
            newRnrs_preregistro_component_1.NewRnrsPreregistroComponent,
            newRnrs_cambioCombustible_component_1.NewRnrsCambioCombustibleComponent,
            newRnrs_cambioCarroceria_component_1.NewRnrsCambioCarroceriaComponent,
            newRnrs_cambioServicio_component_1.NewRnrsCambioServicioComponent,
            newRnrs_regrabarSerie_component_1.NewRnrsRegrabarSerieComponent,
            newRnrs_regrabarChasis_component_1.NewRnrsRegrabarChasisComponent,
            newRnrs_regrabarVin_component_1.NewRnrsRegrabarVinComponent,
            newRnrs_blindaje_component_1.NewRnrsBlindajeComponent,
            newRnrs_cambioSedeOperativa_component_1.NewRnrsCambioSedeOperativaComponent,
            newRnrs_cancelacionMatricula_component_1.NewRnrsCancelacionMatriculaComponent,
            newRnrs_certificadoTradicion_component_1.NewRnrsCertificadoTradicionComponent,
            newRnrs_traspaso_component_1.NewRnrsTraspasoComponent,
            newRnrsCiudadano_component_1.NewRnrsCiudadanoComponent,
            newRnrsSustrato_component_1.NewRnrsSustratoComponent,
            newRnrs_matriculaInicial_component_1.NewRnrsMatricualaInicialComponent,
            newRnrs_transformacion_component_1.NewRnrsTransformacionComponent,
            newRnrs_cambioConjunto_component_1.NewRnrsCambioConjuntoComponent,
            newRnrs_radicadoCuenta_component_1.NewRnrsRadicadoCuentaComponent,
            newRnrs_registroMaquinaria_component_1.NewRnrsRegistroMaquinariaComponent,
            newRnrsTraslado_component_1.NewTrasladoComponent,
            newRnrs_traspasoIndeterminada_component_1.NewRnrsTraspasoIndeterminadaComponent,
            newRnrs_inscripcionAlertaPrenda_component_1.NewRnrsTramiteInscripcionAlertaPrendaComponent,
            newRnrs_levantamientoAlertaPrenda_component_1.NewRnrsTramiteLevantamientoAlertaPrendaComponent
        ],
        exports: [
            tramiteSolicitudRnrs_component_1.TramiteSolicitudRnrsComponent,
            newRnrs_component_1.NewRnrsComponent,
            edit_component_1.EditComponent,
            newRnrs_duplicadoPlaca_component_1.NewRnrsDuplicadoPlacaComponent,
            newRnrs_duplicadoLicencia_component_1.NewRnrsDuplicadoLicenciaComponent,
            newRnrs_cambioColor_component_1.NewRnrsCambioColorComponent,
            newRnrs_cambioPlaca_component_1.NewRnrsCambioPlacaComponent,
            newRnrs_cambioMotor_component_1.NewRnrsCambioMotorComponent,
            newRnrs_regrabarMotor_component_1.NewRnrsRegrabarMotorComponent,
            newRnrs_rematricula_component_1.NewRnrsRematriculaComponent,
            newRnrs_preregistro_component_1.NewRnrsPreregistroComponent,
            newRnrs_cambioCombustible_component_1.NewRnrsCambioCombustibleComponent,
            newRnrs_cambioCarroceria_component_1.NewRnrsCambioCarroceriaComponent,
            newRnrs_cambioCarroceria_component_1.NewRnrsCambioCarroceriaComponent,
            newRnrs_cambioServicio_component_1.NewRnrsCambioServicioComponent,
            newRnrs_regrabarSerie_component_1.NewRnrsRegrabarSerieComponent,
            newRnrs_regrabarChasis_component_1.NewRnrsRegrabarChasisComponent,
            newRnrs_regrabarVin_component_1.NewRnrsRegrabarVinComponent,
            newRnrs_blindaje_component_1.NewRnrsBlindajeComponent,
            newRnrs_cambioSedeOperativa_component_1.NewRnrsCambioSedeOperativaComponent,
            newRnrs_cancelacionMatricula_component_1.NewRnrsCancelacionMatriculaComponent,
            newRnrs_certificadoTradicion_component_1.NewRnrsCertificadoTradicionComponent,
            newRnrs_traspaso_component_1.NewRnrsTraspasoComponent,
            newRnrsCiudadano_component_1.NewRnrsCiudadanoComponent,
            newRnrsSustrato_component_1.NewRnrsSustratoComponent,
            newRnrs_matriculaInicial_component_1.NewRnrsMatricualaInicialComponent,
            newRnrs_transformacion_component_1.NewRnrsTransformacionComponent,
            newRnrs_cambioConjunto_component_1.NewRnrsCambioConjuntoComponent,
            newRnrs_radicadoCuenta_component_1.NewRnrsRadicadoCuentaComponent,
            newRnrs_registroMaquinaria_component_1.NewRnrsRegistroMaquinariaComponent,
            newRnrsTraslado_component_1.NewTrasladoComponent,
            newRnrs_traspasoIndeterminada_component_1.NewRnrsTraspasoIndeterminadaComponent,
            newRnrs_inscripcionAlertaPrenda_component_1.NewRnrsTramiteInscripcionAlertaPrendaComponent,
            newRnrs_levantamientoAlertaPrenda_component_1.NewRnrsTramiteLevantamientoAlertaPrendaComponent
        ],
        providers: [tramiteSolicitud_service_1.TramiteSolicitudService, empresa_service_1.EmpresaService, tramiteTraslado_service_1.TramiteTrasladoService]
    })
], TramiteSolicitudRnrsModule);
exports.TramiteSolicitudRnrsModule = TramiteSolicitudRnrsModule;
//# sourceMappingURL=tramiteSolicitudRnrs.module.js.map