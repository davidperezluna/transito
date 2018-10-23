"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var rnaPreregistro_component_1 = require("./rnaPreregistro.component");
var ng2_bootstrap_1 = require("ng2-bootstrap");
var ng2_charts_1 = require("ng2-charts");
var rnaPreregistro_service_1 = require("../../services/rnaPreregistro.service");
var carroceria_service_1 = require("../../services/carroceria.service");
var cfgRadioAccion_service_1 = require("../../services/cfgRadioAccion.service");
var vhloCfgModalidadTransporte_service_1 = require("../../services/vhloCfgModalidadTransporte.service");
var new_component_1 = require("./new/new.component");
var edit_component_1 = require("./edit/edit.component");
var newCiudadano_component_1 = require("./newCiudadano/newCiudadano.component");
var newEmpresa_component_1 = require("./newEmpresa/newEmpresa.component");
var angular2_select_1 = require("angular2-select");
var RnaPreregistroModule = (function () {
    function RnaPreregistroModule() {
    }
    return RnaPreregistroModule;
}());
RnaPreregistroModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, ng2_charts_1.ChartsModule, ng2_bootstrap_1.Ng2BootstrapModule.forRoot(), angular2_select_1.SelectModule],
        declarations: [rnaPreregistro_component_1.RnaPreregistroComponent, new_component_1.NewRnaPreregistroComponent, edit_component_1.EditComponent, newCiudadano_component_1.NewCiudadanoComponent, newEmpresa_component_1.NewEmpresaComponent],
        exports: [rnaPreregistro_component_1.RnaPreregistroComponent, new_component_1.NewRnaPreregistroComponent, edit_component_1.EditComponent, newCiudadano_component_1.NewCiudadanoComponent, newEmpresa_component_1.NewEmpresaComponent],
        providers: [rnaPreregistro_service_1.RnaPreregistroService, carroceria_service_1.CarroceriaService, cfgRadioAccion_service_1.CfgRadioAccionService, vhloCfgModalidadTransporte_service_1.VhloCfgModalidadTransporteService]
    })
], RnaPreregistroModule);
exports.RnaPreregistroModule = RnaPreregistroModule;
//# sourceMappingURL=RnaPreregistro.module.js.map