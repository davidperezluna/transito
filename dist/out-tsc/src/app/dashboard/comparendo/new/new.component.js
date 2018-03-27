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
var comparendo_modelo_1 = require("../comparendo.modelo");
var comparendo_service_1 = require("../../../services/comparendo.service");
var login_service_1 = require("../../../services/login.service");
var agenteTransito_service_1 = require("../../../services/agenteTransito.service");
var sedeOperativa_service_1 = require("../../../services/sedeOperativa.service");
var sweetalert2_1 = require("sweetalert2");
var NewComponent = /** @class */ (function () {
    function NewComponent(_ComparendoService, _loginService, _agenteTransitoService, _sedeOperativaService) {
        this._ComparendoService = _ComparendoService;
        this._loginService = _loginService;
        this._agenteTransitoService = _agenteTransitoService;
        this._sedeOperativaService = _sedeOperativaService;
        this.ready = new core_1.EventEmitter();
        this.agenteTransitoReady = false;
    }
    NewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.comparendo = new comparendo_modelo_1.Comparendo(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
        this._agenteTransitoService.getAgenteTransitoSelect().subscribe(function (response) {
            _this.agentesTransito = response;
            console.log(_this.agentesTransito);
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
        this.comparendo.agenteTransitoId = this.agenteTransitoSelected;
        console.log(this.comparendo);
        this._ComparendoService.register(this.comparendo, token).subscribe(function (response) {
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
                    text: 'la comparendo ' + _this.comparendo.numeroOrden + ' ya se encuentra registrado',
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
    NewComponent.prototype.changedAgenteTransito = function (e) {
        var _this = this;
        if (e) {
            var token = this._loginService.getToken();
            this._agenteTransitoService.showAgenteTransito(token, e).subscribe(function (response) {
                _this.agenteTransito = response;
                _this.agenteTransitoReady = true;
                console.log(_this.agenteTransito);
            }, function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert("Error en la petición");
                }
            });
        }
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
        __metadata("design:paramtypes", [comparendo_service_1.ComparendoService,
            login_service_1.LoginService,
            agenteTransito_service_1.AgenteTransitoService,
            sedeOperativa_service_1.SedeOperativaService])
    ], NewComponent);
    return NewComponent;
}());
exports.NewComponent = NewComponent;
//# sourceMappingURL=new.component.js.map