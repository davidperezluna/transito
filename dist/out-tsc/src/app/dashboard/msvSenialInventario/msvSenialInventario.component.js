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
var msvSenialInventario_service_1 = require("../../services/msvSenialInventario.service");
var cfgSvDestino_service_1 = require("../../services/cfgSvDestino.service");
var cfgBodega_service_1 = require("../../services/cfgBodega.service");
var municipio_service_1 = require("../../services/municipio.service");
var cfgSvSenialTipo_service_1 = require("../../services/cfgSvSenialTipo.service");
var login_service_1 = require("../../services/login.service");
var sweetalert2_1 = require("sweetalert2");
var MsvSenialInventarioComponent = (function () {
    function MsvSenialInventarioComponent(_loginService, _SenialInventarioService, _DestinoService, _BodegaService, _MunicipioService, _TipoSenialService) {
        this._loginService = _loginService;
        this._SenialInventarioService = _SenialInventarioService;
        this._DestinoService = _DestinoService;
        this._BodegaService = _BodegaService;
        this._MunicipioService = _MunicipioService;
        this._TipoSenialService = _TipoSenialService;
        this.formLocationSenial = false;
        this.formNewBodega = false;
        this.formNewMunicipio = false;
        this.formIndex = false;
        this.formSearch = true;
        this.table = null;
        this.municipios = null;
        this.inventariosBodega = null;
        this.inventariosMunicipio = null;
    }
    MsvSenialInventarioComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._DestinoService.select().subscribe(function (response) {
            _this.tiposDestino = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
        this._TipoSenialService.select().subscribe(function (response) {
            _this.tiposSenial = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
    };
    MsvSenialInventarioComponent.prototype.ready = function (isCreado) {
        if (isCreado) {
            this.formLocationSenial = false;
            this.formIndex = true;
            this.ngOnInit();
        }
    };
    MsvSenialInventarioComponent.prototype.getDestino = function (value) {
        var _this = this;
        switch (value) {
            case 1:
                this.municipios = null;
                break;
            case 2:
                this._MunicipioService.getMunicipioPorDepartamentoSelect(21).subscribe(function (response) {
                    _this.municipios = response;
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert('Error en la petición');
                    }
                });
                break;
        }
    };
    MsvSenialInventarioComponent.prototype.onSearch = function () {
        var _this = this;
        this.formIndex = true;
        var token = this._loginService.getToken();
        if (this.tipoDestinoSelected == 1) {
            this._SenialInventarioService.searchByTipoSenialInBodega({ 'idTipoSenial': this.tipoSenialSelected }, token).subscribe(function (response) {
                if (response.status == 'success') {
                    _this.inventariosBodega = response.data;
                    sweetalert2_1.default({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    });
                }
                else {
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
        }
        else {
            this._SenialInventarioService.searchByTipoSenialInMunicipio({ 'idTipoSenial': this.tipoSenialSelected, 'idMunicipio': this.municipioSelected }, token).subscribe(function (response) {
                if (response.status == 'success') {
                    _this.inventariosMunicipio = response.data;
                    sweetalert2_1.default({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    });
                }
                else {
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
        }
    };
    MsvSenialInventarioComponent.prototype.iniciarTabla = function () {
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
            },
        });
        this.table = $('#dataTables-example').DataTable();
    };
    MsvSenialInventarioComponent.prototype.onLocation = function (inventario) {
        this.inventario = inventario;
        this.formLocationSenial = true;
        this.formIndex = false;
        if (this.table) {
            this.table.destroy();
        }
    };
    MsvSenialInventarioComponent.prototype.onNewSenialMunicipio = function () {
        this.formNewMunicipio = true;
        this.formNewBodega = false;
        this.formIndex = false;
        if (this.table) {
            this.table.destroy();
        }
    };
    MsvSenialInventarioComponent.prototype.onNewSenialBodega = function () {
        this.formNewBodega = true;
        this.formNewMunicipio = false;
        this.formIndex = false;
        if (this.table) {
            this.table.destroy();
        }
    };
    return MsvSenialInventarioComponent;
}());
MsvSenialInventarioComponent = __decorate([
    core_1.Component({
        selector: 'app-index',
        templateUrl: './msvSenialInventario.component.html'
    }),
    __metadata("design:paramtypes", [login_service_1.LoginService,
        msvSenialInventario_service_1.MsvSenialInventarioService,
        cfgSvDestino_service_1.CfgSvDestinoService,
        cfgBodega_service_1.CfgBodegaService,
        municipio_service_1.MunicipioService,
        cfgSvSenialTipo_service_1.CfgSvSenialTipoService])
], MsvSenialInventarioComponent);
exports.MsvSenialInventarioComponent = MsvSenialInventarioComponent;
//# sourceMappingURL=msvSenialInventario.component.js.map