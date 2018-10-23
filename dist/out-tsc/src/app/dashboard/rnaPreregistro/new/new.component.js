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
var rnaPreregistro_modelo_1 = require("../rnaPreregistro.modelo");
var departamento_service_1 = require("../../../services/departamento.service");
var login_service_1 = require("../../../services/login.service");
var municipio_service_1 = require("../../../services/municipio.service");
var linea_service_1 = require("../../../services/linea.service");
var clase_service_1 = require("../../../services/clase.service");
var carroceria_service_1 = require("../../../services/carroceria.service");
var servicio_service_1 = require("../../../services/servicio.service");
var color_service_1 = require("../../../services/color.service");
var combustible_service_1 = require("../../../services/combustible.service");
var cfgRadioAccion_service_1 = require("../../../services/cfgRadioAccion.service");
var vhloCfgModalidadTransporte_service_1 = require("../../../services/vhloCfgModalidadTransporte.service");
var rnaPreregistro_service_1 = require("../../../services/rnaPreregistro.service");
var sedeOperativa_service_1 = require("../../../services/sedeOperativa.service");
var marca_service_1 = require("../../../services/marca.service");
var tipoIdentificacion_service_1 = require("../../../services/tipoIdentificacion.service");
var ciudadano_service_1 = require("../../../services/ciudadano.service");
var empresa_service_1 = require("../../../services/empresa.service");
var ciudadanoVehiculo_service_1 = require("../../../services/ciudadanoVehiculo.service");
var mpersonalFuncionario_service_1 = require("../../../services/mpersonalFuncionario.service");
var sweetalert2_1 = require("sweetalert2");
var NewRnaPreregistroComponent = (function () {
    function NewRnaPreregistroComponent(_departamentoService, _loginService, _MunicipioService, _MarcaService, _lineaService, _ClaseService, _CarroceriaService, _ServicioService, _ColorService, _CombustibleService, _CfgRadioAccionService, _ModalidadTransporteService, _RnaPreregistroService, _SedeOperativaService, _tipoIdentificacionService, _CiudadanoService, _EmpresaService, _CiudadanoVehiculoService, _FuncionarioService) {
        this._departamentoService = _departamentoService;
        this._loginService = _loginService;
        this._MunicipioService = _MunicipioService;
        this._MarcaService = _MarcaService;
        this._lineaService = _lineaService;
        this._ClaseService = _ClaseService;
        this._CarroceriaService = _CarroceriaService;
        this._ServicioService = _ServicioService;
        this._ColorService = _ColorService;
        this._CombustibleService = _CombustibleService;
        this._CfgRadioAccionService = _CfgRadioAccionService;
        this._ModalidadTransporteService = _ModalidadTransporteService;
        this._RnaPreregistroService = _RnaPreregistroService;
        this._SedeOperativaService = _SedeOperativaService;
        this._tipoIdentificacionService = _tipoIdentificacionService;
        this._CiudadanoService = _CiudadanoService;
        this._EmpresaService = _EmpresaService;
        this._CiudadanoVehiculoService = _CiudadanoVehiculoService;
        this._FuncionarioService = _FuncionarioService;
        this.ready = new core_1.EventEmitter();
        this.ciudadanoEncontrado = 1;
        this.empresaEncontrada = 1;
        this.listaPropietariosCiudadanos = false;
        this.listaPropietariosEmpresas = false;
        this.empresaNew = false;
        this.radicado = false;
        this.persona = 'empresa';
        this.btnRadicado = 'Preregistro para matricula inicial';
        this.propietario = true;
        this.tipoPropiedades = [
            { 'value': 1, 'label': "Leasing" },
            { 'value': 2, 'label': "Propio" }
        ];
        this.resumen = {};
        this.datos = {
            'propietariosEmpresas': [],
            'propietariosCiudadanos': [],
            'solidario': false,
            'vehiculo': null,
            'sustrato': null,
            'numeroLicencia': null,
            'tramiteFormulario': null,
            'facturaId': null,
        };
    }
    NewRnaPreregistroComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.vehiculo = new rnaPreregistro_modelo_1.RnaPreregistro(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
        var token = this._loginService.getToken();
        var identity = this._loginService.getIdentity();
        var datos = { 'identificacion': identity.identificacion };
        this._tipoIdentificacionService.getTipoIdentificacionSelect().subscribe(function (response) {
            _this.tipoIdentificaciones = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
        this._MarcaService.getMarcaSelect().subscribe(function (response) {
            _this.marcas = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._MunicipioService.getMunicipioSelect().subscribe(function (response) {
            _this.municipios = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._SedeOperativaService.getSedeOperativaSelect().subscribe(function (response) {
            _this.sedesOperativas = response;
            _this._FuncionarioService.searchLogin(datos, token).subscribe(function (response) {
                if (response.status == 'success') {
                    _this.persona = 'funcionario';
                    _this.sedeOperativa = response.data.sedeOperativa;
                    _this.sedeOperativaSelected = [_this.sedeOperativa.id];
                }
                else {
                    _this._FuncionarioService.searchEmpresa(datos, token).subscribe(function (response) {
                        if (response.status == 'success') {
                            _this.persona = 'empresa';
                        }
                    }, function (error) {
                        _this.errorMessage = error;
                        if (_this.errorMessage != null) {
                            console.log(_this.errorMessage);
                            alert("Error en la petición");
                        }
                    });
                }
                (function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert('Error en la petición');
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
        this._ClaseService.getClasePorModuloSelect(2).subscribe(function (response) {
            _this.clases = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._CarroceriaService.getCarroceriaSelect().subscribe(function (response) {
            _this.carrocerias = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._ServicioService.getServicioSelect().subscribe(function (response) {
            _this.servicios = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._ColorService.select().subscribe(function (response) {
            _this.colores = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._CombustibleService.getCombustibleSelect().subscribe(function (response) {
            _this.combustibles = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._CfgRadioAccionService.getCfgRadioAccionSelect().subscribe(function (response) {
            _this.radiosAccion = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._ModalidadTransporteService.getCfgModalidadTransporteSelect().subscribe(function (response) {
            _this.modalidadesTransporte = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
    };
    NewRnaPreregistroComponent.prototype.onCancelar = function () {
        this.ready.emit(true);
    };
    NewRnaPreregistroComponent.prototype.onEnviar = function () {
        var _this = this;
        this.vehiculo.municipioId = this.municipioSelected;
        this.vehiculo.lineaId = this.lineaSelected;
        this.vehiculo.claseId = this.claseSelected;
        this.vehiculo.carroceriaId = this.carroceriaSelected;
        this.vehiculo.servicioId = this.servicioSelected;
        this.vehiculo.colorId = this.colorSelected;
        this.vehiculo.combustibleId = this.combustibleSelected;
        this.vehiculo.radioAccionId = this.radioAccionSelected;
        this.vehiculo.modalidadTransporteId = this.modalidadTransporteSelected;
        this.vehiculo.sedeOperativaId = this.sedeOperativaSelected;
        var datos = {
            'vehiculo': this.vehiculo,
            'sedeOperativaId': this.sedeOperativa.id,
        };
        var token = this._loginService.getToken();
        this._RnaPreregistroService.register(datos, token).subscribe(function (response) {
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
                    text: _this.respuesta.msj,
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
    NewRnaPreregistroComponent.prototype.onChangedMarca = function (e) {
        var _this = this;
        if (e) {
            var token = this._loginService.getToken();
            this._lineaService.searchByMarcaSelect({ 'idMarca': e }, token).subscribe(function (response) {
                _this.lineas = response;
            }, function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert("Error en la petición");
                }
            });
        }
    };
    NewRnaPreregistroComponent.prototype.onRadicado = function () {
        if (this.radicado) {
            this.radicado = false;
            this.btnRadicado = 'Preregistro para matricula inicial';
        }
        else {
            this.btnRadicado = 'Preregistro para radicado de cuenta';
            this.radicado = true;
        }
    };
    return NewRnaPreregistroComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRnaPreregistroComponent.prototype, "ready", void 0);
NewRnaPreregistroComponent = __decorate([
    core_1.Component({
        selector: 'app-new',
        templateUrl: './new.component.html'
    }),
    __metadata("design:paramtypes", [departamento_service_1.DepartamentoService,
        login_service_1.LoginService,
        municipio_service_1.MunicipioService,
        marca_service_1.MarcaService,
        linea_service_1.LineaService,
        clase_service_1.ClaseService,
        carroceria_service_1.CarroceriaService,
        servicio_service_1.ServicioService,
        color_service_1.ColorService,
        combustible_service_1.CombustibleService,
        cfgRadioAccion_service_1.CfgRadioAccionService,
        vhloCfgModalidadTransporte_service_1.VhloCfgModalidadTransporteService,
        rnaPreregistro_service_1.RnaPreregistroService,
        sedeOperativa_service_1.SedeOperativaService,
        tipoIdentificacion_service_1.TipoIdentificacionService,
        ciudadano_service_1.CiudadanoService,
        empresa_service_1.EmpresaService,
        ciudadanoVehiculo_service_1.CiudadanoVehiculoService,
        mpersonalFuncionario_service_1.MpersonalFuncionarioService])
], NewRnaPreregistroComponent);
exports.NewRnaPreregistroComponent = NewRnaPreregistroComponent;
//# sourceMappingURL=new.component.js.map