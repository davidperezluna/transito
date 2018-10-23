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
var empresa_modelo_1 = require("../empresa.modelo");
var empresa_service_1 = require("../../../services/empresa.service");
var login_service_1 = require("../../../services/login.service");
var municipio_service_1 = require("../../../services/municipio.service");
var tipoEmpresa_service_1 = require("../../../services/tipoEmpresa.service");
var ciudadano_service_1 = require("../../../services/ciudadano.service");
var tipoSociedad_service_1 = require("../../../services/tipoSociedad.service");
var tipoIdentificacion_service_1 = require("../../../services/tipoIdentificacion.service");
var cfgEmpresaServicio_service_1 = require("../../../services/cfgEmpresaServicio.service");
var sweetalert2_1 = require("sweetalert2");
var NewEmpresaComponent = (function () {
    // los que vienen desde el base de datos
    function NewEmpresaComponent(_EmpresaService, _loginService, _municipioService, _tipoEmpresaService, _tipoSociedadService, _tipoIdentificacionService, _ciudadanoService, _CfgEmpresaServicio) {
        this._EmpresaService = _EmpresaService;
        this._loginService = _loginService;
        this._municipioService = _municipioService;
        this._tipoEmpresaService = _tipoEmpresaService;
        this._tipoSociedadService = _tipoSociedadService;
        this._tipoIdentificacionService = _tipoIdentificacionService;
        this._ciudadanoService = _ciudadanoService;
        this._CfgEmpresaServicio = _CfgEmpresaServicio;
        this.ready = new core_1.EventEmitter();
        this.btnVisible = false;
        this.formNewSucursal = false;
        this.formIndexSucursal = true;
        this.tablaSucursal = false;
        this.sucursales = [];
    }
    NewEmpresaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.empresa = new empresa_modelo_1.Empresa(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
        this._tipoEmpresaService.getTipoEmpresaSelect().subscribe(function (response) {
            _this.tipoEmpresas = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
        this._tipoSociedadService.getTipoSociedadSelect().subscribe(function (response) {
            _this.tiposSociedad = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
        this._CfgEmpresaServicio.select().subscribe(function (response) {
            _this.servicios = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
        this._tipoIdentificacionService.getTipoIdentificacionSelect().subscribe(function (response) {
            _this.tiposIdentificacion = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
        this._ciudadanoService.getCiudadanoSelect().subscribe(function (response) {
            _this.ciudadanos = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
        this._municipioService.getMunicipioSelect().subscribe(function (response) {
            _this.municipios = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
        this._tipoEmpresaService.getTipoEmpresaSelect().subscribe(function (response) {
            _this.tiposEmpresa = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
    };
    NewEmpresaComponent.prototype.onCancelar = function () {
        this.ready.emit(true);
    };
    // enviar a guarda
    NewEmpresaComponent.prototype.onEnviar = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this.empresa.municipioId = this.municipioSelected;
        this.empresa.tipoSociedadId = this.tipoSociedadSelected;
        this.empresa.tipoIdentificacionId = this.tipoIdentificacionSelected;
        this.empresa.ciudadanoId = this.ciudadanoSelected;
        this.empresa.cfgEmpresaServicioId = this.servicioSelected;
        this.empresa.cfgEmpresaServicioId = this.servicioSelected;
        var datos = {
            'empresa': this.empresa,
            'sucursales': this.sucursales
        };
        this._EmpresaService.register(datos, token).subscribe(function (response) {
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
                    text: 'El empresa ya se encuentra registrado',
                    type: 'error',
                    confirmButtonText: 'Aceptar'
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
    };
    NewEmpresaComponent.prototype.readySucursal = function (sucursal) {
        this.sucursales.push({
            'nombre': sucursal.nombre,
            'sigla': sucursal.sigla,
            'celular': sucursal.celular,
            'direccion': sucursal.direccion,
            'telefono': sucursal.telefono,
            'correo': sucursal.correo,
            'fax': sucursal.fax,
            'municipioId': sucursal.municipioId,
        });
        this.tablaSucursal = true;
        this.formNewSucursal = false;
        console.log(this.sucursales);
    };
    NewEmpresaComponent.prototype.onNewSucursal = function () {
        this.formNewSucursal = true;
        this.btnVisible = true;
        // this.formIndexSucursal = false;
        // this.table.destroy();
    };
    NewEmpresaComponent.prototype.cancelarNewFormulario = function () {
        this.btnVisible = false;
        this.formNewSucursal = false;
    };
    NewEmpresaComponent.prototype.deleteSucursal = function (sucursal) {
        this.sucursales = this.sucursales.filter(function (h) { return h !== sucursal; });
        if (this.sucursales.length === 0) {
            this.tablaSucursal = false;
        }
    };
    return NewEmpresaComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewEmpresaComponent.prototype, "ready", void 0);
NewEmpresaComponent = __decorate([
    core_1.Component({
        selector: 'app-new-empresa',
        templateUrl: './new.component.html'
    }),
    __metadata("design:paramtypes", [empresa_service_1.EmpresaService,
        login_service_1.LoginService,
        municipio_service_1.MunicipioService,
        tipoEmpresa_service_1.TipoEmpresaService,
        tipoSociedad_service_1.TipoSociedadService,
        tipoIdentificacion_service_1.TipoIdentificacionService,
        ciudadano_service_1.CiudadanoService,
        cfgEmpresaServicio_service_1.CfgEmpresaServicioService])
], NewEmpresaComponent);
exports.NewEmpresaComponent = NewEmpresaComponent;
//# sourceMappingURL=new.component.js.map