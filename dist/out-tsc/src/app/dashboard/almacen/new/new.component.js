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
var almacen_modelo_1 = require("../almacen.modelo");
var almacen_service_1 = require("../../../services/almacen.service");
var login_service_1 = require("../../../services/login.service");
var servicio_service_1 = require("../../../services/servicio.service");
var organismoTransito_service_1 = require("../../../services/organismoTransito.service");
var consumible_service_1 = require("../../../services/consumible.service");
var clase_service_1 = require("../../../services/clase.service");
var sweetalert2_1 = require("sweetalert2");
var NewComponent = /** @class */ (function () {
    function NewComponent(_AlmacenService, _loginService, _servicioService, _organismoTransitoService, _consumibleService, _claseService) {
        this._AlmacenService = _AlmacenService;
        this._loginService = _loginService;
        this._servicioService = _servicioService;
        this._organismoTransitoService = _organismoTransitoService;
        this._consumibleService = _consumibleService;
        this._claseService = _claseService;
        this.ready = new core_1.EventEmitter();
    }
    NewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.almacen = new almacen_modelo_1.Almacen(null, null, null, null, null, null, null, null);
        this._servicioService.getServicioSelect().subscribe(function (response) {
            _this.servicios = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._organismoTransitoService.getOrganismoTransitoSelect().subscribe(function (response) {
            _this.organismosTransito = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._consumibleService.getConsumibleSelect().subscribe(function (response) {
            _this.consumibles = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._claseService.getClaseSelect().subscribe(function (response) {
            _this.clases = response;
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
        this.almacen.servicioId = this.servicioSelected;
        this.almacen.organismoTransitoId = this.organismoTransitoSelected;
        this.almacen.consumibleId = this.consumibleSelected;
        this.almacen.claseId = this.claseSelected;
        console.log(this.almacen);
        this._AlmacenService.register(this.almacen, token).subscribe(function (response) {
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
                    text: 'El almacen ' + +' ya se encuentra registrado',
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
        __metadata("design:paramtypes", [almacen_service_1.AlmacenService,
            login_service_1.LoginService,
            servicio_service_1.ServicioService,
            organismoTransito_service_1.OrganismoTransitoService,
            consumible_service_1.ConsumibleService,
            clase_service_1.ClaseService])
    ], NewComponent);
    return NewComponent;
}());
exports.NewComponent = NewComponent;
//# sourceMappingURL=new.component.js.map