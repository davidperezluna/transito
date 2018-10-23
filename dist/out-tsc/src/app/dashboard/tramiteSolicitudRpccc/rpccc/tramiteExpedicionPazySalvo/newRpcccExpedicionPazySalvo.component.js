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
var tramiteFactura_service_1 = require("../../../../services/tramiteFactura.service");
var servicio_service_1 = require("../../../../services/servicio.service");
var ciudadano_service_1 = require("../../../../services/ciudadano.service");
var comparendo_service_1 = require("../../../../services/comparendo.service");
var mpersonalFuncionario_service_1 = require("../../../../services/mpersonalFuncionario.service");
var pais_service_1 = require("../../../../services/pais.service");
var login_service_1 = require("../../../../services/login.service");
var NewRpcccExpedicionPazySalvoComponent = (function () {
    function NewRpcccExpedicionPazySalvoComponent(_LoginService, _tramiteFacturaService, _ServicioService, _CiudadanoService, _ComparendoService, _PaisService, _MpersonalFuncionarioService) {
        this._LoginService = _LoginService;
        this._tramiteFacturaService = _tramiteFacturaService;
        this._ServicioService = _ServicioService;
        this._CiudadanoService = _CiudadanoService;
        this._ComparendoService = _ComparendoService;
        this._PaisService = _PaisService;
        this._MpersonalFuncionarioService = _MpersonalFuncionarioService;
        this.readyTramite = new core_1.EventEmitter();
        this.cancelarTramite = new core_1.EventEmitter();
        this.solicitante = null;
        this.factura = null;
        this.resumen = {};
        this.datos = {
            'tramiteFactura': null,
        };
    }
    NewRpcccExpedicionPazySalvoComponent.prototype.ngOnInit = function () {
        var _this = this;
        var token = this._LoginService.getToken();
        var ciudadano = {
            'ciudadanoId': this.solicitante.id,
        };
        this._ComparendoService.searchComparendosCiudadano(ciudadano, token).subscribe(function (response) {
            _this.comparendos = response.data;
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
    NewRpcccExpedicionPazySalvoComponent.prototype.onEnviarTramite = function () {
        var token = this._LoginService.getToken();
        var identity = this._LoginService.getIdentity();
        this.datos.tramiteFactura = 65;
        this.readyTramite.emit({ 'foraneas': this.datos, 'resumen': this.resumen });
    };
    NewRpcccExpedicionPazySalvoComponent.prototype.onCancelar = function () {
        this.cancelarTramite.emit(true);
    };
    return NewRpcccExpedicionPazySalvoComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRpcccExpedicionPazySalvoComponent.prototype, "readyTramite", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRpcccExpedicionPazySalvoComponent.prototype, "cancelarTramite", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRpcccExpedicionPazySalvoComponent.prototype, "solicitante", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRpcccExpedicionPazySalvoComponent.prototype, "factura", void 0);
NewRpcccExpedicionPazySalvoComponent = __decorate([
    core_1.Component({
        selector: 'appRpccc-expedicion-pazysalvo',
        templateUrl: './newRpcccExpedicionPazySalvo.html'
    }),
    __metadata("design:paramtypes", [login_service_1.LoginService,
        tramiteFactura_service_1.TramiteFacturaService,
        servicio_service_1.ServicioService,
        ciudadano_service_1.CiudadanoService,
        comparendo_service_1.ComparendoService,
        pais_service_1.PaisService,
        mpersonalFuncionario_service_1.MpersonalFuncionarioService])
], NewRpcccExpedicionPazySalvoComponent);
exports.NewRpcccExpedicionPazySalvoComponent = NewRpcccExpedicionPazySalvoComponent;
//# sourceMappingURL=newRpcccExpedicionPazySalvo.component.js.map