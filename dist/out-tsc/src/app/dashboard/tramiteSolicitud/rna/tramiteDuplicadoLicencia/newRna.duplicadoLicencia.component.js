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
var tramiteSolicitud_service_1 = require("../../../../services/tramiteSolicitud.service");
var sustrato_service_1 = require("../../../../services/sustrato.service");
var login_service_1 = require("../../../../services/login.service");
var NewRnaDuplicadoLicenciaComponent = (function () {
    function NewRnaDuplicadoLicenciaComponent(_TramiteSolicitudService, _loginService, _SustratoService) {
        this._TramiteSolicitudService = _TramiteSolicitudService;
        this._loginService = _loginService;
        this._SustratoService = _SustratoService;
        this.readyTramite = new core_1.EventEmitter();
        this.cancelarTramite = new core_1.EventEmitter();
        this.factura = null;
        this.entregada = false;
        this.resumen = {};
        this.datos = {
            'sustrato': null,
            'numeroRunt': null,
            'documentacion': null,
            'entregada': null,
            'tramiteFormulario': null,
            'facturaId': null,
        };
    }
    NewRnaDuplicadoLicenciaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._SustratoService.getSustratoSelect().subscribe(function (response) {
            _this.sustratos = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
    };
    NewRnaDuplicadoLicenciaComponent.prototype.enviarTramite = function () {
        this.datos.sustrato = this.sustratoSelected;
        this.datos.numeroRunt = this.numeroRunt;
        this.datos.documentacion = this.documentacion;
        this.datos.entregada = this.entregada;
        this.datos.facturaId = this.factura.id;
        this.datos.tramiteFormulario = 'rna-duplicadolicencia';
        this.readyTramite.emit({ 'foraneas': this.datos, 'resumen': this.resumen });
    };
    NewRnaDuplicadoLicenciaComponent.prototype.onCancelar = function () {
        this.cancelarTramite.emit(true);
    };
    return NewRnaDuplicadoLicenciaComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRnaDuplicadoLicenciaComponent.prototype, "readyTramite", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRnaDuplicadoLicenciaComponent.prototype, "cancelarTramite", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRnaDuplicadoLicenciaComponent.prototype, "factura", void 0);
NewRnaDuplicadoLicenciaComponent = __decorate([
    core_1.Component({
        selector: 'appRna-duplicado-licencia',
        templateUrl: './newRna.duplicadoLicencia.html'
    }),
    __metadata("design:paramtypes", [tramiteSolicitud_service_1.TramiteSolicitudService,
        login_service_1.LoginService,
        sustrato_service_1.SustratoService])
], NewRnaDuplicadoLicenciaComponent);
exports.NewRnaDuplicadoLicenciaComponent = NewRnaDuplicadoLicenciaComponent;
//# sourceMappingURL=newRna.duplicadoLicencia.component.js.map