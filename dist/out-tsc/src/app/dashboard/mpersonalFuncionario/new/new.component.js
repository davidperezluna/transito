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
var mpersonalFuncionario_modelo_1 = require("../mpersonalFuncionario.modelo");
var mpersonalFuncionario_service_1 = require("../../../services/mpersonalFuncionario.service");
var mpersonalTipoContrato_service_1 = require("../../../services/mpersonalTipoContrato.service");
var cfgCargo_service_1 = require("../../../services/cfgCargo.service");
var tipoIdentificacion_service_1 = require("../../../services/tipoIdentificacion.service");
var sedeOperativa_service_1 = require("../../../services/sedeOperativa.service");
var login_service_1 = require("../../../services/login.service");
var sweetalert2_1 = require("sweetalert2");
var NewComponent = (function () {
    function NewComponent(_FuncionarioService, _TipoContratoService, _CargoService, _TipoIdentificacionService, _SedeOperativaService, _loginService, router) {
        this._FuncionarioService = _FuncionarioService;
        this._TipoContratoService = _TipoContratoService;
        this._CargoService = _CargoService;
        this._TipoIdentificacionService = _TipoIdentificacionService;
        this._SedeOperativaService = _SedeOperativaService;
        this._loginService = _loginService;
        this.router = router;
        this.ready = new core_1.EventEmitter();
        this.formConfirm = false;
        this.formPdf = false;
        this.respuesta = null;
    }
    NewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.funcionario = new mpersonalFuncionario_modelo_1.MpersonalFuncionario(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
        this._TipoContratoService.select().subscribe(function (response) {
            _this.tiposContrato = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
        this._CargoService.select().subscribe(function (response) {
            _this.cargos = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
        this._TipoIdentificacionService.getTipoIdentificacionSelect().subscribe(function (response) {
            _this.tiposIdentificacion = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
        this._SedeOperativaService.getSedeOperativaSelect().subscribe(function (response) {
            _this.sedesOperativas = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
    };
    NewComponent.prototype.onCancelar = function () {
        this.ready.emit(true);
    };
    NewComponent.prototype.onCancelarConfirm = function () {
        this.formConfirm = false;
    };
    NewComponent.prototype.onEnviar = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this.funcionario.sedeOperativaId = this.sedeOperativaSelected;
        this.funcionario.tipoContratoId = this.tipoContratoSelected;
        this.funcionario.cargoId = this.cargoSelected;
        if (this.funcionario.activo == 'true') {
            this._FuncionarioService.register(this.funcionario, token).subscribe(function (response) {
                _this.respuesta = response;
                _this.formConfirm = false;
                _this.formPdf = true;
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
                        text: 'El funcionario ya se encuentra registrado',
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
        }
        else {
            this.formConfirm = true;
            this.formPdf = false;
        }
    };
    NewComponent.prototype.onConfirm = function () {
        var _this = this;
        var token = this._loginService.getToken();
        if (this.funcionario.inhabilidad == 'true') {
            this._FuncionarioService.register(this.funcionario, token).subscribe(function (response) {
                _this.respuesta = response;
                _this.formConfirm = false;
                _this.formPdf = true;
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
                        text: 'El funcionario ya se encuentra registrado',
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
        }
        else {
            this.formConfirm = false;
            this.formPdf = false;
        }
    };
    NewComponent.prototype.onSearch = function () {
        var _this = this;
        var token = this._loginService.getToken();
        var datos = {
            'identificacion': this.funcionario.identificacion
        };
        this._FuncionarioService.searchCiudadano(datos, token).subscribe(function (response) {
            if (response.status == 'success') {
                _this.primerNombre = response.data.usuario.primerNombre;
                _this.segundoNombre = response.data.usuario.segundoNombre;
                _this.primerApellido = response.data.usuario.primerApellido;
                _this.segundoApellido = response.data.usuario.segundoApellido;
            }
            else {
                sweetalert2_1.default({
                    title: 'Alerta',
                    text: response.message,
                    type: 'warning',
                    showCancelButton: true,
                    focusConfirm: true,
                    confirmButtonText: '<i class="fa fa-thumbs-up"></i> Registrar',
                    confirmButtonAriaLabel: 'Thumbs up, great!',
                    cancelButtonText: '<i class="fa fa-thumbs-down"></i> Cancelar',
                    cancelButtonAriaLabel: 'Thumbs down',
                }).then(function (result) {
                    if (result.value) {
                        _this.router.navigate(['/dashboard/ciudadano']);
                    }
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
    __metadata("design:paramtypes", [mpersonalFuncionario_service_1.MpersonalFuncionarioService,
        mpersonalTipoContrato_service_1.MpersonalTipoContratoService,
        cfgCargo_service_1.CfgCargoService,
        tipoIdentificacion_service_1.TipoIdentificacionService,
        sedeOperativa_service_1.SedeOperativaService,
        login_service_1.LoginService,
        router_1.Router])
], NewComponent);
exports.NewComponent = NewComponent;
//# sourceMappingURL=new.component.js.map