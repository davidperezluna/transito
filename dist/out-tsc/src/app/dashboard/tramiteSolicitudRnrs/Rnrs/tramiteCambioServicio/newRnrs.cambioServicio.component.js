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
var servicio_service_1 = require("../../../../services/servicio.service");
var vehiculo_service_1 = require("../../../../services/vehiculo.service");
var NewRnrsCambioServicioComponent = (function () {
    function NewRnrsCambioServicioComponent(_ServicioService, _TramiteSolicitudService, _loginService, _VehiculoService) {
        this._ServicioService = _ServicioService;
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
            'sustrato': null,
            'tramiteFormulario': null,
            'facturaId': null,
        };
    }
    NewRnrsCambioServicioComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.vehiculo.servicioId = 4;
        this._ServicioService.getServicioSelect().subscribe(function (response) {
            _this.servicios = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
    };
    NewRnrsCambioServicioComponent.prototype.enviarTramite = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this._ServicioService.showServicio(token, this.servicioSelected).subscribe(function (servicio) {
            _this.vehiculo.servicioId = _this.servicioSelected;
            _this.vehiculo.municipioId = _this.vehiculo.municipio.id;
            _this.vehiculo.lineaId = _this.vehiculo.linea.id;
            _this.vehiculo.colorId = _this.vehiculo.color.id;
            _this.vehiculo.combustibleId = _this.vehiculo.combustible.id;
            _this.vehiculo.carroceriaId = _this.vehiculo.carroceria.id;
            _this.vehiculo.sedeOperativaId = _this.vehiculo.sedeOperativa.id;
            _this.vehiculo.claseId = _this.vehiculo.clase.id;
            _this.vehiculo.servicioId = _this.vehiculo.servicio.id;
            _this.datos.facturaId = _this.factura.id;
            _this.datos.tramiteFormulario = 'rnrs-cambioservicio';
            _this._VehiculoService.editVehiculo(_this.vehiculo, token).subscribe(function (response) {
                _this.respuesta = response;
                if (_this.respuesta.status == 'success') {
                    _this.datos.newData = servicio.data.nombre;
                    _this.datos.oldData = _this.vehiculo.servicio.nombre;
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
            (function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert("Error en la petición");
                }
            });
        });
    };
    NewRnrsCambioServicioComponent.prototype.onCancelar = function () {
        this.cancelarTramite.emit(true);
    };
    return NewRnrsCambioServicioComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRnrsCambioServicioComponent.prototype, "readyTramite", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRnrsCambioServicioComponent.prototype, "cancelarTramite", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRnrsCambioServicioComponent.prototype, "vehiculo", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRnrsCambioServicioComponent.prototype, "factura", void 0);
NewRnrsCambioServicioComponent = __decorate([
    core_1.Component({
        selector: 'appRnrs-cambio-servicio',
        templateUrl: './newRnrs.cambioServicio.html'
    }),
    __metadata("design:paramtypes", [servicio_service_1.ServicioService,
        tramiteSolicitud_service_1.TramiteSolicitudService,
        login_service_1.LoginService,
        vehiculo_service_1.VehiculoService])
], NewRnrsCambioServicioComponent);
exports.NewRnrsCambioServicioComponent = NewRnrsCambioServicioComponent;
//# sourceMappingURL=newRnrs.cambioServicio.component.js.map