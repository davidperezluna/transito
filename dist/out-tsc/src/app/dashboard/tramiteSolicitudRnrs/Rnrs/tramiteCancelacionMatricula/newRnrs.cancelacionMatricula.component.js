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
var NewRnrsCancelacionMatriculaComponent = (function () {
    function NewRnrsCancelacionMatriculaComponent(_TramiteSolicitudService, _loginService, _SustratoService, _VehiculoService) {
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
            'motivoCancelacion': null,
            'fechaHechos': null,
            'numeroRunt': null,
            'tipoDocumento': null,
            'numeroDocumento': null,
            'fechaExpedicion': null,
            'entidadExpide': null,
            'fechaDeclaracion': null,
            'numeroDeclaracion': null,
            'numeroDesintegracion': null,
            'nombreDesintegradora': null,
            'fechaHechosDesintegracion': null,
            'tramiteFormulario': null,
            'facturaId': null,
        };
    }
    NewRnrsCancelacionMatriculaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.nivelBlindajeList = ['UNO', 'DOS', 'TRES', 'CUATRO', 'CINCO', 'SEIS', 'SIETE', 'OCHO'];
        this.tipoBlindajeList = ['Blindaje de un vehículo', 'Desblindaje de un vehículo'];
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
    NewRnrsCancelacionMatriculaComponent.prototype.onEnviarTramite = function () {
        this.readyTramite.emit({ 'foraneas': this.datos, 'resumen': this.resumen });
        /*this.vehiculo.servicioId = this.vehiculo.servicio.id
        this.vehiculo.municipioId = this.vehiculo.municipio.id
        this.vehiculo.lineaId = this.vehiculo.linea.id
        this.vehiculo.colorId = this.vehiculo.color.id
        this.vehiculo.combustibleId = this.vehiculo.combustible.id
        this.vehiculo.carroceriaId = this.vehiculo.carroceria.id
        this.vehiculo.sedeOperativaId = this.vehiculo.sedeOperativa.id
        this.vehiculo.claseId = this.vehiculo.clase.id
        this.vehiculo.servicioId = this.vehiculo.servicio.id
        this.vehiculo.cancelado = true
        this.datos.tramiteFactura = 14;

        
        let token = this._loginService.getToken();
        this._VehiculoService.editVehiculo(this.vehiculo, token).subscribe(
            response => {
                this.respuesta = response;
                if (this.respuesta.status == 'success') {
                    this.readyTramite.emit({'foraneas':this.datos, 'resumen':this.resumen});
                }
                error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert("Error en la petición");
                    }
                }
            });*/
    };
    NewRnrsCancelacionMatriculaComponent.prototype.onCancelar = function () {
        this.cancelarTramite.emit(true);
    };
    return NewRnrsCancelacionMatriculaComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRnrsCancelacionMatriculaComponent.prototype, "readyTramite", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRnrsCancelacionMatriculaComponent.prototype, "cancelarTramite", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRnrsCancelacionMatriculaComponent.prototype, "vehiculo", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRnrsCancelacionMatriculaComponent.prototype, "factura", void 0);
NewRnrsCancelacionMatriculaComponent = __decorate([
    core_1.Component({
        selector: 'appRnrs-cancelacionMatricula',
        templateUrl: './newRnrs.CancelacionMatricula.html'
    }),
    __metadata("design:paramtypes", [tramiteSolicitud_service_1.TramiteSolicitudService,
        login_service_1.LoginService,
        sustrato_service_1.SustratoService,
        vehiculo_service_1.VehiculoService])
], NewRnrsCancelacionMatriculaComponent);
exports.NewRnrsCancelacionMatriculaComponent = NewRnrsCancelacionMatriculaComponent;
//# sourceMappingURL=newRnrs.cancelacionMatricula.component.js.map