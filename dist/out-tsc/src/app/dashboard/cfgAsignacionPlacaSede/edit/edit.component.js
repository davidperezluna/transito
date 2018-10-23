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
var cfgAsignacionPlacaSede_service_1 = require("../../../services/cfgAsignacionPlacaSede.service");
var login_service_1 = require("../../../services/login.service");
var sweetalert2_1 = require("sweetalert2");
var sedeOperativa_service_1 = require("../../../services/sedeOperativa.service");
var cfgTipoVehiculo_service_1 = require("../../../services/cfgTipoVehiculo.service");
var modulo_service_1 = require("../../../services/modulo.service");
var EditComponent = (function () {
    function EditComponent(_CfgAsignacionPlacaSedeService, _loginService, _SedeOperativaService, _ModuloService, _TipoVehiculo) {
        this._CfgAsignacionPlacaSedeService = _CfgAsignacionPlacaSedeService;
        this._loginService = _loginService;
        this._SedeOperativaService = _SedeOperativaService;
        this._ModuloService = _ModuloService;
        this._TipoVehiculo = _TipoVehiculo;
        this.ready = new core_1.EventEmitter();
        this.asignacion = null;
    }
    EditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._SedeOperativaService.getSedeOperativaSelect().subscribe(function (response) {
            _this.sedesOperativas = response;
            setTimeout(function () {
                _this.sedeOperativaSelected = [_this.asignacion.sedeOperativa.id];
            });
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._ModuloService.getModuloSelect().subscribe(function (response) {
            _this.modulos = response;
            setTimeout(function () {
                _this.moduloSelected = [_this.asignacion.modulo.id];
            });
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._TipoVehiculo.getTipoVehiculoSelect().subscribe(function (response) {
            _this.tiposVehiculos = response;
            setTimeout(function () {
                _this.tipoVehiculoSelected = [_this.asignacion.tipoVehiculo.id];
            });
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
    };
    EditComponent.prototype.onCancelar = function () { this.ready.emit(true); };
    EditComponent.prototype.onEnviar = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this.asignacion.sedeOperativa = this.sedeOperativaSelected;
        this.asignacion.modulo = this.moduloSelected;
        this.asignacion.tipoVehiculo = this.tipoVehiculoSelected;
        this._CfgAsignacionPlacaSedeService.edit(this.asignacion, token).subscribe(function (response) {
            if (response.status == 'success') {
                _this.ready.emit(true);
                sweetalert2_1.default({
                    title: 'Perfecto!',
                    text: response.message,
                    type: 'success',
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
    return EditComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], EditComponent.prototype, "ready", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], EditComponent.prototype, "asignacion", void 0);
EditComponent = __decorate([
    core_1.Component({
        selector: 'app-edit',
        templateUrl: './edit.component.html'
    }),
    __metadata("design:paramtypes", [cfgAsignacionPlacaSede_service_1.CfgAsignacionPlacaSedeService,
        login_service_1.LoginService,
        sedeOperativa_service_1.SedeOperativaService,
        modulo_service_1.ModuloService,
        cfgTipoVehiculo_service_1.CfgTipoVehiculoService])
], EditComponent);
exports.EditComponent = EditComponent;
//# sourceMappingURL=edit.component.js.map