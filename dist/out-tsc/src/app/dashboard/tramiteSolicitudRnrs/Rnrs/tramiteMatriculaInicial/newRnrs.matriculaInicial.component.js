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
var ciudadanoVehiculo_service_1 = require("../../../../services/ciudadanoVehiculo.service");
var tramiteFactura_service_1 = require("../../../../services/tramiteFactura.service");
var login_service_1 = require("../../../../services/login.service");
var color_service_1 = require("../../../../services/color.service");
var vehiculo_service_1 = require("../../../../services/vehiculo.service");
var ciudadano_service_1 = require("../../../../services/ciudadano.service");
var router_1 = require("@angular/router");
var empresa_service_1 = require("../../../../services/empresa.service");
var tipoIdentificacion_service_1 = require("../../../../services/tipoIdentificacion.service");
var NewRnrsMatricualaInicialComponent = (function () {
    function NewRnrsMatricualaInicialComponent(_ColorService, _TramiteSolicitudService, _loginService, _tramiteFacturaService, _VehiculoService, _tipoIdentificacionService, _CiudadanoService, _CiudadanoVehiculoService, router, _EmpresaService) {
        this._ColorService = _ColorService;
        this._TramiteSolicitudService = _TramiteSolicitudService;
        this._loginService = _loginService;
        this._tramiteFacturaService = _tramiteFacturaService;
        this._VehiculoService = _VehiculoService;
        this._tipoIdentificacionService = _tipoIdentificacionService;
        this._CiudadanoService = _CiudadanoService;
        this._CiudadanoVehiculoService = _CiudadanoVehiculoService;
        this.router = router;
        this._EmpresaService = _EmpresaService;
        this.readyTramite = new core_1.EventEmitter();
        this.cancelarTramite = new core_1.EventEmitter();
        this.vehiculo = null;
        this.factura = null;
        this.ciudadanoEncontrado = 1;
        this.apoderadoEncontrado = 1;
        this.empresaEncontrada = 1;
        this.tipoIdentificacionSelected = null;
        this.listaPropietariosCiudadanos = false;
        this.listaPropietariosEmpresas = false;
        this.ciudadanoNew = false;
        this.propietario = true;
        this.propietarioPresente = false;
        this.apoderado = 'false';
        this.tipoPropiedades = [
            { 'value': 1, 'label': "Leasing" },
            { 'value': 2, 'label': "Propio" }
        ];
        this.tipoIdentificaciones = [];
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
    NewRnrsMatricualaInicialComponent.prototype.ngOnInit = function () {
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
    };
    NewRnrsMatricualaInicialComponent.prototype.enviarTramite = function () {
        var _this = this;
        this.datos.vehiculo = this.vehiculo.placa;
        this.datos.numeroLicencia = this.factura.numeroLicenciaTrancito;
        var token = this._loginService.getToken();
        this._CiudadanoVehiculoService.register(token, this.datos, this.tipoPropiedadSelected).subscribe(function (response) {
            _this.datos.facturaId = _this.factura.id;
            _this.datos.tramiteFormulario = 'rnrs-matriculainicial';
            _this.readyTramite.emit({ 'foraneas': _this.datos, 'resumen': _this.resumen });
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
    };
    NewRnrsMatricualaInicialComponent.prototype.onCancelar = function () {
        this.cancelarTramite.emit(true);
    };
    NewRnrsMatricualaInicialComponent.prototype.onKeyCiudadano = function () {
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
    NewRnrsMatricualaInicialComponent.prototype.onKeyApoderado = function () {
        var _this = this;
        var token = this._loginService.getToken();
        var identificacion = {
            'numeroIdentificacion': this.identificacionApoderado,
        };
        this._CiudadanoService.searchByIdentificacion(token, identificacion).subscribe(function (response) {
            _this.respuesta = response;
            if (_this.respuesta.status == 'success') {
                _this.apoderadoSelected = _this.respuesta.data;
                _this.apoderadoEncontrado = 2;
            }
            else {
                _this.apoderadoEncontrado = 3;
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
    NewRnrsMatricualaInicialComponent.prototype.onKeyEmpresa = function () {
        var _this = this;
        var token = this._loginService.getToken();
        var nit = {
            'nit': this.nit,
        };
        this._EmpresaService.showNit(token, nit).subscribe(function (response) {
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
    NewRnrsMatricualaInicialComponent.prototype.goEmpresa = function () {
        this.router.navigate(['/dashboard/empresa']);
    };
    NewRnrsMatricualaInicialComponent.prototype.btnNewCiudadano = function () {
        if (this.tipoPropiedadSelected == 2) {
            this.datos.propietariosCiudadanos.push({ 'identificacion': this.ciudadano.identificacion,
                'nombre': this.ciudadano.primerNombre + " " + this.ciudadano.segundoNombre,
                'permisoTramite': this.datos.solidario,
                'propietarioPresente': this.propietarioPresente
            });
        }
        else {
            this.datos.propietariosCiudadanos.push({ 'identificacion': this.ciudadano.identificacion,
                'nombre': this.ciudadano.primerNombre + " " + this.ciudadano.segundoNombre,
                'permisoTramite': this.propietario
            });
            if (this.propietario) {
                this.propietario = false;
            }
        }
        console.log(this.datos.propietariosCiudadanos);
        this.ciudadanoEncontrado = 1;
        this.listaPropietariosCiudadanos = true;
    };
    NewRnrsMatricualaInicialComponent.prototype.btnNewEmpresa = function () {
        if (this.tipoPropiedadSelected == 2) {
            this.datos.propietariosEmpresas.push({ 'nit': this.empresa.nit,
                'nombre': this.empresa.nombre,
                'permisoTramite': this.datos.solidario,
                'propietarioPresente': this.propietarioPresente
            });
        }
        else {
            this.datos.propietariosEmpresas.push({ 'nit': this.empresa.nit,
                'nombre': this.empresa.nombre,
                'permisoTramite': this.propietario
            });
            if (this.propietario) {
                this.propietario = false;
            }
        }
        this.empresaEncontrada = 1;
        this.listaPropietariosEmpresas = true;
    };
    NewRnrsMatricualaInicialComponent.prototype.btnNewApoderado = function () {
        var _this = this;
        if (this.apoderado == 'ciudadano') {
            this.datos.propietariosCiudadanos = this.datos.propietariosCiudadanos.filter(function (h) { return h !== _this.ciudadanoSelected[0]; });
            this.datos.propietariosCiudadanos.push({ 'identificacion': this.ciudadanoSelected[0].identificacion,
                'nombre': this.ciudadanoSelected[0].nombre,
                'permisoTramite': this.ciudadanoSelected[0].permisoTramite,
                'propietarioPresente': this.ciudadanoSelected[0].propietarioPresente,
                'identificacionApoderado': this.apoderadoSelected.identificacion,
                'nombreApoderado': this.apoderadoSelected.primerNombre + " " + this.apoderadoSelected.segundoNombre,
            });
            this.apoderado = 'false';
            this.tipoIdentificacionSelected = [this.tipoIdentificacionSelected];
            this.listaPropietariosCiudadanos = true;
        }
        if (this.apoderado == 'empresa') {
            this.datos.propietariosEmpresas = this.datos.propietariosEmpresas.filter(function (h) { return h !== _this.empresaSelected[0]; });
            this.datos.propietariosEmpresas.push({ 'nit': this.empresaSelected[0].nit,
                'nombre': this.empresaSelected[0].nombre,
                'permisoTramite': this.empresaSelected[0].permisoTramite,
                'identificacionApoderado': this.apoderadoSelected.identificacion,
                'nombreApoderado': this.apoderadoSelected.primerNombre + " " + this.apoderadoSelected.segundoNombre,
            });
            this.apoderado = 'false';
            this.tipoIdentificacionSelected = [this.tipoIdentificacionSelected];
            this.listaPropietariosEmpresas = true;
        }
    };
    NewRnrsMatricualaInicialComponent.prototype.changedtipoIdentificacion = function (e) {
        this.ciudadanoEncontrado = 1;
        this.empresaEncontrada = 1;
    };
    NewRnrsMatricualaInicialComponent.prototype.btnCancelarCiudadano = function () {
        this.ciudadanoEncontrado = 1;
    };
    NewRnrsMatricualaInicialComponent.prototype.btnCancelarEmpresa = function () {
        this.empresaEncontrada = 1;
    };
    NewRnrsMatricualaInicialComponent.prototype.delete = function (ciudadano) {
        this.datos.propietariosCiudadanos = this.datos.propietariosCiudadanos.filter(function (h) { return h !== ciudadano; });
        if (this.datos.propietariosCiudadanos.length === 0) {
            this.listaPropietariosCiudadanos = false;
        }
        if (ciudadano.permisoTramite) {
            this.propietario = true;
        }
    };
    NewRnrsMatricualaInicialComponent.prototype.deleteEmpresa = function (empresa) {
        this.datos.propietariosEmpresas = this.datos.propietariosEmpresas.filter(function (h) { return h !== empresa; });
        if (this.datos.propietariosEmpresas.length === 0) {
            this.listaPropietariosEmpresas = false;
        }
        if (empresa.permisoTramite) {
            this.propietario = true;
        }
    };
    NewRnrsMatricualaInicialComponent.prototype.ready = function (isCreado) {
        if (isCreado) {
            console.log(isCreado);
            this.onKeyCiudadano();
        }
        else {
            this.ciudadanoNew = false;
        }
    };
    NewRnrsMatricualaInicialComponent.prototype.agregarApoderadoCiudadano = function (ciudadano) {
        this.apoderado = 'ciudadano';
        this.ciudadanoSelected = this.datos.propietariosCiudadanos.filter(function (h) { return h == ciudadano; });
        console.log(this.ciudadanoSelected[0]);
    };
    NewRnrsMatricualaInicialComponent.prototype.agregarApoderadoEmpresa = function (empresa) {
        this.apoderado = 'empresa';
        this.empresaSelected = this.datos.propietariosEmpresas.filter(function (h) { return h == empresa; });
        console.log(this.empresaSelected[0]);
    };
    NewRnrsMatricualaInicialComponent.prototype.onCancelarApoderado = function () {
        this.apoderado = 'false';
        this.tipoIdentificacionSelected = [this.tipoIdentificacionSelected];
        console.log(this.tipoIdentificacionSelected);
    };
    return NewRnrsMatricualaInicialComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRnrsMatricualaInicialComponent.prototype, "readyTramite", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRnrsMatricualaInicialComponent.prototype, "cancelarTramite", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRnrsMatricualaInicialComponent.prototype, "vehiculo", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRnrsMatricualaInicialComponent.prototype, "factura", void 0);
NewRnrsMatricualaInicialComponent = __decorate([
    core_1.Component({
        selector: 'appRnrs-matricula-inicial',
        templateUrl: './newRnrs.matriculaInicial.html',
    }),
    __metadata("design:paramtypes", [color_service_1.ColorService,
        tramiteSolicitud_service_1.TramiteSolicitudService,
        login_service_1.LoginService,
        tramiteFactura_service_1.TramiteFacturaService,
        vehiculo_service_1.VehiculoService,
        tipoIdentificacion_service_1.TipoIdentificacionService,
        ciudadano_service_1.CiudadanoService,
        ciudadanoVehiculo_service_1.CiudadanoVehiculoService,
        router_1.Router,
        empresa_service_1.EmpresaService])
], NewRnrsMatricualaInicialComponent);
exports.NewRnrsMatricualaInicialComponent = NewRnrsMatricualaInicialComponent;
//# sourceMappingURL=newRnrs.matriculaInicial.component.js.map