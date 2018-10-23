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
var gdDocumento_service_1 = require("../../../services/gdDocumento.service");
var login_service_1 = require("../../../services/login.service");
var sweetalert2_1 = require("sweetalert2");
var TemplateComponent = (function () {
    function TemplateComponent(_DocumentoService, _loginService) {
        this._DocumentoService = _DocumentoService;
        this._loginService = _loginService;
        this.ready = new core_1.EventEmitter();
        this.file = null;
    }
    TemplateComponent.prototype.ngOnInit = function () { };
    TemplateComponent.prototype.onFileChange = function (event) {
        if (event.target.files.length > 0) {
            var fileSelected = event.target.files[0];
            this.file = new FormData();
            this.file.append('file', fileSelected);
        }
    };
    TemplateComponent.prototype.onRegister = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this._DocumentoService.template(this.file, token).subscribe(function (response) {
            if (response.status == 'success') {
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
    return TemplateComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], TemplateComponent.prototype, "ready", void 0);
TemplateComponent = __decorate([
    core_1.Component({
        selector: 'app-template',
        templateUrl: './template.component.html',
    }),
    __metadata("design:paramtypes", [gdDocumento_service_1.GdDocumentoService,
        login_service_1.LoginService])
], TemplateComponent);
exports.TemplateComponent = TemplateComponent;
//# sourceMappingURL=template.component.js.map