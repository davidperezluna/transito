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
var cvAcuerdoPago_service_1 = require("../../services/cvAcuerdoPago.service");
var login_service_1 = require("../../services/login.service");
var ciudadano_service_1 = require("../../services/ciudadano.service");
var comparendo_service_1 = require("../../services/comparendo.service");
var sweetalert2_1 = require("sweetalert2");
var CvAcuerdoPagoComponent = (function () {
    function CvAcuerdoPagoComponent(_AcuerdoPagoService, _loginService, _CiudadanoService, _ComparendoService) {
        this._AcuerdoPagoService = _AcuerdoPagoService;
        this._loginService = _loginService;
        this._CiudadanoService = _CiudadanoService;
        this._ComparendoService = _ComparendoService;
        this.comparendos = null;
        this.comparendosSelect = [];
        this.formIndex = false;
        this.formNew = false;
        this.formEdit = false;
        this.formSearch = true;
        this.table = null;
    }
    CvAcuerdoPagoComponent.prototype.ngOnInit = function () { };
    CvAcuerdoPagoComponent.prototype.onSearch = function () {
        var _this = this;
        this.formIndex = false;
        var token = this._loginService.getToken();
        this._CiudadanoService.searchByIdentificacion({ 'numeroIdentificacion': this.numeroIdentificacion }, token).subscribe(function (response) {
            if (response.status == 'success') {
                _this.ciudadano = response.data;
                _this._ComparendoService.searchComparendosCiudadano({ 'ciudadanoId': _this.ciudadano.id }, token).subscribe(function (response) {
                    if (response.status == 'success') {
                        _this.comparendos = response.data;
                        var timeoutId = setTimeout(function () {
                            _this.iniciarTabla();
                        }, 100);
                        _this.formIndex = true;
                        sweetalert2_1.default({
                            title: 'Perfecto!',
                            text: response.message,
                            type: 'info',
                            confirmButtonText: 'Aceptar'
                        });
                    }
                    else {
                        sweetalert2_1.default({
                            title: 'Alerta!',
                            text: response.message,
                            type: 'warning',
                            confirmButtonText: 'Aceptar'
                        });
                    }
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert('Error en la petición');
                    }
                });
            }
            else {
                sweetalert2_1.default({
                    title: 'Alerta!',
                    text: response.message,
                    type: 'warning',
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
    CvAcuerdoPagoComponent.prototype.onSelect = function (idComparendo, eve) {
        if (eve.target.checked) {
            this.comparendosSelect.push(idComparendo);
        }
        else {
            var index = this.comparendosSelect.indexOf(idComparendo);
            if (index > -1) {
                this.comparendosSelect.splice(index, 1);
            }
        }
    };
    CvAcuerdoPagoComponent.prototype.iniciarTabla = function () {
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
    CvAcuerdoPagoComponent.prototype.onNew = function () {
        this.formNew = true;
        this.formIndex = false;
        this.formSearch = false;
        this.table.destroy();
    };
    CvAcuerdoPagoComponent.prototype.ready = function (isCreado) {
        if (isCreado) {
            this.formNew = false;
            this.formEdit = false;
            this.formIndex = false;
            this.formSearch = true;
            this.ngOnInit();
        }
    };
    CvAcuerdoPagoComponent.prototype.onEdit = function (acuerdoPago) {
        this.acuerdoPago = acuerdoPago;
        this.formEdit = true;
        this.formIndex = false;
    };
    return CvAcuerdoPagoComponent;
}());
CvAcuerdoPagoComponent = __decorate([
    core_1.Component({
        selector: 'app-index',
        templateUrl: './cvAcuerdoPago.component.html'
    }),
    __metadata("design:paramtypes", [cvAcuerdoPago_service_1.CvAcuerdoPagoService,
        login_service_1.LoginService,
        ciudadano_service_1.CiudadanoService,
        comparendo_service_1.ComparendoService])
], CvAcuerdoPagoComponent);
exports.CvAcuerdoPagoComponent = CvAcuerdoPagoComponent;
//# sourceMappingURL=cvAcuerdoPago.component.js.map