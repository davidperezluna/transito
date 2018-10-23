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
var svCfgClaseChoque_modelo_1 = require("../svCfgClaseChoque.modelo");
var svCfgClaseChoque_service_1 = require("../../../services/svCfgClaseChoque.service");
var login_service_1 = require("../../../services/login.service");
var sweetalert2_1 = require("sweetalert2");
var cfgClaseAccidente_service_1 = require("../../../services/cfgClaseAccidente.service");
var NewComponent = (function () {
    function NewComponent(_ClaseChoqueService, _loginService, _ClaseAccidenteService) {
        this._ClaseChoqueService = _ClaseChoqueService;
        this._loginService = _loginService;
        this._ClaseAccidenteService = _ClaseAccidenteService;
        this.ready = new core_1.EventEmitter();
    }
    NewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.claseChoque = new svCfgClaseChoque_modelo_1.SvCfgClaseChoque(null, null, null);
        this._ClaseAccidenteService.getClaseAccidenteSelect().subscribe(function (response) {
            _this.clasesAccidente = response;
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
        this.claseChoque.claseAccidente = this.claseAccidenteSelected;
        this._ClaseChoqueService.register(this.claseChoque, token).subscribe(function (response) {
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
    __metadata("design:paramtypes", [svCfgClaseChoque_service_1.SvCfgClaseChoqueService,
        login_service_1.LoginService,
        cfgClaseAccidente_service_1.CfgClaseAccidenteService])
], NewComponent);
exports.NewComponent = NewComponent;
//# sourceMappingURL=new.component.js.map