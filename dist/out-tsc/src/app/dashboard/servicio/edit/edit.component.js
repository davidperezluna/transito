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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var servicio_service_1 = require("../../../services/servicio.service");
var login_service_1 = require("../../../services/login.service");
var sweetalert2_1 = require("sweetalert2");
var EditComponent = /** @class */ (function () {
    function EditComponent(_ServicioService, _loginService) {
        this._ServicioService = _ServicioService;
        this._loginService = _loginService;
        this.ready = new core_1.EventEmitter();
        this.servicio = null;
    }
    EditComponent.prototype.onCancelar = function () {
        this.ready.emit(true);
    };
    EditComponent.prototype.onEnviar = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this._ServicioService.editServicio(this.servicio, token).subscribe(function (response) {
            _this.respuesta = response;
            console.log(_this.respuesta);
            if (_this.respuesta.status == 'success') {
                _this.ready.emit(true);
                sweetalert2_1.default({
                    title: 'Echo!',
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
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], EditComponent.prototype, "ready", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], EditComponent.prototype, "servicio", void 0);
    EditComponent = __decorate([
        core_1.Component({
            selector: 'app-edit',
            templateUrl: './edit.component.html'
        }),
        __metadata("design:paramtypes", [servicio_service_1.ServicioService,
            login_service_1.LoginService])
    ], EditComponent);
    return EditComponent;
}());
exports.EditComponent = EditComponent;
//# sourceMappingURL=edit.component.js.map