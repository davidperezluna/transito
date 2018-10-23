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
var municipio_service_1 = require("../../../../services/municipio.service");
var tipoIdentificacion_service_1 = require("../../../../services/tipoIdentificacion.service");
var login_service_1 = require("../../../../services/login.service");
var NewRnaRematriculaComponent = (function () {
    function NewRnaRematriculaComponent(_TramiteSolicitudService, _loginService, _SustratoService, _MunicipioService, _TipoIdentificacionService) {
        this._TramiteSolicitudService = _TramiteSolicitudService;
        this._loginService = _loginService;
        this._SustratoService = _SustratoService;
        this._MunicipioService = _MunicipioService;
        this._TipoIdentificacionService = _TipoIdentificacionService;
        this.readyTramite = new core_1.EventEmitter();
        this.cancelarTramite = new core_1.EventEmitter();
        this.resumen = {};
        this.datos = {
            'entidad': null,
            'numeroActa': null,
            'fechaActa': null,
            'municipioActa': null,
            'numeroRunt': null,
            'fechaEntrega': null,
            'municipioEntrega': null,
            'tipoIdentificacionEntrega': null,
            'numeroIdentificacionEntrega': null,
            'nombreEntrega': null,
            'estado': null,
            'sustrato': null,
            'tramiteFactura': null,
        };
    }
    NewRnaRematriculaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.entidadList = ['Fiscalía,', 'SIJIN', 'DIJIN'];
        this._SustratoService.getSustratoSelect().subscribe(function (response) {
            _this.sustratos = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
        this._MunicipioService.getMunicipioSelect().subscribe(function (response) {
            _this.municipios = response;
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
    NewRnaRematriculaComponent.prototype.enviarTramite = function () {
        this.datos.numeroRunt = this.numeroRunt;
        this.datos.entidad = this.entidadSelected;
        this.datos.numeroActa = this.numeroActa;
        this.datos.fechaActa = this.fechaActa;
        this.datos.municipioActa = this.municipioActaSelected;
        this.datos.municipioEntrega = this.municipioEntregaSelected;
        this.datos.fechaEntrega = this.fechaEntrega;
        this.datos.tipoIdentificacionEntrega = this.tipoIdentificacionEntregaSelected;
        this.datos.numeroIdentificacionEntrega = this.numeroIdentificacionEntrega;
        this.datos.nombreEntrega = this.nombreEntrega;
        this.datos.estado = this.estado;
        this.datos.tramiteFactura = 25;
        this.readyTramite.emit({ 'foraneas': this.datos, 'resumen': this.resumen });
    };
    NewRnaRematriculaComponent.prototype.onCancelar = function () {
        this.cancelarTramite.emit(true);
    };
    return NewRnaRematriculaComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRnaRematriculaComponent.prototype, "readyTramite", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRnaRematriculaComponent.prototype, "cancelarTramite", void 0);
NewRnaRematriculaComponent = __decorate([
    core_1.Component({
        selector: 'appRna-rematricula',
        templateUrl: './newRna.rematricula.html'
    }),
    __metadata("design:paramtypes", [tramiteSolicitud_service_1.TramiteSolicitudService,
        login_service_1.LoginService,
        sustrato_service_1.SustratoService,
        municipio_service_1.MunicipioService,
        tipoIdentificacion_service_1.TipoIdentificacionService])
], NewRnaRematriculaComponent);
exports.NewRnaRematriculaComponent = NewRnaRematriculaComponent;
//# sourceMappingURL=newRna.rematricula.component.js.map