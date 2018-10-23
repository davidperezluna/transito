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
var mflInfraccion_modelo_1 = require("../mflInfraccion.modelo");
var mflInfraccionCategoria_service_1 = require("../../../services/mflInfraccionCategoria.service");
var mflInfraccion_service_1 = require("../../../services/mflInfraccion.service");
var login_service_1 = require("../../../services/login.service");
var sweetalert2_1 = require("sweetalert2");
var NewComponent = (function () {
    function NewComponent(_InfraccionService, _InfraccionCategoriaService, _loginService) {
        this._InfraccionService = _InfraccionService;
        this._InfraccionCategoriaService = _InfraccionCategoriaService;
        this._loginService = _loginService;
        this.ready = new core_1.EventEmitter();
    }
    NewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.infraccion = new mflInfraccion_modelo_1.MflInfraccion(null, null, null, null, null);
        this._InfraccionCategoriaService.select().subscribe(function (response) {
            _this.infraccionCategorias = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
    };
    NewComponent.prototype.onCancelar = function () {
        this.ready.emit(true);
    };
    NewComponent.prototype.onEnviar = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this.infraccion.infraccionCategoriaId = this.infraccionCategoriaSelected;
        this._InfraccionService.register(this.infraccion, token).subscribe(function (response) {
            _this.respuesta = response;
            if (_this.respuesta.status == 'success') {
                _this.ready.emit(true);
                sweetalert2_1.default({
                    title: 'Perfecto!',
                    text: 'Registro exitoso!',
                    type: 'success',
                    confirmButtonText: 'Aceptar'
                });
            }
            else {
                sweetalert2_1.default({
                    title: 'Error!',
                    text: 'El infraccionCategoria ya se encuentra registrado',
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
    __metadata("design:paramtypes", [mflInfraccion_service_1.MflInfraccionService,
        mflInfraccionCategoria_service_1.MflInfraccionCategoriaService,
        login_service_1.LoginService])
], NewComponent);
exports.NewComponent = NewComponent;
//# sourceMappingURL=new.component.js.map