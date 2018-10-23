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
var svCapacitacion_modelo_1 = require("../svCapacitacion.modelo");
var svCapacitacion_service_1 = require("../../../services/svCapacitacion.service");
var login_service_1 = require("../../../services/login.service");
var municipio_service_1 = require("../../../services/municipio.service");
var sweetalert2_1 = require("sweetalert2");
var svCfgFuncion_service_1 = require("../../../services/svCfgFuncion.service");
var svCfgFuncionCriterio_service_1 = require("../../../services/svCfgFuncionCriterio.service");
var svCfgTemaCapacitacion_service_1 = require("../../../services/svCfgTemaCapacitacion.service");
var svCfgClaseActorVia_service_1 = require("../../../services/svCfgClaseActorVia.service");
var NewComponent = (function () {
    function NewComponent(_CapacitacionService, _loginService, _MunicipioService, _FuncionService, _FuncionCriterioService, _TemaCapacitacionService, _SvCfgClaseActorViaService) {
        this._CapacitacionService = _CapacitacionService;
        this._loginService = _loginService;
        this._MunicipioService = _MunicipioService;
        this._FuncionService = _FuncionService;
        this._FuncionCriterioService = _FuncionCriterioService;
        this._TemaCapacitacionService = _TemaCapacitacionService;
        this._SvCfgClaseActorViaService = _SvCfgClaseActorViaService;
        this.ready = new core_1.EventEmitter();
        this.ciudadano = null;
    }
    NewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.capacitacion = new svCapacitacion_modelo_1.SvCapacitacion(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
        this.date = new Date();
        this._MunicipioService.getMunicipioSelect().subscribe(function (response) {
            _this.municipios = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._FuncionService.getFuncionSelect().subscribe(function (response) {
            _this.funciones = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._FuncionCriterioService.getFuncionCriterioSelect().subscribe(function (response) {
            _this.funcionesCriterios = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._TemaCapacitacionService.getTemaCapacitacionSelect().subscribe(function (response) {
            _this.temasCapacitaciones = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._SvCfgClaseActorViaService.getClaseActorViaSelect().subscribe(function (response) {
            _this.clasesActoresVia = response;
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
        this.capacitacion.municipio = this.municipioSelected;
        //this.capacitacion.cedula = this.ciudadano.cedula;
        this.capacitacion.funcion = this.funcionSelected;
        this.capacitacion.claseActorVial = this.claseActorViaSelected;
        this.capacitacion.temaCapacitacion = this.temaCapacitacionSelected;
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
                _this._CapacitacionService.register(_this.file, _this.capacitacion, token).subscribe(function (response) {
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
    NewComponent.prototype.onFileChange = function (event) {
        if (event.target.files.length > 0) {
            var fileSelected = event.target.files[0];
            this.file = new FormData();
            this.file.append('file', fileSelected);
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
], NewComponent.prototype, "ciudadano", void 0);
NewComponent = __decorate([
    core_1.Component({
        selector: 'app-new',
        templateUrl: './new.component.html'
    }),
    __metadata("design:paramtypes", [svCapacitacion_service_1.SvCapacitacionService,
        login_service_1.LoginService,
        municipio_service_1.MunicipioService,
        svCfgFuncion_service_1.SvCfgFuncionService,
        svCfgFuncionCriterio_service_1.SvCfgFuncionCriterioService,
        svCfgTemaCapacitacion_service_1.SvCfgTemaCapacitacionService,
        svCfgClaseActorVia_service_1.SvCfgClaseActorViaService])
], NewComponent);
exports.NewComponent = NewComponent;
//# sourceMappingURL=new.component.js.map