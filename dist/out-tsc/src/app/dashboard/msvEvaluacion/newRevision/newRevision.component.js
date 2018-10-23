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
var msvRevision_modelo_1 = require("../../msvRevision/msvRevision.modelo");
var msvRevision_service_1 = require("../../../services/msvRevision.service");
var mpersonalFuncionario_service_1 = require("../../../services/mpersonalFuncionario.service");
var empresa_service_1 = require("../../../services/empresa.service");
var login_service_1 = require("../../../services/login.service");
var sweetalert2_1 = require("sweetalert2");
var NewRevisionComponent = (function () {
    function NewRevisionComponent(_MsvRevisionService, _MsvPersonalFuncionarioService, _EmpresaService, _loginService) {
        this._MsvRevisionService = _MsvRevisionService;
        this._MsvPersonalFuncionarioService = _MsvPersonalFuncionarioService;
        this._EmpresaService = _EmpresaService;
        this._loginService = _loginService;
        this.ready = new core_1.EventEmitter();
        this.formNew = false;
    }
    NewRevisionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.msvRevision = new msvRevision_modelo_1.MsvRevision(null, null, null, null, null, null, null, null, null, null);
        this._MsvPersonalFuncionarioService.selectContratistas().subscribe(function (response) {
            _this.contratistas = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
        this._EmpresaService.getEmpresaSelect().subscribe(function (response) {
            _this.empresas = response;
            console.log(_this.empresas);
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
    };
    NewRevisionComponent.prototype.onCancelar = function () {
        this.ready.emit(true);
    };
    NewRevisionComponent.prototype.onEnviar = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this.msvRevision.funcionarioId = this.contratistaSelected;
        this.msvRevision.empresaId = this.empresaSelected;
        this._MsvRevisionService.register(this.msvRevision, token).subscribe(function (response) {
            _this.respuesta = response;
            if (_this.respuesta.status == 'success') {
                sweetalert2_1.default({
                    title: 'Perfecto!',
                    text: 'Se ha registrado con exito',
                    type: 'success',
                    confirmButtonText: 'Aceptar'
                });
                _this.ready.emit(true);
            }
            else {
                sweetalert2_1.default({
                    title: 'Error!',
                    text: 'La revisión ya se encuentra registrado',
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
    return NewRevisionComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRevisionComponent.prototype, "ready", void 0);
NewRevisionComponent = __decorate([
    core_1.Component({
        selector: 'app-newRevision',
        templateUrl: './newRevision.component.html'
    }),
    __metadata("design:paramtypes", [msvRevision_service_1.MsvRevisionService,
        mpersonalFuncionario_service_1.MpersonalFuncionarioService,
        empresa_service_1.EmpresaService,
        login_service_1.LoginService])
], NewRevisionComponent);
exports.NewRevisionComponent = NewRevisionComponent;
//# sourceMappingURL=newRevision.component.js.map