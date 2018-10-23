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
var clase_service_1 = require("../../../../services/clase.service");
var servicio_service_1 = require("../../../../services/servicio.service");
var ciudadano_service_1 = require("../../../../services/ciudadano.service");
var pais_service_1 = require("../../../../services/pais.service");
var login_service_1 = require("../../../../services/login.service");
var NewRncDuplicadoLicenciaComponent = (function () {
    function NewRncDuplicadoLicenciaComponent(_LoginService, _tramiteFacturaService, _ClaseService, _ServicioService, _CiudadanoService, _PaisService) {
        this._LoginService = _LoginService;
        this._tramiteFacturaService = _tramiteFacturaService;
        this._ClaseService = _ClaseService;
        this._ServicioService = _ServicioService;
        this._CiudadanoService = _CiudadanoService;
        this._PaisService = _PaisService;
        this.readyTramite = new core_1.EventEmitter();
        this.cancelarTramite = new core_1.EventEmitter();
        this.solicitante = null;
        this.factura = null;
        this.resumen = {};
        this.datos = {
            'tramiteFormulario': null,
            'facturaId': null,
            'categoria': null,
            'numeroLicenciaConduccion': null,
            'numeroRunt': null,
            'vigencia': null,
            'paisId': null,
            'claseId': null,
            'servicioId': null,
            'ciudadanoId': null,
        };
    }
    NewRncDuplicadoLicenciaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.categorias = ['A2'];
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
    NewRncDuplicadoLicenciaComponent.prototype.enviarTramite = function () {
        var token = this._LoginService.getToken();
        this.datos.facturaId = this.factura.id;
        this.datos.tramiteFormulario = 'rnc-duplicadolicencia';
        this.datos.numeroLicenciaConduccion = this.solicitante.identificacion;
        this.datos.claseId = this.claseSelected;
        this.datos.servicioId = this.servicioSelected;
        this.datos.paisId = this.paisSelected;
        this.datos.ciudadanoId = this.solicitante.id;
        this.readyTramite.emit({ 'foraneas': this.datos, 'resumen': this.resumen });
    };
    NewRncDuplicadoLicenciaComponent.prototype.onCancelar = function () {
        this.cancelarTramite.emit(true);
    };
    return NewRncDuplicadoLicenciaComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRncDuplicadoLicenciaComponent.prototype, "readyTramite", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRncDuplicadoLicenciaComponent.prototype, "cancelarTramite", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRncDuplicadoLicenciaComponent.prototype, "solicitante", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRncDuplicadoLicenciaComponent.prototype, "factura", void 0);
NewRncDuplicadoLicenciaComponent = __decorate([
    core_1.Component({
        selector: 'appRnc-duplicado-licencia',
        templateUrl: './newRncDuplicadoLicencia.html'
    }),
    __metadata("design:paramtypes", [login_service_1.LoginService,
        tramiteFactura_service_1.TramiteFacturaService,
        clase_service_1.ClaseService,
        servicio_service_1.ServicioService,
        ciudadano_service_1.CiudadanoService,
        pais_service_1.PaisService])
], NewRncDuplicadoLicenciaComponent);
exports.NewRncDuplicadoLicenciaComponent = NewRncDuplicadoLicenciaComponent;
//# sourceMappingURL=newRncDuplicadoLicencia.component.js.map