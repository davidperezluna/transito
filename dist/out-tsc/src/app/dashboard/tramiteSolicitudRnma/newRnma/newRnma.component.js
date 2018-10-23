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
var tramiteSolicitudRnma_modelo_1 = require("../tramiteSolicitudRnma.modelo");
var vehiculo_modelo_1 = require("../../vehiculo/vehiculo.modelo");
var tramiteSolicitud_service_1 = require("../../../services/tramiteSolicitud.service");
var tramiteFactura_service_1 = require("../../../services/tramiteFactura.service");
var ciudadanoVehiculo_service_1 = require("../../../services/ciudadanoVehiculo.service");
var ciudadano_service_1 = require("../../../services/ciudadano.service");
var factura_service_1 = require("../../../services/factura.service");
var login_service_1 = require("../../../services/login.service");
var sweetalert2_1 = require("sweetalert2");
var NewRnmaComponent = (function () {
    function NewRnmaComponent(_TramiteSolicitudService, _loginService, _tramiteFacturaService, _facturaService, _ciudadanoVehiculoService, _ciudadanoService) {
        this._TramiteSolicitudService = _TramiteSolicitudService;
        this._loginService = _loginService;
        this._tramiteFacturaService = _tramiteFacturaService;
        this._facturaService = _facturaService;
        this._ciudadanoVehiculoService = _ciudadanoVehiculoService;
        this._ciudadanoService = _ciudadanoService;
        this.ready = new core_1.EventEmitter();
        this.isPagada = false;
        this.mensaje = '';
        this.isError = false;
        this.ciudadanosVehiculo = false;
        this.isCiudadano = false;
        this.isEmpresa = false;
        this.vehiculoSuccess = false;
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
        this.apoderadoSelect = false;
        this.frmApoderado = false;
        this.identificacionApoderado = false;
        this.apoderado = false;
        this.apoderadoEncontrado = 1;
        this.moduloId = 3;
        this.resumen = {};
        this.datos = {
            'moduloId': null,
            'facturaId': null,
            'vehiculoId': null,
        };
        this.cantidadSustrato = 1;
    }
    NewRnmaComponent.prototype.ngOnInit = function () {
        this.vehiculo = new vehiculo_modelo_1.Vehiculo(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
        this.tramiteSolicitud = new tramiteSolicitudRnma_modelo_1.TramiteSolicitud(null, null, null, null, null, null, null, null);
    };
    NewRnmaComponent.prototype.onCancelar = function () {
        this.ready.emit(true);
    };
    NewRnmaComponent.prototype.onEnviar = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this.tramiteSolicitud.tramiteFacturaId = this.tramiteFacturaSelected;
        this._TramiteSolicitudService.register(this.tramiteSolicitud, token).subscribe(function (response) {
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
    NewRnmaComponent.prototype.changedFactura = function (id) {
        var _this = this;
        if (id) {
            this.datos.facturaId = id;
            this.datos.moduloId = this.moduloId;
            this.datos.vehiculoId = this.vehiculo.id;
            this._tramiteFacturaService.getTramiteShowFactura(this.datos).subscribe(function (response) {
                _this.isMatricula = false;
                _this.isTramites = true;
                var active = true;
                var token = _this._loginService.getToken();
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
                    if (tramiteFactura.tramitePrecio.tramite.id == 1) {
                        _this.isMatricula = true;
                    }
                    else {
                        _this.isMatricula = false;
                    }
                });
                if (active) {
                    _this.isTramites = false;
                }
                if (_this.tramiteSolicitud.solicitanteId) {
                    _this._ciudadanoVehiculoService.showCiudadanoVehiculo(token, _this.tramiteSolicitud.solicitanteId).subscribe(function (responseCiudadano) {
                        if (responseCiudadano.status == 'success') {
                            _this.ciudadano = responseCiudadano.data.ciudadano;
                            _this.factura = response[0].factura;
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
                    if (_this.isMatricula) {
                        _this.factura = response[0].factura;
                    }
                    else {
                        _this.factura = false;
                        sweetalert2_1.default({
                            title: 'Error!',
                            text: 'El vehiculo no tiene propietarios por favor facture matricula inicial',
                            type: 'error',
                            confirmButtonText: 'Aceptar'
                        });
                    }
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
    };
    NewRnmaComponent.prototype.onKeyValidateVehiculo = function () {
        var _this = this;
        this.msj = '';
        this.mensaje = '';
        sweetalert2_1.default({
            title: 'Buscando Vehiculo!',
            text: 'Solo tardara unos segundos por favor espere.',
            onOpen: function () {
                sweetalert2_1.default.showLoading();
            }
        }).then(function (result) {
            if (
            // Read more about handling dismissals
            result.dismiss === sweetalert2_1.default.DismissReason.timer) {
            }
        });
        var token = this._loginService.getToken();
        this._ciudadanoVehiculoService.showCiudadanoVehiculoId(token, this.tramiteSolicitud.vehiculoId).subscribe(function (response) {
            _this.ciudadanosVehiculo = response.data;
            if (response.status == 'error') {
                _this.isCiudadano = false;
                if (response.code == 401) {
                    _this.vehiculoSuccess = false;
                    _this.msj = response.msj;
                    _this.isError = true;
                    _this.error = true;
                    _this.tipoError = response.code;
                    sweetalert2_1.default.close();
                }
                else {
                    _this.vehiculo = response.data;
                    var dato = {
                        'vehiculo': _this.vehiculo.id,
                    };
                    _this._facturaService.showFacturaByVehiculo(token, dato).subscribe(function (response) {
                        if (response.status == 'success') {
                            _this.facturas = response.data;
                            _this.vehiculoSuccess = true;
                            _this.isMatricula = true;
                            _this.msj = 'vehiculo encontrado';
                            _this.error = false;
                            _this.isError = false;
                            sweetalert2_1.default.close();
                        }
                        else {
                            _this.facturas = false;
                            _this.mensaje = 'No hay faturas para el vehiculo';
                            _this.isError = true;
                            _this.vehiculoSuccess = false;
                            _this.factura = false;
                            sweetalert2_1.default.close();
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
            }
            else {
                sweetalert2_1.default.close();
                _this.vehiculo = response.data[0].vehiculo;
                // se busca las faturas si el vehiculo fue encontrado
                var dato = {
                    'vehiculo': _this.vehiculo.id,
                };
                _this._facturaService.showFacturaByVehiculo(token, dato).subscribe(function (response) {
                    if (response.status == 'success') {
                        _this.facturas = response.data;
                        _this.vehiculoSuccess = true;
                        _this.msj = 'vehiculo encontrado';
                        _this.error = false;
                        _this.isError = false;
                        sweetalert2_1.default.close();
                    }
                    else {
                        _this.facturas = false;
                        _this.mensaje = 'No hay faturas para el vehiculo';
                        _this.isError = true;
                        _this.vehiculoSuccess = false;
                        _this.factura = false;
                        sweetalert2_1.default.close();
                    }
                    (function (error) {
                        _this.errorMessage = error;
                        if (_this.errorMessage != null) {
                            console.log(_this.errorMessage);
                            alert("Error en la petición");
                        }
                    });
                });
                response.data.forEach(function (element) {
                    if (element.ciudadano) {
                        _this.isCiudadano = true;
                    }
                    if (element.empresa) {
                        _this.isEmpresa = true;
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
    NewRnmaComponent.prototype.readyTramite = function (datos) {
        var _this = this;
        this.tramitesFactura.forEach(function (tramiteFactura) {
            if (tramiteFactura.tramitePrecio.tramite.id == datos.tramiteFactura) {
                _this.tramiteSolicitud.tramiteFacturaId = tramiteFactura.id;
            }
        });
        this.tramiteSolicitud.datos = datos;
        this.tramiteSolicitud.vehiculoId = this.vehiculo.id;
        this.tramiteSolicitud.ciudadanoId = this.apoderado.id;
        var token = this._loginService.getToken();
        this._TramiteSolicitudService.register(this.tramiteSolicitud, token).subscribe(function (response) {
            _this.respuesta = response;
            if (_this.respuesta.status == 'success') {
                sweetalert2_1.default({
                    title: 'Perfecto!',
                    text: 'Registro exitoso!',
                    type: 'success',
                    confirmButtonText: 'Aceptar'
                });
                _this.error = false;
                _this.changedFactura(_this.factura.id);
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
    NewRnmaComponent.prototype.cancelarTramite = function () {
        this.tramiteSelected = false;
        this.error = false;
    };
    NewRnmaComponent.prototype.finalizarSolicitud = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this.tramites = '';
        this.tramitesFactura.forEach(function (tramiteFactura) {
            _this.tramites = _this.tramites + tramiteFactura.tramitePrecio.nombre + '<br>';
        });
        var html = 'Se va a enviar la siguiente solicitud:<br>' +
            'Factura: <b>' + this.factura.numero + '</b><br>' +
            'Vehiculo: <b>' + this.vehiculo.placa + '</b><br>' +
            'Solicitante: <b>' + this.ciudadano.usuario.identificacion + '</b><hr>' +
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
                console.log(_this.factura);
                _this.factura.estado = 'Finalizada';
                _this.factura.sedeOperativaId = _this.factura.sedeOperativa.id;
                _this._facturaService.editFactura(_this.factura, token).subscribe(function (response) {
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
    NewRnmaComponent.prototype.agregarApoderado = function () {
        this.frmApoderado = true;
    };
    NewRnmaComponent.prototype.btnNewApoderado = function () {
        this.frmApoderado = false;
        this.apoderado = this.apoderadoSelect;
        this.apoderadoEncontrado = 1;
    };
    NewRnmaComponent.prototype.onKeyApoderado = function () {
        var _this = this;
        var token = this._loginService.getToken();
        var identificacion = {
            'numeroIdentificacion': this.identificacionApoderado,
        };
        this._ciudadanoService.searchByIdentificacion(token, identificacion).subscribe(function (response) {
            _this.respuesta = response;
            if (_this.respuesta.status == 'success') {
                _this.apoderadoSelect = _this.respuesta.data;
                _this.apoderadoEncontrado = 2;
            }
            else {
                _this.apoderadoEncontrado = 3;
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
    NewRnmaComponent.prototype.cerrarApoderado = function () {
        this.frmApoderado = false;
        this.apoderado = false;
        this.apoderadoEncontrado = 1;
    };
    return NewRnmaComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRnmaComponent.prototype, "ready", void 0);
NewRnmaComponent = __decorate([
    core_1.Component({
        selector: 'app-new',
        templateUrl: './newRnma.component.html'
    }),
    __metadata("design:paramtypes", [tramiteSolicitud_service_1.TramiteSolicitudService,
        login_service_1.LoginService,
        tramiteFactura_service_1.TramiteFacturaService,
        factura_service_1.FacturaService,
        ciudadanoVehiculo_service_1.CiudadanoVehiculoService,
        ciudadano_service_1.CiudadanoService])
], NewRnmaComponent);
exports.NewRnmaComponent = NewRnmaComponent;
//# sourceMappingURL=newRnma.component.js.map