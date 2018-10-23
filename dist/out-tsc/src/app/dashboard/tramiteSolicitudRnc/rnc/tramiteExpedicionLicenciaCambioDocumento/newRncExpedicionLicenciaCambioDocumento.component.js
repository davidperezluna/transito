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
var pais_service_1 = require("../../../../services/pais.service");
var NewRncExpedicionLicenciaCambioDocumentoComponent = (function () {
    function NewRncExpedicionLicenciaCambioDocumentoComponent(_ClaseService, _ServicioService, _PaisService) {
        this._ClaseService = _ClaseService;
        this._ServicioService = _ServicioService;
        this._PaisService = _PaisService;
        this.readyTramite = new core_1.EventEmitter();
        this.cancelarTramite = new core_1.EventEmitter();
        this.solicitante = null;
        this.factura = null;
        this.datos = {
            'tramiteFormulario': null,
            'facturaId': null,
            'categoria': null,
            'numeroLicenciaConduccion': null,
            'identificacionAnterior': null,
            'identificacionActual': null,
            'numeroRunt': null,
            'vigencia': null,
            'paisId': null,
            'claseId': null,
            'servicioId': null,
            'ciudadanoId': null,
        };
        this.resumen = {
            'Numero licencia conduccion actual': null,
            'Numero licencia conduccion anterior': null,
            'identificacion Anterior': null,
            'identificacion Actual': null,
            'Nombre Solicitante': null,
        };
    }
    NewRncExpedicionLicenciaCambioDocumentoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.categorias = ['A2'];
        this.datos.identificacionAnterior = this.solicitante.identificacion;
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
    NewRncExpedicionLicenciaCambioDocumentoComponent.prototype.enviarTramite = function () {
        // let token = this._LoginService.getToken();
        this.datos.facturaId = this.factura.id;
        this.datos.tramiteFormulario = 'rnc-expedicioncambiodocumento';
        this.datos.numeroLicenciaConduccion = this.datos.identificacionActual;
        this.datos.claseId = this.claseSelected;
        this.datos.servicioId = this.servicioSelected;
        this.datos.paisId = this.paisSelected;
        this.datos.ciudadanoId = this.solicitante.id;
        this.resumen["identificacion Actual"] = this.datos.identificacionActual;
        this.resumen["identificacion Anterior"] = this.datos.identificacionAnterior;
        this.resumen["Nombre Solicitante"] = this.solicitante.primerNombre + ' ' + this.solicitante.segundoNombre + ' ' + this.solicitante.primerApellido + ' ' + this.solicitante.segundoApellido;
        this.resumen["Numero licencia conduccion actual"] = this.datos.identificacionActual;
        this.resumen["Numero licencia conduccion anterior"] = this.datos.identificacionAnterior;
        this.readyTramite.emit({ 'foraneas': this.datos, 'resumen': this.resumen });
    };
    NewRncExpedicionLicenciaCambioDocumentoComponent.prototype.onCancelar = function () {
        this.cancelarTramite.emit(true);
    };
    return NewRncExpedicionLicenciaCambioDocumentoComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRncExpedicionLicenciaCambioDocumentoComponent.prototype, "readyTramite", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRncExpedicionLicenciaCambioDocumentoComponent.prototype, "cancelarTramite", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRncExpedicionLicenciaCambioDocumentoComponent.prototype, "solicitante", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRncExpedicionLicenciaCambioDocumentoComponent.prototype, "factura", void 0);
NewRncExpedicionLicenciaCambioDocumentoComponent = __decorate([
    core_1.Component({
        selector: 'appRnc-expedicion-licencia-cambio-documento',
        templateUrl: './newRncExpedicionLicenciaCambioDocumento.html'
    }),
    __metadata("design:paramtypes", [clase_service_1.ClaseService,
        servicio_service_1.ServicioService,
        pais_service_1.PaisService])
], NewRncExpedicionLicenciaCambioDocumentoComponent);
exports.NewRncExpedicionLicenciaCambioDocumentoComponent = NewRncExpedicionLicenciaCambioDocumentoComponent;
//# sourceMappingURL=newRncExpedicionLicenciaCambioDocumento.component.js.map