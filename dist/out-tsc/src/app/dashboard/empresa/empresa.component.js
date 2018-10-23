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
var empresa_service_1 = require("../../services/empresa.service");
var login_service_1 = require("../../services/login.service");
// import { NewEmpresaComponent } from './new/new.component';
var sweetalert2_1 = require("sweetalert2");
var EmpresaComponent = (function () {
    function EmpresaComponent(_EmpresaService, _loginService) {
        this._EmpresaService = _EmpresaService;
        this._loginService = _loginService;
        this.formNew = false;
        this.formEdit = false;
        this.formIndex = true;
        this.formShow = false;
    }
    EmpresaComponent.prototype.ngOnInit = function () {
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
        this._EmpresaService.getEmpresa().subscribe(function (response) {
            _this.empresas = response.data;
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
    EmpresaComponent.prototype.iniciarTabla = function () {
        $('#dataTables-example').DataTable({
            responsive: false,
            pageLength: 6,
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
    EmpresaComponent.prototype.onNew = function () {
        this.formNew = true;
        this.formIndex = false;
        this.formEdit = false;
        this.table.destroy();
    };
    EmpresaComponent.prototype.ready = function (isCreado) {
        if (isCreado) {
            this.formNew = false;
            this.formEdit = false;
            this.formIndex = true;
            this.formShow = false;
            this.ngOnInit();
        }
    };
    EmpresaComponent.prototype.deleteEmpresa = function (id) {
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
                _this._EmpresaService.deleteEmpresa(token, id).subscribe(function (response) {
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
    EmpresaComponent.prototype.editEmpresa = function (empresa) {
        this.empresa = empresa;
        this.formEdit = true;
        this.formIndex = false;
    };
    EmpresaComponent.prototype.getSucursal = function (empresa) {
        this.empresa = empresa;
        this.formShow = true;
        this.formIndex = false;
    };
    EmpresaComponent.prototype.onNewSucursal = function () {
    };
    return EmpresaComponent;
}());
EmpresaComponent = __decorate([
    core_1.Component({
        selector: 'app-index',
        templateUrl: './empresa.component.html',
    }),
    __metadata("design:paramtypes", [empresa_service_1.EmpresaService,
        login_service_1.LoginService])
], EmpresaComponent);
exports.EmpresaComponent = EmpresaComponent;
//# sourceMappingURL=empresa.component.js.map