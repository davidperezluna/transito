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
var sustrato_service_1 = require("../../../../services/sustrato.service");
var tipoIdentificacion_service_1 = require("../../../../services/tipoIdentificacion.service");
var combustible_service_1 = require("../../../../services/combustible.service");
var NewRnaCambioMotorComponent = (function () {
    function NewRnaCambioMotorComponent(_CombustibleService, _SustratoService, _TipoIdentificacionService) {
        this._CombustibleService = _CombustibleService;
        this._SustratoService = _SustratoService;
        this._TipoIdentificacionService = _TipoIdentificacionService;
        this.readyTramite = new core_1.EventEmitter();
        this.cancelarTramite = new core_1.EventEmitter();
        this.factura = null;
        this.entregada = false;
        this.resumen = {};
        this.datos = {
            'tipoIngreso': null,
            'numeroMotor': null,
            'numeroAceptacion': null,
            'numeroFactura': null,
            'fecha': null,
            'tipoIdentificacion': null,
            'numeroIdentificacion': null,
            'numeroRunt': null,
            'documentacion': null,
            'entregada': null,
            'sustrato': null,
            'tramiteFormulario': null,
            'combustibleId': null,
            'facturaId': null,
        };
    }
    NewRnaCambioMotorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.tipoIngresoList = ['Nuevo', 'Usado'];
        this._CombustibleService.getCombustibleSelect().subscribe(function (response) {
            _this.combustibles = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
        this._SustratoService.getSustratoSelect().subscribe(function (response) {
            _this.sustratos = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
        this._TipoIdentificacionService.getTipoIdentificacionSelect().subscribe(function (response) {
            _this.tiposIdentificacion = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
    };
    NewRnaCambioMotorComponent.prototype.enviarTramite = function () {
        this.datos.tipoIngreso = this.tipoIngresoSelected;
        this.datos.numeroMotor = this.numeroMotor;
        this.datos.numeroAceptacion = this.numeroAceptacion;
        this.datos.numeroFactura = this.numeroFactura;
        this.datos.fecha = this.fecha;
        this.datos.tipoIdentificacion = this.tipoIdentificacionSelected;
        this.datos.numeroIdentificacion = this.numeroIdentificacion;
        this.datos.numeroRunt = this.numeroRunt;
        this.datos.documentacion = this.documentacion;
        this.datos.entregada = this.entregada;
        this.datos.facturaId = this.factura.id;
        this.datos.combustibleId = this.combustibleSelected;
        this.datos.tramiteFormulario = 'rna-cambiomotor';
        this.readyTramite.emit({ 'foraneas': this.datos, 'resumen': this.resumen });
    };
    NewRnaCambioMotorComponent.prototype.onCancelar = function () {
        this.cancelarTramite.emit(true);
    };
    return NewRnaCambioMotorComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRnaCambioMotorComponent.prototype, "readyTramite", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRnaCambioMotorComponent.prototype, "cancelarTramite", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRnaCambioMotorComponent.prototype, "factura", void 0);
NewRnaCambioMotorComponent = __decorate([
    core_1.Component({
        selector: 'appRna-cambio-motor',
        templateUrl: './newRna.cambioMotor.html'
    }),
    __metadata("design:paramtypes", [combustible_service_1.CombustibleService,
        sustrato_service_1.SustratoService,
        tipoIdentificacion_service_1.TipoIdentificacionService])
], NewRnaCambioMotorComponent);
exports.NewRnaCambioMotorComponent = NewRnaCambioMotorComponent;
//# sourceMappingURL=newRna.cambioMotor.component.js.map