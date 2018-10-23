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
var rnaInsumos_service_1 = require("../../services/rnaInsumos.service");
var login_service_1 = require("../../services/login.service");
var sedeOperativa_service_1 = require("../../services/sedeOperativa.service");
var rnaloteInsumos_service_1 = require("../../services/rnaloteInsumos.service");
var sweetalert2_1 = require("sweetalert2");
var InsumoBusquedaComponent = (function () {
    function InsumoBusquedaComponent(_RnaInsumoService, _loginService, _SedeOperativaService, _rnaRegistroInsumosService) {
        this._RnaInsumoService = _RnaInsumoService;
        this._loginService = _loginService;
        this._SedeOperativaService = _SedeOperativaService;
        this._rnaRegistroInsumosService = _rnaRegistroInsumosService;
        this.formNew = false;
        this.formShow = false;
    }
    InsumoBusquedaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._SedeOperativaService.getSedeOperativaSelect().subscribe(function (response) {
            _this.sedesOperativas = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
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
    };
    InsumoBusquedaComponent.prototype.iniciarTabla = function () {
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
    InsumoBusquedaComponent.prototype.onChangedSede = function (e) {
        var _this = this;
        if (e) {
            var datos = {
                'sedeOperativa': this.sedeOperativaSelected,
            };
            var token = this._loginService.getToken();
            this._rnaRegistroInsumosService.showSedeOperativaInsumo(datos, token).subscribe(function (response) {
                if (response.status == 'success') {
                    _this.loteInsumos = response.data;
                    var timeoutId = setTimeout(function () {
                        _this.iniciarTabla();
                    }, 100);
                }
                else {
                    sweetalert2_1.default({
                        title: 'Error!',
                        text: 'No existen sustratos para esta sede',
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
        }
    };
    InsumoBusquedaComponent.prototype.showLoteInsumoSustrato = function (e) {
        var _this = this;
        this.loteInsumo = e;
        var token = this._loginService.getToken();
        this._RnaInsumoService.showLote(this.loteInsumo.id, token).subscribe(function (response) {
            _this.respuesta = response;
            if (_this.respuesta.status == 'success') {
                _this.insumos = _this.respuesta.datos;
                _this.formShow = true;
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
    return InsumoBusquedaComponent;
}());
InsumoBusquedaComponent = __decorate([
    core_1.Component({
        selector: 'app-index',
        templateUrl: './insumoBusqueda.component.html'
    }),
    __metadata("design:paramtypes", [rnaInsumos_service_1.RnaInsumoService,
        login_service_1.LoginService,
        sedeOperativa_service_1.SedeOperativaService,
        rnaloteInsumos_service_1.RnaLoteInsumoService])
], InsumoBusquedaComponent);
exports.InsumoBusquedaComponent = InsumoBusquedaComponent;
//# sourceMappingURL=insumoBusqueda.component.js.map