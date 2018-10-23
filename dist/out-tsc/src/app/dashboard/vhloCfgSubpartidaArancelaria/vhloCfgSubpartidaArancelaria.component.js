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
var vhloCfgSubpartidaArancelaria_service_1 = require("../../services/vhloCfgSubpartidaArancelaria.service");
var login_service_1 = require("../../services/login.service");
var sweetalert2_1 = require("sweetalert2");
var VhloCfgSubpartidaArancelariaComponent = (function () {
    function VhloCfgSubpartidaArancelariaComponent(_SubpartidaArancelariaService, _loginService) {
        this._SubpartidaArancelariaService = _SubpartidaArancelariaService;
        this._loginService = _loginService;
        this.formNew = false;
        this.formEdit = false;
        this.formIndex = true;
    }
    VhloCfgSubpartidaArancelariaComponent.prototype.ngOnInit = function () {
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
        this._SubpartidaArancelariaService.index().subscribe(function (response) {
            _this.subpartidasArancelarias = response.data;
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
    VhloCfgSubpartidaArancelariaComponent.prototype.iniciarTabla = function () {
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
    VhloCfgSubpartidaArancelariaComponent.prototype.onNew = function () {
        this.formNew = true;
        this.formIndex = false;
        this.table.destroy();
    };
    VhloCfgSubpartidaArancelariaComponent.prototype.ready = function (isCreado) {
        if (isCreado) {
            this.formNew = false;
            this.formEdit = false;
            this.formIndex = true;
            this.ngOnInit();
        }
    };
    VhloCfgSubpartidaArancelariaComponent.prototype.onDelete = function (id) {
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
                _this._SubpartidaArancelariaService.delete({ 'id': id }, token).subscribe(function (response) {
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
    VhloCfgSubpartidaArancelariaComponent.prototype.onEdit = function (subpartidaArancelaria) {
        this.subpartidaArancelaria = subpartidaArancelaria;
        this.formEdit = true;
        this.formIndex = false;
    };
    return VhloCfgSubpartidaArancelariaComponent;
}());
VhloCfgSubpartidaArancelariaComponent = __decorate([
    core_1.Component({
        selector: 'app-index',
        templateUrl: './vhloCfgSubpartidaArancelaria.component.html'
    }),
    __metadata("design:paramtypes", [vhloCfgSubpartidaArancelaria_service_1.VhloCfgSubpartidaArancelariaService,
        login_service_1.LoginService])
], VhloCfgSubpartidaArancelariaComponent);
exports.VhloCfgSubpartidaArancelariaComponent = VhloCfgSubpartidaArancelariaComponent;
//# sourceMappingURL=vhloCfgSubpartidaArancelaria.component.js.map