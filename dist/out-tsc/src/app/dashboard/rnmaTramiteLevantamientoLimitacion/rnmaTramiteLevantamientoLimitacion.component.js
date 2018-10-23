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
var vehiculoLimitacion_service_1 = require("../../services/vehiculoLimitacion.service");
var vehiculo_service_1 = require("../../services/vehiculo.service");
var login_service_1 = require("../../services/login.service");
var sweetalert2_1 = require("sweetalert2");
var RnmaTramiteLevantamientoLimitacionComponent = (function () {
    function RnmaTramiteLevantamientoLimitacionComponent(_VehiculoLimitacionService, _VehiculoService, _loginService) {
        this._VehiculoLimitacionService = _VehiculoLimitacionService;
        this._VehiculoService = _VehiculoService;
        this._loginService = _loginService;
        this.table = null;
        this.listaLimitacionVehiculo = false;
        this.limitacionVehiculoM = false;
        this.formIndex = true;
        this.limitacionVehiculoEncontrada = 1;
    }
    RnmaTramiteLevantamientoLimitacionComponent.prototype.ngOnInit = function () {
        var _this = this;
        sweetalert2_1.default({
            title: 'Cargando Tabla!',
            text: 'Solo tardara unos segundos por favor espere.',
            timer: 1500,
            onOpen: function () {
                sweetalert2_1.default.showLoading();
            }
        }).then(function (result) {
            if (
            // Read more about handling dismissals
            result.dismiss === sweetalert2_1.default.DismissReason.timer) {
            }
        });
        var datos = {
            'moduloId': 3,
        };
        this._VehiculoLimitacionService.getVehiculoLimitacion(datos).subscribe(function (response) {
            if (response) {
                console.log(response);
                _this.tramitesLevantamiento = response.data;
                var timeoutId = setTimeout(function () {
                    _this.iniciarTabla();
                }, 100);
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
    };
    RnmaTramiteLevantamientoLimitacionComponent.prototype.iniciarTabla = function () {
        $('#dataTables-example').DataTable({
            responsive: true,
            pageLength: 8,
            sPaginationType: 'full_numbers',
            oLanguage: {
                oPaginate: {
                    sFirst: '<<',
                    sPrevious: '<',
                    sNext: '>',
                    sLast: '>>'
                }
            }
        });
        this.table = $('#dataTables-example').DataTable();
    };
    RnmaTramiteLevantamientoLimitacionComponent.prototype.ready = function (isCreado) {
        if (isCreado) {
            this.formIndex = true;
            this.ngOnInit();
        }
    };
    RnmaTramiteLevantamientoLimitacionComponent.prototype.onKeyPlaca = function () {
        var _this = this;
        var token = this._loginService.getToken();
        var datos = {
            'placa': this.placa,
            'moduloId': 3,
        };
        this._VehiculoService.showVehiculoModuloPlaca(token, datos).subscribe(function (response) {
            _this.respuesta = response;
            if (_this.respuesta.status == 'success') {
                _this.limitacionVehiculoEncontrada = 4;
                _this._VehiculoLimitacionService.getTramiteLimitacionPlaca(datos, token).subscribe(function (response) {
                    _this.respuesta = response;
                    if (_this.respuesta.status == 'success') {
                        _this.limitacionesVehiculo = _this.respuesta.data;
                        _this.limitacionVehiculoEncontrada = 2;
                        _this.listaLimitacionVehiculo = true;
                    }
                    else {
                        _this.limitacionVehiculoEncontrada = 3;
                    }
                    (function (error) {
                        _this.errorMessage = error;
                        if (_this.errorMessage != null) {
                            console.log(_this.errorMessage);
                            alert("Error en la petición");
                        }
                    });
                });
            }
            else {
                _this.limitacionVehiculoEncontrada = 5;
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
    RnmaTramiteLevantamientoLimitacionComponent.prototype.enviarTramite = function (limitacionVehiculo) {
        var _this = this;
        var token = this._loginService.getToken();
        this._VehiculoLimitacionService.levantarLimitacion(limitacionVehiculo, token).subscribe(function (response) {
            _this.respuesta = response;
            if (_this.respuesta.status == 'success') {
                sweetalert2_1.default({
                    title: 'Perfecto!',
                    text: 'Registro exitoso!',
                    type: 'success',
                    confirmButtonText: 'Aceptar'
                });
                _this.listaLimitacionVehiculo = false;
                _this.limitacionVehiculoM = false;
                _this.limitacionVehiculoMostrar = null;
                _this.limitacionVehiculoEncontrada = 1;
            }
            else {
                _this.limitacionVehiculoEncontrada = 3;
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
    RnmaTramiteLevantamientoLimitacionComponent.prototype.onCancelar = function () {
        this.listaLimitacionVehiculo = false;
        this.limitacionVehiculoM = false;
        this.limitacionVehiculoEncontrada = 1;
    };
    RnmaTramiteLevantamientoLimitacionComponent.prototype.ver = function (limitacionVehiculoP) {
        this.limitacionVehiculoM = true;
        this.limitacionVehiculoMostrar = limitacionVehiculoP;
        this.listaLimitacionVehiculo = false;
    };
    return RnmaTramiteLevantamientoLimitacionComponent;
}());
RnmaTramiteLevantamientoLimitacionComponent = __decorate([
    core_1.Component({
        selector: 'app-index',
        templateUrl: './rnmaTramiteLevantamientoLimitacion.component.html'
    }),
    __metadata("design:paramtypes", [vehiculoLimitacion_service_1.VehiculoLimitacionService,
        vehiculo_service_1.VehiculoService,
        login_service_1.LoginService])
], RnmaTramiteLevantamientoLimitacionComponent);
exports.RnmaTramiteLevantamientoLimitacionComponent = RnmaTramiteLevantamientoLimitacionComponent;
//# sourceMappingURL=rnmaTramiteLevantamientoLimitacion.component.js.map