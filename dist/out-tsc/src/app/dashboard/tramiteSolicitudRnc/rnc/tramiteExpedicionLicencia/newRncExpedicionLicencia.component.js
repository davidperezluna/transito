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
var clase_service_1 = require("../../../../services/clase.service");
var servicio_service_1 = require("../../../../services/servicio.service");
var ciudadano_service_1 = require("../../../../services/ciudadano.service");
var mpersonalFuncionario_service_1 = require("../../../../services/mpersonalFuncionario.service");
var cfgLicenciaConduccionCategoria_service_1 = require("../../../../services/cfgLicenciaConduccionCategoria.service");
var rncLicenciaConduccion_service_1 = require("../../../../services/rncLicenciaConduccion.service");
var pais_service_1 = require("../../../../services/pais.service");
var login_service_1 = require("../../../../services/login.service");
var sweetalert2_1 = require("sweetalert2");
var NewRncExpedicionLicenciaComponent = (function () {
    function NewRncExpedicionLicenciaComponent(_LoginService, _ClaseService, _ServicioService, _CiudadanoService, _PaisService, _MpersonalFuncionarioService, _CfgLicenciaConduccionCategoriaService, _RncLicenciaConduccionService) {
        this._LoginService = _LoginService;
        this._ClaseService = _ClaseService;
        this._ServicioService = _ServicioService;
        this._CiudadanoService = _CiudadanoService;
        this._PaisService = _PaisService;
        this._MpersonalFuncionarioService = _MpersonalFuncionarioService;
        this._CfgLicenciaConduccionCategoriaService = _CfgLicenciaConduccionCategoriaService;
        this._RncLicenciaConduccionService = _RncLicenciaConduccionService;
        this.readyTramite = new core_1.EventEmitter();
        this.cancelarTramite = new core_1.EventEmitter();
        this.solicitante = null;
        this.factura = null;
        this.ciudadanoEncontrado = 1;
        this.resumen = {};
        this.datos = {
            'tramiteFormulario': null,
            'facturaId': null,
            'numeroLicenciaConduccion': null,
            'numeroRunt': null,
            'fechaExpedicion': null,
            'documentacion': null,
            'paisId': null,
            'categoriaId': null,
            'claseId': null,
            'servicioId': null,
            'ciudadanoId': null,
            'sedeOperativaId': null,
        };
    }
    NewRncExpedicionLicenciaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._CfgLicenciaConduccionCategoriaService.select().subscribe(function (response) {
            _this.categorias = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
        this._ClaseService.getClaseSelect().subscribe(function (response) {
            _this.clases = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
        this._ServicioService.getServicioSelect().subscribe(function (response) {
            _this.servicios = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
        this._PaisService.select().subscribe(function (response) {
            _this.paises = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
    };
    NewRncExpedicionLicenciaComponent.prototype.onEnviarTramite = function () {
        var _this = this;
        var token = this._LoginService.getToken();
        var identity = this._LoginService.getIdentity();
        this._MpersonalFuncionarioService.searchLogin(identity, token).subscribe(function (response) {
            if (response.status == 'success') {
                _this.datos.sedeOperativaId = response.data.sedeOperativa.id;
                //Verificar la posibilidad de insertar solo la factura y/o el tramite
                _this.datos.facturaId = _this.factura.id;
                _this.datos.tramiteFormulario = 'rnc-expedicionlicencia';
                _this.datos.numeroLicenciaConduccion = _this.solicitante.identificacion;
                _this.datos.categoriaId = _this.categoriaSelected;
                _this.datos.claseId = _this.claseSelected;
                _this.datos.servicioId = _this.servicioSelected;
                _this.datos.paisId = _this.paisSelected;
                _this.datos.ciudadanoId = _this.solicitante.id;
                _this._RncLicenciaConduccionService.register(_this.datos, token).subscribe(function (response) {
                    if (response.status == 'success') {
                        _this.readyTramite.emit({ 'foraneas': _this.datos, 'resumen': _this.resumen });
                    }
                    else {
                        sweetalert2_1.default({
                            type: 'warning',
                            title: 'Alerta!',
                            text: "No se registro el trámite."
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
            }
            else {
                sweetalert2_1.default({
                    type: 'warning',
                    title: 'Alerta!',
                    text: "Usted no tiene permisos para este trámite."
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
    NewRncExpedicionLicenciaComponent.prototype.onCancelar = function () {
        this.cancelarTramite.emit(true);
    };
    NewRncExpedicionLicenciaComponent.prototype.onKeyCiudadano = function () {
        var _this = this;
        var token = this._LoginService.getToken();
        this._CiudadanoService.searchByIdentificacion({ 'numeroIdentificacion': this.solicitante.identificacion }, token).subscribe(function (response) {
            _this.respuesta = response;
            if (_this.respuesta.status == 'success') {
                _this.solicitante = _this.respuesta.data;
                console.log(_this.respuesta.data);
                _this.ciudadanoEncontrado = 2;
            }
            else {
                _this.ciudadanoEncontrado = 3;
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
    return NewRncExpedicionLicenciaComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRncExpedicionLicenciaComponent.prototype, "readyTramite", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRncExpedicionLicenciaComponent.prototype, "cancelarTramite", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRncExpedicionLicenciaComponent.prototype, "solicitante", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRncExpedicionLicenciaComponent.prototype, "factura", void 0);
NewRncExpedicionLicenciaComponent = __decorate([
    core_1.Component({
        selector: 'appRnc-expedicion-licencia',
        templateUrl: './newRncExpedicionLicencia.html'
    }),
    __metadata("design:paramtypes", [login_service_1.LoginService,
        clase_service_1.ClaseService,
        servicio_service_1.ServicioService,
        ciudadano_service_1.CiudadanoService,
        pais_service_1.PaisService,
        mpersonalFuncionario_service_1.MpersonalFuncionarioService,
        cfgLicenciaConduccionCategoria_service_1.CfgLicenciaConduccionCategoriaService,
        rncLicenciaConduccion_service_1.RncLicenciaConduccionService])
], NewRncExpedicionLicenciaComponent);
exports.NewRncExpedicionLicenciaComponent = NewRncExpedicionLicenciaComponent;
//# sourceMappingURL=newRncExpedicionLicencia.component.js.map