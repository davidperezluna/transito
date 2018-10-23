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
var rnmaPreregistro_service_1 = require("../../../services/rnmaPreregistro.service");
var login_service_1 = require("../../../services/login.service");
var color_service_1 = require("../../../services/color.service");
var tipoVehiculo_service_1 = require("../../../services/tipoVehiculo.service");
var clase_service_1 = require("../../../services/clase.service");
var carroceria_service_1 = require("../../../services/carroceria.service");
var linea_service_1 = require("../../../services/linea.service");
var combustible_service_1 = require("../../../services/combustible.service");
var marca_service_1 = require("../../../services/marca.service");
var vhloCfgOrigenRegistro_service_1 = require("../../../services/vhloCfgOrigenRegistro.service");
var sweetalert2_1 = require("sweetalert2");
var EditComponent = (function () {
    function EditComponent(_RegistroMaquinariaService, _loginService, _colorService, _lineaService, _tipoVehiculoService, _claseService, _marcaService, _carroceriaService, _combustibleService, _OrigenRegistroService) {
        this._RegistroMaquinariaService = _RegistroMaquinariaService;
        this._loginService = _loginService;
        this._colorService = _colorService;
        this._lineaService = _lineaService;
        this._tipoVehiculoService = _tipoVehiculoService;
        this._claseService = _claseService;
        this._marcaService = _marcaService;
        this._carroceriaService = _carroceriaService;
        this._combustibleService = _combustibleService;
        this._OrigenRegistroService = _OrigenRegistroService;
        this.ready = new core_1.EventEmitter();
        this.registroMaquinaria = null;
        this.vehiculo = null;
        this.cfgPlaca = null;
        this.formReady = false;
        this.condiciones = [
            { 'value': "Nuevo", 'label': "Nuevo" }, { 'value': "Sin registro antes de inicio RNMA", 'label': "Sin registro antes de inicio RNMA" }
        ];
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
        this._colorService.select().subscribe(function (response) {
            _this.colores = response;
            setTimeout(function () {
                _this.colorSelected = [_this.registroMaquinaria.vehiculo.color.id];
            });
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
        this._tipoVehiculoService.getTipoVehiculoSelect().subscribe(function (response) {
            _this.tiposVehiculo = response;
            setTimeout(function () {
                _this.tipoVehiculoSelected = [_this.registroMaquinaria.tipoVehiculo.id];
            });
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
        this._claseService.getClaseSelect().subscribe(function (response) {
            _this.clases = response;
            setTimeout(function () {
                _this.claseSelected = [_this.registroMaquinaria.vehiculo.clase.id];
            });
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
        this._lineaService.index().subscribe(function (response) {
            _this.lineas = response;
            setTimeout(function () {
                _this.lineaSelected = [_this.registroMaquinaria.vehiculo.linea.id];
                _this._marcaService.getMarcaSelect().subscribe(function (response) {
                    _this.marcas = response;
                    setTimeout(function () {
                        _this.marcaSelected = [_this.registroMaquinaria.vehiculo.linea.marca.id];
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
        this._carroceriaService.getCarroceriaSelect().subscribe(function (response) {
            _this.carrocerias = response;
            setTimeout(function () {
                _this.carroceriaSelected = [_this.registroMaquinaria.vehiculo.carroceria.id];
            });
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
        this._combustibleService.getCombustibleSelect().subscribe(function (response) {
            _this.combustibles = response;
            setTimeout(function () {
                _this.combustibleSelected = [_this.registroMaquinaria.vehiculo.combustible.id];
            });
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
        this._OrigenRegistroService.select().subscribe(function (response) {
            _this.cfgOrigenRegistros = response;
            setTimeout(function () {
                _this.cfgOrigenRegistroSelected = [_this.registroMaquinaria.cfgOrigenRegistro.id];
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
        this.registroMaquinaria.tipoVehiculoId = this.tipoVehiculoSelected;
        this.registroMaquinaria.cfgOrigenVehiculoId = this.cfgOrigenRegistroSelected;
        this.registroMaquinaria.vehiculoColorId = this.colorSelected;
        this.registroMaquinaria.vehiculoMarcaId = this.marcaSelected;
        this.registroMaquinaria.vehiculoClaseId = this.claseSelected;
        this.registroMaquinaria.vehiculoLineaId = this.lineaSelected;
        this.registroMaquinaria.vehiculoCarroceriaId = this.carroceriaSelected;
        this.registroMaquinaria.vehiculoCombustibleId = this.combustibleSelected;
        this.registroMaquinaria.condicionSelected = this.condicionSelected;
        this.registroMaquinaria.rodajeSelected = this.rodajeSelected;
        this.registroMaquinaria.tipoCabinaSelected = this.tipoCabinaSelected;
        var html = 'los datos de la maquinaria sera editados !<br>';
        sweetalert2_1.default({
            title: 'Actualización de maquinaria!',
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
                _this._RegistroMaquinariaService.edit(_this.registroMaquinaria, token).subscribe(function (response) {
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
                            text: 'El vehiculo ' + _this.registroMaquinaria.cfgPlaca + ' ya se encuentra registrado',
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
    EditComponent.prototype.changedXX = function (id) {
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
], EditComponent.prototype, "registroMaquinaria", void 0);
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
    __metadata("design:paramtypes", [rnmaPreregistro_service_1.RnmaPreregistroService,
        login_service_1.LoginService,
        color_service_1.ColorService,
        linea_service_1.LineaService,
        tipoVehiculo_service_1.TipoVehiculoService,
        clase_service_1.ClaseService,
        marca_service_1.MarcaService,
        carroceria_service_1.CarroceriaService,
        combustible_service_1.CombustibleService,
        vhloCfgOrigenRegistro_service_1.VhloCfgOrigenRegistroService])
], EditComponent);
exports.EditComponent = EditComponent;
//# sourceMappingURL=edit.component.js.map