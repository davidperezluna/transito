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
var gdDocumento_service_1 = require("../../../services/gdDocumento.service");
var gdTrazabilidad_service_1 = require("../../../services/gdTrazabilidad.service");
var gdCfgMedioCorrespondencia_service_1 = require("../../../services/gdCfgMedioCorrespondencia.service");
var sedeOperativa_service_1 = require("../../../services/sedeOperativa.service");
var login_service_1 = require("../../../services/login.service");
var environment_1 = require("environments/environment");
var sweetalert2_1 = require("sweetalert2");
var PrintComponent = (function () {
    function PrintComponent(_DocumentoService, _TrazabilidadService, _MedioCorrespondenciaService, _SedeOperativaService, _loginService) {
        this._DocumentoService = _DocumentoService;
        this._TrazabilidadService = _TrazabilidadService;
        this._MedioCorrespondenciaService = _MedioCorrespondenciaService;
        this._SedeOperativaService = _SedeOperativaService;
        this._loginService = _loginService;
        this.ready = new core_1.EventEmitter();
        this.documento = null;
        this.docsUrl = environment_1.environment.docsUrl;
        this.trazabilidades = null;
        this.datos = {
            'fechaEnvio': null,
            'detalleEnvio': null,
            'observaciones': null,
            'numeroCarpeta': null,
            'idMedioCorrespondenciaEnvio': null,
            'idSedeOperativa': null,
            'idDocumento': null,
        };
    }
    PrintComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.date = new Date();
        var token = this._loginService.getToken();
        this._TrazabilidadService.searchResponseByDocumento({ 'idDocumento': this.documento.id }, token).subscribe(function (response) {
            _this.trazabilidades = response.data;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
        this._MedioCorrespondenciaService.select().subscribe(function (response) {
            _this.mediosCorrespondencia = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
        this._SedeOperativaService.getSedeOperativaSelect().subscribe(function (response) {
            _this.sedesOperativas = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
    };
    PrintComponent.prototype.onCancelar = function () {
        this.ready.emit(true);
    };
    PrintComponent.prototype.onEnviar = function () {
        var _this = this;
        this.datos.idDocumento = this.documento.id;
        var token = this._loginService.getToken();
        this._DocumentoService.print(this.datos, token).subscribe(function (response) {
            if (response.status == 'success') {
                _this.ready.emit(true);
                sweetalert2_1.default({
                    title: 'Perfecto!',
                    text: response.message,
                    type: 'success',
                    confirmButtonText: 'Aceptar'
                });
            }
            else {
                sweetalert2_1.default({
                    title: 'Error!',
                    text: response.message,
                    type: 'error',
                    confirmButtonText: 'Aceptar'
                });
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
    return PrintComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], PrintComponent.prototype, "ready", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], PrintComponent.prototype, "documento", void 0);
PrintComponent = __decorate([
    core_1.Component({
        selector: 'app-print',
        templateUrl: './print.component.html',
    }),
    __metadata("design:paramtypes", [gdDocumento_service_1.GdDocumentoService,
        gdTrazabilidad_service_1.GdTrazabilidadService,
        gdCfgMedioCorrespondencia_service_1.GdCfgMedioCorrespondenciaService,
        sedeOperativa_service_1.SedeOperativaService,
        login_service_1.LoginService])
], PrintComponent);
exports.PrintComponent = PrintComponent;
//# sourceMappingURL=print.component.js.map