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
var clase_service_1 = require("../../services/clase.service");
var sedeOperativa_service_1 = require("../../services/sedeOperativa.service");
var gestionTransportePublico_modelo_1 = require("./gestionTransportePublico.modelo");
var sweetalert2_1 = require("sweetalert2");
var GestionTransportePublicoComponent = (function () {
    function GestionTransportePublicoComponent(_VehiculoService, _loginService, _claseService, _sedeOperativaService) {
        this._VehiculoService = _VehiculoService;
        this._loginService = _loginService;
        this._claseService = _claseService;
        this._sedeOperativaService = _sedeOperativaService;
    }
    GestionTransportePublicoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.gestionTransportePublico = new gestionTransportePublico_modelo_1.GestionTransportePublico(null, null, null);
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
        this._VehiculoService.getVehiculo().subscribe(function (response) {
            _this.vehiculos = response.data;
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
        this._claseService.getClaseSelect().subscribe(function (response) {
            _this.clases = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._sedeOperativaService.getSedeOperativaSelect().subscribe(function (response) {
            _this.sedesOperativas = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
    };
    GestionTransportePublicoComponent.prototype.iniciarTabla = function () {
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
    GestionTransportePublicoComponent.prototype.onEnviar = function () {
        var _this = this;
        this.table.destroy();
        var token = this._loginService.getToken();
        this._VehiculoService.filterByParameters(this.gestionTransportePublico, token).subscribe(function (response) {
            _this.vehiculos = response.data;
            var timeoutId = setTimeout(function () {
                _this.iniciarTabla();
            }, 100);
            (function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert("Error en la petición");
                }
            });
        });
    };
    return GestionTransportePublicoComponent;
}());
GestionTransportePublicoComponent = __decorate([
    core_1.Component({
        selector: 'app-index',
        templateUrl: './gestionTransportePublico.component.html'
    }),
    __metadata("design:paramtypes", [vehiculo_service_1.VehiculoService,
        login_service_1.LoginService,
        clase_service_1.ClaseService,
        sedeOperativa_service_1.SedeOperativaService])
], GestionTransportePublicoComponent);
exports.GestionTransportePublicoComponent = GestionTransportePublicoComponent;
//# sourceMappingURL=gestionTransportePublico.component.js.map