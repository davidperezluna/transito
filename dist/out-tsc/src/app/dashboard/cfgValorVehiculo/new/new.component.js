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
var cfgValorVehiculo_modelo_1 = require("../cfgValorVehiculo.modelo");
var cfgValorVehiculo_service_1 = require("../../../services/cfgValorVehiculo.service");
var login_service_1 = require("../../../services/login.service");
var clase_service_1 = require("../../../services/clase.service");
var marca_service_1 = require("../../../services/marca.service");
var linea_service_1 = require("../../../services/linea.service");
var sweetalert2_1 = require("sweetalert2");
var NewComponent = (function () {
    function NewComponent(_CfgValorVehiculoService, _loginService, _claseService, _MarcaService, _lineaService) {
        this._CfgValorVehiculoService = _CfgValorVehiculoService;
        this._loginService = _loginService;
        this._claseService = _claseService;
        this._MarcaService = _MarcaService;
        this._lineaService = _lineaService;
        this.ready = new core_1.EventEmitter();
    }
    NewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.cfgValorVehiculo = new cfgValorVehiculo_modelo_1.CfgValorVehiculo(null, null, null, null, null);
        this._claseService.getClaseSelect().subscribe(function (response) {
            _this.clases = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._MarcaService.getMarcaSelect().subscribe(function (response) {
            _this.marcas = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
    };
    NewComponent.prototype.onCancelar = function () {
        this.ready.emit(true);
    };
    NewComponent.prototype.onEnviar = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this.cfgValorVehiculo.claseId = this.claseSelected;
        this.cfgValorVehiculo.lineaId = this.lineaSelected;
        this._CfgValorVehiculoService.register(this.cfgValorVehiculo, token).subscribe(function (response) {
            _this.respuesta = response;
            console.log(_this.respuesta);
            if (_this.respuesta.status == 'success') {
                _this.ready.emit(true);
                sweetalert2_1.default({
                    title: 'Perfecto!',
                    text: 'Registro exitoso!',
                    type: 'success',
                    confirmButtonText: 'Aceptar'
                });
            }
            else {
                sweetalert2_1.default({
                    title: 'Error!',
                    text: 'La placa ya se encuentra registrado',
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
    NewComponent.prototype.changedDepartamento = function (e) {
        var _this = this;
        if (this.marcaSelected) {
            var token = this._loginService.getToken();
            this._lineaService.searchByMarcaSelect(this.marcaSelected, token).subscribe(function (response) {
                console.log(response.data[0]);
                if (response.data[0] != null) {
                    _this.lineas = response.data;
                }
                else {
                    _this.lineas = [];
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
    return NewComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewComponent.prototype, "ready", void 0);
NewComponent = __decorate([
    core_1.Component({
        selector: 'app-new',
        templateUrl: './new.component.html'
    }),
    __metadata("design:paramtypes", [cfgValorVehiculo_service_1.CfgValorVehiculoService,
        login_service_1.LoginService,
        clase_service_1.ClaseService,
        marca_service_1.MarcaService,
        linea_service_1.LineaService])
], NewComponent);
exports.NewComponent = NewComponent;
//# sourceMappingURL=new.component.js.map