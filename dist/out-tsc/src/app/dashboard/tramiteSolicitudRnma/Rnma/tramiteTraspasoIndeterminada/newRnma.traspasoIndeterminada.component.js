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
var login_service_1 = require("../../../../services/login.service");
var tramiteSolicitud_service_1 = require("../../../../services/tramiteSolicitud.service");
var vehiculo_service_1 = require("../../../../services/vehiculo.service");
var ciudadanoVehiculo_service_1 = require("../../../../services/ciudadanoVehiculo.service");
var common_1 = require("@angular/common");
var sweetalert2_1 = require("sweetalert2");
var NewRnmaTraspasoIndeterminadaComponent = (function () {
    function NewRnmaTraspasoIndeterminadaComponent(_TramiteSolicitudService, _loginService, _VehiculoService, _CiudadanoVehiculoService) {
        this._TramiteSolicitudService = _TramiteSolicitudService;
        this._loginService = _loginService;
        this._VehiculoService = _VehiculoService;
        this._CiudadanoVehiculoService = _CiudadanoVehiculoService;
        this.readyTramite = new core_1.EventEmitter();
        this.vehiculo = null;
        this.factura = null;
        this.ciudadano = null;
        this.formNew = false;
        this.formEdit = false;
        this.formIndex = true;
        this.datos = null;
        this.vehiculos = false;
        this.sinRegistro = "SIN REGISTRO";
        this.tipos = [
            { 'value': "Declaración",
                'label': "Declaración" },
            { 'value': "Manifestación",
                'label': "Manifestación" }
        ];
        this.resumen = {};
    }
    NewRnmaTraspasoIndeterminadaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.datos = {
            'fecha': null,
            'codigoOrganismo': null,
            'tipoDocumentoSelected': null,
            'tipoServicio': null,
            'vehiculoId': null,
            'tipoDocApoderado': null,
            'nombreApoderado': null,
            'numeroDocumento': null,
            'solicitanteId': null,
            'tramiteFormulario': null,
            'facturaId': null,
            'personaTraslado': null
        };
        this.datos.codigoOrganismo = this.vehiculo.sedeOperativa.codigoDivipo;
        this.datos.tipoServicio = this.vehiculo.servicio.nombre;
        this.date = new Date();
        var datePiper = new common_1.DatePipe(this.date);
        this.datos.fecha = datePiper.transform(this.date, 'yyyy-MM-dd');
        this.datos.vehiculoId = this.vehiculo.id;
        sweetalert2_1.default({
            title: 'Cargando Tabla!',
            text: 'Solo tardara unos segundos por favor espere.',
            timer: 1500,
            onOpen: function () {
                sweetalert2_1.default.showLoading();
            }
        }).then(function (result) {
            _this.codigoOrganismo = _this.datos.codigoOrganismo;
            _this.tipoServicio = _this.datos.tipoServicio;
            _this.date = _this.datos.fecha;
        });
        this.datos.nombreApoderado = this.ciudadano.usuario.primerNombre + " " + this.ciudadano.usuario.segundoNombre + " " + this.ciudadano.usuario.primerApellido;
        this.datos.tipoDocApoderado = this.ciudadano.usuario.tipoIdentificacion.nombre;
        this.datos.numeroDocumento = this.ciudadano.usuario.identificacion;
        this.nombreApoderado = this.datos.nombreApoderado;
        this.tipoDocApoderado = this.datos.tipoDocApoderado;
        this.numeroDocumento = this.datos.numeroDocumento;
        this.datos.solicitanteId = this.ciudadano.id;
    };
    NewRnmaTraspasoIndeterminadaComponent.prototype.onNew = function () {
        this.formNew = true;
        this.formIndex = false;
        this.table.destroy();
    };
    NewRnmaTraspasoIndeterminadaComponent.prototype.ready = function (isCreado) {
        if (isCreado) {
            this.formNew = false;
            this.formEdit = false;
            this.formIndex = true;
            this.ngOnInit();
        }
    };
    NewRnmaTraspasoIndeterminadaComponent.prototype.onEnviar = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this.datos.facturaId = this.factura.id;
        this.datos.tramiteFormulario = 'rnma-trapasoindeterminada';
        this.readyTramite.emit({ 'foraneas': this.datos, 'resumen': this.resumen });
        this.datos.personaTraslado = this.sinRegistro;
        console.log(this.datos.solicitanteId);
        console.log(this.datos.vehiculoId);
        this._CiudadanoVehiculoService.eliminarVehiculoPropietario(token, this.datos).subscribe(function (response) {
            _this.respuesta = response;
            if (_this.respuesta.status == 'success') {
                sweetalert2_1.default({
                    title: 'Perfecto!',
                    text: 'El registro se ha modificado con éxito',
                    type: 'success',
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
    return NewRnmaTraspasoIndeterminadaComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRnmaTraspasoIndeterminadaComponent.prototype, "readyTramite", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRnmaTraspasoIndeterminadaComponent.prototype, "vehiculo", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRnmaTraspasoIndeterminadaComponent.prototype, "factura", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRnmaTraspasoIndeterminadaComponent.prototype, "ciudadano", void 0);
NewRnmaTraspasoIndeterminadaComponent = __decorate([
    core_1.Component({
        selector: 'appRnma-traspaso-indeterminada',
        templateUrl: './newRnma.traspasoIndeterminada.html',
        providers: [common_1.DatePipe]
    }),
    __metadata("design:paramtypes", [tramiteSolicitud_service_1.TramiteSolicitudService,
        login_service_1.LoginService,
        vehiculo_service_1.VehiculoService,
        ciudadanoVehiculo_service_1.CiudadanoVehiculoService])
], NewRnmaTraspasoIndeterminadaComponent);
exports.NewRnmaTraspasoIndeterminadaComponent = NewRnmaTraspasoIndeterminadaComponent;
//# sourceMappingURL=newRnma.traspasoIndeterminada.component.js.map