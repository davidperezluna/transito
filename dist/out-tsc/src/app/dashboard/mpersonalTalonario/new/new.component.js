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
var mpersonalTalonario_modelo_1 = require("../mpersonalTalonario.modelo");
var mpersonalTalonario_service_1 = require("../../../services/mpersonalTalonario.service");
var sedeOperativa_service_1 = require("../../../services/sedeOperativa.service");
var login_service_1 = require("../../../services/login.service");
var sweetalert2_1 = require("sweetalert2");
var NewComponent = (function () {
    function NewComponent(_FuncionarioService, _SedeOperativaService, _loginService) {
        this._FuncionarioService = _FuncionarioService;
        this._SedeOperativaService = _SedeOperativaService;
        this._loginService = _loginService;
        this.ready = new core_1.EventEmitter();
        this.sedeOperativa = null;
        this.respuesta = null;
    }
    NewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.talonario = new mpersonalTalonario_modelo_1.MpersonalTalonario(null, null, null, null, null, null, null, null);
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
    NewComponent.prototype.onCalcularTotal = function () {
        var ini, fin, rangos;
        ini = this.talonario.desde;
        fin = this.talonario.hasta;
        if (fin > ini) {
            rangos = (fin - ini) + 1;
            if (rangos < 0) {
                rangos = 0;
            }
            this.talonario.rangos = rangos;
        }
        else {
            sweetalert2_1.default({
                title: 'Alerta!',
                text: 'El número de inicio no puede ser superior o igual al número de finalización',
                type: 'error',
                confirmButtonText: 'Aceptar'
            });
            this.talonario.rangos = null;
        }
    };
    NewComponent.prototype.onChangedSedeOperativa = function (e) {
        var _this = this;
        if (e) {
            var token = this._loginService.getToken();
            this._SedeOperativaService.showSedeOperativa(token, e).subscribe(function (response) {
                _this.sedeOperativa = response.data;
            }, function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert("Error en la petición");
                }
            });
        }
    };
    NewComponent.prototype.onCancelar = function () {
        this.ready.emit(true);
    };
    NewComponent.prototype.onEnviar = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this.talonario.sedeOperativaId = this.sedeOperativaSelected;
        this._FuncionarioService.register(this.talonario, token).subscribe(function (response) {
            _this.respuesta = response;
            if (_this.respuesta.status == 'success') {
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
    __metadata("design:paramtypes", [mpersonalTalonario_service_1.MpersonalTalonarioService,
        sedeOperativa_service_1.SedeOperativaService,
        login_service_1.LoginService])
], NewComponent);
exports.NewComponent = NewComponent;
//# sourceMappingURL=new.component.js.map