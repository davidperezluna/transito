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
var vehiculoTecnoMecanica_service_1 = require("../../services/vehiculoTecnoMecanica.service");
var vehiculo_service_1 = require("../../services/vehiculo.service");
var login_service_1 = require("../../services/login.service");
var sweetalert2_1 = require("sweetalert2");
var VehiculoTecnoMecanicaComponent = (function () {
    function VehiculoTecnoMecanicaComponent(_TecnoMecanicaService, _VehiculoService, _loginService) {
        this._TecnoMecanicaService = _TecnoMecanicaService;
        this._VehiculoService = _VehiculoService;
        this._loginService = _loginService;
        this.vehiculo = null;
        this.tecnoMecanicas = null;
        this.formNew = false;
        this.formEdit = false;
        this.formIndex = true;
    }
    VehiculoTecnoMecanicaComponent.prototype.ngOnInit = function () { };
    VehiculoTecnoMecanicaComponent.prototype.onNew = function () {
        this.formNew = true;
        this.formIndex = false;
    };
    VehiculoTecnoMecanicaComponent.prototype.ready = function (isCreado) {
        if (isCreado) {
            this.formNew = false;
            this.formIndex = true;
            this.ngOnInit();
        }
    };
    VehiculoTecnoMecanicaComponent.prototype.onSearch = function () {
        var _this = this;
        sweetalert2_1.default({
            title: 'Buscando vehiculo',
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
        var datos = {
            'placa': this.placa
        };
        this._VehiculoService.showVehiculoPlaca(token, datos).subscribe(function (response) {
            if (response.status == 'success') {
                _this.vehiculo = response.data;
                //Busca el historial de tecno mecanicas por vehiculo encontrado
                _this._TecnoMecanicaService.index({ 'idVehiculo': _this.vehiculo.id }, token).subscribe(function (response) {
                    if (response.status == 'success') {
                        _this.tecnoMecanicas = response.data;
                    }
                    else {
                        sweetalert2_1.default({
                            title: 'Alerta!',
                            text: response.message,
                            type: 'error',
                            confirmButtonText: 'Aceptar'
                        });
                    }
                    (function (error) {
                        _this.errorMessage = error;
                        if (_this.errorMessage != null) {
                            console.log(_this.errorMessage);
                            alert('Error en la petición');
                        }
                    });
                });
                sweetalert2_1.default.close();
            }
            else {
                sweetalert2_1.default({
                    title: 'Alerta!',
                    text: response.message,
                    type: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
            (function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert('Error en la petición');
                }
            });
        });
    };
    return VehiculoTecnoMecanicaComponent;
}());
VehiculoTecnoMecanicaComponent = __decorate([
    core_1.Component({
        selector: 'app-index',
        templateUrl: './vehiculoTecnoMecanica.component.html'
    }),
    __metadata("design:paramtypes", [vehiculoTecnoMecanica_service_1.TecnoMecanicaService,
        vehiculo_service_1.VehiculoService,
        login_service_1.LoginService])
], VehiculoTecnoMecanicaComponent);
exports.VehiculoTecnoMecanicaComponent = VehiculoTecnoMecanicaComponent;
//# sourceMappingURL=vehiculoTecnoMecanica.component.js.map