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
var msvSenialInventario_service_1 = require("../../../services/msvSenialInventario.service");
var msvSenialUbicacion_service_1 = require("../../../services/msvSenialUbicacion.service");
var login_service_1 = require("../../../services/login.service");
var sweetalert2_1 = require("sweetalert2");
var LocationComponent = (function () {
    function LocationComponent(_SenialInventarioService, _SenialUbicacionService, _loginService) {
        this._SenialInventarioService = _SenialInventarioService;
        this._SenialUbicacionService = _SenialUbicacionService;
        this._loginService = _loginService;
        this.ready = new core_1.EventEmitter();
        this.inventario = null;
        this.tipoDestinoSelected = null;
        this.seniales = null;
        this.formIndex = true;
        this.table = null;
    }
    LocationComponent.prototype.ngOnInit = function () {
        var _this = this;
        var token = this._loginService.getToken();
        if (this.tipoDestinoSelected == 1) {
            this._SenialUbicacionService.searchByDestino({ 'inventario': this.inventario, 'tipoDestino': this.tipoDestinoSelected }, token).subscribe(function (response) {
                if (response.status == 'success') {
                    _this.seniales = response.data;
                    sweetalert2_1.default({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    });
                }
                else {
                    sweetalert2_1.default({
                        title: 'Alerta!',
                        text: response.message,
                        type: 'warning',
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
        }
        else {
            this._SenialUbicacionService.searchByDestino({ 'inventario': this.inventario, 'tipoDestino': this.tipoDestinoSelected }, token).subscribe(function (response) {
                if (response.status == 'success') {
                    _this.seniales = response.data;
                    sweetalert2_1.default({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    });
                }
                else {
                    sweetalert2_1.default({
                        title: 'Alerta!',
                        text: response.message,
                        type: 'warning',
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
        }
    };
    LocationComponent.prototype.iniciarTabla = function () {
        $('#dataTables-example').DataTable({
            responsive: true,
            pageLength: 8,
            sPaginationType: 'full_numbers',
            oLanguage: {
                oPaginate: {
                    sFirst: '<<',
                    sPrevious: '<',
                    sNext: '>',
                    sLast: '>>'
                }
            }
        });
        this.table = $('#dataTables-example').DataTable();
    };
    LocationComponent.prototype.onCancelar = function () {
        this.ready.emit(true);
    };
    return LocationComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], LocationComponent.prototype, "ready", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], LocationComponent.prototype, "inventario", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], LocationComponent.prototype, "tipoDestinoSelected", void 0);
LocationComponent = __decorate([
    core_1.Component({
        selector: 'app-location',
        templateUrl: './location.component.html'
    }),
    __metadata("design:paramtypes", [msvSenialInventario_service_1.MsvSenialInventarioService,
        msvSenialUbicacion_service_1.MsvSenialUbicacionService,
        login_service_1.LoginService])
], LocationComponent);
exports.LocationComponent = LocationComponent;
//# sourceMappingURL=location.component.js.map