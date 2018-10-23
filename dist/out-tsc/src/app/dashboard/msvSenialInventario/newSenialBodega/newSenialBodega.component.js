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
var cfgSvSenialEstado_service_1 = require("../../../services/cfgSvSenialEstado.service");
var cfgSvSenialColor_service_1 = require("../../../services/cfgSvSenialColor.service");
var cfgSvUnidadMedida_service_1 = require("../../../services/cfgSvUnidadMedida.service");
var msvSenialInventario_service_1 = require("../../../services/msvSenialInventario.service");
var login_service_1 = require("../../../services/login.service");
var newSenialBodega_modelo_1 = require("./newSenialBodega.modelo");
var sweetalert2_1 = require("sweetalert2");
var NewSenialBodegaComponent = (function () {
    function NewSenialBodegaComponent(_EstadoService, _ColorService, _UnidadMedidaService, _SenialInventarioService, _loginService) {
        this._EstadoService = _EstadoService;
        this._ColorService = _ColorService;
        this._UnidadMedidaService = _UnidadMedidaService;
        this._SenialInventarioService = _SenialInventarioService;
        this._loginService = _loginService;
        this.ready = new core_1.EventEmitter();
        this.tipoSenialSelected = null;
        this.file = new FormData();
    }
    NewSenialBodegaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.senial = new newSenialBodega_modelo_1.MsvSenialBodega(null, null, null, null, null, null, null, null, null, null);
        this._EstadoService.select().subscribe(function (response) {
            _this.estados = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._ColorService.select().subscribe(function (response) {
            _this.colores = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._UnidadMedidaService.select().subscribe(function (response) {
            _this.medidas = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
    };
    NewSenialBodegaComponent.prototype.onCancelar = function () {
        this.ready.emit(true);
    };
    NewSenialBodegaComponent.prototype.onFileChange = function (event) {
        if (event.target.files.length > 0) {
            var fileSelected = event.target.files[0];
            this.file.append('file', fileSelected);
        }
    };
    NewSenialBodegaComponent.prototype.onLogoChange = function (event) {
        if (event.target.files.length > 0) {
            var fileSelected = event.target.files[0];
            this.file.append('logo', fileSelected);
        }
    };
    NewSenialBodegaComponent.prototype.onEnviar = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this.senial.idEstado = this.estadoSelected;
        this.senial.idColor = this.colorSelected;
        this.senial.idUnidadNedida = this.medidaSelected;
        this.senial.idTipoSenial = this.tipoSenialSelected;
        this._SenialInventarioService.registerSenialBodega(this.file, this.senial, token).subscribe(function (response) {
            if (response.status == 'success') {
                _this.ready.emit(true);
                sweetalert2_1.default({
                    title: 'Perfecto!',
                    text: response.message,
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
    return NewSenialBodegaComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewSenialBodegaComponent.prototype, "ready", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewSenialBodegaComponent.prototype, "tipoSenialSelected", void 0);
NewSenialBodegaComponent = __decorate([
    core_1.Component({
        selector: 'app-new-senial-bodega',
        templateUrl: './newSenialBodega.component.html'
    }),
    __metadata("design:paramtypes", [cfgSvSenialEstado_service_1.CfgSvSenialEstadoService,
        cfgSvSenialColor_service_1.CfgSvSenialColorService,
        cfgSvUnidadMedida_service_1.CfgSvUnidadMedidaService,
        msvSenialInventario_service_1.MsvSenialInventarioService,
        login_service_1.LoginService])
], NewSenialBodegaComponent);
exports.NewSenialBodegaComponent = NewSenialBodegaComponent;
//# sourceMappingURL=newSenialBodega.component.js.map