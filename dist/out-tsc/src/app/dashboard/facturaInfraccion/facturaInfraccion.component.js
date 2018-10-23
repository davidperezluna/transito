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
var facturaInfraccion_service_1 = require("../../services/facturaInfraccion.service");
var login_service_1 = require("../../services/login.service");
var facturaInfraccion_modelo_1 = require("./facturaInfraccion.modelo");
var tipoIdentificacion_service_1 = require("../../services/tipoIdentificacion.service");
var ciudadano_service_1 = require("../../services/ciudadano.service");
var sweetalert2_1 = require("sweetalert2");
var comparendo_service_1 = require("../../services/comparendo.service");
var FacturaInfraccionComponent = (function () {
    function FacturaInfraccionComponent(_FacturaInfraccionService, _route, _loginService, _tipoIdentificacionService, _CiudadanoService, _ComparendoService) {
        this._FacturaInfraccionService = _FacturaInfraccionService;
        this._route = _route;
        this._loginService = _loginService;
        this._tipoIdentificacionService = _tipoIdentificacionService;
        this._CiudadanoService = _CiudadanoService;
        this._ComparendoService = _ComparendoService;
        this.identificacion = false;
        this.ciudadanoEncontrado = 1;
    }
    FacturaInfraccionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.facturaInfraccion = new facturaInfraccion_modelo_1.FacturaInfraccion(null, null, null, null, null, null, 0, null);
        sweetalert2_1.default({
            title: 'Cargando!',
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
        this._tipoIdentificacionService.getTipoIdentificacionSelect().subscribe(function (response) {
            _this.tipoIdentificaciones = response;
            sweetalert2_1.default.close();
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
    };
    FacturaInfraccionComponent.prototype.iniciarTabla = function () {
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
    FacturaInfraccionComponent.prototype.deleteFacturaInfraccion = function (id) {
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
                _this._FacturaInfraccionService.deleteFacturaInfraccion(token, id).subscribe(function (response) {
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
    FacturaInfraccionComponent.prototype.onKeyCiudadano = function () {
        var _this = this;
        var token = this._loginService.getToken();
        var identificacion = {
            'numeroIdentificacion': this.identificacion,
        };
        this._CiudadanoService.searchByIdentificacion(token, identificacion).subscribe(function (response) {
            _this.respuesta = response;
            if (_this.respuesta.status == 'success') {
                _this.ciudadano = _this.respuesta.data;
                var ciudadano = {
                    'ciudadanoId': _this.ciudadano.id,
                };
                _this._ComparendoService.searchComparendosCiudadano(ciudadano, token).subscribe(function (response) {
                    _this.comparendos = response.data;
                    console.log(_this.comparendos);
                    _this.ciudadanoEncontrado = 2;
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert('Error en la petición');
                    }
                });
            }
            else {
                _this.ciudadanoEncontrado = 3;
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
    FacturaInfraccionComponent.prototype.onInfraccionSelect = function (valor, eve) {
        if (eve.target.checked) {
            this.facturaInfraccion.valorTotal = this.facturaInfraccion.valorTotal + parseInt(valor);
        }
        else {
            this.facturaInfraccion.valorTotal = this.facturaInfraccion.valorTotal - parseInt(valor);
        }
        console.log(this.facturaInfraccion.valorTotal);
    };
    return FacturaInfraccionComponent;
}());
FacturaInfraccionComponent = __decorate([
    core_1.Component({
        selector: 'app-index',
        templateUrl: './facturaInfraccion.component.html'
    }),
    __metadata("design:paramtypes", [facturaInfraccion_service_1.FacturaInfraccionService,
        router_1.ActivatedRoute,
        login_service_1.LoginService,
        tipoIdentificacion_service_1.TipoIdentificacionService,
        ciudadano_service_1.CiudadanoService,
        comparendo_service_1.ComparendoService])
], FacturaInfraccionComponent);
exports.FacturaInfraccionComponent = FacturaInfraccionComponent;
//# sourceMappingURL=facturaInfraccion.component.js.map