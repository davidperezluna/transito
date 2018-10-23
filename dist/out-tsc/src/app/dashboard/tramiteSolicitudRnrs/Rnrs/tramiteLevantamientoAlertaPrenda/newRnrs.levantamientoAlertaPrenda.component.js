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
var tramiteSolicitud_service_1 = require("../../../../services/tramiteSolicitud.service");
var tramiteFactura_service_1 = require("../../../../services/tramiteFactura.service");
var banco_service_1 = require("../../../../services/banco.service");
var login_service_1 = require("../../../../services/login.service");
var cfgTipoAlerta_service_1 = require("../../../../services/cfgTipoAlerta.service");
var vehiculo_service_1 = require("../../../../services/vehiculo.service");
var vehiculoAcreedor_service_1 = require("../../../../services/vehiculoAcreedor.service");
var ciudadano_service_1 = require("../../../../services/ciudadano.service");
var router_1 = require("@angular/router");
var empresa_service_1 = require("../../../../services/empresa.service");
var tipoIdentificacion_service_1 = require("../../../../services/tipoIdentificacion.service");
var NewRnrsTramiteLevantamientoAlertaPrendaComponent = (function () {
    function NewRnrsTramiteLevantamientoAlertaPrendaComponent(_CfgTipoAlertaService, _TramiteSolicitudService, _BancoService, _loginService, _tramiteFacturaService, _VehiculoService, _VehiculoAcreedorService, _tipoIdentificacionService, _CiudadanoService, router, _EmpresaService) {
        this._CfgTipoAlertaService = _CfgTipoAlertaService;
        this._TramiteSolicitudService = _TramiteSolicitudService;
        this._BancoService = _BancoService;
        this._loginService = _loginService;
        this._tramiteFacturaService = _tramiteFacturaService;
        this._VehiculoService = _VehiculoService;
        this._VehiculoAcreedorService = _VehiculoAcreedorService;
        this._tipoIdentificacionService = _tipoIdentificacionService;
        this._CiudadanoService = _CiudadanoService;
        this.router = router;
        this._EmpresaService = _EmpresaService;
        this.readyTramite = new core_1.EventEmitter();
        this.cancelarTramite = new core_1.EventEmitter();
        this.vehiculo = null;
        this.banco = null;
        this.factura = null;
        this.tramitesFactura = null;
        this.placa = null;
        this.ciudadanoEncontrado = 1;
        this.acreedorEncontrado = 1;
        this.enviarEncontrado = 1;
        this.empresaEncontrada = 1;
        this.tipoIdentificacionSelected = null;
        this.listaAcreedoresVehiculo = false;
        this.listaAcreedoresCiudadanos = false;
        this.listaAcreedoresEmpresas = false;
        this.ciudadanoNew = false;
        this.pignorado = false;
        this.acreedorNew = false;
        this.propietario = true;
        this.propietarioPresente = false;
        this.formIndex = true;
        this.acreedores = [];
        this.gradosAlerta = [
            { 'value': 1, 'label': "UNO" },
            { 'value': 2, 'label': "DOS" },
            { 'value': 3, 'label': "TRES" },
            { 'value': 4, 'label': "CUATRO" },
            { 'value': 5, 'label': "CINCO" },
            { 'value': 6, 'label': "SEIS" },
            { 'value': 7, 'label': "SIETE" },
            { 'value': 8, 'label': "OCHO" },
            { 'value': 9, 'label': "NUEVE" }
        ];
        this.resumen = {};
        this.datos = {
            'acreedoresVehiculo': [],
            'acreedoresEmpresas': [],
            'acreedoresCiudadanos': [],
            'tipoAlerta': [],
            'gradoAlerta': null,
            'tramiteFormulario': null,
            'facturaId': null,
            'vehiculoPlaca': null,
        };
        this.tipoIdentificaciones = [];
    }
    ;
    NewRnrsTramiteLevantamientoAlertaPrendaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._tipoIdentificacionService.getTipoIdentificacionSelect().subscribe(function (response) {
            _this.tipoIdentificaciones = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
        this._CfgTipoAlertaService.getAlertaSelect().subscribe(function (response) {
            _this.cfgTiposAlerta = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._VehiculoAcreedorService.getAcreedor().subscribe(function (response) {
            _this.respuesta = response;
            console.log(response);
            if (_this.respuesta.status == 'success') {
                _this.vehiculosAcreedor = _this.respuesta.data;
            }
            else {
                _this.acreedorEncontrado = 3;
                _this.acreedorNew = true;
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
    NewRnrsTramiteLevantamientoAlertaPrendaComponent.prototype.enviarTramite = function () {
        var _this = this;
        var placaT = this.vehiculo.placa;
        this.datos.vehiculoPlaca = this.vehiculo.placa.numero;
        console.log(placaT);
        var token = this._loginService.getToken();
        this.datos.tipoAlerta = this.cfgTipoAlertaSelected;
        this.datos.gradoAlerta = this.gradoSelected;
        this.datos.facturaId = this.factura.id;
        this.datos.tramiteFormulario = 'rnrs-levantamientoprenda';
        this._VehiculoAcreedorService.deleteAcreedor(this.datos, token).subscribe(function (response) {
            _this.respuesta = response;
            if (_this.respuesta.status == 'success') {
                _this.vehiculo.pignorado = true;
                _this._VehiculoService.editVehiculoPignorado(_this.vehiculo, token).subscribe(function (response) {
                    _this.respuesta = response;
                    if (_this.respuesta.status == 'success') {
                        // this.vehiculoAcreedor = this.respuesta.data;
                        _this.ngOnInit();
                        // this.datos.tipoAlerta = this.cfgTipoAlertaSelected;
                        // this.datos.gradoAlerta = this.gradoSelected;
                        // this.datos.tramiteFactura = 46;
                        _this.readyTramite.emit({ 'foraneas': _this.datos, 'resumen': _this.resumen });
                        _this.acreedorNew = false;
                        _this.acreedorEncontrado = 2;
                    }
                    else {
                        _this.acreedorEncontrado = 3;
                        _this.acreedorNew = true;
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
            else {
                _this.acreedorEncontrado = 3;
                _this.acreedorNew = true;
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
    NewRnrsTramiteLevantamientoAlertaPrendaComponent.prototype.onCancelar = function () {
        this.cancelarTramite.emit(true);
    };
    NewRnrsTramiteLevantamientoAlertaPrendaComponent.prototype.onKeyAcreedor = function () {
        var token = this._loginService.getToken();
        var nombreAcreedor = {
            'nombreAcreedor': this.nombreAcreedor,
        };
    };
    NewRnrsTramiteLevantamientoAlertaPrendaComponent.prototype.onKeyCiudadano = function () {
        var _this = this;
        var token = this._loginService.getToken();
        var identificacion = {
            'numeroIdentificacion': this.identificacion,
        };
        this._CiudadanoService.searchByIdentificacion(token, identificacion).subscribe(function (response) {
            _this.respuesta = response;
            if (_this.respuesta.status == 'success') {
                _this.ciudadano = _this.respuesta.data.ciudadano.id;
                //this.ciudadanoEncontrado = 2;
                // this.ciudadanoNew = false;
                console.log(_this.ciudadano);
                _this._VehiculoAcreedorService.showAcreedorCiudadano(token, _this.ciudadano).subscribe(function (response) {
                    _this.respuesta = response;
                    if (_this.respuesta.status == 'success') {
                        _this.acreedor = _this.respuesta.data;
                        _this.acreedorEncontrado = 2;
                        _this.enviarEncontrado = 5;
                        _this.datos.acreedoresVehiculo.push({
                            'identificacion': _this.acreedor.ciudadano.usuario.identificacion,
                            'nombre': _this.acreedor.ciudadano.usuario.primerNombre + " " + _this.acreedor.ciudadano.usuario.segundoNombre,
                            'ciudadanoId': _this.acreedor.ciudadano.id,
                            'tipoAlerta': _this.acreedor.cfgTipoAlerta.nombre,
                            'gradoAlerta': _this.acreedor.gradoAlerta
                        });
                        _this.datos.acreedoresCiudadanos.push({
                            'identificacion': _this.acreedor.ciudadano.usuario.identificacion,
                            'nombre': _this.acreedor.ciudadano.usuario.primerNombre + " " + _this.acreedor.ciudadano.usuario.segundoNombre,
                            'ciudadanoId': _this.acreedor.ciudadano.id,
                            'tipoAlerta': _this.acreedor.cfgTipoAlerta.nombre,
                            'gradoAlerta': _this.acreedor.gradoAlerta
                        });
                        if (_this.propietario) {
                            _this.propietario = false;
                        }
                        console.log(_this.acreedor);
                        _this.acreedorEncontrado = 1;
                        _this.listaAcreedoresVehiculo = true;
                    }
                    else {
                        _this.acreedorEncontrado = 3;
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
            else {
                _this.ciudadanoEncontrado = 3;
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
    NewRnrsTramiteLevantamientoAlertaPrendaComponent.prototype.onKeyApoderado = function () {
        var _this = this;
        var token = this._loginService.getToken();
        var identificacion = {
            'numeroIdentificacion': this.identificacionAcreedor,
        };
        this._CiudadanoService.searchByIdentificacion(token, identificacion).subscribe(function (response) {
            _this.respuesta = response;
            if (_this.respuesta.status == 'success') {
                _this.acreedorSelected = _this.respuesta.data.empresa.id;
                _this.acreedorEncontrado = 2;
            }
            else {
                _this.acreedorEncontrado = 3;
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
    NewRnrsTramiteLevantamientoAlertaPrendaComponent.prototype.onKeyEmpresa = function () {
        var _this = this;
        var token = this._loginService.getToken();
        var nit = {
            'nit': this.nit,
        };
        this._EmpresaService.showNit(token, this.nit).subscribe(function (response) {
            _this.respuesta = response;
            if (_this.respuesta.status == 'success') {
                _this.empresa = _this.respuesta.data;
                // this.empresaEncontrada = 2;
                _this._VehiculoAcreedorService.showAcreedorEmpresa(token, _this.empresa).subscribe(function (response) {
                    _this.respuesta = response;
                    if (_this.respuesta.status == 'success') {
                        _this.acreedor = _this.respuesta.data;
                        _this.acreedorEncontrado = 2;
                        _this.enviarEncontrado = 5;
                        // if (this.acreedor.empresa) {
                        _this.datos.acreedoresVehiculo.push({
                            'identificacion': _this.acreedor.empresa.nit,
                            'nombre': _this.acreedor.empresa.nombre,
                            'tipoAlerta': _this.acreedor.cfgTipoAlerta.nombre,
                            'gradoAlerta': _this.acreedor.gradoAlerta,
                            'empresaId': _this.acreedor.empresa.id,
                        });
                        _this.datos.acreedoresEmpresas.push({
                            'identificacion': _this.acreedor.empresa.nit,
                            'nombre': _this.acreedor.empresa.nombre,
                            'tipoAlerta': _this.acreedor.cfgTipoAlerta.nombre,
                            'gradoAlerta': _this.acreedor.gradoAlerta,
                            'empresaId': _this.acreedor.empresa.id,
                        });
                        // }
                        if (_this.propietario) {
                            _this.propietario = false;
                        }
                        console.log(_this.acreedor);
                        _this.acreedorEncontrado = 1;
                        _this.listaAcreedoresVehiculo = true;
                    }
                    else {
                        _this.empresaEncontrada = 3;
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
            else {
                _this.empresaEncontrada = 3;
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
    NewRnrsTramiteLevantamientoAlertaPrendaComponent.prototype.goEmpresa = function () {
        this.router.navigate(['/dashboard/empresa']);
    };
    NewRnrsTramiteLevantamientoAlertaPrendaComponent.prototype.btnCancelarAcreedor = function () {
        this.acreedorEncontrado = 1;
    };
    NewRnrsTramiteLevantamientoAlertaPrendaComponent.prototype.btnNewCiudadano = function () {
        this.datos.acreedoresCiudadanos.push({
            'identificacion': this.ciudadano.identificacion,
            'nombre': this.ciudadano.primerNombre + " " + this.ciudadano.segundoNombre
        });
        if (this.propietario) {
            this.propietario = false;
        }
        console.log(this.datos.acreedoresCiudadanos);
        this.ciudadanoEncontrado = 1;
        this.listaAcreedoresCiudadanos = true;
    };
    NewRnrsTramiteLevantamientoAlertaPrendaComponent.prototype.btnNewEmpresa = function () {
        this.datos.acreedoresEmpresas.push({
            'nit': this.empresa.nit,
            'nombre': this.empresa.nombre,
        });
        if (this.propietario) {
            this.propietario = false;
        }
        this.empresaEncontrada = 1;
        this.listaAcreedoresEmpresas = true;
    };
    NewRnrsTramiteLevantamientoAlertaPrendaComponent.prototype.btnCancelarCiudadano = function () {
        this.ciudadanoEncontrado = 1;
    };
    NewRnrsTramiteLevantamientoAlertaPrendaComponent.prototype.btnCancelarEmpresa = function () {
        this.empresaEncontrada = 1;
    };
    NewRnrsTramiteLevantamientoAlertaPrendaComponent.prototype.btnNewAcreedor = function () {
        var _this = this;
        if (this.acreedor == 'ciudadano') {
            this.datos.acreedoresCiudadanos = this.datos.acreedoresCiudadanos.filter(function (h) { return h !== _this.ciudadanoSelected[0]; });
            this.datos.acreedoresCiudadanos.push({
                'identificacion': this.ciudadanoSelected[0].identificacion,
                'nombre': this.ciudadanoSelected[0].nombre,
                // 'permisoTramite': this.ciudadanoSelected[0].permisoTramite,
                'identificacionAcreedor': this.acreedorSelected.identificacion,
            });
            this.acreedor = 'false';
            this.tipoIdentificacionSelected = [this.tipoIdentificacionSelected];
            this.listaAcreedoresCiudadanos = true;
        }
        if (this.acreedor == 'empresa') {
            this.datos.acreedoresEmpresas = this.datos.acreedoresEmpresas.filter(function (h) { return h !== _this.empresaSelected[0]; });
            this.datos.acreedoresEmpresas.push({
                'nit': this.empresaSelected[0].nit,
                'nombre': this.empresaSelected[0].nombre,
                'permisoTramite': this.empresaSelected[0].permisoTramite,
                'identificacionAcreedor': this.acreedorSelected.identificacion,
                'nombreAcreedor': this.acreedorSelected.primerNombre + " " + this.acreedorSelected.segundoNombre,
            });
            this.acreedor = 'false';
            this.tipoIdentificacionSelected = [this.tipoIdentificacionSelected];
            this.listaAcreedoresEmpresas = true;
        }
    };
    NewRnrsTramiteLevantamientoAlertaPrendaComponent.prototype.changedtipoIdentificacion = function (e) {
        this.ciudadanoEncontrado = 1;
        this.empresaEncontrada = 1;
    };
    NewRnrsTramiteLevantamientoAlertaPrendaComponent.prototype.delete = function (acreedor) {
        this.datos.acreedoresCiudadanos = this.datos.acreedoresCiudadanos.filter(function (h) { return h !== acreedor; });
        if (this.datos.acreedoresCiudadanos.length === 0) {
            this.listaAcreedoresCiudadanos = false;
        }
    };
    NewRnrsTramiteLevantamientoAlertaPrendaComponent.prototype.deleteEmpresa = function (empresa) {
        this.datos.acreedoresEmpresas = this.datos.acreedoresEmpresas.filter(function (h) { return h !== empresa; });
        if (this.datos.acreedoresEmpresas.length === 0) {
            this.listaAcreedoresEmpresas = false;
        }
    };
    NewRnrsTramiteLevantamientoAlertaPrendaComponent.prototype.ready = function (isCreado) {
        if (isCreado) {
            console.log(isCreado);
            // this.onKeyCiudadano();
            this.acreedorNew = false;
        }
        else {
            this.acreedorNew = false;
            this.ciudadanoNew = false;
        }
    };
    return NewRnrsTramiteLevantamientoAlertaPrendaComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRnrsTramiteLevantamientoAlertaPrendaComponent.prototype, "readyTramite", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRnrsTramiteLevantamientoAlertaPrendaComponent.prototype, "cancelarTramite", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRnrsTramiteLevantamientoAlertaPrendaComponent.prototype, "vehiculo", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRnrsTramiteLevantamientoAlertaPrendaComponent.prototype, "banco", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRnrsTramiteLevantamientoAlertaPrendaComponent.prototype, "factura", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRnrsTramiteLevantamientoAlertaPrendaComponent.prototype, "tramitesFactura", void 0);
NewRnrsTramiteLevantamientoAlertaPrendaComponent = __decorate([
    core_1.Component({
        selector: 'appRnrs-levantamiento-alerta-prenda',
        templateUrl: './newRnrs.levantamientoAlertaPrenda.html'
    }),
    __metadata("design:paramtypes", [cfgTipoAlerta_service_1.CfgTipoAlertaService,
        tramiteSolicitud_service_1.TramiteSolicitudService,
        banco_service_1.BancoService,
        login_service_1.LoginService,
        tramiteFactura_service_1.TramiteFacturaService,
        vehiculo_service_1.VehiculoService,
        vehiculoAcreedor_service_1.VehiculoAcreedorService,
        tipoIdentificacion_service_1.TipoIdentificacionService,
        ciudadano_service_1.CiudadanoService,
        router_1.Router,
        empresa_service_1.EmpresaService])
], NewRnrsTramiteLevantamientoAlertaPrendaComponent);
exports.NewRnrsTramiteLevantamientoAlertaPrendaComponent = NewRnrsTramiteLevantamientoAlertaPrendaComponent;
//# sourceMappingURL=newRnrs.levantamientoAlertaPrenda.component.js.map