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
var gdTrazabilidad_service_1 = require("../../../services/gdTrazabilidad.service");
var login_service_1 = require("../../../services/login.service");
var environment_1 = require("environments/environment");
var sweetalert2_1 = require("sweetalert2");
var NewComponent = (function () {
    function NewComponent(_TrazabilidadService, _loginService) {
        this._TrazabilidadService = _TrazabilidadService;
        this._loginService = _loginService;
        this.ready = new core_1.EventEmitter();
        this.trazabilidad = null;
        this.uploadUrl = environment_1.environment.uploadUrl;
        this.datos = {
            'descripcion': null,
            'idTrazabilidad': null,
        };
    }
    NewComponent.prototype.ngOnInit = function () {
    };
    NewComponent.prototype.onCancelar = function () {
        this.ready.emit(true);
    };
    NewComponent.prototype.onFileChange = function (event) {
        if (event.target.files.length > 0) {
            var fileSelected = event.target.files[0];
            this.file = new FormData();
            this.file.append('file', fileSelected);
        }
    };
    NewComponent.prototype.onEnviar = function () {
        var _this = this;
        this.datos.idTrazabilidad = this.trazabilidad.id;
        var token = this._loginService.getToken();
        this._TrazabilidadService.response(this.file, this.datos, token).subscribe(function (response) {
            if (response.status == 'success') {
                _this.ready.emit(response.data);
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
                    text: 'El trazabilidad ya se encuentra registrado',
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
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewComponent.prototype, "trazabilidad", void 0);
NewComponent = __decorate([
    core_1.Component({
        selector: 'app-new',
        templateUrl: './new.component.html'
    }),
    __metadata("design:paramtypes", [gdTrazabilidad_service_1.GdTrazabilidadService,
        login_service_1.LoginService])
], NewComponent);
exports.NewComponent = NewComponent;
//# sourceMappingURL=new.component.js.map