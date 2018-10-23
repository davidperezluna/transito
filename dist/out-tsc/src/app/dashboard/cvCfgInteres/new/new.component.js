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
var cvCfgInteres_modelo_1 = require("../cvCfgInteres.modelo");
var cvCfgInteres_service_1 = require("../../../services/cvCfgInteres.service");
var login_service_1 = require("../../../services/login.service");
var sweetalert2_1 = require("sweetalert2");
var NewComponent = (function () {
    function NewComponent(_InteresService, _loginService) {
        this._InteresService = _InteresService;
        this._loginService = _loginService;
        this.ready = new core_1.EventEmitter();
        this.meses = [
            { 'value': 1, 'label': 'Enero' },
            { 'value': 2, 'label': 'Febrero' },
            { 'value': 3, 'label': 'Marzo' },
            { 'value': 4, 'label': 'Abril' },
            { 'value': 5, 'label': 'Mayo' },
            { 'value': 6, 'label': 'Junio' },
            { 'value': 7, 'label': 'Julio' },
            { 'value': 8, 'label': 'Agosto' },
            { 'value': 9, 'label': 'Septiembre' },
            { 'value': 10, 'label': 'Octubre' },
            { 'value': 11, 'label': 'Noviembre' },
            { 'value': 12, 'label': 'Diciembre' }
        ];
    }
    NewComponent.prototype.ngOnInit = function () {
        this.interes = new cvCfgInteres_modelo_1.CvCfgInteres(null, null, null, null);
    };
    NewComponent.prototype.onCancelar = function () {
        this.ready.emit(true);
    };
    NewComponent.prototype.onEnviar = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this._InteresService.register(this.interes, token).subscribe(function (response) {
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
    return NewComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewComponent.prototype, "ready", void 0);
NewComponent = __decorate([
    core_1.Component({
        selector: 'app-new',
        templateUrl: './new.component.html'
    }),
    __metadata("design:paramtypes", [cvCfgInteres_service_1.CvCfgInteresService,
        login_service_1.LoginService])
], NewComponent);
exports.NewComponent = NewComponent;
//# sourceMappingURL=new.component.js.map