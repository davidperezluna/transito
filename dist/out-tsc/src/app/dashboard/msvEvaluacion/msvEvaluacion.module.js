"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var msvEvaluacion_component_1 = require("./msvEvaluacion.component");
var ng2_bootstrap_1 = require("ng2-bootstrap");
var msvRevision_service_1 = require("../../services/msvRevision.service");
var msvEvaluacion_service_1 = require("../../services/msvEvaluacion.service");
var msvParametro_service_1 = require("../../services/msvParametro.service");
var msvVariable_service_1 = require("../../services/msvVariable.service");
var msvCalificacion_service_1 = require("../../services/msvCalificacion.service");
var new_component_1 = require("./new/new.component");
var edit_component_1 = require("./edit/edit.component");
var newFortalecimiento_component_1 = require("./newFortalecimiento/newFortalecimiento.component");
var angular2_select_1 = require("angular2-select");
var newEmpresa_component_1 = require("./newEmpresa/newEmpresa.component");
var newRevision_component_1 = require("./newRevision/newRevision.component");
var MsvEvaluacionModule = (function () {
    function MsvEvaluacionModule() {
    }
    return MsvEvaluacionModule;
}());
MsvEvaluacionModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, ng2_bootstrap_1.Ng2BootstrapModule.forRoot(), angular2_select_1.SelectModule],
        declarations: [msvEvaluacion_component_1.MsvEvaluacionComponent, new_component_1.NewComponent, edit_component_1.EditComponent, newEmpresa_component_1.NewEmpresaComponent, newRevision_component_1.NewRevisionComponent, newFortalecimiento_component_1.NewFortalecimientoComponent],
        exports: [msvEvaluacion_component_1.MsvEvaluacionComponent, new_component_1.NewComponent, edit_component_1.EditComponent, newEmpresa_component_1.NewEmpresaComponent, newRevision_component_1.NewRevisionComponent, newFortalecimiento_component_1.NewFortalecimientoComponent],
        providers: [msvRevision_service_1.MsvRevisionService, msvEvaluacion_service_1.MsvEvaluacionService, msvParametro_service_1.MsvParametroService, msvVariable_service_1.MsvVariableService, msvCalificacion_service_1.MsvCalificacionService]
    })
], MsvEvaluacionModule);
exports.MsvEvaluacionModule = MsvEvaluacionModule;
//# sourceMappingURL=msvEvaluacion.module.js.map