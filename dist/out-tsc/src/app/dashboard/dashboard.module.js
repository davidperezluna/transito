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
var router_1 = require("@angular/router");
var ng2_bootstrap_1 = require("ng2-bootstrap");
var home_module_1 = require("./home/home.module");
var vehiculo_module_1 = require("./vehiculo/vehiculo.module");
var marca_module_1 = require("./marca/marca.module");
var linea_module_1 = require("./linea/linea.module");
var banco_module_1 = require("./banco/banco.module");
var clase_module_1 = require("./clase/clase.module");
var color_module_1 = require("./color/color.module");
var combustible_module_1 = require("./combustible/combustible.module");
var consumible_module_1 = require("./consumible/consumible.module");
var departamento_module_1 = require("./departamento/departamento.module");
var modalidad_module_1 = require("./modalidad/modalidad.module");
var municipio_module_1 = require("./municipio/municipio.module");
var organismoTransito_module_1 = require("./organismoTransito/organismoTransito.module");
var servicio_module_1 = require("./servicio/servicio.module");
var modulo_module_1 = require("./modulo/modulo.module");
var almacen_module_1 = require("./almacen/almacen.module");
var ciudadano_module_1 = require("./ciudadano/ciudadano.module");
var dashboard_component_1 = require("./dashboard.component");
var index_1 = require("../shared/index");
var index_2 = require("../shared/index");
var index_3 = require("../shared/index");
var index_4 = require("../shared/index");
var DashboardModule = /** @class */ (function () {
    function DashboardModule() {
    }
    DashboardModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule,
                ng2_bootstrap_1.Ng2BootstrapModule.forRoot(),
                home_module_1.HomeModule,
                vehiculo_module_1.VehiculoModule,
                marca_module_1.MarcaModule,
                linea_module_1.LineaModule,
                banco_module_1.BancoModule,
                clase_module_1.ClaseModule,
                color_module_1.ColorModule,
                modalidad_module_1.ModalidadModule,
                departamento_module_1.DepartamentoModule,
                combustible_module_1.CombustibleModule,
                consumible_module_1.ConsumibleModule,
                municipio_module_1.MunicipioModule,
                organismoTransito_module_1.OrganismoTransitoModule,
                servicio_module_1.ServicioModule,
                modulo_module_1.ModuloModule,
                almacen_module_1.AlmacenModule,
                ciudadano_module_1.CiudadanoModule,
            ],
            declarations: [dashboard_component_1.DashboardComponent, index_1.TopNavComponent, index_2.SidebarComponent, index_3.FooterComponent, index_4.RightsidebarComponent],
            exports: [dashboard_component_1.DashboardComponent, index_1.TopNavComponent, index_2.SidebarComponent, index_3.FooterComponent, index_4.RightsidebarComponent],
        })
    ], DashboardModule);
    return DashboardModule;
}());
exports.DashboardModule = DashboardModule;
//# sourceMappingURL=dashboard.module.js.map