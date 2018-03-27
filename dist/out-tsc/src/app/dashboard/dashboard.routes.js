"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var home_routes_1 = require("./home/home.routes");
var vehiculo_routes_1 = require("./vehiculo/vehiculo.routes");
var marca_routes_1 = require("./marca/marca.routes");
var linea_routes_1 = require("./linea/linea.routes");
var banco_routes_1 = require("./banco/banco.routes");
var clase_routes_1 = require("./clase/clase.routes");
var color_routes_1 = require("./color/color.routes");
var departamento_routes_1 = require("./departamento/departamento.routes");
var combustible_routes_1 = require("./combustible/combustible.routes");
var consumible_routes_1 = require("./consumible/consumible.routes");
var modalidad_routes_1 = require("./modalidad/modalidad.routes");
var municipio_routes_1 = require("./municipio/municipio.routes");
var cuenta_routes_1 = require("./cuenta/cuenta.routes");
var organismoTransito_routes_1 = require("./organismoTransito/organismoTransito.routes");
var servicio_routes_1 = require("./servicio/servicio.routes");
var almacen_routes_1 = require("./almacen/almacen.routes");
var comparendo_routes_1 = require("./comparendo/comparendo.routes");
var ciudadano_routes_1 = require("./ciudadano/ciudadano.routes");
var modulo_routes_1 = require("./modulo/modulo.routes");
var index_1 = require("./index");
exports.DashboardRoutes = [
    {
        path: 'dashboard',
        component: index_1.DashboardComponent,
        children: home_routes_1.HomeRoutes.concat(vehiculo_routes_1.VehiculoRoutes, marca_routes_1.MarcaRoutes, linea_routes_1.LineaRoutes, banco_routes_1.BancoRoutes, clase_routes_1.ClaseRoutes, color_routes_1.ColorRoutes, departamento_routes_1.DepartamentoRoutes, combustible_routes_1.CombustibleRoutes, consumible_routes_1.ConsumibleRoutes, modalidad_routes_1.ModalidadRoutes, municipio_routes_1.MunicipioRoutes, organismoTransito_routes_1.OrganismoTransitoRoutes, servicio_routes_1.ServicioRoutes, ciudadano_routes_1.CiudadanoRoutes, cuenta_routes_1.CuentaRoutes, modulo_routes_1.ModuloRoutes, almacen_routes_1.AlmacenRoutes, comparendo_routes_1.ComparendoRoutes)
    }
];
//# sourceMappingURL=dashboard.routes.js.map