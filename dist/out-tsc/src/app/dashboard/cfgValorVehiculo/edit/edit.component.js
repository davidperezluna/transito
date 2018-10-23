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
var cfgValorVehiculo_service_1 = require("../../../services/cfgValorVehiculo.service");
var login_service_1 = require("../../../services/login.service");
var clase_service_1 = require("../../../services/clase.service");
var sedeOperativa_service_1 = require("../../../services/sedeOperativa.service");
var marca_service_1 = require("../../../services/marca.service");
var linea_service_1 = require("../../../services/linea.service");
var sweetalert2_1 = require("sweetalert2");
var EditComponent = (function () {
    // public tipoIdentificacion: Array<any>
    function EditComponent(_CfgValorVehiculoService, _loginService, _claseService, _sedeOperativaService, _MarcaService, _lineaService) {
        this._CfgValorVehiculoService = _CfgValorVehiculoService;
        this._loginService = _loginService;
        this._claseService = _claseService;
        this._sedeOperativaService = _sedeOperativaService;
        this._MarcaService = _MarcaService;
        this._lineaService = _lineaService;
        this.ready = new core_1.EventEmitter();
        this.cfgValorVehiculo = null;
        //   this.tipoIdentificacion = [
        //     {value: 'CC', label: 'Cédula de ciudadanía'},
        //     {value: 'TE', label: 'Tarjeta de extranjería'},
        //     {value: 'CE', label: 'Cédula de extranjería'},
        //     {value: 'P', label: 'Pasaporte'},
        // ];
    }
    EditComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log(this.cfgValorVehiculo);
        this._lineaService.index().subscribe(function (response) {
            _this.lineas = response;
            setTimeout(function () {
                _this.lineaSelected = [_this.cfgValorVehiculo.linea.id];
                _this._MarcaService.getMarcaSelect().subscribe(function (response) {
                    _this.marcas = response;
                    setTimeout(function () {
                        _this.marcaSelected = [_this.cfgValorVehiculo.linea.marca.id];
                    });
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert("Error en la petición");
                    }
                });
            });
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._claseService.getClaseSelect().subscribe(function (response) {
            _this.clases = response;
            setTimeout(function () {
                _this.claseSelected = [_this.cfgValorVehiculo.clase.id];
            });
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
    };
    EditComponent.prototype.onCancelar = function () {
        this.ready.emit(true);
    };
    EditComponent.prototype.onEnviar = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this.cfgValorVehiculo.claseId = this.claseSelected;
        this.cfgValorVehiculo.lineaId = this.lineaSelected;
        this._CfgValorVehiculoService.editCfgValorVehiculo(this.cfgValorVehiculo, token).subscribe(function (response) {
            _this.respuesta = response;
            if (_this.respuesta.status == 'success') {
                _this.ready.emit(true);
                sweetalert2_1.default({
                    title: 'Perfecto!',
                    text: 'El registro se ha modificado con exito',
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
    EditComponent.prototype.changedDepartamento = function (e) {
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
    return EditComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], EditComponent.prototype, "ready", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], EditComponent.prototype, "cfgValorVehiculo", void 0);
EditComponent = __decorate([
    core_1.Component({
        selector: 'app-edit',
        templateUrl: './edit.component.html'
    }),
    __metadata("design:paramtypes", [cfgValorVehiculo_service_1.CfgValorVehiculoService,
        login_service_1.LoginService,
        clase_service_1.ClaseService,
        sedeOperativa_service_1.SedeOperativaService,
        marca_service_1.MarcaService,
        linea_service_1.LineaService])
], EditComponent);
exports.EditComponent = EditComponent;
//# sourceMappingURL=edit.component.js.map