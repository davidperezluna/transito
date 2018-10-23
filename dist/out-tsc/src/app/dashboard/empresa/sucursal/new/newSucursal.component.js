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
var sucursal_modelo_1 = require("./sucursal.modelo");
// import { Empresa } from '../new/empresa.modelo';
var sucursal_service_1 = require("../../../../services/sucursal.service");
var login_service_1 = require("../../../../services/login.service");
var municipio_service_1 = require("../../../../services/municipio.service");
var sweetalert2_1 = require("sweetalert2");
var NewSucursalComponent = (function () {
    // los que vienen desde el base de datos
    function NewSucursalComponent(_SucursalService, _loginService, _municipioService) {
        this._SucursalService = _SucursalService;
        this._loginService = _loginService;
        this._municipioService = _municipioService;
        this.readySucursal = new core_1.EventEmitter();
        this.empresa = null;
        this.cerrarFormulario = true;
        this.btnVisible = false;
        this.formNewSucursal = false;
        this.formIndexSucursal = true;
    }
    NewSucursalComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sucursal = new sucursal_modelo_1.Sucursal(null, null, null, null, null, null, null, null, null, null, null);
        this._municipioService.getMunicipioSelect().subscribe(function (response) {
            _this.municipios = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
    };
    // la función cancelar
    NewSucursalComponent.prototype.onCancelar = function () {
        this.readySucursal.emit(true);
    };
    // enviar a guarda
    NewSucursalComponent.prototype.onEnviar = function () {
        var _this = this;
        this.sucursal.municipioId = this.municipioSelected;
        this.sucursal.empresaId = this.empresa.id;
        // let token = this._loginService.getToken();
        var token = this._loginService.getToken();
        this._SucursalService.register(this.sucursal, token).subscribe(function (response) {
            _this.respuesta = response;
            console.log(_this.respuesta);
            if (_this.respuesta.status == 'success') {
                _this.readySucursal.emit(true);
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
                    text: 'El sucursal ya se encuentra registrado',
                    type: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
            (function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert('Error en la petición');
                }
            });
        });
    };
    // final del enviar
    NewSucursalComponent.prototype.onNewSucursal = function () {
        this.formNewSucursal = true;
        this.btnVisible = true;
        this.formIndexSucursal = false;
        // this.table.destroy();
    };
    NewSucursalComponent.prototype.cancelarNewFormulario1 = function () {
        this.btnVisible = false;
        this.formNewSucursal = false;
    };
    return NewSucursalComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewSucursalComponent.prototype, "readySucursal", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewSucursalComponent.prototype, "empresa", void 0);
NewSucursalComponent = __decorate([
    core_1.Component({
        selector: 'app-new-sucursal',
        templateUrl: './new.component.html'
    }),
    __metadata("design:paramtypes", [sucursal_service_1.SucursalService,
        login_service_1.LoginService,
        municipio_service_1.MunicipioService])
], NewSucursalComponent);
exports.NewSucursalComponent = NewSucursalComponent;
//# sourceMappingURL=newSucursal.component.js.map