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
var login_service_1 = require("../../../../services/login.service");
var sedeOperativa_service_1 = require("../../../../services/sedeOperativa.service");
var tramiteSolicitud_service_1 = require("../../../../services/tramiteSolicitud.service");
var tramiteTraslado_service_1 = require("../../../../services/tramiteTraslado.service");
var tramiteFactura_service_1 = require("../../../../services/tramiteFactura.service");
var vehiculo_service_1 = require("../../../../services/vehiculo.service");
var NewTrasladoComponent = (function () {
    function NewTrasladoComponent(_loginService, _TramiteSolicitudService, _TramiteTrasladoService, _tramiteFacturaService, _VehiculoService, _SedeOperativaService) {
        this._loginService = _loginService;
        this._TramiteSolicitudService = _TramiteSolicitudService;
        this._TramiteTrasladoService = _TramiteTrasladoService;
        this._tramiteFacturaService = _tramiteFacturaService;
        this._VehiculoService = _VehiculoService;
        this._SedeOperativaService = _SedeOperativaService;
        this.ready = new core_1.EventEmitter();
        this.readyTramite = new core_1.EventEmitter();
        this.vehiculo = null;
        this.tramiteTraslado = null;
        this.tramitesFactura = null;
        this.factura = null;
        this.tramiteRealizado = false;
        this.datos = null;
        this.resumen = {};
    }
    NewTrasladoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.datos = {
            'sedeOperativaIdNew': null,
            'sedeOperativaIdOld': null,
            'fechaSalida': null,
            'numeroRunt': null,
            'numeroGuia': null,
            'nombreEmpresa': null,
            'tramiteFormulario': null,
            'facturaId': null,
            'vehiculoId': null
        };
        this._SedeOperativaService.getSedeOperativaSelect().subscribe(function (response) {
            _this.sedes = response;
            console.log(_this.sedes);
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
        this.tramitesFactura.forEach(function (tramiteFactura) {
            if (tramiteFactura.realizado == 1) {
                if (tramiteFactura.tramitePrecio.tramite.id == 3) {
                    _this.tramiteRealizado = tramiteFactura;
                    console.log(_this.tramiteRealizado);
                }
            }
        });
        //consultar tramite solicitud con tramiterealizado.id
        var token = this._loginService.getToken();
        if (this.tramiteRealizado != false) {
            this._TramiteSolicitudService.showTramiteSolicitudByTamiteFactura(token, this.tramiteRealizado.id).subscribe(function (response) {
                _this.datos = response.data.datos;
                console.log(response.data.datos);
            }, function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert('Error en la petición');
                }
            });
        }
    };
    NewTrasladoComponent.prototype.onCancelar = function () {
        this.ready.emit(true);
    };
    NewTrasladoComponent.prototype.onEnviar = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this.vehiculo.sedeOperativaId = this.sedeOperativaSelected;
        this._VehiculoService.editSedeOperativaVehiculo(this.vehiculo, token).subscribe(function (response) {
            _this.respuesta = response;
            if (_this.respuesta.status == 'success') {
                _this.datos.sedeOperativaIdNew = _this.sedeOperativaSelected;
                _this.datos.sedeOperativaIdOld = _this.vehiculo.sedeOperativa.id;
                _this.datos.facturaId = _this.factura.id;
                _this.datos.tramiteFormulario = 'rnrs-traslado';
                _this.datos.sedeOperativaIdNew = _this.sedeOperativaSelected;
                _this.datos.vehiculoId = _this.vehiculo.id;
                _this.datos.numeroGuia = _this.numeroGuia;
                _this.datos.numeroRunt = _this.numeroRunt;
                _this.datos.fechaSalida = _this.fechaSalida;
                _this.datos.nombreEmpresa = _this.nombreEmpresa;
                _this._TramiteTrasladoService.register(_this.datos, token).subscribe(function (response) {
                    _this.respuesta = response;
                    if (_this.respuesta.status == 'success') {
                        _this.readyTramite.emit({ 'foraneas': _this.datos, 'resumen': _this.resumen });
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
            (function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert("Error en la petición");
                }
            });
        });
    };
    return NewTrasladoComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewTrasladoComponent.prototype, "ready", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewTrasladoComponent.prototype, "readyTramite", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewTrasladoComponent.prototype, "vehiculo", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewTrasladoComponent.prototype, "tramiteTraslado", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewTrasladoComponent.prototype, "tramitesFactura", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewTrasladoComponent.prototype, "factura", void 0);
NewTrasladoComponent = __decorate([
    core_1.Component({
        selector: 'appRnrs-traslado',
        templateUrl: './newRnrsTraslado.component.html'
    }),
    __metadata("design:paramtypes", [login_service_1.LoginService,
        tramiteSolicitud_service_1.TramiteSolicitudService,
        tramiteTraslado_service_1.TramiteTrasladoService,
        tramiteFactura_service_1.TramiteFacturaService,
        vehiculo_service_1.VehiculoService,
        sedeOperativa_service_1.SedeOperativaService])
], NewTrasladoComponent);
exports.NewTrasladoComponent = NewTrasladoComponent;
//# sourceMappingURL=newRnrsTraslado.component.js.map