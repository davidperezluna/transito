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
var rnaloteInsumos_service_1 = require("../../../services/rnaloteInsumos.service");
var empresa_service_1 = require("../../../services/empresa.service");
var sedeOperativa_service_1 = require("../../../services/sedeOperativa.service");
var cfgCasoInsumo_service_1 = require("../../../services/cfgCasoInsumo.service");
var login_service_1 = require("../../../services/login.service");
var sweetalert2_1 = require("sweetalert2");
var EditComponent = (function () {
    function EditComponent(_rnaloteInsumosService, _rnaRegistroInsumosService, _loginService, _EmpresaService, _SedeOperativaService, _CasoInsumoService) {
        this._rnaloteInsumosService = _rnaloteInsumosService;
        this._rnaRegistroInsumosService = _rnaRegistroInsumosService;
        this._loginService = _loginService;
        this._EmpresaService = _EmpresaService;
        this._SedeOperativaService = _SedeOperativaService;
        this._CasoInsumoService = _CasoInsumoService;
        this.ready = new core_1.EventEmitter();
        this.loteInsumoInsumo = null;
        this.tipoInsumo = null;
        this.formReady = false;
    }
    EditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._EmpresaService.getEmpresaSelect().subscribe(function (response) {
            _this.empresas = response;
            setTimeout(function () {
                _this.empresaSelected = [_this.loteInsumoInsumo.empresa.id];
            });
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._CasoInsumoService.getCasoInsumoInsumoSelect().subscribe(function (response) {
            _this.insumos = response;
            setTimeout(function () {
                _this.insumoSelected = [_this.loteInsumoInsumo.casoInsumo.id];
            });
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._CasoInsumoService.getCasoInsumoSustratoSelect().subscribe(function (response) {
            _this.sustratos = response;
            setTimeout(function () {
                _this.insumoSelected = [_this.loteInsumoInsumo.casoInsumo.id];
            });
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        if (this.tipoInsumo == 'sustrato') {
            this._SedeOperativaService.getSedeOperativaSelect().subscribe(function (response) {
                _this.sedes = response;
                setTimeout(function () {
                    _this.sedeSelected = [_this.loteInsumoInsumo.sedeOperativa.id];
                });
            }, function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert("Error en la petición");
                }
            });
        }
    };
    EditComponent.prototype.onCancelar = function () { this.ready.emit(true); };
    EditComponent.prototype.onEnviar = function () {
        var _this = this;
        this.loteInsumoInsumo.empresaId = this.empresaSelected;
        this.loteInsumoInsumo.sedeOperativaId = this.sedeSelected;
        this.loteInsumoInsumo.casoInsumoId = this.insumoSelected;
        var token = this._loginService.getToken();
        this._rnaloteInsumosService.edit(this.loteInsumoInsumo, token).subscribe(function (response) {
            _this.respuesta = response;
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
    EditComponent.prototype.isFin = function () {
        this.loteInsumoInsumo.cantidad = parseInt(this.loteInsumoInsumo.rangoFin) - parseInt(this.loteInsumoInsumo.rangoInicio) + 1;
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
], EditComponent.prototype, "loteInsumoInsumo", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], EditComponent.prototype, "tipoInsumo", void 0);
EditComponent = __decorate([
    core_1.Component({
        selector: 'app-edit',
        templateUrl: './edit.component.html'
    }),
    __metadata("design:paramtypes", [rnaloteInsumos_service_1.RnaLoteInsumoService,
        rnaloteInsumos_service_1.RnaLoteInsumoService,
        login_service_1.LoginService,
        empresa_service_1.EmpresaService,
        sedeOperativa_service_1.SedeOperativaService,
        cfgCasoInsumo_service_1.CfgCasoInsumoService])
], EditComponent);
exports.EditComponent = EditComponent;
//# sourceMappingURL=edit.component.js.map