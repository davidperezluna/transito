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
var factura_service_1 = require("../../../services/factura.service");
var login_service_1 = require("../../../services/login.service");
var vehiculo_service_1 = require("../../../services/vehiculo.service");
var ciudadano_service_1 = require("../../../services/ciudadano.service");
var sedeOperativa_service_1 = require("../../../services/sedeOperativa.service");
var tramiteFactura_service_1 = require("../../../services/tramiteFactura.service");
var tramite_service_1 = require("../../../services/tramite.service");
var sweetalert2_1 = require("sweetalert2");
var ShowComponent = (function () {
    function ShowComponent(_FacturaService, _CiudadanoService, _loginService, _VehiculoService, _SedeOperativaService, _TramiteFacturaService, _TramiteService) {
        this._FacturaService = _FacturaService;
        this._CiudadanoService = _CiudadanoService;
        this._loginService = _loginService;
        this._VehiculoService = _VehiculoService;
        this._SedeOperativaService = _SedeOperativaService;
        this._TramiteFacturaService = _TramiteFacturaService;
        this._TramiteService = _TramiteService;
        this.readyShow = new core_1.EventEmitter();
        this.factura = null;
        this.tramitesFacturaReady = false;
        this.nuevoTramite = false;
        this.cargar = true;
    }
    ShowComponent.prototype.ngOnInit = function () {
        var _this = this;
        // console.log(this.factura);
        this._TramiteFacturaService.getTramiteFactura(this.factura.id).subscribe(function (response) {
            _this.tramitesFactura = response.data;
            _this.tramitesFacturaReady = true;
            _this.cargar = true;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
    };
    ShowComponent.prototype.onCancelar = function () {
        this.readyShow.emit(true);
    };
    ShowComponent.prototype.onTramiteSelect = function (valor, eve) {
        if (eve.target.checked) {
            this.factura.valorBruto = parseInt(this.factura.valorBruto) + parseInt(valor);
        }
        else {
            this.factura.valorBruto = parseInt(this.factura.valorBruto) - parseInt(valor);
        }
    };
    ShowComponent.prototype.onNuevoTramite = function () {
        var _this = this;
        this.tramitesFacturaReady = false;
        this.cargar = false;
        this._TramiteService.getTramite().subscribe(function (response) {
            _this.tramites = response.data;
            _this.nuevoTramite = true;
            var timeoutId = setTimeout(function () {
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
    ShowComponent.prototype.onCancelarNuevo = function () {
        this.nuevoTramite = false;
        this.tramitesFacturaReady = true;
    };
    ShowComponent.prototype.onEnviar = function () {
        var _this = this;
        var tramitesFacturas = {
            'tramites': [],
            'factura': this.factura.id
        };
        var token = this._loginService.getToken();
        this.tramites.forEach(function (tramite) {
            if (tramite.state) {
                tramitesFacturas.tramites.push(tramite.id);
            }
        });
        this._TramiteFacturaService.register(tramitesFacturas, token).subscribe(function (response) {
            if (response.status == 'success') {
                _this._TramiteFacturaService.getTramiteFactura(_this.factura.id).subscribe(function (response) {
                    _this.tramitesFactura = response.data;
                    _this.nuevoTramite = false;
                    _this.tramitesFacturaReady = true;
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert("Error en la petición");
                    }
                });
                sweetalert2_1.default({
                    title: 'Perfecto!',
                    text: 'Registro exitoso!',
                    type: 'success',
                    confirmButtonText: 'Aceptar'
                });
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
    };
    ShowComponent.prototype.iniciarTabla = function () {
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
    };
    return ShowComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ShowComponent.prototype, "readyShow", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ShowComponent.prototype, "factura", void 0);
ShowComponent = __decorate([
    core_1.Component({
        selector: 'factura-show',
        templateUrl: './show.component.html'
    }),
    __metadata("design:paramtypes", [factura_service_1.FacturaService,
        ciudadano_service_1.CiudadanoService,
        login_service_1.LoginService,
        vehiculo_service_1.VehiculoService,
        sedeOperativa_service_1.SedeOperativaService,
        tramiteFactura_service_1.TramiteFacturaService,
        tramite_service_1.TramiteService])
], ShowComponent);
exports.ShowComponent = ShowComponent;
//# sourceMappingURL=show.component.js.map