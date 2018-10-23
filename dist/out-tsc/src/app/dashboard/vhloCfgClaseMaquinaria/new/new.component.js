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
var vhloCfgClaseMaquinaria_modelo_1 = require("../vhloCfgClaseMaquinaria.modelo");
var vhloCfgClaseMaquinaria_service_1 = require("../../../services/vhloCfgClaseMaquinaria.service");
var vhloCfgTipoMaquinaria_service_1 = require("../../../services/vhloCfgTipoMaquinaria.service");
var login_service_1 = require("../../../services/login.service");
var sweetalert2_1 = require("sweetalert2");
var NewComponent = (function () {
    function NewComponent(_ClaseMaquinariaService, _TipoMaquinariaService, _loginService) {
        this._ClaseMaquinariaService = _ClaseMaquinariaService;
        this._TipoMaquinariaService = _TipoMaquinariaService;
        this._loginService = _loginService;
        this.ready = new core_1.EventEmitter();
    }
    NewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.claseMaquinaria = new vhloCfgClaseMaquinaria_modelo_1.VhloCfgClaseMaquinaria(null, null, null, null);
        this._TipoMaquinariaService.select().subscribe(function (response) {
            _this.tiposMaquinaria = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
    };
    NewComponent.prototype.onCancelar = function () {
        this.ready.emit(true);
    };
    NewComponent.prototype.onEnviar = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this._ClaseMaquinariaService.register(this.claseMaquinaria, token).subscribe(function (response) {
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
    __metadata("design:paramtypes", [vhloCfgClaseMaquinaria_service_1.VhloCfgClaseMaquinariaService,
        vhloCfgTipoMaquinaria_service_1.VhloCfgTipoMaquinariaService,
        login_service_1.LoginService])
], NewComponent);
exports.NewComponent = NewComponent;
//# sourceMappingURL=new.component.js.map