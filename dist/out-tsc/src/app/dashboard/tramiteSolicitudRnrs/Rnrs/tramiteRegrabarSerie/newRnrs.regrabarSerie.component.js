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
var vehiculo_service_1 = require("../../../../services/vehiculo.service");
var NewRnrsRegrabarSerieComponent = (function () {
    function NewRnrsRegrabarSerieComponent(_TramiteSolicitudService, _loginService, _SustratoService, _VehiculoService) {
        this._TramiteSolicitudService = _TramiteSolicitudService;
        this._loginService = _loginService;
        this._SustratoService = _SustratoService;
        this._VehiculoService = _VehiculoService;
        this.readyTramite = new core_1.EventEmitter();
        this.cancelarTramite = new core_1.EventEmitter();
        this.vehiculo = null;
        this.factura = null;
        this.entregada = false;
        this.resumen = {};
        this.datos = {
            'tipoRegrabacion': null,
            'motivo': null,
            'nuevoNumero': null,
            'numeroRunt': null,
            'documentacion': null,
            'entregada': null,
            'sustrato': null,
            'tramiteFormulario': null,
            'facturaId': null,
        };
    }
    NewRnrsRegrabarSerieComponent.prototype.ngOnInit = function () {
        var _this = this;
        // this.tipoRegrabacionList = ['Serie', 'Chasis', 'Serie', 'VIN'];
        this.motivoList = ['Pérdida total', 'Deterioro', 'Improntas ilegales', 'Improntas ilegibles', 'Robado'];
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
    NewRnrsRegrabarSerieComponent.prototype.enviarTramite = function () {
        var _this = this;
        // this.datos.tipoRegrabacion = this.tipoRegrabacionSelected;
        var token = this._loginService.getToken();
        this.vehiculo.servicioId = this.vehiculo.servicio.id;
        this.vehiculo.municipioId = this.vehiculo.municipio.id;
        this.vehiculo.lineaId = this.vehiculo.linea.id;
        this.vehiculo.colorId = this.vehiculo.color.id;
        this.vehiculo.combustibleId = this.vehiculo.combustible.id;
        this.vehiculo.carroceriaId = this.vehiculo.carroceria.id;
        this.vehiculo.sedeOperativaId = this.vehiculo.sedeOperativa.id;
        this.vehiculo.claseId = this.vehiculo.clase.id;
        this.vehiculo.servicioId = this.vehiculo.servicio.id;
        this.vehiculo.serie = this.nuevoNumero;
        this._VehiculoService.editVehiculo(this.vehiculo, token).subscribe(function (response) {
            _this.respuesta = response;
            if (_this.respuesta.status == 'success') {
                _this.datos.motivo = _this.motivoSelected;
                _this.datos.nuevoNumero = _this.nuevoNumero;
                _this.datos.numeroRunt = _this.numeroRunt;
                _this.datos.documentacion = _this.documentacion;
                _this.datos.sustrato = _this.sustratoSelected;
                _this.datos.entregada = _this.entregada;
                _this.datos.facturaId = _this.factura.id;
                _this.datos.tramiteFormulario = 'rnrs-regrabarserie';
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
    NewRnrsRegrabarSerieComponent.prototype.onCancelar = function () {
        this.cancelarTramite.emit(true);
    };
    return NewRnrsRegrabarSerieComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRnrsRegrabarSerieComponent.prototype, "readyTramite", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRnrsRegrabarSerieComponent.prototype, "cancelarTramite", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRnrsRegrabarSerieComponent.prototype, "vehiculo", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRnrsRegrabarSerieComponent.prototype, "factura", void 0);
NewRnrsRegrabarSerieComponent = __decorate([
    core_1.Component({
        selector: 'appRnrs-regrabar-serie',
        templateUrl: './newRnrs.regrabarSerie.html'
    }),
    __metadata("design:paramtypes", [tramiteSolicitud_service_1.TramiteSolicitudService,
        login_service_1.LoginService,
        sustrato_service_1.SustratoService,
        vehiculo_service_1.VehiculoService])
], NewRnrsRegrabarSerieComponent);
exports.NewRnrsRegrabarSerieComponent = NewRnrsRegrabarSerieComponent;
//# sourceMappingURL=newRnrs.regrabarSerie.component.js.map