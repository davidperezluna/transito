"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var linea_component_1 = require("./linea.component");
var ng2_bootstrap_1 = require("ng2-bootstrap");
var linea_service_1 = require("../../services/linea.service");
var new_component_1 = require("./new/new.component");
var edit_component_1 = require("./edit/edit.component");
var angular2_select_1 = require("angular2-select");
var LineaModule = (function () {
    function LineaModule() {
    }
    return LineaModule;
}());
LineaModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, ng2_bootstrap_1.Ng2BootstrapModule.forRoot(), angular2_select_1.SelectModule],
        declarations: [linea_component_1.LineaComponent, new_component_1.NewComponent, edit_component_1.EditComponent],
        exports: [linea_component_1.LineaComponent, new_component_1.NewComponent, edit_component_1.EditComponent],
        providers: [linea_service_1.LineaService]
    })
], LineaModule);
exports.LineaModule = LineaModule;
//# sourceMappingURL=linea.module.js.map