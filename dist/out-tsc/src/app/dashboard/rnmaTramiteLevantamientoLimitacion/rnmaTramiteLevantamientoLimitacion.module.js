"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var rnmaTramiteLevantamientoLimitacion_component_1 = require("./rnmaTramiteLevantamientoLimitacion.component");
var ng2_bootstrap_1 = require("ng2-bootstrap");
var tramiteLimitacion_service_1 = require("../../services/tramiteLimitacion.service");
//import { NewComponent } from './new/new.component';
// import { EditComponent } from './edit/edit.component';
var angular2_select_1 = require("angular2-select");
var vehiculoLimitacion_service_1 = require("../../services/vehiculoLimitacion.service");
// import {SelectModule} from 'angular2-select';
var RnmaTramiteLevantamientoLimitacionModule = (function () {
    function RnmaTramiteLevantamientoLimitacionModule() {
    }
    return RnmaTramiteLevantamientoLimitacionModule;
}());
RnmaTramiteLevantamientoLimitacionModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, ng2_bootstrap_1.Ng2BootstrapModule.forRoot(), angular2_select_1.SelectModule],
        declarations: [rnmaTramiteLevantamientoLimitacion_component_1.RnmaTramiteLevantamientoLimitacionComponent /*,EditComponent*/],
        exports: [rnmaTramiteLevantamientoLimitacion_component_1.RnmaTramiteLevantamientoLimitacionComponent /*,EditComponent*/],
        providers: [tramiteLimitacion_service_1.TramiteLimitacionService, vehiculoLimitacion_service_1.VehiculoLimitacionService]
    })
], RnmaTramiteLevantamientoLimitacionModule);
exports.RnmaTramiteLevantamientoLimitacionModule = RnmaTramiteLevantamientoLimitacionModule;
//# sourceMappingURL=rnmaTramiteLevantamientoLimitacion.module.js.map