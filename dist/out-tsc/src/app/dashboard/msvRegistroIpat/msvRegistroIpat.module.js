"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var msvRegistroIpat_component_1 = require("./msvRegistroIpat.component");
var ng2_bootstrap_1 = require("ng2-bootstrap");
var msvRegistroIpat_service_1 = require("../../services/msvRegistroIpat.service");
var new_component_1 = require("./new/new.component");
// import { EditComponent } from './edit/edit.component';
var angular2_select_1 = require("angular2-select");
var msvConsecutivo_service_1 = require("../../services/msvConsecutivo.service");
// import {SelectModule} from 'angular2-select';
var MsvRegistroIpatModule = (function () {
    function MsvRegistroIpatModule() {
    }
    return MsvRegistroIpatModule;
}());
MsvRegistroIpatModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, ng2_bootstrap_1.Ng2BootstrapModule.forRoot(), angular2_select_1.SelectModule],
        declarations: [msvRegistroIpat_component_1.MsvRegistroIpatComponent, new_component_1.NewComponent /*,EditComponent*/],
        exports: [msvRegistroIpat_component_1.MsvRegistroIpatComponent, new_component_1.NewComponent /*,EditComponent*/],
        providers: [msvRegistroIpat_service_1.MsvRegistroIpatService, msvConsecutivo_service_1.MsvConsecutivoService]
    })
], MsvRegistroIpatModule);
exports.MsvRegistroIpatModule = MsvRegistroIpatModule;
//# sourceMappingURL=msvRegistroIpat.module.js.map