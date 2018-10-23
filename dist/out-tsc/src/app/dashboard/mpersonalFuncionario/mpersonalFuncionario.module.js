"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var mpersonalFuncionario_component_1 = require("./mpersonalFuncionario.component");
var ng2_bootstrap_1 = require("ng2-bootstrap");
var mpersonalFuncionario_service_1 = require("../../services/mpersonalFuncionario.service");
var mpersonalHorario_service_1 = require("../../services/mpersonalHorario.service");
var pnalProrroga_service_1 = require("../../services/pnalProrroga.service");
var new_component_1 = require("./new/new.component");
var edit_component_1 = require("./edit/edit.component");
var time_component_1 = require("./time/time.component");
var show_component_1 = require("./show/show.component");
var prorroga_component_1 = require("./prorroga/prorroga.component");
var angular2_select_1 = require("angular2-select");
var MpersonalFuncionarioModule = (function () {
    function MpersonalFuncionarioModule() {
    }
    return MpersonalFuncionarioModule;
}());
MpersonalFuncionarioModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, ng2_bootstrap_1.Ng2BootstrapModule.forRoot(), angular2_select_1.SelectModule],
        declarations: [mpersonalFuncionario_component_1.MpersonalFuncionarioComponent, new_component_1.NewComponent, edit_component_1.EditComponent, time_component_1.TimeComponent, show_component_1.ShowComponent, prorroga_component_1.ProrrogaComponent],
        exports: [mpersonalFuncionario_component_1.MpersonalFuncionarioComponent, new_component_1.NewComponent, edit_component_1.EditComponent, time_component_1.TimeComponent, show_component_1.ShowComponent, prorroga_component_1.ProrrogaComponent],
        providers: [mpersonalFuncionario_service_1.MpersonalFuncionarioService, mpersonalHorario_service_1.MpersonalHorarioService, pnalProrroga_service_1.PnalProrrogaService]
    })
], MpersonalFuncionarioModule);
exports.MpersonalFuncionarioModule = MpersonalFuncionarioModule;
//# sourceMappingURL=mpersonalFuncionario.module.js.map