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
var router_1 = require("@angular/router");
var factura_service_1 = require("../../services/factura.service");
var tramiteFactura_service_1 = require("../../services/tramiteFactura.service");
var login_service_1 = require("../../services/login.service");
var sweetalert2_1 = require("sweetalert2");
var FacturaComponent = (function () {
    function FacturaComponent(_FacturaService, _TramiteFacturaService, _route, _loginService) {
        this._FacturaService = _FacturaService;
        this._TramiteFacturaService = _TramiteFacturaService;
        this._route = _route;
        this._loginService = _loginService;
        this.formNew = false;
        this.formEdit = false;
        this.formShow = false;
        this.formIndex = true;
    }
    FacturaComponent.prototype.ngOnInit = function () {
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
        this._FacturaService.getFactura().subscribe(function (response) {
            _this.facturas = response.data;
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
    FacturaComponent.prototype.iniciarTabla = function () {
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
    FacturaComponent.prototype.onNew = function () {
        this.formNew = true;
        this.formIndex = false;
        this.table.destroy();
    };
    FacturaComponent.prototype.ready = function (isCreado) {
        if (isCreado) {
            this.formNew = false;
            this.formEdit = false;
            this.formIndex = true;
            this.formShow = false;
            this.ngOnInit();
        }
    };
    FacturaComponent.prototype.readyShow = function (isCreado) {
        if (isCreado) {
            this.formNew = false;
            this.formEdit = false;
            this.formShow = false;
            this.formIndex = true;
            this.ngOnInit();
        }
    };
    FacturaComponent.prototype.deleteFactura = function (id) {
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
                _this._FacturaService.deleteFactura(token, id).subscribe(function (response) {
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
    FacturaComponent.prototype.editFactura = function (factura) {
        this.factura = factura;
        this.formEdit = true;
        this.formIndex = false;
    };
    FacturaComponent.prototype.getTramiteFactura = function (factura) {
        this.factura = factura;
        this.formShow = true;
        this.formIndex = false;
    };
    return FacturaComponent;
}());
FacturaComponent = __decorate([
    core_1.Component({
        selector: 'app-index',
        templateUrl: './factura.component.html'
    }),
    __metadata("design:paramtypes", [factura_service_1.FacturaService,
        tramiteFactura_service_1.TramiteFacturaService,
        router_1.ActivatedRoute,
        login_service_1.LoginService])
], FacturaComponent);
exports.FacturaComponent = FacturaComponent;
//# sourceMappingURL=factura.component.js.map