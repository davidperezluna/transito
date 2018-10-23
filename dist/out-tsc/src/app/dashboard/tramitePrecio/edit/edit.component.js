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
var tramitePrecio_service_1 = require("../../../services/tramitePrecio.service");
var tramite_service_1 = require("../../../services/tramite.service");
var login_service_1 = require("../../../services/login.service");
var clase_service_1 = require("../../../services/clase.service");
var modulo_service_1 = require("../../../services/modulo.service");
var sweetalert2_1 = require("sweetalert2");
var EditComponent = (function () {
    function EditComponent(_tramitePrecioService, _loginService, _tramiteService, _claseService, _moduloService) {
        this._tramitePrecioService = _tramitePrecioService;
        this._loginService = _loginService;
        this._tramiteService = _tramiteService;
        this._claseService = _claseService;
        this._moduloService = _moduloService;
        this.ready = new core_1.EventEmitter();
        this.tramitePrecio = null;
        this.formReady = false;
    }
    EditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._moduloService.getModuloSelect().subscribe(function (response) {
            _this.modulos = response;
            setTimeout(function () {
                _this.moduloSelected = [_this.tramitePrecio.modulo.id];
            });
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
    };
    EditComponent.prototype.onCancelar = function () {
        this.ready.emit(true);
    };
    EditComponent.prototype.onEnviar = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this.tramitePrecio.tramiteId = this.tramiteSelected;
        this.tramitePrecio.claseId = this.claseSelected;
        this.tramitePrecio.moduloId = this.moduloSelected;
        this._tramitePrecioService.editTramitePrecio(this.tramitePrecio, token).subscribe(function (response) {
            _this.respuesta = response;
            if (_this.respuesta.status == 'success') {
                _this.ready.emit(true);
                sweetalert2_1.default({
                    title: 'Perfecto!',
                    text: 'El registro se ha modificado con exito',
                    type: 'success',
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
    EditComponent.prototype.changedModulo = function (e) {
        var _this = this;
        if (e) {
            this._tramiteService.getTramitePorModuloSelect(this.moduloSelected).subscribe(function (response) {
                _this.tramites = response;
                setTimeout(function () {
                    _this.tramiteSelected = [_this.tramitePrecio.tramite.id];
                });
            }, function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert("Error en la petición");
                }
            });
            this._claseService.getClasePorModuloSelect(this.moduloSelected).subscribe(function (response) {
                _this.clases = response;
                setTimeout(function () {
                    _this.claseSelected = [_this.tramitePrecio.clase.id];
                });
            }, function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert("Error en la petición");
                }
            });
        }
    };
    return EditComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], EditComponent.prototype, "ready", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], EditComponent.prototype, "tramitePrecio", void 0);
EditComponent = __decorate([
    core_1.Component({
        selector: 'app-edit',
        templateUrl: './edit.component.html'
    }),
    __metadata("design:paramtypes", [tramitePrecio_service_1.TramitePrecioService,
        login_service_1.LoginService,
        tramite_service_1.TramiteService,
        clase_service_1.ClaseService,
        modulo_service_1.ModuloService])
], EditComponent);
exports.EditComponent = EditComponent;
//# sourceMappingURL=edit.component.js.map