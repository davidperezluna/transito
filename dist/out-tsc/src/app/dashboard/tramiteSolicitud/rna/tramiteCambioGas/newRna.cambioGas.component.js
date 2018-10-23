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
var color_service_1 = require("../../../../services/color.service");
var vehiculo_service_1 = require("../../../../services/vehiculo.service");
var combustible_service_1 = require("../../../../services/combustible.service");
var NewRnaCambioGasComponent = (function () {
    function NewRnaCambioGasComponent(_ColorService, _TramiteSolicitudService, _loginService, _tramiteFacturaService, _VehiculoService, _CombustibleService) {
        this._ColorService = _ColorService;
        this._TramiteSolicitudService = _TramiteSolicitudService;
        this._loginService = _loginService;
        this._tramiteFacturaService = _tramiteFacturaService;
        this._VehiculoService = _VehiculoService;
        this._CombustibleService = _CombustibleService;
        this.readyTramite = new core_1.EventEmitter();
        this.cancelarTramite = new core_1.EventEmitter();
        this.vehiculo = null;
        this.factura = null;
        this.datos2 = {
            'combustibleCambioId': null,
            'vehiculoId': null,
        };
        this.resumen = {};
        this.datos = {
            'numeroCertificado': null,
            'fechaExpedicion': null,
            'fechaVencimiento': null,
            'numeroChip': null,
            'tramiteFormulario': null,
            'facturaId': null,
            'numeroKIT': null,
            'numeroSerial': null,
            'fechaFabricacion': null,
            'presion': null,
            'numeroRUNT': null,
        };
    }
    NewRnaCambioGasComponent.prototype.ngOnInit = function () {
        this.vehiculo1 = this.vehiculo;
    };
    NewRnaCambioGasComponent.prototype.enviarTramite = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this._CombustibleService.getCombustible().subscribe(function (response) {
            _this.combustibles = response;
            console.log(_this.combustibles);
            _this.combustibles.data.forEach(function (element) {
                if (element.id == 4) {
                    _this.datos2.combustibleCambioId = element.id;
                    _this.datos2.vehiculoId = _this.vehiculo1.id;
                }
            });
            (function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert("Error en la petición");
                }
            });
        });
        this._VehiculoService.editCombustibleVehiculo(this.datos2, token).subscribe(function (response) {
            _this.respuesta = response;
            if (_this.respuesta.status == 'success') {
                _this.datos.facturaId = _this.factura.id;
                _this.datos.tramiteFormulario = 'rna-cambiogas';
                _this.readyTramite.emit({ 'foraneas': _this.datos, 'resumen': _this.resumen });
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
    NewRnaCambioGasComponent.prototype.onCancelar = function () {
        this.cancelarTramite.emit(true);
    };
    return NewRnaCambioGasComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRnaCambioGasComponent.prototype, "readyTramite", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRnaCambioGasComponent.prototype, "cancelarTramite", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRnaCambioGasComponent.prototype, "vehiculo", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRnaCambioGasComponent.prototype, "factura", void 0);
NewRnaCambioGasComponent = __decorate([
    core_1.Component({
        selector: 'appRna-cambio-gas',
        templateUrl: './newRna.cambioGas.html'
    }),
    __metadata("design:paramtypes", [color_service_1.ColorService,
        tramiteSolicitud_service_1.TramiteSolicitudService,
        login_service_1.LoginService,
        tramiteFactura_service_1.TramiteFacturaService,
        vehiculo_service_1.VehiculoService,
        combustible_service_1.CombustibleService])
], NewRnaCambioGasComponent);
exports.NewRnaCambioGasComponent = NewRnaCambioGasComponent;
//# sourceMappingURL=newRna.cambioGas.component.js.map