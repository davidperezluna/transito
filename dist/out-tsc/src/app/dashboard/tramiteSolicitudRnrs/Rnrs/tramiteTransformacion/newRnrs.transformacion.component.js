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
var login_service_1 = require("../../../../services/login.service");
var vehiculo_service_1 = require("../../../../services/vehiculo.service");
var rnrsRegistroRemolque_service_1 = require("../../../../services/rnrsRegistroRemolque.service");
var sweetalert2_1 = require("sweetalert2");
var NewRnrsTransformacionComponent = (function () {
    function NewRnrsTransformacionComponent(_loginService, _VehiculoService, _RemolqueService) {
        this._loginService = _loginService;
        this._VehiculoService = _VehiculoService;
        this._RemolqueService = _RemolqueService;
        this.readyTramite = new core_1.EventEmitter();
        this.cancelarTramite = new core_1.EventEmitter();
        this.vehiculo = null;
        this.factura = null;
        this.resumen = {};
    }
    NewRnrsTransformacionComponent.prototype.ngOnInit = function () {
        this.datos = {
            'nuevoNumeroEjes': null,
            'numeroFTH': null,
            'pesoVacio': null,
            'cargaUtil': null,
            'tipoDocumento': null,
            'numeroDocumento': null,
            'nombreEmpresa': null,
            'fechaFactura': null,
            'tipoDocumentoSoporte': null,
            'numeroFactura': null,
            'tramiteFormulario': null,
            'facturaId': null,
            'idVehiculo': null,
        };
    };
    NewRnrsTransformacionComponent.prototype.onEnviarTramite = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this.datos.idVehiculo = this.vehiculo.id;
        this._RemolqueService.transformacionVehiculoRemolque(this.datos, token).subscribe(function (response) {
            if (response.status == 'success') {
                _this.datos.facturaId = _this.factura.id;
                _this.datos.tramiteFormulario = 'rnrs-transformacion';
                _this.readyTramite.emit({ 'foraneas': _this.datos, 'resumen': _this.resumen });
                _this.ngOnInit();
            }
            else if (response.status == "error") {
                sweetalert2_1.default({
                    type: 'error',
                    title: 'Atención!',
                    text: response.message
                });
            }
            (function (error) {
                if (_this.errorMessage != null) {
                    alert("Error en la petición");
                }
            });
        });
    };
    NewRnrsTransformacionComponent.prototype.onCancelar = function () {
        this.cancelarTramite.emit(true);
    };
    return NewRnrsTransformacionComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRnrsTransformacionComponent.prototype, "readyTramite", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRnrsTransformacionComponent.prototype, "cancelarTramite", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRnrsTransformacionComponent.prototype, "vehiculo", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRnrsTransformacionComponent.prototype, "factura", void 0);
NewRnrsTransformacionComponent = __decorate([
    core_1.Component({
        selector: 'appRnrs-transformacion',
        templateUrl: './newRnrs.transformacion.html'
    }),
    __metadata("design:paramtypes", [login_service_1.LoginService,
        vehiculo_service_1.VehiculoService,
        rnrsRegistroRemolque_service_1.RegistroRemolqueService])
], NewRnrsTransformacionComponent);
exports.NewRnrsTransformacionComponent = NewRnrsTransformacionComponent;
//# sourceMappingURL=newRnrs.transformacion.component.js.map