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
var ciudadano_service_1 = require("../../../services/ciudadano.service");
var login_service_1 = require("../../../services/login.service");
var tipoIdentificacion_service_1 = require("../../../services/tipoIdentificacion.service");
var municipio_service_1 = require("../../../services/municipio.service");
var sweetalert2_1 = require("sweetalert2");
var EditComponent = /** @class */ (function () {
    function EditComponent(_ciudadanoService, _loginService, _tipoIdentificacionService, _municipioService) {
        this._ciudadanoService = _ciudadanoService;
        this._loginService = _loginService;
        this._tipoIdentificacionService = _tipoIdentificacionService;
        this._municipioService = _municipioService;
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
        this._municipioService.getMunicipioSelect().subscribe(function (response) {
            _this.municipios = response;
            setTimeout(function () {
                _this.municipioNacimientoSelected = [_this.ciudadano.municipioNacimiento.id];
                _this.municipioResidenciaSelected = [_this.ciudadano.municipioResidencia.id];
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
                _this.tipoIdentificacionSelected = [_this.ciudadano.tipoIdentificacion.id];
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
        this.ciudadano.tipoIdentificacionId = this.tipoIdentificacionSelected;
        console.log(this.ciudadano);
        this._ciudadanoService.editCiudadano(this.ciudadano, token).subscribe(function (response) {
            _this.respuesta = response;
            console.log(_this.respuesta);
            if (_this.respuesta.status == 'success') {
                _this.ready.emit(true);
                sweetalert2_1.default({
                    title: 'Echo!',
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
            municipio_service_1.MunicipioService])
    ], EditComponent);
    return EditComponent;
}());
exports.EditComponent = EditComponent;
//# sourceMappingURL=edit.component.js.map