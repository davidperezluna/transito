"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var tramiteSolicitudRpccc_component_1 = require("./tramiteSolicitudRpccc.component");
var ng2_bootstrap_1 = require("ng2-bootstrap");
var tramiteSolicitudRpccc_service_1 = require("../../services/tramiteSolicitudRpccc.service");
var newRpcccSustrato_component_1 = require("./newRpcccSustrato/newRpcccSustrato.component");
var newRpcccCiudadano_component_1 = require("./newRpcccCiudadano/newRpcccCiudadano.component");
var newRpcccExpedicionPazySalvo_component_1 = require("./rpccc/tramiteExpedicionPazySalvo/newRpcccExpedicionPazySalvo.component");
var newRpccc_component_1 = require("./newRpccc/newRpccc.component");
var edit_component_1 = require("./edit/edit.component");
var angular2_select_1 = require("angular2-select");
var TramiteSolicitudRpcccModule = (function () {
    function TramiteSolicitudRpcccModule() {
    }
    return TramiteSolicitudRpcccModule;
}());
TramiteSolicitudRpcccModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, ng2_bootstrap_1.Ng2BootstrapModule.forRoot(), angular2_select_1.SelectModule],
        declarations: [
            tramiteSolicitudRpccc_component_1.TramiteSolicitudRpcccComponent,
            newRpccc_component_1.NewRpcccComponent,
            edit_component_1.EditComponent,
            newRpcccSustrato_component_1.NewRpcccSustratoComponent,
            newRpcccCiudadano_component_1.NewRpcccCiudadanoComponent,
            newRpcccExpedicionPazySalvo_component_1.NewRpcccExpedicionPazySalvoComponent
        ],
        exports: [
            tramiteSolicitudRpccc_component_1.TramiteSolicitudRpcccComponent,
            newRpccc_component_1.NewRpcccComponent,
            edit_component_1.EditComponent,
            newRpcccSustrato_component_1.NewRpcccSustratoComponent,
            newRpcccCiudadano_component_1.NewRpcccCiudadanoComponent,
            newRpcccExpedicionPazySalvo_component_1.NewRpcccExpedicionPazySalvoComponent
        ],
        providers: [tramiteSolicitudRpccc_service_1.TramiteSolicitudRpcccService]
    })
], TramiteSolicitudRpcccModule);
exports.TramiteSolicitudRpcccModule = TramiteSolicitudRpcccModule;
//# sourceMappingURL=tramiteSolicitudRpccc.module.js.map