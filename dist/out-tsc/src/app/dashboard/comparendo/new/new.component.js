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
var comparendo_modelo_1 = require("../comparendo.modelo");
var inmovilizacion_modelo_1 = require("../inmovilizacion.modelo");
var comparendo_service_1 = require("../../../services/comparendo.service");
var login_service_1 = require("../../../services/login.service");
var mpersonalFuncionario_service_1 = require("../../../services/mpersonalFuncionario.service");
var mpersonalComparendo_service_1 = require("../../../services/mpersonalComparendo.service");
var sedeOperativa_service_1 = require("../../../services/sedeOperativa.service");
var municipio_service_1 = require("../../../services/municipio.service");
var vehiculo_service_1 = require("../../../services/vehiculo.service");
var ciudadano_service_1 = require("../../../services/ciudadano.service");
var ciudadanoVehiculo_service_1 = require("../../../services/ciudadanoVehiculo.service");
var tipoIdentificacion_service_1 = require("../../../services/tipoIdentificacion.service");
var mparqPatio_service_1 = require("../../../services/mparqPatio.service");
var mparqGrua_service_1 = require("../../../services/mparqGrua.service");
var cfgComparendoEstado_service_1 = require("../../../services/cfgComparendoEstado.service");
var mflInfraccion_service_1 = require("../../../services/mflInfraccion.service");
var cfgTipoInfractor_service_1 = require("../../../services/cfgTipoInfractor.service");
var cfgLicenciaConduccionCategoria_service_1 = require("../../../services/cfgLicenciaConduccionCategoria.service");
var sweetalert2_1 = require("sweetalert2");
var NewComponent = (function () {
    function NewComponent(_ComparendoService, _loginService, _MpersonalFuncionarioService, _MpersonalComparendoService, _SedeOperativaService, _MunicipioService, _VechiculoService, _CiudadanoService, _ciudadanoVehiculoService, _TipoIdentificacionService, _MparqPatioService, _MparqGruaService, _CfgComparendoEstadoService, _MflInfraccionService, _CfgTipoInfractorService, _CfgLicenciaConduccionCategoriaService) {
        this._ComparendoService = _ComparendoService;
        this._loginService = _loginService;
        this._MpersonalFuncionarioService = _MpersonalFuncionarioService;
        this._MpersonalComparendoService = _MpersonalComparendoService;
        this._SedeOperativaService = _SedeOperativaService;
        this._MunicipioService = _MunicipioService;
        this._VechiculoService = _VechiculoService;
        this._CiudadanoService = _CiudadanoService;
        this._ciudadanoVehiculoService = _ciudadanoVehiculoService;
        this._TipoIdentificacionService = _TipoIdentificacionService;
        this._MparqPatioService = _MparqPatioService;
        this._MparqGruaService = _MparqGruaService;
        this._CfgComparendoEstadoService = _CfgComparendoEstadoService;
        this._MflInfraccionService = _MflInfraccionService;
        this._CfgTipoInfractorService = _CfgTipoInfractorService;
        this._CfgLicenciaConduccionCategoriaService = _CfgLicenciaConduccionCategoriaService;
        this.ready = new core_1.EventEmitter();
        this.horas = [
            '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'
        ];
        this.minutos = [
            '00', '10', '20', '30', '40', '50'
        ];
        this.consecutivo = null;
        this.edad = null;
        this.ciudadano = null;
        this.testigo = [{ 'identificacion': null }];
        this.validado = false;
        this.isCiudadano = false;
        this.isEmpresa = false;
        this.infraccion = null;
    }
    NewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.placa = {
            'placa': this.placa,
        };
        this.identificacion = {
            'numeroIdentificacion': this.identificacion,
        };
        this.comparendo = new comparendo_modelo_1.Comparendo(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
        this.inmovilizacion = new inmovilizacion_modelo_1.Inmovilizacion(null, null, null);
        this._MpersonalFuncionarioService.selectAgentes().subscribe(function (response) {
            _this.agentesTransito = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
    };
    NewComponent.prototype.onCancelar = function () {
        this.validado = false;
    };
    NewComponent.prototype.onEnviar = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this.comparendo.municipioId = this.municipioSelected;
        this.comparendo.infraccionId = this.infraccionSelected;
        this.comparendo.estadoId = this.comparendoEstadoSelected;
        this.comparendo.tipoInfractorId = this.infractorTipoSelected;
        this.comparendo.vehiculoId = this.vehiculo.id;
        if (this.ciudadano) {
            this.comparendo.ciudadanoId = this.ciudadano.id;
        }
        this.comparendo.testigoId = this.testigo.id;
        this.inmovilizacion.gruaId = this.gruaSelected;
        this.inmovilizacion.patioId = this.patioSelected;
        var datos = {
            'comparendo': this.comparendo,
            'inmovilizacion': this.inmovilizacion
        };
        console.log(this.comparendo);
        this._ComparendoService.register(datos, token).subscribe(function (response) {
            if (response.status == 'success') {
                _this.ready.emit(true);
                sweetalert2_1.default({
                    title: 'Perfecto!',
                    text: response.message,
                    type: 'success',
                    confirmButtonText: 'Aceptar'
                });
                _this.validado = false;
            }
            else {
                sweetalert2_1.default({
                    title: 'Error!',
                    text: 'la comparendo ' + _this.comparendo.consecutivo + ' ya se encuentra registrado',
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
    NewComponent.prototype.onChangedMpersonalFuncionario = function (e) {
        var _this = this;
        if (e) {
            var token = this._loginService.getToken();
            this._MpersonalFuncionarioService.show(token, e).subscribe(function (response) {
                _this.funcionario = response.data;
                _this.comparendo.consecutivo = _this.funcionario.sedeOperativa.codigoDivipo;
                _this.comparendo.funcionarioId = _this.funcionario.id;
            }, function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert("Error en la petición");
                }
            });
        }
    };
    NewComponent.prototype.onValidarConsecutivo = function () {
        var _this = this;
        var token = this._loginService.getToken();
        var datos = { 'consecutivo': this.comparendo.consecutivo, 'funcionarioId': this.comparendo.funcionarioId };
        this._MpersonalComparendoService.searchByConsecutivoAndFuncionario(datos, token).subscribe(function (response) {
            if (response.status == 'success') {
                _this.validado = true;
                _this.consecutivo = response.data;
                _this.comparendo.consecutivoId = _this.consecutivo.id;
                _this._MunicipioService.getMunicipioSelect().subscribe(function (response) {
                    _this.municipios = response;
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert("Error en la petición");
                    }
                });
                _this._MparqPatioService.select().subscribe(function (response) {
                    _this.patios = response;
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert("Error en la petición");
                    }
                });
                _this._MparqGruaService.select().subscribe(function (response) {
                    _this.gruas = response;
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert("Error en la petición");
                    }
                });
                _this._MflInfraccionService.select().subscribe(function (response) {
                    _this.infracciones = response;
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert("Error en la petición");
                    }
                });
                _this._CfgTipoInfractorService.select().subscribe(function (response) {
                    _this.infractorTipos = response;
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert("Error en la petición");
                    }
                });
                _this._CfgLicenciaConduccionCategoriaService.select().subscribe(function (response) {
                    _this.categorias = response;
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert("Error en la petición");
                    }
                });
            }
            else {
                sweetalert2_1.default({
                    title: 'Atención!',
                    text: response.message,
                    type: 'warning',
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
    NewComponent.prototype.onKeyPlaca = function () {
        var _this = this;
        sweetalert2_1.default({
            title: 'Cargando Datos del Vehiculo!',
            text: 'Solo tardará unos segundos por favor espere.',
            timer: 2500,
            onOpen: function () {
                sweetalert2_1.default.showLoading();
            }
        }).then(function (result) {
            if (
            // Read more about handling dismissals
            result.dismiss === sweetalert2_1.default.DismissReason.timer) {
            }
        });
        var token = this._loginService.getToken();
        this._VechiculoService.showVehiculoPlaca(token, this.placa).subscribe(function (response) {
            if (response.status == "success") {
                _this.vehiculo = response.data;
                _this._ciudadanoVehiculoService.showCiudadanoVehiculoId(token, _this.vehiculo.placa.numero).subscribe(function (response) {
                    _this.propietariosVehiculo = response.data;
                    _this.propietariosVehiculo.forEach(function (element) {
                        if (element.ciudadano) {
                            _this.isCiudadano = true;
                        }
                        if (element.empresa) {
                            _this.isEmpresa = true;
                        }
                    });
                    (function (error) {
                        _this.errorMessage = error;
                        if (_this.errorMessage != null) {
                            console.log(_this.errorMessage);
                            alert("Error en la petición");
                        }
                    });
                });
            }
            else {
                sweetalert2_1.default({
                    title: 'Atención!',
                    text: response.msj,
                    type: 'warning',
                    confirmButtonText: 'Aceptar'
                });
                _this.vehiculo = false;
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
    NewComponent.prototype.onSearchInfractor = function () {
        var _this = this;
        sweetalert2_1.default({
            title: 'Cargando Datos del Ciudadano!',
            text: 'Solo tardará unos segundos por favor espere.',
            timer: 1000,
            onOpen: function () {
                sweetalert2_1.default.showLoading();
            }
        }).then(function (result) {
            if (
            // Read more about handling dismissals
            result.dismiss === sweetalert2_1.default.DismissReason.timer) {
            }
        });
        var token = this._loginService.getToken();
        this._CiudadanoService.searchByIdentificacion(token, this.identificacion).subscribe(function (response) {
            if (response.status == "success") {
                _this.ciudadano = response.data;
                _this._CiudadanoService.calculateAge({ 'fechaNacimiento': _this.ciudadano.fechaNacimiento }, token).subscribe(function (response) {
                    _this.edad = response.data;
                    (function (error) {
                        _this.errorMessage = error;
                        if (_this.errorMessage != null) {
                            console.log(_this.errorMessage);
                            alert("Error en la petición");
                        }
                    });
                });
            }
            else {
                sweetalert2_1.default({
                    title: 'Atención!',
                    text: response.msj,
                    type: 'warning',
                    confirmButtonText: 'Aceptar'
                });
                _this._TipoIdentificacionService.getTipoIdentificacionSelect().subscribe(function (response) {
                    _this.tiposIdentificacion = response;
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert("Error en la petición");
                    }
                });
                _this._MunicipioService.getMunicipioSelect().subscribe(function (response) {
                    _this.municipios = response;
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert("Error en la petición");
                    }
                });
                _this.ciudadano = false;
            }
            console.log(_this.vehiculo);
            (function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert("Error en la petición");
                }
            });
        });
    };
    NewComponent.prototype.onChangedInfraccion = function (e) {
        var _this = this;
        if (e) {
            var token_1 = this._loginService.getToken();
            this._MflInfraccionService.show({ 'id': e }, token_1).subscribe(function (response) {
                _this.infraccion = response.data;
                _this._MflInfraccionService.calculateValue({ 'idInfraccion': _this.infraccion.id }, token_1).subscribe(function (response) {
                    _this.infraccion.valor = response.data;
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert("Error en la petición");
                    }
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
    NewComponent.prototype.onSearchTestigo = function () {
        var _this = this;
        sweetalert2_1.default({
            title: 'Cargando Datos del Ciudadano!',
            text: 'Solo tardará unos segundos por favor espere.',
            timer: 1000,
            onOpen: function () {
                sweetalert2_1.default.showLoading();
            }
        }).then(function (result) {
            if (
            // Read more about handling dismissals
            result.dismiss === sweetalert2_1.default.DismissReason.timer) {
            }
        });
        var token = this._loginService.getToken();
        this._CiudadanoService.searchByIdentificacion(token, { 'numeroIdentificacion': this.testigo.identificacion }).subscribe(function (response) {
            if (response.status == "success") {
                _this.testigo = response.data;
            }
            else {
                sweetalert2_1.default({
                    title: 'Atención!',
                    text: response.msj,
                    type: 'warning',
                    confirmButtonText: 'Aceptar'
                });
            }
            console.log(_this.vehiculo);
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
        templateUrl: './new.component.html'
    }),
    __metadata("design:paramtypes", [comparendo_service_1.ComparendoService,
        login_service_1.LoginService,
        mpersonalFuncionario_service_1.MpersonalFuncionarioService,
        mpersonalComparendo_service_1.MpersonalComparendoService,
        sedeOperativa_service_1.SedeOperativaService,
        municipio_service_1.MunicipioService,
        vehiculo_service_1.VehiculoService,
        ciudadano_service_1.CiudadanoService,
        ciudadanoVehiculo_service_1.CiudadanoVehiculoService,
        tipoIdentificacion_service_1.TipoIdentificacionService,
        mparqPatio_service_1.MparqPatioService,
        mparqGrua_service_1.MparqGruaService,
        cfgComparendoEstado_service_1.CfgComparendoEstadoService,
        mflInfraccion_service_1.MflInfraccionService,
        cfgTipoInfractor_service_1.CfgTipoInfractorService,
        cfgLicenciaConduccionCategoria_service_1.CfgLicenciaConduccionCategoriaService])
], NewComponent);
exports.NewComponent = NewComponent;
//# sourceMappingURL=new.component.js.map