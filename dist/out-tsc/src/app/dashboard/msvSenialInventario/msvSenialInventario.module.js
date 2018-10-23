"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var msvSenialInventario_component_1 = require("./msvSenialInventario.component");
var ng2_bootstrap_1 = require("ng2-bootstrap");
var msvSenialInventario_service_1 = require("../../services/msvSenialInventario.service");
var msvSenialUbicacion_service_1 = require("../../services/msvSenialUbicacion.service");
var msvSenial_service_1 = require("../../services/msvSenial.service");
var cfgInventario_service_1 = require("../../services/cfgInventario.service");
var cfgTipoEstado_service_1 = require("../../services/cfgTipoEstado.service");
var cfgTipoColor_service_1 = require("../../services/cfgTipoColor.service");
var cfgSvDestino_service_1 = require("../../services/cfgSvDestino.service");
var cfgBodega_service_1 = require("../../services/cfgBodega.service");
var municipio_service_1 = require("../../services/municipio.service");
var cfgTipoSenial_service_1 = require("../../services/cfgTipoSenial.service");
var newSenialBodega_component_1 = require("./newSenialBodega/newSenialBodega.component");
var newSenialMunicipio_component_1 = require("./newSenialMunicipio/newSenialMunicipio.component");
var edit_component_1 = require("./edit/edit.component");
var location_component_1 = require("./location/location.component");
var angular2_select_1 = require("angular2-select");
var MsvSenialInventarioModule = (function () {
    function MsvSenialInventarioModule() {
    }
    return MsvSenialInventarioModule;
}());
MsvSenialInventarioModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, ng2_bootstrap_1.Ng2BootstrapModule.forRoot(), angular2_select_1.SelectModule],
        declarations: [msvSenialInventario_component_1.MsvSenialInventarioComponent, newSenialBodega_component_1.NewSenialBodegaComponent, newSenialMunicipio_component_1.NewSenialMunicipioComponent, edit_component_1.EditComponent, location_component_1.LocationComponent],
        exports: [msvSenialInventario_component_1.MsvSenialInventarioComponent, newSenialBodega_component_1.NewSenialBodegaComponent, newSenialMunicipio_component_1.NewSenialMunicipioComponent, edit_component_1.EditComponent, location_component_1.LocationComponent],
        providers: [msvSenialInventario_service_1.MsvSenialInventarioService, msvSenialUbicacion_service_1.MsvSenialUbicacionService, msvSenial_service_1.MsvSenialService, cfgSvDestino_service_1.CfgSvDestinoService, cfgBodega_service_1.CfgBodegaService, municipio_service_1.MunicipioService, cfgTipoSenial_service_1.CfgTipoSenialService, cfgTipoColor_service_1.CfgTipoColorService, cfgTipoEstado_service_1.CfgTipoEstadoService, cfgInventario_service_1.CfgInventarioService]
    })
], MsvSenialInventarioModule);
exports.MsvSenialInventarioModule = MsvSenialInventarioModule;
//# sourceMappingURL=msvSenialInventario.module.js.map