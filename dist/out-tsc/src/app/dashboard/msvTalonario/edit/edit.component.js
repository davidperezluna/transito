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
var cfgPlaca_service_1 = require("../../../services/cfgPlaca.service");
var login_service_1 = require("../../../services/login.service");
var sedeOperativa_service_1 = require("../../../services/sedeOperativa.service");
var msvTalonario_service_1 = require("../../../services/msvTalonario.service");
var sweetalert2_1 = require("sweetalert2");
var msvTalonario_modelo_1 = require("../msvTalonario.modelo");
var EditComponent = (function () {
    // public tipoIdentificacion: Array<any>
    function EditComponent(_CfgPlacaService, _loginService, _sedeOperativaService, _msvTalonarioService) {
        this._CfgPlacaService = _CfgPlacaService;
        this._loginService = _loginService;
        this._sedeOperativaService = _sedeOperativaService;
        this._msvTalonarioService = _msvTalonarioService;
        this.ready = new core_1.EventEmitter();
        this.talonario = null;
        this.sedeOperativaSuccess = false;
        this.talonarioReady = false;
        this.validado = false;
        this.sedeOperativaReady = false;
        //   this.tipoIdentificacion = [
        //     {value: 'CC', label: 'Cédula de ciudadanía'},
        //     {value: 'TE', label: 'Tarjeta de extranjería'},
        //     {value: 'CE', label: 'Cédula de extranjería'},
        //     {value: 'P', label: 'Pasaporte'},
        // ];
    }
    EditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._sedeOperativaService.getSedeOperativaSelect().subscribe(function (response) {
            _this.sedesOperativas = response;
            setTimeout(function () {
                _this.sedeOperativaSelected = [_this.talonario.sedeOperativa.id];
            });
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
    };
    EditComponent.prototype.onCancelar = function () {
        this.ready.emit(true);
    };
    EditComponent.prototype.onEnviar = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this.talonario.sedeOperativaId = this.sedeOperativaSelected;
        this._msvTalonarioService.register(this.talonario, token).subscribe(function (response) {
            //console.log(response);
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
    EditComponent.prototype.onCalcularTotal = function () {
        var ini, fin, total;
        ini = this.talonario.rangoini;
        fin = this.talonario.rangofin;
        total = (fin - ini);
        if (total < 0) {
            total = 0;
        }
        this.talonario.total = total;
    };
    EditComponent.prototype.changedSedeOperativa = function (e) {
        var _this = this;
        this.validado = false;
        if (e) {
            var token = this._loginService.getToken();
            this._sedeOperativaService.showSedeOperativa(token, e).subscribe(function (response) {
                _this.sedeOperativa = response;
                _this.sedeOperativaReady = true;
                //          this.msvTalonario.rangoini = this.sedeOperativa.data.
                //this.comparendo.numeroOrden = this.sedeOperativa.data.codigoDivipo;
                console.log(_this.sedeOperativa);
            }, function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert("Error en la petición");
                }
            });
            this._msvTalonarioService.showMsvTalonarioPorSedeOperativa(token, e).subscribe(function (response) {
                _this.sedeOperativaSuccess = true;
                if (response.status == "success") {
                    _this.talonario = response.data;
                    _this.talonarioReady = true;
                    _this.talonario.fechaAsignacion = _this.talonario.fechaAsignacion;
                    //this.comparendo.numeroOrden = this.sedeOperativa.data.codigoDivipo;
                    console.log(_this.talonario);
                }
                else if (response.status == "vacio") {
                    _this.talonario = new msvTalonario_modelo_1.MsvTalonario(0, 0, 0, "", "", 0);
                }
            }, function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert("Error en la petición");
                }
            });
        }
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
], EditComponent.prototype, "talonario", void 0);
EditComponent = __decorate([
    core_1.Component({
        selector: 'app-edit',
        templateUrl: './edit.component.html'
    }),
    __metadata("design:paramtypes", [cfgPlaca_service_1.CfgPlacaService,
        login_service_1.LoginService,
        sedeOperativa_service_1.SedeOperativaService,
        msvTalonario_service_1.MsvTalonarioService])
], EditComponent);
exports.EditComponent = EditComponent;
//# sourceMappingURL=edit.component.js.map