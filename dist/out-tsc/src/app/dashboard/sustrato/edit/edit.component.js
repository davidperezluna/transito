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
var sustrato_service_1 = require("../../../services/sustrato.service");
var login_service_1 = require("../../../services/login.service");
var sedeOperativa_service_1 = require("../../../services/sedeOperativa.service");
var modulo_service_1 = require("../../../services/modulo.service");
var sweetalert2_1 = require("sweetalert2");
var EditComponent = (function () {
    function EditComponent(_SustratoService, _loginService, _SedeOperativaService, _ModuloService) {
        this._SustratoService = _SustratoService;
        this._loginService = _loginService;
        this._SedeOperativaService = _SedeOperativaService;
        this._ModuloService = _ModuloService;
        this.ready = new core_1.EventEmitter();
        this.sustrato = null;
        this.formReady = false;
    }
    EditComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log(this.sustrato);
        this.estadoList = ['Utilizado', 'Disponible', 'Dañado por impresión.'];
        this._SedeOperativaService.getSedeOperativaSelect().subscribe(function (response) {
            _this.sedesOperativas = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
        this._ModuloService.getModuloSelect().subscribe(function (response) {
            _this.modulos = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
    };
    EditComponent.prototype.onCancelar = function () { this.ready.emit(true); };
    EditComponent.prototype.onEnviar = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this.sustrato.sedeOperativaId = this.sedeOperativaSelected;
        this.sustrato.moduloId = this.moduloSelected;
        this._SustratoService.editSustrato(this.sustrato, token).subscribe(function (response) {
            _this.respuesta = response;
            console.log(_this.respuesta);
            if (_this.respuesta.status == 'success') {
                _this.ready.emit(true);
                sweetalert2_1.default({
                    title: 'Perfecto!',
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
    return EditComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], EditComponent.prototype, "ready", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], EditComponent.prototype, "sustrato", void 0);
EditComponent = __decorate([
    core_1.Component({
        selector: 'app-edit',
        templateUrl: './edit.component.html'
    }),
    __metadata("design:paramtypes", [sustrato_service_1.SustratoService,
        login_service_1.LoginService,
        sedeOperativa_service_1.SedeOperativaService,
        modulo_service_1.ModuloService])
], EditComponent);
exports.EditComponent = EditComponent;
//# sourceMappingURL=edit.component.js.map