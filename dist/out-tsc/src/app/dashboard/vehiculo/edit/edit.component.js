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
var departamento_service_1 = require("../../../services/departamento.service");
var login_service_1 = require("../../../services/login.service");
var municipio_service_1 = require("../../../services/municipio.service");
var linea_service_1 = require("../../../services/linea.service");
var clase_service_1 = require("../../../services/clase.service");
var carroceria_service_1 = require("../../../services/carroceria.service");
var servicio_service_1 = require("../../../services/servicio.service");
var color_service_1 = require("../../../services/color.service");
var combustible_service_1 = require("../../../services/combustible.service");
var vehiculo_service_1 = require("../../../services/vehiculo.service");
var organismoTransito_service_1 = require("../../../services/organismoTransito.service");
var sweetalert2_1 = require("sweetalert2");
var EditComponent = /** @class */ (function () {
    function EditComponent(_departamentoService, _loginService, _MunicipioService, _lineaService, _ClaseService, _CarroceriaService, _ServicioService, _ColorService, _CombustibleService, _VehiculoService, _OrganismoTransitoService) {
        this._departamentoService = _departamentoService;
        this._loginService = _loginService;
        this._MunicipioService = _MunicipioService;
        this._lineaService = _lineaService;
        this._ClaseService = _ClaseService;
        this._CarroceriaService = _CarroceriaService;
        this._ServicioService = _ServicioService;
        this._ColorService = _ColorService;
        this._CombustibleService = _CombustibleService;
        this._VehiculoService = _VehiculoService;
        this._OrganismoTransitoService = _OrganismoTransitoService;
        this.ready = new core_1.EventEmitter();
        this.vehiculo = null;
    }
    EditComponent.prototype.ngOnInit = function () {
        var _this = this;
        sweetalert2_1.default({
            title: 'Cargando Formulario!',
            text: 'Solo tardara unos segundos por favor espere.',
            timer: 3000,
            onOpen: function () {
                sweetalert2_1.default.showLoading();
            }
        }).then(function (result) {
            if (
            // Read more about handling dismissals
            result.dismiss === sweetalert2_1.default.DismissReason.timer) {
            }
        });
        this._lineaService.getLineaSelect().subscribe(function (response) {
            _this.lineas = response;
            setTimeout(function () {
                _this.lineaSelected = [_this.vehiculo.linea.id];
            });
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._MunicipioService.getMunicipioSelect().subscribe(function (response) {
            _this.municipios = response;
            setTimeout(function () {
                _this.municipioSelected = [_this.vehiculo.municipio.id];
            });
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._OrganismoTransitoService.getOrganismoTransitoSelect().subscribe(function (response) {
            _this.organismosTransito = response;
            setTimeout(function () {
                _this.organismoTransitoSelected = [_this.vehiculo.organismoTransito.id];
            });
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._ClaseService.getClaseSelect().subscribe(function (response) {
            _this.clases = response;
            setTimeout(function () {
                _this.claseSelected = [_this.vehiculo.clase.id];
            });
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._CarroceriaService.getCarroceriaSelect().subscribe(function (response) {
            _this.carrocerias = response;
            setTimeout(function () {
                _this.carroceriaSelected = [_this.vehiculo.carroceria.id];
            });
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._ServicioService.getServicioSelect().subscribe(function (response) {
            _this.servicios = response;
            setTimeout(function () {
                _this.servicioSelected = [_this.vehiculo.servicio.id];
            });
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._ColorService.getColorSelect().subscribe(function (response) {
            _this.colores = response;
            setTimeout(function () {
                _this.colorSelected = [_this.vehiculo.color.id];
            });
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._CombustibleService.getCombustibleSelect().subscribe(function (response) {
            _this.combustibles = response;
            setTimeout(function () {
                _this.combustibleSelected = [_this.vehiculo.combustible.id];
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
        this.vehiculo.municipioId = this.municipioSelected;
        this.vehiculo.lineaId = this.lineaSelected;
        this.vehiculo.claseId = this.claseSelected;
        this.vehiculo.carroceriaId = this.carroceriaSelected;
        this.vehiculo.servicioId = this.servicioSelected;
        this.vehiculo.colorId = this.colorSelected;
        this.vehiculo.combustibleId = this.combustibleSelected;
        this.vehiculo.organismoTransitoId = this.organismoTransitoSelected;
        console.log(this.vehiculo);
        var token = this._loginService.getToken();
        this._VehiculoService.register(this.vehiculo, token).subscribe(function (response) {
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
                    text: 'El vehiculo ' + _this.vehiculo.placa + ' ya se encuentra registrado',
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
    ], EditComponent.prototype, "ready", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], EditComponent.prototype, "vehiculo", void 0);
    EditComponent = __decorate([
        core_1.Component({
            selector: 'app-edit',
            templateUrl: './edit.component.html'
        }),
        __metadata("design:paramtypes", [departamento_service_1.DepartamentoService,
            login_service_1.LoginService,
            municipio_service_1.MunicipioService,
            linea_service_1.LineaService,
            clase_service_1.ClaseService,
            carroceria_service_1.CarroceriaService,
            servicio_service_1.ServicioService,
            color_service_1.ColorService,
            combustible_service_1.CombustibleService,
            vehiculo_service_1.VehiculoService,
            organismoTransito_service_1.OrganismoTransitoService])
    ], EditComponent);
    return EditComponent;
}());
exports.EditComponent = EditComponent;
//# sourceMappingURL=edit.component.js.map