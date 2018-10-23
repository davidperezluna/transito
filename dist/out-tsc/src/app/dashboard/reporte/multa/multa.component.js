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
var login_service_1 = require("../../../services/login.service");
var comparendo_service_1 = require("../../../services/comparendo.service");
var sweetalert2_1 = require("sweetalert2");
var MultaComponent = (function () {
    function MultaComponent(_ComparendoService, _loginService) {
        this._ComparendoService = _ComparendoService;
        this._loginService = _loginService;
        this.ready = new core_1.EventEmitter();
        this.formIndex = true;
        this.tramite = false;
        this.infraccion = false;
        this.retefuente = false;
        this.infracciones = [
            { 'value': "acuerdos", 'label': "Acuerdos de pago" },
            { 'value': "comparendo", 'label': "Comparendo" },
            { 'value': "cobro", 'label': "Cobro coactivo" }
        ];
    }
    MultaComponent.prototype.ngOnInit = function () {
        var _this = this;
        sweetalert2_1.default({
            title: 'Cargando Tabla!',
            text: 'Solo tardara unos segundos por favor espere.',
            onOpen: function () {
                sweetalert2_1.default.showLoading();
            }
        }).then(function (result) {
            if (
            // Read more about handling dismissals
            result.dismiss === sweetalert2_1.default.DismissReason.timer) {
            }
        });
        this._ComparendoService.getComparendo().subscribe(function (response) {
            _this.comparendos = response.data;
            console.log(_this.comparendos);
            var timeoutId = setTimeout(function () {
                _this.iniciarTabla();
                sweetalert2_1.default.close();
            }, 100);
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
    };
    MultaComponent.prototype.iniciarTabla = function () {
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
    MultaComponent.prototype.onCancelar = function () {
        this.ready.emit(true);
    };
    MultaComponent.prototype.generar = function () {
        // generar la lista de las infracciones
    };
    MultaComponent.prototype.changedMarca = function (e) {
    };
    return MultaComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], MultaComponent.prototype, "ready", void 0);
MultaComponent = __decorate([
    core_1.Component({
        selector: 'app-multa',
        templateUrl: './multa.component.html'
    }),
    __metadata("design:paramtypes", [comparendo_service_1.ComparendoService,
        login_service_1.LoginService])
], MultaComponent);
exports.MultaComponent = MultaComponent;
//# sourceMappingURL=multa.component.js.map