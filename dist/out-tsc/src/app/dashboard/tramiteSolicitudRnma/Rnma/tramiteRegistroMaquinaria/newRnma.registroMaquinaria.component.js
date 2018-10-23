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
var newRnma_registroMaquinaria_modelo_1 = require("./newRnma.registroMaquinaria.modelo");
var tramiteFactura_service_1 = require("../../../../services/tramiteFactura.service");
var login_service_1 = require("../../../../services/login.service");
var vehiculo_service_1 = require("../../../../services/vehiculo.service");
var color_service_1 = require("../../../../services/color.service");
var tipoVehiculo_service_1 = require("../../../../services/tipoVehiculo.service");
var clase_service_1 = require("../../../../services/clase.service");
var marca_service_1 = require("../../../../services/marca.service");
var linea_service_1 = require("../../../../services/linea.service");
var carroceria_service_1 = require("../../../../services/carroceria.service");
var combustible_service_1 = require("../../../../services/combustible.service");
var sweetalert2_1 = require("sweetalert2");
var NewRnmaRegistroMaquinariaComponent = (function () {
    function NewRnmaRegistroMaquinariaComponent(_loginService, _LineaService, _ClaseService, _CarroceriaService, _ColorService, _CombustibleService, _VehiculoService, _MarcaService, _TramiteFacturaService, _TipoVehiculoService) {
        this._loginService = _loginService;
        this._LineaService = _LineaService;
        this._ClaseService = _ClaseService;
        this._CarroceriaService = _CarroceriaService;
        this._ColorService = _ColorService;
        this._CombustibleService = _CombustibleService;
        this._VehiculoService = _VehiculoService;
        this._MarcaService = _MarcaService;
        this._TramiteFacturaService = _TramiteFacturaService;
        this._TipoVehiculoService = _TipoVehiculoService;
        this.readyTramite = new core_1.EventEmitter();
        this.cancelarTramite = new core_1.EventEmitter();
        this.vehiculo = null;
        this.factura = null;
        this.tramitesFactura = null;
        this.condiciones = [
            { 'value': "Nuevo", 'label': "Nuevo" }, { 'value': "Sin registro antes de inicio RNMA", 'label': "Sin registro antes de inicio RNMA" }
        ];
        this.resumen = {};
        this.datos = {
            'placa': null,
            'numeroSerie': null,
            'numeroVin': null,
            'numeroChasis': null,
            'numeroMotor': null,
            'codigoIngreso': null,
            'fechaIngreso': null,
            'colorId': null,
            'claseMaquinariaClase': null,
            'marcas': null,
            'tipoClase': null,
            'linea': null,
            'tipoMaquinaria': null,
            'carroceria': null,
            'pesoBruto': null,
            'cargaUtil': null,
            'rodaje': null,
            'numeroEjes': null,
            'numeroLlantas': null,
            'tipoCabina': null,
            'altoTotal': null,
            'largoTotal': null,
            'anchoTotal': null,
            'combustible': null,
            'origenVehiculo': null,
            'subpartidaArancelaria': null,
            'tramiteFormulario': null,
            'facturaId': null,
        };
    }
    NewRnmaRegistroMaquinariaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.registroMaquinaria = new newRnma_registroMaquinaria_modelo_1.RegistroMaquinaria(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
        this._ColorService.select().subscribe(function (response) {
            _this.colores = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._TipoVehiculoService.getTipoVehiculoSelect().subscribe(function (response) {
            _this.tiposVehiculo = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._ClaseService.getClaseSelect().subscribe(function (response) {
            _this.clases = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._MarcaService.getMarcaSelect().subscribe(function (response) {
            _this.marcas = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._LineaService.select().subscribe(function (response) {
            _this.lineas = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._CarroceriaService.getCarroceriaSelect().subscribe(function (response) {
            _this.carrocerias = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._CombustibleService.getCombustibleSelect().subscribe(function (response) {
            _this.combustibles = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
    };
    NewRnmaRegistroMaquinariaComponent.prototype.onCancelar = function () {
        this.cancelarTramite.emit(true);
    };
    NewRnmaRegistroMaquinariaComponent.prototype.onEnviar = function () {
        var _this = this;
        this.vehiculo.municipioId = this.municipioSelected;
        this.vehiculo.lineaId = this.lineaSelected;
        this.vehiculo.claseId = this.claseSelected;
        this.vehiculo.carroceriaId = this.carroceriaSelected;
        // this.vehiculo.servicioId = this.servicioSelected;
        this.vehiculo.colorId = this.colorSelected;
        this.vehiculo.combustibleId = this.combustibleSelected;
        // this.vehiculo.sedeOperativaId = this.sedeOperativaSelected;
        console.log(this.vehiculo);
        var token = this._loginService.getToken();
        this._VehiculoService.register(this.vehiculo, token).subscribe(function (response) {
            _this.respuesta = response;
            console.log(_this.respuesta);
            if (_this.respuesta.status == 'success') {
                _this.datos.numeroMotor = _this.vehiculo.motor;
                _this.datos.facturaId = _this.factura.id;
                _this.datos.tramiteFormulario = 'rnma-registromaquinaria';
                _this.readyTramite.emit({ 'foraneas': _this.datos, 'resumen': _this.resumen });
            }
            else {
                sweetalert2_1.default({
                    title: 'Error!',
                    text: 'El vehiculo ' + _this.vehiculo.placa + ' ya se encuentra registrado',
                    type: 'error',
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
    NewRnmaRegistroMaquinariaComponent.prototype.changedDepartamento = function (e) {
        var _this = this;
        if (this.marcaSelected) {
            var token = this._loginService.getToken();
            this._LineaService.searchByMarcaSelect(this.marcaSelected, token).subscribe(function (response) {
                console.log(response.data[0]);
                if (response.data[0] != null) {
                    _this.lineas = response.data;
                }
                else {
                    _this.lineas = [];
                }
            }, function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert("Error en la petición");
                }
            });
        }
    };
    return NewRnmaRegistroMaquinariaComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRnmaRegistroMaquinariaComponent.prototype, "readyTramite", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRnmaRegistroMaquinariaComponent.prototype, "cancelarTramite", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRnmaRegistroMaquinariaComponent.prototype, "vehiculo", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRnmaRegistroMaquinariaComponent.prototype, "factura", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRnmaRegistroMaquinariaComponent.prototype, "tramitesFactura", void 0);
NewRnmaRegistroMaquinariaComponent = __decorate([
    core_1.Component({
        selector: 'appRnma-new-registroMaquinaria',
        templateUrl: './newRnma.registroMaquinaria.component.html'
    }),
    __metadata("design:paramtypes", [login_service_1.LoginService,
        linea_service_1.LineaService,
        clase_service_1.ClaseService,
        carroceria_service_1.CarroceriaService,
        color_service_1.ColorService,
        combustible_service_1.CombustibleService,
        vehiculo_service_1.VehiculoService,
        marca_service_1.MarcaService,
        tramiteFactura_service_1.TramiteFacturaService,
        tipoVehiculo_service_1.TipoVehiculoService])
], NewRnmaRegistroMaquinariaComponent);
exports.NewRnmaRegistroMaquinariaComponent = NewRnmaRegistroMaquinariaComponent;
//# sourceMappingURL=newRnma.registroMaquinaria.component.js.map