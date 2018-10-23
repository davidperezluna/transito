"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var mpersonalTalonario_component_1 = require("./mpersonalTalonario.component");
var ng2_bootstrap_1 = require("ng2-bootstrap");
var mpersonalTalonario_service_1 = require("../../services/mpersonalTalonario.service");
var new_component_1 = require("./new/new.component");
var edit_component_1 = require("./edit/edit.component");
var angular2_select_1 = require("angular2-select");
var MpersonalTalonarioModule = (function () {
    function MpersonalTalonarioModule() {
    }
    return MpersonalTalonarioModule;
}());
MpersonalTalonarioModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, ng2_bootstrap_1.Ng2BootstrapModule.forRoot(), angular2_select_1.SelectModule],
        declarations: [mpersonalTalonario_component_1.MpersonalTalonarioComponent, new_component_1.NewComponent, edit_component_1.EditComponent],
        exports: [mpersonalTalonario_component_1.MpersonalTalonarioComponent, new_component_1.NewComponent, edit_component_1.EditComponent],
        providers: [mpersonalTalonario_service_1.MpersonalTalonarioService]
    })
], MpersonalTalonarioModule);
exports.MpersonalTalonarioModule = MpersonalTalonarioModule;
//# sourceMappingURL=mpersonalTalonario.module.js.map