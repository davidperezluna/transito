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
var ciudadano_service_1 = require("../../../services/ciudadano.service");
var login_service_1 = require("../../../services/login.service");
var tipoIdentificacion_service_1 = require("../../../services/tipoIdentificacion.service");
var genero_service_1 = require("../../../services/genero.service");
var grupoSanguineo_service_1 = require("../../../services/grupoSanguineo.service");
var municipio_service_1 = require("../../../services/municipio.service");
var departamento_service_1 = require("../../../services/departamento.service");
var pais_service_1 = require("../../../services/pais.service");
var sweetalert2_1 = require("sweetalert2");
var EditComponent = (function () {
    function EditComponent(_ciudadanoService, _loginService, _tipoIdentificacionService, _generoService, _grupoSanguineoService, _municipioService, _departamentoService, _paisService) {
        this._ciudadanoService = _ciudadanoService;
        this._loginService = _loginService;
        this._tipoIdentificacionService = _tipoIdentificacionService;
        this._generoService = _generoService;
        this._grupoSanguineoService = _grupoSanguineoService;
        this._municipioService = _municipioService;
        this._departamentoService = _departamentoService;
        this._paisService = _paisService;
        this.ready = new core_1.EventEmitter();
        this.ciudadano = null;
        this.formReady = false;
    }
    EditComponent.prototype.ngOnInit = function () {
        var _this = this;
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
        console.log(this.ciudadano);
        this.ciudadano.numeroIdentificacionUsuario = this.ciudadano.usuario.identificacion;
        this.ciudadano.primerNombreUsuario = this.ciudadano.usuario.primerNombre;
        this.ciudadano.segundoNombreUsuario = this.ciudadano.usuario.segundoNombre;
        this.ciudadano.primerApellidoUsuario = this.ciudadano.usuario.primerApellido;
        this.ciudadano.segundoApellidoUsuario = this.ciudadano.usuario.segundoApellido;
        this.ciudadano.telefonoUsuario = this.ciudadano.usuario.telefono;
        this.ciudadano.correoUsuario = this.ciudadano.usuario.correo;
        this._departamentoService.getDepartamentoPorPaisSelect(this.ciudadano.municipioNacimiento.departamento.pais.id).subscribe(function (response) {
            _this.departamentosNacimiento = response;
            setTimeout(function () {
                _this.departamentoNacimientoSelected = [_this.ciudadano.municipioNacimiento.departamento.id];
            });
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
        this._departamentoService.getDepartamentoPorPaisSelect(this.ciudadano.municipioResidencia.departamento.pais.id).subscribe(function (response) {
            _this.departamentosResidencia = response;
            setTimeout(function () {
                _this.departamentoResidenciaSelected = [_this.ciudadano.municipioResidencia.departamento.id];
            });
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
        this._municipioService.getMunicipioPorDepartamentoSelect(this.ciudadano.municipioNacimiento.departamento.id).subscribe(function (response) {
            _this.municipiosNacimiento = response;
            setTimeout(function () {
                _this.municipioNacimientoSelected = [_this.ciudadano.municipioNacimiento.id];
            });
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
        this._municipioService.getMunicipioPorDepartamentoSelect(this.ciudadano.municipioResidencia.departamento.id).subscribe(function (response) {
            _this.municipiosResidencia = response;
            setTimeout(function () {
                _this.municipioResidenciaSelected = [_this.ciudadano.municipioResidencia.id];
            });
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
        this._paisService.select().subscribe(function (response) {
            _this.paises = response;
            setTimeout(function () {
                _this.paisNacimientoSelected = [_this.ciudadano.municipioNacimiento.departamento.pais.id];
                _this.municipioNacimientoSelected = [_this.ciudadano.municipioNacimiento.id];
                _this.paisResidenciaSelected = [_this.ciudadano.municipioResidencia.departamento.pais.id];
                _this.departamentoResidenciaSelected = [_this.ciudadano.municipioResidencia.departamento.id];
                _this.municipioResidenciaSelected = [_this.ciudadano.municipioResidencia.id];
            });
            console.log(_this.departamentoNacimientoSelected);
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
        this._tipoIdentificacionService.getTipoIdentificacionSelect().subscribe(function (response) {
            _this.tiposIdentificacion = response;
            setTimeout(function () {
                _this.tipoIdentificacionSelected = [_this.ciudadano.usuario.tipoIdentificacion.id];
                _this.formReady = true;
            });
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._generoService.getGeneroSelect().subscribe(function (response) {
            _this.generos = response;
            setTimeout(function () {
                _this.generoSelected = [_this.ciudadano.genero.id];
                _this.formReady = true;
            });
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._grupoSanguineoService.getGrupoSanguineoSelect().subscribe(function (response) {
            _this.gruposSanguineos = response;
            setTimeout(function () {
                _this.grupoSanguineoSelected = [_this.ciudadano.grupoSanguineo.id];
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
        this.ciudadano.municipioResidenciaId = this.municipioResidenciaSelected;
        this.ciudadano.municipioNacimientoId = this.municipioNacimientoSelected;
        this.ciudadano.tipoIdentificacionUsuarioId = this.tipoIdentificacionSelected;
        this.ciudadano.generoId = this.generoSelected;
        this.ciudadano.grupoSanguineoId = this.grupoSanguineoSelected;
        console.log(this.ciudadano);
        this._ciudadanoService.editCiudadano(this.ciudadano, token).subscribe(function (response) {
            _this.respuesta = response;
            console.log(_this.respuesta);
            if (_this.respuesta.status == 'success') {
                _this.ready.emit(true);
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
    EditComponent.prototype.changedPaisNacimiento = function (id) {
        var _this = this;
        if (id) {
            this.paisNacimientoSelected = id;
            this._departamentoService.getDepartamentoPorPaisSelect(this.paisNacimientoSelected).subscribe(function (response) {
                _this.departamentosNacimiento = response;
            }, function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert('Error en la petición');
                }
            });
        }
    };
    EditComponent.prototype.changedDepartamentoNacimiento = function (id) {
        var _this = this;
        if (id) {
            this._municipioService.getMunicipioPorDepartamentoSelect(this.departamentoNacimientoSelected).subscribe(function (response) {
                _this.municipiosNacimiento = response;
            }, function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert('Error en la petición');
                }
            });
        }
    };
    EditComponent.prototype.changedPaisResidencia = function (id) {
        var _this = this;
        if (id) {
            this._departamentoService.getDepartamentoPorPaisSelect(this.paisResidenciaSelected).subscribe(function (response) {
                _this.departamentosResidencia = response;
            }, function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert('Error en la petición');
                }
            });
        }
    };
    EditComponent.prototype.changedDepartamentoResidencia = function (id) {
        var _this = this;
        if (id) {
            this._municipioService.getMunicipioPorDepartamentoSelect(this.departamentoResidenciaSelected).subscribe(function (response) {
                _this.municipiosResidencia = response;
            }, function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    alert('Error en la petición');
                }
            });
        }
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
], EditComponent.prototype, "ciudadano", void 0);
EditComponent = __decorate([
    core_1.Component({
        selector: 'app-edit',
        templateUrl: './edit.component.html'
    }),
    __metadata("design:paramtypes", [ciudadano_service_1.CiudadanoService,
        login_service_1.LoginService,
        tipoIdentificacion_service_1.TipoIdentificacionService,
        genero_service_1.GeneroService,
        grupoSanguineo_service_1.GrupoSanguineoService,
        municipio_service_1.MunicipioService,
        departamento_service_1.DepartamentoService,
        pais_service_1.PaisService])
], EditComponent);
exports.EditComponent = EditComponent;
//# sourceMappingURL=edit.component.js.map