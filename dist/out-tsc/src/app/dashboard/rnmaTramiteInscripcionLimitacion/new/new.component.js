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
var login_service_1 = require("../../../services/login.service");
var tramiteLimitacion_service_1 = require("../../../services/tramiteLimitacion.service");
var vehiculoLimitacion_service_1 = require("../../../services/vehiculoLimitacion.service");
var vehiculo_service_1 = require("../../../services/vehiculo.service");
var ciudadano_service_1 = require("../../../services/ciudadano.service");
var municipio_service_1 = require("../../../services/municipio.service");
var departamento_service_1 = require("../../../services/departamento.service");
var cfgEntidadJudicial_service_1 = require("../../../services/cfgEntidadJudicial.service");
var cfgLimitacion_service_1 = require("../../../services/cfgLimitacion.service");
var cfgTipoProceso_service_1 = require("../../../services/cfgTipoProceso.service");
var cfgCausalLimitacion_service_1 = require("../../../services/cfgCausalLimitacion.service");
var tipoIdentificacion_service_1 = require("../../../services/tipoIdentificacion.service");
var rnmaTramiteInscripcionLimitacion_modelo_1 = require("../rnmaTramiteInscripcionLimitacion.modelo");
var sweetalert2_1 = require("sweetalert2");
var NewComponent = (function () {
    function NewComponent(_TramiteInscripcionLimitacionService, _VehiculoLimitacionService, _VehiculoService, _CiudadanoService, _loginService, _MunicipioService, _DepartamentoService, _CfgEntidadJuducialService, _LimitacionService, _CfgTipoProcesoService, _CfgCausalLimitacionService, _tipoIdentificacionService) {
        this._TramiteInscripcionLimitacionService = _TramiteInscripcionLimitacionService;
        this._VehiculoLimitacionService = _VehiculoLimitacionService;
        this._VehiculoService = _VehiculoService;
        this._CiudadanoService = _CiudadanoService;
        this._loginService = _loginService;
        this._MunicipioService = _MunicipioService;
        this._DepartamentoService = _DepartamentoService;
        this._CfgEntidadJuducialService = _CfgEntidadJuducialService;
        this._LimitacionService = _LimitacionService;
        this._CfgTipoProcesoService = _CfgTipoProcesoService;
        this._CfgCausalLimitacionService = _CfgCausalLimitacionService;
        this._tipoIdentificacionService = _tipoIdentificacionService;
        this.ready = new core_1.EventEmitter();
        this.ciudadanoDemandadoEncontrado = 1;
        this.ciudadanoDemandanteEncontrado = 1;
        this.placaEncontrada = 1;
        this.demandado = false;
        this.demandante = false;
        this.listaVehiculosPlacas = false;
        this.opcionSeleccionado = '0'; // Iniciamos
        this.verSeleccion = '';
        this.resumen = {};
        this.datos = {};
        this.datos2 = {
            'vehiculos': [],
            'cDemandante': [],
            'cDemandado': [],
        };
    }
    NewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.rnmaTramiteInscripcionLimitacion = new rnmaTramiteInscripcionLimitacion_modelo_1.RnmaTramiteInscripcionLimitacion(null, null, null, null, null, null, null, null, null, null, null, null, null);
        this._tipoIdentificacionService.getTipoIdentificacionSelect().subscribe(function (response) {
            _this.tipoIdentificacionesDemandado = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
        this._CfgCausalLimitacionService.getCausalLimitacionSelect().subscribe(function (response) {
            _this.causalesLimitacion = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
        this._tipoIdentificacionService.getTipoIdentificacionSelect().subscribe(function (response) {
            _this.tipoIdentificacionesDemandante = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
        // this._MunicipioService.getMunicipioSelect().subscribe(
        //   response => {
        //     this.municipios = response;
        //   },
        //   error => {
        //     this.errorMessage = <any>error;
        //     if (this.errorMessage != null) {
        //       console.log(this.errorMessage);
        //       alert("Error en la petición");
        //     }
        //   }
        // );
        this._DepartamentoService.getDepartamentoSelect().subscribe(function (response) {
            _this.departamentos = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._CfgEntidadJuducialService.getEntidadJudicialSelect().subscribe(function (response) {
            _this.entidadesJudiciales = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._LimitacionService.getLimitacionSelect().subscribe(function (response) {
            _this.limitaciones = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._CfgTipoProcesoService.getTipoProcesoSelect().subscribe(function (response) {
            _this.tiposProceso = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
    };
    NewComponent.prototype.onEnviar = function () {
    };
    NewComponent.prototype.onCancelar = function () {
        this.ready.emit(true);
    };
    NewComponent.prototype.enviarTramite = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this.rnmaTramiteInscripcionLimitacion.departamentoId = this.departamentoSelected;
        this.rnmaTramiteInscripcionLimitacion.entidadJudicialId = this.entidadJudicialSelected;
        this.rnmaTramiteInscripcionLimitacion.limitacionId = this.limitacionSelected;
        this.rnmaTramiteInscripcionLimitacion.municipioId = this.municipioSelected;
        this.rnmaTramiteInscripcionLimitacion.tipoProcesoId = this.tipoProcesoSelected;
        this.rnmaTramiteInscripcionLimitacion.causalLimitacionId = this.causalLimitacionSelected;
        this.rnmaTramiteInscripcionLimitacion.ciudadanoDemandadoId = this.ciudadanoDemandado.id;
        this.rnmaTramiteInscripcionLimitacion.ciudadanoDemandanteId = this.ciudadanoDemandante.id;
        var data = [
            { 'datosLimitacion': this.rnmaTramiteInscripcionLimitacion },
            { 'vehiculosLimitacionArray': this.datos2 }
        ];
        this._TramiteInscripcionLimitacionService.register(data, token).subscribe(function (response) {
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
                var eJudicial = _this.entidadesJudiciales[_this.entidadJudicialSelected - 1].label;
                sweetalert2_1.default({
                    title: 'Error!',
                    text: 'La limitacion a la propiedad ' + _this.vehiculo.placa.numero + ', con la fecha: ' + _this.rnmaTramiteInscripcionLimitacion.fechaExpedicion + ', expedido por la entidad judicial: ' + eJudicial + ' ya se encuentra registrado',
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
    NewComponent.prototype.capturar = function () {
        this.verSeleccion = this.opcionSeleccionado;
    };
    NewComponent.prototype.onKeyPlaca = function () {
        var _this = this;
        var token = this._loginService.getToken();
        var datos = {
            'placa': this.placa,
            'moduloId': 3,
        };
        this._VehiculoService.showVehiculoModuloPlaca(token, datos).subscribe(function (response) {
            _this.respuesta = response;
            if (_this.respuesta.status == 'success') {
                _this.vehiculo = _this.respuesta.data;
                _this.placaEncontrada = 2;
            }
            else {
                _this.placaEncontrada = 3;
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
    NewComponent.prototype.onKeyCiudadanoDemandado = function () {
        var _this = this;
        var token = this._loginService.getToken();
        var identificacion = {
            'numeroIdentificacion': this.identificacionDemandado,
        };
        this._CiudadanoService.searchByIdentificacion(token, identificacion).subscribe(function (response) {
            _this.respuesta = response;
            if (_this.respuesta.status == 'success') {
                _this.ciudadanoDemandado = _this.respuesta.data;
                _this.ciudadanoDemandadoEncontrado = 2;
                console.log(_this.ciudadanoDemandado);
            }
            else {
                _this.ciudadanoDemandadoEncontrado = 3;
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
    NewComponent.prototype.onKeyCiudadanoDemandante = function () {
        var _this = this;
        var token = this._loginService.getToken();
        var identificacion = {
            'numeroIdentificacion': this.identificacionDemandante,
        };
        this._CiudadanoService.searchByIdentificacion(token, identificacion).subscribe(function (response) {
            _this.respuesta = response;
            if (_this.respuesta.status == 'success') {
                _this.ciudadanoDemandante = _this.respuesta.data;
                _this.ciudadanoDemandanteEncontrado = 2;
            }
            else {
                _this.ciudadanoDemandanteEncontrado = 3;
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
    NewComponent.prototype.delete = function (vehiculo) {
        this.datos2.vehiculos = this.datos2.vehiculos.filter(function (h) { return h !== vehiculo; });
        if (this.datos2.vehiculos.length === 0) {
            this.listaVehiculosPlacas = false;
        }
    };
    NewComponent.prototype.deleteCiudadanoDemandado = function (ciudadanoDemandado) {
        this.datos2.cDemandado = this.datos2.cDemandado.filter(function (h) { return h !== ciudadanoDemandado; });
        if (this.datos2.cDemandado.length === 0) {
            this.demandado = false;
            this.ciudadanoDemandadoEncontrado = 1;
        }
    };
    NewComponent.prototype.deleteCiudadanoDemandante = function (ciudadanoDemandante) {
        this.datos2.cDemandante = this.datos2.cDemandante.filter(function (h) { return h !== ciudadanoDemandante; });
        if (this.datos2.cDemandante.length === 0) {
            this.demandante = false;
            this.ciudadanoDemandanteEncontrado = 1;
        }
    };
    NewComponent.prototype.changedDepartamento = function (e) {
        var _this = this;
        if (this.departamentoSelected) {
            var token = this._loginService.getToken();
            this._MunicipioService.getMunicipioPorDepartamentoSelect(this.departamentoSelected).subscribe(function (response) {
                if (response != null) {
                    _this.municipios = response;
                }
                else {
                    _this.municipios = [];
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
    NewComponent.prototype.btnNewVehiculo = function () {
        this.datos2.vehiculos.push({
            'placa': this.vehiculo.placa.numero,
            'sedeOperativa': this.vehiculo.sedeOperativa.nombre
        });
        this.placaEncontrada = 1;
        this.listaVehiculosPlacas = true;
    };
    NewComponent.prototype.btnNewDemandado = function () {
        this.datos2.cDemandado.push({
            'nombres': this.ciudadanoDemandado.primerNombre,
            'identificacion': this.ciudadanoDemandado.identificacion
        });
        this.ciudadanoDemandadoEncontrado = 5;
        this.demandado = true;
    };
    NewComponent.prototype.btnNewDemandante = function () {
        this.datos2.cDemandante.push({
            'nombres': this.ciudadanoDemandante.primerNombre,
            'identificacion': this.ciudadanoDemandante.identificacion
        });
        this.ciudadanoDemandanteEncontrado = 5;
        this.demandante = true;
    };
    NewComponent.prototype.btnCancelarVehiculo = function () {
        this.placaEncontrada = 1;
    };
    NewComponent.prototype.btnCancelarDemandado = function () {
        this.ciudadanoDemandadoEncontrado = 1;
    };
    NewComponent.prototype.btnCancelarDemandante = function () {
        this.ciudadanoDemandanteEncontrado = 1;
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
    __metadata("design:paramtypes", [tramiteLimitacion_service_1.TramiteLimitacionService,
        vehiculoLimitacion_service_1.VehiculoLimitacionService,
        vehiculo_service_1.VehiculoService,
        ciudadano_service_1.CiudadanoService,
        login_service_1.LoginService,
        municipio_service_1.MunicipioService,
        departamento_service_1.DepartamentoService,
        cfgEntidadJudicial_service_1.CfgEntidadJudicialService,
        cfgLimitacion_service_1.LimitacionService,
        cfgTipoProceso_service_1.CfgTipoProcesoService,
        cfgCausalLimitacion_service_1.CfgCausalLimitacionService,
        tipoIdentificacion_service_1.TipoIdentificacionService])
], NewComponent);
exports.NewComponent = NewComponent;
//# sourceMappingURL=new.component.js.map