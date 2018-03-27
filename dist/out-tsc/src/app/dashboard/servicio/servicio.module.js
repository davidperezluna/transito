"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var servicio_component_1 = require("./servicio.component");
var ng2_bootstrap_1 = require("ng2-bootstrap");
var servicio_service_1 = require("../../services/servicio.service");
var new_component_1 = require("./new/new.component");
var edit_component_1 = require("./edit/edit.component");
// import {SelectModule} from 'angular2-select';
var ServicioModule = /** @class */ (function () {
    function ServicioModule() {
    }
    ServicioModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, ng2_bootstrap_1.Ng2BootstrapModule.forRoot()],
            declarations: [servicio_component_1.ServicioComponent, new_component_1.NewComponent, edit_component_1.EditComponent],
            exports: [servicio_component_1.ServicioComponent, new_component_1.NewComponent, edit_component_1.EditComponent],
            providers: [servicio_service_1.ServicioService]
        })
    ], ServicioModule);
    return ServicioModule;
}());
exports.ServicioModule = ServicioModule;
//# sourceMappingURL=servicio.module.js.map