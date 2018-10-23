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
var router_1 = require("@angular/router");
var mpersonalFuncionario_service_1 = require("../../services/mpersonalFuncionario.service");
var login_service_1 = require("../../services/login.service");
var mpersonalTipoContrato_service_1 = require("../../services/mpersonalTipoContrato.service");
var cfgCargo_service_1 = require("../../services/cfgCargo.service");
var sedeOperativa_service_1 = require("../../services/sedeOperativa.service");
var sweetalert2_1 = require("sweetalert2");
var MpersonalFuncionarioComponent = (function () {
    function MpersonalFuncionarioComponent(_FuncionarioService, _TipoContratoService, _CargoService, _SedeOperativaService, _loginService, router) {
        this._FuncionarioService = _FuncionarioService;
        this._TipoContratoService = _TipoContratoService;
        this._CargoService = _CargoService;
        this._SedeOperativaService = _SedeOperativaService;
        this._loginService = _loginService;
        this.router = router;
        this.formNew = false;
        this.formEdit = false;
        this.formIndex = false;
        this.formTime = false;
        this.formShow = false;
        this.formProrroga = false;
        this.formSearch = true;
        this.table = null;
        this.resumen = {};
        this.datos = {
            'nombre': null,
            'identificacion': null,
            'cargo': null,
            'tipoContratoId': null,
            'sedeOperativaId': null,
            'numeroContrato': null,
            'fechaInicio': null,
            'fechaFin': null,
            'nombramiento': null,
        };
    }
    MpersonalFuncionarioComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._TipoContratoService.select().subscribe(function (response) {
            _this.tiposContrato = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
        this._CargoService.select().subscribe(function (response) {
            _this.cargos = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
        this._SedeOperativaService.getSedeOperativaSelect().subscribe(function (response) {
            _this.sedesOperativas = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
    };
    MpersonalFuncionarioComponent.prototype.onNew = function () {
        this.formNew = true;
        this.formSearch = false;
        this.formTime = false;
        this.formShow = false;
        this.formProrroga = false;
        this.formIndex = false;
        if (this.table) {
            this.table.destroy();
        }
    };
    MpersonalFuncionarioComponent.prototype.onProrroga = function (funcionario) {
        this.funcionario = funcionario;
        this.formProrroga = true;
        this.formNew = false;
        this.formSearch = false;
        this.formTime = false;
        this.formShow = false;
        this.formIndex = false;
        if (this.table) {
            this.table.destroy();
        }
    };
    MpersonalFuncionarioComponent.prototype.onTime = function (funcionario) {
        this.funcionario = funcionario;
        this.formTime = true;
        this.formNew = false;
        this.formSearch = false;
        this.formProrroga = false;
        this.formShow = false;
        this.formIndex = false;
        if (this.table) {
            this.table.destroy();
        }
    };
    MpersonalFuncionarioComponent.prototype.onShow = function (funcionario) {
        this.funcionario = funcionario;
        this.formShow = true;
        this.formTime = false;
        this.formNew = false;
        this.formProrroga = false;
        this.formSearch = false;
        this.formIndex = false;
        if (this.table) {
            this.table.destroy();
        }
    };
    MpersonalFuncionarioComponent.prototype.ready = function (isCreado) {
        if (isCreado) {
            this.formNew = false;
            this.formEdit = false;
            this.formTime = false;
            this.formProrroga = false;
            this.formIndex = false;
            this.formShow = false;
            this.formSearch = true;
            this.ngOnInit();
        }
    };
    MpersonalFuncionarioComponent.prototype.onSearch = function () {
        var _this = this;
        this.datos.nombre = this.nombre;
        this.datos.identificacion = this.identificacion;
        this.datos.cargo = this.cargoSelected;
        this.datos.tipoContratoId = this.tipoContratoSelected;
        this.datos.sedeOperativaId = this.sedeOperativaSelected;
        console.log(this.datos);
        var token = this._loginService.getToken();
        this._FuncionarioService.searchByParametros(this.datos, token).subscribe(function (response) {
            if (response.status == 'success') {
                _this.funcionarios = response.data;
                _this.iniciarTabla();
                _this.formIndex = true;
                sweetalert2_1.default({
                    title: 'Perfecto',
                    text: response.message,
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
                    title: 'Alerta',
                    text: response.message,
                    type: 'warning',
                    showCancelButton: true,
                    focusConfirm: true,
                    confirmButtonText: '<i class="fa fa-thumbs-up"></i> Registrar',
                    confirmButtonAriaLabel: 'Thumbs up, great!',
                    cancelButtonText: '<i class="fa fa-thumbs-down"></i> Cancelar',
                    cancelButtonAriaLabel: 'Thumbs down',
                }).then(function (result) {
                    if (result.value) {
                        _this.formNew = true;
                        _this.formSearch = false;
                    }
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
    MpersonalFuncionarioComponent.prototype.iniciarTabla = function () {
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
    MpersonalFuncionarioComponent.prototype.delete = function (id) {
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
                _this._FuncionarioService.delete(token, id).subscribe(function (response) {
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
    MpersonalFuncionarioComponent.prototype.onChangedTipoContrato = function (e) {
        if (e) {
            if (e != 2) {
                this.datos.numeroContrato = null;
                this.datos.fechaFin = null;
                this.datos.fechaInicio = null;
            }
            if (e != 1) {
                this.datos.nombramiento = null;
            }
        }
    };
    MpersonalFuncionarioComponent.prototype.onEdit = function (funcionario) {
        this.funcionario = funcionario;
        this.formEdit = true;
        this.formSearch = false;
    };
    return MpersonalFuncionarioComponent;
}());
MpersonalFuncionarioComponent = __decorate([
    core_1.Component({
        selector: 'app-index',
        templateUrl: './mpersonalFuncionario.component.html'
    }),
    __metadata("design:paramtypes", [mpersonalFuncionario_service_1.MpersonalFuncionarioService,
        mpersonalTipoContrato_service_1.MpersonalTipoContratoService,
        cfgCargo_service_1.CfgCargoService,
        sedeOperativa_service_1.SedeOperativaService,
        login_service_1.LoginService,
        router_1.Router])
], MpersonalFuncionarioComponent);
exports.MpersonalFuncionarioComponent = MpersonalFuncionarioComponent;
//# sourceMappingURL=mpersonalFuncionario.component.js.map