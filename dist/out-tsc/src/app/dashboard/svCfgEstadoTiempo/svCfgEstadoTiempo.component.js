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
var svCfgEstadoTiempo_service_1 = require("../../services/svCfgEstadoTiempo.service");
var login_service_1 = require("../../services/login.service");
var sweetalert2_1 = require("sweetalert2");
var SvCfgEstadoTiempoComponent = (function () {
    function SvCfgEstadoTiempoComponent(_EstadoTiempoService, _LoginService) {
        this._EstadoTiempoService = _EstadoTiempoService;
        this._LoginService = _LoginService;
        this.formNew = false;
        this.formEdit = false;
        this.formIndex = true;
    }
    SvCfgEstadoTiempoComponent.prototype.ngOnInit = function () {
        var _this = this;
        sweetalert2_1.default({
            title: 'Cargando Tabla!',
            text: 'Solo tardará unos segundos, por favor espere.',
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
        this._EstadoTiempoService.index().subscribe(function (response) {
            _this.estadosTiempo = response.data;
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
    SvCfgEstadoTiempoComponent.prototype.iniciarTabla = function () {
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
    SvCfgEstadoTiempoComponent.prototype.onNew = function () {
        this.formNew = true;
        this.formIndex = false;
        if (this.table) {
            this.table.destroy();
        }
    };
    SvCfgEstadoTiempoComponent.prototype.ready = function (isCreado) {
        if (isCreado) {
            this.formNew = false;
            this.formEdit = false;
            this.formIndex = true;
            this.ngOnInit();
        }
    };
    SvCfgEstadoTiempoComponent.prototype.onDelete = function (id) {
        var _this = this;
        sweetalert2_1.default({
            title: '¿Estás seguro?',
            text: "¡Se eliminará este registro!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#15d4be',
            cancelButtonColor: '#ff6262',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then(function (result) {
            if (result.value) {
                var token = _this._LoginService.getToken();
                _this._EstadoTiempoService.delete({ 'id': id }, token).subscribe(function (response) {
                    sweetalert2_1.default({
                        title: 'Eliminado!',
                        text: response.message,
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
    SvCfgEstadoTiempoComponent.prototype.onEdit = function (estadoTiempo) {
        this.estadoTiempo = estadoTiempo;
        this.formEdit = true;
        this.formIndex = false;
    };
    return SvCfgEstadoTiempoComponent;
}());
SvCfgEstadoTiempoComponent = __decorate([
    core_1.Component({
        selector: 'app-index',
        templateUrl: './svCfgEstadoTiempo.component.html'
    }),
    __metadata("design:paramtypes", [svCfgEstadoTiempo_service_1.SvCfgEstadoTiempoService,
        login_service_1.LoginService])
], SvCfgEstadoTiempoComponent);
exports.SvCfgEstadoTiempoComponent = SvCfgEstadoTiempoComponent;
//# sourceMappingURL=svCfgEstadoTiempo.component.js.map