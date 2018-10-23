"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var tramiteSolicitudRnc_component_1 = require("./tramiteSolicitudRnc.component");
var ng2_bootstrap_1 = require("ng2-bootstrap");
var tramiteSolicitudRnc_service_1 = require("../../services/tramiteSolicitudRnc.service");
var newRncSustrato_component_1 = require("./newRncSustrato/newRncSustrato.component");
var newRncCiudadano_component_1 = require("./newRncCiudadano/newRncCiudadano.component");
var newRncExpedicionLicencia_component_1 = require("./rnc/tramiteExpedicionLicencia/newRncExpedicionLicencia.component");
var newRncDuplicadoLicencia_component_1 = require("./rnc/tramiteDuplicadoLicencia/newRncDuplicadoLicencia.component");
var newRncExpedicionLicenciaCambioDocumento_component_1 = require("./rnc/tramiteExpedicionLicenciaCambioDocumento/newRncExpedicionLicenciaCambioDocumento.component");
var newRncRecategorizacionLicenciaAbajo_component_1 = require("./rnc/tramiteRecategorizacionLicenciaAbajo/newRncRecategorizacionLicenciaAbajo.component");
var newRncRecategorizacionLicenciaArriba_component_1 = require("./rnc/tramiteRecategorizacionLicenciaArriba/newRncRecategorizacionLicenciaArriba.component");
var newRncRefrendacionLicencia_component_1 = require("./rnc/tramiteRefrendacionLicencia/newRncRefrendacionLicencia.component");
var newRnc_component_1 = require("./newRnc/newRnc.component");
var edit_component_1 = require("./edit/edit.component");
var angular2_select_1 = require("angular2-select");
var TramiteSolicitudRncModule = (function () {
    function TramiteSolicitudRncModule() {
    }
    return TramiteSolicitudRncModule;
}());
TramiteSolicitudRncModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, ng2_bootstrap_1.Ng2BootstrapModule.forRoot(), angular2_select_1.SelectModule],
        declarations: [
            tramiteSolicitudRnc_component_1.TramiteSolicitudRncComponent,
            newRnc_component_1.NewRncComponent,
            edit_component_1.EditComponent,
            newRncSustrato_component_1.NewRncSustratoComponent,
            newRncCiudadano_component_1.NewRncCiudadanoComponent,
            newRncExpedicionLicencia_component_1.NewRncExpedicionLicenciaComponent,
            newRncDuplicadoLicencia_component_1.NewRncDuplicadoLicenciaComponent,
            newRncExpedicionLicenciaCambioDocumento_component_1.NewRncExpedicionLicenciaCambioDocumentoComponent,
            newRncRecategorizacionLicenciaAbajo_component_1.NewRncRecategorizacionLicenciaAbajoComponent,
            newRncRecategorizacionLicenciaArriba_component_1.NewRncRecategorizacionLicenciaArribaComponent,
            newRncRefrendacionLicencia_component_1.NewRncRefrendacionLicenciaComponent
        ],
        exports: [
            tramiteSolicitudRnc_component_1.TramiteSolicitudRncComponent,
            newRnc_component_1.NewRncComponent,
            edit_component_1.EditComponent,
            newRncSustrato_component_1.NewRncSustratoComponent,
            newRncCiudadano_component_1.NewRncCiudadanoComponent,
            newRncExpedicionLicencia_component_1.NewRncExpedicionLicenciaComponent,
            newRncDuplicadoLicencia_component_1.NewRncDuplicadoLicenciaComponent,
            newRncExpedicionLicenciaCambioDocumento_component_1.NewRncExpedicionLicenciaCambioDocumentoComponent,
            newRncRecategorizacionLicenciaAbajo_component_1.NewRncRecategorizacionLicenciaAbajoComponent,
            newRncRecategorizacionLicenciaArriba_component_1.NewRncRecategorizacionLicenciaArribaComponent,
            newRncRefrendacionLicencia_component_1.NewRncRefrendacionLicenciaComponent
        ],
        providers: [tramiteSolicitudRnc_service_1.TramiteSolicitudRncService]
    })
], TramiteSolicitudRncModule);
exports.TramiteSolicitudRncModule = TramiteSolicitudRncModule;
//# sourceMappingURL=tramiteSolicitudRnc.module.js.map