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
var empresa_service_1 = require("../../../services/empresa.service");
var login_service_1 = require("../../../services/login.service");
var municipio_service_1 = require("../../../services/municipio.service");
var tipoEmpresa_service_1 = require("../../../services/tipoEmpresa.service");
var ciudadano_service_1 = require("../../../services/ciudadano.service");
// import { UsuarioService } from '../../../services/usuario.service';
var tipoSociedad_service_1 = require("../../../services/tipoSociedad.service");
var tipoIdentificacion_service_1 = require("../../../services/tipoIdentificacion.service");
var representanteEmpresa_service_1 = require("../../../services/representanteEmpresa.service");
var cfgEmpresaServicio_service_1 = require("../../../services/cfgEmpresaServicio.service");
var sweetalert2_1 = require("sweetalert2");
var EditComponent = (function () {
    function EditComponent(_empresaService, _loginService, _municipioService, _tipoEmpresaService, _tipoSociedadService, _ciudadanoService, _tipoIdentificacionService, _representanteEmpresaService, _CfgEmpresaServicio) {
        this._empresaService = _empresaService;
        this._loginService = _loginService;
        this._municipioService = _municipioService;
        this._tipoEmpresaService = _tipoEmpresaService;
        this._tipoSociedadService = _tipoSociedadService;
        this._ciudadanoService = _ciudadanoService;
        this._tipoIdentificacionService = _tipoIdentificacionService;
        this._representanteEmpresaService = _representanteEmpresaService;
        this._CfgEmpresaServicio = _CfgEmpresaServicio;
        this.ready = new core_1.EventEmitter();
        this.empresa = null;
        this.formReady = false;
        this.formListaRepresentanteVigente = false;
        this.formListaRepresentantes = false;
        this.formNewRepresentante = true;
    }
    EditComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log(this.empresa);
        sweetalert2_1.default({
            title: 'Cargando Formulario!',
            text: 'Solo tardara unos segundos por favor espere.',
            timer: 2000,
            onOpen: function () {
                sweetalert2_1.default.showLoading();
            }
        }).then(function (result) {
            if (
            // Read more about handling dismissals
            result.dismiss === sweetalert2_1.default.DismissReason.timer) {
            }
        });
        this._tipoEmpresaService.getTipoEmpresaSelect().subscribe(function (response) {
            _this.tipoEmpresas = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
        var token = this._loginService.getToken();
        this._representanteEmpresaService.showRepresentanteEmpresa(this.empresa.id, token).subscribe(function (response) {
            if (response.status == "success") {
                _this.representanteVigente = response.representanteVigente;
                _this.representantes = response.representantes;
                _this.formListaRepresentanteVigente = true;
                // console.log(this.representantes);
                if (_this.representantes.length != 0) {
                    _this.formListaRepresentantes = true;
                }
            }
            else {
                _this.formListaRepresentanteVigente = false;
                _this.formNewRepresentante = true;
            }
        });
        this._CfgEmpresaServicio.select().subscribe(function (response) {
            _this.servicios = response;
            setTimeout(function () {
                _this.servicioSelected = [_this.empresa.cfgEmpresaServicio.id];
            });
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
        this._municipioService.getMunicipioSelect().subscribe(function (response) {
            _this.municipios = response;
            setTimeout(function () {
                _this.municipioSelected = [_this.empresa.municipio.id];
            });
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._tipoSociedadService.getTipoSociedadSelect().subscribe(function (response) {
            _this.tiposSociedad = response;
            setTimeout(function () {
                _this.tipoSociedadSelected = [_this.empresa.tipoSociedad.id];
                _this.formReady = true;
            });
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._tipoIdentificacionService.getTipoIdentificacionSelect().subscribe(function (response) {
            _this.tiposIdentificacion = response;
            setTimeout(function () {
                _this.tipoIdentificacionSelected = [_this.empresa.tipoIdentificacion.id];
                _this.formReady = true;
            });
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._ciudadanoService.getCiudadanoSelect().subscribe(function (response) {
            _this.ciudadanos = response;
            setTimeout(function () {
                _this.ciudadanoSelected = [_this.empresa.ciudadano.id];
                _this.formReady = true;
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
        var token = this._loginService.getToken();
        this.empresa.municipioId = this.municipioSelected;
        this.empresa.tipoSociedadId = this.tipoSociedadSelected;
        this.empresa.tipoIdentificacionId = this.tipoIdentificacionSelected;
        this.empresa.ciudadanoId = this.ciudadanoSelected;
        this.empresa.cfgEmpresaServicioId = this.servicioSelected;
        console.log(this.empresa);
        this._empresaService.editEmpresa(this.empresa, token).subscribe(function (response) {
            _this.respuesta = response;
            console.log(_this.respuesta);
            if (_this.respuesta.status == 'success') {
                sweetalert2_1.default({
                    title: 'Perfecto!',
                    text: 'El registro se ha modificado con exito',
                    type: 'success',
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
    EditComponent.prototype.nuevoRepresentante = function () {
        var _this = this;
        var token = this._loginService.getToken();
        var datos = {
            'empresa': this.empresa,
            'ciudadanoId': this.ciudadanoSelected,
            'fechaFinal': this.empresa.fechaFinal,
        };
        this._representanteEmpresaService.register(datos, token).subscribe(function (response) {
            _this.respuesta = response;
            console.log(_this.respuesta);
            if (_this.respuesta.status == 'success') {
                _this.ngOnInit();
                sweetalert2_1.default({
                    title: 'Perfecto!',
                    text: 'El registro se ha modificado con exito',
                    type: 'success',
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
    return EditComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], EditComponent.prototype, "ready", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], EditComponent.prototype, "empresa", void 0);
EditComponent = __decorate([
    core_1.Component({
        selector: 'app-edit',
        templateUrl: './edit.component.html'
    }),
    __metadata("design:paramtypes", [empresa_service_1.EmpresaService,
        login_service_1.LoginService,
        municipio_service_1.MunicipioService,
        tipoEmpresa_service_1.TipoEmpresaService,
        tipoSociedad_service_1.TipoSociedadService,
        ciudadano_service_1.CiudadanoService,
        tipoIdentificacion_service_1.TipoIdentificacionService,
        representanteEmpresa_service_1.RepresentanteEmpresaService,
        cfgEmpresaServicio_service_1.CfgEmpresaServicioService])
], EditComponent);
exports.EditComponent = EditComponent;
//# sourceMappingURL=edit.component.js.map