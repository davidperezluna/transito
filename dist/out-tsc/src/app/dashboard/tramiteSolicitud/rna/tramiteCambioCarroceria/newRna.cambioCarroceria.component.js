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
var carroceria_service_1 = require("../../../../services/carroceria.service");
var vehiculo_service_1 = require("../../../../services/vehiculo.service");
var NewRnaCambioCarroceriaComponent = (function () {
    function NewRnaCambioCarroceriaComponent(_CarroceriaService, _TramiteSolicitudService, _loginService, _VehiculoService) {
        this._CarroceriaService = _CarroceriaService;
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
    NewRnaCambioCarroceriaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.vehiculo.carroceriaId = 4;
        this._CarroceriaService.getCarroceriaSelect().subscribe(function (response) {
            _this.carrocerias = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
    };
    NewRnaCambioCarroceriaComponent.prototype.enviarTramite = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this._CarroceriaService.showCarroceria(token, this.carroceriaSelected).subscribe(function (carroceria) {
            _this.vehiculo.carroceriaId = _this.carroceriaSelected;
            _this.vehiculo.municipioId = _this.vehiculo.municipio.id;
            _this.vehiculo.lineaId = _this.vehiculo.linea.id;
            _this.vehiculo.colorId = _this.vehiculo.color.id;
            _this.vehiculo.combustibleId = _this.vehiculo.combustible.id;
            _this.vehiculo.carroceriaId = _this.vehiculo.carroceria.id;
            _this.vehiculo.sedeOperativaId = _this.vehiculo.sedeOperativa.id;
            _this.vehiculo.claseId = _this.vehiculo.clase.id;
            _this.vehiculo.servicioId = _this.vehiculo.servicio.id;
            _this._VehiculoService.editVehiculo(_this.vehiculo, token).subscribe(function (response) {
                _this.respuesta = response;
                if (_this.respuesta.status == 'success') {
                    _this.datos.newData = carroceria.data.nombre;
                    _this.datos.oldData = _this.vehiculo.carroceria.nombre;
                    _this.datos.facturaId = _this.factura.id;
                    _this.datos.tramiteFormulario = 'rna-cambiocarroceria';
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
    NewRnaCambioCarroceriaComponent.prototype.onCancelar = function () {
        this.cancelarTramite.emit(true);
    };
    return NewRnaCambioCarroceriaComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRnaCambioCarroceriaComponent.prototype, "readyTramite", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRnaCambioCarroceriaComponent.prototype, "cancelarTramite", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRnaCambioCarroceriaComponent.prototype, "vehiculo", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRnaCambioCarroceriaComponent.prototype, "factura", void 0);
NewRnaCambioCarroceriaComponent = __decorate([
    core_1.Component({
        selector: 'appRna-cambio-carroceria',
        templateUrl: './newRna.cambioCarroceria.html'
    }),
    __metadata("design:paramtypes", [carroceria_service_1.CarroceriaService,
        tramiteSolicitud_service_1.TramiteSolicitudService,
        login_service_1.LoginService,
        vehiculo_service_1.VehiculoService])
], NewRnaCambioCarroceriaComponent);
exports.NewRnaCambioCarroceriaComponent = NewRnaCambioCarroceriaComponent;
//# sourceMappingURL=newRna.cambioCarroceria.component.js.map