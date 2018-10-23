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
var login_service_1 = require("../../services/login.service");
var mpersonalFuncionario_service_1 = require("../../services/mpersonalFuncionario.service");
var cfgComparendoEstado_service_1 = require("../../services/cfgComparendoEstado.service");
var comparendo_service_1 = require("../../services/comparendo.service");
var sweetalert2_1 = require("sweetalert2");
var rpcccInventarioDocumentalComponent = (function () {
    function rpcccInventarioDocumentalComponent(_loginService, _MpersonalFuncionarioService, _CfgComparendoEstadoService, _ComparendoService) {
        this._loginService = _loginService;
        this._MpersonalFuncionarioService = _MpersonalFuncionarioService;
        this._CfgComparendoEstadoService = _CfgComparendoEstadoService;
        this._ComparendoService = _ComparendoService;
        this.comparendosSancionado = [];
        this.comparendosExonerado = [];
        this.comparendosInhibitorio = [];
        this.comparendosAcuerdoPago = [];
        this.comparendosAcuerdoPagoIncumplido = [];
        this.comparendosPrescripcion = [];
        this.comparendosCaducidad = [];
        this.comparendosPagado = [];
        this.comparendosRevocatoria = [];
        this.comparendosInterposicion = [];
        this.comparendosNulidad = [];
        this.resumen = {};
        this.datos = { 'fechaDesde': null,
            'fechaHasta': null,
            'agenteId': null,
            'comparendosId': null };
    }
    rpcccInventarioDocumentalComponent.prototype.ngOnInit = function () {
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
        this._MpersonalFuncionarioService.selectAgentes().subscribe(function (response) {
            _this.agentes = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
        this._CfgComparendoEstadoService.select().subscribe(function (response) {
            _this.tipoComparendos = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
    };
    rpcccInventarioDocumentalComponent.prototype.iniciarTabla = function () {
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
    rpcccInventarioDocumentalComponent.prototype.onNew = function () {
        this.table.destroy();
    };
    rpcccInventarioDocumentalComponent.prototype.ready = function (isCreado) {
        if (isCreado) {
            this.ngOnInit();
        }
    };
    rpcccInventarioDocumentalComponent.prototype.buscarComparendos = function () {
        var _this = this;
        this.datos.comparendosId = this.comparendosSelected;
        this.datos.agenteId = this.agenteSelected;
        var token = this._loginService.getToken();
        this._ComparendoService.searchByParametros(this.datos, token).subscribe(function (response) {
            if (response.code == 200) {
                _this.comparendos = response.data;
                console.log(_this.comparendos);
                _this.comparendos.forEach(function (element) {
                    if (element.estado.id == 1) {
                        _this.comparendosSancionado.push(element);
                    }
                    else if (element.estado.id == 2) {
                        _this.comparendosExonerado.push(element);
                    }
                    else if (element.estado.id == 3) {
                        _this.comparendosInhibitorio.push(element);
                    }
                    else if (element.estado.id == 4) {
                        _this.comparendosAcuerdoPago.push(element);
                    }
                    else if (element.estado.id == 5) {
                        _this.comparendosAcuerdoPagoIncumplido.push(element);
                    }
                    else if (element.estado.id == 6) {
                        _this.comparendosPrescripcion.push(element);
                    }
                    else if (element.estado.id == 7) {
                        _this.comparendosCaducidad.push(element);
                    }
                    else if (element.estado.id == 8) {
                        _this.comparendosPagado.push(element);
                    }
                    else if (element.estado.id == 9) {
                        _this.comparendosRevocatoria.push(element);
                    }
                    else if (element.estado.id == 10) {
                        _this.comparendosInterposicion.push(element);
                    }
                    else if (element.estado.id == 11) {
                        _this.comparendosNulidad.push(element);
                    }
                });
            }
            else if (response.code == 400) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
    };
    rpcccInventarioDocumentalComponent.prototype.generarPDF = function () {
    };
    return rpcccInventarioDocumentalComponent;
}());
rpcccInventarioDocumentalComponent = __decorate([
    core_1.Component({
        selector: 'rpcccInventarioDocumental',
        templateUrl: './rpcccInventarioDocumental.component.html'
    }),
    __metadata("design:paramtypes", [login_service_1.LoginService,
        mpersonalFuncionario_service_1.MpersonalFuncionarioService,
        cfgComparendoEstado_service_1.CfgComparendoEstadoService,
        comparendo_service_1.ComparendoService])
], rpcccInventarioDocumentalComponent);
exports.rpcccInventarioDocumentalComponent = rpcccInventarioDocumentalComponent;
//# sourceMappingURL=rpcccInventarioDocumental.component.js.map