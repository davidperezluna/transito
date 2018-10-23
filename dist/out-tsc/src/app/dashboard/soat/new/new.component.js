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
var soat_modelo_1 = require("../soat.modelo");
var soat_service_1 = require("../../../services/soat.service");
var login_service_1 = require("../../../services/login.service");
var municipio_service_1 = require("../../../services/municipio.service");
var sweetalert2_1 = require("sweetalert2");
var NewComponent = (function () {
    function NewComponent(_SoatService, _loginService, _Municipioervice) {
        this._SoatService = _SoatService;
        this._loginService = _loginService;
        this._Municipioervice = _Municipioervice;
        this.ready = new core_1.EventEmitter();
        this.vehiculo = null;
    }
    NewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.soat = new soat_modelo_1.Soat(null, null, null, null, null, null, null, null);
        this._Municipioervice.getMunicipioSelect().subscribe(function (response) {
            _this.municipios = response;
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
        this.soat.idMunicipio = this.municipioSelected;
        this.soat.idVehiculo = this.vehiculo.id;
        sweetalert2_1.default({
            title: '¿Está seguro?',
            text: "¿Desea guardar la información?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#15d4be',
            cancelButtonColor: '#ff6262',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then(function (result) {
            if (result.value) {
                _this._SoatService.register(_this.soat, token).subscribe(function (response) {
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
            }
        });
    };
    NewComponent.prototype.onCalcularVencimiento = function () {
        var _this = this;
        var token = this._loginService.getToken();
        if (this.soat.fechaExpedicion) {
            this._SoatService.getFechaVencimiento({ 'fechaExpedicion': this.soat.fechaExpedicion }, token).subscribe(function (response) {
                if (response.status == 'success') {
                    _this.soat.fechaVencimiento = response.fechaVencimiento;
                    _this.soat.fechaVigencia = response.fechaVigencia;
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
        }
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
], NewComponent.prototype, "vehiculo", void 0);
NewComponent = __decorate([
    core_1.Component({
        selector: 'app-new',
        templateUrl: './new.component.html'
    }),
    __metadata("design:paramtypes", [soat_service_1.SoatService,
        login_service_1.LoginService,
        municipio_service_1.MunicipioService])
], NewComponent);
exports.NewComponent = NewComponent;
//# sourceMappingURL=new.component.js.map