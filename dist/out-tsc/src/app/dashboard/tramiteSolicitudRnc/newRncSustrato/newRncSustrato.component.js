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
var login_service_1 = require("../../../services/login.service");
var sustrato_service_1 = require("../../../services/sustrato.service");
var ciudadano_service_1 = require("../../../services/ciudadano.service");
var ciudadanoVehiculo_service_1 = require("../../../services/ciudadanoVehiculo.service");
var sweetalert2_1 = require("sweetalert2");
var NewRncSustratoComponent = (function () {
    function NewRncSustratoComponent(_SustratoService, _loginService, _CiudadanoService, _CiudadanoVehiculoService) {
        this._SustratoService = _SustratoService;
        this._loginService = _loginService;
        this._CiudadanoService = _CiudadanoService;
        this._CiudadanoVehiculoService = _CiudadanoVehiculoService;
        this.readyTramite = new core_1.EventEmitter();
        this.cancelarTramite = new core_1.EventEmitter();
        this.factura = null;
        this.solicitante = null;
        this.estadoImpresion = true;
        this.tarjetaEntregada = true;
        this.ciudadanoNew = false;
        this.isError = false;
        this.isExist = false;
        this.ciudadanoEncontrado = 1;
        this.resumen = {};
        this.datos = {
            'solicitante': null,
            'cedula': null,
            'licenciaConduccion': null,
            'entregada': null,
            'sustrato': null,
            'solicitanteId': null,
            'vehiculoId': null,
            'facturaId': null,
        };
    }
    NewRncSustratoComponent.prototype.ngOnInit = function () {
    };
    NewRncSustratoComponent.prototype.onKeyCiudadano = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this._CiudadanoService.searchByIdentificacion(token, { 'numeroIdentificacion': this.datos.cedula }).subscribe(function (response) {
            _this.respuesta = response;
            if (_this.respuesta.status == 'success') {
                _this.usuario = _this.respuesta.data;
                _this.datos.solicitante = _this.usuario.primerNombre + ' ' + _this.usuario.primerApellido;
                _this.datos.solicitanteId = _this.usuario.ciudadano.id;
                _this.ciudadanoEncontrado = 2;
                _this.ciudadanoNew = false;
            }
            else {
                _this.ciudadanoEncontrado = 3;
                _this.ciudadanoNew = true;
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
    NewRncSustratoComponent.prototype.enviarTramite = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this.datos.entregada = this.tarjetaEntregada;
        this.datos.facturaId = this.factura.id;
        // if (this.sustrato.impresion) {
        //    this.sustrato.estado = 'Utilizado' 
        // }else{
        //    this.sustrato.estado = 'Dañado'    
        // }
        // console.log(this.identificacion);
        this._CiudadanoVehiculoService.editLicenciaTransito(this.datos, token).subscribe(function (response) {
            _this.respuesta = response;
            if (_this.respuesta.status == 'success') {
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
        this._SustratoService.editEstado(this.sustrato, token).subscribe(function (response) {
            if (response.status == 'success') {
                console.log(response);
                sweetalert2_1.default({
                    title: 'Perfecto!',
                    text: 'Registro exitoso!',
                    type: 'success',
                    confirmButtonText: 'Aceptar'
                });
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
    };
    NewRncSustratoComponent.prototype.onCancelar = function () {
        this.cancelarTramite.emit(true);
    };
    NewRncSustratoComponent.prototype.onKeyValidateSustrato = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this._SustratoService.showNombreSustrato(token, this.datos.sustrato).subscribe(function (response) {
            if (response.status == 'success') {
                _this.sustrato = response.data;
                _this.isExist = true;
                _this.isError = false;
            }
            else {
                _this.isError = true;
                _this.isExist = false;
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
    };
    NewRncSustratoComponent.prototype.ready = function () {
        this.ciudadanoEncontrado === 3;
    };
    return NewRncSustratoComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRncSustratoComponent.prototype, "readyTramite", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRncSustratoComponent.prototype, "cancelarTramite", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRncSustratoComponent.prototype, "factura", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRncSustratoComponent.prototype, "solicitante", void 0);
NewRncSustratoComponent = __decorate([
    core_1.Component({
        selector: 'appRnc-sustrato',
        templateUrl: './newRncSustrato.html'
    }),
    __metadata("design:paramtypes", [sustrato_service_1.SustratoService,
        login_service_1.LoginService,
        ciudadano_service_1.CiudadanoService,
        ciudadanoVehiculo_service_1.CiudadanoVehiculoService])
], NewRncSustratoComponent);
exports.NewRncSustratoComponent = NewRncSustratoComponent;
//# sourceMappingURL=newRncSustrato.component.js.map