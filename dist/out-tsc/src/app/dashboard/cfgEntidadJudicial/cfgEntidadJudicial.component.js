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
var cfgEntidadJudicial_service_1 = require("../../services/cfgEntidadJudicial.service");
var login_service_1 = require("../../services/login.service");
var sweetalert2_1 = require("sweetalert2");
var CfgEntidadJudicialComponent = (function () {
    function CfgEntidadJudicialComponent(_CfgEntidadJudicialService, _loginService) {
        this._CfgEntidadJudicialService = _CfgEntidadJudicialService;
        this._loginService = _loginService;
        this.formNew = false;
        this.formEdit = false;
        this.formIndex = true;
        this.table = null;
    }
    CfgEntidadJudicialComponent.prototype.ngOnInit = function () {
        var _this = this;
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
        this._CfgEntidadJudicialService.getEntidadJudicial().subscribe(function (response) {
            if (response) {
                console.log(response);
                _this.cfgEntidadesJudiciales = response.data;
                var timeoutId = setTimeout(function () {
                    _this.iniciarTabla();
                }, 100);
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
    };
    CfgEntidadJudicialComponent.prototype.iniciarTabla = function () {
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
    CfgEntidadJudicialComponent.prototype.onNew = function () {
        this.formNew = true;
        this.formIndex = false;
        if (this.table) {
            this.table.destroy();
        }
    };
    CfgEntidadJudicialComponent.prototype.ready = function (isCreado) {
        if (isCreado) {
            this.formNew = false;
            this.formEdit = false;
            this.formIndex = true;
            this.ngOnInit();
        }
    };
    CfgEntidadJudicialComponent.prototype.deleteEntidadJudicial = function (id) {
        var _this = this;
        sweetalert2_1.default({
            title: '¿Estás seguro?',
            text: "¡Se eliminara este registro!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#15d4be',
            cancelButtonColor: '#ff6262',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then(function (result) {
            if (result.value) {
                var token = _this._loginService.getToken();
                _this._CfgEntidadJudicialService.deleteCfgEntidadJudicial(token, id).subscribe(function (response) {
                    sweetalert2_1.default({
                        title: 'Eliminado!',
                        text: 'Registro eliminado correctamente.',
                        type: 'success',
                        confirmButtonColor: '#15d4be',
                    });
                    _this.table.destroy();
                    _this.respuesta = response;
                    _this.ngOnInit();
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert("Error en la petición");
                    }
                });
            }
        });
    };
    CfgEntidadJudicialComponent.prototype.editEntidadJudicial = function (cfgEntidadJudicial) {
        this.cfgEntidadJudicial = cfgEntidadJudicial;
        this.formEdit = true;
        this.formIndex = false;
    };
    return CfgEntidadJudicialComponent;
}());
CfgEntidadJudicialComponent = __decorate([
    core_1.Component({
        selector: 'app-index',
        templateUrl: './cfgEntidadJudicial.component.html'
    }),
    __metadata("design:paramtypes", [cfgEntidadJudicial_service_1.CfgEntidadJudicialService,
        login_service_1.LoginService])
], CfgEntidadJudicialComponent);
exports.CfgEntidadJudicialComponent = CfgEntidadJudicialComponent;
//# sourceMappingURL=cfgEntidadJudicial.component.js.map