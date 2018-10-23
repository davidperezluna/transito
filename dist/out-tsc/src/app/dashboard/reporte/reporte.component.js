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
var sweetalert2_1 = require("sweetalert2");
var ReporteComponent = (function () {
    function ReporteComponent(
        // private _RegistroMaquinariaService: RegistroMaquinariaService,
        _loginService) {
        this._loginService = _loginService;
        this.formIndex = true;
        this.tramite = false;
        this.infraccion = false;
        this.retefuente = false;
        this.tipoReportes = [
            { 'value': "tramite", 'label': "Tramite" },
            { 'value': "multa", 'label': "Infraccion" },
            { 'value': "retefuente", 'label': "Retefuente" }
        ];
    }
    ReporteComponent.prototype.ngOnInit = function () {
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
    ReporteComponent.prototype.iniciarTabla = function () {
        //   $('#dataTables-example').DataTable({
        //     responsive: true,
        //     pageLength: 8,
        //     sPaginationType: 'full_numbers',
        //     oLanguage: {
        //          oPaginate: {
        //          sFirst: '<<',
        //          sPrevious: '<',
        //          sNext: '>',
        //          sLast: '>>'
        //       }
        //     }
        //  });
        //  this.table = $('#dataTables-example').DataTable();
    };
    ReporteComponent.prototype.onNew = function () {
        this.formIndex = false;
        // this.formNew = true;
        this.table.destroy();
    };
    ReporteComponent.prototype.ready = function (isCreado) {
        if (isCreado) {
            // this.formNew = false;
            this.formIndex = true;
            this.ngOnInit();
        }
    };
    ReporteComponent.prototype.editVehiculo = function (registroMaquinaria) {
    };
    ReporteComponent.prototype.deleteRegistroMaquinaria = function (id) {
    };
    return ReporteComponent;
}());
ReporteComponent = __decorate([
    core_1.Component({
        selector: 'app-index',
        templateUrl: './reporte.component.html'
    }),
    __metadata("design:paramtypes", [login_service_1.LoginService])
], ReporteComponent);
exports.ReporteComponent = ReporteComponent;
//# sourceMappingURL=reporte.component.js.map