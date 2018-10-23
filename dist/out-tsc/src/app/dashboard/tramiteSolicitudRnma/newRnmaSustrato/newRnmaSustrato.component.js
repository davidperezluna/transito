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
var tramiteSolicitud_service_1 = require("../../../services/tramiteSolicitud.service");
var tramiteFactura_service_1 = require("../../../services/tramiteFactura.service");
var login_service_1 = require("../../../services/login.service");
var sustrato_service_1 = require("../../../services/sustrato.service");
var vehiculo_service_1 = require("../../../services/vehiculo.service");
var ciudadano_service_1 = require("../../../services/ciudadano.service");
var sustrato_modelo_1 = require("../../sustrato/sustrato.modelo");
var ciudadanoVehiculo_service_1 = require("../../../services/ciudadanoVehiculo.service");
var sweetalert2_1 = require("sweetalert2");
var NewRnmaSustratoComponent = (function () {
    function NewRnmaSustratoComponent(_SustratoService, _TramiteSolicitudService, _loginService, _tramiteFacturaService, _VehiculoService, _CiudadanoService, _CiudadanoVehiculoService) {
        this._SustratoService = _SustratoService;
        this._TramiteSolicitudService = _TramiteSolicitudService;
        this._loginService = _loginService;
        this._tramiteFacturaService = _tramiteFacturaService;
        this._VehiculoService = _VehiculoService;
        this._CiudadanoService = _CiudadanoService;
        this._CiudadanoVehiculoService = _CiudadanoVehiculoService;
        this.readyTramite = new core_1.EventEmitter();
        this.cancelarTramite = new core_1.EventEmitter();
        this.factura = null;
        this.ciudadanoPropietario = null;
        this.estadoImpresion = true;
        this.tarjetaEntregada = true;
        this.ciudadanoNew = false;
        this.isError = false;
        this.isExist = false;
        this.ciudadanoEncontrado = 1;
        this.resumen = {};
        this.datos = {
            'cedula': 0,
            'licenciaTransito': "",
            'vehiculoId': ""
        };
        this.sustrato = new sustrato_modelo_1.Sustrato(null, null, null, null, null, null, null, null, null, null, null, null);
    }
    NewRnmaSustratoComponent.prototype.ngOnInit = function () {
    };
    NewRnmaSustratoComponent.prototype.onKeyCiudadano = function () {
        var _this = this;
        var token = this._loginService.getToken();
        var identificacion = {
            'numeroIdentificacion': this.sustrato.ciudadanoId,
        };
        console.log(this.tarjetaEntregada);
        this._CiudadanoService.searchByIdentificacion(token, identificacion).subscribe(function (response) {
            _this.respuesta = response;
            if (_this.respuesta.status == 'success') {
                _this.ciudadano = _this.respuesta.data;
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
    NewRnmaSustratoComponent.prototype.enviarTramite = function () {
        var _this = this;
        var token = this._loginService.getToken();
        console.log(this.factura);
        console.log(this.datos);
        this.datos.licenciaTransito = this.licenciaTransito;
        this.datos.cedula = this.ciudadanoPropietario.usuario.identificacion;
        this.datos.vehiculoId = this.factura.vehiculo.id;
        // this.sustrato.impresion = this.licenciato;
        this.sustrato.entregado = this.tarjetaEntregada;
        this.sustrato.facturaId = this.factura.id;
        // this.ciudadanoPropietario.licenciaTransito = this.datos.vehiculoId;
        // if (this.sustrato.impresion) {
        //    this.sustrato.estado = 'Utilizado' 
        // }else{
        //    this.sustrato.estado = 'Dañado'    
        // }
        // console.log(this.identificacion);
        this._CiudadanoVehiculoService.editLicenciaTransito(this.datos, token).subscribe(function (response) {
            _this.respuesta = response;
            console.log(_this.respuesta);
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
        console.log(this.licenciaTransito);
        this._SustratoService.editSustrato(this.sustrato, token).subscribe(function (response) {
            if (response.status == 'success') {
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
        console.log(this.sustrato);
    };
    NewRnmaSustratoComponent.prototype.onCancelar = function () {
        this.cancelarTramite.emit(true);
    };
    NewRnmaSustratoComponent.prototype.onKeyValidateSustrato = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this._SustratoService.showNombreSustrato(token, this.sustrato.consecutivo).subscribe(function (response) {
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
    NewRnmaSustratoComponent.prototype.ready = function () {
        this.ciudadanoEncontrado === 3;
    };
    return NewRnmaSustratoComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRnmaSustratoComponent.prototype, "readyTramite", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRnmaSustratoComponent.prototype, "cancelarTramite", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRnmaSustratoComponent.prototype, "factura", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRnmaSustratoComponent.prototype, "ciudadanoPropietario", void 0);
NewRnmaSustratoComponent = __decorate([
    core_1.Component({
        selector: 'appRnma-sustrato',
        templateUrl: './newRnmaSustrato.html'
    }),
    __metadata("design:paramtypes", [sustrato_service_1.SustratoService,
        tramiteSolicitud_service_1.TramiteSolicitudService,
        login_service_1.LoginService,
        tramiteFactura_service_1.TramiteFacturaService,
        vehiculo_service_1.VehiculoService,
        ciudadano_service_1.CiudadanoService,
        ciudadanoVehiculo_service_1.CiudadanoVehiculoService])
], NewRnmaSustratoComponent);
exports.NewRnmaSustratoComponent = NewRnmaSustratoComponent;
//# sourceMappingURL=newRnmaSustrato.component.js.map