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
var parametro_service_1 = require("../../../services/parametro.service");
var login_service_1 = require("../../../services/login.service");
var conceptoParametro_service_1 = require("../../../services/conceptoParametro.service");
var conceptoParameTrotramite_service_1 = require("../../../services/conceptoParameTrotramite.service");
var sweetalert2_1 = require("sweetalert2");
var tramitePrecio_service_1 = require("../../../services/tramitePrecio.service");
var CalculoComponent = (function () {
    function CalculoComponent(_ParametroService, _loginService, _TramitePrecioService, _ConceptoParametroService, _ConceptoParametroTramiteService) {
        this._ParametroService = _ParametroService;
        this._loginService = _loginService;
        this._TramitePrecioService = _TramitePrecioService;
        this._ConceptoParametroService = _ConceptoParametroService;
        this._ConceptoParametroTramiteService = _ConceptoParametroTramiteService;
        this.ready = new core_1.EventEmitter();
        this.tramitePrecios = null;
        this.textoConceptos = '';
        this.valorConcepto = 0;
        this.calcularForm = false;
        this.conceptoForm = false;
        this.tablaConceptos = false;
        this.listado = false;
        this.tramitesPrecios = [];
        this.tramitesPreciosTotal = [];
        this.conceptoParametroTramites = [];
        this.itemStringsRight = [];
    }
    CalculoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._ConceptoParametroTramiteService.getConceptoParametroTramite().subscribe(function (response) {
            _this.conceptoParametroTramites = response.data;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._ConceptoParametroService.getConceptoParametroSelect().subscribe(function (response) {
            _this.conceptos = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._TramitePrecioService.getTramitePrecio().subscribe(function (response) {
            _this.tramitePrecios = response.data;
            _this.tramitePrecios.forEach(function (tramitePrecio) {
                // console.log(tramitePrecio);
                var token = _this._loginService.getToken();
                _this._ConceptoParametroService.showConceptoParametroTramitePrecio(token, tramitePrecio.id).subscribe(function (response) {
                    _this.conceptos = response.data;
                    _this.valorConcepto = 0;
                    _this.textoConceptos = "";
                    _this.conceptos.forEach(function (concepto) {
                        _this.textoConceptos = _this.textoConceptos.concat(concepto.conceptoParametro.nombre + '<br>'); // variable que lleva la lista de el tooltips
                        console.log(_this.textoConceptos);
                        _this.valorConcepto = _this.valorConcepto + concepto.conceptoParametro.valor;
                    });
                    // let valorTotal = parseInt(tramitePrecio.valor) + this.valorConcepto;
                    var array = {
                        'fechaInicio': tramitePrecio.fechaInicio,
                        'nombre': tramitePrecio.nombre,
                        'valor': tramitePrecio.valor,
                        'valorNuevo': tramitePrecio.valor,
                        'valorConcepto': _this.valorConcepto,
                        'conceptos': _this.textoConceptos,
                        'valorTotal': 0,
                    };
                    _this.tramitesPrecios.push(array);
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert("Error en la petición");
                    }
                });
            });
            console.log(_this.tramitesPrecios);
            _this.listado = true;
            var timeoutId = setTimeout(function () {
                _this.iniciarTabla();
            }, 2000);
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
    };
    CalculoComponent.prototype.iniciarTabla = function () {
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
    CalculoComponent.prototype.onCancelar = function () {
        this.ready.emit(true);
    };
    CalculoComponent.prototype.onEnviar = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this._TramitePrecioService.registerCalculo(this.tramitesPrecios, token).subscribe(function (response) {
            _this.respuesta = response;
            if (_this.respuesta.status == 'success') {
                _this.table.destroy();
                _this.tramitesPrecios = [];
                _this.ngOnInit();
                sweetalert2_1.default({
                    title: 'Perfecto!',
                    text: 'El registro se ha guardado con exito',
                    type: 'success',
                    confirmButtonText: 'Aceptar'
                });
            }
            else {
                sweetalert2_1.default({
                    title: 'Error!',
                    text: 'Algo mal',
                    type: 'error',
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
    };
    CalculoComponent.prototype.newConcepto = function () {
        this.conceptoForm = true;
    };
    CalculoComponent.prototype.cancelarConcepto = function () {
        this.conceptoForm = false;
    };
    CalculoComponent.prototype.delete = function (id) {
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
                _this._ConceptoParametroTramiteService.deleteConceptoParametro(token, id).subscribe(function (response) {
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
    CalculoComponent.prototype.onCalculo = function () {
        var _this = this;
        this.tramitesPreciosTotal = [];
        this.tramitesPrecios.forEach(function (tramitePrecio) {
            var valorTotal = parseInt(tramitePrecio.valorNuevo) + _this.valorConcepto;
            var array = {
                'fechaInicio': tramitePrecio.fechaInicio,
                'nombre': tramitePrecio.nombre,
                'valor': tramitePrecio.valor,
                'valorNuevo': tramitePrecio.valorNuevo,
                'valorConcepto': _this.valorConcepto,
                'valorTotal': valorTotal,
            };
            _this.tramitesPreciosTotal.push(array);
        });
        this.tramitesPrecios = [];
        this.tramitesPrecios = this.tramitesPreciosTotal;
        this.table.destroy();
        var timeoutId = setTimeout(function () {
            _this.iniciarTabla();
        }, 100);
    };
    return CalculoComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], CalculoComponent.prototype, "ready", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], CalculoComponent.prototype, "tramitePrecios", void 0);
CalculoComponent = __decorate([
    core_1.Component({
        selector: 'app-new-calculo',
        templateUrl: './calculo.component.html'
    }),
    __metadata("design:paramtypes", [parametro_service_1.ParametroService,
        login_service_1.LoginService,
        tramitePrecio_service_1.TramitePrecioService,
        conceptoParametro_service_1.ConceptoParametroService,
        conceptoParameTrotramite_service_1.ConceptoParametroTramiteService])
], CalculoComponent);
exports.CalculoComponent = CalculoComponent;
//# sourceMappingURL=calculo.component.js.map