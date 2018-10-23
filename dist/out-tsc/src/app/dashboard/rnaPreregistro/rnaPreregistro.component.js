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
var rnaPreregistro_service_1 = require("../../services/rnaPreregistro.service");
var vehiculo_service_1 = require("../../services/vehiculo.service");
var login_service_1 = require("../../services/login.service");
var sweetalert2_1 = require("sweetalert2");
var RnaPreregistroComponent = (function () {
    function RnaPreregistroComponent(_VehiculoService, _RnaPreregistroService, _loginService) {
        this._VehiculoService = _VehiculoService;
        this._RnaPreregistroService = _RnaPreregistroService;
        this._loginService = _loginService;
        this.formIndex = true;
        this.formNew = false;
        this.formEdit = false;
    }
    RnaPreregistroComponent.prototype.ngOnInit = function () {
        var _this = this;
        sweetalert2_1.default({
            title: 'Cargando información!',
            text: 'Solo tardara unos segundos por favor espere.',
            type: 'info',
            showConfirmButton: false,
            onOpen: function () {
                sweetalert2_1.default.showLoading();
            }
        });
        this.formEdit = false;
        this.formNew = false;
        this._RnaPreregistroService.index().subscribe(function (response) {
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
    RnaPreregistroComponent.prototype.iniciarTabla = function () {
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
    RnaPreregistroComponent.prototype.onNew = function () {
        this.formNew = true;
        this.formIndex = false;
        this.table.destroy();
    };
    RnaPreregistroComponent.prototype.ready = function (isCreado) {
        if (isCreado) {
            this.formNew = false;
            this.formIndex = true;
            this.ngOnInit();
        }
    };
    RnaPreregistroComponent.prototype.editVehiculo = function (vehiculo) {
        this.vehiculo = vehiculo;
        this.formIndex = false;
        this.formEdit = true;
    };
    RnaPreregistroComponent.prototype.deleteVehiculo = function (id) {
        var _this = this;
        console.log(this.id);
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
                _this._VehiculoService.deleteVehiculo(token, id).subscribe(function (response) {
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
    return RnaPreregistroComponent;
}());
RnaPreregistroComponent = __decorate([
    core_1.Component({
        selector: 'app-index',
        templateUrl: './rnaPreregistro.component.html'
    }),
    __metadata("design:paramtypes", [vehiculo_service_1.VehiculoService,
        rnaPreregistro_service_1.RnaPreregistroService,
        login_service_1.LoginService])
], RnaPreregistroComponent);
exports.RnaPreregistroComponent = RnaPreregistroComponent;
//# sourceMappingURL=rnaPreregistro.component.js.map