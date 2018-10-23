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
var imoTrazabilidad_service_1 = require("../../services/imoTrazabilidad.service");
var common_1 = require("@angular/common");
var sweetalert2_1 = require("sweetalert2");
var RnaPreasignacionInsumoComponent = (function () {
    function RnaPreasignacionInsumoComponent(_ImoTrazabilidadService) {
        this._ImoTrazabilidadService = _ImoTrazabilidadService;
        this.formIndex = true;
        this.formNew = false;
        this.formShow = false;
        this.table = null;
        this.isCantidad = true;
    }
    RnaPreasignacionInsumoComponent.prototype.ngOnInit = function () {
        var _this = this;
        sweetalert2_1.default({
            title: 'Cargando Tabla!',
            text: 'Solo tardara unos segundos por favor espere.',
            timer: 1500,
            onOpen: function () {
                sweetalert2_1.default.showLoading();
            }
        });
        this._ImoTrazabilidadService.index().subscribe(function (response) {
            _this.reasignaciones = response.data;
            var timeoutId = setTimeout(function () {
                sweetalert2_1.default.close();
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
    RnaPreasignacionInsumoComponent.prototype.onShow = function (id) {
        this.reasignacionId = id;
        this.formIndex = false;
        this.formNew = false;
        this.formShow = true;
        this.table.destroy();
    };
    RnaPreasignacionInsumoComponent.prototype.onNew = function () {
        this.formIndex = false;
        this.formNew = true;
        this.table.destroy();
    };
    RnaPreasignacionInsumoComponent.prototype.ready = function (isCreado) {
        if (isCreado) {
            this.formNew = false;
            this.formShow = false;
            this.formIndex = true;
            this.ngOnInit();
        }
    };
    RnaPreasignacionInsumoComponent.prototype.iniciarTabla = function () {
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
    return RnaPreasignacionInsumoComponent;
}());
RnaPreasignacionInsumoComponent = __decorate([
    core_1.Component({
        selector: 'app-rnaPreasignacionInsumo',
        templateUrl: './rnaPreasignacionInsumo.component.html',
        providers: [common_1.DatePipe]
    }),
    __metadata("design:paramtypes", [imoTrazabilidad_service_1.ImoTrazabilidadService])
], RnaPreasignacionInsumoComponent);
exports.RnaPreasignacionInsumoComponent = RnaPreasignacionInsumoComponent;
//# sourceMappingURL=rnaPreasignacionInsumo.component.js.map