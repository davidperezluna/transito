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
var vhloCfgTipoMaquinaria_service_1 = require("../../services/vhloCfgTipoMaquinaria.service");
var login_service_1 = require("../../services/login.service");
var sweetalert2_1 = require("sweetalert2");
var VhloCfgTipoMaquinariaComponent = (function () {
    function VhloCfgTipoMaquinariaComponent(_TipoMaquinariaService, _loginService) {
        this._TipoMaquinariaService = _TipoMaquinariaService;
        this._loginService = _loginService;
        this.formNew = false;
        this.formEdit = false;
        this.formIndex = true;
    }
    VhloCfgTipoMaquinariaComponent.prototype.ngOnInit = function () {
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
        this._TipoMaquinariaService.index().subscribe(function (response) {
            _this.tiposMaquinaria = response.data;
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
    VhloCfgTipoMaquinariaComponent.prototype.iniciarTabla = function () {
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
    VhloCfgTipoMaquinariaComponent.prototype.onNew = function () {
        this.formNew = true;
        this.formIndex = false;
        this.table.destroy();
    };
    VhloCfgTipoMaquinariaComponent.prototype.ready = function (isCreado) {
        if (isCreado) {
            this.formNew = false;
            this.formEdit = false;
            this.formIndex = true;
            this.ngOnInit();
        }
    };
    VhloCfgTipoMaquinariaComponent.prototype.onDelete = function (id) {
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
                _this._TipoMaquinariaService.delete({ 'id': id }, token).subscribe(function (response) {
                    sweetalert2_1.default({
                        title: 'Eliminado!',
                        text: 'Registro eliminado correctamente.',
                        type: 'success',
                        confirmButtonColor: '#15d4be',
                    });
                    _this.table.destroy();
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
    VhloCfgTipoMaquinariaComponent.prototype.onEdit = function (tipoMaquinaria) {
        this.tipoMaquinaria = tipoMaquinaria;
        this.formEdit = true;
        this.formIndex = false;
    };
    return VhloCfgTipoMaquinariaComponent;
}());
VhloCfgTipoMaquinariaComponent = __decorate([
    core_1.Component({
        selector: 'app-index',
        templateUrl: './vhloCfgTipoMaquinaria.component.html'
    }),
    __metadata("design:paramtypes", [vhloCfgTipoMaquinaria_service_1.VhloCfgTipoMaquinariaService,
        login_service_1.LoginService])
], VhloCfgTipoMaquinariaComponent);
exports.VhloCfgTipoMaquinariaComponent = VhloCfgTipoMaquinariaComponent;
//# sourceMappingURL=vhloCfgTipoMaquinaria.component.js.map