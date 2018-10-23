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
var tramitePrecio_modelo_1 = require("../tramitePrecio.modelo");
var tramitePrecio_service_1 = require("../../../services/tramitePrecio.service");
var login_service_1 = require("../../../services/login.service");
var tramite_service_1 = require("../../../services/tramite.service");
var modulo_service_1 = require("../../../services/modulo.service");
var clase_service_1 = require("../../../services/clase.service");
var sweetalert2_1 = require("sweetalert2");
var NewComponent = (function () {
    function NewComponent(_TramitePrecioService, _loginService, _tramiteService, _claseService, _moduloService) {
        this._TramitePrecioService = _TramitePrecioService;
        this._loginService = _loginService;
        this._tramiteService = _tramiteService;
        this._claseService = _claseService;
        this._moduloService = _moduloService;
        this.ready = new core_1.EventEmitter();
        this.claseSelected = null;
    }
    NewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._TramitePrecioService.getTramitePrecio().subscribe(function (response) {
            _this.tramitesPrecios = response.tramitePreciosActivo;
        });
        this.claseSelected = null;
        // console.log(this.tramitePrecio);
        this.tramitePrecio = new tramitePrecio_modelo_1.TramitePrecio(null, null, null, null, null, null, null, null);
        this.date = new Date();
        this._moduloService.getModuloSelect().subscribe(function (response) {
            _this.modulos = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
    };
    NewComponent.prototype.onCancelar = function () {
        this.ready.emit(true);
    };
    NewComponent.prototype.onEnviar = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this.tramitePrecio.tramiteId = this.tramiteSelected;
        if (this.claseSelected) {
            this.tramitePrecio.claseId = this.claseSelected;
        }
        this.fechaInicio = new Date(this.tramitePrecio.fechaInicio);
        this.tramitePrecio.moduloId = this.moduloSelected;
        this._TramitePrecioService.register(this.tramitePrecio, token).subscribe(function (response) {
            _this.respuesta = response;
            if (_this.respuesta.status == 'success') {
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
                    text: 'El tramitePrecio ya se encuentra registrado',
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
        // if (this.date < this.fechaInicio) {
        // se quito la validacion para que puedan hacer pruebas
        // }else{
        //   swal({
        //     title: 'Verificar!',
        //     text: 'La fecha de inicio tiene que ser mayor a la fecha actual.',
        //     type: 'warning',
        //     confirmButtonText: 'Aceptar' 
        //   })
        // }
    };
    NewComponent.prototype.changedModulo = function (e) {
        var _this = this;
        if (e) {
            this._tramiteService.getTramitePorModuloSelect(this.moduloSelected).subscribe(function (response) {
                _this.tramites = response;
            }, function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert("Error en la petición");
                }
            });
            this._claseService.getClasePorModuloSelect(this.moduloSelected).subscribe(function (response) {
                _this.clases = response;
            }, function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert("Error en la petición");
                }
            });
        }
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
    __metadata("design:paramtypes", [tramitePrecio_service_1.TramitePrecioService,
        login_service_1.LoginService,
        tramite_service_1.TramiteService,
        clase_service_1.ClaseService,
        modulo_service_1.ModuloService])
], NewComponent);
exports.NewComponent = NewComponent;
//# sourceMappingURL=new.component.js.map