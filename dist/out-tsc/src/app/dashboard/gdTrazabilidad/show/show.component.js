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
var gdTrazabilidad_service_1 = require("../../../services/gdTrazabilidad.service");
var login_service_1 = require("../../../services/login.service");
var sweetalert2_1 = require("sweetalert2");
var ShowComponent = (function () {
    function ShowComponent(_TrazabilidadService, _loginService) {
        this._TrazabilidadService = _TrazabilidadService;
        this._loginService = _loginService;
        this.ready = new core_1.EventEmitter();
        this.onNew = new core_1.EventEmitter();
        this.trazabilidad = null;
        this.datos = {
            'observaciones': null,
            'aceptada': null,
            'idTrazabilidad': null,
        };
    }
    ShowComponent.prototype.ngOnInit = function () {
        this.date = new Date();
        this.datos.aceptada = 'true';
    };
    ShowComponent.prototype.onCancelar = function () {
        this.ready.emit(true);
    };
    ShowComponent.prototype.onRegister = function () {
        var _this = this;
        this.datos.idTrazabilidad = this.trazabilidad.id;
        var token = this._loginService.getToken();
        this._TrazabilidadService.process(this.datos, token).subscribe(function (response) {
            if (response.status == 'success') {
                if (response.data.aceptada) {
                    _this.onNew.emit(response.data);
                }
                else {
                    _this.ready.emit(response.data);
                }
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
    return ShowComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ShowComponent.prototype, "ready", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ShowComponent.prototype, "onNew", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ShowComponent.prototype, "trazabilidad", void 0);
ShowComponent = __decorate([
    core_1.Component({
        selector: 'app-show',
        templateUrl: './show.component.html',
    }),
    __metadata("design:paramtypes", [gdTrazabilidad_service_1.GdTrazabilidadService,
        login_service_1.LoginService])
], ShowComponent);
exports.ShowComponent = ShowComponent;
//# sourceMappingURL=show.component.js.map