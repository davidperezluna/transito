"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var reporte_component_1 = require("./reporte.component");
var ng2_bootstrap_1 = require("ng2-bootstrap");
var ng2_charts_1 = require("ng2-charts");
var carroceria_service_1 = require("../../services/carroceria.service");
var rnmaPreregistro_service_1 = require("../../services/rnmaPreregistro.service");
var vhloCfgOrigenRegistro_service_1 = require("../../services/vhloCfgOrigenRegistro.service");
var tramite_component_1 = require("./tramite/tramite.component");
var multa_component_1 = require("./multa/multa.component");
var retefuente_component_1 = require("./retefuente/retefuente.component");
var angular2_select_1 = require("angular2-select");
// ,EditComponent
var ReporteModule = (function () {
    function ReporteModule() {
    }
    return ReporteModule;
}());
ReporteModule = __decorate([
    core_1.NgModule({
        declarations: [reporte_component_1.ReporteComponent, tramite_component_1.TramiteComponent, multa_component_1.MultaComponent, retefuente_component_1.RetefuenteComponent],
        imports: [common_1.CommonModule, ng2_charts_1.ChartsModule, ng2_bootstrap_1.Ng2BootstrapModule.forRoot(), angular2_select_1.SelectModule],
        exports: [reporte_component_1.ReporteComponent, tramite_component_1.TramiteComponent, multa_component_1.MultaComponent, retefuente_component_1.RetefuenteComponent],
        providers: [rnmaPreregistro_service_1.RnmaPreregistroService, carroceria_service_1.CarroceriaService, vhloCfgOrigenRegistro_service_1.VhloCfgOrigenRegistroService]
    })
], ReporteModule);
exports.ReporteModule = ReporteModule;
//# sourceMappingURL=reporte.module.js.map