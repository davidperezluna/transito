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
var tramiteFactura_service_1 = require("../../../../services/tramiteFactura.service");
var login_service_1 = require("../../../../services/login.service");
var NewRnmaDuplicadoPlacaComponent = (function () {
    function NewRnmaDuplicadoPlacaComponent(_TramiteSolicitudService, _loginService, _tramiteFacturaService) {
        this._TramiteSolicitudService = _TramiteSolicitudService;
        this._loginService = _loginService;
        this._tramiteFacturaService = _tramiteFacturaService;
        this.readyTramite = new core_1.EventEmitter();
        this.cancelarTramite = new core_1.EventEmitter();
        this.factura = null;
        this.entregada = false;
        this.resumen = {};
        this.datos = {
            'motivo': null,
            'cantidad': null,
            'numeroRunt': null,
            'documentacion': null,
            'entregada': null,
            'sustrato': null,
            'tramiteFormulario': null,
            'facturaId': null,
        };
    }
    NewRnmaDuplicadoPlacaComponent.prototype.ngOnInit = function () {
        this.motivoList = ['Destrucción', 'Deterioro', 'Hurto', 'Pérdida'];
    };
    NewRnmaDuplicadoPlacaComponent.prototype.enviarTramite = function () {
        this.datos.motivo = this.motivoSelected;
        this.datos.cantidad = this.cantidad;
        this.datos.numeroRunt = this.numeroRunt;
        this.datos.documentacion = this.documentacion;
        this.datos.entregada = this.entregada;
        this.datos.facturaId = this.factura.id;
        this.datos.tramiteFormulario = 'rnma-dupicadoplaca';
        this.readyTramite.emit({ 'foraneas': this.datos, 'resumen': this.resumen });
    };
    NewRnmaDuplicadoPlacaComponent.prototype.onCancelar = function () {
        this.cancelarTramite.emit(true);
    };
    return NewRnmaDuplicadoPlacaComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRnmaDuplicadoPlacaComponent.prototype, "readyTramite", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRnmaDuplicadoPlacaComponent.prototype, "cancelarTramite", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRnmaDuplicadoPlacaComponent.prototype, "factura", void 0);
NewRnmaDuplicadoPlacaComponent = __decorate([
    core_1.Component({
        selector: 'appRnma-duplicado-placa',
        templateUrl: './newRnma.duplicadoPlaca.html'
    }),
    __metadata("design:paramtypes", [tramiteSolicitud_service_1.TramiteSolicitudService,
        login_service_1.LoginService,
        tramiteFactura_service_1.TramiteFacturaService])
], NewRnmaDuplicadoPlacaComponent);
exports.NewRnmaDuplicadoPlacaComponent = NewRnmaDuplicadoPlacaComponent;
//# sourceMappingURL=newRnma.duplicadoPlaca.component.js.map