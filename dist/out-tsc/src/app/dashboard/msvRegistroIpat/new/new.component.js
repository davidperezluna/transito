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
var msvRegistroIpat_service_1 = require("../../../services/msvRegistroIpat.service");
var mpersonalFuncionario_service_1 = require("../../../services/mpersonalFuncionario.service");
var msvConsecutivo_service_1 = require("../../../services/msvConsecutivo.service");
var ciudadano_service_1 = require("../../../services/ciudadano.service");
var municipio_service_1 = require("../../../services/municipio.service");
var departamento_service_1 = require("../../../services/departamento.service");
var cfgGravedad_service_1 = require("../../../services/cfgGravedad.service");
var msvRegistroIpat_modelo_1 = require("../msvRegistroIpat.modelo");
var sedeOperativa_service_1 = require("../../../services/sedeOperativa.service");
var cfgClaseAccidente_service_1 = require("../../../services/cfgClaseAccidente.service");
var cfgChoqueCon_service_1 = require("../../../services/cfgChoqueCon.service");
var cfgObjetoFijo_service_1 = require("../../../services/cfgObjetoFijo.service");
var svCfgArea_service_1 = require("../../../services/svCfgArea.service");
var svCfgSector_service_1 = require("../../../services/svCfgSector.service");
var svCfgZona_service_1 = require("../../../services/svCfgZona.service");
var svCfgDisenio_service_1 = require("../../../services/svCfgDisenio.service");
var svCfgEstadoTiempo_service_1 = require("../../../services/svCfgEstadoTiempo.service");
var svCfgGeometria_service_1 = require("../../../services/svCfgGeometria.service");
var svCfgUtilizacion_service_1 = require("../../../services/svCfgUtilizacion.service");
var svCfgCalzadaCarril_service_1 = require("../../../services/svCfgCalzadaCarril.service");
var svCfgMaterial_service_1 = require("../../../services/svCfgMaterial.service");
var svCfgEstadoVia_service_1 = require("../../../services/svCfgEstadoVia.service");
var svCfgCondicionVia_service_1 = require("../../../services/svCfgCondicionVia.service");
var svCfgIluminacion_service_1 = require("../../../services/svCfgIluminacion.service");
var svCfgEstadoIluminacion_service_1 = require("../../../services/svCfgEstadoIluminacion.service");
var svCfgVisual_service_1 = require("../../../services/svCfgVisual.service");
var svCfgVisualDisminuida_service_1 = require("../../../services/svCfgVisualDisminuida.service");
var svCfgResultadoExamen_service_1 = require("../../../services/svCfgResultadoExamen.service");
var svCfgGradoExamen_service_1 = require("../../../services/svCfgGradoExamen.service");
var svCfgHospital_service_1 = require("../../../services/svCfgHospital.service");
var empresa_service_1 = require("../../../services/empresa.service");
var svCfgFalla_service_1 = require("../../../services/svCfgFalla.service");
var svCfgLugarImpacto_service_1 = require("../../../services/svCfgLugarImpacto.service");
var clase_service_1 = require("../../../services/clase.service");
var servicio_service_1 = require("../../../services/servicio.service");
var svCfgHipotesis_service_1 = require("../../../services/svCfgHipotesis.service");
var svCfgTipoVictima_service_1 = require("../../../services/svCfgTipoVictima.service");
var svCfgGravedadVictima_service_1 = require("../../../services/svCfgGravedadVictima.service");
var sweetalert2_1 = require("sweetalert2");
var svCfgAseguradora_service_1 = require("../../../services/svCfgAseguradora.service");
var NewComponent = (function () {
    function NewComponent(_MsvRegistroIpatService, _FuncionarioService, _MsvConsecutivoService, _CiudadanoService, _loginService, _MunicipioService, _DepartamentoService, _GravedadService, _ClaseAccidenteService, _ChoqueConService, _ObjetoFijoService, _SedeOperativaService, _AseguradoraService, _AreaService, _SectorService, _ZonaService, _DisenioService, _EstadoTiempoService, _GeometriaService, _UtilizacionService, _CalzadaCarrilService, _MaterialService, _EstadoViaService, _CondicionViaService, _IluminacionService, _EstadoIluminacionService, _VisualService, _VisualDisminuidaService, _ResultadoExamenService, _GradoExamenService, _HospitalService, _EmpresaService, _FallaService, _LugarImpactoService, _ClaseService, _ServicioService, _HipotesisService, _TipoVictimaService, _GravedadVictimaService) {
        this._MsvRegistroIpatService = _MsvRegistroIpatService;
        this._FuncionarioService = _FuncionarioService;
        this._MsvConsecutivoService = _MsvConsecutivoService;
        this._CiudadanoService = _CiudadanoService;
        this._loginService = _loginService;
        this._MunicipioService = _MunicipioService;
        this._DepartamentoService = _DepartamentoService;
        this._GravedadService = _GravedadService;
        this._ClaseAccidenteService = _ClaseAccidenteService;
        this._ChoqueConService = _ChoqueConService;
        this._ObjetoFijoService = _ObjetoFijoService;
        this._SedeOperativaService = _SedeOperativaService;
        this._AseguradoraService = _AseguradoraService;
        this._AreaService = _AreaService;
        this._SectorService = _SectorService;
        this._ZonaService = _ZonaService;
        this._DisenioService = _DisenioService;
        this._EstadoTiempoService = _EstadoTiempoService;
        this._GeometriaService = _GeometriaService;
        this._UtilizacionService = _UtilizacionService;
        this._CalzadaCarrilService = _CalzadaCarrilService;
        this._MaterialService = _MaterialService;
        this._EstadoViaService = _EstadoViaService;
        this._CondicionViaService = _CondicionViaService;
        this._IluminacionService = _IluminacionService;
        this._EstadoIluminacionService = _EstadoIluminacionService;
        this._VisualService = _VisualService;
        this._VisualDisminuidaService = _VisualDisminuidaService;
        this._ResultadoExamenService = _ResultadoExamenService;
        this._GradoExamenService = _GradoExamenService;
        this._HospitalService = _HospitalService;
        this._EmpresaService = _EmpresaService;
        this._FallaService = _FallaService;
        this._LugarImpactoService = _LugarImpactoService;
        this._ClaseService = _ClaseService;
        this._ServicioService = _ServicioService;
        this._HipotesisService = _HipotesisService;
        this._TipoVictimaService = _TipoVictimaService;
        this._GravedadVictimaService = _GravedadVictimaService;
        this.ready = new core_1.EventEmitter();
        this.consecutivo = null;
        this.ipatEncontrado = null;
        this.ipats = false;
        this.gravedadSelected = null;
        this.claseAccidenteSelected = null;
        this.choqueConSelected = null;
        this.objetoFijoSelected = null;
        this.sedeOperativaSelected = null;
        this.aseguradoraSelected = null;
        this.areaSelected = null;
        this.sectorSelected = null;
        this.zonaSelected = null;
        this.disenioSelected = null;
        this.estadoTiempoSelected = null;
        this.geometriaSelected = null;
        this.utilizacionSelected = null;
        this.calzadaCarrilSelected = null;
        this.fallaSelected = null;
        this.materialSelected = null;
        this.estadoViaSelected = null;
        this.condicionViaSelected = null;
        this.iluminacionSelected = null;
        this.estadoIluminacionSelected = null;
        this.visualSelected = null;
        this.visualDisminuidaSelected = null;
        this.resultadoExamenSelected = null;
        this.gradoExamenSelected = null;
        this.licenciaConduccionSelected = null;
        this.lugarImpactoSelected = null;
        this.hipotesisSelected = null;
        this.tipoVictimaSelected = null;
        this.gravedadVictimaSelected = null;
        this.resumen = {};
        this.datos = {};
        this.datosVehiculo = {
            'vehiculos': [],
            'cDemandante': [],
            'cDemandado': [],
        };
    }
    NewComponent.prototype.ngOnInit = function () {
        this.msvRegistroIpat = new msvRegistroIpat_modelo_1.MsvRegistroIpat(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    };
    NewComponent.prototype.onCancelar = function () {
        this.ready.emit(true);
    };
    NewComponent.prototype.enviarTramite = function () {
        var _this = this;
        var token = this._loginService.getToken();
        var data = [
            { 'datosLimitacion': this.msvRegistroIpat },
            { 'vehiculosLimitacionArray': this.datosVehiculo },
        ];
        this._MsvRegistroIpatService.register(data, token).subscribe(function (response) {
            if (response.status == 'success') {
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
                    text: 'La limitacion a la propiedad ' + _this.consecutivo + ', con la fecha: ' + _this.msvRegistroIpat.fechaAccidente,
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
    NewComponent.prototype.onSearch = function () {
        var _this = this;
        sweetalert2_1.default({
            title: 'Buscando IPAT',
            text: 'Solo tardará unos segundos, por favor espere.',
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
        this.identity = this._loginService.getIdentity();
        var datos = {
            'nroIpat': this.nroIpat,
            'identificacionUsuario': this.identity.identificacion,
        };
        this._MsvConsecutivoService.showBySedeConsecutivo(token, datos).subscribe(function (response) {
            if (response.status == 'success') {
                _this.consecutivo = response.data;
                _this._GravedadService.getGravedadSelect().subscribe(function (response) {
                    _this.gravedades = response;
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert("Error en la petición");
                    }
                });
                _this._ClaseAccidenteService.getClaseAccidenteSelect().subscribe(function (response) {
                    _this.clasesAccidente = response;
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert("Error en la petición");
                    }
                });
                _this._ChoqueConService.getChoqueConSelect().subscribe(function (response) {
                    _this.choquesCon = response;
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert("Error en la petición");
                    }
                });
                _this._ObjetoFijoService.getObjetoFijoSelect().subscribe(function (response) {
                    _this.objetosFijos = response;
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert("Error en la petición");
                    }
                });
                _this._SedeOperativaService.getSedeOperativaSelect().subscribe(function (response) {
                    _this.sedesOperativas = response;
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert("Error en la petición");
                    }
                });
                _this._AreaService.getAreaSelect().subscribe(function (response) {
                    _this.areas = response;
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert("Error en la petición");
                    }
                });
                _this._AseguradoraService.getAseguradoraSelect().subscribe(function (response) {
                    _this.aseguradoras = response;
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert("Error en la petición");
                    }
                });
                _this._SectorService.getSectorSelect().subscribe(function (response) {
                    _this.sectores = response;
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert("Error en la petición");
                    }
                });
                _this._ZonaService.getZonaSelect().subscribe(function (response) {
                    _this.zonas = response;
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert("Error en la petición");
                    }
                });
                _this._FallaService.getFallaSelect().subscribe(function (response) {
                    _this.fallas = response;
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert("Error en la petición");
                    }
                });
                _this._DisenioService.getDisenioSelect().subscribe(function (response) {
                    _this.disenios = response;
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert("Error en la petición");
                    }
                });
                _this._EstadoTiempoService.getEstadoTiempoSelect().subscribe(function (response) {
                    _this.estadosTiempo = response;
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert("Error en la petición");
                    }
                });
                _this._GeometriaService.getGeometriaSelect().subscribe(function (response) {
                    _this.geometrias = response;
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert("Error en la petición");
                    }
                });
                _this._UtilizacionService.getUtilizacionSelect().subscribe(function (response) {
                    _this.utilizaciones = response;
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert("Error en la petición");
                    }
                });
                _this._CalzadaCarrilService.getCalzadaCarrilSelect().subscribe(function (response) {
                    _this.calzadasCarriles = response;
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert("Error en la petición");
                    }
                });
                _this._MaterialService.getMaterialSelect().subscribe(function (response) {
                    _this.materiales = response;
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert("Error en la petición");
                    }
                });
                _this._EstadoViaService.getEstadoViaSelect().subscribe(function (response) {
                    _this.estadosVia = response;
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert("Error en la petición");
                    }
                });
                _this._CondicionViaService.getCondicionViaSelect().subscribe(function (response) {
                    _this.condicionesVia = response;
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert("Error en la petición");
                    }
                });
                _this._IluminacionService.getIluminacionSelect().subscribe(function (response) {
                    _this.iluminaciones = response;
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert("Error en la petición");
                    }
                });
                _this._EstadoIluminacionService.getEstadoIluminacionSelect().subscribe(function (response) {
                    _this.estadosIluminacion = response;
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert("Error en la petición");
                    }
                });
                _this._VisualService.getVisualSelect().subscribe(function (response) {
                    _this.visuales = response;
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert("Error en la petición");
                    }
                });
                _this._VisualDisminuidaService.getVisualDisminuidaSelect().subscribe(function (response) {
                    _this.visualesDisminuidas = response;
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert("Error en la petición");
                    }
                });
                _this._ResultadoExamenService.getResultadoExamenSelect().subscribe(function (response) {
                    _this.resultadosExamen = response;
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert("Error en la petición");
                    }
                });
                _this._GradoExamenService.getGradoExamenSelect().subscribe(function (response) {
                    _this.gradosExamen = response;
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert("Error en la petición");
                    }
                });
                _this._LugarImpactoService.getLugarImpactoSelect().subscribe(function (response) {
                    _this.lugaresImpacto = response;
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert("Error en la petición");
                    }
                });
                _this._HospitalService.getHospitalSelect().subscribe(function (response) {
                    _this.hospitales = response;
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert("Error en la petición");
                    }
                });
                _this._EmpresaService.getEmpresaSelect().subscribe(function (response) {
                    _this.empresas = response;
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert("Error en la petición");
                    }
                });
                /*this._.().subscribe(
                  response => {
                    this. = response;
                  },
                  error => {
                    this.errorMessage = <any>error;
            
                    if (this.errorMessage != null) {
                      console.log(this.errorMessage);
                      alert("Error en la petición");
                    }
                  }
                );
                this._.().subscribe(
                  response => {
                    this. = response;
                  },
                  error => {
                    this.errorMessage = <any>error;
            
                    if (this.errorMessage != null) {
                      console.log(this.errorMessage);
                      alert("Error en la petición");
                    }
                  }
                );*/
                _this._ClaseService.getClaseSelect().subscribe(function (response) {
                    _this.clases = response;
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert("Error en la petición");
                    }
                });
                _this._ServicioService.getServicioSelect().subscribe(function (response) {
                    _this.servicios = response;
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert("Error en la petición");
                    }
                });
                _this._HipotesisService.getHipotesisSelect().subscribe(function (response) {
                    _this.hipotesis = response;
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert("Error en la petición");
                    }
                });
                _this._TipoVictimaService.getTipoVictimaSelect().subscribe(function (response) {
                    _this.tiposVictima = response;
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert("Error en la petición");
                    }
                });
                _this._GravedadVictimaService.getGravedadVictimaSelect().subscribe(function (response) {
                    _this.gravedadesVictima = response;
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
                    title: 'Alerta!',
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
        this._FuncionarioService.searchLogin(this.identity, token).subscribe(function (response) {
            if (response.status == 'success') {
                _this.sedeOperativa = response.data.sedeOperativa;
            }
            else {
                sweetalert2_1.default({
                    title: 'Alerta!',
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
    };
    NewComponent.prototype.delete = function (vehiculo) {
        this.datosVehiculo.vehiculos = this.datosVehiculo.vehiculos.filter(function (h) { return h !== vehiculo; });
        if (this.datosVehiculo.vehiculos.length === 0) {
            this.ipats = false;
        }
    };
    NewComponent.prototype.btnNewVehiculo = function () {
        this.datosVehiculo.vehiculos.push({
            'placa': this.consecutivo,
            'sedeOperativa': this.consecutivo
        });
        this.ipatEncontrado = 1;
        this.ipats = true;
    };
    NewComponent.prototype.btnCancelarVehiculo = function () {
        this.ipatEncontrado = 1;
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
    __metadata("design:paramtypes", [msvRegistroIpat_service_1.MsvRegistroIpatService,
        mpersonalFuncionario_service_1.MpersonalFuncionarioService,
        msvConsecutivo_service_1.MsvConsecutivoService,
        ciudadano_service_1.CiudadanoService,
        login_service_1.LoginService,
        municipio_service_1.MunicipioService,
        departamento_service_1.DepartamentoService,
        cfgGravedad_service_1.CfgGravedadService,
        cfgClaseAccidente_service_1.CfgClaseAccidenteService,
        cfgChoqueCon_service_1.CfgChoqueConService,
        cfgObjetoFijo_service_1.CfgObjetoFijoService,
        sedeOperativa_service_1.SedeOperativaService,
        svCfgAseguradora_service_1.SvCfgAseguradoraService,
        svCfgArea_service_1.SvCfgAreaService,
        svCfgSector_service_1.SvCfgSectorService,
        svCfgZona_service_1.SvCfgZonaService,
        svCfgDisenio_service_1.SvCfgDisenioService,
        svCfgEstadoTiempo_service_1.SvCfgEstadoTiempoService,
        svCfgGeometria_service_1.SvCfgGeometriaService,
        svCfgUtilizacion_service_1.SvCfgUtilizacionService,
        svCfgCalzadaCarril_service_1.SvCfgCalzadaCarrilService,
        svCfgMaterial_service_1.SvCfgMaterialService,
        svCfgEstadoVia_service_1.SvCfgEstadoViaService,
        svCfgCondicionVia_service_1.SvCfgCondicionViaService,
        svCfgIluminacion_service_1.SvCfgIluminacionService,
        svCfgEstadoIluminacion_service_1.SvCfgEstadoIluminacionService,
        svCfgVisual_service_1.SvCfgVisualService,
        svCfgVisualDisminuida_service_1.SvCfgVisualDisminuidaService,
        svCfgResultadoExamen_service_1.SvCfgResultadoExamenService,
        svCfgGradoExamen_service_1.SvCfgGradoExamenService,
        svCfgHospital_service_1.SvCfgHospitalService,
        empresa_service_1.EmpresaService,
        svCfgFalla_service_1.SvCfgFallaService,
        svCfgLugarImpacto_service_1.SvCfgLugarImpactoService,
        clase_service_1.ClaseService,
        servicio_service_1.ServicioService,
        svCfgHipotesis_service_1.SvCfgHipotesisService,
        svCfgTipoVictima_service_1.SvCfgTipoVictimaService,
        svCfgGravedadVictima_service_1.SvCfgGravedadVictimaService])
], NewComponent);
exports.NewComponent = NewComponent;
//# sourceMappingURL=new.component.js.map