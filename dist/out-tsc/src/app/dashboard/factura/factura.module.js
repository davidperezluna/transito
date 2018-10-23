"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var factura_component_1 = require("./factura.component");
var ng2_bootstrap_1 = require("ng2-bootstrap");
var factura_service_1 = require("../../services/factura.service");
var mflTipoRecaudo_service_1 = require("../../services/mflTipoRecaudo.service");
var new_component_1 = require("./new/new.component");
var show_component_1 = require("./show/show.component");
var edit_component_1 = require("./edit/edit.component");
var newCiudadano_component_1 = require("./newCiudadano/newCiudadano.component");
var angular2_select_1 = require("angular2-select");
var FacturaModule = (function () {
    function FacturaModule() {
    }
    return FacturaModule;
}());
FacturaModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, ng2_bootstrap_1.Ng2BootstrapModule.forRoot(), angular2_select_1.SelectModule],
        declarations: [factura_component_1.FacturaComponent, new_component_1.NewComponent, edit_component_1.EditComponent, show_component_1.ShowComponent, newCiudadano_component_1.NewCiudadanoComponent],
        exports: [factura_component_1.FacturaComponent, new_component_1.NewComponent, edit_component_1.EditComponent, show_component_1.ShowComponent, newCiudadano_component_1.NewCiudadanoComponent],
        providers: [factura_service_1.FacturaService, mflTipoRecaudo_service_1.MflTipoRecaudoService]
    })
], FacturaModule);
exports.FacturaModule = FacturaModule;
//# sourceMappingURL=factura.module.js.map