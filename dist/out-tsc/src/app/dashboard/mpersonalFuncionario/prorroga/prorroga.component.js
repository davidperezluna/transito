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
var pnalProrroga_service_1 = require("../../../services/pnalProrroga.service");
var mpersonalFuncionario_service_1 = require("../../../services/mpersonalFuncionario.service");
var login_service_1 = require("../../../services/login.service");
var sweetalert2_1 = require("sweetalert2");
var ProrrogaComponent = (function () {
    function ProrrogaComponent(_PnalProrrogaService, _MpersonalFuncionarioService, _loginService) {
        this._PnalProrrogaService = _PnalProrrogaService;
        this._MpersonalFuncionarioService = _MpersonalFuncionarioService;
        this._loginService = _loginService;
        this.ready = new core_1.EventEmitter();
        this.funcionario = null;
        this.prorrogas = null;
        this.formNew = false;
        this.formEdit = false;
        this.formIndex = true;
    }
    ProrrogaComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log(this.funcionario);
        sweetalert2_1.default({
            title: 'Cargando Tabla!',
            text: 'Solo tardara unos segundos por favor espere.',
            timer: 1500,
            onOpen: function () {
                sweetalert2_1.default.showLoading();
            }
        }).then(function (result) {
            if (
            // Read more about handling dismissals
            result.dismiss === sweetalert2_1.default.DismissReason.timer) {
            }
        });
        var token = this._loginService.getToken();
        this._MpersonalFuncionarioService.recordProrrogas(this.funcionario, token).subscribe(function (response) {
            _this.prorrogas = response.data;
            var timeoutId = setTimeout(function () {
                _this.iniciarTabla();
            }, 100);
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
    };
    ProrrogaComponent.prototype.iniciarTabla = function () {
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
    ProrrogaComponent.prototype.onNew = function () {
        this.formNew = true;
        this.formIndex = false;
        this.table.destroy();
    };
    ProrrogaComponent.prototype.onCancelar = function () {
        this.ready.emit(true);
    };
    return ProrrogaComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ProrrogaComponent.prototype, "ready", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ProrrogaComponent.prototype, "funcionario", void 0);
ProrrogaComponent = __decorate([
    core_1.Component({
        selector: 'app-prorroga',
        templateUrl: './prorroga.component.html'
    }),
    __metadata("design:paramtypes", [pnalProrroga_service_1.PnalProrrogaService,
        mpersonalFuncionario_service_1.MpersonalFuncionarioService,
        login_service_1.LoginService])
], ProrrogaComponent);
exports.ProrrogaComponent = ProrrogaComponent;
//# sourceMappingURL=prorroga.component.js.map