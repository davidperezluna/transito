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
var tramiteSolicitudRnc_service_1 = require("../../services/tramiteSolicitudRnc.service");
var tramiteSolicitud_service_1 = require("../../services/tramiteSolicitud.service");
var tipoIdentificacion_service_1 = require("../../services/tipoIdentificacion.service");
var ciudadano_service_1 = require("../../services/ciudadano.service");
var login_service_1 = require("../../services/login.service");
var sweetalert2_1 = require("sweetalert2");
var TramiteSolicitudRncComponent = (function () {
    function TramiteSolicitudRncComponent(_TramiteSolicitudRncService, _TramiteSolicitudService, _TipoIdentificacionService, _CiudadanoService, _loginService) {
        this._TramiteSolicitudRncService = _TramiteSolicitudRncService;
        this._TramiteSolicitudService = _TramiteSolicitudService;
        this._TipoIdentificacionService = _TipoIdentificacionService;
        this._CiudadanoService = _CiudadanoService;
        this._loginService = _loginService;
        this.formNew = false;
        this.formEdit = false;
        this.formSearch = false;
        this.solicitanteEncontrado = 1;
        this.formIndex = true;
        this.moduloId = 1;
    }
    TramiteSolicitudRncComponent.prototype.ngOnInit = function () {
        var _this = this;
        sweetalert2_1.default({
            title: 'Cargando Tabla!',
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
        this._TramiteSolicitudService.getByModulo(this.moduloId).subscribe(function (response) {
            _this.tramitesSolicitud = response.data;
            var timeoutId = setTimeout(function () {
                _this.iniciarTabla();
                sweetalert2_1.default.close();
            }, 100);
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
    };
    TramiteSolicitudRncComponent.prototype.iniciarTabla = function () {
        $('#dataTables-example').DataTable({
            responsive: true,
            pageLength: 8,
            sPaginationType: 'full_numbers',
            oLanguage: {
                oPaginate: {
                    sFirst: '<<',
                    sPrevious: '<',
                    sNext: '>',
                    sLast: '>>'
                }
            }
        });
        this.table = $('#dataTables-example').DataTable();
    };
    TramiteSolicitudRncComponent.prototype.onNew = function () {
        var _this = this;
        this._TipoIdentificacionService.getTipoIdentificacionSelect().subscribe(function (response) {
            _this.tiposIdentificacion = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
        this.formSearch = true;
        this.formNew = false;
        this.formIndex = false;
        this.table.destroy();
    };
    TramiteSolicitudRncComponent.prototype.ready = function (isCreado) {
        if (isCreado) {
            this.formNew = false;
            this.formEdit = false;
            this.formIndex = true;
            this.solicitanteEncontrado = 2;
            this.ngOnInit();
        }
    };
    TramiteSolicitudRncComponent.prototype.onSearchSolicitante = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this._CiudadanoService.searchByIdentificacion({ 'numeroIdentificacion': this.identificacion }, token).subscribe(function (response) {
            if (response.status == 'success') {
                _this.solicitante = response.data;
                _this.formNew = true;
                _this.formEdit = false;
                _this.formIndex = false;
                _this.formSearch = false;
                _this.solicitanteEncontrado = 2;
                sweetalert2_1.default({
                    type: 'info',
                    title: 'Perfecto',
                    text: "¡Solicitante encontrado!"
                });
            }
            else {
                _this.formNew = false;
                _this.formEdit = false;
                _this.formIndex = false;
                _this.formSearch = true;
                _this.solicitanteEncontrado = 3;
                sweetalert2_1.default({
                    type: 'warning',
                    title: 'Alerta',
                    text: "¡Solicitante no encontrado!"
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
    TramiteSolicitudRncComponent.prototype.deleteTramiteSolicitudRnc = function (id) {
        var _this = this;
        sweetalert2_1.default({
            title: '¿Estás seguro?',
            text: "¡Se eliminara este registro!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#15d4be',
            cancelButtonColor: '#ff6262',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then(function (result) {
            if (result.value) {
                var token = _this._loginService.getToken();
                _this._TramiteSolicitudRncService.delete(token, id).subscribe(function (response) {
                    sweetalert2_1.default({
                        title: 'Eliminado!',
                        text: 'Registro eliminado correctamente.',
                        type: 'success',
                        confirmButtonColor: '#15d4be',
                    });
                    _this.table.destroy();
                    _this.respuesta = response;
                    _this.ngOnInit();
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert("Error en la petición");
                    }
                });
            }
        });
    };
    TramiteSolicitudRncComponent.prototype.editTramiteSolicitudRnc = function (tramiteSolicitud) {
        this.tramiteSolicitud = tramiteSolicitud;
        this.formEdit = true;
        this.formIndex = false;
    };
    return TramiteSolicitudRncComponent;
}());
TramiteSolicitudRncComponent = __decorate([
    core_1.Component({
        selector: 'app-index',
        templateUrl: './tramiteSolicitudRnc.component.html'
    }),
    __metadata("design:paramtypes", [tramiteSolicitudRnc_service_1.TramiteSolicitudRncService,
        tramiteSolicitud_service_1.TramiteSolicitudService,
        tipoIdentificacion_service_1.TipoIdentificacionService,
        ciudadano_service_1.CiudadanoService,
        login_service_1.LoginService])
], TramiteSolicitudRncComponent);
exports.TramiteSolicitudRncComponent = TramiteSolicitudRncComponent;
//# sourceMappingURL=tramiteSolicitudRnc.component.js.map