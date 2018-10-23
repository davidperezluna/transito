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
var NewRnmaCambioColorComponent = (function () {
    function NewRnmaCambioColorComponent(_ColorService, _TramiteSolicitudService, _loginService, _tramiteFacturaService, _VehiculoService) {
        this._ColorService = _ColorService;
        this._TramiteSolicitudService = _TramiteSolicitudService;
        this._loginService = _loginService;
        this._tramiteFacturaService = _tramiteFacturaService;
        this._VehiculoService = _VehiculoService;
        this.readyTramite = new core_1.EventEmitter();
        this.cancelarTramite = new core_1.EventEmitter();
        this.vehiculo = null;
        this.tramitesFactura = null;
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
    NewRnmaCambioColorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.tramitesFactura.forEach(function (tramiteFactura) {
            if (tramiteFactura.realizado == 1) {
                if (tramiteFactura.tramitePrecio.tramite.id == 15) {
                    _this.tramiteRealizado = tramiteFactura;
                }
            }
        });
        //consultar tramite solicitud con tramiterealizado.id
        var token = this._loginService.getToken();
        if (this.tramiteRealizado) {
            this._TramiteSolicitudService.showTramiteSolicitudByTamiteFactura(token, this.tramiteRealizado.id).subscribe(function (response) {
                _this.datos = response.data.datos;
                console.log(response.data.datos);
            }, function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert('Error en la petición');
                }
            });
        }
        this._ColorService.select().subscribe(function (response) {
            _this.colores = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
    };
    NewRnmaCambioColorComponent.prototype.enviarTramite = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this._ColorService.show(token, this.colorSelected).subscribe(function (color) {
            _this.vehiculo.combustibleId = _this.vehiculo.combustible.id;
            _this.vehiculo.municipioId = _this.vehiculo.municipio.id;
            _this.vehiculo.lineaId = _this.vehiculo.linea.id;
            _this.vehiculo.colorId = _this.colorSelected;
            _this.vehiculo.carroceriaId = _this.vehiculo.carroceria.id;
            _this.vehiculo.sedeOperativaId = _this.vehiculo.sedeOperativa.id;
            _this.vehiculo.claseId = _this.vehiculo.clase.id;
            _this.vehiculo.servicioId = _this.vehiculo.servicio.id;
            _this._VehiculoService.editVehiculoColor(_this.vehiculo, token).subscribe(function (response) {
                _this.respuesta = response;
                if (_this.respuesta.status == 'success') {
                    _this.datos.newData = color.data.nombre;
                    _this.datos.oldData = _this.vehiculo.color.nombre;
                    _this.datos.facturaId = _this.factura.id;
                    _this.datos.tramiteFormulario = 'rnma-cambiocolor';
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
    NewRnmaCambioColorComponent.prototype.onCancelar = function () {
        this.cancelarTramite.emit(true);
    };
    return NewRnmaCambioColorComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRnmaCambioColorComponent.prototype, "readyTramite", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRnmaCambioColorComponent.prototype, "cancelarTramite", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRnmaCambioColorComponent.prototype, "vehiculo", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRnmaCambioColorComponent.prototype, "tramitesFactura", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRnmaCambioColorComponent.prototype, "factura", void 0);
NewRnmaCambioColorComponent = __decorate([
    core_1.Component({
        selector: 'appRnma-cambio-color',
        templateUrl: './newRnma.cambioColor.html'
    }),
    __metadata("design:paramtypes", [color_service_1.ColorService,
        tramiteSolicitud_service_1.TramiteSolicitudService,
        login_service_1.LoginService,
        tramiteFactura_service_1.TramiteFacturaService,
        vehiculo_service_1.VehiculoService])
], NewRnmaCambioColorComponent);
exports.NewRnmaCambioColorComponent = NewRnmaCambioColorComponent;
//# sourceMappingURL=newRnma.cambioColor.component.js.map