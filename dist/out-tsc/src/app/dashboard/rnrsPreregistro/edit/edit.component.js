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
var rnrsRegistroRemolque_service_1 = require("../../../services/rnrsRegistroRemolque.service");
var login_service_1 = require("../../../services/login.service");
var carroceria_service_1 = require("../../../services/carroceria.service");
var marca_service_1 = require("../../../services/marca.service");
var linea_service_1 = require("../../../services/linea.service");
var vhloCfgOrigenRegistro_service_1 = require("../../../services/vhloCfgOrigenRegistro.service");
var vhloCfgCondicionIngreso_service_1 = require("../../../services/vhloCfgCondicionIngreso.service");
var clase_service_1 = require("../../../services/clase.service");
var sweetalert2_1 = require("sweetalert2");
var EditComponent = (function () {
    function EditComponent(_RegistroRemolqueService, _loginService, _LineaService, _ClaseService, _MarcaService, _CarroceriaService, _OrigenRegistroService, _CondicionIngresoService) {
        this._RegistroRemolqueService = _RegistroRemolqueService;
        this._loginService = _loginService;
        this._LineaService = _LineaService;
        this._ClaseService = _ClaseService;
        this._MarcaService = _MarcaService;
        this._CarroceriaService = _CarroceriaService;
        this._OrigenRegistroService = _OrigenRegistroService;
        this._CondicionIngresoService = _CondicionIngresoService;
        this.ready = new core_1.EventEmitter();
        this.registroRemolque = null;
        this.vehiculo = null;
        this.cfgPlaca = null;
        this.formReady = false;
        this.rodajes = [
            { 'value': "cilindros", 'label': "Cilindros" }, { 'value': "neumaticos", 'label': "Neumaticos" }
        ];
        this.tiposCabina = [
            { 'value': "no_aplica", 'label': "No aplica" }
        ];
    }
    EditComponent.prototype.ngOnInit = function () {
        var _this = this;
        sweetalert2_1.default({
            title: 'Cargando Formulario!',
            text: 'Solo tardara unos segundos por favor espere.',
            timer: 2000,
            onOpen: function () {
                sweetalert2_1.default.showLoading();
            }
        }).then(function (result) {
            if (
            // Read more about handling dismissals
            result.dismiss === sweetalert2_1.default.DismissReason.timer) {
            }
        });
        this._CarroceriaService.getCarroceriaSelect().subscribe(function (response) {
            _this.carrocerias = response;
            setTimeout(function () {
                _this.carroceriaSelected = [_this.registroRemolque.vehiculo.carroceria.id];
            });
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
        this._LineaService.select().subscribe(function (response) {
            _this.lineas = response;
            setTimeout(function () {
                _this.lineaSelected = [_this.registroRemolque.vehiculo.linea.id];
                _this._MarcaService.getMarcaSelect().subscribe(function (response) {
                    _this.marcas = response;
                    setTimeout(function () {
                        _this.marcaSelected = [_this.registroRemolque.vehiculo.linea.marca.id];
                    });
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert("Error en la petición");
                    }
                });
            });
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._OrigenRegistroService.select().subscribe(function (response) {
            _this.origenRegistros = response;
            setTimeout(function () {
                _this.origenRegistroSelected = [_this.registroRemolque.origenRegistro.id];
            });
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
        this._CondicionIngresoService.select().subscribe(function (response) {
            _this.condicionIngresos = response;
            setTimeout(function () {
                _this.condicionIngresoSelected = [_this.registroRemolque.condicionIngreso.id];
            });
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
        this._ClaseService.getClaseSelect().subscribe(function (response) {
            _this.clases = response;
            setTimeout(function () {
                _this.claseSelected = [_this.registroRemolque.vehiculo.clase.id];
            });
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
    };
    EditComponent.prototype.onCancelar = function () {
        this.ready.emit(true);
    };
    EditComponent.prototype.onEnviar = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this.registroRemolque.origenRegistroId = this.origenRegistroSelected;
        this.registroRemolque.condicionIngresoId = this.condicionIngresoSelected;
        this.registroRemolque.vehiculoCarroceriaId = this.carroceriaSelected;
        this.registroRemolque.vehiculoMarcaId = this.marcaSelected;
        this.registroRemolque.vehiculoClaseId = this.claseSelected;
        var html = 'los datos de la Remolque sera editados !<br>';
        sweetalert2_1.default({
            title: 'Actualización de remolque!',
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
                _this._RegistroRemolqueService.editRegistroRemolque(_this.registroRemolque, token).subscribe(function (response) {
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
                            text: 'El vehiculo ' + _this.registroRemolque.placa + ' ya se encuentra registrado',
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
            else if (
            // Read more about handling dismissals
            result.dismiss === sweetalert2_1.default.DismissReason.cancel) {
            }
        });
    };
    EditComponent.prototype.changedPaisNacimiento = function (id) {
    };
    EditComponent.prototype.changedDepartamentoNacimiento = function (id) {
    };
    EditComponent.prototype.changedPaisResidencia = function (id) {
    };
    EditComponent.prototype.changedDepartamentoResidencia = function (id) {
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
], EditComponent.prototype, "registroRemolque", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], EditComponent.prototype, "vehiculo", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], EditComponent.prototype, "cfgPlaca", void 0);
EditComponent = __decorate([
    core_1.Component({
        selector: 'app-edit',
        templateUrl: './edit.component.html'
    }),
    __metadata("design:paramtypes", [rnrsRegistroRemolque_service_1.RegistroRemolqueService,
        login_service_1.LoginService,
        linea_service_1.LineaService,
        clase_service_1.ClaseService,
        marca_service_1.MarcaService,
        carroceria_service_1.CarroceriaService,
        vhloCfgOrigenRegistro_service_1.VhloCfgOrigenRegistroService,
        vhloCfgCondicionIngreso_service_1.VhloCfgCondicionIngresoService])
], EditComponent);
exports.EditComponent = EditComponent;
//# sourceMappingURL=edit.component.js.map