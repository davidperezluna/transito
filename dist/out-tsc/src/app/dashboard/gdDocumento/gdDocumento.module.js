"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var gdDocumento_component_1 = require("./gdDocumento.component");
var ng2_bootstrap_1 = require("ng2-bootstrap");
var gdDocumento_service_1 = require("../../services/gdDocumento.service");
var new_component_1 = require("./new/new.component");
var edit_component_1 = require("./edit/edit.component");
var show_component_1 = require("./show/show.component");
var print_component_1 = require("./print/print.component");
var template_component_1 = require("./template/template.component");
var newCiudadano_component_1 = require("./newCiudadano/newCiudadano.component");
var angular2_select_1 = require("angular2-select");
var GdDocumentoModule = (function () {
    function GdDocumentoModule() {
    }
    return GdDocumentoModule;
}());
GdDocumentoModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, ng2_bootstrap_1.Ng2BootstrapModule.forRoot(), angular2_select_1.SelectModule],
        declarations: [gdDocumento_component_1.GdDocumentoComponent, new_component_1.NewComponent, edit_component_1.EditComponent, show_component_1.ShowComponent, print_component_1.PrintComponent, template_component_1.TemplateComponent, newCiudadano_component_1.NewCiudadanoComponent],
        exports: [gdDocumento_component_1.GdDocumentoComponent, new_component_1.NewComponent, edit_component_1.EditComponent, show_component_1.ShowComponent, print_component_1.PrintComponent, template_component_1.TemplateComponent, newCiudadano_component_1.NewCiudadanoComponent],
        providers: [gdDocumento_service_1.GdDocumentoService]
    })
], GdDocumentoModule);
exports.GdDocumentoModule = GdDocumentoModule;
//# sourceMappingURL=gdDocumento.module.js.map