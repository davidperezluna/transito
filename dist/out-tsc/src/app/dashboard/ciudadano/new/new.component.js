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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ciudadano_modelo_1 = require("../ciudadano.modelo");
var ciudadano_service_1 = require("../../../services/ciudadano.service");
var login_service_1 = require("../../../services/login.service");
var tipoIdentificacion_service_1 = require("../../../services/tipoIdentificacion.service");
var municipio_service_1 = require("../../../services/municipio.service");
var sweetalert2_1 = require("sweetalert2");
var NewComponent = /** @class */ (function () {
    function NewComponent(_CiudadanoService, _loginService, _tipoIdentificacionService, _municipioService) {
        this._CiudadanoService = _CiudadanoService;
        this._loginService = _loginService;
        this._tipoIdentificacionService = _tipoIdentificacionService;
        this._municipioService = _municipioService;
        this.ready = new core_1.EventEmitter();
    }
    NewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ciudadano = new ciudadano_modelo_1.Ciudadano(null, null, null, null, null, null, null, null, null, null, null, null, null, null);
        this._tipoIdentificacionService.getTipoIdentificacionSelect().subscribe(function (response) {
            _this.tiposIdentificacion = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._municipioService.getMunicipioSelect().subscribe(function (response) {
            _this.municipios = response;
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
        this.ciudadano.tipoIdentificacionId = this.tipoIdentificacionSelected;
        this.ciudadano.municipioNacimientoId = this.municipioNacimientoSelected;
        this.ciudadano.municipioResidenciaId = this.municipioResidenciaSelected;
        console.log(this.ciudadano);
        this._CiudadanoService.register(this.ciudadano, token).subscribe(function (response) {
            _this.respuesta = response;
            console.log(_this.respuesta);
            if (_this.respuesta.status == 'success') {
                _this.ready.emit(true);
                sweetalert2_1.default({
                    title: 'Echo!',
                    text: 'El registro se ha registrado con exito',
                    type: 'success',
                    confirmButtonText: 'Aceptar'
                });
            }
            else {
                sweetalert2_1.default({
                    title: 'Error!',
                    text: 'El ciudadano ' + +' ya se encuentra registrado',
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
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], NewComponent.prototype, "ready", void 0);
    NewComponent = __decorate([
        core_1.Component({
            selector: 'app-new',
            templateUrl: './new.component.html'
        }),
        __metadata("design:paramtypes", [ciudadano_service_1.CiudadanoService,
            login_service_1.LoginService,
            tipoIdentificacion_service_1.TipoIdentificacionService,
            municipio_service_1.MunicipioService])
    ], NewComponent);
    return NewComponent;
}());
exports.NewComponent = NewComponent;
//# sourceMappingURL=new.component.js.map