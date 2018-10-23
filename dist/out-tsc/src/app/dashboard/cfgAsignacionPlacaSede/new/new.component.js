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
var cfgAsignacionPlacaSede_modelo_1 = require("../cfgAsignacionPlacaSede.modelo");
var login_service_1 = require("../../../services/login.service");
var sedeOperativa_service_1 = require("../../../services/sedeOperativa.service");
var cfgTipoVehiculo_service_1 = require("../../../services/cfgTipoVehiculo.service");
var modulo_service_1 = require("../../../services/modulo.service");
var sweetalert2_1 = require("sweetalert2");
var cfgAsignacionPlacaSede_service_1 = require("../../../services/cfgAsignacionPlacaSede.service");
var NewCfgAsignacionPlacaSedeComponent = (function () {
    function NewCfgAsignacionPlacaSedeComponent(_loginService, _SedeOperativaService, _CfgTipoVehiculoService, _ModuloService, _CfgAsignacionPlacaSedeService) {
        this._loginService = _loginService;
        this._SedeOperativaService = _SedeOperativaService;
        this._CfgTipoVehiculoService = _CfgTipoVehiculoService;
        this._ModuloService = _ModuloService;
        this._CfgAsignacionPlacaSedeService = _CfgAsignacionPlacaSedeService;
        this.ready = new core_1.EventEmitter();
        this.tipoSelected = null;
        this.moduloSelected = null;
    }
    NewCfgAsignacionPlacaSedeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.asignacion = new cfgAsignacionPlacaSede_modelo_1.CfgAsignacionPlacaSede(null, null, null, null, null, null, null, null);
        this._SedeOperativaService.getSedeOperativaSelect().subscribe(function (response) {
            _this.sedesOperativas = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._CfgTipoVehiculoService.getTipoVehiculoSelect().subscribe(function (response) {
            _this.tipos = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._ModuloService.getModuloSelect().subscribe(function (response) {
            _this.modulos = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
    };
    NewCfgAsignacionPlacaSedeComponent.prototype.onCancelar = function () {
        this.ready.emit(true);
    };
    NewCfgAsignacionPlacaSedeComponent.prototype.onEnviar = function () {
        var _this = this;
        sweetalert2_1.default({
            title: 'Un momento!',
            text: 'Generando placas...',
            onOpen: function () {
                sweetalert2_1.default.showLoading();
            }
        });
        var token = this._loginService.getToken();
        this.asignacion.sedeOperativa = this.sedeOperativaSelected;
        this.asignacion.cfgTipoVehiculo = this.tipoSelected;
        this.asignacion.moduloId = this.moduloSelected;
        this._CfgAsignacionPlacaSedeService.register(this.asignacion, token).subscribe(function (response) {
            if (response.status == 'success') {
                sweetalert2_1.default({
                    title: 'Perfecto!',
                    text: response.message,
                    type: 'success',
                    confirmButtonText: 'Aceptar'
                });
                _this.ready.emit(true);
            }
            else {
                sweetalert2_1.default({
                    title: 'Error!',
                    text: response.message,
                    type: 'error',
                    confirmButtonText: 'Aceptar'
                });
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
    NewCfgAsignacionPlacaSedeComponent.prototype.changedTipoVehiculo = function (e) {
        var _this = this;
        if (this.tipoSelected) {
            var token = this._loginService.getToken();
            this._CfgTipoVehiculoService.show({ 'id': this.tipoSelected }, token).subscribe(function (response) {
                if (response.status == 'success') {
                    _this.tipoVehiculo = response.data;
                }
            }, function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert("Error en la petición");
                }
            });
        }
    };
    return NewCfgAsignacionPlacaSedeComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewCfgAsignacionPlacaSedeComponent.prototype, "ready", void 0);
NewCfgAsignacionPlacaSedeComponent = __decorate([
    core_1.Component({
        selector: 'app-new',
        templateUrl: './new.component.html'
    }),
    __metadata("design:paramtypes", [login_service_1.LoginService,
        sedeOperativa_service_1.SedeOperativaService,
        cfgTipoVehiculo_service_1.CfgTipoVehiculoService,
        modulo_service_1.ModuloService,
        cfgAsignacionPlacaSede_service_1.CfgAsignacionPlacaSedeService])
], NewCfgAsignacionPlacaSedeComponent);
exports.NewCfgAsignacionPlacaSedeComponent = NewCfgAsignacionPlacaSedeComponent;
//# sourceMappingURL=new.component.js.map