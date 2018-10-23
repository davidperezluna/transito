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
var rnaInsumos_service_1 = require("../../../services/rnaInsumos.service");
var vehiculo_service_1 = require("../../../services/vehiculo.service");
var ciudadano_service_1 = require("../../../services/ciudadano.service");
var facturaInsumo_modelo_1 = require("./facturaInsumo.modelo");
var facturaInsumo_service_1 = require("../../../services/facturaInsumo.service");
var ciudadanoVehiculo_service_1 = require("../../../services/ciudadanoVehiculo.service");
var sweetalert2_1 = require("sweetalert2");
var NewRnaInsumoComponent = (function () {
    function NewRnaInsumoComponent(_RnaInsumoService, _TramiteSolicitudService, _loginService, _tramiteFacturaService, _VehiculoService, _CiudadanoService, _CiudadanoVehiculoService, _FacturaInsumoService) {
        this._RnaInsumoService = _RnaInsumoService;
        this._TramiteSolicitudService = _TramiteSolicitudService;
        this._loginService = _loginService;
        this._tramiteFacturaService = _tramiteFacturaService;
        this._VehiculoService = _VehiculoService;
        this._CiudadanoService = _CiudadanoService;
        this._CiudadanoVehiculoService = _CiudadanoVehiculoService;
        this._FacturaInsumoService = _FacturaInsumoService;
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
        this.FacturaInsumo = new facturaInsumo_modelo_1.FacturaInsumo(null, null, null, null, null);
    }
    NewRnaInsumoComponent.prototype.ngOnInit = function () {
    };
    NewRnaInsumoComponent.prototype.onKeyCiudadano = function () {
        var _this = this;
        var token = this._loginService.getToken();
        var identificacion = {
            'numeroIdentificacion': this.FacturaInsumo.ciudadanoId,
        };
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
    NewRnaInsumoComponent.prototype.enviarTramite = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this.datos.licenciaTransito = this.licenciaTransito;
        this.datos.cedula = this.ciudadanoPropietario.usuario.identificacion;
        this.datos.vehiculoId = this.factura.vehiculo.id;
        this.FacturaInsumo.entregado = this.tarjetaEntregada;
        this.FacturaInsumo.facturaId = this.factura.id;
        console.log(this.FacturaInsumo);
        this._CiudadanoVehiculoService.editLicenciaTransito(this.datos, token).subscribe(function (response) {
            _this.respuesta = response;
            if (_this.respuesta.status == 'success') {
                _this._FacturaInsumoService.register(_this.FacturaInsumo, token).subscribe(function (response) {
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
    NewRnaInsumoComponent.prototype.onCancelar = function () {
        this.cancelarTramite.emit(true);
    };
    NewRnaInsumoComponent.prototype.onKeyValidateInsumo = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this._RnaInsumoService.showNombre(token, this.numeroInsumo).subscribe(function (response) {
            if (response.status == 'success') {
                _this.FacturaInsumo.insumoId = response.data.id;
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
    NewRnaInsumoComponent.prototype.ready = function () {
        this.ciudadanoEncontrado = 3;
    };
    return NewRnaInsumoComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRnaInsumoComponent.prototype, "readyTramite", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRnaInsumoComponent.prototype, "cancelarTramite", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRnaInsumoComponent.prototype, "factura", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRnaInsumoComponent.prototype, "ciudadanoPropietario", void 0);
NewRnaInsumoComponent = __decorate([
    core_1.Component({
        selector: 'appRna-sustrato',
        templateUrl: './newRnaSustrato.html'
    }),
    __metadata("design:paramtypes", [rnaInsumos_service_1.RnaInsumoService,
        tramiteSolicitud_service_1.TramiteSolicitudService,
        login_service_1.LoginService,
        tramiteFactura_service_1.TramiteFacturaService,
        vehiculo_service_1.VehiculoService,
        ciudadano_service_1.CiudadanoService,
        ciudadanoVehiculo_service_1.CiudadanoVehiculoService,
        facturaInsumo_service_1.FacturaInsumoService])
], NewRnaInsumoComponent);
exports.NewRnaInsumoComponent = NewRnaInsumoComponent;
//# sourceMappingURL=newRnaSustrato.component.js.map