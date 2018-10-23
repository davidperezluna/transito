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
var imoTrazabilidad_service_1 = require("../../../services/imoTrazabilidad.service");
var imoAsignacion_service_1 = require("../../../services/imoAsignacion.service");
var login_service_1 = require("../../../services/login.service");
var common_1 = require("@angular/common");
var sweetalert2_1 = require("sweetalert2");
var ShowComponent = (function () {
    function ShowComponent(_ImoTrazabilidadService, _ImoAsignacionService, _LoginService) {
        this._ImoTrazabilidadService = _ImoTrazabilidadService;
        this._ImoAsignacionService = _ImoAsignacionService;
        this._LoginService = _LoginService;
        this.reasignacionId = null;
        this.ready = new core_1.EventEmitter();
        this.table = null;
        this.isCantidad = true;
    }
    ShowComponent.prototype.ngOnInit = function () {
        var _this = this;
        sweetalert2_1.default({
            title: 'Cargando Tabla!',
            text: 'Solo tardara unos segundos por favor espere.',
            timer: 1500,
            onOpen: function () {
                sweetalert2_1.default.showLoading();
            }
        });
        var token = this._LoginService.getToken();
        this._ImoAsignacionService.showTrazabilidad(token, this.reasignacionId).subscribe(function (response) {
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
    ShowComponent.prototype.onCancelar = function () {
        this.ready.emit(true);
    };
    ShowComponent.prototype.iniciarTabla = function () {
        $('#dataTables-example').DataTable({
            responsive: true,
            pageLength: 8,
            sPaginationType: 'full_numbers',
            dom: 'Bfrtip',
            buttons: [
                'pdf',
            ],
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
    return ShowComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ShowComponent.prototype, "reasignacionId", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ShowComponent.prototype, "ready", void 0);
ShowComponent = __decorate([
    core_1.Component({
        selector: 'app-show',
        templateUrl: './show.component.html',
        providers: [common_1.DatePipe]
    }),
    __metadata("design:paramtypes", [imoTrazabilidad_service_1.ImoTrazabilidadService,
        imoAsignacion_service_1.ImoAsignacionService,
        login_service_1.LoginService])
], ShowComponent);
exports.ShowComponent = ShowComponent;
//# sourceMappingURL=show.component.js.map