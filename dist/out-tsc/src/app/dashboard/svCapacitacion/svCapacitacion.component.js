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
var svCapacitacion_service_1 = require("../../services/svCapacitacion.service");
var ciudadano_service_1 = require("../../services/ciudadano.service");
var login_service_1 = require("../../services/login.service");
var sweetalert2_1 = require("sweetalert2");
var SvCapacitacionComponent = (function () {
    function SvCapacitacionComponent(_CapacitacionService, _CiudadanoService, _loginService) {
        this._CapacitacionService = _CapacitacionService;
        this._CiudadanoService = _CiudadanoService;
        this._loginService = _loginService;
        this.ciudadano = null;
        this.capacitaciones = null;
        this.formNew = false;
        this.formEdit = false;
        this.formIndex = true;
    }
    SvCapacitacionComponent.prototype.ngOnInit = function () { };
    SvCapacitacionComponent.prototype.onNew = function () {
        this.formNew = true;
        this.formIndex = false;
    };
    SvCapacitacionComponent.prototype.ready = function (isCreado) {
        if (isCreado) {
            this.formNew = false;
            this.formEdit = false;
            this.formIndex = true;
            this.ngOnInit();
        }
    };
    SvCapacitacionComponent.prototype.onSearch = function () {
        var _this = this;
        sweetalert2_1.default({
            title: 'Buscando número de cédula',
            text: 'Solo tardará unos segundos, por favor espere.',
            onOpen: function () {
                sweetalert2_1.default.showLoading();
            }
        }).then(function (result) {
            if (
            // Read more about handling dismissals
            result.dismiss === sweetalert2_1.default.DismissReason.timer) {
            }
        });
        var token = this._loginService.getToken();
        var datos = {
            'cedula': this.cedula
        };
        this._CiudadanoService.showCiudadanoCedulaId(token, datos).subscribe(function (response) {
            if (response.status == 'success') {
                _this.ciudadano = response.data;
                _this._CapacitacionService.index({ 'identificacion': _this.ciudadano.identificacion }, token).subscribe(function (response) {
                    if (response.status == 'success') {
                        _this.capacitaciones = response.data;
                    }
                    else {
                        sweetalert2_1.default({
                            title: 'Alerta!',
                            text: response.message,
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
                sweetalert2_1.default.close();
            }
            else {
                sweetalert2_1.default({
                    title: 'Alerta!',
                    text: response.message,
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
    return SvCapacitacionComponent;
}());
SvCapacitacionComponent = __decorate([
    core_1.Component({
        selector: 'app-index',
        templateUrl: './svCapacitacion.component.html'
    }),
    __metadata("design:paramtypes", [svCapacitacion_service_1.SvCapacitacionService,
        ciudadano_service_1.CiudadanoService,
        login_service_1.LoginService])
], SvCapacitacionComponent);
exports.SvCapacitacionComponent = SvCapacitacionComponent;
//# sourceMappingURL=svCapacitacion.component.js.map