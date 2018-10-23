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
var svCfgFuncionCriterio_service_1 = require("../../../services/svCfgFuncionCriterio.service");
var login_service_1 = require("../../../services/login.service");
var sweetalert2_1 = require("sweetalert2");
var svCfgFuncion_service_1 = require("../../../services/svCfgFuncion.service");
var EditComponent = (function () {
    function EditComponent(_FuncionCriterioService, _loginService, _FuncionService) {
        this._FuncionCriterioService = _FuncionCriterioService;
        this._loginService = _loginService;
        this._FuncionService = _FuncionService;
        this.ready = new core_1.EventEmitter();
        this.funcionCriterio = null;
        this.formReady = false;
    }
    EditComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log(this.funcionCriterio);
        this._FuncionService.getFuncionSelect().subscribe(function (response) {
            _this.funciones = response;
            setTimeout(function () {
                _this.funcionSelected = [_this.funcionCriterio.funcion.id];
            });
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
    };
    EditComponent.prototype.onCancelar = function () { this.ready.emit(true); };
    EditComponent.prototype.onEnviar = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this.funcionCriterio.funcion = this.funcionSelected;
        this._FuncionCriterioService.edit(this.funcionCriterio, token).subscribe(function (response) {
            if (response.status == 'success') {
                _this.ready.emit(true);
                sweetalert2_1.default({
                    title: 'Perfecto!',
                    text: response.message,
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
    return EditComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], EditComponent.prototype, "ready", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], EditComponent.prototype, "funcionCriterio", void 0);
EditComponent = __decorate([
    core_1.Component({
        selector: 'app-edit',
        templateUrl: './edit.component.html'
    }),
    __metadata("design:paramtypes", [svCfgFuncionCriterio_service_1.SvCfgFuncionCriterioService,
        login_service_1.LoginService,
        svCfgFuncion_service_1.SvCfgFuncionService])
], EditComponent);
exports.EditComponent = EditComponent;
//# sourceMappingURL=edit.component.js.map