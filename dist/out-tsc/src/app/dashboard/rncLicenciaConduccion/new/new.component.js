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
var rncLicenciaConduccion_modelo_1 = require("../rncLicenciaConduccion.modelo");
var rncLicenciaConduccion_service_1 = require("../../../services/rncLicenciaConduccion.service");
var tipoIdentificacion_service_1 = require("../../../services/tipoIdentificacion.service");
var sedeOperativa_service_1 = require("../../../services/sedeOperativa.service");
var login_service_1 = require("../../../services/login.service");
var sweetalert2_1 = require("sweetalert2");
var NewComponent = (function () {
    function NewComponent(_LicenciaConduccionService, _TipoIdentificacionService, _SedeOperativaService, _loginService) {
        this._LicenciaConduccionService = _LicenciaConduccionService;
        this._TipoIdentificacionService = _TipoIdentificacionService;
        this._SedeOperativaService = _SedeOperativaService;
        this._loginService = _loginService;
        this.ready = new core_1.EventEmitter();
        this.formConfirm = false;
        this.formPdf = false;
        this.respuesta = null;
    }
    NewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.funcionario = new rncLicenciaConduccion_modelo_1.RncLicenciaConduccion(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
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
        if (this.funcionario.activo == 'true') {
            this._LicenciaConduccionService.register(this.funcionario, token).subscribe(function (response) {
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
            this._LicenciaConduccionService.register(this.funcionario, token).subscribe(function (response) {
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
        var token = this._loginService.getToken();
        var datos = {
            'identificacion': this.funcionario.identificacion
        };
        /*this._LicenciaConduccionService.searchCiudadano(datos,token).subscribe(
          response => {
            this.respuesta = response;
            if(this.respuesta.status == 'success'){
              this.primerNombre = response.data.usuario.primerNombre;
              this.segundoNombre = response.data.usuario.segundoNombre;
              this.primerApellido = response.data.usuario.primerApellido;
              this.segundoApellido = response.data.usuario.segundoApellido;
            }
          error => {
              this.errorMessage = <any>error;
              if(this.errorMessage != null){
                console.log(this.errorMessage);
                alert('Error en la petición');
              }
            }
        });*/
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
    __metadata("design:paramtypes", [rncLicenciaConduccion_service_1.RncLicenciaConduccionService,
        tipoIdentificacion_service_1.TipoIdentificacionService,
        sedeOperativa_service_1.SedeOperativaService,
        login_service_1.LoginService])
], NewComponent);
exports.NewComponent = NewComponent;
//# sourceMappingURL=new.component.js.map