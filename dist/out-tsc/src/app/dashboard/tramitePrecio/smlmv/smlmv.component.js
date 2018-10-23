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
var parametro_modelo_1 = require("./parametro.modelo");
var parametro_service_1 = require("../../../services/parametro.service");
var login_service_1 = require("../../../services/login.service");
var conceptoParametro_service_1 = require("../../../services/conceptoParametro.service");
var conceptoParameTrotramite_service_1 = require("../../../services/conceptoParameTrotramite.service");
var sweetalert2_1 = require("sweetalert2");
var tramitePrecio_service_1 = require("../../../services/tramitePrecio.service");
var NewSmlmvComponent = (function () {
    function NewSmlmvComponent(_ParametroService, _loginService, _TramitePrecioService, _ConceptoParametroService, _ConceptoParametroTramiteService) {
        this._ParametroService = _ParametroService;
        this._loginService = _loginService;
        this._TramitePrecioService = _TramitePrecioService;
        this._ConceptoParametroService = _ConceptoParametroService;
        this._ConceptoParametroTramiteService = _ConceptoParametroTramiteService;
        this.ready = new core_1.EventEmitter();
        this.tramitePrecios = null;
        this.valorConcepto = 0;
        this.calcularForm = false;
        this.conceptoForm = false;
        this.tablaConceptos = false;
        this.listado = false;
        this.tramitesPrecios = [];
        this.conceptoParametroTramites = [];
        this.itemStringsLeft = [];
        this.itemStringsRight = [];
    }
    NewSmlmvComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.parametro = new parametro_modelo_1.Parametro(null, null, null, null, null);
        this._ConceptoParametroTramiteService.getConceptoParametroTramite().subscribe(function (response) {
            _this.conceptoParametroTramites = response.data;
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
                _this.itemStringsLeft.push(tramitePrecio.nombre);
            });
            _this.listado = true;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
    };
    NewSmlmvComponent.prototype.iniciarTabla = function () {
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
    NewSmlmvComponent.prototype.onCancelar = function () {
        this.ready.emit(true);
    };
    NewSmlmvComponent.prototype.onEnviar = function () {
        var _this = this;
        var token = this._loginService.getToken();
        var datos = {
            'trmites': this.itemStringsRight,
            'concepto': this.conceptoSelected
        };
        this._ConceptoParametroTramiteService.register(datos, token).subscribe(function (response) {
            _this.respuesta = response;
            if (_this.respuesta.status == 'success') {
                _this.table.destroy();
                _this.ngOnInit();
                sweetalert2_1.default({
                    title: 'Perfecto!',
                    text: 'Registro exitoso!',
                    type: 'success',
                    confirmButtonText: 'Aceptar'
                });
            }
            else {
                sweetalert2_1.default({
                    title: 'Error!',
                    text: 'El parametro ' + +' ya se encuentra registrado',
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
    NewSmlmvComponent.prototype.newConcepto = function () {
        this.conceptoForm = true;
    };
    NewSmlmvComponent.prototype.cancelarConcepto = function () {
        this.conceptoForm = false;
    };
    NewSmlmvComponent.prototype.delete = function (id) {
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
    return NewSmlmvComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewSmlmvComponent.prototype, "ready", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewSmlmvComponent.prototype, "tramitePrecios", void 0);
NewSmlmvComponent = __decorate([
    core_1.Component({
        selector: 'app-new-smlmv',
        templateUrl: './smlmv.component.html'
    }),
    __metadata("design:paramtypes", [parametro_service_1.ParametroService,
        login_service_1.LoginService,
        tramitePrecio_service_1.TramitePrecioService,
        conceptoParametro_service_1.ConceptoParametroService,
        conceptoParameTrotramite_service_1.ConceptoParametroTramiteService])
], NewSmlmvComponent);
exports.NewSmlmvComponent = NewSmlmvComponent;
//# sourceMappingURL=smlmv.component.js.map