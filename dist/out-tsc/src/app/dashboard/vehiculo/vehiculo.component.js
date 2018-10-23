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
var vehiculo_service_1 = require("../../services/vehiculo.service");
var login_service_1 = require("../../services/login.service");
var sweetalert2_1 = require("sweetalert2");
var VehiculoComponent = (function () {
    function VehiculoComponent(_VehiculoService, _loginService) {
        this._VehiculoService = _VehiculoService;
        this._loginService = _loginService;
        this.formIndex = true;
        this.formNew = false;
        this.formEdit = false;
    }
    VehiculoComponent.prototype.ngOnInit = function () {
        var _this = this;
        sweetalert2_1.default({
            title: 'Cargando información!',
            text: 'Solo tardara unos segundos por favor espere.',
            type: 'info'
        });
        this.formEdit = false;
        this.formNew = false;
        this._VehiculoService.getVehiculo().subscribe(function (response) {
            _this.vehiculos = response.data;
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
    VehiculoComponent.prototype.iniciarTabla = function () {
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
    VehiculoComponent.prototype.onNew = function () {
        this.formNew = true;
        this.formIndex = false;
        this.table.destroy();
    };
    VehiculoComponent.prototype.ready = function (isCreado) {
        if (isCreado) {
            this.formNew = false;
            this.formIndex = true;
            this.ngOnInit();
        }
    };
    VehiculoComponent.prototype.editVehiculo = function (vehiculo) {
        this.vehiculo = vehiculo;
        this.formEdit = true;
        this.formIndex = false;
    };
    return VehiculoComponent;
}());
VehiculoComponent = __decorate([
    core_1.Component({
        selector: 'app-index',
        templateUrl: './vehiculo.component.html'
    }),
    __metadata("design:paramtypes", [vehiculo_service_1.VehiculoService,
        login_service_1.LoginService])
], VehiculoComponent);
exports.VehiculoComponent = VehiculoComponent;
//# sourceMappingURL=vehiculo.component.js.map