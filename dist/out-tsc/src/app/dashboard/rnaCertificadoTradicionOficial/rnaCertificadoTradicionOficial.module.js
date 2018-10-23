"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var rnaCertificadoTradicionOficial_component_1 = require("./rnaCertificadoTradicionOficial.component");
var ng2_bootstrap_1 = require("ng2-bootstrap");
var marca_service_1 = require("../../services/marca.service");
var RnaCertificadoTradicionOficialModule = (function () {
    function RnaCertificadoTradicionOficialModule() {
    }
    return RnaCertificadoTradicionOficialModule;
}());
RnaCertificadoTradicionOficialModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, ng2_bootstrap_1.Ng2BootstrapModule.forRoot()],
        declarations: [rnaCertificadoTradicionOficial_component_1.rnaCertificadoTradicionOficialComponent],
        exports: [rnaCertificadoTradicionOficial_component_1.rnaCertificadoTradicionOficialComponent],
        providers: [marca_service_1.MarcaService]
    })
], RnaCertificadoTradicionOficialModule);
exports.RnaCertificadoTradicionOficialModule = RnaCertificadoTradicionOficialModule;
//# sourceMappingURL=rnaCertificadoTradicionOficial.module.js.map