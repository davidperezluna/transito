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
var mpersonalFuncionario_service_1 = require("../../../services/mpersonalFuncionario.service");
var gdDocumento_service_1 = require("../../../services/gdDocumento.service");
var login_service_1 = require("../../../services/login.service");
var sweetalert2_1 = require("sweetalert2");
var ShowComponent = (function () {
    function ShowComponent(_DocumentoService, _FuncionarioService, _loginService) {
        this._DocumentoService = _DocumentoService;
        this._FuncionarioService = _FuncionarioService;
        this._loginService = _loginService;
        this.ready = new core_1.EventEmitter();
        this.documento = null;
        this.datos = {
            'observaciones': null,
            'idFuncionario': null,
            'idDocumento': null
        };
    }
    ShowComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.date = new Date();
        this._FuncionarioService.select().subscribe(function (response) {
            _this.funcionarios = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
    };
    ShowComponent.prototype.onCancelar = function () {
        this.ready.emit(true);
    };
    ShowComponent.prototype.onRegister = function () {
        var _this = this;
        this.datos.idDocumento = this.documento.id;
        var token = this._loginService.getToken();
        this._DocumentoService.assign(this.datos, token).subscribe(function (response) {
            if (response.status == 'success') {
                sweetalert2_1.default({
                    title: 'Perfecto!',
                    text: response.message,
                    type: 'success',
                    confirmButtonText: 'Aceptar'
                }).then(function (result) {
                    _this.ready.emit(true);
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
    core_1.Input(),
    __metadata("design:type", Object)
], ShowComponent.prototype, "documento", void 0);
ShowComponent = __decorate([
    core_1.Component({
        selector: 'app-show',
        templateUrl: './show.component.html',
    }),
    __metadata("design:paramtypes", [gdDocumento_service_1.GdDocumentoService,
        mpersonalFuncionario_service_1.MpersonalFuncionarioService,
        login_service_1.LoginService])
], ShowComponent);
exports.ShowComponent = ShowComponent;
//# sourceMappingURL=show.component.js.map