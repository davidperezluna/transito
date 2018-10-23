"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var rnaRegistroInsumos_component_1 = require("./rnaRegistroInsumos.component");
var ng2_bootstrap_1 = require("ng2-bootstrap");
var angular2_select_1 = require("angular2-select");
var new_component_1 = require("./new/new.component");
var rnaloteInsumos_service_1 = require("../../services/rnaloteInsumos.service");
var cfgCasoInsumo_service_1 = require("../../services/cfgCasoInsumo.service");
var edit_component_1 = require("./edit/edit.component");
var rnaRegistroInsumosModule = (function () {
    function rnaRegistroInsumosModule() {
    }
    return rnaRegistroInsumosModule;
}());
rnaRegistroInsumosModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, ng2_bootstrap_1.Ng2BootstrapModule.forRoot(), angular2_select_1.SelectModule],
        declarations: [rnaRegistroInsumos_component_1.rnaRegistroInsumosComponent, new_component_1.NewComponent, edit_component_1.EditComponent],
        exports: [rnaRegistroInsumos_component_1.rnaRegistroInsumosComponent, new_component_1.NewComponent, edit_component_1.EditComponent],
        providers: [rnaloteInsumos_service_1.RnaLoteInsumoService, cfgCasoInsumo_service_1.CfgCasoInsumoService]
    })
], rnaRegistroInsumosModule);
exports.rnaRegistroInsumosModule = rnaRegistroInsumosModule;
//# sourceMappingURL=rnaRegistroInsumos.module.js.map