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
var StateComponent = (function () {
    function StateComponent(_LoginService, _ComparendoService, _EstadoService) {
        this._LoginService = _LoginService;
        this._ComparendoService = _ComparendoService;
        this._EstadoService = _EstadoService;
        this.ready = new core_1.EventEmitter();
        this.estados = null;
        this.comparendos = null;
    }
    StateComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._EstadoService.select().subscribe(function (response) {
            _this.estados = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        $('#summernote').summernote({
            placeholder: 'Hello bootstrap 4',
            tabsize: 2,
            height: 300
        });
    };
    StateComponent.prototype.onSearch = function () {
        var _this = this;
        var token = this._LoginService.getToken();
        this._ComparendoService.searchByState({ 'idEstado': this.estadoSelected }, token).subscribe(function (response) {
            if (response.status == 'success') {
                _this.comparendos = response.data;
                sweetalert2_1.default({
                    title: 'Perfecto!',
                    text: response.message,
                    type: 'success',
                    confirmButtonText: 'Aceptar'
                });
                var timeoutId = setTimeout(function () {
                    _this.iniciarTabla();
                }, 100);
            }
            else {
                _this.comparendos = null;
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
    };
    StateComponent.prototype.iniciarTabla = function () {
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
    return StateComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], StateComponent.prototype, "ready", void 0);
StateComponent = __decorate([
    core_1.Component({
        selector: 'app-state',
        templateUrl: './state.component.html'
    }),
    __metadata("design:paramtypes", [login_service_1.LoginService,
        comparendo_service_1.ComparendoService,
        cfgComparendoEstado_service_1.CfgComparendoEstadoService])
], StateComponent);
exports.StateComponent = StateComponent;
//# sourceMappingURL=state.component.js.map