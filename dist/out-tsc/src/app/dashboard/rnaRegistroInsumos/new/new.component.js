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
var rnaRegistroInsumos_modelo_1 = require("../rnaRegistroInsumos.modelo");
var rnaloteInsumos_service_1 = require("../../../services/rnaloteInsumos.service");
var login_service_1 = require("../../../services/login.service");
var empresa_service_1 = require("../../../services/empresa.service");
var sedeOperativa_service_1 = require("../../../services/sedeOperativa.service");
var cfgCasoInsumo_service_1 = require("../../../services/cfgCasoInsumo.service");
var common_1 = require("@angular/common");
var sweetalert2_1 = require("sweetalert2");
var NewComponent = (function () {
    function NewComponent(datePipe, _rnaRegistroInsumosService, _loginService, _EmpresaService, _SedeOperativaService, _CasoInsumoService) {
        this.datePipe = datePipe;
        this._rnaRegistroInsumosService = _rnaRegistroInsumosService;
        this._loginService = _loginService;
        this._EmpresaService = _EmpresaService;
        this._SedeOperativaService = _SedeOperativaService;
        this._CasoInsumoService = _CasoInsumoService;
        this.ready = new core_1.EventEmitter();
        this.frmInsumo = false;
    }
    NewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.date = new Date();
        var datePiper = new common_1.DatePipe(this.date);
        this.rnaRegistroInsumos = new rnaRegistroInsumos_modelo_1.rnaRegistroInsumos(null, null, null, null, null, null, null, null, null, null, null);
        this.rnaRegistroInsumos.fecha = datePiper.transform(this.date, 'yyyy-MM-dd');
        this._EmpresaService.getEmpresaSelect().subscribe(function (response) {
            _this.empresas = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
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
        var token = this._loginService.getToken();
        this.rnaRegistroInsumos.sedeOperativaId = this.sedeSelected;
        if (!this.frmInsumo) {
            this.rnaRegistroInsumos.empresaId = this.empresaSelected;
            this.rnaRegistroInsumos.casoInsumoId = this.insumoSelected;
        }
        else {
            this.rnaRegistroInsumos.empresaId = this.empresaInsumoSelected;
            this.rnaRegistroInsumos.casoInsumoId = this.insumoInsumoSelected;
        }
        this._rnaRegistroInsumosService.register(this.rnaRegistroInsumos, token).subscribe(function (response) {
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
        this.rnaRegistroInsumos.cantidad = parseInt(this.rnaRegistroInsumos.rangoFin) - parseInt(this.rnaRegistroInsumos.rangoInicio) + 1;
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
    __metadata("design:paramtypes", [common_1.DatePipe,
        rnaloteInsumos_service_1.RnaLoteInsumoService,
        login_service_1.LoginService,
        empresa_service_1.EmpresaService,
        sedeOperativa_service_1.SedeOperativaService,
        cfgCasoInsumo_service_1.CfgCasoInsumoService])
], NewComponent);
exports.NewComponent = NewComponent;
//# sourceMappingURL=new.component.js.map