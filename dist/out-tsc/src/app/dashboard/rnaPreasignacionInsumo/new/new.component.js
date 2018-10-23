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
var sedeOperativa_service_1 = require("../../../services/sedeOperativa.service");
var cfgCasoInsumo_service_1 = require("../../../services/cfgCasoInsumo.service");
var rnaInsumos_service_1 = require("../../../services/rnaInsumos.service");
var common_1 = require("@angular/common");
var sweetalert2_1 = require("sweetalert2");
var NewComponent = (function () {
    function NewComponent(_SedeOperativaService, _CasoInsumoService, _RnaInsumoService) {
        this._SedeOperativaService = _SedeOperativaService;
        this._CasoInsumoService = _CasoInsumoService;
        this._RnaInsumoService = _RnaInsumoService;
        this.ready = new core_1.EventEmitter();
        this.isCantidad = true;
        this.datosAsignacion = {
            'sedeOrigen': null,
            'sedeDestino': null,
            'casoInsumo': null,
            'cantidad': null,
        };
    }
    NewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._SedeOperativaService.getSedeOperativaSelect().subscribe(function (response) {
            _this.sedes = response;
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
    };
    NewComponent.prototype.onCancelar = function () {
        this.ready.emit(true);
    };
    NewComponent.prototype.onEnviar = function () {
        var _this = this;
        this.datosAsignacion.sedeDestino = this.sedeDestinoSelected;
        this.datosAsignacion.sedeOrigen = this.sedeOrigenSelected;
        this.datosAsignacion.casoInsumo = this.insumoSelected;
        this._RnaInsumoService.reasignacionSustrato(this.datosAsignacion).subscribe(function (response) {
            _this.respuesta = response;
            if (_this.respuesta.status == 'success') {
                _this.ready.emit(true);
                sweetalert2_1.default({
                    title: 'Perfecto!',
                    text: _this.respuesta.msj,
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
    NewComponent.prototype.changedSedeOperativa = function (e) {
        if (e) {
        }
    };
    NewComponent.prototype.isExistencia = function () {
        var _this = this;
        this.datosAsignacion.sedeDestino = this.sedeDestinoSelected;
        this.datosAsignacion.sedeOrigen = this.sedeOrigenSelected;
        this.datosAsignacion.casoInsumo = this.insumoSelected;
        this._RnaInsumoService.isExistencia(this.datosAsignacion).subscribe(function (response) {
            _this.respuesta = response;
            if (_this.respuesta.status == 'success') {
                _this.isCantidad = false;
            }
            else {
                _this.isCantidad = true;
                sweetalert2_1.default({
                    title: 'Error!',
                    type: 'error',
                    text: _this.respuesta.msj,
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
NewComponent = __decorate([
    core_1.Component({
        selector: 'app-new',
        templateUrl: './new.component.html',
        providers: [common_1.DatePipe]
    }),
    __metadata("design:paramtypes", [sedeOperativa_service_1.SedeOperativaService,
        cfgCasoInsumo_service_1.CfgCasoInsumoService,
        rnaInsumos_service_1.RnaInsumoService])
], NewComponent);
exports.NewComponent = NewComponent;
//# sourceMappingURL=new.component.js.map