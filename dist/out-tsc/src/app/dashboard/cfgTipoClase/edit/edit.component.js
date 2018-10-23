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
var cfgTipoClase_service_1 = require("../../../services/cfgTipoClase.service");
var login_service_1 = require("../../../services/login.service");
var sweetalert2_1 = require("sweetalert2");
var clase_service_1 = require("../../../services/clase.service");
var cfgTipoVehiculo_service_1 = require("../../../services/cfgTipoVehiculo.service");
var EditComponent = (function () {
    function EditComponent(_TipoService, _loginService, _ClaseService, _TipoVehiculoService) {
        this._TipoService = _TipoService;
        this._loginService = _loginService;
        this._ClaseService = _ClaseService;
        this._TipoVehiculoService = _TipoVehiculoService;
        this.ready = new core_1.EventEmitter();
        this.tipo = null;
    }
    EditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._TipoVehiculoService.getTipoVehiculoSelect().subscribe(function (response) {
            _this.tiposVehiculo = response;
            setTimeout(function () {
                _this.tipoVehiculoSelected = [_this.tipo.tipoVehiculo.id];
            });
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._ClaseService.getClaseSelect().subscribe(function (response) {
            _this.clases = response;
            setTimeout(function () {
                _this.claseSelected = [_this.tipo.clase.id];
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
        this.tipo.tipoVehiculo = this.tipoVehiculoSelected;
        this.tipo.clase = this.claseSelected;
        this._TipoService.edit(this.tipo, token).subscribe(function (response) {
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
], EditComponent.prototype, "tipo", void 0);
EditComponent = __decorate([
    core_1.Component({
        selector: 'app-edit',
        templateUrl: './edit.component.html'
    }),
    __metadata("design:paramtypes", [cfgTipoClase_service_1.CfgTipoClaseService,
        login_service_1.LoginService,
        clase_service_1.ClaseService,
        cfgTipoVehiculo_service_1.CfgTipoVehiculoService])
], EditComponent);
exports.EditComponent = EditComponent;
//# sourceMappingURL=edit.component.js.map