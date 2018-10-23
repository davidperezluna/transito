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
var factura_modelo_1 = require("../factura.modelo");
var factura_service_1 = require("../../../services/factura.service");
var login_service_1 = require("../../../services/login.service");
var ciudadano_service_1 = require("../../../services/ciudadano.service");
var tipoIdentificacion_service_1 = require("../../../services/tipoIdentificacion.service");
var mflTipoRecaudo_service_1 = require("../../../services/mflTipoRecaudo.service");
var mpersonalFuncionario_service_1 = require("../../../services/mpersonalFuncionario.service");
var ciudadanoVehiculo_service_1 = require("../../../services/ciudadanoVehiculo.service");
var modulo_service_1 = require("../../../services/modulo.service");
var tramitePrecio_service_1 = require("../../../services/tramitePrecio.service");
var common_1 = require("@angular/common");
var cfgValorVehiculo_service_1 = require("../../../services/cfgValorVehiculo.service");
var sweetalert2_1 = require("sweetalert2");
var environment_1 = require("environments/environment");
var NewComponent = (function () {
    function NewComponent(_FacturaService, _TramitePrecioService, _CiudadanoService, _loginService, _tipoIdentificacionService, _FuncionarioService, _MflTipoRecaudoService, _ciudadanoVehiculoService, _ModuloService, _CfgValorVehiculoService) {
        this._FacturaService = _FacturaService;
        this._TramitePrecioService = _TramitePrecioService;
        this._CiudadanoService = _CiudadanoService;
        this._loginService = _loginService;
        this._tipoIdentificacionService = _tipoIdentificacionService;
        this._FuncionarioService = _FuncionarioService;
        this._MflTipoRecaudoService = _MflTipoRecaudoService;
        this._ciudadanoVehiculoService = _ciudadanoVehiculoService;
        this._ModuloService = _ModuloService;
        this._CfgValorVehiculoService = _CfgValorVehiculoService;
        this.ready = new core_1.EventEmitter();
        this.funcionario = false;
        this.isExistCiudadano = false;
        this.isExistVehiculo = false;
        this.propietario = false;
        this.newCiudadanoForm = false;
        this.modulo = null;
        this.tramitesValor = [];
        this.vendedores = 0;
        this.propietariosVehiculo = [];
        this.propietariosVehiculoRetefuente = [];
        this.isCiudadanoForm = false;
        this.isEmpresaForm = false;
        this.datos = [];
        this.valorRetefuenteUnitario = 0;
    }
    NewComponent.prototype.ngOnInit = function () {
        var _this = this;
        sweetalert2_1.default({
            title: 'Cargando Datos!',
            text: 'Solo tardara unos segundos por favor espere.',
            onOpen: function () {
                sweetalert2_1.default.showLoading();
            }
        }).then(function (result) {
            if (
            // Read more about handling dismissals
            result.dismiss === sweetalert2_1.default.DismissReason.timer) {
            }
        });
        this._ModuloService.getModuloSelect().subscribe(function (response) {
            _this.modulos = response;
            sweetalert2_1.default.close();
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._tipoIdentificacionService.getTipoIdentificacionSelect().subscribe(function (response) {
            _this.tiposIdentificacion = response;
            sweetalert2_1.default.close();
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
        this.date = new Date();
        var identity = this._loginService.getIdentity();
        this.factura = new factura_modelo_1.Factura(null, null, null, null, null, null, null, null, null);
        var datePiper = new common_1.DatePipe(this.date);
        var token = this._loginService.getToken();
        this._FuncionarioService.searchLogin(identity, token).subscribe(function (response) {
            if (response.status == 'success') {
                _this.sedeOperativa = response.data.sedeOperativa;
                _this.funcionario = true;
                _this.factura.numero = datePiper.transform(_this.date, 'hmss');
                _this.factura.fechaCreacion = datePiper.transform(_this.date, 'yyyy-MM-dd');
                _this.factura.sedeOperativaId = _this.sedeOperativa.id;
            }
            (function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert('Error en la petición');
                }
            });
        });
        this._MflTipoRecaudoService.select().subscribe(function (response) {
            _this.tiposRecaudo = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
    };
    NewComponent.prototype.onCancelar = function () {
        this.ready.emit(true);
    };
    NewComponent.prototype.onEnviar = function () {
        var _this = this;
        var token = this._loginService.getToken();
        var datos = {
            'factura': this.factura,
            'tramitesValor': this.tramitesValor,
            'valorVehiculoId': this.valorVehiculoId,
            'propietarios': this.propietariosVehiculoRetefuente,
            'retencion': this.valorRetefuenteUnitario
        };
        this._FacturaService.register(datos, token).subscribe(function (response) {
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
                    text: 'El factura ' + _this.factura.numero + ' ya se encuentra registrado',
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
    NewComponent.prototype.isCiudadano = function () {
        var _this = this;
        console.log(this.tipoIdentificacionSelected);
        var token = this._loginService.getToken();
        var datos = {
            'identificacion': this.identificacion,
            'tipoIdentificacion': this.tipoIdentificacionSelected,
        };
        this._CiudadanoService.isCiudadano(datos, token).subscribe(function (response) {
            _this.respuesta = response;
            if (_this.respuesta.status == 'error') {
                _this.ciudadano = _this.respuesta.datos;
                _this.factura.ciudadanoId = _this.ciudadano.id;
                _this.isExistCiudadano = true;
                _this.isErrorCiudadano = false;
                _this.newCiudadanoForm = false;
            }
            else {
                _this.isErrorCiudadano = true;
                _this.isExistCiudadano = false;
                _this.newCiudadanoForm = true;
            }
            (function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert('Error en la petición');
                }
            });
        });
    };
    NewComponent.prototype.onKeyValidateVehiculo = function () {
        var _this = this;
        sweetalert2_1.default({
            title: 'Buscando Vehiculo!',
            text: 'Solo tardara unos segundos por favor espere.',
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
        this._ciudadanoVehiculoService.showCiudadanoVehiculoId(token, this.vehiculoCriterio).subscribe(function (response) {
            if (response.code == 200) {
                _this.msj = 'vehiculo encontrado';
                _this.isErrorVehiculo = false;
                _this.isExistVehiculo = true;
                _this.vehiculo = response.data[0].vehiculo;
                _this.factura.vehiculoId = _this.vehiculo.id;
                _this.propietario = true;
                sweetalert2_1.default.close();
            }
            if (response.code == 400) {
                _this.msj = 'vehiculo encontrado';
                _this.isErrorVehiculo = false;
                _this.isExistVehiculo = true;
                _this.vehiculo = response.data;
                _this.factura.vehiculoId = _this.vehiculo.id;
                sweetalert2_1.default.close();
                sweetalert2_1.default({
                    title: 'Sin propietarios!',
                    text: 'Necesita facturar matricula inicial para este vehiculo',
                    type: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
            if (response.code == 401) {
                _this.msj = 'vehiculo no se encuentra en la base de datos';
                _this.isErrorVehiculo = true;
                _this.isExistVehiculo = false;
                sweetalert2_1.default.close();
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
    NewComponent.prototype.onChangedModulo = function (e) {
        var _this = this;
        if (e) {
            var token = this._loginService.getToken();
            this._ModuloService.showModulo(token, this.moduloSelected).subscribe(function (response) {
                _this.modulo = response.data;
            }, function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert("Error en la petición");
                }
            });
            this._TramitePrecioService.getTramitePrecioPorModuloSelect(this.moduloSelected).subscribe(function (response) {
                _this.tramitesPrecio = response;
            }, function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert("Error en la petición");
                }
            });
        }
    };
    NewComponent.prototype.btnNewTramite = function () {
        var _this = this;
        var token = this._loginService.getToken();
        if (this.modulo.abreviatura == 'RNA') {
            if (!this.propietario) {
                this._TramitePrecioService.showTramitePrecio(token, this.tramitePrecioSelected).subscribe(function (response) {
                    _this.tramitePrecio = response.data;
                    if (_this.tramitePrecio.tramite.formulario == 'rna-matriculainicial') {
                        _this.factura.valorBruto = _this.factura.valorBruto + parseInt(_this.tramitePrecio.valorTotal);
                        _this.tramitesValor.push({
                            'idTramitePrecio': _this.tramitePrecio.id,
                            'nombre': _this.tramitePrecio.nombre,
                            'valor': _this.tramitePrecio.valorTotal
                        });
                    }
                    else {
                        sweetalert2_1.default({
                            title: 'Sin propietarios!',
                            text: 'Necesita facturar matricula inicial para este vehiculo',
                            type: 'error',
                            confirmButtonText: 'Aceptar'
                        });
                    }
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert("Error en la petición");
                    }
                });
            }
            else {
                this._TramitePrecioService.showTramitePrecio(token, this.tramitePrecioSelected).subscribe(function (response) {
                    _this.tramitePrecio = response.data;
                    if (_this.tramitePrecio.tramite.id == 6) {
                        _this.factura.valorBruto = _this.factura.valorBruto + parseInt(_this.tramitePrecio.valorTotal);
                        _this.tramitesValor.push({
                            'idTramitePrecio': _this.tramitePrecio.id,
                            'nombre': _this.tramitePrecio.nombre,
                            'valor': _this.tramitePrecio.valorTotal
                        });
                        sweetalert2_1.default({
                            title: 'Buscando Propietarios!',
                            text: 'Solo tardara unos segundos por favor espere.',
                            onOpen: function () {
                                sweetalert2_1.default.showLoading();
                            }
                        }).then(function (result) {
                            if (
                            // Read more about handling dismissals
                            result.dismiss === sweetalert2_1.default.DismissReason.timer) {
                            }
                        });
                        _this._ciudadanoVehiculoService.showCiudadanoVehiculoId(token, _this.vehiculoCriterio).subscribe(function (response) {
                            var datos = {
                                'linea': _this.vehiculo.linea.id,
                                'clase': _this.vehiculo.clase.id,
                                'modelo': _this.vehiculo.modelo
                            };
                            _this._CfgValorVehiculoService.getCfgValorVehiculoVehiculo(datos, token).subscribe(function (valorVehiculo) {
                                if (valorVehiculo.datos != null) {
                                    _this.valorRetefuente = parseInt(valorVehiculo.datos.valor) * 0.01;
                                    _this.valorVehiculoId = valorVehiculo.datos.id;
                                    _this.propietariosVehiculo = response.data;
                                    response.data.forEach(function (element) {
                                        if (element.ciudadano) {
                                            _this.isCiudadanoForm = true;
                                        }
                                        if (element.empresa) {
                                            _this.isEmpresaForm = true;
                                        }
                                    });
                                    sweetalert2_1.default.close();
                                }
                                else {
                                    sweetalert2_1.default.close();
                                    sweetalert2_1.default({
                                        title: 'Sin valor!',
                                        text: 'Necesita ingresar el valor del vehiculo',
                                        type: 'error',
                                        confirmButtonText: 'Aceptar'
                                    });
                                    return (0);
                                }
                            }, function (error) {
                                _this.errorMessage = error;
                                if (_this.errorMessage != null) {
                                    console.log(_this.errorMessage);
                                    alert("Error en la petición");
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
                        _this.factura.valorBruto = _this.factura.valorBruto + parseInt(_this.tramitePrecio.valorTotal);
                        _this.tramitesValor.push({
                            'idTramitePrecio': _this.tramitePrecio.id,
                            'nombre': _this.tramitePrecio.nombre,
                            'valor': _this.tramitePrecio.valorTotal
                        });
                    }
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert("Error en la petición");
                    }
                });
            }
        }
        else {
            this._TramitePrecioService.showTramitePrecio(token, this.tramitePrecioSelected).subscribe(function (response) {
                _this.tramitePrecio = response.data;
                _this.factura.valorBruto = _this.factura.valorBruto + parseInt(_this.tramitePrecio.valorTotal);
                _this.tramitesValor.push({
                    'idTramitePrecio': _this.tramitePrecio.id,
                    'nombre': _this.tramitePrecio.nombre,
                    'valor': _this.tramitePrecio.valorTotal
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
    NewComponent.prototype.deleteTramiteValor = function (tramiteValor) {
        this.factura.valorBruto = this.factura.valorBruto - parseInt(tramiteValor.valor);
        this.tramitesValor = this.tramitesValor.filter(function (h) { return h !== tramiteValor; });
    };
    // btnRetefunete(){
    //   let token = this._loginService.getToken();
    //   this._TramitePrecioService.showTramitePrecio(token,this.tramitePrecioSelected).subscribe(
    //     response => {
    //       this.tramitePrecio = response.data;
    //       this.factura.valorBruto = this.factura.valorBruto + parseInt(this.tramitePrecio.valorTotal); 
    //         this.tramitesValor.push(
    //           {
    //             'nombre':this.tramitePrecio.nombre,
    //             'valor':this.tramitePrecio.valorTotal
    //           }
    //         )
    //       error => {
    //         this.errorMessage = <any>error;
    //         if (this.errorMessage != null) {
    //           console.log(this.errorMessage);
    //           alert("Error en la petición");
    //         }
    //       }
    //     });    
    // }
    NewComponent.prototype.onVendedorSelect = function (eve, propietarioVehiculo) {
        if (eve.target.checked) {
            this.propietariosVehiculoRetefuente.push(propietarioVehiculo);
            this.vendedores = this.vendedores + 1;
        }
        else {
            this.vendedores = this.vendedores - 1;
            this.propietariosVehiculoRetefuente = this.propietariosVehiculoRetefuente.filter(function (h) { return h !== propietarioVehiculo; });
        }
        console.log(this.propietariosVehiculoRetefuente);
        this.valorRetefuenteUnitario = this.valorRetefuente / this.vendedores;
    };
    NewComponent.prototype.onImprimir = function () {
        var _this = this;
        var token = this._loginService.getToken();
        var datos = {
            'factura': this.factura,
            'tramitesValor': this.tramitesValor,
            'valorVehiculoId': this.valorVehiculoId,
            'propietarios': this.propietariosVehiculoRetefuente,
            'retencion': this.valorRetefuenteUnitario
        };
        this._FacturaService.imprimir(datos, token).subscribe(function (response) {
            window.open(environment_1.environment.uploadUrl + response);
            (function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert("Error en la petición");
                }
            });
        });
    };
    NewComponent.prototype.onCancelarTraspaso = function () {
        this.isCiudadanoForm = false;
        this.isEmpresaForm = false;
    };
    NewComponent.prototype.redyCidadano = function (ready) {
        this.newCiudadanoForm = false;
    };
    return NewComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewComponent.prototype, "ready", void 0);
NewComponent = __decorate([
    core_1.Component({
        selector: 'app-new-factura',
        templateUrl: './new.component.html',
        providers: [common_1.DatePipe]
    }),
    __metadata("design:paramtypes", [factura_service_1.FacturaService,
        tramitePrecio_service_1.TramitePrecioService,
        ciudadano_service_1.CiudadanoService,
        login_service_1.LoginService,
        tipoIdentificacion_service_1.TipoIdentificacionService,
        mpersonalFuncionario_service_1.MpersonalFuncionarioService,
        mflTipoRecaudo_service_1.MflTipoRecaudoService,
        ciudadanoVehiculo_service_1.CiudadanoVehiculoService,
        modulo_service_1.ModuloService,
        cfgValorVehiculo_service_1.CfgValorVehiculoService])
], NewComponent);
exports.NewComponent = NewComponent;
//# sourceMappingURL=new.component.js.map