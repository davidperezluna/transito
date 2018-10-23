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
var login_service_1 = require("../../../../services/login.service");
var combustible_service_1 = require("../../../../services/combustible.service");
var vehiculo_service_1 = require("../../../../services/vehiculo.service");
var NewRnmaCambioConjuntoComponent = (function () {
    function NewRnmaCambioConjuntoComponent(_CombustibleService, _TramiteSolicitudService, _loginService, _VehiculoService) {
        this._CombustibleService = _CombustibleService;
        this._TramiteSolicitudService = _TramiteSolicitudService;
        this._loginService = _loginService;
        this._VehiculoService = _VehiculoService;
        this.readyTramite = new core_1.EventEmitter();
        this.cancelarTramite = new core_1.EventEmitter();
        this.vehiculo = null;
        this.factura = null;
        this.resumen = {};
        this.datos = {
            'newData': null,
            'oldData': null,
            'tipoPotenciacion': null,
            'tramiteFormulario': null,
            'facturaId': null,
            'descricion': null,
        };
        this.tiposPotenciacion = [
            { 'value': 'Cambio de motor', 'label': 'Cambio de motor' },
            { 'value': 'Reparacion de motor y cambio de conjunto', 'label': 'Reparación de motor y cambio de conjunto' },
            { 'value': 'Reparacion de motor', 'label': 'Reparación de motor' },
        ];
    }
    NewRnmaCambioConjuntoComponent.prototype.ngOnInit = function () {
    };
    NewRnmaCambioConjuntoComponent.prototype.enviarTramite = function () {
        var _this = this;
        var token = this._loginService.getToken();
        console.log(this.vehiculo);
        this.vehiculo.modelo = this.nuevoModelo;
        this.vehiculo.placa = this.vehiculo.cfgPlaca.numero;
        this.vehiculo.municipioId = this.vehiculo.municipio.id;
        this.vehiculo.lineaId = this.vehiculo.linea.id;
        this.vehiculo.colorId = this.vehiculo.color.id;
        this.vehiculo.carroceriaId = this.vehiculo.carroceria.id;
        this.vehiculo.sedeOperativaId = this.vehiculo.sedeOperativa.id;
        this.vehiculo.claseId = this.vehiculo.clase.id;
        this.vehiculo.servicioId = this.vehiculo.servicio.id;
        this._VehiculoService.editVehiculo(this.vehiculo, token).subscribe(function (response) {
            _this.respuesta = response;
            if (_this.respuesta.status == 'success') {
                _this.datos.newData = _this.nuevoModelo;
                _this.datos.oldData = _this.vehiculo.modelo;
                _this.datos.tipoPotenciacion = _this.descricion;
                _this.datos.descricion = _this.tipoPotenciacionSelect;
                _this.datos.facturaId = _this.factura.id;
                _this.datos.tramiteFormulario = 'rnma-cambioconjunto';
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
    NewRnmaCambioConjuntoComponent.prototype.onCancelar = function () {
        this.cancelarTramite.emit(true);
    };
    return NewRnmaCambioConjuntoComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRnmaCambioConjuntoComponent.prototype, "readyTramite", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRnmaCambioConjuntoComponent.prototype, "cancelarTramite", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRnmaCambioConjuntoComponent.prototype, "vehiculo", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRnmaCambioConjuntoComponent.prototype, "factura", void 0);
NewRnmaCambioConjuntoComponent = __decorate([
    core_1.Component({
        selector: 'appRnma-cambioConjunto',
        templateUrl: './newRnma.cambioConjunto.html'
    }),
    __metadata("design:paramtypes", [combustible_service_1.CombustibleService,
        tramiteSolicitud_service_1.TramiteSolicitudService,
        login_service_1.LoginService,
        vehiculo_service_1.VehiculoService])
], NewRnmaCambioConjuntoComponent);
exports.NewRnmaCambioConjuntoComponent = NewRnmaCambioConjuntoComponent;
//# sourceMappingURL=newRnma.cambioConjunto.component.js.map