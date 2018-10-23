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
var vehiculo_modelo_1 = require("../vehiculo/vehiculo.modelo");
var login_service_1 = require("../../services/login.service");
var vehiculo_service_1 = require("../../services/vehiculo.service");
var ciudadanoVehiculo_service_1 = require("../../services/ciudadanoVehiculo.service");
var sweetalert2_1 = require("sweetalert2");
var buscarAutomotorComponent = (function () {
    function buscarAutomotorComponent(_loginService, _VehiculoService, _ciudadanoVehiculoService) {
        this._loginService = _loginService;
        this._VehiculoService = _VehiculoService;
        this._ciudadanoVehiculoService = _ciudadanoVehiculoService;
        this.mensaje = '';
        this.tipoError = 200;
        this.error = false;
        this.msj = '';
        this.vehiculoSuccess = false;
        this.resumen = {};
        this.datos = {
            'numeroPlaca': null,
            'numeroVIN': null,
            'numeroSerie': null,
            'numeroMotor': null,
            'numeroChasis': null,
            'propietario': null,
        };
    }
    buscarAutomotorComponent.prototype.ngOnInit = function () {
        this.vehiculo = new vehiculo_modelo_1.Vehiculo(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    };
    buscarAutomotorComponent.prototype.onCancelar = function () {
    };
    buscarAutomotorComponent.prototype.onEnviar = function () {
    };
    buscarAutomotorComponent.prototype.onKeyValidateVehiculo = function () {
        var _this = this;
        this.formShow = false;
        this.msj = '';
        this.mensaje = '';
        sweetalert2_1.default({
            title: 'Buscando Vehiculo!',
            text: 'Solo tardara unos segundos por favor espere.',
            onOpen: function () {
                sweetalert2_1.default.showLoading();
            }
        }).then(function (result) {
            if (
            // Read more about handling dismissals
            result.dismiss === sweetalert2_1.default.DismissReason.timer) {
            }
        });
        var token = this._loginService.getToken();
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
                sweetalert2_1.default.close();
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
    buscarAutomotorComponent.prototype.onShowVehiculo = function (vehiculo) {
        this.vehiculo = vehiculo;
        this.formShow = true;
    };
    buscarAutomotorComponent.prototype.cerrarForm = function (isForm) {
        this.formShow = isForm;
    };
    return buscarAutomotorComponent;
}());
buscarAutomotorComponent = __decorate([
    core_1.Component({
        selector: 'app-buscar-automotor',
        templateUrl: './buscarAutomotor.component.html'
    }),
    __metadata("design:paramtypes", [login_service_1.LoginService,
        vehiculo_service_1.VehiculoService,
        ciudadanoVehiculo_service_1.CiudadanoVehiculoService])
], buscarAutomotorComponent);
exports.buscarAutomotorComponent = buscarAutomotorComponent;
//# sourceMappingURL=buscarAutomotor.component.js.map