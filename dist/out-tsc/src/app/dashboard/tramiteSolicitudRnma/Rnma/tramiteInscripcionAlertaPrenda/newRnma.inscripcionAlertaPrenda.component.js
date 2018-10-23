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
var cfgEntidadJudicial_service_1 = require("../../../../services/cfgEntidadJudicial.service");
var NewRnmaTramiteInscripcionAlertaPrendaComponent = (function () {
    function NewRnmaTramiteInscripcionAlertaPrendaComponent(_CfgEntidadJudicialService, _CfgTipoAlertaService, _TramiteSolicitudService, _BancoService, _loginService, _tramiteFacturaService, _VehiculoService, _VehiculoAcreedorService, _tipoIdentificacionService, _CiudadanoService, router, _EmpresaService) {
        this._CfgEntidadJudicialService = _CfgEntidadJudicialService;
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
        this.empresaEncontrada = 1;
        this.tipoIdentificacionSelected = null;
        this.listaAcreedoresCiudadanos = false;
        this.listaAcreedoresEmpresas = false;
        this.ciudadanoNew = false;
        this.pignorado = false;
        this.acreedorNew = false;
        this.propietario = true;
        this.propietarioPresente = false;
        this.acreedor = 'false';
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
            'acreedoresEmpresas': [],
            'acreedoresCiudadanos': [],
            'tipoAlerta': [],
            'gradoAlerta': null,
            'tramiteFormulario': null,
            'facturaId': null,
            'vehiculoPlaca': null,
            'cfgEntidadJudicial': null
        };
        this.datos2 = {
            'vehiculoId': null,
            'bancoId': null,
        };
        this.tipoIdentificaciones = [];
    }
    NewRnmaTramiteInscripcionAlertaPrendaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._CfgEntidadJudicialService.getEntidadJudicialSelect().subscribe(function (response) {
            _this.cfgEntidadJudiciales = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
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
    NewRnmaTramiteInscripcionAlertaPrendaComponent.prototype.enviarTramite = function () {
        var _this = this;
        // this.datos.vehiculo = this.vehiculo.placa;
        //this.datos.banco = this.banco.nombre;
        var placaT = this.vehiculo.placa;
        this.datos.vehiculoPlaca = this.vehiculo.placa.numero;
        var token = this._loginService.getToken();
        this.datos.tipoAlerta = this.cfgTipoAlertaSelected;
        this.datos.gradoAlerta = this.gradoSelected;
        this.datos.facturaId = this.factura.id;
        this.datos.cfgEntidadJudicial = this.cfgEntidadJudicialSelected;
        this.datos.tramiteFormulario = 'rnma-inscripcionalertaprenda';
        this._VehiculoAcreedorService.register(this.datos, token).subscribe(function (response) {
            _this.respuesta = response;
            if (_this.respuesta.status == 'success') {
                // this.vehiculoAcreedor = this.respuesta.data;
                // this.ngOnInit();
                // this.datos.tipoAlerta = this.cfgTipoAlertaSelected;
                // this.datos.gradoAlerta = this.gradoSelected;
                // this.datos.tramiteFactura = 46;
                // this.readyTramite.emit({'foraneas':this.datos, 'resumen':this.resumen});
                // this.acreedorNew = false;
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
    NewRnmaTramiteInscripcionAlertaPrendaComponent.prototype.onCancelar = function () {
        this.cancelarTramite.emit(true);
    };
    // btnNewAcreedor() {
    //     let token = this._loginService.getToken();
    //     //this.acreedorNew = true;
    //     this.acreedores.push(
    //         {
    //             'id':this.banco.id,
    //             'nombre':this.banco.nombre
    //         }
    //     )
    // }
    NewRnmaTramiteInscripcionAlertaPrendaComponent.prototype.onKeyAcreedor = function () {
        var _this = this;
        var token = this._loginService.getToken();
        var nombreAcreedor = {
            'nombreAcreedor': this.nombreAcreedor,
        };
        this._BancoService.showAcreedorNombre(token, nombreAcreedor).subscribe(function (response) {
            _this.respuesta = response;
            if (_this.respuesta.status == 'success') {
                _this.banco = _this.respuesta.data;
                _this.acreedorEncontrado = 2;
                _this.acreedorNew = false;
                _this.datos2.bancoId = _this.banco.nombre;
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
    NewRnmaTramiteInscripcionAlertaPrendaComponent.prototype.onKeyCiudadano = function () {
        var _this = this;
        var token = this._loginService.getToken();
        var identificacion = {
            'numeroIdentificacion': this.identificacion,
        };
        this._CiudadanoService.searchByIdentificacion(token, identificacion).subscribe(function (response) {
            _this.respuesta = response;
            if (_this.respuesta.status == 'success') {
                _this.ciudadano = _this.respuesta.data;
                _this.ciudadanoEncontrado = 2;
                _this.ciudadanoNew = false;
            }
            else {
                _this.ciudadanoEncontrado = 3;
                _this.ciudadanoNew = true;
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
    NewRnmaTramiteInscripcionAlertaPrendaComponent.prototype.onKeyApoderado = function () {
        var _this = this;
        var token = this._loginService.getToken();
        var identificacion = {
            'numeroIdentificacion': this.identificacionAcreedor,
        };
        this._CiudadanoService.searchByIdentificacion(token, identificacion).subscribe(function (response) {
            _this.respuesta = response;
            if (_this.respuesta.status == 'success') {
                _this.acreedorSelected = _this.respuesta.data;
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
    NewRnmaTramiteInscripcionAlertaPrendaComponent.prototype.onKeyEmpresa = function () {
        var _this = this;
        var token = this._loginService.getToken();
        var nit = {
            'nit': this.nit,
        };
        this._EmpresaService.showNit(token, this.nit).subscribe(function (response) {
            _this.respuesta = response;
            if (_this.respuesta.status == 'success') {
                _this.empresa = _this.respuesta.data;
                _this.empresaEncontrada = 2;
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
    NewRnmaTramiteInscripcionAlertaPrendaComponent.prototype.goEmpresa = function () {
        this.router.navigate(['/dashboard/empresa']);
    };
    NewRnmaTramiteInscripcionAlertaPrendaComponent.prototype.btnCancelarAcreedor = function () {
        this.acreedorEncontrado = 1;
    };
    NewRnmaTramiteInscripcionAlertaPrendaComponent.prototype.btnNewCiudadano = function () {
        this.datos.acreedoresCiudadanos.push({
            'identificacion': this.ciudadano.identificacion,
            'nombre': this.ciudadano.primerNombre + " " + this.ciudadano.segundoNombre
        });
        if (this.propietario) {
            this.propietario = false;
        }
        this.ciudadanoEncontrado = 1;
        this.listaAcreedoresCiudadanos = true;
    };
    NewRnmaTramiteInscripcionAlertaPrendaComponent.prototype.btnNewEmpresa = function () {
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
    NewRnmaTramiteInscripcionAlertaPrendaComponent.prototype.btnNewAcreedor = function () {
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
    NewRnmaTramiteInscripcionAlertaPrendaComponent.prototype.changedtipoIdentificacion = function (e) {
        this.ciudadanoEncontrado = 1;
        this.empresaEncontrada = 1;
    };
    NewRnmaTramiteInscripcionAlertaPrendaComponent.prototype.delete = function (acreedor) {
        this.datos.acreedoresCiudadanos = this.datos.acreedoresCiudadanos.filter(function (h) { return h !== acreedor; });
        if (this.datos.acreedoresCiudadanos.length === 0) {
            this.listaAcreedoresCiudadanos = false;
        }
    };
    NewRnmaTramiteInscripcionAlertaPrendaComponent.prototype.deleteEmpresa = function (empresa) {
        this.datos.acreedoresEmpresas = this.datos.acreedoresEmpresas.filter(function (h) { return h !== empresa; });
        if (this.datos.acreedoresEmpresas.length === 0) {
            this.listaAcreedoresEmpresas = false;
        }
    };
    NewRnmaTramiteInscripcionAlertaPrendaComponent.prototype.ready = function (isCreado) {
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
    NewRnmaTramiteInscripcionAlertaPrendaComponent.prototype.btnCancelarCiudadano = function () {
        this.ciudadanoEncontrado = 1;
    };
    NewRnmaTramiteInscripcionAlertaPrendaComponent.prototype.btnCancelarEmpresa = function () {
        this.empresaEncontrada = 1;
    };
    return NewRnmaTramiteInscripcionAlertaPrendaComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRnmaTramiteInscripcionAlertaPrendaComponent.prototype, "readyTramite", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRnmaTramiteInscripcionAlertaPrendaComponent.prototype, "cancelarTramite", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRnmaTramiteInscripcionAlertaPrendaComponent.prototype, "vehiculo", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRnmaTramiteInscripcionAlertaPrendaComponent.prototype, "banco", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRnmaTramiteInscripcionAlertaPrendaComponent.prototype, "factura", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRnmaTramiteInscripcionAlertaPrendaComponent.prototype, "tramitesFactura", void 0);
NewRnmaTramiteInscripcionAlertaPrendaComponent = __decorate([
    core_1.Component({
        selector: 'appRnma-inscripcion-alerta-prenda',
        templateUrl: './newRnma.inscripcionAlertaPrenda.html'
    }),
    __metadata("design:paramtypes", [cfgEntidadJudicial_service_1.CfgEntidadJudicialService,
        cfgTipoAlerta_service_1.CfgTipoAlertaService,
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
], NewRnmaTramiteInscripcionAlertaPrendaComponent);
exports.NewRnmaTramiteInscripcionAlertaPrendaComponent = NewRnmaTramiteInscripcionAlertaPrendaComponent;
//# sourceMappingURL=newRnma.inscripcionAlertaPrenda.component.js.map