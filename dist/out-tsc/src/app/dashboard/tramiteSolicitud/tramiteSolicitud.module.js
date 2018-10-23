"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var tramiteSolicitud_component_1 = require("./tramiteSolicitud.component");
var ng2_bootstrap_1 = require("ng2-bootstrap");
var tramiteSolicitud_service_1 = require("../../services/tramiteSolicitud.service");
var empresa_service_1 = require("../../services/empresa.service");
var default_service_1 = require("../../services/default.service");
var cfgTipoAlerta_service_1 = require("../../services/cfgTipoAlerta.service");
var vehiculoAcreedor_service_1 = require("../../services/vehiculoAcreedor.service");
var newRna_component_1 = require("./newRna/newRna.component");
var newRna_duplicadoPlaca_component_1 = require("./rna/tramiteDuplicadoPlaca/newRna.duplicadoPlaca.component");
var newRna_duplicadoLicencia_component_1 = require("./rna/tramiteDuplicadoLicencia/newRna.duplicadoLicencia.component");
var newRna_cambioColor_component_1 = require("./rna/tramiteCambioColor/newRna.cambioColor.component");
var newRna_cambioCombustible_component_1 = require("./rna/tramiteCambioCombustible/newRna.cambioCombustible.component");
var newRna_cambioServicio_component_1 = require("./rna/tramiteCambioServicio/newRna.cambioServicio.component");
var newRna_cambioCarroceria_component_1 = require("./rna/tramiteCambioCarroceria/newRna.cambioCarroceria.component");
var newRna_cambioPlaca_component_1 = require("./rna/tramiteCambioPlaca/newRna.cambioPlaca.component");
var newRna_cambioMotor_component_1 = require("./rna/tramiteCambioMotor/newRna.cambioMotor.component");
var newRna_regrabarMotor_component_1 = require("./rna/tramiteRegrabarMotor/newRna.regrabarMotor.component");
var newRna_regrabarSerie_component_1 = require("./rna/tramiteRegrabarSerie/newRna.regrabarSerie.component");
var newRna_regrabarChasis_component_1 = require("./rna/tramiteRegrabarChasis/newRna.regrabarChasis.component");
var newRna_regrabarVin_component_1 = require("./rna/tramiteRegrabarVin/newRna.regrabarVin.component");
var newRna_rematricula_component_1 = require("./rna/tramiteRematricula/newRna.rematricula.component");
var newRna_cambioSedeOperativa_component_1 = require("./rna/tramiteCambioSedeOperativa/newRna.cambioSedeOperativa.component");
var newRna_cancelacionMatricula_component_1 = require("./rna/tramiteCancelacionMatricula/newRna.cancelacionMatricula.component");
var newRna_certificadoTradicion_component_1 = require("./rna/tramiteCertificadoTradicion/newRna.certificadoTradicion.component");
var newRna_blindaje_component_1 = require("./rna/tramiteBlindaje/newRna.blindaje.component");
var newRna_preregistro_component_1 = require("./rna/tramitePreregistro/newRna.preregistro.component");
var newRnaCiudadano_component_1 = require("./newRnaCiudadano/newRnaCiudadano.component");
var newRnaAcreedor_component_1 = require("./newRnaAcreedor/newRnaAcreedor.component");
var newRnaSustrato_component_1 = require("./newRnaSustrato/newRnaSustrato.component");
var newRna_traspaso_component_1 = require("./rna/tramiteTraspaso/newRna.traspaso.component");
var newRna_traspasoIndeterminada_component_1 = require("./rna/tramiteTraspasoIndeterminada/newRna.traspasoIndeterminada.component");
var newTraslado_component_1 = require("./rna/tramiteTraslado/newTraslado.component");
var newRna_inscripcionAlertaPrenda_component_1 = require("./rna/tramiteInscripcionAlertaPrenda/newRna.inscripcionAlertaPrenda.component");
var newRna_levantamientoAlertaPrenda_component_1 = require("./rna/tramiteLevantamientoAlertaPrenda/newRna.levantamientoAlertaPrenda.component");
var newRna_matriculaInicial_component_1 = require("./rna/tramiteMatriculaInicial/newRna.matriculaInicial.component");
var newRna_radicadoCuenta_component_1 = require("./rna/tramiteRadicadoCuenta/newRna.radicadoCuenta.component");
var newRna_cambioGas_component_1 = require("./rna/tramiteCambioGas/newRna.cambioGas.component");
var newRna_CambioAcreedorPrendario_component_1 = require("./rna/tramiteCambioAcreedorPrendario/newRna.CambioAcreedorPrendario.component");
var newRna_transformacion_component_1 = require("./rna/tramiteTransformacion/newRna.transformacion.component");
var newRna_cambioConjunto_component_1 = require("./rna/tramiteCambioConjunto/newRna.cambioConjunto.component");
var edit_component_1 = require("./edit/edit.component");
var angular2_select_1 = require("angular2-select");
var tramiteTraslado_service_1 = require("../../services/tramiteTraslado.service");
var facturaInsumo_service_1 = require("../../services/facturaInsumo.service");
var TramiteSolicitudModule = (function () {
    function TramiteSolicitudModule() {
    }
    return TramiteSolicitudModule;
}());
TramiteSolicitudModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, ng2_bootstrap_1.Ng2BootstrapModule.forRoot(), angular2_select_1.SelectModule],
        declarations: [
            tramiteSolicitud_component_1.TramiteSolicitudComponent,
            newRna_component_1.NewRnaComponent,
            edit_component_1.EditComponent,
            newRna_duplicadoPlaca_component_1.NewRnaDuplicadoPlacaComponent,
            newRna_duplicadoLicencia_component_1.NewRnaDuplicadoLicenciaComponent,
            newRna_cambioColor_component_1.NewRnaCambioColorComponent,
            newRna_cambioPlaca_component_1.NewRnaCambioPlacaComponent,
            newRna_cambioMotor_component_1.NewRnaCambioMotorComponent,
            newRna_regrabarMotor_component_1.NewRnaRegrabarMotorComponent,
            newRna_rematricula_component_1.NewRnaRematriculaComponent,
            newRna_preregistro_component_1.NewRnaPreregistroComponent,
            newRna_cambioCombustible_component_1.NewRnaCambioCombustibleComponent,
            newRna_cambioCarroceria_component_1.NewRnaCambioCarroceriaComponent,
            newRna_cambioServicio_component_1.NewRnaCambioServicioComponent,
            newRna_regrabarSerie_component_1.NewRnaRegrabarSerieComponent,
            newRna_regrabarChasis_component_1.NewRnaRegrabarChasisComponent,
            newRna_regrabarVin_component_1.NewRnaRegrabarVinComponent,
            newRna_blindaje_component_1.NewRnaBlindajeComponent,
            newRna_cambioSedeOperativa_component_1.NewRnaCambioSedeOperativaComponent,
            newRna_cancelacionMatricula_component_1.NewRnaCancelacionMatriculaComponent,
            newRna_certificadoTradicion_component_1.NewRnaCertificadoTradicionComponent,
            newRna_traspaso_component_1.NewRnaTraspasoComponent,
            newRna_traspasoIndeterminada_component_1.NewRnaTraspasoIndeterminadaComponent,
            newRna_inscripcionAlertaPrenda_component_1.NewRnaTramiteInscripcionAlertaPrendaComponent,
            newRna_levantamientoAlertaPrenda_component_1.NewRnaTramiteLevantamientoAlertaPrendaComponent,
            newRnaCiudadano_component_1.NewRnaCiudadanoComponent,
            newRnaAcreedor_component_1.NewRnaAcreedorComponent,
            newRnaSustrato_component_1.NewRnaInsumoComponent,
            newRna_matriculaInicial_component_1.NewRnaMatricualaInicialComponent,
            newRna_radicadoCuenta_component_1.NewRnaRadicadoCuentaComponent,
            newRna_transformacion_component_1.NewRnaTransformacionComponent,
            newRna_cambioConjunto_component_1.NewRnaCambioConjuntoComponent,
            newTraslado_component_1.NewTrasladoComponent,
            newRna_cambioGas_component_1.NewRnaCambioGasComponent,
            newRna_CambioAcreedorPrendario_component_1.NewRnaTramiteCambioAcreedorPrendarioComponent,
        ],
        exports: [
            tramiteSolicitud_component_1.TramiteSolicitudComponent,
            newRna_component_1.NewRnaComponent,
            edit_component_1.EditComponent,
            newRna_duplicadoPlaca_component_1.NewRnaDuplicadoPlacaComponent,
            newRna_duplicadoLicencia_component_1.NewRnaDuplicadoLicenciaComponent,
            newRna_cambioColor_component_1.NewRnaCambioColorComponent,
            newRna_cambioPlaca_component_1.NewRnaCambioPlacaComponent,
            newRna_cambioMotor_component_1.NewRnaCambioMotorComponent,
            newRna_regrabarMotor_component_1.NewRnaRegrabarMotorComponent,
            newRna_rematricula_component_1.NewRnaRematriculaComponent,
            newRna_preregistro_component_1.NewRnaPreregistroComponent,
            newRna_cambioCombustible_component_1.NewRnaCambioCombustibleComponent,
            newRna_cambioCarroceria_component_1.NewRnaCambioCarroceriaComponent,
            newRna_cambioCarroceria_component_1.NewRnaCambioCarroceriaComponent,
            newRna_cambioServicio_component_1.NewRnaCambioServicioComponent,
            newRna_regrabarSerie_component_1.NewRnaRegrabarSerieComponent,
            newRna_regrabarChasis_component_1.NewRnaRegrabarChasisComponent,
            newRna_regrabarVin_component_1.NewRnaRegrabarVinComponent,
            newRna_blindaje_component_1.NewRnaBlindajeComponent,
            newRna_cambioSedeOperativa_component_1.NewRnaCambioSedeOperativaComponent,
            newRna_cancelacionMatricula_component_1.NewRnaCancelacionMatriculaComponent,
            newRna_certificadoTradicion_component_1.NewRnaCertificadoTradicionComponent,
            newRna_traspaso_component_1.NewRnaTraspasoComponent,
            newRna_traspasoIndeterminada_component_1.NewRnaTraspasoIndeterminadaComponent,
            newRna_inscripcionAlertaPrenda_component_1.NewRnaTramiteInscripcionAlertaPrendaComponent,
            newRna_levantamientoAlertaPrenda_component_1.NewRnaTramiteLevantamientoAlertaPrendaComponent,
            newRnaCiudadano_component_1.NewRnaCiudadanoComponent,
            newRnaAcreedor_component_1.NewRnaAcreedorComponent,
            newRnaSustrato_component_1.NewRnaInsumoComponent,
            newRna_matriculaInicial_component_1.NewRnaMatricualaInicialComponent,
            newRna_radicadoCuenta_component_1.NewRnaRadicadoCuentaComponent,
            newRna_transformacion_component_1.NewRnaTransformacionComponent,
            newRna_cambioConjunto_component_1.NewRnaCambioConjuntoComponent,
            newTraslado_component_1.NewTrasladoComponent,
            newRna_cambioGas_component_1.NewRnaCambioGasComponent,
            newRna_CambioAcreedorPrendario_component_1.NewRnaTramiteCambioAcreedorPrendarioComponent,
        ],
        providers: [facturaInsumo_service_1.FacturaInsumoService, tramiteSolicitud_service_1.TramiteSolicitudService, cfgTipoAlerta_service_1.CfgTipoAlertaService, tramiteTraslado_service_1.TramiteTrasladoService, vehiculoAcreedor_service_1.VehiculoAcreedorService, empresa_service_1.EmpresaService, default_service_1.DefaultService]
    })
], TramiteSolicitudModule);
exports.TramiteSolicitudModule = TramiteSolicitudModule;
//# sourceMappingURL=tramiteSolicitud.module.js.map