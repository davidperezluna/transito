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
var msvAsignacion_service_1 = require("../../services/msvAsignacion.service");
var login_service_1 = require("../../services/login.service");
var sweetalert2_1 = require("sweetalert2");
var MsvAsignacionComponent = (function () {
    function MsvAsignacionComponent(_AsignacionService, _loginService) {
        this._AsignacionService = _AsignacionService;
        this._loginService = _loginService;
        this.formNew = false;
        this.formEdit = false;
        this.formShow = false;
        this.formSearch = true;
        this.resumen = {};
        this.datos = {
            'parametro': null
        };
    }
    MsvAsignacionComponent.prototype.ngOnInit = function () {
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
        $('[data-toggle="tooltip"]').tooltip();
    };
    MsvAsignacionComponent.prototype.iniciarTabla = function () {
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
    MsvAsignacionComponent.prototype.onShow = function (funcionario) {
        this.funcionario = funcionario;
        this.formNew = false;
        this.formSearch = false;
        this.formShow = true;
        this.table.destroy();
    };
    MsvAsignacionComponent.prototype.ready = function (isCreado) {
        if (isCreado) {
            this.formNew = false;
            this.formEdit = false;
            this.formShow = false;
            this.formSearch = true;
            this.ngOnInit();
        }
    };
    MsvAsignacionComponent.prototype.readyNew = function (funcionario) {
        this.funcionario = funcionario;
        this.formNew = true;
        this.formEdit = false;
        this.formShow = false;
        this.formSearch = false;
        this.ngOnInit();
    };
    MsvAsignacionComponent.prototype.delete = function (id) {
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
                _this._AsignacionService.delete(token, id).subscribe(function (response) {
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
    MsvAsignacionComponent.prototype.onSearch = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this.datos.parametro = this.parametro;
        this._AsignacionService.searchFuncionarioAgente(this.datos, token).subscribe(function (response) {
            _this.respuesta = response;
            if (_this.respuesta.status == 'success') {
                _this.funcionarios = response.data;
                _this.iniciarTabla();
                sweetalert2_1.default({
                    title: 'Perfecto',
                    text: response.msj,
                    type: 'info',
                    showCloseButton: true,
                    focusConfirm: false,
                    confirmButtonText: '<i class="fa fa-thumbs-up"></i> OK!',
                    confirmButtonAriaLabel: 'Thumbs up, great!',
                    cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
                    cancelButtonAriaLabel: 'Thumbs down',
                });
            }
            else {
                sweetalert2_1.default({
                    title: 'Atención',
                    text: response.msj,
                    type: 'warning',
                    confirmButtonColor: '#15d4be',
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
    return MsvAsignacionComponent;
}());
MsvAsignacionComponent = __decorate([
    core_1.Component({
        selector: 'app-index',
        templateUrl: './msvAsignacion.component.html'
    }),
    __metadata("design:paramtypes", [msvAsignacion_service_1.MsvAsignacionService,
        login_service_1.LoginService])
], MsvAsignacionComponent);
exports.MsvAsignacionComponent = MsvAsignacionComponent;
//# sourceMappingURL=msvAsignacion.component.js.map