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
var ciudadano_service_1 = require("../../../../services/ciudadano.service");
var default_service_1 = require("../../../../services/default.service");
var environment_1 = require("environments/environment");
var NewRnrsCertificadoTradicionComponent = (function () {
    function NewRnrsCertificadoTradicionComponent(_TramiteSolicitudService, _loginService, _SustratoService, _VehiculoService, _CiudadanoService, _DefaultService) {
        this._TramiteSolicitudService = _TramiteSolicitudService;
        this._loginService = _loginService;
        this._SustratoService = _SustratoService;
        this._VehiculoService = _VehiculoService;
        this._CiudadanoService = _CiudadanoService;
        this._DefaultService = _DefaultService;
        this.readyTramite = new core_1.EventEmitter();
        this.cancelarTramite = new core_1.EventEmitter();
        this.vehiculo = null;
        this.factura = null;
        this.apiUrl = environment_1.environment.apiUrl + 'default';
        this.entregada = false;
        this.ciudadanoEncontrado = 1;
        this.ciudadanoNew = false;
        this.resumen = {};
        this.datos = {
            'nroRunt': null,
            'observacion': null,
            'certificadoEntregada': null,
            'entregado': null,
            'tramiteFormulario': null,
            'facturaId': null,
        };
    }
    NewRnrsCertificadoTradicionComponent.prototype.ngOnInit = function () {
    };
    NewRnrsCertificadoTradicionComponent.prototype.enviarTramite = function () {
        var _this = this;
        var token = this._loginService.getToken();
        var datos = {
            'dato1': 'k'
        };
        this._DefaultService.pdfLicenciaTransito(token, datos).subscribe(function (response) {
            // this.respuesta = response; 
            (function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert("Error en la petición");
                }
            });
        });
        // this.datos.tramiteFactura =58;
        // this.readyTramite.emit({'foraneas':this.datos, 'resumen':this.resumen});
        this.datos.facturaId = this.factura.id;
        this.datos.tramiteFormulario = 'rnrs-certificadotradicion';
        this.datos.certificadoEntregada = this.certificadoEntregado;
        this.datos.entregado = this.ciudadanoId;
        this.readyTramite.emit({ 'foraneas': this.datos, 'resumen': this.resumen });
    };
    NewRnrsCertificadoTradicionComponent.prototype.onCancelar = function () {
        this.cancelarTramite.emit(true);
    };
    NewRnrsCertificadoTradicionComponent.prototype.onKeyCiudadano = function () {
        var _this = this;
        var token = this._loginService.getToken();
        var identificacion = {
            'numeroIdentificacion': this.ciudadanoId,
        };
        this._CiudadanoService.searchByIdentificacion(token, identificacion).subscribe(function (response) {
            _this.respuesta = response;
            if (_this.respuesta.status == 'success') {
                _this.ciudadano = _this.respuesta.data;
                _this.ciudadanoEncontrado = 2;
                _this.ciudadanoNew = false;
            }
            else {
                _this.ciudadanoEncontrado = 3;
                _this.ciudadanoNew = true;
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
    NewRnrsCertificadoTradicionComponent.prototype.ready = function () {
        this.ciudadanoEncontrado = 3;
    };
    return NewRnrsCertificadoTradicionComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRnrsCertificadoTradicionComponent.prototype, "readyTramite", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRnrsCertificadoTradicionComponent.prototype, "cancelarTramite", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRnrsCertificadoTradicionComponent.prototype, "vehiculo", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRnrsCertificadoTradicionComponent.prototype, "factura", void 0);
NewRnrsCertificadoTradicionComponent = __decorate([
    core_1.Component({
        selector: 'appRnrs-certificadoTradicion',
        templateUrl: './newRnrs.certificadoTradicion.html'
    }),
    __metadata("design:paramtypes", [tramiteSolicitud_service_1.TramiteSolicitudService,
        login_service_1.LoginService,
        sustrato_service_1.SustratoService,
        vehiculo_service_1.VehiculoService,
        ciudadano_service_1.CiudadanoService,
        default_service_1.DefaultService])
], NewRnrsCertificadoTradicionComponent);
exports.NewRnrsCertificadoTradicionComponent = NewRnrsCertificadoTradicionComponent;
//# sourceMappingURL=newRnrs.certificadoTradicion.component.js.map