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
var login_service_1 = require("../../services/login.service");
var tipoIdentificacion_service_1 = require("../../services/tipoIdentificacion.service");
var sedeOperativa_service_1 = require("../../services/sedeOperativa.service");
var ciudadano_service_1 = require("../../services/ciudadano.service");
var rncLicenciaConduccion_service_1 = require("../../services/rncLicenciaConduccion.service");
var sweetalert2_1 = require("sweetalert2");
var RncLicenciaConduccionComponent = (function () {
    function RncLicenciaConduccionComponent(_LicenciaConduccionService, _TipoIdentificacionService, _SedeOperativaService, _CiudadanoService, _loginService, router) {
        this._LicenciaConduccionService = _LicenciaConduccionService;
        this._TipoIdentificacionService = _TipoIdentificacionService;
        this._SedeOperativaService = _SedeOperativaService;
        this._CiudadanoService = _CiudadanoService;
        this._loginService = _loginService;
        this.router = router;
        this.formNew = false;
        this.formEdit = false;
        this.formIndex = false;
        this.formSearch = true;
        this.table = null;
    }
    RncLicenciaConduccionComponent.prototype.ngOnInit = function () {
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
    };
    RncLicenciaConduccionComponent.prototype.onNew = function () {
        var _this = this;
        this.formNew = true;
        this.formSearch = false;
        this.formIndex = false;
        if (this.table) {
            this.table.destroy();
        }
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
    RncLicenciaConduccionComponent.prototype.ready = function (isCreado) {
        if (isCreado) {
            this.formNew = false;
            this.formEdit = false;
            this.formIndex = false;
            this.formSearch = true;
            this.ngOnInit();
        }
    };
    RncLicenciaConduccionComponent.prototype.onSearchCiudadano = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this._CiudadanoService.searchByIdentificacion(token, { 'numeroIdentificacion': this.identificacion }).subscribe(function (response) {
            _this.respuesta = response;
            if (_this.respuesta.status == 'success') {
                _this.ciudadano = response.data;
                _this._LicenciaConduccionService.recordByCiudadanoId({ 'ciudadanoId': _this.ciudadano.id }, token).subscribe(function (response) {
                    _this.respuesta = response;
                    if (_this.respuesta.status == 'success') {
                        _this.licencias = response.data;
                        _this.iniciarTabla();
                        _this.formIndex = true;
                        sweetalert2_1.default({
                            title: 'Perfecto',
                            text: response.message,
                            type: 'info'
                        });
                    }
                    else {
                        sweetalert2_1.default({
                            title: 'Alerta',
                            text: response.message,
                            type: 'warning'
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
                sweetalert2_1.default({
                    title: 'Alerta',
                    text: response.msj,
                    type: 'warning'
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
    RncLicenciaConduccionComponent.prototype.iniciarTabla = function () {
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
    RncLicenciaConduccionComponent.prototype.delete = function (id) {
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
                _this._LicenciaConduccionService.delete(token, id).subscribe(function (response) {
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
    RncLicenciaConduccionComponent.prototype.edit = function (licenciaConduccion) {
        this.licenciaConduccion = licenciaConduccion;
        this.formEdit = true;
        this.formSearch = false;
    };
    return RncLicenciaConduccionComponent;
}());
RncLicenciaConduccionComponent = __decorate([
    core_1.Component({
        selector: 'app-index',
        templateUrl: './rncLicenciaConduccion.component.html'
    }),
    __metadata("design:paramtypes", [rncLicenciaConduccion_service_1.RncLicenciaConduccionService,
        tipoIdentificacion_service_1.TipoIdentificacionService,
        sedeOperativa_service_1.SedeOperativaService,
        ciudadano_service_1.CiudadanoService,
        login_service_1.LoginService,
        router_1.Router])
], RncLicenciaConduccionComponent);
exports.RncLicenciaConduccionComponent = RncLicenciaConduccionComponent;
//# sourceMappingURL=rncLicenciaConduccion.component.js.map