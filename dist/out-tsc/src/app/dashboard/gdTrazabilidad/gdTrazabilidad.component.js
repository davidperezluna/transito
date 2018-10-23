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
var mpersonalFuncionario_service_1 = require("../../services/mpersonalFuncionario.service");
var gdDocumento_service_1 = require("../../services/gdDocumento.service");
var gdTrazabilidad_service_1 = require("../../services/gdTrazabilidad.service");
var login_service_1 = require("../../services/login.service");
var environment_1 = require("environments/environment");
var sweetalert2_1 = require("sweetalert2");
var GdTrazabilidadComponent = (function () {
    function GdTrazabilidadComponent(_FuncionarioService, _DocumentoService, _TrazabilidadService, _loginService) {
        this._FuncionarioService = _FuncionarioService;
        this._DocumentoService = _DocumentoService;
        this._TrazabilidadService = _TrazabilidadService;
        this._loginService = _loginService;
        this.trazabilidades = null;
        this.formNew = false;
        this.formEdit = false;
        this.formShow = false;
        this.formIndex = true;
        this.table = null;
        this.funcionario = null;
        this.docsUrl = environment_1.environment.docsUrl;
    }
    GdTrazabilidadComponent.prototype.ngOnInit = function () {
        var _this = this;
        sweetalert2_1.default({
            title: 'Buscando registros!',
            text: 'Solo tardara unos segundos por favor espere.',
            onOpen: function () {
                sweetalert2_1.default.showLoading();
            }
        });
        this.formEdit = false;
        this.formIndex = false;
        this.formShow = false;
        this.formNew = false;
        var token = this._loginService.getToken();
        var identity = this._loginService.getIdentity();
        this._FuncionarioService.searchLogin({ 'identificacion': identity.identificacion }, token).subscribe(function (response) {
            if (response.status == 'success') {
                _this.funcionario = response.data;
                _this._TrazabilidadService.searchByFuncionario({ 'idFuncionario': _this.funcionario.id }, token).subscribe(function (response) {
                    if (response.status == 'success') {
                        _this.formIndex = true;
                        _this.trazabilidades = response.data;
                        var timeoutId = setTimeout(function () {
                            _this.iniciarTabla();
                        }, 100);
                        sweetalert2_1.default({
                            title: 'Perfecto',
                            text: response.message,
                            type: 'success'
                        });
                    }
                    else {
                        _this.formIndex = false;
                        sweetalert2_1.default({
                            title: 'Atención!',
                            text: response.message,
                            type: 'warning'
                        });
                    }
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert("Error en la petición");
                    }
                });
            }
            else {
                sweetalert2_1.default({
                    title: 'Atención!',
                    text: response.message,
                    type: 'warning'
                });
            }
            (function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert('Error en la petición');
                }
            });
        });
    };
    GdTrazabilidadComponent.prototype.iniciarTabla = function () {
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
    GdTrazabilidadComponent.prototype.onNew = function (trazabilidad) {
        this.trazabilidad = trazabilidad;
        this.formEdit = false;
        this.formIndex = false;
        this.formShow = false;
        this.formNew = true;
    };
    GdTrazabilidadComponent.prototype.onShow = function (trazabilidad) {
        this.trazabilidad = trazabilidad;
        this.formNew = false;
        this.formEdit = false;
        this.formIndex = false;
        this.formShow = true;
    };
    GdTrazabilidadComponent.prototype.ready = function (isCreado) {
        if (isCreado) {
            this.ngOnInit();
        }
    };
    GdTrazabilidadComponent.prototype.onDelete = function (id) {
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
                _this._TrazabilidadService.delete({ 'id': id }, token).subscribe(function (response) {
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
    GdTrazabilidadComponent.prototype.onEdit = function (trazabilidad) {
        this.formEdit = true;
    };
    return GdTrazabilidadComponent;
}());
GdTrazabilidadComponent = __decorate([
    core_1.Component({
        selector: 'app-index',
        templateUrl: './gdTrazabilidad.component.html'
    }),
    __metadata("design:paramtypes", [mpersonalFuncionario_service_1.MpersonalFuncionarioService,
        gdDocumento_service_1.GdDocumentoService,
        gdTrazabilidad_service_1.GdTrazabilidadService,
        login_service_1.LoginService])
], GdTrazabilidadComponent);
exports.GdTrazabilidadComponent = GdTrazabilidadComponent;
//# sourceMappingURL=gdTrazabilidad.component.js.map