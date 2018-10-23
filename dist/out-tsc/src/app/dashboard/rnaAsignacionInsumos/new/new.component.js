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
var rnaAsignacionInsumos_modelo_1 = require("../rnaAsignacionInsumos.modelo");
var rnaloteInsumos_service_1 = require("../../../services/rnaloteInsumos.service");
var login_service_1 = require("../../../services/login.service");
var sedeOperativa_service_1 = require("../../../services/sedeOperativa.service");
var cfgCasoInsumo_service_1 = require("../../../services/cfgCasoInsumo.service");
var rnaInsumos_service_1 = require("../../../services/rnaInsumos.service");
var common_1 = require("@angular/common");
var sweetalert2_1 = require("sweetalert2");
var NewComponent = (function () {
    function NewComponent(_rnaRegistroInsumosService, _loginService, _SedeOperativaService, _CasoInsumoService, _RnaInsumoService) {
        this._rnaRegistroInsumosService = _rnaRegistroInsumosService;
        this._loginService = _loginService;
        this._SedeOperativaService = _SedeOperativaService;
        this._CasoInsumoService = _CasoInsumoService;
        this._RnaInsumoService = _RnaInsumoService;
        this.ready = new core_1.EventEmitter();
        this.frmInsumoSelectInsumo = true;
        this.frmInsumo = false;
        this.frmInsumoSelect = true;
    }
    NewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.date = new Date();
        var datePiper = new common_1.DatePipe(this.date);
        this.rnaAsignacionInsumos = new rnaAsignacionInsumos_modelo_1.rnaAsignacionInsumos(null, null, null, null, null, null, null, null, null, null);
        this.rnaAsignacionInsumos.fecha = datePiper.transform(this.date, 'yyyy-MM-dd');
        this._CasoInsumoService.getCasoInsumoInsumoSelect().subscribe(function (response) {
            _this.insumos = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._CasoInsumoService.getCasoInsumoSustratoSelect().subscribe(function (response) {
            _this.sustratos = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._SedeOperativaService.getSedeOperativaSelect().subscribe(function (response) {
            _this.sedes = response;
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
        console.log(this.frmInsumo);
        var token = this._loginService.getToken();
        this.rnaAsignacionInsumos.loteInsumoId = this.loteInsumo.id;
        if (!this.frmInsumo) {
            this.rnaAsignacionInsumos.casoInsumoId = this.insumoSelected;
            this.rnaAsignacionInsumos.sedeOperativaId = this.sedeSelected;
        }
        else {
            this.rnaAsignacionInsumos.sedeOperativaId = this.sedeSelectedInsumo;
            this.rnaAsignacionInsumos.casoInsumoId = this.insumoSelectedInsumo;
            this.rnaAsignacionInsumos.numero = this.numero;
        }
        this._RnaInsumoService.register(this.rnaAsignacionInsumos, token).subscribe(function (response) {
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
                    text: 'El codigo ya se encuentra registrado',
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
    NewComponent.prototype.isFin = function () {
        this.rnaAsignacionInsumos.numero = parseInt(this.rnaAsignacionInsumos.rangoFin) - parseInt(this.rnaAsignacionInsumos.rangoInicio) + 1;
    };
    NewComponent.prototype.changedSedeOperativa = function (e) {
        if (e) {
            console.log('holaaaaa');
            this.frmInsumoSelect = false;
        }
    };
    NewComponent.prototype.changedSedeOperativaInsumo = function (e) {
        if (e) {
            this.frmInsumoSelectInsumo = false;
        }
    };
    NewComponent.prototype.changedInsumoInsumo = function (e) {
        var _this = this;
        if (e) {
            var datos = {
                'casoInsumo': this.insumoSelectedInsumo,
                'sedeOperativa': this.sedeSelectedInsumo,
            };
            var token = this._loginService.getToken();
            this._rnaRegistroInsumosService.showInsumo(datos, token).subscribe(function (response) {
                _this.loteInsumo = response.data;
                if (response.status == 'success') {
                    _this.numero = _this.loteInsumo.cantidad;
                }
                else {
                    sweetalert2_1.default({
                        title: 'Error!',
                        text: 'No existen insumos para esta sede',
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
    };
    NewComponent.prototype.changedInsumoSustrato = function (e) {
        var _this = this;
        if (e) {
            var datos = {
                'casoInsumo': this.insumoSelected,
                'sedeOperativa': this.sedeSelected,
            };
            var token = this._loginService.getToken();
            this._rnaRegistroInsumosService.showSedeInsumo(datos, token).subscribe(function (response) {
                _this.loteInsumo = response.data;
                if (response.status == 'success') {
                    _this.rnaAsignacionInsumos.rangoInicio = _this.loteInsumo.rangoInicio;
                    _this.rnaAsignacionInsumos.rangoFin = _this.loteInsumo.rangoFin;
                    _this.rnaAsignacionInsumos.numero = _this.loteInsumo.cantidad;
                }
                else {
                    sweetalert2_1.default({
                        title: 'Error!',
                        text: 'No existen sustratos para esta sede',
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
    };
    NewComponent.prototype.onInsumo = function () {
        this.frmInsumo = true;
    };
    NewComponent.prototype.onSustrato = function () {
        this.frmInsumo = false;
    };
    return NewComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewComponent.prototype, "ready", void 0);
NewComponent = __decorate([
    core_1.Component({
        selector: 'app-new',
        templateUrl: './new.component.html',
        providers: [common_1.DatePipe]
    }),
    __metadata("design:paramtypes", [rnaloteInsumos_service_1.RnaLoteInsumoService,
        login_service_1.LoginService,
        sedeOperativa_service_1.SedeOperativaService,
        cfgCasoInsumo_service_1.CfgCasoInsumoService,
        rnaInsumos_service_1.RnaInsumoService])
], NewComponent);
exports.NewComponent = NewComponent;
//# sourceMappingURL=new.component.js.map