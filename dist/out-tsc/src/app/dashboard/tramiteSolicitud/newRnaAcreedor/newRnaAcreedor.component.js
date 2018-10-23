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
var banco_modelo_1 = require("../../banco/banco.modelo");
var vehiculo_modelo_1 = require("../../vehiculo/vehiculo.modelo");
var banco_service_1 = require("../../../services/banco.service");
var login_service_1 = require("../../../services/login.service");
var vehiculoAcreedor_service_1 = require("../../../services/vehiculoAcreedor.service");
var sweetalert2_1 = require("sweetalert2");
var NewRnaAcreedorComponent = (function () {
    function NewRnaAcreedorComponent(_BancoService, _loginService, _VehiculoAcreedorService) {
        this._BancoService = _BancoService;
        this._loginService = _loginService;
        this._VehiculoAcreedorService = _VehiculoAcreedorService;
        this.ready = new core_1.EventEmitter();
        this.identificacion = null;
        this.tipoIdentificacion = null;
        this.vehiculo = null;
        this.nombreAcreedor = null;
        this.acreedorNew = false;
    }
    NewRnaAcreedorComponent.prototype.ngOnInit = function () {
        this.banco = new banco_modelo_1.Banco(null, this.nombreAcreedor);
    };
    NewRnaAcreedorComponent.prototype.onCancelar = function () {
        this.ready.emit(false);
    };
    NewRnaAcreedorComponent.prototype.onEnviar = function () {
        var _this = this;
        var token = this._loginService.getToken();
        var html = 'Se va a registrar el acreedor:<br>' +
            'Nombre: <b>' + this.banco.nombre + '</b><br>';
        sweetalert2_1.default({
            title: 'Creacion de acreedor',
            type: 'warning',
            html: html,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: '<i class="fa fa-thumbs-up"></i> Crear!',
            confirmButtonAriaLabel: 'Thumbs up, great!',
            cancelButtonText: '<i class="fa fa-thumbs-down"></i> No crear',
            cancelButtonAriaLabel: 'Thumbs down',
        }).then(function (result) {
            if (result.value) {
                console.log(_this.banco);
                _this._BancoService.register(_this.banco, token).subscribe(function (response) {
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
                            text: 'El acreedor ya se encuentra registrado',
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
            }
            else if (
            // Read more about handling dismissals
            result.dismiss === sweetalert2_1.default.DismissReason.cancel) {
            }
        });
    };
    return NewRnaAcreedorComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRnaAcreedorComponent.prototype, "ready", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRnaAcreedorComponent.prototype, "identificacion", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRnaAcreedorComponent.prototype, "tipoIdentificacion", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", vehiculo_modelo_1.Vehiculo)
], NewRnaAcreedorComponent.prototype, "vehiculo", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRnaAcreedorComponent.prototype, "nombreAcreedor", void 0);
NewRnaAcreedorComponent = __decorate([
    core_1.Component({
        selector: 'app-new-rna-acreedor',
        templateUrl: './newRnaAcreedor.component.html'
    }),
    __metadata("design:paramtypes", [banco_service_1.BancoService,
        login_service_1.LoginService,
        vehiculoAcreedor_service_1.VehiculoAcreedorService])
], NewRnaAcreedorComponent);
exports.NewRnaAcreedorComponent = NewRnaAcreedorComponent;
//# sourceMappingURL=newRnaAcreedor.component.js.map