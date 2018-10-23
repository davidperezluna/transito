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
var tramiteSolicitudRnc_modelo_1 = require("../tramiteSolicitudRnc.modelo");
var tramiteSolicitudRnc_service_1 = require("../../../services/tramiteSolicitudRnc.service");
var tramiteFactura_service_1 = require("../../../services/tramiteFactura.service");
var ciudadanoVehiculo_service_1 = require("../../../services/ciudadanoVehiculo.service");
var ciudadano_service_1 = require("../../../services/ciudadano.service");
var factura_service_1 = require("../../../services/factura.service");
var login_service_1 = require("../../../services/login.service");
var sweetalert2_1 = require("sweetalert2");
var NewRncComponent = (function () {
    function NewRncComponent(_TramiteSolicitudRncService, _loginService, _TramiteFacturaService, _FacturaService, _ciudadanoVehiculoService, _ciudadanoService) {
        this._TramiteSolicitudRncService = _TramiteSolicitudRncService;
        this._loginService = _loginService;
        this._TramiteFacturaService = _TramiteFacturaService;
        this._FacturaService = _FacturaService;
        this._ciudadanoVehiculoService = _ciudadanoVehiculoService;
        this._ciudadanoService = _ciudadanoService;
        this.ready = new core_1.EventEmitter();
        this.solicitante = null;
        this.tramitesFactura = null;
        this.isPagada = false;
        this.tipoError = 200;
        this.error = false;
        this.msj = '';
        this.tramites = '';
        this.tramitePreasignacion = false;
        this.tramiteMatriculaInicial = false;
        this.tramite = false;
        this.sustrato = false;
        this.isTramites = true;
        this.isMatricula = false;
        this.cantidadSustrato = 1;
    }
    NewRncComponent.prototype.ngOnInit = function () {
        this.tramiteSolicitud = new tramiteSolicitudRnc_modelo_1.TramiteSolicitudRnc(null, null, null, null, null, null, null);
    };
    NewRncComponent.prototype.onCancelar = function () {
        this.ready.emit(true);
    };
    NewRncComponent.prototype.onSearchFactura = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this._FacturaService.searchByNumero(token, { 'numeroFactura': this.numeroFactura }).subscribe(function (response) {
            if (response.status == 'success') {
                _this.factura = response.data;
                sweetalert2_1.default({
                    title: 'Perfecto',
                    text: "¡Factura pagada!",
                    type: 'info',
                });
                _this._TramiteFacturaService.getTramitesByFacturaSelect(_this.factura.id).subscribe(function (response) {
                    var active = true;
                    _this.tramitesFactura = response;
                    _this.tramitesFactura.forEach(function (tramiteFactura) {
                        if (tramiteFactura.realizado == 0) {
                            active = false;
                        }
                        else {
                        }
                        if (tramiteFactura.tramitePrecio.tramite.sustrato) {
                            _this.sustrato = true;
                        }
                    });
                    if (active) {
                        _this.isTramites = false;
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
                sweetalert2_1.default({
                    title: 'Alerta',
                    text: "¡Factura pendiente de pago!",
                    type: 'warning',
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
    NewRncComponent.prototype.onEnviar = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this.tramiteSolicitud.tramiteFacturaId = this.tramiteFacturaSelected;
        this._TramiteSolicitudRncService.register(this.tramiteSolicitud, token).subscribe(function (response) {
            _this.respuesta = response;
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
                    text: 'El tramiteSolicitud ' + +' ya se encuentra registrada',
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
    NewRncComponent.prototype.readyTramite = function (datos) {
        var _this = this;
        this.tramitesFactura.forEach(function (tramiteFactura) {
            if (tramiteFactura.tramitePrecio.tramite.id == datos.tramiteFactura) {
                _this.tramiteSolicitud.tramiteFacturaId = tramiteFactura.id;
            }
        });
        this.tramiteSolicitud.datos = datos;
        var token = this._loginService.getToken();
        this._TramiteSolicitudRncService.register(this.tramiteSolicitud, token).subscribe(function (response) {
            _this.respuesta = response;
            console.log(_this.respuesta);
            if (_this.respuesta.status == 'success') {
                sweetalert2_1.default({
                    title: 'Perfecto!',
                    text: 'Registro exitoso!',
                    type: 'success',
                    confirmButtonText: 'Aceptar'
                });
                _this.error = false;
            }
            else {
                sweetalert2_1.default({
                    title: 'Error!',
                    text: 'El tramiteSolicitud ' + +' ya se encuentra registrada',
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
    NewRncComponent.prototype.cancelarTramite = function () {
        this.tramiteSelected = false;
        this.error = false;
    };
    NewRncComponent.prototype.finalizarSolicitud = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this.tramites = '';
        this.tramitesFactura.forEach(function (tramiteFactura) {
            _this.tramites = _this.tramites + tramiteFactura.tramitePrecio.nombre + '<br>';
        });
        var html = 'Se va a enviar la siguiente solicitud:<br>' +
            'Factura: <b>' + this.factura.numero + '</b><br>' +
            'Solicitante: <b>' + this.solicitante.usuario.identificacion + '</b><hr>' +
            'Tramites:<br>' +
            this.tramites;
        sweetalert2_1.default({
            title: 'Resumen',
            type: 'warning',
            html: html,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: '<i class="fa fa-thumbs-up"></i> Aceptar!',
            confirmButtonAriaLabel: 'Thumbs up, great!',
            cancelButtonText: '<i class="fa fa-thumbs-down"></i> Cancelar',
            cancelButtonAriaLabel: 'Thumbs down',
        }).then(function (result) {
            if (result.value) {
                _this.factura.estado = 'Finalizada';
                _this.factura.sedeOperativaId = _this.factura.sedeOperativa.id;
                _this._FacturaService.editFactura(_this.factura, token).subscribe(function (response) {
                    (function (error) {
                        _this.errorMessage = error;
                        if (_this.errorMessage != null) {
                            console.log(_this.errorMessage);
                            alert("Error en la petición");
                        }
                    });
                });
            }
            else if (
            // Read more about handling dismissals
            result.dismiss === sweetalert2_1.default.DismissReason.cancel) {
            }
        });
    };
    return NewRncComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRncComponent.prototype, "ready", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRncComponent.prototype, "solicitante", void 0);
NewRncComponent = __decorate([
    core_1.Component({
        selector: 'app-new',
        templateUrl: './newRnc.component.html'
    }),
    __metadata("design:paramtypes", [tramiteSolicitudRnc_service_1.TramiteSolicitudRncService,
        login_service_1.LoginService,
        tramiteFactura_service_1.TramiteFacturaService,
        factura_service_1.FacturaService,
        ciudadanoVehiculo_service_1.CiudadanoVehiculoService,
        ciudadano_service_1.CiudadanoService])
], NewRncComponent);
exports.NewRncComponent = NewRncComponent;
//# sourceMappingURL=newRnc.component.js.map