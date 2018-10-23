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
var comparendo_service_1 = require("../../../services/comparendo.service");
var cfgComparendoEstado_service_1 = require("../../../services/cfgComparendoEstado.service");
var login_service_1 = require("../../../services/login.service");
var sweetalert2_1 = require("sweetalert2");
var SearchComponent = (function () {
    function SearchComponent(_comparendoService, _EstadoService, _loginService) {
        this._comparendoService = _comparendoService;
        this._EstadoService = _EstadoService;
        this._loginService = _loginService;
        this.ready = new core_1.EventEmitter();
        this.comparendo = null;
        this.formReady = false;
    }
    SearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._EstadoService.select().subscribe(function (response) {
            _this.estados = response;
            setTimeout(function () {
                // this.bancoSelected = [this.comparendo.banco.id];
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
    SearchComponent.prototype.onCancelar = function () {
        this.ready.emit(true);
    };
    SearchComponent.prototype.onSearch = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this.comparendo.bancoId = this.bancoSelected;
        this._comparendoService.searchByState(this.comparendo, token).subscribe(function (response) {
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
    return SearchComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], SearchComponent.prototype, "ready", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], SearchComponent.prototype, "comparendo", void 0);
SearchComponent = __decorate([
    core_1.Component({
        selector: 'app-search',
        templateUrl: './search.component.html'
    }),
    __metadata("design:paramtypes", [comparendo_service_1.ComparendoService,
        cfgComparendoEstado_service_1.CfgComparendoEstadoService,
        login_service_1.LoginService])
], SearchComponent);
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=search.component.js.map