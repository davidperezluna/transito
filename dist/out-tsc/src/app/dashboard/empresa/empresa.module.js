"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var empresa_component_1 = require("./empresa.component");
var ng2_bootstrap_1 = require("ng2-bootstrap");
var empresa_service_1 = require("../../services/empresa.service");
var sucursal_service_1 = require("../../services/sucursal.service");
var tipoEmpresa_service_1 = require("../../services/tipoEmpresa.service");
var tipoSociedad_service_1 = require("../../services/tipoSociedad.service");
var newSucursal_component_1 = require("./sucursal/new/newSucursal.component");
var new_component_1 = require("./new/new.component");
var show_component_1 = require("./show/show.component");
var edit_component_1 = require("./edit/edit.component");
var angular2_select_1 = require("angular2-select");
var representanteEmpresa_service_1 = require("../../services/representanteEmpresa.service");
var EmpresaModule = (function () {
    function EmpresaModule() {
    }
    return EmpresaModule;
}());
EmpresaModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, ng2_bootstrap_1.Ng2BootstrapModule.forRoot(), angular2_select_1.SelectModule],
        declarations: [empresa_component_1.EmpresaComponent, new_component_1.NewEmpresaComponent, edit_component_1.EditComponent, newSucursal_component_1.NewSucursalComponent, show_component_1.ShowComponent],
        exports: [empresa_component_1.EmpresaComponent, new_component_1.NewEmpresaComponent, edit_component_1.EditComponent, newSucursal_component_1.NewSucursalComponent, show_component_1.ShowComponent],
        providers: [empresa_service_1.EmpresaService, tipoEmpresa_service_1.TipoEmpresaService, tipoSociedad_service_1.TipoSociedadService, sucursal_service_1.SucursalService, representanteEmpresa_service_1.RepresentanteEmpresaService]
    })
], EmpresaModule);
exports.EmpresaModule = EmpresaModule;
//# sourceMappingURL=empresa.module.js.map