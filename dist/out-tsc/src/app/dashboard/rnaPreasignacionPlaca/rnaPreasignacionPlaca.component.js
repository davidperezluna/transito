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
var color_service_1 = require("../../services/color.service");
var login_service_1 = require("../../services/login.service");
var vehiculo_service_1 = require("../../services/vehiculo.service");
var ciudadanoVehiculo_service_1 = require("../../services/ciudadanoVehiculo.service");
var sedeOperativa_service_1 = require("../../services/sedeOperativa.service");
var cfgPlaca_service_1 = require("../../services/cfgPlaca.service");
var sweetalert2_1 = require("sweetalert2");
var RnaPreasignacionPlacaComponent = (function () {
    function RnaPreasignacionPlacaComponent(_vehiculoService, _ColorService, _loginService, _ciudadanoVehiculoService, _SedeOperativaService, _CfgPlacaService) {
        this._vehiculoService = _vehiculoService;
        this._ColorService = _ColorService;
        this._loginService = _loginService;
        this._ciudadanoVehiculoService = _ciudadanoVehiculoService;
        this._SedeOperativaService = _SedeOperativaService;
        this._CfgPlacaService = _CfgPlacaService;
        // @Output() ready = new EventEmitter<any>();
        this.ciudadanoVehiculo = null;
        this.formNew = false;
        this.formEdit = false;
        this.formIndex = true;
    }
    RnaPreasignacionPlacaComponent.prototype.ngOnInit = function () {
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
        this._ColorService.index().subscribe(function (response) {
            // this.colors = response.data;
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
    RnaPreasignacionPlacaComponent.prototype.iniciarTabla = function () {
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
    RnaPreasignacionPlacaComponent.prototype.onNew = function () {
        this.formNew = true;
        this.formIndex = false;
        this.table.destroy();
    };
    RnaPreasignacionPlacaComponent.prototype.ready = function (isCreado) {
        if (isCreado) {
            this.formNew = false;
            this.formEdit = false;
            this.formIndex = true;
            this.ngOnInit();
        }
    };
    RnaPreasignacionPlacaComponent.prototype.deleteColor = function (id) {
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
                _this._ColorService.delete(token, id).subscribe(function (response) {
                    sweetalert2_1.default({
                        title: 'Eliminado!',
                        text: 'Registro eliminado correctamente.',
                        type: 'success',
                        confirmButtonColor: '#15d4be',
                    });
                    _this.table.destroy();
                    _this.respuesta = response;
                    _this.ready(true);
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
    RnaPreasignacionPlacaComponent.prototype.onKeyValidateVehiculo = function () {
        var _this = this;
        sweetalert2_1.default({
            title: 'Buscando Vehiculo!',
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
        var token = this._loginService.getToken();
        this._ciudadanoVehiculoService.showCiudadanoVehiculoId(token, this.vehiculoCriterio).subscribe(function (response) {
            // console.log(response.data);
            if (response.code == 200) {
                _this.msj = 'vehiculo ya tiene placa asignada';
                _this.isError = true;
                _this.isExist = false;
                sweetalert2_1.default.close();
            }
            if (response.code == 401) {
                _this.msj = 'vehiculo no se encuentra en la base de datos';
                _this.isError = true;
                _this.isExist = false;
                sweetalert2_1.default.close();
            }
            if (response.code == 400) {
                _this.msj = 'vehiculo encontrado';
                _this.isError = false;
                _this.isExist = true;
                _this.vehiculo = response.data;
                console.log(_this.vehiculo);
                sweetalert2_1.default.close();
            }
            (function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert("Error en la petición");
                }
            });
        });
        // cargar el select de sede operatiba 
        this._SedeOperativaService.getSedeOperativaSelect().subscribe(function (response) {
            _this.sedesOperativas = response;
            console.log(_this.sedesOperativas);
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        // fin sede
    };
    RnaPreasignacionPlacaComponent.prototype.changedSedeOperativa = function (e) {
        var _this = this;
        var token = this._loginService.getToken();
        if (e) {
            this._CfgPlacaService.getCfgPlacaPorSedeOperativa(token, this.sedeOperativaSelected).subscribe(function (response) {
                _this.cfgPlacas = response;
                console.log(_this._CfgPlacaService);
            }, function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert("Error en la petición");
                }
            });
        }
    };
    RnaPreasignacionPlacaComponent.prototype.onEnviar = function () {
        var _this = this;
        this.vehiculo.sedeOperativaId = this.sedeOperativaSelected;
        this.vehiculo.placa = this.cfgPlacaSelected;
        var token = this._loginService.getToken();
        var html = 'El vehiculo con:<br> numero de chasis:  <b>' + this.vehiculo.chasis +
            '</b><br>numero de motor:  <b>' + this.vehiculo.motor +
            '</b><br>numero de serie:  <b>' + this.vehiculo.serie +
            '</b><br>fue asignada La placa:<br><b><h2>' + this.vehiculo.placa +
            '</h2></b>con exitosamente durante 60 días';
        sweetalert2_1.default({
            title: '¿Estás seguro?',
            type: 'info',
            html: html,
            showCancelButton: true,
            confirmButtonColor: '#15d4be',
            cancelButtonColor: '#ff6262',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then(function (result) {
            if (result.value) {
                _this._vehiculoService.asignacionPlaca(_this.vehiculo, token).subscribe(function (response) {
                    _this.respuesta = response;
                    if (_this.respuesta.status == 'success') {
                        sweetalert2_1.default({
                            title: 'Perfecto!',
                            html: html,
                            type: 'success',
                            confirmButtonText: 'Aceptar',
                        }).then(function (result) {
                            if (result.value) {
                                _this.onCancelar();
                            }
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
            }
        });
    };
    RnaPreasignacionPlacaComponent.prototype.onCancelar = function () {
        this.isError = false;
        this.isExist = false;
        this.ngOnInit();
    };
    return RnaPreasignacionPlacaComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], RnaPreasignacionPlacaComponent.prototype, "ciudadanoVehiculo", void 0);
RnaPreasignacionPlacaComponent = __decorate([
    core_1.Component({
        selector: 'app-index',
        templateUrl: './rnaPreasignacionPlaca.component.html'
    }),
    __metadata("design:paramtypes", [vehiculo_service_1.VehiculoService,
        color_service_1.ColorService,
        login_service_1.LoginService,
        ciudadanoVehiculo_service_1.CiudadanoVehiculoService,
        sedeOperativa_service_1.SedeOperativaService,
        cfgPlaca_service_1.CfgPlacaService])
], RnaPreasignacionPlacaComponent);
exports.RnaPreasignacionPlacaComponent = RnaPreasignacionPlacaComponent;
//# sourceMappingURL=rnaPreasignacionPlaca.component.js.map