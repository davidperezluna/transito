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
var ciudadano_modelo_1 = require("../ciudadano.modelo");
var ciudadano_service_1 = require("../../../services/ciudadano.service");
var login_service_1 = require("../../../services/login.service");
var tipoIdentificacion_service_1 = require("../../../services/tipoIdentificacion.service");
var genero_service_1 = require("../../../services/genero.service");
var grupoSanguineo_service_1 = require("../../../services/grupoSanguineo.service");
var municipio_service_1 = require("../../../services/municipio.service");
var pais_service_1 = require("../../../services/pais.service");
var departamento_service_1 = require("../../../services/departamento.service");
var sweetalert2_1 = require("sweetalert2");
var NewCiudadanoComponent = (function () {
    function NewCiudadanoComponent(_CiudadanoService, _loginService, _tipoIdentificacionService, _generoService, _grupoSanguineoService, _municipioService, _paisService, _departamentoService) {
        this._CiudadanoService = _CiudadanoService;
        this._loginService = _loginService;
        this._tipoIdentificacionService = _tipoIdentificacionService;
        this._generoService = _generoService;
        this._grupoSanguineoService = _grupoSanguineoService;
        this._municipioService = _municipioService;
        this._paisService = _paisService;
        this._departamentoService = _departamentoService;
        this.ready = new core_1.EventEmitter();
        this.identificacion = null;
        this.tipoIdentificacion = null;
        this.isExist = false;
        this.tipoId = true;
    }
    NewCiudadanoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ciudadano = new ciudadano_modelo_1.Ciudadano(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
        this._tipoIdentificacionService.getTipoIdentificacionSelect().subscribe(function (response) {
            _this.tiposIdentificacion = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
        this._generoService.getGeneroSelect().subscribe(function (response) {
            _this.generos = response;
            console.log(_this.generos);
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
        this._paisService.select().subscribe(function (response) {
            _this.paises = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
        this._grupoSanguineoService.getGrupoSanguineoSelect().subscribe(function (response) {
            _this.gruposSanguineos = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
    };
    NewCiudadanoComponent.prototype.onCancelar = function () {
        this.ready.emit(true);
    };
    NewCiudadanoComponent.prototype.onEnviar = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this.ciudadano.tipoIdentificacionUsuarioId = this.tipoIdentificacionSelected;
        this.ciudadano.generoId = this.generoSelected;
        this.ciudadano.grupoSanguineoId = this.grupoSanguineoSelected;
        this.ciudadano.municipioNacimientoId = this.municipioNacimientoSelected;
        this.ciudadano.municipioResidenciaId = this.municipioResidenciaSelected;
        var html = 'Se va a registrar el usuario:<br>' +
            'Primer Nombre: <b>' + this.ciudadano.primerNombreUsuario + '</b><br>' +
            'Tipo Identificacion: <b>' + this.ciudadano.tipoIdentificacionUsuarioId + '</b><br>' +
            'Identificacion: <b>' + this.ciudadano.numeroIdentificacionUsuario + '</b><br>' +
            'Genero: <b>' + this.ciudadano.generoId + '</b><br>' +
            'Grupo Sanguineo: <b>' + this.ciudadano.grupoSanguineoId + '</b><br>' +
            'Direccion: <b>' + this.ciudadano.direccion + '</b><br>' +
            'Telefono: <b>' + this.ciudadano.telefonoUsuario + '</b><br>';
        sweetalert2_1.default({
            title: 'Creacion de persona natural',
            type: 'warning',
            html: html,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: '<i class="fa fa-thumbs-up"></i> Crear!',
            confirmButtonAriaLabel: 'Thumbs up, great!',
            cancelButtonText: '<i class="fa fa-thumbs-down"></i> No crear',
            cancelButtonAriaLabel: 'Thumbs down',
        }).then(function (result) {
            if (result.value) {
                _this._CiudadanoService.register(_this.ciudadano, token).subscribe(function (response) {
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
                            text: 'El ciudadano ya se encuentra registrado',
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
            }
            else if (
            // Read more about handling dismissals
            result.dismiss === sweetalert2_1.default.DismissReason.cancel) {
            }
        });
    };
    NewCiudadanoComponent.prototype.changedPaisNacimiento = function (id) {
        var _this = this;
        if (id) {
            this.paisNacimientoSelected = id;
            this._departamentoService.getDepartamentoPorPaisSelect(this.paisNacimientoSelected).subscribe(function (response) {
                _this.departamentosNacimiento = response;
                console.log(_this.departamentosNacimiento);
            }, function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert('Error en la petición');
                }
            });
        }
    };
    NewCiudadanoComponent.prototype.changedDepartamentoNacimiento = function (id) {
        var _this = this;
        if (id) {
            this._municipioService.getMunicipioPorDepartamentoSelect(this.departamentoNacimientoSelected).subscribe(function (response) {
                _this.municipiosNacimiento = response;
                console.log(_this.municipiosNacimiento);
            }, function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert('Error en la petición');
                }
            });
        }
    };
    NewCiudadanoComponent.prototype.changedPaisResidencia = function (id) {
        var _this = this;
        if (id) {
            this._departamentoService.getDepartamentoPorPaisSelect(this.paisResidenciaSelected).subscribe(function (response) {
                _this.departamentosResidencia = response;
                console.log(_this.departamentosResidencia);
            }, function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert('Error en la petición');
                }
            });
        }
    };
    NewCiudadanoComponent.prototype.changedDepartamentoResidencia = function (id) {
        var _this = this;
        if (id) {
            this._municipioService.getMunicipioPorDepartamentoSelect(this.departamentoResidenciaSelected).subscribe(function (response) {
                _this.municipiosResidencia = response;
                console.log(_this.municipiosResidencia);
            }, function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert('Error en la petición');
                }
            });
        }
    };
    NewCiudadanoComponent.prototype.isCiudadano = function () {
        var _this = this;
        console.log(this.tipoIdentificacionSelected);
        var token = this._loginService.getToken();
        var datos = {
            'identificacion': this.ciudadano.numeroIdentificacionUsuario,
            'tipoIdentificacion': this.tipoIdentificacionSelected,
        };
        this._CiudadanoService.isCiudadano(datos, token).subscribe(function (response) {
            _this.respuesta = response;
            if (_this.respuesta.status == 'error') {
                //identificacion encontrada
                _this.isError = true;
                _this.isExist = false;
            }
            else {
                _this.isExist = true;
                _this.isError = false;
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
    NewCiudadanoComponent.prototype.changedTipoId = function (event) {
        this.tipoId = false;
    };
    return NewCiudadanoComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewCiudadanoComponent.prototype, "ready", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewCiudadanoComponent.prototype, "identificacion", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewCiudadanoComponent.prototype, "tipoIdentificacion", void 0);
NewCiudadanoComponent = __decorate([
    core_1.Component({
        selector: 'app-new-ciudadano',
        templateUrl: './new.component.html'
    }),
    __metadata("design:paramtypes", [ciudadano_service_1.CiudadanoService,
        login_service_1.LoginService,
        tipoIdentificacion_service_1.TipoIdentificacionService,
        genero_service_1.GeneroService,
        grupoSanguineo_service_1.GrupoSanguineoService,
        municipio_service_1.MunicipioService,
        pais_service_1.PaisService,
        departamento_service_1.DepartamentoService])
], NewCiudadanoComponent);
exports.NewCiudadanoComponent = NewCiudadanoComponent;
//# sourceMappingURL=new.component.js.map