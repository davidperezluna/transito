"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var tramitePrecio_component_1 = require("./tramitePrecio.component");
var ng2_bootstrap_1 = require("ng2-bootstrap");
var tramitePrecio_service_1 = require("../../services/tramitePrecio.service");
var tipoVehiculo_service_1 = require("../../services/tipoVehiculo.service");
var parametro_service_1 = require("../../services/parametro.service");
var conceptoParameTrotramite_service_1 = require("../../services/conceptoParameTrotramite.service");
var new_component_1 = require("./new/new.component");
var smlmv_component_1 = require("./smlmv/smlmv.component");
var calculo_component_1 = require("./calculo/calculo.component");
var edit_component_1 = require("./edit/edit.component");
var angular2_select_1 = require("angular2-select");
var sortable_1 = require("ngx-bootstrap/sortable");
var angular2_tooltip_1 = require("angular2-tooltip");
var TramitePrecioModule = (function () {
    function TramitePrecioModule() {
    }
    return TramitePrecioModule;
}());
TramitePrecioModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, ng2_bootstrap_1.Ng2BootstrapModule.forRoot(), angular2_select_1.SelectModule, sortable_1.SortableModule.forRoot(), angular2_tooltip_1.ToolTipModule],
        declarations: [tramitePrecio_component_1.TramitePrecioComponent, new_component_1.NewComponent, edit_component_1.EditComponent, smlmv_component_1.NewSmlmvComponent, calculo_component_1.CalculoComponent],
        exports: [tramitePrecio_component_1.TramitePrecioComponent, new_component_1.NewComponent, edit_component_1.EditComponent, smlmv_component_1.NewSmlmvComponent, calculo_component_1.CalculoComponent],
        providers: [tramitePrecio_service_1.TramitePrecioService, tipoVehiculo_service_1.TipoVehiculoService, parametro_service_1.ParametroService, conceptoParameTrotramite_service_1.ConceptoParametroTramiteService]
    })
], TramitePrecioModule);
exports.TramitePrecioModule = TramitePrecioModule;
//# sourceMappingURL=tramitePrecio.module.js.map