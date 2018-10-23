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
var login_service_1 = require("../../../../services/login.service");
var NewRnmaCambioPlacaComponent = (function () {
    function NewRnmaCambioPlacaComponent(_loginService, _tramiteFacturaService) {
        this._loginService = _loginService;
        this._tramiteFacturaService = _tramiteFacturaService;
        this.readyTramite = new core_1.EventEmitter();
        this.cancelarTramite = new core_1.EventEmitter();
        this.factura = null;
        this.resumen = {};
        this.datos = {
            'tipoCambio': null,
            'numeroRunt': null,
            'nuevaPlaca': null,
            'documentacion': null,
            'sustrato': null,
            'tramiteFormulario': null,
            'facturaId': null,
        };
    }
    NewRnmaCambioPlacaComponent.prototype.ngOnInit = function () {
        this.tipoCambioList = ['Antiguo', 'Clasico', 'Normal'];
    };
    NewRnmaCambioPlacaComponent.prototype.enviarTramite = function () {
        this.datos.tipoCambio = this.tipoCambioSelected;
        this.datos.numeroRunt = this.numeroRunt;
        this.datos.nuevaPlaca = this.nuevaPlaca;
        this.datos.documentacion = this.documentacion;
        this.datos.facturaId = this.factura.id;
        this.datos.tramiteFormulario = 'rnma-cambioplaca';
        this.readyTramite.emit({ 'foraneas': this.datos, 'resumen': this.resumen });
    };
    NewRnmaCambioPlacaComponent.prototype.onCancelar = function () {
        this.cancelarTramite.emit(true);
    };
    return NewRnmaCambioPlacaComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRnmaCambioPlacaComponent.prototype, "readyTramite", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRnmaCambioPlacaComponent.prototype, "cancelarTramite", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRnmaCambioPlacaComponent.prototype, "factura", void 0);
NewRnmaCambioPlacaComponent = __decorate([
    core_1.Component({
        selector: 'appRnma-cambio-placa',
        templateUrl: './newRnma.cambioPlaca.html'
    }),
    __metadata("design:paramtypes", [login_service_1.LoginService,
        tramiteFactura_service_1.TramiteFacturaService])
], NewRnmaCambioPlacaComponent);
exports.NewRnmaCambioPlacaComponent = NewRnmaCambioPlacaComponent;
//# sourceMappingURL=newRnma.cambioPlaca.component.js.map