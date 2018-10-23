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
var departamento_service_1 = require("../../../services/departamento.service");
var login_service_1 = require("../../../services/login.service");
var municipio_service_1 = require("../../../services/municipio.service");
var linea_service_1 = require("../../../services/linea.service");
var clase_service_1 = require("../../../services/clase.service");
var carroceria_service_1 = require("../../../services/carroceria.service");
var servicio_service_1 = require("../../../services/servicio.service");
var color_service_1 = require("../../../services/color.service");
var combustible_service_1 = require("../../../services/combustible.service");
var vehiculo_service_1 = require("../../../services/vehiculo.service");
var sedeOperativa_service_1 = require("../../../services/sedeOperativa.service");
var marca_service_1 = require("../../../services/marca.service");
var cfgRadioAccion_service_1 = require("../../../services/cfgRadioAccion.service");
var vhloCfgModalidadTransporte_service_1 = require("../../../services/vhloCfgModalidadTransporte.service");
var sweetalert2_1 = require("sweetalert2");
var EditComponent = (function () {
    function EditComponent(_departamentoService, _loginService, _MunicipioService, _LineaService, _ClaseService, _CarroceriaService, _ServicioService, _MarcaService, _ColorService, _CombustibleService, _VehiculoService, _SedeOperativaService, _RadioAccionService, _ModalidadTransporteService) {
        this._departamentoService = _departamentoService;
        this._loginService = _loginService;
        this._MunicipioService = _MunicipioService;
        this._LineaService = _LineaService;
        this._ClaseService = _ClaseService;
        this._CarroceriaService = _CarroceriaService;
        this._ServicioService = _ServicioService;
        this._MarcaService = _MarcaService;
        this._ColorService = _ColorService;
        this._CombustibleService = _CombustibleService;
        this._VehiculoService = _VehiculoService;
        this._SedeOperativaService = _SedeOperativaService;
        this._RadioAccionService = _RadioAccionService;
        this._ModalidadTransporteService = _ModalidadTransporteService;
        this.ready = new core_1.EventEmitter();
        this.vehiculo = null;
    }
    EditComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log("hola");
        console.log(this.vehiculo);
        sweetalert2_1.default({
            title: 'Cargando Formulario!',
            text: 'Solo tardara unos segundos por favor espere.',
            timer: 3000,
            onOpen: function () {
                sweetalert2_1.default.showLoading();
            }
        }).then(function (result) {
            if (
            // Read more about handling dismissals
            result.dismiss === sweetalert2_1.default.DismissReason.timer) {
            }
        });
        this._LineaService.select().subscribe(function (response) {
            _this.lineas = response;
            setTimeout(function () {
                _this.lineaSelected = [_this.vehiculo.linea.id];
                _this._MarcaService.getMarcaSelect().subscribe(function (response) {
                    _this.marcas = response;
                    setTimeout(function () {
                        _this.marcaSelected = [_this.vehiculo.linea.marca.id];
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
        this._ClaseService.getClaseSelect().subscribe(function (response) {
            _this.clases = response;
            setTimeout(function () {
                _this.claseSelected = [_this.vehiculo.clase.id];
            });
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._CarroceriaService.getCarroceriaSelect().subscribe(function (response) {
            _this.carrocerias = response;
            setTimeout(function () {
                _this.carroceriaSelected = [_this.vehiculo.carroceria.id];
            });
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._ServicioService.getServicioSelect().subscribe(function (response) {
            _this.servicios = response;
            setTimeout(function () {
                _this.servicioSelected = [_this.vehiculo.servicio.id];
            });
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._ColorService.select().subscribe(function (response) {
            _this.colores = response;
            setTimeout(function () {
                _this.colorSelected = [_this.vehiculo.color.id];
            });
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._CombustibleService.getCombustibleSelect().subscribe(function (response) {
            _this.combustibles = response;
            setTimeout(function () {
                _this.combustibleSelected = [_this.vehiculo.combustible.id];
            });
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._SedeOperativaService.getSedeOperativaSelect().subscribe(function (response) {
            _this.sedesOperativas = response;
            setTimeout(function () {
                _this.sedeOperativaSelected = [_this.vehiculo.sedeOperativa.id];
            });
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._MunicipioService.getMunicipioSelect().subscribe(function (response) {
            _this.municipios = response;
            setTimeout(function () {
                _this.municipioSelected = [_this.vehiculo.municipio.id];
            });
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._RadioAccionService.getCfgRadioAccionSelect().subscribe(function (response) {
            _this.radioAcciones = response;
            setTimeout(function () {
                _this.radioAccionSelected = [_this.vehiculo.radioAccion.id];
            });
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._ModalidadTransporteService.getCfgModalidadTransporteSelect().subscribe(function (response) {
            _this.modalidadTransportes = response;
            setTimeout(function () {
                _this.modalidadTransporteSelected = [_this.vehiculo.modalidadTransporte.id];
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
        console.log("hhhgfh");
        var token = this._loginService.getToken();
        this.vehiculo.marcaId = this.marcaSelected;
        this.vehiculo.lineaId = this.lineaSelected;
        this.vehiculo.claseId = this.claseSelected;
        this.vehiculo.carroceriaId = this.carroceriaSelected;
        this.vehiculo.servicioId = this.servicioSelected;
        this.vehiculo.colorId = this.colorSelected;
        this.vehiculo.combustibleId = this.combustibleSelected;
        this.vehiculo.sedeOperativaId = this.sedeOperativaSelected;
        this.vehiculo.municipioId = this.municipioSelected;
        this.vehiculo.radioAccionId = this.radioAccionSelected;
        this.vehiculo.modalidadTransporteId = this.modalidadTransporteSelected;
        var html = 'los datos de la Automotor sera editados !<br>';
        sweetalert2_1.default({
            title: 'Actualización de automotor!',
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
                _this._VehiculoService.editVehiculo(_this.vehiculo, token).subscribe(function (response) {
                    _this.respuesta = response;
                    console.log(_this.respuesta);
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
                            text: 'El vehiculo ' + _this.vehiculo.placa + ' ya se encuentra registrado',
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
    EditComponent.prototype.changedDepartamento = function (e) {
        var _this = this;
        if (this.marcaSelected) {
            var token = this._loginService.getToken();
            this._LineaService.searchByMarcaSelect(this.marcaSelected, token).subscribe(function (response) {
                console.log(response.data[0]);
                if (response.data[0] != null) {
                    _this.lineas = response.data;
                }
                else {
                    _this.lineas = [];
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
], EditComponent.prototype, "vehiculo", void 0);
EditComponent = __decorate([
    core_1.Component({
        selector: 'app-edit',
        templateUrl: './edit.component.html'
    }),
    __metadata("design:paramtypes", [departamento_service_1.DepartamentoService,
        login_service_1.LoginService,
        municipio_service_1.MunicipioService,
        linea_service_1.LineaService,
        clase_service_1.ClaseService,
        carroceria_service_1.CarroceriaService,
        servicio_service_1.ServicioService,
        marca_service_1.MarcaService,
        color_service_1.ColorService,
        combustible_service_1.CombustibleService,
        vehiculo_service_1.VehiculoService,
        sedeOperativa_service_1.SedeOperativaService,
        cfgRadioAccion_service_1.CfgRadioAccionService,
        vhloCfgModalidadTransporte_service_1.VhloCfgModalidadTransporteService])
], EditComponent);
exports.EditComponent = EditComponent;
//# sourceMappingURL=edit.component.js.map