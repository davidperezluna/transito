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
var login_service_1 = require("../../../services/login.service");
var sedeOperativa_service_1 = require("../../../services/sedeOperativa.service");
var tramiteSolicitud_service_1 = require("../../../services/tramiteSolicitud.service");
var common_1 = require("@angular/common");
var sweetalert2_1 = require("sweetalert2");
var TramiteComponent = (function () {
    function TramiteComponent(_SedeOperativaService, _TramiteSolicitudService, _loginService) {
        this._SedeOperativaService = _SedeOperativaService;
        this._TramiteSolicitudService = _TramiteSolicitudService;
        this._loginService = _loginService;
        this.ready = new core_1.EventEmitter();
        this.formIndex = true;
        this.repFecha = false;
        this.informe = false;
        this.informe2 = false;
        this.multa = false;
        this.tramite = false;
        this.retefuente = false;
        this.resumen = {};
        this.datos = {
            'desde': null,
            'hasta': null,
            'sedeOperativa': null,
        };
    }
    TramiteComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._SedeOperativaService.getSedeOperativaSelect().subscribe(function (response) {
            _this.sedeOperativas = response;
            _this.repFecha = false;
            _this.informe = false;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._TramiteSolicitudService.getTramiteReporte().subscribe(function (response) {
            _this.tramiteReportes = response.data;
            console.log(_this.tramiteReportes);
            var timeoutId = setTimeout(function () {
                _this.iniciarTabla();
                sweetalert2_1.default.close();
            }, 100);
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
    };
    TramiteComponent.prototype.iniciarTabla = function () {
    };
    TramiteComponent.prototype.onCancelar = function () {
        this.multa = false;
        // this.ready.emit(true);
    };
    TramiteComponent.prototype.onEnviar = function () {
    };
    TramiteComponent.prototype.reporteFecha = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this.datos.sedeOperativa = this.sedeOperativaSelected;
        console.log(this.datos);
        this._TramiteSolicitudService.getReporteFecha(token, this.datos).subscribe(function (response) {
            _this.reporteFechas = response.data;
            _this.repFecha = true;
            _this.informe = false;
            _this.informe2 = true;
            var timeoutId = setTimeout(function () {
                _this.iniciarTabla();
                sweetalert2_1.default.close();
            }, 100);
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
    };
    TramiteComponent.prototype.reporteDiario = function () {
        var _this = this;
        var desde = new Date();
        this.hasta = new Date();
        this.hasta.setDate(desde.getDate() + 1);
        var datePiper = new common_1.DatePipe(this.hasta);
        var datePiper = new common_1.DatePipe(this.desde);
        this.datos.hasta = datePiper.transform(this.hasta, 'yyyy-MM-dd');
        this.datos.desde = datePiper.transform(desde, 'yyyy-MM-dd');
        console.log(this.datos);
        var token = this._loginService.getToken();
        this.datos.sedeOperativa = this.sedeOperativaSelected;
        this._TramiteSolicitudService.getReporteFecha(token, this.datos).subscribe(function (response) {
            _this.reporteFechas = response.data;
            _this.repFecha = true;
            _this.informe = false;
            _this.informe2 = true;
            console.log(_this.reporteFecha);
            var timeoutId = setTimeout(function () {
                _this.iniciarTabla();
                sweetalert2_1.default.close();
            }, 100);
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
    };
    return TramiteComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], TramiteComponent.prototype, "ready", void 0);
TramiteComponent = __decorate([
    core_1.Component({
        selector: 'app-tramite',
        templateUrl: './tramite.component.html',
        providers: [common_1.DatePipe]
    }),
    __metadata("design:paramtypes", [sedeOperativa_service_1.SedeOperativaService,
        tramiteSolicitud_service_1.TramiteSolicitudService,
        login_service_1.LoginService])
], TramiteComponent);
exports.TramiteComponent = TramiteComponent;
//# sourceMappingURL=tramite.component.js.map