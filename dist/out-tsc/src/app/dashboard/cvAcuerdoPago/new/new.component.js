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
var cvAcuerdoPago_modelo_1 = require("../cvAcuerdoPago.modelo");
var cvAcuerdoPago_service_1 = require("../../../services/cvAcuerdoPago.service");
var cvCfgInteres_service_1 = require("../../../services/cvCfgInteres.service");
var cvCfgPorcentajeInicial_service_1 = require("../../../services/cvCfgPorcentajeInicial.service");
var login_service_1 = require("../../../services/login.service");
var sweetalert2_1 = require("sweetalert2");
var NewComponent = (function () {
    function NewComponent(_AcuerdoPagoService, _InteresService, _PorcentajeService, _loginService) {
        this._AcuerdoPagoService = _AcuerdoPagoService;
        this._InteresService = _InteresService;
        this._PorcentajeService = _PorcentajeService;
        this._loginService = _loginService;
        this.ready = new core_1.EventEmitter();
        this.comparendosSelect = null;
        this.formPreliquidacion = false;
        this.cuotas = null;
    }
    NewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.acuerdoPago = new cvAcuerdoPago_modelo_1.CvAcuerdoPago(null, null, null, null, null, null, null, null);
        this._InteresService.select().subscribe(function (response) {
            _this.intereses = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._PorcentajeService.searchActive().subscribe(function (response) {
            if (response.status == 'success') {
                _this.porcentaje = response.data;
            }
            else {
                sweetalert2_1.default({
                    title: 'Error!',
                    text: response.message,
                    type: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
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
    NewComponent.prototype.onPreliquidar = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this.acuerdoPago.idInteres = this.interesSelected;
        this._InteresService.show(this.acuerdoPago, token).subscribe(function (response) {
            _this.interes = response.data;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._AcuerdoPagoService.calculateDateEnd(this.acuerdoPago, token).subscribe(function (response) {
            if (response.status == 'success') {
                _this.fechaFinal = response.data;
            }
            else {
                sweetalert2_1.default({
                    title: 'Error!',
                    text: response.message,
                    type: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this.acuerdoPago.comparendos = this.comparendosSelect;
        this._AcuerdoPagoService.calculateValue(this.acuerdoPago, token).subscribe(function (response) {
            if (response.status == 'success') {
                _this.valorTotal = response.data;
                _this.valorCuotaInicial = (_this.valorTotal * _this.porcentaje.valor) / 100;
                _this.valorInteres = (_this.valorTotal * _this.interes.valor) / 100;
                _this.acuerdoPago.valorCapital = _this.valorTotal;
                _this.acuerdoPago.valorCuotaInicial = _this.valorCuotaInicial;
                _this.formPreliquidacion = true;
            }
            else {
                sweetalert2_1.default({
                    title: 'Error!',
                    text: response.message,
                    type: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._AcuerdoPagoService.calculateDues(this.acuerdoPago, token).subscribe(function (response) {
            if (response.status == 'success') {
                _this.cuotas = response.data;
                _this.acuerdoPago.valorCapital = _this.valorTotal;
                _this.acuerdoPago.valorCuotaInicial = _this.valorCuotaInicial;
            }
            else {
                sweetalert2_1.default({
                    title: 'Error!',
                    text: response.message,
                    type: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        console.log(this.acuerdoPago);
    };
    NewComponent.prototype.onEnviar = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this.acuerdoPago.idPorcentajeInicial = this.porcentaje.id;
        this.acuerdoPago.idInteres = this.interesSelected;
        this.acuerdoPago.comparendos = this.comparendosSelect;
        this._AcuerdoPagoService.register(this.acuerdoPago, token).subscribe(function (response) {
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
], NewComponent.prototype, "comparendosSelect", void 0);
NewComponent = __decorate([
    core_1.Component({
        selector: 'app-new',
        templateUrl: './new.component.html'
    }),
    __metadata("design:paramtypes", [cvAcuerdoPago_service_1.CvAcuerdoPagoService,
        cvCfgInteres_service_1.CvCfgInteresService,
        cvCfgPorcentajeInicial_service_1.CvCfgPorcentajeInicialService,
        login_service_1.LoginService])
], NewComponent);
exports.NewComponent = NewComponent;
//# sourceMappingURL=new.component.js.map