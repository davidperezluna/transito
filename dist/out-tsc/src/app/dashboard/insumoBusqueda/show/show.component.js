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
var rnaloteInsumos_service_1 = require("../../../services/rnaloteInsumos.service");
var login_service_1 = require("../../../services/login.service");
var empresa_service_1 = require("../../../services/empresa.service");
var sedeOperativa_service_1 = require("../../../services/sedeOperativa.service");
var cfgCasoInsumo_service_1 = require("../../../services/cfgCasoInsumo.service");
var rnaInsumos_service_1 = require("../../../services/rnaInsumos.service");
var common_1 = require("@angular/common");
var sweetalert2_1 = require("sweetalert2");
var ShowComponent = (function () {
    function ShowComponent(datePipe, _rnaRegistroInsumosService, _loginService, _EmpresaService, _SedeOperativaService, _CasoInsumoService, _RnaInsumoService) {
        this.datePipe = datePipe;
        this._rnaRegistroInsumosService = _rnaRegistroInsumosService;
        this._loginService = _loginService;
        this._EmpresaService = _EmpresaService;
        this._SedeOperativaService = _SedeOperativaService;
        this._CasoInsumoService = _CasoInsumoService;
        this._RnaInsumoService = _RnaInsumoService;
        this.ready = new core_1.EventEmitter();
        this.insumos = null;
        this.loteInsumo = null;
    }
    ShowComponent.prototype.ngOnInit = function () {
        var _this = this;
        var timeoutId = setTimeout(function () {
            _this.iniciarTabla();
        }, 100);
    };
    ShowComponent.prototype.iniciarTabla = function () {
        // Setup - add a text input to each footer cell
        $('#dataTables-example-Sustratos thead th.filter').each(function () {
            var title = $(this).text();
            $(this).html('<input type="text" class="form-control" placeholder="' + title + '" />');
        });
        $('#dataTables-example-Sustratos').DataTable({
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
        this.table = $('#dataTables-example-Sustratos').DataTable();
        // Apply the search
        this.table.columns().every(function () {
            var that = this;
            $('input', this.header()).on('keyup change', function () {
                if (that.search() !== this.value) {
                    that
                        .search(this.value)
                        .draw();
                }
            });
        });
    };
    ShowComponent.prototype.deleteInsumo = function (id) {
        var _this = this;
        sweetalert2_1.default({
            title: '¿Estás seguro?',
            text: "¡Se dañara el sustrato este registro!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#15d4be',
            cancelButtonColor: '#ff6262',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then(function (result) {
            if (result.value) {
                _this.table.destroy();
                _this.insumos = null;
                var token_1 = _this._loginService.getToken();
                _this._RnaInsumoService.delete(token_1, id).subscribe(function (response) {
                    sweetalert2_1.default({
                        title: 'Modificado!',
                        text: 'Registro modificado correctamente.',
                        type: 'success',
                        confirmButtonColor: '#15d4be',
                    });
                    _this._RnaInsumoService.showLote(_this.loteInsumo.id, token_1).subscribe(function (response) {
                        _this.respuesta = response;
                        if (_this.respuesta.status == 'success') {
                            _this.insumos = _this.respuesta.datos;
                            _this.respuesta = response;
                            _this.ngOnInit();
                        }
                        (function (error) {
                            _this.errorMessage = error;
                            if (_this.errorMessage != null) {
                                console.log(_this.errorMessage);
                                alert("Error en la petición");
                            }
                        });
                    });
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
    return ShowComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ShowComponent.prototype, "ready", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ShowComponent.prototype, "insumos", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ShowComponent.prototype, "loteInsumo", void 0);
ShowComponent = __decorate([
    core_1.Component({
        selector: 'app-show',
        templateUrl: './show.component.html',
        providers: [common_1.DatePipe]
    }),
    __metadata("design:paramtypes", [common_1.DatePipe,
        rnaloteInsumos_service_1.RnaLoteInsumoService,
        login_service_1.LoginService,
        empresa_service_1.EmpresaService,
        sedeOperativa_service_1.SedeOperativaService,
        cfgCasoInsumo_service_1.CfgCasoInsumoService,
        rnaInsumos_service_1.RnaInsumoService])
], ShowComponent);
exports.ShowComponent = ShowComponent;
//# sourceMappingURL=show.component.js.map