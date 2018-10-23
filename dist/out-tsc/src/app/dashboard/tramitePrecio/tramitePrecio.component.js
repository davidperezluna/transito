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
var tramitePrecio_service_1 = require("../../services/tramitePrecio.service");
var login_service_1 = require("../../services/login.service");
var sweetalert2_1 = require("sweetalert2");
// declare var fechaActual: any;
var TramitePrecioComponent = (function () {
    function TramitePrecioComponent(_TramitePrecioService, _loginService) {
        this._TramitePrecioService = _TramitePrecioService;
        this._loginService = _loginService;
        this.formNew = false;
        this.formEdit = false;
        this.formIndex = true;
        this.formSmlmv = false;
        this.formCalculo = false;
    }
    TramitePrecioComponent.prototype.ngOnInit = function () {
        var _this = this;
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
        this._TramitePrecioService.getTramitePrecio().subscribe(function (response) {
            _this.tramitePrecios = response.tramitePreciosActivo;
            _this.tramiteProximo = response.tramiteProximo;
            _this.compa = response.compa;
            _this.fechaActual = new Date();
            console.log(_this.tramitePrecios);
            console.log(_this.tramiteProximo);
            console.log(_this.fechaActual);
            // console.log(this.compa.clase);
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
    TramitePrecioComponent.prototype.iniciarTabla = function () {
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
    TramitePrecioComponent.prototype.onNew = function () {
        this.formNew = true;
        this.formIndex = false;
        this.formSmlmv = false;
        this.table.destroy();
    };
    TramitePrecioComponent.prototype.ready = function (isCreado) {
        if (isCreado) {
            this.formNew = false;
            this.formEdit = false;
            this.formSmlmv = false;
            this.formCalculo = false;
            this.formIndex = true;
            this.ngOnInit();
        }
    };
    TramitePrecioComponent.prototype.deleteTramitePrecio = function (id) {
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
                _this._TramitePrecioService.deleteTramitePrecio(token, id).subscribe(function (response) {
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
    TramitePrecioComponent.prototype.editTramitePrecio = function (tramitePrecio) {
        this.tramitePrecio = tramitePrecio;
        this.formEdit = true;
        this.formIndex = false;
    };
    TramitePrecioComponent.prototype.onNewSmlmv = function () {
        this.formEdit = false;
        this.formIndex = false;
        this.formNew = false;
        this.formCalculo = false;
        this.formSmlmv = true;
    };
    TramitePrecioComponent.prototype.onNewCalculo = function () {
        this.formEdit = false;
        this.formIndex = false;
        this.formNew = false;
        this.formSmlmv = false;
        this.formCalculo = true;
    };
    return TramitePrecioComponent;
}());
TramitePrecioComponent = __decorate([
    core_1.Component({
        selector: 'app-index',
        templateUrl: './tramitePrecio.component.html'
    }),
    __metadata("design:paramtypes", [tramitePrecio_service_1.TramitePrecioService,
        login_service_1.LoginService])
], TramitePrecioComponent);
exports.TramitePrecioComponent = TramitePrecioComponent;
//# sourceMappingURL=tramitePrecio.component.js.map