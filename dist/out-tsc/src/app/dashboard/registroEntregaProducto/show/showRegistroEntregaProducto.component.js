"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var login_service_1 = require("../../../services/login.service");
var vehiculo_service_1 = require("../../../services/vehiculo.service");
var tramiteSolicitud_service_1 = require("../../../services/tramiteSolicitud.service");
var ciudadanoVehiculo_service_1 = require("../../../services/ciudadanoVehiculo.service");
var sweetalert2_1 = require("sweetalert2");
var showRegistroEntregaProductoComponent = (function () {
    function showRegistroEntregaProductoComponent(_loginService, _VehiculoService, _TramiteSolicitudService, _CiudadanoVehiculoService) {
        this._loginService = _loginService;
        this._VehiculoService = _VehiculoService;
        this._TramiteSolicitudService = _TramiteSolicitudService;
        this._CiudadanoVehiculoService = _CiudadanoVehiculoService;
        this.cerrarForm = new core_1.EventEmitter();
        this.msj = '';
        this.showT = false;
        this.viewTabla = false;
        this.tramitesEspecificos = [];
        this.resumen = {};
        this.datos = {
            'fechaDesde': null,
            'fechaHasta': null,
            'idVehiculo': null,
            'tramiteNombreSelected': null,
        };
    }
    showRegistroEntregaProductoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.datos.idVehiculo = this.vehiculo.id;
        var token = this._loginService.getToken();
        this._TramiteSolicitudService.getTramiteSolicitudByIdVehiculo(token, this.vehiculo.id).subscribe(function (response) {
            _this.tramiteSolicitud = response;
            if (_this.tramiteSolicitud.length > 0) {
                //entra aquí si encuentra tramites
                _this.tramitesNombres = response;
                // setTimeout(() => {
                //   this.tramiteNombreSelected = [this.linea.marca.id];
                // });
                _this.showT = true;
            }
            else {
                sweetalert2_1.default({
                    type: 'error',
                    title: 'Oops...',
                    text: '¡El Vehiculo no tiene certificados expedidos!'
                });
            }
        });
    };
    showRegistroEntregaProductoComponent.prototype.onCancelar = function () {
        this.cerrarForm.emit(false);
    };
    showRegistroEntregaProductoComponent.prototype.buscarTramiteByFecha = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this._TramiteSolicitudService.getTramiteSolicitudByIdVehiculoAndDate(token, this.datos).subscribe(function (response) {
            _this.tramiteSolicitud = response.data;
            if (_this.tramiteSolicitud) {
                //entra aquí si encuentra tramites
                _this.tramiteSolicitud.forEach(function (element) {
                    if (element.tramiteFactura.tramitePrecio.tramite.id == _this.datos.tramiteNombreSelected) {
                        _this.tramitesEspecificos.push(element);
                    }
                    _this.viewTabla = true;
                });
            }
            else {
                sweetalert2_1.default({
                    type: 'error',
                    title: 'Oops...',
                    text: '¡El Vehiculo no tiene certificados expedidos entre esas fechas!'
                });
            }
        });
    };
    return showRegistroEntregaProductoComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], showRegistroEntregaProductoComponent.prototype, "vehiculo", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], showRegistroEntregaProductoComponent.prototype, "cerrarForm", void 0);
showRegistroEntregaProductoComponent = __decorate([
    core_1.Component({
        selector: 'app-vehiculo-showEntrega',
        templateUrl: './showRegistroEntregaProducto.component.html'
    }),
    __metadata("design:paramtypes", [login_service_1.LoginService,
        vehiculo_service_1.VehiculoService,
        tramiteSolicitud_service_1.TramiteSolicitudService,
        ciudadanoVehiculo_service_1.CiudadanoVehiculoService])
], showRegistroEntregaProductoComponent);
exports.showRegistroEntregaProductoComponent = showRegistroEntregaProductoComponent;
//# sourceMappingURL=showRegistroEntregaProducto.component.js.map