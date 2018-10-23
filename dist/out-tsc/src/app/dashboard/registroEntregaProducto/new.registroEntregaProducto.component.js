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
var router_1 = require("@angular/router");
var vehiculo_service_1 = require("../../services/vehiculo.service");
var login_service_1 = require("../../services/login.service");
var tramiteSolicitud_service_1 = require("../../services/tramiteSolicitud.service");
var vehiculo_modelo_1 = require("../vehiculo/vehiculo.modelo");
var sweetalert2_1 = require("sweetalert2");
var NewRegistroEntregaProductoComponent = (function () {
    function NewRegistroEntregaProductoComponent(router, _loginService, _VehiculoService, _TramiteSolicitudService) {
        this.router = router;
        this._loginService = _loginService;
        this._VehiculoService = _VehiculoService;
        this._TramiteSolicitudService = _TramiteSolicitudService;
        this.errorMessage = false;
        this.error = false;
        this.msj = '';
        this.vehiculoSuccess = false;
        this.resumen = {};
        this.datos = {
            'vehiculo': null,
            'tramiteFactura': null,
            'tipoConsulta': null,
            'numeroPlaca': null,
            'numeroVIN': null,
            'numeroSerie': null,
            'numeroMotor': null,
            'numeroChasis': null,
            'propietario': null,
        };
    }
    NewRegistroEntregaProductoComponent.prototype.ngOnInit = function () {
        this.vehiculo = new vehiculo_modelo_1.Vehiculo(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    };
    NewRegistroEntregaProductoComponent.prototype.buscarVehiculo = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this.showV = false;
        this._VehiculoService.showVehiculoParametro(token, this.datos).subscribe(function (response) {
            if (response.status == 'error') {
                if (response.code == 401) {
                    _this.msj = response.msj;
                    sweetalert2_1.default({
                        type: 'error',
                        title: 'Oops...',
                        text: response.msj
                    });
                }
                else if (response.code == 400) {
                    _this.msj = response.msj;
                    sweetalert2_1.default({
                        type: 'error',
                        title: 'Oops...',
                        text: response.msj
                    });
                }
                _this.error = true;
                _this.vehiculoSuccess = false;
            }
            else {
                _this.vehiculos = response.data;
                _this.vehiculoSuccess = true;
            }
            (function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert("Error en la petición");
                }
            });
        });
    };
    NewRegistroEntregaProductoComponent.prototype.onCancelar = function () {
    };
    NewRegistroEntregaProductoComponent.prototype.showVehiculo = function (vehiculo) {
        this.vehiculo = vehiculo;
        console.log(this.vehiculo);
        this.showV = true;
    };
    return NewRegistroEntregaProductoComponent;
}());
NewRegistroEntregaProductoComponent = __decorate([
    core_1.Component({
        selector: 'app-registroEntregaProducto',
        templateUrl: './new.registroEntregaProducto.html',
    }),
    __metadata("design:paramtypes", [router_1.Router,
        login_service_1.LoginService,
        vehiculo_service_1.VehiculoService,
        tramiteSolicitud_service_1.TramiteSolicitudService])
], NewRegistroEntregaProductoComponent);
exports.NewRegistroEntregaProductoComponent = NewRegistroEntregaProductoComponent;
//# sourceMappingURL=new.registroEntregaProducto.component.js.map