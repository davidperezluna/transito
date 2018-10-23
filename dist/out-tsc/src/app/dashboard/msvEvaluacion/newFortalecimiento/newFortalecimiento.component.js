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
var msvParametro_service_1 = require("../../../services/msvParametro.service");
var msvVariable_service_1 = require("../../../services/msvVariable.service");
var msvCalificacion_service_1 = require("../../../services/msvCalificacion.service");
var sweetalert2_1 = require("sweetalert2");
var NewFortalecimientoComponent = (function () {
    function NewFortalecimientoComponent(_loginService, _MsvParametroService, _MsvVariableService, _MsvCalificacionService) {
        this._loginService = _loginService;
        this._MsvParametroService = _MsvParametroService;
        this._MsvVariableService = _MsvVariableService;
        this._MsvCalificacionService = _MsvCalificacionService;
        this.miEmpresa = null;
        this.msj = '';
        this.showT = false;
        this.datos = [];
    }
    NewFortalecimientoComponent.prototype.ngOnInit = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this._MsvParametroService.getParametroByCategoriaId(token, this.msvCategoriaId).subscribe(function (response) {
            _this.msvParametros = response.data;
            if (_this.msvParametros) {
                //entra aquí si encuentra Parametro                    
                _this.showT = true;
            }
            else {
                sweetalert2_1.default({
                    type: 'error',
                    title: 'Oops...',
                    text: '¡La categoria no tiene parametros!'
                });
            }
        });
    };
    NewFortalecimientoComponent.prototype.onEnviar = function () {
        console.log(this.msvParametros);
        var token = this._loginService.getToken();
        this._MsvCalificacionService.newCalificacion(token, this.msvParametros, this.miEmpresa.id).subscribe();
    };
    return NewFortalecimientoComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewFortalecimientoComponent.prototype, "msvCategoriaId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewFortalecimientoComponent.prototype, "miEmpresa", void 0);
NewFortalecimientoComponent = __decorate([
    core_1.Component({
        selector: 'app-new-fortalecimiento',
        templateUrl: './newFortalecimiento.html'
    }),
    __metadata("design:paramtypes", [login_service_1.LoginService,
        msvParametro_service_1.MsvParametroService,
        msvVariable_service_1.MsvVariableService,
        msvCalificacion_service_1.MsvCalificacionService])
], NewFortalecimientoComponent);
exports.NewFortalecimientoComponent = NewFortalecimientoComponent;
//# sourceMappingURL=newFortalecimiento.component.js.map